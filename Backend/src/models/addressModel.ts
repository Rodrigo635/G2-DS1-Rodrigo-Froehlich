// src/models/addressModel.ts
import pool from "../database/dbConfig";

interface Address {
  id?: number;
  user_id: number;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

class AddressModel {
  async create(address: Address): Promise<Address> {
    const { user_id, street, city, state, zip_code, country } = address;
    const result = await pool.query(
      "INSERT INTO enderecos (user_id, street, city, state, zip_code, country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [user_id, street, city, state, zip_code, country]
    );
    return result.rows[0];
  }

  async findAllByUserId(user_id: number): Promise<Address[]> {
    const result = await pool.query(
      "SELECT * FROM enderecos WHERE user_id = $1",
      [user_id]
    );
    return result.rows;
  }

  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM enderecos WHERE id = $1", [id]);
  }
}

export { Address, AddressModel };
