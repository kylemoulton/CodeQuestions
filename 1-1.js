// Is Unique: Implement an algorithm to determine if a string has all 
// unique characters, what if you cannot use data structures?

/*
   Assumptions:
   var line is a string of ASCII characters

   First impressions:
   I could loop through the characters in the line for each character (while 
   excluding the current character) to determine if there are characters that match 
   the current one. If not, I can return true. I'll return false immediately if it 
   finds a duplicate

/*
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
*/


/*
   Second attempt
   Hint 1: Try Using a Hash Table
   
   Initial Thoughts:
   I'm not sure how a hash table could be used to make the solution cleaner or more 
   efficient, but I'll give it a try. I guess I could add each character as a key in 
   the table, and increment its value (default 0) for each apperance. After adding, 
   I'll check if the value is greater than 1 and return false if so, and true if it 
   never is.

function isUnique(line) {
	var characterTable = {};
	for (var i = 0; i < line.length; i++) {
		if (typeof characterTable[line[i]] === "undefined") {
			characterTable[line[i]] = 1;
		} else {
			return false;
		}
	}
	return true;
}

	Afterthoughts: 
	I'm not terribly familiar with Javascript objects at this phase, namely how to 
	implement a hashmap. But as I looked up how to implement one, I figured that the 
	default value for a hashmap value in a key value pair is undefined. I figured it 
	would be quicker to just determine if the value for a specific key is defined 
	already and return false if so, than to increment values as they appeared, and 
	later loop though the key-value pairs to determine if any values are greater 
	than 1. This appears to	increased the efficiency compared to my first attempt.
*/



/* 
	Hint 2: Could a bit vector be useful?
	Initial Thoughts:
	To be honest, I haven't worked with bitwise operators very much or for a long 
	while. I'm aware they are more efficient than many operations, though. I'm going 
	to have to research on how this can be done.
*/

function isUnique(line) {
	var bitVector = 0;
	for (var i = 0; i < line.length; i++) {
		var charMask = (1 << line.charCodeAt(i));
		if ((bitVector & charMask) > 0) {
			return false;
		}
		bitVector = bitVector | charMask;
	}
	return true;
}


/*
	At first, I thought a bit vector was going to be an array of 256 (for ASCII) 
	indices all filled to 0. Unlike Java and C++ which I'm a bit more familiar with, 
	I found that Javascript doesn't lend itself to easily implement an array with 
	specific default values. After researching I rememebered that I could just use 
	an integer's binary represenataion to store	the bits and trigger them as they 
	appear. I left-shift a 1 into a mask at the place of the specific character 
	code. I determine if the 'and' operation of the bit vector and the mask is 
	greater than 0 and return false, indicating that the current character is 
	already stored in the bit vector. If it reaches the end of the function, I 
	return true, indicating all	unique characters.
	Full admission: I did have to do research and ultimately did look at the 
	solution to see how far off I was when I ran into some difficulties debugging.
*/

// Test Function
function testFunction(actual, expected) {
	if (actual === expected) {
		console.log("Test passed");
	} else {
		console.log("Test failed:");
		console.log("Expected Result: " + expected);
		console.log("Actual Result: " + actual);	
	}
}

// Tests
testFunction(isUnique("abcdefghij"), true);
testFunction(isUnique("12345"), true);
testFunction(isUnique("112345"), false);
testFunction(isUnique("123451"), false);
testFunction(isUnique("1235456"), false);
testFunction(isUnique("This should be false"), false);
testFunction(isUnique("12345abcdef"), true);
testFunction(isUnique("12345aaaaaa"), false);



