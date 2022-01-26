import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ClientesController from '../controllers/ClientesController';

const clienteRouter = Router();
const clienteController = new ClientesController();

clienteRouter.get('/', clienteController.index);

clienteRouter.get(
  '/:cliente_id',
  celebrate({
    [Segments.PARAMS]: {
      cliente_id: Joi.string().uuid().required(),
    },
  }),
  clienteController.exibir,
);

clienteRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      cpf: Joi.string().required(),
      celular: Joi.string().required(),
      telefone: Joi.string().required(),
      email: Joi.string().email().required(),
      endereco: Joi.string().required(),
      numero: Joi.string().required(),
      cep: Joi.string().required(),
      logradouro: Joi.string().required(),
      complemento: Joi.string().required(),
    },
  }),
  clienteController.cadastrar,
);

clienteRouter.put(
  '/:cliente_id',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      cpf: Joi.string().required(),
      celular: Joi.string().required(),
      telefone: Joi.string().required(),
      email: Joi.string().email().required(),
      endereco: Joi.string().required(),
      numero: Joi.string().required(),
      cep: Joi.string().required(),
      logradouro: Joi.string().required(),
      complemento: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      cliente_id: Joi.string().uuid().required(),
    },
  }),
  clienteController.atualizar,
);

clienteRouter.delete(
  '/:cliente_id',
  celebrate({
    [Segments.PARAMS]: {
      cliente_id: Joi.string().uuid().required(),
    },
  }),
  clienteController.excluir,
);

export default clienteRouter;
