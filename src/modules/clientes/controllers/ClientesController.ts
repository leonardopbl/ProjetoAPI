import { Request, Response } from 'express';
import AtualizarClienteService from '../services/AtualizarClienteService';
import CadastrarClienteService from '../services/CadastrarClienteService';
import ExcluirClienteService from '../services/ExcluirClienteService';
import ExibirClienteService from '../services/ExibirClienteService';
import ListarClienteService from '../services/ListarClienteService';

export default class ClientesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listarCliente = new ListarClienteService();

    const clientes = await listarCliente.execute();

    return response.json(clientes);
  }

  public async exibir(request: Request, response: Response): Promise<Response> {
    const { cliente_id } = request.params;

    const exibirCliente = new ExibirClienteService();

    const cliente = await exibirCliente.execute({ cliente_id });

    return response.json(cliente);
  }

  public async cadastrar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      nome,
      cpf,
      celular,
      telefone,
      email,
      endereco,
      numero,
      cep,
      logradouro,
      complemento,
    } = request.body;

    const cadastarCliente = new CadastrarClienteService();

    const cliente = await cadastarCliente.execute({
      nome,
      cpf,
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
      nome,
      cpf,
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

    const atualizarCliente = new AtualizarClienteService();

    const cliente = await atualizarCliente.execute({
      cliente_id,
      nome,
      cpf,
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

    const excluirCliente = new ExcluirClienteService();

    await excluirCliente.execute({ cliente_id });

    return response.json([]);
  }
}
