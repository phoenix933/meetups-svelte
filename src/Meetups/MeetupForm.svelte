<script>
    import { createEventDispatcher } from 'svelte';

    import TextInput from '../Shared/TextInput.svelte';
    import Button from '../Shared/Button.svelte';
    import Modal from '../Shared/Modal.svelte';

    let title = "";
    let subtitle = "";
    let address = "";
    let email = "";
    let description = "";
    let imageUrl = "";

    const dispatch = createEventDispatcher();

    function saveMeetup() {
        const id = new Date().getTime().toString();
        const meetup = { id, title, subtitle, address, email, description, imageUrl };

        dispatch('save', meetup);
    }

    function cancel() {
        dispatch('cancel');
    }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Meetup Data" on:cancel>
    <form on:submit|preventDefault={saveMeetup}>
        <TextInput
            id="title"
            label="Title"
            value={title}
            on:input={event => (title = event.target.value)} />

        <TextInput
            id="subtitle"
            label="Subtitle"
            value={subtitle}
            on:input={event => (subtitle = event.target.value)} />

        <TextInput
            id="address"
            label="Address"
            value={address}
            on:input={event => (address = event.target.value)} />

        <TextInput
            id="imageUrl"
            label="Image URL"
            value={imageUrl}
            on:input={event => (imageUrl = event.target.value)} />

        <TextInput
            id="email"
            label="E-Mail"
            type="email"
            value={email}
            on:input={event => (email = event.target.value)} />

        <TextInput
            id="description"
            label="Description"
            controlType="textarea"
            value={description}
            on:input={event => (description = event.target.value)} />
    </form>

    <div slot="footer">
        <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
        <Button type="button" on:click={saveMeetup}>Save</Button>
    </div>
</Modal>
