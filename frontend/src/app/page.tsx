"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "../services/api";
import { IUser } from "@/interfaces/IUser";

// Função assíncrona para buscar os usuários da API
async function fetchUsers(): Promise<any> {
  const result = await api.get("/users");
  return result.data;
}

export default function Home() {
  // Estados para armazenar os usuários, o estado de carregamento e os usuários filtrados
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  // Estado para armazenar o termo de busca do filtro por nome
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Efeito para carregar os usuários quando o componente é montado
  useEffect(() => {
    const getUsers = async () => {
      const usersData = await fetchUsers();
      // Atualiza os estados de usuários e usuários filtrados
      setUsers(usersData);
      setFilteredUsers(usersData);
      setLoading(false);
    };
    getUsers();
  }, []);

  // Função para lidar com a exclusão de um usuário
  const handleDeleteUser = async (userId: number) => {
    try {
      await api.delete(`/users/${userId}`);
      // Atualiza a lista de usuários após a exclusão
      setUsers(users.filter((user) => user.id !== userId));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  // Função para filtrar os usuários por nome
  const handleSearch = () => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Renderização condicional enquanto os usuários estão sendo carregados
  if (loading) {
    return (
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Carregando...</h1>
      </main>
    );
  }

  // Renderização da página de usuários
  return (
    <main className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Users</h1>
      {/* Formulário de filtro por nome */}
      <div className="flex mb-8 mt-8 justify-center items-center">
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 text-black rounded-md px-3 py-2 mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Filtrar
        </button>
      </div>
      {/* Lista de usuários renderizada */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Verificação se existem usuários a serem exibidos */}
        {filteredUsers.length > 0 ? (
          // Mapeamento e renderização dos usuários filtrados
          filteredUsers.map((user: IUser) => {
            return (
              <div
                key={user.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10"
              >
                <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                  {/* Nome do usuário */}
                  <h2 className="font-bold text-xl text-black text-center uppercase mb-2 h-auto overflow-hidden">
                    {user.name}
                  </h2>
                </div>

                <div className="px-6 pt-4 pb-4 flex items-center justify-center text-center">
                  {/* Informações adicionais do usuário */}
                  <span className="inline-block w-[30%] bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    ID: {user.id}
                  </span>
                  <span className="inline-block w-[30%] bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {user.status ? "ATIVO" : "INATIVO"}
                  </span>
                </div>
                <div className="px-6 pt-4 pb-4 flex items-center justify-center text-center">
                  {/* Botões de ação para exclusão, edição e detalhes */}
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Excluir
                  </button>
                  <Link href={`/editUser/${user.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                      Editar
                    </button>
                  </Link>
                  <Link href={`/detailUser/${user.id}`}>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                      Detalhes
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          // Mensagem de nenhum usuário encontrado
          <h1>Nenhum usuário encontrado!</h1>
        )}
      </section>
    </main>
  );
}
