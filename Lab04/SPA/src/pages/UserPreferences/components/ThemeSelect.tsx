import { Grid, MenuItem, TextField } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { GlobalTheme } from 'models/graph/theme.model';
import { RootState } from 'redux/models/root.state';

import { switchUserTheme } from '../actions/user.actions';

const ThemeSelect = (): JSX.Element => {
  const userTheme = useSelector((state: RootState) => state.user?.preferredSettings.theme);
  const [currentTheme, setCurrentTheme] = useState<string>(userTheme ? userTheme : GlobalTheme.Regular);

  const handleThemeChange = (theme: GlobalTheme): void => {
    switchUserTheme(theme);
  };
  useEffect(() => {
    if (userTheme) setCurrentTheme(userTheme);
  }, [userTheme]);

  const themeOptions = useMemo(() =>
    Object.values(GlobalTheme).map((item: string) => {
      return (
        <MenuItem key={item} value={item}>{item[0].toUpperCase() + item.slice(1)}</MenuItem>
      );
    }), []);

  return (
    <Grid container spacing={2}>
      <Grid item sm={6} xs={12} className="userPref__section__field">
        {'BBBBB'}
      </Grid>
      <Grid item sm={5} xs={12}>
        <TextField  
          size="small" 
          select
          variant="outlined"
          className={'field__input'} 
          label={'BBBBB'}
          onChange={
            (
              e: React.ChangeEvent<HTMLInputElement>
            ): void => handleThemeChange(e.target.value as GlobalTheme)
          }
          value={currentTheme}
          margin="normal"
          helperText={''}
          SelectProps={{
            MenuProps: { disableScrollLock: true }
          }}
          data-cy={'user__preferences__language__select'}
        >
          {themeOptions}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default ThemeSelect;