var React = require('react');

var PageHeader = React.createClass({
  render: function() {
    return (
      <div className="PageHeader" id="page-header">
        <p className="PageHeader--Subtitle"><a href="/resources/">Resources</a> / <a href="/resources/guides/">Guides</a>
        </p>
        <h1 className="PageHeader--Title entry-title">Best Practices for Hiring World Class Independent Consultants</h1>
      </div>
    );
  }
});

module.exports = PageHeader;
