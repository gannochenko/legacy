import Enum from '../../../lib/base/enum/index.js';

export default class BaseEnum extends Enum
{
    _keyMap = null;

    getKeyRegular(keyIrregular)
    {
        const map = this.getKeyMap();
        return map[keyIrregular] || null;
    }

    getKeyMap() {
        if (!this._keyMap)
        {
            this._keyMap = {};
            this._items.forEach((item) => {
                if (_.isStringNotEmpty(item.iKey))
                {
                    this._keyMap[item.iKey] = item;
                }
                else if(_.isArrayNotEmpty(item.iKey))
                {
                    item.iKey.forEach((nKey) => {
                        this._keyMap[nKey] = item;
                    });
                }
            });
        }

        return this._keyMap;
    }
}

return BaseEnum;
