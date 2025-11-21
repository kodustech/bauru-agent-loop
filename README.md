# AI Agents Hackathon — kickoff kit

## Conteúdo resumido

- `docs/03-diagramas.md`: diagramas e GIFs dos fluxos de geração, tools e agent loop.
- `docs/diagrams/*.mmd` e `docs/diagrams/*.svg`: fontes e imagens exportadas dos fluxos.
- `docs/04-pacote-leitura.md`: pacote de referências (agents, tools, contexto, prompt, frameworks).
- `demo/`: exemplo de agente com tools + README de uso (focado em Gemini 2.5).

## Uso rápido

- Demo (CLI Gemini): `cd demo && npm install && GEMINI_API_KEY=... npm run demo "Pergunta"`
- Demo (HTTP server): `cd demo && GEMINI_API_KEY=... npm run server` e faça `POST http://localhost:3000/ask` com `{ "question": "..." }`
- Mock/offline: `cd demo && MOCK=1 npm run demo "Pergunta"`
- Diagramas (preview em texto): `less docs/03-diagramas.md`
- Diagramas (SVG): `npx @mermaid-js/mermaid-cli -i docs/diagrams/fluxo1-basico.mmd -o docs/diagrams/fluxo1-basico.svg` (ou demais fluxos)

## Observação

- O demo roda com Gemini 2.5 ou em modo mock (`MOCK=1`) para ambientes sem chave.
