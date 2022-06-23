<script>
    import {createEventDispatcher} from 'svelte'
    
    const dispatch = createEventDispatcher();
    let selected=1;

  

</script>
<div class="flex">
    <button on:click="{()=>{  selected=1 ;
                            dispatch('clicked',1)
                            // console.log(selected) 
                            } }"
         class="{ selected ===1 ? 'bg-pink-600 text-white':'bg-gray-300 text-gray-800' } rounded-tl-md rounded-bl-md border p-2">all</button>
    <button on:click="{()=>{ selected=2; 
                            dispatch('clicked',2)
                            // console.log(selected) 
                            } }"
         class="{ selected === 2 ? 'bg-pink-600 text-white':'bg-gray-300 text-gray-800'} rounded-tr-md rounded-br-md border p-2">favourite</button>
</div>