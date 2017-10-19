import React from 'react';
import { HashRouter, Link, withRouter } from "react-router-dom";
import { ref } from '../../helpers/constants'
import { history } from '../../App'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Menu from 'material-ui/svg-icons/navigation/menu'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'
import greenColor from '../../helpers/constants'
import logo from '../../logo.png';
import AutoComplete from 'material-ui/AutoComplete';

const NavBarStyle = {
  backgroundColor: 'white',
  display: 'flex'
}

const nameRef = ref.child('name')

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      nameArray: [],
    };
  }

  componentWillUnmount() {
    nameRef.off()
  }

  observeNames() {

    console.log('observing names')

    nameRef.on('value', snapshot => {

      var array = [];
      
      snapshot.forEach(child => {

        let arcanaID = child.key
        let nameKR = child.val()

        let arcana = {
          text: nameKR,          
          value: arcanaID,          
        }
        array.push(arcana)

      })

      this.setState({
        nameArray: array,
      })

    })
  }

  showArcana(string, index) {
    
    if (index > 0) {
      let arcanaID = this.state.nameArray[index].value
      history.push({
        pathname: '../Arcana',
        search: '?arcana=' + arcanaID
      });
    }
    
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
            <AutoComplete
              hintText="이름 검색"
              fullWidth={true}
              underlineFocusStyle={{borderBottomColor:'#68a283'}}

              filter={AutoComplete.fuzzyFilter}
              dataSource={this.state.nameArray}
              maxSearchResults={5}

              onClick={this.observeNames.bind(this)}
              onNewRequest={this.showArcana.bind(this)}
            />
          }
        >

        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >

        <AppBar
          style={NavBarStyle}
          iconElementLeft={
            <IconButton
              tooltip="홈"
              onClick={this.handleToggle}
            >
              <Menu color={'#68a283'}/>
            </IconButton>
          }

          title={
            <Link to="/" 
              onClick={this.handleToggle}
              style={{fontSize:'13px',textDecoration: 'none'}}
            ><span><img src={logo} style={{width:'40px', paddingTop:'12px'}}/>아르카나</span></Link>
          }

          ></AppBar>
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