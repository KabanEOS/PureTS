import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import { GlobalTheme } from 'models/graph/theme.model';
import { RootState } from 'redux/models/root.state';
import { loaderStyles } from 'shared/mui/loaderStyles';

import colors from 'scss/base/_colors.scss';

const Loader = (): JSX.Element => {
  const userTheme = useSelector((state: RootState) => state.user?.preferredSettings.theme);
  const currentTheme = userTheme ? userTheme as GlobalTheme : GlobalTheme.Regular;
  const classes = loaderStyles({ color: colors.argumentAgree });

  return (
    <div className={`theme--${currentTheme}`}>
      <div className="backdrop backdrop--loader">
        <CircularProgress 
          size={80} 
          className={`${classes.loader} loader`} 
          disableShrink
        />
      </div>
    </div>
  );
};

export default Loader;