// loading the current weather in montreal using weatherapi.com and jquery
// used weatherapi.com documentation https://www.weatherapi.com/docs/
$(document).ready(function () {
    // declaring required parameters for the api request
    let apiKey = "4190208daf4b4bbfbab74227250602";
    let city = "Montreal";

    // create a get request to weatherapi using my api key
    $.ajax({
        url: `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            // using the desired data to modify my html elements
            $("#temp").text(data.current.temp_c);
            $("#feels").text(data.current.feelslike_c);
            $("#precipitation").text(data.current.precip_mm);
            $("#condition").text(data.current.condition.text);
        },
        error: function () {
            // clearing the weather forecast section and displaying an error message
            $("#weather-data").html("<p>An error occurred while trying to load the weather API.</p>");
        }
    });
});