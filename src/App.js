import React, {Component} from 'react';

import './App.css';
import Player from './Components/Player/Player';
import GameControls from './Components/GameControls/GameControls';
import Deck from './Components/Deck/Deck';
import Aux from './hoc/Aux';


const newCards = [];

class App extends Component {
    state = {
        turn: 0,
        deck: [],
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
        }
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
                newCard: true,
            }
            deck.splice(randCardIndex, 1);
            return newCard;
        } else {
            //just in case we cant find the card try again
            return this.getCard(deck)
        }
    }

    shuffleDeckHandler = () => {
        let deck = [];
        const suitValues = {...this.state.rules.suitValues};
        Object.keys(suitValues).forEach((suitNumber) => {
            const suitCards = this.state.rules.cards.map(card => {
                return Number(suitNumber) + card * 10;
            })
            deck.push(...suitCards);
        })
        this.setState({deck: deck}, this.dealHandler);
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
        turn++;
        this.setState({turn: turn});
        this.setState({deck: deck});
        if (players[playerIndex].settings.autoSort){
            this.sortCardsHandler(players[playerIndex].id)
        } else {
            this.setState({players: players});
        }
    }

    newGameHandler = () => {
        if (this.state.players.length < this.state.rules.minPlayers) {
            return;
        }
        this.shuffleDeckHandler();
        this.setState({gameStarted: true});
    }

    endGameHandler = () => {
        let deck = [];
        let players = [...this.state.players];
        players.map((player, playerIndex) => {
            players[playerIndex].hand = [];
        });
        this.setState({players: players});
        this.setState({deck: deck});
        this.setState({gameStarted: false});
    }

    newPlayerHandler = () => {
        const players = [...this.state.players];
        const playerId = Math.floor(Math.random() * 10000)
        const newPlayer = {
            id: playerId,
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

    sortCardsHandler = (playerId) => {
        const playerIndex = this.state.players.findIndex(player => {
            return player.id === playerId;
        })
        let players = [...this.state.players];
        this.sortCards(players[playerIndex].hand);
        this.setState({players: players});
    }

    gameChangeHandler = (event) => {
        const gameSettings = [...this.state.gameSettings]
        gameSettings.game = event.target.value;
        this.setState({gameSettings: gameSettings});
    }

    selectCardHandler = (playerId, card) => {
        let players = [...this.state.players];
        const playerIndex = players.findIndex(player => {
            return player.id === playerId;
        })
        const cardIndex = players[playerIndex].hand.findIndex(handCard => {
            return card.value === handCard.value;
        })
        players[playerIndex].hand[cardIndex].selected = !players[playerIndex].hand[cardIndex].selected;
        players[playerIndex].selectedCards.push(card);
        this.setState({players: players});
    }

    gameSettingsChangedHandler = (settings) => {
        console.log(settings);
    }

    playerSettingsChangedHandler = (settingName, newValue, playerId) => {
        let players = [...this.state.players];
        const playerIndex = players.findIndex(player => {
            return player.id === playerId;
        })
        players[playerIndex].settings[settingName] = newValue;
        this.setState({players: players});
    }

    playCardsHandler = (playerId) => {

    }

    passHandler = (playerId) => {

    }

    render() {

        let gameOptions = ['war', 'cribbage', 'hearts'];
        let players = (
            <Aux>
                {this.state.players.map((player, index) => {
                    return <Player
                        player={player}
                        rules={this.state.rules}
                        key={player.id}
                        sort={this.sortCardsHandler}
                        playCards={this.playCardsHandler}
                        pass={this.passHandler}
                        settingChange={this.playerSettingsChangedHandler}
                        selectCard={this.selectCardHandler}/>
                })}
            </Aux>
        );

        return (
            <div className="App">
                <GameControls
                    gameSettings={this.state.gameSettings}
                    gameChange={this.gameChangeHandler}
                    newGame={this.newGameHandler}
                    endGame={this.endGameHandler}
                    gameOptions={gameOptions}
                    settingChange={this.gameSettingsChangedHandler}
                    drawCard={this.drawCardHandler}
                    showEndGameButton={this.state.gameStarted}
                    showGameStartButton={((this.state.players.length) >= this.state.rules.minPlayers && this.state.gameStarted === false)}
                    showNewPlayerButton={((this.state.players.length) < this.state.rules.maxPlayers)}
                    newPlayer={this.newPlayerHandler}>
                    <Deck
                        drawCard={this.drawCardHandler}
                        players={this.state.players}
                        rules={this.state.rules}/>
                </GameControls>
                {players}
            </div>
        );
    }
}

export default App;
