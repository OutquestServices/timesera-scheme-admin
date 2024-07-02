import { PrismaClient } from '@prisma/client';

export async function getPrismaClient(dbstring) {
    const connectionString = `file:./${dbstring}.db`;

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
        CREATE TABLE IF NOT EXISTS ORIGIN_SCHEME_RECEIPT (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ReceiptNo TEXT UNIQUE,
            ReceiptDate TEXT,
            CardNo TEXT,
            SchemeType TEXT,
            SchemeName TEXT,
            SchemeCode TEXT,
            MobileNo TEXT,
            MemberName TEXT,
            Address TEXT,
            CollectionPoint INTEGER,
            CashDesc TEXT,
            CashAmount INTEGER,
            CardDesc TEXT,
            CardAmount INTEGER,
            OnlineParticulars TEXT,
            OnlineAcc TEXT,
            OnlineDesc TEXT,
            OnlineAmount INTEGER,
            UPIParticulars TEXT,
            UPIAcc TEXT,
            UPIDesc TEXT,
            UPIAmount INTEGER,
            Description TEXT,
            Amount INTEGER,
            GoldWt REAL,
            GoldAmount REAL,
            Incharge TEXT
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function SchemetypeSchema(prisma) {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ORIGIN_SCHEMETYPE (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            SchemeType TEXT UNIQUE,
            SchemeMode TEXT
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function SchemenameSchema(prisma) {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ORIGIN_SCHEME_NAME (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            SchemeCode TEXT UNIQUE,
            SchemeType TEXT,
            SchemeName TEXT UNIQUE,
            SchemeAmount REAL,
            SchemeDuration REAL,
            SchemePersons REAL,
            BonusMonth REAL,
            BonusAmount REAL,
            SchemeValue REAL,
            Commper REAL,
            Commamt REAL,
            Continuous INTEGER
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function Schemeuserschema(prisma) {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ORIGIN_SCHEME_USER (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            SchemeType TEXT,
            SchemeName TEXT,
            SchemeCode TEXT,
            MemberName TEXT,
            CardNo TEXT UNIQUE,
            Gender TEXT,
            City TEXT,
            Address TEXT,
            Pincode REAL,
            State TEXT,
            District TEXT,
            LandLine TEXT,
            Mobile1 TEXT,
            Mobile2 TEXT,
            Email TEXT,
            Dob TEXT,
            Anniversary TEXT,
            Nominee TEXT,
            MobileNo TEXT,
            Incharge TEXT,
            JoinDate TEXT,
            CollectionPoint TEXT,
            LastDatePaid TEXT,
            ActualDateToPay TEXT,
            NextDateToPay TEXT
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function SchemeCardSchema(prisma) {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ORIGIN_SCHEME_USER_CARD (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            CardNo TEXT UNIQUE,
            Month TEXT,
            RecNo TEXT,
            RecDate TEXT,
            RecAmt REAL,
            GoldWt REAL,
            GoldAmt REAL,
            ModeOfPay TEXT,
            Balance REAL
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function SchemesettlementSchema(prisma) {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ORIGIN_SCHEME_USER_SETTLEMENT (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            SchemeType TEXT,
            SchemeName TEXT,
            CardNo TEXT UNIQUE,
            MemberName TEXT,
            MobileNo TEXT,
            SchemeAmount REAL,
            PaidAmount REAL,
            BalanceAmount REAL,
            GoldWt REAL,
            GoldAmt REAL,
            Settled INTEGER,
            Discontinue INTEGER,
            Description TEXT,
            Date TEXT,
            VoucherNo TEXT UNIQUE
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function LoginSchema(prisma) {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS LOGIN_USER (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            UserName TEXT UNIQUE,
            Password TEXT
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function OnlinemodeSchema(prisma) {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ONLINEMODE_MAST (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            PMODE TEXT,
            PAYMODE TEXT,
            ACCNO TEXT,
            ACCNAME TEXT
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function MobileSchema(prisma) {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS MOBILE_LOGIN (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            MemberName TEXT,
            Gender TEXT,
            City TEXT,
            Address TEXT,
            Pincode REAL,
            State TEXT,
            District TEXT,
            MobileNo TEXT UNIQUE,
            Password TEXT,
            Email TEXT,
            Dob TEXT,
            Anniversary TEXT
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function FeedbackSchema(prisma) {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS FEEDBACK (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            MemberName TEXT,
            Email TEXT,
            MobileNo TEXT,
            Category TEXT,
            Feedback TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}

export async function TransactionSchema(prisma) {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Status TEXT,
            refid TEXT,
            transid TEXT,
            userid TEXT,
            usermobile TEXT,
            cardno TEXT,
            Amount INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `;

    await prisma.$executeRawUnsafe(createTableQuery);
}
