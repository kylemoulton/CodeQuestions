/*
	Palinbdrome Permutation: Given a string, write a function to check if it is a permutation
	of a palindrome. A Palindrome is a word or phrase that is the same forwards and backwards.
	A Permutation is a rearrangement of letters. The palindrome does not need to be limited to
	just dictionary words.

	Ex.
	Input: Taco Cao
	Output: True ("taco cat", "atco cta" etc.)

	First Thoughts:
	A palindrome has either an even number of each character in the string, or even numbers
	of characters with a single character that there is an odd number of. I can add the 
	character counts to a map and then loop through the map and verify that only one
	of the values has an odd number of occurrences. If there are multiple odd counts, I'll
	return false. I'll assume the result does not depend on character case and set the string
	to lowercase.
*/

// First Attempt
function isPalindromePermutation(str) {
	str = str.toLowerCase();

	var charCounts = {};
	for (var i = 0; i < str.length; i++) {
		if (typeof charCounts[str.charAt(i)] === "undefined") {
			charCounts[str.charAt(i)] = 1;
		} else {
			charCounts[str.charAt(i)]++;
		}
	}

	var characters = Object.keys(charCounts);
	var oddFound = false;
	for (var i = 0; i < characters.length; i++) {
		if (charCounts[characters[i]] % 2 != 0) {
			if (oddFound) {
				return false;
			} else {
				oddFound = true;
			}
		}
	}

	return true;
}

/*
	Afterthoughts:
	My solution uses one loop to increment counts in a map with character keys and count values for each
	character it encounters in the string. It then loops through the keys and determines if the current 
	corresponding value is an odd number. If it encounters more than one odd number, it returns	false, 
	indicating that the string is not a permutation of a palindrome. I think there may be room for 
	improvement, but I can't immediately think of a way to implement a more efficient solution.
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
testFunction(isPalindromePermutation("abcdefgabcdefg"), true);
testFunction(isPalindromePermutation("abcdefggabcdefg"), true);
testFunction(isPalindromePermutation("abccdefggabcdefg"), false);
testFunction(isPalindromePermutation("1234554321"), true);
testFunction(isPalindromePermutation("1122334455"), true);
testFunction(isPalindromePermutation("135789"), false);