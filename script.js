document.addEventListener("DOMContentLoaded", function() {
    const mapContainer = document.querySelector(".map-container");
    const map = document.querySelector(".map");

    let scale = 1;
    let startX, startY, offsetX = 0, offsetY = 0;
    let isDragging = false;

    // Масштабування мишею (колесо)
    mapContainer.addEventListener("wheel", function(event) {
        event.preventDefault();
        let scaleAmount = event.deltaY * -0.001;
        scale += scaleAmount;
        scale = Math.min(Math.max(0.5, scale), 3); // Обмеження масштабу
        map.style.transform = `translate(-50%, -50%) scale(${scale})`;
    });

    // Початок перетягування мишею
    mapContainer.addEventListener("mousedown", function(event) {
        isDragging = true;
        startX = event.clientX - offsetX;
        startY = event.clientY - offsetY;
        mapContainer.style.cursor = "grabbing";
    });

    // Переміщення карти
    mapContainer.addEventListener("mousemove", function(event) {
        if (!isDragging) return;
        offsetX = event.clientX - startX;
        offsetY = event.clientY - startY;
        map.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${scale})`;
    });

    // Відпускання миші
    mapContainer.addEventListener("mouseup", function() {
        isDragging = false;
        mapContainer.style.cursor = "grab";
    });

    // Додавання підтримки для сенсорних екранів
    let touchStartX, touchStartY;
    mapContainer.addEventListener("touchstart", function(event) {
        if (event.touches.length === 1) { // Перетягування
            isDragging = true;
            touchStartX = event.touches[0].clientX - offsetX;
            touchStartY = event.touches[0].clientY - offsetY;
        }
    });

    mapContainer.addEventListener("touchmove", function(event) {
        if (!isDragging || event.touches.length !== 1) return;
        event.preventDefault();
        offsetX = event.touches[0].clientX - touchStartX;
        offsetY = event.touches[0].clientY - touchStartY;
        map.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${scale})`;
    });

    mapContainer.addEventListener("touchend", function() {
        isDragging = false;
    });

    // Додавання підтримки жесту для масштабування
    let touchDistanceStart = 0;
    mapContainer.addEventListener("touchstart", function(event) {
        if (event.touches.length === 2) {
            touchDistanceStart = Math.hypot(
                event.touches[0].clientX - event.touches[1].clientX,
                event.touches[0].clientY - event.touches[1].clientY
            );
        }
    });

    mapContainer.addEventListener("touchmove", function(event) {
        if (event.touches.length === 2) {
            event.preventDefault();
            let touchDistanceEnd = Math.hypot(
                event.touches[0].clientX - event.touches[1].clientX,
                event.touches[0].clientY - event.touches[1].clientY
            );
            let scaleChange = (touchDistanceEnd / touchDistanceStart) - 1;
            scale += scaleChange;
            scale = Math.min(Math.max(0.5, scale), 3);
            map.style.transform = `translate(-50%, -50%) scale(${scale})`;
            touchDistanceStart = touchDistanceEnd;
        }
    });
});
