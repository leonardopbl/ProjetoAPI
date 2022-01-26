import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Venda from '../typeorm/entities/Venda';
import VendasRepository from '../typeorm/repositories/VendasRepository';

interface IRequest {
  id: string;
}

class ExibirVendaService {
  public async execute({ id }: IRequest): Promise<Venda> {
    const vendasRepository = getCustomRepository(VendasRepository);

    const venda = await vendasRepository.findById(id);

    if (!venda) {
      throw new AppError('Venda não encontrada');
    }

    return venda;
  }
}

export default ExibirVendaService;
