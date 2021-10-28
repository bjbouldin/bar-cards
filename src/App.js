import React, {Component} from 'react';

import './App.css';
import Player from './Components/Player/Player';
import GameControls from './Components/GameControls/GameControls';
import Deck from './Components/Deck/Deck';
import Aux from './hoc/Aux';
import Hand from "./Components/Hand/Hand";

class App extends Component {

    state = {
        turn: 0,
        deck: [],
        discard: [],
        playedHand: [[]],
        gameSettings: {
            game: 'war',
            houseRules: [],
            drinkingRules: [],
            cardStyle: 'casino',
        },
        gameStarted: false,
        players: [],
        rules: {
            cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
            minPlayers: 2,
            maxPlayers: 2,
            suitValues: {
                0: 'spades',
                1: 'clubs',
                2: 'diamonds',
                3: 'hearts',
            },
            highCard: 0,
            handSize: 5,
            faceDown: false,
            canPass: true,
            minCardPlay: 1,
            maxCardPlay: 13,
        }
    }

    componentDidMount() {
        this.shuffleDeckHandler();
    }

    sortCards = (hand) => {
        hand.sort((a, b) => {
            return a.value - b.value;
        });
    }

    getCard = (deck) => {
        const suitValues = {...this.state.rules.suitValues}
        const randCardIndex = Math.floor(Math.random() * deck.length);
        if (deck[randCardIndex]) {
            const randCard = deck[randCardIndex];
            const number = Math.floor(randCard / 10);
            let displayNumber = number;
            if (displayNumber === 11) {
                displayNumber = 'J';
            } else if (displayNumber === 12) {
                displayNumber = 'Q';
            } else if (displayNumber === 13) {
                displayNumber = 'K';
            }

            let value = randCard;
            //add function for value modifiers
            if (displayNumber <= this.state.rules.highCard) {
                value += 130;
            }

            const newCard = {
                displayNumber: displayNumber,
                number: number,
                value: value,
                suit: suitValues[(randCard % 10)],
                selected: false,
            }
            deck.splice(randCardIndex, 1);
            return newCard;
        } else {
            //just in case we cant find the card try again
            return this.getCard(deck)
        }
    }

    shuffleDeckHandler = (deal) => {
        let deck = [];
        const suitValues = {...this.state.rules.suitValues};
        Object.keys(suitValues).forEach((suitNumber) => {
            const suitCards = this.state.rules.cards.map(card => {
                return Number(suitNumber) + card * 10;
            })
            deck.push(...suitCards);
        })
        if (deal){
            this.setState({deck: deck}, this.dealHandler);
        } else {
            this.setState({deck: deck});
        }
    }

    dealHandler = () => {
        const deck = [...this.state.deck]
        let players = [...this.state.players];
        players.map((player, playerIndex) => {
            if (playerIndex + 1 <= this.state.rules.maxPlayers) {
                let hand = [];
                for (let i = 0; i < this.state.rules.handSize; i++) {
                    hand.push(this.getCard(deck));
                }
                players[playerIndex].hand = [...hand]
                if (players[playerIndex].settings.autoSort) {
                    this.sortCards(players[playerIndex].hand)
                }
            }
        });
        this.setState({deck: deck});
        this.setState({players: players});
    }

    drawCardHandler = () => {
        const deck = [...this.state.deck];
        if (!deck || deck.length === 0) return;

        let turn = this.state.turn;
        let players = [...this.state.players];
        let playerIndex = turn;
        if (turn >= players.length) {
            playerIndex = this.state.players.findIndex((player, index) => {
                return (turn % players.length === index);
            });
        }
        players[playerIndex].hand.push(this.getCard(deck));
        players[playerIndex].drawCount++;

        this.setState({deck: deck});
        if (players[playerIndex].settings.autoSort){
            this.sortCardsHandler(playerIndex)
        } else {
            this.setState({players: players});
        }
    }

    shuffleDiscardHandler = () => {
        console.log('shuffle')
    }

    newGameHandler = () => {
        if (this.state.players.length < this.state.rules.minPlayers) {
            return;
        }
        this.shuffleDeckHandler(true);
        this.setState({gameStarted: true});
    }

    endGameHandler = () => {
        let players = [...this.state.players];
        players.map((player, playerIndex) => {
            players[playerIndex].hand = [];
            players[playerIndex].played = false;
            players[playerIndex].drawCount = 0;
        });

        this.shuffleDeckHandler();
        this.setState({playedHand: [[]]});
        this.setState({players: players});
        this.setState({gameStarted: false});
    }

