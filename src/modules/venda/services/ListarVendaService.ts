import { getCustomRepository } from 'typeorm';
import Venda from '../typeorm/entities/Venda';
import VendasRepository from '../typeorm/repositories/VendasRepository';

class ListarVendaService {
  public async execute(): Promise<Venda[]> {
    const vendasRepository = getCustomRepository(VendasRepository);

    const vendas = await vendasRepository.find();

    return vendas;
  }
}

export default ListarVendaService;
