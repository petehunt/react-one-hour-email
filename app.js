/** @jsx React.DOM */

var Nav = React.createClass({
  render: function() {
    var count = 0;
    for (i = 0; i < this.props.emails.length; i++) {
      if (!this.props.read[i])
      {
        count++;
      }
    }
    return (
      <div class="pure-u id-nav">
          <a href="#nav" class="nav-menu-button">Menu</a>

          <div class="nav-inner">
              <a class="pure-button primary-button" href="#">Compose</a>

              <div class="pure-menu pure-menu-open">
                  <ul>
                      <li><a href="#" onClick={this.props.onFolderSelected.bind(this.props, 'inbox')}>Inbox <span class="email-count">({count})</span></a></li>
                      <li><a href="#" onClick={this.props.onFolderSelected.bind(this.props, 'important')}>Important</a></li>
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
    return this.transferPropsTo(
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
    var items = this.props.emails.map(function(email, i) {
      return (
        <EmailItem
            onClick={this.props.onEmailSelected.bind(this.props, i)}
            avatar={email.avatar}
            selected={this.props.selected === i}
            name={email.name}
            unread={email.unread && !this.props.read[i]}
            subject={email.subject}>
          {email.desc}
        </EmailItem>
      );
    }.bind(this));

    return (
      <div class="pure-u id-list">
          <div class="content">
             {items}
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
                          <h1 class="email-content-title">{this.props.email.subject}</h1>
                          <p class="email-content-subtitle">
                              From <a>{this.props.email.name}</a> at <span>{this.props.email.timestamp}</span>
                          </p>
                      </div>

                      <div class="pure-u-1-2 email-content-controls">
                          <a class="pure-button secondary-button">Reply</a>
                          <a class="pure-button secondary-button">Forward</a>
                          <a class="pure-button secondary-button">Move to</a>
                      </div>
                  </div>

                  <div class="email-content-body pure-u-1" dangerouslySetInnerHTML={{__html: this.props.email.content}} />
              </div>
          </div>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {selected: 0, read: {}, folder: "inbox", emails: this.props.emails };
  },
  handleEmailSelected: React.autoBind(function(index) {
    var read = this.state.read;
    var folder = this.state.folder;
    var emails = this.state.emails;
    read[this.state.selected] = true;
    this.setState({selected: index, read: read, folder: folder, emails: emails});
  }),
  handleFolderSelected: React.autoBind(function(index) {
    var emails = {};
    this.setState({selected: 0, read: {}, folder: index, emails: emails });
  }),
  render: function() {
    return (
      <div class="pure-g-r content id-layout">
        <Nav emails={this.props.emails} read={this.state.read} onFolderSelected={this.handleFolderSelected} />
        <List emails={this.props.emails} selected={this.state.selected} onEmailSelected={this.handleEmailSelected} read={this.state.read} />
        <Main email={this.props.emails[this.state.selected]} />
      </div>
    );
  }
});

$.getJSON('inbox.json', function(emails) {
  React.renderComponent(<App emails={emails} />, document.body);
});
