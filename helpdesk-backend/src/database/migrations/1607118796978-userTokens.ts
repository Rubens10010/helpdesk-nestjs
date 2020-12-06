import {MigrationInterface, QueryRunner} from "typeorm";

export class userTokens1607118796978 implements MigrationInterface {
    name = 'userTokens1607118796978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying(191)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
    }

}
