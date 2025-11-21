---
marp: true
theme: default
paginate: true
math: false
style: |
    :root { color-scheme: dark; }
    section {
      background: radial-gradient(circle at 20% 20%, #1e293b 0%, rgba(15,23,42,0.85) 45%, #0b1222 100%);
      color: #e2e8f0;
      font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
    }
    h1, h2, h3 { color: #c084fc; }
    strong { color: #c084fc; }
    a { color: #38bdf8; }
    code {
      background: #1e293b;
      color: #f8fafc;
      padding: 0.08em 0.35em;
      border-radius: 4px;
    }
    img { max-height: 60vh; margin: 1rem auto; display: block; }
    ul { line-height: 1.5; }
---

# AI Agents Hackathon — Abertura

- Edição Bauru 2025
- “Do zero ao agente em 8 horas”
- Objetivo: nivelar conceitos e mostrar um agent rodando

---

# Por que agora?

- Modelos mais rápidos/baratos (4o-mini, claude-sonnet) + tools nativas
- Dá para automatizar workflows inteiros sem infra pesada
- Comunidade MCP crescendo: interop e reuso de ferramentas

---

# Geração ≠ Busca

- Modelos geram texto/imagem a partir de instruções
- Precisam de **contexto** para serem precisos
- Sem dados atuais → alucinação; com dados e tools → utilidade

---

# Prompt é Código

- Separe: system (tom/regras) + user (pedido) + context (dados)
- Padrão rápido: role → steps → constraints → output format
- Versione prompts e teste com casos de mesa

---

# Contexto (RAG rápido)

- Estratégia: encontrar → resumir → ordenar → truncar
- Fontes: docs, FAQs, agenda do evento, banco
- Inclua origem e datas; evite resposta sem fonte

---

# Tools / Function Calling

- Modelo decide chamar funções com JSON
- Schemas claros (descrição, unidades, ranges) reduzem alucinação
- Tool = dados vivos + ações reais

---

# Agent Loop simples

- Passos: interpretar → decidir tool → executar → consolidar → logar
- Limite de turns, validação de args, fallback simples
- Erro? responda útil e logue sempre
- ![Fluxo Agent Loop](diagrams/fluxo3-agent-loop.svg)

---

# Observabilidade

- Logue mensagens, tool calls e duração
- Guarde exemplos bons/ruins para ajustes
- Métrica simples: % de respostas que usaram a tool correta
- ![Fluxo Observabilidade](diagrams/fluxo4-observabilidade.svg)

---

# Live Code (vamos rodar)

- Script: `demo/src/agent.ts` (`npm run demo`)
- Tools: previsão de tempo (mock), agenda, save_note
- Modelo: `gpt-4o-mini` ou `MOCK=1` para offline
- ![Fluxo Demo](diagrams/fluxo5-demo.svg)

---

# Chamado à ação

- 8 horas para trazer um agente real do seu domínio
- Comece com 2–3 tools essenciais + logs simples
- Mentores disponíveis; publiquem algo funcionando
