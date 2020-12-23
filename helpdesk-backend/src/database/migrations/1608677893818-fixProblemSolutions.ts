import {MigrationInterface, QueryRunner} from "typeorm";

export class fixProblemSolutions1608677893818 implements MigrationInterface {
    name = 'fixProblemSolutions1608677893818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attentions" DROP CONSTRAINT "FK_d91b75c9207769460f8af05b219"`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" DROP CONSTRAINT "PK_cb378e9d913c2794fbd89822a69"`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" ADD CONSTRAINT "PK_36cf2706a17277b061d56bce46a" PRIMARY KEY ("problem_id", "solution_id", "id")`);
        await queryRunner.query(`COMMENT ON COLUMN "technical_areas"."phone" IS NULL`);
        await queryRunner.query(`ALTER TABLE "technical_areas" DROP CONSTRAINT "UQ_98c47cca690978356fbd1c830bc"`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" DROP CONSTRAINT "FK_5046075732061d907e87b222f77"`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" DROP CONSTRAINT "FK_0895199d31b4446e0e66e7279cc"`);
        await queryRunner.query(`COMMENT ON COLUMN "problem_solutions"."problem_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" DROP CONSTRAINT "PK_36cf2706a17277b061d56bce46a"`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" ADD CONSTRAINT "PK_19a357d6a72a0ff15a033bae09c" PRIMARY KEY ("solution_id", "id")`);
        await queryRunner.query(`COMMENT ON COLUMN "problem_solutions"."solution_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" DROP CONSTRAINT "PK_19a357d6a72a0ff15a033bae09c"`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" ADD CONSTRAINT "PK_211460778188b1fc0fd7778cb47" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "attentions" DROP CONSTRAINT "FK_131c547137acdc8083c99879ed1"`);
        await queryRunner.query(`COMMENT ON COLUMN "attentions"."movement_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "attentions" ADD CONSTRAINT "UQ_131c547137acdc8083c99879ed1" UNIQUE ("movement_id")`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" ADD CONSTRAINT "FK_5046075732061d907e87b222f77" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" ADD CONSTRAINT "FK_0895199d31b4446e0e66e7279cc" FOREIGN KEY ("solution_id") REFERENCES "solutions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "attentions" ADD CONSTRAINT "FK_131c547137acdc8083c99879ed1" FOREIGN KEY ("movement_id") REFERENCES "movements"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "attentions" ADD CONSTRAINT "FK_409d8f59468534b8096682e0bd0" FOREIGN KEY ("problem_solution_id") REFERENCES "problem_solutions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attentions" DROP CONSTRAINT "FK_409d8f59468534b8096682e0bd0"`);
        await queryRunner.query(`ALTER TABLE "attentions" DROP CONSTRAINT "FK_131c547137acdc8083c99879ed1"`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" DROP CONSTRAINT "FK_0895199d31b4446e0e66e7279cc"`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" DROP CONSTRAINT "FK_5046075732061d907e87b222f77"`);
        await queryRunner.query(`ALTER TABLE "attentions" DROP CONSTRAINT "UQ_131c547137acdc8083c99879ed1"`);
        await queryRunner.query(`COMMENT ON COLUMN "attentions"."movement_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "attentions" ADD CONSTRAINT "FK_131c547137acdc8083c99879ed1" FOREIGN KEY ("movement_id") REFERENCES "movements"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" DROP CONSTRAINT "PK_211460778188b1fc0fd7778cb47"`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" ADD CONSTRAINT "PK_19a357d6a72a0ff15a033bae09c" PRIMARY KEY ("solution_id", "id")`);
        await queryRunner.query(`COMMENT ON COLUMN "problem_solutions"."solution_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" DROP CONSTRAINT "PK_19a357d6a72a0ff15a033bae09c"`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" ADD CONSTRAINT "PK_36cf2706a17277b061d56bce46a" PRIMARY KEY ("problem_id", "solution_id", "id")`);
        await queryRunner.query(`COMMENT ON COLUMN "problem_solutions"."problem_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" ADD CONSTRAINT "FK_0895199d31b4446e0e66e7279cc" FOREIGN KEY ("solution_id") REFERENCES "solutions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" ADD CONSTRAINT "FK_5046075732061d907e87b222f77" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "technical_areas" ADD CONSTRAINT "UQ_98c47cca690978356fbd1c830bc" UNIQUE ("phone")`);
        await queryRunner.query(`COMMENT ON COLUMN "technical_areas"."phone" IS NULL`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" DROP CONSTRAINT "PK_36cf2706a17277b061d56bce46a"`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" ADD CONSTRAINT "PK_cb378e9d913c2794fbd89822a69" PRIMARY KEY ("problem_id", "solution_id")`);
        await queryRunner.query(`ALTER TABLE "problem_solutions" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "attentions" ADD CONSTRAINT "FK_d91b75c9207769460f8af05b219" FOREIGN KEY ("problem_solution_id", "problem_solution_id") REFERENCES "problem_solutions"("problem_id","solution_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
