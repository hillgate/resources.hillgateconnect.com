var React = require('react');

var TableOfContents = React.createClass({
  componentDidMount: function() {
    $('.stickystickstick').sticky({topSpacing: 100});
  },
  render: function() {
    return (
      <div className="TableOfContents stickystickstick">
        <p className="TableOfContents--label">Table of Contents</p>
        <ul className="uk-nav uk-nav-side" data-uk-scrollspy-nav="{closest:'a', smoothscroll:true, cls:'is-active', topoffset:70}">
          <li>
            <a href="#identify-your-needs" className="is-active">
            Identify Your Needs
          </a>
          </li>
          <li>
            <a href="#define-a-project-brief" className="">
            Define a Project Brief
          </a>
          </li>
          <li>
            <a href="#define-your-ideal-candidate" className="">
            Define Your Ideal Candidate
          </a>
          </li>
          <li>
            <a href="#prepare-the-specifics" className="">
            Prepare the Specifics
          </a>
          </li>
          <li>
            <a href="#organize-the-paperwork" className="">
            Organize the Paperwork
          </a>
          </li>
        </ul>
      </div>
    );
  }
});


module.exports = TableOfContents;
