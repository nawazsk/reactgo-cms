import React, { Component } from 'react';
import Page from '../pages/Page';
import AboutContainer from '../containers/About';

class About extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'About | Device Hub';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'A portal for booking devices.' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AboutContainer {...this.props} />
      </Page>
    );
  }
}

export default About;
