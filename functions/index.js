/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const mkdirp = require('mkdirp-promise');
const gcs = require('@google-cloud/storage')();
const exec = require('child-process-promise').exec;
const LOCAL_TMP_FOLDER = '/tmp/';

const abilityRef = admin.database().ref('ability')
const tavernRef = admin.database().ref('tavern')

exports.createUser = functions.auth.user().onCreate(event => {

  const user = event.data; // The Firebase user.
  const email = user.email; // The email of the user.
  const name = user.displayName; // The user's real name. Set automatically with login providers.

  // Set up initial user data.
  const userID = user.uid;
  console.log(userID);

  admin.database().ref(`/user/${userID}`).set({

    edit: true,
    editsCount: 0,
    email: email,
    joined: admin.database.ServerValue.TIMESTAMP,
    name: name

  });
  
});


exports.deleteUser = functions.auth.user().onDelete(event => {

  const user = event.data;
  const userID = user.uid;
  const email = user.email;
  const escapedEmail = email.replace(/\./g, ',');
  const name = user.displayName;  // TODO: name vs username.

  admin.database().ref(`/user/${userID}`).remove();
  // admin.database().ref(`/profiles/${userID}`).remove();
  // admin.database().ref(`/userEmails/${escapedEmail}`).remove();

  // TODO: Handle posts + comments

  // sendGoodbyEmail(email, name);

});

