import { EntityRepository, Repository } from 'typeorm';
import Usuario from '../entities/Usuario';

@EntityRepository(Usuario)
class UsuariosRepository extends Repository<Usuario> {
  public async findByName(nome: string): Promise<Usuario | undefined> {
    const usuario = await this.findOne({
      where: {
        nome,
      },
    });
    return usuario;
  }
  public async findById(id: string): Promise<Usuario | undefined> {
    const usuario = await this.findOne({
      where: {
        id,
      },
    });

    return usuario;
  }
  public async findByEmail(email: string): Promise<Usuario | undefined> {
    const usuario = await this.findOne({
      where: {
        email,
      },
    });
    return usuario;
  }
}

export default UsuariosRepository;
