<script lang="ts">
	import twitter from 'twitter-text';

	let text = $state('');
	let content = $state('');

	$effect(() => {
		content = twitter.autoLink(text);
	});
</script>

<h1>twitter-text</h1>

<h3>Input</h3>
<textarea bind:value={text} rows="5" cols="50"></textarea>

<h3>Output</h3>
<textarea bind:value={content} rows="5" cols="50" readonly></textarea>
