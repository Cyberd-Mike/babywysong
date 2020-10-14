// Base Modules
import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
// Layout & Style
import Layout from './Layouts/Default';
import theme from './Style/muiTheme';
import { ThemeProvider } from '@material-ui/core';
import './Style/Default.scss';

// Pages
import Router from './Router/Default';

Amplify.configure(awsconfig);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Router />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
