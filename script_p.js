import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Инициализация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD2-uD34cHObkqQ8RE-Q6Dyb2vadfb2WtU",
    authDomain: "plant-49d4d.firebaseapp.com",
    projectId: "plant-49d4d",
    storageBucket: "plant-49d4d.appspot.com",
    messagingSenderId: "531376250260",
    appId: "1:531376250260:web:5990e5414890299a6c0381",
    measurementId: "G-45R61MG9V5"
};

// Инициализация приложения
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Проверка статуса пользователя при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = "login.html"; // Перенаправление на страницу входа, если пользователь не авторизован
        }
    });
});

// Функция выхода
function logout() {
    signOut(auth)
        .then(() => {
            window.location.href = "index.html"; // Перенаправление на главную после выхода
        })
        .catch((error) => {
            console.error("Ошибка при выходе:", error);
        });
}




function togglePlan(planId) {
    const planContent = document.getElementById(planId);
    if (planContent.style.display === "none" || planContent.style.display === "") {
        planContent.style.display = "block";
    } else {
        planContent.style.display = "none";
    }
}

function showDetails(detailId) {
    const detailContent = document.getElementById(detailId);
    if (detailContent.classList.contains("hidden")) {
        detailContent.classList.remove("hidden");
    } else {
        detailContent.classList.add("hidden");
    }
}
