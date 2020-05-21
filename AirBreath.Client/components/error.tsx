import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface TParams {
    readonly code: string;
}

export class ErrorPage extends React.PureComponent<RouteComponentProps<TParams>> {

    getErrorCode(): string {
        return this.props.match.params.code;
    }

    getErrorMessage(code: string): string {
        switch (code) {
            case 'email-confirm':
                return 'The email confirmation link you used is invalid or expired.';
            default:
                return 'An unknown error has occured.';
        }
    }

    render() {
        const code = this.getErrorCode();
        return <div>
            <h1>Error</h1>
            <p>{this.getErrorMessage(code)}</p>
            {
                code !== undefined
                    ? <p>Code: {code}</p>
                    : null
            }

        </div>;
    }
}
