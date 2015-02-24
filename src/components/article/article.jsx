var React = require('react');

var PageHeader = require('../page-header/page-header.jsx');
var TableOfContents = require('../table-of-contents/table-of-contents.jsx');
var ArticleContent = require('../article-content/article-content.jsx');

var Article = React.createClass({
  render: function() {
    var tocData = [
      {anchor: "identify-your-needs", text: "Identify Your Needs"},
      {anchor: "define-a-project-brief", text: "Define a Project Brief"},
      {anchor: "define-your-ideal-candidate", text: "Define Your Ideal Candidate"},
      {anchor: "prepare-the-specifics", text: "Prepare the Specifics"},
      {anchor: "organize-the-paperwork", text: "Organize the Paperwork"}
    ];
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
