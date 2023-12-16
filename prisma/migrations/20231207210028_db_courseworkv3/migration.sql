/*
  Warnings:

  - The values [SCALE,TEXT] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `text` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Answer` table. All the data in the column will be lost.
  - Added the required column `survey_id` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variant_id` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QuestionType_new" AS ENUM ('SINGLE_ANSWER', 'MULTIPLE_ANSWERS');
ALTER TABLE "Question" ALTER COLUMN "type" TYPE "QuestionType_new" USING ("type"::text::"QuestionType_new");
ALTER TYPE "QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "QuestionType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_user_id_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "text",
DROP COLUMN "user_id",
ADD COLUMN     "survey_id" INTEGER NOT NULL,
ADD COLUMN     "variant_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AnswerVariant" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "AnswerVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PassedSurvey" (
    "id" SERIAL NOT NULL,
    "survey_id" INTEGER NOT NULL,
    "passed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "PassedSurvey_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnswerVariant" ADD CONSTRAINT "AnswerVariant_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassedSurvey" ADD CONSTRAINT "PassedSurvey_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "Survey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassedSurvey" ADD CONSTRAINT "PassedSurvey_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "AnswerVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "PassedSurvey"("id") ON DELETE CASCADE ON UPDATE CASCADE;
