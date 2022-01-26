import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Cliente from 'src/modules/clientes/typeorm/entities/Cliente';
import VendasProdutos from './VendasProdutos';

@Entity('vendas')
class Venda {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @OneToMany(() => VendasProdutos, venda_produtos => venda_produtos.venda, {
    cascade: true,
  })
  venda_produtos: VendasProdutos[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Venda;
