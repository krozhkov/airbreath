import { Reducer } from 'redux';
import { IContact } from '../services/contacts';

export interface ContactsState {
    contacts: IContact[];
    searchQuery: string;
}

export type ContactsAction =
    | { type: 'be-typed-contacts-search'; searchQuery: string; }
    | { type: 'be-loaded-contacts'; contacts: IContact[]; };

const unloadedState: ContactsState = { contacts: [], searchQuery: '' };

export const contactsReducer: Reducer<ContactsState, ContactsAction> = (state = unloadedState, action) => {
    switch (action.type) {
        case 'be-loaded-contacts':
            return {
                contacts: action.contacts,
                searchQuery: state.searchQuery,
            };
        case 'be-typed-contacts-search':
            return {
                contacts: state.contacts,
                searchQuery: action.searchQuery,
            };
        default:
            return state;
    }
};
