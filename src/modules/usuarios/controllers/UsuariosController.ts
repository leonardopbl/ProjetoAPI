import { Request, Response } from 'express';
import AtualizarUsuarioService from '../services/AtualizarPerfilUsuarioService';
import CadastrarUsuarioService from '../services/CadastrarUsuarioService';
import ExcluirUsuarioService from '../services/ExcluirUsuarioService';
import ExibirUsuarioService from '../services/ExibirUsuarioService';
import ListarUsuarioService from '../services/ListarUsuarioService';
import { instanceToInstance } from 'class-transformer';
export default class UsuariosController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listarUsuario = new ListarUsuarioService();

    const usuarios = await listarUsuario.execute();

    return response.json(instanceToInstance(usuarios));
  }

  public async cadastrar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { nome, email, password } = request.body;
    const cadastrarUsuario = new CadastrarUsuarioService();

    const usuario = await cadastrarUsuario.execute({
      nome,
      email,
      password,
    });

    return response.json(instanceToInstance(usuario));
  }
  public async exibir(request: Request, response: Response): Promise<Response> {
    const { usuario_id } = request.params;

    const exibirUsuario = new ExibirUsuarioService();

    const usuario = await exibirUsuario.execute({ usuario_id });

    return response.json(instanceToInstance(usuario));
  }
  public async atualizar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { nome, email, password } = request.body;
    const { usuario_id } = request.params;
    const atualizarUsuario = new AtualizarUsuarioService();

    const usuario = await atualizarUsuario.execute({
      usuario_id,
      nome,
      email,
      password,
    });
    return response.json(instanceToInstance(usuario));
  }

  public async exlcuir(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { usuario_id } = request.params;

    const excluirUsuario = new ExcluirUsuarioService();

    await excluirUsuario.execute({ usuario_id });

    return response.json([]);
  }
}
