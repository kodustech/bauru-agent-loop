# AI Agents Hackathon — kickoff kit

## Conteúdo

- `docs/00-roteiro.md`: roteiro completo (35–40 min).
- `docs/01-slides.md`: slides em Markdown prontos para converter/exibir.
- `docs/02-referencias.md`: resumo de referências e dicas de implementação.
- `docs/03-diagramas.md`: diagramas (Mermaid) dos fluxos de geração, tools e agent loop.
- `docs/diagrams/*.mmd` e `docs/diagrams/*.svg`: fontes e imagens exportadas dos fluxos.
- `docs/04-pacote-leitura.md`: pacote de artigos e docs para nivelar o público.
- Slides exportados: `docs/exports/slides.pdf` e `docs/exports/slides.html` (gerados via Marp a partir de `docs/01-slides-export.md`).
- `demo/`: exemplo de agente com tools + README de uso (focado em Gemini 2.5).

## Uso rápido

- Veja o roteiro: `less docs/00-roteiro.md`
- Slides: `less docs/01-slides.md`
- Demo (Gemini CLI): `cd demo && npm install && GEMINI_API_KEY=... npm run demo "Pergunta"`
- Demo (HTTP server): `cd demo && GEMINI_API_KEY=... npm run server` e faça `POST http://localhost:3000/ask` com `{ "question": "..." }`
- Mock/offline: `cd demo && MOCK=1 npm run demo "Pergunta"`
- Diagramas (preview em texto): `less docs/03-diagramas.md`
- Diagramas (SVG): `npx @mermaid-js/mermaid-cli -i docs/03-diagramas.md -o docs/diagrams`

## Observação

- O demo roda com Gemini 2.5 ou em modo mock (`MOCK=1`) para ambientes sem chave.
