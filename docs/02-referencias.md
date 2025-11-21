# Referências rápidas

## Artigo citado: You Should Write An Agent (Fly.io)

- Ideia central: “escrever um agente é como andar de bicicleta; simples e muda a forma de pensar”.
- Recomenda loops curtos e explícitos: mensagem → tool → estado → repetição.
- Use ferramentas pequenas e auditáveis; evite cadeias muito mágicas.
- Coloque telemetria no começo: logue mensagens e tool calls para depurar.
- Experimente com dados próprios — o ganho vem de integrar APIs e contexto, não só do modelo.

## Outras balizas úteis

- OpenAI tools: schemas bem descritos aumentam precisão; preferir `strict: true` quando possível.
- Claude function calling: menos permissivo com JSON; valide argumentos do lado servidor.
- MCP (Model Context Protocol): padroniza como expor ferramentas/documentos para agentes; bom para hackathons pela modularidade.
- Padrões de prompts (Chain of Thought / Plan-and-Execute / ReAct): escolha conforme o risco de alucinação e necessidade de passo‑a‑passo.
