/* global Module */

/* Magic Mirror 2
 * Module: MMM-Serial-Port
 *
 * By Erik Pettersson
  *
 * MIT Licensed.
 */
Module.register("MMM-Serial-Port",{
	
	requiresVersion: "2.1.0",
	
    defaults: {
        // What serial port to use.
        serialPort: "/dev/ttyUSB0",
		baudRate: 57600,
		dataBits: 8,
		parity: "none",
		stopBits: 1,
		flowControl: false,
    },

	// Load the defined styles.
	getStyles: function() {
		return ["MMM-Serial-Port.css"];
	},

	// Notifications....
	notificationReceived: function(notification, payload, sender) {
		if (sender) {
			Log.log(this.name + " received a module notification: " + notification + " from sender: " + sender.name);
		} else {
			Log.log(this.name + " received a system notification: " + notification);
		}

		if (payload === 'TOGGLE') {
			Log.log(this.name + " sent " + payload + " " + notification);
		}
	},
});