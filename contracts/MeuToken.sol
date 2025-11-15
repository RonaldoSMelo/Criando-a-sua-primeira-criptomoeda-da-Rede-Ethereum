// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title MeuToken
 * @dev Implementação de um token ERC-20 simples
 * @notice Este contrato implementa o padrão ERC-20 para criar uma criptomoeda na rede Ethereum
 */
contract MeuToken {
    // Variáveis de estado
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    
    // Mapeamento de endereços para saldos
    mapping(address => uint256) public balanceOf;
    
    // Mapeamento de permissões (allowance)
    mapping(address => mapping(address => uint256)) public allowance;
    
    // Eventos do padrão ERC-20
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    /**
     * @dev Construtor do contrato
     * @param _name Nome do token
     * @param _symbol Símbolo do token
     * @param _decimals Número de casas decimais
     * @param _totalSupply Fornecimento total inicial do token
     */
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _totalSupply
    ) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _totalSupply * 10**uint256(_decimals);
        
        // Atribui todo o fornecimento inicial ao criador do contrato
        balanceOf[msg.sender] = totalSupply;
        
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    /**
     * @dev Transfere tokens para um endereço
     * @param _to Endereço de destino
     * @param _value Quantidade de tokens a transferir
     * @return success Retorna true se a transferência foi bem-sucedida
     */
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Saldo insuficiente");
        require(_to != address(0), "Endereco invalido");
        
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    /**
     * @dev Aprova um endereço para gastar tokens em nome do remetente
     * @param _spender Endereço que será autorizado
     * @param _value Quantidade de tokens aprovados
     * @return success Retorna true se a aprovação foi bem-sucedida
     */
    function approve(address _spender, uint256 _value) public returns (bool success) {
        require(_spender != address(0), "Endereco invalido");
        
        allowance[msg.sender][_spender] = _value;
        
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    /**
     * @dev Transfere tokens de um endereço para outro usando a permissão (allowance)
     * @param _from Endereço de origem
     * @param _to Endereço de destino
     * @param _value Quantidade de tokens a transferir
     * @return success Retorna true se a transferência foi bem-sucedida
     */
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value, "Saldo insuficiente");
        require(allowance[_from][msg.sender] >= _value, "Permissao insuficiente");
        require(_to != address(0), "Endereco invalido");
        
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        
        emit Transfer(_from, _to, _value);
        return true;
    }
}

