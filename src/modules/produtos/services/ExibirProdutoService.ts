import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Produto from '../typeorm/entities/Produto';
import { ProdutoRepository } from '../typeorm/repositories/ProdutosRepository';

interface IRequest {
  id: string;
}
class ExibirProdutoService {
  public async execute({ id }: IRequest): Promise<Produto> {
    const produtosRepository = getCustomRepository(ProdutoRepository);

    const produto = await produtosRepository.findOne(id);

    if (!produto) {
      throw new AppError('Produto não encontrado.');
    }

    return produto;
  }
}

export default ExibirProdutoService;
