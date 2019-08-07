import React, { useMemo } from 'react';
import {
    FIELD_TYPE_STRING,
    FIELD_TYPE_DATETIME,
    FIELD_TYPE_BOOLEAN,
} from 'project-minimum-core';
import { withModal } from 'ew-internals-ui';

import Button from '../../material-kit/CustomButtons';

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
    ButtonWrap,
    ActionPanel,
} from './style';
import {
    ListCellCode,
    ListCellBoolean,
    ListCellDate,
    ListCellReference,
    ListCellString,
    PageNavigation,
} from '..';

const getCellComponent = field => {
    if (field.getName() === 'code') {
        return ListCellCode;
    }
    if (field.isReference()) {
        return ListCellReference;
    }
    if (field.getActualType() === FIELD_TYPE_STRING) {
        return ListCellString;
    }
    if (field.getActualType() === FIELD_TYPE_DATETIME) {
        return ListCellDate;
    }
    if (field.getActualType() === FIELD_TYPE_BOOLEAN) {
        return ListCellBoolean;
    }

    return ListCellString;
};

const renderItemActions = (
    item,
    onActionClick,
    openConfirmModal,
    closePanel,
) => {
    return (
        <ItemActions>
            <ItemAction icon="edit" onClick={() => onActionClick('edit', item)}>
                Edit
            </ItemAction>
            <ItemAction
                icon="clear"
                onClick={() => {
                    closePanel();
                    openConfirmModal(
                        <span>
                            Do you really want to delete item {item.code}?<br />
                            You won't be able to un-do this.
                        </span>,
                        ({ closeModal }) => {
                            return [
                                <ButtonWrap key="yes">
                                    <Button
                                        onClick={() => {
                                            onActionClick('delete', item);
                                            closeModal();
                                        }}
                                    >
                                        Yes
                                    </Button>
                                </ButtonWrap>,
                                <ButtonWrap key="no">
                                    <Button onClick={closeModal}>No</Button>
                                </ButtonWrap>,
                            ];
                        },
                    );
                }}
            >
                Delete
            </ItemAction>
        </ItemActions>
    );
};

const ListComponent = ({
    entity,
    data,
    page,
    count,
    pageSize,
    sort,
    onPageChange,
    onSortChange,
    onActionClick,
    openConfirmModal,
}) => {
    sort = sort || {};

    const columns = useMemo(() => entity.getFields(), [data]);

    return (
        <Container>
            <Table cellPadding="0" cellSpacing="0">
                <THead>
                    <TR>
                        <ActionTH />
                        {columns.map(field => (
                            <TH key={field.getName()}>
                                <HeaderLink
                                    sortable={field.isSortable()}
                                    sign={
                                        field.getName() === sort.scalar
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
                                        <ActionPanel
                                            panel={({ closePanel }) =>
                                                renderItemActions(
                                                    item,
                                                    onActionClick,
                                                    openConfirmModal,
                                                    closePanel,
                                                )
                                            }
                                            openOnChildrenClick
                                        >
                                            {() => <Actions />}
                                        </ActionPanel>
                                    </ActionTD>
                                    {columns.map(field => {
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

export const List = withModal(ListComponent);
