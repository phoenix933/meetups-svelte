<script>
    import meetups from './Meetups/meetups-store.js';

    import Header from './Shared/Header.svelte';
    import Button from './Shared/Button.svelte';
    import MeetupForm from './Meetups/MeetupForm.svelte';
    import MeetupGrid from './Meetups/MeetupGrid.svelte';

    let meetupFormVisible = false;

    function addMeetup(event) {
        const meetup = event.detail;
        meetups.addMeetup(meetup);

        toggleMeetupForm();
    }

    function toggleFavorite(event) {
        const id = event.detail;
        meetups.toggleFavorite(id);
    }

    function toggleMeetupForm() {
        meetupFormVisible = !meetupFormVisible;
    }
</script>

<style>
    main {
        margin-top: 5rem;
    }

    form {
        width: 30rem;
        max-width: 90%;
        margin: auto;
    }
</style>

<Header />

<main>
    <Button on:click="{toggleMeetupForm}">
        Add Meetup
    </Button>

    {#if meetupFormVisible}
        <MeetupForm on:save="{addMeetup}" on:cancel="{toggleMeetupForm}" />
    {/if}

    <MeetupGrid meetups={$meetups} on:toggleFavorite="{toggleFavorite}" />

</main>
