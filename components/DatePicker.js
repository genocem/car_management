
import Button from './Button';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function DatePicker({date, setDate}) {

    

    const formatDate = (date) => {
        //format dd/mm/yyyy
        return date.toLocaleDateString('en-GB');
    };

    const onChange = (event, selectedDate) => {
        setDate(selectedDate);
    };

    const showDatepicker = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: 'date',
            is24Hour: true,
        });
    };
    return (
        <Button onPress={showDatepicker}
            title={formatDate(date)} />
    )
}
