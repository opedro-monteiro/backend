/*
  Warnings:

  - Made the column `tenantId` on table `Cliente` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tenantId` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "tenantId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "tenantId" SET NOT NULL;
