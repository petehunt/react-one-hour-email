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
      <div className="pure-u id-nav">
          <a href="#nav" className="nav-menu-button">Menu</a>

          <div className="nav-inner">
              <a className="pure-button primary-button" href="#">Compose</a>

              <div className="pure-menu pure-menu-open">
                  <ul>
                      <li><a href="#" onClick={this.props.onFolderSelected.bind(null, 'inbox')}>Inbox <span className="email-count">({count})</span></a></li>
                      <li><a href="#" onClick={this.props.onFolderSelected.bind(null, 'important')}>Important</a></li>
                      <li><a href="#">Sent</a></li>
                      <li><a href="#">Drafts</a></li>
                      <li><a href="#">Trash</a></li>
                      <li className="pure-menu-heading">Labels</li>
                      <li><a href="#"><span className="email-label-personal"></span>Personal</a></li>
                      <li><a href="#"><span className="email-label-work"></span>Work</a></li>
                      <li><a href="#"><span className="email-label-travel"></span>Travel</a></li>
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
      <div className={classes}>
        <div className="pure-u">
          <img className="email-avatar" alt={this.props.name + '\'s avatar'} src={this.props.avatar} height="65" width="65"/>
        </div>

        <div className="pure-u-3-4">
          <h5 className="email-name">{this.props.name}</h5>
          <h4 className="email-subject">{this.props.subject}</h4>
          <p className="email-desc">
            {this.props.children}
          </p>
        </div>
      </div>
    );
  }
});

var List = React.createClass({
  render: function() {
    var parent = this;
    return (
      <div className="pure-u id-list">
          <div className="content">
      {this.props.emails.map(function(email, i) {
          return <EmailItem key={email.name}
              onClick={parent.props.onEmailSelected}
              avatar={email.avatar}
              selected={parent.props.selected === i}
              name={email.name}
              unread={email.unread && !parent.props.read[i]}
              subject={email.subject}>
            {email.desc}
          </EmailItem>;
        })}
          </div>
      </div>
    );
  }
});

var Main = React.createClass({
  render: function() {
    var email = {
        subject: "",
        name: "",
        timestamp: "",
        content: ""
    };
    if (this.props.emails.length > this.props.index && this.props.index > -1) {
        email = this.props.emails[this.props.index];
    }
    return (
      <div className="pure-u id-main">
          <div className="content">
              <div className="email-content pure-g">
                  <div className="email-content-header pure-g">
                      <div className="pure-u-1-2">
                          <h1 className="email-content-title">{email.subject}</h1>
                          <p className="email-content-subtitle">
                              From <a>{email.name}</a> at <span>{email.timestamp}</span>
                          </p>
                      </div>

                      <div className="pure-u-1-2 email-content-controls">
                          <a className="pure-button secondary-button">Reply</a>
                          <a className="pure-button secondary-button">Forward</a>
                          <a className="pure-button secondary-button">Move to</a>
                      </div>
                  </div>

                  <div className="email-content-body pure-u-1" dangerouslySetInnerHTML={{__html: email.content}} />
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
  handleEmailSelected: function(index) {
    var read = this.state.read;
    var folder = this.state.folder;
    var emails = this.state.emails;
    read[this.state.selected] = true;
    this.setState({selected: index, read: read, folder: folder, emails: emails});
  },
  handleFolderSelected: function(index) {
    var emails = [];
    this.setState({selected: 0, read: {}, folder: index, emails: emails });
    var parent = this;
    $.getJSON(index + '.json', function(pemails) {
      parent.setState({selected: 0, read: {}, folder: index, emails: pemails });
    });
  },
  render: function() {
    return (
      <div className="pure-g-r content id-layout">
        <Nav emails={this.state.emails} read={this.state.read} onFolderSelected={this.handleFolderSelected} />
        <List emails={this.state.emails} selected={this.state.selected} onEmailSelected={this.handleEmailSelected} read={this.state.read} />
        <Main emails={this.state.emails} index={this.state.selected} />
      </div>
    );
  }
});

$.getJSON('inbox.json', function(emails) {
  React.render(<App emails={emails} />, document.body);
});
