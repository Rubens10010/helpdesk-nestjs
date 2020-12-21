import {MigrationInterface, QueryRunner} from "typeorm";

export class ticketsFix1608572361214 implements MigrationInterface {
    name = 'ticketsFix1608572361214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" ADD "problem_id" integer`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_6dcdd654bfa7879bd779c5e0b7d" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_2e445270177206a97921e461710" FOREIGN KEY ("user_id") REFERENCES "problems"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_2e445270177206a97921e461710"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_6dcdd654bfa7879bd779c5e0b7d"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "problem_id"`);
    }

}
