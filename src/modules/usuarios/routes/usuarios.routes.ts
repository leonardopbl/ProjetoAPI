import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsuariosController from '../controllers/UsuariosController';
import UsuarioAvatarController from '../controllers/UsuarioAvatarController';
import isAuthenticated from '@shared/http/middleware/isAuthenticated';

const usuariosRouter = Router();
const usuariosController = new UsuariosController();
const usuariosAvatarController = new UsuarioAvatarController();

const upload = multer(uploadConfig);

usuariosRouter.get('/', isAuthenticated, usuariosController.index);

usuariosRouter.get(
  '/:usuario_id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      usuario_id: Joi.string().uuid().required(),
    },
  }),
  usuariosController.exibir,
);
usuariosRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usuariosController.cadastrar,
);
usuariosRouter.put(
  '/:usuario_id',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      usuario_id: Joi.string().uuid().required(),
    },
  }),
  usuariosController.atualizar,
);
usuariosRouter.delete(
  '/:usuario_id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      usuario_id: Joi.string().uuid().required(),
    },
  }),
  usuariosController.exlcuir,
);

usuariosRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usuariosAvatarController.update,
);

export default usuariosRouter;
