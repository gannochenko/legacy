import React from 'react';
import {
    Container,
    Table,
    THead,
    TBody,
    TH,
    TR,
    TD,
    HeaderLink,
    Footer,
    Counter,
} from './style.js';

import {
    ENTITY_TYPE_STRING,
    ENTITY_TYPE_DATE,
    // ENTITY_TYPE_NUMBER,
    ENTITY_TYPE_BOOLEAN,
} from '../../../shared/constants';

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
    if (field.getActualType() === ENTITY_TYPE_STRING) {
        return ListCellString;
    }
    if (field.getActualType() === ENTITY_TYPE_DATE) {
        return ListCellDate;
    }
    if (field.getActualType() === ENTITY_TYPE_BOOLEAN) {
        return ListCellBoolean;
    }

    return ListCellString;
};

const List = ({ entity, data, page, count, pageSize, onPageChange }) => (
    <Container>
        <Table cellPadding="0" cellSpacing="0">
            <THead>
                <TR>
                    {entity.getFields().map(field => (
                        <TH key={field.getName()}>
                            <HeaderLink sortable={field.isSortable()} up>
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
                                                value={item[field.getName()]}
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
                <PageNavigation
                    count={count}
                    page={page}
                    onNavigate={onPageChange}
                    pageSize={pageSize}
                />
            </Footer>
        )}
    </Container>
);

export default List;
