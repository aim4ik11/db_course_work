/*
  Warnings:

  - You are about to drop the column `survey_id` on the `Answer` table. All the data in the column will be lost.
  - Added the required column `passed_survey_id` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_survey_id_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "survey_id",
ADD COLUMN     "passed_survey_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_passed_survey_id_fkey" FOREIGN KEY ("passed_survey_id") REFERENCES "PassedSurvey"("id") ON DELETE CASCADE ON UPDATE CASCADE;
