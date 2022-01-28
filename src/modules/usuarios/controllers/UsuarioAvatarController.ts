import { Request, Response } from 'express';
import UpdateUsuarioAvatarService from '../services/UpdateUsuarioAvatarService';
import { instanceToInstance } from 'class-transformer';
export default class UsuarioAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUsuarioAvatarService();

    const usuario = updateAvatar.execute({
      usuario_id: request.usuario.id,
      avatarFilename: request.file?.filename as string,
    });

    return response.json(instanceToInstance(usuario));
  }
}
