import { Request, Response } from 'express';
import AtualizarUsuarioService from '../services/AtualizarPerfilUsuarioService';
import ExibirUsuarioService from '../services/ExibirUsuarioService';

export default class PerfilUsuarioController {
  public async exibir(request: Request, response: Response): Promise<Response> {
    const exibirPerfilUsuario = new ExibirUsuarioService();
    const usuario_id = request.usuario.id;

    const usuario = await exibirPerfilUsuario.execute({ usuario_id });

    return response.json(usuario);
  }
  public async atualizar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { nome, email, password, old_password } = request.body;
    const usuario_id = request.usuario.id;

    const atualizarPerfilUsuario = new AtualizarUsuarioService();

    const usuario = await atualizarPerfilUsuario.execute({
      usuario_id,
      nome,
      email,
      password,
      old_password,
    });
    return response.json(usuario);
  }
}
