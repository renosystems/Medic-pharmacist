import React from "react";

import {
  withLocalize,
  getLanguages,
  getActiveLanguage,
} from "react-localize-redux";
import globalTranslations from "./../translations/global.json";
import { renderToStaticMarkup } from "react-dom/server";
const MainLayout = (props) => {
  props.initialize({
    languages: [
      { name: "English", code: "en" },
      { name: "arabic", code: "ar" },
    ],
    translation: globalTranslations,
    options: { renderToStaticMarkup },
  });
  return <div>{props.children}</div>;
};

const mapStateToProps = (state) => ({
  languages: getLanguages(state.localize),
  aciveLanguage: getActiveLanguage(state.localize),
});
export default withLocalize(MainLayout);
