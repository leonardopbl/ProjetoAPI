import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Cliente from '../typeorm/entities/Cliente';
import ClientesRepository from '../typeorm/repositories/ClientesRepository';

interface IRequest {
  nome: string;
  cpf: string;
  celular: string;
  telefone: string;
  email: string;
  endereco?: string;
  numero?: string;
  cep?: string;
  logradouro?: string;
  complemento?: string;
}

class CadastrarClienteService {
  public async execute({
    nome,
    email,
    cpf,
    celular,
    telefone,
    endereco,
    numero,
    cep,
    logradouro,
    complemento,
  }: IRequest): Promise<Cliente> {
    const clientesRepository = getCustomRepository(ClientesRepository);
    const cpfExists = await clientesRepository.findByCpf(cpf);

    if (cpfExists) {
      throw new AppError('CPF já cadastrado.');
    }

    const cliente = clientesRepository.create({
      nome,
      email,
      cpf,
      celular,
      telefone,
      endereco,
      numero,
      cep,
      logradouro,
      complemento,
    });

    await clientesRepository.save(cliente);

    return cliente;
  }
}

export default CadastrarClienteService;
