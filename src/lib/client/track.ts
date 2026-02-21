import { browser } from '$app/environment'
import { get_device_type } from './utils'

export async function get_visits() {
	const res = await fetch('/api/visits')
	if (!res.ok) return undefined
	const data = await res.json()
	return data.counter as number
}

export async function track_visit() {
	if (!browser) return
	if (sessionStorage.getItem('visit-tracked')) return

	const device_type = get_device_type()

	const res = await fetch('/api/visits', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ device_type })
	})

	if (res.ok) sessionStorage.setItem('visit-tracked', '1')
}
