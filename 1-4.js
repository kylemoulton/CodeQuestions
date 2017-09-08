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

/*
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
*/

/*
	Afterthoughts:
	My solution uses one loop to increment counts in a map with character keys and count values for each
	character it encounters in the string. It then loops through the keys and determines if the current 
	corresponding value is an odd number. If it encounters more than one odd number, it returns	false, 
	indicating that the string is not a permutation of a palindrome. I think there may be room for 
	improvement, but I can't immediately think of a way to implement a more efficient solution.
*/

/* 
	Hints: 
	Have you used a hash table? You should be able to get this down to O(N) time.
	Can you reduce the space by using a bit vector?
	
	Thoughts:
	I'm sure there's a way to get this all done in a single loop. I'll give it a try.
	Using a bit vector instead of the map I've been using would help reduce space.
	I'll have to review 1.1 where I did something similar.
*/

/*	
//	Second Attempt

function isPalindromePermutation(str) {
	str = str.toLowerCase();

	var bitVector = 0;
	var oddCount = 0;
	for (var i = 0; i < str.length; i++) {

		// Turn the 1 on at character code index
		var charMask = (1 << str.charCodeAt(i));

		// Check if odd or even occurrence
		if ((bitVector ^ charMask) > bitVector) {
			oddCount++;
		} else {
			oddCount--;
		}

		// Toggle the bit at character code index
		bitVector = bitVector ^ charMask;
	}
	return oddCount <= 1;
}
*/

/*
	I thought it would be easiest to toggle bits in a bit vector for each occurence
	of a character, and then check to see that either no bits are toggled, or only 
	a single bit is toggled. I couldn't readily think of an efficient way to check
	if only a single bit was toggled, so I use an integer to increment odd number
	occurences, and decrement even number occurences. Then I check whether this
	couner is less than or equal to 1. I check even/odd number occurences by 
	comparing the bit vector XOR'd with a mask for the particular character by 
	itself. I then store this XOR'd operation to the bit vector. It's more efficient
	than prior attepts, but I wish I could have thought of a solution that didn't
	require a second variable to count odd/even occurrences.  
*/

/*
	Solution From Book:
*/

/*
function isPalindromePermutation(str) {
	var bitVector = createBitVector(str);
	return bitVector == 0 || checkExactlyOneBitSet(bitVector);
}

function createBitVector(str) {
	bitVector = 0;
	for (var i = 0; i < str.length; i++) {
		var x = str.charCodeAt(i);
		bitVector = toggle(bitVector, x);
	}
	return bitVector;
}

function toggle(bitVector, index) {
	if (index < 0) {
		return bitVector;
	}

	var mask = 1 << index;
	if ((bitVector & mask) === 0) {
		bitVector |= mask;
	} else {
		bitVector &= ~mask;
	}
	return bitVector;
}

function checkExactlyOneBitSet(bitVector) {
	return (bitVector & (bitVector - 1)) === 0;
}
*/

/*
	Final Thoughts:
	The book's solution is much more compartmentalized and broken down into discrete
	functions that do a single task. This is great for debugging. My solution is 
	contained within a single function and does something similar, but not quite the
	same. THey solved the problem I had encountered to easily determine if a bit
	vector only has a single bit toggled. I hadn't considered ANDing the bit vector
	with itself minus 1 and checking if 0. That's quite clever. As for toggling 
	a bit, I used an XOR operation while they used conditional OR or AND operators.
	I'm not sure which is more efficient, but I'm happy using an XOR for fewer lines
	of code.
	I'm going to try one final attempt without having a counter variable. I'll utilize
	the functionalty of the checkExactlyOneBitSet function to do so.
*/

function isPalindromePermutation(str) {
	str = str.toLowerCase();

	var bitVector = 0;
	for (var i = 0; i < str.length; i++) {
		// Turn the 1 on at character code index
		var charMask = (1 << str.charCodeAt(i));
		// Toggle the bit at character code index
		bitVector = bitVector ^ charMask;
	}
	return (bitVector & (bitVector - 1)) === 0 || bitVector === 0;
}


/*
	Final Final Thoughts:
	Works great! I'm sure this isn't as nice to debug, but it's fun to reduce the
	number of lines required.
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