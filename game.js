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
        requiredState: (currentState) => currentState.visitedLeft,
        nextText: 24
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
        nextText: 8
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
        text: 'Keep going',
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
    text: 'Yellow: Heyooo you must be new here lol, anywayyy Imma prolly swing by the game area later. You got some strong eyebrows there buddy, you deffo look like the competitive type hehe...say, if you wanna join us, just use this keycard at the yellow door. Laterzzz',
    options: [
      {
        text: 'Keep going',
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
        text: 'Ask them about this place',
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
        nextText: 24
      },
      {
        text: 'Go back',
        nextText: 24
      }
    ]
  },
  {
    id: 15,
    text: 'A seedy looking bean leers at you as soon as you enter.',
    options: [
      {
        text: 'Say \'Sup\'',
        nextText: 24
      },
      {
        text: 'Yeet the hell out of there',
        nextText: 24
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
    text: 'Blue: Well, well, well, let\'s see some ID \'ere. eh? Oh what\'s that? You don\'t wanna drink? Now that\'s jus\' silly. Get o\'er \'ere! Let ol\' blue fix ya up, mister.',
    options: [
      {
        text: 'Ask blue about the house',
        nextText: 24
      }
    ]
  },
  {
    id: 24,
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