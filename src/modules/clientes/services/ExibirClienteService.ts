import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Cliente from '../typeorm/entities/Cliente';
import ClientesRepository from '../typeorm/repositories/ClientesRepository';

interface IRequest {
  cliente_id: string;
}
class ExibirClienteService {
  public async execute({ cliente_id }: IRequest): Promise<Cliente> {
    const clientesRepository = getCustomRepository(ClientesRepository);

    const cliente = await clientesRepository.findById(cliente_id);
    if (!cliente) {
      throw new AppError('Cliente não encontrado.');
    }

    return cliente;
  }
}

export default ExibirClienteService;
