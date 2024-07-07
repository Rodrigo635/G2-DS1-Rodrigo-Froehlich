"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "../services/api";
// import { IUser } from "@/interfaces/IUser";

// Função assíncrona para buscar os usuários da API
// async function fetchUsers(): Promise<any> {
//   const result = await api.get("/users");
//   return result.data;
// }

export default function Home() {
  // Estados para armazenar os usuários, o estado de carregamento e os usuários filtrados
  // const [users, setUsers] = useState<IUser[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  // // Estado para armazenar o termo de busca do filtro por nome
  // const [searchTerm, setSearchTerm] = useState<string>("");

  // // Efeito para carregar os usuários quando o componente é montado
  // useEffect(() => {
  //   const getUsers = async () => {
  //     const usersData = await fetchUsers();
  //     // Atualiza os estados de usuários e usuários filtrados
  //     setUsers(usersData);
  //     setFilteredUsers(usersData);
  //     setLoading(false);
  //   };
  //   getUsers();
  // }, []);

  // // Função para lidar com a exclusão de um usuário
  // const handleDeleteUser = async (userId: number) => {
  //   try {
  //     await api.delete(`/users/${userId}`);
  //     // Atualiza a lista de usuários após a exclusão
  //     setUsers(users.filter((user) => user.id !== userId));
  //     setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
  //   } catch (error) {
  //     console.error("Erro ao excluir usuário:", error);
  //   }
  // };

  // // Função para filtrar os usuários por nome
  // const handleSearch = () => {
  //   const filtered = users.filter((user) =>
  //     user.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredUsers(filtered);
  // };

  // Renderização condicional enquanto os usuários estão sendo carregados
  // if (loading) {
  //   return (
  //     <main className="container mx-auto mt-8 px-4">
  //       <h1 className="text-3xl text-black font-bold mb-8 text-center">Carregando...</h1>
  //     </main>
  //   );
  // }

  // Renderização da página de usuários
  return (
    <main className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl text-gray-800 font-bold mb-8 text-center">Total</h1>
      <div className="flex mb-8 mt-8 justify-center items-center">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10">
            <div className="px-6 py-4 flex-grow flex flex-col justify-between">
              <h2 className="font-bold text-xl text-gray-700 text-center uppercase h-auto overflow-hidden">
                Equipes Cadastradas 
              </h2>
            </div>
            <div className="px-6 pb-4 flex items-center justify-center text-center">
              <span className="inline-block w-[30%] rounded-md px-3 py-1 text-xl font-semibold text-gray-700">
                5
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10">
            <div className="px-6 py-4 flex-grow flex flex-col justify-between">
              <h2 className="font-bold text-xl text-gray-700 text-center uppercase h-auto overflow-hidden">
                Avaliadores Cadastrados
              </h2>
            </div>
            <div className="px-6 pb-4 flex items-center justify-center text-center">
              <span className="inline-block w-[30%] rounded-md px-3 py-1 text-xl font-semibold text-gray-700">
                5
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10">
            <div className="px-6 py-4 flex-grow flex flex-col justify-between">
              <h2 className="font-bold text-xl text-gray-700 text-center uppercase h-auto overflow-hidden">
                Notas Atribuídas
              </h2>
            </div>
            <div className="px-6 pb-4 flex items-center justify-center text-center">
              <span className="inline-block w-[30%] rounded-md px-3 py-1 text-xl font-semibold text-gray-700">
                5
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
