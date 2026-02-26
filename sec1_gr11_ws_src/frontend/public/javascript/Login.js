document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const loginId = document.getElementById("log_id").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ loginId, password }),
            });

            if (response.ok) {
                const data = await response.json();
                alert("Login successful!");

                const loginRole = data.data.login_role;
                if (["Tester", "Boss", "Product Manager"].includes(loginRole)) {
                    window.location.href = "userManagement";
                }
            } else {
                alert("Invalid login credentials");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error during login");
        }
    });
});