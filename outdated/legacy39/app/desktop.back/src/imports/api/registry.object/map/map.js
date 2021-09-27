import levelEnum from '../enum/level.js';
import locationEnum from '../enum/area.js';
import kindEnum from '../enum/kind.js';
import categoryEnum from '../enum/category.js';
import conditionEnum from '../enum/condition.js';
import statusEnum from '../enum/status.js';

import Map from '../../../lib/base/map';

const M = (superclass) => class extends superclass
{
    constructor(definition)
    {
        super(definition || [
            {
                code: 'name',
                type: String,
                label: 'Имя',
            },
            {
                code: 'nameOriginal',
                type: String,
                label: 'Довоенное название',
                optional: true,
            },
            {
                code: 'code',
                type: String,
                label: 'Код',
                optional: true,
            },
            {
                code: 'originDate',
                type: Date,
                label: 'Дата добавления',
                optional: true,
            },
            {
                code: 'creationPeriod',
                type: String,
                label: 'Время появления',
                optional: true,
            },
            {
                code: 'tearDownPeriod',
                type: String,
                label: 'Время утраты',
                optional: true,
            },
            {
                code: 'location',
                type: [new Map([
                    {
                        code: 'lng',
                        type: Number,
                        decimal: true,
                    },
                    {
                        code: 'lat',
                        type: Number,
                        decimal: true,
                    },
                ])],
                label: 'Местоположение',
                optional: true,
            },
            {
                code: 'locationDescription',
                type: String,
                label: 'Описание местоположения',
                optional: true,
                // autoSelect: false,
            },
            {
                code: 'area',
                type: String,
                label: 'Район',
                allowedValues: locationEnum,
                optional: true,
            },
            {
                code: 'documentName',
                type: String,
                label: 'Постановление',
                optional: true,
            },
	        {
		        code: 'document',
		        type: [new Map([
			        {
				        code: 'name',
				        type: String,
                        optional: true,
			        },
			        {
				        code: 'type',
				        type: String,
			        },
			        {
				        code: 'date',
				        type: String,
				        optional: true,
			        },
			        {
				        code: 'fileId',
				        type: String,
			        },
		        ])],
		        label: 'Документы',
		        optional: true,
	        },
            {
                code: 'status',
                type: String,
                label: 'Статус',
                allowedValues: statusEnum,
                defaultValue: statusEnum.KEY_O,
                optional: true,
            },
            {
                code: 'category',
                type: String,
                label: 'Категория',
                allowedValues: categoryEnum,
                defaultValue: categoryEnum.KEY_ARCHITECT,
                optional: true,
            },
            {
                code: 'kind',
                type: [String],
                label: 'Тип',
                allowedValues: kindEnum,
                defaultValue: [kindEnum.KEY_OBJECT],
                optional: true,
            },
            {
                code: 'level',
                type: String,
                label: 'Уровень значимости',
                allowedValues: levelEnum,
                defaultValue: levelEnum.KEY_UNDEFINED,
                optional: true,
            },
            {
                code: 'condition',
                type: String,
                label: 'Состояние',
                allowedValues: conditionEnum,
                defaultValue: conditionEnum.KEY_N,
                optional: true,
            },
            {
                code: 'inDanger',
                type: Boolean,
                label: 'В опасности',
                optional: true,
                defaultValue: false,
            },
            {
                code: 'search',
                type: String,
                optional: true,
                autoSelect: false,
            },
            {
                code: 'verified',
                type: Boolean,
                optional: true,
                defaultValue: true,
            },
            {
                code: 'photoId',
                type: String,
                optional: true,
            },
            {
                code: 'note',
                type: String,
                label: 'Заметки',
                optional: true,
            },
            {
                code: 'technology',
                type: [String],
                label: 'Технология',
                optional: true,
                // defaultValue: ['BRICK', 'WOOD'],
            },
	        {
		        code: 'favouriteFor',
		        type: [String],
		        label: 'Избранное для',
		        optional: true,
                defaultValue: [],
	        },
            {
                code: 'remarkable',
                type: Boolean,
                label: 'Выдающееся',
                optional: true,
                defaultValue: false,
            },
            {
                code: 'altered',
                type: Boolean,
                label: 'Перестроен',
                optional: true,
                defaultValue: false,
            },
            {
                code: 'architect',
                type: String,
                label: 'Архитектор',
                optional: true,
            },
            {
                code: 'hidden',
                type: Boolean,
                optional: true,
            },
            {
                code: 'sourceReference',
                type: String,
                optional: true,
            },
            {
                code: 'createdBy',
                type: String,
                optional: true,
            },
        ]);
    }
};

export default M;
