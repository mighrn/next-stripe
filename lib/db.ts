import * as mysql from 'mysql2'

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'members',
    password: 'MySQL.Root.Password',
})
export async function query(
    q:string,
    values: (string | number)[] | string | number = []
) {
    try {
        const results = await db.promise().execute(q, values)
        console.log('Results from Query', results[0][0]['customer'])
        await db.end()
        return results[0][0]['customer']
    } catch (error) {
        throw new Error(error.message)
    }
}
