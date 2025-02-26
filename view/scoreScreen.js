class ScoreScreen {
  constructor() {
    this.scoreTable = null;
    this.scoreTableBlock = null;
    this.returnMenuContainer = null;
    this.returnMenuBlock = null;
    this.userResultsContainer = null;
    this.congratulationBlock = null;
    this.messageBlock = null;
    this.inputBlock = null;
    this.positiveContainer = null;
    this.negativeContainer = null;
    this.errorContainer = null;
    this.errorBlock = null;
    this.acceptBlock = null;
    this.returnMenu = null;
    this.leaders = [];
    this.userResult = null;
  }

  init(container) {
    this.scoreTable = document.createElement("div");
    this.scoreTable.classList.add("scoreTable", "screen", "hideElem");

    this.scoreTableBlock = document.createElement("div");
    this.scoreTableBlock.classList.add("scoreTableBlock");
    this.scoreTable.append(this.scoreTableBlock);

    this.getUsersRecords().then(() => {
      this.createScoresTable(this.leaders);
    });

    this.returnMenuContainer = document.createElement("div");
    this.returnMenuContainer.classList.add("returnMenuContainer");
    this.returnMenuBlock = document.createElement("p");
    this.returnMenuBlock.classList.add("returnMenuBlock");
    this.returnMenuBlock.innerHTML = `<a href="#" class="returnMenu returnMenuHover returnMenuFocus">Назад</a>`;
    this.returnMenuContainer.append(this.returnMenuBlock);
    this.scoreTable.append(this.returnMenuContainer);

    this.userResultsbackground = document.createElement("div");
    this.userResultsbackground.classList.add("userResultsbackground", "hideElem");
    this.userResultsContainer = document.createElement("div");
    this.userResultsContainer.classList.add("userResultsContainer");
    this.userResultsbackground.append(this.userResultsContainer);
    this.congratulationBlock = document.createElement("p");
    this.congratulationBlock.classList.add("congratulationBlock");
    this.congratulationBlock.innerText = "Поздравляю!\n Вы прошли испытание";
    this.userResultsContainer.append(this.congratulationBlock);
    this.messageBlock = document.createElement("p");
    this.messageBlock.classList.add("messageBlock");
    this.messageBlock.innerText = "Введите Ваше имя";
    this.userResultsContainer.append(this.messageBlock);
    this.inputBlock = document.createElement("input");
    this.inputBlock.classList.add("inputBlock");
    this.inputBlock.setAttribute("type", "text");
    this.inputBlock.setAttribute("name", "userName");
    this.inputBlock.setAttribute("value", "");
    this.inputBlock.setAttribute("autocomplete", "off");
    this.userResultsContainer.append(this.inputBlock);
    this.positiveContainer = document.createElement("p");
    this.positiveContainer.classList.add("positiveContainer");
    this.positiveContainer.innerHTML = `<a href="#" class="positive positiveHover positiveFocus">Принять</a>`;
    this.userResultsContainer.append(this.positiveContainer);
    this.negativeContainer = document.createElement("p");
    this.negativeContainer.classList.add("negativeContainer");
    this.negativeContainer.innerHTML = `<a href="#" class="negative negativeHover negativeFocus">Отмена</a>`;
    this.userResultsContainer.append(this.negativeContainer);

    this.errorContainer = document.createElement("div");
    this.errorContainer.classList.add("errorContainer", "hideElem");
    this.errorBlock = document.createElement("p");
    this.errorBlock.classList.add("errorBlock");
    this.acceptBlock = document.createElement("p");
    this.acceptBlock.classList.add("acceptBlock");
    this.acceptBlock.innerHTML = `<a href="#" class="accept acceptHover acceptFocus">Хорошо</a>`;
    this.errorContainer.append(this.acceptBlock);
    this.errorContainer.append(this.errorBlock);
    this.scoreTable.append(this.errorContainer);
    this.scoreTable.append(this.userResultsbackground);

    container.append(this.scoreTable);
  }

  createScoresTable() {
    this.scoreTableBlock.innerHTML = `
				<table class="table">
					<tr>
						<td class="leftCell">Место</td>
						<td class="centerCell">Имя игрока</td>
						<td>Счет</td>
					</tr>
					${this.leaders
            .map(
              (user, index) => `
						<tr>
							<td class="leftCell">${index + 1}</td>
							<td class="centerCell">${user.name}</td>
							<td>${user.record}</td>
						</tr>
					`
            )
            .join("")}
				</table>
			`;
  }

  stopGame(playerTotalNumberOfMoves) {
    this.userResultsbackground.classList.remove("hideElem");
    this.userResult = playerTotalNumberOfMoves;
  }

  recordResultAndDisplayPlayersPlace() {
    this.addUsersRecords(this.inputBlock.value, this.userResult)
      .then(() => {
        return this.getUsersRecords();
      })
      .then(() => {
        this.createScoresTable(this.leaders);
      });
  }

  // getUsersRecords() {
  // 	return myAppDB.collection("users").get()
  // 	.then((querySnapshot) => {
  // 		const usersData = querySnapshot.docs.map( (doc) => doc.data());
  // 		usersData.sort( (a, b) => a.record - b.record);
  // 		this.leaders = usersData.slice(0, 8);

  // 	})
  // 	.catch((error) => {
  // 		this.scoreTableBlock.classList.add("hideElem");
  // 		this.errorContainer.classList.remove("hideElem");
  // 		this.errorBlock.innerText = `Не удается получить данные с сервера`;
  // 	})
  // 	.finally( () => {
  // 		this.inputBlock.value = "";
  // 	})
  // }

  async getUsersRecords() {
    const users = await fetch("http://localhost:5000/auth/users", { method: "GET" }).then((response) => {
      console.log("response", response);
    });
  }

  addUsersRecords(name, playerTotalNumberOfMoves) {
    return myAppDB
      .collection("users")
      .add({
        name: name,
        record: playerTotalNumberOfMoves,
      })
      .then((docRef) => {
        this.errorContainer.classList.remove("hideElem");
        this.errorBlock.innerText = `Данные успешно сохранены`;
      })
      .catch((error) => {
        this.errorContainer.classList.remove("hideElem");
        this.errorBlock.innerText = `Данные не были записаны`;
      })
      .finally(() => {
        this.inputBlock.value = "";
      });
  }
}
