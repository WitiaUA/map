document.addEventListener("DOMContentLoaded", function () {
    const map = document.querySelector(".map");
    const mapContainer = document.querySelector(".map-container");
    const markers = document.querySelectorAll(".marker");

    let scale = 1;
    let translateX = 0, translateY = 0;
    let startX, startY, isDragging = false;

    // Масштабування карти з фокусом на мишку
    mapContainer.addEventListener("wheel", function (event) {
        event.preventDefault();

        const scaleFactor = 0.05; // Менший крок для плавного масштабування
        let newScale = scale + (event.deltaY < 0 ? scaleFactor : -scaleFactor);
        newScale = Math.max(0.8, Math.min(2, newScale)); // Обмеження масштабу

        // Отримуємо координати мишки відносно карти
        const rect = map.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Обчислюємо зміщення, щоб масштабувалося до мишки
        const deltaX = (mouseX / scale) * (newScale - scale);
        const deltaY = (mouseY / scale) * (newScale - scale);

        translateX -= deltaX;
        translateY -= deltaY;
        scale = newScale;

        updateTransform();
    });

    // Початок перетягування мишею
    mapContainer.addEventListener("mousedown", function (event) {
        isDragging = true;
        startX = event.clientX - translateX;
        startY = event.clientY - translateY;
        mapContainer.style.cursor = "grabbing";
    });

    // Переміщення мапи
    window.addEventListener("mousemove", function (event) {
        if (!isDragging) return;
        translateX = event.clientX - startX;
        translateY = event.clientY - startY;
        updateTransform();
    });

    // Завершення перетягування
    window.addEventListener("mouseup", function () {
        isDragging = false;
        mapContainer.style.cursor = "grab";
    });

    // Оновлення трансформації карти
    function updateTransform() {
        map.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

        // Маркери пропорційно збільшуються, але не стають занадто маленькими/великими
        markers.forEach(marker => {
            marker.style.transform = `translate(-50%, -50%) scale(${1 + (scale - 1) * 0.5})`;
        });
    }
});
