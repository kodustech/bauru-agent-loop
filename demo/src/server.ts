import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import process from 'node:process';
import { runAgent } from './agent-mastra-gemini.js';

const app = express();
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', model: process.env.MODEL || 'gemini-2.5-flash' });
});

app.post('/ask', async (req: Request, res: Response) => {
    try {
        const question = String(req.body?.question || '').trim();
        if (!question) {
            return res.status(400).json({
                error: 'Envie { question: "..." } no corpo da requisição.',
            });
        }
        const result = await runAgent(question);
        res.json({
            answer: result.answer,
            usedMock: result.usedMock,
            toolsCalled: result.toolsCalled,
            durationMs: result.durationMs,
        });
    } catch (err) {
        const message =
            err instanceof Error ? err.message : 'Erro desconhecido';
        const status = message.includes('GEMINI_API_KEY') ? 503 : 500;
        console.error('Erro na rota /ask:', err);
        res.status(status).json({ error: message });
    }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    console.log(`Servidor do agente ouvindo em http://localhost:${port}`);
});
