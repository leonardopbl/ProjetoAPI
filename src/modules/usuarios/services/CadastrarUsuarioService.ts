import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import UsuariosRepository from '@modules/usuarios/typeorm/repositories/UsuariosRepository';
import Usuario from '../typeorm/entities/Usuario';

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
    return usuario;
  }
}

export default CadastrarUsuarioService;
