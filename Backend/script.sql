CREATE DATABASE hackathon_db;

\c hackathon_db

CREATE TABLE avaliadores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE equipes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE avaliacoes (
    id SERIAL PRIMARY KEY,
    avaliador_id INT REFERENCES avaliadores(id) ON DELETE CASCADE NOT NULL,
    equipe_id INT REFERENCES equipes(id) ON DELETE CASCADE NOT NULL,
    notas JSONB NOT NULL
);
