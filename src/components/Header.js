import React, {Component} from 'react';
import { Link } from 'react-router-dom';

const LoggedOutView = () => (
  <ul className="nav navbar-nav pull-xs-right">

    <li className="nav-item">
      <Link to="/" className="nav-link">
        Home
      </Link>
    </li>

    <li className="nav-item">
      <Link to="/login" className="nav-link">
        Sign in
      </Link>
    </li>

    <li className="nav-item">
      <Link to="/register" className="nav-link">
        Sign up
      </Link>
    </li>

  </ul>
);

const LoggedInView = ({currentUser}) =>  (
  <ul className="nav navbar-nav pull-xs-right">

    <li className="nav-item">
      <Link to="/" className="nav-link">
        Home
      </Link>
    </li>

    <li className="nav-item">
      <Link to="/editor" className="nav-link">
        <i className="ion-compose"></i>&nbsp;New Post
      </Link>
    </li>

    <li className="nav-item">
      <Link to="/settings" className="nav-link">
        <i className="ion-gear-a"></i>&nbsp;Settings
      </Link>
    </li>

    <li className="nav-item">
      <Link
        to={`/@${currentUser.username}`}
        className="nav-link">
        <img src={currentUser.image} className="user-pic" alt={currentUser.username} />
        {currentUser.username}
      </Link>
    </li>

  </ul>
);

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">

          <Link to="/" className="navbar-brand">
            {this.props.appName.toLowerCase()}
          </Link>
          {this.props.currentUser
            ? <LoggedInView currentUser={this.props.currentUser} />
            : <LoggedOutView />}
        </div>
      </nav>
    );
  }
}

export default Header;
