import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';
import UsuariosRepository from '../typeorm/repositories/UsuariosRepository';
import UsuarioTokensRepository from '../typeorm/repositories/UsuarioTokensRepository';

interface IRequest {
  password: string;
  token: string;
}

class ResetPasswordService {
  public async execute({ password, token }: IRequest): Promise<void> {
    const usuariosRepository = getCustomRepository(UsuariosRepository);
    const usuarioTokenRepository = getCustomRepository(UsuarioTokensRepository);

    const usuarioToken = await usuarioTokenRepository.findByToken(token);

    if (!usuarioToken) {
      throw new AppError('Dados inválidos.');
    }
    const usuario = await usuariosRepository.findById(usuarioToken.usuario_id);

    if (!usuario) {
      throw new AppError('Usuario não existe.');
    }

    const tokenCreatedAt = usuarioToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 3.0);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado.');
    }

    usuario.password = await hash(password, 8);

    await usuariosRepository.save(usuario);
  }
}

export default ResetPasswordService;
