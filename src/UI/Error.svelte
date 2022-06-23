<script>
    import Modal from "./Modal.svelte";
    export let message;
</script>
<Modal >
    <h1 class="text-red-500 ">An Error has occured!</h1>
    <p>{message}</p>
</Modal>