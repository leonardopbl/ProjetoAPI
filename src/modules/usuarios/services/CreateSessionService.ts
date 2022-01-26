import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/entities/Usuario';
import UsuariosRepository from '../typeorm/repositories/UsuariosRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  usuario: Usuario;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usuariosRepository = getCustomRepository(UsuariosRepository);
    const usuario = await usuariosRepository.findByEmail(email);

    if (!usuario) {
      throw new AppError('Email ou senha inválidos.', 401);
    }

    const passwordConfirmed = await compare(password, usuario.password);

    if (!passwordConfirmed) {
      throw new AppError('Email ou senha inválidos.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: usuario.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      usuario,
      token,
    };
  }
}

export default CreateSessionService;
