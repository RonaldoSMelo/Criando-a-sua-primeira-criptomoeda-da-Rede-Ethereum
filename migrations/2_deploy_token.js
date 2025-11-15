const MeuToken = artifacts.require("MeuToken");

module.exports = function (deployer) {
  // Parâmetros do token: nome, símbolo, decimais, fornecimento total
  const nome = "Minha Primeira Criptomoeda";
  const simbolo = "MPC";
  const decimais = 18;
  const fornecimentoTotal = 1000000; // 1 milhão de tokens
  
  deployer.deploy(MeuToken, nome, simbolo, decimais, fornecimentoTotal);
};

