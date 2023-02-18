const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const payload = {
    email: loginForm.email.value,
    pass: loginForm.pass.value,
  };

  fetch("http://localhost:4500/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      localStorage.setItem("token", res.token);
    })
    .catch((err) =>
      console.log({ msg: "Something went wrong", err: err.message })
    );

  console.log(payload);
});
