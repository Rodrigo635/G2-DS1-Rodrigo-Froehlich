"use client";
import { useState, useEffect } from "react";
import api from "../../services/api";

interface Avaliacao {
  id: number;
  avaliador_id: number;
  equipe_id: number;
  notas: any;
}

export default function Avaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredAvaliacoes, setFilteredAvaliacoes] = useState<Avaliacao[]>([]);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const response = await api.get("/avaliacao");
        setAvaliacoes(response.data);
        setFilteredAvaliacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
      }
    };

    fetchAvaliacoes();
  }, []);

  useEffect(() => {
    const results = avaliacoes.filter((avaliacao) =>
      avaliacao.id.toString().includes(searchTerm.toLowerCase())
    );
    setFilteredAvaliacoes(results);
  }, [searchTerm, avaliacoes]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center my-8">
      <h1 className="text-2xl text-black font-bold mb-4">Avaliações</h1>

      <input
        type="text"
        placeholder="Pesquisar por ID"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-9 text-black"
      />

      <table className="table-auto w-[80%] bg-white shadow-lg rounded-md">
        <thead>
          <tr className="bg-gray-100 justify-between">
            <th className="px-4 py-2 text-left text-black border-b">ID</th>
            <th className="px-4 py-2 text-left text-black border-b">Avaliador ID</th>
            <th className="px-4 py-2 text-left text-black border-b">Equipe ID</th>
          </tr>
        </thead>

        <tbody>
          {filteredAvaliacoes.map((avaliacao) => (
            <tr className="hover:bg-gray-100" key={avaliacao.id}>
              <td className="px-4 text-left text-black py-2 border-b">{avaliacao.id}</td>
              <td className="px-4 text-left text-black py-2 border-b">{avaliacao.avaliador_id}</td>
              <td className="px-4 text-left text-black py-2 border-b">{avaliacao.equipe_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
