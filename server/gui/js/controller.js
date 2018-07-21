class Controller {
    constructor() {
        this.state = "empty";
    }

    onMessage(data) {
        console.log("Received: " + data);
        let params = data.split('|');
        let command = params[0];
        if (command == "empty") this.makeEmpty();
        else if (command == "intro") this.loadHTML('/content/intro.html');
        else if (command == "credits") this.loadHTML('/content/credits.html');
        else if (command == "weather") this.makeWeather(params[1], params[2], params[3], params[4], params[5]);
        else if (command == "text") this.makeText(params[1], params[2]);

    }

    makeEmpty() {
        $("body").empty();
    }

    loadHTML(url) {
        console.log("Loading: " + url);
        $.ajax({
            url: url
        }).done(function(data) {
            console.log(data);
            $("body").html(data);
        })
    }

    makeText(prim, sec) {
        $("body").html("<div id='div-text'><h2>" + prim + "</h2><h1>" + sec + "</h1></div>");
    }

    makeWeather(temp, hum, prec, wind, type) {
        $("body").html("<div id='div-weather'><h1>WEATHER CONDITIONS<h1><br>" +
            "<table><tr><td>TYPE:</td><td class='td-center'>" + type + "</td></tr>" +
            "<tr><td>TEMPERATURE:</td><td class='td-center'>" + temp + "</td></tr>" + 
            "<tr><td>HUMIDITY:</td><td class='td-center'>" + hum + "</td></tr>" +
            "<tr><td>PRECIPITATION:</td><td class='td-center'>" + prec + "</td></tr>" +
            "<tr><td>WIND:</td><td class='td-center'>" + wind + "</td></tr></table>" + 
        "</div>");
    };

    onTimeUpdate() {
        // console.log("Timer callback;");
    }
}