import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClienteJuridico from '../typeorm/entities/ClienteJuridico';
import ClientesJuridicoRepository from '../typeorm/repositories/ClientesJuridicoRepository';

interface IRequest {
  cliente_id: string;
  razaosocial: string;
  cnpj: string;
  celular: string;
  telefone: string;
  email: string;
  endereco: string;
  numero: string;
  cep: string;
  logradouro: string;
  complemento: string;
}
class AtualizarClienteJuridicoService {
  public async execute({
    cliente_id,
    razaosocial,
    email,
    cnpj,
    celular,
    telefone,
    endereco,
    numero,
    cep,
    logradouro,
    complemento,
  }: IRequest): Promise<ClienteJuridico> {
    const clientesRepository = getCustomRepository(ClientesJuridicoRepository);

    const cliente = await clientesRepository.findById(cliente_id);

    if (!cliente) {
      throw new AppError('Cliente não encontrado.');
    }

    const clienteNovoCnpj = await clientesRepository.findByCnpj(cnpj);

    if (clienteNovoCnpj && cnpj !== cliente.cnpj) {
      throw new AppError('Já existe um usuário com esse CNPJ.');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('projeto-api-CLIENTEJURIDICO-LIST');

    cliente.razaosocial = razaosocial;
    cliente.email = email;
    cliente.cnpj = cnpj;
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

export default AtualizarClienteJuridicoService;
