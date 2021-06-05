const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      button.addEventListener('click', () => changeBackground(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

function changeBackground(option) {
  const image = document.getElementById('image')
  const nextTextNodeId = option.nextText
  if(nextTextNodeId == 12) {
    image.setAttribute('src', 'music_room.png')
  } else{
    image.setAttribute('src', 'among-hd.jpg')
  }
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up in a basement.',
    options: [
      {
        text: 'Go back to sleep',
        setState: { sleep: true },
        nextText: 2
      },
      {
        text: 'Go upstairs',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'You woke up refreshed.',
    options: [
      {
        text: 'Go upstairs',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'You have reached the First Floor.',
    options: [
      {
        text: 'Go left',
        nextText: 4
      },
      {
        text: 'Go right',
        nextText: 5
      },
      {
        text: 'Go upstairs',
        requiredState: (currentState) => currentState.visitedLeft && currentState.visitedRight,
        setState: { visitedLeft: false, visitedRight: false },
        nextText: 22
      }
    ]
  },
  {
    id: 4,
    text: 'You bump into a red bean with a worried expression. What will you do?',
    options: [
      {
        text: 'Talk to them',
        nextText: 6
      },
      {
        text: 'Keep going',
        nextText: 9
      }
    ]
  },
  {
    id: 5,
    text: 'You trip over something. Looks like a wooden box. What will you do?',
    options: [
      {
        text: 'Pick it up',
        setState: { box: true },
        nextText: 7
      },
      {
        text: 'Keep going',
        setState: { box: false },
        nextText: 7
      }
    ]
  },
  {
    id: 6,
    text: 'Red: Oh! I\'m so sorry, I didn\'t see you there! The truth is...I\'ve lost something important and this place is so big, I don\'t know if I\'ll ever find it on my own. Would you help me out?',
    options: [
      {
        text: 'Agree to help red',
        nextText: 8
      },
      {
        text: 'Mama said not to talk to strangers. Keep moving',
        nextText: 9
      }
    ]
  },
  {
    id: 7,
    text: 'A yellow bean peeks out at you from behind a wall. What will you do?',
    options: [
      {
        text: 'Make conversation',
        nextText: 10
      },
      {
        text: 'Move on ahead without making eye contact',
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Red: Oh! Thank you so much! The thing I lost is a...um...plushy, actually. You know, this is going to sound funny but I think it looks a bit like you. Anyway, I really appreciate your help. Please help me find it, it\'s my treasure!',
    options: [
      {
        text: 'You promise to keep an eye out for it',
        setState: { plushQuest: true },
        nextText: 9
      }
    ]
  },
  {
    id: 9,
    text: 'You reach the end of the corridor. There are two doors in front of you.',
    options: [
      {
        text: 'Open the pink door',
        nextText: 12
      },
      {
        text: 'Open the blue door',
        nextText: 13
      }
    ]
  },
  {
    id: 10,
    text: 'Yellow: Heyooo you must be new here lol, anywayyy Imma prolly swing by the game area later. Woah, you got some strong eyebrows there buddy, take it easy hehe...say, if you wanna join us, just use this keycard at the yellow door. Laterzzz',
    options: [
      {
        text: 'Pocket the keycard and keep going',
        setState: { yellowCard: true },
        nextText: 11
      }
    ]
  },
  {
    id: 11,
    text: 'You reach the end of the corridor. There are two doors in front of you.',
    options: [
      {
        text: 'Open the red door',
        setState: { catPic: true },
        nextText: 14
      },
      {
        text: 'Open the black door',
        nextText: 15
      }
    ]
  },
  {
    id: 12,
    text: 'A cozy room greets you. The ambience is comforting.',
    options: [
      {
        text: 'Pick up the plushy',
        requiredState: (currentState) => currentState.plushQuest,
        setState: { plushQuest: false, plushRetrieved: true },
        nextText: 12
      },
      {
        text: 'Listen to some music',
        nextText: 16
      }
    ]
  },
  {
    id: 13,
    text: 'Looks like a...bar? (Really, in the middle of this random house?) You spot the blue bartender bean.',
    options: [
      {
        text: 'They look friendly. Take a seat at the counter',
        nextText: 17
      },
      {
        text: 'Drinking isn\'t really your thing...you should probably go',
        setState: { visitedLeft: true },
        nextText: 3
      }
    ]
  },
  {
    id: 14,
    text: 'An art gallery!',
    options: [
      {
        text: 'Look behind the cat painting',
        requiredState: (currentState) => currentState.catPic,
        nextText: 18
      },
      {
        text: 'Donate $5?',
        setState: { artDonation: true, visitedRight: true },
        nextText: 3
      },
      {
        text: 'Go back',
        setState: { visitedRight: true },
        nextText: 3
      }
    ]
  },
  {
    id: 15,
    text: 'A seedy looking bean leers at you as soon as you enter.',
    options: [
      {
        text: 'Say \'Sup\'',
        nextText: 19
      },
      {
        text: 'Yeet the hell out of there',
        setState: { visitedRight: true },
        nextText: 3
      }
    ]
  },
  {
    id: 16,
    text: 'A soothing melody plays in the background. You sink into the armchair, entranced.',
    options: [
      {
        text: 'Return',
        setState: { visitedLeft: true },
        nextText: 3
      }
    ]
  },
  {
    id: 17,
    text: 'Blue: Well, well, well, let\'s see some ID \'ere eh? Oh what\'s that? You don\' wanna drink? Now that\'s jus\' silly. Get o\'er \'ere! Let ol\' blue fix ya up, sonny.',
    options: [
      {
        text: 'Ask blue about the house',
        nextText: 20
      }
    ]
  },
  {
    id: 18,
    text: 'A white keycard fell out!',
    options: [
      {
        text: 'Pocket it',
        setState: { whiteCard: true, catPic: false },
        nextText: 14
      }
    ]
  },
  {
    id: 19,
    text: 'Green: Hey there pal, don\'t be shy! Come on in...closer...you got a lucky vibe aboutcha, ya know? I think you\'re just the guy to test out my new slot machine. Whaddya say? Take her for a spin, why don\'tcha!',
    options: [
      {
        text: 'Gamble away',
        nextText: 21
      },
      {
        text: 'You like your money in your wallet, thanks. Pass',
        setState: { visitedRight: true },
        nextText: 3
      }
    ]
  },
  {
    id: 20,
    text: 'Blue: This place? Well, I\'ve been \'ere as long as I can remember. Folks tend to come \'n go but our missus, she as loyal as they come. Sure she\'d love to meet you, ol\' frien\'! If you can find her that is gahahaha!',
    options: [
      {
        text: 'Tip Ol\' Blue and thank him for his time',
        setState: { tippedBlue: true, visitedLeft: true },
        nextText: 3
      },
      {
        text: 'Down your glass and slip out the door',
        setState: { visitedLeft: true },
        nextText: 3
      }
    ]
  },
  {
    id: 21,
    text: 'You play to your heart\'s content. Ready to leave?',
    options: [
      {
        text: 'Grab your earnings and head on out',
        setState: { gambled: true, visitedRight: true },
        nextText: 3
      },
      {
        text: 'Just one more time!',
        nextText: 21
      }
    ]
  },
  {
    id: 22,
    text: 'You have reached the Second Floor.',
    options: [
      {
        text: 'Go left',
        nextText: 23
      },
      {
        text: 'Go right',
        nextText: 24
      },
      {
        text: 'Go upstairs',
        requiredState: (currentState) => currentState.visitedLeft && currentState.visitedRight,
        nextText: 30
      }
    ]
  },
  {
    id: 23,
    text: 'You\'re in the game area!',
    options: [
      {
        text: 'Open the Orange door',
        nextText: 25
      },
      {
        text: 'Open the Yellow door',
        nextText: 26
      }
    ]
  },
  {
    id: 24,
    text: 'Seems like a theater room. Make yourself at home?',
    options: [
      {
        text: 'Fun! Where\'s the popcorn?',
        nextText: 27
      },
      {
        text: 'Eh, you\'re not really into movies',
        setState: { visitedRight: true },
        nextText: 22
      }
    ]
  },
  {
    id: 25,
    text: 'A group of beans are playing Codies.',
    options: [
      {
        text: 'Join them',
        nextText: 28
      },
      {
        text: 'Poach one',
        setState: { visitedLeft: true },
        nextText: 22
      }
    ]
  },
  {
    id: 26,
    text: 'The door is locked.',
    options: [
      {
        text: 'Use the yellow keycard',
        requiredState: (currentState) => currentState.yellowCard,
        nextText: 29
      },
      {
        text: 'Return',
        setState: { visitedLeft: true },
        nextText: 22
      }
    ]
  },
  {
    id: 27,
    text: 'You got a free drink! Thanks for watching!',
    options: [
      {
        text: 'Bravo! Donate $5',
        setState: { movieDonation: true, freeDrink: true, visitedRight: true  },
        nextText: 22
      },
      {
        text: 'This is why you don\'t watch sequels...',
        setState: { freeDrink: true, visitedRight: true  },
        nextText: 22
      }
    ]
  },
  {
    id: 28,
    text: 'Purple: Hi there! Would you like to play with us? We\'d love to have you! Come on in!',
    options: [
      {
        text: 'Play Codies',
        setState: { codies: true, visitedLeft: true },
        nextText: 22
      }
    ]
  },
  {
    id: 29,
    text: 'Yellow: Yooo you made it! We\'ve been playing like I dunno maybe 20 hours now lolol...join us!',
    options: [
      {
        text: 'Play Valheim with Yellow and co',
        setState: { valheim: true, visitedLeft: true },
        nextText: 22
      },
      {
        text: 'On second thought...you decide not to get sucked in',
        setState: { visitedLeft: true },
        nextText: 22
      }
    ]
  },
  {
    id: 30,
    text: 'You reached the attic!',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  }
]

startGame()