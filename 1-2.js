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
/*
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

	I initially began writing a solution that would check each character 
	within the longer string and then check if the following characters 
	matched the shorter string. Getting the string indices correct backwards 
	and forwards was a bit of a hassle. I think I was fixated on the previous
	question which dealt with unique characters in a string. After I recalled 
	that I can just compare the smaller string with an equal size substring 
	of the larger, things went a lot more smoothly. The solution works, but 
	I'm sure there are lot of ways to improve it.
*/

/* 
	I entirely missed the definition of what a permutation is. I was under the
	incorrect assumption that one string was a permutation of another if the 
	the larger or equal length string contains the other string, either backwards
	or forwards. I will re-attempt the problem understanding now that two strings
	are permutations of each other if they are both the same length, and contain
	the same characters in any combination. 
*/
function isPermutation(str1, str2) {
	if (str1.length != str2.length) {
		return false;
	}

	str1 = str1.toLowerCase();
	str2 = str2.toLowerCase();

	var str1CharCounts = {};
	var str2CharCounts = {};

	for (var i = 0; i < str1.length; i++) {
		if (typeof str1CharCounts[str1[i]] === "undefined") {
			str1CharCounts[str1[i]] = 1;
		} else {
			str1CharCounts[str1[i]]++;
		}
		if (typeof str2CharCounts[str2[i]] === "undefined") {
			str2CharCounts[str2[i]] = 1;
		} else {
			str2CharCounts[str2[i]]++;
		}
	}

	var str1Keys = Object.keys(str1CharCounts);
	var str2Keys = Object.keys(str2CharCounts);

	for (var i = 0; i < str1Keys.length; i++) {
		if (str1CharCounts[str1Keys[i]] != str2CharCounts[str1Keys[i]]) {
			return false;
		}
	}
	for (var i = 0; i < str2Keys.length; i++) {
		if (str2CharCounts[str2Keys[i]] != str1CharCounts[str2Keys[i]]) {
			return false;
		}
	}

	return true;
}
/*
	The solution works for the test cases I have created. I need to make sure that I really
	have all the details and definitions correct before i attempt these problems. I used a 
	lot of time creating a solution to a problem that wasn't asked. 
	With regards to this solution, it's not a pretty one, but it works. It's not efficient
	either. I'm incrementing the character counts in a map for each string, then looping
	through each of these keys in the maps to make sure the maps are equal. Javascript 
	doesn't seem to have an easy way to check object equivalence, so it looked like the
	only way to do so was looping through the values. I'm not entirely sure it is necessary
	to loop through both of the map's key sets. I know there are times when a keyset may not
	have all the keys that the other has. I could probably just check that the length of the
	keysets are equal, and then run through it once. That said, I think I'll try to take
	another angle in the next attempt for something more efficient. 
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
testFunction(isPermutation("abc", "abc"), true);
testFunction(isPermutation("abc", "cba"), true);
testFunction(isPermutation("abc", "bca"), true);
testFunction(isPermutation("abc", "abcdefg"), false);
testFunction(isPermutation("abc", "aaa"), false);
testFunction(isPermutation("abc", "bbb"), false);
testFunction(isPermutation("abc", "ccc"), false);
testFunction(isPermutation("abc", "abc"), true);
testFunction(isPermutation("abc", "ddd"), false);
testFunction(isPermutation("This is a test", "tset a si sihT"), true);








// Tests for misinterpreted understanding of permutation
// testFunction(isPermutation("Hello", ""), false);
// testFunction(isPermutation("Hello", "H"), true);
// testFunction(isPermutation("Hello", "He"), true);
// testFunction(isPermutation("Hello", "he"), true);
// testFunction(isPermutation("Hello", "el"), true);
// testFunction(isPermutation("Hello", "ello"), true);
// testFunction(isPermutation("Hello", "o"), true);
// testFunction(isPermutation("Hello", "ol"), true);
// testFunction(isPermutation("Hello", "le"), true);
// testFunction(isPermutation("Hello", "lleH"), true);
// testFunction(isPermutation("Hello", "AbChElLo"), true);
// testFunction(isPermutation("Hello", "a"), false);
// testFunction(isPermutation("Hello", "aolleH"), true);
// testFunction(isPermutation("Hello", "abc"), false);
// testFunction(isPermutation("hello", "ell"), true);
// testFunction(isPermutation("hello", "elll"), false);
// testFunction(isPermutation("hello", "elle"), false);
// testFunction(isPermutation("hello", "olle"), true);
// testFunction(isPermutation("hello", "olleh"), true);