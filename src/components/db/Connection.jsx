import { PrismaClient } from '@prisma/client';

export async function getPrismaClient(dbstring) {
    const connectionString = `${process.env.DB_URL_1}${dbstring}${process.env.DB_URL_2}`;

    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: connectionString,
            },
        },
    });

    await prisma.$connect();
    return prisma;
}

export async function ReceiptSchema(prisma) {
    const createTableQuery = `
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ORIGIN_SCHEME_RECEIPT' and xtype='U')
        CREATE TABLE ORIGIN_SCHEME_RECEIPT (
            id INT PRIMARY KEY IDENTITY(1,1),
            ReceiptNo NVARCHAR(255) UNIQUE,
            ReceiptDate NVARCHAR(255),
            CardNo NVARCHAR(255),
            SchemeType NVARCHAR(255),
            SchemeName NVARCHAR(255),
            SchemeCode NVARCHAR(255),
            MobileNo NVARCHAR(255),
            MemberName NVARCHAR(255),
            Address NVARCHAR(255),
            CollectionPoint BIT,
            CashDesc NVARCHAR(255),
            CashAmount INT,
            CardDesc NVARCHAR(255),
            CardAmount INT,
            OnlineParticulars NVARCHAR(255),
            OnlineAcc NVARCHAR(255),
            OnlineDesc NVARCHAR(255),
            OnlineAmount INT,
            UPIParticulars NVARCHAR(255),
            UPIAcc NVARCHAR(255),
            UPIDesc NVARCHAR(255),
            UPIAmount INT,
            Description NVARCHAR(255),
            Amount INT,
            GoldWt FLOAT,
            GoldAmount FLOAT,
            Incharge NVARCHAR(255)
        );
    `;

    const result = await prisma.$executeRawUnsafe(createTableQuery);
}


