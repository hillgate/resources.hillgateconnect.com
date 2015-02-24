var React = require('react');

var Nav = require('../nav/nav.jsx');
var Article = require('../article/article.jsx');
var Footer = require('../footer/footer.jsx');

var PageWrapper = React.createClass({
  render: function() {
    return (
      <div className="PageWrapper">
        <Nav />
        <Article />
        <Footer />
      </div>
    );
  }
});

module.exports = PageWrapper;
