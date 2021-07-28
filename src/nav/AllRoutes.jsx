//	Main Tabs
import Tab1 from "../pages/Tab1";
import Tab2 from "../pages/Tab2";
import Tab3 from "../pages/Tab3";

//  Main tab children
import Place from "../pages/Place";

//  Sub pages
// import InboxItem from "../../pages/InboxItem";

//	Tab icons
//	If using ionicons, import here and pass as ref to tabRoutes

//  Import custom tab menu
import Tabs from "../components/Tabs";
import SubPages from "../components/SubPages";

//	Array of objects representing tab pages
//  These will be the main tabs across the app

//  *   PARAMS per tab object   *
//  isTab = true will make the tab appear
//  default = the default tab page to open and be redirected to at "/" 
//  NOTE: there should only be one default tab (default: true)
//  label = the label to show with the tab
//  component = the component related to this tab page
//  icon = icon to show on the tab bar menu
//  path = the path which the tab is accessible
export const tabRoutes = [

    { label: "Home", component: Tab1, icon: "Home", path: "/tabs/home", default: true, isTab: true },
    { label: "Places", component: Tab2, icon: "Location", path: "/tabs/places", default: false, isTab: true },
    { label: "Favourites", component: Tab3, icon: "Heart", path: "/tabs/favourites", default: false, isTab: true },
    // { label: "Profile", component: Tab3, icon: "User", path: "/tabs/profile", default: false, isTab: true },
];

//  Array of objects representing children pages of tabs

//  *   PARAMS per tab object   *
//  isTab = should always be set to false for these
//  component = the component related to this tab page
//  path = the path which the tab is accessible

//  These pages should be related to tab pages and be held within the same path
//  E.g. /tabs/tab1/child
const tabChildrenRoutes = [

    // { component: InboxItem, path: "/tabs/tab2/:id", isTab: false },
];

//  Array of objects representing sub pages

//  *   PARAMS per tab object   *
//  component = the component related to this sub page
//  path = the path which the sub page is accessible

//  This array should be sub pages which are not directly related to a tab page
//  E.g. /child
const subPageRoutes = [

    { component: Place, path: "/view-place/:place_id" }
];

//  Let's combine these together as they need to be controlled within the same IonRouterOutlet
const tabsAndChildrenRoutes = [ ...tabRoutes, ...tabChildrenRoutes ];

//  Render sub routes
export const AllSubPages = () => ( <SubPages routes={ subPageRoutes } /> );

//	Render tab menu
export const AllTabs = () => ( <Tabs tabs={ tabsAndChildrenRoutes } position="bottom" /> );