// function that takes in ability1 or ability 2, and returns the abilityRef if true.
function abilityType(arcanaID, abilityDesc, isKizuna) {

  console.log(`updating ability for ${arcanaID} with ${abilityDesc}`)

  var abilityType = 'Ability';

  if (isKizuna) {
    abilityType = 'Kizuna';
  }
  
  if (abilityDesc.indexOf('서브') !== -1) {
    abilityRef.child(`sub${abilityType}`).child(arcanaID).set(true);
  }

  if (abilityDesc.indexOf('마나') !== -1 && abilityDesc.indexOf('시작') !== -1) {
    abilityRef.child(`mana${abilityType}`).child(arcanaID).set(true);
  }

  if (abilityDesc.indexOf('마나 슬롯') !== -1 && abilityDesc.indexOf('속도') !== -1) {
    abilityRef.child(`manaSlot${abilityType}`).child(arcanaID).set(true);
  }

  if (abilityDesc.indexOf('마나 슬롯 때') !== -1 || (abilityDesc.indexOf('마나') !== -1 && abilityDesc.indexOf('쉽게한다') !== -1)) {
    abilityRef.child(`manaChance${abilityType}`).child(arcanaID).set(true);
  }

  if (abilityDesc.indexOf('보물') !== -1 || abilityDesc.indexOf('상자') !== -1) {
    abilityRef.child(`treasure${abilityType}`).child(arcanaID).set(true);    
  }

  if (abilityDesc.indexOf('골드') !== -1) {
    abilityRef.child(`gold${abilityType}`).child(arcanaID).set(true);
  }

  if (abilityDesc.indexOf('경험치') !== -1) {
    abilityRef.child(`exp${abilityType}`).child(arcanaID).set(true);
  }

  if (abilityDesc.indexOf('필살기') !== -1) {
    abilityRef.child(`skillUp${abilityType}`).child(arcanaID).set(true);
  }

  if (abilityDesc.indexOf('AP') !== -1) {
    abilityRef.child(`apRecover${abilityType}`).child(arcanaID).set(true);
  }

  if (abilityDesc.indexOf('보스') !== -1) {
    abilityRef.child(`bossWave${abilityType}`).child(arcanaID).set(true);
  }

  if (abilityDesc.indexOf('웨이브') !== -1 && abilityDesc.indexOf('회복한다') !== -1 && abilityDesc.indexOf('아군') !== -1) {
    abilityRef.child(`partyHeal${abilityType}`).child(arcanaID).set(true);
  }

  if (abilityDesc.indexOf('적에게') !== -1) {

    if (abilityDesc.indexOf('독') !== -1) {
      abilityRef.child(`poisonAttackUp${abilityType}`).child(arcanaID).set(true);      
    }

    if (abilityDesc.indexOf('암흑') !== -1 || abilityDesc.indexOf('어둠') !== -1) {
      abilityRef.child(`darkAttackUp${abilityType}`).child(arcanaID).set(true);      
    }

    if (abilityDesc.indexOf('스러운') !== -1 || abilityDesc.indexOf('슬로우') !== -1) {
      abilityRef.child(`slowAttackUp${abilityType}`).child(arcanaID).set(true);      
    }

    if (abilityDesc.indexOf('저주') !== -1) {
      abilityRef.child(`curseAttackUp${abilityType}`).child(arcanaID).set(true);      
    }

    if (abilityDesc.indexOf('쇠약') !== -1) {
      abilityRef.child(`weakAttackUp${abilityType}`).child(arcanaID).set(true);      
    }

    if (abilityDesc.indexOf('백골') !== -1) {
      abilityRef.child(`skeletonAttackUp${abilityType}`).child(arcanaID).set(true);      
    }

    if (abilityDesc.indexOf('다운') !== -1) {
      abilityRef.child(`stunAttackUp${abilityType}`).child(arcanaID).set(true);      
    }

    if (abilityDesc.indexOf('동결') !== -1) {
      abilityRef.child(`frostAttackUp${abilityType}`).child(arcanaID).set(true);      
    }

  }

  if (abilityDesc.indexOf('상태로한다') !== -1 || abilityDesc.indexOf('추가된다') !== -1 || abilityDesc.indexOf('만든다') !== -1) {
    if (abilityDesc.indexOf('독') !== -1) {
      abilityRef.child(`poisonStrike${abilityType}`).child(arcanaID).set(true);            
    }
    if (abilityDesc.indexOf('슬로우') !== -1 || abilityDesc.indexOf('스러운') !== -1) {
      abilityRef.child(`slowStrike${abilityType}`).child(arcanaID).set(true);            
    }
    if (abilityDesc.indexOf('암흑') !== -1 || abilityDesc.indexOf('어둠') !== -1) {
      abilityRef.child(`darkStrike${abilityType}`).child(arcanaID).set(true);            
    }
    if (abilityDesc.indexOf('동결') !== -1) {
      abilityRef.child(`frostStrike${abilityType}`).child(arcanaID).set(true);            
    }
  }

  if (abilityDesc.indexOf('않는다') !== -1 || abilityDesc.indexOf('면역') !== -1) {
    if (abilityDesc.indexOf('독') !== -1) {
      abilityRef.child(`poisonImmune${abilityType}`).child(arcanaID).set(true);            
    }
    if (abilityDesc.indexOf('슬로우') !== -1 || abilityDesc.indexOf('스러운') !== -1) {
      abilityRef.child(`slowImmune${abilityType}`).child(arcanaID).set(true);            
    }
    if (abilityDesc.indexOf('암흑') !== -1 || abilityDesc.indexOf('어둠') !== -1) {
      abilityRef.child(`darkImmune${abilityType}`).child(arcanaID).set(true);            
    }
    if (abilityDesc.indexOf('동결') !== -1) {
      abilityRef.child(`frostImmune${abilityType}`).child(arcanaID).set(true);            
    }
    if (abilityDesc.indexOf('쇠약') !== -1) {
      abilityRef.child(`weakImmune${abilityType}`).child(arcanaID).set(true);            
    }
    if (abilityDesc.indexOf('백골') !== -1) {
      abilityRef.child(`skeletonImmune${abilityType}`).child(arcanaID).set(true);            
    }
    if (abilityDesc.indexOf('다운') !== -1) {
      abilityRef.child(`stunImmune${abilityType}`).child(arcanaID).set(true);            
    }
    if (abilityDesc.indexOf('봉인') !== -1) {
      abilityRef.child(`sealImmune${abilityType}`).child(arcanaID).set(true);            
    }
  }

  if (abilityDesc.indexOf('지형') !== -1) {
    if (abilityDesc.indexOf('황무지') !== -1) {
      abilityRef.child(`wastelands${abilityType}`).child(arcanaID).set(true);            
    }
    if (abilityDesc.indexOf('숲') !== -1) {
      abilityRef.child(`forest${abilityType}`).child(arcanaID).set(true);            
    }
    if (abilityDesc.indexOf('덩굴') !== -1) {
      abilityRef.child(`cavern${abilityType}`).child(arcanaID).set(true);            
    }
    if (abilityDesc.indexOf('사막') !== -1) {
      abilityRef.child(`desert${abilityType}`).child(arcanaID).set(true);            
    }
    if (abilityDesc.indexOf('설산') !== -1) {
      abilityRef.child(`snow${abilityType}`).child(arcanaID).set(true);            
    }
    if (abilityDesc.indexOf('도시') !== -1) {
      abilityRef.child(`urban${abilityType}`).child(arcanaID).set(true);            
    }
    if (abilityDesc.indexOf('해변') !== -1) {
      abilityRef.child(`water${abilityType}`).child(arcanaID).set(true);            
    }
    if (abilityDesc.indexOf('야간') !== -1 || abilityDesc.indexOf('밤') !== -1) {
      abilityRef.child(`night${abilityType}`).child(arcanaID).set(true);            
    }
  }

}

