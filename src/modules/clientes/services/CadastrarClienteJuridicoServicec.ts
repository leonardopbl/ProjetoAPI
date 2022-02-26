import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClienteJuridico from '../typeorm/entities/ClienteJuridico';
import ClientesJuridicoRepository from '../typeorm/repositories/ClientesJuridicoRepository';

interface IRequest {
  razaosocial: string;
  cnpj: string;
  celular: string;
  telefone: string;
  email: string;
  endereco?: string;
  numero?: string;
  cep?: string;
  logradouro?: string;
  complemento?: string;
}

class CadastrarClienteJuridicoService {
  public async execute({
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
    const cnpjExists = await clientesRepository.findByCnpj(cnpj);

    if (cnpjExists) {
      throw new AppError('CNPJ já cadastrado.');
    }

    const redisCache = new RedisCache();

    const cliente = clientesRepository.create({
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
    });

    await redisCache.invalidate('projeto-api-CLIENTEJURIDICO-LIST');

    await clientesRepository.save(cliente);

    return cliente;
  }
}

export default CadastrarClienteJuridicoService;
