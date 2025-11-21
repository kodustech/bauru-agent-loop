# Pacote de leitura pré-palestra (Agents, Tools, Contexto, Prompt, Frameworks)

## Como usar

- Enviar com antecedência para nivelar o público.
- Ordem sugerida: visão geral → tools/context → prompt → frameworks Python/TS.

1. Visão geral de agents

---

- You Should Write An Agent (Fly.io) — Thomas Ptacek  
  https://fly.io/blog/everyone-write-an-agent/  
  Tese: agent básico = loop simples com tools; escreva um para entender o modelo mental.

- Agents – OpenAI  
  https://platform.openai.com/docs/agents/overview  
  Vocabulário comum: tools, memory, planning, evaluation.

- Building effective agents – Anthropic  
  https://www.anthropic.com/research/building-effective-agents  
  Workflow determinístico vs. agent que decide próximos passos; riscos/custos e mitigação.

- A practical guide to building agents (PDF) – OpenAI  
  https://cdn.openai.com/agent-principles/Introducing-OpenAI-Agents-(with-Canvas).pdf  
  Padrões, orquestração, observabilidade e segurança.

2. Tools / Function Calling

---

- Using tools – OpenAI  
  https://platform.openai.com/docs/guides/function-calling  
  Schemas, tool_choice, envio de resultados, boas práticas.

- Tools – OpenAI Agents SDK  
  https://platform.openai.com/docs/agents/tools  
  Papel das tools dentro do loop agentic.

- Writing effective tools for AI agents – Anthropic  
  https://www.anthropic.com/research/writing-effective-tools-for-ai-agents  
  Contratos claros, argumentos enxutos, erros bem definidos.

3. Contexto / Context Engineering

---

- Effective context engineering for AI agents – Anthropic  
  https://www.anthropic.com/research/effective-context-engineering-for-ai-agents  
  Toolset minimal, evitar contexto “inchado”, compressão/resumo, ordenação por relevância.

4. Prompt / Prompt Engineering

---

- Prompt engineering – OpenAI docs  
  https://platform.openai.com/docs/guides/prompt-engineering  
  Instruções claras, dividir tarefa, pedir raciocínio.

- GPT-4.1 Prompting Guide – OpenAI Cookbook  
  https://cookbook.openai.com/examples/gpt4_1_examples  
  Padrões atualizados: decomposition, verifying, self-critique.

- Prompt Engineering Guide (community)  
  https://www.promptingguide.ai/  
  Técnicas clássicas (zero-shot, few-shot, CoT).

- Engenharia de prompts (Wikipédia PT-BR)  
  https://pt.wikipedia.org/wiki/Engenharia_de_prompts  
  Opcional para quem prefere uma visão conceitual em PT.

5. Frameworks Python (agents)

---

- LangChain (Python)  
  Docs/overview: https://python.langchain.com/  
  API: https://api.python.langchain.com/en/stable/  
  GitHub: https://github.com/langchain-ai/langchain

- LangGraph (Python)  
  https://python.langchain.com/docs/langgraph  
  Útil para orquestração mais complexa.

- Agno (Python)  
  Site/docs: https://agno.com/  
  GitHub: https://github.com/agno-agi/agno  
  Artigo: https://workos.com/blog/agno-agent-framework-for-python-teams

6. Frameworks TypeScript / Node

---

- LangChain.js  
  Overview: https://js.langchain.com/  
  API: https://api.js.langchain.com/  
  GitHub: https://github.com/langchain-ai/langchainjs

- Mastra (TypeScript)  
  Site: https://docs.mastra.ai/  
  GitHub: https://github.com/mastra-ai/mastra  
  Tutorial introdutório: https://dev.to/haydenbleasel/creating-ai-agents-with-mastra-and-typescript-3b5h

## Sugestão de trilha curta (para enviar antes)

1. You Should Write An Agent (Fly.io)
2. Agents – OpenAI + Building effective agents (Anthropic)
3. Using tools (OpenAI) + Writing effective tools (Anthropic)
4. Effective context engineering (Anthropic)
5. Prompt engineering (OpenAI)
6. Mão na massa: LangChain (Python) ou LangChain.js / Mastra (TS)
