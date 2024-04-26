/*
  Warnings:

  - Added the required column `SchemeCode` to the `ORIGIN_SCHEME_NAME` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ORIGIN_SCHEME_NAME" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SchemeType" TEXT NOT NULL,
    "SchemeName" TEXT NOT NULL,
    "SchemeCode" TEXT NOT NULL,
    "SchemeAmount" INTEGER NOT NULL,
    "SchemeDuration" INTEGER NOT NULL,
    "SchemePersons" INTEGER NOT NULL,
    "BonusMonth" INTEGER NOT NULL,
    "BonusAmount" INTEGER NOT NULL,
    "SchemeValue" INTEGER NOT NULL,
    "Commper" INTEGER NOT NULL,
    "Commamt" INTEGER NOT NULL
);
INSERT INTO "new_ORIGIN_SCHEME_NAME" ("BonusAmount", "BonusMonth", "Commamt", "Commper", "SchemeAmount", "SchemeDuration", "SchemeName", "SchemePersons", "SchemeType", "SchemeValue", "id") SELECT "BonusAmount", "BonusMonth", "Commamt", "Commper", "SchemeAmount", "SchemeDuration", "SchemeName", "SchemePersons", "SchemeType", "SchemeValue", "id" FROM "ORIGIN_SCHEME_NAME";
DROP TABLE "ORIGIN_SCHEME_NAME";
ALTER TABLE "new_ORIGIN_SCHEME_NAME" RENAME TO "ORIGIN_SCHEME_NAME";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
