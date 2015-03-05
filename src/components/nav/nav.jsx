var _ = require('lodash');
var React = require('react');

var cdnUrl = 'http://d34i3ar4bnnqdn.cloudfront.net';
var marketingUrl = 'https://www.hillgateconnect.com';

var Nav = React.createClass({
  render: function() {
    return (
      <nav className="Nav navbar navbar-default navbar-fixed-top">
        <NavHeader />
        <NavRight />
      </nav>
    );
  }
});

var NavHeader = React.createClass({
  render: function() {
    return (
      <div className="Nav--Header navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#MainNav">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href={marketingUrl}>
          <img src={cdnUrl + "/img/hillgate-logo-black.png"} className="HeaderLogo" />
        </a>
      </div>
    );
  }
});

var NavRight = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: 'UNKNOWN'
    };
  },
  componentDidMount: function() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:5000/api/user',
      xhrFields: {
        withCredentials: true
      },
      success: (function(_this) {
        return function(response) {
          console.log('success!');
          console.log(response);
          return _this.setState({
            loggedIn: 'LOGGED_IN'
          });
        };
      })(this),
      error: (function(_this) {
        return function(error) {
          console.log('ERROR:', error);
          return _this.setState({
            loggedIn: 'LOGGED_OUT'
          });
        };
      })(this)
    });
  },
  render: function() {
    var componentMap = {
      UNKNOWN: null,
      'LOGGED_OUT': <NavRightLoggedOut />,
      'LOGGED_IN': <NavRightLoggedIn />
    }
    var navRightComponent = componentMap[this.state.loggedIn];
    return (
      <div className="Nav--Right collapse navbar-collapse" id="MainNav">
        {navRightComponent}
      </div>
    );
  }
});

var NavRightLoggedIn = React.createClass({
  render: function() {
    return (
      <div className="Nav--Right--LoggedIn">
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
            <i className="fa fa-lg fa-envelope-o"></i>
            </a>
            <ul className="dropdown-menu" role="menu">
              <li><a href="#">View All Messages</a></li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
              <img className="Avatar" src='http://www.gravatar.com/avatar/5de6f1cb6fd7ac5b94065f70a00b0cfc.png' />
            </a>
            <ul className="dropdown-menu" role="menu">
              <li><a href="/dashboard">
                <i className="fa fa-fw fa-dashboard"></i> Dashboard
              </a></li>
              <li><a href="/my-profile">
                <i className="fa fa-fw fa-user"></i> My profile
              </a></li>
              <li><a href="/account-settings">
                <i className="fa fa-fw fa-gear"></i> Account settings
              </a></li>
              <li className="divider"></li>
              <li><a href="/logout">
                <i className="fa fa-fw fa-beer"></i> Sign out
              </a></li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
});

var NavRightLoggedOut = React.createClass({
  render: function() {
    return (
      <div className="Nav--Right--LoggedOut">
        <form className="navbar-form navbar-right">
          <div className="form-group">
            <a href={marketingUrl + "/sign-up"} className="Button Nav--Button btn btn-default navbar-btn">
              Sign Up
            </a>
            <a href={marketingUrl + "/login"} className="Nav--Button btn btn-default navbar-btn">
              Log In
            </a>
          </div>
        </form>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href={marketingUrl + "/home#why-use-hillgate"}>
              Why use Hillgate
            </a>
          </li>
          <li>
            <a href={marketingUrl + "/home#how-does-hillgate-work"}>
              How it works
            </a>
          </li>
          <li>
            <a href={marketingUrl + "/home#our-consultants"}>
              Our consultants
            </a>
          </li>
          <li>
            <a href={marketingUrl + "/home#case-studies"}>
              Case studies
            </a>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = Nav;
