'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ans: 'yes'}, onUserResponse)
$('.btn-no').click({ans: 'no'}, onUserResponse)
$('.btn-add-guess').click(onAddGuess)

function init() {
  createQuestsTree()
}


function onStartGuessing() {
  //hide the game-start section
  $('.btn-start').hide()
  $('.game-start h2').text('')
  

  renderQuest()
  // show the quest section
$('.quest').css("display","block")

}

function renderQuest() {
  //select the <h2> inside quest and update
  // its text by the currQuest text
  $('.quest h2').text(getCurrQuest().txt)
}

function onUserResponse(ev) {
  console.log('ev', ev)
  var res = ev.data.ans
  // If this node has no children
  console.log(getCurrQuest());
  console.log(isChildless(getCurrQuest()));
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!')
      onRestartGame()
      // TODO: improve UX
    } else {
      alert('I dont know...teach me!')
      //hide and show new-quest section
      $('.quest').css("display","none")
      $('.new-quest').css("display","block")
    }
  } else {
    // update the lastRes global var
    gLastRes = ev.data.ans

    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()

  // TODO: Get the inputs' values
  // TODO: Call the service addGuess
  addGuess(newQuest, newGuess,gLastRes)
  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').css("display","none")
  $('.quest').css("display","none")
  $('.game-start').show()
  $('.btn-start').show()
  $('.game-start h2').text('Think of Someone...')
  gLastRes = null
  createQuestsTree()
}

