import React, { useEffect, useState } from 'react';

import Footer from 'shared/layout/Footer/Footer';
import Loader from 'shared/layout/Loader/Loader';

import SnackbarSettings from './components/SnackbarSettings';
import ThemeSelect from './components/ThemeSelect';

const UserPreferences = (): JSX.Element => {
  const [loader, setLoader] = useState(true);
  
  useEffect(() => {
    document.title = 'User Preferences';
    setLoader(false);
  }, []);

  return (
    <>
      <div className="page userPref">
        {loader ? <Loader/> : null}
        <div className="userPref__header">
          <h1>{'AAAAAAAAAAAAAAAAAAA'}</h1>
        </div>
        
        <div className="userPref__section">
          <ThemeSelect />
          <SnackbarSettings />
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default React.memo(UserPreferences);