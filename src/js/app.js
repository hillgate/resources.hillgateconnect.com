var React = require('react');

var PageWrapper = require('../components/page-wrapper/page-wrapper.jsx');

window.React = React;

React.renderComponent(PageWrapper(), document.querySelector('body'));
