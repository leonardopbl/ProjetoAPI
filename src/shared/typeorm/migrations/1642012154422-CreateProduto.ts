import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProduto1642012154422 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'produtos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'preco',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'precodecusto',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'precodeatacado',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'quantidade',
            type: 'int',
          },
          {
            name: 'codigodebarras',
            type: 'varchar',
          },
          {
            name: 'ncm',
            type: 'varchar',
          },
          {
            name: 'categoria',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('produtos');
  }
}
