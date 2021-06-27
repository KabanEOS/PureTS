import { ButtonBase, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import React from 'react';

interface props {
  date: Date;
  onClick: () => void;
  onClickLeft?: () => void;
  onClickRight?: () => void;
}

const HeaderDayDisplay = ({ date, onClick, onClickLeft, onClickRight }: props): JSX.Element => {
  return (
    <Paper
      style={{
        background: 'linear-gradient(45deg, #363537 10%, #39FFCB 90%)',
        paddingBottom: '1rem',
        paddingTop: '1rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start'
      }}
      elevation={3}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {/* <div> */}
        <ButtonBase
          component={Typography}
          variant="h5"
          style={{ color: 'white', opacity: 0.5, padding: '0rem 0.3rem', borderRadius: '5px' }}
          onClick={onClick}
        >
          {date?.getFullYear()}
        </ButtonBase>
        <ButtonBase
          component={Typography}
          variant="h4"
          style={{ color: 'white', padding: '0rem 0.3rem 0.5rem 0.3rem', borderRadius: '5px' }}
          gutterBottom
          onClick={onClick}
        >
          {date ? format(date, 'eeee, d MMMM', { locale: pl }) : ''}
        </ButtonBase>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <IconButton aria-label="previous day" style={{ backgroundColor: 'white', opacity: 0.9, marginRight: '0.5rem' }}>
          <KeyboardArrowLeftIcon fontSize="large"/>
        </IconButton>
        <IconButton aria-label="next day" style={{ backgroundColor: 'white', opacity: 0.9 }}>
          <KeyboardArrowRightIcon fontSize="large"/>
        </IconButton> */}
        <IconButton onClick={onClickLeft} aria-label="previous day" style={{ color: 'white', opacity: 0.9, marginRight: '0.5rem' }}>
          <KeyboardArrowLeftIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={onClickRight} aria-label="next day" style={{ color: 'white', opacity: 0.9 }}>
          <KeyboardArrowRightIcon fontSize="large" />
        </IconButton>
      </div>
    </Paper>
  );
};

export default HeaderDayDisplay;
