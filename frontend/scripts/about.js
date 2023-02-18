function whereIs(element) {
  /* Is element visible in viewport? Return "b" if before, "v" if visible and "a" if after */
  const rect = element.getBoundingClientRect();
  if (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
    return "v"; // Visible
  if (rect.top < 0 || rect.left < 0) return "b"; // Before
  return "a"; // After
}

function loadBars() {
  let imgs = document.querySelectorAll("main img"); // All main images
  let bar_before = document.querySelector("#bar_before ul");
  let bar_after = document.querySelector("#bar_after ul");
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    let where_is = whereIs(img);
    /* Append HTML of image to bars */
    bar_before.insertAdjacentHTML(
      "beforeend",
      `<li ${where_is == "b" ? "" : "class='hidden'"} id="bb_${
        img.id
      }"> <a href="#${img.id}"><img src="${img.src}" alt="${
        img.alt
      }" /></a></li>`
    ); // Add class as hidden if is not before
    bar_after.insertAdjacentHTML(
      "beforeend",
      `<li ${where_is == "a" ? "" : "class='hidden'"} id="ba_${
        img.id
      }"> <a href="#${img.id}"><img src="${img.src}" alt="${
        img.alt
      }" /></a></li>`
    );
  }
}

window.onload = loadBars; // Load bars on page load

function refreshBars() {
  let imgs = document.querySelectorAll("main img"); // All main images

  /* For each img */
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    let where_is = whereIs(img);

    /* Change class of images if needed */
    document.querySelector(`#bb_${img.id}`).className =
      where_is == "b" ? "" : "hidden"; // Visible if before current - show on *before* bar

    document.querySelector(`#ba_${img.id}`).className =
      where_is == "a" ? "" : "hidden"; // Visible if before current - show on *after* bar
  }
}