exports.updateAbilityRefOnCreate = functions.database.ref('/arcana/{arcanaID}/abilityDesc1').onCreate(event => {

  const arcanaID = event.params.arcanaID;
  const abilityDesc = event.data.val();

  abilityType(arcanaID, abilityDesc, false);

});

exports.updateAbilityRefOnUpdate = functions.database.ref('/arcana/{arcanaID}/abilityDesc1').onUpdate(event => {
  
    const arcanaID = event.params.arcanaID;
    const abilityDesc = event.data.val();
  
    abilityType(arcanaID, abilityDesc, false);
  
});

exports.updateAbilityRefOnCreate = functions.database.ref('/arcana/{arcanaID}/abilityDesc2').onCreate(event => {
  
    const arcanaID = event.params.arcanaID;
    const abilityDesc = event.data.val();
  
    abilityType(arcanaID, abilityDesc);
  
});

exports.updateAbilityRefOnUpdate = functions.database.ref('/arcana/{arcanaID}/abilityDesc2').onUpdate(event => {
  
    const arcanaID = event.params.arcanaID;
    const abilityDesc = event.data.val();
  
    abilityType(arcanaID, abilityDesc);
  
});

exports.updateKizunaRefOnCreate = functions.database.ref('/arcana/{arcanaID}/kizunaDesc').onCreate(event => {
  
    const arcanaID = event.params.arcanaID;
    const abilityDesc = event.data.val();
  
    abilityType(arcanaID, abilityDesc, true);
  
});

exports.updateKizunaRefOnUpdate = functions.database.ref('/arcana/{arcanaID}/kizunaDesc').onUpdate(event => {
  
    const arcanaID = event.params.arcanaID;
    const abilityDesc = event.data.val();
  
    abilityType(arcanaID, abilityDesc, true);
  
});

exports.updateAbilityWithBuddyOnCreate = functions.database.ref('/arcana/{arcanaID}/buddyAbilityDesc').onCreate(event => {
  
    const arcanaID = event.params.arcanaID;
    const abilityDesc = event.data.val();
  
    abilityType(arcanaID, abilityDesc, false);
  
});

exports.updateAbilityWithBuddyOnUpdate = functions.database.ref('/arcana/{arcanaID}/buddyAbilityDesc').onUpdate(event => {
  
    const arcanaID = event.params.arcanaID;
    const abilityDesc = event.data.val();
  
    abilityType(arcanaID, abilityDesc, false);
  
});
// TODO: onwrite on editcount + observe once
exports.editArcana = functions.database.ref('/arcana/{arcanaID}/editCount').onWrite(event => {

  const arcanaID = event.params.arcanaID;

  console.log(arcanaID);
  return admin.database().ref(`/arcana/${arcanaID}`).once('value').then(snapshot => {
    const data = snapshot.val();
    console.log(nicknameKR);
    console.log(nameKR);
    const fullName = nicknameKR + " " + nameKR;
    admin.database().ref(`/name/${arcanaID}`).set(fullName);
  });
});

/*
exports.removeRelatedArcana = functions.database.ref('/remove/{OI}').onWrite(event => {

  return admin.database().ref(`/arcana`).once('value').then(snapshot => {
    
    
        snapshot.forEach(function(child) {
    
          const arcanaID = child.key;

          admin.database().ref(`/arcana/${arcanaID}/related/${arcanaID}`).remove();
              
        });
    })
});

exports.updateRelatedArcana = functions.database.ref('/loadFunction/{function}').onWrite(event => {
  
  return admin.database().ref(`/arcana`).once('value').then(snapshot => {

    var array = [];

    snapshot.forEach(function(child) {

      array.push(child.val());
          
    });
    console.log('done pushing')
    
    // we now have all the arcana in an array.

    for (var i = 0; i < array.length; i++) {

      const arcana = array[i];
      const arcanaID = arcana.uid;
      const arcanaNameKR = arcana.nameKR;
      if (i === 0) {
        console.log(arcanaID);
        console.log(arcanaNameKR);
      }

      for (var j = 0; j < array.length; j++) {

        const arcana2 = array[j];
        const arcana2ID = arcana2.uid;
        const arcana2NameKR = arcana2.nameKR;

        if (j === 0) {
          console.log(arcana2ID);
          console.log(arcana2NameKR);
        }
        if (arcanaNameKR === arcana2NameKR) {
          
          admin.database().ref(`/arcana/${arcanaID}/related/${arcana2ID}`).set(true);
          admin.database().ref(`/arcana/${arcana2ID}/related/${arcanaID}`).set(true);

        }
      }

    }

  });
});
*/

