import React from 'react';

//import { updateAllDiscussionsDetails } from 'pages/DiscussionList/api-handlers/discussionList.handler';

const Footer = (): JSX.Element => {
  
  return (
    <footer className="footer">
      <div className="footer__content">
        <div 
          className="footer__block"
          // onClick={(): void => updateAllDiscussionsDetails()}
        >
          <p>make better decisions <br /> with Swarmcheck</p>
        </div>

        <div className="footer__block">
          <a href="http://swarmcheck.ai">about</a>
          <a href="https://assets.ctfassets.net/909vwq2m5bma/BDf0Hr0y9UViXfBSiWrKq/0426f7265c6968dbb53f6629e309c8c4/MJN_polityka_prywatnosci.pdf">privacy</a>
          <p>version {process.env.REACT_APP_BUILD_VERSION}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;