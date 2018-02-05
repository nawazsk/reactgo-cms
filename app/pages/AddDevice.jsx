import React, { Component } from 'react';
import Page from '../pages/Page';
import AddDeviceContainer from '../containers/AddDevice';

class AddDevice extends Component {
    getMetaData() {
        return {
            title: this.pageTitle(),
            meta: this.pageMeta(),
            link: this.pageLink()
        };
    }

    pageTitle = () => {
        return 'Add Device';
    };

    pageMeta = () => {
        return [
            { name: 'Add Device', content: 'Add Devices' }
        ];
    };

    pageLink = () => {
        return [];
    };

    render() {
        return (
            <Page {...this.getMetaData()}>
                <AddDeviceContainer {...this.props} />
            </Page>
                
            
        )
    }
}

export default AddDevice;