import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { withNotification, withModal } from 'ew-internals-ui';
import {
    ENTITY_ID_FIELD_NAME,
    FIELD_TYPE_STRING,
    FIELD_TYPE_DATETIME,
    FIELD_TYPE_BOOLEAN,
} from 'project-minimum-core';
import { useErrorNotification, useDispatchUnload } from '../../lib/hooks';
import { withClient } from '../../lib/client';
import { parseSearch } from '../../lib/util';
import Button from '../../material-kit/CustomButtons';
import mapDispatchToProps from './dispatch';
import { extractPageParameters } from './util';
import { ButtonWrap } from './style';

import { DataPageProperties } from './type';

import {
    Layout,
    List,
    ListCellCode,
    ListCellReference,
    ListCellString,
    ListCellDate,
    ListCellBoolean,
} from '../../components';
import { Entity, Field, Item } from '../../lib/project-minimum-core';

const getFieldRenderer = (field: Field) => {
    if (field.getName() === ENTITY_ID_FIELD_NAME) {
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

const getDetailURL = (item: Nullable<Item>, entity: Entity) =>
    `/data/${encodeURIComponent(entity.getName())}/${encodeURIComponent(
        item ? item.id : 'new',
    )}/`;

const DataPageComponent: FunctionComponent<DataPageProperties> = ({
    client,
    route,
    schema,
    data = [],
    count = 0,
    error = null,
    notify = () => {},
    dispatchLoad = () => {},
    dispatchUnload = () => {},
    dispatchDelete = () => {},
    dispatchUpdateSearch = () => {},
    dispatchNavigate = () => {},
    openConfirmModal = () => {},
}) => {
    const pageParams = useMemo(() => {
        const search = route ? parseSearch(route.location.search) : '';
        return extractPageParameters(search);
    }, [route]);

    useDispatchUnload(dispatchUnload);
    useErrorNotification(error, notify);

    let entity: Nullable<Entity> = null;
    if (schema) {
        entity = schema.getEntity(_.get(route, 'match.params.entity_name'));
    }

    // load data on component mount
    useEffect(() => {
        if (entity) {
            dispatchLoad(client, { entity, pageParams });
        }
    }, [entity, client, pageParams]);

    const displayName = entity ? entity.getDisplayName() : 'Unknown entity';
    const columns = useMemo(() => {
        if (entity) {
            return entity.getFields().map(field => ({
                name: field.getName(),
                displayName: field.getDisplayName(),
                sortable: field.isSortable(),
                renderer: getFieldRenderer(field),
            }));
        }

        return [];
    }, [entity]);

    const itemActions = useMemo(() => {
        if (entity) {
            return [
                {
                    name: 'edit',
                    displayName: 'Edit',
                    icon: 'edit',
                    onClick: null,
                    getHref: (item: Item) =>
                        getDetailURL(item, entity as Entity),
                },
                {
                    name: 'delete',
                    displayName: 'Delete',
                    icon: 'clear',
                    onClick: (name: string, item: Item, closePanel) => {
                        closePanel();
                        openConfirmModal(
                            <>
                                Do you really want to delete item {item.id}?
                                <br />
                                You will not be able to un-do this.
                            </>,
                            ({ closeModal }) => {
                                return [
                                    <ButtonWrap key="yes">
                                        <Button
                                            onClick={() => {
                                                dispatchDelete(
                                                    client,
                                                    entity as Entity,
                                                    item.id,
                                                    pageParams,
                                                );
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
                    },
                    getHref: null,
                },
            ];
        }

        return [];
    }, [entity]);

    return (
        <Layout
            title={displayName}
            actions={
                <>
                    <Button
                        type="button"
                        onClick={() =>
                            dispatchNavigate(
                                getDetailURL(null, entity as Entity),
                            )
                        }
                    >
                        Add
                    </Button>
                </>
            }
        >
            {!!entity && (
                <List
                    columns={columns}
                    data={data}
                    count={count}
                    {...pageParams}
                    sort={{
                        cell: pageParams.sort[0],
                        way: pageParams.sort[1] === 'asc' ? 'asc' : 'desc',
                    }}
                    onPageChange={(page: number) =>
                        dispatchUpdateSearch(route, {
                            page,
                        })
                    }
                    onSortChange={sort =>
                        dispatchUpdateSearch(route, {
                            sort: `${sort.cell}:${sort.way}`,
                        })
                    }
                    keyProperty={ENTITY_ID_FIELD_NAME}
                    itemActions={itemActions}
                />
            )}
        </Layout>
    );
};

export default withModal(
    withNotification(
        withClient(
            connect(
                s => ({ ...s.data, schema: s.application.schema }),
                mapDispatchToProps,
            )(DataPageComponent),
        ),
    ),
);
