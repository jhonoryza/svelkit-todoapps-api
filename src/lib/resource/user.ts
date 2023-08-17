import { mysqlDatetimeUtc } from "$lib/util";

type user = {
    id: number;
    name: string;
    email: string;
    updated_at: Date;
    created_at: Date;
}

type result = {
	id: number;
	name: string;
	email: string;
	updated_at: string;
	created_at: string;
};
export const userResource = ( users: user[] ): result[] => {
    
    const result: result[] = [];
	users.forEach((user: user) => {
		result.push({
			id: user.id,
			name: user.name,
			email: user.email,
			updated_at: mysqlDatetimeUtc(user.updated_at),
			created_at: mysqlDatetimeUtc(user.created_at)
		})
	})
    return result
};
