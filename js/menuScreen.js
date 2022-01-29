class MenuScreen {
	constructor() {
		this.menu = null;
		this.newGameContainer = null;
		this.scoreContainer = null;
		this.instructionContainer = null;
		this.soundContainer = null;
		this.soundImage = null;
		this.instructionMenu = null;
		this.instructionName = null;
		this.partitionContainer = null;
		this.sectionGeneral = null;
		this.gameSection = null;
		this.cardsSection = null;
		this.generalContainer = null;
		this.healthImgBlock = null;
		this.healthTextBlock = null;
		this.coinImgBlock = null;
		this.coinTextBlock = null;
		this.bellImgBlock = null;
		this.bellTextBlock = null;
		this.deckImgBlock = null;
		this.deckTextBlock = null;
		this.cardsContainer = null;
		this.priceImgBlock = null;
		this.priceTextBlock = null;
		this.attackImgBlock = null;
		this.attackTextBlock = null;
		this.lifeImgBlock = null;
		this.lifeTextBlock = null;
		this.gameContainer = null;
		this.descriptionSection = null;
		this.closeInstruction = null;
		this.videoContainer = null;
		this.activeExplanation = null;
		this.activeTab = null;
	}

	init(container) {
		this.menu = document.createElement("div");
		this.menu.id = "menu";
		this.menu.classList.add("screen");
		container.append(this.menu);

		this.newGameContainer = document.createElement("p");
		this.newGameContainer.classList.add("newGameContainer");
		this.newGameContainer.innerHTML = `<a href="#" class="newGame newGameHover newGameFocus">Новая игра</a>`;
		this.menu.append(this.newGameContainer);

		this.scoreContainer = document.createElement("p");
		this.scoreContainer.classList.add("scoreContainer");
		this.scoreContainer.innerHTML = `<a href="#" class="score scoreHover scoreFocus">Счет игроков</a>`;
		this.menu.append(this.scoreContainer);

		this.instructionContainer = document.createElement("p");
		this.instructionContainer.classList.add("instructionContainer");
		this.instructionContainer.innerHTML = `<a href="#" class="instruction instructionHover instructionFocus">Инструкция</a>`;
		this.menu.append(this.instructionContainer);

		this.soundContainer = document.createElement("p");
		this.soundContainer.classList.add("soundContainer");
		this.soundContainer.innerHTML = `<a href="#" class="sound soundHover soundFocus">Звук</a>`;
		this.menu.append(this.soundContainer);

		this.soundImage = document.createElement("div");
		this.soundImage.classList.add("soundImage", "soundOn", "soundOff");
		this.menu.append(this.soundImage);

		this.instructionMenu = document.createElement("div");
		this.instructionMenu.classList.add("instructionMenu", "hideElem");
		this.menu.append(this.instructionMenu);

		// Блок ИНСТРУКЦИЯ
		this.instructionName = document.createElement("p");
		this.instructionName.classList.add("instructionName");
		this.instructionName.innerHTML = `Инструкция`;
		this.instructionMenu.append(this.instructionName);

		this.partitionContainer = document.createElement("div");
		this.partitionContainer.classList.add("partitionContainer");
		this.instructionMenu.append(this.partitionContainer);

		this.sectionGeneral = document.createElement("p");
		this.sectionGeneral.classList.add("sectionGeneral");
		this.general = document.createElement("a");
		this.general.setAttribute("href", "#");
		this.general.classList.add("general", "generalHover", "generalFocus", "currentTab");
		this.general.innerText = `Общее`;
		this.sectionGeneral.append(this.general);
		this.partitionContainer.append(this.sectionGeneral);

		this.gameSection = document.createElement("p");
		this.gameSection.classList.add("gameSection");
		this.game = document.createElement("a");
		this.game.setAttribute("href", "#");
		this.game.classList.add("game", "gameHover", "gameFocus");
		this.game.innerText = `Игра`;
		this.gameSection.append(this.game);
		this.partitionContainer.append(this.gameSection);

		this.cardsSection = document.createElement("p");
		this.cardsSection.classList.add("cardsSection");
		this.cards = document.createElement("a");
		this.cards.setAttribute("href", "#");
		this.cards.classList.add("cards", "cardsHover", "cardsFocus");
		this.cards.innerText = `Карты`;
		this.cardsSection.append(this.cards);
		this.partitionContainer.append(this.cardsSection);

		// Блок ОБЩЕЕ
		this.generalContainer = document.createElement("div");
		this.generalContainer.classList.add("generalContainer");
		this.instructionMenu.append(this.generalContainer);

		this.healthImgBlock = document.createElement("div");
		this.healthImgBlock.classList.add("healthImgBlock");
		this.generalContainer.append(this.healthImgBlock);

		this.healthTextBlock = document.createElement("div");
		this.healthTextBlock.classList.add("healthTextBlock");
		this.healthTextBlock.innerText = `- текущее количество жизней`;
		this.generalContainer.append(this.healthTextBlock);

		this.coinImgBlock = document.createElement("div");
		this.coinImgBlock.classList.add("coinImgBlock");
		this.generalContainer.append(this.coinImgBlock);

		this.coinTextBlock = document.createElement("div");
		this.coinTextBlock.classList.add("coinTextBlock");
		this.coinTextBlock.innerText = `- текущее количество монет`;
		this.generalContainer.append(this.coinTextBlock);

		this.bellImgBlock = document.createElement("div");
		this.bellImgBlock.classList.add("bellImgBlock");
		this.generalContainer.append(this.bellImgBlock);

		this.bellTextBlock = document.createElement("div");
		this.bellTextBlock.classList.add("bellTextBlock");
		this.bellTextBlock.innerText = `- кнопка "Завершить ход"`;
		this.generalContainer.append(this.bellTextBlock);

		this.deckImgBlock = document.createElement("div");
		this.deckImgBlock.classList.add("deckImgBlock");
		this.generalContainer.append(this.deckImgBlock);

		this.deckTextBlock = document.createElement("div");
		this.deckTextBlock.classList.add("deckTextBlock");
		this.deckTextBlock.innerText = `- количество оставшихся\n в колоде карт`;
		this.generalContainer.append(this.deckTextBlock);
		// Блок ОБЩЕЕ


		// Блок КАРТЫ
		this.cardsContainer = document.createElement("div");
		this.cardsContainer.classList.add("cardsContainer", "hideElem");
		this.instructionMenu.append(this.cardsContainer);

		this.priceImgBlock = document.createElement("div");
		this.priceImgBlock.classList.add("priceImgBlock");
		this.cardsContainer.append(this.priceImgBlock);

		this.priceTextBlock = document.createElement("div");
		this.priceTextBlock.classList.add("priceTextBlock");
		this.priceTextBlock.innerText = `- стоимость карты`;
		this.cardsContainer.append(this.priceTextBlock);

		this.attackImgBlock = document.createElement("div");
		this.attackImgBlock.classList.add("attackImgBlock");
		this.cardsContainer.append(this.attackImgBlock);

		this.attackTextBlock = document.createElement("div");
		this.attackTextBlock.classList.add("attackTextBlock");
		this.attackTextBlock.innerText = `- атака персонажа`;
		this.cardsContainer.append(this.attackTextBlock);

		this.lifeImgBlock = document.createElement("div");
		this.lifeImgBlock.classList.add("lifeImgBlock");
		this.cardsContainer.append(this.lifeImgBlock);

		this.lifeTextBlock = document.createElement("div");
		this.lifeTextBlock.classList.add("lifeTextBlock");
		this.lifeTextBlock.innerText = `- количество жизней`;
		this.cardsContainer.append(this.lifeTextBlock);
		// Блок КАРТЫ


		// Блок ИГРА
		this.gameContainer = document.createElement("div");
		this.gameContainer.classList.add("gameContainer", "hideElem");
		this.instructionMenu.append(this.gameContainer);

		this.descriptionSection = document.createElement("p");
		this.descriptionSection.classList.add("descriptionSection");
		this.descriptionSection.innerText = `Цель игры заключается в победе над компьютером.\n В начале игры компьютеру и игроку раздается по четыре карты. Для нанесения урона необходимо выкладывать имеющиеся карты на стол, при этом заплатив указанную на картах стоимость. Выложив карты на стол игрок завершает ход. Заигранные карты атакуют компьютер, при этом изменяется счетчик жизней. Если напротив карты игрока есть карта компьютера, то урон наносится карте компьютера, при этом счетчик жизней\n не изменяется. Следующим ходит компьютер повторяя вышеупомянутый алгоритм. После хода компьютера игрок и компьютер получают по одной монете и карте\n из колоды. Игрок побеждает, если счетчик жизней будет больше или равен 7. Игрок проигрывает, если счетчик жизней будет меньше или равен -7, а также в случае, если колода игрока закончилась.`;
		this.gameContainer.append(this.descriptionSection);
		// Блок ИГРА

		this.closeInstruction = document.createElement("p");
		this.closeInstruction.classList.add("closeInstruction");
		this.closeInstruction.innerHTML = `<a href="#" class="close closeHover closeFocus">Назад</a>`;
		this.instructionMenu.append(this.closeInstruction);

		this.videoContainer = document.createElement("div");
		this.videoContainer.classList.add("videoContainer");
		this.videoContainer.innerHTML = `
				<video autoplay muted loop class="bgVideo" poster="img/hands.jpg">
					<source src="video/Inscryption.webm" type="video/webm">
					<source src="video/Inscryption.mp4" type="video/mp4">
				</video>
			`;
		this.menu.append(this.videoContainer);

		this.activeExplanation = this.generalContainer;
		this.activeTab = this.sectionGeneral.querySelector("a");
	}

	changeTab(newTab, underlinedTab) {
		this.activeExplanation.classList.add("hideElem");
		newTab.classList.remove("hideElem");
		this.activeExplanation = newTab;

		this.activeTab.classList.remove("currentTab");
		underlinedTab.classList.add("currentTab");
		this.activeTab = underlinedTab;
	}
}
