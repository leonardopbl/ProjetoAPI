import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/entities/Usuario';
import UsuariosRepository from '../typeorm/repositories/UsuariosRepository';

interface IRequest {
  usuario_id: string;
}
class ExibirUsuarioService {
  public async execute({ usuario_id }: IRequest): Promise<Usuario> {
    const usuariosRepository = getCustomRepository(UsuariosRepository);

    const usuario = await usuariosRepository.findById(usuario_id);
    if (!usuario) {
      throw new AppError('Usuário não encontrado.');
    }

    return usuario;
  }
}

export default ExibirUsuarioService;
