"use client";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { FaTrash } from "react-icons/fa";

interface Equipe {
  id: number;
  nome: string;
}

export default function Equipes() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredEquipes, setFilteredEquipes] = useState<Equipe[]>([]);

  useEffect(() => {
    const fetchEquipes = async () => {
      try {
        const response = await api.get("/equipe");
        setEquipes(response.data);
        setFilteredEquipes(response.data);
      } catch (error) {
        console.error("Erro ao buscar equipes:", error);
      }
    };
    fetchEquipes();
  }, []);

  useEffect(() => {
    const results = equipes.filter((equipe) =>
      equipe.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEquipes(results);
  }, [searchTerm, equipes]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteEquipe = async (id: number) => {
    try {
      await api.delete(`/equipe/${id}`);
      const updatedEquipes = equipes.filter((equipe) => equipe.id !== id);
      setEquipes(updatedEquipes);
      setFilteredEquipes(updatedEquipes);
      console.log(`Equipe com ID ${id} deletada com sucesso.`);
    } catch (error) {
      console.error(`Erro ao deletar equipe com ID ${id}:`, error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center my-8">
      <h1 className="text-2xl text-black font-bold mb-4">Equipes</h1>

      <input
        type="text"
        placeholder="Pesquisar por nome"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-9 text-black"
      />

      <table className="table-auto w-[80%] bg-white shadow-lg rounded-md">
        <thead>
          <tr className="bg-gray-100 justify-between">
            <th className="px-4 py-2 text-left text-black border-b">ID</th>
            <th className="px-4 py-2 text-left text-black border-b">Nome</th>
            <th className="px-4 py-2 text-left text-black border-b"></th>
          </tr>
        </thead>

        <tbody >
          {filteredEquipes.map((equipe) => (
            <tr className="hover:bg-gray-200" key={equipe.id}>
              <td className="px-4 text-left text-black py-2 border-b">{equipe.id}</td>
              <td className="px-4 text-left text-black py-2 border-b">{equipe.nome}</td>
              <td className="px-4 text-left py-2 border-b">
                <button
                  onClick={() => handleDeleteEquipe(equipe.id)}
                  className="flex items-center text-red-500 hover:text-red-700"
                >
                  <FaTrash className="mr-1" />
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
