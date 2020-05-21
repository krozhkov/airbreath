import { DispatchProps } from '../common/dispatch-props';
import { contactsReducer, ContactsState } from './contacts';
import { authReducer, AuthState } from './auth';
import { ResolveThunks, MapStateToProps, ConnectedComponent, GetProps, Shared, connect, Matching } from 'react-redux';
import { ComponentType } from 'react';
import { AnyAction, Action } from 'redux';

export interface ApplicationState {
    contacts: ContactsState | undefined;
    auth: AuthState | undefined,
}

export const reducers = {
    contacts: contactsReducer,
    auth: authReducer,
};

export function mapDispatchToProps<TAction extends Action = AnyAction>(): DispatchProps<TAction> {
    return {
        dispatch: (action: TAction): AppThunkAction<TAction> => (dispatch) => {
            dispatch(action);
        },
    };
}

// This type can be used as a hint on action creators so that its 'dispatch'
// params are correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

export function connectToState<
    TStateProps,
    TOwnProps,
    C extends ComponentType<Matching<TStateProps & ResolveThunks<DispatchProps>, GetProps<C>>>
>(
    component: C,
    mapStateToProps: MapStateToProps<TStateProps, TOwnProps, ApplicationState>,
): ConnectedComponent<C, Omit<GetProps<C>, keyof Shared<TStateProps & DispatchProps, GetProps<C>>> & TOwnProps> {
    return connect(
        mapStateToProps,
        mapDispatchToProps(),
    )(component);
}
