# Palestra: AI Agents Hackathon — Abertura (35–40 min)

## Objetivo da sessão

- Aquecer o público para um dia de construção com MCP e agentes.
- Nivelar conceitos: IA generativa, prompt, contexto, tools, agent loop, code AI.
- Mostrar um exemplo real de código que chama ferramentas e fecha o ciclo.

## Público / tom

- Desenvolvedores e entusiastas; maioria já viu chatbots mas não montou um loop de agente.
- Tom direto, pragmático, com exemplos curtos e uma demonstração ao vivo.

## Linha do tempo (sugestão 38 min)

- 0–4 min — Por que agora? (boom de modelos multimodais + tools).
- 4–10 min — Fundamentos rápidos: modelo, instruções, prompt/padrões, contexto, memória curta vs. longa.
- 10–18 min — Tools e function calling: como o modelo decide agir; boas práticas de schemas; evitar alucinação.
- 18–25 min — Agent loop: orquestração, checagens, fallback, tracing/observabilidade mínima.
- 25–34 min — Live code: rodar `npm run demo` (Gemini; veja `demo/src/agent-mastra-gemini.ts`), explicar mensagens e tool calls.
- 34–38 min — Chamado à ação: como usar isso no hackathon; Q&A rápido.

## Pontos de apoio (inclua nas falas)

- Modelos generativos = máquinas de completar instruções condicionadas por contexto.
- Prompts são código: versionar, testar e manter claros (separar sistema/usuário).
- Contexto é um recurso escasso: cortar ruído, estruturar dados, ordenar pelo que importa.
- Tools reduzem alucinação e trazem dados vivos; schemas autocontidos e descritivos.
- Agent loop simples é suficiente: (1) ler intenção, (2) decidir ferramenta, (3) executar, (4) consolidar resposta, (5) logar.
- Referência útil: “You Should Write An Agent” (Fly.io) — defender simplicidade: loops curtos, estado explícito, poucas dependências mágicas.

## Checklist de demonstração

- Terminal aberto na raiz do repo.
- Usar `npm install` (caso ainda não tenha o `node_modules`).
- Exportar `OPENAI_API_KEY` (ou avisar que o script roda em modo mock com `MOCK=1`).
- Executar: `npm run demo "Quais os pontos da agenda do hackathon e a previsão do tempo em Bauru?"`
- Mostrar o log: mensagens do modelo, tool calls, respostas agregadas.
- Fechar com: “é isso que vocês vão construir hoje, só que colando nos dados e tools de vocês”.
