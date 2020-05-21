import * as React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button } from 'reactstrap';
import { RouteComponentProps, StaticContext } from 'react-router';
import { RoutePaths } from './routes';
import AuthService from '../services/auth';

import '../styles/header.css';

let authService = new AuthService();

interface State {
    isOpen: boolean;
}

export class Header extends React.Component<RouteComponentProps<{}, StaticContext, { signedOut: boolean; }>, State> {

    public state = {
        isOpen: false,
    };

    signOut() {
        authService.signOut();
        this.props.history.push(RoutePaths.SignIn, { signedOut: true });
    }

    private toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
            <Container>
                <NavbarToggler onClick={() => this.toggle()} className="mr-2" />
                <NavbarBrand tag={Link} to="/">Air Breath</NavbarBrand>
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/contacts">Contacts</NavLink>
                        </NavItem>
                        <NavItem>
                            <Button outline color="warning" className="my-2 my-sm-0" onClick={() => this.signOut()}>Sign out</Button>
                        </NavItem>
                    </ul>
                </Collapse>
            </Container>
        </Navbar>;
    }
}
