import { Store } from 'pullstate';

const PlacesStore = new Store({

    places: [],
    favourites: []
});

export default PlacesStore;

export const addFavourite = (place, remove) => {

    if (remove) {

        PlacesStore.update(s => {

            const newFavourites = s.favourites.filter(f => f.id !== place.id);
            s.favourites = newFavourites;
        });
    } else {
        
        PlacesStore.update(s => { s.favourites = [ ...s.favourites, place ]});
    }
}