import React from 'react';
import BaseComponent from '../../../../../lib/base/component/component.jsx';
import Selector from '../../../general/etc/form/field/selector.jsx';
import EnumFactory from '../../../../../lib/base/enum/index.js';
import Form from '../../../general/etc/form/index.js';
import User from '../../../../../api/user/entity/entity.client.js';
// import AutoForm from 'uniforms-unstyled/AutoForm';

import levelEnum from '../../../../../api/registry.object/enum/level.js';
import locationEnum from '../../../../../api/registry.object/enum/area.js';
import kindEnum from '../../../../../api/registry.object/enum/kind.js';
import categoryEnum from '../../../../../api/registry.object/enum/category.js';
import conditionEnum from '../../../../../api/registry.object/enum/condition.js';
import statusEnum from '../../../../../api/registry.object/enum/status.js';

import PropTypes from 'prop-types';

import Schema from './schema.js';
import Model from './model.js';

export default class RegistryFilterPanel extends BaseComponent
{
    static propTypes = {
        className: PropTypes.string,
        onApply: PropTypes.func,
        onCancel: PropTypes.func,
    };

    static defaultProps = {
        className: '',
        onApply: null,
        onCancel: null
    };

    constructor(props) {
        super(props);
        this.extendState({
            model: Model.extractModel(this.props.data),
        });
    }

    // componentWillMount() {
    //     this.getFCS().onMount(); // mount function on event
    //
    //     if (this.useTitle()) {
    //         this.setTitle(this.getTitle());
    //     }
    //
    //     this._emitter = _.throttle(this.emitChange.bind(this), 700);
    // }
    //
    // componentWillUnmount() {
    //     this.getFCS().onUnmount(); // remove function from event
    //     this.emitChange(null);
    // }

    getModel() {
        return this.state.model;
    }

    // modelTransform(mode, transformModel) {
    //     this.onModelTransform(transformModel);
    //     this._emitter(transformModel);
    //
    //     if (mode === 'form') {
    //         this.getFCS().setDirty(this.getInitialModel(), transformModel);
    //     }
    //
    //     return transformModel;
    // }

    onSubmit(data) {
        const result = Model.putModel(data, {});

        if (_.isFunction(this.props.onApply)) {
            this.props.onApply(result);
        }
    }

    // modelTransform(mode, transformModel) {
    //     this.onModelTransform(transformModel);
    //     this._emitter(transformModel);
    //
    //     if (mode === 'form') {
    //         this.getFCS().setDirty(this.getInitialModel(), transformModel);
    //     }
    //
    //     return transformModel;
    // }

    // onValidate(data, error, cb) {
    //     if (error) {
    //         console.error(error);
    //     }
    //     if (error && error.error === 'validation-error') {
    //         this.stop();
    //     }
    //
    //     return cb();
    // }

    onChangeModel(model) {
        // set actual model outside =/
        this.setState({
            model,
        });
    }

    getFlagsEnum() {
        if (!this._flagsEnum) {

            const items = [
                {key: 'FAVOURITE', value: 'В избранном'},
            ];

            if (User.isEditor()) {
                items.push({key: 'DANGER', value: 'В опасности'});
            }

            this._flagsEnum = new EnumFactory(items);
        }

        return this._flagsEnum;
    }

    render() {
        // todo: replace "flags" selector with YES/NO/DONTCARE selector



        return (
            <Form
                schema={Schema}
                model={this.getModel()}
                onSubmit={this.onSubmit.bind(this)}
                className="grid-y"
                ref={(reference) => {this._form = reference;}}
                onChangeModel={this.onChangeModel.bind(this)}
                // onValidate={this.onValidate.bind(this)}
                // modelTransform={this.modelTransform.bind(this)}
            >
                <div className="cell rb-padding_x rb-f-size_x1p25">
                    Критерии поиска
                </div>
                <div className="cell rb-flex-grow_2">
                    <div className="registry-filter__modal-inner">
                        <div className="rb-padding-lr_x">
                            <div className="rb-group_v_x">
                                {
                                    !!User.get()
                                    &&
                                    <Selector
                                        label=""
                                        name="flags"
                                        items={this.getFlagsEnum()}
                                        multiple
                                    />
                                }
                                <Selector
                                    label="Статус"
                                    name="status"
                                    items={statusEnum}
                                    multiple
                                />
                                <Selector
                                    label="Тип"
                                    name="kind"
                                    items={kindEnum.clone().sortByValueAscAlphabetical()}
                                    multiple
                                />
                                <Selector
                                    label="Регион"
                                    name="area"
                                    items={locationEnum.clone().sortByValueAscAlphabetical()}
                                    multiple
                                />
                                <Selector
                                    label="Значимость"
                                    name="level"
                                    items={levelEnum}
                                    multiple
                                />
                                <Selector
                                    label="Состояние"
                                    name="condition"
                                    items={conditionEnum}
                                    multiple
                                />
                                <Selector
                                    label="Категория"
                                    name="category"
                                    items={categoryEnum.clone().sortByValueAscAlphabetical()}
                                    multiple
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cell rb-padding_x">
                    <div className="rb-group_x">
                        <button
                            type="submit"
                            className="pl-button"
                        >
                            Применить
                        </button>
                        <button
                            type="button"
                            className="pl-button"
                            onClick={this.props.onCancel}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </Form>
        );
    }
}
