export interface ApplicationProperties {
    settings: object;
    ready?: boolean;
    history: object;
    client: object;
    theme: StringToAnyMap;
    error?: object;
    notify: () => {};
    offline?: boolean;

    dispatch: (action: object) => {};
    dispatchLoad: (client: object) => {};
}
