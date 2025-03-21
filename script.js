document.addEventListener("DOMContentLoaded", function () {
    const map = document.querySelector(".map");
    const mapContainer = document.querySelector(".map-container");
    const markers = document.querySelectorAll(".marker");
    let scale = 1;
    let translateX = 0, translateY = 0;
    let startX, startY, isDragging = false;

    // Масштабування з фокусом на мишку
    mapContainer.addEventListener("wheel", function (event) {
        event.preventDefault();

        const scaleFactor = 0.1;
        let newScale = scale + (event.deltaY < 0 ? scaleFactor : -scaleFactor);
        newScale = Math.max(0.5, Math.min(3, newScale)); // Обмеження масштабу

        // Отримуємо координати мишки відносно карти
        const rect = map.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Обчислюємо зміщення для центрування мишки
        const deltaX = (mouseX / scale) * (newScale - scale);
        const deltaY = (mouseY / scale) * (newScale - scale);

        translateX -= deltaX;
        translateY -= deltaY;

        scale = newScale;
        updateTransform();
    });

    // Перетягування карти мишею
    mapContainer.addEventListener("mousedown", function (event) {
        isDragging = true;
        startX = event.clientX - translateX;
        startY = event.clientY - translateY;
        map.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", function (event) {
        if (!isDragging) return;
        translateX = event.clientX - startX;
        translateY = event.clientY - startY;
        limitMapPosition();
        updateTransform();
    });

    window.addEventListener("mouseup", function () {
        isDragging = false;
        map.style.cursor = "grab";
    });

    // Оновлення трансформації карти
    function updateTransform() {
        map.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

        // ✅ Фіксуємо розмір міток
        markers.forEach(marker => {
            marker.style.transform = `translate(-50%, -50%) scale(${1 / scale})`;
        });
    }

    // Обмеження руху карти
    function limitMapPosition() {
        const mapRect = map.getBoundingClientRect();
        const containerRect = mapContainer.getBoundingClientRect();

        if (mapRect.left > containerRect.left) translateX -= mapRect.left - containerRect.left;
        if (mapRect.top > containerRect.top) translateY -= mapRect.top - containerRect.top;
        if (mapRect.right < containerRect.right) translateX += containerRect.right - mapRect.right;
        if (mapRect.bottom < containerRect.bottom) translateY += containerRect.bottom - mapRect.bottom;
    }
});
