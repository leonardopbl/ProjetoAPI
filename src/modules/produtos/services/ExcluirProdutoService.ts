import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProdutoRepository } from '../typeorm/repositories/ProdutosRepository';

interface IRequest {
  id: string;
}
class ExcluirProdutoService {
  public async execute({ id }: IRequest): Promise<void> {
    const produtosRepository = getCustomRepository(ProdutoRepository);

    const produto = await produtosRepository.findOne(id);

    if (!produto) {
      throw new AppError('Produto não encontrado.');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('projeto-api-PRODUTO-LIST');

    await produtosRepository.remove(produto);
  }
}

export default ExcluirProdutoService;