export async function SchemetypeSchema(prisma) {
    const createTableQuery = `
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ORIGIN_SCHEMETYPE' and xtype='U')
        CREATE TABLE ORIGIN_SCHEMETYPE (
            id INT PRIMARY KEY IDENTITY(1,1),
            SchemeType NVARCHAR(255) UNIQUE,
            SchemeMode NVARCHAR(255)
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function SchemenameSchema(prisma) {
    const createTableQuery = `
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ORIGIN_SCHEME_NAME' and xtype='U')
        CREATE TABLE ORIGIN_SCHEME_NAME (
            id INT PRIMARY KEY IDENTITY(1,1),
            SchemeCode NVARCHAR(255) UNIQUE,
            SchemeType NVARCHAR(255),
            SchemeName NVARCHAR(255) UNIQUE,
            SchemeAmount FLOAT,
            SchemeDuration FLOAT,
            SchemePersons FLOAT,
            BonusMonth FLOAT,
            BonusAmount FLOAT,
            SchemeValue FLOAT,
            Commper FLOAT,
            Commamt FLOAT,
            Continuous BIT
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function Schemeuserschema(prisma) {
    const createTableQuery = `
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ORIGIN_SCHEME_USER' and xtype='U')
        CREATE TABLE ORIGIN_SCHEME_USER (
            id INT PRIMARY KEY IDENTITY(1,1),
            SchemeType NVARCHAR(255),
            SchemeName NVARCHAR(255),
            SchemeCode NVARCHAR(255),
            MemberName NVARCHAR(255),
            CardNo NVARCHAR(255) UNIQUE,
            Gender NVARCHAR(255),
            City NVARCHAR(255),
            Address NVARCHAR(255),
            Pincode FLOAT,
            State NVARCHAR(255),
            District NVARCHAR(255),
            LandLine NVARCHAR(255),
            Mobile1 NVARCHAR(255),
            Mobile2 NVARCHAR(255),
            Email NVARCHAR(255),
            Dob NVARCHAR(255),
            Anniversary NVARCHAR(255),
            Nominee NVARCHAR(255),
            MobileNo NVARCHAR(255),
            Incharge NVARCHAR(255),
            JoinDate NVARCHAR(255),
            CollectionPoint NVARCHAR(255),
            LastDatePaid NVARCHAR(255),
            ActualDateToPay NVARCHAR(255),
            NextDateToPay NVARCHAR(255)
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function SchemeCardSchema(prisma) {
    const createTableQuery = `
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ORIGIN_SCHEME_USER_CARD' and xtype='U')
        CREATE TABLE ORIGIN_SCHEME_USER_CARD (
            id INT PRIMARY KEY IDENTITY(1,1),
            CardNo NVARCHAR(255) UNIQUE,
            Month DATETIME,
            RecNo NVARCHAR(255),
            RecDate DATETIME,
            RecAmt FLOAT,
            GoldWt FLOAT,
            GoldAmt FLOAT,
            ModeOfPay NVARCHAR(255),
            Balance FLOAT
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function SchemesettlementSchema(prisma) {
    const createTableQuery = `
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ORIGIN_SCHEME_USER_SETTLEMENT' and xtype='U')
        CREATE TABLE ORIGIN_SCHEME_USER_SETTLEMENT (
            id INT PRIMARY KEY IDENTITY(1,1),
            SchemeType NVARCHAR(255),
            SchemeName NVARCHAR(255),
            CardNo NVARCHAR(255) UNIQUE,
            MemberName NVARCHAR(255),
            MobileNo NVARCHAR(255),
            SchemeAmount FLOAT,
            PaidAmount FLOAT,
            BalanceAmount FLOAT,
            GoldWt FLOAT,
            GoldAmt FLOAT,
            Settled BIT,
            Discontinue BIT,
            Description NVARCHAR(255),
            Date NVARCHAR(255),
            VoucherNo NVARCHAR(255) UNIQUE
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function LoginSchema(prisma) {
    const createTableQuery = `
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='LOGIN_USER' and xtype='U')
        CREATE TABLE LOGIN_USER (
            id INT PRIMARY KEY IDENTITY(1,1),
            UserName NVARCHAR(255) UNIQUE,
            Password NVARCHAR(255)
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function OnlinemodeSchema(prisma) {
    const createTableQuery = `
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ONLINEMODE_MAST' and xtype='U')
        CREATE TABLE ONLINEMODE_MAST (
            id INT PRIMARY KEY IDENTITY(1,1),
            PMODE NVARCHAR(255),
            PAYMODE NVARCHAR(255),
            ACCNO NVARCHAR(255),
            ACCNAME NVARCHAR(255)
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function MobileSchema(prisma) {
    const createTableQuery = `
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='MOBILE_LOGIN' and xtype='U')
        CREATE TABLE MOBILE_LOGIN (
            id INT PRIMARY KEY IDENTITY(1,1),
            MemberName NVARCHAR(255),
            Gender NVARCHAR(255),
            City NVARCHAR(255),
            Address NVARCHAR(255),
            Pincode FLOAT,
            State NVARCHAR(255),
            District NVARCHAR(255),
            MobileNo NVARCHAR(255) UNIQUE,
            Password NVARCHAR(255),
            Email NVARCHAR(255),
            Dob NVARCHAR(255),
            Anniversary NVARCHAR(255)
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function FeedbackSchema(prisma) {
    const createTableQuery = `
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='FEEDBACK' and xtype='U')
        CREATE TABLE FEEDBACK (
            id INT PRIMARY KEY IDENTITY(1,1),
            MemberName NVARCHAR(255),
            Email NVARCHAR(255),
            MobileNo NVARCHAR(255),
            Category NVARCHAR(255),
            Feedback NVARCHAR(MAX),
            created_at DATETIME DEFAULT GETDATE()
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function TransactionSchema(prisma) {
    const createTableQuery = `
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Transactions' and xtype='U')
        CREATE TABLE Transactions (
            id INT PRIMARY KEY IDENTITY(1,1),
            Status NVARCHAR(255),
            refid NVARCHAR(255),
            transid NVARCHAR(255),
            userid NVARCHAR(255),
            usermobile NVARCHAR(255),
            cardno NVARCHAR(255),
            Amount INT,
            created_at DATETIME DEFAULT GETDATE()
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}