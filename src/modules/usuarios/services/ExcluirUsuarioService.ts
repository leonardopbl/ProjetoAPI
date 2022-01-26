import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsuariosRepository from '../typeorm/repositories/UsuariosRepository';

interface IRequest {
  usuario_id: string;
}
class ExcluirUsuarioService {
  public async execute({ usuario_id }: IRequest): Promise<void> {
    const usuariosRepository = getCustomRepository(UsuariosRepository);

    const usuario = await usuariosRepository.findOne(usuario_id);

    if (!usuario) {
      throw new AppError('Usuario não encontrado.');
    }

    await usuariosRepository.remove(usuario);
  }
}

export default ExcluirUsuarioService;
