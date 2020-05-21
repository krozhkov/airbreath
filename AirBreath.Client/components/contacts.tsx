import * as React from 'react';
import ContactService, { IContact } from '../services/contacts';
import { RouteComponentProps } from 'react-router';
import { ContactsState, ContactsAction } from '../store/contacts';
import { DispatchProps } from '../common/dispatch-props';
import { filter } from '../common/core';

let contactService = new ContactService();

type ContactsProps =
    & RouteComponentProps
    & ContactsState
    & DispatchProps<ContactsAction>;

export class Contacts extends React.PureComponent<ContactsProps> {
    componentDidMount() {
        this.showAll();
    }

    showAll() {
        contactService.fetchAll().then((response) => {
            if (response !== undefined) {
                this.props.dispatch({ type: 'be-loaded-contacts', contacts: response });
            }
        });
    }

    handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.dispatch({ type: 'be-typed-contacts-search', searchQuery: event.target.value });
    }

    handleSeachSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!this.props.searchQuery) {
            this.showAll();
            return;
        }

        contactService.search(this.props.searchQuery).then((response) => {
            if (response !== undefined) {
                this.props.dispatch({ type: 'be-loaded-contacts', contacts: response });
            }
        });
    }

    delete(contact: IContact) {
        if (contact.id !== undefined) {
            contactService.delete(contact.id).then(() => {
                const contacts = filter(this.props.contacts, value => value.id !== contact.id);
                this.props.dispatch({ type: 'be-loaded-contacts', contacts });
            });
        }
    }

    render() {
        return <div>
            <h1>Contacts</h1>
            <form className="form-inline my-2 my-lg-0" onSubmit={(e) => this.handleSeachSubmit(e)}>
                <input className="form-control form-control form-control-sm" type="text" value={this.props.searchQuery} onChange={(e) => this.handleSearchQueryChange(e)} placeholder="Search!" />
                <button className="btn btn-outline-success btn-sm" type="submit">Search</button>&nbsp;
            </form>
            {
                this.props.searchQuery === '' && this.props.contacts.length == 0
                    ? <p>No results!</p>
                    : null
            }
            {
                this.props.contacts.length > 0
                    ? <table className="table">
                        <thead>
                            <tr>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.contacts.map(contact =>
                                <tr key={contact.id}>
                                    <td>{contact.lastName}</td>
                                    <td>{contact.firstName}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phone}</td>
                                    <td><button type="button" className="btn btn-link" onClick={() => this.delete(contact)}>delete</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    : null
            }
            {
                this.props.searchQuery === ''
                    ? <button type="button" className="btn btn-primary" onClick={() => this.showAll()}>clear search</button>
                    : null
            }
        </div>
    };
}
