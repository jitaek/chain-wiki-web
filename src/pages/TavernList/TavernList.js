import React, { Component } from 'react'
import { getParams } from '../../helpers/QueryParameter'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import TavernTabs from '../../components/TavernTabs/TavernTabs'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'

const RadioButtonStyle = {
  display: 'inline-block',
  width: '120px'
}

const tavern1Array = [
  {
    kr: '부도',
    en: 'capital'
  },
  {
    kr: '성도',
    en: 'holy'
  },
  {
    kr: '현자의탑',
    en: 'sage'
  },
  {
    kr: '미궁산맥',
    en: 'maze'
  },
  {
    kr: '호수도시',
    en: 'lake'
  },
  {
    kr: '정령섬',
    en: 'soul'
  },
  {
    kr: '화염구령',
    en: 'fire'
  },
  {
    kr: '해풍의항구',
    en: 'seaBreeze'
  },
  {
    kr: '링가챠',
    en: 'ringGacha'
  },
  {
    kr: '링교환',
    en: 'ringTrade'
  },
]

const tavern2Array = [
  {
    kr: '새벽대해',
    en: 'daybreakOcean'
  },
  {
    kr: '수인의대륙',
    en: 'beast'
  },
  {
    kr: '죄의대륙',
    en: 'sin'
  },
  {
    kr: '박명의대륙',
    en: 'ephemerality'
  },
  {
    kr: '철연의대륙',
    en: 'iron'
  },
  {
    kr: '서가',
    en: 'book'
  },
  {
    kr: '연대기대륙',
    en: 'chronicle'
  },
  {
    kr: '레무레스섬',
    en: 'lemures'
  }
]
const tavern3Array = [
  {
    kr: '성왕국',
    en: 'holyKingdom'
  },
  {
    kr: '현자의탑 3부',
    en: 'sage2'
  },
  {
    kr: '호수도시 3부',
    en: 'lake2'
  },
  {
    kr: '정령섬 3부',
    en: 'soul2'
  },
  {
    kr: '화염구령 3부',
    en: 'fire2'
  }
]

class TavernList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      loaded: false,
    }

    this.selectedTavernList = this.selectedTavernList.bind(this)
    
  }
  
  componentWillMount() {

  }

  componentDidMount() {

    const search = this.props.history.location.search
    let params = getParams(search)
    const index = params['index']
    const selectedIndex = parseInt(index)
    
    if (selectedIndex || selectedIndex === 0) {
      this.setState({
        loaded: true,
        selectedIndex:selectedIndex
      })
    }
    else {
      this.setState({
        loaded: true,
      })
    }
    
  }

  componentWillUnmount() {

  }

  selectedTavernList(index) {

    this.props.history.replace({
      search: `?index=${index}`
    })
      
    console.log(`index is ${index}`)

  }

  render() {

    if (this.state.loaded) {
      return (
          <div>
            <div style={{marginTop:'20px'}}>
              
              <TavernTabs
                tavern1Array={tavern1Array}
                tavern2Array={tavern2Array}
                tavern3Array={tavern3Array}
                onChange={this.selectedTavernList}
                initialSelectedIndex={this.state.selectedIndex}
              />
              
            </div>
          </div>
      )
    }

    return <LoadingIndicator/> 
  }

}

export default TavernList
