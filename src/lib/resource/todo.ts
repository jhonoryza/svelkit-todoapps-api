import { mysqlDatetimeUtc } from "$lib/util";
import type { todo } from "$lib/model/todo";

type result = {
	id: number;
	title: string;
	description: string;
	order: number;
	updated_at: string;
	created_at: string;
};
export const todoResource = ( todos: todo[] ): result[] => {
    
    const result: result[] = [];
	todos.forEach((todo: todo) => {
		result.push({
			id: todo.id,
			title: todo.title,
			description: todo.description || '',
			order: todo.order,
			updated_at: mysqlDatetimeUtc(todo.updated_at),
			created_at: mysqlDatetimeUtc(todo.created_at)
		});
	})
    return result
};
