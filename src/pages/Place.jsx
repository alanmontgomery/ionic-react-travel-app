import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonNote, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonRouter, useIonToast, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import './Tab2.css';

import styles from "../styles/Place.module.scss";
import { useParams } from 'react-router';
import { useStoreState } from 'pullstate';
import { PlacesStore } from '../store';
import { checkIsFavourite, getPlace } from '../store/Selectors';
import { Iconly } from 'react-iconly';
import { useRef } from 'react';
import { thermometerOutline } from 'ionicons/icons';
import { addFavourite } from '../store/PlacesStore';

const Place = () => {

	const headingRef = useRef();
	const router = useIonRouter();
	const { place_id } = useParams();

	const place = useStoreState(PlacesStore, getPlace(place_id));
	const isFavourite = useStoreState(PlacesStore, checkIsFavourite(place_id));

	const [ presentToast ] = useIonToast();

	useIonViewWillEnter(() => {

		headingRef.current.classList.add("animate__slideInDown");
		headingRef.current.style.display = "";
	});

	const handleAddFavourite = async (e, place) => {

		e.stopPropagation();
		e.preventDefault();

		const favourited = isFavourite.length > 0;

		addFavourite(place, favourited);

		presentToast({

			header: `Favourite ${ favourited ? "removed" : "added" }!`,
			buttons: [
				{
					text: "♡",
				}
			],
			message: `${ place.name } has been ${ favourited ? "removed from" : "added to" } your favourites.`,
			duration: 1500,
			color: "success"
		});
	}

	return (
		<IonPage>
			<IonHeader>
				<div className={ styles.customHeader }>
					<img src={ place.image } className="animate__animated animate__slideInRight animate__faster" />

					<div className="ion-justify-content-between">
						<div className={ styles.customBackButton } onClick={ () => router.goBack() }>
							<Iconly set="bold" name="CaretLeft" />
						</div>

						<div className={ styles.customFavouriteButton } onClick={ e => handleAddFavourite(e, place) }>
							<Iconly set={ isFavourite.length > 0 ? "bold" : "light" } name="Heart" />
						</div>
					</div>

					<div className={ `${ styles.mainContent } animate__animated` } ref={ headingRef } style={{ display: "none" }}>

						<IonGrid>
							<IonRow>
								<IonCol size="10">
									<IonCard className={ styles.placeHeading }>
										<IonCardContent>
											<IonCardTitle>{ place.name }</IonCardTitle>
											<p>{ place.destination }</p>
										</IonCardContent>
									</IonCard>
								</IonCol>
							</IonRow>
						</IonGrid>
					</div>
				</div>
			</IonHeader>
			
			<IonContent>

				<IonGrid>
					<IonRow className="animate__animated animate__fadeIn animate__faster">
						<IonCol size="4" className="ion-justify-content-center ion-align-items-center">

							<div className={ styles.statContainer }>	
								<Iconly set="bold" name="Star" color="orange" />
								<IonNote>{ place.rating } stars</IonNote>
							</div>
						</IonCol>

						<IonCol size="4" className="ion-justify-content-center ion-align-items-center">

							<div className={ styles.statContainer }>	
								<Iconly set="bold" name="Send" color="royalblue" />
								<IonNote>{ place.distance } miles</IonNote>
							</div>
						</IonCol>

						<IonCol size="4" className="ion-justify-content-center ion-align-items-center">

							<div className={ `${ styles.statContainer } ${ styles.temp }` }>
								<IonIcon style={{ fontSize: "1.5rem" }} icon={ thermometerOutline } color="danger" />
								<IonNote>{ place.temp }&deg;C</IonNote>
							</div>
						</IonCol>
					</IonRow>

					<IonRow className="animate__animated animate__fadeIn animate__faster ion-justify-content-center ion-align-items-center">
						<IonCol size="6">
							<IonCard className={ `${ styles.placeholderMapCard } animate__animated animate__slideInLeft` }>
								<img src="/assets/mapplaceholder.png" />
							</IonCard>
						</IonCol>

						<IonCol size="6" className="animate__animated animate__slideInRight ion-text-center">
							<IonCardTitle className={ styles.price }>$120/person</IonCardTitle>
							<IonNote className={ styles.priceSub }>This includes flights, luggage and transfers</IonNote>
						</IonCol>
					</IonRow>

					<IonRow className={ `${ styles.aboutContainer } animate__animated animate__fadeIn animate__faster` }>
						<IonCol size="12">
							<IonCardTitle>About</IonCardTitle>
							<IonNote>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan sem eget purus lacinia, tristique aliquet ipsum consequat.
							</IonNote>
						</IonCol>
					</IonRow>
				</IonGrid>

				<IonFooter className={ `${ styles.footer } animate__animated animate__slideInUp animate__faster` }>
					<div className={ `${ styles.footerContent }` }>
						<IonCardTitle>Book now</IonCardTitle>
						<Iconly set="bold" name="CaretRight" />
					</div>
				</IonFooter>
			</IonContent>
		</IonPage>
	);
};

export default Place;
