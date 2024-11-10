import type { LayoutServerLoad } from './$types';
import {
	CLOUDFLARE_API_TOKEN,
	CLOUDFLARE_ACCOUNT_ID,
	CLOUDFLARE_KV_NAMESPACE_ID
} from '$env/static/private';

export const load: LayoutServerLoad = async () => {
	if (CLOUDFLARE_API_TOKEN === undefined || CLOUDFLARE_ACCOUNT_ID === undefined || CLOUDFLARE_KV_NAMESPACE_ID === undefined) {
		return {};
	}
	const key = 'test';
	const url = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${CLOUDFLARE_KV_NAMESPACE_ID}/values/${key}`;
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`
		}
	});
	console.log(response.status, response.statusText);
	return {
		ok: response.ok,
		status: response.status,
		statusText: response.statusText,
		body: await response.text()
	};
};