function updateArcanaName(arcanaID, nameKR, nicknameKR) {
  
  const fullName = nicknameKR + " " + nameKR;
  admin.database().ref(`/name/${arcanaID}`).set(fullName);

}
// If the arcana's name is changed, update /arcana/name
exports.updateArcanaName = functions.database.ref('/arcana/{arcanaID}/nicknameKR').onCreate(event => {
  const nicknameKR = event.data.val();
  const arcanaID = event.params.arcanaID;

  console.log(arcanaID);
  return admin.database().ref(`/arcana/${arcanaID}/nameKR`).once('value').then(snapshot => {
    const nameKR = snapshot.val();
    console.log(nicknameKR);
    console.log(nameKR);
    updateArcanaName(arcanaID, nameKR, nicknameKR);
  });
});

exports.updateArcanaName = functions.database.ref('/arcana/{arcanaID}/nicknameKR').onUpdate(event => {
  const nicknameKR = event.data.val();
  const arcanaID = event.params.arcanaID;

  console.log(arcanaID);
  return admin.database().ref(`/arcana/${arcanaID}/nameKR`).once('value').then(snapshot => {
    const nameKR = snapshot.val();
    console.log(nicknameKR);
    console.log(nameKR);
    updateArcanaName(arcanaID, nameKR, nicknameKR);
  });
});

exports.updateArcanaName = functions.database.ref('/arcana/{arcanaID}/nameKR').onCreate(event => {
  const nameKR = event.data.val();
  const arcanaID = event.params.arcanaID;

  console.log(arcanaID);
  return admin.database().ref(`/arcana/${arcanaID}/nicknameKR`).once('value').then(snapshot => {
    const nicknameKR = snapshot.val();
    console.log(nicknameKR);
    console.log(nameKR);
    updateArcanaName(arcanaID, nameKR, nicknameKR);
  });
});

exports.updateArcanaName = functions.database.ref('/arcana/{arcanaID}/nameKR').onUpdate(event => {
  const nameKR = event.data.val();
  const arcanaID = event.params.arcanaID;

  console.log(arcanaID);
  return admin.database().ref(`/arcana/${arcanaID}/nicknameKR`).once('value').then(snapshot => {
    const nicknameKR = snapshot.val();
    console.log(nicknameKR);
    console.log(nameKR);
    updateArcanaName(arcanaID, nameKR, nicknameKR);
  });
});
// If the arcana is deleted, remove the arcana's name from /arcana/name
exports.removeArcanaName = functions.database.ref('/arcana/{arcanaID}').onDelete(event => {

    const arcanaID = event.params.arcanaID;
    return admin.database().ref(`/name/${arcanaID}`).remove();
});

exports.updateBuddyList = functions.database.ref('/arcana/{arcanaID}/buddyNameKR').onCreate(event => {
  
      const arcanaID = event.params.arcanaID;
      admin.database().ref(`list/buddy/${arcanaID}`).set(true);
      
});



exports.updateLegendList = functions.database.ref('/arcana/{arcanaID}/tavern').onCreate(event => {
  
      const arcanaID = event.params.arcanaID;
      const tavern = event.data.val();

      if (tavern.indexOf('레전드') !== -1) {
        admin.database().ref(`legend/${arcanaID}`).set(true);        
      }
      
});

