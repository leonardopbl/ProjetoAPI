import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clientesjuridico')
class ClienteJuridico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  razaosocial: string;

  @Column()
  cnpj: string;

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

export default ClienteJuridico;
