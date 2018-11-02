let Game = {
    deck: null,
    players: {},
    playersTurn: null,
    turnDirection: 1,
    topCard: null,
    topCardColor: null,
    topCardValue: null
}

 let playableCards = [ ]

function makeNewCards(){
    const cards = [
        'red_0',
        'red_1', 'red_2', 'red_3', 'red_4', 'red_5', 'red_6', 'red_7', 'red_8', 'red_9',
        'red_1', 'red_2', 'red_3', 'red_4', 'red_5', 'red_6', 'red_7', 'red_8', 'red_9',
        'red_skip', 'red_reverse', 'red_draw_two',
        'red_skip', 'red_reverse', 'red_draw_two',
        
        'green_0',
        'green_1', 'green_2', 'green_3', 'green_4', 'green_5', 'green_6', 'green_7', 'green_8', 'green_9',
        'green_1', 'green_2', 'green_3', 'green_4', 'green_5', 'green_6', 'green_7', 'green_8', 'green_9',
        'green_skip', 'green_reverse', 'green_draw_two',
        'green_skip', 'green_reverse', 'green_draw_two',
        
        'blue_0',
        'blue_1', 'blue_2', 'blue_3', 'blue_4', 'blue_5', 'blue_6', 'blue_7', 'blue_8', 'blue_9',
        'blue_1', 'blue_2', 'blue_3', 'blue_4', 'blue_5', 'blue_6', 'blue_7', 'blue_8', 'blue_9',
        'blue_skip', 'blue_reverse', 'blue_draw_two',
        'blue_skip', 'blue_reverse', 'blue_draw_two',
        
        'yellow_0',
        'yellow_1', 'yellow_2', 'yellow_3', 'yellow_4', 'yellow_5', 'yellow_6', 'yellow_7', 'yellow_8', 'yellow_9',
        'yellow_1', 'yellow_2', 'yellow_3', 'yellow_4', 'yellow_5', 'yellow_6', 'yellow_7', 'yellow_8', 'yellow_9',
        'yellow_skip', 'yellow_reverse', 'yellow_draw_two',
        'yellow_skip', 'yellow_reverse', 'yellow_draw_two',
        
        'wild_draw_four','wild_draw_four', 'wild', 'wild',
        'wild_draw_four','wild_draw_four', 'wild', 'wild',
    ]    
    
    return cards
}



// create a function that takes an array of cards 
// and returns a new array of shuffled cards
function shuffle( cards ){
    // create an array to hold the shuffled cards
    const deck = [ ]
    // algorithm to shuffle a deck of cards
    // as long as there are cards in the cards array
    while (cards.length > 0) {
        // pick a random number between 0 and the length of the cards array
        let randomNumber = Math.floor(Math.random() * cards.length)
        // then use that number to pick a card
        let card = cards[randomNumber]
        // console.log('card is '+card)
        // push that card onto the new deck
        deck.push(card)
        // remove the card from the original deck
        cards.splice(randomNumber, 1)        
    }
    return deck
}

function dealCard(deck){
    return deck.shift()
}

function startNewGame(){
    //create a new set of cards
    let cards = makeNewCards()
    //shuffle those cards
    let deck = shuffle(cards)
    //attach them to the Game object
    Game.deck = deck
    
    
    // add up to 4 players to the game object
    const playerNames = ["Ale", "Lucy", "Victor", "Jose"]
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    for (let i = 0; i < playerNames.length; i++){
        let name = playerNames[i]
        let id = alphabet[i]
        let player = createNewPlayer(name, id)
        Game.players[id] = player
        
    }
    
    //flip the top card on the page to start the game
    let discard = dealCard(Game.deck)
    while(getCardColor(discard) == 'wild' || getCardValue(discard) == 'reverse' || getCardValue(discard) == 'skip' || getCardValue(discard) == 'draw_two'){
        Game.deck.push(discard)
        discard = dealCard(Game.deck)
    }
    Game.topCard = discard
    Game.topCardColor = getCardColor(discard)
    Game.topCardValue = getCardValue(discard)
    let topCard = document.querySelector('#deck')
    topCard.setAttribute('src', 'images/'+discard+'.png')
    
    Game.playersTurn = 'A'
    
    showGameObject()
}
function createNewPlayer(name, id){
    //every player has to have a name:
    //cards:
    //points:
    let player = {
        name: name,
        points: 0,
        cards: [ ],
        id: id
    }
    for(let i = 0; i < 7; i++){
        let card = dealCard(Game.deck)
        player.cards.push(card)
    }
    return player
} 
function showGameObject(){
    var codeSection = document.querySelector('#game-object')
    codeSection.innerHTML  = JSON.stringify(Game, null, 2)
}

