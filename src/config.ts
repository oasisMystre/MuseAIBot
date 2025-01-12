import "dotenv/config";
import OpenAI from "openai";
import { parse } from "pg-connection-string";

export const dbConfig = parse(process.env.DATABASE_URL!);

export const HOST = process.env.HOST!;
export const PORT = Number(process.env.PORT!);
export const APP_URL = process.env.APP_URL!;
export const SUNO_API_KEY = process.env.SUNO_API_KEY!;
export const TELEGRAM_ACCESS_TOKEN = process.env.TELEGRAM_ACCESS_TOKEN!;

export const openai =  new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})