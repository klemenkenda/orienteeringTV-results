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
        else if (command == "refresh") this.refreshLive(params[1], params[2]);
        else if (command == "start") this.startList();
        else if (command == "rStart") this.runnerStart(params[1]);
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

    refreshLive(cat, compId) {
        let url = "http://liveresultat.orientering.se/api.php?comp=" + compId + "&method=getclassresults&unformattedTimes=true&class=" + cat;
        this.cat = cat;
        this.compId = compId;
        let self = this;
        $.ajax({
            url: url
        }).done(function(data) {
            console.log(data);
            try {
                if (data.status == "OK") {
                    self.results = data.results;
                    self.splitControls = data.splitcontrols;
                    console.log(self.results);
                    console.log(self.splitControls);
                } else {
                    console.log("Error reading data!")
                }
            } catch (c) {
                console.log("Error - refreshLive", e);
            }
        });
    };

    runnerStart(min) {
        console.log("Find starting runner: " + min);
        let zeroStartTime = this.timer.getZeroStartTime();
        let runnerTime = zeroStartTime;
        if (min != "") {
            runnerTime = zeroStartTime + parseInt(min) * 60 * 100;
        } else {
            let d = new Date();
            runnerTime = ((d.getHours() * 60 + d.getMinutes()) * 60 + d.getSeconds()) * 100;
        }
        let runnerId = this.findClosestRunner(runnerTime);
        // we have found our next runner
        if (runnerId >= 0) {
            let name = this.results[runnerId].name;
            let club = this.results[runnerId].club;
            let stcsecs = this.results[runnerId].start;
            let startTime = this.getStartTimeFromCs(stcsecs);
            console.log(name, club, startTime);

            $("body").html("<div id='div-runner'> \
                <div id='div-runner-next'>NEXT RUNNER</div> \
                <div id='div-runner-name'>" + name + "</div> \
                <div id='div-runner-club'>" + club + "</div> \
                <div id='div-runner-time'>" + startTime + "</div> \
            </div>");
        }
    }

    getStartTimeFromCs(cs) {
        let ts = Math.floor(cs / 100);
        let s = ts % 60;
        ts = Math.floor(ts / 60);
        let m = ts % 60;
        let h = Math.floor(ts / 60);
        return (this.lZ(h) + ":" + this.lZ(m) + ":" + this.lZ(s));
    }

    lZ(x) {
        if (x < 10) return "0" + x;
        else return(x);
    }

    findClosestRunner(rt) {
        let max = Number.MAX_SAFE_INTEGER;
        let maxId = -1;
        let i = 0;
        this.results.forEach(function(runner) {
            if ((rt - runner.start < max) && (runner.start - rt >= 0)) {
                max = runner.start - rt;
                maxId = i;
            }
            console.log(rt, runner.start, max, maxId, runner.start);
            i++;
        });

        return(maxId);
    }

    onTimeUpdate() {
        // console.log("Timer callback;");
    }

    rememberTimer(t) {
        console.log("Remembering timer");
        this.timer = t;
    }
}