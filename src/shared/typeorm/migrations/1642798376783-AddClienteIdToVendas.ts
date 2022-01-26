import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddClienteIdToVendas1642798376783 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'vendas',
      new TableColumn({
        name: 'cliente_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'vendas',
      new TableForeignKey({
        name: 'VendasCliente',
        columnNames: ['cliente_id'],
        referencedTableName: 'clientes',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('vendas', 'VendasCliente');
    await queryRunner.dropColumn('vendas', 'cliente_id');
  }
}
