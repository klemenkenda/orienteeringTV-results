class Controller {
    constructor() {
        this.state = "empty";
    }

    onMessage(data) {
        console.log("Received: " + data);
        if (data == "empty") this.makeEmpty();
        else if (data == "intro") this.loadHTML('/content/intro.html');
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

    onTimeUpdate() {
        // console.log("Timer callback;");
    }
}