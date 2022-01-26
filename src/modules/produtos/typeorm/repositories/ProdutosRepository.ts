import { EntityRepository, In, Repository } from 'typeorm';
import Produto from '../entities/Produto';

interface IFindProdutos {
  id: string;
}
@EntityRepository(Produto)
export class ProdutoRepository extends Repository<Produto> {
  public async findByName(nome: string): Promise<Produto | undefined> {
    const produto = await this.findOne({
      where: {
        nome,
      },
    });

    return produto;

    //findByCodigodebarras
  }
  public async findAllByIds(produtos: IFindProdutos[]): Promise<Produto[]> {
    const produtoIds = produtos.map(produto => produto.id);

    const existsProdutos = await this.find({
      where: {
        id: In(produtoIds),
      },
    });

    return existsProdutos;
  }
}
