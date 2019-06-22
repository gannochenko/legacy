export interface ApplicationProperties {
    settings: object;
    ready?: boolean;
    history: object;
    client: object;
    theme: StringToAnyMap;
    error?: object;
    notify: () => void;
    offline?: boolean;

    dispatch: (action: object) => void;
    dispatchLoad: (client: object) => void;
}
