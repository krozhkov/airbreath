import * as React from 'react';
import { RoutePaths } from './routes';
import AuthService, { isSuccessResponse } from '../services/auth';
import '../styles/auth.css';
import { DispatchProps } from '../common/dispatch-props';
import { AuthAction, AuthState } from '../store/auth';
import { RouteComponentProps, StaticContext } from 'react-router';
import { Form, Label, Button, Input } from 'reactstrap';

let authService = new AuthService();

type AuthProps =
    & RouteComponentProps<{}, StaticContext, { signedOut: boolean; }>
    & AuthState
    & DispatchProps<AuthAction>;

export class SignIn extends React.PureComponent<AuthProps> {

    componentDidMount() {
        this.props.dispatch({ type: 'be-opened-page' });
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const { username, password } = this.props;

        this.props.dispatch({ type: 'be-submited-auth-request' });

        authService.signIn(username, password).then(response => {
            if (isSuccessResponse(response)) {
                this.props.history.push(RoutePaths.Contacts);
            }
            else {
                this.props.dispatch({ type: 'be-received-auth-error', error: response.error_description });
            }
        });
    }

    handleTypeEmail(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.dispatch({ type: 'be-typed-username', username: event.target.value });
    }

    handleTypePassword(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.dispatch({ type: 'be-typed-password', password: event.target.value });
    }

    render() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);

        const { username, password } = this.props;

        let initialLoadContent = null;
        if (this.props.initialLoad) {
            if (params.get('confirmed')) {
                initialLoadContent = <div className="alert alert-success" role="alert">
                    Your email address has been successfully confirmed.
                    </div>
            }

            if (params.get('expired')) {
                initialLoadContent = <div className="alert alert-info" role="alert">
                    <strong>Sesion Expired</strong> You need to sign in again.
                    </div>
            }

            if (this.props.history.location.state !== undefined && this.props.history.location.state.signedOut) {
                initialLoadContent = <div className="alert alert-info" role="alert">
                    <strong>Signed Out</strong>
                </div>
            }
        }

        return <div className="auth">
            <Form className="formAuth" onSubmit={(e) => this.handleSubmit(e)}>
                <h2>Please sign in</h2>
                {initialLoadContent}
                {
                    this.props.error !== null
                        ? <div className="alert alert-danger" role="alert">
                            {this.props.error}
                        </div>
                        : null
                }
                <Label for="inputEmail" className="form-control-label sr-only">Email address</Label>
                <Input type="email" id="inputEmail" value={username} onChange={(e) => this.handleTypeEmail(e)} placeholder="Email address" />
                <Label for="inputPassword" className="form-control-label sr-only">Password</Label>
                <Input type="password" id="inputPassword" value={password} onChange={(e) => this.handleTypePassword(e)} placeholder="Password" />
                <Button color="primary" size="lg" block type="submit">Sign in</Button>
            </Form>
        </div>;
    }
}
