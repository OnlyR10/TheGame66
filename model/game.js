class Game {
  constructor() {
    this.menuScreen = new MenuScreen();
    this.gameScreen = new GameScreen();
    this.scoreScreen = new ScoreScreen();
    this.gameController = new GameController();
    this.gameModel = new GameModel();
    this.soundLibrary = new SoundLibrary();
    this.scaleContainer = null;
    this.screenContainer = null;
    this.newGame = null;
    this.score = null;
    this.returnMenu = null;
    this.backToMenu = null;
    this.activeScreen = null;

    this.windowWidth = null;
    this.windowHeight = null;
    this.screenSizeRelativeToTheGame = 1.5;
    this.scaleContainerWidth = 960;
    this.scaleContainerHeight = 540;
    this.aspectRatio = this.scaleContainerWidth / this.scaleContainerHeight;
  }

  init() {
    if (!sessionStorage.getItem("user")) {
      return (window.location.href = "http://127.0.0.1:5500/registration.html");
    }

    this.scaleContainer = document.createElement("div");
    this.scaleContainer.id = "scale-container";
    document.body.append(this.scaleContainer);

    this.screenContainer = document.createElement("div");
    this.screenContainer.id = "screen-container";
    this.scaleContainer.append(this.screenContainer);

    this.menuScreen.init(this.screenContainer);
    this.gameScreen.init(this.screenContainer, this.soundLibrary);
    this.scoreScreen.init(this.screenContainer);
    this.gameController.init(this.gameScreen, this.gameModel, this.soundLibrary);
    this.gameModel.init(this.menuScreen, this.gameScreen, this.scoreScreen, this.screenChange.bind(this), this.soundLibrary);
    this.soundLibrary.init(this.menuScreen.soundImage);

    this.activeScreen = this.menuScreen.menu;

    window.addEventListener("resize", () => this.changeScreenScale());

    window.addEventListener("beforeunload", (event) => {
      event.preventDefault();
      event.returnValue = "";
    });

    // Новая игра
    this.newGame = this.menuScreen.newGameContainer;
    this.newGame.addEventListener("click", (event) => {
      if (event.target.nodeName != "A") return;
      this.screenChange(this.gameScreen.playingField);
      this.gameController.begin();
    });

    // Бежать из Игры
    this.backToMenu = this.gameScreen.backToMenuContainer;
    this.backToMenu.addEventListener("click", (event) => {
      if (event.target.nodeName != "A") return;
      this.gameScreen.choiceField.classList.remove("hideElem");
      this.soundLibrary.playTrack(this.soundLibrary.tooLateToAskForMercy);
    });

    // Да --> Бежать из Игры
    this.positiveChoice = this.gameScreen.positiveChoiceContainer;
    this.positiveChoice.addEventListener("click", (event) => {
      if (event.target.nodeName != "A") return;
      this.soundLibrary.playTrack(this.soundLibrary.yourSoulBelongsToMe);
      this.screenChange(this.menuScreen.menu);
      this.gameScreen.choiceField.classList.add("hideElem");
      this.gameModel.controller.abort();
    });

    // Нет --> Бежать из Игры
    this.negativeChoice = this.gameScreen.negativeChoiceContainer;
    this.negativeChoice.addEventListener("click", (event) => {
      if (event.target.nodeName != "A") return;
      this.soundLibrary.playTrack(this.soundLibrary.thatsBetter);
      this.gameScreen.choiceField.classList.add("hideElem");
    });

    // Таблица
    this.score = this.menuScreen.scoreContainer;
    this.score.addEventListener("click", (event) => {
      if (event.target.nodeName != "A") return;
      if (sessionStorage.getItem("user")) {
        this.scoreScreen.getUsersRecords();
      }
      this.screenChange(this.scoreScreen.scoreTable);
    });

    // Принять в Таблице
    this.addRecord = this.scoreScreen.positiveContainer;
    this.addRecord.addEventListener("click", (event) => {
      if (event.target.nodeName != "A") return;
      this.scoreScreen.userResultsbackground.classList.add("hideElem");
      this.scoreScreen.recordResultAndDisplayPlayersPlace();
    });

    // Отмена в Таблице
    this.cancelAddRecord = this.scoreScreen.negativeContainer;
    this.cancelAddRecord.addEventListener("click", (event) => {
      if (event.target.nodeName != "A") return;
      this.scoreScreen.userResultsbackground.classList.add("hideElem");
      this.scoreScreen.inputBlock.value = "";
    });

    // ОК в потребителях
    this.acceptBlock = this.scoreScreen.acceptBlock;
    this.acceptBlock.addEventListener("click", (event) => {
      if (event.target.nodeName != "A") return;
      this.scoreScreen.errorContainer.classList.add("hideElem");
    });

    // Назад из Таблицы
    this.returnMenu = this.scoreScreen.returnMenuContainer;
    this.returnMenu.addEventListener("click", (event) => {
      if (event.target.nodeName != "A") return;
      this.scoreScreen.errorContainer.classList.add("hideElem");
      this.screenChange(this.menuScreen.menu);
    });

    // Инструкция
    this.instructionContainer = this.menuScreen.instructionContainer;
    this.instructionContainer.addEventListener("click", (event) => {
      if (event.target.nodeName != "A") return;
      this.menuScreen.instructionMenu.classList.remove("hideElem");
    });

    // Общее в Инструкции
    this.sectionGeneral = this.menuScreen.sectionGeneral;
    this.sectionGeneral.addEventListener("click", (event) => {
      if (event.target.nodeName != "A") return;
      this.menuScreen.changeTab(this.menuScreen.generalContainer, event.target);
    });

    // Игра в Инструкции
    this.gameSection = this.menuScreen.gameSection;
    this.gameSection.addEventListener("click", (event) => {
      if (event.target.nodeName != "A") return;
      this.menuScreen.changeTab(this.menuScreen.gameContainer, event.target);
    });

    // Карты в Инструкции
    this.cardsSection = this.menuScreen.cardsSection;
    this.cardsSection.addEventListener("click", (event) => {
      if (event.target.nodeName != "A") return;
      this.menuScreen.changeTab(this.menuScreen.cardsContainer, event.target);
    });

    // Назад из Инструкции
    this.closeInstruction = this.menuScreen.closeInstruction;
    this.closeInstruction.addEventListener("click", (event) => {
      if (event.target.nodeName != "A") return;
      this.menuScreen.instructionMenu.classList.add("hideElem");
    });

    // Звук
    this.soundContainer = this.menuScreen.soundContainer;
    this.soundContainer.addEventListener("click", (event) => {
      if (event.target.nodeName != "A") return;
      this.menuScreen.soundImage.classList.toggle("soundOff");
      this.soundLibrary.playTrack(this.soundLibrary.deathcardCabin);
    });

    this.changeScreenScale();
  }

  screenChange(newScreen) {
    this.activeScreen.classList.add("hideElem");
    newScreen.classList.remove("hideElem");
    this.activeScreen = newScreen;
    if (newScreen === this.gameScreen.playingField) {
      document.body.classList.add("bodyBackgroundImage");
    } else {
      document.body.classList.remove("bodyBackgroundImage");
    }
  }

  changeScreenScale() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    this.requiredScreenWidth = this.windowWidth / this.screenSizeRelativeToTheGame;
    this.requiredScreenHeight = this.windowHeight / this.screenSizeRelativeToTheGame;

    this.blockWidthChangeFactor = this.requiredScreenWidth / this.scaleContainerWidth;
    this.blockHeightChangeFactor = this.requiredScreenHeight / this.scaleContainerHeight;

    const minFactor = Math.min(this.blockWidthChangeFactor, this.blockHeightChangeFactor);

    this.scaleContainer.style.transform = `scale(${minFactor})`;
  }
}
