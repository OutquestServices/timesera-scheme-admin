-- CreateTable
CREATE TABLE "ORIGIN_SCHEMETYPE" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SchemeType" TEXT NOT NULL,
    "SchemeMode" TEXT NOT NULL,
    "SchemeCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ORIGIN_SCHEME_NAME" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SchemeType" TEXT NOT NULL,
    "SchemeName" TEXT NOT NULL,
    "SchemeAmount" INTEGER NOT NULL,
    "SchemeDuration" INTEGER NOT NULL,
    "SchemePersons" INTEGER NOT NULL,
    "BonusMonth" INTEGER NOT NULL,
    "BonusAmount" INTEGER NOT NULL,
    "SchemeValue" INTEGER NOT NULL,
    "Commper" INTEGER NOT NULL,
    "Commamt" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ORIGIN_SCHEME_USER" (
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
    "ActualDateToPay" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ORIGIN_SCHEME_USER_CARD" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CardNo" TEXT NOT NULL,
    "Month" DATETIME NOT NULL,
    "RecNo" TEXT NOT NULL,
    "RecDate" DATETIME NOT NULL,
    "RecAmt" INTEGER NOT NULL,
    "GoldWt" INTEGER NOT NULL,
    "GoldAmt" INTEGER NOT NULL,
    "ModeOfPay" TEXT NOT NULL,
    "Balance" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ORIGIN_SCHEME_USER_SETTLEMENT" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SchemeType" TEXT NOT NULL,
    "SchemeName" TEXT NOT NULL,
    "CardNo" TEXT NOT NULL,
    "SchemeAmount" INTEGER NOT NULL,
    "PaidAmount" INTEGER NOT NULL,
    "BalanceAmount" INTEGER NOT NULL,
    "GoldWt" INTEGER NOT NULL,
    "GoldAmt" INTEGER NOT NULL,
    "Settled" BOOLEAN NOT NULL,
    "Discontinue" BOOLEAN NOT NULL,
    "Description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ORIGIN_SCHEME_RECEIPT" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ReceiptNo" TEXT NOT NULL,
    "ReceiptDate" DATETIME NOT NULL,
    "CardNo" TEXT NOT NULL,
    "SchemeType" TEXT NOT NULL,
    "SchemeName" TEXT NOT NULL,
    "MobileNo" TEXT NOT NULL,
    "MemberName" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "CollectionPoint" BOOLEAN NOT NULL,
    "PaymentCode" TEXT NOT NULL,
    "AccNo" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Amount" INTEGER NOT NULL,
    "GoldWt" INTEGER NOT NULL,
    "GoldAmount" INTEGER NOT NULL,
    "Incharge" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ORIGIN_SCHEMETYPE_SchemeCode_key" ON "ORIGIN_SCHEMETYPE"("SchemeCode");

-- CreateIndex
CREATE UNIQUE INDEX "ORIGIN_SCHEME_USER_CardNo_key" ON "ORIGIN_SCHEME_USER"("CardNo");

-- CreateIndex
CREATE UNIQUE INDEX "ORIGIN_SCHEME_USER_SETTLEMENT_CardNo_key" ON "ORIGIN_SCHEME_USER_SETTLEMENT"("CardNo");

-- CreateIndex
CREATE UNIQUE INDEX "ORIGIN_SCHEME_RECEIPT_ReceiptNo_key" ON "ORIGIN_SCHEME_RECEIPT"("ReceiptNo");
