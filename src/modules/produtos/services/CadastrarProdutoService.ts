import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Produto from '../typeorm/entities/Produto';
import { ProdutoRepository } from '../typeorm/repositories/ProdutosRepository';

interface IRequest {
  nome: string;
  preco: number;
  precodecusto: number;
  precodeatacado: number;
  quantidade: number;
  estoque: number;
  codigodebarras: string;
  ncm: string;
  categoria: string;
}

class CadastrarProdutoService {
  public async execute({
    nome,
    preco,
    precodecusto,
    precodeatacado,
    quantidade,
    estoque,
    codigodebarras,
    ncm,
    categoria,
  }: IRequest): Promise<Produto> {
    const produtosRepository = getCustomRepository(ProdutoRepository);
    const produtoExists = await produtosRepository.findByName(nome);
    //CRIAR UMA VALIDAÇÃO DE NCM ANTES DE CADASTRAR

    if (produtoExists) {
      throw new AppError('Já existe um produto com esse nome.');
    }

    const produto = produtosRepository.create({
      nome,
      preco,
      precodecusto,
      precodeatacado,
      quantidade,
      estoque,
      codigodebarras,
      ncm,
      categoria,
    });

    await produtosRepository.save(produto);

    return produto;
  }
}

export default CadastrarProdutoService;
