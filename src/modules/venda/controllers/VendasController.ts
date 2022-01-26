import { Request, Response } from 'express';
import CadastrarVendaService from '../services/CadastrarVendaService';
import ExibirVendaService from '../services/ExibirVendaService';

export default class VendasController {
  public async exibir(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const exibirVenda = new ExibirVendaService();

    const venda = await exibirVenda.execute({ id });

    return response.json(venda);
  }

  public async cadastrar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { cliente_id, pagamento, produtos } = request.body;

    const cadastarVenda = new CadastrarVendaService();

    const venda = await cadastarVenda.execute({
      cliente_id,
      pagamento,
      produtos,
    });

    return response.json(venda);
  }
}
