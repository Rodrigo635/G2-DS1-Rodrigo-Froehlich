"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";
import { IEquipeFormData } from "@/interfaces/IEquipe";

export default function CadastrarEquipe() {
  const router = useRouter();
  const [formDataEquipe, setFormDataEquipe] = useState<IEquipeFormData>({
    nome: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormDataEquipe((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const makePostRequest = async () => {
    try {
      const response = await api.post("/equipe", formDataEquipe);
      console.log("Equipe cadastrada com sucesso!");
      console.log("Resposta:", response.data);
      router.push("/equipes");
    } catch (error) {
      console.error("Erro ao cadastrar equipe:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center my-8">
      <form className="flex flex-col gap-3 p-12 items-center w-[50%] bg-white mb-28 shadow-lg rounded-md border-white border-2 border-spacing-2">
        <div className="flex flex-col gap-3 items-start w-[97%]">
          <h1 className="text-2xl text-black font-bold mb-4">
            Cadastrar nova equipe
          </h1>
          <label className="text-black">Nome da equipe</label>
          <input
            type="text"
            name="nome"
            value={formDataEquipe.nome}
            onChange={handleChange}
            placeholder="Nome da equipe"
            className="border border-gray-300 w-[100%] rounded-md px-3 py-2 mb-3 text-black"
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
            type="button"
            onClick={makePostRequest}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cadastrar equipe
          </button>
        </div>
      </form>
    </div>
  );
}
