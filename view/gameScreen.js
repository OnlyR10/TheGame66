class GameScreen {
	constructor() {
		this.soundLibrary = null;

		this.playingField = null;

		this.gameResultContainer = null;
		this.gameResultBlock = null;
		this.gameResult = null;
		this.lastChanceContainer = null;
		this.lastChanceBlock = null;
		this.lastChance = null;
		this.currentLevel = null;
		this.currentLevelContainer = null;
		this.backToMenuField = null;
		this.backToMenuContainer = null;

		this.choiceField = null;
		this.choiceBlock = null;
		this.choiceContainer = null;
		this.positiveChoiceContainer = null;
		this.negativeChoiceContainer = null;

		this.healthField = null;
		this.heart = null;
		this.playerHealthContainer = null;
		this.playerHealthCounter = null;
		this.coinsField = null;
		this.coin = null;
		this.playerCoinsContainer = null;
		this.playerCoinsCounter = null;
		this.endOfTurn = null;
		this.deckField = null;
		this.playerDeck = null;
		this.computerField = null;
		this.playerField = null;
		this.playerCardsContainer = null;
	}

	init(container, soundLibrary) {
		this.soundLibrary = soundLibrary;

		// Внешний контейнер
		this.playingField = document.createElement("div");
		this.playingField.id = "playingField";
		this.playingField.classList.add("screen", "hideElem");
		container.append(this.playingField);

		// Контейнер с результатом игры
		this.gameResultContainer = document.createElement("div");
		this.gameResultContainer.classList.add("gameResultContainer", "hideElem");
		this.playingField.append(this.gameResultContainer);

		this.gameResult = document.createElement("p");
		this.gameResultContainer.append(this.gameResult);

		// Контейнер с последним шансом
		this.lastChanceContainer = document.createElement("div");
		this.lastChanceContainer.classList.add("lastChanceContainer", "hideElem");
		this.playingField.append(this.lastChanceContainer);

		this.lastChanceBlock = document.createElement("div");
		this.lastChanceBlock.classList.add("lastChanceBlock");
		this.lastChanceContainer.append(this.lastChanceBlock);

		this.lastChance = document.createElement("p");
		this.lastChance.classList.add("lastChance");
		this.lastChance.innerHTML = "Это твой ПОСЛЕДНИЙ шанс...";
		this.lastChanceBlock.append(this.lastChance);

		// Поле с уровнем
		this.currentLevel = document.createElement("div");
		this.currentLevel.classList.add("currentLevel");
		this.playingField.append(this.currentLevel);

		this.currentLevelContainer = document.createElement("p");
		this.currentLevelContainer.classList.add("currentLevelContainer");
		this.currentLevel.append(this.currentLevelContainer);

		// Поле с кнопкой "Бежать"
		this.backToMenuField = document.createElement("div");
		this.backToMenuField.classList.add("backToMenuField");
		this.playingField.append(this.backToMenuField);

		this.backToMenuContainer = document.createElement("p");
		this.backToMenuContainer.classList.add("backToMenuContainer");
		this.backToMenuContainer.innerHTML = `<a href="#" class="backToMenu backToMenuHover backToMenuFocus">Бежать</a>`;
		this.backToMenuField.append(this.backToMenuContainer);

		// Контейнер с выбором - бежать или нет
		this.choiceField = document.createElement("div");
		this.choiceField.classList.add("choiceField", "hideElem");
		this.playingField.append(this.choiceField);

		this.choiceContainer = document.createElement("p");
		this.choiceContainer.classList.add("choiceContainer");
		this.choiceContainer.innerText = `Сбегаешь?\n Я засчитаю это\n за поражение...`;
		this.choiceField.append(this.choiceContainer);

		this.positiveChoiceContainer = document.createElement("p");
		this.positiveChoiceContainer.classList.add("positiveChoiceContainer");
		this.positiveChoiceContainer.innerHTML = `<a href="#" class="positiveChoice positiveChoiceHover positiveChoiceFocus">ДА</a>`;
		this.choiceField.append(this.positiveChoiceContainer);

		this.negativeChoiceContainer = document.createElement("p");
		this.negativeChoiceContainer.classList.add("negativeChoiceContainer");
		this.negativeChoiceContainer.innerHTML = `<a href="#" class="negativeChoice negativeChoiceHover negativeChoiceFocus">НЕТ</a>`;
		this.choiceField.append(this.negativeChoiceContainer);

		// Поле со здоровьем
		this.healthField = document.createElement("div");
		this.healthField.classList.add("healthField");
		this.playingField.append(this.healthField);

		this.heart = document.createElement("div");
		this.heart.classList.add("heart");
		this.healthField.append(this.heart);

		this.playerHealthContainer = document.createElement("div");
		this.playerHealthContainer.classList.add("playerHealthContainer");
		this.healthField.append(this.playerHealthContainer);

		this.playerHealthCounter = document.createElement("p");
		this.playerHealthCounter.classList.add("playerHealthCounter");
		this.playerHealthContainer.append(this.playerHealthCounter);

		// Поле с монетами
		this.coinsField = document.createElement("div");
		this.coinsField.classList.add("coinsField");
		this.playingField.append(this.coinsField);

		this.coin = document.createElement("div");
		this.coin.classList.add("coin");
		this.coinsField.append(this.coin);

		this.playerCoinsContainer = document.createElement("div");
		this.playerCoinsContainer.classList.add("playerCoinsContainer");
		this.coinsField.append(this.playerCoinsContainer);

		this.playerCoinsCounter = document.createElement("p");
		this.playerCoinsCounter.classList.add("playerCoinsCounter");
		this.playerCoinsContainer.append(this.playerCoinsCounter);

		// Поле с кнопкой "Закончить ход"
		this.endOfTurn = document.createElement("button");
		this.endOfTurn.classList.add("endOfTurn", "endOfTurnActive");
		this.playingField.append(this.endOfTurn);

		// Поле с колодой
		this.deckField = document.createElement("div");
		this.deckField.classList.add("deckField");
		this.playingField.append(this.deckField);

		this.playerDeck = document.createElement("div");
		this.playerDeck.classList.add("playerDeck");
		this.deckField.append(this.playerDeck);

		this.playerDeckContainer = document.createElement("div");
		this.playerDeckContainer.classList.add("playerDeckContainer");
		this.deckField.append(this.playerDeckContainer);

		this.playerDeckCounter = document.createElement("p");
		this.playerDeckCounter.classList.add("playerDeckCounter");
		this.playerDeckContainer.append(this.playerDeckCounter);

		// Поле с ячейками компьютера
		this.computerField = document.createElement("div");
		this.computerField.classList.add("computerField");
		this.playingField.append(this.computerField);
		this.updateComputerCardsOnTheField([]);

		// Поле с ячейками игрока
		this.playerField = document.createElement("div");
		this.playerField.classList.add("playerField");
		this.playingField.append(this.playerField);
		this.updatePlayerCardsOnTheField([]);

		// Поле с картами игрока на руках
		this.playerCardsContainer = document.createElement("div");
		this.playerCardsContainer.classList.add("playerCardsContainer");
		this.playingField.append(this.playerCardsContainer);

	}

	change({ computerCardsOnTheField, health, playerCards, playerCoins, playerDeck, playerCardsOnTheField, targetCard, allowToHitTheComputer, allowToHitThePlayer, lastMove, waitingForComputer, getCard, gameOver, playerVictory, computerVictory, emptyDeck, currentLevel}) {
		this.updatePlayerCards(playerCards, targetCard, getCard);
		this.updatePlayerCardsOnTheField(playerCardsOnTheField, allowToHitTheComputer);
		this.updateComputerCardsOnTheField(computerCardsOnTheField, allowToHitThePlayer);

		this.playerHealthCounter.textContent = `${health}`;
		this.playerCoinsCounter.textContent = `${playerCoins}`;
		this.playerDeckCounter.textContent = `${playerDeck.length}`;

		if(waitingForComputer) {
			this.endOfTurn.classList.add("endOfTurnBlueBell");
			this.endOfTurn.classList.remove("endOfTurnBrownBell");
		} else {
			this.endOfTurn.classList.add("endOfTurnBrownBell");
			this.endOfTurn.classList.remove("endOfTurnBlueBell");
		}

		this.lastChanceContainer.classList.toggle("hideElem", !lastMove);

		this.playerDeck.classList.toggle("playerDeckBackground", !playerDeck.length);

		this.gameResultContainer.classList.toggle("hideElem", !gameOver);

		if(emptyDeck) {
			this.gameResult.classList.add("emptyDeck");
			this.gameResult.innerText = "Твоя колода\n закончилась!\n Как жаль,\n но ты не успел.";
		} else if(playerVictory) {
			switch(currentLevel) {
				case 1:
					this.gameResult.classList.add("playerVictory");
					this.gameResult.innerText = "Поздравляю,\n ты победил.\n В этот раз...";
					this.soundLibrary.playTrack(this.soundLibrary.patheticFool);
					break;
				case 2:
					this.gameResult.classList.add("playerVictory");
					this.gameResult.innerText = "Эта победа\n еще ничего\n не значит...";
					this.soundLibrary.playTrack(this.soundLibrary.youKnowWhatPainIs);
					break;
				case 3:
					this.gameResult.classList.add("playerVictory2");
					this.gameResult.innerText = "Тебе повезло...\n Я собираюсь\n показать тебе\n истинную силу!";
					this.soundLibrary.playTrack(this.soundLibrary.nowImReallyAngry);
					break;
				case 4:
					this.gameResult.classList.add("playerVictory2");
					this.gameResult.innerText = "Если ты думаешь,\n что совершил\n что-то стоящее...\n Ха, это всего-лишь\n ИГРА!";
					this.soundLibrary.playTrack(this.soundLibrary.howStupidItWasToBelieveInTheWorld);
					break;
			}
		} else if(computerVictory) {
			this.gameResult.classList.add("computerVictory");
			this.gameResult.innerText = `Ты проиграл!\n Мне кажется\n или это было\n совсем не трудно?`;
		}
		
		this.currentLevelContainer.innerHTML = `Уровень ${currentLevel}`;
	}

	updatePlayerCards(playerCards, targetCard, getCard) {
		// очищаем карты на руках
		this.playerCardsContainer.innerHTML = "";
		// создаем заново карты на руки и ставим активатор
		playerCards.forEach((card, index) => {
			const cardEl = this.createCard(card, "cardInHand");
			const active = targetCard ? targetCard.name === card.name : false;
			cardEl.classList.toggle("cardAction", active);
			this.playerCardsContainer.append(cardEl);
			if(index === 0 && getCard) {
				cardEl.classList.add("cardFromTheDeck");
				this.soundLibrary.playTrack(this.soundLibrary.takeOneCardFromTheDeck);
			}
		});
	}

	updatePlayerCardsOnTheField(playerCardsOnTheField, allowToHitTheComputer) {
		this.playerField.innerHTML = '';
		for(let i = 0; i < 4; i++) {
			const cell = document.createElement("div");
			cell.classList.add(`playerCell${i + 1}`, "playerCell");
			cell.setAttribute("data-playerCellNumber", i + 1);
			if(playerCardsOnTheField[i]) {
				if(playerCardsOnTheField[i].attack > 0 && allowToHitTheComputer) {
					cell.append(this.createCard(playerCardsOnTheField[i], "playerCardOnCell playerCardBattle"));
				} else {
					cell.append(this.createCard(playerCardsOnTheField[i], "playerCardOnCell"));
				}
			}
			this.playerField.append(cell);
		}
	}

	updateComputerCardsOnTheField(computerCardsOnTheField, allowToHitThePlayer) {
		this.computerField.innerHTML = '';
		for(let i = 0; i < 4; i++) {
			const cell = document.createElement("div");
			cell.classList.add(`computerCell${i + 1}`, "computerCell");
			cell.setAttribute("data-computerCellNumber", i + 1);
			if(computerCardsOnTheField[i]) {
				if(computerCardsOnTheField[i].attack > 0  && allowToHitThePlayer) {
					cell.append(this.createCard(computerCardsOnTheField[i], "computerCardOnCell computerCardBattle"));
				} else {
					cell.append(this.createCard(computerCardsOnTheField[i], "computerCardOnCell"));
				}
			}
			this.computerField.append(cell);
		}
	}

	createCard(card, className) {
		const substrateForPlayerCards = document.createElement("div");
		substrateForPlayerCards.classList.add("substrateForPlayerCards");
		const blockForCard = document.createElement("div");
		blockForCard.className = className;
		blockForCard.setAttribute("data-playerCard", `${card.name}`);
		substrateForPlayerCards.append(blockForCard);
		const cardCostBlock = document.createElement("div");
		cardCostBlock.classList.add("cardCostBlock");
		const cardCost = document.createElement("p");
		cardCost.classList.add("cardCost");
		cardCost.textContent = `${card.price}`;
		cardCostBlock.append(cardCost);
		blockForCard.append(cardCostBlock);
		const cardAttackBlock = document.createElement("div");
		cardAttackBlock.classList.add("cardAttackBlock");
		const cardAttack = document.createElement("p");
		cardAttack.classList.add("cardAttack");
		cardAttack.textContent = `${card.attack}`;
		cardAttackBlock.append(cardAttack);
		blockForCard.append(cardAttackBlock);
		const cardHealthBlock = document.createElement("div");
		cardHealthBlock.classList.add("cardHealthBlock");
		const cardHealth = document.createElement("p");
		cardHealth.classList.add("cardHealth");
		cardHealth.textContent = `${card.hitPoints}`;
		cardHealthBlock.append(cardHealth);
		blockForCard.append(cardHealthBlock);
		const cardPictureBlock = document.createElement("div");
		cardPictureBlock.classList.add("cardPictureBlock");
		cardPictureBlock.style.background = `url("img/character/${card.icon}.svg") center center no-repeat`;
		blockForCard.append(cardPictureBlock);
		const cardNameBlock = document.createElement("div");
		cardNameBlock.classList.add("cardNameBlock");
		const cardName = document.createElement("p");
		cardName.classList.add("cardName");
		cardName.textContent = `${card.name}`;
		cardNameBlock.append(cardName);
		blockForCard.append(cardNameBlock);
		return substrateForPlayerCards;
	}
}