function getCardColor( cardname ){
    const splitCard = cardname.split("_")
    const color = splitCard[0]
    return color
}

function getCardValue( cardname ){
    const splitCard = cardname.split("_")
    let val = splitCard[1]
    if(splitCard.length == 3){
        val += "_" + splitCard[2]
    }
    return val
}

function changePlayerTurn(){
//   const ALPHABET = ['A', 'B', 'C', "D", "E", "F", "G", "H", "I", "J"]
 let ALPHABET = Object.keys(Game.players)
 const currentPlayerId = Game.playersTurn
 const currentDirection = Game.turnDirection
 const idx = ALPHABET.indexOf(currentPlayerId)
 let newIdx = idx + currentDirection
 if (newIdx < 0){
     newIdx = ALPHABET.length - 1
   //   var keys = Object.keys(Game.players)
 }
 if(newIdx >= ALPHABET.length){
     newIdx = 0
 }
  const newPlayersTurn = ALPHABET[newIdx]
  Game.playersTurn = newPlayersTurn
  showGameObject()
}
function playCard(playerId, cardName){
    let color = getCardColor(cardName)
    let val = getCardValue(cardName)
    // let isCardPlayable = cardIsPlayable(color, val)
}
function reversePlayerTurn(){
    Game.turnDirection *= -1
}
function skipTurn(){
    changePlayerTurn()
}
function playerDrawCard(){
    let card = dealCard(Game.deck)
    let playerId = Game.playersTurn
    Game.players[playerId].cards.push(card)
    showGameObject()
}
function playerDrawTwo(){
    changePlayerTurn()
    playerDrawCard()
    playerDrawCard()
    showGameObject()
}
function playerDrawFour(){
    changePlayerTurn()
    playerDrawCard()
    playerDrawCard()
    playerDrawCard()
    playerDrawCard()
    showGameObject()
}
function playWildCard(cardName){
    let col = getCardColor(cardName)
    let val = getCardValue(cardName)
    if (col == 'wild'){
       Game.topCardColor = prompt("Choose a color")
       Game.topCard = 'wild'
       Game.topCardValue = null
    }
    if ( val == 'draw_four' ){
        Game.topCardValue = 'draw_four'
        Game.topCard = 'wild_draw_four'
        changePlayerTurn()
        playerDrawCard()
        playerDrawCard()
        playerDrawCard()
        playerDrawCard()
        showGameObject()
    }
    if ( val == null ){
        changePlayerTurn()
    }
    let topCard = document.querySelector('#deck')
    topCard.setAttribute('src', 'images/'+Game.topCard+'.png')
    showGameObject()
}
function isCardPlayable(){
    let player = Game.playersTurn
    for(var i = 0; i < Game.players[player].cards.length; i++){
        if(getCardColor(Game.players[player].cards[i]) == Game.topCardColor || getCardValue(Game.players[player].cards[i]) == Game.topCardValue || getCardColor(Game.players[player].cards[i]) == 'wild'){
            console.log(Game.players[player].cards[i] + " is playable")
            playableCards.push(Game.players[player].cards[i])
        }
    }
    console.log(playableCards)
}
function playCard(){
    let player = Game.playersTurn
    isCardPlayable()
    if(playableCards.length < 1){
        alert("No card is playable so you will draw a card until you get one you can play")
        playerDrawCard()
        playCard()
    }
    if(playableCards.length >= 1){
    let cardPlayed = prompt("You can play one these cards "+playableCards)
    Game.topCard = cardPlayed
    Game.topCardColor = getCardColor(Game.topCard)
    Game.topCardValue = getCardValue(Game.topCard)
    let topCard = document.querySelector('#deck')
    topCard.setAttribute('src', 'images/'+Game.topCard+'.png')
    let cardPlayedLoc = Game.players[player].cards.indexOf(cardPlayed)
    Game.players[player].cards.splice(cardPlayedLoc, 1)
    changePlayerTurn()
    }
    playableCards = [ ]
    showGameObject()
}