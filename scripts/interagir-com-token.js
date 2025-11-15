/**
 * Script para interagir com o token após o deploy
 * Execute com: node scripts/interagir-com-token.js
 * 
 * NOTA: Este script requer que você tenha feito o deploy do contrato
 * e tenha o arquivo de build gerado pelo Truffle
 */

const MeuToken = artifacts.require("MeuToken");

module.exports = async function(callback) {
  try {
    // Obter instância do contrato deployado
    const token = await MeuToken.deployed();
    
    // Obter contas disponíveis
    const accounts = await web3.eth.getAccounts();
    console.log("\n=== Informações do Token ===\n");
    
    // Informações básicas
    const name = await token.name();
    const symbol = await token.symbol();
    const decimals = await token.decimals();
    const totalSupply = await token.totalSupply();
    
    console.log(`Nome: ${name}`);
    console.log(`Símbolo: ${symbol}`);
    console.log(`Decimais: ${decimals}`);
    console.log(`Fornecimento Total: ${web3.utils.fromWei(totalSupply.toString(), 'ether')} ${symbol}`);
    
    console.log("\n=== Saldos das Contas ===\n");
    
    // Verificar saldos das primeiras 3 contas
    for (let i = 0; i < Math.min(3, accounts.length); i++) {
      const balance = await token.balanceOf(accounts[i]);
      console.log(`Conta ${i} (${accounts[i]}): ${web3.utils.fromWei(balance.toString(), 'ether')} ${symbol}`);
    }
    
    // Exemplo de transferência (descomente para usar)
    /*
    console.log("\n=== Realizando Transferência ===\n");
    const amount = web3.utils.toWei('100', 'ether');
    console.log(`Transferindo 100 ${symbol} de ${accounts[0]} para ${accounts[1]}...`);
    
    const tx = await token.transfer(accounts[1], amount, { from: accounts[0] });
    console.log(`Transferência realizada! Hash: ${tx.tx}`);
    
    // Verificar novos saldos
    const balance0 = await token.balanceOf(accounts[0]);
    const balance1 = await token.balanceOf(accounts[1]);
    console.log(`\nNovo saldo da conta 0: ${web3.utils.fromWei(balance0.toString(), 'ether')} ${symbol}`);
    console.log(`Novo saldo da conta 1: ${web3.utils.fromWei(balance1.toString(), 'ether')} ${symbol}`);
    */
    
    callback();
  } catch (error) {
    console.error("Erro:", error);
    callback(error);
  }
};

