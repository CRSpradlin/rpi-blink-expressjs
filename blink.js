const gpio = require('onoff').Gpio;
const led = new gpio(23, 'out');

let stopBlinking = false;

const blinkLed = async _ => {
	if (stopBlinking) {
		led.write(0);
		return led.unexport();
	}

	const curr_val = await led.read();
	
	console.log(curr_val);

	await led.write(curr_val ^ 1);

	setTimeout(blinkLed, 200);
};

blinkLed();

setTimeout(_ => stopBlinking = true, 5000);
