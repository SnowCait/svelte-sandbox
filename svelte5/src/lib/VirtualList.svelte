<script lang="ts" generics="T">
    let items: T[] = [];
    let itemsForView: T[] = [];
    export function add(newItems: T[], index: number = Infinity): void {
        if (index>items.length) {
        items.push(...newItems);
        } else {
            items.splice(index, 0, ...newItems);
        }
    }
</script>

{#each items as item}
    <slot>
        <div>{item}</div>
    </slot>
{/each}