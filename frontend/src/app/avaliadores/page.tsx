"use client";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { FaTrash } from "react-icons/fa";

interface Avaliador {
  id: number;
  nome: string;
  login: string;
}

export default function Avaliadores() {
  const [avaliadores, setAvaliadores] = useState<Avaliador[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredAvaliadores, setFilteredAvaliadores] = useState<Avaliador[]>([]);

  useEffect(() => {
    const fetchAvaliadores = async () => {
      try {
        const response = await api.get("/avaliador");
        setAvaliadores(response.data);
        setFilteredAvaliadores(response.data);
      } catch (error) {
        console.error("Erro ao buscar avaliadores:", error);
      }
    };

    fetchAvaliadores();
  }, []);

  useEffect(() => {
    const results = avaliadores.filter((avaliador) =>
      avaliador.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAvaliadores(results);
  }, [searchTerm, avaliadores]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteAvaliador = async (id: number) => {
    try {
      await api.delete(`/avaliador/${id}`);
      const updatedAvaliadores = avaliadores.filter((avaliador) => avaliador.id !== id);
      setAvaliadores(updatedAvaliadores);
      setFilteredAvaliadores(updatedAvaliadores);
      console.log(`Avaliador com ID ${id} deletado com sucesso.`);
    } catch (error) {
      console.error(`Erro ao deletar avaliador com ID ${id}:`, error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center my-8">
      <h1 className="text-2xl text-black font-bold mb-4">Avaliadores</h1>

      <input
        type="text"
        placeholder="Pesquisar por nome"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-9 text-black"
      />

      <table className="table-auto w-[80%] bg-white shadow-lg rounded-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-black border-b">ID</th>
            <th className="px-4 py-2 text-left text-black border-b">Nome</th>
            <th className="px-4 py-2 text-left text-black border-b">Login</th>
            <th className="px-4 py-2 text-left text-black border-b">Ações</th>
          </tr>
        </thead>

        <tbody>
          {filteredAvaliadores.map((avaliador) => (
            <tr className="hover:bg-gray-200" key={avaliador.id}>
              <td className="px-4 text-left text-black py-2 border-b">{avaliador.id}</td>
              <td className="px-4 text-left text-black py-2 border-b">{avaliador.nome}</td>
              <td className="px-4 text-left text-black py-2 border-b">{avaliador.login}</td>
              <td className="px-4 text-left py-2 border-b">
                <button
                  onClick={() => handleDeleteAvaliador(avaliador.id)}
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
