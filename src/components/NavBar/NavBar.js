import React from 'react';
import { Link, hashHistory, Router } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Menu from 'material-ui/svg-icons/navigation/menu'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'
import greenColor from '../../helpers/constants'

const NavBarStyle = {
  backgroundColor: 'white',
  display: 'flex'
}

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);
    console.log(props)
    console.log(props.history)
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  goHome = () =>  {
    console.log('push')
  }

  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          style={NavBarStyle}
        
          iconElementLeft={
            <IconButton
                tooltip="메뉴"
                onClick={this.handleToggle}
            >
              <Menu color={'#68a283'}/>
            </IconButton>
          }

          title={
            <TextField
              hintText="검색"
              style={{width:'100%'}}
              underlineFocusStyle={{borderBottomColor:'#68a283'}}
            />
          }
        >

        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem
            primaryText="홈"
            containerElement={<Link to='/'/>}
            onClick={this.handleClose}
          />
          <MenuItem
            primaryText="필터"
            containerElement={<Link to='/filter'/>}
            onClick={this.handleClose}
          />
          <MenuItem
            primaryText="아르카나 추가"
            containerElement={<Link to='/arcanaComposer'/>}
            onClick={this.handleClose}
          />
          <MenuItem
            primaryText="목록 업데이트"
            containerElement={<Link to='/updateArcanaRefs'/>}
            onClick={this.handleClose}
          />
        </Drawer>
        </AppBar>

      </MuiThemeProvider>
    );
  }
}