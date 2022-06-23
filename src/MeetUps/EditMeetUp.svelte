<script>
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import {createEventDispatcher} from 'svelte';
  import Modal from "../UI/Modal.svelte";
  import {isEmpty} from '../helper/validation'
  import {emailCheck} from '../helper/validation';
  import meetups from './Meetstore'
 
 const dispatch = createEventDispatcher();

  let title='';
  let subtitle='';
  let url='';
  let description='';
  let address='';
  let email='';
  let favourite=false;
  export let add;
  export let id=null;

  if(id){
    // add=false;
    // console.log(id);
   let unsubscribe= meetups.subscribe(items=>{

      let editData =items.find(i => i.id === id)
      console.log(editData);
      title=editData.title;
      subtitle=editData.subtitle;
      url=editData.url;
      email=editData.email;
      description=editData.description;
      address=editData.address;
      favourite=false;
   });
   unsubscribe();
  }

  // let titleValid;
  // let subtitleValid;
  // let addressValid;
  // let descriptionValid;
  // let emailVaild;

  
  $:titleValid= !isEmpty(title);
  $:subtitleValid =!isEmpty(subtitle);
  $:addressValid =!isEmpty(address);
  $:descriptionValid =!isEmpty(address);
  $:emailVaild=!emailCheck(email);
  $:formValid= titleValid && 
                subtitleValid &&
                addressValid &&
                descriptionValid &&
                emailVaild;
 

  function addMeet()
  { 
        let meetupData={
              title,
              subtitle,
              url,
              description,
              address,
              email,
              // favourite
              }
          if(id){

            fetch(`https://svelte-project-e7d58-default-rtdb.firebaseio.com/meetup/${id}.json`,{
              method:'PATCH',
              body: JSON.stringify(meetupData),
              headers:{
                "Content-Type":"application/json"
              }
            }).then(res=>{
                  if(!res.ok)
                  {
                      throw new Error('Updated failed..!')
                  }
            meetups.Edit(id,meetupData);

            }).catch(err=>{
              console.log(err);
            })
            // meetups.Edit(id,meetupData);

          }else{
            //api

            fetch('https://svelte-project-e7d58-default-rtdb.firebaseio.com/meetup.json',{
              method:'POST',
              body: JSON.stringify({...meetupData, favourite:false}),
              headers:{
                "Content-Type":"application/json"
              }
            }).then(res=>{
                  if(!res.ok)
                  {
                    throw new Error('post meets failed');
                  }
                  return res.json();
            })
            .then(data =>{
              // console.log(data);
               meetups.addMeets({...meetupData,
                                    favourite:false,
                                    id:data.name
                                });

            })
            .catch(err =>{
              console.log(err)
            })

            // meetups.addMeets(meetupData);
          }
            dispatch('addMeet'
            // ,{
            //     title,
            //     subtitle,
            //     url,
            //     description,
            //     address,
            //     email,
            //     favourite}
            )
  } 
    function deleteMeet()
    {   
      //api

      fetch(`https://svelte-project-e7d58-default-rtdb.firebaseio.com/meetup/${id}.json`,{
          method:'DELETE',
      }).then(res =>{
          if(!res.ok){
              throw new Error('adding favourite failed!')
          }
          meetups.deleteMeet(id);

      }).catch(err =>{
           console.log(err);
      })
      // meetups.deleteMeet(id);
      dispatch('addMeet');
    }


</script>
{#if add}
  <Modal {add}
  on:ModalClose 
  on:buttonClose >
  <div slot='title'>
      <h1>add meets</h1>
  </div>

<form on:submit|preventDefault="{addMeet}" class=" m-4 p-10 border rounded-md  ">

    <!-- <h1 class="text-gray-600 text-center text-xl">New Meet Up</h1> -->
    
    <TextInput name='title'
      valid={titleValid}
      errormessage='title is required'
      value={title}
      on:input={event=>(title=event.target.value)} 
     >Title</TextInput> 

    <TextInput name='subtitle' 
    valid={subtitleValid}
    errormessage='subtitle is required'
    value={subtitle} on:input={event=>(subtitle=event.target.value)} 
    >Sub-Title</TextInput> 

    <TextInput name='url' value={url} on:input={event=>(url=event.target.value)} >Url</TextInput>

    <TextInput name='address'
    valid={addressValid }
    errormessage='address is required'
     value={address} on:input={event=>(address=event.target.value)} >
     Address
    </TextInput> 

    <TextInput name='email'
    valid={emailVaild}
    errormessage='email is not'
     type='email' 
     value={email}
      on:input={event=>(email=event.target.value)} 
      >Email</TextInput> 

    <TextInput
     name='description'
     valid={descriptionValid}
     errormessage='description is required'
      ControlType='{true}'
      value={description} on:input='{event=>(description=event.target.value)}'
      >Description</TextInput> 
  
    <!-- <button class="bg-pink-600">submit</button> -->
  </form>
  
  
  
  <div>
  </div>
  <div slot="footer">
    <div class="mx-4">
      {#if id}
      <Button type='button' on:click="{deleteMeet}" inervse={true}>Delete</Button>
      {/if}
      <Button type='button' disable={!formValid} on:click="{addMeet}">Save</Button>
      <button  on:click={ ()=>{add=false;
        id=null;}} class="mx-2 bg-gray-600 rounded-md text-white p-2">cancle</button>
    </div>
  </div>
</Modal>
{/if}