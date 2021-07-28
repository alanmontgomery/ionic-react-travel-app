import { createSelector } from 'reselect';

const getState = state => state;

//  General getters
export const getPlaces = createSelector(getState, state => state.places);

//  More specific getters
export const getPlace = placeId => createSelector(getState, state => state.places.filter(p => parseInt(p.id) === parseInt(placeId))[0]);

// export const getChatNotificationCount = contactId => createSelector(getState, state => (state.chats.filter(c => parseInt(c.contact_id) === parseInt(contactId))[0].chats).filter(chat => chat.read === false));
