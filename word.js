
var Word = function(wordList) {
    this.wordList = wordList;
}

Word.prototype.getCurrentWord = function() {

        if(this.wordList.length > 0) {
            var randWord = this.wordList[Math.floor(Math.random() * this.wordList.length)];
            var randInd = this.wordList.indexOf(randWord);
            this.wordList.splice(randInd, 1);
            return randWord;
        }
        else {
            return "";
        }
};

module.exports = Word;


