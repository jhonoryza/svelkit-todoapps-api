import { db } from "../database";
import { users } from "../schema";
import bcrypt from 'bcrypt'

export async function userFactory(number: number, token?: string) {
    for (let index = 1; index <= number; index++) {
        const password = await bcrypt.hash("Password" + index, 10);
        await db.insert(users).values({
            name: "name" + index,
            password: password,
            token: token,
            email: "email" + index + "@email.com",
        }).execute();
    }
}