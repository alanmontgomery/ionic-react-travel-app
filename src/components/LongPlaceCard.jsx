import { IonCard, IonCardTitle, IonNote } from "@ionic/react";
import styles from "../styles/Home.module.scss";

export const LongPlaceCard = ({ place = false }) => (

	<IonCard className={ `${ styles.longSlide } animate__animated animate__fadeIn animate__faster` } routerLink={ `/view-place/${ place.id }` }>
		<div className={ styles.imageHeader }>
			<img src={ place.image } />
		</div>

		<div className={ styles.details }>
			<IonCardTitle>{ place.name }</IonCardTitle>
			<IonNote>{ place.destination }</IonNote>
		</div>
	</IonCard>
);