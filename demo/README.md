# Demo de agente (Node.js)

## O que é

- Agente simples com loop de tools para responder em PT-BR, escrito em TypeScript.
- Modelo: Gemini 2.5 (function calling nativo) ou modo mock (`MOCK=1`).
- Tools de exemplo:
    - `get_agenda`: lê a agenda do evento (dados locais em `data/agenda.json`).
    - `get_weather`: previsão mockada para Bauru (sem dependência externa).
    - `save_note`: persiste uma nota no disco em `output/notes.txt`.

## Pré-requisitos

- Node.js 18+.
- `GEMINI_API_KEY` para usar Gemini (usa `gemini-2.5-flash` por padrão; altere com `MODEL`).
- Variável `MOCK=1` para rodar offline sem chave (gera tool calls e resposta sintética).
- Veja `demo/.env.example`.

## Instalação

```bash
cd demo
npm install
```

## Rodando

```bash
# Com modelo real (GEMINI_API_KEY precisa estar exportada)
npm run demo "Quais são os horários da agenda e como vai estar o tempo em Bauru?"

# Modo mock/offline
MOCK=1 npm run demo "Quais são os horários da agenda e como vai estar o tempo em Bauru?"

# Servidor HTTP para testar via Postman/cURL
GEMINI_API_KEY=... npm run server
# POST http://localhost:3000/ask  body: { "question": "Quais são os horários da agenda?" }
```

## O que observar

- O console mostra o loop: mensagens, tool calls e respostas das tools.
- É um esqueleto mínimo para você plugar tools reais (DB, APIs, MCP).
- `save_note` pode ser usada para persistir um resumo e mostrar “memória curta”.
