class Vehicle {
  constructor (host, port) {
    let uri = "ws://" + this.host + this.port;
    let ws = new WebSocket(uri);
    }

    this.vehicleSpeed = new VehicleSignalInterface(ws, 'Signal.Drivetrain.Transmission.Speed');
    this.engineSpeed = new VehicleSignalInterface(ws, 'Signal.Drivetrain.InternalCombustionEngine');
    this.fuelConsumption = new VehicleSignalInterface(ws, 'Signal.Drivetrain.FuelSystem.');
  }
}

class VehicleSignalInterface {
  constructor (ws, path) {
    this.ws = ws;
    this.path = path;

    let requestId = function uuid() {
      var uuid = "", i, random;
      for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;

        if (i == 8 || i == 12 || i == 16 || i == 20) {
          uuid += "-"
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
      }
      return uuid;
    }
  }

  get() {
    ws.send('{"action": "get", "path": path, "requestId": requestId}');

    ws.onmessage = function(event){
      var msg = JSON.parse(event.data);
      if(msg.path == path && msg.value){
        return Promise.resolve(msg.value);
      }
    }
  }
}

