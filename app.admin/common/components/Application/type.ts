import { ControllerProperties, PageState } from '../../store/type';

export interface ApplicationProperties extends ControllerProperties {
    history: object;
    offline?: boolean;
}

export interface State extends PageState {
    offline: Nullable<boolean>;
    user: Nullable<object>;
    schema: Nullable<object>;
}
