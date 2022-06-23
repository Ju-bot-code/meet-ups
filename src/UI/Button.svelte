<script>
    export let type='button';
    export let href=false;
    export let inervse=false;
    export let disable=false;
</script>

{#if href}
<a class="inline-block bg-pink-600 text-white p-2 rounded-md" href="{href}"><slot></slot></a>
{:else}
{#if inervse}
<button type={type} disabled={disable} class=" border-2 border-pink-600 text-pink-600 p-2 rounded-md" on:click><slot></slot></button>
 {:else}   
<button type={type} disabled={disable} class="bg-pink-600 text-white p-2 rounded-md" on:click><slot></slot></button>
{/if}
{/if}