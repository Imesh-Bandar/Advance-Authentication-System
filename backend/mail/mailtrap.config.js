import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

// =========================|| Mailtrap Configuration ||========================= //
const TOKEN = process.env.MAILTRAP_API_TOKEN || "05adffb775bc23e4b60823a0330dbc1d";
const ENDPOINT = process.env.MAILTRAP_ENDPOINT || "https://send.api.mailtrap.io/";

// Initialize Mailtrap client with the provided token and endpoint
export const MailTrapClient = new MailtrapClient({
    endpoint: ENDPOINT,
    token: TOKEN,
});

export const sender = {
    email: "hello@demomailtrap.co",
    name: "Mailtrap Test",
};

 
 