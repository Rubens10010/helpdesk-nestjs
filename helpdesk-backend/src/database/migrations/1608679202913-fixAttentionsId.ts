import {MigrationInterface, QueryRunner} from "typeorm";

export class fixAttentionsId1608679202913 implements MigrationInterface {
    name = 'fixAttentionsId1608679202913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "replies" ADD "attention_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attentions" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attentions" DROP CONSTRAINT "PK_131c547137acdc8083c99879ed1"`);
        await queryRunner.query(`ALTER TABLE "attentions" ADD CONSTRAINT "PK_8160c217e40d951156e29625dab" PRIMARY KEY ("movement_id", "id")`);
        await queryRunner.query(`ALTER TABLE "attentions" DROP CONSTRAINT "FK_131c547137acdc8083c99879ed1"`);
        await queryRunner.query(`COMMENT ON COLUMN "attentions"."movement_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "attentions" DROP CONSTRAINT "PK_8160c217e40d951156e29625dab"`);
        await queryRunner.query(`ALTER TABLE "attentions" ADD CONSTRAINT "PK_5fc7685d43671aa780297ac64e4" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "replies" ADD CONSTRAINT "FK_212b57ffe9000b3f4f1a14d7afb" FOREIGN KEY ("attention_id") REFERENCES "attentions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attentions" ADD CONSTRAINT "FK_131c547137acdc8083c99879ed1" FOREIGN KEY ("movement_id") REFERENCES "movements"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attentions" DROP CONSTRAINT "FK_131c547137acdc8083c99879ed1"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP CONSTRAINT "FK_212b57ffe9000b3f4f1a14d7afb"`);
        await queryRunner.query(`ALTER TABLE "attentions" DROP CONSTRAINT "PK_5fc7685d43671aa780297ac64e4"`);
        await queryRunner.query(`ALTER TABLE "attentions" ADD CONSTRAINT "PK_8160c217e40d951156e29625dab" PRIMARY KEY ("movement_id", "id")`);
        await queryRunner.query(`COMMENT ON COLUMN "attentions"."movement_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "attentions" ADD CONSTRAINT "FK_131c547137acdc8083c99879ed1" FOREIGN KEY ("movement_id") REFERENCES "movements"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "attentions" DROP CONSTRAINT "PK_8160c217e40d951156e29625dab"`);
        await queryRunner.query(`ALTER TABLE "attentions" ADD CONSTRAINT "PK_131c547137acdc8083c99879ed1" PRIMARY KEY ("movement_id")`);
        await queryRunner.query(`ALTER TABLE "attentions" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP COLUMN "attention_id"`);
    }

}
