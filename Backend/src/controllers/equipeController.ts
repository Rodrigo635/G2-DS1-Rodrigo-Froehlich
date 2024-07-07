import { Request, Response } from 'express';
import equipeService from '../services/equipeService';
import Joi from 'joi';

const equipeSchema = Joi.object({
  nome: Joi.string().required(),
});

class EquipeController {
  async createEquipe(req: Request, res: Response): Promise<Response> {
    const { error, value } = equipeSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const equipe = await equipeService.createEquipe(value.nome);
      return res.status(201).json(equipe);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao cadastrar a equipe!' });
    }
  }

  async getAllEquipes(req: Request, res: Response): Promise<Response> {
    try {
      const equipes = await equipeService.getAllEquipes();
      return res.status(200).json(equipes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar as equipes!' });
    }
  }

  async deleteEquipe(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      await equipeService.deleteEquipe(Number(id));
      return res.status(200).json({ message: 'A equipe foi excluída!' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao tentar excluir a equipe!' });
    }
  }
}

export default new EquipeController();
