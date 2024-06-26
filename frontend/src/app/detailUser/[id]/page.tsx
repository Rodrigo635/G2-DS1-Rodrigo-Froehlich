"use client";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { IUser } from "@/interfaces/IUser";

// Definição da interface IUserParams para tipagem dos parâmetros da rota
interface IUserParams extends Params {
  id: string;
}

export default function UserDetails() {
  const router = useRouter();
  // Captura dos parâmetros da rota
  const params: IUserParams = useParams();
  const { id } = params;
  // Estado para armazenar os dados do usuário
  const [user, setUser] = useState<IUser | null>(null);

  // Efeito para buscar os dados do usuário ao carregar o componente
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Requisição para obter os dados do usuário com o ID fornecido
        const response = await api.get(`/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    // Verifica se o ID está definido e chama a função fetchUser
    if (id) {
      fetchUser();
    }
  }, [id]);

  // Função para voltar para a página anterior
  const handleGoBack = () => {
    router.back();
  };

  // Renderização condicional dos detalhes do usuário ou mensagem de carregamento
  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Detalhes do Usuário
      </h1>
      {user ? (
        // Renderização dos detalhes do usuário se os dados estiverem disponíveis
        <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10 p-6">
          <h2 className="font-bold text-xl text-black text-center uppercase mb-2">
            ID do Usuário: {user.id}
          </h2>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>Nome:</strong> {user.name}
          </p>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>Login:</strong> {user.login}
          </p>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>Senha:</strong> {user.password}
          </p>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>E-mail:</strong> {user.email}
          </p>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>Tipo de Perfil:</strong> {user.profile}
          </p>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>CPF:</strong> {user.cpf}
          </p>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>Data de Nascimento:</strong> {user.birthdate}
          </p>
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            <strong>Status:</strong> {user.status ? "Ativo" : "Inativo"}
          </p>
        </div>
      ) : (
        // Mensagem de carregamento enquanto os dados do usuário estão sendo buscados
        <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10 p-6">
          <p className="font-bold text-xl text-black text-center uppercase mb-2">
            Carregando...
          </p>
        </div>
      )}
      {/* Botão para voltar para a página anterior */}
      <div className="flex justify-center">
        <button
          onClick={handleGoBack}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
