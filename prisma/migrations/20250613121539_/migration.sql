/*
  Warnings:

  - A unique constraint covering the columns `[tenantId,publicId]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Cliente_publicId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_tenantId_publicId_key" ON "Cliente"("tenantId", "publicId");
