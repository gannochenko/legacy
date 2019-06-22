import { useEffect } from 'react';

export const useNetworkMonitor = (dispatch, actionOnline, actionOffline) => {
    useEffect(() => {
        const onOnline = () => {
            dispatch({ type: actionOnline });
        };
        const onOffline = () => {
            dispatch({ type: actionOffline });
        };

        window.addEventListener('online', onOnline);
        window.addEventListener('offline', onOffline);

        return () => {
            window.removeEventListener('online', onOnline);
            window.removeEventListener('offline', onOffline);
        };
    }, []);
};

export const useErrorNotification = (error, notify) => {
    useEffect(() => {
        if (_.iane(error)) {
            notify({
                text: error[0].message,
                type: 'error',
                code: 'error',
            });
        }
    }, [error]);
};

export const useDispatchUnload = dispatchUnload => {
    useEffect(() => () => dispatchUnload(), []);
};

export const useNetworkNotification = (offline, notify) => {
    useEffect(() => {
        if (offline === true) {
            notify({
                text: 'We are trying to fix the connection',
                icon: 'cloud_off',
                code: 'connection_error',
                closeable: false,
            });
        } else if (offline === false) {
            notify({
                text: 'We are back on-line!',
                icon: 'cloud_queue',
                code: 'connection_error',
                closeable: true,
                lifeTime: 3000,
            });
        }
    }, [offline]);
};
