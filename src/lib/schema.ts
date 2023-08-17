import { timestamp, customType, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

// custom type unsigned big integer
const unsignedBigint = customType<{ data: number }>({
	dataType() {
		return 'bigint UNSIGNED';
	}
});

// start
// custom type unsigned multiple of integer autoincrement primary key
type IdType = "tinyint" | "smallint" | "mediumint" | "int" | "bigint";
interface UIntConfig {
    type?: IdType;
}

export const unsignedIntAutoIncrement = customType<{ data: number; config: UIntConfig; primaryKey: true; default: true }>({
    dataType: (config) => {
        return `${config?.type ?? "int"} UNSIGNED AUTO_INCREMENT`;
    }
});

export function primary(dbName: string, config?: UIntConfig) {
    return unsignedIntAutoIncrement(dbName, config).primaryKey()
};
// end

// Table users
export const users = mysqlTable('users', {
	id: primary('id', { type: 'bigint' }),
	name: varchar('username', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	password: varchar('password', { length: 255 }).notNull(),
	updated_at: timestamp('updated_at').defaultNow(),
    created_at: timestamp('created_at').defaultNow()
});

// Table todos
export const todos = mysqlTable('todos', {
	id: primary('id', { type: 'bigint' }),
    user_id: unsignedBigint('user_id').notNull().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	title: varchar('title', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }),
    order: unsignedBigint('order').notNull(),
	created_at: timestamp('created_at').defaultNow(),
	updated_at: timestamp('updated_at').defaultNow()
});