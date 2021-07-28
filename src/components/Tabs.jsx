import { IonTabBar, IonTabButton, IonTabs, IonRouterOutlet } from "@ionic/react";
import { useState } from "react";
import { Iconly } from "react-iconly";
import { Route } from "react-router-dom";

const Tabs = (props) => {

	const [ selected, setSelected ] = useState("tab_1");

	return (
		<IonTabs onIonTabsWillChange={ e => setSelected(e.detail.tab) }>
			<IonRouterOutlet>

				{ props.tabs.map((tab, i) => {

					const TabComponent = tab.component;

					if (tab.isTab) {
						return <Route key={ `tab_route_${ i }` } path={ tab.path } render={ (props) => <TabComponent { ...props } /> } exact={ true }/>;
					} else {

						return <Route key={ `child_tab_route_${ i }` } path={ tab.path } render={ (props) => <TabComponent {...props} /> } exact={ false } />;
					}
				})}
			</IonRouterOutlet>

			<IonTabBar slot={ props.position }>

				{ props.tabs.map((tab, i) => {

					const isSelected = selected === `tab_${ i + 1 }`;

					if (tab.isTab) {

						return (
							<IonTabButton key={ `tab_button_${ i + 1 }` } tab={ `tab_${ i + 1 }` } href={ tab.path }>
								<Iconly set="light" name={ tab.icon } />
								{ isSelected && <div className="tab-dot" /> }
							</IonTabButton>
						);
					}
				})}
			</IonTabBar>
		</IonTabs>
	);
}

export default Tabs;