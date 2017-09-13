/*
	One Away: There are three types of edits that can be performed on strings:
	insert a character, remove a character, or replace a character. Given two 
	strings, write a function to check if they are one edit (or 0 edits) away.

	Ex.
	pale, ple -< true
	pales, pale -> true
	pale, bale -> true
	pale, bake -: false

	Initial Thoughts:
	I imagine I could probably store character counts in a map or bit vector,
	but I think I'd have to make sure the order of the characters is similar 
	as well. Having close to the same characters is not enough...
	string lengths must be no more than 1 character different
	string must have length - 1 characters in common, or two portions of the
	string that are matching and a single missing or extra character
	
	Case 1: Inserting a character
	Case 2: Removing a character
	Case 3: Replacing a character
*/

// First Attempt
function isOneAway(trueStr, str) {
	if (Math.abs(trueStr.length - str.length) > 1) {
		return false;
	} else if (trueStr === str) {
		return false; // It's not one away, it is identical
	}

	// Same length, but not equal, must have a character to replace
	if (trueStr.length === str.length) {
		// Check if first the character is the offending character
		if (trueStr[0] != str[0]) {
			return str.substring(1, str.length) === trueStr.substring(1, trueStr.length);
		}
		/*
		Check if the the character sequences matches until the end, 
		or if the string matches on opposing ends of a single character
		*/
		var matchLength = findMatchLength(str, trueStr);

		// Check if matching up until last character
		if (matchLength === str.length - 1) {
			return true;
		} 
		// Return whether substring following matchLength to end of string matches	 	
		return str.substring(matchLength + 1, str.length) === trueStr.substring(matchLength + 1, trueStr.length);			

	} else {
		// Assign based on length
		if (str.length > trueStr.length) {
			var longer = str;
			var shorter = trueStr;
		} else {
			var longer = trueStr;
			var shorter = str;
		}

		// Case 1: Missing first character/Additional first character
		if (shorter[0] != longer[0]) {
			return shorter === longer.substring(1, longer.length);
		}
		// Case 2: Missing last character/Additional last character
		if (shorter[shorter.length - 1] != longer[longer.length - 1]) {
			return shorter === longer.substring(0, longer.length - 1);
		}

		// Case 3: Additional/Missing middle character
		var matchLength = findMatchLength(shorter, longer);

		// Return whether the remaining substring of shorter matches the substring of longer after missing/additional character
		return shorter.substring(matchLength, shorter.length) === longer.substring(matchLength + 1, longer.length);
	}
}

function findMatchLength(shorter, longer) {
	var matchLength = 0;
	for (var i = 0; i < shorter.length; i++) {
		if (shorter.substring(0, i) === longer.substring(0, i)) {
			matchLength = i;
		} else {
			break;
		}
	}
	return matchLength;
}

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
// Tests for Replace
console.log("Replace Test 1");
testFunction(isOneAway("pale", "pall"), true);
console.log("Replace Test 2");
testFunction(isOneAway("pale", "bale"), true);
console.log("Replace Test 3");
testFunction(isOneAway("pale", "pvle"), true);
console.log("Replace Test 4");
testFunction(isOneAway("pale", "pave"), true);
console.log("Replace Test 5");
testFunction(isOneAway("pppp", "pppx"), true);
console.log("Replace Test 6");
testFunction(isOneAway("pppp", "xppp"), true);
console.log("Replace Test 7");
testFunction(isOneAway("pppp", "pxpp"), true);
console.log("Replace Test 8");
testFunction(isOneAway("pppp", "ppxp"), true);

// Tests for Insert
console.log("Insert Test 1");
testFunction(isOneAway("pale", "ale"), true);
console.log("Insert Test 2");
testFunction(isOneAway("pale", "pal"), true);
console.log("Insert Test 3");
testFunction(isOneAway("pale", "ple"), true);
console.log("Insert Test 4");
testFunction(isOneAway("pale", "pae"), true);
console.log("Insert Test 5");
testFunction(isOneAway("pppp", "ppp"), true);
console.log("Insert Test 6");
testFunction(isOneAway("ppxp", "ppp"), true);
console.log("Insert Test 7");
testFunction(isOneAway("pxpp", "ppp"), true);


// Tests for Remove
console.log("Removal Test 1");
testFunction(isOneAway("ppp", "pxpp"), true);
console.log("Removal Test 2");
testFunction(isOneAway("ppp", "ppxp"), true);
console.log("Removal Test 3");
testFunction(isOneAway("ppp", "pppp"), true);
console.log("Removal Test 4");
testFunction(isOneAway("ale", "pale"), true);
console.log("Removal Test 5");
testFunction(isOneAway("pal", "pale"), true);
console.log("Removal Test 6");
testFunction(isOneAway("ple", "pale"), true);
console.log("Removal Test 7");
testFunction(isOneAway("pae", "pale"), true);

// Various Tests
console.log("Various Test 1");
testFunction(isOneAway("Hello, this is a test", "Hello, this is a test"), false);
console.log("Various Test 2");
testFunction(isOneAway("Hello, this is a test", "Hello,,, this is a test"), false);
console.log("Various Test 3");
testFunction(isOneAway("Hello, this is a test", "Hello, this is a test"), false);
console.log("Various Test 4");
testFunction(isOneAway("Hello, this is a test", "Hello, this is a test"), false);
console.log("Various Test 5");
testFunction(isOneAway("Hello, this is a test", "Hello, thisss is a test"), false);
console.log("Various Test 6");
testFunction(isOneAway("Hello, this is a test", "Hello, this isss a test"), false);
console.log("Various Test 7");
testFunction(isOneAway("Hello, this is a test", "Hello, this is aaa test"), false);
console.log("Various Test 8");
testFunction(isOneAway("Hello, this is a test", "HHHHHH HHHH HH H HHHH"), false);
console.log("Various Test 9");
testFunction(isOneAway("Hello, this is a test", "HHHHHH HHHH tt t tttt"), false);
console.log("Various Test 10");
testFunction(isOneAway("Hello, this is a test", "ello, this is a test"), true);
console.log("Various Test 11");
testFunction(isOneAway("Hello, this is a test", "Hello, this is a tes"), true);
console.log("Various Test 12");
testFunction(isOneAway("Hello, this is a test", "Hello this is a test"), true);
console.log("Various Test 13");
testFunction(isOneAway("Hello, this is a test", "Hello, thi is a test"), true);
console.log("Various Test 14");
testFunction(isOneAway("Hello, this is a test", "Hello, this is  test"), true);
console.log("Various Test 15");
testFunction(isOneAway("Hello, this is a test", "Hello, this is a testt"), true);
console.log("Various Test 16");
testFunction(isOneAway("Hello, this is a test", "HHello, this is a test"), true);
