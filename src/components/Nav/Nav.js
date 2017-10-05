import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';

import styles from "./Nav.css"
export default class Nav extends React.Component {
    render() {    
      return (
        <nav className={styles.nav}>
          <div>
            {/* <Link to="/">
              <img src={logo} className={styles.logo} />
            </Link> */}

            {/* <div className="Nav__right"> */}
              <ul className={styles.listWrapper}>
                <li className="Nav__item">
                  <Link className="Nav__link" to="/">Link 1</Link>
                </li>
                <li className="Nav__item">
                  <Link className="Nav__link" to="/arcana">Link 2</Link>
                </li>
                <li className="Nav__item">
                  <Link className="Nav__link" to="/path3">Link 3</Link>
                </li>
              </ul>
            {/* </div> */}
          </div>
        </nav>
      );
    }
  }