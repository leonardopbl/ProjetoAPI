import { getCustomRepository } from 'typeorm';
import Produto from '../typeorm/entities/Produto';
import { ProdutoRepository } from '../typeorm/repositories/ProdutosRepository';

class ListarProdutoService {
  public async execute(): Promise<Produto[]> {
    const produtosRepository = getCustomRepository(ProdutoRepository);

    const produtos = await produtosRepository.find();

    return produtos;
  }
}

export default ListarProdutoService;
