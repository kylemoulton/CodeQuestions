// Is Unique: Implement an algorithm to determine if a string has all 
// unique characters, what if you cannot use data structures?


// Assumptions 
// line is a string of characters

// First impressions
// I could loop through the characters in the line for each character 
// (while excluding the current character) to determine if there are
// characters that match the current one.
// If not, I can return true. I'll return false immediately if it finds a duplicate


// First attempt
function isUnique(line) {
	for (var i = 0; i < line.length - 1; i++) {
		for (var j = i + 1; j < line.length; j++) {
			if (line[i] === line[j]) {
				return false;
			}
		}
	}
	return true;
}


// Tests
function testFunction(actual, expected) {
	if (actual === expected) {
		console.log("Test passed");
	} else {
		console.log("Test failed:");
		console.log("Expected Result: " + expected);
		console.log("Actual Result: " + actual);	
	}
}

testFunction(isUnique("abcdefghij"), true);
testFunction(isUnique("12345"), true);
testFunction(isUnique("112345"), false);
testFunction(isUnique("123451"), false);
testFunction(isUnique("1235456"), false);
testFunction(isUnique("This should be false"), false);