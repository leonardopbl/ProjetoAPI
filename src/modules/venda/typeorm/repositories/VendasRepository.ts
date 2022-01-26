import Cliente from '@modules/clientes/typeorm/entities/Cliente';
import { EntityRepository, Repository } from 'typeorm';
import Venda from '../entities/Venda';

interface IProduto {
  produto_id: string;
  preco: number;
  quantidade: number;
}

interface IRequest {
  cliente: Cliente;
  pagamento: string;
  valor_total: number;
  produtos: IProduto[];
}
@EntityRepository(Venda)
export class VendasRepository extends Repository<Venda> {
  public async findById(id: string): Promise<Venda | undefined> {
    const venda = await this.findOne(id, {
      relations: ['venda_produtos', 'cliente'],
    });

    return venda;
  }

  public async createVenda({
    cliente,
    pagamento,
    valor_total,
    produtos,
  }: IRequest): Promise<Venda> {
    const venda = this.create({
      cliente,
      venda_produtos: produtos,
      pagamento,
      valor_total,
    });
    await this.save(venda);

    return venda;
  }
}

export default VendasRepository;
