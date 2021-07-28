import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

import { Iconly } from 'react-iconly';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

//  Floating tabs
import "./theme/floating-tab-bar.scss";
import "./theme/main.scss";
import 'swiper/swiper.scss';

import { useEffect } from 'react';
import { fetchData } from './data/fetcher';
import { useState } from 'react';

const App = () => {

	const [ selected, setSelected ] = useState("tab0");

	useEffect(() => {

		fetchData();
	}, []);

	const routes = [

		{
			url: "/home",
			slug: "home",
			component: Tab1,
			icon: "Home",
		},
		{
			url: "/places",
			slug: "places",
			component: Tab2,
			icon: "Location",
		},
		{
			url: "/favourites",
			slug: "favourites",
			component: Tab3,
			icon: "Heart",
		},
		{
			url: "/profile",
			slug: "profile",
			component: Tab3,
			icon: "User",
		}
	];

	return (
		<IonApp>
			<IonReactRouter>
				<IonTabs onIonTabsDidChange={ e => setSelected(e.detail.tab) }>
					<IonRouterOutlet>

						{ routes.map(route => {

							return <Route key={ route.slug } exact path={ route.url } component={ route.component } />;
						})}

						<Route exact path="/">
							<Redirect to="/tab1" />
						</Route>
					</IonRouterOutlet>
					<IonTabBar slot="bottom">
						
						{ routes.map((route, index) => {

							const selectedTab = selected === `tab${ index }`;

							return (
								<IonTabButton key={ route.slug } tab={ `tab${ index }` } href={ route.url }>
									<Iconly set="light" name={ route.icon } />
									{ selectedTab && <div className="tab-dot" /> }
								</IonTabButton>
							);
						})}
					</IonTabBar>
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	);
}

export default App;
