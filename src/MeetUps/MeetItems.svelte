<script>
    import Button from "../UI/Button.svelte";
    import {createEventDispatcher} from 'svelte';
    import meetstore from './Meetstore'
    import Filter from "../UI/Filter.svelte"; 
    import {scale} from 'svelte/transition'
    import {flip} from 'svelte/animate'


    const dispatch =createEventDispatcher();

    export let meetups;
    let  isfav=true;


    function MeetFilter(event){
       isfav=event.detail === 1;
    }
    $: filteredMeets= isfav ? meetups : meetups.filter(m =>m.favourite);

    function fav (id)
  {   
      // copy array
        //   let id =event.detail;
      // let copied =[...meetups];
      // //find the object with id === clicked id
      // let found={...copied.find(element => element.id === id)};
      // //toggle fav to unfav of the clicked id
      // found.favourite= !found.favourite;

      // //****imp step coz we need it to be same index as it was*****
      // //find the index of the object that was clicked on 
      // let index=meetups.findIndex(element=> element.id === id);
       
      // //in the copied array[click index]= updated single object added
      // copied[index]=found;

      // // replace the original with the updated 
      // meetups=copied;



      //with api
      fetch(`https://svelte-project-e7d58-default-rtdb.firebaseio.com/meetup/${id}.json`,{
          method:'PATCH',
          body:JSON.stringify({favourite : isfav}),
          headers:{
            "Content-Type":"application/json"
          }
      }).then(res =>{
          if(!res.ok){
              throw new Error('adding favourite failed!')
          }
          meetstore.fav(id);
      }).catch(err =>{
           console.log(err);
      })
    //   meetstore.fav(id);
  }

   function details(id)
   {
    //    console.log(id);
       dispatch('details',id);
   }
   function Edit (id){
       dispatch('Edit',id);
   }

   function openUp()
   {
        dispatch('openADD');
   }
</script>

<div class="flex justify-between space-x-2">
    <div>
        <Button type='button' inervse={true} on:click="{openUp}">Add Meet-Up</Button>
    </div>
    <div>
        <Filter on:clicked={MeetFilter} />
    </div>
</div>
<div class="grid grid-cols-2 gap-6 mx-auto max-w-4xl">

{#each filteredMeets as meet ,i(meet.id)}
<div animate:flip={{duration:500}} transition:scale class=" my-4   border rounded-md shadow-lg w-full">

    <header class="p-2" >
        <h1 class="text-2xl text-gray-600">{meet.title}</h1>
        <h1  class="text-lg  mt-4 text-gray-600">{meet.subtitle}</h1>
        <h4>{meet.address}</h4>
    </header>

    <div class="w-full  h-52 object-fill border">
        <img class="h-full w-full object-center object-cover"
         src="{meet.url}" alt="{meet.title}">
    </div>
    <!-- <article class="mt-2 p-2">
        <p>{meet.description}</p>
    </article> -->

    <footer class="mt-4 space-x-3 p-2">
        <Button type='button' on:click={()=>{Edit(meet.id)}}>Edit</Button>

        <Button type='button' inervse={true}
            on:click={()=>{fav(meet.id)}}> 
             {meet.favourite ? 'un-Favourite' :'Favourite' }
        </Button>

        <Button type='button' on:click={details(meet.id)}>Show Details</Button>
    </footer>

</div>
{:else}
<p class="text-center">no meet ups found u can start adding some..!</p>
{/each}
</div>
   <!-- on:click={()=> dispatch('fav',meet.id)}  -->