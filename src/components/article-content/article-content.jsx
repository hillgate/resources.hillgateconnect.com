// var MarkdownFile = require('react-markdown-file');
var MarkdownFile = require('../markymark.jsx');
var React = require('react');

var ArticleContent = React.createClass({
  render: function() {
    return (
      <div className="ArticleContent entry-content">
        <MarkdownFile fileName='content/guides/sourcing-external-talent-for-a-project.md'/>
      </div>
    );
  }
});
module.exports = ArticleContent;
