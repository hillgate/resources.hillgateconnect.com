var React = require('react');

var Footer = React.createClass({
  render: function() {
    return (
      <footer className="Footer">
        <a href="http://www.hillgateconnect.com">
          <img src="http://d34i3ar4bnnqdn.cloudfront.net/img/hillgate-logo-black.png" className="FooterLogo center-block" />
        </a>
        <div className="source-org vcard copyright">
          <p className="text-center FooterNotes">
            ©2013-2015 All Rights Reserved. Hillgate® is a registered trademark
            of Project Hillgate Ltd.
            <a href="https://www.hillgateconnect.com/privacy">{ }
              Privacy and Terms
            </a>
          </p>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;
