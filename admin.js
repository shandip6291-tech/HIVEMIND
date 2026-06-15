document.addEventListener("DOMContentLoaded", function () {
    // Admin Interface Variables Setup
    const modeText = document.getElementById("panel-mode-text");
    const secretInput = document.getElementById("admin-secret-input");
    const actionBtn = document.getElementById("admin-action-btn");

    if (modeText) {
        // Vault initialization status
        modeText.textContent = "Status: Static Vault";
        modeText.style.color = "#4fc3f7";
    }

    if (actionBtn && secretInput) {
        // Secret Key Validation Functionality
        secretInput.addEventListener("input", function() {
            if (secretInput.value.trim() === "hivemind2026") {
                actionBtn.textContent = "System Authenticated";
                actionBtn.style.background = "rgba(0, 255, 204, 0.1)";
                actionBtn.style.color = "#00ffcc";
                actionBtn.style.borderColor = "#00ffcc";
            } else {
                actionBtn.textContent = "Dashboard Locked";
                actionBtn.style.background = "rgba(255, 255, 255, 0.05)";
                actionBtn.style.color = "rgba(255, 255, 255, 0.3)";
                actionBtn.style.borderColor = "rgba(255, 255, 255, 0.05)";
            }
        });
    }
});
