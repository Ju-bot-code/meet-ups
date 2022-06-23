<script>
    import {createEventDispatcher ,onMount ,onDestroy,afterUpdate ,beforeUpdate} from 'svelte'
    import {fly,fade} from 'svelte/transition'
    
   const dispatch=createEventDispatcher();
   let agreed=false;
   let bottom=false;
   let top=false;
   export let showModal=false;
   export let add =false;


  let  ModalClose=()=>{
    dispatch('ModalClose','modal hi');
    }

  let buttonClose=()=>{

    dispatch('buttonClose','button hi');
  } 
  
  onMount(()=>{
    //   console.log('on mount');
  });

  onDestroy(()=>{
    //   console.log('on Destroyed');
  });

  beforeUpdate(()=>{
    // console.log('update started ');
  })

  afterUpdate(()=>{
      const ele=document.querySelector('#modal');
      
      if(bottom){
          ele.scrollTo(0,ele.scrollHeight);
          bottom=false;
      }

      if(top){
        ele.scrollTo(0,0);
        top=false;
      }
    //   console.log('update ended ');
  })

//   console.log('codes executed');
</script>

{#if showModal}
<div on:click={ModalClose}  transition:fade class="w-full  overflow-y-scroll fixed inset-0 bg-gray-700 opacity-60">

</div>
<div  transition:fly={{y:300}} id="modal" class="bg-white my-20 max-w-3xl h-30 overflow-y-scroll mx-auto  w-full  absolute inset-0 text-white rounded-md ">
    <div class="m-4 text-gray-800">
        
        <header class="text-center mt-4 text-gray-600 text-lg uppercase">
            <slot name="title" />
            <div class="flex justify-end">
                <button on:click="{()=>bottom=true}" class="p-1 text-white rounded-md bg-pink-600 text-sm ">bottom</button>
            </div>
        </header>
        
        <div class="my-4 ">
            <slot></slot>
        </div>
            
        <footer class="mb-4 " >
            <button on:click={()=>agreed=true} class="border-2 border-pink-600 text-pink-600 p-2 rounded-md">Agree</button>
            <slot name=footer didAgree={agreed}>
           
                <button  disabled={!agreed}  on:click={buttonClose} class="disabled:opacity-50 bg-pink-600 text-white p-3 rounded-md">close</button>
              
            </slot>
            <div class="flex justify-end">
                <button on:click="{()=>top=true}" class="p-1 text-white rounded-md bg-pink-600 text-sm ">top</button>
            </div>
        </footer>

    </div>
</div>
{/if}



{#if add}
<div on:click={ModalClose} transition:fade class="w-full  overflow-y-scroll fixed inset-0 bg-gray-700 opacity-60">

</div>
<div transition:fly={{y:300}} id="modal" class=" my-20 max-w-3xl mx-auto  w-full  absolute inset-0 text-white  ">
    <div class="m-4 rounded-md p-5 text-gray-800  bg-white">
        
        <header class="text-center mt-4 text-gray-600 text-lg uppercase">
            <slot name="title" />
           
        </header>
        
        <div class="my-3 ">
            <slot></slot>
        </div>
            
        <footer class="mb-4 " >
            <slot name=footer >
           
            </slot>
         
        </footer>

    </div>
</div>
{/if}