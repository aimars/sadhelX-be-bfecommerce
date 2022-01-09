import React, { Component } from 'react'
import { WebView } from 'react-native-webview'

export class Midtrans extends Component {

    render() {
        return (
            <WebView source={{uri: this.props.route.params.url}}/>
        )
    }
}

export default Midtrans
