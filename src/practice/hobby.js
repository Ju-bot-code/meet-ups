import { writable } from "svelte/store";

const hobbies=writable([]);

const customStore ={
    subscribe:hobbies.subscribe,
    getHobbies:(items)=>{
        hobbies.set(items);
    },
    addHobby:(hobby)=>{
        hobbies.update(items =>{

            return items.concat(hobby);
        })
    }

}

export default customStore;