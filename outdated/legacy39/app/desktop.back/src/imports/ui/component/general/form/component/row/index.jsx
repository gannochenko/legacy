import React from 'react';
import PropTypes from 'prop-types';

import RendererString from '../renderer/string';
import RendererBoolean from '../renderer/boolean';
import RendererDate from '../renderer/date';
import RendererLink from '../renderer/link';
import RendererList from '../renderer/list';
import RendererLinkList from '../renderer/link-list';
import RenderMap from '../renderer/map';
import RenderSelectBox from '../renderer/selectbox';
import RenderFileLink from '../renderer/file-link';
import RenderFileLinks from '../renderer/file-links';

import FileEntity from '../../../../../../api/file/entity/entity.client.js';

import Attribute from '../../../../../../lib/base/map/attribute';

export default class Row extends React.Component
{
    static propTypes = {
        form: PropTypes.object.isRequired,
        map: PropTypes.object.isRequired,
    };

    static defaultProps = {
        form: null,
        map: null,
    };

    resolveRenderer(attribute)
    {
        const renderer = attribute.getParameter('renderer');
        if (renderer)
        {
            return renderer;
        }

        if (!(attribute instanceof Attribute))
        {
            return null;
        }

        // todo: terrible idea, need to render the link attribute here, not its substitution!
        // todo: make amend
        // special type of String or [String] fields which represent link fields in SimpleSchema
        if (attribute.isReference())
        {
            const map = this.getMap();
            
            if (attribute.isArray())
            {
                // special type - file list
                const toAttribute = map.getAttribute(attribute.getData().referenceToCode);
                if (toAttribute && toAttribute.getArrayType() === FileEntity)
                {
                    return RenderFileLinks;
                }

                return RendererLinkList;
            }
            else
            {
                // special type - single file
                const toAttribute = map.getAttribute(attribute.getData().referenceToCode);
                if (toAttribute && toAttribute.getType() === FileEntity)
                {
                    return RenderFileLink;
                }

                // 
                return RendererLink;
            }
        }

        if (attribute.isStringDiscreet())
        {
            return RenderSelectBox;
        }

        if (attribute.isString() || attribute.isNumber())
        {
            return RendererString;
        }
        if (attribute.isDate())
        {
            return RendererDate;
        }
        if (attribute.isBoolean())
        {
            return RendererBoolean;
        }

        if (attribute.isArray())
        {
            return RendererList;
        }

        if (attribute.isMap())
        {
            return RenderMap;
        }

        return null;
    }

    resolveItemRenderer(attribute)
    {
        const itemRenderer = attribute.getParameter('itemRenderer');
        if (itemRenderer)
        {
            return itemRenderer;
        }

        if (attribute.isArrayOfString() || attribute.isArrayOfNumber())
        {
            return RendererString;
        }
        if (attribute.isArrayOfDate())
        {
            return RendererDate;
        }
        if (attribute.isArrayOfBoolean())
        {
            return RendererBoolean;
        }
        if (attribute.isArrayOfMap())
        {
            return RenderMap;
        }

        return null;
    }

    getControlParams(attribute)
    {
        const params = {
            attribute,
            map: this.getMap(),
            form: this.props.form,
            row: this,
            key: attribute.getCode(),
        };

        if (attribute instanceof Attribute)
        {
            if (attribute.isArray())
            {
                params.initialCount = attribute.hasMinCount() ? attribute.getMinCount() : 1;
            }
            if (attribute.isMap())
            {
                params.map = attribute.getType();
            }
        }

        return params;
    }

    getControlChildrenParams(attribute)
    {
        const params = {
            attribute,
            listMode: true, // dont show label in list items and other minor stuff
        };

        if (attribute.isArrayOfMap())
        {
            params.map = attribute.getType()[0];
        }

        return params;
    }

    getControlChildren(attribute)
    {
        let children = null;

        if (attribute instanceof Attribute)
        {
            if (attribute.isArray())
            {
                const renderer = this.resolveItemRenderer(attribute);
                if (!renderer)
                {
                    return children;
                }

                children = [
                    React.createElement(
                        renderer,
                        Object.assign(
                            this.getControlChildrenParams(attribute),
                            {
                                name: '$',
                                key: '-1',
                            }
                        )
                    )
                ];
            }
        }

        return children;
    }

    getAttribute()
    {
        return this.props.attribute || {};
    }

    getForm()
    {
        return this.props.form || null;
    }

    getMap()
    {
        return this.props.map || null;
    }

    renderAttribute(attribute, parameters = {})
    {
        const constructor = this.resolveRenderer(attribute);
        if (!constructor) {
            return null;
        }

        return React.createElement(
            constructor,
            Object.assign(
                this.getControlParams(attribute),
                {
                    name: attribute.getCode(),
                },
                parameters
            ),
            this.getControlChildren(attribute)
        );
    }

    render()
    {
        return this.renderAttribute(this.getAttribute());
    }
}
