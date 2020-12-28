import {MigrationInterface, QueryRunner} from "typeorm";

export class alterFilePathsTable1609105782904 implements MigrationInterface {
    name = 'alterFilePathsTable1609105782904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file_paths" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "file_paths" ADD "condition" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "ticket_files" DROP CONSTRAINT "FK_0f73d1d380ea55a6b8cd2c17060"`);
        await queryRunner.query(`ALTER TABLE "file_paths" DROP CONSTRAINT "PK_f1dcc83a10f52acfa24b4cbad24"`);
        await queryRunner.query(`ALTER TABLE "file_paths" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "file_paths" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "file_paths" ADD CONSTRAINT "PK_f1dcc83a10f52acfa24b4cbad24" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "ticket_files" DROP CONSTRAINT "REL_0f73d1d380ea55a6b8cd2c1706"`);
        await queryRunner.query(`ALTER TABLE "ticket_files" DROP COLUMN "file_path_id"`);
        await queryRunner.query(`ALTER TABLE "ticket_files" ADD "file_path_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket_files" ADD CONSTRAINT "UQ_0f73d1d380ea55a6b8cd2c17060" UNIQUE ("file_path_id")`);
        await queryRunner.query(`ALTER TABLE "ticket_files" ADD CONSTRAINT "FK_0f73d1d380ea55a6b8cd2c17060" FOREIGN KEY ("file_path_id") REFERENCES "file_paths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_files" DROP CONSTRAINT "FK_0f73d1d380ea55a6b8cd2c17060"`);
        await queryRunner.query(`ALTER TABLE "ticket_files" DROP CONSTRAINT "UQ_0f73d1d380ea55a6b8cd2c17060"`);
        await queryRunner.query(`ALTER TABLE "ticket_files" DROP COLUMN "file_path_id"`);
        await queryRunner.query(`ALTER TABLE "ticket_files" ADD "file_path_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket_files" ADD CONSTRAINT "REL_0f73d1d380ea55a6b8cd2c1706" UNIQUE ("file_path_id")`);
        await queryRunner.query(`ALTER TABLE "file_paths" DROP CONSTRAINT "PK_f1dcc83a10f52acfa24b4cbad24"`);
        await queryRunner.query(`ALTER TABLE "file_paths" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "file_paths" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "file_paths" ADD CONSTRAINT "PK_f1dcc83a10f52acfa24b4cbad24" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "ticket_files" ADD CONSTRAINT "FK_0f73d1d380ea55a6b8cd2c17060" FOREIGN KEY ("file_path_id") REFERENCES "file_paths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file_paths" DROP COLUMN "condition"`);
        await queryRunner.query(`ALTER TABLE "file_paths" ADD "status" boolean NOT NULL DEFAULT true`);
    }

}
