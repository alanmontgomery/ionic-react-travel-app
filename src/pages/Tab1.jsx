import { IonCol, IonContent, IonHeader, IonNote, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { useStoreState } from 'pullstate';
import { Iconly } from 'react-iconly';
import { PlacesStore } from '../store';
import { getPlaces } from '../store/Selectors';

import styles from "../styles/Home.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';

const Tab1 = () => {

  	const places = useStoreState(PlacesStore, getPlaces);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					{/* <IonTitle>Tab 1</IonTitle> */}
				</IonToolbar>
			</IonHeader>
			
			<IonContent fullscreen>

				<IonRow className="ion-justify-content-between ion-align-items-center">
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

				<IonRow>
					<IonCol size="12">
						<IonSearchbar animated={ true } placeholder="Try 'Statue of Liberty'" />
					</IonCol>
				</IonRow>

				<IonRow className="ion-padding-start ion-padding-end ion-justify-content-between ion-align-items-center">
					<h2 className="bold">Popular Trips</h2>
					<Iconly set="bold" name="CaretRight" className="ion-margin-top" />
				</IonRow>
			
				{/* <div className={ styles.slidesContainer }> */}
					<Swiper
						spaceBetween={50}
						slidesPerView={3}
						onSlideChange={() => console.log('slide change')}
						onSwiper={(swiper) => console.log(swiper)}
					>

						{ places.map((place, index) => {

							if (index < 4) {
								return (
									
									<SwiperSlide key={ index }>
										<div className={ styles.slide }>
											{ place.name }
										</div>
									</SwiperSlide>
								);
							}
						})}

					</Swiper>
				{/* </div> */}

			</IonContent>
		</IonPage>
	);
};

export default Tab1;
