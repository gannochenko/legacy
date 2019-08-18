import React, { FunctionComponent } from 'react';

import {
    Container,
    Table,
    THead,
    TBody,
    TH,
    TR,
    TD,
    TDNotFound,
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
import { PageNavigation } from '..';
import {
    ListProperties,
    ListCell,
    ListPropertyOrder,
    ListPropertyItemAction,
    ListPropertyItemActionGetHref,
    ListPropertyItemActionOnClick,
} from './type';
import { Item } from '../../lib/project-minimum-core';

import { BooleanCell, StringCell, DateTimeCell, IntegerCell } from './Cell';

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

const renderSortOrderSign = (cell: ListCell, sort: ListPropertyOrder) => {
    if (cell.name !== sort.cell) {
        return 'remove';
    }

    return sort.way === 'desc' ? 'arrow_drop_up' : 'arrow_drop_down';
};

const getCellComponent = (cell: ListCell) => {
    if (cell.renderer) {
        return cell.renderer;
    }

    if (cell.type === 'string') {
        return StringCell;
    }

    if (cell.type === 'boolean') {
        return BooleanCell;
    }

    if (cell.type === 'datetime') {
        return DateTimeCell;
    }

    if (cell.type === 'integer') {
        return IntegerCell;
    }

    return StringCell;
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
}) => {
    const hasActions = !!itemActions.length;

    return (
        <Container>
            <Table cellPadding="0" cellSpacing="0">
                <THead>
                    <TR>
                        {hasActions && <ActionTH />}
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
                                    {hasActions && (
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
                                    {columns.map((cell: ListCell) => {
                                        const CellComponent = getCellComponent(
                                            cell,
                                        );
                                        return (
                                            <TD
                                                key={`${item[keyProperty]}_${
                                                    cell.name
                                                }`}
                                            >
                                                <CellComponent
                                                    value={item[cell.name]}
                                                    cell={cell}
                                                />
                                            </TD>
                                        );
                                    })}
                                </TR>
                            );
                        })}
                    {!_.iane(data) && (
                        <TR>
                            <TDNotFound
                                colSpan={columns.length + (hasActions ? 1 : 0)}
                            >
                                No items found
                            </TDNotFound>
                        </TR>
                    )}
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
};
