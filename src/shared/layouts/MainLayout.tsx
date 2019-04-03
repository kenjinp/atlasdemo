import * as React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'connected-react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  version,
  url as githubIssueURL,
  description,
} from '../../../package.json';

import './MainLayout.less';
import { RootState } from '../store/reducers';

const favicon = require('../../../assets/favicon.png');
const TITLE = 'Blue Brain Atlas';
const DESCRIPTION = description;

export interface MainLayoutProps {}

const MainLayout: React.FunctionComponent<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" type="image/x-icon" href={favicon} />
        <title>{TITLE}</title>
        <meta id="app-description" name="description" content={DESCRIPTION} />
        <meta name="twitter:card" content={DESCRIPTION} />
        <meta name="twitter:site" content="@bluebrainnexus" />
        <meta
          property="og:image"
          content="https://bluebrain.github.io/nexus/assets/img/logo.png"
        />
        <meta property="og:image:width" content="745" />
        <meta property="og:image:height" content="745" />
        <meta property="og:site_name" content="Nexus" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta name="theme-color" content="#00c9fd" />
      </Helmet>
      <Header />
      <div className="MainLayout_body">{children}</div>
      <div>
        <Footer version={version} githubIssueURL={githubIssueURL} />
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  goTo: (url: string) =>
    dispatch(push(url, { previousUrl: window.location.href })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayout);
