import { db } from "../database";
import { users } from "../schema";

export async function userFactory(number: number) {
    for (let index = 0; index < number; index++) {
        await db.insert(users).values({
            name: "name" + index,
            password: "password" + index,
            email: "email" + index + "@email.com",
        }).execute();
    }
}