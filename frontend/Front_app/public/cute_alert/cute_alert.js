// cute-alert.js
window.cuteAlert = async function ({
    type,
    title,
    message,
    buttonText = "OK",
  }) {
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.className = "cute-overlay";
  
      const alertBox = document.createElement("div");
      alertBox.className = `cute-alert cute-${type}`;
  
      const alertTitle = document.createElement("strong");
      alertTitle.innerText = title;
  
      const alertMessage = document.createElement("span");
      alertMessage.innerText = message;
  
      const alertButton = document.createElement("button");
      alertButton.innerText = buttonText;
      alertButton.onclick = () => {
        document.body.removeChild(overlay);
        resolve();
      };
  
      alertBox.appendChild(alertTitle);
      alertBox.appendChild(alertMessage);
      alertBox.appendChild(alertButton);
      overlay.appendChild(alertBox);
      document.body.appendChild(overlay);
    });
  };
