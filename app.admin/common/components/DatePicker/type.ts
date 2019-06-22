export interface DatePickerProperties {
    value: Date;
    onChange: (date: Date) => void;
    onDaySelect: () => void;
}
