import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/entities/Usuario';
import UsuariosRepository from '../typeorm/repositories/UsuariosRepository';
import uploadConfig from '@config/upload';

interface IRequest {
  usuario_id: string;
  avatarFilename: string;
}

class UpdateUsuarioAvatarService {
  public async execute({
    usuario_id,
    avatarFilename,
  }: IRequest): Promise<Usuario> {
    const usuariosRepository = getCustomRepository(UsuariosRepository);

    const usuario = await usuariosRepository.findById(usuario_id);

    if (!usuario) {
      throw new AppError('Usuario não encontrado.');
    }

    if (usuario.avatar) {
      const usuarioAvatarFilePath = path.join(
        uploadConfig.directory,
        usuario.avatar,
      );
      const usuarioAvatarFileExists = await fs.promises.stat(
        usuarioAvatarFilePath,
      );

      if (usuarioAvatarFileExists) {
        await fs.promises.unlink(usuarioAvatarFilePath);
      }
    }
    usuario.avatar = avatarFilename;

    await usuariosRepository.save(usuario);

    return usuario;
  }
}

export default UpdateUsuarioAvatarService;
