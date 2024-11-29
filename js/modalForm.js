const enrollmentModal = {
  init() {
    this.setupModalHandlers();
    this.setupEnrollmentButtons();
  },

  setupModalHandlers() {
    const closeBtn = document.querySelector(".enrollment-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", this.closeModal);
    }

    // Click outside modal handler
    window.addEventListener("click", (e) => {
      const modal = document.getElementById("enrollmentModal");
      if (e.target === modal) {
        this.closeModal();
      }
    });
  },

  setupEnrollmentButtons() {
    const enrollButtons = document.querySelectorAll(".enroll-button");

    enrollButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const courseType = button.dataset.course;
        this.openModal(courseType);
      });
    });
  },

  openModal(courseType) {
    const modal = document.getElementById("enrollmentModal");
    const courseSelect = document.getElementById("course");

    if (modal) {
      modal.style.display = "block";
      if (courseType && courseSelect) {
        courseSelect.value = courseType;
      }
      document.body.style.overflow = "hidden";
    }
  },

  closeModal() {
    const modal = document.getElementById("enrollmentModal");
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  },
};

document.addEventListener("DOMContentLoaded", () => {
  enrollmentModal.init();
});

document
  .querySelector(".enrollment-submit")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const nameInput = document.querySelector("#EnrName");
    const phoneInput = document.querySelector("#EnrPhone");
    const emailInput = document.querySelector("#EnrEmail");
    const courseInput = document.querySelector("#course");

    if (!nameInput.value || !phoneInput.value) {
      alert("Будь ласка, заповніть всі обов'язкові поля");
      return;
    }

    this.classList.add("loading");
    this.disabled = true;

    const message = `🔔 Заявка на курс:
    👤 Имя: ${nameInput.value}
    📱 Телефон: ${phoneInput.value}
    💭 Email: ${emailInput.value}
    📚 Курс: ${courseInput.value}`;

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
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.ok) {
          enrollmentModal.closeModal();
          showModal();
          nameInput.value = "";
          phoneInput.value = "";
          emailInput.value = "";

        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Виникла помилка при відправці. Спробуйте ще раз");
      })
      .finally(() => {
        this.classList.remove("loading");
        this.disabled = false;
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
