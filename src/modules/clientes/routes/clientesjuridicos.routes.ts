import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ClientesJuridicoController from '../controllers/ClientesJuridicoController';

const clienteJuridicoRouter = Router();
const clienteJuridicoController = new ClientesJuridicoController();

clienteJuridicoRouter.get('/', clienteJuridicoController.index);

clienteJuridicoRouter.get(
  '/:cliente_id',
  celebrate({
    [Segments.PARAMS]: {
      cliente_id: Joi.string().uuid().required(),
    },
  }),
  clienteJuridicoController.exibir,
);

clienteJuridicoRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      razaosocial: Joi.string().required(),
      cnpj: Joi.string().required(),
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
  clienteJuridicoController.cadastrar,
);

clienteJuridicoRouter.put(
  '/:cliente_id',
  celebrate({
    [Segments.BODY]: {
      razaosocial: Joi.string().required(),
      cnpj: Joi.string().required(),
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
  clienteJuridicoController.atualizar,
);

clienteJuridicoRouter.delete(
  '/:cliente_id',
  celebrate({
    [Segments.PARAMS]: {
      cliente_id: Joi.string().uuid().required(),
    },
  }),
  clienteJuridicoController.excluir,
);

export default clienteJuridicoRouter;
