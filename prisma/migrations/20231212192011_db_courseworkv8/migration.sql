/*
  Warnings:

  - The primary key for the `RoleHasPermission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RoleHasPermission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RoleHasPermission" DROP CONSTRAINT "RoleHasPermission_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "RoleHasPermission_pkey" PRIMARY KEY ("role_id", "permission_id");
