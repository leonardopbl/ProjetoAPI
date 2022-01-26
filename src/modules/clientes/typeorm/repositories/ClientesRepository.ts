import { EntityRepository, Repository } from 'typeorm';
import Cliente from '../entities/Cliente';

@EntityRepository(Cliente)
class ClientesRepository extends Repository<Cliente> {
  public async findByName(nome: string): Promise<Cliente | undefined> {
    const cliente = await this.findOne({
      where: {
        nome,
      },
    });
    return cliente;
  }
  public async findById(id: string): Promise<Cliente | undefined> {
    const cliente = await this.findOne({
      where: {
        id,
      },
    });

    return cliente;
  }
  public async findByCpf(cpf: string): Promise<Cliente | undefined> {
    const cliente = await this.findOne({
      where: {
        cpf,
      },
    });
    return cliente;
  }
}

export default ClientesRepository;
