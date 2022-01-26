import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/entities/Usuario';
import UsuariosRepository from '../typeorm/repositories/UsuariosRepository';

class ListarUsuarioService {
  public async execute(): Promise<Usuario[]> {
    const usuariosRepository = getCustomRepository(UsuariosRepository);

    const usuarios = await usuariosRepository.find();

    return usuarios;
  }
}

export default ListarUsuarioService;
