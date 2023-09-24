const InputIds = ["name", "email", "password", "confirm-password"];

const form = document.querySelector("form");
const getById = (id) => document.getElementById(id).value.trim();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputData = {};
  InputIds.forEach((id) => {
    inputData[id] = getById(id);
  });

  const errors = validate(inputData);
  removeAllErrors();
  if (Object.keys(errors).length > 0) {
    Object.entries(errors).forEach(([id, error]) => {
      const errorElement = document.getElementById(`${id}-error`);
      errorElement.innerText = error;
    });
  } else {
    window.location.href = "./success.html";
  }
});

const validate = (inputData) => {
  const errors = {};

  Object.entries(inputData).forEach(([id, value]) => {
    if (id === "name" && value.length < 3) {
      errors[id] = "Name must be at least 3 characters long";
    }

    if (id === "email" && !value.includes("@")) {
      errors[id] = "Email must be valid";
    }

    if (id === "password" && value.length < 6) {
      errors[id] = "Password must be at least 6 characters long";
    }

    if (id === "confirm-password" && value !== getById("password")) {
      errors[id] = "Passwords must match";
    }
  });

  return errors;
};

function removeAllErrors() {
  InputIds.forEach((id) => {
    const errorElement = document.getElementById(`${id}-error`);
    errorElement.innerText = "";
  });
}
