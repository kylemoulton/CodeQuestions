/* 
	Check Permutation: Given two strings, write a method to determine if one
	is a permutation of the other.
*/

/*
	Assumptions: I'll assume that the strings are permutations of each other
	regardless of whether they share the same case or not. I'll assign each 
	string its value.toLowerCase() to do this.

	First Impressions:
	I'll start by determining which string is shorter. If they are equal in
	length, I'll check if they are the same string, forward or reverse. I'll 
	then determine if the shorter string is a permutation of the larger. 

*/
//	First Attempt
function isPermutation(str1, str2) {
	str1 = str1.toLowerCase();
	str2 = str2.toLowerCase();
	var shorter;
	var longer;

	if (str1.length === 0 || str2.length === 0) {
		return false;
	} else if (str1.length < str2.length) {
		shorter = str1;
		longer = str2;
	} else if(str2.length < str1.length) {
		shorter = str2;
		longer = str1;
	} else {
		shorter = str1;
		longer = str2;
	}

	var shorterReverse = shorter.split("");
	shorterReverse = shorterReverse.reverse();
	shorterReverse = shorterReverse.join("");

	if (shorter.length === longer.length) {
		if (shorter === longer || shorterReverse === longer) {	
			return true;
		} else {
			return false;
		}
	}	

	for (var i = 0; i <= longer.length - shorter.length; i++) {
		if (shorter === longer.substring(i, i + shorter.length) || 
			shorterReverse === longer.substring(i, i + shorter.length)) {
			return true;
		} 
	}
	return false;
}
/* 
	length, I'll check if they are the same string, forward or reverse. I'll
	I initially began writing a solution that would check each character 
	within the longer string and then check if the following characters 
	matched the shorter string. Getting the string indices correct backwards 
	and forwards was a bit of a hassle. I think I was fixated on the previous
	question which dealt with unique characters in a string. After I recalled 
	that I can just compare the smaller string with an equal size substring 
	of the larger, things went a lot more smoothly. The solution works, but 
	I'm sure there are lot of ways to improve it.
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
testFunction(isPermutation("Hello", ""), false);
testFunction(isPermutation("Hello", "H"), true);
testFunction(isPermutation("Hello", "He"), true);
testFunction(isPermutation("Hello", "he"), true);
testFunction(isPermutation("Hello", "el"), true);
testFunction(isPermutation("Hello", "ello"), true);
testFunction(isPermutation("Hello", "o"), true);
testFunction(isPermutation("Hello", "ol"), true);
testFunction(isPermutation("Hello", "le"), true);
testFunction(isPermutation("Hello", "lleH"), true);
testFunction(isPermutation("Hello", "AbChElLo"), true);
testFunction(isPermutation("Hello", "a"), false);
testFunction(isPermutation("Hello", "aolleH"), true);
testFunction(isPermutation("Hello", "abc"), false);
testFunction(isPermutation("hello", "ell"), true);
testFunction(isPermutation("hello", "elll"), false);
testFunction(isPermutation("hello", "elle"), false);
testFunction(isPermutation("hello", "olle"), true);
testFunction(isPermutation("hello", "olleh"), true);