import { db } from '$lib/server/db'
import { is_allowed } from '$lib/server/utils'
import { json } from '@sveltejs/kit'

export const GET = async (event) => {
	if (!is_allowed(event)) return json({ error: 'Forbidden' }, { status: 403 })

	try {
		const res = await db.execute('SELECT COUNT(*) as counter FROM visits')
		const counter = res.rows[0].counter as number
		return json({ counter })
	} catch (err) {
		console.error(err)
		return json({ error: 'Database error' }, { status: 500 })
	}
}

export const POST = async (event) => {
	if (!is_allowed(event)) return json({ error: 'Forbidden' }, { status: 403 })

	if (event.request.headers.get('Content-Type') !== 'application/json') {
		return json({ error: 'Invalid Request' }, { status: 400 })
	}

	const body: unknown = await event.request.json()

	const is_valid_body =
		typeof body === 'object' &&
		body !== null &&
		'device_type' in body &&
		typeof body.device_type === 'string'

	if (!is_valid_body) return json({ error: 'Invalid Request Body' }, { status: 400 })

	const device_type = body.device_type as string

	const sql = 'INSERT INTO visits (device_type) VALUES (?)'

	try {
		await db.execute(sql, [device_type])
	} catch (err) {
		console.error(err)
		return json({ error: 'Database error' }, { status: 500 })
	}

	return json({ message: 'Visit has been tracked' })
}
