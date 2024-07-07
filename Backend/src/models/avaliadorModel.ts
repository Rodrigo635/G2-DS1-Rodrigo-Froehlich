// src/models/avaliadorModel.ts
import pool from '../database/dbConfig';

interface Avaliador {
  id: number;
  nome: string;
  login: string;
  senha: string;
}

class AvaliadorModel {
  async create(avaliadorData: Omit<Avaliador, 'id'>): Promise<Avaliador> {
    const { nome, login, senha } = avaliadorData;
    const result = await pool.query(
      'INSERT INTO avaliadores (nome, login, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome, login, senha]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Avaliador[]> {
    const result = await pool.query('SELECT * FROM avaliadores');
    return result.rows;
  }

  async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM avaliadores WHERE id = $1', [id]);
  }
}

export { Avaliador, AvaliadorModel };
