var React = require('react');

var PageHeader = require('../page-header/page-header.jsx');
var TableOfContents = require('../table-of-contents/table-of-contents.jsx');
var ArticleContent = require('../article-content/article-content.jsx');

var Article = React.createClass({
  render: function() {
    return (
      <article className="hentry">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-md-offset-3">
              <PageHeader />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <TableOfContents />
            </div>
            <div className="col-md-8">
              <ArticleContent />
            </div>
          </div>
        </div>
      </article>
    );
  }
});

module.exports = Article;
