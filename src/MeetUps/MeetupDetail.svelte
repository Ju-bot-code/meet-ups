<script>
    import Button from '../UI/Button.svelte'
    import {createEventDispatcher} from 'svelte'
    import {onDestroy} from 'svelte'
    import meetups from './Meetstore'

    export let id;
    let selected ;

    const unsubscribe= meetups.subscribe(item =>{
        selected =item.find(i => i.id === id);
        // console.log(id);
        // console.log(selected);
     });

     onDestroy(()=>{
        unsubscribe();
     })

     const dispatch = createEventDispatcher();

     const cancle=()=>{
         dispatch('cancleDetail');
     }

</script>
<div class="w-full bg-gray-50">

    <img src="{selected.url}" class="w-full object-cover object-bottom h-72" alt="">
    <div class="max-w-2xl mx-auto w-full px-20 py-5 ">
     
        <h1 class="text-gray-900 uppercase text-2xl my-4 font-thin ">{selected.title}</h1>
        <h1 class="text-gray-900 uppercase my-2  font-thin ">{selected.subtitle}</h1>

        <p class="my-2 font-thin">{selected.description}</p>

        <h1 class="text-gray-900 font-thin my-3 uppercase text-right">{selected.address}</h1>

     <Button href='adad'>contact</Button>
     <Button on:click={cancle}>cancle</Button>
    </div>
</div>