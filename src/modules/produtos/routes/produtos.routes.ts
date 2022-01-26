import { Router } from 'express';
import ProdutosController from '../controllers/ProdutosController';
import { celebrate, Joi, Segments } from 'celebrate';

const produtosRouter = Router();
const produtosController = new ProdutosController();

produtosRouter.get('/', produtosController.index);

produtosRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  produtosController.exibir,
);

produtosRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      codigodebarras: Joi.string().required(),
      ncm: Joi.string().required(),
      preco: Joi.number().precision(2).required(),
      precodecusto: Joi.number().precision(2).required(),
      precodeatacado: Joi.number().precision(2).required(),
      quantidade: Joi.number().required(),
      categoria: Joi.string().required(),
    },
  }),
  produtosController.cadastrar,
);

produtosRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      codigodebarras: Joi.string().required(),
      ncm: Joi.string().required(),
      preco: Joi.number().precision(2).required(),
      precodecusto: Joi.number().precision(2).required(),
      precodeatacado: Joi.number().precision(2).required(),
      quantidade: Joi.number().required(),
      categoria: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  produtosController.atualizar,
);

produtosRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  produtosController.excluir,
);

export default produtosRouter;
