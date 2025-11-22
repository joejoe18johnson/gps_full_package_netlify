document.addEventListener("DOMContentLoaded", () => {
    // Close popup
    document.getElementById("closePopup").onclick = () => {
        document.getElementById("popupOverlay").style.display = "none";
    };

    // GPS button
    document.getElementById("gpsBtn").onclick = getLocation;
});

function getLocation() {
    const mainImage = document.getElementById("mainImage");
    mainImage.classList.add("clear");

    if (!navigator.geolocation) {
        alert("Geolocation not supported.");
        return;
    }

    const options = { enableHighAccuracy:true, timeout:20000, maximumAge:0 };

    navigator.geolocation.getCurrentPosition(
        pos => {
            let lat = pos.coords.latitude;
            let lng = pos.coords.longitude;
            console.log("User GPS:", lat, lng);

            // If you move your backend to PHP/MySQL later, uncomment and update:
            /*
            fetch("https://your-php-server.com/save.php", {
                method:"POST",
                headers:{ "Content-Type":"application/json" },
                body: JSON.stringify({ latitude: lat, longitude: lng })
            }).catch(err => console.error("Error sending to backend:", err));
            */
        },
        err => {
            switch(err.code){
                case err.PERMISSION_DENIED: alert("Permission denied. Please allow location access."); break;
                case err.POSITION_UNAVAILABLE: alert("Position unavailable. Try on a device with GPS."); break;
                case err.TIMEOUT: alert("Location request timed out. Try again."); break;
                default: alert("Unknown error: " + err.message);
            }
        },
        options
    );
}
