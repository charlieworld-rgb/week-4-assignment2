const form = document.getElementById("form");
const display = document.getElementById("app");

async function fetchData() {
  const response = await fetch(`https://week-4-assignment2-server.onrender.com`)
  const request = await response.json()
  console.log(request);
  return request;
}

async function displayNotes() {
  const guestnote = await fetchData();

  guestnote.forEach((guestnote) => {
    const div = document.createElement("div");
    const guestname = document.createElement("p");
    const guestWords = document.createElement("p");

    guestname.textContent = guestnote.guest_book;
    guestWords.textContent = guestnote.content;

    display.appendChild(div);
    div.appendChild(guestname)
    div.append(guestWords)
  });
}

displayNotes();

async function handlesubmit(e) {
  e.preventDefault();

  const formdata = new FormData(form);
  const guestDATA = Object.fromEntries(formdata);
  const guestDATAJSON = JSON.stringify(guestDATA);

  const request = await fetch(`https://week-4-assignment2-server.onrender.com`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: guestDATAJSON,
  });

  window.location.reload();
}

form.addEventListener("submit", handlesubmit);
