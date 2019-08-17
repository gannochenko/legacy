import React, { FunctionComponent } from 'react';

import {
    Container,
    Table,
    THead,
    TBody,
    TH,
    TR,
    TD,
    ActionTH,
    ActionTD,
    HeaderLink,
    Footer,
    Counter,
    Actions,
    ItemActions,
    ItemAction,
    ItemActionLink,
    ActionPanel,
} from './style';
import { ListCellString, PageNavigation } from '..';
import {
    ListProperties,
    ListPropertyColumnItem,
    ListPropertyOrder,
    ListPropertyItemAction,
    ListPropertyItemActionGetHref,
    ListPropertyItemActionOnClick,
} from './type';
import { Item } from '../../lib/project-minimum-core';

const renderItemActions = (
    itemActions: ListPropertyItemAction[],
    item: Item,
    closePanel: () => void,
) => {
    return (
        <ItemActions>
            {itemActions.map((action: ListPropertyItemAction) => {
                const { name, displayName, icon, onClick, getHref } = action;
                if (_.isFunction(onClick)) {
                    return (
                        <ItemAction
                            key={name}
                            icon={icon}
                            onClick={() =>
                                (onClick as ListPropertyItemActionOnClick)(
                                    'edit',
                                    item,
                                    closePanel,
                                )
                            }
                        >
                            {displayName}
                        </ItemAction>
                    );
                }

                if (_.isFunction(getHref)) {
                    return (
                        <ItemActionLink
                            key={name}
                            icon={icon}
                            href={(getHref as ListPropertyItemActionGetHref)(
                                item,
                            )}
                        >
                            {displayName}
                        </ItemActionLink>
                    );
                }

                return null;
            })}
        </ItemActions>
    );
};

const renderSortOrderSign = (
    cell: ListPropertyColumnItem,
    sort: ListPropertyOrder,
) => {
    if (cell.name !== sort.cell) {
        return 'remove';
    }

    return sort.way === 'desc' ? 'arrow_drop_up' : 'arrow_drop_down';
};

const getCellComponent = (cell: ListPropertyColumnItem) => {
    if (cell.renderer) {
        return cell.renderer;
    }

    return ListCellString;
};

export const List: FunctionComponent<ListProperties> = ({
    columns = [],
    data = [],
    itemActions = [],
    page = 1,
    count = 0,
    pageSize = 10,
    sort = { way: 'asc', cell: '' },
    onPageChange = () => {},
    onSortChange = () => {},
    keyProperty = 'id',
}) => (
    <Container>
        <Table cellPadding="0" cellSpacing="0">
            <THead>
                <TR>
                    <ActionTH />
                    {columns.map(cell => (
                        <TH key={cell.name}>
                            <HeaderLink
                                sortable={cell.sortable}
                                sign={renderSortOrderSign(cell, sort)}
                                onClick={() => {
                                    if (!_.isFunction(onSortChange)) {
                                        return;
                                    }

                                    if (cell.sortable) {
                                        onSortChange({
                                            cell: cell.name,
                                            way:
                                                sort.way === 'asc'
                                                    ? 'desc'
                                                    : 'asc',
                                        });
                                    }
                                }}
                            >
                                {cell.displayName}
                            </HeaderLink>
                        </TH>
                    ))}
                </TR>
            </THead>
            <TBody>
                {_.iane(data) &&
                    data.map(item => {
                        return (
                            <TR key={item[keyProperty]}>
                                {!!itemActions.length && (
                                    <ActionTD>
                                        <ActionPanel
                                            panel={({ closePanel }) =>
                                                renderItemActions(
                                                    itemActions,
                                                    item,
                                                    closePanel,
                                                )
                                            }
                                            openOnChildrenClick
                                        >
                                            {() => <Actions />}
                                        </ActionPanel>
                                    </ActionTD>
                                )}
                                {columns.map((cell: ListPropertyColumnItem) => {
                                    const Cell = getCellComponent(cell);
                                    return (
                                        <TD
                                            key={`${item[keyProperty]}_${
                                                cell.name
                                            }`}
                                        >
                                            <Cell
                                                data={item[cell.name]}
                                                cell={cell}
                                            />
                                        </TD>
                                    );
                                })}
                            </TR>
                        );
                    })}
            </TBody>
        </Table>
        {count !== null && (
            <Footer>
                <Counter>Count: {count}</Counter>
                {count > pageSize && (
                    <PageNavigation
                        count={count}
                        page={page}
                        onNavigate={onPageChange}
                        pageSize={pageSize}
                    />
                )}
            </Footer>
        )}
    </Container>
);
