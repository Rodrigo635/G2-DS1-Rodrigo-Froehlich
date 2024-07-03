"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
//import axios from "axios";
import api from "../../services/api";
import { IUserFormData } from "@/interfaces/IUser";

export default function CadastrarEquipe() {
  return (
    <div className="min-h-screen flex flex-col items-center my-8">
        <h1 className="text-2xl text-black font-bold mb-4">
            Cadastrar nova equipe 
        </h1>
    </div>
  );
}
