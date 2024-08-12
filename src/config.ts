import "dotenv/config";
import { parse } from "pg-connection-string";

export const dbConfig = parse(process.env.DATABASE_URL!);

export const HOST = process.env.HOST!;
export const PORT = Number(process.env.PORT!);
export const TELEGRAM_ACCESS_TOKEN = process.env.TELEGRAM_ACCESS_TOKEN!;
export const APP_URL = process.env.APP_URL!;
export const SUNO_COOKIE = process.env.SUNO_COOKIE!;
export const SUNO_API_KEY = process.env.SUNO_API_KEY!;