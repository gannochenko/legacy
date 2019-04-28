import React, { useRef, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { withClient } from '../../lib/client';
import FormField from '../FormField';
import DropPanel from '../../to-npm/DropPanel';
import { withTheme } from '../../style/global';
import ScrollPanel from '../../to-npm/ScrollPanel';
import {
    ITEM_SEARCH,
    ITEM_SEARCH_CLEANUP,
} from '../../pages/data-detail/reducer';

import {
    List,
    Item,
    ItemData,
    ItemActions,
    ItemLink,
    ItemDescription,
    ItemPicker,
    AddButton,
    RemoveButton,
    Search,
    SearchResults,
    SearchItem,
    SearchItemData,
    SearchItemActions,
} from './style.js';

export const FormFieldReference = ({
    field,
    value,
    error,
    onChange,
    schema,
    theme,
    client,
    dispatch,
    formData,
}) => {
    formData = formData || {};

    const dpRef = useRef();
    const searchRef = useRef();
    const dTheme = useMemo(
        () =>
            theme.dropPanel
                ? { ...theme.dropPanel, panelVOffset: '0.2rem' }
                : {},
        [],
    );

    let iValue = [];
    if (field.isMultiple()) {
        iValue = value;
    } else if (value !== null && value !== undefined) {
        iValue = [value];
    }
    const [pFieldName, refEntity] = useMemo(() => {
        const refEntity = schema.getEntity(field.getReferenceFieldName());
        const pField = refEntity.getPresentationField();

        if (pField) {
            return [pField.getName(), refEntity];
        }

        return [null, refEntity];
    }, [field]);

    const onSearchDebounced = useMemo(
        () =>
            _.debounce(text => {
                dispatch({
                    type: ITEM_SEARCH,
                    payload: {
                        client,
                        entity: refEntity,
                        field,
                        text,
                    },
                });
            }, 300),
        [],
    );

    return (
        <FormField
            field={field}
            error={error}
            actions={
                field.isMultiple() ||
                (!field.isMultiple() && !iValue.length) ? (
                    <AddButton
                        onClick={() => {
                            const panel = dpRef.current;
                            panel.open({ preventClose: true });

                            if (searchRef.current) {
                                searchRef.current.value = '';
                                setTimeout(() => searchRef.current.focus(), 0);
                            }
                        }}
                    />
                ) : (
                    ''
                )
            }
        >
            <DropPanel
                panel={
                    <ItemPicker>
                        <Search
                            placeholder="Search..."
                            ref={searchRef} // due to some reason this does not work
                            onKeyUp={e => onSearchDebounced(e.target.value)}
                            theme={theme}
                        />
                        <ScrollPanel>
                            <SearchResults>
                                {_.iane(formData.result) &&
                                    formData.result.map(sResult => (
                                        <SearchItem key={sResult.code}>
                                            <SearchItemData>
                                                <ItemLink
                                                    href={`/data/${encodeURIComponent(
                                                        refEntity.getName(),
                                                    )}/${encodeURIComponent(
                                                        sResult.code,
                                                    )}/`}
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                >
                                                    {sResult.code}
                                                </ItemLink>
                                                {_.isne(
                                                    sResult[pFieldName],
                                                ) && (
                                                    <>
                                                        <br />
                                                        <ItemDescription>
                                                            {
                                                                sResult[
                                                                    pFieldName
                                                                ]
                                                            }
                                                        </ItemDescription>
                                                    </>
                                                )}
                                            </SearchItemData>
                                            <SearchItemActions>
                                                <AddButton
                                                    onClick={() => {
                                                        let newValue = null;
                                                        if (
                                                            field.isMultiple()
                                                        ) {
                                                            // need to check if the item is already there
                                                            if (
                                                                !value.find(
                                                                    item =>
                                                                        item.code ===
                                                                        sResult.code,
                                                                )
                                                            ) {
                                                                newValue = [
                                                                    ...value,
                                                                    sResult,
                                                                ];
                                                            }
                                                        } else {
                                                            newValue = sResult;
                                                        }

                                                        if (searchRef.current) {
                                                            setTimeout(
                                                                () =>
                                                                    searchRef.current.focus(),
                                                                0,
                                                            );
                                                        }

                                                        if (newValue !== null) {
                                                            onChange({
                                                                target: {
                                                                    name: field.getName(),
                                                                    value: newValue,
                                                                },
                                                            });
                                                        }
                                                    }}
                                                />
                                            </SearchItemActions>
                                        </SearchItem>
                                    ))}
                            </SearchResults>
                        </ScrollPanel>
                    </ItemPicker>
                }
                theme={dTheme}
                ref={dpRef}
                onClose={() => {
                    dispatch({
                        type: ITEM_SEARCH_CLEANUP,
                        payload: {
                            field: field.getName(),
                        },
                    });
                    // todo: make searchRef work and cleanup the text input
                }}
            >
                <List>
                    {iValue.map(item => (
                        <Item key={item.code}>
                            <ItemData>
                                <ItemLink
                                    href={`/data/${encodeURIComponent(
                                        refEntity.getName(),
                                    )}/${encodeURIComponent(item.code)}/`}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {item.code}
                                </ItemLink>
                                {_.isne(pFieldName) && !!item[pFieldName] && (
                                    <>
                                        <br />
                                        <ItemDescription>
                                            {item[pFieldName]}
                                        </ItemDescription>
                                    </>
                                )}
                            </ItemData>
                            <ItemActions>
                                <RemoveButton
                                    onClick={() => {
                                        let newValue = undefined;
                                        if (field.isMultiple()) {
                                            newValue = value.filter(
                                                vItem =>
                                                    vItem.code !== item.code,
                                            );
                                        }

                                        onChange({
                                            target: {
                                                name: field.getName(),
                                                value: newValue,
                                            },
                                        });
                                    }}
                                />
                            </ItemActions>
                        </Item>
                    ))}
                </List>
            </DropPanel>
        </FormField>
    );
};

export default withClient(withTheme(FormFieldReference));
