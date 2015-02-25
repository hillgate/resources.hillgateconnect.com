var React = require('react');

var PageHeader = require('../page-header/page-header.jsx');
var TableOfContents = require('../table-of-contents/table-of-contents.jsx');
var ArticleContent = require('../article-content/article-content.jsx');

var Article = React.createClass({
  render: function() {
    var articleTitle = 'Sourcing External Talent for a Project';
    var tocData = [
      {anchor: "identify-and-communicate-the-need", text: "Identify and communicate the need"},
      {anchor: "define-the-candidate-criteria", text: "Define the candidate criteria"},
      {anchor: "find-candidates", text: "Find candidates"},
      {anchor: "prepare-the-other-stuff-", text: "Prepare the \"other stuff\""},
      {anchor: "organize-the-paperwork", text: "Organize the paperwork"}
    ];
    return (
      <article className="hentry">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-md-offset-3">
              <PageHeader title={articleTitle}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <TableOfContents data={tocData}/>
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
