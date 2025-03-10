class LoginScreen {
  constructor() {
    this.container = document.body;
    this.loginScreen = null;
    this.title = null;
    this.form = null;
    this.userNameLabel = null;
    this.userNameInput = null;
    this.userPasswordLabel = null;
    this.userPasswordInput = null;
    this.buttonsContainer = null;
    this.submitButton = null;
    this.clearButton = null;
  }

  async login(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const submitData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();

        sessionStorage.setItem("user", JSON.stringify({ name: submitData.username, token: data.token }));

        return (window.location.href = `${data.redirectUrl}`);
      } else {
        return await response.json().then((error) => {
          throw new Error(error.message);
        });
      }
    } catch (error) {
      this.userNameInput.value = "";
      this.userPasswordInput.value = "";
      this.responseContainer.innerText = `${error.message}`;
      this.responseContainer.classList.add("show-error");
    }
  }

  init() {
    this.container.classList.add("bodyBackgroundImage");

    this.loginScreen = document.createElement("div");
    this.loginScreen.id = "loginScreen";
    this.loginScreen.classList.add("screen", "centering");
    this.container.append(this.loginScreen);

    this.responseContainer = document.createElement("p");
    this.responseContainer.id = "responseContainer";
    this.responseContainer.classList.add("error-container");
    this.responseContainer.innerText = "";
    this.loginScreen.append(this.responseContainer);

    this.title = document.createElement("h1");
    this.title.classList.add("title");
    this.title.innerText = "Авторизация";
    this.loginScreen.append(this.title);

    this.form = document.createElement("form");
    this.form.id = "form";
    this.form.classList.add("form");
    this.form.addEventListener("submit", this.login.bind(this));
    this.loginScreen.append(this.form);

    this.userNameInput = document.createElement("input");
    this.userNameInput.classList.add("form-input");
    this.userNameInput.setAttribute("name", "username");
    this.userNameInput.setAttribute("placeholder", "Логин");
    this.userNameInput.setAttribute("required", true);
    this.form.append(this.userNameInput);

    this.userPasswordInput = document.createElement("input");
    this.userPasswordInput.classList.add("form-input");
    this.userPasswordInput.setAttribute("name", "password");
    this.userPasswordInput.setAttribute("type", "password");
    this.userPasswordInput.setAttribute("placeholder", "Пароль");
    this.userPasswordInput.setAttribute("required", true);
    this.form.append(this.userPasswordInput);

    this.buttonsContainer = document.createElement("div");
    this.buttonsContainer.classList.add("buttons-container");
    this.form.append(this.buttonsContainer);

    this.submitButton = document.createElement("button");
    this.submitButton.classList.add("submit-button");
    this.submitButton.innerText = "Принять";
    this.buttonsContainer.append(this.submitButton);

    this.clearButton = document.createElement("button");
    this.clearButton.classList.add("clear-button");
    this.clearButton.setAttribute("type", "reset");
    this.clearButton.innerText = "Очистить";
    this.buttonsContainer.append(this.clearButton);

    this.notification = document.createElement("a");
    this.notification.classList.add("notification");
    this.notification.innerText = "Перейти к регистрации";
    this.notification.setAttribute("href", "http://127.0.0.1:5500/registration.html");
    this.loginScreen.append(this.notification);
  }
}
