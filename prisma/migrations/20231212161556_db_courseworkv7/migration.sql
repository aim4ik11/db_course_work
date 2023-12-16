/*
  Warnings:

  - You are about to drop the `Grant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Grant" DROP CONSTRAINT "Grant_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "Grant" DROP CONSTRAINT "Grant_role_id_fkey";

-- DropTable
DROP TABLE "Grant";

-- CreateTable
CREATE TABLE "RoleHasPermission" (
    "id" SERIAL NOT NULL,
    "appointed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "RoleHasPermission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoleHasPermission" ADD CONSTRAINT "RoleHasPermission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleHasPermission" ADD CONSTRAINT "RoleHasPermission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
