
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Валидация email
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Добавление подписчика в Firestore
async function addSubscriber(email, method, phone = null) {
    try {
        const docRef = await addDoc(collection(db, "subscribers"), { email, method, phone });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}

// Обработка событий на странице
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('subscribeButton').addEventListener('click', function () {
        document.getElementById('subscribePopup').style.display = 'block';
    });

    document.getElementById('method').addEventListener('change', function () {
        const phoneInput = document.getElementById('phoneInput');
        phoneInput.classList.toggle('hidden', this.value !== 'phone');
        if (this.value !== 'phone') document.getElementById('phone').value = '';
    });

    document.getElementById('subscribeForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const method = document.getElementById('method').value;
        const phone = method === 'phone' ? document.getElementById('phone').value : null;

        if (!validateEmail(email)) {
            alert("Пожалуйста, введите действительный email.");
            return;
        }

        addSubscriber(email, method, phone).then(() => {
            alert('Вы успешно подписались на уведомления!');
            document.getElementById('subscribePopup').style.display = 'none';
        }).catch(error => {
            alert('Произошла ошибка при подписке.');
        });
    });
});



