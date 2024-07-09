"use client";

import React, { useState, useEffect } from "react";
import api from "../services/api";
import backgroundImage from './becker.jpg'; // Ajuste o caminho se necessário

export default function Home() {
  const [equipesCount, setEquipesCount] = useState<number | null>(null);
  const [avaliadoresCount, setAvaliadoresCount] = useState<number | null>(null);
  const [avaliacoesCount, setAvaliacoesCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [equipesRes, avaliadoresRes, avaliacoesRes] = await Promise.all([
          api.get('/equipe'),
          api.get('/avaliador'),
          api.get('/avaliacao'),
        ]);

        setEquipesCount(equipesRes.data.length);
        setAvaliadoresCount(avaliadoresRes.data.length);
        setAvaliacoesCount(avaliacoesRes.data.length);
      } catch (error) {
        console.error('Failed to fetch counts:', error);
      }
    }

    fetchCounts();
  }, []);

  return (
    <main 
      className="container mx-auto mt-8 px-4 bg-cover bg-center h-screen" 
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      <h1 className="text-3xl text-gray-800 font-bold mb-8 text-center">Total</h1>
      <div className="flex mb-8 mt-8 justify-center items-center">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <a href="/equipes">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10">
              <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                <h2 className="font-bold text-xl text-gray-700 text-center uppercase h-auto overflow-hidden">
                  Equipes Cadastradas 
                </h2>
              </div>
              <div className="px-6 pb-4 flex items-center justify-center text-center">
                <span className="inline-block w-[30%] rounded-md px-3 py-1 text-xl font-semibold text-gray-700">
                  {equipesCount !== null ? equipesCount : 'Loading...'}
                </span>
              </div>
            </div>
          </a>
          <a href="/avaliadores">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10">
              <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                <h2 className="font-bold text-xl text-gray-700 text-center uppercase h-auto overflow-hidden">
                  Avaliadores Cadastrados
                </h2>
              </div>
              <div className="px-6 pb-4 flex items-center justify-center text-center">
                <span className="inline-block w-[30%] rounded-md px-3 py-1 text-xl font-semibold text-gray-700">
                  {avaliadoresCount !== null ? avaliadoresCount : 'Loading...'}
                </span>
              </div>
            </div>
          </a>
          <a href="/avaliacoes">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10">
              <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                <h2 className="font-bold text-xl text-gray-700 text-center uppercase h-auto overflow-hidden">
                  Notas Atribuídas
                </h2>
              </div>
              <div className="px-6 pb-4 flex items-center justify-center text-center">
                <span className="inline-block w-[30%] rounded-md px-3 py-1 text-xl font-semibold text-gray-700">
                  {avaliacoesCount !== null ? avaliacoesCount : '0'}
                </span>
              </div>
            </div>
          </a>
        </section>
      </div>
    </main>
  );
}
