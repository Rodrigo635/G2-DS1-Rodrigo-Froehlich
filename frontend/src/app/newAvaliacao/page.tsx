"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";

interface IAvaliador {
  id: number;
  nome: string;
}

interface IEquipe {
  id: number;
  nome: string;
}

export interface IAvaliacaoFormData {
  avaliador_id: number;
  equipe_id: number;
  notas: { nota: number };
}

export default function NewAvaliacao() {
    const router = useRouter();
    const [avaliadores, setAvaliadores] = useState<IAvaliador[]>([]);
    const [equipes, setEquipes] = useState<IEquipe[]>([]);
    const [avaliadorSelecionado, setAvaliadorSelecionado] = useState<number>(0);
    const [equipeSelecionada, setEquipeSelecionada] = useState<number>(0);
    const [nota, setNota] = useState<number>(0);
  
    useEffect(() => {
      const fetchAvaliadores = async () => {
        try {
          const response = await api.get("/avaliador");
          setAvaliadores(response.data); // Verifique se response.data contém um array de avaliadores com id e nome
        } catch (error) {
          console.error("Erro ao buscar avaliadores:", error);
        }
      };
  
      const fetchEquipes = async () => {
        try {
          const response = await api.get("/equipe");
          setEquipes(response.data); // Verifique se response.data contém um array de equipes com id e nome
        } catch (error) {
          console.error("Erro ao buscar equipes:", error);
        }
      };
  
      fetchAvaliadores();
      fetchEquipes();
    }, []);
  
    const handleAvaliadorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setAvaliadorSelecionado(Number(e.target.value));
    };
  
    const handleEquipeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setEquipeSelecionada(Number(e.target.value));
    };
  
    const handleNotaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (!isNaN(value) && value >= 0 && value <= 10) {
        setNota(value);
      }
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const formData: IAvaliacaoFormData = {
        avaliador_id: avaliadorSelecionado,
        equipe_id: equipeSelecionada,
        notas: { nota: nota },
      };
  
      try {
        const response = await api.post("/avaliacao", formData);
        console.log("Avaliação cadastrada com sucesso:", response.data);
        setAvaliadorSelecionado(0);
        setEquipeSelecionada(0);
        setNota(0);
      } catch (error) {
        console.error("Erro ao cadastrar avaliação:", error);
      }
    };
  
    return (
      <div className="min-h-screen flex flex-col items-center my-8">
        <h1 className="text-2xl text-black font-bold mb-4">Nova Avaliação</h1>
  
        <form onSubmit={handleSubmit} className="w-[50%] bg-white shadow-lg rounded-md px-6 py-4">
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">Selecione o Avaliador:</label>
            <select
              value={avaliadorSelecionado}
              onChange={handleAvaliadorChange}
              className="border border-gray-300 w-full rounded-md px-3 py-2 text-black"
            >
              <option value={0}>Selecione um avaliador...</option>
              {avaliadores.map((avaliador) => (
                <option key={avaliador.id} value={avaliador.id}>
                  {avaliador.nome}
                </option>
              ))}
            </select>
          </div>
  
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">Selecione a Equipe:</label>
            <select
              value={equipeSelecionada}
              onChange={handleEquipeChange}
              className="border border-gray-300 w-full rounded-md px-3 py-2 text-black"
            >
              <option value={0}>Selecione uma equipe...</option>
              {equipes.map((equipe) => (
                <option key={equipe.id} value={equipe.id}>
                  {equipe.nome}
                </option>
              ))}
            </select>
          </div>
  
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">Insira a Nota (0-10):</label>
            <input
              type="number"
              min="0"
              max="10"
              step="1"
              value={nota}
              onChange={handleNotaChange}
              className="border border-gray-300 w-full rounded-md px-3 py-2 text-black"
            />
          </div>
          
          <div className="flex flex-row gap-6 items-center w-[97%]">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
  
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Cadastrar Avaliação
            </button>
          </div>
        </form>
      </div>
    );
  }