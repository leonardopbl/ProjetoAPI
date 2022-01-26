import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/entities/Usuario';
import UsuariosRepository from '../typeorm/repositories/UsuariosRepository';

interface IRequest {
  usuario_id: string;
  nome: string;
  email: string;
  password?: string;
  old_password?: string;
}

class AtualizarPerfilUsuarioService {
  public async execute({
    usuario_id,
    nome,
    email,
    password,
    old_password,
  }: IRequest): Promise<Usuario> {
    const usuariosRepository = getCustomRepository(UsuariosRepository);

    const usuario = await usuariosRepository.findById(usuario_id);

    if (!usuario) {
      throw new AppError('Usuario não encontrado.');
    }

    const usuarioNovoEmail = await usuariosRepository.findByEmail(email);

    if (usuarioNovoEmail && usuarioNovoEmail.id !== usuario_id) {
      throw new AppError('Já existe um usuário com esse email.');
    }

    if (password && !old_password) {
      throw new AppError('Preencha a antiga senha');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, usuario.password);

      if (!checkOldPassword) {
        throw new AppError('Senha antiga está diferente!');
      }
      usuario.password = await hash(password, 8);
    }

    usuario.nome = nome;
    usuario.email = email;

    await usuariosRepository.save(usuario);

    return usuario;
  }
}

export default AtualizarPerfilUsuarioService;
