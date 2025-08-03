<script>
	import MyElement from '$lib/MyElement.svelte';

	let name = 'World';

	setTimeout(() => {
		name = 'Snow';
	}, 1000);
	setTimeout(() => {
		name = 'Cait';
	}, 5000);
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<MyElement {name}>test</MyElement>
<my-element {name}>test2</my-element>
