"use client";
import React, { useState, useEffect } from "react";
import api from "../../services/api";

interface Avaliacao {
  id: number;
  avaliador_id: number;
  equipe_id: number;
  notas: JSON;
}

export default function Avaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [filteredAvaliacoes, setFilteredAvaliacoes] = useState<Avaliacao[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [equipeFilter, setEquipeFilter] = useState<number | null>(null);
  const [avaliadorFilter, setAvaliadorFilter] = useState<number | null>(null);

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
    let results = avaliacoes;

    if (searchTerm) {
      results = results.filter(avaliacao =>
        avaliacao.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (equipeFilter !== null) {
      results = results.filter(avaliacao => avaliacao.equipe_id === equipeFilter);
    }

    if (avaliadorFilter !== null) {
      results = results.filter(avaliacao => avaliacao.avaliador_id === avaliadorFilter);
    }

    setFilteredAvaliacoes(results);
  }, [searchTerm, equipeFilter, avaliadorFilter, avaliacoes]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEquipeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const equipeId = parseInt(e.target.value);
    setEquipeFilter(equipeId);
  };

  const handleAvaliadorFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const avaliadorId = parseInt(e.target.value);
    setAvaliadorFilter(avaliadorId);
  };

  return (
    <div className="min-h-screen flex flex-col items-center my-8">
      <h1 className="text-2xl text-black font-bold mb-4">Avaliações</h1>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Pesquisar por ID"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-black"
        />

        <div>
          <label htmlFor="equipeFilter" className="mr-2">Filtrar por Equipe:</label>
          <select
            id="equipeFilter"
            onChange={handleEquipeFilterChange}
            value={equipeFilter || ""}
            className="border border-gray-300 rounded-md px-3 py-2 text-black"
          >
            <option value="">Todas as Equipes</option>
            {avaliacoes.map(avaliacao => (
              <option key={avaliacao.equipe_id} value={avaliacao.equipe_id}>
                Equipe {avaliacao.equipe_id}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="avaliadorFilter" className="mr-2">Filtrar por Avaliador:</label>
          <select
            id="avaliadorFilter"
            onChange={handleAvaliadorFilterChange}
            value={avaliadorFilter || ""}
            className="border border-gray-300 rounded-md px-3 py-2 text-black"
          >
            <option value="">Todos os Avaliadores</option>
            {avaliacoes.map(avaliacao => (
              <option key={avaliacao.avaliador_id} value={avaliacao.avaliador_id}>
                Avaliador {avaliacao.avaliador_id}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="table-auto w-[80%] bg-white shadow-lg rounded-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-black border-b">ID</th>
            <th className="px-4 py-2 text-left text-black border-b">Avaliador ID</th>
            <th className="px-4 py-2 text-left text-black border-b">Equipe ID</th>
          </tr>
        </thead>

        <tbody>
          {filteredAvaliacoes.map(avaliacao => (
            <tr key={avaliacao.id} className="hover:bg-gray-200">
              <td className="px-4 py-2 text-left text-black border-b">{avaliacao.id}</td>
              <td className="px-4 py-2 text-left text-black border-b">{avaliacao.avaliador_id}</td>
              <td className="px-4 py-2 text-left text-black border-b">{avaliacao.equipe_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
