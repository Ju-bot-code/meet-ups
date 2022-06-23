import {writable} from 'svelte/store'


const meetups = writable([
    // { 
    //   id:'m1',
    //   title:'Bussiness Meet ups',
    //   subtitle:'geeting this done ',
    //   url:'https://images.pexels.com/photos/389819/pexels-photo-389819.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    //   description:'Description is the pattern of narrative development that aims to make vivid a place, object, character, or group. Description is one of four rhetorical modes, along with exposition, argumentation, and narration. In practice it would be difficult to write literature that drew on just one of the four basic modes. ',
    //   address:'9 Throgmorton Street, London EC2N 2AT',
    //   email:'same@gmail.com',
    //   favourite:false
    // },
    // { 
    //   id:'m2',
    //   title:'Work Meet ups ',
    //   subtitle:'Reach the goal desire',
    //   url:'https://images.pexels.com/photos/3183195/pexels-photo-3183195.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    //   description:'Description is the pattern of narrative development that aims to make vivid a place, object, character, or group. Description is one of four rhetorical modes, along with exposition, argumentation, and narration. In practice it would be difficult to write literature that drew on just one of the four basic modes. ',
    //   address:'Bockenheimer Anlage 46, 60322 Frankfurt am Main',
    //   email:'same@gmail.com',
    //   favourite:false
    // }
  ]);


  const customMeetup={
    subscribe: meetups.subscribe, // not calling the function by subscribe() , just pointing to it 

    setMeetup:(meetupArray)=>{
      meetups.set(meetupArray);
    },
    addMeets  : (meetupData)=>{
      let newMeet={
        ...meetupData
        // id:Math.random().toString()
      };
      meetups.update(items =>{
       return [newMeet,...items];
      })


    },
    Edit:(id,meetupData)=>{
      meetups.update( items => {
        let indexGet =items.findIndex( i => i.id ===id );
        let updatedData={...items[indexGet],...meetupData}; // sinlge object in array of objects
        let updatedArray=[...items]
        updatedArray[indexGet]=updatedData;
        return updatedArray;

      })
    },
    deleteMeet:(id)=>{
      meetups.update(items=>{
        return items.filter(i => i.id != id);
      });
    },
    fav:(id)=>{
    
      meetups.update(items=> {
        let copied =[...items];
      //find the object with id === clicked id
      let found={...copied.find(element => element.id === id)};
      //toggle fav to unfav of the clicked id
      found.favourite= !found.favourite;

      //****imp step coz we need it to be same index as it was*****
      //find the index of the object that was clicked on 
      let index=items.findIndex(element=> element.id === id);
       
      //in the copied array[click index]= updated single object added
      copied[index]=found;

      // replace the original with the updated 
      // meetups=copied;
      return copied;
      })
    }

  }

export default customMeetup;