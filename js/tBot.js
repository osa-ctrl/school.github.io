const button = document.querySelector(".submit-button");
button.addEventListener("click", (event) => {
  event.preventDefault();
  const nameInput = document.querySelector("#name");
  const phoneInput = document.querySelector("#phone");
  const msgInput = document.querySelector("#message");

  if (!nameInput.value || !phoneInput.value) {
    return;
  }

  const message = `🔔 Новое сообщение с сайта:
👤 Имя: ${nameInput.value}
📱 Телефон: ${phoneInput.value}
💭 Сообщение: ${msgInput.value}`;

  const token = "6477657010:AAGTuVDuds3Ip0TRTwFUs6wsudWdzx7wM2k";
  const chatId = "708915074";

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        showModal();
        nameInput.value = "";
        phoneInput.value = "";
        msgInput.value = "";
      }
    });
});

function showModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
  requestAnimationFrame(() => {
    modal.classList.add("show");
  });
}

function closeModal() {
  const modal = document.getElementById("myModal");
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

window.addEventListener("click", (event) => {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    closeModal();
  }
});
