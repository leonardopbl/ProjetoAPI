import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClienteJuridico from '../typeorm/entities/ClienteJuridico';
import ClientesJuridicoRepository from '../typeorm/repositories/ClientesJuridicoRepository';

interface IRequest {
  cliente_id: string;
}
class ExibirClienteJuridicoService {
  public async execute({ cliente_id }: IRequest): Promise<ClienteJuridico> {
    const clientesRepository = getCustomRepository(ClientesJuridicoRepository);

    const cliente = await clientesRepository.findById(cliente_id);
    if (!cliente) {
      throw new AppError('Cliente não encontrado.');
    }

    return cliente;
  }
}

export default ExibirClienteJuridicoService;
