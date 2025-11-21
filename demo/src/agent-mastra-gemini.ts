// Agente Mastra + Gemini 2.5 em TypeScript.
import { appendFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { Agent, Tool } from '@mastra/core';
import { z } from 'zod';

type AgendaSlot = { time: string; title: string; desc: string };
type AgendaData = {
    city: string; // Bauru
    venue: string;
    date: string;
    slots: AgendaSlot[];
    notes: string[];
};

type WeatherData = {
    city: string;
    day: string;
    conditions: string;
    temperature_c: { min: number; max: number };
    source: string;
};

type AgentConfig = {
    useMock: boolean;
    modelName: string;
    apiKey: string;
};

type AgentResult = {
    answer: string;
    usedMock: boolean;
    toolsCalled: string[];
    durationMs: number;
};

function hrNow(): number {
    const [sec, nanosec] = process.hrtime();
    return sec * 1_000 + nanosec / 1_000_000;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const agendaPath = path.join(__dirname, '..', 'data', 'agenda.json');
const notePath = path.join(__dirname, '..', 'output', 'notes.txt');
const agenda: AgendaData = JSON.parse(await readFile(agendaPath, 'utf8'));

function loadConfig(): AgentConfig {
    const useMock = process.env.MOCK === '1';
    const modelName = process.env.MODEL || 'gemini-2.5-flash';
    const apiKey = (process.env.GEMINI_API_KEY || '').trim();

    if (!useMock && !apiKey) {
        throw new Error(
            'GEMINI_API_KEY is required (or set MOCK=1 for offline mode).',
        );
    }

    return { useMock, modelName, apiKey };
}

async function ensureOutputDir(): Promise<void> {
    const outDir = path.dirname(notePath);
    await mkdir(outDir, { recursive: true });
}

const tools = {
    get_agenda: new Tool({
        id: 'get_agenda',
        description:
            'Retorna a agenda do AI Agents Hackathon Bauru, local e observações.',
        inputSchema: z.object({
            city: z.string().optional().default(agenda.city),
            include_notes: z.boolean().optional(),
        }),
        execute: async ({
            context,
        }: {
            context: { city?: string; include_notes?: boolean };
        }) => {
            const includeNotes = context.include_notes ?? false;
            return {
                city: context.city || agenda.city,
                venue: agenda.venue,
                date: agenda.date,
                slots: agenda.slots,
                notes: includeNotes ? agenda.notes : [],
            };
        },
    }),

    get_weather: new Tool({
        id: 'get_weather',
        description: 'Previsão mockada para a cidade do evento.',
        inputSchema: z.object({
            city: z.string().optional().default(agenda.city),
            day: z.string().optional().default(agenda.date),
        }),
        execute: async ({
            context,
        }: {
            context: { city?: string; day?: string };
        }) => {
            const city = context.city || agenda.city;
            return {
                city,
                day: context.day || agenda.date,
                conditions: 'Ensolarado com algumas nuvens',
                temperature_c: { min: 19, max: 29 },
                source: 'mock-local',
            };
        },
    }),

    save_note: new Tool({
        id: 'save_note',
        description:
            'Salva uma nota curta em disco para simular memória curta.',
        inputSchema: z.object({
            note: z.string().min(1, "Campo 'note' é obrigatório."),
        }),
        execute: async ({ context }: { context: { note: string } }) => {
            const line = `[${new Date().toISOString()}] ${context.note.trim()}\n`;
            await ensureOutputDir();
            await appendFile(notePath, line, 'utf8');
            return { saved: true, path: 'demo/output/notes.txt' };
        },
    }),
};

const agentConfig = loadConfig();

const agent = new Agent({
    name: 'hackathon-agent-mastra-gemini',
    instructions:
        'Você é um agente em português que responde de forma direta. Prefira dados das ferramentas. Cite agenda e clima quando pedido.',
    model: {
        provider: 'google',
        model: agentConfig.modelName,
        apiKey: agentConfig.apiKey,
    } as any,
    tools,
});

export async function runAgent(question: string): Promise<AgentResult> {
    const toolsCalled: string[] = [];
    const startMs = hrNow();
    const cleanQuestion = question.trim();
    if (!cleanQuestion) {
        throw new Error(
            'Pergunta vazia. Ex.: Qual a agenda e como estará o tempo?',
        );
    }
    if (agentConfig.useMock) {
        const agendaData = (await tools.get_agenda.execute?.({
            context: { include_notes: true, city: agenda.city },
        } as any)) as AgendaData | undefined;
        toolsCalled.push('get_agenda');

        const weatherData = (await tools.get_weather.execute?.({
            context: { city: agenda.city, day: agenda.date },
        } as any)) as WeatherData | undefined;
        toolsCalled.push('get_weather');

        const parts: string[] = [];
        if (agendaData)
            parts.push(
                `Agenda: ${agendaData.slots.length} slots em ${agendaData.city}.`,
            );
        if (weatherData) {
            parts.push(
                `Clima: ${weatherData.conditions} entre ${weatherData.temperature_c.min}ºC e ${weatherData.temperature_c.max}ºC.`,
            );
        }

        const mockAnswer = parts.length
            ? parts.join(' ')
            : 'Mock: pergunte sobre agenda ou tempo.';
        return {
            answer: mockAnswer,
            usedMock: true,
            toolsCalled,
            durationMs: hrNow() - startMs,
        };
    }

    const response = await agent.generate(cleanQuestion, {
        toolChoice: 'auto',
        maxSteps: 4,
    });
    return {
        answer: response.text,
        usedMock: false,
        toolsCalled,
        durationMs: hrNow() - startMs,
    };
}

async function runCli() {
    const question = process.argv.slice(2).join(' ').trim();
    if (!question) {
        console.error(
            'Passe uma pergunta. Ex.: npm run demo "Qual a agenda e como estará o tempo?"',
        );
        process.exit(1);
    }
    try {
        const result = await runAgent(question);
        console.log('\n== Resposta ==\n');
        console.log(result.answer);
        console.log(
            `\n[debug] usedMock=${result.usedMock} toolsCalled=${JSON.stringify(
                result.toolsCalled,
            )} durationMs=${result.durationMs.toFixed(1)}`,
        );
    } catch (err) {
        console.error('Erro ao rodar o agente Mastra+Gemini:', err);
        process.exit(1);
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    runCli();
}
