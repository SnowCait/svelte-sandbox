import type { LayoutServerLoad } from './$types';
import { CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_KV_NAMESPACE_ID } from '$env/static/private';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async () => {
	const key = 'test';
	const url = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${CLOUDFLARE_KV_NAMESPACE_ID}/values/${key}`;
	const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`
        }
    });
	console.log(response.status, response.statusText);
	if (response.ok) {
		console.log(await response.text());
        error(403);
	}
};