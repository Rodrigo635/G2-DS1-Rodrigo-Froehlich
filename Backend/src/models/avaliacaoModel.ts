import pool from '../database/dbConfig';

interface Avaliacao {
  id: number;
  avaliador_id: number;
  equipe_id: number;
  notas: object;
}

class AvaliacaoModel {
  async create(avaliacaoData: Omit<Avaliacao, 'id'>): Promise<Avaliacao> {
    const { avaliador_id, equipe_id, notas } = avaliacaoData;
    const result = await pool.query(
      'INSERT INTO avaliacoes (avaliador_id, equipe_id, notas) VALUES ($1, $2, $3) RETURNING *',
      [avaliador_id, equipe_id, notas]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Avaliacao[]> {
    const result = await pool.query('SELECT * FROM avaliacoes');
    return result.rows;
  }

  async findByEquipe(equipe_id: number): Promise<Avaliacao[]> {
    const result = await pool.query(
      'SELECT * FROM avaliacoes WHERE equipe_id = $1',
      [equipe_id]
    );
    return result.rows;
  }

  async findByAvaliador(avaliador_id: number): Promise<Avaliacao[]> {
    const result = await pool.query(
      'SELECT * FROM avaliacoes WHERE avaliador_id = $1',
      [avaliador_id]
    );
    return result.rows;
  }
}

export { Avaliacao, AvaliacaoModel };
