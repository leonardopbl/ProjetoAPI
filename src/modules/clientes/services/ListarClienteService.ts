import RedisCache from '@shared/cache/RedisCache';
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

    const clientesPag = await clienteRepository.createQueryBuilder().paginate();

    const redisCache = new RedisCache();

    let clientes = await redisCache.recover<Cliente[]>(
      'projeto-api-CLIENTE-LIST',
    );

    if (!clientes) {
      clientes = await clienteRepository.find();

      await redisCache.save('projeto-api-CLIENTE-LIST', clientes);
    }
    return clientesPag as IPaginateCliente;
  }
}

export default ListarClienteService;
