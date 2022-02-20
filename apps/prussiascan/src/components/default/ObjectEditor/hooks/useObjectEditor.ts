import { useCallback, useEffect, useState } from 'react';
import { ObjectEditorPropsType } from '../type';
import { eventBus } from '../../../../util/eventBus';
import { EventsEnum } from '../../../../util/events';

export const useObjectEditor = <E extends HTMLDivElement>({
    objectId,
}: // ...props
ObjectEditorPropsType) => {
    const [fileUploaderOpen, setFileUploaderOpen] = useState(false);

    useEffect(() => {
        eventBus.dispatch(EventsEnum.OBJECT_DETAIL_EDIT_MODE_TOGGLE);

        return () =>
            eventBus.dispatch(EventsEnum.OBJECT_DETAIL_EDIT_MODE_TOGGLE);
    }, []);

    const onAddPhoto = useCallback(() => {
        setFileUploaderOpen((prevState) => !prevState);
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

    // const portal =
    //     containerRef.current && Editor
    //         ? ReactDOM.createPortal(
    //             [createElement(Editor, { key: 'editor' })],
    //             containerRef.current,
    //         )
    //         : null;

    return {
        fileUploaderProps: {
            open: fileUploaderOpen,
            objectId,
        },
    };
};
