import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonNote, IonPage, IonSearchbar, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { useStoreState } from 'pullstate';
import { useEffect, useState } from 'react';
import { Iconly } from 'react-iconly';
import ExploreContainer from '../components/ExploreContainer';
import { PlacesStore } from '../store';
import { getPlaces } from '../store/Selectors';

import styles from "../styles/Places.module.scss";

const Tab2 = () => {

	const places = useStoreState(PlacesStore, getPlaces);
	const [ search, setSearch ] = useState("Search");
	const [ searchResults, setSearchResults ] = useState([ ...places ]);

	useIonViewDidEnter(() => {

		setSearch("");
	});

	const performSearch = async () => {

		const searchTerm = search.toLowerCase();
		let tempResults = [];

		if (searchTerm !== "") {
			places.forEach(place => {

				if (place.name.toLowerCase().includes(searchTerm)) {

					tempResults.push(place);
				}
			});
		} else {

			tempResults = [ ...places ];
		}

		setSearchResults(tempResults);
	}

	useEffect(() => {

		performSearch();
	}, [ search ]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Places</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Places</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonSearchbar value={ search } onIonChange={ e => setSearch(e.target.value) } animated={ true } placeholder="Try 'Grand Canyon'" className="animate__animated animate__slideInDown animate__faster" />

				<IonList className="ion-padding-bottom ion-margin-bottom animate__animated animate__fadeIn animate__faster">
					{ searchResults.map((place, index) => {

						//	We could do some cool things with this
						const animateDirection = index % 2 == 0 ? "animate__slideInLeft" : "animate__slideInRight";

						return (

							<IonItem key={ index } lines="full" className={ styles.placeItem } detail={ true } routerLink={ `/view-place/${ place.id }` }>
								<img src={ place.image } alt="place" />

								<IonLabel>
									<h1>{ place.name }</h1>
									<p>{ place.destination }</p>
								</IonLabel>
								
								<span className={ styles.placeItemRating }>
									<Iconly set="bold" name="Star" />
									<IonNote>
										{ (Math.trunc(place.rating*100)/100).toFixed(1) }
									</IonNote>
								</span>
							</IonItem>
						);
					})}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Tab2;
