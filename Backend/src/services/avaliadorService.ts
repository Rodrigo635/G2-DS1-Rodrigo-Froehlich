 // src/services/avaliadorService.ts
 import { Avaliador, AvaliadorModel } from '../models/avaliadorModel';

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
 }
 
 export default new AvaliadorService();
 