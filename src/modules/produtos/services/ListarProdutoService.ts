import { getCustomRepository } from 'typeorm';
import Produto from '../typeorm/entities/Produto';
import { ProdutoRepository } from '../typeorm/repositories/ProdutosRepository';
import RedisCache from '@shared/cache/RedisCache';

class ListarProdutoService {
  public async execute(): Promise<Produto[]> {
    const produtosRepository = getCustomRepository(ProdutoRepository);

    const redisCache = new RedisCache();

    let produtos = await redisCache.recover<Produto[]>(
      'projeto-api-PRODUTO-LIST',
    );

    if (!produtos) {
      produtos = await produtosRepository.find();

      await redisCache.save('projeto-api-PRODUTO-LIST', produtos);
    }

    return produtos;
  }
}

export default ListarProdutoService;
