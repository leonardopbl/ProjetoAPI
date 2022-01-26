import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddVendaIdToVendasProdutos1642799940709
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'vendas_produtos',
      new TableColumn({
        name: 'venda_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'vendas_produtos',
      new TableForeignKey({
        name: 'VendasProdutosVenda',
        columnNames: ['venda_id'],
        referencedTableName: 'vendas',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('vendas_produtos', 'VendasProdutosVenda');
    await queryRunner.dropColumn('vendas_produtos', 'venda_id');
  }
}
