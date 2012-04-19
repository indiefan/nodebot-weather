var request = require('request');

/**
 * Nodebot plugin to report the weather forecast
 */
function Command() {
	var self = this;
	self.name = "Weather";
	self.regex=/^weather$/i;
	// Retrieve this from: http://weather.yahoo.com/
	self.woeid = "12796580";
	self.location = "Aliso Viejo, CA";
	self.callback = function(from, to, message, nodebot) {
		request({uri: 'http://weather.yahooapis.com/forecastrss?w=' + self.woeid + '&u=f'}, function (error, response, body) {
			var patt=/.*condition [\s\S]*<b>(Current[\s\S]*?)<a href[\s\S]*/m;
			var result = patt.exec(body);
			var weather = result[1].replace(/<br \/>/gi, "");
			console.log("\n\n\nresult: " + weather + "\n\n\n");
			var responses = weather.split("\n");
			nodebot.say(to, "Weather for " + self.location);
			for (var i=0; i<responses.length; i++) {
				responses[i] = responses[i].replace(/<b>/gi, "");
				responses[i] = responses[i].replace(/<\/b>/gi, "");
				nodebot.say(to, responses[i]);
			}
		});
	};
};

exports.Command = Command;





