<script>
    import meetups from './Meetups/meetups-store.js';

    import Header from './Shared/Header.svelte';
    import Button from './Shared/Button.svelte';
    import MeetupForm from './Meetups/MeetupForm.svelte';
    import MeetupGrid from './Meetups/MeetupGrid.svelte';
    import MeetupDetail from './Meetups/MeetupDetail.svelte';

    let meetupFormVisible = false;

    let page = 'overview';

    let meetup;

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

    function showDetails(event) {
        const id = event.detail;
        const unsubscribe = meetups.subscribe(ms => {
            meetup = ms.find(m => m.id === id);
        });

        unsubscribe();

        page = 'details';
    }

    function showOverview() {
        page = 'overview';
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

    {#if page === 'overview'}
        <Button on:click="{toggleMeetupForm}">
            Add Meetup
        </Button>

        {#if meetupFormVisible}
            <MeetupForm on:save="{addMeetup}" on:cancel="{toggleMeetupForm}" />
        {/if}
        <MeetupGrid meetups={$meetups} on:toggleFavorite="{toggleFavorite}" on:showDetails="{showDetails}" />
    {:else}
        <MeetupDetail {meetup} on:close="{showOverview}" />
    {/if}

</main>
