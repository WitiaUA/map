document.addEventListener("DOMContentLoaded", function() {
    const markers = [
        { id: "perdichium", x: 74.25, y: 42.99, link: "https://tsebuleve.wiki.gg/uk/wiki/Кратер_Пердичіуму" },
        { id: "marker1", x: 30, y: 40, link: "https://uk.minecraft.wiki/" },
        { id: "marker2", x: 60, y: 70, link: "https://uk.minecraft.wiki/" }
    ];

    function updateMarkers() {
        const container = document.querySelector(".container");
        const bg = document.querySelector(".background");
        const rect = bg.getBoundingClientRect();

        markers.forEach(marker => {
            const el = document.getElementById(marker.id);
            el.style.left = `${rect.left + (marker.x * rect.width / 100)}px`;
            el.style.top = `${rect.top + (marker.y * rect.height / 100)}px`;
        });
    }

    window.addEventListener("resize", updateMarkers);
    updateMarkers();
});
