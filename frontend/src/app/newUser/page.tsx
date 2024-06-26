"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
//import axios from "axios";
import api from "../../services/api";
import { IUserFormData } from "@/interfaces/IUser";

export default function NewUser() {
  const router = useRouter();
  const [formDataUser, setFormDataUser] = useState<IUserFormData>({
    name: "",
    cpf: "",
    email: "",
    birthdate: "",
    login: "",
    password: "",
    profile: "",
    status: true,
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(e.target.type);

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormDataUser((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    } else {
      setFormDataUser((prevFormData) => ({
        ...prevFormData, //mantém todos os outros dados intactos
        [name]: value, //altera o dado que está sendo modificado
        // por exemplo, ficaria assim: [name]: value --> cpf: 12
      }));
    }
  };

  const formatBirthDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const makePostRequest = async () => {
    try {
      const formattedBirthDate = formatBirthDate(formDataUser.birthdate);

      console.log(formDataUser, formattedBirthDate);

      const response = await api.post("/users", {
        ...formDataUser,
        birth_date: formattedBirthDate,
      });

      console.log("Dados enviados com sucesso!");
      console.log("Resposta:", response.data);
      router.push("/");
    } catch (error) {
      console.error("Erro:", error);
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
            value={formDataUser.name}
            onChange={handleChange}
            placeholder="Nome completo"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>CPF</label>
          <input
            type="text"
            name="cpf"
            value={formDataUser.cpf}
            onChange={handleChange}
            placeholder="xxx.xxx.xxx-xx"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>E-mail</label>
          <input
            type="text"
            name="email"
            value={formDataUser.email}
            onChange={handleChange}
            placeholder="E-mail"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Data de Nascimento</label>
          <input
            type="date"
            name="birthdate"
            value={formDataUser.birthdate}
            onChange={handleChange}
            placeholder="Data de Nascimento"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Login</label>
          <input
            type="text"
            name="login"
            value={formDataUser.login}
            onChange={handleChange}
            placeholder="Login"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Senha</label>
          <input
            type="password"
            name="password"
            value={formDataUser.password}
            onChange={handleChange}
            placeholder="Senha"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Tipo de Perfil</label>
          <input
            type="text"
            name="profile"
            value={formDataUser.profile}
            onChange={handleChange}
            placeholder="Tipo de Perfil"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Status</label>
          <input
            type="checkbox"
            name="status"
            checked={formDataUser.status}
            onChange={handleChange}
            placeholder="Status"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-row gap-6 items-center justify-center w-[97%]">
          <button
            type="button"
            onClick={makePostRequest}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cadastrar usuário
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
