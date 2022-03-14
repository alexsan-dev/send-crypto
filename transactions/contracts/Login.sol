// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Login {
    // ESTRUCTURAS
    struct User {
        address wallet;
        string name;
        string username;
        string password;
        bool isLogged;
    }

    mapping(address => User) users;
    uint256 usersCounter;

    // EVENTOS
    event SaveUser(
        address wallet,
        string name,
        string username,
        string password
    );

    // AGREGAR USUARIOS
    function signing(
        address _wallet,
        string memory _name,
        string memory _username,
        string memory _password
    ) public {
        require(bytes(_password).length != 0, "The password is required");
        require(bytes(_name).length != 0, "The name is required");
        require(bytes(_username).length != 0, "The username is required");

        usersCounter += 1;
        users[_wallet] = User(_wallet, _name, _username, _password, false);
        emit SaveUser(_wallet, _name, _username, _password);
    }

    // INICIAR SESION
    function login(address _wallet, string memory _password)
        public
        returns (bool)
    {
        if (
            keccak256(abi.encodePacked(users[_wallet].password)) ==
            keccak256(abi.encodePacked(_password))
        ) {
            users[_wallet].isLogged = true;
            return true;
        } else {
            return false;
        }
    }

    // CERRAR SESION
    function logout(address _wallet) public {
        users[_wallet].isLogged = false;
    }

    // OBTENER USUARIO
    function getUser(address wallet) public view returns (User memory) {
        return users[wallet];
    }

    // OBTENER CONTADOR
    function getUsersCounter() public view returns (uint256) {
        return usersCounter;
    }
}
