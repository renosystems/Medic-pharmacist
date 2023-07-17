import React, { Component } from 'react';
import {withLocalize, getLanguages, getActiveLanguage} from "react-localize-redux";
import globalTranslations from './../translations/global.json';
import {renderToStaticMarkup} from "react-dom/server";

 class ResponsiveLayout extends Component {
    constructor(props){
        super(props);
        this.props.initialize({
            languages:[
                {name:'English',code:'en'},
                {name:'arabic',code:'ar'}
            ],
            translation:globalTranslations,
            options:{renderToStaticMarkup}
        })
    }
    render() {
        return (
            <div className="main-color-bg rtl">
                {this.props.children}
            </div>
        )
    }
}
export default withLocalize(ResponsiveLayout)