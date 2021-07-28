import { IonCard, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonGrid, IonHeader, IonNote, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useStoreState } from 'pullstate';
import { Iconly } from 'react-iconly';
import PlaceCard from '../components/PlaceCard';
import { PlacesStore } from '../store';
import { getFavourites } from '../store/Selectors';

import styles from "../styles/Favourites.module.scss";

const Tab3 = () => {

	const favourites = useStoreState(PlacesStore, getFavourites);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Favourites</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
				<IonToolbar>
					<IonTitle size="large">Favourites</IonTitle>
				</IonToolbar>
				</IonHeader>

				<IonGrid>
					{ favourites.length > 0 &&
						<IonRow>
							{ favourites.map((favourite, index) => {

								return (
									<IonCol size="6">
										<PlaceCard place={ favourite } fromFavourites={ true } />
									</IonCol>
								)
							})}
						</IonRow>
					}

					{ favourites.length === 0 &&
						<IonRow className="ion-justify-content-center ion-align-self-center ion-text-center animate__animated animate__fadeIn">
							<IonCol size="10">
								<div className="ion-justify-content-center ion-align-items-center ion-text-center">
									<div className={ styles.message }>
										<h2>You don't have any favourites yet!</h2>
										<p>You can add a favourite by pressing the heart button anywhere within the app.</p>
									</div>
									<div className={ styles.favouriteButton }>
										<Iconly set="bold" name="Heart" color="red" />
									</div>
								</div>
							</IonCol>
						</IonRow>
					}
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Tab3;
