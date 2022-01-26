import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Produto from '../typeorm/entities/Produto';
import { ProdutoRepository } from '../typeorm/repositories/ProdutosRepository';

interface IRequest {
  id: string;
  nome: string;
  preco: number;
  precodecusto: number;
  precodeatacado: number;
  quantidade: number;
  codigodebarras: string;
  ncm: string;
  categoria: string;
}
class AtualizarProdutoService {
  public async execute({
    id,
    nome,
    preco,
    precodecusto,
    precodeatacado,
    quantidade,
    codigodebarras,
    ncm,
    categoria,
  }: IRequest): Promise<Produto> {
    const produtosRepository = getCustomRepository(ProdutoRepository);

    const produto = await produtosRepository.findOne(id);

    if (!produto) {
      throw new AppError('Produto não encontrado.');
    }

    const nomeProdutoExists = await produtosRepository.findByName(nome);

    if (nomeProdutoExists && nome !== produto.nome) {
      throw new AppError('Já existe um produto com esse nome.');
    }

    produto.nome = nome;
    produto.preco = preco;
    produto.precodecusto = precodecusto;
    produto.precodeatacado = precodeatacado;
    produto.quantidade = quantidade;
    produto.codigodebarras = codigodebarras;
    produto.ncm = ncm;
    produto.categoria = categoria;

    await produtosRepository.save(produto);

    return produto;
  }
}

export default AtualizarProdutoService;
