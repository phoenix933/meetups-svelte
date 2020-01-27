<script>
    import { writable } from 'svelte/store';

    import meetups from './Meetups/meetups-store.js';

    import Header from './Shared/Header.svelte';
    import Button from './Shared/Button.svelte';
    import MeetupForm from './Meetups/MeetupForm.svelte';
    import MeetupGrid from './Meetups/MeetupGrid.svelte';
    import MeetupDetail from './Meetups/MeetupDetail.svelte';

    let meetupFormVisible = false;

    let page = 'overview';

    const meetupInitialvalue = writable(null);
    let meetup = meetupInitialvalue;

    function saveMeetup(event) {
        const m = event.detail;

        if (m.id) {
            meetups.updateMeetup(m.id, m);
        } else {
            meetups.addMeetup(m);
        }

        closeMeetupFormModal();
    }

    function editMeetup(event) {
        const id = event.detail;
        meetup = meetups.getMeetup(id);

        toggleMeetupForm();
    }

    function deleteMeetup(event) {
        const id = event.detail;
        meetups.deleteMeetup(id);

        closeMeetupFormModal();
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
        meetup = meetups.getMeetup(id);

        page = 'details';
    }

    function showOverview() {
        page = 'overview';
        meetup = meetupInitialvalue;
    }

    function closeMeetupFormModal() {
        toggleMeetupForm();
        meetup = meetupInitialvalue;
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
            <MeetupForm
                meetup={$meetup}
                on:save="{saveMeetup}"
                on:cancel="{closeMeetupFormModal}"
                on:delete="{deleteMeetup}" />
        {/if}
        <MeetupGrid
            meetups={$meetups}
            on:toggleFavorite="{toggleFavorite}"
            on:showDetails="{showDetails}"
            on:edit="{editMeetup}" />
    {:else}
        <MeetupDetail meetup={$meetup} on:close="{showOverview}" />
    {/if}

</main>
