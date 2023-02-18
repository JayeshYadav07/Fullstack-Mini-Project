const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const payload = {
    name: signupForm.name.value,
    email: signupForm.email.value,
    pass: signupForm.pass.value,
  };

  console.log(payload);
  fetch("http://localhost:4500/users/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => console.log(res, "res"))
    .catch((err) =>
      console.log({ msg: "Something went wrong", err: err.message })
    );
});
