import type { RequestEvent } from '@sveltejs/kit'
import { Crawler } from 'es6-crawler-detect'

const crawler_detector = new Crawler()

function is_bot(request: Request): boolean {
	const user_agent = request.headers.get('user-agent') ?? ''
	return crawler_detector.isCrawler(user_agent)
}

function is_same_origin(request: Request, site_origin: string): boolean {
	const origin = request.headers.get('origin')
	const referer = request.headers.get('referer')

	if (origin !== null) return origin === site_origin
	if (referer !== null) return referer.startsWith(site_origin)

	return false
}

export function is_allowed(event: RequestEvent): boolean {
	return is_same_origin(event.request, event.url.origin) && !is_bot(event.request)
}
