// @ts-nocheck
import DateFnsUtils from '@date-io/date-fns';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Overrides } from '@material-ui/core/styles/overrides';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';
import React, { useState } from 'react';


type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module '@material-ui/core/styles/overrides' {
  export type ComponentNameToClassKey = overridesNameToClassKey
}

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: lightBlue.A200,
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        color: lightBlue.A700,
      },
      daySelected: {
        backgroundColor: lightBlue['400'],
      },
      dayDisabled: {
        color: lightBlue['100'],
      },
      current: {
        color: lightBlue['900'],
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: lightBlue['400'],
      },
    },
  },
});

interface props {
  date: Date;
  onChange: Dispatch<SetStateAction<Date>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ScrumDayPicker = ({ date, onChange, isOpen, setIsOpen }:props): JSX.Element => {
  //const [selectedDate, handleDateChange] = useState<Date>(new Date());
  

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={materialTheme}>
          <DatePicker
            value={date}
            onChange={onChange}
            open={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            variant="dialog"
            showTodayButton
            TextFieldComponent={() => <></>}
          ></DatePicker>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </div>
  );
};