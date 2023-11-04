import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

interface DateFieldValueProps {
  date: string;
  setDate: (date: string) => void;
}

const DateFieldValue: React.FC<DateFieldValueProps> = ({ date, setDate }) => {
  const handleDateChange = (newDate: string | null) => {
    if (newDate !== null) {
      setDate(newDate);
    }
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateField', 'DateField']}>
          <DateField
            label="Uncontrolled field"
            defaultValue={date}
            onChange={handleDateChange}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default DateFieldValue;
