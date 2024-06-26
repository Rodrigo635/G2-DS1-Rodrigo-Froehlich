"use client";

import { useState, useEffect } from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";
import api from "../../../services/api";
import { IUserFormData } from "@/interfaces/IUser";

interface IPostParams extends Params {
  id: number;
}

export default function EditUser() {
  const router = useRouter();
  const params: IPostParams = useParams();
  const { id } = params;
  const [user, setUser] = useState<IUserFormData>({
    name: "",
    cpf: "",
    email: "",
    birthdate: "",
    login: "",
    password: "",
    profile: "",
    status: true,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(id);
        const response = await api.get(`/users/${id}`);
        const userData: IUserFormData = response.data;

        // Converte a data de nascimento para o formato "YYYY-MM-DD"
        const formattedBirthDate = new Date(userData.birthdate)
          .toISOString()
          .split("T")[0];

        // Atualiza o estado do usuário com a data formatada
        setUser({ ...userData, birthdate: formattedBirthDate });
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setUser((prevUser) => ({
        ...prevUser,
        [name]: checked,
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const formatBirthDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleUpdateUser = async () => {
    try {
      const formattedBirthDate = formatBirthDate(user.birthdate);
      console.log(id);
      const response = await api.put(`/users/${id}`, {
        ...user,
        birthdate: formattedBirthDate,
      });

      console.log("Dados atualizados com sucesso!");
      console.log("Resposta:", response.data);
      router.push("/");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center my-8">
      <form className="flex flex-col gap-3 p-12 items-center w-[50%] bg-slate-700 rounded-md border-white border-2 border-spacing-2">
        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Nome Completo</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>CPF</label>
          <input
            type="text"
            name="cpf"
            value={user.cpf}
            onChange={handleChange}
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>E-mail</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Data de Nascimento</label>
          <input
            type="date"
            name="birthdate"
            value={user.birthdate}
            onChange={handleChange}
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Login</label>
          <input
            type="text"
            name="login"
            value={user.login}
            onChange={handleChange}
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Senha</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Tipo de Perfil</label>
          <input
            type="text"
            name="profile"
            value={user.profile}
            onChange={handleChange}
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Status</label>
          <input
            type="checkbox"
            name="active"
            checked={user.status}
            onChange={handleChange}
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-row gap-6 items-center justify-center w-[97%]">
          <button
            type="button"
            onClick={handleUpdateUser}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Atualizar usuário
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
