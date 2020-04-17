import React from 'react'
import PropTypes from 'prop-types'

import './Header.scss'

import {
  HOME_URL, LOGIN_URL, SIGNIN_URL,
  DASHBOARD_URL, DASHBOARD_NAME,
  ACCOUNT_URL, ACCOUNT_NAME
} from '../../config/routes'

import {
  Alignment, Button,
  Menu, MenuItem, MenuDivider,
  Navbar, NavbarGroup, NavbarHeading,
  Popover, Position
} from '@blueprintjs/core'
import { Link } from 'react-router-dom'

import { debugLog } from '../../lib/logs'
import { connect } from 'react-redux'
import { authenticationOff } from '../../redux/actions/authentication'
import { isAuthorized } from '../../redux/selectors/authentication'

const mapStateToProps = state => {
  return {
    authentication: {
      isAuthorized: isAuthorized(state)
    }
  }
}

/**
 * Header class
 */
class Header extends React.Component {
    /**
     * Logout
     */
    logout = () => {
      debugLog('Header::logout')
      this.props.authenticationOff()
    }

    render() {
      debugLog('Header::render')
      const isAuthorized = this.props.authentication.isAuthorized

      let authorizedContent
      if (isAuthorized) {
        const loginMenu =
                <Menu className="no-text-decoration">
                  <Link to={DASHBOARD_URL}>
                    <MenuItem
                      className="bp3-text-large"
                      tagName="span"
                      icon="dashboard"
                      text={DASHBOARD_NAME}/>
                  </Link>
                  <Link to={ACCOUNT_URL}>
                    <MenuItem
                      className="bp3-text-large"
                      tagName="span"
                      icon="settings"
                      text={ACCOUNT_NAME}/>
                  </Link>
                  <MenuDivider/>
                  <Link to={HOME_URL}>
                    <MenuItem
                      className="bp3-text-large"
                      tagName="span"
                      icon="log-out"
                      text="Disconnect"
                      onClick={this.logout}/>
                  </Link>
                </Menu>

        authorizedContent =
                <NavbarGroup align={Alignment.RIGHT}>
                  <Popover content={loginMenu} position={Position.BOTTOM}>
                    <Button large="true" minimal="true" icon="user" text="My Profile"/>
                  </Popover>
                </NavbarGroup>
      } else {
        authorizedContent =
                <NavbarGroup className="no-text-decoration" align={Alignment.RIGHT}>
                  <Link to={SIGNIN_URL}><Button large="true" minimal="true" icon="plus"
                    text="Sign in"/></Link>
                  <Link to={LOGIN_URL}><Button large="true" minimal="true" icon="log-in" text="Login"/></Link>
                </NavbarGroup>
      }

      return (
        <Navbar>
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading className="no-text-decoration"><Link to={HOME_URL}>Peepoctogone</Link></NavbarHeading>
          </NavbarGroup>
          {authorizedContent}
        </Navbar>
      )
    }
}

Header.propTypes = {
  authentication: PropTypes.object.isRequired,
  authenticationOff: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  {
    authenticationOff
  }
)(Header)
