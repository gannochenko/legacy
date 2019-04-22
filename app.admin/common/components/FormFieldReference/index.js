import React, { useRef, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { withClient } from '../../lib/client';
import FormField from '../FormField';
import DropPanel from '../../to-npm/DropPanel';
import { withTheme } from '../../style/global';
import ScrollPanel from '../../to-npm/ScrollPanel';

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

const FormFieldReference = ({
    field,
    value,
    error,
    onChange,
    schema,
    theme,
    client,
}) => {
    const dpRef = useRef();
    // const searchRef = useRef();
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
                if (_.isFunction(onSearch)) {
                    onSearch(text);
                }
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
                            // setTimeout(() => searchRef.current.focus(), 1000);
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
                            innerRef={comp => console.dir(comp)}
                            onKeyUp={e => onSearchDebounced(e.target.value)}
                        />
                        <ScrollPanel>
                            <SearchResults>
                                <SearchItem>
                                    <SearchItemData>
                                        <ItemLink
                                            href=""
                                            target="_blank"
                                            rel="noreferrer noopener"
                                        >
                                            bd3b45df-6956-4901-915f-520ae62929d2
                                        </ItemLink>
                                        <br />
                                        <ItemDescription>
                                            Anna Krevnik
                                        </ItemDescription>
                                    </SearchItemData>
                                    <SearchItemActions>
                                        <AddButton />
                                    </SearchItemActions>
                                </SearchItem>
                                <SearchItem>
                                    <SearchItemData>
                                        <ItemLink
                                            href=""
                                            target="_blank"
                                            rel="noreferrer noopener"
                                        >
                                            bd3b45df-6956-4901-915f-520ae62929d2
                                        </ItemLink>
                                        <br />
                                        <ItemDescription>
                                            Anna Krevnik
                                        </ItemDescription>
                                    </SearchItemData>
                                    <SearchItemActions>
                                        <AddButton />
                                    </SearchItemActions>
                                </SearchItem>
                                <SearchItem>
                                    <SearchItemData>
                                        <ItemLink
                                            href=""
                                            target="_blank"
                                            rel="noreferrer noopener"
                                        >
                                            bd3b45df-6956-4901-915f-520ae62929d2
                                        </ItemLink>
                                        <br />
                                        <ItemDescription>
                                            Anna Krevnik
                                        </ItemDescription>
                                    </SearchItemData>
                                    <SearchItemActions>
                                        <AddButton />
                                    </SearchItemActions>
                                </SearchItem>
                            </SearchResults>
                        </ScrollPanel>
                    </ItemPicker>
                }
                theme={dTheme}
                ref={dpRef}
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

export default withClient(
    withTheme(connect(s => s['data-detail'])(FormFieldReference)),
);
