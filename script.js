document.addEventListener("DOMContentLoaded", function() {
    const map = document.querySelector(".map");
    let scale = 1;
    let startX, startY, isDragging = false;
    let translateX = 0, translateY = 0;

    const markers = [
        { id: "perdichium", x: 40.25, y: 42.99 },
        { id: "marker1", x: 30, y: 40 },
        { id: "marker2", x: 60, y: 70 }
    ];

    function updateMarkers() {
        const bg = document.querySelector(".background");
        const rect = bg.getBoundingClientRect();

        markers.forEach(marker => {
            const el = document.getElementById(marker.id);
            el.style.left = `${rect.left + (marker.x * rect.width / 100)}px`;
            el.style.top = `${rect.top + (marker.y * rect.height / 100)}px`;
        });
    }

    // Масштабування колесом миші
    window.addEventListener("wheel", function(event) {
        event.preventDefault();
        const scaleAmount = event.deltaY > 0 ? 0.9 : 1.1;
        scale *= scaleAmount;
        scale = Math.min(Math.max(0.5, scale), 3); // Обмеження масштабу

        map.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        updateMarkers();
    });

    // Перетягування мишею
    map.addEventListener("mousedown", function(event) {
        isDragging = true;
        startX = event.clientX - translateX;
        startY = event.clientY - translateY;
        map.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", function(event) {
        if (!isDragging) return;
        translateX = event.clientX - startX;
        translateY = event.clientY - startY;
        map.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        updateMarkers();
    });

    window.addEventListener("mouseup", function() {
        isDragging = false;
        map.style.cursor = "grab";
    });

    // Сенсорне масштабування (жести двома пальцями)
    let touchStartDist = 0;

    function getDistance(touches) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    window.addEventListener("touchstart", function(event) {
        if (event.touches.length === 2) {
            touchStartDist = getDistance(event.touches);
        }
    });

    window.addEventListener("touchmove", function(event) {
        if (event.touches.length === 2) {
            event.preventDefault();
            const newDist = getDistance(event.touches);
            const scaleAmount = newDist / touchStartDist;
            scale *= scaleAmount;
            scale = Math.min(Math.max(0.5, scale), 3);

            map.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
            updateMarkers();
            touchStartDist = newDist;
        }
    });

    updateMarkers();
});
