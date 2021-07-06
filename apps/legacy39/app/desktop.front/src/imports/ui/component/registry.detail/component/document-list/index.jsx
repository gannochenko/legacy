import React from 'react';
import PropTypes from 'prop-types';

import BaseComponent from '../../../../../lib/base/component/component.jsx';
import Modal from '../../../general/etc/modal/index.jsx';
import Selector from '../../../general/etc/selector/index.jsx';
import RichBlock from '../../../general/rich-block/index.jsx';
import Question from '../../../general/etc/question/index.jsx';
import EnumSelector from '../../../general/enum-selector/index.jsx';
import DateSelector from '../../../general/date-selector/index.jsx';
import FilePicker from '../../../../../lib/util/uploader/ui/file-picker/index.jsx';

import documentTypeEnum from '../../../../../api/registry.object/enum/document-type.js';

import './style.less';

export default class DocumentEditor extends BaseComponent {
    static propTypes = {
        className: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.object,
        ]),
        source: PropTypes.object,
        onChange: PropTypes.func,
        editMode: PropTypes.bool,
    };

    static defaultProps = {
        className: '',
        source: null,
        onChange: null,
        editMode: false,
    };

    onDocumentTypeChange(i, value) {
        const items = this.getSource().extractDocument();
        if (_.isArrayNotEmpty(items) && _.isExist(items[i])) {
            items[i].type = value;

            this.props.onChange(items);
        }
    }

    onDateChange(i, value) {
        const items = this.getSource().extractDocument();
        if (_.isArrayNotEmpty(items) && _.isExist(items[i])) {
            items[i].date = value;

            this.props.onChange(items);
        }
    }

    /**
     * todo: replace docIndex with docId when moving to mongoose
     * @param i
     * @param value
     */
    onNameChange(i, value)
    {
        const items = this.getSource().extractDocument();
        if (_.isArrayNotEmpty(items) && _.isExist(items[i])) {
            items[i].name = value;

            this.props.onChange(items);
        }
    }

    onItemDeleteClick(i) {
        return Question.ask(
            `Удалить документ?`,
            {
                buttons: [
                    {
                        code: 'Y',
                        label: 'Да, удалить',
                    },
                    {
                        code: 'N',
                        label: 'Нет, отставить!',
                    },
                ],
            }
        ).then((res) => {
            if (res.code === 'Y') {

                const items = this.getSource().extractDocument();
                items.splice(i, 1);

                // remove some stuff
                return this.props.onChange(items);
            }
        }).then(() => {
            this.forceUpdate();
        }).catch();
    }

    onAddClick() {
        Modal.open((
            <FilePicker
                onChange={this.onFileUploaded.bind(this)}
                onImportantProcessStart={() => {
                    const m = Modal.get();
                    if (m)
                    {
                        m.disableClose();
                    }
                }}
                onImportantProcessStop={() => {
                    const m = Modal.get();
                    if (m)
                    {
                        m.enableClose();
                    }
                }}
            />
        ));
    }

    onFileUploaded() {
        if (_.isStringNotEmpty(arguments[0])) {
            const items = this.getSource().extractDocument();
            items.unshift({
                name: '',
                type: documentTypeEnum.KEY_OTHER,
                date: new Date(),
                fileId: arguments[0],
            });

            this.props.onChange(items);
        }

        Modal.close();
    }

    onRenderNamePreview(item) {
        console.dir(item);
        return (<a href={this.getDownloadLink(item)}>{item.name}</a>);
    }

    getDownloadLink(document)
    {
        const files = this.getSource().getFileCollection();
        const file = files.getItem(document.fileId);

        if (file) {
            return file.getAbsoluteURL();
        }

        return '';
    }

	getSource()
	{
		return this.props.source;
	}

	isEditMode()
	{
		return this.props.editMode;
	}

    render()
    {
	    const item = this.getSource();

	    return (
            <div className="registry-detail__documents">
                <div className="registry-detail__document-list rb-group_x">
                    {
                        item.extractDocument().map((document, i) => {
                            return (
                                <div className="registry-detail__document-item" key={document.fileId}>
                                    <div className="registry-detail__document-item-name">
                                        <RichBlock
                                            value={document.name}
                                            placeholder="Введите название документа..."
                                            editMode={this.isEditMode()}
                                            onChange={this.onNameChange.bind(this, i)}
                                            debounce={this.props.debounceTimeout || 300}
                                            onRenderPreview={this.onRenderNamePreview.bind(this, document)}
                                        />
                                    </div>
                                    <div className="registry-detail__document-item-info">
                                        <span
                                            className={this.isEditMode() ? 'registry-detail__link-editable' : ''}
                                        >
                                            <EnumSelector
                                                className="rb-inline-block"
                                                value={document.type}
                                                items={documentTypeEnum}
                                                editMode={this.isEditMode()}
                                                onChange={this.onDocumentTypeChange.bind(this, i)}
                                                multiple={false}
                                                notDefinedLabel="Тип документа"
                                            />
                                        </span>
                                        {
                                            (_.isDate(document.date) || this.isEditMode())
                                            &&
                                            <span>
                                                {' '}от{' '}
                                                <span
                                                    className={this.isEditMode() ? 'registry-detail__link-editable' : ''}
                                                >
                                                    <DateSelector
                                                        className="rb-inline-block"
                                                        value={document.date}
                                                        editMode={this.isEditMode()}
                                                        onChange={this.onDateChange.bind(this, i)}
                                                        notDefinedLabel="без даты"
                                                        exact
                                                    />
                                                </span>
                                            </span>
                                        }

                                        <div className="rb-group_x0p5 rb-margin-l_x2 rb-inline-block">
                                            <a
                                                className="registry-detail__document-item-action rb-i-icon-code_cloud-download"
                                                href={this.getDownloadLink(document)}
                                            >
                                                Скачать
                                            </a>
                                            {
                                                this.isEditMode()
                                                &&
                                                <a
                                                    className="registry-detail__document-item-action rb-i-icon-code_delete-forever"
                                                    onClick={this.onItemDeleteClick.bind(this, i)}
                                                >
                                                    Удалить
                                                </a>
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                {
                    this.isEditMode()
                    &&
                    <div className={`registry-detail__documents-actions rb-group_x rb-inline-block ${item.hasDocument() ? 'rb-margin-t_x' : ''}`}>
                        <a
                            className="registry-detail__documents-action rb-i-icon-code_add-circle"
                            onClick={this.onAddClick.bind(this)}
                        >
                            Добавить
                        </a>
                    </div>
                }
            </div>
	    );
    }
}
