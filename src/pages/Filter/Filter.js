import React, { Component } from 'react';
import logo from '../../logo.png';
import styles from './Filter.css';
import firebase from 'firebase';
import {ref} from '../../helpers/constants'
import ArcanaCell from '../../components/ArcanaCell/ArcanaCell';
import ArcanaGridCell from '../../components/ArcanaGridCell/ArcanaGridCell'
import { HashRouter, Link, withRouter } from "react-router-dom";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';

const gridStyle = {
  marginTop: '40px',
}

class Filter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showFilter: true,
    }

    this.updateFilter = this.updateFilter.bind(this);
    this.toggleFilterView = this.toggleFilterView.bind(this);
  }

  componentWillMount() {
  
  }

  componentDidMount() {

  }


  componentWillUnmount() {

  }


  observeArcana() {
    // arcanaRef.orderByKey().limitToLast(10).on('child_added', snapshot => {
    //   let arcana = snapshot.val();
    //   console.log(arcana)
    //   this.setState({ arcanaArray: [arcana].concat(this.state.arcanaArray) });
    // })
  }

  showArcana(arcanaID) {
    this.props.history.push({
      pathname: '../Arcana',
      search: '?arcana=' + arcanaID
    });
  }

  toggleFilterView() {
    console.log('filter')
    this.setState({
      showFilter: !this.state.showFilter,
    })
  }

  updateFilter(event, key, v) {
    console.log(event)
    console.log(`${key}: ${v}`)
  }

  render() {

    return (
      <MuiThemeProvider>
        <div>
        {this.state.showFilter &&
        <div>

        <div className={styles.grid}>
          <RaisedButton label="5" onClick={() => this.updateFilter(this,'rarity', '5')}/>
          <RaisedButton label="4" onClick={() => this.updateFilter(this, 'rarity', '4')}/>
          <RaisedButton label="3" onClick={() => this.updateFilter(this, 'rarity', '3')}/>
          <RaisedButton label="2" onClick={() => this.updateFilter(this, 'rarity', '2')}/>
          <RaisedButton label="1" onClick={() => this.updateFilter(this, 'rarity', '1')}/>
        </div>
        <div className={styles.grid} style={gridStyle}>
          <RaisedButton label="전사" onClick={() => this.updateFilter(this,'class', '전사')}/>
          <RaisedButton label="기사" onClick={() => this.updateFilter(this, 'class', '기사')}/>
          <RaisedButton label="궁수" onClick={() => this.updateFilter(this, 'class', '궁수')}/>
          <RaisedButton label="법사" onClick={() => this.updateFilter(this, 'class', '법사')}/>
          <RaisedButton label="승려" onClick={() => this.updateFilter(this, 'class', '승려')}/>
        </div>
        <div className={styles.grid} style={gridStyle}>
          <RaisedButton label="검" onClick={() => this.updateFilter(this, 'weapon', '검')}/>
          <RaisedButton label="봉" onClick={() => this.updateFilter(this, 'weapon', '봉')}/>
          <RaisedButton label="창" onClick={() => this.updateFilter(this, 'weapon', '창')}/>
          <RaisedButton label="마" onClick={() => this.updateFilter(this, 'weapon', '마')}/>
          <RaisedButton label="궁" onClick={() => this.updateFilter(this, 'weapon', '궁')}/>
          <RaisedButton label="성" onClick={() => this.updateFilter(this, 'weapon', '성')}/>
          <RaisedButton label="권" onClick={() => this.updateFilter(this, 'weapon', '권')}/>
          <RaisedButton label="총" onClick={() => this.updateFilter(this, 'weapon', '총')}/>
          <RaisedButton label="저" onClick={() => this.updateFilter(this, 'weapon', '저')}/>
        </div>
        <div className={styles.grid} style={gridStyle}>
          <RaisedButton label="여행자" onClick={() => this.updateFilter(this, 'affiliation', '여행자')}/>
          <RaisedButton label="마신" onClick={() => this.updateFilter(this, 'affiliation', '마신')}/>
          <RaisedButton label="부도" onClick={() => this.updateFilter(this, 'affiliation', '부도')}/>
          <RaisedButton label="성도" onClick={() => this.updateFilter(this, 'affiliation', '성도')}/>
          <RaisedButton label="현탑" onClick={() => this.updateFilter(this, 'affiliation', '현탑')}/>
          <RaisedButton label="미궁" onClick={() => this.updateFilter(this, 'affiliation', '미궁')}/>
          <RaisedButton label="호도" onClick={() => this.updateFilter(this, 'affiliation', '호도')}/>
          <RaisedButton label="정령섬" onClick={() => this.updateFilter(this, 'affiliation', '정령섬')}/>
          <RaisedButton label="구령" onClick={() => this.updateFilter(this, 'affiliation', '구령')}/>
          <RaisedButton label="대해" onClick={() => this.updateFilter(this, 'affiliation', '대해')}/>
          <RaisedButton label="수인" onClick={() => this.updateFilter(this, 'affiliation', '수인')}/>
          <RaisedButton label="죄" onClick={() => this.updateFilter(this, 'affiliation', '죄')}/>
          <RaisedButton label="박명" onClick={() => this.updateFilter(this, 'affiliation', '박명')}/>
          <RaisedButton label="철연" onClick={() => this.updateFilter(this, 'affiliation', '철연')}/>
          <RaisedButton label="연대기" onClick={() => this.updateFilter(this, 'affiliation', '연대기')}/>
          <RaisedButton label="레무" onClick={() => this.updateFilter(this, 'affiliation', '레무')}/>
          <RaisedButton label="의용군" onClick={() => this.updateFilter(this, 'affiliation', '의용군')}/>
          <RaisedButton label="화격단" onClick={() => this.updateFilter(this, 'affiliation', '화격단')}/>
        </div>

        </div>
        }
        <Toolbar className={styles.toolbar}>
          <ToolbarGroup lastChild={true}>
            <ToolbarTitle text="필터" />
            <IconButton onClick={this.toggleFilterView}>
              <FilterIcon />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        </div>
      </MuiThemeProvider>

    );
  }

}

export default Filter;
