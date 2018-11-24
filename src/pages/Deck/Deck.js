import React, { Component } from 'react';
import ArcanaList from '../../components/ArcanaList/ArcanaList';
import { ARCANA_REF } from '../../helpers/constants'

export default class Deck extends Component {

    state = {
        arcanaArray: [
            {"abilityDesc1":"마나를 2개 가진 상태로 전투를 시작한다. 적을 쓰러 뜨렸을 때 일정 확률로 마나를 획득한다. 마나를 소지하고 있을시 공격력이 50%, 방어력이 5% 상승한다. 천하태평을 목표로 구령의 영주.","abilityDesc2":"초 필살 게이지가 최대가되면 120초 동안 자신의 공격력이 70%, 방어력이 15%, 이동 속도와 크리티컬 발생률이 상승한다. 무기 계통이 검인 아군의 공격력이 5%, 방어력이 10%, 이동 속도가 증가 HP가 4초마다 250씩 회복한다. 태평의 세상을 구축 위해 이몸도 강해지다! 그 검사 님처럼!","abilityName1":"유대의 영웅 구령","abilityName2":"계승 し 날","affiliation":"화염구령","chainStone":"레벨 1 ","class":"전사","cost":"20","dateAdded":"2017/05/31","iconURL":"https://firebasestorage.googleapis.com/v0/b/chainchronicle-ea233.appspot.com/o/image%2Farcana%2F-KlU9xNr8LuBkkH-rSZu%2Ficon.jpg?alt=media&token=1fc949a1-b0bd-4a31-b10b-f057a90c325a","imageURL":"https://firebasestorage.googleapis.com/v0/b/chainchronicle-ea233.appspot.com/o/image%2Farcana%2F-KlU9xNr8LuBkkH-rSZu%2Fmain.jpg?alt=media&token=9828027a-55b1-4b29-a8b5-2f2b24214b0f","kizunaCost":"4","kizunaDesc":"마나를 하나 가진 상태로 전투를 시작한다. 공격력이 9%, 방어력이 7% 상승한다.","kizunaName":"구령 영주","nameJP":"ツル","nameKR":"츠루","nicknameJP":"大躍進の第九領主","nicknameKR":"대약진의 구령 영주","numberOfLikes":4,"partyAbility":"전장에 있는 구령 소속의 공격력이 20% 상승한다.","rarity":"5","related":{"-KTIUl-8ONBrLHcFCquH":true},"skillCount":"2","skillDesc1":"20초 동안 아군 전체의 공격력이 30%, 방어력이 각자 ATK의 1.5% 만큼 상승한다.","skillDesc2":"[초 필살 / 연격] 접촉하고있는 모든 적에게 25회 데미지 (0.14배)를 준 후 중간 데미지 (6배)를주고 다운한다. 그 후 20초 동안 아군 전체의 공격력이 40%, 방어력이 각자 ATK의 2% 만큼, 이동 속도가 상승한다.","skillMana1":"1","skillMana2":"1","skillName1":"鶴姫의 일갈","skillName2":"速閃 · 연 학","tavern":"레전드 페스","uid":"-KlU9xNr8LuBkkH-rSZu","weapon":"검"}
        ]
    }
    componentWillMount() {

        const parsed = window.location.search.slice(1);
        if (parsed.d) {
            // TODO: network call to get deck.
            // queryOrderedByValue(?)
            /**
             * deckID
             *  arcanaID1: 0
             *  arcanaID2: 1
             */

            //  const arcanaKeys = [
            //      "-KlU9xNr8LuBkkH-rSZu",
            //      "-LIl8-hT1392SFPARxDs"
            //  ]
            //  arcanaKeys.map(arcanaID => {
            //     const arcanaRef = ARCANA_REF.child(arcanaID);
            //     arcanaRef.once('value', snapshot => {

            //         const arcana = snapshot.val()
            
            //         console.log(arcana.nicknameKR);
            //       })

            //  })

        }
        else {
            // create new deck
        }

    }

    render() {

        return (
            <div>          
                <h1 style={{margin: '16px'}}>여기에 덱 이름</h1>
                <ArcanaList
                    arcanaArray={this.state.arcanaArray}
                    viewType='list'
                />
                {/* {mockDecks.map((deck, index) =>
                <div style={{backgroundColor: index % 2 === 0 ? '#f1f2f4' : 'white'}}>
                    <DeckPreview key={deck.deckID} deck={deck}/>
                </div>
                )} */}
            </div>
        );
    }

}