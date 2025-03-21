document.addEventListener("DOMContentLoaded", function() {
    const map = document.querySelector(".map");
    const mapContainer = document.querySelector(".map-container");
    let scale = 1;
    let translateX = 0, translateY = 0;
    let startX, startY, isDragging = false;

    // Масштабування колесом миші
    mapContainer.addEventListener("wheel", function(event) {
        event.preventDefault();
        let scaleAmount = event.deltaY > 0 ? 0.9 : 1.1;
        scale *= scaleAmount;
        scale = Math.max(0.5, Math.min(3, scale)); // Обмеження масштабу

        map.style.transform = `scale(${scale})`;
    });

    // Перетягування мишею
    mapContainer.addEventListener("mousedown", function(event) {
        isDragging = true;
        startX = event.clientX - translateX;
        startY = event.clientY - translateY;
        map.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", function(event) {
        if (!isDragging) return;
        translateX = event.clientX - startX;
        translateY = event.clientY - startY;
        limitMapPosition();
        map.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    });

    window.addEventListener("mouseup", function() {
        isDragging = false;
        map.style.cursor = "grab";
    });

    // Обмежуємо рух карти
    function limitMapPosition() {
        const mapRect = map.getBoundingClientRect();
        const containerRect = mapContainer.getBoundingClientRect();

        if (mapRect.left > containerRect.left) translateX -= mapRect.left - containerRect.left;
        if (mapRect.top > containerRect.top) translateY -= mapRect.top - containerRect.top;
        if (mapRect.right < containerRect.right) translateX += containerRect.right - mapRect.right;
        if (mapRect.bottom < containerRect.bottom) translateY += containerRect.bottom - mapRect.bottom;
    }
});
