import { Action, AnyAction } from 'redux';

export interface DispatchProps<TAction extends Action = AnyAction> {
    dispatch(action: TAction): void;
}
