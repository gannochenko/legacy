import React from 'react';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';

// https://github.com/vazco/uniforms/blob/master/INTRODUCTION.md#autofield-algorithm
// https://github.com/vazco/uniforms/blob/master/API.md#connectfield
// https://github.com/vazco/uniforms/blob/master/packages/uniforms-unstyled/src/TextField.js

import {ControllerClass as RendererLinkList} from '../link-list';
import Container from '../container';
import FilePicker from '../../../../etc/file-picker';

import './style.less';

class RendererFileUploader extends RendererLinkList
{
    constructor(props)
    {
        super(props);
        this.extendState({
        });
    }

    onChange(ids)
    {
        this.getOnChange()(ids);
        this.startDataReload(true);
    }

    getItemSelectFields()
    {
        return ['name', 'url', 'size', 'type'];
    }

    render()
    {
        if (this.hasError())
        {
            return (
                <div className="form__error">
                    {this.getErrorText()}
                </div>
            );
        }

        return (
            <Container
                errorProps={this.props}
                {...filterDOMProps(this.props)}
            >
                {
                    this.isReady()
                    &&
                    <div
                        ref={(ref) => {this._scope = ref;}}
                    >
                        <FilePicker
                            files={this.getValueActual()}
                            value={this.getValue()}
                            onChange={this.onChange.bind(this)}
                        />
                    </div>
                }
            </Container>
        );
    }
}

export default connectField(RendererFileUploader, {});
