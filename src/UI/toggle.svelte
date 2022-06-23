<script>
   export let chossenOption =1;
     export let emptyy=false;
    let val ="heyyo";
    export function empty()
    {
        val='';
    }


</script>



{#if emptyy}
<div>
    <h1>
        bind function from a different component
    </h1>
    <input type="text" value="{val}" class="border rounded-md">
</div>
{:else}

<button class="border p-2 {chossenOption === 1 ? 'text-gray-500': 'text-gray-900' }"
    disabled={chossenOption === 1}
     on:click={()=> chossenOption = 1}>option 1</button>

<button 
    disabled={chossenOption === 2}
 class="border p-2 {chossenOption === 2 ? 'text-gray-500': 'text-gray-900' }"  on:click={()=> chossenOption = 2}>option 2</button>
{#if chossenOption === 1}
<p>your chose option 1</p>
{:else}
<p>your chose option 2</p>
{/if}

{/if}