<script>
    import { scale } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    import MeetupItem from './MeetupItem.svelte';
    import MeetupFilter from './MeetupFilter.svelte';

    export let meetups;

    let selectedAll = true;

    $: filteredMeetups = selectedAll ? meetups : meetups.filter(m => m.isFavorite);

    function selectAll(event) {
        selectedAll = event.detail;
    }
</script>

<style>
    section {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }

    @media (min-width: 768px) {
        section {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>

<section>
    <MeetupFilter on:selectAll={selectAll} />
</section>

<section id="meetups">
    {#each filteredMeetups as meetup (meetup.id)}
        <div transition:scale animate:flip={{duration: 300}}>
            <MeetupItem {...meetup} on:toggleFavorite on:showDetails on:edit />
        </div>
    {/each}
</section>
