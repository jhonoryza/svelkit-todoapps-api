export function mysqlDatetimeUtc(date: Date = new Date()) {
	return date.toISOString().slice(0, 19).replace('T', ' ');
}

// Use this function instead of new Date() when converting a MySQL datetime to a
// Date object so that the date is interpreted as UTC instead of local time (default behavior)
export function mysqlDatetimeUtcToDate(mysqlDatetimeUtc: string) {
	return new Date(mysqlDatetimeUtc.replace(' ', 'T') + 'Z');
}
