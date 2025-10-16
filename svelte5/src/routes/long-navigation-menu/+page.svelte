<script lang="ts">
</script>

<ul>
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
	<li>Item 4</li>
	<li>Item 5</li>
	<li>Item 6</li>
	<li>Item 7</li>
	<li>Item 8</li>
	<li>Item 9</li>
	<li>Item 10</li>
</ul>

<div>
	<button>Post</button>
</div>

<style>
	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
		width: 300px;
		overflow: auto;
	}

	li {
		margin: 5px 0;
		height: 100px;
		background-color: darksalmon;
	}

	div {
		width: 300px;
		background-color: white;
		position: sticky;
		bottom: 0;
		padding: 50px 0;

		/* box-shadow: 0px -10px 10px 5px white; */
	}

	button {
		width: 300px;
		height: 100px;
		margin: auto;
	}

	:global(body) {
		padding: 0;
	}
</style>
