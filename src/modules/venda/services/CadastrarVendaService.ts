import ClientesRepository from '@modules/clientes/typeorm/repositories/ClientesRepository';
import { ProdutoRepository } from '@modules/produtos/typeorm/repositories/ProdutosRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Venda from '../typeorm/entities/Venda';
import VendasRepository from '../typeorm/repositories/VendasRepository';

interface IProduto {
  id: string;
  quantidade: number;
}
interface IRequest {
  cliente_id: string;
  pagamento: string;
  valor_total: number;
  produtos: IProduto[];
}

class CadastrarVendaService {
  public async execute({
    cliente_id,
    pagamento,
    produtos,
    valor_total,
  }: IRequest): Promise<Venda> {
    const vendasRepository = getCustomRepository(VendasRepository);
    const clientesRepository = getCustomRepository(ClientesRepository);
    const produtosRepository = getCustomRepository(ProdutoRepository);

    const clienteExist = await clientesRepository.findById(cliente_id);

    if (!clienteExist) {
      throw new AppError('Cliente não cadastrado.');
    }

    const existsProdutos = await produtosRepository.findAllByIds(produtos);

    if (!existsProdutos.length) {
      throw new AppError('Produto(s) não cadastrado.');
    }

    const existsProdutosIds = existsProdutos.map(produto => produto.id);

    const checkInexistenteProdutos = produtos.filter(
      produto => !existsProdutosIds.includes(produto.id),
    );

    if (checkInexistenteProdutos.length) {
      throw new AppError(
        `Produto(s): ${checkInexistenteProdutos[0].id} não cadastrado(s).`,
      );
    }

    const quantidadeAvailable = produtos.filter(
      produto =>
        existsProdutos.filter(p => p.id === produto.id)[0].quantidade <
        produto.quantidade,
    );

    if (quantidadeAvailable.length) {
      throw new AppError(
        `O produto ${quantidadeAvailable[0].id} não possui ${quantidadeAvailable[0].quantidade} unidades no estoque`,
      );
    }

    const serializedProdutos = produtos.map(produto => ({
      produto_id: produto.id,
      quantidade: produto.quantidade,
      preco: existsProdutos.filter(p => p.id === produto.id)[0].preco,
    }));

    const venda = await vendasRepository.createVenda({
      cliente: clienteExist,
      pagamento: pagamento,
      valor_total: valor_total,
      produtos: serializedProdutos,
    });

    const { venda_produtos } = venda;

    const updatedProdutoQuantidade = venda_produtos.map(produto => ({
      id: produto.produto_id,
      quantidade:
        existsProdutos.filter(p => p.id === produto.produto_id)[0].quantidade -
        produto.quantidade,
    }));

    await produtosRepository.save(updatedProdutoQuantidade);

    return venda;
  }
}

export default CadastrarVendaService;
