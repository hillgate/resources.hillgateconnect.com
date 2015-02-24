var React = require('react');

var PageHeader = React.createClass({
  render: function() {
    return (
      <div className="PageHeader" id="page-header">
        <p className="PageHeader--Subtitle">
          <a href="#">Resources</a>
          {' '}/{' '} 
          <a href="#">Guides</a>
        </p>
        <h1 className="PageHeader--Title entry-title">
          {this.props.title}
        </h1>
      </div>
    );
  }
});

module.exports = PageHeader;
