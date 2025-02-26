function computerMove(gameModel) {
	// ПОБЕДИТЬ
	gameModel.computerCards.forEach((card) => {
		if(gameModel.health - card.attack <= -5) {
			if(gameModel.computerCoins >= card.price) {
				const emptyCell = gameModel.playerCardsOnTheField.findIndex((card, index) => !card && !gameModel.computerCardsOnTheField[index]);
				gameModel.computerCardsOnTheField[emptyCell] = card;
				gameModel.computerCoins -= card.price;
				gameModel.computerCards.splice(gameModel.computerCards.findIndex((laidOutCard) => laidOutCard === card), 1);
			}
		}
	});

	const counterOfOpponentsUncoveredCards = gameModel.playerCardsOnTheField.filter((card, index) => card && !gameModel.computerCardsOnTheField[index]);

	// НЕ ПРОИГРАТЬ
	// Есть незакрытые карты противника?
	if(counterOfOpponentsUncoveredCards.length) {
		for(let i = 0; i < counterOfOpponentsUncoveredCards.length; i++) {
			defendingAgainstEnemyCards();
		}
	}
	// незакрытых карт противника нет
	// передаем карты на которые нам хватает денег
	freeCellAttack(gameModel.computerCards.filter((card) => gameModel.computerCoins >= card.price));
	

	function defendingAgainstEnemyCards() {
		// Отбираем карты на которые нам хватает денег
		const affordableCardsByPrice = gameModel.computerCards.filter((card) => gameModel.computerCoins >= card.price);
		// Есть ли наши карты на которые нам хватает денег?
		if(affordableCardsByPrice.length) {
			// сортируем наши карты по наименьшей стоимости
			let sortedCardsByPrice = affordableCardsByPrice.sort((a, b) => a.price - b.price); // sortedCardsByPrice = наши карты на которые нам хватило денег
			
			// ищем незакрытые карты противника
			const occupiedPlayerCell = gameModel.playerCardsOnTheField.filter((card, index) => card && !gameModel.computerCardsOnTheField[index]); // occupiedPlayerCell = карты противника напротив которых нет наших карт
			
			// Есть незакрытые карты противника?
			if(occupiedPlayerCell.length) {
				// Ищем КП с наибольшим уроном.
				// сортируем карты противника по наибольшему урону
				const enemyCardWithTheMostDamage = occupiedPlayerCell.sort((a, b) => b.attack - a.attack);
				// фильтруем карты противника по наибольшему урону
				const filteredEnemyCardWithTheMostDamage = enemyCardWithTheMostDamage.filter((card) => card.attack === enemyCardWithTheMostDamage[0].attack);
				// Карта противника с максимальным уроном одна?
				if(filteredEnemyCardWithTheMostDamage.length === 1) {
					defendingAgainstEnemyCard(filteredEnemyCardWithTheMostDamage, sortedCardsByPrice);
				// нет, карта противника с максимальным уроном не одна
				} else {
					// сортируем карты противника по наибольшему здоровью
					const enemyCardWithTheMostHealth = filteredEnemyCardWithTheMostDamage.sort((a, b) => b.hitPoints - a.hitPoints);
					// фильтруем карты противника по наибольшему здоровью
					const filteredEnemyCardWithTheMostHealth = enemyCardWithTheMostHealth.filter((card) => card.hitPoints === enemyCardWithTheMostHealth[0].hitPoints);
					defendingAgainstEnemyCard(filteredEnemyCardWithTheMostHealth, sortedCardsByPrice);
				}
			
			}
		}
	}

	function defendingAgainstEnemyCard(occupiedPlayerCell, sortedCardsByPrice) {
		// Смотрим, есть ли у нас карта с уроном большим или равным здоровью КП?
		// фильтруем карты по урону >= здоровью КП
		const affordableCardsByAttack = sortedCardsByPrice.filter((card) => card.attack >= occupiedPlayerCell[0].hitPoints);
		// есть такие карты?
		if(affordableCardsByAttack.length) {
			// фильтруем карты по урону равному здоровью КП
			const cardsAttackEqualsHealth = affordableCardsByAttack.filter((card) => card.attack === occupiedPlayerCell[0].hitPoints);
			// есть такие карты?
			if(cardsAttackEqualsHealth.length) {
				exposeCardWithMinPriceAndHealth(cardsAttackEqualsHealth, occupiedPlayerCell);
			// нет таких карт
			} else {
				exposeCardWithMinPriceAndMaxHealth(affordableCardsByAttack, occupiedPlayerCell);
			}
		// Нет
		} else {
			// Есть ли карта со здоровьем выше, чем урон КП?
			// фильтруем карты по здоровью которое выше урона КП
			const sortedCardsByMaxHealth = sortedCardsByPrice.filter((card) => card.hitPoints > occupiedPlayerCell[0].attack);
			// есть такие карты?
			if(sortedCardsByMaxHealth.length) {
				// Переживем мы атаки противника до того, как убьем его?
				// фильтруем карты которые переживут удары противника и убьют его
				const cardThatOutlastsTheEnemyAndKillHim = sortedCardsByMaxHealth.filter((card) => {
					const theRemainingHealthOfTheEnemyAfterTheHit = occupiedPlayerCell[0].hitPoints - card.attack;
					const numberOfHitsBeforeTheDeathOfTheOpponentsCard = Math.ceil(theRemainingHealthOfTheEnemyAfterTheHit / card.attack);
					const numberOfHitsBeforeTheDeathOfOurCard = Math.ceil(card.hitPoints / occupiedPlayerCell[0].attack);
					return numberOfHitsBeforeTheDeathOfTheOpponentsCard < numberOfHitsBeforeTheDeathOfOurCard;
				});
				// такие карты существуют?!
				if(cardThatOutlastsTheEnemyAndKillHim.length) {
					exposeCardWithMinPriceAndMaxHealth(cardThatOutlastsTheEnemyAndKillHim, occupiedPlayerCell);
				// нет, карта не переживет урон
				} else {
					exposeCardWithMinPriceAndHealth(sortedCardsByMaxHealth, occupiedPlayerCell);
				}
			// нет таких карт
			} else {
				exposeCardWithMinPriceAndHealth(sortedCardsByPrice, occupiedPlayerCell);
			}
		}
	}

	function exposeCardWithMinPriceAndHealth(container, occupiedPlayerCell) {
		// выставляем карту с наименьшими стоимостью и здоровьем
		// cardsWithMinPrice = карты отфильтрованы по цене самой дешевой карты
		const cardsWithMinPrice = container.filter((card) => card.price === container[0].price);
		// matchingCard = карты сортированы по наименьшему здоровью
		const matchingCard = cardsWithMinPrice.sort((a, b) => a.hitPoints - b.hitPoints);
		// выставляем карту с наименьшими характеристиками в ячейку напротив незакрытой карты
		gameModel.computerCardsOnTheField[gameModel.playerCardsOnTheField.findIndex((card) => card === occupiedPlayerCell[0])] = matchingCard[0];
		// отнимаем цену карты от монет компьютера
		gameModel.computerCoins -= matchingCard[0].price;
		// убираем карту из руки компьютера
		gameModel.computerCards.splice(gameModel.computerCards.findIndex((card) => card === matchingCard[0]), 1);
	}

	function exposeCardWithMinPriceAndMaxHealth(container, occupiedPlayerCell) {
		// выставляем карту с наименьшей стоимостью и наибольшим здоровьем
		// cardsWithMinPrice = карты отфильтрованы по цене самой дешевой карты
		const cardsWithMinPrice = container.filter((card) => card.price === container[0].price);
		// matchingCard = карты сортированы по наибольшему здоровью
		const matchingCard = cardsWithMinPrice.sort((a, b) => b.hitPoints - a.hitPoints);
		// выставляем карту с указанными характеристиками в ячейку напротив незакрытой карты
		gameModel.computerCardsOnTheField[gameModel.playerCardsOnTheField.findIndex((card) => card === occupiedPlayerCell[0])] = matchingCard[0];
		// отнимаем цену карты от монет компьютера
		gameModel.computerCoins -= matchingCard[0].price;
		// убираем карту из руки компьютера
		gameModel.computerCards.splice(gameModel.computerCards.findIndex((card) => card === matchingCard[0]), 1);
	}

	function freeCellAttack(affordableCardsByPrice) {
		// affordableCardsByPrice = наши карты на которые нам хватило денег
		// сортируем наши карты по наименьшей стоимости
		let sortedCardsByPrice = affordableCardsByPrice.sort((a, b) => a.price - b.price);
		// emtyCellIndex = индекс первой незанятой противником ячейки с проверкой - есть ли там ещё и наша карта?
		const emtyCellIndex = gameModel.playerCardsOnTheField.findIndex((card, index) => !card && !gameModel.computerCardsOnTheField[index]);
		// есть ли незанятая противником ячейка?
		if(emtyCellIndex != -1) {
			// attackCards = карты отфильтрованы по наличию атаки вообще
			const attackCards = sortedCardsByPrice.filter((card) => card.attack != 0);
			// cardsWithMinPrice = карты отфильтрованы по цене самой дешевой карты
			const cardsWithMinPrice = attackCards.filter((card) => card.price === attackCards[0].price);
			// есть ли карты с атакой вообще?
			if(cardsWithMinPrice.length) {
				// cardsWithMinAttack = карты сортированы по наименьшей атаке
				const cardsWithMinAttack = cardsWithMinPrice.sort((a, b) => a.attack - b.attack);
				// sortedCardsByAttack = карты отфильтрованы по карте с наименьшей атакой
				const sortedCardsByAttack = cardsWithMinAttack.filter((card) => card.attack === cardsWithMinAttack[0].attack);
				// matchingCard = карты сортированы по наименьшему здоровью
				const matchingCard = sortedCardsByAttack.sort((a, b) => a.hitPoints - b.hitPoints);
				// выставляем карту с наименьшими характеристиками в свободную ячейку
				gameModel.computerCardsOnTheField[emtyCellIndex] = matchingCard[0];
				// отнимаем цену карты от монет компьютера
				gameModel.computerCoins -= matchingCard[0].price;
				// убираем карту из руки компьютера
				gameModel.computerCards.splice(gameModel.computerCards.findIndex((card) => card === matchingCard[0]), 1);
			}
		}
	}
}