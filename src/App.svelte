<script context="module">
  export function preload(page){
    console.log()
  }

</script>


<script>
  import Header from "./UI/Header.svelte";
  import MeetItem from './MeetUps/MeetItems.svelte';
  import Button from './UI/Button.svelte'
  import Modal from './UI/Modal.svelte'
  import {tick} from 'svelte';
  import EditMeetUP from './MeetUps/EditMeetUp.svelte'
  import Toggle from './UI/toggle.svelte'
  import meetups from './MeetUps/Meetstore'
  import Details from './MeetUps/MeetupDetail.svelte'
  import Tween from './UI/tween.svelte'
  import Post from './practice/post.svelte'
  import ErrorModal from './UI/Error.svelte'
import Counter from "./lib/Counter.svelte";




  let showModal=false;
  let closeAble=false;
  let open=false;
  let favourite=false;
  let add=false;
  let EditId;
  let page='overView'
  let fetchID;
  let inputData;
  let divData;
  let emptty=true;
  let outterFunction;
  let isloading=true
  let error;

      //api fetch(155)
      fetch('https://svelte-project-e7d58-default-rtdb.firebaseio.com/meetup.json')
      .then(res=>{
        if(!res.ok){
            throw new Error('meet Fetch failed');
        }
        return res.json();
      }).then(data =>{
            const loadedData=[];
            for(let key in data ){
                loadedData.push({
                  ...data[key],
                  id:key
                })
            }
            meetups.setMeetup(loadedData.reverse());
            isloading=false;
      }).catch(err=>{
        error=err;
        console.log(err);
        isloading=false;
      })

  // let loadedMeetups = $meetups;
  // let meetups=$meet;

  // let meetups=[
  //   { 
  //     id:'m1',
  //     title:'titile',
  //     subtitle:'subtitle',
  //     url:'url',
  //     description:'description',
  //     address:'nerd street',
  //     email:'same@gmail.com',
  //     favourite:false
  //   },
  //   { 
  //     id:'m2',
  //     title:'titile',
  //     subtitle:'subtitle',
  //     url:'url',
  //     description:'description',
  //     address:'nerd street',
  //     email:'same@gmail.com',
  //     favourite
  //   }
  // ];


  const addMeet=(e)=>{
    // console.log(e.detail)
    // let meetupData ={
    //   // id:Math.random().toString(),
    //   title:e.detail.title,
    //   subtitle:e.detail.subtitle,
    //   url:e.detail.url,
    //   description:e.detail.description,
    //   address:e.detail.address,
    //   email:e.detail.email,
    //   favourite:false
    // };
    // meetups.addMeets(meetupData);
    // meetups =[newMeet, ...meetups];
    add=false
  }

  let ModalClose=(e)=>{
    // console.log(e.detail);
    showModal=false;
    add=false;
    EditId=null
  }

  let buttonClose=(e)=>{
    // console.log(e.detail);
    showModal=false;
    add=false;
    EditId=null
  }

  let lorem ='Well, who knows, but for our purposes, “iconic” means that the story has somehow wormed its way into the general cultural consciousness—a list of the best short stories in the English language would look quite different than the one below. (Also NB that in this case we’re necessarily talking about the American cultural consciousness, weird and wiggly as it is.) When something is iconic, it is a highly recognizable cultural artifact that can be used as a shorthand—which often means it has been referenced in other forms of media. You know, just like Elvis.';

  function transform (event){
    if(event.which !== 9)  //.which helps to find the button clicked and 9 is the key word for tab button
    {
        return;
    }
    event.preventDefault();

    const selectionStart=event.target.selectionStart;
    const selectionEnd=event.target.selectionEnd;
    const value=event.target.value;

    lorem=value.slice(0,selectionStart)+
          value.slice(selectionStart,selectionEnd).toUpperCase()+
          value.slice(selectionEnd);
    // console.log(lorem);
    tick().then(()=>{
      event.target.selectionStart=selectionStart;
      event.target.selectionEnd=selectionEnd;
    })
  
  }

  // function fav (event)
  // {   // copy array
  //     let id =event.detail;
  //     // let copied =[...meetups];
  //     // //find the object with id === clicked id
  //     // let found={...copied.find(element => element.id === id)};
  //     // //toggle fav to unfav of the clicked id
  //     // found.favourite= !found.favourite;

  //     // //****imp step coz we need it to be same index as it was*****
  //     // //find the index of the object that was clicked on 
  //     // let index=meetups.findIndex(element=> element.id === id);
       
  //     // //in the copied array[click index]= updated single object added
  //     // copied[index]=found;

  //     // // replace the original with the updated 
  //     // meetups=copied;
  //     meetups.fav(id);
  // }

  // two away binding with custom components 
  let selectedOption=1;
  $: console.log(selectedOption);


  //binding with this key word (88)
 
  function thisBind()
  {
    console.log(inputData);
    console.dir(inputData);  //to have the input in a readable way
    console.log(inputData.value); // to get the value of the input
    console.log(divData);
    console.dir(divData);
    outterFunction.empty(); // this function has to be exported
  }

  // show details (119)

 
  function fetchDetailId(e){
    fetchID=e.detail;
    console.log(fetchID)
    page='details'
  }
  function overview(){
    page='overView'
  }
  
  //Edit (121)

  function Edit(e){
    EditId=e.detail;
   
    add= !add;
  }

  function openADD()
  {
    EditId=null;
    add= !add; 
   
  }
  if(error){
    add= !add; 
  }
