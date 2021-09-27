import React from 'react';
import PropTypes from 'prop-types';

import BaseComponent from '../../../../lib/base/component/component.jsx';
import Modal from '../etc/modal';
import dateTypeEnum from '../../../../api/registry.object/enum/date-type.js';
import moment from 'moment';
import InputMask from 'react-input-mask';

import './style.less';

export default class DateSelector extends BaseComponent {
    static propTypes = {
        className: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.object,
        ]),
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
        ]),
        onChange: PropTypes.func,
        editMode: PropTypes.bool,
        exact: PropTypes.bool,
        notDefinedLabel: PropTypes.string,
    };

    static defaultProps = {
        className: '',
        value: '',
        onChange: null,
        editMode: false,
        exact: true,
        notDefinedLabel: 'Не указано',
    };

    constructor(props) {
        super(props);
        this.extendState({
            opened: false,
        });

        this._value = this.getValueInitial();
        this._valueEffective = this.getValueInitial(true);
    }

    onTypeClick(type) {
        this.setType(type);
        this.setType(type, true);
    }

    onPartClick(part) {
        this.setPart(part);
        this.setPart(part, true);
    }

    onSelectorOpen()
    {
        if (!this.isEditMode())
        {
            return;
        }

        this.setState({
            opened: true,
        });
    }

    onSelectorClose()
    {
        if (!_.deepEqual(this.props.value, this.getValue(true)) && _.isFunction(this.props.onChange))
        {
            const value = this.normalizeValue(this.getValue(true));

            this.props.onChange(this.isExact() ? value.date : value);
        }

        this.close();
    }

    onYearBeginChange(arg) {
        const v = arg.target.value.toString();

        this.setYearBegin(v);
        if (/^\d{4}$/.test(v)) {
            this.setYearBegin(v, true);
        }
    }

    onYearEndChange(arg) {
        const v = arg.target.value.toString();

        this.setYearEnd(v);
        if (/^\d{4}$/.test(v)) {
            this.setYearEnd(v, true);
        }
    }

    onAgeChange(arg) {
        const v = arg.target.value.toString();

        this.setAge(v);
        this.setAge(v, true);
    }

    onDateChange(arg) {
        const v = arg.target.value.toString();

        this.setDate(v);
        if (/^\d{2}\.\d{2}\.\d{4}$/.test(v)) {
            this.setDate(v, true);
        }
    }

    // ///////

    isExact() {
        return this.props.exact;
    }

    isEditMode()
    {
        return this.props.editMode;
    }

    close()
    {
        this.setState({
            opened: false,
        });
    }

    forceUpdateByValue(toEffective = false) {
        if (!toEffective) {
            this.forceUpdate();
        }
    }

    getValueInitial(isEffective = false)
    {
        let value = {};
        if (this.isExact()) {
            Object.assign(value, {
                type: dateTypeEnum.KEY_DATE,
                date: _.deepClone(this.props.value) || null,
            });
        } else {
            value = _.deepClone(this.props.value);
        }

        // convert date to string
        if (!isEffective) {
            if (_.isDate(value.date)) {
                value.date = this.dateToUTCString(value.date);
            } else {
                value.date = '';
            }
        }

        const result = {};
        Object.assign(result, {
            year: {
                begin: isEffective ? null : '',
                end: isEffective ? null : '',
            },
            part: {
                begin: false,
                middle: false,
                end: false,
            },
            age: '19',
        }, value);

    	return result;
    }

    getValue(toEffective = false)
    {
    	return toEffective ? this._valueEffective : this._value;
    }

    // type

    isType(t) {
        return this.getValue().type === t;
    }

    setType(type, toEffective = false) {
        this.getValue(toEffective).type = type;
        this.forceUpdateByValue(toEffective);
    }

    // age

    getAge() {
        return this.getValue().age || '19';
    }

    setAge(age, toEffective = false) {
        const v = this.getValue(toEffective);
        v.age = age;
        this.calcYears(v);

        this.forceUpdateByValue(toEffective);
    }

    // date

    getDate() {
        return this.getValue().date;
    }

    setDate(value, toEffective = false) {
        if (toEffective) {
            this.getValue(true).date = this.strToUTCDate(value);
        } else {
            this.getValue().date = value;
        }

        this.forceUpdateByValue(toEffective);
    }

    // year begin

    getYearBegin() {
        return this.getValue().year.begin;
    }

    setYearBegin(year, toEffective = false) {
        this.getValue(toEffective).year.begin = year;
        this.forceUpdateByValue(toEffective);
    }

    // year end

    getYearEnd() {
        return this.getValue().year.end;
    }

    setYearEnd(year, toEffective = false) {
        this.getValue(toEffective).year.end = year;
        this.forceUpdateByValue(toEffective);
    }

    // part

    isPart(part) {
        return !!this.getValue().part[part];
    }
    setPart(part, isEffective = false) {
        const v = this.getValue(isEffective);
        v.part[part] = !v.part[part];

        if (v.part.begin && v.part.end) {
            v.part.middle = true;
        }

        this.calcYears(v);

        this.forceUpdateByValue(isEffective);
    }

    calcYears(v) {
        // calculate also year ranges
        const start = [];
        const end = [];
        const age = +v.age - 1;

        if (v.part.begin) {
            start.push(+`${age}00`);
            end.push(+`${age}32`);
        }
        if (v.part.middle) {
            start.push(+`${age}33`);
            end.push(+`${age}65`);
        }
        if (v.part.end) {
            start.push(+`${age}66`);
            end.push(+`${age}99`);
        }

        v.year.begin = _.isArrayNotEmpty(start) ? _.min(start) : +`${age}00`;
        v.year.end = _.isArrayNotEmpty(end) ? _.max(end) : +`${age}99`;
    }

    strToUTCDate(value) {
        const parts = value.split('.');
        return new Date(Date.UTC(parts[2], +parts[1] - 1, parts[0], 0, 0, 0, 0));
    }

    dateToUTCString(date) {
        if (!_.isDate(date)) {
            return '';
        }

        const d = date.getUTCDate().toString();
        const m = (date.getUTCMonth() - 1).toString();
        const y = date.getUTCFullYear();

        return `${d.padStart(2, '0')}.${m.padStart(2, '0')}.${y}`;
    }

    normalizeValue(data) {
        if (data.type === dateTypeEnum.KEY_INTERVAL) {
            const from = data.year.begin;
            const to = data.year.end;
            if (+from > +to) {
                data.year.begin = to;
                data.year.end = from;
            }
            data.date = this.strToUTCDate(`01.01.${data.year.begin}`);
        } else if (data.type === dateTypeEnum.KEY_AGE) {
            this.calcYears(data);
            data.date = this.strToUTCDate(`01.01.${data.year.begin}`);
        } else if (data.type === dateTypeEnum.KEY_YEAR) {
            data.date = this.strToUTCDate(`01.01.${data.year.begin}`);
            data.year.end = data.year.begin;
        } else if (data.type === dateTypeEnum.KEY_DATE) {
            data.year.begin = data.date.getUTCFullYear();
            data.year.end = data.date.getUTCFullYear();
        }

        return data;
    }

    renderValue() {
        const v = this.props.value;

        if (this.isExact()) {
            if (_.isDate(v)) {
                return moment(v).format('DD MMMM YYYY г.');
            }
        } else {
            // different
            // todo
        }

        return this.props.notDefinedLabel;
    }

    renderAges() {
        const res = [];
        const age = this.getAge();

        for (let i = 20; i >= 13; i--) {
            res.push(<option value={i} key={i} selected={age === i.toString()}>{i} век</option>);
        }

        return res;
    }

    render() {
        const display = this.props.display;

        return (
            <div className={`date-selector ${this.props.className}`}>
                <span
                    className={this.isEditMode() ? 'registry-detail__link-editable' : ''}
                    onClick={this.onSelectorOpen.bind(this)}
                >
                    {_.isExist(display) ? this.props.display : this.renderValue()}
                </span>
                {
                    this.state.opened
                    &&
                    <Modal
                        onClose={this.onSelectorClose.bind(this)}
                    >
                        {
                            !this.isExact()
                            &&
                            <div className="rb-margin-b_x">
                                <div className="rb-group_x">
                                    <button className={`pl-button ${this.isType(dateTypeEnum.KEY_DATE) ? '' : 'pl-button_inactive'}`} onClick={this.onTypeClick.bind(this, dateTypeEnum.KEY_DATE)}>Точная дата</button>
                                    <button className={`pl-button ${this.isType(dateTypeEnum.KEY_YEAR) ? '' : 'pl-button_inactive'}`} onClick={this.onTypeClick.bind(this, dateTypeEnum.KEY_YEAR)}>Год</button>
                                    <button className={`pl-button ${this.isType(dateTypeEnum.KEY_INTERVAL) ? '' : 'pl-button_inactive'}`} onClick={this.onTypeClick.bind(this, dateTypeEnum.KEY_INTERVAL)}>Интервал</button>
                                    <button className={`pl-button ${this.isType(dateTypeEnum.KEY_AGE) ? '' : 'pl-button_inactive'}`} onClick={this.onTypeClick.bind(this, dateTypeEnum.KEY_AGE)}>Столетие</button>
                                </div>
                            </div>
                        }
                        {
                            this.isType(dateTypeEnum.KEY_DATE)
                            &&
                            <div className="grid-x grid-margin-x">
                                <div className="cell small-4">
                                    <InputMask mask="99.99.9999" type="text" placeholder="Дата" className="rb-no-margin" value={this.getDate()} onChange={this.onDateChange.bind(this)} />
                                </div>
                            </div>
                        }
                        {
                            this.isType(dateTypeEnum.KEY_YEAR)
                            &&
                            <div className="grid-x grid-margin-x">
                                <div className="cell small-4">
                                    <InputMask mask="9999" type="text" placeholder="Год" className="rb-no-margin" value={this.getYearBegin()} onChange={this.onYearBeginChange.bind(this)} />
                                </div>
                            </div>
                        }
                        {
                            this.isType(dateTypeEnum.KEY_INTERVAL)
                            &&
                            <div className="grid-x grid-margin-x">
                                <div className="cell small-4">
                                    <InputMask mask="9999" type="text" placeholder="Год от" className="rb-no-margin" value={this.getYearBegin()} onChange={this.onYearBeginChange.bind(this)} />
                                </div>
                                <div className="cell small-4">
                                    <InputMask mask="9999" type="text" placeholder="Год до" className="rb-no-margin" value={this.getYearEnd()} onChange={this.onYearEndChange.bind(this)} />
                                </div>
                            </div>
                        }
                        {
                            this.isType(dateTypeEnum.KEY_AGE)
                            &&
                            <div className="grid-x grid-margin-x">
                                <div className="cell small-4">
                                    <select className="rb-no-margin" onChange={this.onAgeChange.bind(this)}>
                                        {this.renderAges()}
                                    </select>
                                </div>
                                <div className="cell small-8">
                                    <div className="pl-button-group">
                                        <button className={`pl-button ${this.isPart('begin') ? '' : 'pl-button_inactive'}`} onClick={this.onPartClick.bind(this, 'begin')}>Начало</button>
                                        <button className={`pl-button ${this.isPart('middle') ? '' : 'pl-button_inactive'}`} onClick={this.onPartClick.bind(this, 'middle')}>Середина</button>
                                        <button className={`pl-button ${this.isPart('end') ? '' : 'pl-button_inactive'}`} onClick={this.onPartClick.bind(this, 'end')}>Конец</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </Modal>
                }
            </div>
        );
    }
}
