import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddProdutoIdToVendasProdutos1642800196225
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'vendas_produtos',
      new TableColumn({
        name: 'produto_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'vendas_produtos',
      new TableForeignKey({
        name: 'VendasProdutosProduto',
        columnNames: ['produto_id'],
        referencedTableName: 'produtos',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'vendas_produtos',
      'VendasProdutosProduto',
    );
    await queryRunner.dropColumn('vendas_produtos', 'produto_id');
  }
}
