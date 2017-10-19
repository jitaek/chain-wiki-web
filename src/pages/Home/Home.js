import React, { Component } from 'react';
import logo from '../../logo.png';
import styles from './Home.css';
import firebase from 'firebase';
import {ref} from '../../helpers/constants'
import ArcanaCell from '../../components/ArcanaCell/ArcanaCell';
import ArcanaGridCell from '../../components/ArcanaGridCell/ArcanaGridCell'
import { HashRouter, Link, withRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import FadeIn from 'react-fade-in'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import List from 'material-ui/svg-icons/action/list'

let arcanaRef = ref.child('arcana')

const arcanaArray = [
  {
    uid: '1',
    nameKR: '무지카',
  },
  {
    uid: '1',
    nameKR: '무지카',
  },
  {
    uid: '1',
    nameKR: '무지카',
  },
  {
    uid: '1',
    nameKR: '무지카',
  },
  {
    uid: '1',
    nameKR: '무지카',
  },
  {
    uid: '1',
    nameKR: '무지카',
  },
  {
    uid: '1',
    nameKR: '무지카',
  },
]

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      arcanaArray: [],
      loadedImages: [],
      viewType: "grid",
      user: null,
    };

    this.getViewType = this.getViewType.bind(this);
    this.observeArcana = this.observeArcana.bind(this);
    this.showArcana = this.showArcana.bind(this);
  }

  componentWillMount() {
  
    // this.observeArcana()
  }

  componentDidMount() {

    this.getViewType()

    const offset = localStorage.getItem('scrollHome');
    window.pageYOffset = offset;
  }


  componentWillUnmount() {
    arcanaRef.off();

    console.log(window.pageYOffset);
    localStorage.setItem('scrollHome', window.pageYOffset);
    // console.log(this.refs['homeRoot'].offsetTop);
    // var el = this.refs['homeRoot'];
    // var minPixel = el.offsetTop;
    // var maxPixel = minPixel + el.scrollHeight;
    // var value = el.scrollTop;
    // console.log(value);
    // // respect bounds of element
    // var percent = (value - minPixel)/(maxPixel - minPixel);
    // percent = Math.min(1,Math.max(percent, 0))*100;
    // console.log(percent);
    // console.log(this.refs.homeRoot.scrollTop);
    
  }

  getViewType() {
    let viewType = localStorage.getItem('viewType')

    if (viewType !== undefined) {
      this.setState({
        viewType: viewType,
      })
    }
  }

  setViewType(event, child) {

    let viewType = child.props.value

    if (viewType !== undefined) {
      localStorage.setItem('viewType', child.props.value)      
      this.setState({
        viewType: viewType,
      })
    }
  }

  observeArcana() {
    arcanaRef.orderByKey().limitToLast(10).on('child_added', snapshot => {
      let arcana = snapshot.val();
      console.log(arcana)
      this.setState({ arcanaArray: [arcana].concat(this.state.arcanaArray) });
    })
  }

  onLoad(arcana) {
    console.log(arcana.uid)
    this.setState(({ loadedImages }) => {
      return { loadedImages: loadedImages.concat(arcana) }
    })
  }

  showArcana(arcanaID) {
    this.props.history.push({
      pathname: '../Arcana',
      search: '?arcana=' + arcanaID
    });
  }

  render() {

    return (
      <MuiThemeProvider>
        <div>
        <IconMenu
        style={{float:'right'}}
          iconButtonElement={<IconButton>
            <MoreVertIcon />
          </IconButton>}
          onItemTouchTap={this.setViewType.bind(this)}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="카드 뷰" value="grid"/>
          <MenuItem primaryText="리스트 뷰" value="list"/>
        </IconMenu>
      <br style={{clear:'both'}}/>
      {this.state.viewType === 'grid' ? (
        <div className={styles.grid} ref="homeRoot">
        
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">체인크로니클 위키</h1>
          </header> */}

          {arcanaArray.map( arcana => 

              <ArcanaGridCell
                onClick={this.showArcana.bind(null,arcana.uid)}
                key={arcana.uid}

                nameKR={arcana.nameKR}
                nicknameKR={arcana.nicknameKR}
                nameJP={arcana.nameJP}
                nicknameJP={arcana.nicknameJP}

                rarity={arcana.rarity}
                class={arcana.class}
                weapon={arcana.weapon}
                affiliation={arcana.affiliation}
                numberOfViews={arcana.numberOfViews}

                imageURL={arcana.imageURL}
                iconURL={arcana.iconURL}
              />          
          
          )}
          {/* <div style={{display:'none'}}>
            {this.state.arcanaArray.map((arcana, i) =>
              <img 
                src={arcana.imageURL}
                onLoad={this.onLoad.bind(this, arcana)} 
                key={i} />
            )}
          </div> */}
        </div>
      ) : (
        <div ref="homeRoot">
          {arcanaArray.map( arcana => 
            <ArcanaCell
            onClick={this.showArcana.bind(null,arcana.uid)}
            key={arcana.uid}

            nameKR={arcana.nameKR}
            nicknameKR={arcana.nicknameKR}
            nameJP={arcana.nameJP}
            nicknameJP={arcana.nicknameJP}

            rarity={arcana.rarity}
            class={arcana.class}
            weapon={arcana.weapon}
            affiliation={arcana.affiliation}
            numberOfViews={arcana.numberOfViews}

            imageURL={arcana.imageURL}
            iconURL={arcana.iconURL}
          />   
          )}
        </div>
      )}
        </div>
      </MuiThemeProvider>

    );
  }

}

export default Home;
