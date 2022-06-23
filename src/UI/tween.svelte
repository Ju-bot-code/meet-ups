<script>
    import {writable} from 'svelte/store'
    import {tweened} from 'svelte/motion' 
    import {cubicIn} from 'svelte/easing'
    import {spring} from 'svelte/motion'
    import {fly , scale, fade ,slide } from 'svelte/transition'
    import {flip} from 'svelte/animate'
    // spring takes physics in to  account 
    //option include stiffness ,damping ,precision(when it assumes the animation finishes)

    // let progress =writable(0);
    // let progress =spring(0);
    let progress =tweened(0,{
        delay:0,
        duration:700,
        easing:cubicIn
    });

    function update(){
        
            setTimeout(()=>{
            progress.set(0.1);
           },100);
    }

    let boxes=[];
    let input;
    function add(){
        boxes=[...boxes ,input.value];
    }

    function discard(value){
       boxes=boxes.filter(el => el !== value);
    }

</script>

<progress value={$progress} class=" w-full" ></progress>

<button class="p-1 border rounded-md" on:click={update}>updated</button>

<div class="my-2">
    <input type="text" class="border p-1" bind:this={input}>
    <button class="border p-1" on:click="{add}">add</button>
</div>
<div class="grid-cols-4 gap-4 grid">
    {#each boxes as box }
        <div  on:click={discard.bind(this,box)}
             transition:fly={{delay:0,duration:300,easing:cubicIn ,x :300 ,y:300}} 
            class="w-40 bg-gray-300 rounded-md  h-40 bg-gray shadow-lg flex justify-center items-center"
            on:introstart="{()=> console.log('Adding the element starts')}"
            on:introend="{()=> console.log('Adding the element ends')}"
            on:outrostart="{()=> console.log('Removing the element starts')}"
            on:outroend="{()=> console.log('Removing the element ends')}"
           >
            <!-- can add additional codes when the into starts or ends -->
            {box}
        </div>  
        {/each}
 
        <!-- <div transition:scale={{start:0.5, opacity:0.5}} class="w-40 bg-gray-300 rounded-md  h-40 bg-gray shadow-lg flex justify-center items-center"> {box}</div>   -->
        <!-- <div transition:slide class="w-40 bg-gray-300 rounded-md  h-40 bg-gray shadow-lg flex justify-center items-center"> {box}</div>   -->
        <!-- <div transition:fade class="w-40 bg-gray-300 rounded-md  h-40 bg-gray shadow-lg flex justify-center items-center"> {box}</div>   -->
</div>