function updateLegends(arcanaID, tavern) {

  if (tavern.indexOf('레전드') !== -1) {
    admin.database().ref(`legend/${arcanaID}`).set(true);        
  }
  else if (tavern.indexOf('소용돌이') !== -1 || tavern.indexOf('천마') !== -1) {
    admin.database().ref(`abyssal/${arcanaID}`).set(true);        
  }
  else if (tavern.indexOf('성왕국') !== -1) {
    tavernRef.child('holyKingdom').child(arcanaID).set(true);
  }
  else if (tavern.indexOf('링가챠') !== -1) {
    tavernRef.child('ringGacha').child(arcanaID).set(true);
  }
  else if (tavern.indexOf('링교환') !== -1) {
    tavernRef.child('ringTrade').child(arcanaID).set(true);
  }
  else if (tavern.indexOf('부도') !== -1) {
    tavernRef.child('capital').child(arcanaID).set(true);
  }
  else if (tavern.indexOf('성도') !== -1) {
    tavernRef.child('holy').child(arcanaID).set(true);
  }
  else if (tavern.indexOf('현자') !== -1 || tavern.indexOf('현탑') !== -1) {
    if (tavern.indexOf('3부') !== -1) {
      tavernRef.child('sage2').child(arcanaID).set(true);       
    }
    else {
      tavernRef.child('sage').child(arcanaID).set(true);
    }
  }
  else if (tavern.indexOf('미궁') !== -1) {
    tavernRef.child('maze').child(arcanaID).set(true);
  }
  else if (tavern.indexOf('호수') !== -1 || tavern.indexOf('호도') !== -1) {
    if (tavern.indexOf('3부') !== -1) {
      tavernRef.child('lake2').child(arcanaID).set(true);
    }
    else {
      tavernRef.child('lake').child(arcanaID).set(true);     
    }
  }
  else if (tavern.indexOf('정령섬') !== -1) {
    if (tavern.indexOf('3부') !== -1) {
      tavernRef.child('soul2').child(arcanaID).set(true);
    }
    else {
      tavernRef.child('soul').child(arcanaID).set(true);
    }
  }
  else if (tavern.indexOf('구령') !== -1 || tavern.indexOf('화염') !== -1) {
    if (tavern.indexOf('3부') !== -1) {
      tavernRef.child('fire2').child(arcanaID).set(true);       
    }
    else {
      tavernRef.child('fire').child(arcanaID).set(true);          
    } 
  }
  else if (tavern.indexOf('해풍') !== -1) {
    tavernRef.child('seaBreeze').child(arcanaID).set(true);
  }
  else if (tavern.indexOf('대해') !== -1) {
    tavernRef.child('daybreakOcean').child(arcanaID).set(true);
  }
  else if (tavern.indexOf('수인') !== -1) {
    tavernRef.child('beast').child(arcanaID).set(true);
  }
  else if (tavern.indexOf('죄') !== -1) {
    tavernRef.child('sin').child(arcanaID).set(true);
  }
  else if (tavern.indexOf('박명') !== -1) {
    tavernRef.child('ephemerality').child(arcanaID).set(true);
  }
  else if (tavern.indexOf('철연') !== -1) {
    tavernRef.child('iron').child(arcanaID).set(true);
  }
  else if (tavern.indexOf('연대기') !== -1) {
    tavernRef.child('chronicle').child(arcanaID).set(true);
  }
  else if (tavern.indexOf('서가') !== -1) {
    tavernRef.child('book').child(arcanaID).set(true);
  }
  else if (tavern.indexOf('레무') !== -1) {
    tavernRef.child('lemures').child(arcanaID).set(true);
  }
}

exports.updateLegendListOnCreate = functions.database.ref('/arcana/{arcanaID}/tavern').onCreate(event => {
  
      const arcanaID = event.params.arcanaID;
      const tavern = event.data.val();
  
      updateLegends(arcanaID, tavern)

});

exports.updateLegendListOnUpdate = functions.database.ref('/arcana/{arcanaID}/tavern').onUpdate(event => {
  
      const arcanaID = event.params.arcanaID;
      const tavern = event.data.val();

      updateLegends(arcanaID, tavern)

});
// exports.updateAllArcanaName = functions.database.ref('/loadFunction/{function}').onWrite(event => {
  
//   admin.database().ref(`/arcana`).once('value').then(snapshot => {

//     const array = []

//     snapshot.forEach(function(child) {

//       const arcanaID = child.key;
//       // console.log(arcanaID);
//       const nameKR = child.val().nameKR;

//       array.push()
      
//       if (nicknameJP) {
//         admin.database().ref(`/arcana/${arcanaID}/nicknameJP`).set(nicknameJP);
//         admin.database().ref(`/arcana/${arcanaID}/nickNameJP`).remove();
//       }
//       else {
//         console.log(`no nicknameJP for ${arcanaID}`);
//       }
          
//     });
//   });
// });


// exports.fixWhiteSpaces = functions.database.ref('/loadFunction/{function}').onWrite(event => {

//   admin.database().ref(`/arcana/-KTMPc7_EpiQgSGKpw9P`).once('value').then(snapshot => {

