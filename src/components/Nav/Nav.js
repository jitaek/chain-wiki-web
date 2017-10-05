import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';

import styles from "./Nav.css"
export default class Nav extends React.Component {
    render() {    
      return (

        <ul className={styles.listWrapper}>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/filter">필터</Link>
          </li>
          <li>
            <Link to="/path3">어빌</Link>
          </li>
        </ul>

      );
    }
  }