document.addEventListener("DOMContentLoaded", function() {
    const bg = document.getElementById("background");

    bg.addEventListener("click", function(event) {
        const rect = bg.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        console.log(`Координати: x: ${x.toFixed(2)}%, y: ${y.toFixed(2)}%`);
    });
});