</script>
{#if error}
  <ErrorModal  message={error.message}/>
{/if}
<Header/>
  <div class="pt-10">
    <!-- over all view -->
    {#if page === 'overView'}
  
      <div class="m-5">
            <Button type='submit' on:click={()=> showModal=true}>modal</Button>

            <button class="bg-pink-600 text-white p-1 rounded-md" on:click="{()=> open= !open}">open</button>
            <div>
                {#if open}
                <div>
                    <textarea on:keydown="{transform}" class="border w-full rounded-md mt-3 p-2" value={lorem} rows="10"></textarea>

                    <div class="my-2 space-y-3 ">
                      <h1>two away binding with custom components </h1>
                      <Toggle bind:chossenOption={selectedOption}/>
                    </div> 

                    <div class="my-2 space-y-3 ">
                        <h1>Binding with this key word </h1>
                        <input  class="border rounded-md" type="text"  bind:this={inputData}>
                        <div class="border rounded-md p-1" bind:this={divData}>works on divs too
                        </div>
                            <button class="border p-1 rounded-md" on:click="{thisBind}">save</button>

                            <Toggle emptyy={emptty} bind:this={outterFunction}/>
                    </div> 
                </div>

                <div class="space-y-3">
                  <h1>Animation</h1>
                  <Tween/>
                </div>

                <div class="space-y-3">
                  <Post/>
                </div>

              

                    
                {/if}
            </div>
      </div>

      {#if showModal}

            <Modal  {showModal}
              on:ModalClose={ModalClose} 
              let:didAgree='{closeAble}'
                on:buttonClose={buttonClose} >
                <div slot='title'>
                    <h1>Sign up</h1>
                </div>
                <div>
                    <p class="w-96 my-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis vitae in mollitia voluptate ducimus tempore, incidunt accusamus tenetur eaque quo.</p>
                    <p class="w-96 my-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis vitae in mollitia voluptate ducimus tempore, incidunt accusamus tenetur eaque quo.</p>
                    <p class="w-96 my-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis vitae in mollitia voluptate ducimus tempore, incidunt accusamus tenetur eaque quo.</p>
                    <p class="w-96 my-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis vitae in mollitia voluptate ducimus tempore, incidunt accusamus tenetur eaque quo.</p>
                    <p class="w-96 my-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis vitae in mollitia voluptate ducimus tempore, incidunt accusamus tenetur eaque quo.</p>
                </div>
                <div slot="footer">
                    <button  disabled={!closeAble}  on:click={()=>showModal=false} class="my-4 bg-black rounded-md text-white p-3">confirm</button>
              </div>
            </Modal>
        
      {/if}


   
          
      <div class="m-4">
            <!-- <Button type='button' inervse={true} on:click={openADD}>Add Meet-Up</Button> -->

            <!-- {#if add}
            <EditMeetUP on:addMeet={addMeet} {add} id={EditId}/>
            
            {/if} -->
            {#if isloading}
                <p class="text-center">loading...</p>
            {:else}
          
            <MeetItem on:openADD={openADD} meetups={$meetups} on:details={fetchDetailId} on:Edit={Edit} />
            {/if}
      </div>
      {#if add}
      <EditMeetUP {add} id={EditId} on:addMeet={addMeet}
      on:ModalClose={ModalClose} 
      on:buttonClose={buttonClose}
      />
      {/if}

    {/if}
    <!-- over all view end-->

    <!-- Details-->
    {#if page === 'details'}
      <Details id={fetchID}  on:cancleDetail={overview}/>
      
    {/if}
    <!-- DEtails end-->


  </div>
