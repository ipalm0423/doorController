var rpio = require('rpio');
 

//module
exports.listenChanges = function(pinNum){
  
  gpio.on('change', function(channel, value) {
	  console.log('Channel ' + channel + ' value is now ' + value);
  });
  gpio.setup(pinNum, gpio.DIR_IN, gpio.EDGE_BOTH);

}
 
exports.readOnPin = function (pinNum) {
    rpio.open(pinNum, rpio.INPUT);
    console.log('Pin' + pinNum + ' is currently set ' + (rpio.read(pinNum) ? 'high' : 'low'));
}

exports.writeToHighOnPin = function (pinNum) {
    rpio.open(pinNum, rpio.OUTPUT, rpio.LOW);//INITIAL TO LOW
    rpio.write(pinNum, rpio.HIGH);
    console.log('Pin' + pinNum + ' is currently set ' + (rpio.read(pinNum) ? 'high' : 'low'));
}

exports.writeToLowOnPin = function (pinNum) {
    rpio.open(pinNum, rpio.OUTPUT, rpio.LOW);//INITIAL TO LOW
    console.log('Pin' + pinNum + ' is currently set ' + (rpio.read(pinNum) ? 'high' : 'low'));
}

exports.blinkOnPin = function(pinNum){
  rpio.open(pinNum, rpio.OUTPUT, rpio.LOW);//INITIAL TO LOW
  for (var i = 0; i < 10; i++) {
        /* On for 500m second */
        rpio.write(pinNum, rpio.HIGH);
        rpio.msleep(500);

        /* Off for half a second (500ms) */
        rpio.write(pinNum, rpio.LOW);
        rpio.msleep(500);
        console.log('Pin' + pinNum + ' is currently set ' + (rpio.read(pinNum) ? 'high' : 'low'));
  }
}

exports.continueBlinkOnPin = function(pinNum){
  rpio.open(pinNum, rpio.OUTPUT, rpio.LOW);

  /* Set the pin high every 10ms, and low 5ms after each transition to high */
  setInterval(function() {
        rpio.write(pinNum, rpio.HIGH);
        console.log('Pin' + pinNum + ' is currently set ' + (rpio.read(pinNum) ? 'high' : 'low'));
        setTimeout(function() {
                rpio.write(pinNum, rpio.LOW);
        }, 5);
  }, 10);
}

exports.listenOnPin = function(pinNum, callback){
  rpio.open(pinNum, rpio.INPUT, rpio.PULL_DOWN);
  function pollCallback(){
    var status = rpio.read(pinNum);
    console.log('pin' + pinNum + 'is change to' + (status ? 'high':'low'));
    callback(status);
  }
  rpio.poll(pinNum, pollCallback);
}

