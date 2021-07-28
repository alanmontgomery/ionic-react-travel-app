import { IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonNote, IonPage, IonRouterLink, IonRow, IonSearchbar, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import { useStoreState } from 'pullstate';
import { Iconly } from 'react-iconly';
import { PlacesStore } from '../store';
import { getPlaces } from '../store/Selectors';

import styles from "../styles/Home.module.scss";

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import PlaceCard from '../components/PlaceCard';
import { LongPlaceCard } from '../components/LongPlaceCard';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Tab1 = () => {

  	const places = useStoreState(PlacesStore, getPlaces);

	const [ search, setSearch ] = useState("Search");
	const [ searchResults, setSearchResults ] = useState([ ...places ]);

	const [ slideSpace, setSlideSpace ] = useState(0);
	const [ longSlideSpace, setLongSlideSpace ] = useState(5);

	useIonViewDidEnter(() => {

		setSlideSpace(-40);
		setLongSlideSpace(1);
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
			<IonHeader className="ion-no-border ion-no-margin ion-no-padding">
				<IonToolbar>
					<IonRow className="ion-justify-content-between ion-align-items-center animate__animated animate__fadeInDown animate__faster">
						<IonCol size="10">
							<IonRow className="ion-justify-content-center ion-align-items-center">
								<IonCol size="4" className={ styles.avatar }>
									<img src="/assets/avatar.jpeg" alt="avatar" />
								</IonCol>

								<IonCol size="8" className={ `${ styles.welcome } ion-justify-content-center ion-align-items-center` }>
									<IonNote>Welcome</IonNote>
									<h3>Joe Bloggs</h3>
								</IonCol>
							</IonRow>
						</IonCol>

						<IonCol size="2">
							<Iconly set="bold" name="Notification" className={ styles.notifications } size="xlarge" />
							<div className={ styles.notificationIndicator } />
						</IonCol>
					</IonRow>
				</IonToolbar>
			</IonHeader>
			
			<IonContent>
				<IonGrid>
					<IonRow className="ion-padding-start">
						<IonCol size="8">
							<IonCardTitle color="dark">Where do you want to go?</IonCardTitle>
						</IonCol>
					</IonRow>

					<IonRow>
						<IonCol size="12">
							<IonSearchbar value={ search } onIonChange={ e => setSearch(e.target.value) } className={ styles.search } animated={ true } placeholder="Try 'Statue of Liberty'" />
						</IonCol>
					</IonRow>

					<IonRow className="ion-padding-start ion-padding-end ion-justify-content-between ion-align-items-center">
						<h2 className="bold">Popular Trips</h2>
						<IonRouterLink routerLink="/tabs/places">
							<IonBadge color="dark" style={{ marginTop: "0.4rem" }}>View all &rarr;</IonBadge>
						</IonRouterLink>
					</IonRow>
				</IonGrid>
			
				<div className={ styles.slidesContainer }>
					{ places && places.length > 0 &&  
					
						<Swiper spaceBetween={ slideSpace } slidesPerView={ 1.5 }>
							{ searchResults.map((place, index) => {

								if (index < 4) {
									return (
										
										<SwiperSlide key={ index }>
											<PlaceCard place={ place } />
										</SwiperSlide>
									);
								}
							})}

							{ searchResults.length === 0 &&
										
								<SwiperSlide>
									<PlaceCard />
								</SwiperSlide>
							}
						</Swiper>
					}
				</div>
				
				<IonGrid>
					<IonRow className="ion-padding-start ion-padding-end ion-justify-content-between ion-align-items-center">
						<h2 className="bold">Top Destinations</h2>
						
						<IonRouterLink routerLink="/tabs/places">
							<IonBadge color="dark" style={{ marginTop: "0.4rem" }}>View all &rarr;</IonBadge>
						</IonRouterLink>
					</IonRow>
				</IonGrid>
			
				<div className={ styles.longSlidesContainer }>
					{ places && places.length > 0 && 
						<Swiper spaceBetween={ longSlideSpace } slidesPerView={ 2 }>
							{ places.map((place, index) => {

								if (index > 4 && index < 9) {
									return (
										
										<SwiperSlide key={ index }>
											<LongPlaceCard place={ place } />
										</SwiperSlide>
									);
								}
							})}

						</Swiper>
					}
				</div>

			</IonContent>
		</IonPage>
	);
};

export default Tab1;