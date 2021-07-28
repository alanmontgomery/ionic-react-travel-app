import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { AllSubPages, AllTabs, tabRoutes } from "./AllRoutes";

const NavRoutes = () => {

    return (
        <IonReactRouter>
            <IonRouterOutlet id="main">
                
                <Route path="/tabs" render={ () => <AllTabs />} />
                <AllSubPages />

                <Route path="/" component={ tabRoutes.filter(t => t.default)[0].component } exact={ true } />
                <Redirect exact from="/" to={ tabRoutes.filter(t => t.default)[0].path.toString() }/>
            </IonRouterOutlet>
        </IonReactRouter>
    );
}

export default NavRoutes;