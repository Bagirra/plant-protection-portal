
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Firebase конфигурация и инициализация
const firebaseConfig = {
    apiKey: "AIzaSyD2-uD34cHObkqQ8RE-Q6Dyb2vadfb2WtU",
    authDomain: "plant-49d4d.firebaseapp.com",
    projectId: "plant-49d4d",
    storageBucket: "plant-49d4d.appspot.com",
    messagingSenderId: "531376250260",
    appId: "1:531376250260:web:5990e5414890299a6c0381",
    measurementId: "G-45R61MG9V5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle user state changes
onAuthStateChanged(auth, (user) => {
    const loginNav = document.getElementById("loginNav");
    const registerNav = document.getElementById("registerNav");
    const navMenu = document.getElementById("navMenu");

    if (user) {
        // User is logged in
        loginNav.style.display = "none";
        registerNav.style.display = "none";

        // Add "Личный кабинет" and "Выход"
        const dashboardNav = document.createElement("li");
        dashboardNav.id = "dashboardNav";
        dashboardNav.innerHTML = `<a href="dashboard.html">Личный кабинет</a>`;
        navMenu.appendChild(dashboardNav);

        const logoutNav = document.createElement("li");
        logoutNav.id = "logoutNav";
        logoutNav.innerHTML = `<a href="#" id="logoutButton">Выход</a>`;
        navMenu.appendChild(logoutNav);

        // Handle logout
        document.getElementById("logoutButton").addEventListener("click", (e) => {
            e.preventDefault();
            signOut(auth)
                .then(() => {
                    // Refresh page after logout
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Ошибка при выходе:", error);
                });
        });
    } else {
        // User is logged out
        loginNav.style.display = "block";
        registerNav.style.display = "block";

        // Remove "Личный кабинет" and "Выход" if they exist
        const dashboardNav = document.getElementById("dashboardNav");
        const logoutNav = document.getElementById("logoutNav");
        if (dashboardNav) dashboardNav.remove();
        if (logoutNav) logoutNav.remove();
    }
});