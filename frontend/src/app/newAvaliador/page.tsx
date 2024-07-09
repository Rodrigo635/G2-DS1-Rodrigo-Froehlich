"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";
import { IAvaliadorFormData } from "@/interfaces/IAvaliador";

export default function CadastrarAvaliador() {
  const router = useRouter();
  const [formDataAvaliador, setFormDataAvaliador] = useState<IAvaliadorFormData>({
    nome: "",
    login: "",
    senha: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormDataAvaliador((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const makePostRequest = async () => {
    try {
      const response = await api.post("/avaliador", formDataAvaliador);
      console.log("Avaliador cadastrado com sucesso!");
      console.log("Resposta:", response.data);
      router.push("/avaliadores");
    } catch (error) {
      console.error("Erro ao cadastrar avaliador:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center my-8">
      <form className="flex flex-col gap-3 p-12 items-center w-[50%] bg-white mb-28 shadow-lg rounded-md border-white border-2 border-spacing-2">
        <div className="flex flex-col gap-3 items-start w-[97%]">

          <h1 className="text-2xl text-black font-bold mb-4">
            Cadastrar novo avaliador
          </h1>

          <label className="text-black">Nome do avaliador</label>
          <input
            type="text"
            name="nome"
            value={formDataAvaliador.nome}
            onChange={handleChange}
            placeholder="Nome completo"
            className="border border-gray-300 w-[100%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-start w-[97%]">
          <label className="text-black">Login</label>
          <input
            type="text"
            name="login"
            value={formDataAvaliador.login}
            onChange={handleChange}
            placeholder="Login"
            className="border border-gray-300 w-[100%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-start w-[97%]">
          <label className="text-black">Senha</label>
          <input
            type="password"
            name="senha"
            value={formDataAvaliador.senha}
            onChange={handleChange}
            placeholder="Senha"
            className="border border-gray-300 w-[100%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-row gap-6 items-center w-[97%]">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Cancelar
          </button>

          <button
            type="button"
            onClick={makePostRequest}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Cadastrar avaliador
          </button>
        </div>
        
      </form>
    </div>
  );
}
