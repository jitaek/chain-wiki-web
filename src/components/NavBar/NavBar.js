import React from 'react'
import { Link, withRouter } from "react-router-dom"
import { ref } from '../../helpers/constants'
import { isAuthenticated } from '../../helpers/auth'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import AppBar from 'material-ui/AppBar'
import logo from '../../logo.png'
import AutoComplete from 'material-ui/AutoComplete'
import Menu from 'material-ui/svg-icons/navigation/menu'

const NavBarStyle = {
  backgroundColor: 'white',
  display: 'flex'
}

const nameRef = ref.child('name')

class NavBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      nameArray: [],
    }

  }

  componentWillUnmount() {
    nameRef.off()
  }

  observeNames() {

    console.log('observing names')

    nameRef.on('value', snapshot => {

      var array = []
      
      snapshot.forEach(child => {

        let arcanaID = child.key
        let nameKR = child.val()

        let arcana = {
          text: nameKR,          
          value: arcanaID,          
        }
        array.push(arcana)

      })

      sessionStorage.setItem('nameArray', JSON.stringify(array))
      console.log(array.length)
      this.setState({
        nameArray: array,
      })

    })
  }

  showArcana(string, index) {

    if (index > 0 && index < this.state.nameArray.length) {
      let arcanaID = this.state.nameArray[index].value
      this.props.history.push({
        pathname: '../arcana',
        search: '?arcana=' + arcanaID
      });
    }
    else if (index === -1) {
      console.log(`user pressed enter and searched for ${string}`)
      var searchText = string
      // searchText = encodeURIComponent(searchText)
      this.props.history.push({
        pathname: '../search',
        search: '?search=' + searchText,
        state: { nameArray: this.state.nameArray }
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
      <div>
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
              onClick={this.handleToggle}
            >
              <Menu color={'#68a283'}/>
            </IconButton>
          }
          // title={
          //   <Link to="/" 
          //     onClick={this.handleToggle}
          //     style={{fontSize:'13px',textDecoration: 'none'}}
          //   ><span><img src={logo} style={{width:'40px', paddingTop:'12px'}}/></span></Link>
          // }

          ></AppBar>
          <MenuItem
            primaryText="아르카나"
            containerElement={<Link to='/'/>}
            onClick={this.handleClose}
          />
          <MenuItem
            primaryText="필터"
            containerElement={<Link to='/filter'/>}
            onClick={this.handleClose}
          />
          <MenuItem
            primaryText="어빌리티"
            containerElement={<Link to='/abilityList'/>}
            onClick={this.handleClose}
          />
          <MenuItem
            primaryText="주점"
            containerElement={<Link to='/tavernList'/>}
            onClick={this.handleClose}
          />
          <MenuItem
            primaryText="아르카나 추가"
            containerElement={<Link to='/arcanaComposer'/>}
            onClick={this.handleClose}
          />
          <MenuItem
            primaryText="목록 업데이트 (베타)"
            containerElement={<Link to='/updateArcanaRefs'/>}
            onClick={this.handleClose}
          />
          <MenuItem
            primaryText={this.props.auth ? '계정' : '로그인'}
            containerElement={this.props.auth ? <Link to='/account'/> : <Link to ='/login'/>}
            onClick={this.handleClose}
          />
        </Drawer>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(NavBar)