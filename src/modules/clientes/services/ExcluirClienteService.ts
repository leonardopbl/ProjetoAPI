import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientesRepository from '../typeorm/repositories/ClientesRepository';

interface IRequest {
  cliente_id: string;
}
class ExcluirClienteService {
  public async execute({ cliente_id }: IRequest): Promise<void> {
    const clientesRepository = getCustomRepository(ClientesRepository);

    const cliente = await clientesRepository.findById(cliente_id);

    if (!cliente) {
      throw new AppError('Cliente não encontrado.');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('projeto-api-CLIENTE-LIST');

    await clientesRepository.remove(cliente);
  }
}

export default ExcluirClienteService;
