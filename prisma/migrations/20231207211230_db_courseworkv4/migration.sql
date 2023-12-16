/*
  Warnings:

  - You are about to drop the column `question_id` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the `Action` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `State` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SurveyState" AS ENUM ('OPENED', 'CLOSED', 'PAUSED');

-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_role_id_fkey";

-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_state_id_fkey";

-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_survey_id_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_question_id_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "question_id";

-- AlterTable
ALTER TABLE "Survey" ADD COLUMN     "state" "SurveyState" NOT NULL DEFAULT 'OPENED';

-- DropTable
DROP TABLE "Action";

-- DropTable
DROP TABLE "State";
