import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import VendasController from '../controllers/VendasController';

const vendasRouter = Router();
const vendasController = new VendasController();

vendasRouter.get('/', vendasController.index);
vendasRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  vendasController.exibir,
);

vendasRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cliente_id: Joi.string().uuid().required(),
      pagamento: Joi.string().required(),
      valor_total: Joi.number().precision(2).required(),
      produtos: Joi.required(),
    },
  }),
  vendasController.cadastrar,
);

export default vendasRouter;
