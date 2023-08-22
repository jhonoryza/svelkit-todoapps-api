import { db } from "../database";
import { todos } from "../schema";

export async function todoFactory(number: number, userId: number) {
    for (let index = 1; index <= number; index++) {
        await db.insert(todos).values({
            title: "title" + index,
            description: "description" + index,
            order: index,
            user_id: userId,
        }).execute();
    }
}