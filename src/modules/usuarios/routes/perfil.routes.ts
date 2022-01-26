import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middleware/isAuthenticated';
import PerfilUsuarioController from '../controllers/PerfilUsuarioController';

const perfilRouter = Router();
const perfilController = new PerfilUsuarioController();

perfilRouter.use(isAuthenticated);

perfilRouter.get('/', perfilController.exibir);
perfilRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', { is: Joi.exist(), then: Joi.required() }),
    },
  }),
  perfilController.atualizar,
);

export default perfilRouter;
