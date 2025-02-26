class GameController {
	constructor() {
		this.screen = null;
		this.model = null;
		this.soundLibrary = null;
		this.bell = null;
	}

	init(gameScreen, gameModel, soundLibrary) {
		this.screen = gameScreen;
		this.model = gameModel;
		this.soundLibrary = soundLibrary;

		this.bell = this.screen.endOfTurn;
		this.bell.addEventListener("click", () => {
			this.soundLibrary.playTrack(this.soundLibrary.bell);
			this.end();
		});

		this.screen.playerCardsContainer.addEventListener("click", (event) => {
			// выбираем карту из руки
			const cardInHand = event.target.closest(".cardInHand");
			if(cardInHand) {
				// получаем ее имя
				const cardName = cardInHand.getAttribute('data-playerCard');
				this.model.selectCardInHand(cardName);
			}
		});

		this.screen.playerField.addEventListener("click", (event) => {
			// выбираем ячейку
			const playerCell = event.target.closest(".playerCell");
			if(playerCell) {
				// получаем номер ячейки куда будем класть карту
				const cellNumber = Number(playerCell.getAttribute('data-playerCellNumber'));
				// соотносим номер ячейки с номером индекса в массиве
				this.model.selectPlayerCell(cellNumber - 1);
			}
		});
	}

	begin() {
		this.model.currentLevel = 1;
		this.model.playerTotalNumberOfMoves = 0;
		this.model.reset();
		this.model.start();
	}

	end() {
		this.model.finishMove();
	}
}
