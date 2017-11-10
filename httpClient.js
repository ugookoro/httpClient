httpClient = function (url, method, data, headers) {

    var promise = new Promise(function (resolve, reject) {
        var response = {
            StatusCode: undefined,
            Data: undefined
        };
        http = new XMLHttpRequest();
        http.open(String(method), url, true); //false makes it synchronious
        http.setRequestHeader("Content-Type", "application/json");

        if (headers) {
            headers.forEach(function (element) {
                var name = element.Name;
                var value = element.Value;
                if (name != undefined && value != undefined) {
                    http.setRequestHeader(name, value);
                }
            }, this);
        }

        if (data) {
            http.send(JSON.stringify(data));
        } else {
            http.send();
        }
        http.onreadystatechange = function () {
            switch (http.readyState) {
                case 4:
                    if (http.status == 200) {
                        response.StatusCode = http.status;
                        response.Data = JSON.parse(http.response);
                        resolve(response);
                    } else {
                        reject(new Error('Something went wrong'));
                    }
                    break;
                case 3:
                    break;
                default:
                    break;
            }
        }

    });

    return promise;

}