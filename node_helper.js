/* Node Helper */

/* Magic Mirror 2
 * Module: MMM-Serial-Port
 *
 * By Erik Pettersson
  *
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
const SerialPort = require('serialport')
//const Readline = SerialPort.parsers.Readline;
var serial_listener = null;

/*
const port = new SerialPort('/dev/ttyUSB0', {
  baudRate: 57600
});
*/

module.exports = NodeHelper.create({
	start: function() {
		console.log("Starting node helper for: " + this.name);
		var self = this;
		this.loaded = false;
	},

	// Start the serial port.
	initialize: function() {
		var self = this;

		if (serial_listener == null) {
			self.serialport = new SerialPort(self.config.serialDev,
			{
				baudRate: self.config.baudrate,
				dataBits: self.config.dataBits,
				parity: self.config.parity,
				stopBits: self.config.stopBits,
				flowControl: self.config.flowControl,
			});

			self.parser = self.serialport.pipe(new Readline());
			console.log('MMM-Serial-Port, starting listening on '+self.config.serialDev+" with "+self.config.baudrate+" baud");

			serial_listener = self.serialport.on("open",function () {
				self.parser.on('data', function(data) {
					action = data;

					if ( self.serialCodes.indexOf(action) != -1 ) {
						self.sendSocketNotification(action,{inputtype: ""+action+""});
					}
				});
			});
		}
	},
	
});