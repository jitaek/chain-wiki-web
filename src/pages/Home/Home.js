import React, { Component } from 'react';
import logo from '../../logo.png';
import styles from './Home.css';
import firebase from 'firebase';
import ArcanaCell from '../../components/ArcanaCell/ArcanaCell';
import { HashRouter, Link, withRouter } from "react-router-dom";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      arcanaArray: [] };
      this.showArcana = this.showArcana.bind(this);
  }

  componentWillMount(){

    // let arcanaRef = firebase.database().ref('arcana');
    // arcanaRef.orderByKey().limitToLast(4).on('child_added', snapshot => {
    //   let arcana = snapshot.val();
    //   this.setState({ arcanaArray: [arcana].concat(this.state.arcanaArray) });
    // })
    const arcana = {
      uid: '-KvIZ3wuQW3E6JPIjGe9',
      nameKR: '무지카',
      iconURL: '../../riberaMain.jpg'
    }
    this.setState({
      arcanaArray: [arcana]
    })
  }

  componentWillUnmount() {
    let arcanaRef = firebase.database().ref('arcana');
    arcanaRef.off();
  }

  showArcana(arcanaID) {
    this.props.history.push({
      pathname: '../Arcana',
      search: '?arcana=' + arcanaID
    });
  }

  render() {

    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">체인크로니클 위키</h1>
        </header> */}

        {this.state.arcanaArray.map( arcana => 

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

            iconURL={arcana.iconURL}
          />
        
        )}
      </div>
    );
  }

}

export default Home;
