<script>
    import Header from './Shared/Header.svelte';
    import TextInput from './Shared/TextInput.svelte';
    import Button from './Shared/Button.svelte';
    import MeetupGrid from './Meetups/MeetupGrid.svelte';

    let title = "";
    let subtitle = "";
    let address = "";
    let email = "";
    let description = "";
    let imageUrl = "";

    let meetups = [
        {
            id: "m1",
            title: "Coding Bootcamp",
            subtitle: "Learn to code in 2 hours",
            description:
                "In this meetup, we will have some experts that teach you how to code!",
            imageUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG/800px-Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG",
            address: "27th Nerd Road, 32523 New York",
            email: "code@test.com",
            isFavorite: false
        },
        {
            id: "m2",
            title: "Swim Together",
            subtitle: "Let's go for some swimming",
            description: "We will simply swim some rounds!",
            imageUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg",
            address: "27th Nerd Road, 32523 New York",
            email: "swim@test.com",
            isFavorite: false
        }
    ];

    function addMeetup() {
        const meetup = { title, subtitle, address, email, description, imageUrl };
        meetups = [ meetup, ...meetups ];
    }

    function toggleFavorite(event) {
        const id = event.detail;
        meetups = meetups.map(m => m.id === id ? { ...m, isFavorite: !m.isFavorite } : m);
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
    <form on:submit|preventDefault={addMeetup}>
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

        <Button type="submit" caption="Save" />
    </form>

    <MeetupGrid {meetups} on:toggleFavorite="{toggleFavorite}" />

</main>
