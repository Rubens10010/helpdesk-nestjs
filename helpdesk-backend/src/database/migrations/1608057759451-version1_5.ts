import {MigrationInterface, QueryRunner} from "typeorm";

export class version151608057759451 implements MigrationInterface {
    name = 'version151608057759451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attentions" DROP CONSTRAINT "FK_131c547137acdc8083c99879ed1"`);
        await queryRunner.query(`COMMENT ON COLUMN "attentions"."movement_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "attentions" ADD CONSTRAINT "UQ_131c547137acdc8083c99879ed1" UNIQUE ("movement_id")`);
        await queryRunner.query(`ALTER TABLE "attentions" ADD CONSTRAINT "FK_131c547137acdc8083c99879ed1" FOREIGN KEY ("movement_id") REFERENCES "movements"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attentions" DROP CONSTRAINT "FK_131c547137acdc8083c99879ed1"`);
        await queryRunner.query(`ALTER TABLE "attentions" DROP CONSTRAINT "UQ_131c547137acdc8083c99879ed1"`);
        await queryRunner.query(`COMMENT ON COLUMN "attentions"."movement_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "attentions" ADD CONSTRAINT "FK_131c547137acdc8083c99879ed1" FOREIGN KEY ("movement_id") REFERENCES "movements"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
