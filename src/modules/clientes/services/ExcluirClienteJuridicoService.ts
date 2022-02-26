import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientesJuridicoRepository from '../typeorm/repositories/ClientesJuridicoRepository';

interface IRequest {
  cliente_id: string;
}
class ExcluirClienteJuridicoService {
  public async execute({ cliente_id }: IRequest): Promise<void> {
    const clientesRepository = getCustomRepository(ClientesJuridicoRepository);

    const cliente = await clientesRepository.findById(cliente_id);

    if (!cliente) {
      throw new AppError('Cliente não encontrado.');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('projeto-api-CLIENTEJURIDICO-LIST');

    await clientesRepository.remove(cliente);
  }
}

export default ExcluirClienteJuridicoService;
