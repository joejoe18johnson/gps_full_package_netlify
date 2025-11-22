navigator.geolocation.getCurrentPosition(
    pos => {
        let lat = pos.coords.latitude;
        let lng = pos.coords.longitude;
        console.log("User GPS:", lat, lng);

        // Send to PHP backend
        fetch("https://YOUR-PHP-SERVER.com/save.php", {
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body: JSON.stringify({ latitude: lat, longitude: lng })
        })
        .then(res => res.json())
        .then(data => console.log("Backend response:", data))
        .catch(err => console.error("Error sending to backend:", err));
    },
    err => {
        alert("Error getting location: " + err.message);
    }
);
