
var Letter = function(char) {
	this.front = char;
	this.back = ((char === " ") ? " " : "_");

}

module.exports = Letter;