//       const arcanaID = snapshot.key;
//       console.log(arcanaID);
//       if (snapshot.val().skillDesc1) {
//         const testString = replaceString(snapshot.val().skillDesc1);
//         // admin.database().ref(`/arcana/${arcanaID}/skillDesc1`).set(replaceString);
//       }
//     snapshot.forEach(function(child) {
//       const arcanaID = child.key;
//       if (child.val().skillDesc1) {
//         const replaceString = replaceString(child.val().skillDesc1);
//         // admin.database().ref(`/arcana/${arcanaID}/skillDesc1`).set(replaceString);
//       }
      
//       if (child.val().skillDesc2) {
//         const replaceString = replaceString(child.val().skillDesc2);
//         admin.database().ref(`/arcana/${arcanaID}/skillDesc2`).set(replaceString);
//       }
//       if (child.val().skillDesc3) {
//         const replaceString = replaceString(child.val().skillDesc3);
//         admin.database().ref(`/arcana/${arcanaID}/skillDesc3`).set(replaceString);
//       }
//       if (child.val().abilityDesc1) {
//         const replaceString = replaceString(child.val().abilityDesc1);
//         admin.database().ref(`/arcana/${arcanaID}/abilityDesc1`).set(replaceString);
//       }
//       if (child.val().abilityDesc2) {
//         const replaceString = replaceString(child.val().abilityDesc2);
//         admin.database().ref(`/arcana/${arcanaID}/abilityDesc2`).set(replaceString);
//       }
//       if (child.val().kizunaDesc) {
//         const replaceString = replaceString(child.val().kizunaDesc);
//         admin.database().ref(`/arcana/${arcanaID}/kizunaDesc`).set(replaceString);
//       }
//     });
//   });
// });

function replaceString(string) {
  var fixNumberExp = /\d\s/g;
  console.log('replacing string...')

  var fixedString;

  while ((match = fixNumberExp.exec(string)) != null) {
    console.log("match found at " + match.index);
    fixedString = string.substr();
  }
  // var replacedString = string.replace('회복 량', '회복량');
  // replacedString = string.replace('넓어진 다', '넓어진다');
  // return replacedString;
  return "OI";
}

// File extension for the created JPEG files.
const JPEG_EXTENSION = 'jpg';

/**
 * When an image is uploaded in the Storage bucket it is converted to JPEG automatically using
 * ImageMagick.
 */

// exports.imageToJPG = functions.storage.object().onChange(event => {
//   const object = event.data;
//   const filePath = object.name;
//   const filePathSplit = filePath.split('/');
//   const fileName = filePathSplit.pop();
//   const fileNameSplit = fileName.split('.');
//   const fileExtension = fileNameSplit.pop();
//   const baseFileName = fileNameSplit.join('.');
//   const fileDir = filePathSplit.join('/') + (filePathSplit.length > 0 ? '/' : '');
//   const JPEGFilePath = `${fileDir}${baseFileName}.${JPEG_EXTENSION}`;//
//   const tempLocalDir = `${LOCAL_TMP_FOLDER}${fileDir}`;
//   const tempLocalFile = `${tempLocalDir}${fileName}`;//
//   const tempLocalJPEGFile = `${LOCAL_TMP_FOLDER}${JPEGFilePath}`;//

//   // Exit if this is triggered on a file that is not an image.
//   if (!object.contentType.startsWith('image/')) {
//     console.log('This is not an image.');
//     return;
//   }

//   // Exit if the image is already a JPEG.
//   if (object.contentType.startsWith('image/jpeg')) {
//     console.log('Already a JPEG.');
//     return;
//   }

//   // Exit if this is a move or deletion event.
//   if (object.resourceState === 'not_exists') {
//     console.log('This is a deletion event.');
//     return;
//   }

//   // Create the temp directory where the storage file will be downloaded.
//   return mkdirp(tempLocalDir).then(() => {
//     // Download file from bucket.
//     const bucket = gcs.bucket(object.bucket);
//     return bucket.file(filePath).download({
//       destination: tempLocalFile
//     }).then(() => {
//       console.log('The file has been downloaded to', tempLocalFile);
//       // Convert the image to JPEG using ImageMagick.
//       return exec(`convert "${tempLocalFile}" "${tempLocalJPEGFile}"`).then(() => {
//         console.log('JPEG image created at', tempLocalJPEGFile);
//         // Uploading the JPEG image.
//         return bucket.upload(tempLocalJPEGFile, {
//           destination: JPEGFilePath
//         }).then(() => {
//           console.log('JPEG image uploaded to Storage at', filePath);
//         });
//       });
//     });
//   });
// });