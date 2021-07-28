import { IonCard, IonCardHeader, IonCardTitle, IonNote, useIonToast, CreateAnimation, IonIcon } from "@ionic/react";
import { useState } from "react";
import { useRef } from "react";
import { Iconly } from "react-iconly";
import { heart, trashBin } from "ionicons/icons";
import { addFavourite } from "../store/PlacesStore";

import styles from "../styles/Home.module.scss";

const PlaceCard = ({ place = false, fromFavourites = false }) => {

	const animationRef = useRef();
	const cardRef = useRef();
	const [ presentToast ] = useIonToast();
	const [ hideAnimatedIcon, setHideAnimatedIcon ] = useState(true);

	const floatStyle = {

		display: hideAnimatedIcon ? "none" : "",
		position: "absolute",
		zIndex: "10"
	};

	const floatGrowAnimation = {

		property: "transform",
		fromValue: "translateY(0) scale(1)",
		toValue: "translateY(-20px) scale(2)"
	};

	const mainAnimation = {

		duration: 600,
		iterations: "1",
		fromTo: [ floatGrowAnimation ],
		easing: "cubic-bezier(0.25, 0.7, 0.25, 0.7)"
	};

	const handleAddFavourite = async (e, place) => {

		e.stopPropagation();
		e.preventDefault();
		
		if (fromFavourites) {

			//	Add a fadeOut animation before removing
			cardRef.current.classList.add("animate__fadeOut");

			setTimeout(() => {
				addFavourite(place, fromFavourites);
			}, 500);
		} else {

			addFavourite(place, fromFavourites);
		}

		presentToast({

			header: `Favourite ${ fromFavourites ? "removed" : "added" }!`,
			buttons: [
				{
					text: "♡",
				}
			],
			message: `${ place.name } has been ${ fromFavourites ? "removed from" : "added to" } your favourites.`,
			duration: 1500,
			color: "success"
		});
		
		setHideAnimatedIcon(false);
		await animationRef.current.animation.play();
		setHideAnimatedIcon(true);
	}

	return (
		<IonCard ref={ cardRef } className={ `${ styles.slide } animate__animated animate__fadeIn animate__faster` } routerLink={ `/view-place/${ place.id }` }>
			<div className={ styles.imageHeader }>
				<img src={ place ? place.image : "/assets/nonefound.png" } />
				{ place && 
					<div className="favouriteButton" onClick={ e => handleAddFavourite(e, place) }>

						<Iconly set="bold" name={ fromFavourites ? "Delete" : "Heart" } color="red" />

						<CreateAnimation ref={ animationRef } { ...mainAnimation }>
							<IonIcon icon={ fromFavourites ? trashBin : heart } style={ floatStyle } color="danger" />
						</CreateAnimation>
					</div>
				}
			</div>

			<IonCardHeader>
				<IonCardTitle>{ place ? place.name : "Sorry" }</IonCardTitle>
				<IonNote>{ place ? place.destination : "No results found" }</IonNote>
			</IonCardHeader>
		</IonCard>
	);
}

export default PlaceCard;