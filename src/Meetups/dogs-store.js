import { writable } from 'svelte/store';

const store = writable([]);

const dogsStore = {
    subscribe: store.subscribe,
    addDog: (dog) => store.update((dogs) => [dog, ...dogs]),
    getDog: (id) => {
        const dog = derived(
            store,
            $store => $store.find(d => d.id === id)
        );

        return dog;
    },
};

export default dogsStore;
