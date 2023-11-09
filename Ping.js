        // Определение объекта Ping
        var Ping = function(a) {
            this.opt = a || {};
            this.favicon = this.opt.favicon || "/favicon.ico";
            this.timeout = this.opt.timeout || 1000;
        };

        Ping.prototype.ping = function(a, b) {
            function c(a) {
                d && clearTimeout(d);
                var c = new Date() - e;
                if ("function" == typeof b) return "error" === a.type ? (console.error("error loading resource"), b("error", c)) : b(null, c);
            }

            this.img = new Image;
            var d, e = new Date();
            this.img.onload = c;
            this.img.onerror = c;
            this.timeout && (d = setTimeout(c, this.timeout));
            this.img.src = a + this.favicon + "?" + +new Date();
        };

        var pingData = [];
        var pingTimestamps = [];
        var b = 1;

        var layout = {
            title: 'Ping Time',
            xaxis: {
                title: 'Time',
                type: 'date',
            },
            yaxis: {
                title: 'Ping Time (ms)',
            },
        };

        Plotly.newPlot('pingChart', [{ x: pingTimestamps, y: pingData, type: 'line' }], layout);

        setInterval(function () {
            var p = new Ping();
            b++;// После получения данных пинга
p.ping("http://google.com", function (err, data) {
    pingData.push(data);
    pingTimestamps.push(new Date());
    document.getElementById("ping").innerHTML = data + ' ms';
    if (data < 2000) {
    document.getElementById("status").innerHTML = 'Online';
} else {
    document.getElementById("status").innerHTML = 'Offline';
}

    // Определение интерпретации данных
    var interpretation = "Unknown";
    if (data < 200) {
        interpretation = 'Отличный';
    } else if (data < 400) {
        interpretation = 'Хороший';
    } else if (data < 1000) {
        interpretation = 'Умеренный';
    } else {
        interpretation = 'Плохой';
    }

    // Обновление элемента с интерпретацией
    document.getElementById("interpretation").innerHTML = 'Connection: ' + interpretation;

    // Обновление графика
    Plotly.update('pingChart', { x: [pingTimestamps], y: [pingData] });
});
            
        }, 1000);