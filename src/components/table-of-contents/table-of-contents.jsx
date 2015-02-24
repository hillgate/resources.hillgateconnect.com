var _ = require('lodash');
var React = require('react');

function applyHackyScrollSpy () {
  var toc = $(".TableOfContents");
  var tocItems = toc.find("a");
  var scrollOffset = 80;

  function handleClick (e) {
    var href = $(this).attr("href");
    var offsetTop = href === "#" ? 0 : $(href).offset().top-scrollOffset+1;
    $('html, body').stop().animate({
      scrollTop: offsetTop
    }, 600, 'swing');
    e.preventDefault();
  }

  function handleScroll () {
    var lastId;
    var scrollItems = tocItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

    // Get container scroll position
    var fromTop = $(this).scrollTop() + scrollOffset;

    // Get current scroll item
    var cur = scrollItems.map(function(){
      if ($(this).offset().top < fromTop)
        return this;
    });
    if (cur && cur.length) {
      cur = cur[cur.length-1];
    } else {
      cur = scrollItems[0];
    }
    var id = cur.attr('id');

    // remember the id from the previous scroll
    if (lastId !== id) {
      lastId = id;
      tocItems
        .removeClass("is-active")
        .end()
        .find("[href=#"+id+"]")
        .addClass("is-active");
    }
  }

  tocItems.click(handleClick);
  $(window).scroll(handleScroll);
  tocItems
    .first()
    .addClass("is-active");
}

var TableOfContents = React.createClass({
  componentDidMount: function() {
    $('.stickystickstick').sticky({topSpacing: 100});
    applyHackyScrollSpy()
  },
  render: function() {
    var lineItems = this.props.data.map(function (item) {
      return (
        <li>
          <a href={"#" + item.anchor}>
            {item.text}
          </a>
        </li>
      );
    });
    return (
      <div className="TableOfContents stickystickstick">
        <p className="TableOfContents--label">Table of Contents</p>
        <ul className="uk-nav uk-nav-side" data-uk-scrollspy-nav="{closest:'a', smoothscroll:true, cls:'is-active', topoffset:70}">
          {lineItems}
        </ul>
      </div>
    );
  }
});


module.exports = TableOfContents;
