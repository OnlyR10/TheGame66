class RegistrationScreen {
  constructor() {
    this.container = document.body;
    this.registrationScreen = null;
    this.responseContainer = null;
    this.title = null;
    this.form = null;
    this.userNameInput = null;
    this.userPasswordInput = null;
    this.userConfirmPasswordInput = null;
    this.buttonsContainer = null;
    this.submitButton = null;
    this.clearButton = null;
    this.notification = null;
  }

  async registration(event) {
    this.responseContainer.innerText = "";
    this.responseContainer.classList.remove("show-error");

    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const submitData = {
      username: formData.get("username"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (submitData.password !== submitData.confirmPassword) {
      this.responseContainer.innerText = "Пароли не совпадают";
      this.responseContainer.classList.add("show-error");

      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/registration", {
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
      this.responseContainer.innerText = `${error.message}`;
      this.responseContainer.classList.add("show-error");
    }
  }

  init() {
    this.container.classList.add("bodyBackgroundImage");

    this.registrationScreen = document.createElement("div");
    this.registrationScreen.id = "registration";
    this.registrationScreen.classList.add("screen", "centering");
    this.container.append(this.registrationScreen);

    this.responseContainer = document.createElement("p");
    this.responseContainer.id = "responseContainer";
    this.responseContainer.classList.add("error-container");
    this.responseContainer.innerText = "";
    this.registrationScreen.append(this.responseContainer);

    this.title = document.createElement("h1");
    this.title.classList.add("title");
    this.title.innerText = "Регистрация";
    this.registrationScreen.append(this.title);

    this.form = document.createElement("form");
    this.form.id = "form";
    this.form.classList.add("form");
    this.form.addEventListener("submit", this.registration.bind(this));
    this.registrationScreen.append(this.form);

    this.userNameInput = document.createElement("input");
    this.userNameInput.classList.add("form-input", "input-login");
    this.userNameInput.id = "username";
    this.userNameInput.setAttribute("name", "username");
    this.userNameInput.setAttribute("placeholder", "Логин");
    this.userNameInput.setAttribute("required", true);
    this.form.append(this.userNameInput);

    this.userPasswordInput = document.createElement("input");
    this.userPasswordInput.classList.add("form-input", "input-password");
    this.userPasswordInput.id = "password";
    this.userPasswordInput.setAttribute("name", "password");
    this.userPasswordInput.setAttribute("type", "password");
    this.userPasswordInput.setAttribute("placeholder", "Пароль");
    this.userPasswordInput.setAttribute("required", true);
    this.form.append(this.userPasswordInput);

    this.userConfirmPasswordInput = document.createElement("input");
    this.userConfirmPasswordInput.classList.add("form-input", "input-confirm-password");
    this.userConfirmPasswordInput.id = "confirmPassword";
    this.userConfirmPasswordInput.setAttribute("name", "confirmPassword");
    this.userConfirmPasswordInput.setAttribute("type", "password");
    this.userConfirmPasswordInput.setAttribute("placeholder", "Подтвердите пароль");
    this.userConfirmPasswordInput.setAttribute("required", true);
    this.form.append(this.userConfirmPasswordInput);

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
    this.notification.innerText = "У меня уже есть учетная запись";
    this.notification.setAttribute("href", "http://127.0.0.1:5500/login.html");
    this.registrationScreen.append(this.notification);
  }
}
