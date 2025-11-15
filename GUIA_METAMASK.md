# 🦊 Guia Completo: Usando Metamask com Seu Token ERC-20

Este guia mostra como configurar o Metamask e fazer transações com seu token usando a interface web ou diretamente pelo Metamask.

## 📋 Informações Importantes

- **Endereço do Contrato Deployado (Ganache GUI - porta 7545):** `0xe297f36c75e1B498346545239860adec4542A8Aa`
- **Endereço do Contrato Deployado (Ganache CLI - porta 8545):** `0x051E1D5C68a2430e95CC8A68d4f3963e5F898bf5`
- **Nome do Token:** Minha Primeira Criptomoeda
- **Símbolo:** MPC
- **Decimais:** 18
- **Porta do Ganache:** 8545 (se estiver usando ganache CLI)

## 🔧 Passo 1: Configurar Rede no Metamask

1. Abra o Metamask no seu navegador
2. Clique no menu de redes (geralmente mostra "Ethereum Mainnet" no topo)
3. Clique em "Add Network" ou "Adicionar Rede"
4. Clique em "Add a network manually" ou "Adicionar uma rede manualmente"
5. Preencha os seguintes dados:

   ```
   Network Name: Ganache Local
   RPC URL: http://127.0.0.1:7545
   Chain ID: 5777
   Currency Symbol: ETH
   Block Explorer URL: (deixe em branco)
   ```
   
   **Nota:** Se você estiver usando Ganache GUI, o Chain ID é 5777. Se estiver usando ganache CLI, o Chain ID é 1337.

6. Clique em "Save" ou "Salvar"
7. Selecione a rede "Ganache Local" no Metamask

## 🔑 Passo 2: Importar Conta do Ganache

1. No terminal onde o Ganache está rodando, você verá uma lista de contas e chaves privadas
2. Copie a chave privada da primeira conta (a que tem todos os tokens)
   - Exemplo: `0x32e5a51115a657956b2da554a19a4603a7abdf4ddd4d9d6ac85934173f68ba9d`
3. No Metamask:
   - Clique no ícone de conta (círculo no canto superior direito)
   - Clique em "Import Account" ou "Importar Conta"
   - Cole a chave privada
   - Clique em "Import" ou "Importar"
4. Você verá a conta importada com ~1000 ETH (do Ganache)

**Importante:** Importe também uma segunda conta para testar transferências:
- Copie a chave privada da segunda conta do Ganache
- Repita o processo acima

## 💰 Passo 3: Adicionar Token no Metamask

1. No Metamask, certifique-se de estar na rede "Ganache Local"
2. Na aba "Assets" (Ativos), clique em "Import tokens" ou "Importar tokens"
3. Clique na aba "Custom Token" ou "Token Personalizado"
4. Cole o endereço do contrato: `0x051E1D5C68a2430e95CC8A68d4f3963e5F898bf5`
5. O Metamask deve detectar automaticamente:
   - Token Symbol: MPC
   - Token Decimals: 18
6. Clique em "Add Custom Token" ou "Adicionar Token Personalizado"
7. Clique em "Import Tokens" ou "Importar Tokens"
8. Você verá seu saldo de tokens MPC (1.000.000 MPC na primeira conta)

## 📤 Passo 4: Fazer Transferência de Tokens

### Opção A: Usando a Interface Web (Recomendado)

1. Abra o arquivo `index.html` no navegador (veja instruções abaixo)
2. Conecte sua carteira Metamask
3. Use a interface para fazer transferências

### Opção B: Usando o Remix IDE

1. Acesse [Remix IDE](https://remix.ethereum.org/)
2. Na aba "Deploy & Run Transactions":
   - Selecione "Injected Web3" como ambiente
   - Certifique-se de que o Metamask está conectado à rede Ganache Local
   - Em "At Address", cole: `0xe297f36c75e1B498346545239860adec4542A8Aa` (Ganache GUI) ou `0x051E1D5C68a2430e95CC8A68d4f3963e5F898bf5` (Ganache CLI)
   - Clique em "At Address"
3. Agora você pode interagir com o contrato:
   - `transfer`: Para transferir tokens
   - `balanceOf`: Para verificar saldo
   - `approve`: Para aprovar gastos

### Opção C: Transferência Direta pelo Metamask

1. No Metamask, clique no token MPC
2. Clique em "Send" ou "Enviar"
3. Cole o endereço de destino (segunda conta importada)
4. Digite a quantidade (ex: 100)
5. Clique em "Next" ou "Próximo"
6. Revise e confirme a transação
7. Aguarde a confirmação

## 🧪 Exemplo Prático: Transferir 100 MPC

1. **Preparação:**
   - Certifique-se de ter importado 2 contas no Metamask
   - Adicione o token MPC em ambas as contas
   - Anote o endereço da segunda conta

2. **Transferência:**
   - Selecione a primeira conta (que tem os tokens)
   - Clique no token MPC
   - Clique em "Send"
   - Cole o endereço da segunda conta
   - Digite: 100
   - Confirme a transação

3. **Verificação:**
   - Troque para a segunda conta no Metamask
   - Você verá 100 MPC na segunda conta
   - A primeira conta terá 999.900 MPC

## 🔍 Verificar Transações no Ganache

No terminal do Ganache, você verá logs de todas as transações:
- Quando uma transação é enviada
- Quando é confirmada
- Detalhes do gas usado

## ⚠️ Troubleshooting

### Metamask não conecta à rede
- Verifique se o Ganache está rodando
- Confirme que a porta está correta (8545 para ganache CLI)
- Tente desconectar e reconectar a rede

### Token não aparece
- Verifique se está na rede correta (Ganache Local)
- Confirme que o endereço do contrato está correto
- Tente adicionar o token novamente

### Transação falha
- Verifique se tem ETH suficiente para gas
- Confirme que tem tokens suficientes
- Verifique se o endereço de destino está correto

## 📝 Endereços das Contas do Ganache

Quando você iniciar o Ganache, anote os endereços das contas. Exemplo:
- Conta 0: `0x947FC10B4C82cFe1e617B39E296fD5dC15a662d9` (tem todos os tokens)
- Conta 1: `0x...` (use para receber tokens)
- Conta 2: `0x...` (use para receber tokens)

## 🎯 Próximos Passos

1. Teste transferências entre diferentes contas
2. Teste a função `approve` e `transferFrom`
3. Explore outras funcionalidades do contrato
4. Use o Remix IDE para interagir com todas as funções

