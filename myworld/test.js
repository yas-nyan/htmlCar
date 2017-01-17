class Vehicle {
    constructor(host, port) {
        this.uri = "ws://" + host + ":" + port;
        this.ws = new WebSocket(this.uri);


        this.vehicleSpeed = new VehicleSignalInterface(this.ws, 'Signal.Drivetrain.Transmission.Speed');
        this.engineSpeed = new VehicleSignalInterface(this.ws, 'Signal.Drivetrain.InternalCombustionEngine.RPM');
        this.MAF = new VehicleSignalInterface(this.ws, 'Signal.Drivetrain.InternalCombustionEngine.MAF');
    }

    unsubscribeAll() {
        return new Promise((resolve, reject) => {
            this.ws.addEventListener("message", function(event) {
                if (event.status == 'failes') {
                    reject();
                } else {
                    resolve(JSON.parse(event.data));
                }

            });
            this.ws.send(`{"action": "unsubscribeAll","path":"Signal.Drivetrain.Transmission.Speed","requestId": "${genUUID()}"}`)
        });

    }


}

class VehicleSignalInterface {
    constructor(ws, path) {
        this.ws = ws;
        this.path = path;

        this.subscribeUuid = "";


    }

    get() {
        return new Promise((resolve, reject) => {
            this.ws.addEventListener("message", function(event) {
                if (event.status == 'failes') {
                    reject();
                } else {
                    resolve(JSON.parse(event.data));
                }

            });
            this.ws.send(`{"action": "get", "path": "${this.path}", "requestId": "${genUUID()}"}`)

        });


    }

    subscribe(callback) {
        this.ws.addEventListener("message", function(event) {
            if (event.status == 'failes') {

            } else {
                if (event.data.path == this.path) {
                    callback(JSON.parse(event.data));
                }
            }

        });
        this.subscribeUuid = genUUID();
        this.ws.send(`{"action": "subscribe", "path": "${this.path}", "requestId": "${this.subscribeUuid}"}`);


    }

    unsubscribe() {
        return new Promise((resolve, reject) => {
            this.ws.addEventListener("message", function(event) {
                if (event.status == 'failes') {
                    reject();
                } else {
                    resolve(JSON.parse(event.data));
                }

            });
            this.ws.send(`{"action": "unsubscribe", "path": "${this.path}", "requestId": "${this.subscribeUuid}"}`)

        });
    }
}


function genUUID() {
    var uuid = "",
        i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;

        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-"
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;

}