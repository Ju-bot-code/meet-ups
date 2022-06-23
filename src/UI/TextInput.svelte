<script>
    export let ControlType=false;
    export let name;
    export let type='text';
    export let valid=true;
    export let errormessage='';
    export let rows=3;
    export let value;
    let touched=false;
</script>

<div class="my-2 flex flex-col space-y-3">
    <label for="{name}" class="text-gray-600"><slot></slot></label>
    {#if ControlType}
    <textarea class="p-2 border rounded-md {!valid && touched ? 'border-red-400':''}" on:blur={()=> touched =true} value={value} on:input name="{name}" id="{name}" rows="{rows}"/>

    {#if errormessage && !valid && touched}
 
     <p class="text-red-500 m-2" >{errormessage}</p>
     {/if}

    {:else}
     <input class="p-2 border rounded-md {!valid && touched ? 'border-red-400':''}"  on:blur={()=> touched =true} type="{type}" name="{name}" id="{name}"  value={value} on:input>
     {#if errormessage && !valid && touched}
     <p class="text-red-500 m-2" >{errormessage}</p>
     {/if}
     {/if}
</div>