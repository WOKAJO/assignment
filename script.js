function convertTemp() {

    let celsius = document.getElementById("celsius").value;

    // Validation
    if (celsius == "") {
        alert("Please enter a temperature.");
        return;
    }

    let fahrenheit = (celsius * 9 / 5) + 32;

    document.getElementById("result").innerHTML =
        celsius + " °C = " + fahrenheit.toFixed(2) + " °F";
}