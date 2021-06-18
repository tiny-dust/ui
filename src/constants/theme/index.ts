import * as Colors from "../colors";
const defaultCSS = {
  "@global": {
    html: {
      boxSizing: "border-box",
      webkitTextSizeAdjust: "100%",
      wordBreak: "normal",
      mozTabSize: "4",
      tabSize: "4",
    },
    "*, ::before, ::after": {
      backgroundRepeat: "no-repeat",
      boxSizing: "inherit",
    },
    "::before, ::after": {
      textDecoration: "inherit",
      verticalAlign: "inherit",
    },
    "*": {
      padding: "0",
      margin: "0",
    },
    hr: {
      overflow: "visible",
      height: "0",
      color: "inherit",
    },
    "details, main": {
      display: "block",
    },
    summary: {
      display: "list-item",
    },
    small: {
      fontSize: "80%",
    },
    "[hidden]": {
      display: "none",
    },
    "abbr[title]": {
      borderBottom: "none",
      textDecoration: "underline dotted",
    },
    a: {
      backgroundColor: "transparent",
    },
    "a:active, a:hover": {
      outlineWidth: "0",
    },
    "code, kbd, pre, samp": {
      fontFamily: "monospace, monospace",
    },
    pre: {
      fontSize: "1em",
    },
    "b, strong": {
      fontWeight: "bolder",
    },
    "sub, sup": {
      fontSize: "75%",
      lineHeight: "0",
      position: "relative",
      verticalAlign: "baseline",
    },
    sub: {
      bottom: "-0.25em",
    },
    sup: {
      top: "-0.5em",
    },
    table: {
      borderColor: "inherit",
      textIndent: "0",
    },
    input: {
      borderRadius: "0",
    },
    "[disabled]": {
      cursor: "default",
    },
    "[type='number']::-webkit-inner-spin-button, [type='number']::-webkit-outer-spin-button": {
      height: "auto",
    },
    "[type='search']": {
      webkitAppearance: "textfield",
      outlineOffset: -2,
    },
    "[type='search']::-webkit-search-decoration": {
      webkitAppearance: "none",
    },
    textarea: {
      overflow: "auto",
      resize: "vertical",
    },
    "button, input, optgroup, select, textarea": {
      font: "inherit",
    },
    optgroup: {
      fontWeight: "bold",
    },
    button: {
      overflow: "visible",
    },
    "button, select": {
      textTransform: "none",
    },
    "button, [type='button'], [type='reset'], [type='submit'], [role='button']": {
      cursor: "pointer",
      color: "inherit",
    },
    "button::-moz-focus-inner, [type='button']::-moz-focus-inner, [type='reset']::-moz-focus-inner, [type='submit']::-moz-focus-inner": {
      borderStyle: "none",
      padding: "0",
    },
    "button:-moz-focusring, [type='button']::-moz-focus-inner, [type='reset']::-moz-focus-inner, [type='submit']::-moz-focus-inner": {
      outline: "1px dotted ButtonText",
    },
    "button, html [type='button'], [type='reset'], [type='submit']": {
      webkitAppearance: "button",
    },
    "button, input, select, textarea": {
      backgroundColor: "transparent",
      borderStyle: "none",
    },
    "a:focus, button:focus, input:focus, select:focus, textarea:focus": {
      outlineWidth: "0",
    },
    select: {
      mozAppearance: "none",
      webkitAppearance: "none",
    },
    "select::-ms-expand": {
      display: "none",
    },
    "select::-ms-value": {
      color: "currentColor",
    },
    legend: {
      border: "0",
      color: "inherit",
      display: "table",
      maxWidth: "100%",
      whiteSpace: "normal",
    },
    "::-webkit-file-upload-button": {
      webkitAppearance: "button",
      color: "inherit",
      font: "inherit",
    },
    img: {
      borderStyle: "none",
    },
    progress: {
      verticalAlign: "baseline",
    },
    "[aria-busy='true']": {
      cursor: "progress",
    },
    "[aria-controls]": {
      cursor: "pointer",
    },
    "[aria-disabled='true']": {
      cursor: "default",
    },
  },
}
const theme: Theme = {
  default: defaultCSS,
  colorPrimary: Colors.indigo[500],
  textColorPrimary: Colors.grey[500],
  textColorSecondary: Colors.grey[500],
  textColorHint: Colors.grey[500],
  overlay: {
    backgroundColor: "rgb(33, 33, 33)",
    borderColor: "rgb(33, 33, 33)",
  },
};
type Theme = {
  default: typeof defaultCSS;
  colorPrimary: string;
  textColorPrimary: string;
  textColorSecondary: string;
  textColorHint: string;
  overlay: {
    backgroundColor: string;
    borderColor: string;
  };
};
export { theme, Theme };