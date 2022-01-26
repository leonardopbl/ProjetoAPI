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

    await produtosRepository.remove(produto);
  }
}

export default ExcluirProdutoService;
