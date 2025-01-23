// JavaScript для открытия и закрытия описаний
document.querySelectorAll('.pest-item h3, .pest-item img').forEach(item => {
    item.addEventListener('click', function() {
    const description = this.parentElement.querySelector('.pest-description');
    if (description.style.display === "none" || description.style.display === "") {
        description.style.display = "block";
    } else {
        description.style.display = "none";
    }
});

// Закрытие блока по нажатию на кнопку "Закрыть"
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const description = this.parentElement;
        description.style.display = 'none';
    });
});

// Закрытие блока при клике вне области (если нужно)
document.querySelectorAll('.pest-description').forEach(desc => {
    desc.addEventListener('click', function(event) {
        if (event.target === desc) {
            desc.style.display = 'none';
        }
    });
});
});
