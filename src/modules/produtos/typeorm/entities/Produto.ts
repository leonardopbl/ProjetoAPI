//import VendasProdutos from 'src/modules/venda/typeorm/entities/VendasProdutos';
import VendasProdutos from '@modules/venda/typeorm/entities/VendasProdutos';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('produtos')
class Produto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => VendasProdutos, venda_produtos => venda_produtos.produto)
  venda_produtos: VendasProdutos[];

  @Column()
  nome: string;

  @Column('decimal')
  preco: number;

  @Column('decimal')
  precodecusto: number;

  @Column('int')
  quantidade: number;

  @Column('decimal')
  precodeatacado: number;

  @Column('int')
  estoque: number;

  @Column()
  codigodebarras: string;

  @Column()
  ncm: string;

  @Column()
  categoria: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Produto;
