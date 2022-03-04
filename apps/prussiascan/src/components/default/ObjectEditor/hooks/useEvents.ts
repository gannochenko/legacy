import { useCallback, useEffect } from 'react';
import { eventBus } from '../../../../util/eventBus';
import { EventsEnum } from '../../../../util/events';

type UseEventsPropsType = {
    setFileUploaderOpen: (fn: (prevState: boolean) => boolean) => void;
};

export const useEvents = ({ setFileUploaderOpen }: UseEventsPropsType) => {
    const onAddPhoto = useCallback(() => {
        setFileUploaderOpen((prevState) => !prevState);
    }, []);

    const requestDataRefetch = useCallback(() => {
        eventBus.dispatch(EventsEnum.OBJECT_DETAIL_RELOAD);
    }, []);

    useEffect(() => {
        eventBus.on(
            EventsEnum.OBJECT_DETAIL_ADD_PHOTO_BUTTON_CLICK,
            onAddPhoto,
        );

        return () => {
            eventBus.off(
                EventsEnum.OBJECT_DETAIL_ADD_PHOTO_BUTTON_CLICK,
                onAddPhoto,
            );
        };
    }, []);

    return {
        requestDataRefetch,
    };
};
