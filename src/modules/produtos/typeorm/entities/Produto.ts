import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('produtos')
class Produto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
