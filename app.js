/** @jsx React.DOM */

var SAMPLE_DATA = [
  {"unread": false, "selected": true, "desc": "Hey, I just wanted to check in with you from Toronto. I got here earlier today.", "name": "Tilo Mitra", "avatar": "http://api.twitter.com/1/users/profile_image?screen_name=tilomitra&amp;size=bigger", "subject": "Hello from Toronto"},
  {"unread": true, "selected": false, "desc": "Hey, I had some feedback for pull request #51. We should center the menu so it looks better on mobile.", "name": "Eric Ferraiuolo", "avatar": "http://api.twitter.com/1/users/profile_image?screen_name=yuilibrary&amp;size=bigger", "subject": "Re: Pull Requests"},
  {"unread": true, "selected": false, "desc": "Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla.", "name": "YUI Library", "avatar": "http://api.twitter.com/1/users/profile_image?screen_name=reid&amp;size=bigger", "subject": "You have 5 bugs assigned to you"},
  {"unread": false, "selected": false, "desc": "Excepteur sint occaecat cupidatat non proident, sunt in culpa.", "name": "Reid Burke", "avatar": "http://api.twitter.com/1/users/profile_image?screen_name=triptych&amp;size=bigger", "subject": "Re: Design Language"},
  {"unread": false, "selected": false, "desc": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.", "name": "Andrew Wooldridge", "avatar": "http://api.twitter.com/1/users/profile_image?screen_name=yahoofinance&amp;size=bigger", "subject": "YUI Blog Updates?"},
  {"unread": false, "selected": false, "desc": "Mauris tempor mi vitae sem aliquet pharetra. Fusce in dui purus, nec malesuada mauris.", "name": "Yahoo! Finance", "avatar": "http://api.twitter.com/1/users/profile_image?screen_name=yahoonews&amp;size=bigger", "subject": "How to protect your finances from winter storms"}
];

var Nav = React.createClass({
  render: function() {
    return (
      <div class="pure-u id-nav">
          <a href="#nav" class="nav-menu-button">Menu</a>

          <div class="nav-inner">
              <a class="pure-button primary-button" href="#">Compose</a>

              <div class="pure-menu pure-menu-open">
                  <ul>
                      <li><a href="#">Inbox <span class="email-count">(2)</span></a></li>
                      <li><a href="#">Important</a></li>
                      <li><a href="#">Sent</a></li>
                      <li><a href="#">Drafts</a></li>
                      <li><a href="#">Trash</a></li>
                      <li class="pure-menu-heading">Labels</li>
                      <li><a href="#"><span class="email-label-personal"></span>Personal</a></li>
                      <li><a href="#"><span class="email-label-work"></span>Work</a></li>
                      <li><a href="#"><span class="email-label-travel"></span>Travel</a></li>
                  </ul>
              </div>
          </div>
      </div>
    );
  }
});

var EmailItem = React.createClass({
  render: function() {
    var classes = 'email-item pure-g';
    if (this.props.selected) {
      classes += ' email-item-selected';
    }
    if (this.props.unread) {
      classes += ' email-item-unread';
    }
    return (
      <div class={classes}>
        <div class="pure-u">
          <img class="email-avatar" alt={this.props.name + '\'s avatar'} src={this.props.avatar} height="65" width="65"/>
        </div>

        <div class="pure-u-3-4">
          <h5 class="email-name">{this.props.name}</h5>
          <h4 class="email-subject">{this.props.subject}</h4>
          <p class="email-desc">
            {this.props.children}
          </p>
        </div>
      </div>
    );
  }
});

var List = React.createClass({
  render: function() {
    return (
      <div class="pure-u id-list">
          <div class="content">
              <EmailItem
                  avatar="http://api.twitter.com/1/users/profile_image?screen_name=tilomitra&amp;size=bigger"
                  selected={true}
                  name="Tilo Mitra"
                  subject="Hello from Toronto">
                Hey, I just wanted to check in with you from Toronto. I got here earlier today.
              </EmailItem>
              <div class="email-item email-item-unread pure-g">
                  <div class="pure-u">
                      <img class="email-avatar" alt="Eric Ferraiuolo's avatar" src="http://api.twitter.com/1/users/profile_image?screen_name=ericf&amp;size=bigger" height="65" width="65"/>
                  </div>

                  <div class="pure-u-3-4">
                      <h5 class="email-name">Eric Ferraiuolo</h5>
                      <h4 class="email-subject">Re: Pull Requests</h4>
                      <p class="email-desc">
                          Hey, I had some feedback for pull request #51. We should center the menu so it looks better on mobile.
                      </p>
                  </div>
              </div>

              <div class="email-item email-item-unread pure-g">
                  <div class="pure-u">
                      <img class="email-avatar" alt="YUI's avatar" src="http://api.twitter.com/1/users/profile_image?screen_name=yuilibrary&amp;size=bigger" height="65" width="65"/>
                  </div>

                  <div class="pure-u-3-4">
                      <h5 class="email-name">YUI Library</h5>
                      <h4 class="email-subject">You have 5 bugs assigned to you</h4>
                      <p class="email-desc">
                          Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla.
                      </p>
                  </div>
              </div>

              <div class="email-item pure-g">
                  <div class="pure-u">
                      <img class="email-avatar" alt="Reid Burke's avatar" src="http://api.twitter.com/1/users/profile_image?screen_name=reid&amp;size=bigger" height="65" width="65"/>
                  </div>

                  <div class="pure-u-3-4">
                      <h5 class="email-name">Reid Burke</h5>
                      <h4 class="email-subject">Re: Design Language</h4>
                      <p class="email-desc">
                          Excepteur sint occaecat cupidatat non proident, sunt in culpa.
                      </p>
                  </div>
              </div>

              <div class="email-item pure-g">
                  <div class="pure-u">
                      <img class="email-avatar" alt="Andrew Wooldridge's avatar" src="http://api.twitter.com/1/users/profile_image?screen_name=triptych&amp;size=bigger" height="65" width="65"/>
                  </div>

                  <div class="pure-u-3-4">
                      <h5 class="email-name">Andrew Wooldridge</h5>
                      <h4 class="email-subject">YUI Blog Updates?</h4>
                      <p class="email-desc">
                          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                      </p>
                  </div>
              </div>

              <div class="email-item pure-g">
                  <div class="pure-u">
                      <img class="email-avatar" alt="Yahoo! Finance's Avatar" src="http://api.twitter.com/1/users/profile_image?screen_name=yahoofinance&amp;size=bigger" height="65" width="65"/>
                  </div>

                  <div class="pure-u-3-4">
                      <h5 class="email-name">Yahoo! Finance</h5>
                      <h4 class="email-subject">How to protect your finances from winter storms</h4>
                      <p class="email-desc">
                          Mauris tempor mi vitae sem aliquet pharetra. Fusce in dui purus, nec malesuada mauris.
                      </p>
                  </div>
              </div>

              <div class="email-item pure-g">
                  <div class="pure-u">
                      <img class="email-avatar" alt="Yahoo! News' avatar" src="http://api.twitter.com/1/users/profile_image?screen_name=yahoonews&amp;size=bigger" height="65" width="65"/>
                  </div>

                  <div class="pure-u-3-4">
                      <h5 class="email-name">Yahoo! News</h5>
                      <h4 class="email-subject">Summary for April 3rd, 2012</h4>
                      <p class="email-desc">
                          We found 10 news articles that you may like.
                      </p>
                  </div>
              </div>
          </div>
      </div>
    );
  }
});

var Main = React.createClass({
  render: function() {
    return (
      <div class="pure-u id-main">
          <div class="content">
              <div class="email-content pure-g">
                  <div class="email-content-header pure-g">
                      <div class="pure-u-1-2">
                          <h1 class="email-content-title">Hello from Toronto</h1>
                          <p class="email-content-subtitle">
                              From <a>Tilo Mitra</a> at <span>3:56pm, April 3, 2012</span>
                          </p>
                      </div>

                      <div class="pure-u-1-2 email-content-controls">
                          <a class="pure-button secondary-button">Reply</a>
                          <a class="pure-button secondary-button">Forward</a>
                          <a class="pure-button secondary-button">Move to</a>
                      </div>
                  </div>

                  <div class="email-content-body pure-u-1">
                      <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <p>
                          Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                      <p>
                          Aliquam ac feugiat dolor. Proin mattis massa sit amet enim iaculis tincidunt. Mauris tempor mi vitae sem aliquet pharetra. Fusce in dui purus, nec malesuada mauris. Curabitur ornare arcu quis mi blandit laoreet. Vivamus imperdiet fermentum mauris, ac posuere urna tempor at. Duis pellentesque justo ac sapien aliquet egestas. Morbi enim mi, porta eget ullamcorper at, pharetra id lorem.
                      </p>
                      <p>
                          Donec sagittis dolor ut quam pharetra pretium varius in nibh. Suspendisse potenti. Donec imperdiet, velit vel adipiscing bibendum, leo eros tristique augue, eu rutrum lacus sapien vel quam. Nam orci arcu, luctus quis vestibulum ut, ullamcorper ut enim. Morbi semper erat quis orci aliquet condimentum. Nam interdum mauris sed massa dignissim rhoncus.
                      </p>
                      <p>
                          Regards,<br/>
                          Tilo
                      </p>
                  </div>
              </div>
          </div>
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div class="pure-g-r content id-layout">
        <Nav />
        <List />
        <Main />
      </div>
    );
  }
});

React.renderComponent(<App />, document.body);