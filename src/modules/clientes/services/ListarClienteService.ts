import { getCustomRepository } from 'typeorm';
import Cliente from '../typeorm/entities/Cliente';
import ClientesRepository from '../typeorm/repositories/ClientesRepository';

interface IPaginateCliente {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Cliente[];
}
class ListarClienteService {
  public async execute(): Promise<IPaginateCliente> {
    const clienteRepository = getCustomRepository(ClientesRepository);

    const clientes = await clienteRepository.createQueryBuilder().paginate();

    return clientes as IPaginateCliente;
  }
}

export default ListarClienteService;
