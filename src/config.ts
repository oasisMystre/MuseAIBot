import "dotenv/config";
import { parse } from "pg-connection-string";

export const marketingWallet = process.env.MARKETING_WALLET!;
export const smsPvaApiKey = process.env.SMS_PVA_API_KEY!;

export const dbConfig = parse(process.env.DATABASE_URL!);