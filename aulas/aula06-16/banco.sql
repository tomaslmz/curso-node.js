CREATE DATABASE sistemadecadastro;

USE sistemadecadastro;

CREATE TABLE usuarios(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    idade INT NOT NULL
);

INSERT INTO usuarios (nome, email, idade) VALUES ("Tomás", "tomas153lm@gmail.com", 18);

SELECT * FROM usuarios;