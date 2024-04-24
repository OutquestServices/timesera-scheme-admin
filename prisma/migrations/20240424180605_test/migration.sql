/*
  Warnings:

  - Added the required column `NextDateToPay` to the `ORIGIN_SCHEME_USER` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ORIGIN_SCHEME_USER" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SchemeType" TEXT NOT NULL,
    "SchemeName" TEXT NOT NULL,
    "MemberName" TEXT NOT NULL,
    "CardNo" TEXT NOT NULL,
    "Gender" BOOLEAN NOT NULL,
    "City" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Pincode" INTEGER NOT NULL,
    "State" TEXT NOT NULL,
    "District" TEXT NOT NULL,
    "LandLine" TEXT NOT NULL,
    "Mobile1" TEXT NOT NULL,
    "Mobile2" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Dob" DATETIME NOT NULL,
    "Anniversary" DATETIME NOT NULL,
    "Nominee" TEXT NOT NULL,
    "MobileNo" TEXT NOT NULL,
    "Incharge" TEXT NOT NULL,
    "JoinDate" DATETIME NOT NULL,
    "CollectionPoint" BOOLEAN NOT NULL,
    "LastDatePaid" DATETIME NOT NULL,
    "ActualDateToPay" DATETIME NOT NULL,
    "NextDateToPay" DATETIME NOT NULL
);
INSERT INTO "new_ORIGIN_SCHEME_USER" ("ActualDateToPay", "Address", "Anniversary", "CardNo", "City", "CollectionPoint", "District", "Dob", "Email", "Gender", "Incharge", "JoinDate", "LandLine", "LastDatePaid", "MemberName", "Mobile1", "Mobile2", "MobileNo", "Nominee", "Pincode", "SchemeName", "SchemeType", "State", "id") SELECT "ActualDateToPay", "Address", "Anniversary", "CardNo", "City", "CollectionPoint", "District", "Dob", "Email", "Gender", "Incharge", "JoinDate", "LandLine", "LastDatePaid", "MemberName", "Mobile1", "Mobile2", "MobileNo", "Nominee", "Pincode", "SchemeName", "SchemeType", "State", "id" FROM "ORIGIN_SCHEME_USER";
DROP TABLE "ORIGIN_SCHEME_USER";
ALTER TABLE "new_ORIGIN_SCHEME_USER" RENAME TO "ORIGIN_SCHEME_USER";
CREATE UNIQUE INDEX "ORIGIN_SCHEME_USER_CardNo_key" ON "ORIGIN_SCHEME_USER"("CardNo");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