    newPlayerHandler = () => {
        const players = [...this.state.players];
        const playerId = Math.floor(Math.random() * 10000)
        const newPlayer = {
            id: playerId,
            drawCount: 0,
            played: false,
            settings: {
                name: 'Player ' + (players.length + 1),
                highlightStyle: 'standard',
                playStyle: 'standard',
                autoSort: true,
                allowReorder: true,
                playOrder: (players.length + 1),
            },
            hand: [],
            selectedCards: [],
            currentScreen: 'player',
        }

        players.push(newPlayer);
        this.setState({players: players});
    }

    sortCardsHandler = (playerIndex) => {
        let players = [...this.state.players];
        this.sortCards(players[playerIndex].hand);
        this.setState({players: players});
    }

    gameChangeHandler = (event) => {
        const gameSettings = [...this.state.gameSettings]
        gameSettings.game = event.target.value;
        this.setState({gameSettings: gameSettings});
    }

    selectCardHandler = (playerIndex, cardIndex) => {
        let players = [...this.state.players];
        players[playerIndex].hand[cardIndex].selected = !players[playerIndex].hand[cardIndex].selected;
        this.setState({players: players});
    }

    gameSettingsChangedHandler = (settings) => {
        console.log(settings);
    }

    playerSettingsChangedHandler = (settingName, newValue, playerIndex) => {
        let players = [...this.state.players];
        players[playerIndex].settings[settingName] = newValue;
        this.setState({players: players});
    }

    playCardsHandler = (playerIndex) => {
        let players = [...this.state.players];
        let cardsToPlay = [...this.state.players[playerIndex].hand.filter(card => (card.selected))];

        if (cardsToPlay.length >= this.state.rules.minCardPlay && cardsToPlay.length <= this.state.rules.maxCardPlay) {
            let turn = this.state.turn;
            let newHand = [...this.state.players[playerIndex].hand.filter(card => (!card.selected))];
            let playedHand = [...this.state.playedHand];
            playedHand[turn] = cardsToPlay.map(card => {
                card.selected = false;
                return card
            });
            players[playerIndex].hand = newHand;
            this.setState({playedHand: playedHand}, () => {
                players[playerIndex].played = true;
                this.setState({players: players});
            });
        }

    }

    endTurnHandler = (playerIndex) => {
        let players = [...this.state.players];
        players[playerIndex].played = false;
        players[playerIndex].drawCount = 0;
        this.setState({turn: ++this.state.turn});
        this.setState({players: players});
    }

    render() {

        let gameOptions = ['war', 'cribbage', 'hearts'];
        let players = (
            <Aux>
                {this.state.players.map((player, index) => {
                    return <Player
                        key={player.id}
                        index={index}
                        player={player}
                        rules={this.state.rules}
                        turn={(this.state.turn >= this.state.players.length) ? this.state.turn % this.state.players.length : this.state.turn}
                        gameStarted={this.state.gameStarted}
                        sort={this.sortCardsHandler}
                        playCards={this.playCardsHandler}
                        endTurn={this.endTurnHandler}
                        settingChange={this.playerSettingsChangedHandler}
                        selectCard={this.selectCardHandler}/>
                })}
            </Aux>
        );

        return (
            <div className="App">
                <GameControls
                    gameOptions={gameOptions}
                    gameSettings={this.state.gameSettings}
                    showEndGameButton={this.state.gameStarted}
                    showGameStartButton={((this.state.players.length) >= this.state.rules.minPlayers && this.state.gameStarted === false)}
                    showNewPlayerButton={((this.state.players.length) < this.state.rules.maxPlayers)}
                    newPlayer={this.newPlayerHandler}
                    newGame={this.newGameHandler}
                    endGame={this.endGameHandler}
                    drawCard={this.drawCardHandler}
                    settingChange={this.gameSettingsChangedHandler}
                    gameChange={this.gameChangeHandler}>

                    {/* Draw Pile */}
                    <Deck
                        drawCard={this.drawCardHandler}
                        deck={this.state.deck} />

                    {/* PlayArea */}
                    <Hand hand={this.state.playedHand[this.state.playedHand.length -1]} settings={{highlightStyle:'none'}} faceDown={false} selectCard={this.shuffleDiscardHandler}/>

                    {/* Discard Pile */}
                    <Deck
                        drawCard={this.shuffleDiscardHandler}
                        deck={this.state.discard} />
                </GameControls>
                {players}
            </div>
        );
    }
}

export default App;
