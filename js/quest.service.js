'use strict'

const STORAGE_KEY = 'questDB'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null


function createQuestsTree() {
  var quests = loadFromStorage(STORAGE_KEY)
  if (!quests) {
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')

    gCurrQuest = gQuestsTree
    gPrevQuest = null
  }
  else {
    gQuestsTree = quests
    gCurrQuest = gQuestsTree
  }

}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }

}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  //update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest
  gCurrQuest = (res === 'yes') ? gPrevQuest.yes : gPrevQuest.no
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree
  const quest = createQuest(newQuestTxt + '?')
  quest.yes = createQuest(newGuessTxt + '?')
  quest.no = gPrevQuest[lastRes]
  gPrevQuest[lastRes] = quest
  saveToStorage(STORAGE_KEY, gQuestsTree)
}

function getCurrQuest() {
  return gCurrQuest
}
