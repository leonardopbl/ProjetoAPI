import { getCustomRepository } from 'typeorm';
import Cliente from '../typeorm/entities/Cliente';
import ClientesRepository from '../typeorm/repositories/ClientesRepository';

class ListarClienteService {
  public async execute(): Promise<Cliente[]> {
    const clienteRepository = getCustomRepository(ClientesRepository);

    const clientes = await clienteRepository.find();

    return clientes;
  }
}

export default ListarClienteService;
