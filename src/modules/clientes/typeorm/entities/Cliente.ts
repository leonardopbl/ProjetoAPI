import Venda from '@modules/venda/typeorm/entities/Venda';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clientes')
class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Venda, vendas => vendas.cliente)
  vendas: Venda[];

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  celular: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @Column()
  endereco: string;

  @Column()
  numero: string;

  @Column()
  cep: string;

  @Column()
  logradouro: string;

  @Column()
  complemento: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Cliente;
