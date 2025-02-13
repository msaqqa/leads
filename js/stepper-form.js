document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".step");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const submitBtn = document.getElementById("submitBtn");
  const form = document.getElementById("stepperForm");
  const progressCircle = document.getElementById("progress-circle");
  const progressText = document.getElementById("progress-text");

  let currentStep = 0;
  const formData = {};

  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.classList.toggle("hidden", index !== stepIndex);
    });

    prevBtn.classList.toggle("hidden", stepIndex === 0);
    nextBtn.classList.toggle("hidden", stepIndex >= steps.length - 2);
    submitBtn.classList.toggle("hidden", stepIndex !== steps.length - 2);

    validateStep(stepIndex);
    updateProgress(); // Call updateProgress after showing the step
  }

  function validateStep(stepIndex) {
    const currentStepElement = steps[stepIndex];
    const inputFields = currentStepElement.querySelectorAll("input");
    const selectedCard = currentStepElement.querySelector(
      ".option-card[data-selected='true']"
    );

    if (inputFields.length > 0) {
      const isValid = Array.from(inputFields).every(
        (input) => input.value.trim() !== ""
      );
      if (stepIndex === steps.length - 2) {
        submitBtn.disabled = !isValid;
      } else {
        nextBtn.disabled = !isValid;
      }
      return isValid;
    } else {
      nextBtn.disabled = !selectedCard;
      return !!selectedCard;
    }
  }

  function collectInputValues(stepIndex) {
    const currentStepElement = steps[stepIndex];
    const inputFields = currentStepElement.querySelectorAll("input");

    inputFields.forEach((input) => {
      const name = input.getAttribute("name");
      const value = input.value.trim();
      if (name) {
        formData[name] = value;
      }
    });
  }

  function autoAdvance() {
    if (currentStep < steps.length - 1) {
      collectInputValues(currentStep);
      currentStep++;
      showStep(currentStep);
      restoreSelectedCard();
    }
  }

  steps.forEach((step, index) => {
    const optionCards = step.querySelectorAll(".option-card");
    optionCards.forEach((card) => {
      card.addEventListener("click", () => {
        const stepKey = card.getAttribute("data-step");
        const answer = card.getAttribute("data-answer");

        optionCards.forEach((sibling) =>
          sibling.removeAttribute("data-selected")
        );
        card.setAttribute("data-selected", "true");
        formData[stepKey] = answer;

        autoAdvance();
      });
    });

    const inputFields = step.querySelectorAll("input");
    inputFields.forEach((input) => {
      input.addEventListener("input", () => {
        validateStep(index);
      });
    });
  });

  nextBtn.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
      if (validateStep(currentStep)) {
        collectInputValues(currentStep);
        currentStep++;
        showStep(currentStep);
        restoreSelectedCard();
      }
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
      restoreSelectedCard();
    }
  });

  submitBtn.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      collectInputValues(currentStep);
      console.log("Collected Data:", formData);
      currentStep++;
      showStep(currentStep); // Proceed to the final success step
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  function restoreSelectedCard() {
    const currentStepElement = steps[currentStep];
    const stepKey = currentStepElement
      .querySelector(".option-card")
      ?.getAttribute("data-step");
    if (!stepKey) return;

    const selectedAnswer = formData[stepKey];
    if (selectedAnswer) {
      const cardToSelect = currentStepElement.querySelector(
        `.option-card[data-answer='${selectedAnswer}']`
      );
      if (cardToSelect) {
        cardToSelect.setAttribute("data-selected", "true");
      }
    }
    validateStep(currentStep);
  }

  function updateProgress() {
    const progressPercent = (currentStep / (steps.length - 1)) * 100;
    if (progressCircle) {
      const offset = 314 - (314 * progressPercent) / 100; // Assuming a circle circumference of 314
      progressCircle.style.strokeDashoffset = offset;
    }
    if (progressText) {
      progressText.textContent = `${Math.round(progressPercent)}%`;
    }
  }

  showStep(currentStep);
});
