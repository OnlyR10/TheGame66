class GameModel {
	constructor() {
		this.menuScreen = null;
		this.gameScreen = null;
		this.scoreScreen = null;
		this.screenChange = null;
		this.soundLibrary = null;
		this.currentLevel = null;
		this.playerTotalNumberOfMoves = null;
		this.numberofCardsForComputer = 21;
	}

	init(menuView, gameView, scoreView, screenChange, soundLibrary) {
		this.menuScreen = menuView;
		this.gameScreen = gameView;
		this.scoreScreen = scoreView;
		this.screenChange = screenChange;
		this.soundLibrary = soundLibrary;
	}

	start() {
		this.controller = new AbortController();
		this.computerDeck = JSON.parse(JSON.stringify(characterCards))
		this.fillInTheDeck(this.computerDeck, this.numberofCardsForComputer);
		this.fillInTheCards(this.computerDeck, this.computerCards);
		this.computerCoins = 2;
		this.playerDeck = JSON.parse(JSON.stringify(characterCards))
		this.fillInTheDeck(this.playerDeck);
		this.fillInTheCards(this.playerDeck, this.playerCards);
		this.playerCoins = 2;
		this.update();
	}

	reset() {
		this.abort = null;
		this.health = 0;
		
		this.computerDeck = null;
		this.computerCards = [];
		this.computerCoins = null;
		this.computerCardsOnTheField = [null, null, null, null];
		this.allowToHitThePlayer = false;

		this.playerDeck = null;
		this.playerCards = [];
		this.playerCoins = null;
		this.playerCardsOnTheField = [null, null, null, null];
		this.allowToHitTheComputer = false;

		this.targetCard = null;

		this.waitingForComputer = false;
		this.gameOver = false;
		this.computerVictory = false;
		this.playerVictory = false;
		this.emptyDeck = false;

		this.lastMove = false;
		this.getCard = false;
	}

	fillInTheDeck(deck, numberOfMembershipCards=20) {
		const allowableDeckSize = Math.abs(numberOfMembershipCards - deck.length);
		for(let i = 0; i < allowableDeckSize; i++) {
			const random = Math.trunc(Math.random() * 50);
			if(random > deck.length - 1) {
				i--;
			} else {
				deck.splice(random, 1);
			}
		}
	}

	fillInTheCards(deck, cards, number=4) {
		for(let i = 0; i < number; i++) {
			const random = Math.trunc(Math.random() * 25);
			if(random > deck.length - 1) {
				i--;
			} else {
				const currentCard = deck.splice(random, 1)[0];
				cards.unshift(currentCard);
			}
		}
	}

	selectCardInHand(cardName) {
		if(this.waitingForComputer) {
			return;
		}
		// ищем в руках карту с названием карты на которую кликнули
		const card = this.playerCards.find(elem => elem.name === cardName);
		// если она совпадает с предыдущей картой
		if(card === this.targetCard) {
			this.targetCard = null;
		} else {
			this.targetCard = card;
			this.soundLibrary.playTrack(this.soundLibrary.selectCard);
		}
		this.update();
	}

	selectPlayerCell(cellNumber) {
		if(this.waitingForComputer) {
			return;
		}
		// если карта на руках не активна...
		if(this.targetCard === null) {
			return;
		}
		// если мы пытаемся положить карту в уже занятую ячейку
		if(this.playerCardsOnTheField[cellNumber]) {
			return;
		}
		if(this.playerCoins >= this.targetCard.price) {
			// записываем в ячейку по номером cellNumber активную карту
			this.playerCardsOnTheField[cellNumber] = this.targetCard;
			// удаляем карту по номеру индекса карты из массива (карт на руках)
			this.playerCards.splice(this.playerCards.indexOf(this.targetCard), 1);
			this.playerCoins -= this.targetCard.price;
			this.targetCard = null;
			this.soundLibrary.playTrack(this.soundLibrary.putCard);
		} else {
			this.soundLibrary.playTrack(this.soundLibrary.needMoreGold);
		}

		this.update();
	}

	async finishMove() {
		try {
			if(this.waitingForComputer) {
				return;
			}

			this.waitingForComputer = true;
			this.update();
			this.playerTotalNumberOfMoves += 1;

			// Атака игрока
			if(this.playerCardsOnTheField.some( (card) => card && card.attack > 0)) {
				// Минимальная задержка перед ударом
				await this.sleep(1000);
				this.allowToHitTheComputer = true;
				this.update();
				this.allowToHitTheComputer = false;
				await this.sleep(1200);
				this.soundLibrary.playTrack(this.soundLibrary.hit);

				// Чтобы вовремя исчезала карта напротив или отнималось здоровье при мах перемещении карты вперед
				await this.sleep(1000);
				this.playerBattle();

				this.update();
			}

			// Проверка: победил ли игрок после своего хода?
			if(this.gameOver) {
				this.playerVictory = true;
				this.update();
				await this.sleep(4000);
				this.currentLevel += 1;
				
				if(this.currentLevel === 5) {
					this.screenChange(this.scoreScreen.scoreTable);
					this.scoreScreen.stopGame(this.playerTotalNumberOfMoves);
				} else {
					this.reset();
					this.start();
					this.makeTheLevelHarder();
					this.update();
				}
				return;
			}

			// Если закончилась колода - игрок проиграл, игра окончена
			if(!(this.playerDeck.length)) {
				await this.sleep(2000);
				this.gameOver = true;
			}
			if(this.gameOver) {
				this.emptyDeck = true;
				this.update();
				await this.sleep(4000);
				this.update();
				this.screenChange(this.menuScreen.menu);
				return;
			}

			// Компьютер выкладывает карты в ячейки
			// Если на столе есть карты игрока - выждержать паузу между окончанием удара и выкладыванием карты компьютера на стол
			if(this.playerCardsOnTheField.some( (card) => card)) {
				await this.sleep(1000);
			}
			computerMove(this);
			this.update();

			// Атака компьютера
			// Если на столе есть карты компьютера - минимальная задержка перед ударом
			if(this.computerCardsOnTheField.some( (card) => card && card.attack > 0)) {
				await this.sleep(2000);
				this.allowToHitThePlayer = true;
				this.update();
				this.allowToHitThePlayer = false;
				await this.sleep(1200);
				this.soundLibrary.playTrack(this.soundLibrary.hit);

				// Чтобы вовремя исчезала карта напротив или отнималось здоровье при мах перемещении карты вперед
				await this.sleep(1000);
				this.computerBattle();
				this.update();
			}

			// Проверка: победил ли компьютер после своего хода?
			if(this.gameOver) {
				this.computerVictory = true;
				this.update();
				this.soundLibrary.playTrack(this.soundLibrary.creepyViolin);
				await this.sleep(4000);
				this.update();
				this.screenChange(this.menuScreen.menu);
				return;
			}

			// Получение монет и карт
			await this.sleep(2000);
			this.computerCoins += 1;
			this.fillInTheCards(this.computerDeck, this.computerCards, 1);
			this.playerCoins += 1;
			this.fillInTheCards(this.playerDeck, this.playerCards, 1);

			// Если получили карту - анимируем
			this.getCard = true;
			this.update();
			await this.sleep(260);
			this.getCard = false;

			// Если в колоде не остаетсяется карт, то у игрока последний ход
			if(!(this.playerDeck.length)) {
				this.lastMove = true;
				this.update();
				await this.sleep(6500);
			} else {
				this.update();
			}
			if(this.lastMove) {
				this.lastMove = false;
				this.update();
			}
			
			this.waitingForComputer = false;
			this.update();
		} catch(error) {
			if(error.type === "abort") {
			} else {
				console.error(error);
			}
		}
	}

	sleep(delay) {
		return new Promise( (resolve, reject) => {
			this.controller.signal.addEventListener('abort', reject);
			setTimeout(() => {
				resolve();
			}, delay);
		});
	}

	playerBattle() {
		// если есть карты на доске - вычислить атаку каждой карты и увеличить счетчик жизни
		this.playerCardsOnTheField.forEach( (card, index) => {
			if(card) {
				if(this.computerCardsOnTheField[index]) {
					this.computerCardsOnTheField[index].hitPoints -= card.attack;
					if(this.computerCardsOnTheField[index].hitPoints <= 0) {
						this.computerCardsOnTheField[index] = null;
					}
				} else {
					this.health += card.attack;
				}
			}
		});
		if(this.health >= 7) {
			this.gameOver = true;
		}
	}

	computerBattle() {
		// если есть карты на доске - вычислить атаку каждой карты и уменьшить счетчик жизни
		this.computerCardsOnTheField.forEach( (card, index) => {
			if(card) {
				if(this.playerCardsOnTheField[index]) {
					this.playerCardsOnTheField[index].hitPoints -= card.attack;
					if(this.playerCardsOnTheField[index].hitPoints <= 0) {
						this.playerCardsOnTheField[index] = null;
					}
				} else {
					this.health -= card.attack;
				}
			}
		});
		if(this.health <= -7) {
			this.gameOver = true;
		}
	}

	update() {
		this.gameScreen.change({
			computerCardsOnTheField: this.computerCardsOnTheField,
			health: this.health,
			playerCards: this.playerCards,
			playerCoins: this.playerCoins,
			playerDeck: this.playerDeck,
			playerCardsOnTheField: this.playerCardsOnTheField,
			targetCard: this.targetCard,
			allowToHitTheComputer: this.allowToHitTheComputer,
			allowToHitThePlayer: this.allowToHitThePlayer,
			lastMove: this.lastMove,
			waitingForComputer: this.waitingForComputer,
			getCard: this.getCard,
			gameOver: this.gameOver,
			playerVictory: this.playerVictory,
			computerVictory: this.computerVictory,
			emptyDeck: this.emptyDeck,
			currentLevel: this.currentLevel,
		});
	}

	makeTheLevelHarder() {
		switch(this.currentLevel) {
			case 2:
				this.fillInTheCards(this.computerDeck, this.computerCards, 1);
				break;
			case 3:
				this.health = -1;
				break;
			case 4:
				this.computerCoins = 3;
				break;
		}
	}
}