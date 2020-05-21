import { willDoRequest } from './requesting';

export interface IContact {
    id?: number,
    lastName: string;
    firstName: string;
    phone: string;
    email: string;
}

export default class Contacts {
    fetchAll() {
        return willDoRequest<IContact[]>('GET', '/api/contacts');
    }

    fetch(contactId: number) {
        return willDoRequest<IContact>('GET', `/api/contacts/${contactId}`);
    }

    search(query: string) {
        return willDoRequest<IContact[]>('GET', `/api/contacts/search/?q=${query}`);
    }

    update(contact: IContact) {
        return willDoRequest<IContact>('PUT', `/api/contacts/${contact.id}`, contact);
    }

    create(contact: IContact) {
        return willDoRequest<IContact>('POST', '/api/contacts', contact);
    }

    save(contact: IContact) {
        if (contact.id) {
            return this.update(contact);
        }
        else {
            return this.create(contact);
        }
    }

    delete(contactId: number) {
        return willDoRequest('DELETE', `/api/contacts/${contactId}`);
    }
}

