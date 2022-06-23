<script>
    import {onMount} from 'svelte'
    import Hobbies from './hobby'
   let  hobbies =[];
   let loading =false
   let input;


    onMount(()=>{
        loading =true;
        fetch('https://svelte-project-e7d58-default-rtdb.firebaseio.com/hobbies.json')
            .then(res=>{
                if(!res.ok){
                    throw new Error('Failed ti fetch data !');
                }
               return res.json(); // your must return the unpacked data
            }).then(data=>{
                loading=false;
                // hobbies=Object.values(data);
                Hobbies.getHobbies(Object.values(data))
                let keys=Object.keys(data);
                console.log(keys);

                for(let key in data){
                    console.log(key , data[key]);
                }

            }).catch(err=>{
                loading=false;
                console.log(err);
            });

    })

    // await method
    //initailized to a variable
//    let getHobbies= fetch('https://svelte-project-e7d58-default-rtdb.firebaseio.com/hobbies.json')
//             .then(res=>{
//                 if(!res.ok){
//                     throw new Error('Failed ti fetch data !');
//                 }
//                return res.json(); // your must return the unpacked data
//             }).then(data=>{
//                 loading=false;
//                 hobbies=Object.values(data);
//                 let keys=Object.keys(data);
//                 console.log(keys);
//                 return hobbies //added

//                 for(let key in data){
//                     console.log(key , data[key]);
//                 }

//             }).catch(err=>{
//                 loading=false;
//                 console.log(err);
//             });




    function add(input)
    {
        // hobbies=[...hobbies,input.value];
        Hobbies.addHobby(input.value);
        loading=true;
        fetch('https://svelte-project-e7d58-default-rtdb.firebaseio.com/hobbies.json',{
            method:'POST',
            body:JSON.stringify(input.value),
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res =>
            { 
                if(!res.ok){
                    throw new Error('Failed!')
                }
                loading=false;
                alert('saved');
            })
        .catch(err=>{ console.log(err);
            loading=false;
            })
    }
</script>
<div>
    <h1 class="uppercase my-2">POST with fire base</h1>
    <input class="border p-2 " type="text" bind:this={input}>
    <button class="border p-2 " on:click={add.bind(this,input)}> add</button>
    <div class="my-2">
        {#if loading}
        <p>Loading...</p>
        {:else}
        <h1 class="uppercase my-2">fetched data from fire base</h1>
        {#each $Hobbies as hob ,i(hob)}
           
            <ul>
                <li>

                    {hob}
                </li>
            </ul>
        {/each}
        {/if}

    </div>
</div>
<!-- await method -->

<!-- {#await getHobbies}
    <p>loading ..</p>
{:then hobbyData} 
<ul>
    {#each hobbyData as hobbies}
        <li>hobbies</li>
    {/each} 
</ul>
{:catch error}
    <p>{error.message}</p>
{/await } -->