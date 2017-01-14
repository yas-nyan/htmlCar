var getConnector = require('obd-parser-serial-connection');
 
// Returns a function that will allow us to connect to the serial port
var connect = getConnector({
  serialPath: '',
  serialOpts: {
    baudrate: 38400
  }
});
 
connect(configureFunction)
  .then(function () {
    console.log('connected to serial port!')
  })
  .catch(function (err) {
    console.error('oh noes');
  });
 
 
function configureFunction (connection) {
  return new Promise(function (resolve, reject) {
    // Set up the obd connection etc.
    conn.write('ATZ');
    conn.write('ATE0');
  });
}
