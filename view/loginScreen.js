class LoginScreen {
  constructor() {
    this.container = document.body;
    this.login = null;
    this.form = null;
    this.userNameLabel = null;
    this.userNameInput = null;
    this.userPasswordLabel = null;
    this.userPasswordInput = null;
    this.submitButton = null;
    this.clearButton = null;
  }

  init() {
    this.container.classList.add("bodyBackgroundImage");

    this.login = document.createElement("div");
    this.login.id = "login";
    this.login.classList.add("screen", "centering");
    this.container.append(this.login);

    this.form = document.createElement("form");
    this.form.id = "form";
    this.form.classList.add("form");
    this.form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const submitData = {
        username: formData.get("username"),
        password: formData.get("password"),
      };

      // console.log(submitData);

      try {
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          body: JSON.stringify(submitData), // Отправляем JSON
          headers: {
            "Content-Type": "application/json", // Только этот заголовок нужен
            // credentials: "include",
          },
        });

        if (!response.ok) {
          throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
        }

        const data = await response.json();
        console.log("Ответ от сервера:", data);
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    });
    this.login.append(this.form);

    this.userNameLabel = document.createElement("label");
    this.userNameLabel.classList.add("input-label");
    this.userNameLabel.innerText = "Логин";
    this.form.append(this.userNameLabel);

    this.userNameInput = document.createElement("input");
    this.userNameInput.classList.add("form-input");
    this.userNameInput.setAttribute("name", "username");
    this.userNameLabel.append(this.userNameInput);

    this.userPasswordLabel = document.createElement("label");
    this.userPasswordLabel.classList.add("input-label");
    this.userPasswordLabel.innerText = "Пароль";
    this.form.append(this.userPasswordLabel);

    this.userPasswordInput = document.createElement("input");
    this.userPasswordInput.classList.add("form-input");
    this.userPasswordInput.setAttribute("name", "password");
    this.userPasswordInput.setAttribute("type", "password");
    this.userPasswordLabel.append(this.userPasswordInput);

    this.submitButton = document.createElement("button");
    this.submitButton.classList.add("submit-button");
    this.submitButton.innerText = "Принять";
    this.form.append(this.submitButton);

    this.clearButton = document.createElement("button");
    this.clearButton.classList.add("clear-button");
    this.clearButton.setAttribute("type", "reset");
    this.clearButton.innerText = "Очистить";
    this.form.append(this.clearButton);
  }
}

// export const loginScreen = new LoginScreen();
