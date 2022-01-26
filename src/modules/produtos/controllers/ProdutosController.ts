import { Request, Response } from 'express';
import AtualizarProdutoService from '../services/AtualizarProdutoService';
import CadastrarProdutoService from '../services/CadastrarProdutoService';
import ExcluirProdutoService from '../services/ExcluirProdutoService';
import ExibirProdutoService from '../services/ExibirProdutoService';
import ListarProdutoService from '../services/ListarProdutoService';

export default class ProdutosController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listarProdutos = new ListarProdutoService();

    const produtos = await listarProdutos.execute();

    return response.json(produtos);
  }

  public async exibir(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const exibirProdutos = new ExibirProdutoService();

    const produto = await exibirProdutos.execute({ id });

    return response.json(produto);
  }

  public async cadastrar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      nome,
      preco,
      precodecusto,
      precodeatacado,
      quantidade,
      estoque,
      codigodebarras,
      ncm,
      categoria,
    } = request.body;

    const cadastarProduto = new CadastrarProdutoService();

    const produto = await cadastarProduto.execute({
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

    return response.json(produto);
  }

  public async atualizar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      nome,
      preco,
      precodecusto,
      precodeatacado,
      quantidade,
      estoque,
      codigodebarras,
      ncm,
      categoria,
    } = request.body;
    const { id } = request.params;

    const atualizarProduto = new AtualizarProdutoService();

    const produto = await atualizarProduto.execute({
      id,
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

    return response.json(produto);
  }

  public async excluir(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const excluirProduto = new ExcluirProdutoService();

    await excluirProduto.execute({ id });

    return response.json([]);
  }
}
