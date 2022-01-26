import { Request, Response } from 'express';
import AtualizarClienteJuridicoService from '../services/AtualizarClienteJuridicoService';
import CadastrarClienteJuridicoService from '../services/CadastrarClienteJuridicoServicec';
import ExcluirClienteJuridicoService from '../services/ExcluirClienteJuridicoService';
import ExibirClienteJuridicoService from '../services/ExibirClienteJuridicoService';
import ListarClienteJuridicoService from '../services/ListarClienteJuridicoService';

export default class ClientesJuridicoController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listarCliente = new ListarClienteJuridicoService();

    const clientes = await listarCliente.execute();

    return response.json(clientes);
  }

  public async exibir(request: Request, response: Response): Promise<Response> {
    const { cliente_id } = request.params;

    const exibirCliente = new ExibirClienteJuridicoService();

    const cliente = await exibirCliente.execute({ cliente_id });

    return response.json(cliente);
  }

  public async cadastrar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      razaosocial,
      cnpj,
      celular,
      telefone,
      email,
      endereco,
      numero,
      cep,
      logradouro,
      complemento,
    } = request.body;

    const cadastarCliente = new CadastrarClienteJuridicoService();

    const cliente = await cadastarCliente.execute({
      razaosocial,
      cnpj,
      celular,
      telefone,
      email,
      endereco,
      numero,
      cep,
      logradouro,
      complemento,
    });

    return response.json(cliente);
  }

  public async atualizar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      razaosocial,
      cnpj,
      celular,
      telefone,
      email,
      endereco,
      numero,
      cep,
      logradouro,
      complemento,
    } = request.body;
    const { cliente_id } = request.params;

    const atualizarCliente = new AtualizarClienteJuridicoService();

    const cliente = await atualizarCliente.execute({
      cliente_id,
      razaosocial,
      cnpj,
      celular,
      telefone,
      email,
      endereco,
      numero,
      cep,
      logradouro,
      complemento,
    });

    return response.json(cliente);
  }

  public async excluir(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { cliente_id } = request.params;

    const excluirCliente = new ExcluirClienteJuridicoService();

    await excluirCliente.execute({ cliente_id });

    return response.json([]);
  }
}
