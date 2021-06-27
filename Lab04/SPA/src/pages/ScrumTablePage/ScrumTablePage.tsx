import { Paper } from '@material-ui/core';
import React, { useState } from 'react';
import '../../scss/_App.scss';

import ScrumAddModal from './components/ScrumAddModal/ScrumAddModal';
import HeaderDayDisplay from './components/ScrumDayPicker/HeaderDayDisplay';
import { ScrumDayPicker } from './components/ScrumDayPicker/ScrumDayPicker';
import { ScrumTable } from './components/ScrumTable/ScrumTable';

const ScrumTablePage = (): JSX.Element => {
  const [date, setDate] = useState<Date>(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
  const handleDateDayAdd = (daysToAdd: number): void => {
    const newDate = new Date(date ? date.toDateString() : '');
    newDate.setDate(newDate.getDate() + daysToAdd);
    setDate(newDate);
  };

  const [addScrumModalOpen, setAddScrumModalOpen] = useState(false);

  const handleaddScrumModalClose = () => {
    setAddScrumModalOpen(false);
  };
  const handleaddScrumModalOpen = () => {
    setAddScrumModalOpen(true);
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <ScrumDayPicker date={date} onChange={setDate} isOpen={isDatePickerOpen} setIsOpen={setIsDatePickerOpen} />
        <Paper className="table-container">
          <HeaderDayDisplay
            date={date}
            onClick={() => setIsDatePickerOpen(true)}
            onClickLeft={() => handleDateDayAdd(-1)}
            onClickRight={() => handleDateDayAdd(1)}
          />
          <ScrumTable
            date={date}
            addHandler={handleaddScrumModalOpen}
          />
        </Paper>
        <ScrumAddModal open={addScrumModalOpen} onClose={handleaddScrumModalClose}/>
      </div>
    </>
  );
};

export default ScrumTablePage;