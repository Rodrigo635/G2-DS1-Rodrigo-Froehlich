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
  notas: {
    [Criterio.ORIGINALIDADE]: number;
    [Criterio.IMPACTO_POTENCIAL]: number;
    [Criterio.EXECUCAO_TECNICA]: number;
    [Criterio.APRESENTACAO]: number;
    [Criterio.VIABILIDADE]: number;
  };
}

enum Criterio {
  ORIGINALIDADE = 'Originalidade do Projeto - Qual a inovação e originalidade do projeto apresentado pela equipe?',
  IMPACTO_POTENCIAL = 'Impacto Potencial - Qual o impacto potencial do projeto na sociedade ou no mercado?',
  EXECUCAO_TECNICA = 'Execução Técnica - Qual a qualidade da execução técnica e da implementação do projeto?',
  APRESENTACAO = 'Apresentação e Demonstração - Quão clara e eficaz foi a apresentação e demonstração do projeto pela equipe?',
  VIABILIDADE = 'Viabilidade e Sustentabilidade - Quão viável e sustentável é o projeto a longo prazo?'
}

export default function NewAvaliacao() {
  const router = useRouter();
  const [avaliadores, setAvaliadores] = useState<IAvaliador[]>([]);
  const [equipes, setEquipes] = useState<IEquipe[]>([]);
  const [avaliadorSelecionado, setAvaliadorSelecionado] = useState<number>(0);
  const [equipeSelecionada, setEquipeSelecionada] = useState<number>(0);
  const [notas, setNotas] = useState({
    [Criterio.ORIGINALIDADE]: 0,
    [Criterio.IMPACTO_POTENCIAL]: 0,
    [Criterio.EXECUCAO_TECNICA]: 0,
    [Criterio.APRESENTACAO]: 0,
    [Criterio.VIABILIDADE]: 0,
  });

  useEffect(() => {
    const fetchAvaliadores = async () => {
      try {
        const response = await api.get("/avaliador");
        setAvaliadores(response.data);
      } catch (error) {
        console.error("Erro ao buscar avaliadores:", error);
      }
    };

    const fetchEquipes = async () => {
      try {
        const response = await api.get("/equipe");
        setEquipes(response.data);
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

  const handleNotaChange = (e: React.ChangeEvent<HTMLInputElement>, criterio: Criterio) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 10) {
      setNotas({ ...notas, [criterio]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: IAvaliacaoFormData = {
      avaliador_id: avaliadorSelecionado,
      equipe_id: equipeSelecionada,
      notas: notas,
    };

    try {
      const response = await api.post("/avaliacao", formData);
      console.log("Avaliação cadastrada com sucesso:", response.data);
      setAvaliadorSelecionado(0);
      setEquipeSelecionada(0);
      setNotas({
        [Criterio.ORIGINALIDADE]: 0,
        [Criterio.IMPACTO_POTENCIAL]: 0,
        [Criterio.EXECUCAO_TECNICA]: 0,
        [Criterio.APRESENTACAO]: 0,
        [Criterio.VIABILIDADE]: 0,
      });
    } catch (error) {
      console.error("Erro ao cadastrar avaliação:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center my-8 mb-28">
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

        {Object.values(Criterio).map((criterio) => (
          <div className="mb-4" key={criterio}>
            <label className="block text-black text-sm font-bold mb-2">
              {criterio.charAt(0).toUpperCase() + criterio.slice(1)} (0-10):
            </label>
            <input
              type="number"
              min="0"
              max="10"
              step="1"
              value={notas[criterio]}
              onChange={(e) => handleNotaChange(e, criterio)}
              className="border border-gray-300 w-full rounded-md px-3 py-2 text-black"
            />
          </div>
        ))}

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
