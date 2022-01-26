import { EntityRepository, Repository } from 'typeorm';
import ClienteJuridico from '../entities/ClienteJuridico';

@EntityRepository(ClienteJuridico)
class ClientesJuridicoRepository extends Repository<ClienteJuridico> {
  public async findByName(
    razaosocial: string,
  ): Promise<ClienteJuridico | undefined> {
    const cliente = await this.findOne({
      where: {
        razaosocial,
      },
    });
    return cliente;
  }
  public async findById(id: string): Promise<ClienteJuridico | undefined> {
    const cliente = await this.findOne({
      where: {
        id,
      },
    });

    return cliente;
  }
  public async findByCnpj(cnpj: string): Promise<ClienteJuridico | undefined> {
    const cliente = await this.findOne({
      where: {
        cnpj,
      },
    });
    return cliente;
  }
}

export default ClientesJuridicoRepository;
