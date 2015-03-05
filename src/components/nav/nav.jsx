var _ = require('lodash');
var moment = require('moment');
var React = require('react');
var request = require('superagent')

var cdnUrl = 'http://d34i3ar4bnnqdn.cloudfront.net';
var marketingUrl = 'http://localhost:5000';
var apiUrl = 'http://localhost:5000';

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
    return {data: {loggedIn: null}};
  },
  componentDidMount: function() {
    request
      .get(apiUrl + '/api/ping')
      .withCredentials()
      .end((function(_this) {
        return function(err, response) {
          if (err) {
            _this.setState({data: {loggedIn: false}});
          } else {
            _this.setState({data: response.body});
          }
        };
      })(this));
  },
  render: function() {

    // This leaves a null value for the component if loggedIn is null so that
    // we have nothing rendered until the XHR request completes.
    var navRightComponent = null;
    if (this.state.data.loggedIn === true) {
      navRightComponent = <NavRightLoggedIn data={this.state.data} />;
    } else if (this.state.data.loggedIn === false) {
      navRightComponent = <NavRightLoggedOut />;
    }

    return (
      <div className="Nav--Right collapse navbar-collapse" id="MainNav">
        {navRightComponent}
      </div>
    );
  }
});

var NavRightLoggedIn = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <div className="Nav--Right--LoggedIn">
        <ul className="nav navbar-nav navbar-right">
          <NavMessageDropdown unreadMessages={data.user.unreadMessages}/>
          <NavUserDropdown isAdmin={data.isAdmin} profilePicture={data.user.profilePicture} />
        </ul>
      </div>
    );
  }
});

var NavMessageDropdown = React.createClass({
  render: function() {

    // Unread message count goes in a badge
    var badge = null;
    if (this.props.unreadMessages.length > 0) {
      badge = <span className="Badge">{this.props.unreadMessages.length}</span>
    };

    // Unread messages are listed in a dropbox with a link to all messages.
    var messageItems = this.props.unreadMessages.map(function (message) {
      return (
        <NavMessageItem message={message} />
      );
    });
    messageItems.push([(<li><a href="#">View All Messages</a></li>)]);

    return (
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
        <i className="fa fa-lg fa-envelope-o"></i>
        {badge}
        </a>
        <ul className="dropdown-menu" role="menu">
          {messageItems}
        </ul>
      </li>
    );
  }
});


var NavMessageItem = React.createClass({
  render: function() {
    var formattedDate = moment(this.props.message.sentDate).format('ll');
    return (
      <li>
        <a href={"/messages/" + this.props.message.senderId}>
          <div className="NavMessageItem">
            <div className="NavMessageItem--Header">
              {this.props.message.senderDisplayName}
              <div className="NavMessageItem--Date">{formattedDate}</div>
            </div>
            <div className="NavMessageItem--Body">
              <span className="fa-stack fa-lg">
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-quote-right fa-stack-1x fa-inverse"></i>
              </span>{' '}
              {this.props.message.body}
            </div>
          </div>
        </a>
      </li>
    );
  }
});

var NavUserDropdown = React.createClass({
  render: function() {

    var avatarUrl = this.props.profilePicture || 'https://res.cloudinary.com/wemeetup/image/upload/v1364306561/user_uwcrts.jpg';

    // This part seems rather silly. I would think it's possible to do a more
    // straightforward handlebars style {#if} sort of thing. Instead we build
    // up the list the hard way.
    var listItems = [
      (<li><a href="/dashboard">
        <i className="fa fa-fw fa-dashboard"></i> Dashboard
       </a></li>),
      (<li><a href="/my-profile">
        <i className="fa fa-fw fa-user"></i> My profile
       </a></li>),
      (<li><a href="/account-settings">
        <i className="fa fa-fw fa-gear"></i> Account settings
       </a></li>)
    ];
    if (this.props.isAdmin) {
      listItems.push([
        (<li className="divider"></li>),
        (<li><a href="/members">Members</a></li>),
        (<li><a href="/applications">Applications</a></li>),
        (<li><a href="/new-project">New project</a></li>),
        (<li><a href="/companies">Companies</a></li>),
        (<li><a href="/discount-codes">Discount codes</a></li>)
      ]);
    }
    listItems.push([
      (<li className="divider"></li>),
      (<li><a href="/logout">
        <i className="fa fa-fw fa-beer"></i> Sign out
      </a></li>)
    ]);

    return (
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
          <img className="Avatar" src={avatarUrl} />
        </a>
        <ul className="dropdown-menu" role="menu">
          {listItems}
        </ul>
      </li>
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
