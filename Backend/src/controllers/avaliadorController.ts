import { Request, Response } from 'express';
import avaliadorService from '../services/avaliadorService';
import Joi from 'joi';

const avaliadorSchema = Joi.object({
  nome: Joi.string().min(3).max(30).required(),
  login: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  login: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
});

class AvaliadorController {
  async createAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = avaliadorSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { nome, login, senha } = value;
      const avaliador = await avaliadorService.createAvaliador(nome, login, senha);
      return res.status(201).json(avaliador);
    } catch (error) {
      return res.status(500).json({ error: 'Erro criando avaliador!' });
    }
  }

  async getAvaliadores(req: Request, res: Response): Promise<Response> {
    try {
      const avaliadores = await avaliadorService.getAllAvaliadores();
      if (avaliadores.length > 0) {
        return res.status(200).json(avaliadores);
      }
      return res.status(404).json({ error: 'Avaliadores nao encontrados!' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro buscando avaliadores!' });
    }
  }

  async deleteAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await avaliadorService.deleteAvaliador(Number(id));
      return res.status(200).json({ message: 'Avaliador deletado com sucesso!' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro deletando avaliador!' });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = loginSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { login, senha } = value;
      const avaliador = await avaliadorService.loginAvaliador(login, senha);

      if (avaliador) {
        return res.status(200).json(avaliador);
      } else {
        return res.status(401).json({ error: 'Login ou senha inválidos!' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Erro no login!' });
    }
  }
}

export default new AvaliadorController();
