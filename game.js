const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}
var sleepCounter = 2

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
  const audio = document.getElementById('audio')
  const video = document.getElementById('video')
  if(nextTextNodeId <= 0 || nextTextNodeId == 2) {
    image.setAttribute('src', 'assets/stock_basement.jpg')
  } else if(nextTextNodeId == 3) {
    image.setAttribute('src', 'assets/foyer.png')
    audio.pause()
    audio.currentTime = 0
  } else if(nextTextNodeId == 12) {
    image.setAttribute('src', 'assets/music_room.png')
  } else if(nextTextNodeId == 13 || nextTextNodeId == 17 || nextTextNodeId == 20) {
    image.setAttribute('src', 'assets/stock_bar.jpg')
  } else if(nextTextNodeId == 14) {
    image.setAttribute('src', 'assets/sammich.png')
  } else if(nextTextNodeId == 15 || nextTextNodeId == 19 || nextTextNodeId == 21) {
    image.setAttribute('src', 'assets/stock_casino.jpg')
  } else if(nextTextNodeId == 16) {
    audio.play()
  } else if(nextTextNodeId == 18) {
    image.setAttribute('src', 'assets/music_room_no_plush.png')
  } else if(nextTextNodeId == 21 && option.text == 'Just one more time!') {
    alert("You might have a problem...")
  } else if(nextTextNodeId == 22) {
    image.setAttribute('src', 'assets/foyer.png')
    video.style.display = 'none'
    image.style.display = 'block'
    video.pause()
  } else if(nextTextNodeId == 24) {
    image.setAttribute('src', 'assets/stock_movie_theater.png')
  } else if(nextTextNodeId == 25 || nextTextNodeId == 28 || nextTextNodeId == 29) {
    image.setAttribute('src', 'assets/stock_gaming_room.jpg')
  } else if(nextTextNodeId == 27) {
    video.style.display = 'block'
    image.style.display = 'none'
  } else if(nextTextNodeId >= 30 && nextTextNodeId <=33 || nextTextNodeId == 35 || nextTextNodeId >= 41 && nextTextNodeId <= 55) {
    image.setAttribute('src', 'assets/stock_attic.jpg')
  } else if(nextTextNodeId == 34) {
    image.setAttribute('src', 'assets/stock_open_door.jpg')
  } else{
    image.setAttribute('src', 'assets/stock_doors.jpg')
  }
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up in a basement.',
    options: [
      {
        text: 'Go back to sleep',
        nextText: 2
      },
      {
        text: 'Go upstairs',
        setState: { meetRed: true, meetYellow: true, meetWhite: true },
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'You woke up refreshed. You noticed $20 on the floor nearby. Score!',
    options: [
      {
        text: 'Go upstairs',
        setState: { money:true, meetRed: true, meetYellow: true, meetWhite: true },
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
        requiredState: (currentState) => currentState.meetYellow,
        nextText: 5
      },
      {
        text: 'Go right',
        requiredState: (currentState) => currentState.yellowCard,
        nextText: 11
      },
      {
        text: 'Go upstairs',
        requiredState: (currentState) => currentState.visitedLeft && currentState.visitedRight || currentState.partyQuest,
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
        requiredState: (currentState) => currentState.meetRed,
        nextText: 6
      },
      {
        text: 'Ask Red to join the party',
        requiredState: (currentState) => currentState.partyQuest && currentState.noRed,
        nextText: 36
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
        setState: { meetRed: false },
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
        requiredState: (currentState) => currentState.meetRed || currentState.plushQuest,
        nextText: 12
      },
      {
        text: 'Open the pink door',
        requiredState: (currentState) => currentState.plushRetrieved,
        nextText: 18
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
        setState: { yellowCard: true, meetYellow: false },
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
        setState: { plushQuest: false, plushRetrieved: true, meetRed: false },
        nextText: 18
      },
      {
        text: 'Listen to some music',
        nextText: 16
      },
      {
        text: 'Return',
        setState: { visitedLeft: true },
        nextText: 3
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
        text: 'Donate $5?',
        requiredState: (currentState) => currentState.money,
        setState: { money: false, artDonation: true, visitedRight: true },
        nextText: 14
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
      },
      {
        text: 'Ask Blue to join the party',
        requiredState: (currentState) => currentState.partyQuest && currentState.noBlue,
        nextText: 38
      }
    ]
  },
  {
    id: 18,
    text: 'A cozy room greets you. The ambience is comforting.',
    options: [
      {
        text: 'Listen to some music',
        nextText: 16
      },
      {
        text: 'Return',
        setState: { visitedLeft: true },
        nextText: 3
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
      },
      {
        text: 'Ask Green to join the party',
        requiredState: (currentState) => currentState.partyQuest && currentState.noGreen,
        nextText: 37
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
        setState: { visitedRight: true },
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
        requiredState: (currentState) => currentState.visitedLeft && currentState.visitedRight && currentState.meetWhite,
        setState: { visitedLeft: false, visitedRight: false },
        nextText: 30
      },
      {
        text: 'Head back to the Attic',
        requiredState: (currentState) => currentState.partyQuest,
        nextText: 41
      },
      {
        text: 'Go downstairs',
        requiredState: (currentState) => currentState.partyQuest,
        nextText: 3
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
      },
      {
        text: 'Go back',
        nextText: 22
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
        setState: { movieDonation: true, visitedRight: true  },
        nextText: 22
      },
      {
        text: 'This is why you don\'t watch sequels...',
        setState: { visitedRight: true  },
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
      },
      {
        text: 'Ask Purple and friends to join the party',
        requiredState: (currentState) => currentState.partyQuest && currentState.noPurple,
        nextText: 39
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
      },
      {
        text: 'Ask Yellow and friends to join the party',
        requiredState: (currentState) => currentState.partyQuest && currentState.noYellow,
        nextText: 40
      }
    ]
  },
  {
    id: 30,
    text: 'Looks like you\'ve reached the attic. You hear a sniffling noise.',
    options: [
      {
        text: 'Investigate',
        nextText: 31
      },
      {
        text: 'Leave',
        nextText: 32
      }
    ]
  },
  {
    id: 31,
    text: 'White: Oh...I didn\'t see you there. I hope you\'ve been...sniff...enjoying yourself. Forgive me, I\'m not great with names, but please make yourself at home.',
    options: [
      {
        text: 'Ask them what\'s wrong',
        nextText: 33
      },
      {
        text: 'Nod and leave them to their devices',
        nextText: 32
      }
    ]
  },
  {
    id: 32,
    text: 'You are leaving for good. Are you sure?',
    options: [
      {
        text: 'Yes, this isn\'t your problem',
        nextText: 34
      },
      {
        text: 'No, go back to White',
        nextText: 33
      }
    ]
  },
  {
    id: 33,
    text: 'White: It\'s nothing, really...just, well, I made a bunch of matching hats and I wanted to wear them with everyone today. But I don\'t want to bother anyone, they\'re all busy having fun, which is what I wanted, of course. It\'s probably a silly idea anyway.',
    options: [
      {
        text: 'Help out White',
        setState: { partyQuest: true, meetWhite: false, noRed: true, noGreen: true, noBlue: true, noPurple: true, noYellow: true },
        nextText: 35
      },
      {
        text: 'Are you really cold enough to leave her? Really? Well, it\'s your choice',
        nextText: 32
      }
    ]
  },
  {
    id: 34,
    text: 'Goodbye!',
    options: [
      {
        text: 'Try Again?',
        nextText: -1
      }
    ]
  },
  {
    id: 35,
    text: 'Are you ready to go back?',
    options: [
      {
        text: 'Go downstairs',
        nextText: 22
      }
    ]
  },
  {
    id: 36,
    text: 'Red: R-Really? You\'d like me to come? Oh...well, okay.',
    options: [
      {
        text: 'Return',
        setState: { invitedRed: true, noRed: false },
        nextText: 9
      }
    ]
  },
  {
    id: 37,
    text: 'Green: A party, eh? Well that seems like a good place to stea- I mean, find some more...ahem...clients.',
    options: [
      {
        text: 'Return',
        setState: { invitedGreen: true, noGreen: false },
        nextText: 3
      }
    ]
  },  
  {
    id: 38,
    text: 'Blue: Ya really wan\' this ol\' geezer around? I don\' wanna spoil you younguns\' fun...gahahaha well if ya insist then!',
    options: [
      {
        text: 'Return',
        setState: { invitedBlue: true, noBlue: false },
        nextText: 3
      }
    ]
  },  
  {
    id: 39,
    text: 'Purple: Oh my! A party? That sounds so exciting! I would LOVE to! Aren\'t you a sweetheart?',
    options: [
      {
        text: 'Return',
        setState: { invitedPurple: true, noPurple: false },
        nextText: 23
      }
    ]
  },  
  {
    id: 40,
    text: 'Yellow: Yea yea yea jus gimme like fiiiive more minutes, I swear I\'m done...I\'ll be there dude! Chill out lol',
    options: [
      {
        text: 'Return',
        setState: { invitedYellow: true, noYellow: false },
        nextText: 23
      }
    ]
  },  
  {
    id: 41,
    text: 'You\'re back in the Attic!',
    options: [
      {
        text: 'Go meet White',
        nextText: 42
      },
      {
        text: 'Go back downstairs',
        nextText: 22
      }
    ]
  },  
  {
    id: 42,
    text: 'White: Oh...it\'s you again. Are you leaving?',
    options: [
      {
        text: 'No! Look who else is here...',
        requiredState: (currentState) => currentState.invitedBlue || currentState.invitedGreen || currentState.invitedPurple || currentState.invitedYellow || currentState.invitedRed,
        nextText: 44
      },
      {
        text: 'Yup, gotta bounce',
        nextText: 43
      },
      {
        text: 'Not yet!',
        nextText: 41
      }
    ]
  },  
  {
    id: 43,
    text: 'White: Well...thanks for showing up. Maybe, we might meet again someday. Farewell.',
    options: [
      {
        text: 'Sayonara!',
        nextText: 34
      }
    ]
  },  
  {
    id: 44,
    text: 'White: Oh wow! You really brought them here! For me!',
    options: [
      {
        text: 'Let\'s put on the hats',
        nextText: 45
      }
    ]
  },     
  {
    id: 45,
    text: 'You wear the hats and hang out with everyone',
    options: [
      {
        text: 'Talk to Red',
        requiredState: (currentState) => currentState.invitedRed,
        nextText: 46
      },
      {
        text: 'Talk to Yellow',
        requiredState: (currentState) => currentState.invitedYellow,
        nextText: 48
      },
      {
        text: 'Talk to Green',
        requiredState: (currentState) => currentState.invitedGreen,
        nextText: 49
      },
      {
        text: 'Talk to Purple',
        requiredState: (currentState) => currentState.invitedPurple,
        nextText: 51
      },
      {
        text: 'Talk to Blue',
        requiredState: (currentState) => currentState.invitedBlue,
        nextText: 52
      },
      {
        text: 'Talk to White',
        nextText: 53
      }
    ]
  },
  {
    id: 46,
    text: 'Red: I\'m not really one for big gatherings, to be honest...but this is kinda nice',
    options: [
      {
        text: 'I have something of yours',
        requiredState: (currentState) => currentState.plushRetrieved,
        nextText: 47
      },
      {
        text: 'We should hang out more!',
        nextText: 45
      }
    ]
  },
  {
    id: 47,
    text: 'Red: You found my plushy! Thank you so much! I\'ve missed him!',
    options: [
      {
        text: 'No problem!',
        nextText: 45
      }
    ]
  },
  {
    id: 48,
    text: 'Yellow: Yooo you should totally come play with us more...have you heard of this one game called \'Among Them\' or something like that...I think you\'d be great at it hehe',
    options: [
      {
        text: 'Are you sure that\'s what it\'s called...?',
        nextText: 45
      }
    ]
  },
  {
    id: 49,
    text: 'Green: What? I have a life outside of that room, ya know!',
    options: [
      {
        text: 'Fiddle with the box',
        requiredState: (currentState) => currentState.box,
        nextText: 50
      },
      {
        text: 'Okaaaaay...',
        nextText: 45
      }
    ]
  },
  {
    id: 50,
    text: 'Green: Hey! That looks like my box of stole- I mean, thanks for findin\' it champ! I owe ya one, ya know?',
    options: [
      {
        text: 'Here you go',
        nextText: 45
      }
    ]
  },
  {
    id: 51,
    text: 'Purple: It was so sweet of you to draw White out of her shell like that. She could use some more socializing, even though this is her house!',
    options: [
      {
        text: 'Glad to have helped',
        nextText: 45
      }
    ]
  },
  {
    id: 52,
    text: 'Blue: Well I\'ll be darned if I don\' feel jus\' 40 \'ears younger around y\'all! Gahahahaha!',
    options: [
      {
        text: 'Maybe Blue has had enough to drink...',
        nextText: 45
      }
    ]
  },
  {
    id: 53,
    text: 'White: Thank you, thank you so much! I\'m having so much fun! Although I feel like it would be even more fun to do this on someone\'s birthday sometime haha...',
    options: [
      {
        text: 'Actually...it is mine',
        nextText: 54
      }
    ]
  },
  {
    id: 54,
    text: 'White: Oh my God! That\'s wonderful! HAPPY BIRTHDAY TO YOU! We are so happy to have you here with us! Now, let\'s go celebrate! :D',
    options: [
      {
        text: 'Celebrate :)',
        nextText: 55
      }
    ]
  },
  {
    id: 55,
    text: 'Thank you for playing with us, PINK! We love you and hope you have an awesome birthday!!',
    options: [
      {
        text: 'Start over?',
        nextText: -1
      }
    ]
  }
]

startGame()