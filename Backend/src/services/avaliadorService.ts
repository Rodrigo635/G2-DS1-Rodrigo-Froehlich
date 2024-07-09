 import { Avaliador, AvaliadorModel } from '../models/avaliadorModel';
 const bcrypt = require("bcrypt");

 class AvaliadorService {
   private avaliadorModel: AvaliadorModel;
 
   constructor() {
     this.avaliadorModel = new AvaliadorModel();
   }
 
   async createAvaliador(nome: string, login: string, senha: string): Promise<Avaliador> {
     const avaliadorData = { nome, login, senha };
     return this.avaliadorModel.create(avaliadorData);
   }
 
   async getAllAvaliadores(): Promise<Avaliador[]> {
     return this.avaliadorModel.findAll();
   }
 
   async deleteAvaliador(id: number): Promise<void> {
     return this.avaliadorModel.delete(id);
   }

   async loginAvaliador(login: string, senha: string): Promise<Avaliador | null> {
    const avaliador = await this.avaliadorModel.findByLogin(login);

    if (avaliador && await bcrypt.compare(senha, avaliador.senha)) {
      return avaliador;
    }
    return null;
  }
 }
 
 export default new AvaliadorService();
 