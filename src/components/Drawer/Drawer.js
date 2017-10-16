import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Menu from 'material-ui/svg-icons/navigation/menu'
import { Link, hashHistory, Router } from 'react-router-dom';

export default class DrawerUndockedExample extends React.Component {

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
        <IconButton
            tooltip="메뉴"
            onClick={this.handleToggle}>
            <Menu/>
        </IconButton>
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
      </MuiThemeProvider>
    );
  }
}