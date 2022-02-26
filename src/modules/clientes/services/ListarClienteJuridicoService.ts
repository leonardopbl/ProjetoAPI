import RedisCache from '@shared/cache/RedisCache';
import { getCustomRepository } from 'typeorm';
import ClienteJuridico from '../typeorm/entities/ClienteJuridico';
import ClientesJuridicoRepository from '../typeorm/repositories/ClientesJuridicoRepository';

interface IPaginateCliente {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: ClienteJuridico[];
}
class ListarClienteJuridicoService {
  public async execute(): Promise<IPaginateCliente> {
    const clienteRepository = getCustomRepository(ClientesJuridicoRepository);

    const clientesPag = await clienteRepository.createQueryBuilder().paginate();

    const redisCache = new RedisCache();

    let clientes = await redisCache.recover<ClienteJuridico[]>(
      'projeto-api-CLIENTEJURIDICO-LIST',
    );

    if (!clientes) {
      clientes = await clienteRepository.find();

      await redisCache.save('projeto-api-CLIENTEJURIDICO-LIST', clientes);
    }
    return clientesPag as IPaginateCliente;
  }
}

export default ListarClienteJuridicoService;
