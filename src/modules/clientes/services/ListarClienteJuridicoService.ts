import { getCustomRepository } from 'typeorm';
import ClienteJuridico from '../typeorm/entities/ClienteJuridico';
import ClientesJuridicoRepository from '../typeorm/repositories/ClientesJuridicoRepository';

class ListarClienteJuridicoService {
  public async execute(): Promise<ClienteJuridico[]> {
    const clienteRepository = getCustomRepository(ClientesJuridicoRepository);

    const clientes = await clienteRepository.find();

    return clientes;
  }
}

export default ListarClienteJuridicoService;
