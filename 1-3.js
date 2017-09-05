/*
URLify: Write a method to replace all spaces in a string with '%20'. You may assume that the string
has sufficient space at the end to hold the additional characters, and that you are given the "true"
length of the string. 
ex: 
input: "Mr John Smith      ", 13
output: "Mr%20John%20Smith"

First Impressions: 
I'm not entirely sure why the input will have trailing spaces. I guess for now I'll truncate
the string to a substring from 0 to 13. Then I'll split it into an array and put '%20' in place 
of the spaces. Then rejoin the string and return.
*/

/*
// First Attempt
function URLify(str, length) {
	str = str.substring(0, length);
	str = str.split("");

	for (var i = 0; i < str.length; i++) {
		if (str[i] === " ") {
			str[i] = "%";
			str.splice(i + 1, 0, "2");
			str.splice(i + 2, 0, "0");
			i += 2;
		}
	}

	str = str.join("");

	return str;
}

*/

/*
	Afterthoughts:
	My solution only requires a single loop, but I'm pretty certain that splicing an 
	array causes a considerable performance hit. I replace the space character in the
	array, and splice the 2 and 0 characters immediately after it. I don't know if 
	javascript stores the array as and specific data type, so storing the string
	"%20" in the space character's index might be possibe. I'm sure if I were to use
	this solution in Java or C++ I'd have to use the same data type as the rest of 
	the array, so I stuck with that method. I think there are some ways to improve 
	this solution, so I'll review hints and the solution to see how I can do so.
*/

/*	
	The book assumes I am using a character array of appropriate length for the 
	modified string. I believe this is because array sizes cannot be changed in Java or 
	C++. I'll emulate this limitation in my next attempt. The solution also suggests
	that I should move backwards from the end of the array.
*/
	
function URLify(str, length) {
	str = str.split("");

	var spaces = 0;
	for (var i = 0; i < length; i++) {
		if (str[i] === ' ') {
			spaces++;
		}
	}

/*	
	Book assumes using Java/C++. C-style strings must be null terminated, but I'm
	just going to join the array back into a string, so it's not necessary.

	if (length < str.length) {
		str[length] = '\0';
	}
*/	

	var currentIndex = length + (spaces * 2) - 1;
	for (var i = length - 1; i >= 0; i--) {
		if (str[i] === ' ') {
			str[currentIndex] = '0';
			str[currentIndex - 1] = '2'
			str[currentIndex - 2] = '%';
			currentIndex -= 3;
		} else {
			str[currentIndex] = str[i];
			currentIndex--;
		}
	}

	str = str.join("");

	return str;
}

/*
	Final Thoughts:
	I followed the solution provided in the book and made some minor modifications 
	for javascript. Because the book expects the character array to be null terminated,
	I commented out that portion. I modified the array indices used for my own 
	clarity. The solution seems similar in a lot of ways to my first attempt. The
	provided solution uses two separate loops to account for a set size array and to
	count spaces. My solution only uses one loop, but it is very likely still not as 
	efficient due to needing to splice the array for characters added when a space is 
	encountered. As with the final solution for 1-2, this one iterates from the end of 
	the string. I'll have to keep this in mind for future problems to see if it can 
	simplify things.
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
testFunction(URLify("Mr John Smith    ", 13), "Mr%20John%20Smith");
testFunction(URLify("My name is Kyle      ", 15), "My%20name%20is%20Kyle");
testFunction(URLify("Hello, this is a test", 21), "Hello,%20this%20is%20a%20test");
testFunction(URLify("a b c d e f g ", 14), "a%20b%20c%20d%20e%20f%20g%20");
testFunction(URLify(" Testing     Testing ", 21), "%20Testing%20%20%20%20%20Testing%20");



