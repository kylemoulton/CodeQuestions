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

	

	First attempt
*/

function isOneAway(trueStr, str) {
	if (Math.abs(trueStr.length - str.length) > 1) {
		return false;
	} else if (trueStr === str.length) {
		return false; // It's not one away, it is identical
	}

	if (trueStr.length === str.length) {
		// Same length, not equal, must have a character replace
		// Check if first character is the offending character
		if (trueStr[0] != str[0]) {
			return str.substring(1, str.length) === trueStr.substring(1, trueStr.length);
		}
		// Check if the the character sequences matches until the end, 
		// or if the string matches on opposing ends of a single character
		var matchLength = 0;
		for (var i = 1; i <= str.length; i++) {
			if (str.substring(0, i) === trueStr.substring(0, i)) {
				matchLength = i;
			} else {
				break;
			}
		}
		// Check if matching up until last character
		if (matchLength === str.length - 1) {
			return true;
		} 
		// Return whether substring following matchLength to end of string matches	 	
		return str.substring(matchLength + 1, str.length) === trueStr.substring(matchLength + 1, trueStr.length);			

	} else if (trueStr.length > str.length) {
		// trueStr is longer, must have a character insert
		console.log("Not Tested");

	} else if (trueStr.length < str.length) {
		// str is longer, must have a character removal
		console.log("Not Tested");
	}
	return false;
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
testFunction(isOneAway("pale", "pall"), true);
testFunction(isOneAway("pale", "bale"), true);
testFunction(isOneAway("pale", "pvle"), true);
testFunction(isOneAway("pale", "pave"), true);
testFunction(isOneAway("pppp", "pppx"), true);
testFunction(isOneAway("pppp", "xppp"), true);
testFunction(isOneAway("pppp", "pxpp"), true);
testFunction(isOneAway("pppp", "ppxp"), true);
