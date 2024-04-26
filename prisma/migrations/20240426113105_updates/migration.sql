/*
  Warnings:

  - A unique constraint covering the columns `[SchemeCode]` on the table `ORIGIN_SCHEME_NAME` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ORIGIN_SCHEME_NAME_SchemeCode_key" ON "ORIGIN_SCHEME_NAME"("SchemeCode");
