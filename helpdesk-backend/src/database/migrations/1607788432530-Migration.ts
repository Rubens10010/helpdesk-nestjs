import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1607788432530 implements MigrationInterface {
    name = 'Migration1607788432530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "colaborators" DROP CONSTRAINT "FK_62a5c0e58041d6d81688183ffd3"`);
        await queryRunner.query(`COMMENT ON COLUMN "colaborators"."technical_area_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "colaborators" DROP CONSTRAINT "REL_62a5c0e58041d6d81688183ffd"`);
        await queryRunner.query(`ALTER TABLE "colaborators" ADD CONSTRAINT "FK_62a5c0e58041d6d81688183ffd3" FOREIGN KEY ("technical_area_id") REFERENCES "technical_areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "colaborators" DROP CONSTRAINT "FK_62a5c0e58041d6d81688183ffd3"`);
        await queryRunner.query(`ALTER TABLE "colaborators" ADD CONSTRAINT "REL_62a5c0e58041d6d81688183ffd" UNIQUE ("technical_area_id")`);
        await queryRunner.query(`COMMENT ON COLUMN "colaborators"."technical_area_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "colaborators" ADD CONSTRAINT "FK_62a5c0e58041d6d81688183ffd3" FOREIGN KEY ("technical_area_id") REFERENCES "technical_areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
