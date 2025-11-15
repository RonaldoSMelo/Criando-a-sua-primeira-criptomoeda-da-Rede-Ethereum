const MeuToken = artifacts.require("MeuToken");

contract("MeuToken", (accounts) => {
  let token;
  const nome = "Minha Primeira Criptomoeda";
  const simbolo = "MPC";
  const decimais = 18;
  const fornecimentoTotal = 1000000;

  beforeEach(async () => {
    token = await MeuToken.new(nome, simbolo, decimais, fornecimentoTotal);
  });

  describe("Informações do Token", () => {
    it("deve ter o nome correto", async () => {
      assert.equal(await token.name(), nome, "Nome do token incorreto");
    });

    it("deve ter o símbolo correto", async () => {
      assert.equal(await token.symbol(), simbolo, "Símbolo do token incorreto");
    });

    it("deve ter o número de decimais correto", async () => {
      assert.equal(await token.decimals(), decimais, "Número de decimais incorreto");
    });

    it("deve ter o fornecimento total correto", async () => {
      const expectedSupply = web3.utils.toBN(fornecimentoTotal).mul(web3.utils.toBN(10).pow(web3.utils.toBN(decimais)));
      const actualSupply = await token.totalSupply();
      assert.equal(actualSupply.toString(), expectedSupply.toString(), "Fornecimento total incorreto");
    });

    it("deve atribuir todo o fornecimento ao criador", async () => {
      const balance = await token.balanceOf(accounts[0]);
      const totalSupply = await token.totalSupply();
      assert.equal(balance.toString(), totalSupply.toString(), "Saldo inicial incorreto");
    });
  });

  describe("Transferências", () => {
    it("deve transferir tokens entre contas", async () => {
      const amount = web3.utils.toWei("100", "ether");
      await token.transfer(accounts[1], amount, { from: accounts[0] });

      const balance1 = await token.balanceOf(accounts[1]);
      assert.equal(balance1.toString(), amount, "Transferência falhou");
    });

    it("deve falhar se o saldo for insuficiente", async () => {
      const amount = web3.utils.toWei("2000000", "ether"); // Mais que o total supply
      
      try {
        await token.transfer(accounts[1], amount, { from: accounts[0] });
        assert.fail("Deveria ter lançado um erro");
      } catch (error) {
        assert(error.message.includes("Saldo insuficiente"), "Erro incorreto");
      }
    });

    it("deve emitir evento Transfer", async () => {
      const amount = web3.utils.toWei("50", "ether");
      const tx = await token.transfer(accounts[1], amount, { from: accounts[0] });

      assert.equal(tx.logs.length, 1, "Deve emitir um evento");
      assert.equal(tx.logs[0].event, "Transfer", "Deve ser um evento Transfer");
      assert.equal(tx.logs[0].args.from, accounts[0], "Endereço from incorreto");
      assert.equal(tx.logs[0].args.to, accounts[1], "Endereço to incorreto");
      assert.equal(tx.logs[0].args.value.toString(), amount, "Valor incorreto");
    });
  });

  describe("Aprovações", () => {
    it("deve aprovar tokens para gasto", async () => {
      const amount = web3.utils.toWei("100", "ether");
      await token.approve(accounts[1], amount, { from: accounts[0] });

      const allowance = await token.allowance(accounts[0], accounts[1]);
      assert.equal(allowance.toString(), amount, "Aprovação falhou");
    });

    it("deve emitir evento Approval", async () => {
      const amount = web3.utils.toWei("50", "ether");
      const tx = await token.approve(accounts[1], amount, { from: accounts[0] });

      assert.equal(tx.logs.length, 1, "Deve emitir um evento");
      assert.equal(tx.logs[0].event, "Approval", "Deve ser um evento Approval");
      assert.equal(tx.logs[0].args.owner, accounts[0], "Owner incorreto");
      assert.equal(tx.logs[0].args.spender, accounts[1], "Spender incorreto");
      assert.equal(tx.logs[0].args.value.toString(), amount, "Valor incorreto");
    });
  });

  describe("transferFrom", () => {
    it("deve transferir tokens usando allowance", async () => {
      const amount = web3.utils.toWei("100", "ether");
      
      // Aprovar primeiro
      await token.approve(accounts[1], amount, { from: accounts[0] });
      
      // Transferir usando transferFrom
      await token.transferFrom(accounts[0], accounts[2], amount, { from: accounts[1] });

      const balance2 = await token.balanceOf(accounts[2]);
      assert.equal(balance2.toString(), amount, "transferFrom falhou");

      // Verificar que a allowance foi reduzida
      const remainingAllowance = await token.allowance(accounts[0], accounts[1]);
      assert.equal(remainingAllowance.toString(), "0", "Allowance não foi reduzida");
    });

    it("deve falhar se a allowance for insuficiente", async () => {
      const amount = web3.utils.toWei("100", "ether");
      const transferAmount = web3.utils.toWei("150", "ether");
      
      await token.approve(accounts[1], amount, { from: accounts[0] });
      
      try {
        await token.transferFrom(accounts[0], accounts[2], transferAmount, { from: accounts[1] });
        assert.fail("Deveria ter lançado um erro");
      } catch (error) {
        assert(error.message.includes("Permissao insuficiente"), "Erro incorreto");
      }
    });
  });
});

