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
      loadedImages: []
    };
    this.observeArcana = this.observeArcana.bind(this);
    this.showArcana = this.showArcana.bind(this);
  }

  componentWillMount() {
  
    this.observeArcana()

    // const arcana = {
    //   uid: '-KvIZ3wuQW3E6JPIjGe9',
    //   nameKR: '무지카',
    //   iconURL: '../../riberaMain.jpg'
    // }
    // this.setState({
    //   arcanaArray: [arcana]
    // })
  }

  componentDidMount() {
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

      <div className={styles.grid} ref="homeRoot">
      
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">체인크로니클 위키</h1>
        </header> */}

        {this.state.arcanaArray.map( arcana => 

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
    );
  }

}

export default Home;
