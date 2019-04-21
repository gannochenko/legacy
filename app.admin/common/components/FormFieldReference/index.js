import React, { useRef, useMemo } from 'react';
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

export default withTheme(({ field, value, error, onChange, theme }) => {
    const dpRef = useRef();
    const dTheme = useMemo(
        () =>
            theme.dropPanel ? { ...theme.dropPanel, panelVOffset: '0' } : {},
        [],
    );

    return (
        <FormField
            field={field}
            error={error}
            actions={
                field.isMultiple() ? (
                    <AddButton onClick={e => dpRef.current.open(e)} />
                ) : (
                    ''
                )
            }
        >
            <DropPanel
                open
                panel={
                    <ItemPicker>
                        <Search placeholder="Search..." />
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
