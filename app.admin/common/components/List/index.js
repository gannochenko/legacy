import React from 'react';
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
} from './style.js';

import {
    TYPE_STRING,
    TYPE_DATETIME,
    TYPE_BOOLEAN,
} from '../../../shared/schema/field';

import PageNavigation from '../PageNavigation';

import ListCellString from '../ListCellString';
import ListCellReference from '../ListCellReference';
import ListCellDate from '../ListCellDate';
import ListCellCode from '../ListCellCode';
import ListCellBoolean from '../ListCellBoolean';

const getCellComponent = field => {
    if (field.getName() === 'code') {
        return ListCellCode;
    }
    if (field.isReference()) {
        return ListCellReference;
    }
    if (field.getActualType() === TYPE_STRING) {
        return ListCellString;
    }
    if (field.getActualType() === TYPE_DATETIME) {
        return ListCellDate;
    }
    if (field.getActualType() === TYPE_BOOLEAN) {
        return ListCellBoolean;
    }

    return ListCellString;
};

const List = ({
    entity,
    data,
    page,
    count,
    pageSize,
    sort,
    onPageChange,
    onSortChange,
}) => {
    sort = sort || {};
    return (
        <Container>
            <Table cellPadding="0" cellSpacing="0">
                <THead>
                    <TR>
                        <ActionTH />
                        {entity.getFields().map(field => (
                            <TH key={field.getName()}>
                                <HeaderLink
                                    sortable={field.isSortable()}
                                    sign={
                                        field.getName() === sort.field
                                            ? sort.way === 'desc'
                                                ? 'arrow_drop_up'
                                                : 'arrow_drop_down'
                                            : 'remove'
                                    }
                                    onClick={() => {
                                        if (!_.isFunction(onSortChange)) {
                                            return;
                                        }

                                        if (field.isSortable()) {
                                            onSortChange({
                                                field: field.getName(),
                                                way:
                                                    sort.way === 'asc'
                                                        ? 'desc'
                                                        : 'asc',
                                            });
                                        }
                                    }}
                                >
                                    {field.getDisplayName()}
                                </HeaderLink>
                            </TH>
                        ))}
                    </TR>
                </THead>
                <TBody>
                    {_.iane(data) &&
                        data.map(item => {
                            return (
                                <TR key={item.code}>
                                    <ActionTD>
                                        <Actions />
                                    </ActionTD>
                                    {entity.getFields().map(field => {
                                        const Cell = getCellComponent(field);
                                        return (
                                            <TD
                                                key={`${
                                                    item.code
                                                }_${field.getName()}`}
                                            >
                                                <Cell
                                                    entity={entity}
                                                    field={field}
                                                    value={
                                                        item[field.getName()]
                                                    }
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
};

export default List;
