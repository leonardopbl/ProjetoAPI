import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Cliente from '../typeorm/entities/Cliente';
import ClientesRepository from '../typeorm/repositories/ClientesRepository';

interface IRequest {
  cliente_id: string;
  nome: string;
  cpf: string;
  celular: string;
  telefone: string;
  email: string;
  endereco: string;
  numero: string;
  cep: string;
  logradouro: string;
  complemento: string;
}
class AtualizarClienteService {
  public async execute({
    cliente_id,
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

    const cliente = await clientesRepository.findById(cliente_id);

    if (!cliente) {
      throw new AppError('Cliente não encontrado.');
    }

    const clienteNovoCpf = await clientesRepository.findByCpf(cpf);

    if (clienteNovoCpf && cpf !== cliente.cpf) {
      throw new AppError('Já existe um usuário com esse CPF.');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('projeto-api-CLIENTE-LIST');

    cliente.nome = nome;
    cliente.email = email;
    cliente.cpf = cpf;
    cliente.celular = celular;
    cliente.telefone = telefone;
    cliente.endereco = endereco;
    cliente.numero = numero;
    cliente.cep = cep;
    cliente.logradouro = logradouro;
    cliente.complemento = complemento;

    await clientesRepository.save(cliente);

    return cliente;
  }
}

export default AtualizarClienteService;
