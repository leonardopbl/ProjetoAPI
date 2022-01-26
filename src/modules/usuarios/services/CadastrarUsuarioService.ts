import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/entities/Usuario';
import UsuariosRepository from '../typeorm/repositories/UsuariosRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  nome: string;
  email: string;
  password: string;
}

class CadastrarUsuarioService {
  public async execute({ nome, email, password }: IRequest): Promise<Usuario> {
    const usuariosRepository = getCustomRepository(UsuariosRepository);
    const emailExists = await usuariosRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Endereço de email já cadastrado.');
    }

    const hashedPassword = await hash(password, 8);
    const usuario = usuariosRepository.create({
      nome,
      email,
      password: hashedPassword,
    });

    await usuariosRepository.save(usuario);
    console.log(usuario);
    return usuario;
  }
}

export default CadastrarUsuarioService;
