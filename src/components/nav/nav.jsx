var React = require('react');

var Nav = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">
              <img src="http://d34i3ar4bnnqdn.cloudfront.net/img/hillgate-logo-black.png" className="HeaderLogo" />
            </a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <form className="navbar-form navbar-right">
              <div className="form-group">
                <button type="submit" className="btn btn-default navbar-btn">Sign Up</button>
                <button type="submit" className="btn btn-default navbar-btn">Log In</button>
              </div>
            </form>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Why use Hillgate</a>
              </li>
              <li><a href="#">How it works</a>
              </li>
              <li><a href="#">Our consultants</a>
              </li>
              <li><a href="#">Case studies</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Nav;
