<script lang="ts">
    import VirtualList from '$lib/VirtualList.svelte';

    const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
</script>

<h1>Virtual List</h1>

<VirtualList />