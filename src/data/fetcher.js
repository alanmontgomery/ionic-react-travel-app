import { PlacesStore } from "../store";

export const fetchData = async () => {

    const response = await fetch("/data.json");
    const data = await response.json();

    await data.forEach((place, i) => {

        delete place.desc;

        const placeName = place.name;
        const placeNameParts = placeName.split(",");
        
        place.id = i + 1;
        place.name = placeNameParts[0].trim();
        place.destination = placeNameParts[1].trim();
    });

    PlacesStore.update(s => { s.places = data; });
}