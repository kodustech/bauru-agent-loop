# Diagramas rápidos (Mermaid)

## Como gerar SVG/PNG

- Instale o CLI: `npm install -g @mermaid-js/mermaid-cli`
- Exemplos prontos: veja `docs/diagrams/*.svg` (já gerados).
- Renderize individualmente (ex.): `mmdc -i docs/diagrams/fluxo1-basico.mmd -o docs/diagrams/fluxo1-basico.svg -b white`
- Ou copie cada bloco para seu gerador favorito (Mermaid Live Editor).

## Fluxo 1 — Resposta generativa básica

```mermaid
sequenceDiagram
  participant User
  participant App
  participant LLM as Modelo (LLM)

  User->>App: Pergunta
  App->>LLM: system + user prompt
  LLM-->>App: Texto gerado
  App-->>User: Resposta final
```

## Fluxo 2 — Function calling / tools

```mermaid
sequenceDiagram
  participant User
  participant Orchestrator as Orquestrador
  participant LLM as Modelo
  participant Tool as Tool API

  User->>Orchestrator: Pedido
  Orchestrator->>LLM: system + user + tools schema
  LLM-->>Orchestrator: tool_calls (JSON)
  Orchestrator->>Tool: Chamada da função
  Tool-->>Orchestrator: Dados reais
  Orchestrator->>LLM: Mensagem role=tool com resultado
  LLM-->>Orchestrator: Resposta contextualizada
  Orchestrator-->>User: Texto final
```

## Fluxo 3 — Agent loop simples (ReAct curto)

```mermaid
stateDiagram-v2
  [*] --> Interpretar
  Interpretar --> DecidirTool
  DecidirTool --> ExecutarTool
  ExecutarTool --> Consolidar
  Consolidar --> [*]

  state Interpretar {
    note right: Ler intenção\nchecar contexto disponível
  }
  state DecidirTool {
    note right: Escolher tool ou responder direto\nValidar args
  }
  state ExecutarTool {
    note right: Chamar tool, logar\nRetry curto em caso de erro
  }
  state Consolidar {
    note right: Montar resposta final\nAnexar fontes/dados usados
  }
```

## Fluxo 4 — Observabilidade mínima

```mermaid
flowchart LR
  subgraph Agent
    A[Mensagens] --> B[Tool calls]
    B --> C[Respostas das tools]
    C --> D[Resposta final]
  end
  Agent -->|Log JSONL| L[Storage]
  L -->|Dashboard| O[(Insights)]
  O -->|Ajustes| Agent
```

## Fluxo 5 — Demo `demo/src/agent-mastra-gemini.ts`

```mermaid
flowchart TB
  Q[Input do usuário] --> M[Modelo (Gemini)\nmock ou API]
  M -->|tool_call| T1[get_agenda]
  M -->|tool_call| T2[get_weather]
  M -->|tool_call opcional| T3[save_note]
  T1 --> M
  T2 --> M
  T3 --> M
  M --> R[Resposta final\nPT-BR, dados das tools]
```
