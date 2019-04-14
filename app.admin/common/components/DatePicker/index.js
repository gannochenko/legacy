import React from 'react';
import {
    DatePicker,
    Selectors,
    Month,
    YearInput,
    Add,
    Remove,
} from './style.js';

export default () => {
    const cMonth = 0;
    const cYear = 2019;

    return (
        <DatePicker>
            <Selectors>
                <Month
                    className="date-picker__selector-month"
                    // onChange={this.onMonthChange}
                >
                    <option value="0" selected={cMonth === 0}>
                        January
                    </option>
                    <option value="1" selected={cMonth === 1}>
                        February
                    </option>
                    <option value="2" selected={cMonth === 2}>
                        March
                    </option>
                    <option value="3" selected={cMonth === 3}>
                        April
                    </option>
                    <option value="4" selected={cMonth === 4}>
                        May
                    </option>
                    <option value="5" selected={cMonth === 5}>
                        June
                    </option>
                    <option value="6" selected={cMonth === 6}>
                        July
                    </option>
                    <option value="7" selected={cMonth === 7}>
                        August
                    </option>
                    <option value="8" selected={cMonth === 8}>
                        September
                    </option>
                    <option value="9" selected={cMonth === 9}>
                        October
                    </option>
                    <option value="10" selected={cMonth === 10}>
                        November
                    </option>
                    <option value="11" selected={cMonth === 11}>
                        December
                    </option>
                </Month>
                <YearInput type="text" value={cYear} />
                <Add
                // onClick={this.onYearIncrementClick}
                />
                <Remove
                // onClick={this.onYearDecrementClick}
                />
            </Selectors>
        </DatePicker>
    );
};
