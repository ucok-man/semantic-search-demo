import * as dotenv from "dotenv";
import Openai from "openai";

dotenv.config();

export const openai = new Openai({
  apiKey: process.env.OPENAI_API_KEY!,
});
