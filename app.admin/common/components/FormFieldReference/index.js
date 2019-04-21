import React, { useRef, useMemo, useEffect } from 'react';
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

export default withTheme(({ field, value, error, onChange, schema, theme }) => {
    const dpRef = useRef();
    // const searchRef = useRef();
    const dTheme = useMemo(
        () =>
            theme.dropPanel ? { ...theme.dropPanel, panelVOffset: '0' } : {},
        [],
    );

    console.dir(field);
    console.dir(value);

    return (
        <FormField
            field={field}
            error={error}
            actions={
                field.isMultiple() ? (
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
                    <Item>
                        <ItemData>
                            <ItemLink
                                href=""
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                bd3b45df-6956-4901-915f-520ae62929d2
                            </ItemLink>
                            <br />
                            <ItemDescription>Anna Krevnik</ItemDescription>
                        </ItemData>
                        <ItemActions>
                            <RemoveButton />
                        </ItemActions>
                    </Item>
                    <Item>
                        <ItemData>
                            <ItemLink
                                href=""
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                bd3b45df-6956-4901-915f-520ae62929d2
                            </ItemLink>
                            <br />
                            <ItemDescription>Anna Krevnik</ItemDescription>
                        </ItemData>
                        <ItemActions>
                            <RemoveButton />
                        </ItemActions>
                    </Item>
                    <Item>
                        <ItemData>
                            <ItemLink
                                href=""
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                bd3b45df-6956-4901-915f-520ae62929d2
                            </ItemLink>
                            <br />
                            <ItemDescription>Anna Krevnik</ItemDescription>
                        </ItemData>
                        <ItemActions>
                            <RemoveButton />
                        </ItemActions>
                    </Item>
                </List>
            </DropPanel>
        </FormField>
    );
});
