import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { SignIn } from './auth';
import AuthService from '../services/auth';
import { ErrorPage } from './error';
import { Contacts } from './contacts';
import { Header } from './header';
import { connectToState } from '../store/state';

export const RoutePaths = {
    Contacts: '/contacts',
    SignIn: '/',
} as const;

export default class Routes extends React.Component<any, any> {
    render() {
        return <Switch>
            <Route exact path={RoutePaths.SignIn} component={connectToState(SignIn, state => state.auth)} />
            <DefaultLayout exact path={RoutePaths.Contacts} component={connectToState(Contacts, state => state.contacts)} />
            <Route path='/error/:code?' component={ErrorPage} />
        </Switch>
    }
}

const DefaultLayout = ({ component: Component, ...rest }: { component: any, path: string, exact?: boolean }) => (
    <Route {...rest} render={props =>
        AuthService.isSignedIn()
            ? <div>
                <Header {...props} />
                <div className="container">
                    <Component {...props} />
                </div>
            </div>
            : <Redirect to={{
                pathname: RoutePaths.SignIn,
                state: { from: props.location }
            }} />
    } />
);
