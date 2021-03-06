import {MigrationInterface, QueryRunner} from "typeorm";

export class databaseDiagram1608657771215 implements MigrationInterface {
    name = 'databaseDiagram1608657771215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "solutions" ("id" SERIAL NOT NULL, "content" text NOT NULL, "short" character varying(100), "help_url" character varying(191), "colaborator_id" integer NOT NULL, CONSTRAINT "PK_05589f12803f420b119df2f6170" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file_paths" ("id" SERIAL NOT NULL, "name" character varying(191) NOT NULL, "extension" character varying(100) NOT NULL, "url" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_f1dcc83a10f52acfa24b4cbad24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket_files" ("id" SERIAL NOT NULL, "revised_at" TIMESTAMP, "ticket_id" integer NOT NULL, "file_path_id" integer NOT NULL, CONSTRAINT "REL_0f73d1d380ea55a6b8cd2c1706" UNIQUE ("file_path_id"), CONSTRAINT "PK_7eac408e903bb9907d10c88b585" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" SERIAL NOT NULL, "code" integer NOT NULL, "year" smallint NOT NULL, "problem_description" text NOT NULL, "condition" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "closed_at" TIMESTAMP, "reopened_at" TIMESTAMP, "satisfaction" smallint, "channel" integer NOT NULL DEFAULT '0', "scaled" boolean NOT NULL DEFAULT false, "problem_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "problems" ("id" SERIAL NOT NULL, "title" character varying(191) NOT NULL, "description" text NOT NULL, "technical_area_id" integer NOT NULL, "software_program_id" integer, CONSTRAINT "UQ_22348d871ecdb71ce590afcedda" UNIQUE ("title"), CONSTRAINT "PK_b3994afba6ab64a42cda1ccaeff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "technical_areas" ("id" SERIAL NOT NULL, "name" character varying(191) NOT NULL, "email" character varying(191) NOT NULL, "phone" character varying(40), "status" integer NOT NULL DEFAULT '1', CONSTRAINT "UQ_98c47cca690978356fbd1c830bc" UNIQUE ("phone"), CONSTRAINT "PK_4e4f5cc72c26f63ad264c9828c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(191) NOT NULL, "email" character varying(191) NOT NULL, "google_id" character varying(40), "refresh_token" character varying(191), "photo_url" character varying(100), "status" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_0bd5012aeb82628e07f6a1be53b" UNIQUE ("google_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "colaborators" ("id" SERIAL NOT NULL, "nickname" character varying(191) NOT NULL, "available" boolean NOT NULL DEFAULT true, "lead" boolean NOT NULL DEFAULT false, "status" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "technical_area_id" integer, CONSTRAINT "REL_8d9383063a3317bf76aa661b9b" UNIQUE ("user_id"), CONSTRAINT "PK_0527f8617354ece126bc4549256" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "software_programs" ("id" SERIAL NOT NULL, "name" character varying(191) NOT NULL, "version" character varying(20), "url" character varying(255) NOT NULL, CONSTRAINT "PK_79effbd2efc8acef1c3d618f453" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "problem_solutions" ("prefered" boolean NOT NULL DEFAULT false, "rank" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "problem_id" integer NOT NULL, "solution_id" integer NOT NULL, CONSTRAINT "PK_cb378e9d913c2794fbd89822a69" PRIMARY KEY ("problem_id", "solution_id"))`);
        await queryRunner.query(`CREATE TABLE "replies" ("id" SERIAL NOT NULL, "message" text NOT NULL, "source" integer NOT NULL DEFAULT '1', "condition" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_08f619ebe431e27e9d206bea132" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movements" ("id" SERIAL NOT NULL, "priority" smallint NOT NULL DEFAULT '0', "condition" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "accepted_at" TIMESTAMP, "notified" boolean NOT NULL DEFAULT false, "latest" boolean NOT NULL DEFAULT true, "last_id" integer, "ticket_id" integer NOT NULL, "technical_area_id" integer NOT NULL, "colaborator_id" integer, CONSTRAINT "REL_33ea97442abbaba058747f96bd" UNIQUE ("last_id"), CONSTRAINT "PK_5a8e3da15ab8f2ce353e7f58f67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attentions" ("code" character varying(191) NOT NULL, "subject" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "finished_at" TIMESTAMP, "replied" boolean NOT NULL DEFAULT false, "satisfaction" smallint, "reopen_attention" smallint, "movement_id" integer NOT NULL, "problem_solution_id" integer, CONSTRAINT "REL_131c547137acdc8083c99879ed" UNIQUE ("movement_id"), CONSTRAINT "PK_131c547137acdc8083c99879ed1" PRIMARY KEY ("movement_id"))`);
        await queryRunner.query(`ALTER TABLE "solutions" ADD CONSTRAINT "FK_06541e9aceb80d06cd13928b2fc" FOREIGN KEY ("colaborator_id") REFERENCES "colaborators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_files" ADD CONSTRAINT "FK_1f2d3f9c44a7f3cdb0e0baa4a3e" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_files" ADD CONSTRAINT "FK_0f73d1d380ea55a6b8cd2c17060" FOREIGN KEY ("file_path_id") REFERENCES "file_paths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_6dcdd654bfa7879bd779c5e0b7d" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_2e445270177206a97921e461710" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "problems" ADD CONSTRAINT "FK_4db9b895e4ffe3140ed618f7ffe" FOREIGN KEY ("technical_area_id") REFERENCES "technical_areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "problems" ADD CONSTRAINT "FK_7fa4725a4df07973ab2fb122650" FOREIGN KEY ("software_program_id") REFERENCES "software_programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "colaborators" ADD CONSTRAINT "FK_8d9383063a3317bf76aa661b9bb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "colaborators" ADD CONSTRAINT "FK_62a5c0e58041d6d81688183ffd3" FOREIGN KEY ("technical_area_id") REFERENCES "technical_areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" ADD CONSTRAINT "FK_5046075732061d907e87b222f77" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" ADD CONSTRAINT "FK_0895199d31b4446e0e66e7279cc" FOREIGN KEY ("solution_id") REFERENCES "solutions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movements" ADD CONSTRAINT "FK_33ea97442abbaba058747f96bd7" FOREIGN KEY ("last_id") REFERENCES "movements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movements" ADD CONSTRAINT "FK_6419866c2c9d7c523fa0004d0c4" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movements" ADD CONSTRAINT "FK_01c1902f6c91e8ffc3b29b936fa" FOREIGN KEY ("technical_area_id") REFERENCES "technical_areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movements" ADD CONSTRAINT "FK_ba22da2756a85b917683b38a5ca" FOREIGN KEY ("colaborator_id") REFERENCES "colaborators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attentions" ADD CONSTRAINT "FK_131c547137acdc8083c99879ed1" FOREIGN KEY ("movement_id") REFERENCES "movements"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "attentions" ADD CONSTRAINT "FK_d91b75c9207769460f8af05b219" FOREIGN KEY ("problem_solution_id", "problem_solution_id") REFERENCES "problem_solutions"("problem_id","solution_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attentions" DROP CONSTRAINT "FK_d91b75c9207769460f8af05b219"`);
        await queryRunner.query(`ALTER TABLE "attentions" DROP CONSTRAINT "FK_131c547137acdc8083c99879ed1"`);
        await queryRunner.query(`ALTER TABLE "movements" DROP CONSTRAINT "FK_ba22da2756a85b917683b38a5ca"`);
        await queryRunner.query(`ALTER TABLE "movements" DROP CONSTRAINT "FK_01c1902f6c91e8ffc3b29b936fa"`);
        await queryRunner.query(`ALTER TABLE "movements" DROP CONSTRAINT "FK_6419866c2c9d7c523fa0004d0c4"`);
        await queryRunner.query(`ALTER TABLE "movements" DROP CONSTRAINT "FK_33ea97442abbaba058747f96bd7"`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" DROP CONSTRAINT "FK_0895199d31b4446e0e66e7279cc"`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" DROP CONSTRAINT "FK_5046075732061d907e87b222f77"`);
        await queryRunner.query(`ALTER TABLE "colaborators" DROP CONSTRAINT "FK_62a5c0e58041d6d81688183ffd3"`);
        await queryRunner.query(`ALTER TABLE "colaborators" DROP CONSTRAINT "FK_8d9383063a3317bf76aa661b9bb"`);
        await queryRunner.query(`ALTER TABLE "problems" DROP CONSTRAINT "FK_7fa4725a4df07973ab2fb122650"`);
        await queryRunner.query(`ALTER TABLE "problems" DROP CONSTRAINT "FK_4db9b895e4ffe3140ed618f7ffe"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_2e445270177206a97921e461710"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_6dcdd654bfa7879bd779c5e0b7d"`);
        await queryRunner.query(`ALTER TABLE "ticket_files" DROP CONSTRAINT "FK_0f73d1d380ea55a6b8cd2c17060"`);
        await queryRunner.query(`ALTER TABLE "ticket_files" DROP CONSTRAINT "FK_1f2d3f9c44a7f3cdb0e0baa4a3e"`);
        await queryRunner.query(`ALTER TABLE "solutions" DROP CONSTRAINT "FK_06541e9aceb80d06cd13928b2fc"`);
        await queryRunner.query(`DROP TABLE "attentions"`);
        await queryRunner.query(`DROP TABLE "movements"`);
        await queryRunner.query(`DROP TABLE "replies"`);
        await queryRunner.query(`DROP TABLE "problem_solutions"`);
        await queryRunner.query(`DROP TABLE "software_programs"`);
        await queryRunner.query(`DROP TABLE "colaborators"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "technical_areas"`);
        await queryRunner.query(`DROP TABLE "problems"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TABLE "ticket_files"`);
        await queryRunner.query(`DROP TABLE "file_paths"`);
        await queryRunner.query(`DROP TABLE "solutions"`);
    }

}
