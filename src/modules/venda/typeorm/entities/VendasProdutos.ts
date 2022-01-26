import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Venda from './Venda';
import Produto from '@modules/produtos/typeorm/entities/Produto';

@Entity('vendas_produtos')
class VendasProdutos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Venda, venda => venda.venda_produtos)
  @JoinColumn({ name: 'venda_id' })
  venda: Venda;

  @Column()
  venda_id: string;

  @Column()
  produto_id: string;

  @Column('decimal')
  desconto: number;

  @Column('decimal')
  preco: number;

  @Column('int')
  quantidade: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default VendasProdutos;
