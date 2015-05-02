(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

},{}],2:[function(require,module,exports){
(function (global){
/**
 * @license
 * Video.js 5.0.0-0 <http://videojs.com/>
 * Copyright Brightcove, Inc. <https://www.brightcove.com/>
 * Available under Apache License Version 2.0
 * <https://github.com/videojs/video.js/blob/master/LICENSE>
 *
 * Includes vtt.js <https://github.com/mozilla/vtt.js>
 * Available under Apache License Version 2.0
 * <https://github.com/mozilla/vtt.js/blob/master/LICENSE>
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = _dereq_('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"min-document":3}],2:[function(_dereq_,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(_dereq_,module,exports){

},{}],4:[function(_dereq_,module,exports){
module.exports = SafeParseTuple

function SafeParseTuple(obj, reviver) {
    var json
    var error = null

    try {
        json = JSON.parse(obj, reviver)
    } catch (err) {
        error = err
    }

    return [error, json]
}

},{}],5:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Button2 = _dereq_('./button');

var _Button3 = _interopRequireDefault(_Button2);

/* Big Play Button
================================================================================ */
/**
 * Initial play button. Shows before the video has played. The hiding of the
 * big play button is done via CSS and player states.
 * @param {Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */

var BigPlayButton = (function (_Button) {
  function BigPlayButton() {
    _classCallCheck(this, BigPlayButton);

    if (_Button != null) {
      _Button.apply(this, arguments);
    }
  }

  _inherits(BigPlayButton, _Button);

  _createClass(BigPlayButton, [{
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(BigPlayButton.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-big-play-button',
        innerHTML: '<span aria-hidden="true"></span>',
        'aria-label': 'play video'
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.player_.play();
    }
  }]);

  return BigPlayButton;
})(_Button3['default']);

_Button3['default'].registerComponent('BigPlayButton', BigPlayButton);
exports['default'] = BigPlayButton;
module.exports = exports['default'];

},{"./button":6}],6:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('./component');

var _Component3 = _interopRequireDefault(_Component2);

var _import = _dereq_('./lib');

var Lib = _interopRequireWildcard(_import);

var _import2 = _dereq_('./events');

var Events = _interopRequireWildcard(_import2);

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

/* Button - Base class for all buttons
================================================================================ */
/**
 * Base class for all buttons
 * @param {Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */

var Button = (function (_Component) {
  function Button(player, options) {
    _classCallCheck(this, Button);

    _get(Object.getPrototypeOf(Button.prototype), 'constructor', this).call(this, player, options);

    this.emitTapEvents();

    this.on('tap', this.handleClick);
    this.on('click', this.handleClick);
    this.on('focus', this.handleFocus);
    this.on('blur', this.handleBlur);
  }

  _inherits(Button, _Component);

  _createClass(Button, [{
    key: 'createEl',
    value: function createEl(type, props) {
      // Add standard Aria and Tabindex info
      props = Lib.obj.merge({
        className: this.buildCSSClass(),
        role: 'button',
        'aria-live': 'polite', // let the screen reader user know that the text of the button may change
        tabIndex: 0
      }, props);

      var el = _get(Object.getPrototypeOf(Button.prototype), 'createEl', this).call(this, type, props);

      // if innerHTML hasn't been overridden (bigPlayButton), add content elements
      if (!props.innerHTML) {
        this.contentEl_ = Lib.createEl('div', {
          className: 'vjs-control-content'
        });

        this.controlText_ = Lib.createEl('span', {
          className: 'vjs-control-text',
          innerHTML: this.localize(this.buttonText) || 'Need Text'
        });

        this.contentEl_.appendChild(this.controlText_);
        el.appendChild(this.contentEl_);
      }

      return el;
    }
  }, {
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-control vjs-button ' + _get(Object.getPrototypeOf(Button.prototype), 'buildCSSClass', this).call(this);
    }
  }, {
    key: 'handleClick',

    // Click - Override with specific functionality for button
    value: function handleClick() {}
  }, {
    key: 'handleFocus',

    // Focus - Add keyboard functionality to element
    value: function handleFocus() {
      Events.on(_document2['default'], 'keydown', Lib.bind(this, this.handleKeyPress));
    }
  }, {
    key: 'handleKeyPress',

    // KeyPress (document level) - Trigger click when keys are pressed
    value: function handleKeyPress(event) {
      // Check for space bar (32) or enter (13) keys
      if (event.which == 32 || event.which == 13) {
        event.preventDefault();
        this.handleClick();
      }
    }
  }, {
    key: 'handleBlur',

    // Blur - Remove keyboard triggers
    value: function handleBlur() {
      Events.off(_document2['default'], 'keydown', Lib.bind(this, this.handleKeyPress));
    }
  }]);

  return Button;
})(_Component3['default']);

_Component3['default'].registerComponent('Button', Button);
exports['default'] = Button;
module.exports = exports['default'];

},{"./component":7,"./events":43,"./lib":46,"global/document":1}],7:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * @fileoverview Player Component - Base class for all UI objects
 *
 */

var _import = _dereq_('./lib.js');

var Lib = _interopRequireWildcard(_import);

var _import2 = _dereq_('./util.js');

var VjsUtil = _interopRequireWildcard(_import2);

var _import3 = _dereq_('./events.js');

var Events = _interopRequireWildcard(_import3);

var _window = _dereq_('global/window');

var _window2 = _interopRequireDefault(_window);

/**
 * Base UI Component class
 *
 * Components are embeddable UI objects that are represented by both a
 * javascript object and an element in the DOM. They can be children of other
 * components, and can have many children themselves.
 *
 *     // adding a button to the player
 *     var button = player.addChild('button');
 *     button.el(); // -> button element
 *
 *     <div class="video-js">
 *       <div class="vjs-button">Button</div>
 *     </div>
 *
 * Components are also event emitters.
 *
 *     button.on('click', function(){
 *       console.log('Button Clicked!');
 *     });
 *
 *     button.trigger('customevent');
 *
 * @param {Object} player  Main Player
 * @param {Object=} options
 * @class
 * @constructor
 */

var Component = (function () {
  function Component(player, options, ready) {
    _classCallCheck(this, Component);

    // The component might be the player itself and we can't pass `this` to super
    if (!player && this.play) {
      this.player_ = player = this;
    } else {
      this.player_ = player;
    }

    // Make a copy of prototype.options_ to protect against overriding global defaults
    this.options_ = Lib.obj.copy(this.options_);

    // Updated options with supplied options
    options = this.options(options);

    // Get ID from options or options element if one is supplied
    this.id_ = options.id || options.el && options.el.id;

    // If there was no ID from the options, generate one
    if (!this.id_) {
      // Don't require the player ID function in the case of mock players
      var id = player.id && player.id() || 'no_player';
      this.id_ = '' + id + '_component_' + Lib.guid++;
    }

    this.name_ = options.name || null;

    // Create element if one wasn't provided in options
    if (options.el) {
      this.el_ = options.el;
    } else if (options.createEl !== false) {
      this.el_ = this.createEl();
    }

    this.children_ = [];
    this.childIndex_ = {};
    this.childNameIndex_ = {};

    // Add any child components in options
    if (options.initChildren !== false) {
      this.initChildren();
    }

    this.ready(ready);
    // Don't want to trigger ready here or it will before init is actually
    // finished for all children that run this constructor

    if (options.reportTouchActivity !== false) {
      this.enableTouchActivity();
    }
  }

  _createClass(Component, [{
    key: 'init',

    // Temp for ES6 class transition, remove before 5.0
    value: function init() {
      // console.log('init called on Component');
      Component.apply(this, arguments);
    }
  }, {
    key: 'dispose',

    /**
     * Dispose of the component and all child components
     */
    value: function dispose() {
      this.trigger({ type: 'dispose', bubbles: false });

      // Dispose all children.
      if (this.children_) {
        for (var i = this.children_.length - 1; i >= 0; i--) {
          if (this.children_[i].dispose) {
            this.children_[i].dispose();
          }
        }
      }

      // Delete child references
      this.children_ = null;
      this.childIndex_ = null;
      this.childNameIndex_ = null;

      // Remove all event listeners.
      this.off();

      // Remove element from DOM
      if (this.el_.parentNode) {
        this.el_.parentNode.removeChild(this.el_);
      }

      Lib.removeData(this.el_);
      this.el_ = null;
    }
  }, {
    key: 'player',

    /**
     * Return the component's player
     *
     * @return {Player}
     */
    value: function player() {
      return this.player_;
    }
  }, {
    key: 'options',

    /**
     * Deep merge of options objects
     *
     * Whenever a property is an object on both options objects
     * the two properties will be merged using Lib.obj.deepMerge.
     *
     * This is used for merging options for child components. We
     * want it to be easy to override individual options on a child
     * component without having to rewrite all the other default options.
     *
     *     Parent.prototype.options_ = {
     *       children: {
     *         'childOne': { 'foo': 'bar', 'asdf': 'fdsa' },
     *         'childTwo': {},
     *         'childThree': {}
     *       }
     *     }
     *     newOptions = {
     *       children: {
     *         'childOne': { 'foo': 'baz', 'abc': '123' }
     *         'childTwo': null,
     *         'childFour': {}
     *       }
     *     }
     *
     *     this.options(newOptions);
     *
     * RESULT
     *
     *     {
     *       children: {
     *         'childOne': { 'foo': 'baz', 'asdf': 'fdsa', 'abc': '123' },
     *         'childTwo': null, // Disabled. Won't be initialized.
     *         'childThree': {},
     *         'childFour': {}
     *       }
     *     }
     *
     * @param  {Object} obj Object of new option values
     * @return {Object}     A NEW object of this.options_ and obj merged
     */
    value: function options(obj) {
      if (obj === undefined) {
        return this.options_;
      }return this.options_ = VjsUtil.mergeOptions(this.options_, obj);
    }
  }, {
    key: 'el',

    /**
     * Get the component's DOM element
     *
     *     var domEl = myComponent.el();
     *
     * @return {Element}
     */
    value: function el() {
      return this.el_;
    }
  }, {
    key: 'createEl',

    /**
     * Create the component's DOM element
     *
     * @param  {String=} tagName  Element's node type. e.g. 'div'
     * @param  {Object=} attributes An object of element attributes that should be set on the element
     * @return {Element}
     */
    value: function createEl(tagName, attributes) {
      return Lib.createEl(tagName, attributes);
    }
  }, {
    key: 'localize',
    value: function localize(string) {
      var lang = this.player_.language();
      var languages = this.player_.languages();

      if (languages && languages[lang] && languages[lang][string]) {
        return languages[lang][string];
      }

      return string;
    }
  }, {
    key: 'contentEl',

    /**
     * Return the component's DOM element where children are inserted.
     * Will either be the same as el() or a new element defined in createEl().
     *
     * @return {Element}
     */
    value: function contentEl() {
      return this.contentEl_ || this.el_;
    }
  }, {
    key: 'id',

    /**
     * Get the component's ID
     *
     *     var id = myComponent.id();
     *
     * @return {String}
     */
    value: function id() {
      return this.id_;
    }
  }, {
    key: 'name',

    /**
     * Get the component's name. The name is often used to reference the component.
     *
     *     var name = myComponent.name();
     *
     * @return {String}
     */
    value: function name() {
      return this.name_;
    }
  }, {
    key: 'children',

    /**
     * Get an array of all child components
     *
     *     var kids = myComponent.children();
     *
     * @return {Array} The children
     */
    value: function children() {
      return this.children_;
    }
  }, {
    key: 'getChildById',

    /**
     * Returns a child component with the provided ID
     *
     * @return {Component}
     */
    value: function getChildById(id) {
      return this.childIndex_[id];
    }
  }, {
    key: 'getChild',

    /**
     * Returns a child component with the provided name
     *
     * @return {Component}
     */
    value: function getChild(name) {
      return this.childNameIndex_[name];
    }
  }, {
    key: 'addChild',

    /**
     * Adds a child component inside this component
     *
     *     myComponent.el();
     *     // -> <div class='my-component'></div>
     *     myComponent.children();
     *     // [empty array]
     *
     *     var myButton = myComponent.addChild('MyButton');
     *     // -> <div class='my-component'><div class="my-button">myButton<div></div>
     *     // -> myButton === myComonent.children()[0];
     *
     * Pass in options for child constructors and options for children of the child
     *
     *     var myButton = myComponent.addChild('MyButton', {
     *       text: 'Press Me',
     *       children: {
     *         buttonChildExample: {
     *           buttonChildOption: true
     *         }
     *       }
     *     });
     *
     * @param {String|Component} child The class name or instance of a child to add
     * @param {Object=} options Options, including options to be passed to children of the child.
     * @return {Component} The child component (created by this process if a string was used)
     * @suppress {accessControls|checkRegExp|checkTypes|checkVars|const|constantProperty|deprecated|duplicate|es5Strict|fileoverviewTags|globalThis|invalidCasts|missingProperties|nonStandardJsDocs|strictModuleDepCheck|undefinedNames|undefinedVars|unknownDefines|uselessCode|visibility}
     */
    value: function addChild(child) {
      var options = arguments[1] === undefined ? {} : arguments[1];

      var component = undefined;
      var componentName = undefined;

      // If child is a string, create nt with options
      if (typeof child === 'string') {
        componentName = child;

        // Options can also be specified as a boolean, so convert to an empty object if false.
        if (!options) {
          options = {};
        }

        // Same as above, but true is deprecated so show a warning.
        if (options === true) {
          Lib.log.warn('Initializing a child component with `true` is deprecated. Children should be defined in an array when possible, but if necessary use an object instead of `true`.');
          options = {};
        }

        // If no componentClass in options, assume componentClass is the name lowercased
        // (e.g. playButton)
        var componentClassName = options.componentClass || Lib.capitalize(componentName);

        // Set name through options
        options.name = componentName;

        // Create a new object & element for this controls set
        // If there's no .player_, this is a player
        var componentClass = Component.getComponent(componentClassName);

        component = new componentClass(this.player_ || this, options);

        // child is a component instance
      } else {
        component = child;
      }

      this.children_.push(component);

      if (typeof component.id === 'function') {
        this.childIndex_[component.id()] = component;
      }

      // If a name wasn't used to create the component, check if we can use the
      // name function of the component
      componentName = componentName || component.name && component.name();

      if (componentName) {
        this.childNameIndex_[componentName] = component;
      }

      // Add the UI object's element to the container div (box)
      // Having an element is not required
      if (typeof component.el === 'function' && component.el()) {
        this.contentEl().appendChild(component.el());
      }

      // Return so it can stored on parent object if desired.
      return component;
    }
  }, {
    key: 'removeChild',

    /**
     * Remove a child component from this component's list of children, and the
     * child component's element from this component's element
     *
     * @param  {Component} component Component to remove
     */
    value: function removeChild(component) {
      if (typeof component === 'string') {
        component = this.getChild(component);
      }

      if (!component || !this.children_) {
        return;
      }var childFound = false;
      for (var i = this.children_.length - 1; i >= 0; i--) {
        if (this.children_[i] === component) {
          childFound = true;
          this.children_.splice(i, 1);
          break;
        }
      }

      if (!childFound) {
        return;
      }this.childIndex_[component.id()] = null;
      this.childNameIndex_[component.name()] = null;

      var compEl = component.el();
      if (compEl && compEl.parentNode === this.contentEl()) {
        this.contentEl().removeChild(component.el());
      }
    }
  }, {
    key: 'initChildren',

    /**
     * Add and initialize default child components from options
     *
     *     // when an instance of MyComponent is created, all children in options
     *     // will be added to the instance by their name strings and options
     *     MyComponent.prototype.options_.children = {
     *       myChildComponent: {
     *         myChildOption: true
     *       }
     *     }
     *
     *     // Or when creating the component
     *     var myComp = new MyComponent(player, {
     *       children: {
     *         myChildComponent: {
     *           myChildOption: true
     *         }
     *       }
     *     });
     *
     * The children option can also be an Array of child names or
     * child options objects (that also include a 'name' key).
     *
     *     var myComp = new MyComponent(player, {
     *       children: [
     *         'button',
     *         {
     *           name: 'button',
     *           someOtherOption: true
     *         }
     *       ]
     *     });
     *
     */
    value: function initChildren() {
      var _this = this;

      var children = this.options_.children;

      if (children) {
        var i;

        (function () {
          var parent = _this;
          var parentOptions = parent.options();
          var handleAdd = function handleAdd(name, opts) {
            // Allow options for children to be set at the parent options
            // e.g. videojs(id, { controlBar: false });
            // instead of videojs(id, { children: { controlBar: false });
            if (parentOptions[name] !== undefined) {
              opts = parentOptions[name];
            }

            // Allow for disabling default components
            // e.g. options['children']['posterImage'] = false
            if (opts === false) {
              return;
            } // Create and add the child component.
            // Add a direct reference to the child by name on the parent instance.
            // If two of the same component are used, different names should be supplied
            // for each
            parent[name] = parent.addChild(name, opts);
          };

          // Allow for an array of children details to passed in the options
          if (Lib.obj.isArray(children)) {
            for (i = 0; i < children.length; i++) {
              var child = children[i];

              var _name = undefined,
                  opts = undefined;
              if (typeof child == 'string') {
                // ['myComponent']
                _name = child;
                opts = {};
              } else {
                // [{ name: 'myComponent', otherOption: true }]
                _name = child.name;
                opts = child;
              }

              handleAdd(_name, opts);
            }
          } else {
            Lib.obj.each(children, handleAdd);
          }
        })();
      }
    }
  }, {
    key: 'buildCSSClass',

    /**
     * Allows sub components to stack CSS class names
     *
     * @return {String} The constructed class name
     */
    value: function buildCSSClass() {
      // Child classes can include a function that does:
      // return 'CLASS NAME' + this._super();
      return '';
    }
  }, {
    key: 'on',

    /**
     * Add an event listener to this component's element
     *
     *     var myFunc = function(){
     *       var myComponent = this;
     *       // Do something when the event is fired
     *     };
     *
     *     myComponent.on('eventType', myFunc);
     *
     * The context of myFunc will be myComponent unless previously bound.
     *
     * Alternatively, you can add a listener to another element or component.
     *
     *     myComponent.on(otherElement, 'eventName', myFunc);
     *     myComponent.on(otherComponent, 'eventName', myFunc);
     *
     * The benefit of using this over `VjsEvents.on(otherElement, 'eventName', myFunc)`
     * and `otherComponent.on('eventName', myFunc)` is that this way the listeners
     * will be automatically cleaned up when either component is disposed.
     * It will also bind myComponent as the context of myFunc.
     *
     * **NOTE**: When using this on elements in the page other than window
     * and document (both permanent), if you remove the element from the DOM
     * you need to call `myComponent.trigger(el, 'dispose')` on it to clean up
     * references to it and allow the browser to garbage collect it.
     *
     * @param  {String|Component} first   The event type or other component
     * @param  {Function|String}      second  The event handler or event type
     * @param  {Function}             third   The event handler
     * @return {Component}        self
     */
    value: function on(first, second, third) {
      var _this2 = this;

      if (typeof first === 'string' || Lib.obj.isArray(first)) {
        Events.on(this.el_, first, Lib.bind(this, second));

        // Targeting another component or element
      } else {
        (function () {
          var target = first;
          var type = second;
          var fn = Lib.bind(_this2, third);
          var thisComponent = _this2;

          // When this component is disposed, remove the listener from the other component
          var removeOnDispose = function removeOnDispose() {
            thisComponent.off(target, type, fn);
          };
          // Use the same function ID so we can remove it later it using the ID
          // of the original listener
          removeOnDispose.guid = fn.guid;
          _this2.on('dispose', removeOnDispose);

          // If the other component is disposed first we need to clean the reference
          // to the other component in this component's removeOnDispose listener
          // Otherwise we create a memory leak.
          var cleanRemover = function cleanRemover() {
            thisComponent.off('dispose', removeOnDispose);
          };
          // Add the same function ID so we can easily remove it later
          cleanRemover.guid = fn.guid;

          // Check if this is a DOM node
          if (first.nodeName) {
            // Add the listener to the other element
            Events.on(target, type, fn);
            Events.on(target, 'dispose', cleanRemover);

            // Should be a component
            // Not using `instanceof Component` because it makes mock players difficult
          } else if (typeof first.on === 'function') {
            // Add the listener to the other component
            target.on(type, fn);
            target.on('dispose', cleanRemover);
          }
        })();
      }

      return this;
    }
  }, {
    key: 'off',

    /**
     * Remove an event listener from this component's element
     *
     *     myComponent.off('eventType', myFunc);
     *
     * If myFunc is excluded, ALL listeners for the event type will be removed.
     * If eventType is excluded, ALL listeners will be removed from the component.
     *
     * Alternatively you can use `off` to remove listeners that were added to other
     * elements or components using `myComponent.on(otherComponent...`.
     * In this case both the event type and listener function are REQUIRED.
     *
     *     myComponent.off(otherElement, 'eventType', myFunc);
     *     myComponent.off(otherComponent, 'eventType', myFunc);
     *
     * @param  {String=|Component}  first  The event type or other component
     * @param  {Function=|String}       second The listener function or event type
     * @param  {Function=}              third  The listener for other component
     * @return {Component}
     */
    value: function off(first, second, third) {
      if (!first || typeof first === 'string' || Lib.obj.isArray(first)) {
        Events.off(this.el_, first, second);
      } else {
        var target = first;
        var type = second;
        // Ensure there's at least a guid, even if the function hasn't been used
        var fn = Lib.bind(this, third);

        // Remove the dispose listener on this component,
        // which was given the same guid as the event listener
        this.off('dispose', fn);

        if (first.nodeName) {
          // Remove the listener
          Events.off(target, type, fn);
          // Remove the listener for cleaning the dispose listener
          Events.off(target, 'dispose', fn);
        } else {
          target.off(type, fn);
          target.off('dispose', fn);
        }
      }

      return this;
    }
  }, {
    key: 'one',

    /**
     * Add an event listener to be triggered only once and then removed
     *
     *     myComponent.one('eventName', myFunc);
     *
     * Alternatively you can add a listener to another element or component
     * that will be triggered only once.
     *
     *     myComponent.one(otherElement, 'eventName', myFunc);
     *     myComponent.one(otherComponent, 'eventName', myFunc);
     *
     * @param  {String|Component}  first   The event type or other component
     * @param  {Function|String}       second  The listener function or event type
     * @param  {Function=}             third   The listener function for other component
     * @return {Component}
     */
    value: function one(first, second, third) {
      var _this3 = this;

      if (typeof first === 'string' || Lib.obj.isArray(first)) {
        Events.one(this.el_, first, Lib.bind(this, second));
      } else {
        (function () {
          var target = first;
          var type = second;
          var fn = Lib.bind(_this3, third);
          var thisComponent = _this3;

          var newFunc = (function (_newFunc) {
            function newFunc() {
              return _newFunc.apply(this, arguments);
            }

            newFunc.toString = function () {
              return _newFunc.toString();
            };

            return newFunc;
          })(function () {
            thisComponent.off(target, type, newFunc);
            fn.apply(this, arguments);
          });
          // Keep the same function ID so we can remove it later
          newFunc.guid = fn.guid;

          _this3.on(target, type, newFunc);
        })();
      }

      return this;
    }
  }, {
    key: 'trigger',

    /**
     * Trigger an event on an element
     *
     *     myComponent.trigger('eventName');
     *     myComponent.trigger({'type':'eventName'});
     *
     * @param  {Event|Object|String} event  A string (the type) or an event object with a type attribute
     * @return {Component}       self
     */
    value: function trigger(event) {
      Events.trigger(this.el_, event);
      return this;
    }
  }, {
    key: 'ready',

    /**
     * Bind a listener to the component's ready state
     *
     * Different from event listeners in that if the ready event has already happened
     * it will trigger the function immediately.
     *
     * @param  {Function} fn Ready listener
     * @return {Component}
     */
    value: function ready(fn) {
      if (fn) {
        if (this.isReady_) {
          fn.call(this);
        } else {
          this.readyQueue_ = this.readyQueue_ || [];
          this.readyQueue_.push(fn);
        }
      }
      return this;
    }
  }, {
    key: 'triggerReady',

    /**
     * Trigger the ready listeners
     *
     * @return {Component}
     */
    value: function triggerReady() {
      this.isReady_ = true;

      var readyQueue = this.readyQueue_;

      if (readyQueue && readyQueue.length > 0) {

        for (var i = 0, j = readyQueue.length; i < j; i++) {
          readyQueue[i].call(this);
        }

        // Reset Ready Queue
        this.readyQueue_ = [];

        // Allow for using event listeners also, in case you want to do something everytime a source is ready.
        this.trigger('ready');
      }
    }
  }, {
    key: 'hasClass',

    /**
     * Check if a component's element has a CSS class name
     *
     * @param {String} classToCheck Classname to check
     * @return {Component}
     */
    value: function hasClass(classToCheck) {
      return Lib.hasClass(this.el_, classToCheck);
    }
  }, {
    key: 'addClass',

    /**
     * Add a CSS class name to the component's element
     *
     * @param {String} classToAdd Classname to add
     * @return {Component}
     */
    value: function addClass(classToAdd) {
      Lib.addClass(this.el_, classToAdd);
      return this;
    }
  }, {
    key: 'removeClass',

    /**
     * Remove a CSS class name from the component's element
     *
     * @param {String} classToRemove Classname to remove
     * @return {Component}
     */
    value: function removeClass(classToRemove) {
      Lib.removeClass(this.el_, classToRemove);
      return this;
    }
  }, {
    key: 'show',

    /**
     * Show the component element if hidden
     *
     * @return {Component}
     */
    value: function show() {
      this.removeClass('vjs-hidden');
      return this;
    }
  }, {
    key: 'hide',

    /**
     * Hide the component element if currently showing
     *
     * @return {Component}
     */
    value: function hide() {
      this.addClass('vjs-hidden');
      return this;
    }
  }, {
    key: 'lockShowing',

    /**
     * Lock an item in its visible state
     * To be used with fadeIn/fadeOut.
     *
     * @return {Component}
     * @private
     */
    value: function lockShowing() {
      this.addClass('vjs-lock-showing');
      return this;
    }
  }, {
    key: 'unlockShowing',

    /**
     * Unlock an item to be hidden
     * To be used with fadeIn/fadeOut.
     *
     * @return {Component}
     * @private
     */
    value: function unlockShowing() {
      this.removeClass('vjs-lock-showing');
      return this;
    }
  }, {
    key: 'width',

    /**
     * Set or get the width of the component (CSS values)
     *
     * Setting the video tag dimension values only works with values in pixels.
     * Percent values will not work.
     * Some percents can be used, but width()/height() will return the number + %,
     * not the actual computed width/height.
     *
     * @param  {Number|String=} num   Optional width number
     * @param  {Boolean} skipListeners Skip the 'resize' event trigger
     * @return {Component} This component, when setting the width
     * @return {Number|String} The width, when getting
     */
    value: function width(num, skipListeners) {
      return this.dimension('width', num, skipListeners);
    }
  }, {
    key: 'height',

    /**
     * Get or set the height of the component (CSS values)
     *
     * Setting the video tag dimension values only works with values in pixels.
     * Percent values will not work.
     * Some percents can be used, but width()/height() will return the number + %,
     * not the actual computed width/height.
     *
     * @param  {Number|String=} num     New component height
     * @param  {Boolean=} skipListeners Skip the resize event trigger
     * @return {Component} This component, when setting the height
     * @return {Number|String} The height, when getting
     */
    value: function height(num, skipListeners) {
      return this.dimension('height', num, skipListeners);
    }
  }, {
    key: 'dimensions',

    /**
     * Set both width and height at the same time
     *
     * @param  {Number|String} width
     * @param  {Number|String} height
     * @return {Component} The component
     */
    value: function dimensions(width, height) {
      // Skip resize listeners on width for optimization
      return this.width(width, true).height(height);
    }
  }, {
    key: 'dimension',

    /**
     * Get or set width or height
     *
     * This is the shared code for the width() and height() methods.
     * All for an integer, integer + 'px' or integer + '%';
     *
     * Known issue: Hidden elements officially have a width of 0. We're defaulting
     * to the style.width value and falling back to computedStyle which has the
     * hidden element issue. Info, but probably not an efficient fix:
     * http://www.foliotek.com/devblog/getting-the-width-of-a-hidden-element-with-jquery-using-width/
     *
     * @param  {String} widthOrHeight  'width' or 'height'
     * @param  {Number|String=} num     New dimension
     * @param  {Boolean=} skipListeners Skip resize event trigger
     * @return {Component} The component if a dimension was set
     * @return {Number|String} The dimension if nothing was set
     * @private
     */
    value: function dimension(widthOrHeight, num, skipListeners) {
      if (num !== undefined) {
        // Set to zero if null or literally NaN (NaN !== NaN)
        if (num === null || num !== num) {
          num = 0;
        }

        // Check if using css width/height (% or px) and adjust
        if (('' + num).indexOf('%') !== -1 || ('' + num).indexOf('px') !== -1) {
          this.el_.style[widthOrHeight] = num;
        } else if (num === 'auto') {
          this.el_.style[widthOrHeight] = '';
        } else {
          this.el_.style[widthOrHeight] = num + 'px';
        }

        // skipListeners allows us to avoid triggering the resize event when setting both width and height
        if (!skipListeners) {
          this.trigger('resize');
        }

        // Return component
        return this;
      }

      // Not setting a value, so getting it
      // Make sure element exists
      if (!this.el_) {
        return 0;
      } // Get dimension value from style
      var val = this.el_.style[widthOrHeight];
      var pxIndex = val.indexOf('px');
      if (pxIndex !== -1) {
        // Return the pixel value with no 'px'
        return parseInt(val.slice(0, pxIndex), 10);

        // No px so using % or no style was set, so falling back to offsetWidth/height
        // If component has display:none, offset will return 0
        // TODO: handle display:none and no dimension style using px
      } else {

        return parseInt(this.el_['offset' + Lib.capitalize(widthOrHeight)], 10);

        // ComputedStyle version.
        // Only difference is if the element is hidden it will return
        // the percent value (e.g. '100%'')
        // instead of zero like offsetWidth returns.
        // var val = Lib.getComputedStyleValue(this.el_, widthOrHeight);
        // var pxIndex = val.indexOf('px');

        // if (pxIndex !== -1) {
        //   return val.slice(0, pxIndex);
        // } else {
        //   return val;
        // }
      }
    }
  }, {
    key: 'emitTapEvents',

    /**
     * Emit 'tap' events when touch events are supported
     *
     * This is used to support toggling the controls through a tap on the video.
     *
     * We're requiring them to be enabled because otherwise every component would
     * have this extra overhead unnecessarily, on mobile devices where extra
     * overhead is especially bad.
     * @private
     */
    value: function emitTapEvents() {
      // Track the start time so we can determine how long the touch lasted
      var touchStart = 0;
      var firstTouch = null;

      // Maximum movement allowed during a touch event to still be considered a tap
      // Other popular libs use anywhere from 2 (hammer.js) to 15, so 10 seems like a nice, round number.
      var tapMovementThreshold = 10;

      // The maximum length a touch can be while still being considered a tap
      var touchTimeThreshold = 200;

      var couldBeTap = undefined;
      this.on('touchstart', function (event) {
        // If more than one finger, don't consider treating this as a click
        if (event.touches.length === 1) {
          firstTouch = Lib.obj.copy(event.touches[0]);
          // Record start time so we can detect a tap vs. "touch and hold"
          touchStart = new Date().getTime();
          // Reset couldBeTap tracking
          couldBeTap = true;
        }
      });

      this.on('touchmove', function (event) {
        // If more than one finger, don't consider treating this as a click
        if (event.touches.length > 1) {
          couldBeTap = false;
        } else if (firstTouch) {
          // Some devices will throw touchmoves for all but the slightest of taps.
          // So, if we moved only a small distance, this could still be a tap
          var xdiff = event.touches[0].pageX - firstTouch.pageX;
          var ydiff = event.touches[0].pageY - firstTouch.pageY;
          var touchDistance = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
          if (touchDistance > tapMovementThreshold) {
            couldBeTap = false;
          }
        }
      });

      var noTap = function noTap() {
        couldBeTap = false;
      };
      // TODO: Listen to the original target. http://youtu.be/DujfpXOKUp8?t=13m8s
      this.on('touchleave', noTap);
      this.on('touchcancel', noTap);

      // When the touch ends, measure how long it took and trigger the appropriate
      // event
      this.on('touchend', function (event) {
        firstTouch = null;
        // Proceed only if the touchmove/leave/cancel event didn't happen
        if (couldBeTap === true) {
          // Measure how long the touch lasted
          var touchTime = new Date().getTime() - touchStart;
          // Make sure the touch was less than the threshold to be considered a tap
          if (touchTime < touchTimeThreshold) {
            event.preventDefault(); // Don't let browser turn this into a click
            this.trigger('tap');
            // It may be good to copy the touchend event object and change the
            // type to tap, if the other event properties aren't exact after
            // Lib.fixEvent runs (e.g. event.target)
          }
        }
      });
    }
  }, {
    key: 'enableTouchActivity',

    /**
     * Report user touch activity when touch events occur
     *
     * User activity is used to determine when controls should show/hide. It's
     * relatively simple when it comes to mouse events, because any mouse event
     * should show the controls. So we capture mouse events that bubble up to the
     * player and report activity when that happens.
     *
     * With touch events it isn't as easy. We can't rely on touch events at the
     * player level, because a tap (touchstart + touchend) on the video itself on
     * mobile devices is meant to turn controls off (and on). User activity is
     * checked asynchronously, so what could happen is a tap event on the video
     * turns the controls off, then the touchend event bubbles up to the player,
     * which if it reported user activity, would turn the controls right back on.
     * (We also don't want to completely block touch events from bubbling up)
     *
     * Also a touchmove, touch+hold, and anything other than a tap is not supposed
     * to turn the controls back on on a mobile device.
     *
     * Here we're setting the default component behavior to report user activity
     * whenever touch events happen, and this can be turned off by components that
     * want touch events to act differently.
     */
    value: function enableTouchActivity() {
      // Don't continue if the root player doesn't support reporting user activity
      if (!this.player().reportUserActivity) {
        return;
      }

      // listener for reporting that the user is active
      var report = Lib.bind(this.player(), this.player().reportUserActivity);

      var touchHolding = undefined;
      this.on('touchstart', function () {
        report();
        // For as long as the they are touching the device or have their mouse down,
        // we consider them active even if they're not moving their finger or mouse.
        // So we want to continue to update that they are active
        this.clearInterval(touchHolding);
        // report at the same interval as activityCheck
        touchHolding = this.setInterval(report, 250);
      });

      var touchEnd = function touchEnd(event) {
        report();
        // stop the interval that maintains activity if the touch is holding
        this.clearInterval(touchHolding);
      };

      this.on('touchmove', report);
      this.on('touchend', touchEnd);
      this.on('touchcancel', touchEnd);
    }
  }, {
    key: 'setTimeout',

    /**
     * Creates timeout and sets up disposal automatically.
     * @param {Function} fn The function to run after the timeout.
     * @param {Number} timeout Number of ms to delay before executing specified function.
     * @return {Number} Returns the timeout ID
     */
    value: (function (_setTimeout) {
      function setTimeout(_x, _x2) {
        return _setTimeout.apply(this, arguments);
      }

      setTimeout.toString = function () {
        return _setTimeout.toString();
      };

      return setTimeout;
    })(function (fn, timeout) {
      fn = Lib.bind(this, fn);

      // window.setTimeout would be preferable here, but due to some bizarre issue with Sinon and/or Phantomjs, we can't.
      var timeoutId = setTimeout(fn, timeout);

      var disposeFn = function disposeFn() {
        this.clearTimeout(timeoutId);
      };

      disposeFn.guid = 'vjs-timeout-' + timeoutId;

      this.on('dispose', disposeFn);

      return timeoutId;
    })
  }, {
    key: 'clearTimeout',

    /**
     * Clears a timeout and removes the associated dispose listener
     * @param {Number} timeoutId The id of the timeout to clear
     * @return {Number} Returns the timeout ID
     */
    value: (function (_clearTimeout) {
      function clearTimeout(_x3) {
        return _clearTimeout.apply(this, arguments);
      }

      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };

      return clearTimeout;
    })(function (timeoutId) {
      clearTimeout(timeoutId);

      var disposeFn = function disposeFn() {};
      disposeFn.guid = 'vjs-timeout-' + timeoutId;

      this.off('dispose', disposeFn);

      return timeoutId;
    })
  }, {
    key: 'setInterval',

    /**
     * Creates an interval and sets up disposal automatically.
     * @param {Function} fn The function to run every N seconds.
     * @param {Number} interval Number of ms to delay before executing specified function.
     * @return {Number} Returns the interval ID
     */
    value: (function (_setInterval) {
      function setInterval(_x4, _x5) {
        return _setInterval.apply(this, arguments);
      }

      setInterval.toString = function () {
        return _setInterval.toString();
      };

      return setInterval;
    })(function (fn, interval) {
      fn = Lib.bind(this, fn);

      var intervalId = setInterval(fn, interval);

      var disposeFn = function disposeFn() {
        this.clearInterval(intervalId);
      };

      disposeFn.guid = 'vjs-interval-' + intervalId;

      this.on('dispose', disposeFn);

      return intervalId;
    })
  }, {
    key: 'clearInterval',

    /**
     * Clears an interval and removes the associated dispose listener
     * @param {Number} intervalId The id of the interval to clear
     * @return {Number} Returns the interval ID
     */
    value: (function (_clearInterval) {
      function clearInterval(_x6) {
        return _clearInterval.apply(this, arguments);
      }

      clearInterval.toString = function () {
        return _clearInterval.toString();
      };

      return clearInterval;
    })(function (intervalId) {
      clearInterval(intervalId);

      var disposeFn = function disposeFn() {};
      disposeFn.guid = 'vjs-interval-' + intervalId;

      this.off('dispose', disposeFn);

      return intervalId;
    })
  }], [{
    key: 'registerComponent',
    value: function registerComponent(name, comp) {
      if (!Component.components_) {
        Component.components_ = {};
      }

      Component.components_[name] = comp;
      return comp;
    }
  }, {
    key: 'getComponent',
    value: function getComponent(name) {
      if (Component.components_ && Component.components_[name]) {
        return Component.components_[name];
      }

      if (_window2['default'] && _window2['default'].videojs && _window2['default'].videojs[name]) {
        Lib.log.warn('The ' + name + ' component was added to the videojs object when it should be registered using videojs.registerComponent(name, component)');
        return _window2['default'].videojs[name];
      }
    }
  }, {
    key: 'extend',
    value: function extend(props) {
      props = props || {};
      // Set up the constructor using the supplied init method
      // or using the init of the parent object
      // Make sure to check the unobfuscated version for external libs
      var init = props.init || props.init || this.prototype.init || this.prototype.init || function () {};
      // In Resig's simple class inheritance (previously used) the constructor
      //  is a function that calls `this.init.apply(arguments)`
      // However that would prevent us from using `ParentObject.call(this);`
      //  in a Child constructor because the `this` in `this.init`
      //  would still refer to the Child and cause an infinite loop.
      // We would instead have to do
      //    `ParentObject.prototype.init.apply(this, arguments);`
      //  Bleh. We're not creating a _super() function, so it's good to keep
      //  the parent constructor reference simple.
      var subObj = function subObj() {
        init.apply(this, arguments);
      };

      // Inherit from this object's prototype
      subObj.prototype = Lib.obj.create(this.prototype);
      // Reset the constructor property for subObj otherwise
      // instances of subObj would have the constructor of the parent Object
      subObj.prototype.constructor = subObj;

      // Make the class extendable
      subObj.extend = Component.extend;
      // Make a function for creating instances
      // subObj.create = CoreObject.create;

      // Extend subObj's prototype with functions and other properties from props
      for (var name in props) {
        if (props.hasOwnProperty(name)) {
          subObj.prototype[name] = props[name];
        }
      }

      return subObj;
    }
  }]);

  return Component;
})();

Component.registerComponent('Component', Component);
exports['default'] = Component;
module.exports = exports['default'];

},{"./events.js":43,"./lib.js":46,"./util.js":70,"global/window":2}],8:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('../component.js');

var _Component3 = _interopRequireDefault(_Component2);

var _import = _dereq_('../lib.js');

var Lib = _interopRequireWildcard(_import);

// Required children

var _PlayToggle = _dereq_('./play-toggle.js');

var _PlayToggle2 = _interopRequireDefault(_PlayToggle);

var _CurrentTimeDisplay = _dereq_('./time-controls/current-time-display.js');

var _CurrentTimeDisplay2 = _interopRequireDefault(_CurrentTimeDisplay);

var _DurationDisplay = _dereq_('./time-controls/duration-display.js');

var _DurationDisplay2 = _interopRequireDefault(_DurationDisplay);

var _TimeDivider = _dereq_('./time-controls/time-divider.js');

var _TimeDivider2 = _interopRequireDefault(_TimeDivider);

var _RemainingTimeDisplay = _dereq_('./time-controls/remaining-time-display.js');

var _RemainingTimeDisplay2 = _interopRequireDefault(_RemainingTimeDisplay);

var _LiveDisplay = _dereq_('./live-display.js');

var _LiveDisplay2 = _interopRequireDefault(_LiveDisplay);

var _ProgressControl = _dereq_('./progress-control/progress-control.js');

var _ProgressControl2 = _interopRequireDefault(_ProgressControl);

var _FullscreenToggle = _dereq_('./fullscreen-toggle.js');

var _FullscreenToggle2 = _interopRequireDefault(_FullscreenToggle);

var _VolumeControl = _dereq_('./volume-control/volume-control.js');

var _VolumeControl2 = _interopRequireDefault(_VolumeControl);

var _VolumeMenuButton = _dereq_('./volume-menu-button.js');

var _VolumeMenuButton2 = _interopRequireDefault(_VolumeMenuButton);

var _MuteToggle = _dereq_('./mute-toggle.js');

var _MuteToggle2 = _interopRequireDefault(_MuteToggle);

var _ChaptersButton = _dereq_('./text-track-controls/chapters-button.js');

var _ChaptersButton2 = _interopRequireDefault(_ChaptersButton);

var _SubtitlesButton = _dereq_('./text-track-controls/subtitles-button.js');

var _SubtitlesButton2 = _interopRequireDefault(_SubtitlesButton);

var _CaptionsButton = _dereq_('./text-track-controls/captions-button.js');

var _CaptionsButton2 = _interopRequireDefault(_CaptionsButton);

var _PlaybackRateMenuButton = _dereq_('./playback-rate-menu/playback-rate-menu-button.js');

var _PlaybackRateMenuButton2 = _interopRequireDefault(_PlaybackRateMenuButton);

var _CustomControlSpacer = _dereq_('./spacer-controls/custom-control-spacer.js');

var _CustomControlSpacer2 = _interopRequireDefault(_CustomControlSpacer);

/**
 * Container of main controls
 * @param {Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 * @extends Component
 */

var ControlBar = (function (_Component) {
  function ControlBar() {
    _classCallCheck(this, ControlBar);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(ControlBar, _Component);

  _createClass(ControlBar, [{
    key: 'createEl',
    value: function createEl() {
      return Lib.createEl('div', {
        className: 'vjs-control-bar'
      });
    }
  }]);

  return ControlBar;
})(_Component3['default']);

ControlBar.prototype.options_ = {
  loadEvent: 'play',
  children: ['playToggle', 'currentTimeDisplay', 'timeDivider', 'durationDisplay', 'progressControl', 'liveDisplay', 'remainingTimeDisplay', 'customControlSpacer', 'playbackRateMenuButton', 'muteToggle', 'volumeControl', 'chaptersButton', 'subtitlesButton', 'captionsButton', 'volumeMenuButton', 'fullscreenToggle']
};

_Component3['default'].registerComponent('ControlBar', ControlBar);
exports['default'] = ControlBar;
module.exports = exports['default'];

},{"../component.js":7,"../lib.js":46,"./fullscreen-toggle.js":9,"./live-display.js":10,"./mute-toggle.js":11,"./play-toggle.js":12,"./playback-rate-menu/playback-rate-menu-button.js":13,"./progress-control/progress-control.js":17,"./spacer-controls/custom-control-spacer.js":20,"./text-track-controls/captions-button.js":23,"./text-track-controls/chapters-button.js":24,"./text-track-controls/subtitles-button.js":27,"./time-controls/current-time-display.js":30,"./time-controls/duration-display.js":31,"./time-controls/remaining-time-display.js":32,"./time-controls/time-divider.js":33,"./volume-control/volume-control.js":35,"./volume-menu-button.js":38}],9:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Button2 = _dereq_('../button');

var _Button3 = _interopRequireDefault(_Button2);

/**
 * Toggle fullscreen video
 * @param {Player|Object} player
 * @param {Object=} options
 * @class
 * @extends vjs.Button
 */

var FullscreenToggle = (function (_Button) {
  function FullscreenToggle() {
    _classCallCheck(this, FullscreenToggle);

    if (_Button != null) {
      _Button.apply(this, arguments);
    }
  }

  _inherits(FullscreenToggle, _Button);

  _createClass(FullscreenToggle, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-fullscreen-control ' + _get(Object.getPrototypeOf(FullscreenToggle.prototype), 'buildCSSClass', this).call(this);
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      if (!this.player_.isFullscreen()) {
        this.player_.requestFullscreen();
        this.controlText_.innerHTML = this.localize('Non-Fullscreen');
      } else {
        this.player_.exitFullscreen();
        this.controlText_.innerHTML = this.localize('Fullscreen');
      }
    }
  }]);

  return FullscreenToggle;
})(_Button3['default']);

FullscreenToggle.prototype.buttonText = 'Fullscreen';

_Button3['default'].registerComponent('FullscreenToggle', FullscreenToggle);
exports['default'] = FullscreenToggle;
module.exports = exports['default'];

},{"../button":6}],10:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('../component');

var _Component3 = _interopRequireDefault(_Component2);

var _import = _dereq_('../lib');

var Lib = _interopRequireWildcard(_import);

/**
 * Displays the live indicator
 * TODO - Future make it click to snap to live
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var LiveDisplay = (function (_Component) {
  function LiveDisplay() {
    _classCallCheck(this, LiveDisplay);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(LiveDisplay, _Component);

  _createClass(LiveDisplay, [{
    key: 'createEl',
    value: function createEl() {
      var el = _get(Object.getPrototypeOf(LiveDisplay.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-live-control vjs-control'
      });

      this.contentEl_ = Lib.createEl('div', {
        className: 'vjs-live-display',
        innerHTML: '<span class="vjs-control-text">' + this.localize('Stream Type') + '</span>' + this.localize('LIVE'),
        'aria-live': 'off'
      });

      el.appendChild(this.contentEl_);

      return el;
    }
  }]);

  return LiveDisplay;
})(_Component3['default']);

_Component3['default'].registerComponent('LiveDisplay', LiveDisplay);
exports['default'] = LiveDisplay;
module.exports = exports['default'];

},{"../component":7,"../lib":46}],11:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Button2 = _dereq_('../button');

var _Button3 = _interopRequireDefault(_Button2);

var _Component = _dereq_('../component');

var _Component2 = _interopRequireDefault(_Component);

var _import = _dereq_('../lib');

var Lib = _interopRequireWildcard(_import);

/**
 * A button component for muting the audio
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var MuteToggle = (function (_Button) {
  function MuteToggle(player, options) {
    _classCallCheck(this, MuteToggle);

    _get(Object.getPrototypeOf(MuteToggle.prototype), 'constructor', this).call(this, player, options);

    this.on(player, 'volumechange', this.update);

    // hide mute toggle if the current tech doesn't support volume control
    if (player.tech && player.tech.featuresVolumeControl === false) {
      this.addClass('vjs-hidden');
    }

    this.on(player, 'loadstart', function () {
      if (player.tech.featuresVolumeControl === false) {
        this.addClass('vjs-hidden');
      } else {
        this.removeClass('vjs-hidden');
      }
    });
  }

  _inherits(MuteToggle, _Button);

  _createClass(MuteToggle, [{
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(MuteToggle.prototype), 'createEl', this).call(this, 'div', {
        className: this.buildCSSClass(),
        innerHTML: '<div><span class="vjs-control-text">' + this.localize('Mute') + '</span></div>'
      });
    }
  }, {
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-mute-control ' + _get(Object.getPrototypeOf(MuteToggle.prototype), 'buildCSSClass', this).call(this);
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.player_.muted(this.player_.muted() ? false : true);
    }
  }, {
    key: 'update',
    value: function update() {
      var vol = this.player_.volume(),
          level = 3;

      if (vol === 0 || this.player_.muted()) {
        level = 0;
      } else if (vol < 0.33) {
        level = 1;
      } else if (vol < 0.67) {
        level = 2;
      }

      // Don't rewrite the button text if the actual text doesn't change.
      // This causes unnecessary and confusing information for screen reader users.
      // This check is needed because this function gets called every time the volume level is changed.
      var toMute = this.player_.muted() ? 'Unmute' : 'Mute';
      var localizedMute = this.localize(toMute);
      if (this.el_.children[0].children[0].innerHTML !== localizedMute) {
        this.el_.children[0].children[0].innerHTML = localizedMute;
      }

      /* TODO improve muted icon classes */
      for (var i = 0; i < 4; i++) {
        Lib.removeClass(this.el_, 'vjs-vol-' + i);
      }
      Lib.addClass(this.el_, 'vjs-vol-' + level);
    }
  }]);

  return MuteToggle;
})(_Button3['default']);

_Component2['default'].registerComponent('MuteToggle', MuteToggle);
exports['default'] = MuteToggle;
module.exports = exports['default'];

},{"../button":6,"../component":7,"../lib":46}],12:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Button2 = _dereq_('../button');

var _Button3 = _interopRequireDefault(_Button2);

var _import = _dereq_('../lib');

var Lib = _interopRequireWildcard(_import);

/**
 * Button to toggle between play and pause
 * @param {Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */

var PlayToggle = (function (_Button) {
  function PlayToggle(player, options) {
    _classCallCheck(this, PlayToggle);

    _get(Object.getPrototypeOf(PlayToggle.prototype), 'constructor', this).call(this, player, options);

    this.on(player, 'play', this.handlePlay);
    this.on(player, 'pause', this.handlePause);
  }

  _inherits(PlayToggle, _Button);

  _createClass(PlayToggle, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-play-control ' + _get(Object.getPrototypeOf(PlayToggle.prototype), 'buildCSSClass', this).call(this);
    }
  }, {
    key: 'handleClick',

    // handleClick - Toggle between play and pause
    value: function handleClick() {
      if (this.player_.paused()) {
        this.player_.play();
      } else {
        this.player_.pause();
      }
    }
  }, {
    key: 'handlePlay',

    // handlePlay - Add the vjs-playing class to the element so it can change appearance
    value: function handlePlay() {
      this.removeClass('vjs-paused');
      this.addClass('vjs-playing');
      this.el_.children[0].children[0].innerHTML = this.localize('Pause'); // change the button text to "Pause"
    }
  }, {
    key: 'handlePause',

    // handlePause - Add the vjs-paused class to the element so it can change appearance
    value: function handlePause() {
      this.removeClass('vjs-playing');
      this.addClass('vjs-paused');
      this.el_.children[0].children[0].innerHTML = this.localize('Play'); // change the button text to "Play"
    }
  }]);

  return PlayToggle;
})(_Button3['default']);

PlayToggle.prototype.buttonText = 'Play';

_Button3['default'].registerComponent('PlayToggle', PlayToggle);
exports['default'] = PlayToggle;
module.exports = exports['default'];

},{"../button":6,"../lib":46}],13:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _MenuButton2 = _dereq_('../../menu/menu-button.js');

var _MenuButton3 = _interopRequireDefault(_MenuButton2);

var _Menu = _dereq_('../../menu/menu.js');

var _Menu2 = _interopRequireDefault(_Menu);

var _PlaybackRateMenuItem = _dereq_('./playback-rate-menu-item.js');

var _PlaybackRateMenuItem2 = _interopRequireDefault(_PlaybackRateMenuItem);

var _import = _dereq_('../../lib.js');

var Lib = _interopRequireWildcard(_import);

/**
 * The component for controlling the playback rate
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var PlaybackRateMenuButton = (function (_MenuButton) {
  function PlaybackRateMenuButton(player, options) {
    _classCallCheck(this, PlaybackRateMenuButton);

    _get(Object.getPrototypeOf(PlaybackRateMenuButton.prototype), 'constructor', this).call(this, player, options);

    this.updateVisibility();
    this.updateLabel();

    this.on(player, 'loadstart', this.updateVisibility);
    this.on(player, 'ratechange', this.updateLabel);
  }

  _inherits(PlaybackRateMenuButton, _MenuButton);

  _createClass(PlaybackRateMenuButton, [{
    key: 'createEl',
    value: function createEl() {
      var el = _get(Object.getPrototypeOf(PlaybackRateMenuButton.prototype), 'createEl', this).call(this);

      this.labelEl_ = Lib.createEl('div', {
        className: 'vjs-playback-rate-value',
        innerHTML: 1
      });

      el.appendChild(this.labelEl_);

      return el;
    }
  }, {
    key: 'createMenu',

    // Menu creation
    value: function createMenu() {
      var menu = new _Menu2['default'](this.player());
      var rates = this.player().options().playbackRates;

      if (rates) {
        for (var i = rates.length - 1; i >= 0; i--) {
          menu.addChild(new _PlaybackRateMenuItem2['default'](this.player(), { rate: rates[i] + 'x' }));
        }
      }

      return menu;
    }
  }, {
    key: 'updateARIAAttributes',
    value: function updateARIAAttributes() {
      // Current playback rate
      this.el().setAttribute('aria-valuenow', this.player().playbackRate());
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      // select next rate option
      var currentRate = this.player().playbackRate();
      var rates = this.player().options().playbackRates;
      // this will select first one if the last one currently selected
      var newRate = rates[0];
      for (var i = 0; i < rates.length; i++) {
        if (rates[i] > currentRate) {
          newRate = rates[i];
          break;
        }
      }
      this.player().playbackRate(newRate);
    }
  }, {
    key: 'playbackRateSupported',
    value: function playbackRateSupported() {
      return this.player().tech && this.player().tech.featuresPlaybackRate && this.player().options().playbackRates && this.player().options().playbackRates.length > 0;
    }
  }, {
    key: 'updateVisibility',

    /**
     * Hide playback rate controls when they're no playback rate options to select
     */
    value: function updateVisibility() {
      if (this.playbackRateSupported()) {
        this.removeClass('vjs-hidden');
      } else {
        this.addClass('vjs-hidden');
      }
    }
  }, {
    key: 'updateLabel',

    /**
     * Update button label when rate changed
     */
    value: function updateLabel() {
      if (this.playbackRateSupported()) {
        this.labelEl_.innerHTML = this.player().playbackRate() + 'x';
      }
    }
  }]);

  return PlaybackRateMenuButton;
})(_MenuButton3['default']);

PlaybackRateMenuButton.prototype.buttonText = 'Playback Rate';
PlaybackRateMenuButton.prototype.className = 'vjs-playback-rate';

_MenuButton3['default'].registerComponent('PlaybackRateMenuButton', PlaybackRateMenuButton);
exports['default'] = PlaybackRateMenuButton;
module.exports = exports['default'];

},{"../../lib.js":46,"../../menu/menu-button.js":49,"../../menu/menu.js":51,"./playback-rate-menu-item.js":14}],14:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _MenuItem2 = _dereq_('../../menu/menu-item.js');

var _MenuItem3 = _interopRequireDefault(_MenuItem2);

/**
 * The specific menu item type for selecting a playback rate
 *
 * @constructor
 */

var PlaybackRateMenuItem = (function (_MenuItem) {
  function PlaybackRateMenuItem(player, options) {
    _classCallCheck(this, PlaybackRateMenuItem);

    var label = options.rate;
    var rate = parseFloat(label, 10);

    // Modify options for parent MenuItem class's init.
    options.label = label;
    options.selected = rate === 1;
    _get(Object.getPrototypeOf(PlaybackRateMenuItem.prototype), 'constructor', this).call(this, player, options);

    this.label = label;
    this.rate = rate;

    this.on(player, 'ratechange', this.update);
  }

  _inherits(PlaybackRateMenuItem, _MenuItem);

  _createClass(PlaybackRateMenuItem, [{
    key: 'handleClick',
    value: function handleClick() {
      _get(Object.getPrototypeOf(PlaybackRateMenuItem.prototype), 'handleClick', this).call(this);
      this.player().playbackRate(this.rate);
    }
  }, {
    key: 'update',
    value: function update() {
      this.selected(this.player().playbackRate() == this.rate);
    }
  }]);

  return PlaybackRateMenuItem;
})(_MenuItem3['default']);

PlaybackRateMenuItem.prototype.contentElType = 'button';

_MenuItem3['default'].registerComponent('PlaybackRateMenuItem', PlaybackRateMenuItem);
exports['default'] = PlaybackRateMenuItem;
module.exports = exports['default'];

},{"../../menu/menu-item.js":50}],15:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireDefault(_Component2);

var _import = _dereq_('../../lib.js');

var Lib = _interopRequireWildcard(_import);

/**
 * Shows load progress
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var LoadProgressBar = (function (_Component) {
  function LoadProgressBar(player, options) {
    _classCallCheck(this, LoadProgressBar);

    _get(Object.getPrototypeOf(LoadProgressBar.prototype), 'constructor', this).call(this, player, options);
    this.on(player, 'progress', this.update);
  }

  _inherits(LoadProgressBar, _Component);

  _createClass(LoadProgressBar, [{
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(LoadProgressBar.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-load-progress',
        innerHTML: '<span class="vjs-control-text"><span>' + this.localize('Loaded') + '</span>: 0%</span>'
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var buffered = this.player_.buffered();
      var duration = this.player_.duration();
      var bufferedEnd = this.player_.bufferedEnd();
      var children = this.el_.children;

      // get the percent width of a time compared to the total end
      var percentify = function percentify(time, end) {
        var percent = time / end || 0; // no NaN
        return percent * 100 + '%';
      };

      // update the width of the progress bar
      this.el_.style.width = percentify(bufferedEnd, duration);

      // add child elements to represent the individual buffered time ranges
      for (var i = 0; i < buffered.length; i++) {
        var start = buffered.start(i);
        var end = buffered.end(i);
        var part = children[i];

        if (!part) {
          part = this.el_.appendChild(Lib.createEl());
        }

        // set the percent based on the width of the progress bar (bufferedEnd)
        part.style.left = percentify(start, bufferedEnd);
        part.style.width = percentify(end - start, bufferedEnd);
      }

      // remove unused buffered range elements
      for (var i = children.length; i > buffered.length; i--) {
        this.el_.removeChild(children[i - 1]);
      }
    }
  }]);

  return LoadProgressBar;
})(_Component3['default']);

_Component3['default'].registerComponent('LoadProgressBar', LoadProgressBar);
exports['default'] = LoadProgressBar;
module.exports = exports['default'];

},{"../../component.js":7,"../../lib.js":46}],16:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireDefault(_Component2);

/**
 * Shows play progress
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var PlayProgressBar = (function (_Component) {
  function PlayProgressBar() {
    _classCallCheck(this, PlayProgressBar);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(PlayProgressBar, _Component);

  _createClass(PlayProgressBar, [{
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(PlayProgressBar.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-play-progress',
        innerHTML: '<span class="vjs-control-text"><span>' + this.localize('Progress') + '</span>: 0%</span>'
      });
    }
  }]);

  return PlayProgressBar;
})(_Component3['default']);

_Component3['default'].registerComponent('PlayProgressBar', PlayProgressBar);
exports['default'] = PlayProgressBar;
module.exports = exports['default'];

},{"../../component.js":7}],17:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireDefault(_Component2);

var _SeekBar = _dereq_('./seek-bar.js');

var _SeekBar2 = _interopRequireDefault(_SeekBar);

/**
 * The Progress Control component contains the seek bar, load progress,
 * and play progress
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var ProgressControl = (function (_Component) {
  function ProgressControl() {
    _classCallCheck(this, ProgressControl);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(ProgressControl, _Component);

  _createClass(ProgressControl, [{
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(ProgressControl.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-progress-control vjs-control'
      });
    }
  }]);

  return ProgressControl;
})(_Component3['default']);

ProgressControl.prototype.options_ = {
  children: {
    seekBar: {}
  }
};

_Component3['default'].registerComponent('ProgressControl', ProgressControl);
exports['default'] = ProgressControl;
module.exports = exports['default'];

},{"../../component.js":7,"./seek-bar.js":18}],18:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Slider2 = _dereq_('../../slider/slider.js');

var _Slider3 = _interopRequireDefault(_Slider2);

var _LoadProgressBar = _dereq_('./load-progress-bar.js');

var _LoadProgressBar2 = _interopRequireDefault(_LoadProgressBar);

var _PlayProgressBar = _dereq_('./play-progress-bar.js');

var _PlayProgressBar2 = _interopRequireDefault(_PlayProgressBar);

var _SeekHandle = _dereq_('./seek-handle.js');

var _SeekHandle2 = _interopRequireDefault(_SeekHandle);

var _import = _dereq_('../../lib.js');

var Lib = _interopRequireWildcard(_import);

/**
 * Seek Bar and holder for the progress bars
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var SeekBar = (function (_Slider) {
  function SeekBar(player, options) {
    _classCallCheck(this, SeekBar);

    _get(Object.getPrototypeOf(SeekBar.prototype), 'constructor', this).call(this, player, options);
    this.on(player, 'timeupdate', this.updateARIAAttributes);
    player.ready(Lib.bind(this, this.updateARIAAttributes));
  }

  _inherits(SeekBar, _Slider);

  _createClass(SeekBar, [{
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(SeekBar.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-progress-holder',
        'aria-label': 'video progress bar'
      });
    }
  }, {
    key: 'updateARIAAttributes',
    value: function updateARIAAttributes() {
      // Allows for smooth scrubbing, when player can't keep up.
      var time = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
      this.el_.setAttribute('aria-valuenow', Lib.round(this.getPercent() * 100, 2)); // machine readable value of progress bar (percentage complete)
      this.el_.setAttribute('aria-valuetext', Lib.formatTime(time, this.player_.duration())); // human readable value of progress bar (time complete)
    }
  }, {
    key: 'getPercent',
    value: function getPercent() {
      return this.player_.currentTime() / this.player_.duration();
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      _get(Object.getPrototypeOf(SeekBar.prototype), 'handleMouseDown', this).call(this, event);

      this.player_.scrubbing(true);

      this.videoWasPlaying = !this.player_.paused();
      this.player_.pause();
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(event) {
      var newTime = this.calculateDistance(event) * this.player_.duration();

      // Don't let video end while scrubbing.
      if (newTime == this.player_.duration()) {
        newTime = newTime - 0.1;
      }

      // Set new time (tell player to seek to new time)
      this.player_.currentTime(newTime);
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(event) {
      _get(Object.getPrototypeOf(SeekBar.prototype), 'handleMouseUp', this).call(this, event);

      this.player_.scrubbing(false);
      if (this.videoWasPlaying) {
        this.player_.play();
      }
    }
  }, {
    key: 'stepForward',
    value: function stepForward() {
      this.player_.currentTime(this.player_.currentTime() + 5); // more quickly fast forward for keyboard-only users
    }
  }, {
    key: 'stepBack',
    value: function stepBack() {
      this.player_.currentTime(this.player_.currentTime() - 5); // more quickly rewind for keyboard-only users
    }
  }]);

  return SeekBar;
})(_Slider3['default']);

SeekBar.prototype.options_ = {
  children: {
    loadProgressBar: {},
    playProgressBar: {},
    seekHandle: {}
  },
  barName: 'playProgressBar',
  handleName: 'seekHandle'
};

SeekBar.prototype.playerEvent = 'timeupdate';

_Slider3['default'].registerComponent('SeekBar', SeekBar);
exports['default'] = SeekBar;
module.exports = exports['default'];

},{"../../lib.js":46,"../../slider/slider.js":58,"./load-progress-bar.js":15,"./play-progress-bar.js":16,"./seek-handle.js":19}],19:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _SliderHandle2 = _dereq_('../../slider/slider-handle.js');

var _SliderHandle3 = _interopRequireDefault(_SliderHandle2);

var _import = _dereq_('../../lib.js');

var Lib = _interopRequireWildcard(_import);

/**
 * The Seek Handle shows the current position of the playhead during playback,
 * and can be dragged to adjust the playhead.
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var SeekHandle = (function (_SliderHandle) {
  function SeekHandle(player, options) {
    _classCallCheck(this, SeekHandle);

    _get(Object.getPrototypeOf(SeekHandle.prototype), 'constructor', this).call(this, player, options);
    this.on(player, 'timeupdate', this.updateContent);
  }

  _inherits(SeekHandle, _SliderHandle);

  _createClass(SeekHandle, [{
    key: 'createEl',

    /** @inheritDoc */
    value: function createEl() {
      return _get(Object.getPrototypeOf(SeekHandle.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-seek-handle',
        'aria-live': 'off'
      });
    }
  }, {
    key: 'updateContent',
    value: function updateContent() {
      var time = this.player_.scrubbing ? this.player_.getCache().currentTime : this.player_.currentTime();
      this.el_.innerHTML = '<span class="vjs-control-text">' + Lib.formatTime(time, this.player_.duration()) + '</span>';
    }
  }]);

  return SeekHandle;
})(_SliderHandle3['default']);

/**
 * The default value for the handle content, which may be read by screen readers
 *
 * @type {String}
 * @private
 */
SeekHandle.prototype.defaultValue = '00:00';

_SliderHandle3['default'].registerComponent('SeekHandle', SeekHandle);
exports['default'] = SeekHandle;
module.exports = exports['default'];

},{"../../lib.js":46,"../../slider/slider-handle.js":57}],20:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Spacer2 = _dereq_('./spacer.js');

var _Spacer3 = _interopRequireDefault(_Spacer2);

/**
 * Spacer specifically meant to be used as an insertion point for new plugins, etc.
 *
 * @param {Player|Object} player
 * @param {Obect=} options
 */

var CustomControlSpacer = (function (_Spacer) {
  function CustomControlSpacer() {
    _classCallCheck(this, CustomControlSpacer);

    if (_Spacer != null) {
      _Spacer.apply(this, arguments);
    }
  }

  _inherits(CustomControlSpacer, _Spacer);

  _createClass(CustomControlSpacer, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-custom-control-spacer ' + _get(Object.getPrototypeOf(CustomControlSpacer.prototype), 'buildCSSClass', this).call(this);
    }
  }, {
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(CustomControlSpacer.prototype), 'createEl', this).call(this, {
        className: this.buildCSSClass()
      });
    }
  }]);

  return CustomControlSpacer;
})(_Spacer3['default']);

_Spacer3['default'].registerComponent('CustomControlSpacer', CustomControlSpacer);

exports['default'] = CustomControlSpacer;
module.exports = exports['default'];

},{"./spacer.js":21}],21:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireDefault(_Component2);

/**
 * Just an empty spacer element that can be used as an append point for plugins, etc.
 * Also can be used to create space between elements when necessary.
 *
 * @param {Player|Object} player
 * @param {Object=} options
 */

var Spacer = (function (_Component) {
  function Spacer() {
    _classCallCheck(this, Spacer);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(Spacer, _Component);

  _createClass(Spacer, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-spacer ' + _get(Object.getPrototypeOf(Spacer.prototype), 'buildCSSClass', this).call(this);
    }
  }, {
    key: 'createEl',
    value: function createEl(props) {
      return _get(Object.getPrototypeOf(Spacer.prototype), 'createEl', this).call(this, 'div', {
        className: this.buildCSSClass()
      });
    }
  }]);

  return Spacer;
})(_Component3['default']);

_Component3['default'].registerComponent('Spacer', Spacer);

exports['default'] = Spacer;
module.exports = exports['default'];

},{"../../component.js":7}],22:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _TextTrackMenuItem2 = _dereq_('./text-track-menu-item.js');

var _TextTrackMenuItem3 = _interopRequireDefault(_TextTrackMenuItem2);

var CaptionSettingsMenuItem = (function (_TextTrackMenuItem) {
  function CaptionSettingsMenuItem(player, options) {
    _classCallCheck(this, CaptionSettingsMenuItem);

    options.track = {
      kind: options.kind,
      player: player,
      label: options.kind + ' settings',
      'default': false,
      mode: 'disabled'
    };

    _get(Object.getPrototypeOf(CaptionSettingsMenuItem.prototype), 'constructor', this).call(this, player, options);
    this.addClass('vjs-texttrack-settings');
  }

  _inherits(CaptionSettingsMenuItem, _TextTrackMenuItem);

  _createClass(CaptionSettingsMenuItem, [{
    key: 'handleClick',
    value: function handleClick() {
      this.player().getChild('textTrackSettings').show();
    }
  }]);

  return CaptionSettingsMenuItem;
})(_TextTrackMenuItem3['default']);

_TextTrackMenuItem3['default'].registerComponent('CaptionSettingsMenuItem', CaptionSettingsMenuItem);
exports['default'] = CaptionSettingsMenuItem;
module.exports = exports['default'];

},{"./text-track-menu-item.js":29}],23:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _TextTrackButton2 = _dereq_('./text-track-button.js');

var _TextTrackButton3 = _interopRequireDefault(_TextTrackButton2);

var _CaptionSettingsMenuItem = _dereq_('./caption-settings-menu-item.js');

var _CaptionSettingsMenuItem2 = _interopRequireDefault(_CaptionSettingsMenuItem);

/**
 * The button component for toggling and selecting captions
 *
 * @constructor
 */

var CaptionsButton = (function (_TextTrackButton) {
  function CaptionsButton(player, options, ready) {
    _classCallCheck(this, CaptionsButton);

    _get(Object.getPrototypeOf(CaptionsButton.prototype), 'constructor', this).call(this, player, options, ready);
    this.el_.setAttribute('aria-label', 'Captions Menu');
  }

  _inherits(CaptionsButton, _TextTrackButton);

  _createClass(CaptionsButton, [{
    key: 'update',
    value: function update() {
      var threshold = 2;
      _get(Object.getPrototypeOf(CaptionsButton.prototype), 'update', this).call(this);

      // if native, then threshold is 1 because no settings button
      if (this.player().tech && this.player().tech.featuresNativeTextTracks) {
        threshold = 1;
      }

      if (this.items && this.items.length > threshold) {
        this.show();
      } else {
        this.hide();
      }
    }
  }, {
    key: 'createItems',
    value: function createItems() {
      var items = [];

      if (!(this.player().tech && this.player().tech.featuresNativeTextTracks)) {
        items.push(new _CaptionSettingsMenuItem2['default'](this.player_, { kind: this.kind_ }));
      }

      return _get(Object.getPrototypeOf(CaptionsButton.prototype), 'createItems', this).call(this, items);
    }
  }]);

  return CaptionsButton;
})(_TextTrackButton3['default']);

CaptionsButton.prototype.kind_ = 'captions';
CaptionsButton.prototype.buttonText = 'Captions';
CaptionsButton.prototype.className = 'vjs-captions-button';

_TextTrackButton3['default'].registerComponent('CaptionsButton', CaptionsButton);
exports['default'] = CaptionsButton;
module.exports = exports['default'];

},{"./caption-settings-menu-item.js":22,"./text-track-button.js":28}],24:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _TextTrackButton2 = _dereq_('./text-track-button.js');

var _TextTrackButton3 = _interopRequireDefault(_TextTrackButton2);

var _TextTrackMenuItem = _dereq_('./text-track-menu-item.js');

var _TextTrackMenuItem2 = _interopRequireDefault(_TextTrackMenuItem);

var _ChaptersTrackMenuItem = _dereq_('./chapters-track-menu-item.js');

var _ChaptersTrackMenuItem2 = _interopRequireDefault(_ChaptersTrackMenuItem);

var _Menu = _dereq_('../../menu/menu.js');

var _Menu2 = _interopRequireDefault(_Menu);

var _import = _dereq_('../../lib.js');

var Lib = _interopRequireWildcard(_import);

var _window = _dereq_('global/window');

var _window2 = _interopRequireDefault(_window);

// Chapters act much differently than other text tracks
// Cues are navigation vs. other tracks of alternative languages
/**
 * The button component for toggling and selecting chapters
 *
 * @constructor
 */

var ChaptersButton = (function (_TextTrackButton) {
  function ChaptersButton(player, options, ready) {
    _classCallCheck(this, ChaptersButton);

    _get(Object.getPrototypeOf(ChaptersButton.prototype), 'constructor', this).call(this, player, options, ready);
    this.el_.setAttribute('aria-label', 'Chapters Menu');
  }

  _inherits(ChaptersButton, _TextTrackButton);

  _createClass(ChaptersButton, [{
    key: 'createItems',

    // Create a menu item for each text track
    value: function createItems() {
      var items = [];

      var tracks = this.player_.textTracks();

      if (!tracks) {
        return items;
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (track.kind === this.kind_) {
          items.push(new _TextTrackMenuItem2['default'](this.player_, {
            track: track
          }));
        }
      }

      return items;
    }
  }, {
    key: 'createMenu',
    value: function createMenu() {
      var tracks = this.player_.textTracks() || [];
      var chaptersTrack = undefined;
      var items = this.items = [];

      for (var i = 0, l = tracks.length; i < l; i++) {
        var track = tracks[i];
        if (track.kind == this.kind_) {
          if (!track.cues) {
            track.mode = 'hidden';
            /* jshint loopfunc:true */
            // TODO see if we can figure out a better way of doing this https://github.com/videojs/video.js/issues/1864
            _window2['default'].setTimeout(Lib.bind(this, function () {
              this.createMenu();
            }), 100);
            /* jshint loopfunc:false */
          } else {
            chaptersTrack = track;
            break;
          }
        }
      }

      var menu = this.menu;
      if (menu === undefined) {
        menu = new _Menu2['default'](this.player_);
        menu.contentEl().appendChild(Lib.createEl('li', {
          className: 'vjs-menu-title',
          innerHTML: Lib.capitalize(this.kind_),
          tabindex: -1
        }));
      }

      if (chaptersTrack) {
        var cues = chaptersTrack.cues,
            cue = undefined;

        for (var i = 0, l = cues.length; i < l; i++) {
          cue = cues[i];

          var mi = new _ChaptersTrackMenuItem2['default'](this.player_, {
            track: chaptersTrack,
            cue: cue
          });

          items.push(mi);

          menu.addChild(mi);
        }
        this.addChild(menu);
      }

      if (this.items.length > 0) {
        this.show();
      }

      return menu;
    }
  }]);

  return ChaptersButton;
})(_TextTrackButton3['default']);

ChaptersButton.prototype.kind_ = 'chapters';
ChaptersButton.prototype.buttonText = 'Chapters';
ChaptersButton.prototype.className = 'vjs-chapters-button';

_TextTrackButton3['default'].registerComponent('ChaptersButton', ChaptersButton);
exports['default'] = ChaptersButton;
module.exports = exports['default'];

},{"../../lib.js":46,"../../menu/menu.js":51,"./chapters-track-menu-item.js":25,"./text-track-button.js":28,"./text-track-menu-item.js":29,"global/window":2}],25:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _MenuItem2 = _dereq_('../../menu/menu-item.js');

var _MenuItem3 = _interopRequireDefault(_MenuItem2);

var _import = _dereq_('../../lib.js');

var Lib = _interopRequireWildcard(_import);

/**
 * @constructor
 */

var ChaptersTrackMenuItem = (function (_MenuItem) {
  function ChaptersTrackMenuItem(player, options) {
    _classCallCheck(this, ChaptersTrackMenuItem);

    var track = options.track;
    var cue = options.cue;
    var currentTime = player.currentTime();

    // Modify options for parent MenuItem class's init.
    options.label = cue.text;
    options.selected = cue.startTime <= currentTime && currentTime < cue.endTime;
    _get(Object.getPrototypeOf(ChaptersTrackMenuItem.prototype), 'constructor', this).call(this, player, options);

    this.track = track;
    this.cue = cue;
    track.addEventListener('cuechange', Lib.bind(this, this.update));
  }

  _inherits(ChaptersTrackMenuItem, _MenuItem);

  _createClass(ChaptersTrackMenuItem, [{
    key: 'handleClick',
    value: function handleClick() {
      _get(Object.getPrototypeOf(ChaptersTrackMenuItem.prototype), 'handleClick', this).call(this);
      this.player_.currentTime(this.cue.startTime);
      this.update(this.cue.startTime);
    }
  }, {
    key: 'update',
    value: function update() {
      var cue = this.cue;
      var currentTime = this.player_.currentTime();

      // vjs.log(currentTime, cue.startTime);
      this.selected(cue.startTime <= currentTime && currentTime < cue.endTime);
    }
  }]);

  return ChaptersTrackMenuItem;
})(_MenuItem3['default']);

_MenuItem3['default'].registerComponent('ChaptersTrackMenuItem', ChaptersTrackMenuItem);
exports['default'] = ChaptersTrackMenuItem;
module.exports = exports['default'];

},{"../../lib.js":46,"../../menu/menu-item.js":50}],26:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _TextTrackMenuItem2 = _dereq_('./text-track-menu-item.js');

var _TextTrackMenuItem3 = _interopRequireDefault(_TextTrackMenuItem2);

/**
 * A special menu item for turning of a specific type of text track
 *
 * @constructor
 */

var OffTextTrackMenuItem = (function (_TextTrackMenuItem) {
  function OffTextTrackMenuItem(player, options) {
    _classCallCheck(this, OffTextTrackMenuItem);

    // Create pseudo track info
    // Requires options['kind']
    options.track = {
      kind: options.kind,
      player: player,
      label: options.kind + ' off',
      'default': false,
      mode: 'disabled'
    };

    _get(Object.getPrototypeOf(OffTextTrackMenuItem.prototype), 'constructor', this).call(this, player, options);
    this.selected(true);
  }

  _inherits(OffTextTrackMenuItem, _TextTrackMenuItem);

  _createClass(OffTextTrackMenuItem, [{
    key: 'handleTracksChange',
    value: function handleTracksChange(event) {
      var tracks = this.player().textTracks();
      var selected = true;

      for (var i = 0, l = tracks.length; i < l; i++) {
        var track = tracks[i];
        if (track.kind === this.track.kind && track.mode === 'showing') {
          selected = false;
          break;
        }
      }

      this.selected(selected);
    }
  }]);

  return OffTextTrackMenuItem;
})(_TextTrackMenuItem3['default']);

_TextTrackMenuItem3['default'].registerComponent('OffTextTrackMenuItem', OffTextTrackMenuItem);
exports['default'] = OffTextTrackMenuItem;
module.exports = exports['default'];

},{"./text-track-menu-item.js":29}],27:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _TextTrackButton2 = _dereq_('./text-track-button.js');

var _TextTrackButton3 = _interopRequireDefault(_TextTrackButton2);

/**
 * The button component for toggling and selecting subtitles
 *
 * @constructor
 */

var SubtitlesButton = (function (_TextTrackButton) {
  function SubtitlesButton(player, options, ready) {
    _classCallCheck(this, SubtitlesButton);

    _get(Object.getPrototypeOf(SubtitlesButton.prototype), 'constructor', this).call(this, player, options, ready);
    this.el_.setAttribute('aria-label', 'Subtitles Menu');
  }

  _inherits(SubtitlesButton, _TextTrackButton);

  return SubtitlesButton;
})(_TextTrackButton3['default']);

SubtitlesButton.prototype.kind_ = 'subtitles';
SubtitlesButton.prototype.buttonText = 'Subtitles';
SubtitlesButton.prototype.className = 'vjs-subtitles-button';

_TextTrackButton3['default'].registerComponent('SubtitlesButton', SubtitlesButton);
exports['default'] = SubtitlesButton;
module.exports = exports['default'];

},{"./text-track-button.js":28}],28:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _MenuButton2 = _dereq_('../../menu/menu-button.js');

var _MenuButton3 = _interopRequireDefault(_MenuButton2);

var _import = _dereq_('../../lib.js');

var Lib = _interopRequireWildcard(_import);

var _TextTrackMenuItem = _dereq_('./text-track-menu-item.js');

var _TextTrackMenuItem2 = _interopRequireDefault(_TextTrackMenuItem);

var _OffTextTrackMenuItem = _dereq_('./off-text-track-menu-item.js');

var _OffTextTrackMenuItem2 = _interopRequireDefault(_OffTextTrackMenuItem);

/**
 * The base class for buttons that toggle specific text track types (e.g. subtitles)
 *
 * @constructor
 */

var TextTrackButton = (function (_MenuButton) {
  function TextTrackButton(player, options) {
    _classCallCheck(this, TextTrackButton);

    _get(Object.getPrototypeOf(TextTrackButton.prototype), 'constructor', this).call(this, player, options);

    var tracks = this.player_.textTracks();

    if (this.items.length <= 1) {
      this.hide();
    }

    if (!tracks) {
      return;
    }

    var updateHandler = Lib.bind(this, this.update);
    tracks.addEventListener('removetrack', updateHandler);
    tracks.addEventListener('addtrack', updateHandler);

    this.player_.on('dispose', function () {
      tracks.removeEventListener('removetrack', updateHandler);
      tracks.removeEventListener('addtrack', updateHandler);
    });
  }

  _inherits(TextTrackButton, _MenuButton);

  _createClass(TextTrackButton, [{
    key: 'createItems',

    // Create a menu item for each text track
    value: function createItems() {
      var items = arguments[0] === undefined ? [] : arguments[0];

      // Add an OFF menu item to turn all tracks off
      items.push(new _OffTextTrackMenuItem2['default'](this.player_, { kind: this.kind_ }));

      var tracks = this.player_.textTracks();

      if (!tracks) {
        return items;
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];

        // only add tracks that are of the appropriate kind and have a label
        if (track.kind === this.kind_) {
          items.push(new _TextTrackMenuItem2['default'](this.player_, {
            track: track
          }));
        }
      }

      return items;
    }
  }]);

  return TextTrackButton;
})(_MenuButton3['default']);

_MenuButton3['default'].registerComponent('TextTrackButton', TextTrackButton);
exports['default'] = TextTrackButton;
module.exports = exports['default'];

},{"../../lib.js":46,"../../menu/menu-button.js":49,"./off-text-track-menu-item.js":26,"./text-track-menu-item.js":29}],29:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _MenuItem2 = _dereq_('../../menu/menu-item.js');

var _MenuItem3 = _interopRequireDefault(_MenuItem2);

var _import = _dereq_('../../lib.js');

var Lib = _interopRequireWildcard(_import);

var _window = _dereq_('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

/**
 * The specific menu item type for selecting a language within a text track kind
 *
 * @constructor
 */

var TextTrackMenuItem = (function (_MenuItem) {
  function TextTrackMenuItem(player, options) {
    var _this = this;

    _classCallCheck(this, TextTrackMenuItem);

    var track = options.track;
    var tracks = player.textTracks();

    // Modify options for parent MenuItem class's init.
    options.label = track.label || track.language || 'Unknown';
    options.selected = track['default'] || track.mode === 'showing';
    _get(Object.getPrototypeOf(TextTrackMenuItem.prototype), 'constructor', this).call(this, player, options);

    this.track = track;

    if (tracks) {
      (function () {
        var changeHandler = Lib.bind(_this, _this.handleTracksChange);

        tracks.addEventListener('change', changeHandler);
        _this.on('dispose', function () {
          tracks.removeEventListener('change', changeHandler);
        });
      })();
    }

    // iOS7 doesn't dispatch change events to TextTrackLists when an
    // associated track's mode changes. Without something like
    // Object.observe() (also not present on iOS7), it's not
    // possible to detect changes to the mode attribute and polyfill
    // the change event. As a poor substitute, we manually dispatch
    // change events whenever the controls modify the mode.
    if (tracks && tracks.onchange === undefined) {
      (function () {
        var event = undefined;

        _this.on(['tap', 'click'], function () {
          if (typeof _window2['default'].Event !== 'object') {
            // Android 2.3 throws an Illegal Constructor error for window.Event
            try {
              event = new _window2['default'].Event('change');
            } catch (err) {}
          }

          if (!event) {
            event = _document2['default'].createEvent('Event');
            event.initEvent('change', true, true);
          }

          tracks.dispatchEvent(event);
        });
      })();
    }
  }

  _inherits(TextTrackMenuItem, _MenuItem);

  _createClass(TextTrackMenuItem, [{
    key: 'handleClick',
    value: function handleClick(event) {
      var kind = this.track.kind;
      var tracks = this.player_.textTracks();

      _get(Object.getPrototypeOf(TextTrackMenuItem.prototype), 'handleClick', this).call(this, event);

      if (!tracks) {
        return;
      }for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];

        if (track.kind !== kind) {
          continue;
        }

        if (track === this.track) {
          track.mode = 'showing';
        } else {
          track.mode = 'disabled';
        }
      }
    }
  }, {
    key: 'handleTracksChange',
    value: function handleTracksChange(event) {
      this.selected(this.track.mode === 'showing');
    }
  }]);

  return TextTrackMenuItem;
})(_MenuItem3['default']);

_MenuItem3['default'].registerComponent('TextTrackMenuItem', TextTrackMenuItem);
exports['default'] = TextTrackMenuItem;
module.exports = exports['default'];

},{"../../lib.js":46,"../../menu/menu-item.js":50,"global/document":1,"global/window":2}],30:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireDefault(_Component2);

var _import = _dereq_('../../lib.js');

var Lib = _interopRequireWildcard(_import);

/**
 * Displays the current time
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var CurrentTimeDisplay = (function (_Component) {
  function CurrentTimeDisplay(player, options) {
    _classCallCheck(this, CurrentTimeDisplay);

    _get(Object.getPrototypeOf(CurrentTimeDisplay.prototype), 'constructor', this).call(this, player, options);

    this.on(player, 'timeupdate', this.updateContent);
  }

  _inherits(CurrentTimeDisplay, _Component);

  _createClass(CurrentTimeDisplay, [{
    key: 'createEl',
    value: function createEl() {
      var el = _get(Object.getPrototypeOf(CurrentTimeDisplay.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-current-time vjs-time-control vjs-control'
      });

      this.contentEl_ = Lib.createEl('div', {
        className: 'vjs-current-time-display',
        innerHTML: '<span class="vjs-control-text">Current Time </span>' + '0:00', // label the current time for screen reader users
        'aria-live': 'off' // tell screen readers not to automatically read the time as it changes
      });

      el.appendChild(this.contentEl_);
      return el;
    }
  }, {
    key: 'updateContent',
    value: function updateContent() {
      // Allows for smooth scrubbing, when player can't keep up.
      var time = this.player_.scrubbing ? this.player_.getCache().currentTime : this.player_.currentTime();
      var localizedText = this.localize('Current Time');
      var formattedTime = Lib.formatTime(time, this.player_.duration());
      this.contentEl_.innerHTML = '<span class="vjs-control-text">' + localizedText + '</span> ' + formattedTime;
    }
  }]);

  return CurrentTimeDisplay;
})(_Component3['default']);

_Component3['default'].registerComponent('CurrentTimeDisplay', CurrentTimeDisplay);
exports['default'] = CurrentTimeDisplay;
module.exports = exports['default'];

},{"../../component.js":7,"../../lib.js":46}],31:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireDefault(_Component2);

var _import = _dereq_('../../lib.js');

var Lib = _interopRequireWildcard(_import);

/**
 * Displays the duration
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var DurationDisplay = (function (_Component) {
  function DurationDisplay(player, options) {
    _classCallCheck(this, DurationDisplay);

    _get(Object.getPrototypeOf(DurationDisplay.prototype), 'constructor', this).call(this, player, options);

    // this might need to be changed to 'durationchange' instead of 'timeupdate' eventually,
    // however the durationchange event fires before this.player_.duration() is set,
    // so the value cannot be written out using this method.
    // Once the order of durationchange and this.player_.duration() being set is figured out,
    // this can be updated.
    this.on(player, 'timeupdate', this.updateContent);
  }

  _inherits(DurationDisplay, _Component);

  _createClass(DurationDisplay, [{
    key: 'createEl',
    value: function createEl() {
      var el = _get(Object.getPrototypeOf(DurationDisplay.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-duration vjs-time-control vjs-control'
      });

      this.contentEl_ = Lib.createEl('div', {
        className: 'vjs-duration-display',
        innerHTML: '<span class="vjs-control-text">' + this.localize('Duration Time') + '</span> 0:00', // label the duration time for screen reader users
        'aria-live': 'off' // tell screen readers not to automatically read the time as it changes
      });

      el.appendChild(this.contentEl_);
      return el;
    }
  }, {
    key: 'updateContent',
    value: function updateContent() {
      var duration = this.player_.duration();
      if (duration) {
        var localizedText = this.localize('Duration Time');
        var formattedTime = Lib.formatTime(duration);
        this.contentEl_.innerHTML = '<span class="vjs-control-text">' + localizedText + '</span> ' + formattedTime; // label the duration time for screen reader users
      }
    }
  }]);

  return DurationDisplay;
})(_Component3['default']);

_Component3['default'].registerComponent('DurationDisplay', DurationDisplay);
exports['default'] = DurationDisplay;
module.exports = exports['default'];

},{"../../component.js":7,"../../lib.js":46}],32:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireDefault(_Component2);

var _import = _dereq_('../../lib');

var Lib = _interopRequireWildcard(_import);

/**
 * Displays the time left in the video
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var RemainingTimeDisplay = (function (_Component) {
  function RemainingTimeDisplay(player, options) {
    _classCallCheck(this, RemainingTimeDisplay);

    _get(Object.getPrototypeOf(RemainingTimeDisplay.prototype), 'constructor', this).call(this, player, options);

    this.on(player, 'timeupdate', this.updateContent);
  }

  _inherits(RemainingTimeDisplay, _Component);

  _createClass(RemainingTimeDisplay, [{
    key: 'createEl',
    value: function createEl() {
      var el = _get(Object.getPrototypeOf(RemainingTimeDisplay.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-remaining-time vjs-time-control vjs-control'
      });

      this.contentEl_ = Lib.createEl('div', {
        className: 'vjs-remaining-time-display',
        innerHTML: '<span class="vjs-control-text">' + this.localize('Remaining Time') + '</span> -0:00', // label the remaining time for screen reader users
        'aria-live': 'off' // tell screen readers not to automatically read the time as it changes
      });

      el.appendChild(this.contentEl_);
      return el;
    }
  }, {
    key: 'updateContent',
    value: function updateContent() {
      if (this.player_.duration()) {
        var localizedText = this.localize('Remaining Time');
        var formattedTime = Lib.formatTime(this.player_.remainingTime());
        this.contentEl_.innerHTML = '<span class="vjs-control-text">' + localizedText + '</span> -' + formattedTime;
      }

      // Allows for smooth scrubbing, when player can't keep up.
      // var time = (this.player_.scrubbing) ? this.player_.getCache().currentTime : this.player_.currentTime();
      // this.contentEl_.innerHTML = vjs.formatTime(time, this.player_.duration());
    }
  }]);

  return RemainingTimeDisplay;
})(_Component3['default']);

_Component3['default'].registerComponent('RemainingTimeDisplay', RemainingTimeDisplay);
exports['default'] = RemainingTimeDisplay;
module.exports = exports['default'];

},{"../../component.js":7,"../../lib":46}],33:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireDefault(_Component2);

/**
 * The separator between the current time and duration
 *
 * Can be hidden if it's not needed in the design.
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var TimeDivider = (function (_Component) {
  function TimeDivider() {
    _classCallCheck(this, TimeDivider);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(TimeDivider, _Component);

  _createClass(TimeDivider, [{
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(TimeDivider.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-time-control vjs-time-divider',
        innerHTML: '<div><span>/</span></div>'
      });
    }
  }]);

  return TimeDivider;
})(_Component3['default']);

_Component3['default'].registerComponent('TimeDivider', TimeDivider);
exports['default'] = TimeDivider;
module.exports = exports['default'];

},{"../../component.js":7}],34:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Slider2 = _dereq_('../../slider/slider.js');

var _Slider3 = _interopRequireDefault(_Slider2);

var _import = _dereq_('../../lib.js');

var Lib = _interopRequireWildcard(_import);

// Required children

var _VolumeHandle = _dereq_('./volume-handle.js');

var _VolumeHandle2 = _interopRequireDefault(_VolumeHandle);

var _VolumeLevel = _dereq_('./volume-level.js');

var _VolumeLevel2 = _interopRequireDefault(_VolumeLevel);

/**
 * The bar that contains the volume level and can be clicked on to adjust the level
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var VolumeBar = (function (_Slider) {
  function VolumeBar(player, options) {
    _classCallCheck(this, VolumeBar);

    _get(Object.getPrototypeOf(VolumeBar.prototype), 'constructor', this).call(this, player, options);
    this.on(player, 'volumechange', this.updateARIAAttributes);
    player.ready(Lib.bind(this, this.updateARIAAttributes));
  }

  _inherits(VolumeBar, _Slider);

  _createClass(VolumeBar, [{
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(VolumeBar.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-volume-bar',
        'aria-label': 'volume level'
      });
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(event) {
      if (this.player_.muted()) {
        this.player_.muted(false);
      }

      this.player_.volume(this.calculateDistance(event));
    }
  }, {
    key: 'getPercent',
    value: function getPercent() {
      if (this.player_.muted()) {
        return 0;
      } else {
        return this.player_.volume();
      }
    }
  }, {
    key: 'stepForward',
    value: function stepForward() {
      this.player_.volume(this.player_.volume() + 0.1);
    }
  }, {
    key: 'stepBack',
    value: function stepBack() {
      this.player_.volume(this.player_.volume() - 0.1);
    }
  }, {
    key: 'updateARIAAttributes',
    value: function updateARIAAttributes() {
      // Current value of volume bar as a percentage
      this.el_.setAttribute('aria-valuenow', Lib.round(this.player_.volume() * 100, 2));
      this.el_.setAttribute('aria-valuetext', Lib.round(this.player_.volume() * 100, 2) + '%');
    }
  }]);

  return VolumeBar;
})(_Slider3['default']);

VolumeBar.prototype.options_ = {
  children: {
    volumeLevel: {},
    volumeHandle: {}
  },
  barName: 'volumeLevel',
  handleName: 'volumeHandle'
};

VolumeBar.prototype.playerEvent = 'volumechange';

_Slider3['default'].registerComponent('VolumeBar', VolumeBar);
exports['default'] = VolumeBar;
module.exports = exports['default'];

},{"../../lib.js":46,"../../slider/slider.js":58,"./volume-handle.js":36,"./volume-level.js":37}],35:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireDefault(_Component2);

var _import = _dereq_('../../lib.js');

var Lib = _interopRequireWildcard(_import);

// Required children

var _VolumeBar = _dereq_('./volume-bar.js');

var _VolumeBar2 = _interopRequireDefault(_VolumeBar);

/**
 * The component for controlling the volume level
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var VolumeControl = (function (_Component) {
  function VolumeControl(player, options) {
    _classCallCheck(this, VolumeControl);

    _get(Object.getPrototypeOf(VolumeControl.prototype), 'constructor', this).call(this, player, options);

    // hide volume controls when they're not supported by the current tech
    if (player.tech && player.tech.featuresVolumeControl === false) {
      this.addClass('vjs-hidden');
    }
    this.on(player, 'loadstart', function () {
      if (player.tech.featuresVolumeControl === false) {
        this.addClass('vjs-hidden');
      } else {
        this.removeClass('vjs-hidden');
      }
    });
  }

  _inherits(VolumeControl, _Component);

  _createClass(VolumeControl, [{
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(VolumeControl.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-volume-control vjs-control'
      });
    }
  }]);

  return VolumeControl;
})(_Component3['default']);

VolumeControl.prototype.options_ = {
  children: {
    volumeBar: {}
  }
};

_Component3['default'].registerComponent('VolumeControl', VolumeControl);
exports['default'] = VolumeControl;
module.exports = exports['default'];

},{"../../component.js":7,"../../lib.js":46,"./volume-bar.js":34}],36:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _SliderHandle2 = _dereq_('../../slider/slider-handle.js');

var _SliderHandle3 = _interopRequireDefault(_SliderHandle2);

/**
 * The volume handle can be dragged to adjust the volume level
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var VolumeHandle = (function (_SliderHandle) {
  function VolumeHandle() {
    _classCallCheck(this, VolumeHandle);

    if (_SliderHandle != null) {
      _SliderHandle.apply(this, arguments);
    }
  }

  _inherits(VolumeHandle, _SliderHandle);

  _createClass(VolumeHandle, [{
    key: 'createEl',

    /** @inheritDoc */
    value: function createEl() {
      return _get(Object.getPrototypeOf(VolumeHandle.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-volume-handle'
      });
    }
  }]);

  return VolumeHandle;
})(_SliderHandle3['default']);

VolumeHandle.prototype.defaultValue = '00:00';

_SliderHandle3['default'].registerComponent('VolumeHandle', VolumeHandle);
exports['default'] = VolumeHandle;
module.exports = exports['default'];

},{"../../slider/slider-handle.js":57}],37:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireDefault(_Component2);

/**
 * Shows volume level
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var VolumeLevel = (function (_Component) {
  function VolumeLevel() {
    _classCallCheck(this, VolumeLevel);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(VolumeLevel, _Component);

  _createClass(VolumeLevel, [{
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(VolumeLevel.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-volume-level',
        innerHTML: '<span class="vjs-control-text"></span>'
      });
    }
  }]);

  return VolumeLevel;
})(_Component3['default']);

_Component3['default'].registerComponent('VolumeLevel', VolumeLevel);
exports['default'] = VolumeLevel;
module.exports = exports['default'];

},{"../../component.js":7}],38:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Button = _dereq_('../button.js');

var _Button2 = _interopRequireDefault(_Button);

var _Menu = _dereq_('../menu/menu.js');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuButton2 = _dereq_('../menu/menu-button.js');

var _MenuButton3 = _interopRequireDefault(_MenuButton2);

var _MuteToggle = _dereq_('./mute-toggle.js');

var _MuteToggle2 = _interopRequireDefault(_MuteToggle);

var _import = _dereq_('../lib.js');

var Lib = _interopRequireWildcard(_import);

var _VolumeBar = _dereq_('./volume-control/volume-bar.js');

var _VolumeBar2 = _interopRequireDefault(_VolumeBar);

/**
 * Menu button with a popup for showing the volume slider.
 * @constructor
 */

var VolumeMenuButton = (function (_MenuButton) {
  function VolumeMenuButton(player, options) {
    _classCallCheck(this, VolumeMenuButton);

    _get(Object.getPrototypeOf(VolumeMenuButton.prototype), 'constructor', this).call(this, player, options);

    // Same listeners as MuteToggle
    this.on(player, 'volumechange', this.volumeUpdate);

    // hide mute toggle if the current tech doesn't support volume control
    if (player.tech && player.tech.featuresVolumeControl === false) {
      this.addClass('vjs-hidden');
    }
    this.on(player, 'loadstart', function () {
      if (player.tech.featuresVolumeControl === false) {
        this.addClass('vjs-hidden');
      } else {
        this.removeClass('vjs-hidden');
      }
    });
    this.addClass('vjs-menu-button');
  }

  _inherits(VolumeMenuButton, _MenuButton);

  _createClass(VolumeMenuButton, [{
    key: 'createMenu',
    value: function createMenu() {
      var menu = new _Menu2['default'](this.player_, {
        contentElType: 'div'
      });

      // The volumeBar is vertical by default in the base theme when used with a VolumeMenuButton
      var options = this.options_.volumeBar || {};
      options.vertical = options.vertical || true;

      var vc = new _VolumeBar2['default'](this.player_, options);

      vc.on('focus', function () {
        menu.lockShowing();
      });
      vc.on('blur', function () {
        menu.unlockShowing();
      });
      menu.addChild(vc);
      return menu;
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      _MuteToggle2['default'].prototype.handleClick.call(this);
      _get(Object.getPrototypeOf(VolumeMenuButton.prototype), 'handleClick', this).call(this);
    }
  }, {
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(VolumeMenuButton.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-volume-menu-button vjs-menu-button vjs-control vjs-button',
        innerHTML: '<div><span class="vjs-control-text">' + this.localize('Mute') + '</span></div>'
      });
    }
  }]);

  return VolumeMenuButton;
})(_MenuButton3['default']);

VolumeMenuButton.prototype.volumeUpdate = _MuteToggle2['default'].prototype.update;

_Button2['default'].registerComponent('VolumeMenuButton', VolumeMenuButton);
exports['default'] = VolumeMenuButton;
module.exports = exports['default'];

},{"../button.js":6,"../lib.js":46,"../menu/menu-button.js":49,"../menu/menu.js":51,"./mute-toggle.js":11,"./volume-control/volume-bar.js":34}],39:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = _dereq_('./lib');

var Lib = _interopRequireWildcard(_import);

/**
 * Core Object/Class for objects that use inheritance + constructors
 *
 * To create a class that can be subclassed itself, extend the CoreObject class.
 *
 *     var Animal = CoreObject.extend();
 *     var Horse = Animal.extend();
 *
 * The constructor can be defined through the init property of an object argument.
 *
 *     var Animal = CoreObject.extend({
 *       init: function(name, sound){
 *         this.name = name;
 *       }
 *     });
 *
 * Other methods and properties can be added the same way, or directly to the
 * prototype.
 *
 *    var Animal = CoreObject.extend({
 *       init: function(name){
 *         this.name = name;
 *       },
 *       getName: function(){
 *         return this.name;
 *       },
 *       sound: '...'
 *    });
 *
 *    Animal.prototype.makeSound = function(){
 *      alert(this.sound);
 *    };
 *
 * To create an instance of a class, use the create method.
 *
 *    var fluffy = Animal.create('Fluffy');
 *    fluffy.getName(); // -> Fluffy
 *
 * Methods and properties can be overridden in subclasses.
 *
 *     var Horse = Animal.extend({
 *       sound: 'Neighhhhh!'
 *     });
 *
 *     var horsey = Horse.create('Horsey');
 *     horsey.getName(); // -> Horsey
 *     horsey.makeSound(); // -> Alert: Neighhhhh!
 *
 * @class
 * @constructor
 */
var CoreObject = function CoreObject() {};
// Manually exporting vjs['CoreObject'] here for Closure Compiler
// because of the use of the extend/create class methods
// If we didn't do this, those functions would get flattened to something like
// `a = ...` and `this.prototype` would refer to the global object instead of
// CoreObject

/**
 * Create a new object that inherits from this Object
 *
 *     var Animal = CoreObject.extend();
 *     var Horse = Animal.extend();
 *
 * @param {Object} props Functions and properties to be applied to the
 *                       new object's prototype
 * @return {CoreObject} An object that inherits from CoreObject
 * @this {*}
 */
CoreObject.extend = function () {
  var props = arguments[0] === undefined ? {} : arguments[0];

  // Set up the constructor using the supplied init method
  // or using the init of the parent object
  // Make sure to check the unobfuscated version for external libs
  var init = props.init || props.init || this.prototype.init || this.prototype.init || function () {};
  // In Resig's simple class inheritance (previously used) the constructor
  //  is a function that calls `this.init.apply(arguments)`
  // However that would prevent us from using `ParentObject.call(this);`
  //  in a Child constructor because the `this` in `this.init`
  //  would still refer to the Child and cause an infinite loop.
  // We would instead have to do
  //    `ParentObject.prototype.init.apply(this, arguments);`
  //  Bleh. We're not creating a _super() function, so it's good to keep
  //  the parent constructor reference simple.
  var subObj = function subObj() {
    init.apply(this, arguments);
  };

  // Inherit from this object's prototype
  subObj.prototype = Lib.obj.create(this.prototype);
  // Reset the constructor property for subObj otherwise
  // instances of subObj would have the constructor of the parent Object
  subObj.prototype.constructor = subObj;

  // Make the class extendable
  subObj.extend = CoreObject.extend;
  // Make a function for creating instances
  subObj.create = CoreObject.create;

  // Extend subObj's prototype with functions and other properties from props
  for (var name in props) {
    if (props.hasOwnProperty(name)) {
      subObj.prototype[name] = props[name];
    }
  }

  return subObj;
};

/**
 * Create a new instance of this Object class
 *
 *     var myAnimal = Animal.create();
 *
 * @return {CoreObject} An instance of a CoreObject subclass
 * @this {*}
 */
CoreObject.create = function () {
  // Create a new object that inherits from this object's prototype
  var inst = Lib.obj.create(this.prototype);

  // Apply this constructor function to the new object
  this.apply(inst, arguments);

  // Return the new object
  return inst;
};

exports['default'] = CoreObject;
module.exports = exports['default'];

},{"./lib":46}],40:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * @fileoverview Main function src.
 */

var _Player = _dereq_('./player');

var _Player2 = _interopRequireDefault(_Player);

var _Plugins = _dereq_('./plugins');

var _Plugins2 = _interopRequireDefault(_Plugins);

var _Options = _dereq_('./options');

var _Options2 = _interopRequireDefault(_Options);

var _import = _dereq_('./lib');

var Lib = _interopRequireWildcard(_import);

var _import2 = _dereq_('./util');

var VjsUtil = _interopRequireWildcard(_import2);

var _CoreObject = _dereq_('./core-object');

var _CoreObject2 = _interopRequireDefault(_CoreObject);

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

/**
 * Doubles as the main function for users to create a player instance and also
 * the main library object.
 *
 * **ALIASES** videojs, _V_ (deprecated)
 *
 * The `vjs` function can be used to initialize or retrieve a player.
 *
 *     var myPlayer = vjs('my_video_id');
 *
 * @param  {String|Element} id      Video element or video element ID
 * @param  {Object=} options        Optional options object for config/settings
 * @param  {Function=} ready        Optional ready callback
 * @return {Player}             A player instance
 * @namespace
 */
var videojs = function videojs(id, options, ready) {
  var tag; // Element of ID

  // Allow for element or ID to be passed in
  // String ID
  if (typeof id === 'string') {

    // Adjust for jQuery ID syntax
    if (id.indexOf('#') === 0) {
      id = id.slice(1);
    }

    // If a player instance has already been created for this ID return it.
    if (_Player2['default'].players[id]) {

      // If options or ready funtion are passed, warn
      if (options) {
        Lib.log.warn('Player "' + id + '" is already initialised. Options will not be applied.');
      }

      if (ready) {
        _Player2['default'].players[id].ready(ready);
      }

      return _Player2['default'].players[id];

      // Otherwise get element for ID
    } else {
      tag = Lib.el(id);
    }

    // ID is a media element
  } else {
    tag = id;
  }

  // Check for a useable element
  if (!tag || !tag.nodeName) {
    // re: nodeName, could be a box div also
    throw new TypeError('The element or ID supplied is not valid. (videojs)'); // Returns
  }

  // Element may have a player attr referring to an already created player instance.
  // If not, set up a new player and return the instance.
  return tag.player || new _Player2['default'](tag, options, ready);
};

// Extended name, also available externally, window.videojs
// var videojs = window['videojs'] = vjs;

// CDN Version. Used to target right flash swf.
videojs.CDN_VERSION = '5.0';
videojs.ACCESS_PROTOCOL = 'https:' == _document2['default'].location.protocol ? 'https://' : 'http://';

/**
* Full player version
* @type {string}
*/
videojs.VERSION = '5.0.0-0';

// Set CDN Version of swf
// The added (+) blocks the replace from changing this _VERSION_NO_PATCH_ string
if (videojs.CDN_VERSION !== '__VERSION_' + 'NO_PATCH__') {
  _Options2['default'].flash.swf = '' + videojs.ACCESS_PROTOCOL + 'vjs.zencdn.net/' + videojs.CDN_VERSION + '/video-js.swf';
}

/**
 * Utility function for adding languages to the default options. Useful for
 * amending multiple language support at runtime.
 *
 * Example: videojs.addLanguage('es', {'Hello':'Hola'});
 *
 * @param  {String} code The language code or dictionary property
 * @param  {Object} data The data values to be translated
 * @return {Object} The resulting global languages dictionary object
 */
videojs.addLanguage = function (code, data) {
  if (_Options2['default'].languages[code] !== undefined) {
    _Options2['default'].languages[code] = VjsUtil.mergeOptions(_Options2['default'].languages[code], data);
  } else {
    _Options2['default'].languages[code] = data;
  }
  return _Options2['default'].languages;
};

/**
 * Custom Universal Module Definition (UMD)
 *
 * Video.js will never be a non-browser lib so we can simplify UMD a bunch and
 * still support requirejs and browserify. This also needs to be closure
 * compiler compatible, so string keys are used.
 */
if (typeof define === 'function' && define.amd) {
  define('videojs', [], function () {
    return videojs;
  });

  // checking that module is an object too because of umdjs/umd#35
} else if (typeof exports === 'object' && typeof module === 'object') {
  module.exports = videojs;
}

exports['default'] = videojs;
module.exports = exports['default'];

},{"./core-object":39,"./lib":46,"./options":52,"./player":53,"./plugins":54,"./util":70,"global/document":1}],41:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('./component');

var _Component3 = _interopRequireDefault(_Component2);

var _import = _dereq_('./lib');

var Lib = _interopRequireWildcard(_import);

/**
 * Display that an error has occurred making the video unplayable
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var ErrorDisplay = (function (_Component) {
  function ErrorDisplay(player, options) {
    _classCallCheck(this, ErrorDisplay);

    _get(Object.getPrototypeOf(ErrorDisplay.prototype), 'constructor', this).call(this, player, options);

    this.update();
    this.on(player, 'error', this.update);
  }

  _inherits(ErrorDisplay, _Component);

  _createClass(ErrorDisplay, [{
    key: 'createEl',
    value: function createEl() {
      var el = _get(Object.getPrototypeOf(ErrorDisplay.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-error-display'
      });

      this.contentEl_ = Lib.createEl('div');
      el.appendChild(this.contentEl_);

      return el;
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.player().error()) {
        this.contentEl_.innerHTML = this.localize(this.player().error().message);
      }
    }
  }]);

  return ErrorDisplay;
})(_Component3['default']);

_Component3['default'].registerComponent('ErrorDisplay', ErrorDisplay);
exports['default'] = ErrorDisplay;
module.exports = exports['default'];

},{"./component":7,"./lib":46}],42:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = _dereq_('./events');

var Events = _interopRequireWildcard(_import);

var _import2 = _dereq_('./lib');

var Lib = _interopRequireWildcard(_import2);

var EventEmitter = function EventEmitter() {};

EventEmitter.prototype.allowedEvents_ = {};

EventEmitter.prototype.on = function (type, fn) {
  // Remove the addEventListener alias before calling Events.on
  // so we don't get into an infinite type loop
  var ael = this.addEventListener;
  this.addEventListener = Function.prototype;
  Events.on(this, type, fn);
  this.addEventListener = ael;
};
EventEmitter.prototype.addEventListener = EventEmitter.prototype.on;

EventEmitter.prototype.off = function (type, fn) {
  Events.off(this, type, fn);
};
EventEmitter.prototype.removeEventListener = EventEmitter.prototype.off;

EventEmitter.prototype.one = function (type, fn) {
  Events.one(this, type, fn);
};

EventEmitter.prototype.trigger = function (event) {
  var type = event.type || event;

  if (typeof event === 'string') {
    event = {
      type: type
    };
  }
  event = Events.fixEvent(event);

  if (this.allowedEvents_[type] && this['on' + type]) {
    this['on' + type](event);
  }

  Events.trigger(this, event);
};
// The standard DOM EventTarget.dispatchEvent() is aliased to trigger()
EventEmitter.prototype.dispatchEvent = EventEmitter.prototype.trigger;

exports['default'] = EventEmitter;
module.exports = exports['default'];

},{"./events":43,"./lib":46}],43:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * @fileoverview Event System (John Resig - Secrets of a JS Ninja http://jsninja.com/)
 * (Original book version wasn't completely usable, so fixed some things and made Closure Compiler compatible)
 * This should work very similarly to jQuery's events, however it's based off the book version which isn't as
 * robust as jquery's, so there's probably some differences.
 */

var _import = _dereq_('./lib');

var Lib = _interopRequireWildcard(_import);

var _window = _dereq_('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

/**
 * Fix a native event to have standard property values
 * @param  {Object} event Event object to fix
 * @return {Object}
 * @private
 */
var fixEvent = function fixEvent(event) {

  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }

  // Test if fixing up is needed
  // Used to check if !event.stopPropagation instead of isPropagationStopped
  // But native events return true for stopPropagation, but don't have
  // other expected methods like isPropagationStopped. Seems to be a problem
  // with the Javascript Ninja code. So we're just overriding all events now.
  if (!event || !event.isPropagationStopped) {
    var old = event || _window2['default'].event;

    event = {};
    // Clone the old object so that we can modify the values event = {};
    // IE8 Doesn't like when you mess with native event properties
    // Firefox returns false for event.hasOwnProperty('type') and other props
    //  which makes copying more difficult.
    // TODO: Probably best to create a whitelist of event props
    for (var key in old) {
      // Safari 6.0.3 warns you if you try to copy deprecated layerX/Y
      // Chrome warns you if you try to copy deprecated keyboardEvent.keyLocation
      if (key !== 'layerX' && key !== 'layerY' && key !== 'keyLocation') {
        // Chrome 32+ warns if you try to copy deprecated returnValue, but
        // we still want to if preventDefault isn't supported (IE8).
        if (!(key === 'returnValue' && old.preventDefault)) {
          event[key] = old[key];
        }
      }
    }

    // The event occurred on this element
    if (!event.target) {
      event.target = event.srcElement || _document2['default'];
    }

    // Handle which other element the event is related to
    event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;

    // Stop the default browser action
    event.preventDefault = function () {
      if (old.preventDefault) {
        old.preventDefault();
      }
      event.returnValue = false;
      event.defaultPrevented = true;
    };

    event.defaultPrevented = false;

    // Stop the event from bubbling
    event.stopPropagation = function () {
      if (old.stopPropagation) {
        old.stopPropagation();
      }
      event.cancelBubble = true;
      event.isPropagationStopped = returnTrue;
    };

    event.isPropagationStopped = returnFalse;

    // Stop the event from bubbling and executing other handlers
    event.stopImmediatePropagation = function () {
      if (old.stopImmediatePropagation) {
        old.stopImmediatePropagation();
      }
      event.isImmediatePropagationStopped = returnTrue;
      event.stopPropagation();
    };

    event.isImmediatePropagationStopped = returnFalse;

    // Handle mouse position
    if (event.clientX != null) {
      var doc = _document2['default'].documentElement,
          body = _document2['default'].body;

      event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
    }

    // Handle key presses
    event.which = event.charCode || event.keyCode;

    // Fix button for mouse clicks:
    // 0 == left; 1 == middle; 2 == right
    if (event.button != null) {
      event.button = event.button & 1 ? 0 : event.button & 4 ? 1 : event.button & 2 ? 2 : 0;
    }
  }

  // Returns fixed-up instance
  return event;
};

/**
 * Add an event listener to element
 * It stores the handler function in a separate cache object
 * and adds a generic handler to the element's event,
 * along with a unique id (guid) to the element.
 * @param  {Element|Object}   elem Element or object to bind listeners to
 * @param  {String|Array}   type Type of event to bind to.
 * @param  {Function} fn   Event listener.
 * @private
 */
var on = (function (_on) {
  function on(_x, _x2, _x3) {
    return _on.apply(this, arguments);
  }

  on.toString = function () {
    return _on.toString();
  };

  return on;
})(function (elem, type, fn) {
  if (Lib.obj.isArray(type)) {
    return _handleMultipleEvents(on, elem, type, fn);
  }

  var data = Lib.getData(elem);

  // We need a place to store all our handler data
  if (!data.handlers) data.handlers = {};

  if (!data.handlers[type]) data.handlers[type] = [];

  if (!fn.guid) fn.guid = Lib.guid++;

  data.handlers[type].push(fn);

  if (!data.dispatcher) {
    data.disabled = false;

    data.dispatcher = function (event) {

      if (data.disabled) return;
      event = fixEvent(event);

      var handlers = data.handlers[event.type];

      if (handlers) {
        // Copy handlers so if handlers are added/removed during the process it doesn't throw everything off.
        var handlersCopy = handlers.slice(0);

        for (var m = 0, n = handlersCopy.length; m < n; m++) {
          if (event.isImmediatePropagationStopped()) {
            break;
          } else {
            handlersCopy[m].call(elem, event);
          }
        }
      }
    };
  }

  if (data.handlers[type].length == 1) {
    if (elem.addEventListener) {
      elem.addEventListener(type, data.dispatcher, false);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + type, data.dispatcher);
    }
  }
});

/**
 * Removes event listeners from an element
 * @param  {Element|Object}   elem Object to remove listeners from
 * @param  {String|Array=}   type Type of listener to remove. Don't include to remove all events from element.
 * @param  {Function} fn   Specific listener to remove. Don't include to remove listeners for an event type.
 * @private
 */
var off = (function (_off) {
  function off(_x4, _x5, _x6) {
    return _off.apply(this, arguments);
  }

  off.toString = function () {
    return _off.toString();
  };

  return off;
})(function (elem, type, fn) {
  // Don't want to add a cache object through getData if not needed
  if (!Lib.hasData(elem)) return;

  var data = Lib.getData(elem);

  // If no events exist, nothing to unbind
  if (!data.handlers) {
    return;
  }

  if (Lib.obj.isArray(type)) {
    return _handleMultipleEvents(off, elem, type, fn);
  }

  // Utility function
  var removeType = function removeType(t) {
    data.handlers[t] = [];
    cleanUpEvents(elem, t);
  };

  // Are we removing all bound events?
  if (!type) {
    for (var t in data.handlers) {
      removeType(t);
    }return;
  }

  var handlers = data.handlers[type];

  // If no handlers exist, nothing to unbind
  if (!handlers) return;

  // If no listener was provided, remove all listeners for type
  if (!fn) {
    removeType(type);
    return;
  }

  // We're only removing a single handler
  if (fn.guid) {
    for (var n = 0; n < handlers.length; n++) {
      if (handlers[n].guid === fn.guid) {
        handlers.splice(n--, 1);
      }
    }
  }

  cleanUpEvents(elem, type);
});

/**
 * Clean up the listener cache and dispatchers
 * @param  {Element|Object} elem Element to clean up
 * @param  {String} type Type of event to clean up
 * @private
 */
var cleanUpEvents = function cleanUpEvents(elem, type) {
  var data = Lib.getData(elem);

  // Remove the events of a particular type if there are none left
  if (data.handlers[type].length === 0) {
    delete data.handlers[type];
    // data.handlers[type] = null;
    // Setting to null was causing an error with data.handlers

    // Remove the meta-handler from the element
    if (elem.removeEventListener) {
      elem.removeEventListener(type, data.dispatcher, false);
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + type, data.dispatcher);
    }
  }

  // Remove the events object if there are no types left
  if (Lib.isEmpty(data.handlers)) {
    delete data.handlers;
    delete data.dispatcher;
    delete data.disabled;

    // data.handlers = null;
    // data.dispatcher = null;
    // data.disabled = null;
  }

  // Finally remove the expando if there is no data left
  if (Lib.isEmpty(data)) {
    Lib.removeData(elem);
  }
};

/**
 * Trigger an event for an element
 * @param  {Element|Object}      elem  Element to trigger an event on
 * @param  {Event|Object|String} event A string (the type) or an event object with a type attribute
 * @private
 */
var trigger = (function (_trigger) {
  function trigger(_x7, _x8) {
    return _trigger.apply(this, arguments);
  }

  trigger.toString = function () {
    return _trigger.toString();
  };

  return trigger;
})(function (elem, event) {
  // Fetches element data and a reference to the parent (for bubbling).
  // Don't want to add a data object to cache for every parent,
  // so checking hasData first.
  var elemData = Lib.hasData(elem) ? Lib.getData(elem) : {};
  var parent = elem.parentNode || elem.ownerDocument;
  // type = event.type || event,
  // handler;

  // If an event name was passed as a string, creates an event out of it
  if (typeof event === 'string') {
    event = { type: event, target: elem };
  }
  // Normalizes the event properties.
  event = fixEvent(event);

  // If the passed element has a dispatcher, executes the established handlers.
  if (elemData.dispatcher) {
    elemData.dispatcher.call(elem, event);
  }

  // Unless explicitly stopped or the event does not bubble (e.g. media events)
  // recursively calls this function to bubble the event up the DOM.
  if (parent && !event.isPropagationStopped() && event.bubbles !== false) {
    trigger(parent, event);

    // If at the top of the DOM, triggers the default action unless disabled.
  } else if (!parent && !event.defaultPrevented) {
    var targetData = Lib.getData(event.target);

    // Checks if the target has a default action for this event.
    if (event.target[event.type]) {
      // Temporarily disables event dispatching on the target as we have already executed the handler.
      targetData.disabled = true;
      // Executes the default action.
      if (typeof event.target[event.type] === 'function') {
        event.target[event.type]();
      }
      // Re-enables event dispatching.
      targetData.disabled = false;
    }
  }

  // Inform the triggerer if the default was prevented by returning false
  return !event.defaultPrevented;
});

/**
 * Trigger a listener only once for an event
 * @param  {Element|Object}   elem Element or object to
 * @param  {String|Array}   type
 * @param  {Function} fn
 * @private
 */
var one = (function (_one) {
  function one(_x9, _x10, _x11) {
    return _one.apply(this, arguments);
  }

  one.toString = function () {
    return _one.toString();
  };

  return one;
})(function (elem, type, fn) {
  if (Lib.obj.isArray(type)) {
    return _handleMultipleEvents(one, elem, type, fn);
  }
  var func = (function (_func) {
    function func() {
      return _func.apply(this, arguments);
    }

    func.toString = function () {
      return _func.toString();
    };

    return func;
  })(function () {
    off(elem, type, func);
    fn.apply(this, arguments);
  });
  // copy the guid to the new function so it can removed using the original function's ID
  func.guid = fn.guid = fn.guid || Lib.guid++;
  on(elem, type, func);
});

/**
 * Loops through an array of event types and calls the requested method for each type.
 * @param  {Function} fn   The event method we want to use.
 * @param  {Element|Object} elem Element or object to bind listeners to
 * @param  {String}   type Type of event to bind to.
 * @param  {Function} callback   Event listener.
 * @private
 */
function _handleMultipleEvents(fn, elem, type, callback) {
  Lib.arr.forEach(type, function (type) {
    fn(elem, type, callback); //Call the event method for each one of the types
  });
}

exports.on = on;
exports.off = off;
exports.cleanUpEvents = cleanUpEvents;
exports.fixEvent = fixEvent;
exports.one = one;
exports.trigger = trigger;

},{"./lib":46,"global/document":1,"global/window":2}],44:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = _dereq_('./lib');

var Lib = _interopRequireWildcard(_import);

/**
 * A combination of node inherits and babel's inherits (after transpile).
 * Both work the same but node adds `super_` to the subClass
 * and Bable adds the superClass as __proto__. Both seem useful.
 */
var _inherits = function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (superClass) {
    // node
    subClass.super_ = superClass;
  }
};

/**
 * Function for subclassing using the same inheritance that
 * videojs uses internally
 *
 * ```
 * var Button = videojs.getComponent('Button');
 *
 * var MyButton = videojs.extends(Button, {
 *   constructor: function(player, options) {
 *     Button.call(this, player, options);
 *   },
 *
 *   onClick: function() {
 *     // doSomething
 *   }
 * });
 * ```
 */
var extendsFn = function extendsFn(superClass) {
  var subClassMethods = arguments[1] === undefined ? {} : arguments[1];

  var subClass = function subClass() {
    superClass.apply(this, arguments);
  };
  var methods = {};

  if (subClassMethods.constructor !== Object.prototype.constructor) {
    subClass = subClassMethods.constructor;
    methods = subClassMethods;
  } else if (typeof subClassMethods === 'function') {
    subClass = subClassMethods;
  }

  _inherits(subClass, superClass);

  // Extend subObj's prototype with functions and other properties from props
  for (var name in methods) {
    if (methods.hasOwnProperty(name)) {
      subClass.prototype[name] = methods[name];
    }
  }

  return subClass;
};

exports['default'] = extendsFn;
module.exports = exports['default'];

},{"./lib":46}],45:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

/**
 * Store the browser-specific methods for the fullscreen API
 * @type {Object|undefined}
 * @private
 */
var FullscreenApi = {};

// browser API methods
// map approach from Screenful.js - https://github.com/sindresorhus/screenfull.js
var apiMap = [
// Spec: https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'],
// WebKit
['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'],
// Old WebKit (Safari 5.1)
['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'],
// Mozilla
['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'],
// Microsoft
['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];

var specApi = apiMap[0];
var browserApi = undefined;

// determine the supported set of functions
for (var i = 0; i < apiMap.length; i++) {
  // check for exitFullscreen function
  if (apiMap[i][1] in _document2['default']) {
    browserApi = apiMap[i];
    break;
  }
}

// map the browser API names to the spec API names
if (browserApi) {
  for (var i = 0; i < browserApi.length; i++) {
    FullscreenApi[specApi[i]] = browserApi[i];
  }
}

exports['default'] = FullscreenApi;
module.exports = exports['default'];

},{"global/document":1}],46:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _window = _dereq_('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

var navigator = _window2['default'].navigator;

var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * Creates an element and applies properties.
 * @param  {String=} tagName    Name of tag to be created.
 * @param  {Object=} properties Element properties to be applied.
 * @return {Element}
 * @private
 */
var createEl = function createEl() {
  var tagName = arguments[0] === undefined ? 'div' : arguments[0];
  var properties = arguments[1] === undefined ? {} : arguments[1];

  var el = _document2['default'].createElement(tagName);

  obj.each(properties, function (propName, val) {
    // Not remembering why we were checking for dash
    // but using setAttribute means you have to use getAttribute

    // The check for dash checks for the aria-* attributes, like aria-label, aria-valuemin.
    // The additional check for "role" is because the default method for adding attributes does not
    // add the attribute "role". My guess is because it's not a valid attribute in some namespaces, although
    // browsers handle the attribute just fine. The W3C allows for aria-* attributes to be used in pre-HTML5 docs.
    // http://www.w3.org/TR/wai-aria-primer/#ariahtml. Using setAttribute gets around this problem.
    if (propName.indexOf('aria-') !== -1 || propName == 'role') {
      el.setAttribute(propName, val);
    } else {
      el[propName] = val;
    }
  });

  return el;
};

/**
 * Uppercase the first letter of a string
 * @param  {String} string String to be uppercased
 * @return {String}
 * @private
 */
var capitalize = function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Object functions container
 * @type {Object}
 * @private
 */
var obj = {};

/**
 * Object.create shim for prototypal inheritance
 *
 * https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create
 *
 * @function
 * @param  {Object}   obj Object to use as prototype
 * @private
 */
obj.create = Object.create || function (obj) {
  //Create a new function called 'F' which is just an empty object.
  function F() {}

  //the prototype of the 'F' function should point to the
  //parameter of the anonymous function.
  F.prototype = obj;

  //create a new constructor function based off of the 'F' function.
  return new F();
};

/**
 * Loop through each property in an object and call a function
 * whose arguments are (key,value)
 * @param  {Object}   obj Object of properties
 * @param  {Function} fn  Function to be called on each property.
 * @this {*}
 * @private
 */
obj.each = function (obj, fn, context) {
  for (var key in obj) {
    if (hasOwnProp.call(obj, key)) {
      fn.call(context || this, key, obj[key]);
    }
  }
};

/**
 * Merge two objects together and return the original.
 * @param  {Object} obj1
 * @param  {Object} obj2
 * @return {Object}
 * @private
 */
obj.merge = function (obj1, obj2) {
  if (!obj2) {
    return obj1;
  }
  for (var key in obj2) {
    if (hasOwnProp.call(obj2, key)) {
      obj1[key] = obj2[key];
    }
  }
  return obj1;
};

/**
 * Merge two objects, and merge any properties that are objects
 * instead of just overwriting one. Uses to merge options hashes
 * where deeper default settings are important.
 * @param  {Object} obj1 Object to override
 * @param  {Object} obj2 Overriding object
 * @return {Object}      New object. Obj1 and Obj2 will be untouched.
 * @private
 */
obj.deepMerge = function (obj1, obj2) {
  var key, val1, val2;

  // make a copy of obj1 so we're not overwriting original values.
  // like prototype.options_ and all sub options objects
  obj1 = obj.copy(obj1);

  for (key in obj2) {
    if (hasOwnProp.call(obj2, key)) {
      val1 = obj1[key];
      val2 = obj2[key];

      // Check if both properties are pure objects and do a deep merge if so
      if (obj.isPlain(val1) && obj.isPlain(val2)) {
        obj1[key] = obj.deepMerge(val1, val2);
      } else {
        obj1[key] = obj2[key];
      }
    }
  }
  return obj1;
};

/**
 * Make a copy of the supplied object
 * @param  {Object} obj Object to copy
 * @return {Object}     Copy of object
 * @private
 */
obj.copy = function (objToCopy) {
  return obj.merge({}, objToCopy);
};

/**
 * Check if an object is plain, and not a dom node or any object sub-instance
 * @param  {Object} obj Object to check
 * @return {Boolean}     True if plain, false otherwise
 * @private
 */
obj.isPlain = function (obj) {
  return !!obj && typeof obj === 'object' && obj.toString() === '[object Object]' && obj.constructor === Object;
};

/**
 * Check if an object is Array
*  Since instanceof Array will not work on arrays created in another frame we need to use Array.isArray, but since IE8 does not support Array.isArray we need this shim
 * @param  {Object} obj Object to check
 * @return {Boolean}     True if plain, false otherwise
 * @private
 */
obj.isArray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
};

/**
 * Bind (a.k.a proxy or Context). A simple method for changing the context of a function
   It also stores a unique id on the function so it can be easily removed from events
 * @param  {*}   context The object to bind as scope
 * @param  {Function} fn      The function to be bound to a scope
 * @param  {Number=}   uid     An optional unique ID for the function to be set
 * @return {Function}
 * @private
 */
var bind = function bind(context, fn, uid) {
  // Make sure the function has a unique ID
  if (!fn.guid) {
    fn.guid = (exports.guid = guid += 1, guid - 1);
  }

  // Create the new function that changes the context
  var ret = function ret() {
    return fn.apply(context, arguments);
  };

  // Allow for the ability to individualize this function
  // Needed in the case where multiple objects might share the same prototype
  // IF both items add an event listener with the same function, then you try to remove just one
  // it will remove both because they both have the same guid.
  // when using this, you need to use the bind method when you remove the listener as well.
  // currently used in text tracks
  ret.guid = uid ? uid + '_' + fn.guid : fn.guid;

  return ret;
};

/**
 * Element Data Store. Allows for binding data to an element without putting it directly on the element.
 * Ex. Event listeners are stored here.
 * (also from jsninja.com, slightly modified and updated for closure compiler)
 * @type {Object}
 * @private
 */
var cache = {};

/**
 * Unique ID for an element or function
 * @type {Number}
 * @private
 */
var guid = 1;

/**
 * Unique attribute name to store an element's guid in
 * @type {String}
 * @constant
 * @private
 */
var expando = 'vdata' + new Date().getTime();

/**
 * Returns the cache object where data for an element is stored
 * @param  {Element} el Element to store data for.
 * @return {Object}
 * @private
 */
var getData = function getData(el) {
  var id = el[expando];
  if (!id) {
    id = el[expando] = (exports.guid = guid += 1, guid - 1);
  }
  if (!cache[id]) {
    cache[id] = {};
  }
  return cache[id];
};

/**
 * Returns the cache object where data for an element is stored
 * @param  {Element} el Element to store data for.
 * @return {Object}
 * @private
 */
var hasData = function hasData(el) {
  var id = el[expando];
  return !(!id || isEmpty(cache[id]));
};

/**
 * Delete data for the element from the cache and the guid attr from getElementById
 * @param  {Element} el Remove data for an element
 * @private
 */
var removeData = function removeData(el) {
  var id = el[expando];
  if (!id) {
    return;
  }
  // Remove all stored data
  // Changed to = null
  // http://coding.smashingmagazine.com/2012/11/05/writing-fast-memory-efficient-javascript/
  // cache[id] = null;
  delete cache[id];

  // Remove the expando property from the DOM node
  try {
    delete el[expando];
  } catch (e) {
    if (el.removeAttribute) {
      el.removeAttribute(expando);
    } else {
      // IE doesn't appear to support removeAttribute on the document element
      el[expando] = null;
    }
  }
};

/**
 * Check if an object is empty
 * @param  {Object}  obj The object to check for emptiness
 * @return {Boolean}
 * @private
 */
var isEmpty = function isEmpty(obj) {
  for (var prop in obj) {
    // Inlude null properties as empty.
    if (obj[prop] !== null) {
      return false;
    }
  }
  return true;
};

/**
 * Check if an element has a CSS class
 * @param {Element} element Element to check
 * @param {String} classToCheck Classname to check
 * @private
 */
var hasClass = function hasClass(element, classToCheck) {
  return (' ' + element.className + ' ').indexOf(' ' + classToCheck + ' ') !== -1;
};

/**
 * Add a CSS class name to an element
 * @param {Element} element    Element to add class name to
 * @param {String} classToAdd Classname to add
 * @private
 */
var addClass = function addClass(element, classToAdd) {
  if (!hasClass(element, classToAdd)) {
    element.className = element.className === '' ? classToAdd : element.className + ' ' + classToAdd;
  }
};

/**
 * Remove a CSS class name from an element
 * @param {Element} element    Element to remove from class name
 * @param {String} classToAdd Classname to remove
 * @private
 */
var removeClass = function removeClass(element, classToRemove) {
  if (!hasClass(element, classToRemove)) {
    return;
  }

  var classNames = element.className.split(' ');

  // no arr.indexOf in ie8, and we don't want to add a big shim
  for (var i = classNames.length - 1; i >= 0; i--) {
    if (classNames[i] === classToRemove) {
      classNames.splice(i, 1);
    }
  }

  element.className = classNames.join(' ');
};

/**
 * Element for testing browser HTML5 video capabilities
 * @type {Element}
 * @constant
 * @private
 */
var TEST_VID = createEl('video');
var track = _document2['default'].createElement('track');
track.kind = 'captions';
track.srclang = 'en';
track.label = 'English';
TEST_VID.appendChild(track);

/**
 * Useragent for browser testing.
 * @type {String}
 * @constant
 * @private
 */
var USER_AGENT = navigator.userAgent;

/**
 * Device is an iPhone
 * @type {Boolean}
 * @constant
 * @private
 */
var IS_IPHONE = /iPhone/i.test(USER_AGENT);
var IS_IPAD = /iPad/i.test(USER_AGENT);
var IS_IPOD = /iPod/i.test(USER_AGENT);
var IS_IOS = IS_IPHONE || IS_IPAD || IS_IPOD;

var IOS_VERSION = (function () {
  var match = USER_AGENT.match(/OS (\d+)_/i);
  if (match && match[1]) {
    return match[1];
  }
})();

var IS_ANDROID = /Android/i.test(USER_AGENT);
var ANDROID_VERSION = (function () {
  // This matches Android Major.Minor.Patch versions
  // ANDROID_VERSION is Major.Minor as a Number, if Minor isn't available, then only Major is returned
  var match = USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),
      major,
      minor;

  if (!match) {
    return null;
  }

  major = match[1] && parseFloat(match[1]);
  minor = match[2] && parseFloat(match[2]);

  if (major && minor) {
    return parseFloat(match[1] + '.' + match[2]);
  } else if (major) {
    return major;
  } else {
    return null;
  }
})();
// Old Android is defined as Version older than 2.3, and requiring a webkit version of the android browser
var IS_OLD_ANDROID = IS_ANDROID && /webkit/i.test(USER_AGENT) && ANDROID_VERSION < 2.3;

var IS_FIREFOX = /Firefox/i.test(USER_AGENT);
var IS_CHROME = /Chrome/i.test(USER_AGENT);
var IS_IE8 = /MSIE\s8\.0/.test(USER_AGENT);

var TOUCH_ENABLED = !!('ontouchstart' in _window2['default'] || _window2['default'].DocumentTouch && _document2['default'] instanceof _window2['default'].DocumentTouch);
var BACKGROUND_SIZE_SUPPORTED = ('backgroundSize' in TEST_VID.style);

/**
 * Apply attributes to an HTML element.
 * @param  {Element} el         Target element.
 * @param  {Object=} attributes Element attributes to be applied.
 * @private
 */
var setElementAttributes = function setElementAttributes(el, attributes) {
  obj.each(attributes, function (attrName, attrValue) {
    if (attrValue === null || typeof attrValue === 'undefined' || attrValue === false) {
      el.removeAttribute(attrName);
    } else {
      el.setAttribute(attrName, attrValue === true ? '' : attrValue);
    }
  });
};

/**
 * Get an element's attribute values, as defined on the HTML tag
 * Attributes are not the same as properties. They're defined on the tag
 * or with setAttribute (which shouldn't be used with HTML)
 * This will return true or false for boolean attributes.
 * @param  {Element} tag Element from which to get tag attributes
 * @return {Object}
 * @private
 */
var getElementAttributes = function getElementAttributes(tag) {
  var obj, knownBooleans, attrs, attrName, attrVal;

  obj = {};

  // known boolean attributes
  // we can check for matching boolean properties, but older browsers
  // won't know about HTML5 boolean attributes that we still read from
  knownBooleans = ',' + 'autoplay,controls,loop,muted,default' + ',';

  if (tag && tag.attributes && tag.attributes.length > 0) {
    attrs = tag.attributes;

    for (var i = attrs.length - 1; i >= 0; i--) {
      attrName = attrs[i].name;
      attrVal = attrs[i].value;

      // check for known booleans
      // the matching element property will return a value for typeof
      if (typeof tag[attrName] === 'boolean' || knownBooleans.indexOf(',' + attrName + ',') !== -1) {
        // the value of an included boolean attribute is typically an empty
        // string ('') which would equal false if we just check for a false value.
        // we also don't want support bad code like autoplay='false'
        attrVal = attrVal !== null ? true : false;
      }

      obj[attrName] = attrVal;
    }
  }

  return obj;
};

/**
 * Get the computed style value for an element
 * From http://robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element/
 * @param  {Element} el        Element to get style value for
 * @param  {String} strCssRule Style name
 * @return {String}            Style value
 * @private
 */
var getComputedDimension = function getComputedDimension(el, strCssRule) {
  var strValue = '';
  if (_document2['default'].defaultView && _document2['default'].defaultView.getComputedStyle) {
    strValue = _document2['default'].defaultView.getComputedStyle(el, '').getPropertyValue(strCssRule);
  } else if (el.currentStyle) {
    // IE8 Width/Height support
    var upperCasedRule = strCssRule.substr(0, 1).toUpperCase() + strCssRule.substr(1);
    strValue = el['client' + upperCasedRule] + 'px';
  }
  return strValue;
};

/**
 * Insert an element as the first child node of another
 * @param  {Element} child   Element to insert
 * @param  {[type]} parent Element to insert child into
 * @private
 */
var insertFirst = function insertFirst(child, parent) {
  if (parent.firstChild) {
    parent.insertBefore(child, parent.firstChild);
  } else {
    parent.appendChild(child);
  }
};

/**
 * Object to hold browser support information
 * @type {Object}
 * @private
 */
var browser = {};

/**
 * Shorthand for document.getElementById()
 * Also allows for CSS (jQuery) ID syntax. But nothing other than IDs.
 * @param  {String} id  Element ID
 * @return {Element}    Element with supplied ID
 * @private
 */
var el = function el(id) {
  if (id.indexOf('#') === 0) {
    id = id.slice(1);
  }

  return _document2['default'].getElementById(id);
};

/**
 * Format seconds as a time string, H:MM:SS or M:SS
 * Supplying a guide (in seconds) will force a number of leading zeros
 * to cover the length of the guide
 * @param  {Number} seconds Number of seconds to be turned into a string
 * @param  {Number} guide   Number (in seconds) to model the string after
 * @return {String}         Time formatted as H:MM:SS or M:SS
 * @private
 */
var formatTime = function formatTime(seconds) {
  var guide = arguments[1] === undefined ? seconds : arguments[1];
  return (function () {
    var s = Math.floor(seconds % 60);
    var m = Math.floor(seconds / 60 % 60);
    var h = Math.floor(seconds / 3600);
    var gm = Math.floor(guide / 60 % 60);
    var gh = Math.floor(guide / 3600);

    // handle invalid times
    if (isNaN(seconds) || seconds === Infinity) {
      // '-' is false for all relational operators (e.g. <, >=) so this setting
      // will add the minimum number of fields specified by the guide
      h = m = s = '-';
    }

    // Check if we need to show hours
    h = h > 0 || gh > 0 ? h + ':' : '';

    // If hours are showing, we may need to add a leading zero.
    // Always show at least one digit of minutes.
    m = ((h || gm >= 10) && m < 10 ? '0' + m : m) + ':';

    // Check if leading zero is need for seconds
    s = s < 10 ? '0' + s : s;

    return h + m + s;
  })();
};

// Attempt to block the ability to select text while dragging controls
var blockTextSelection = function blockTextSelection() {
  _document2['default'].body.focus();
  _document2['default'].onselectstart = function () {
    return false;
  };
};
// Turn off text selection blocking
var unblockTextSelection = function unblockTextSelection() {
  _document2['default'].onselectstart = function () {
    return true;
  };
};

/**
 * Trim whitespace from the ends of a string.
 * @param  {String} string String to trim
 * @return {String}        Trimmed string
 * @private
 */
var trim = function trim(str) {
  return (str + '').replace(/^\s+|\s+$/g, '');
};

/**
 * Should round off a number to a decimal place
 * @param  {Number} num Number to round
 * @param  {Number} dec Number of decimal places to round to
 * @return {Number}     Rounded number
 * @private
 */
var round = function round(num) {
  var dec = arguments[1] === undefined ? 0 : arguments[1];

  return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
};

/**
 * Should create a fake TimeRange object
 * Mimics an HTML5 time range instance, which has functions that
 * return the start and end times for a range
 * TimeRanges are returned by the buffered() method
 * @param  {Number} start Start time in seconds
 * @param  {Number} end   End time in seconds
 * @return {Object}       Fake TimeRange object
 * @private
 */
var createTimeRange = function createTimeRange(start, end) {
  return {
    length: 1,
    start: (function (_start) {
      function start() {
        return _start.apply(this, arguments);
      }

      start.toString = function () {
        return _start.toString();
      };

      return start;
    })(function () {
      return start;
    }),
    end: (function (_end) {
      function end() {
        return _end.apply(this, arguments);
      }

      end.toString = function () {
        return _end.toString();
      };

      return end;
    })(function () {
      return end;
    })
  };
};

/**
 * Add to local storage (maybe removable)
 * @private
 */
var setLocalStorage = function setLocalStorage(key, value) {
  try {
    // IE was throwing errors referencing the var anywhere without this
    var _localStorage = _window2['default'].localStorage || false;
    if (!_localStorage) {
      return;
    }
    _localStorage[key] = value;
  } catch (e) {
    if (e.code == 22 || e.code == 1014) {
      // Webkit == 22 / Firefox == 1014
      log('LocalStorage Full (VideoJS)', e);
    } else {
      if (e.code == 18) {
        log('LocalStorage not allowed (VideoJS)', e);
      } else {
        log('LocalStorage Error (VideoJS)', e);
      }
    }
  }
};

/**
 * Get absolute version of relative URL. Used to tell flash correct URL.
 * http://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue
 * @param  {String} url URL to make absolute
 * @return {String}     Absolute URL
 * @private
 */
var getAbsoluteURL = function getAbsoluteURL(url) {
  // Check if absolute URL
  if (!url.match(/^https?:\/\//)) {
    // Convert to absolute URL. Flash hosted off-site needs an absolute URL.
    url = createEl('div', {
      innerHTML: '<a href="' + url + '">x</a>'
    }).firstChild.href;
  }

  return url;
};

/**
 * Resolve and parse the elements of a URL
 * @param  {String} url The url to parse
 * @return {Object}     An object of url details
 */
var parseUrl = function parseUrl(url) {
  var props = ['protocol', 'hostname', 'port', 'pathname', 'search', 'hash', 'host'];

  // add the url to an anchor and let the browser parse the URL
  var a = createEl('a', { href: url });

  // IE8 (and 9?) Fix
  // ie8 doesn't parse the URL correctly until the anchor is actually
  // added to the body, and an innerHTML is needed to trigger the parsing
  var addToBody = a.host === '' && a.protocol !== 'file:';
  var div = undefined;
  if (addToBody) {
    div = createEl('div');
    div.innerHTML = '<a href="' + url + '"></a>';
    a = div.firstChild;
    // prevent the div from affecting layout
    div.setAttribute('style', 'display:none; position:absolute;');
    _document2['default'].body.appendChild(div);
  }

  // Copy the specific URL properties to a new object
  // This is also needed for IE8 because the anchor loses its
  // properties when it's removed from the dom
  var details = {};
  for (var i = 0; i < props.length; i++) {
    details[props[i]] = a[props[i]];
  }

  // IE9 adds the port to the host property unlike everyone else. If
  // a port identifier is added for standard ports, strip it.
  if (details.protocol === 'http:') {
    details.host = details.host.replace(/:80$/, '');
  }
  if (details.protocol === 'https:') {
    details.host = details.host.replace(/:443$/, '');
  }

  if (addToBody) {
    _document2['default'].body.removeChild(div);
  }

  return details;
};

/**
 * Log messages to the console and history based on the type of message
 *
 * @param  {String} type The type of message, or `null` for `log`
 * @param  {[type]} args The args to be passed to the log
 * @private
 */
function _logType(type, args) {
  // convert args to an array to get array functions
  var argsArray = Array.prototype.slice.call(args);
  // if there's no console then don't try to output messages
  // they will still be stored in Lib.log.history
  // Was setting these once outside of this function, but containing them
  // in the function makes it easier to test cases where console doesn't exist
  var noop = function noop() {};

  var console = _window2['default'].console || {
    log: noop,
    warn: noop,
    error: noop
  };

  if (type) {
    // add the type to the front of the message
    argsArray.unshift(type.toUpperCase() + ':');
  } else {
    // default to log with no prefix
    type = 'log';
  }

  // add to history
  log.history.push(argsArray);

  // add console prefix after adding to history
  argsArray.unshift('VIDEOJS:');

  // call appropriate log function
  if (console[type].apply) {
    console[type].apply(console, argsArray);
  } else {
    // ie8 doesn't allow error.apply, but it will just join() the array anyway
    console[type](argsArray.join(' '));
  }
}

/**
 * Log plain debug messages
 */
var log = function log() {
  _logType(null, arguments);
};

/**
 * Keep a history of log messages
 * @type {Array}
 */
log.history = [];

/**
 * Log error messages
 */
log.error = function () {
  _logType('error', arguments);
};

/**
 * Log warning messages
 */
log.warn = function () {
  _logType('warn', arguments);
};

// Offset Left
// getBoundingClientRect technique from John Resig http://ejohn.org/blog/getboundingclientrect-is-awesome/
var findPosition = function findPosition(el) {
  var box = undefined;

  if (el.getBoundingClientRect && el.parentNode) {
    box = el.getBoundingClientRect();
  }

  if (!box) {
    return {
      left: 0,
      top: 0
    };
  }

  var docEl = _document2['default'].documentElement;
  var body = _document2['default'].body;

  var clientLeft = docEl.clientLeft || body.clientLeft || 0;
  var scrollLeft = _window2['default'].pageXOffset || body.scrollLeft;
  var left = box.left + scrollLeft - clientLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var scrollTop = _window2['default'].pageYOffset || body.scrollTop;
  var top = box.top + scrollTop - clientTop;

  // Android sometimes returns slightly off decimal values, so need to round
  return {
    left: round(left),
    top: round(top)
  };
};

/**
 * Array functions container
 * @type {Object}
 * @private
 */
var arr = {};

/*
 * Loops through an array and runs a function for each item inside it.
 * @param  {Array}    array       The array
 * @param  {Function} callback    The function to be run for each item
 * @param  {*}        thisArg     The `this` binding of callback
 * @returns {Array}               The array
 * @private
 */
arr.forEach = function (array, callback, thisArg) {
  thisArg = thisArg || this;

  if (obj.isArray(array) && callback instanceof Function) {
    for (var i = 0, len = array.length; i < len; ++i) {
      callback.call(thisArg, array[i], i, array);
    }
  }

  return array;
};

/**
 * Returns the extension of the passed file name. It will return an empty string if you pass an invalid path
 *
 * @param {String}    path    The fileName path like '/path/to/file.mp4'
 * @returns {String}          The extension in lower case or an empty string if no extension could be found.
 */
var getFileExtension = function getFileExtension(path) {
  if (typeof path === 'string') {
    var splitPathRe = /^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i;
    var pathParts = splitPathRe.exec(path);

    if (pathParts) {
      return pathParts.pop().toLowerCase();
    }
  }

  return '';
};

exports.createEl = createEl;
exports.capitalize = capitalize;
exports.obj = obj;
exports.isNaN = isNaN;
exports.bind = bind;
exports.cache = cache;
exports.guid = guid;
exports.expando = expando;
exports.getData = getData;
exports.hasData = hasData;
exports.removeData = removeData;
exports.isEmpty = isEmpty;
exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.TEST_VID = TEST_VID;
exports.USER_AGENT = USER_AGENT;
exports.IS_IPHONE = IS_IPHONE;
exports.IS_IPAD = IS_IPAD;
exports.IS_IPOD = IS_IPOD;
exports.IS_IOS = IS_IOS;
exports.IOS_VERSION = IOS_VERSION;
exports.IS_ANDROID = IS_ANDROID;
exports.ANDROID_VERSION = ANDROID_VERSION;
exports.IS_OLD_ANDROID = IS_OLD_ANDROID;
exports.IS_FIREFOX = IS_FIREFOX;
exports.IS_IE8 = IS_IE8;
exports.IS_CHROME = IS_CHROME;
exports.TOUCH_ENABLED = TOUCH_ENABLED;
exports.BACKGROUND_SIZE_SUPPORTED = BACKGROUND_SIZE_SUPPORTED;
exports.setElementAttributes = setElementAttributes;
exports.getElementAttributes = getElementAttributes;
exports.getComputedDimension = getComputedDimension;
exports.insertFirst = insertFirst;
exports.browser = browser;
exports.el = el;
exports.formatTime = formatTime;
exports.blockTextSelection = blockTextSelection;
exports.unblockTextSelection = unblockTextSelection;
exports.trim = trim;
exports.round = round;
exports.createTimeRange = createTimeRange;
exports.setLocalStorage = setLocalStorage;
exports.getAbsoluteURL = getAbsoluteURL;
exports.parseUrl = parseUrl;
exports.log = log;
exports.findPosition = findPosition;
exports.arr = arr;
exports.getFileExtension = getFileExtension;

},{"global/document":1,"global/window":2}],47:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('./component');

var _Component3 = _interopRequireDefault(_Component2);

/* Loading Spinner
================================================================================ */
/**
 * Loading spinner for waiting events
 * @param {Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */

var LoadingSpinner = (function (_Component) {
  function LoadingSpinner() {
    _classCallCheck(this, LoadingSpinner);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(LoadingSpinner, _Component);

  _createClass(LoadingSpinner, [{
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(LoadingSpinner.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-loading-spinner'
      });
    }
  }]);

  return LoadingSpinner;
})(_Component3['default']);

_Component3['default'].registerComponent('LoadingSpinner', LoadingSpinner);
exports['default'] = LoadingSpinner;
module.exports = exports['default'];

},{"./component":7}],48:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = _dereq_('./lib');

var Lib = _interopRequireWildcard(_import);

/**
 * Custom MediaError to mimic the HTML5 MediaError
 * @param {Number} code The media error code
 */
var MediaError = (function (_MediaError) {
  function MediaError(_x) {
    return _MediaError.apply(this, arguments);
  }

  MediaError.toString = function () {
    return _MediaError.toString();
  };

  return MediaError;
})(function (code) {
  if (typeof code === 'number') {
    this.code = code;
  } else if (typeof code === 'string') {
    // default code is zero, so this is a custom error
    this.message = code;
  } else if (typeof code === 'object') {
    // object
    Lib.obj.merge(this, code);
  }

  if (!this.message) {
    this.message = MediaError.defaultMessages[this.code] || '';
  }
});

/**
 * The error code that refers two one of the defined
 * MediaError types
 * @type {Number}
 */
MediaError.prototype.code = 0;

/**
 * An optional message to be shown with the error.
 * Message is not part of the HTML5 video spec
 * but allows for more informative custom errors.
 * @type {String}
 */
MediaError.prototype.message = '';

/**
 * An optional status code that can be set by plugins
 * to allow even more detail about the error.
 * For example the HLS plugin might provide the specific
 * HTTP status code that was returned when the error
 * occurred, then allowing a custom error overlay
 * to display more information.
 * @type {[type]}
 */
MediaError.prototype.status = null;

MediaError.errorTypes = ['MEDIA_ERR_CUSTOM', // = 0
'MEDIA_ERR_ABORTED', // = 1
'MEDIA_ERR_NETWORK', // = 2
'MEDIA_ERR_DECODE', // = 3
'MEDIA_ERR_SRC_NOT_SUPPORTED', // = 4
'MEDIA_ERR_ENCRYPTED' // = 5
];

MediaError.defaultMessages = {
  1: 'You aborted the video playback',
  2: 'A network error caused the video download to fail part-way.',
  3: 'The video playback was aborted due to a corruption problem or because the video used features your browser did not support.',
  4: 'The video could not be loaded, either because the server or network failed or because the format is not supported.',
  5: 'The video is encrypted and we do not have the keys to decrypt it.'
};

// Add types as properties on MediaError
// e.g. MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED = 4;
for (var errNum = 0; errNum < MediaError.errorTypes.length; errNum++) {
  MediaError[MediaError.errorTypes[errNum]] = errNum;
  // values should be accessible on both the class and instance
  MediaError.prototype[MediaError.errorTypes[errNum]] = errNum;
}

exports['default'] = MediaError;
module.exports = exports['default'];

},{"./lib":46}],49:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Button2 = _dereq_('../button.js');

var _Button3 = _interopRequireDefault(_Button2);

var _Menu = _dereq_('./menu.js');

var _Menu2 = _interopRequireDefault(_Menu);

var _import = _dereq_('../lib.js');

var Lib = _interopRequireWildcard(_import);

/**
 * A button class with a popup menu
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var MenuButton = (function (_Button) {
  function MenuButton(player, options) {
    _classCallCheck(this, MenuButton);

    _get(Object.getPrototypeOf(MenuButton.prototype), 'constructor', this).call(this, player, options);

    this.update();

    this.on('keydown', this.handleKeyPress);
    this.el_.setAttribute('aria-haspopup', true);
    this.el_.setAttribute('role', 'button');
  }

  _inherits(MenuButton, _Button);

  _createClass(MenuButton, [{
    key: 'update',
    value: function update() {
      var menu = this.createMenu();

      if (this.menu) {
        this.removeChild(this.menu);
      }

      this.menu = menu;
      this.addChild(menu);

      /**
       * Track the state of the menu button
       * @type {Boolean}
       * @private
       */
      this.buttonPressed_ = false;

      if (this.items && this.items.length === 0) {
        this.hide();
      } else if (this.items && this.items.length > 1) {
        this.show();
      }
    }
  }, {
    key: 'createMenu',
    value: function createMenu() {
      var menu = new _Menu2['default'](this.player_);

      // Add a title list item to the top
      if (this.options().title) {
        menu.contentEl().appendChild(Lib.createEl('li', {
          className: 'vjs-menu-title',
          innerHTML: Lib.capitalize(this.options().title),
          tabindex: -1
        }));
      }

      this.items = this.createItems();

      if (this.items) {
        // Add menu items to the menu
        for (var i = 0; i < this.items.length; i++) {
          menu.addItem(this.items[i]);
        }
      }

      return menu;
    }
  }, {
    key: 'createItems',

    /**
     * Create the list of menu items. Specific to each subclass.
     */
    value: function createItems() {}
  }, {
    key: 'buildCSSClass',

    /** @inheritDoc */
    value: function buildCSSClass() {
      return '' + this.className + ' vjs-menu-button ' + _get(Object.getPrototypeOf(MenuButton.prototype), 'buildCSSClass', this).call(this);
    }
  }, {
    key: 'handleFocus',

    // Focus - Add keyboard functionality to element
    // This function is not needed anymore. Instead, the keyboard functionality is handled by
    // treating the button as triggering a submenu. When the button is pressed, the submenu
    // appears. Pressing the button again makes the submenu disappear.
    value: function handleFocus() {}
  }, {
    key: 'handleBlur',

    // Can't turn off list display that we turned on with focus, because list would go away.
    value: function handleBlur() {}
  }, {
    key: 'handleClick',
    value: function handleClick() {
      // When you click the button it adds focus, which will show the menu indefinitely.
      // So we'll remove focus when the mouse leaves the button.
      // Focus is needed for tab navigation.
      this.one('mouseout', Lib.bind(this, function () {
        this.menu.unlockShowing();
        this.el_.blur();
      }));
      if (this.buttonPressed_) {
        this.unpressButton();
      } else {
        this.pressButton();
      }
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(event) {

      // Check for space bar (32) or enter (13) keys
      if (event.which == 32 || event.which == 13) {
        if (this.buttonPressed_) {
          this.unpressButton();
        } else {
          this.pressButton();
        }
        event.preventDefault();
        // Check for escape (27) key
      } else if (event.which == 27) {
        if (this.buttonPressed_) {
          this.unpressButton();
        }
        event.preventDefault();
      }
    }
  }, {
    key: 'pressButton',
    value: function pressButton() {
      this.buttonPressed_ = true;
      this.menu.lockShowing();
      this.el_.setAttribute('aria-pressed', true);
      if (this.items && this.items.length > 0) {
        this.items[0].el().focus(); // set the focus to the title of the submenu
      }
    }
  }, {
    key: 'unpressButton',
    value: function unpressButton() {
      this.buttonPressed_ = false;
      this.menu.unlockShowing();
      this.el_.setAttribute('aria-pressed', false);
    }
  }]);

  return MenuButton;
})(_Button3['default']);

_Button3['default'].registerComponent('MenuButton', MenuButton);
exports['default'] = MenuButton;
module.exports = exports['default'];

},{"../button.js":6,"../lib.js":46,"./menu.js":51}],50:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Button2 = _dereq_('../button.js');

var _Button3 = _interopRequireDefault(_Button2);

var _import = _dereq_('../lib.js');

var Lib = _interopRequireWildcard(_import);

/**
 * The component for a menu item. `<li>`
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */

var MenuItem = (function (_Button) {
  function MenuItem(player, options) {
    _classCallCheck(this, MenuItem);

    _get(Object.getPrototypeOf(MenuItem.prototype), 'constructor', this).call(this, player, options);
    this.selected(options.selected);
  }

  _inherits(MenuItem, _Button);

  _createClass(MenuItem, [{
    key: 'createEl',

    /** @inheritDoc */
    value: function createEl(type, props) {
      return _get(Object.getPrototypeOf(MenuItem.prototype), 'createEl', this).call(this, 'li', Lib.obj.merge({
        className: 'vjs-menu-item',
        innerHTML: this.localize(this.options_.label)
      }, props));
    }
  }, {
    key: 'handleClick',

    /**
     * Handle a click on the menu item, and set it to selected
     */
    value: function handleClick() {
      this.selected(true);
    }
  }, {
    key: 'selected',

    /**
     * Set this menu item as selected or not
     * @param  {Boolean} selected
     */
    value: (function (_selected) {
      function selected(_x) {
        return _selected.apply(this, arguments);
      }

      selected.toString = function () {
        return _selected.toString();
      };

      return selected;
    })(function (selected) {
      if (selected) {
        this.addClass('vjs-selected');
        this.el_.setAttribute('aria-selected', true);
      } else {
        this.removeClass('vjs-selected');
        this.el_.setAttribute('aria-selected', false);
      }
    })
  }]);

  return MenuItem;
})(_Button3['default']);

_Button3['default'].registerComponent('MenuItem', MenuItem);
exports['default'] = MenuItem;
module.exports = exports['default'];

},{"../button.js":6,"../lib.js":46}],51:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('../component.js');

var _Component3 = _interopRequireDefault(_Component2);

var _import = _dereq_('../lib.js');

var Lib = _interopRequireWildcard(_import);

var _import2 = _dereq_('../events.js');

var Events = _interopRequireWildcard(_import2);

/* Menu
================================================================================ */
/**
 * The Menu component is used to build pop up menus, including subtitle and
 * captions selection menus.
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */

var Menu = (function (_Component) {
  function Menu() {
    _classCallCheck(this, Menu);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(Menu, _Component);

  _createClass(Menu, [{
    key: 'addItem',

    /**
     * Add a menu item to the menu
     * @param {Object|String} component Component or component type to add
     */
    value: function addItem(component) {
      this.addChild(component);
      component.on('click', Lib.bind(this, function () {
        this.unlockShowing();
      }));
    }
  }, {
    key: 'createEl',
    value: function createEl() {
      var contentElType = this.options().contentElType || 'ul';
      this.contentEl_ = Lib.createEl(contentElType, {
        className: 'vjs-menu-content'
      });
      var el = _get(Object.getPrototypeOf(Menu.prototype), 'createEl', this).call(this, 'div', {
        append: this.contentEl_,
        className: 'vjs-menu'
      });
      el.appendChild(this.contentEl_);

      // Prevent clicks from bubbling up. Needed for Menu Buttons,
      // where a click on the parent is significant
      Events.on(el, 'click', function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
      });

      return el;
    }
  }]);

  return Menu;
})(_Component3['default']);

_Component3['default'].registerComponent('Menu', Menu);
exports['default'] = Menu;
module.exports = exports['default'];

},{"../component.js":7,"../events.js":43,"../lib.js":46}],52:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

var _window = _dereq_('global/window');

var _window2 = _interopRequireDefault(_window);

var navigator = _window2['default'].navigator;

/**
 * Global Player instance options, surfaced from Player.prototype.options_
 * options = Player.prototype.options_
 * All options should use string keys so they avoid
 * renaming by closure compiler
 * @type {Object}
 */
exports['default'] = {
  // Default order of fallback technology
  techOrder: ['html5', 'flash'],
  // techOrder: ['flash','html5'],

  html5: {},
  flash: {},

  // Default of web browser is 300x150. Should rely on source width/height.
  width: 300,
  height: 150,
  // defaultVolume: 0.85,
  defaultVolume: 0, // The freakin seaguls are driving me crazy!

  // default inactivity timeout
  inactivityTimeout: 2000,

  // default playback rates
  playbackRates: [],
  // Add playback rate selection by adding rates
  // 'playbackRates': [0.5, 1, 1.5, 2],

  // Included control sets
  children: {
    mediaLoader: {},
    posterImage: {},
    textTrackDisplay: {},
    loadingSpinner: {},
    bigPlayButton: {},
    controlBar: {},
    errorDisplay: {},
    textTrackSettings: {}
  },

  language: _document2['default'].getElementsByTagName('html')[0].getAttribute('lang') || navigator.languages && navigator.languages[0] || navigator.userLanguage || navigator.language || 'en',

  // locales and their language translations
  languages: {},

  // Default message to show when a video cannot be played.
  notSupportedMessage: 'No compatible source was found for this video.'
};
module.exports = exports['default'];

},{"global/document":1,"global/window":2}],53:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('./component.js');

var _Component3 = _interopRequireDefault(_Component2);

var _import = _dereq_('./lib.js');

var Lib = _interopRequireWildcard(_import);

var _import2 = _dereq_('./events.js');

var Events = _interopRequireWildcard(_import2);

var _FullscreenApi = _dereq_('./fullscreen-api.js');

var _FullscreenApi2 = _interopRequireDefault(_FullscreenApi);

var _MediaError = _dereq_('./media-error.js');

var _MediaError2 = _interopRequireDefault(_MediaError);

var _Options = _dereq_('./options.js');

var _Options2 = _interopRequireDefault(_Options);

var _safeParseTuple = _dereq_('safe-json-parse/tuple');

var _safeParseTuple2 = _interopRequireDefault(_safeParseTuple);

var _window = _dereq_('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

// Include required child components

var _MediaLoader = _dereq_('./tech/loader.js');

var _MediaLoader2 = _interopRequireDefault(_MediaLoader);

var _Poster = _dereq_('./poster-image.js');

var _Poster2 = _interopRequireDefault(_Poster);

var _TextTrackDisplay = _dereq_('./tracks/text-track-display.js');

var _TextTrackDisplay2 = _interopRequireDefault(_TextTrackDisplay);

var _LoadingSpinner = _dereq_('./loading-spinner.js');

var _LoadingSpinner2 = _interopRequireDefault(_LoadingSpinner);

var _BigPlayButton = _dereq_('./big-play-button.js');

var _BigPlayButton2 = _interopRequireDefault(_BigPlayButton);

var _controlBar = _dereq_('./control-bar/control-bar.js');

var _controlBar2 = _interopRequireDefault(_controlBar);

var _ErrorDisplay = _dereq_('./error-display.js');

var _ErrorDisplay2 = _interopRequireDefault(_ErrorDisplay);

var _TextTrackSettings = _dereq_('./tracks/text-track-settings.js');

var _TextTrackSettings2 = _interopRequireDefault(_TextTrackSettings);

// Require html5 for disposing the original video tag

var _Html5 = _dereq_('./tech/html5.js');

var _Html52 = _interopRequireDefault(_Html5);

/**
 * An instance of the `Player` class is created when any of the Video.js setup methods are used to initialize a video.
 *
 * ```js
 * var myPlayer = videojs('example_video_1');
 * ```
 *
 * In the following example, the `data-setup` attribute tells the Video.js library to create a player instance when the library is ready.
 *
 * ```html
 * <video id="example_video_1" data-setup='{}' controls>
 *   <source src="my-source.mp4" type="video/mp4">
 * </video>
 * ```
 *
 * After an instance has been created it can be accessed globally using `Video('example_video_1')`.
 *
 * @class
 * @extends Component
 */

var Player = (function (_Component) {

  /**
   * player's constructor function
   *
   * @constructs
   * @method init
   * @param {Element} tag        The original video tag used for configuring options
   * @param {Object=} options    Player options
   * @param {Function=} ready    Ready callback function
   */

  function Player(tag, options, ready) {
    _classCallCheck(this, Player);

    // Make sure tag ID exists
    tag.id = tag.id || 'vjs_video_' + Lib.guid++;

    // Set Options
    // The options argument overrides options set in the video tag
    // which overrides globally set options.
    // This latter part coincides with the load order
    // (tag must exist before Player)
    options = Lib.obj.merge(Player.getTagSettings(tag), options);

    // Delay the initialization of children because we need to set up
    // player properties first, and can't use `this` before `super()`
    options.initChildren = false;

    // Same with creating the element
    options.createEl = false;

    // we don't want the player to report touch activity on itself
    // see enableTouchActivity in Component
    options.reportTouchActivity = false;

    // Run base component initializing with new options
    _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this, null, options, ready);

    // if the global option object was accidentally blown away by
    // someone, bail early with an informative error
    if (!this.options_ || !this.options_.techOrder || !this.options_.techOrder.length) {
      throw new Error('No techOrder specified. Did you overwrite ' + 'videojs.options instead of just changing the ' + 'properties you want to override?');
    }

    this.tag = tag; // Store the original tag used to set options

    // Store the tag attributes used to restore html5 element
    this.tagAttributes = tag && Lib.getElementAttributes(tag);

    // Update Current Language
    this.language_ = options.language || _Options2['default'].language;

    // Update Supported Languages
    this.languages_ = options.languages || _Options2['default'].languages;

    // Cache for video property values.
    this.cache_ = {};

    // Set poster
    this.poster_ = options.poster || '';

    // Set controls
    this.controls_ = !!options.controls;
    // Original tag settings stored in options
    // now remove immediately so native controls don't flash.
    // May be turned back on by HTML5 tech if nativeControlsForTouch is true
    tag.controls = false;

    /**
    * Store the internal state of scrubbing
    * @private
    * @return {Boolean} True if the user is scrubbing
    */
    this.scrubbing_ = false;

    this.el_ = this.createEl();

    // Load plugins
    if (options.plugins) {
      Lib.obj.each(options.plugins, function (key, val) {
        this[key](val);
      }, this);
    }

    this.initChildren();

    // Set isAudio based on whether or not an audio tag was used
    this.isAudio(tag.nodeName.toLowerCase() === 'audio');

    // Update controls className. Can't do this when the controls are initially
    // set because the element doesn't exist yet.
    if (this.controls()) {
      this.addClass('vjs-controls-enabled');
    } else {
      this.addClass('vjs-controls-disabled');
    }

    if (this.isAudio()) {
      this.addClass('vjs-audio');
    }

    if (this.flexNotSupported_()) {
      this.addClass('vjs-no-flex');
    }

    // TODO: Make this smarter. Toggle user state between touching/mousing
    // using events, since devices can have both touch and mouse events.
    // if (Lib.TOUCH_ENABLED) {
    //   this.addClass('vjs-touch-enabled');
    // }

    // Make player easily findable by ID
    Player.players[this.id_] = this;

    // When the player is first initialized, trigger activity so components
    // like the control bar show themselves if needed
    this.userActive_ = true;
    this.reportUserActivity();
    this.listenForUserActivity();
  }

  _inherits(Player, _Component);

  _createClass(Player, [{
    key: 'dispose',

    /**
     * Destroys the video player and does any necessary cleanup
     *
     *     myPlayer.dispose();
     *
     * This is especially helpful if you are dynamically adding and removing videos
     * to/from the DOM.
     */
    value: function dispose() {
      this.trigger('dispose');
      // prevent dispose from being called twice
      this.off('dispose');

      // Kill reference to this player
      Player.players[this.id_] = null;
      if (this.tag && this.tag.player) {
        this.tag.player = null;
      }
      if (this.el_ && this.el_.player) {
        this.el_.player = null;
      }

      if (this.tech) {
        this.tech.dispose();
      }

      _get(Object.getPrototypeOf(Player.prototype), 'dispose', this).call(this);
    }
  }, {
    key: 'createEl',
    value: function createEl() {
      var el = this.el_ = _get(Object.getPrototypeOf(Player.prototype), 'createEl', this).call(this, 'div');
      var tag = this.tag;

      // Remove width/height attrs from tag so CSS can make it 100% width/height
      tag.removeAttribute('width');
      tag.removeAttribute('height');

      // Copy over all the attributes from the tag, including ID and class
      // ID will now reference player box, not the video tag
      var attrs = Lib.getElementAttributes(tag);
      Lib.obj.each(attrs, function (attr) {
        // workaround so we don't totally break IE7
        // http://stackoverflow.com/questions/3653444/css-styles-not-applied-on-dynamic-elements-in-internet-explorer-7
        if (attr == 'class') {
          el.className = attrs[attr];
        } else {
          el.setAttribute(attr, attrs[attr]);
        }
      });

      // Update tag id/class for use as HTML5 playback tech
      // Might think we should do this after embedding in container so .vjs-tech class
      // doesn't flash 100% width/height, but class only applies with .video-js parent
      tag.id += '_html5_api';
      tag.className = 'vjs-tech';

      // Make player findable on elements
      tag.player = el.player = this;
      // Default state of video is paused
      this.addClass('vjs-paused');

      // Make box use width/height of tag, or rely on default implementation
      // Enforce with CSS since width/height attrs don't work on divs
      this.width(this.options_.width, true); // (true) Skip resize listener on load
      this.height(this.options_.height, true);

      // Lib.insertFirst seems to cause the networkState to flicker from 3 to 2, so
      // keep track of the original for later so we can know if the source originally failed
      tag.initNetworkState_ = tag.networkState;

      // Wrap video tag in div (el/box) container
      if (tag.parentNode) {
        tag.parentNode.insertBefore(el, tag);
      }
      Lib.insertFirst(tag, el); // Breaks iPhone, fixed in HTML5 setup.

      // The event listeners need to be added before the children are added
      // in the component init because the tech (loaded with mediaLoader) may
      // fire events, like loadstart, that these events need to capture.
      // Long term it might be better to expose a way to do this in component.init
      // like component.initEventListeners() that runs between el creation and
      // adding children
      this.el_ = el;
      this.on('loadstart', this.handleLoadStart);
      this.on('waiting', this.handleWaiting);
      this.on(['canplay', 'canplaythrough', 'playing', 'ended'], this.handleWaitEnd);
      this.on('seeking', this.handleSeeking);
      this.on('seeked', this.handleSeeked);
      this.on('ended', this.handleEnded);
      this.on('play', this.handlePlay);
      this.on('firstplay', this.handleFirstPlay);
      this.on('pause', this.handlePause);
      this.on('progress', this.handleProgress);
      this.on('durationchange', this.handleDurationChange);
      this.on('fullscreenchange', this.handleFullscreenChange);

      return el;
    }
  }, {
    key: 'loadTech',

    /**
     * Load the Media Playback Technology (tech)
     * Load/Create an instance of playback technology including element and API methods
     * And append playback element in player div.
     */
    value: function loadTech(techName, source) {

      // Pause and remove current playback technology
      if (this.tech) {
        this.unloadTech();
      }

      // get rid of the HTML5 video tag as soon as we are using another tech
      if (techName !== 'Html5' && this.tag) {
        _Component3['default'].getComponent('Html5').disposeMediaElement(this.tag);
        this.tag = null;
      }

      this.techName = techName;

      // Turn off API access because we're loading a new tech that might load asynchronously
      this.isReady_ = false;

      var techReady = function techReady() {
        this.player_.triggerReady();
      };

      // Grab tech-specific options from player options and add source and parent element to use.
      var techOptions = Lib.obj.merge({ source: source, parentEl: this.el_ }, this.options_[techName.toLowerCase()]);

      if (source) {
        this.currentType_ = source.type;
        if (source.src == this.cache_.src && this.cache_.currentTime > 0) {
          techOptions.startTime = this.cache_.currentTime;
        }

        this.cache_.src = source.src;
      }

      // Initialize tech instance
      var techComponent = _Component3['default'].getComponent(techName);
      this.tech = new techComponent(this, techOptions);

      this.tech.ready(techReady);
    }
  }, {
    key: 'unloadTech',
    value: function unloadTech() {
      this.isReady_ = false;

      this.tech.dispose();

      this.tech = false;
    }
  }, {
    key: 'handleLoadStart',

    /**
     * Fired when the user agent begins looking for media data
     * @event loadstart
     */
    value: function handleLoadStart() {
      // TODO: Update to use `emptied` event instead. See #1277.

      this.removeClass('vjs-ended');

      // reset the error state
      this.error(null);

      // If it's already playing we want to trigger a firstplay event now.
      // The firstplay event relies on both the play and loadstart events
      // which can happen in any order for a new source
      if (!this.paused()) {
        this.trigger('firstplay');
      } else {
        // reset the hasStarted state
        this.hasStarted(false);
      }
    }
  }, {
    key: 'hasStarted',
    value: (function (_hasStarted) {
      function hasStarted(_x) {
        return _hasStarted.apply(this, arguments);
      }

      hasStarted.toString = function () {
        return _hasStarted.toString();
      };

      return hasStarted;
    })(function (hasStarted) {
      if (hasStarted !== undefined) {
        // only update if this is a new value
        if (this.hasStarted_ !== hasStarted) {
          this.hasStarted_ = hasStarted;
          if (hasStarted) {
            this.addClass('vjs-has-started');
            // trigger the firstplay event if this newly has played
            this.trigger('firstplay');
          } else {
            this.removeClass('vjs-has-started');
          }
        }
        return this;
      }
      return !!this.hasStarted_;
    })
  }, {
    key: 'handlePlay',

    /**
     * Fired whenever the media begins or resumes playback
     * @event play
     */
    value: function handlePlay() {
      this.removeClass('vjs-ended');
      this.removeClass('vjs-paused');
      this.addClass('vjs-playing');

      // hide the poster when the user hits play
      // https://html.spec.whatwg.org/multipage/embedded-content.html#dom-media-play
      this.hasStarted(true);
    }
  }, {
    key: 'handleWaiting',

    /**
     * Fired whenever the media begins waiting
     * @event waiting
     */
    value: function handleWaiting() {
      this.addClass('vjs-waiting');
    }
  }, {
    key: 'handleWaitEnd',

    /**
     * A handler for events that signal that waiting has ended
     * which is not consistent between browsers. See #1351
     * @private
     */
    value: function handleWaitEnd() {
      this.removeClass('vjs-waiting');
    }
  }, {
    key: 'handleSeeking',

    /**
     * Fired whenever the player is jumping to a new time
     * @event seeking
     */
    value: function handleSeeking() {
      this.addClass('vjs-seeking');
    }
  }, {
    key: 'handleSeeked',

    /**
     * Fired when the player has finished jumping to a new time
     * @event seeked
     */
    value: function handleSeeked() {
      this.removeClass('vjs-seeking');
    }
  }, {
    key: 'handleFirstPlay',

    /**
     * Fired the first time a video is played
     *
     * Not part of the HLS spec, and we're not sure if this is the best
     * implementation yet, so use sparingly. If you don't have a reason to
     * prevent playback, use `myPlayer.one('play');` instead.
     *
     * @event firstplay
     */
    value: function handleFirstPlay() {
      //If the first starttime attribute is specified
      //then we will start at the given offset in seconds
      if (this.options_.starttime) {
        this.currentTime(this.options_.starttime);
      }

      this.addClass('vjs-has-started');
    }
  }, {
    key: 'handlePause',

    /**
     * Fired whenever the media has been paused
     * @event pause
     */
    value: function handlePause() {
      this.removeClass('vjs-playing');
      this.addClass('vjs-paused');
    }
  }, {
    key: 'handleProgress',

    /**
     * Fired while the user agent is downloading media data
     * @event progress
     */
    value: function handleProgress() {
      // Add custom event for when source is finished downloading.
      if (this.bufferedPercent() == 1) {
        this.trigger('loadedalldata');
      }
    }
  }, {
    key: 'handleEnded',

    /**
     * Fired when the end of the media resource is reached (currentTime == duration)
     * @event ended
     */
    value: function handleEnded() {
      this.addClass('vjs-ended');
      if (this.options_.loop) {
        this.currentTime(0);
        this.play();
      } else if (!this.paused()) {
        this.pause();
      }
    }
  }, {
    key: 'handleDurationChange',

    /**
     * Fired when the duration of the media resource is first known or changed
     * @event durationchange
     */
    value: function handleDurationChange() {
      // Allows for caching value instead of asking player each time.
      // We need to get the techGet response and check for a value so we don't
      // accidentally cause the stack to blow up.
      var duration = this.techGet('duration');
      if (duration) {
        if (duration < 0) {
          duration = Infinity;
        }
        this.duration(duration);
        // Determine if the stream is live and propagate styles down to UI.
        if (duration === Infinity) {
          this.addClass('vjs-live');
        } else {
          this.removeClass('vjs-live');
        }
      }
    }
  }, {
    key: 'handleFullscreenChange',

    /**
     * Fired when the player switches in or out of fullscreen mode
     * @event fullscreenchange
     */
    value: function handleFullscreenChange() {
      if (this.isFullscreen()) {
        this.addClass('vjs-fullscreen');
      } else {
        this.removeClass('vjs-fullscreen');
      }
    }
  }, {
    key: 'getCache',

    /**
     * Object for cached values.
     */
    value: function getCache() {
      return this.cache_;
    }
  }, {
    key: 'techCall',

    // Pass values to the playback tech
    value: function techCall(method, arg) {
      // If it's not ready yet, call method when it is
      if (this.tech && !this.tech.isReady_) {
        this.tech.ready(function () {
          this[method](arg);
        });

        // Otherwise call method now
      } else {
        try {
          this.tech[method](arg);
        } catch (e) {
          Lib.log(e);
          throw e;
        }
      }
    }
  }, {
    key: 'techGet',

    // Get calls can't wait for the tech, and sometimes don't need to.
    value: function techGet(method) {
      if (this.tech && this.tech.isReady_) {

        // Flash likes to die and reload when you hide or reposition it.
        // In these cases the object methods go away and we get errors.
        // When that happens we'll catch the errors and inform tech that it's not ready any more.
        try {
          return this.tech[method]();
        } catch (e) {
          // When building additional tech libs, an expected method may not be defined yet
          if (this.tech[method] === undefined) {
            Lib.log('Video.js: ' + method + ' method not defined for ' + this.techName + ' playback technology.', e);
          } else {
            // When a method isn't available on the object it throws a TypeError
            if (e.name == 'TypeError') {
              Lib.log('Video.js: ' + method + ' unavailable on ' + this.techName + ' playback technology element.', e);
              this.tech.isReady_ = false;
            } else {
              Lib.log(e);
            }
          }
          throw e;
        }
      }

      return;
    }
  }, {
    key: 'play',

    /**
     * start media playback
     *
     *     myPlayer.play();
     *
     * @return {Player} self
     */
    value: function play() {
      this.techCall('play');
      return this;
    }
  }, {
    key: 'pause',

    /**
     * Pause the video playback
     *
     *     myPlayer.pause();
     *
     * @return {Player} self
     */
    value: function pause() {
      this.techCall('pause');
      return this;
    }
  }, {
    key: 'paused',

    /**
     * Check if the player is paused
     *
     *     var isPaused = myPlayer.paused();
     *     var isPlaying = !myPlayer.paused();
     *
     * @return {Boolean} false if the media is currently playing, or true otherwise
     */
    value: function paused() {
      // The initial state of paused should be true (in Safari it's actually false)
      return this.techGet('paused') === false ? false : true;
    }
  }, {
    key: 'scrubbing',

    /**
    * Returns whether or not the user is "scrubbing". Scrubbing is when the user
    * has clicked the progress bar handle and is dragging it along the progress bar.
    * @param  {Boolean} isScrubbing   True/false the user is scrubbing
    * @return {Boolean}               The scrubbing status when getting
    * @return {Object}                The player when setting
    */
    value: function scrubbing(isScrubbing) {
      if (isScrubbing !== undefined) {
        this.scrubbing_ = !!isScrubbing;

        if (isScrubbing) {
          this.addClass('vjs-scrubbing');
        } else {
          this.removeClass('vjs-scrubbing');
        }

        return this;
      }

      return this.scrubbing_;
    }
  }, {
    key: 'currentTime',

    /**
     * Get or set the current time (in seconds)
     *
     *     // get
     *     var whereYouAt = myPlayer.currentTime();
     *
     *     // set
     *     myPlayer.currentTime(120); // 2 minutes into the video
     *
     * @param  {Number|String=} seconds The time to seek to
     * @return {Number}        The time in seconds, when not setting
     * @return {Player}    self, when the current time is set
     */
    value: function currentTime(seconds) {
      if (seconds !== undefined) {

        this.techCall('setCurrentTime', seconds);

        return this;
      }

      // cache last currentTime and return. default to 0 seconds
      //
      // Caching the currentTime is meant to prevent a massive amount of reads on the tech's
      // currentTime when scrubbing, but may not provide much performance benefit afterall.
      // Should be tested. Also something has to read the actual current time or the cache will
      // never get updated.
      return this.cache_.currentTime = this.techGet('currentTime') || 0;
    }
  }, {
    key: 'duration',

    /**
     * Get the length in time of the video in seconds
     *
     *     var lengthOfVideo = myPlayer.duration();
     *
     * **NOTE**: The video must have started loading before the duration can be
     * known, and in the case of Flash, may not be known until the video starts
     * playing.
     *
     * @return {Number} The duration of the video in seconds
     */
    value: function duration(seconds) {
      if (seconds !== undefined) {

        // cache the last set value for optimized scrubbing (esp. Flash)
        this.cache_.duration = parseFloat(seconds);

        return this;
      }

      if (this.cache_.duration === undefined) {
        this.handleDurationChange();
      }

      return this.cache_.duration || 0;
    }
  }, {
    key: 'remainingTime',

    /**
     * Calculates how much time is left.
     *
     *     var timeLeft = myPlayer.remainingTime();
     *
     * Not a native video element function, but useful
     * @return {Number} The time remaining in seconds
     */
    value: function remainingTime() {
      return this.duration() - this.currentTime();
    }
  }, {
    key: 'buffered',

    // http://dev.w3.org/html5/spec/video.html#dom-media-buffered
    // Buffered returns a timerange object.
    // Kind of like an array of portions of the video that have been downloaded.

    /**
     * Get a TimeRange object with the times of the video that have been downloaded
     *
     * If you just want the percent of the video that's been downloaded,
     * use bufferedPercent.
     *
     *     // Number of different ranges of time have been buffered. Usually 1.
     *     numberOfRanges = bufferedTimeRange.length,
     *
     *     // Time in seconds when the first range starts. Usually 0.
     *     firstRangeStart = bufferedTimeRange.start(0),
     *
     *     // Time in seconds when the first range ends
     *     firstRangeEnd = bufferedTimeRange.end(0),
     *
     *     // Length in seconds of the first time range
     *     firstRangeLength = firstRangeEnd - firstRangeStart;
     *
     * @return {Object} A mock TimeRange object (following HTML spec)
     */
    value: (function (_buffered) {
      function buffered() {
        return _buffered.apply(this, arguments);
      }

      buffered.toString = function () {
        return _buffered.toString();
      };

      return buffered;
    })(function () {
      var buffered = this.techGet('buffered');

      if (!buffered || !buffered.length) {
        buffered = Lib.createTimeRange(0, 0);
      }

      return buffered;
    })
  }, {
    key: 'bufferedPercent',

    /**
     * Get the percent (as a decimal) of the video that's been downloaded
     *
     *     var howMuchIsDownloaded = myPlayer.bufferedPercent();
     *
     * 0 means none, 1 means all.
     * (This method isn't in the HTML5 spec, but it's very convenient)
     *
     * @return {Number} A decimal between 0 and 1 representing the percent
     */
    value: function bufferedPercent() {
      var duration = this.duration(),
          buffered = this.buffered(),
          bufferedDuration = 0,
          start,
          end;

      if (!duration) {
        return 0;
      }

      for (var i = 0; i < buffered.length; i++) {
        start = buffered.start(i);
        end = buffered.end(i);

        // buffered end can be bigger than duration by a very small fraction
        if (end > duration) {
          end = duration;
        }

        bufferedDuration += end - start;
      }

      return bufferedDuration / duration;
    }
  }, {
    key: 'bufferedEnd',

    /**
     * Get the ending time of the last buffered time range
     *
     * This is used in the progress bar to encapsulate all time ranges.
     * @return {Number} The end of the last buffered time range
     */
    value: function bufferedEnd() {
      var buffered = this.buffered(),
          duration = this.duration(),
          end = buffered.end(buffered.length - 1);

      if (end > duration) {
        end = duration;
      }

      return end;
    }
  }, {
    key: 'volume',

    /**
     * Get or set the current volume of the media
     *
     *     // get
     *     var howLoudIsIt = myPlayer.volume();
     *
     *     // set
     *     myPlayer.volume(0.5); // Set volume to half
     *
     * 0 is off (muted), 1.0 is all the way up, 0.5 is half way.
     *
     * @param  {Number} percentAsDecimal The new volume as a decimal percent
     * @return {Number}                  The current volume, when getting
     * @return {Player}              self, when setting
     */
    value: function volume(percentAsDecimal) {
      var vol = undefined;

      if (percentAsDecimal !== undefined) {
        vol = Math.max(0, Math.min(1, parseFloat(percentAsDecimal))); // Force value to between 0 and 1
        this.cache_.volume = vol;
        this.techCall('setVolume', vol);
        Lib.setLocalStorage('volume', vol);
        return this;
      }

      // Default to 1 when returning current volume.
      vol = parseFloat(this.techGet('volume'));
      return isNaN(vol) ? 1 : vol;
    }
  }, {
    key: 'muted',

    /**
     * Get the current muted state, or turn mute on or off
     *
     *     // get
     *     var isVolumeMuted = myPlayer.muted();
     *
     *     // set
     *     myPlayer.muted(true); // mute the volume
     *
     * @param  {Boolean=} muted True to mute, false to unmute
     * @return {Boolean} True if mute is on, false if not, when getting
     * @return {Player} self, when setting mute
     */
    value: (function (_muted) {
      function muted(_x2) {
        return _muted.apply(this, arguments);
      }

      muted.toString = function () {
        return _muted.toString();
      };

      return muted;
    })(function (muted) {
      if (muted !== undefined) {
        this.techCall('setMuted', muted);
        return this;
      }
      return this.techGet('muted') || false; // Default to false
    })
  }, {
    key: 'supportsFullScreen',

    // Check if current tech can support native fullscreen
    // (e.g. with built in controls like iOS, so not our flash swf)
    value: function supportsFullScreen() {
      return this.techGet('supportsFullScreen') || false;
    }
  }, {
    key: 'isFullscreen',

    /**
     * Check if the player is in fullscreen mode
     *
     *     // get
     *     var fullscreenOrNot = myPlayer.isFullscreen();
     *
     *     // set
     *     myPlayer.isFullscreen(true); // tell the player it's in fullscreen
     *
     * NOTE: As of the latest HTML5 spec, isFullscreen is no longer an official
     * property and instead document.fullscreenElement is used. But isFullscreen is
     * still a valuable property for internal player workings.
     *
     * @param  {Boolean=} isFS Update the player's fullscreen state
     * @return {Boolean} true if fullscreen, false if not
     * @return {Player} self, when setting
     */
    value: function isFullscreen(isFS) {
      if (isFS !== undefined) {
        this.isFullscreen_ = !!isFS;
        return this;
      }
      return !!this.isFullscreen_;
    }
  }, {
    key: 'isFullScreen',

    /**
     * Old naming for isFullscreen()
     * @deprecated for lowercase 's' version
     */
    value: function isFullScreen(isFS) {
      Lib.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")');
      return this.isFullscreen(isFS);
    }
  }, {
    key: 'requestFullscreen',

    /**
     * Increase the size of the video to full screen
     *
     *     myPlayer.requestFullscreen();
     *
     * In some browsers, full screen is not supported natively, so it enters
     * "full window mode", where the video fills the browser window.
     * In browsers and devices that support native full screen, sometimes the
     * browser's default controls will be shown, and not the Video.js custom skin.
     * This includes most mobile devices (iOS, Android) and older versions of
     * Safari.
     *
     * @return {Player} self
     */
    value: function requestFullscreen() {
      var fsApi = _FullscreenApi2['default'];

      this.isFullscreen(true);

      if (fsApi) {
        // the browser supports going fullscreen at the element level so we can
        // take the controls fullscreen as well as the video

        // Trigger fullscreenchange event after change
        // We have to specifically add this each time, and remove
        // when canceling fullscreen. Otherwise if there's multiple
        // players on a page, they would all be reacting to the same fullscreen
        // events
        Events.on(_document2['default'], fsApi.fullscreenchange, Lib.bind(this, function documentFullscreenChange(e) {
          this.isFullscreen(_document2['default'][fsApi.fullscreenElement]);

          // If cancelling fullscreen, remove event listener.
          if (this.isFullscreen() === false) {
            Events.off(_document2['default'], fsApi.fullscreenchange, documentFullscreenChange);
          }

          this.trigger('fullscreenchange');
        }));

        this.el_[fsApi.requestFullscreen]();
      } else if (this.tech.supportsFullScreen()) {
        // we can't take the video.js controls fullscreen but we can go fullscreen
        // with native controls
        this.techCall('enterFullScreen');
      } else {
        // fullscreen isn't supported so we'll just stretch the video element to
        // fill the viewport
        this.enterFullWindow();
        this.trigger('fullscreenchange');
      }

      return this;
    }
  }, {
    key: 'requestFullScreen',

    /**
     * Old naming for requestFullscreen
     * @deprecated for lower case 's' version
     */
    value: function requestFullScreen() {
      Lib.log.warn('player.requestFullScreen() has been deprecated, use player.requestFullscreen() with a lowercase "s")');
      return this.requestFullscreen();
    }
  }, {
    key: 'exitFullscreen',

    /**
     * Return the video to its normal size after having been in full screen mode
     *
     *     myPlayer.exitFullscreen();
     *
     * @return {Player} self
     */
    value: function exitFullscreen() {
      var fsApi = _FullscreenApi2['default'];
      this.isFullscreen(false);

      // Check for browser element fullscreen support
      if (fsApi) {
        _document2['default'][fsApi.exitFullscreen]();
      } else if (this.tech.supportsFullScreen()) {
        this.techCall('exitFullScreen');
      } else {
        this.exitFullWindow();
        this.trigger('fullscreenchange');
      }

      return this;
    }
  }, {
    key: 'cancelFullScreen',

    /**
     * Old naming for exitFullscreen
     * @deprecated for exitFullscreen
     */
    value: function cancelFullScreen() {
      Lib.log.warn('player.cancelFullScreen() has been deprecated, use player.exitFullscreen()');
      return this.exitFullscreen();
    }
  }, {
    key: 'enterFullWindow',

    // When fullscreen isn't supported we can stretch the video container to as wide as the browser will let us.
    value: function enterFullWindow() {
      this.isFullWindow = true;

      // Storing original doc overflow value to return to when fullscreen is off
      this.docOrigOverflow = _document2['default'].documentElement.style.overflow;

      // Add listener for esc key to exit fullscreen
      Events.on(_document2['default'], 'keydown', Lib.bind(this, this.fullWindowOnEscKey));

      // Hide any scroll bars
      _document2['default'].documentElement.style.overflow = 'hidden';

      // Apply fullscreen styles
      Lib.addClass(_document2['default'].body, 'vjs-full-window');

      this.trigger('enterFullWindow');
    }
  }, {
    key: 'fullWindowOnEscKey',
    value: function fullWindowOnEscKey(event) {
      if (event.keyCode === 27) {
        if (this.isFullscreen() === true) {
          this.exitFullscreen();
        } else {
          this.exitFullWindow();
        }
      }
    }
  }, {
    key: 'exitFullWindow',
    value: function exitFullWindow() {
      this.isFullWindow = false;
      Events.off(_document2['default'], 'keydown', this.fullWindowOnEscKey);

      // Unhide scroll bars.
      _document2['default'].documentElement.style.overflow = this.docOrigOverflow;

      // Remove fullscreen styles
      Lib.removeClass(_document2['default'].body, 'vjs-full-window');

      // Resize the box, controller, and poster to original sizes
      // this.positionAll();
      this.trigger('exitFullWindow');
    }
  }, {
    key: 'selectSource',
    value: function selectSource(sources) {
      // Loop through each playback technology in the options order
      for (var i = 0, j = this.options_.techOrder; i < j.length; i++) {
        var techName = Lib.capitalize(j[i]);
        var tech = _Component3['default'].getComponent(techName);

        // Check if the current tech is defined before continuing
        if (!tech) {
          Lib.log.error('The "' + techName + '" tech is undefined. Skipped browser support check for that tech.');
          continue;
        }

        // Check if the browser supports this technology
        if (tech.isSupported()) {
          // Loop through each source object
          for (var a = 0, b = sources; a < b.length; a++) {
            var source = b[a];

            // Check if source can be played with this technology
            if (tech.canPlaySource(source)) {
              return { source: source, tech: techName };
            }
          }
        }
      }

      return false;
    }
  }, {
    key: 'src',

    /**
     * The source function updates the video source
     *
     * There are three types of variables you can pass as the argument.
     *
     * **URL String**: A URL to the the video file. Use this method if you are sure
     * the current playback technology (HTML5/Flash) can support the source you
     * provide. Currently only MP4 files can be used in both HTML5 and Flash.
     *
     *     myPlayer.src("http://www.example.com/path/to/video.mp4");
     *
     * **Source Object (or element):** A javascript object containing information
     * about the source file. Use this method if you want the player to determine if
     * it can support the file using the type information.
     *
     *     myPlayer.src({ type: "video/mp4", src: "http://www.example.com/path/to/video.mp4" });
     *
     * **Array of Source Objects:** To provide multiple versions of the source so
     * that it can be played using HTML5 across browsers you can use an array of
     * source objects. Video.js will detect which version is supported and load that
     * file.
     *
     *     myPlayer.src([
     *       { type: "video/mp4", src: "http://www.example.com/path/to/video.mp4" },
     *       { type: "video/webm", src: "http://www.example.com/path/to/video.webm" },
     *       { type: "video/ogg", src: "http://www.example.com/path/to/video.ogv" }
     *     ]);
     *
     * @param  {String|Object|Array=} source The source URL, object, or array of sources
     * @return {String} The current video source when getting
     * @return {String} The player when setting
     */
    value: function src() {
      var source = arguments[0] === undefined ? this.techGet('src') : arguments[0];

      var currentTech = _Component3['default'].getComponent(this.techName);

      // case: Array of source objects to choose from and pick the best to play
      if (Lib.obj.isArray(source)) {
        this.sourceList_(source);

        // case: URL String (http://myvideo...)
      } else if (typeof source === 'string') {
        // create a source object from the string
        this.src({ src: source });

        // case: Source object { src: '', type: '' ... }
      } else if (source instanceof Object) {
        // check if the source has a type and the loaded tech cannot play the source
        // if there's no type we'll just try the current tech
        if (source.type && !currentTech.canPlaySource(source)) {
          // create a source list with the current source and send through
          // the tech loop to check for a compatible technology
          this.sourceList_([source]);
        } else {
          this.cache_.src = source.src;
          this.currentType_ = source.type || '';

          // wait until the tech is ready to set the source
          this.ready(function () {

            // The setSource tech method was added with source handlers
            // so older techs won't support it
            // We need to check the direct prototype for the case where subclasses
            // of the tech do not support source handlers
            if (currentTech.prototype.hasOwnProperty('setSource')) {
              this.techCall('setSource', source);
            } else {
              this.techCall('src', source.src);
            }

            if (this.options_.preload == 'auto') {
              this.load();
            }

            if (this.options_.autoplay) {
              this.play();
            }
          });
        }
      }

      return this;
    }
  }, {
    key: 'sourceList_',

    /**
     * Handle an array of source objects
     * @param  {[type]} sources Array of source objects
     * @private
     */
    value: function sourceList_(sources) {
      var sourceTech = this.selectSource(sources);

      if (sourceTech) {
        if (sourceTech.tech === this.techName) {
          // if this technology is already loaded, set the source
          this.src(sourceTech.source);
        } else {
          // load this technology with the chosen source
          this.loadTech(sourceTech.tech, sourceTech.source);
        }
      } else {
        // We need to wrap this in a timeout to give folks a chance to add error event handlers
        this.setTimeout(function () {
          this.error({ code: 4, message: this.localize(this.options().notSupportedMessage) });
        }, 0);

        // we could not find an appropriate tech, but let's still notify the delegate that this is it
        // this needs a better comment about why this is needed
        this.triggerReady();
      }
    }
  }, {
    key: 'load',

    /**
     * Begin loading the src data.
     * @return {Player} Returns the player
     */
    value: function load() {
      this.techCall('load');
      return this;
    }
  }, {
    key: 'currentSrc',

    /**
     * Returns the fully qualified URL of the current source value e.g. http://mysite.com/video.mp4
     * Can be used in conjuction with `currentType` to assist in rebuilding the current source object.
     * @return {String} The current source
     */
    value: function currentSrc() {
      return this.techGet('currentSrc') || this.cache_.src || '';
    }
  }, {
    key: 'currentType',

    /**
     * Get the current source type e.g. video/mp4
     * This can allow you rebuild the current source object so that you could load the same
     * source and tech later
     * @return {String} The source MIME type
     */
    value: function currentType() {
      return this.currentType_ || '';
    }
  }, {
    key: 'preload',

    /**
     * Get or set the preload attribute.
     * @return {String} The preload attribute value when getting
     * @return {Player} Returns the player when setting
     */
    value: function preload(value) {
      if (value !== undefined) {
        this.techCall('setPreload', value);
        this.options_.preload = value;
        return this;
      }
      return this.techGet('preload');
    }
  }, {
    key: 'autoplay',

    /**
     * Get or set the autoplay attribute.
     * @return {String} The autoplay attribute value when getting
     * @return {Player} Returns the player when setting
     */
    value: function autoplay(value) {
      if (value !== undefined) {
        this.techCall('setAutoplay', value);
        this.options_.autoplay = value;
        return this;
      }
      return this.techGet('autoplay', value);
    }
  }, {
    key: 'loop',

    /**
     * Get or set the loop attribute on the video element.
     * @return {String} The loop attribute value when getting
     * @return {Player} Returns the player when setting
     */
    value: function loop(value) {
      if (value !== undefined) {
        this.techCall('setLoop', value);
        this.options_.loop = value;
        return this;
      }
      return this.techGet('loop');
    }
  }, {
    key: 'poster',

    /**
     * get or set the poster image source url
     *
     * ##### EXAMPLE:
     *
     *     // getting
     *     var currentPoster = myPlayer.poster();
     *
     *     // setting
     *     myPlayer.poster('http://example.com/myImage.jpg');
     *
     * @param  {String=} [src] Poster image source URL
     * @return {String} poster URL when getting
     * @return {Player} self when setting
     */
    value: function poster(src) {
      if (src === undefined) {
        return this.poster_;
      }

      // The correct way to remove a poster is to set as an empty string
      // other falsey values will throw errors
      if (!src) {
        src = '';
      }

      // update the internal poster variable
      this.poster_ = src;

      // update the tech's poster
      this.techCall('setPoster', src);

      // alert components that the poster has been set
      this.trigger('posterchange');

      return this;
    }
  }, {
    key: 'controls',

    /**
     * Get or set whether or not the controls are showing.
     * @param  {Boolean} controls Set controls to showing or not
     * @return {Boolean}    Controls are showing
     */
    value: function controls(bool) {
      if (bool !== undefined) {
        bool = !!bool; // force boolean
        // Don't trigger a change event unless it actually changed
        if (this.controls_ !== bool) {
          this.controls_ = bool;
          if (bool) {
            this.removeClass('vjs-controls-disabled');
            this.addClass('vjs-controls-enabled');
            this.trigger('controlsenabled');
          } else {
            this.removeClass('vjs-controls-enabled');
            this.addClass('vjs-controls-disabled');
            this.trigger('controlsdisabled');
          }
        }
        return this;
      }
      return !!this.controls_;
    }
  }, {
    key: 'usingNativeControls',

    /**
     * Toggle native controls on/off. Native controls are the controls built into
     * devices (e.g. default iPhone controls), Flash, or other techs
     * (e.g. Vimeo Controls)
     *
     * **This should only be set by the current tech, because only the tech knows
     * if it can support native controls**
     *
     * @param  {Boolean} bool    True signals that native controls are on
     * @return {Player}      Returns the player
     * @private
     */
    value: function usingNativeControls(bool) {
      if (bool !== undefined) {
        bool = !!bool; // force boolean
        // Don't trigger a change event unless it actually changed
        if (this.usingNativeControls_ !== bool) {
          this.usingNativeControls_ = bool;
          if (bool) {
            this.addClass('vjs-using-native-controls');

            /**
             * player is using the native device controls
             *
             * @event usingnativecontrols
             * @memberof Player
             * @instance
             * @private
             */
            this.trigger('usingnativecontrols');
          } else {
            this.removeClass('vjs-using-native-controls');

            /**
             * player is using the custom HTML controls
             *
             * @event usingcustomcontrols
             * @memberof Player
             * @instance
             * @private
             */
            this.trigger('usingcustomcontrols');
          }
        }
        return this;
      }
      return !!this.usingNativeControls_;
    }
  }, {
    key: 'error',

    /**
     * Set or get the current MediaError
     * @param  {*} err A MediaError or a String/Number to be turned into a MediaError
     * @return {MediaError|null}     when getting
     * @return {Player}              when setting
     */
    value: function error(err) {
      if (err === undefined) {
        return this.error_ || null;
      }

      // restoring to default
      if (err === null) {
        this.error_ = err;
        this.removeClass('vjs-error');
        return this;
      }

      // error instance
      if (err instanceof _MediaError2['default']) {
        this.error_ = err;
      } else {
        this.error_ = new _MediaError2['default'](err);
      }

      // fire an error event on the player
      this.trigger('error');

      // add the vjs-error classname to the player
      this.addClass('vjs-error');

      // log the name of the error type and any message
      // ie8 just logs "[object object]" if you just log the error object
      Lib.log.error('(CODE:' + this.error_.code + ' ' + _MediaError2['default'].errorTypes[this.error_.code] + ')', this.error_.message, this.error_);

      return this;
    }
  }, {
    key: 'ended',

    /**
     * Returns whether or not the player is in the "ended" state.
     * @return {Boolean} True if the player is in the ended state, false if not.
     */
    value: function ended() {
      return this.techGet('ended');
    }
  }, {
    key: 'seeking',

    /**
     * Returns whether or not the player is in the "seeking" state.
     * @return {Boolean} True if the player is in the seeking state, false if not.
     */
    value: function seeking() {
      return this.techGet('seeking');
    }
  }, {
    key: 'reportUserActivity',
    value: function reportUserActivity(event) {
      this.userActivity_ = true;
    }
  }, {
    key: 'userActive',
    value: function userActive(bool) {
      if (bool !== undefined) {
        bool = !!bool;
        if (bool !== this.userActive_) {
          this.userActive_ = bool;
          if (bool) {
            // If the user was inactive and is now active we want to reset the
            // inactivity timer
            this.userActivity_ = true;
            this.removeClass('vjs-user-inactive');
            this.addClass('vjs-user-active');
            this.trigger('useractive');
          } else {
            // We're switching the state to inactive manually, so erase any other
            // activity
            this.userActivity_ = false;

            // Chrome/Safari/IE have bugs where when you change the cursor it can
            // trigger a mousemove event. This causes an issue when you're hiding
            // the cursor when the user is inactive, and a mousemove signals user
            // activity. Making it impossible to go into inactive mode. Specifically
            // this happens in fullscreen when we really need to hide the cursor.
            //
            // When this gets resolved in ALL browsers it can be removed
            // https://code.google.com/p/chromium/issues/detail?id=103041
            if (this.tech) {
              this.tech.one('mousemove', function (e) {
                e.stopPropagation();
                e.preventDefault();
              });
            }

            this.removeClass('vjs-user-active');
            this.addClass('vjs-user-inactive');
            this.trigger('userinactive');
          }
        }
        return this;
      }
      return this.userActive_;
    }
  }, {
    key: 'listenForUserActivity',
    value: function listenForUserActivity() {
      var mouseInProgress = undefined,
          lastMoveX = undefined,
          lastMoveY = undefined;

      var handleActivity = Lib.bind(this, this.reportUserActivity);

      var handleMouseMove = function handleMouseMove(e) {
        // #1068 - Prevent mousemove spamming
        // Chrome Bug: https://code.google.com/p/chromium/issues/detail?id=366970
        if (e.screenX != lastMoveX || e.screenY != lastMoveY) {
          lastMoveX = e.screenX;
          lastMoveY = e.screenY;
          handleActivity();
        }
      };

      var handleMouseDown = function handleMouseDown() {
        handleActivity();
        // For as long as the they are touching the device or have their mouse down,
        // we consider them active even if they're not moving their finger or mouse.
        // So we want to continue to update that they are active
        this.clearInterval(mouseInProgress);
        // Setting userActivity=true now and setting the interval to the same time
        // as the activityCheck interval (250) should ensure we never miss the
        // next activityCheck
        mouseInProgress = this.setInterval(handleActivity, 250);
      };

      var handleMouseUp = function handleMouseUp(event) {
        handleActivity();
        // Stop the interval that maintains activity if the mouse/touch is down
        this.clearInterval(mouseInProgress);
      };

      // Any mouse movement will be considered user activity
      this.on('mousedown', handleMouseDown);
      this.on('mousemove', handleMouseMove);
      this.on('mouseup', handleMouseUp);

      // Listen for keyboard navigation
      // Shouldn't need to use inProgress interval because of key repeat
      this.on('keydown', handleActivity);
      this.on('keyup', handleActivity);

      // Run an interval every 250 milliseconds instead of stuffing everything into
      // the mousemove/touchmove function itself, to prevent performance degradation.
      // `this.reportUserActivity` simply sets this.userActivity_ to true, which
      // then gets picked up by this loop
      // http://ejohn.org/blog/learning-from-twitter/
      var activityCheck = this.setInterval(function () {
        var inactivityTimeout = undefined;

        // Check to see if mouse/touch activity has happened
        if (this.userActivity_) {
          // Reset the activity tracker
          this.userActivity_ = false;

          // If the user state was inactive, set the state to active
          this.userActive(true);

          // Clear any existing inactivity timeout to start the timer over
          this.clearTimeout(inactivityTimeout);

          var timeout = this.options().inactivityTimeout;
          if (timeout > 0) {
            // In <timeout> milliseconds, if no more activity has occurred the
            // user will be considered inactive
            inactivityTimeout = this.setTimeout(function () {
              // Protect against the case where the inactivityTimeout can trigger just
              // before the next user activity is picked up by the activityCheck loop
              // causing a flicker
              if (!this.userActivity_) {
                this.userActive(false);
              }
            }, timeout);
          }
        }
      }, 250);
    }
  }, {
    key: 'playbackRate',

    /**
     * Gets or sets the current playback rate.  A playback rate of
     * 1.0 represents normal speed and 0.5 would indicate half-speed
     * playback, for instance.
     * @param  {Number} rate    New playback rate to set.
     * @return {Number}         Returns the new playback rate when setting
     * @return {Number}         Returns the current playback rate when getting
     * @see https://html.spec.whatwg.org/multipage/embedded-content.html#dom-media-playbackrate
     */
    value: function playbackRate(rate) {
      if (rate !== undefined) {
        this.techCall('setPlaybackRate', rate);
        return this;
      }

      if (this.tech && this.tech.featuresPlaybackRate) {
        return this.techGet('playbackRate');
      } else {
        return 1;
      }
    }
  }, {
    key: 'isAudio',

    /**
     * Gets or sets the audio flag
     *
     * @param  {Boolean} bool    True signals that this is an audio player.
     * @return {Boolean}         Returns true if player is audio, false if not when getting
     * @return {Player}      Returns the player if setting
     * @private
     */
    value: function isAudio(bool) {
      if (bool !== undefined) {
        this.isAudio_ = !!bool;
        return this;
      }

      return !!this.isAudio_;
    }
  }, {
    key: 'networkState',

    /**
     * Returns the current state of network activity for the element, from
     * the codes in the list below.
     * - NETWORK_EMPTY (numeric value 0)
     *   The element has not yet been initialised. All attributes are in
     *   their initial states.
     * - NETWORK_IDLE (numeric value 1)
     *   The element's resource selection algorithm is active and has
     *   selected a resource, but it is not actually using the network at
     *   this time.
     * - NETWORK_LOADING (numeric value 2)
     *   The user agent is actively trying to download data.
     * - NETWORK_NO_SOURCE (numeric value 3)
     *   The element's resource selection algorithm is active, but it has
     *   not yet found a resource to use.
     * @return {Number} the current network activity state
     * @see https://html.spec.whatwg.org/multipage/embedded-content.html#network-states
     */
    value: function networkState() {
      return this.techGet('networkState');
    }
  }, {
    key: 'readyState',

    /**
     * Returns a value that expresses the current state of the element
     * with respect to rendering the current playback position, from the
     * codes in the list below.
     * - HAVE_NOTHING (numeric value 0)
     *   No information regarding the media resource is available.
     * - HAVE_METADATA (numeric value 1)
     *   Enough of the resource has been obtained that the duration of the
     *   resource is available.
     * - HAVE_CURRENT_DATA (numeric value 2)
     *   Data for the immediate current playback position is available.
     * - HAVE_FUTURE_DATA (numeric value 3)
     *   Data for the immediate current playback position is available, as
     *   well as enough data for the user agent to advance the current
     *   playback position in the direction of playback.
     * - HAVE_ENOUGH_DATA (numeric value 4)
     *   The user agent estimates that enough data is available for
     *   playback to proceed uninterrupted.
     * @return {Number} the current playback rendering state
     * @see https://html.spec.whatwg.org/multipage/embedded-content.html#dom-media-readystate
     */
    value: function readyState() {
      return this.techGet('readyState');
    }
  }, {
    key: 'textTracks',

    /**
     * Text tracks are tracks of timed text events.
     * Captions - text displayed over the video for the hearing impaired
     * Subtitles - text displayed over the video for those who don't understand language in the video
     * Chapters - text displayed in a menu allowing the user to jump to particular points (chapters) in the video
     * Descriptions (not supported yet) - audio descriptions that are read back to the user by a screen reading device
     */

    /**
     * Get an array of associated text tracks. captions, subtitles, chapters, descriptions
     * http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#dom-media-texttracks
     * @return {Array}           Array of track objects
     */
    value: function textTracks() {
      // cannot use techGet directly because it checks to see whether the tech is ready.
      // Flash is unlikely to be ready in time but textTracks should still work.
      return this.tech && this.tech.textTracks();
    }
  }, {
    key: 'remoteTextTracks',
    value: function remoteTextTracks() {
      return this.tech && this.tech.remoteTextTracks();
    }
  }, {
    key: 'addTextTrack',

    /**
     * Add a text track
     * In addition to the W3C settings we allow adding additional info through options.
     * http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#dom-media-addtexttrack
     * @param {String}  kind        Captions, subtitles, chapters, descriptions, or metadata
     * @param {String=} label       Optional label
     * @param {String=} language    Optional language
     */
    value: function addTextTrack(kind, label, language) {
      return this.tech && this.tech.addTextTrack(kind, label, language);
    }
  }, {
    key: 'addRemoteTextTrack',
    value: function addRemoteTextTrack(options) {
      return this.tech && this.tech.addRemoteTextTrack(options);
    }
  }, {
    key: 'removeRemoteTextTrack',
    value: function removeRemoteTextTrack(track) {
      this.tech && this.tech.removeRemoteTextTrack(track);
    }
  }, {
    key: 'language',

    // Methods to add support for
    // initialTime: function(){ return this.techCall('initialTime'); },
    // startOffsetTime: function(){ return this.techCall('startOffsetTime'); },
    // played: function(){ return this.techCall('played'); },
    // seekable: function(){ return this.techCall('seekable'); },
    // videoTracks: function(){ return this.techCall('videoTracks'); },
    // audioTracks: function(){ return this.techCall('audioTracks'); },
    // videoWidth: function(){ return this.techCall('videoWidth'); },
    // videoHeight: function(){ return this.techCall('videoHeight'); },
    // defaultPlaybackRate: function(){ return this.techCall('defaultPlaybackRate'); },
    // mediaGroup: function(){ return this.techCall('mediaGroup'); },
    // controller: function(){ return this.techCall('controller'); },
    // defaultMuted: function(){ return this.techCall('defaultMuted'); }

    // TODO
    // currentSrcList: the array of sources including other formats and bitrates
    // playList: array of source lists in order of playback

    /**
     * The player's language code
     * @param  {String} languageCode  The locale string
     * @return {String}             The locale string when getting
     * @return {Player}         self, when setting
     */
    value: function language(languageCode) {
      if (languageCode === undefined) {
        return this.language_;
      }

      this.language_ = languageCode;
      return this;
    }
  }, {
    key: 'languages',

    /**
     * Get the player's language dictionary
     */
    value: function languages() {
      return this.languages_;
    }
  }], [{
    key: 'getTagSettings',
    value: function getTagSettings(tag) {
      var baseOptions = {
        sources: [],
        tracks: []
      };

      var tagOptions = Lib.getElementAttributes(tag);
      var dataSetup = tagOptions['data-setup'];

      // Check if data-setup attr exists.
      if (dataSetup !== null) {
        // Parse options JSON
        // If empty string, make it a parsable json object.
        Lib.obj.merge(tagOptions, _safeParseTuple2['default'](dataSetup || '{}')[1]);
      }

      Lib.obj.merge(baseOptions, tagOptions);

      // Get tag children settings
      if (tag.hasChildNodes()) {
        var children = tag.childNodes;

        for (var i = 0, j = children.length; i < j; i++) {
          var child = children[i];
          // Change case needed: http://ejohn.org/blog/nodename-case-sensitivity/
          var childName = child.nodeName.toLowerCase();
          if (childName === 'source') {
            baseOptions.sources.push(Lib.getElementAttributes(child));
          } else if (childName === 'track') {
            baseOptions.tracks.push(Lib.getElementAttributes(child));
          }
        }
      }

      return baseOptions;
    }
  }]);

  return Player;
})(_Component3['default']);

/**
 * Global player list
 * @type {Object}
 */
Player.players = {};

/**
 * Player instance options, surfaced using options
 * options = Player.prototype.options_
 * Make changes in options, not here.
 * All options should use string keys so they avoid
 * renaming by closure compiler
 * @type {Object}
 * @private
 */
Player.prototype.options_ = _Options2['default'];

/**
 * Fired when the player has initial duration and dimension information
 * @event loadedmetadata
 */
Player.prototype.handleLoadedMetaData;

/**
 * Fired when the player has downloaded data at the current playback position
 * @event loadeddata
 */
Player.prototype.handleLoadedData;

/**
 * Fired when the player has finished downloading the source data
 * @event loadedalldata
 */
Player.prototype.handleLoadedAllData;

/**
 * Fired when the user is active, e.g. moves the mouse over the player
 * @event useractive
 */
Player.prototype.handleUserActive;

/**
 * Fired when the user is inactive, e.g. a short delay after the last mouse move or control interaction
 * @event userinactive
 */
Player.prototype.handleUserInactive;

/**
 * Fired when the current playback position has changed
 *
 * During playback this is fired every 15-250 milliseconds, depending on the
 * playback technology in use.
 * @event timeupdate
 */
Player.prototype.handleTimeUpdate;

/**
 * Fired when the volume changes
 * @event volumechange
 */
Player.prototype.handleVolumeChange;

/**
 * Fired when an error occurs
 * @event error
 */
Player.prototype.handleError;

Player.prototype.flexNotSupported_ = function () {
  var elem = _document2['default'].createElement('i');

  return !('flexBasis' in elem.style || 'webkitFlexBasis' in elem.style || 'mozFlexBasis' in elem.style || 'msFlexBasis' in elem.style);
};

_Component3['default'].registerComponent('Player', Player);
exports['default'] = Player;
module.exports = exports['default'];

},{"./big-play-button.js":5,"./component.js":7,"./control-bar/control-bar.js":8,"./error-display.js":41,"./events.js":43,"./fullscreen-api.js":45,"./lib.js":46,"./loading-spinner.js":47,"./media-error.js":48,"./options.js":52,"./poster-image.js":55,"./tech/html5.js":61,"./tech/loader.js":62,"./tracks/text-track-display.js":65,"./tracks/text-track-settings.js":68,"global/document":1,"global/window":2,"safe-json-parse/tuple":4}],54:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Player = _dereq_('./player');

var _Player2 = _interopRequireDefault(_Player);

/**
 * the method for registering a video.js plugin
 *
 * @param  {String} name The name of the plugin
 * @param  {Function} init The function that is run when the player inits
 */
var plugin = function plugin(name, init) {
  _Player2['default'].prototype[name] = init;
};

exports['default'] = plugin;
module.exports = exports['default'];

},{"./player":53}],55:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Button2 = _dereq_('./button');

var _Button3 = _interopRequireDefault(_Button2);

var _import = _dereq_('./lib');

var Lib = _interopRequireWildcard(_import);

/* Poster Image
================================================================================ */
/**
 * The component that handles showing the poster image.
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var PosterImage = (function (_Button) {
  function PosterImage(player, options) {
    _classCallCheck(this, PosterImage);

    _get(Object.getPrototypeOf(PosterImage.prototype), 'constructor', this).call(this, player, options);

    this.update();
    player.on('posterchange', Lib.bind(this, this.update));
  }

  _inherits(PosterImage, _Button);

  _createClass(PosterImage, [{
    key: 'dispose',

    /**
     * Clean up the poster image
     */
    value: function dispose() {
      this.player().off('posterchange', this.update);
      _get(Object.getPrototypeOf(PosterImage.prototype), 'dispose', this).call(this);
    }
  }, {
    key: 'createEl',

    /**
     * Create the poster image element
     * @return {Element}
     */
    value: function createEl() {
      var el = Lib.createEl('div', {
        className: 'vjs-poster',

        // Don't want poster to be tabbable.
        tabIndex: -1
      });

      // To ensure the poster image resizes while maintaining its original aspect
      // ratio, use a div with `background-size` when available. For browsers that
      // do not support `background-size` (e.g. IE8), fall back on using a regular
      // img element.
      if (!Lib.BACKGROUND_SIZE_SUPPORTED) {
        this.fallbackImg_ = Lib.createEl('img');
        el.appendChild(this.fallbackImg_);
      }

      return el;
    }
  }, {
    key: 'update',

    /**
     * Event handler for updates to the player's poster source
     */
    value: function update() {
      var url = this.player().poster();

      this.setSrc(url);

      // If there's no poster source we should display:none on this component
      // so it's not still clickable or right-clickable
      if (url) {
        this.show();
      } else {
        this.hide();
      }
    }
  }, {
    key: 'setSrc',

    /**
     * Set the poster source depending on the display method
     */
    value: function setSrc(url) {
      if (this.fallbackImg_) {
        this.fallbackImg_.src = url;
      } else {
        var backgroundImage = '';
        // Any falsey values should stay as an empty string, otherwise
        // this will throw an extra error
        if (url) {
          backgroundImage = 'url("' + url + '")';
        }

        this.el_.style.backgroundImage = backgroundImage;
      }
    }
  }, {
    key: 'handleClick',

    /**
     * Event handler for clicks on the poster image
     */
    value: function handleClick() {
      // We don't want a click to trigger playback when controls are disabled
      // but CSS should be hiding the poster to prevent that from happening
      if (this.player_.paused()) {
        this.player_.play();
      } else {
        this.player_.pause();
      }
    }
  }]);

  return PosterImage;
})(_Button3['default']);

_Button3['default'].registerComponent('PosterImage', PosterImage);
exports['default'] = PosterImage;
module.exports = exports['default'];

},{"./button":6,"./lib":46}],56:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = _dereq_('./events');

var Events = _interopRequireWildcard(_import);

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

var _window = _dereq_('global/window');

var _window2 = _interopRequireDefault(_window);

var _windowLoaded = false;
var videojs = undefined;

/**
 * @fileoverview Functions for automatically setting up a player
 * based on the data-setup attribute of the video tag
 */

// Automatically set up any tags that have a data-setup attribute
var autoSetup = function autoSetup() {
  // One day, when we stop supporting IE8, go back to this, but in the meantime...*hack hack hack*
  // var vids = Array.prototype.slice.call(document.getElementsByTagName('video'));
  // var audios = Array.prototype.slice.call(document.getElementsByTagName('audio'));
  // var mediaEls = vids.concat(audios);

  // Because IE8 doesn't support calling slice on a node list, we need to loop through each list of elements
  // to build up a new, combined list of elements.
  var vids = _document2['default'].getElementsByTagName('video');
  var audios = _document2['default'].getElementsByTagName('audio');
  var mediaEls = [];
  if (vids && vids.length > 0) {
    for (var i = 0, e = vids.length; i < e; i++) {
      mediaEls.push(vids[i]);
    }
  }
  if (audios && audios.length > 0) {
    for (var i = 0, e = audios.length; i < e; i++) {
      mediaEls.push(audios[i]);
    }
  }

  // Check if any media elements exist
  if (mediaEls && mediaEls.length > 0) {

    for (var i = 0, e = mediaEls.length; i < e; i++) {
      var mediaEl = mediaEls[i];

      // Check if element exists, has getAttribute func.
      // IE seems to consider typeof el.getAttribute == 'object' instead of 'function' like expected, at least when loading the player immediately.
      if (mediaEl && mediaEl.getAttribute) {

        // Make sure this player hasn't already been set up.
        if (mediaEl.player === undefined) {
          var options = mediaEl.getAttribute('data-setup');

          // Check if data-setup attr exists.
          // We only auto-setup if they've added the data-setup attr.
          if (options !== null) {
            // Create new video.js instance.
            var player = videojs(mediaEl);
          }
        }

        // If getAttribute isn't defined, we need to wait for the DOM.
      } else {
        autoSetupTimeout(1);
        break;
      }
    }

    // No videos were found, so keep looping unless page is finished loading.
  } else if (!_windowLoaded) {
    autoSetupTimeout(1);
  }
};

// Pause to let the DOM keep processing
var autoSetupTimeout = function autoSetupTimeout(wait, vjs) {
  videojs = vjs;
  setTimeout(autoSetup, wait);
};

if (_document2['default'].readyState === 'complete') {
  _windowLoaded = true;
} else {
  Events.one(_window2['default'], 'load', function () {
    _windowLoaded = true;
  });
}

var hasLoaded = function hasLoaded() {
  return _windowLoaded;
};

exports.autoSetup = autoSetup;
exports.autoSetupTimeout = autoSetupTimeout;
exports.hasLoaded = hasLoaded;

},{"./events":43,"global/document":1,"global/window":2}],57:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('../component.js');

var _Component3 = _interopRequireDefault(_Component2);

var _import = _dereq_('../lib.js');

var Lib = _interopRequireWildcard(_import);

/**
 * SeekBar Behavior includes play progress bar, and seek handle
 * Needed so it can determine seek position based on handle position/size
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var SliderHandle = (function (_Component) {
  function SliderHandle() {
    _classCallCheck(this, SliderHandle);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(SliderHandle, _Component);

  _createClass(SliderHandle, [{
    key: 'createEl',

    /** @inheritDoc */
    value: function createEl(type, props) {
      props = props || {};
      // Add the slider element class to all sub classes
      props.className = props.className + ' vjs-slider-handle';
      props = Lib.obj.merge({
        innerHTML: '<span class="vjs-control-text">' + (this.defaultValue || 0) + '</span>'
      }, props);

      return _get(Object.getPrototypeOf(SliderHandle.prototype), 'createEl', this).call(this, 'div', props);
    }
  }]);

  return SliderHandle;
})(_Component3['default']);

_Component3['default'].registerComponent('SliderHandle', SliderHandle);
exports['default'] = SliderHandle;
module.exports = exports['default'];

},{"../component.js":7,"../lib.js":46}],58:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('../component.js');

var _Component3 = _interopRequireDefault(_Component2);

var _import = _dereq_('../lib.js');

var Lib = _interopRequireWildcard(_import);

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

/* Slider
================================================================================ */
/**
 * The base functionality for sliders like the volume bar and seek bar
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var Slider = (function (_Component) {
  function Slider(player, options) {
    _classCallCheck(this, Slider);

    _get(Object.getPrototypeOf(Slider.prototype), 'constructor', this).call(this, player, options);

    // Set property names to bar and handle to match with the child Slider class is looking for
    this.bar = this.getChild(this.options_.barName);
    this.handle = this.getChild(this.options_.handleName);

    // Set a horizontal or vertical class on the slider depending on the slider type
    this.vertical(!!this.options().vertical);

    this.on('mousedown', this.handleMouseDown);
    this.on('touchstart', this.handleMouseDown);
    this.on('focus', this.handleFocus);
    this.on('blur', this.handleBlur);
    this.on('click', this.handleClick);

    this.on(player, 'controlsvisible', this.update);
    this.on(player, this.playerEvent, this.update);
  }

  _inherits(Slider, _Component);

  _createClass(Slider, [{
    key: 'createEl',
    value: function createEl(type) {
      var props = arguments[1] === undefined ? {} : arguments[1];

      // Add the slider element class to all sub classes
      props.className = props.className + ' vjs-slider';
      props = Lib.obj.merge({
        role: 'slider',
        'aria-valuenow': 0,
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        tabIndex: 0
      }, props);

      return _get(Object.getPrototypeOf(Slider.prototype), 'createEl', this).call(this, type, props);
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      event.preventDefault();
      Lib.blockTextSelection();
      this.addClass('vjs-sliding');

      this.on(_document2['default'], 'mousemove', this.handleMouseMove);
      this.on(_document2['default'], 'mouseup', this.handleMouseUp);
      this.on(_document2['default'], 'touchmove', this.handleMouseMove);
      this.on(_document2['default'], 'touchend', this.handleMouseUp);

      this.handleMouseMove(event);
    }
  }, {
    key: 'handleMouseMove',

    // To be overridden by a subclass
    value: function handleMouseMove() {}
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp() {
      Lib.unblockTextSelection();
      this.removeClass('vjs-sliding');

      this.off(_document2['default'], 'mousemove', this.handleMouseMove);
      this.off(_document2['default'], 'mouseup', this.handleMouseUp);
      this.off(_document2['default'], 'touchmove', this.handleMouseMove);
      this.off(_document2['default'], 'touchend', this.handleMouseUp);

      this.update();
    }
  }, {
    key: 'update',
    value: function update() {
      // In VolumeBar init we have a setTimeout for update that pops and update to the end of the
      // execution stack. The player is destroyed before then update will cause an error
      if (!this.el_) {
        return;
      } // If scrubbing, we could use a cached value to make the handle keep up with the user's mouse.
      // On HTML5 browsers scrubbing is really smooth, but some flash players are slow, so we might want to utilize this later.
      // var progress =  (this.player_.scrubbing) ? this.player_.getCache().currentTime / this.player_.duration() : this.player_.currentTime() / this.player_.duration();
      var progress = this.getPercent();
      var bar = this.bar;

      // If there's no bar...
      if (!bar) {
        return;
      } // Protect against no duration and other division issues
      if (typeof progress !== 'number' || progress !== progress || progress < 0 || progress === Infinity) {
        progress = 0;
      }

      // If there is a handle, we need to account for the handle in our calculation for progress bar
      // so that it doesn't fall short of or extend past the handle.
      var barProgress = this.updateHandlePosition(progress);

      // Convert to a percentage for setting
      var percentage = Lib.round(barProgress * 100, 2) + '%';

      // Set the new bar width or height
      if (this.vertical()) {
        bar.el().style.height = percentage;
      } else {
        bar.el().style.width = percentage;
      }
    }
  }, {
    key: 'updateHandlePosition',

    /**
    * Update the handle position.
    */
    value: function updateHandlePosition(progress) {
      var handle = this.handle;
      if (!handle) {
        return;
      }var vertical = this.vertical();
      var box = this.el_;

      var boxSize = undefined,
          handleSize = undefined;
      if (vertical) {
        boxSize = box.offsetHeight;
        handleSize = handle.el().offsetHeight;
      } else {
        boxSize = box.offsetWidth;
        handleSize = handle.el().offsetWidth;
      }

      // The width of the handle in percent of the containing box
      // In IE, widths may not be ready yet causing NaN
      var handlePercent = handleSize ? handleSize / boxSize : 0;

      // Get the adjusted size of the box, considering that the handle's center never touches the left or right side.
      // There is a margin of half the handle's width on both sides.
      var boxAdjustedPercent = 1 - handlePercent;

      // Adjust the progress that we'll use to set widths to the new adjusted box width
      var adjustedProgress = progress * boxAdjustedPercent;

      // The bar does reach the left side, so we need to account for this in the bar's width
      var barProgress = adjustedProgress + handlePercent / 2;

      var percentage = Lib.round(adjustedProgress * 100, 2) + '%';

      if (vertical) {
        handle.el().style.bottom = percentage;
      } else {
        handle.el().style.left = percentage;
      }

      return barProgress;
    }
  }, {
    key: 'calculateDistance',
    value: function calculateDistance(event) {
      var el = this.el_;
      var box = Lib.findPosition(el);
      var boxW = el.offsetWidth;
      var boxH = el.offsetHeight;
      var handle = this.handle;

      if (this.options().vertical) {
        var boxY = box.top;

        var pageY = undefined;
        if (event.changedTouches) {
          pageY = event.changedTouches[0].pageY;
        } else {
          pageY = event.pageY;
        }

        if (handle) {
          var handleH = handle.el().offsetHeight;
          // Adjusted X and Width, so handle doesn't go outside the bar
          boxY = boxY + handleH / 2;
          boxH = boxH - handleH;
        }

        // Percent that the click is through the adjusted area
        return Math.max(0, Math.min(1, (boxY - pageY + boxH) / boxH));
      } else {
        var boxX = box.left;

        var pageX = undefined;
        if (event.changedTouches) {
          pageX = event.changedTouches[0].pageX;
        } else {
          pageX = event.pageX;
        }

        if (handle) {
          var handleW = handle.el().offsetWidth;

          // Adjusted X and Width, so handle doesn't go outside the bar
          boxX = boxX + handleW / 2;
          boxW = boxW - handleW;
        }

        // Percent that the click is through the adjusted area
        return Math.max(0, Math.min(1, (pageX - boxX) / boxW));
      }
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      this.on(_document2['default'], 'keydown', this.handleKeyPress);
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(event) {
      if (event.which == 37 || event.which == 40) {
        // Left and Down Arrows
        event.preventDefault();
        this.stepBack();
      } else if (event.which == 38 || event.which == 39) {
        // Up and Right Arrows
        event.preventDefault();
        this.stepForward();
      }
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      this.off(_document2['default'], 'keydown', this.handleKeyPress);
    }
  }, {
    key: 'handleClick',

    /**
     * Listener for click events on slider, used to prevent clicks
     *   from bubbling up to parent elements like button menus.
     * @param  {Object} event Event object
     */
    value: function handleClick(event) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }, {
    key: 'vertical',
    value: function vertical(bool) {
      if (bool === undefined) {
        return this.vertical_ || false;
      }

      this.vertical_ = !!bool;

      if (this.vertical_) {
        this.addClass('vjs-slider-vertical');
      } else {
        this.addClass('vjs-slider-horizontal');
      }

      return this;
    }
  }]);

  return Slider;
})(_Component3['default']);

_Component3['default'].registerComponent('Slider', Slider);
exports['default'] = Slider;
module.exports = exports['default'];

},{"../component.js":7,"../lib.js":46,"global/document":1}],59:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function FlashRtmpDecorator(Flash) {
  Flash.streamingFormats = {
    'rtmp/mp4': 'MP4',
    'rtmp/flv': 'FLV'
  };

  Flash.streamFromParts = function (connection, stream) {
    return connection + '&' + stream;
  };

  Flash.streamToParts = function (src) {
    var parts = {
      connection: '',
      stream: ''
    };

    if (!src) return parts;

    // Look for the normal URL separator we expect, '&'.
    // If found, we split the URL into two pieces around the
    // first '&'.
    var connEnd = src.indexOf('&');
    var streamBegin = undefined;
    if (connEnd !== -1) {
      streamBegin = connEnd + 1;
    } else {
      // If there's not a '&', we use the last '/' as the delimiter.
      connEnd = streamBegin = src.lastIndexOf('/') + 1;
      if (connEnd === 0) {
        // really, there's not a '/'?
        connEnd = streamBegin = src.length;
      }
    }
    parts.connection = src.substring(0, connEnd);
    parts.stream = src.substring(streamBegin, src.length);

    return parts;
  };

  Flash.isStreamingType = function (srcType) {
    return srcType in Flash.streamingFormats;
  };

  // RTMP has four variations, any string starting
  // with one of these protocols should be valid
  Flash.RTMP_RE = /^rtmp[set]?:\/\//i;

  Flash.isStreamingSrc = function (src) {
    return Flash.RTMP_RE.test(src);
  };

  /**
   * A source handler for RTMP urls
   * @type {Object}
   */
  Flash.rtmpSourceHandler = {};

  /**
   * Check Flash can handle the source natively
   * @param  {Object} source  The source object
   * @return {String}         'probably', 'maybe', or '' (empty string)
   */
  Flash.rtmpSourceHandler.canHandleSource = function (source) {
    if (Flash.isStreamingType(source.type) || Flash.isStreamingSrc(source.src)) {
      return 'maybe';
    }

    return '';
  };

  /**
   * Pass the source to the flash object
   * Adaptive source handlers will have more complicated workflows before passing
   * video data to the video element
   * @param  {Object} source    The source object
   * @param  {Flash} tech   The instance of the Flash tech
   */
  Flash.rtmpSourceHandler.handleSource = function (source, tech) {
    var srcParts = Flash.streamToParts(source.src);

    tech.setRtmpConnection(srcParts.connection);
    tech.setRtmpStream(srcParts.stream);
  };

  // Register the native source handler
  Flash.registerSourceHandler(Flash.rtmpSourceHandler);

  return Flash;
}

exports['default'] = FlashRtmpDecorator;
module.exports = exports['default'];

},{}],60:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * @fileoverview VideoJS-SWF - Custom Flash Player with HTML5-ish API
 * https://github.com/zencoder/video-js-swf
 * Not using setupTriggers. Using global onEvent func to distribute events
 */

var _Tech2 = _dereq_('./tech');

var _Tech3 = _interopRequireDefault(_Tech2);

var _import = _dereq_('../lib');

var Lib = _interopRequireWildcard(_import);

var _FlashRtmpDecorator = _dereq_('./flash-rtmp');

var _FlashRtmpDecorator2 = _interopRequireDefault(_FlashRtmpDecorator);

var _Component = _dereq_('../component');

var _Component2 = _interopRequireDefault(_Component);

var _window = _dereq_('global/window');

var _window2 = _interopRequireDefault(_window);

var navigator = _window2['default'].navigator;

/**
 * Flash Media Controller - Wrapper for fallback SWF API
 *
 * @param {Player} player
 * @param {Object=} options
 * @param {Function=} ready
 * @constructor
 */

var Flash = (function (_Tech) {
  function Flash(player, options, ready) {
    _classCallCheck(this, Flash);

    _get(Object.getPrototypeOf(Flash.prototype), 'constructor', this).call(this, player, options, ready);

    var source = options.source;
    var parentEl = options.parentEl;

    // Create a temporary element to be replaced by swf object
    var placeHolder = this.el_ = Lib.createEl('div', { id: player.id() + '_temp_flash' });

    // Generate ID for swf object
    var objId = player.id() + '_flash_api';

    // Store player options in local var for optimization
    // TODO: switch to using player methods instead of options
    // e.g. player.autoplay();
    var playerOptions = player.options_;

    // Merge default flashvars with ones passed in to init
    var flashVars = Lib.obj.merge({

      // SWF Callback Functions
      readyFunction: 'videojs.Flash.onReady',
      eventProxyFunction: 'videojs.Flash.onEvent',
      errorEventProxyFunction: 'videojs.Flash.onError',

      // Player Settings
      autoplay: playerOptions.autoplay,
      preload: playerOptions.preload,
      loop: playerOptions.loop,
      muted: playerOptions.muted

    }, options.flashVars);

    // Merge default parames with ones passed in
    var params = Lib.obj.merge({
      wmode: 'opaque', // Opaque is needed to overlay controls, but can affect playback performance
      bgcolor: '#000000' // Using bgcolor prevents a white flash when the object is loading
    }, options.params);

    // Merge default attributes with ones passed in
    var attributes = Lib.obj.merge({
      id: objId,
      name: objId, // Both ID and Name needed or swf to identify itself
      'class': 'vjs-tech'
    }, options.attributes);

    // If source was supplied pass as a flash var.
    if (source) {
      this.ready(function () {
        this.setSource(source);
      });
    }

    // Add placeholder to player div
    Lib.insertFirst(placeHolder, parentEl);

    // Having issues with Flash reloading on certain page actions (hide/resize/fullscreen) in certain browsers
    // This allows resetting the playhead when we catch the reload
    if (options.startTime) {
      this.ready(function () {
        this.load();
        this.play();
        this.currentTime(options.startTime);
      });
    }

    // firefox doesn't bubble mousemove events to parent. videojs/video-js-swf#37
    // bugzilla bug: https://bugzilla.mozilla.org/show_bug.cgi?id=836786
    if (Lib.IS_FIREFOX) {
      this.ready(function () {
        this.on('mousemove', function () {
          // since it's a custom event, don't bubble higher than the player
          this.player().trigger({ type: 'mousemove', bubbles: false });
        });
      });
    }

    // native click events on the SWF aren't triggered on IE11, Win8.1RT
    // use stageclick events triggered from inside the SWF instead
    player.on('stageclick', player.reportUserActivity);

    this.el_ = Flash.embed(options.swf, placeHolder, flashVars, params, attributes);
  }

  _inherits(Flash, _Tech);

  _createClass(Flash, [{
    key: 'play',
    value: function play() {
      this.el_.vjs_play();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.el_.vjs_pause();
    }
  }, {
    key: 'src',
    value: (function (_src) {
      function src(_x) {
        return _src.apply(this, arguments);
      }

      src.toString = function () {
        return _src.toString();
      };

      return src;
    })(function (src) {
      if (src === undefined) {
        return this.currentSrc();
      }

      // Setting src through `src` not `setSrc` will be deprecated
      return this.setSrc(src);
    })
  }, {
    key: 'setSrc',
    value: function setSrc(src) {
      // Make sure source URL is absolute.
      src = Lib.getAbsoluteURL(src);
      this.el_.vjs_src(src);

      // Currently the SWF doesn't autoplay if you load a source later.
      // e.g. Load player w/ no source, wait 2s, set src.
      if (this.player_.autoplay()) {
        var tech = this;
        this.setTimeout(function () {
          tech.play();
        }, 0);
      }
    }
  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime(time) {
      this.lastSeekTarget_ = time;
      this.el_.vjs_setProperty('currentTime', time);
      _get(Object.getPrototypeOf(Flash.prototype), 'setCurrentTime', this).call(this);
    }
  }, {
    key: 'currentTime',
    value: function currentTime(time) {
      // when seeking make the reported time keep up with the requested time
      // by reading the time we're seeking to
      if (this.seeking()) {
        return this.lastSeekTarget_ || 0;
      }
      return this.el_.vjs_getProperty('currentTime');
    }
  }, {
    key: 'currentSrc',
    value: function currentSrc() {
      if (this.currentSource_) {
        return this.currentSource_.src;
      } else {
        return this.el_.vjs_getProperty('currentSrc');
      }
    }
  }, {
    key: 'load',
    value: function load() {
      this.el_.vjs_load();
    }
  }, {
    key: 'poster',
    value: function poster() {
      this.el_.vjs_getProperty('poster');
    }
  }, {
    key: 'setPoster',

    // poster images are not handled by the Flash tech so make this a no-op
    value: function setPoster() {}
  }, {
    key: 'buffered',
    value: function buffered() {
      return Lib.createTimeRange(0, this.el_.vjs_getProperty('buffered'));
    }
  }, {
    key: 'supportsFullScreen',
    value: function supportsFullScreen() {
      return false; // Flash does not allow fullscreen through javascript
    }
  }, {
    key: 'enterFullScreen',
    value: function enterFullScreen() {
      return false;
    }
  }]);

  return Flash;
})(_Tech3['default']);

// Create setters and getters for attributes
var _api = Flash.prototype;
var _readWrite = 'rtmpConnection,rtmpStream,preload,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted'.split(',');
var _readOnly = 'error,networkState,readyState,seeking,initialTime,duration,startOffsetTime,paused,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight'.split(',');

function _createSetter(attr) {
  var attrUpper = attr.charAt(0).toUpperCase() + attr.slice(1);
  _api['set' + attrUpper] = function (val) {
    return this.el_.vjs_setProperty(attr, val);
  };
}
function _createGetter(attr) {
  _api[attr] = function () {
    return this.el_.vjs_getProperty(attr);
  };
}

// Create getter and setters for all read/write attributes
for (var i = 0; i < _readWrite.length; i++) {
  _createGetter(_readWrite[i]);
  _createSetter(_readWrite[i]);
}

// Create getters for read-only attributes
for (var i = 0; i < _readOnly.length; i++) {
  _createGetter(_readOnly[i]);
}

/* Flash Support Testing -------------------------------------------------------- */

Flash.isSupported = function () {
  return Flash.version()[0] >= 10;
  // return swfobject.hasFlashPlayerVersion('10');
};

// Add Source Handler pattern functions to this tech
_Tech3['default'].withSourceHandlers(Flash);

/**
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Flash.nativeSourceHandler = {};

/**
 * Check Flash can handle the source natively
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Flash.nativeSourceHandler.canHandleSource = function (source) {
  var type;

  function guessMimeType(src) {
    var ext = Lib.getFileExtension(src);
    if (ext) {
      return 'video/' + ext;
    }
    return '';
  }

  if (!source.type) {
    type = guessMimeType(source.src);
  } else {
    // Strip code information from the type because we don't get that specific
    type = source.type.replace(/;.*/, '').toLowerCase();
  }

  if (type in Flash.formats) {
    return 'maybe';
  }

  return '';
};

/**
 * Pass the source to the flash object
 * Adaptive source handlers will have more complicated workflows before passing
 * video data to the video element
 * @param  {Object} source    The source object
 * @param  {Flash} tech   The instance of the Flash tech
 */
Flash.nativeSourceHandler.handleSource = function (source, tech) {
  tech.setSrc(source.src);
};

/**
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Flash.nativeSourceHandler.dispose = function () {};

// Register the native source handler
Flash.registerSourceHandler(Flash.nativeSourceHandler);

Flash.formats = {
  'video/flv': 'FLV',
  'video/x-flv': 'FLV',
  'video/mp4': 'MP4',
  'video/m4v': 'MP4'
};

Flash.onReady = function (currSwf) {
  var el = Lib.el(currSwf);

  // get player from the player div property
  var player = el && el.parentNode && el.parentNode.player;

  // if there is no el or player then the tech has been disposed
  // and the tech element was removed from the player div
  if (player) {
    // reference player on tech element
    el.player = player;
    // check that the flash object is really ready
    Flash.checkReady(player.tech);
  }
};

// The SWF isn't always ready when it says it is. Sometimes the API functions still need to be added to the object.
// If it's not ready, we set a timeout to check again shortly.
Flash.checkReady = function (tech) {
  // stop worrying if the tech has been disposed
  if (!tech.el()) {
    return;
  }

  // check if API property exists
  if (tech.el().vjs_getProperty) {
    // tell tech it's ready
    tech.triggerReady();
  } else {
    // wait longer
    this.setTimeout(function () {
      Flash.checkReady(tech);
    }, 50);
  }
};

// Trigger events from the swf on the player
Flash.onEvent = function (swfID, eventName) {
  var player = Lib.el(swfID).player;
  player.trigger(eventName);
};

// Log errors from the swf
Flash.onError = function (swfID, err) {
  var player = Lib.el(swfID).player;
  var msg = 'FLASH: ' + err;

  if (err == 'srcnotfound') {
    player.error({ code: 4, message: msg });

    // errors we haven't categorized into the media errors
  } else {
    player.error(msg);
  }
};

// Flash Version Check
Flash.version = function () {
  var version = '0,0,0';

  // IE
  try {
    version = new _window2['default'].ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];

    // other browsers
  } catch (e) {
    try {
      if (navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
        version = (navigator.plugins['Shockwave Flash 2.0'] || navigator.plugins['Shockwave Flash']).description.replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
      }
    } catch (err) {}
  }
  return version.split(',');
};

// Flash embedding method. Only used in non-iframe mode
Flash.embed = function (swf, placeHolder, flashVars, params, attributes) {
  var code = Flash.getEmbedCode(swf, flashVars, params, attributes);

  // Get element by embedding code and retrieving created element
  var obj = Lib.createEl('div', { innerHTML: code }).childNodes[0];

  var par = placeHolder.parentNode;

  placeHolder.parentNode.replaceChild(obj, placeHolder);
  return obj;
};

Flash.getEmbedCode = function (swf, flashVars, params, attributes) {
  var objTag = '<object type="application/x-shockwave-flash" ';
  var flashVarsString = '';
  var paramsString = '';
  var attrsString = '';

  // Convert flash vars to string
  if (flashVars) {
    Lib.obj.each(flashVars, function (key, val) {
      flashVarsString += '' + key + '=' + val + '&amp;';
    });
  }

  // Add swf, flashVars, and other default params
  params = Lib.obj.merge({
    movie: swf,
    flashvars: flashVarsString,
    allowScriptAccess: 'always', // Required to talk to swf
    allowNetworking: 'all' // All should be default, but having security issues.
  }, params);

  // Create param tags string
  Lib.obj.each(params, function (key, val) {
    paramsString += '<param name="' + key + '" value="' + val + '" />';
  });

  attributes = Lib.obj.merge({
    // Add swf to attributes (need both for IE and Others to work)
    data: swf,

    // Default to 100% width/height
    width: '100%',
    height: '100%'

  }, attributes);

  // Create Attributes string
  Lib.obj.each(attributes, function (key, val) {
    attrsString += '' + key + '="' + val + '" ';
  });

  return '' + objTag + '' + attrsString + '>' + paramsString + '</object>';
};

// Run Flash through the RTMP decorator
_FlashRtmpDecorator2['default'](Flash);

_Tech3['default'].registerComponent('Flash', Flash);
exports['default'] = Flash;
module.exports = exports['default'];

},{"../component":7,"../lib":46,"./flash-rtmp":59,"./tech":63,"global/window":2}],61:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * @fileoverview HTML5 Media Controller - Wrapper for HTML5 Media API
 */

var _Tech2 = _dereq_('./tech.js');

var _Tech3 = _interopRequireDefault(_Tech2);

var _Component = _dereq_('../component');

var _Component2 = _interopRequireDefault(_Component);

var _import = _dereq_('../lib');

var Lib = _interopRequireWildcard(_import);

var _import2 = _dereq_('../util');

var VjsUtil = _interopRequireWildcard(_import2);

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

/**
 * HTML5 Media Controller - Wrapper for HTML5 Media API
 * @param {Player|Object} player
 * @param {Object=} options
 * @param {Function=} ready
 * @constructor
 */

var Html5 = (function (_Tech) {
  function Html5(player, options, ready) {
    _classCallCheck(this, Html5);

    _get(Object.getPrototypeOf(Html5.prototype), 'constructor', this).call(this, player, options, ready);

    this.setupTriggers();

    var source = options.source;

    // Set the source if one is provided
    // 1) Check if the source is new (if not, we want to keep the original so playback isn't interrupted)
    // 2) Check to see if the network state of the tag was failed at init, and if so, reset the source
    // anyway so the error gets fired.
    if (source && (this.el_.currentSrc !== source.src || player.tag && player.tag.initNetworkState_ === 3)) {
      this.setSource(source);
    }

    if (this.el_.hasChildNodes()) {

      var nodes = this.el_.childNodes;
      var nodesLength = nodes.length;
      var removeNodes = [];

      while (nodesLength--) {
        var node = nodes[nodesLength];
        var nodeName = node.nodeName.toLowerCase();
        if (nodeName === 'track') {
          if (!this.featuresNativeTextTracks) {
            // Empty video tag tracks so the built-in player doesn't use them also.
            // This may not be fast enough to stop HTML5 browsers from reading the tags
            // so we'll need to turn off any default tracks if we're manually doing
            // captions and subtitles. videoElement.textTracks
            removeNodes.push(node);
          } else {
            this.remoteTextTracks().addTrack_(node.track);
          }
        }
      }

      for (var i = 0; i < removeNodes.length; i++) {
        this.el_.removeChild(removeNodes[i]);
      }
    }

    if (this.featuresNativeTextTracks) {
      this.on('loadstart', Lib.bind(this, this.hideCaptions));
    }

    // Determine if native controls should be used
    // Our goal should be to get the custom controls on mobile solid everywhere
    // so we can remove this all together. Right now this will block custom
    // controls on touch enabled laptops like the Chrome Pixel
    if (Lib.TOUCH_ENABLED && player.options().nativeControlsForTouch === true) {
      this.useNativeControls();
    }

    // Chrome and Safari both have issues with autoplay.
    // In Safari (5.1.1), when we move the video element into the container div, autoplay doesn't work.
    // In Chrome (15), if you have autoplay + a poster + no controls, the video gets hidden (but audio plays)
    // This fixes both issues. Need to wait for API, so it updates displays correctly
    player.ready(function () {
      if (this.tag && this.options_.autoplay && this.paused()) {
        delete this.tag.poster; // Chrome Fix. Fixed in Chrome v16.
        this.play();
      }
    });

    this.triggerReady();
  }

  _inherits(Html5, _Tech);

  _createClass(Html5, [{
    key: 'dispose',
    value: function dispose() {
      Html5.disposeMediaElement(this.el_);
      _get(Object.getPrototypeOf(Html5.prototype), 'dispose', this).call(this);
    }
  }, {
    key: 'createEl',
    value: function createEl() {
      var player = this.player_;
      var el = player.tag;

      // Check if this browser supports moving the element into the box.
      // On the iPhone video will break if you move the element,
      // So we have to create a brand new element.
      if (!el || this.movingMediaElementInDOM === false) {

        // If the original tag is still there, clone and remove it.
        if (el) {
          var clone = el.cloneNode(false);
          Html5.disposeMediaElement(el);
          el = clone;
          player.tag = null;
        } else {
          el = Lib.createEl('video');

          // determine if native controls should be used
          var attributes = VjsUtil.mergeOptions({}, player.tagAttributes);
          if (!Lib.TOUCH_ENABLED || player.options().nativeControlsForTouch !== true) {
            delete attributes.controls;
          }

          Lib.setElementAttributes(el, Lib.obj.merge(attributes, {
            id: player.id() + '_html5_api',
            'class': 'vjs-tech'
          }));
        }
        // associate the player with the new tag
        el.player = player;

        if (player.options_.tracks) {
          for (var i = 0; i < player.options_.tracks.length; i++) {
            var track = player.options_.tracks[i];
            var trackEl = _document2['default'].createElement('track');
            trackEl.kind = track.kind;
            trackEl.label = track.label;
            trackEl.srclang = track.srclang;
            trackEl.src = track.src;
            if ('default' in track) {
              trackEl.setAttribute('default', 'default');
            }
            el.appendChild(trackEl);
          }
        }

        Lib.insertFirst(el, player.el());
      }

      // Update specific tag settings, in case they were overridden
      var settingsAttrs = ['autoplay', 'preload', 'loop', 'muted'];
      for (var i = settingsAttrs.length - 1; i >= 0; i--) {
        var attr = settingsAttrs[i];
        var overwriteAttrs = {};
        if (typeof player.options_[attr] !== 'undefined') {
          overwriteAttrs[attr] = player.options_[attr];
        }
        Lib.setElementAttributes(el, overwriteAttrs);
      }

      return el;
      // jenniisawesome = true;
    }
  }, {
    key: 'hideCaptions',
    value: function hideCaptions() {
      var tracks = this.el_.querySelectorAll('track');
      var i = tracks.length;
      var kinds = {
        captions: 1,
        subtitles: 1
      };

      while (i--) {
        var track = tracks[i].track;
        if (track && track.kind in kinds && !tracks[i]['default']) {
          track.mode = 'disabled';
        }
      }
    }
  }, {
    key: 'setupTriggers',

    // Make video events trigger player events
    // May seem verbose here, but makes other APIs possible.
    // Triggers removed using this.off when disposed
    value: function setupTriggers() {
      for (var i = Html5.Events.length - 1; i >= 0; i--) {
        this.on(Html5.Events[i], this.eventHandler);
      }
    }
  }, {
    key: 'eventHandler',
    value: function eventHandler(evt) {
      // In the case of an error on the video element, set the error prop
      // on the player and let the player handle triggering the event. On
      // some platforms, error events fire that do not cause the error
      // property on the video element to be set. See #1465 for an example.
      if (evt.type == 'error' && this.error()) {
        this.player().error(this.error().code);

        // in some cases we pass the event directly to the player
      } else {
        // No need for media events to bubble up.
        evt.bubbles = false;

        this.player().trigger(evt);
      }
    }
  }, {
    key: 'useNativeControls',
    value: function useNativeControls() {
      var tech = this;
      var player = this.player();

      // If the player controls are enabled turn on the native controls
      tech.setControls(player.controls());

      // Update the native controls when player controls state is updated
      var controlsOn = function controlsOn() {
        tech.setControls(true);
      };
      var controlsOff = function controlsOff() {
        tech.setControls(false);
      };
      player.on('controlsenabled', controlsOn);
      player.on('controlsdisabled', controlsOff);

      // Clean up when not using native controls anymore
      var cleanUp = function cleanUp() {
        player.off('controlsenabled', controlsOn);
        player.off('controlsdisabled', controlsOff);
      };
      tech.on('dispose', cleanUp);
      player.on('usingcustomcontrols', cleanUp);

      // Update the state of the player to using native controls
      player.usingNativeControls(true);
    }
  }, {
    key: 'play',
    value: function play() {
      this.el_.play();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.el_.pause();
    }
  }, {
    key: 'paused',
    value: function paused() {
      return this.el_.paused;
    }
  }, {
    key: 'currentTime',
    value: function currentTime() {
      return this.el_.currentTime;
    }
  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime(seconds) {
      try {
        this.el_.currentTime = seconds;
      } catch (e) {
        Lib.log(e, 'Video is not ready. (Video.js)');
        // this.warning(VideoJS.warnings.videoNotReady);
      }
    }
  }, {
    key: 'duration',
    value: function duration() {
      return this.el_.duration || 0;
    }
  }, {
    key: 'buffered',
    value: function buffered() {
      return this.el_.buffered;
    }
  }, {
    key: 'volume',
    value: function volume() {
      return this.el_.volume;
    }
  }, {
    key: 'setVolume',
    value: function setVolume(percentAsDecimal) {
      this.el_.volume = percentAsDecimal;
    }
  }, {
    key: 'muted',
    value: function muted() {
      return this.el_.muted;
    }
  }, {
    key: 'setMuted',
    value: function setMuted(muted) {
      this.el_.muted = muted;
    }
  }, {
    key: 'width',
    value: function width() {
      return this.el_.offsetWidth;
    }
  }, {
    key: 'height',
    value: function height() {
      return this.el_.offsetHeight;
    }
  }, {
    key: 'supportsFullScreen',
    value: function supportsFullScreen() {
      if (typeof this.el_.webkitEnterFullScreen == 'function') {

        // Seems to be broken in Chromium/Chrome && Safari in Leopard
        if (/Android/.test(Lib.USER_AGENT) || !/Chrome|Mac OS X 10.5/.test(Lib.USER_AGENT)) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'enterFullScreen',
    value: function enterFullScreen() {
      var video = this.el_;

      if ('webkitDisplayingFullscreen' in video) {
        this.one('webkitbeginfullscreen', function () {
          this.player_.isFullscreen(true);

          this.one('webkitendfullscreen', function () {
            this.player_.isFullscreen(false);
            this.player_.trigger('fullscreenchange');
          });

          this.player_.trigger('fullscreenchange');
        });
      }

      if (video.paused && video.networkState <= video.HAVE_METADATA) {
        // attempt to prime the video element for programmatic access
        // this isn't necessary on the desktop but shouldn't hurt
        this.el_.play();

        // playing and pausing synchronously during the transition to fullscreen
        // can get iOS ~6.1 devices into a play/pause loop
        this.setTimeout(function () {
          video.pause();
          video.webkitEnterFullScreen();
        }, 0);
      } else {
        video.webkitEnterFullScreen();
      }
    }
  }, {
    key: 'exitFullScreen',
    value: function exitFullScreen() {
      this.el_.webkitExitFullScreen();
    }
  }, {
    key: 'src',
    value: (function (_src) {
      function src(_x) {
        return _src.apply(this, arguments);
      }

      src.toString = function () {
        return _src.toString();
      };

      return src;
    })(function (src) {
      if (src === undefined) {
        return this.el_.src;
      } else {
        // Setting src through `src` instead of `setSrc` will be deprecated
        this.setSrc(src);
      }
    })
  }, {
    key: 'setSrc',
    value: function setSrc(src) {
      this.el_.src = src;
    }
  }, {
    key: 'load',
    value: function load() {
      this.el_.load();
    }
  }, {
    key: 'currentSrc',
    value: function currentSrc() {
      return this.el_.currentSrc;
    }
  }, {
    key: 'poster',
    value: function poster() {
      return this.el_.poster;
    }
  }, {
    key: 'setPoster',
    value: function setPoster(val) {
      this.el_.poster = val;
    }
  }, {
    key: 'preload',
    value: function preload() {
      return this.el_.preload;
    }
  }, {
    key: 'setPreload',
    value: function setPreload(val) {
      this.el_.preload = val;
    }
  }, {
    key: 'autoplay',
    value: function autoplay() {
      return this.el_.autoplay;
    }
  }, {
    key: 'setAutoplay',
    value: function setAutoplay(val) {
      this.el_.autoplay = val;
    }
  }, {
    key: 'controls',
    value: function controls() {
      return this.el_.controls;
    }
  }, {
    key: 'setControls',
    value: function setControls(val) {
      this.el_.controls = !!val;
    }
  }, {
    key: 'loop',
    value: function loop() {
      return this.el_.loop;
    }
  }, {
    key: 'setLoop',
    value: function setLoop(val) {
      this.el_.loop = val;
    }
  }, {
    key: 'error',
    value: function error() {
      return this.el_.error;
    }
  }, {
    key: 'seeking',
    value: function seeking() {
      return this.el_.seeking;
    }
  }, {
    key: 'ended',
    value: function ended() {
      return this.el_.ended;
    }
  }, {
    key: 'defaultMuted',
    value: function defaultMuted() {
      return this.el_.defaultMuted;
    }
  }, {
    key: 'playbackRate',
    value: function playbackRate() {
      return this.el_.playbackRate;
    }
  }, {
    key: 'setPlaybackRate',
    value: function setPlaybackRate(val) {
      this.el_.playbackRate = val;
    }
  }, {
    key: 'networkState',
    value: function networkState() {
      return this.el_.networkState;
    }
  }, {
    key: 'readyState',
    value: function readyState() {
      return this.el_.readyState;
    }
  }, {
    key: 'textTracks',
    value: function textTracks() {
      if (!this.featuresNativeTextTracks) {
        return _get(Object.getPrototypeOf(Html5.prototype), 'textTracks', this).call(this);
      }

      return this.el_.textTracks;
    }
  }, {
    key: 'addTextTrack',
    value: function addTextTrack(kind, label, language) {
      if (!this.featuresNativeTextTracks) {
        return _get(Object.getPrototypeOf(Html5.prototype), 'addTextTrack', this).call(this, kind, label, language);
      }

      return this.el_.addTextTrack(kind, label, language);
    }
  }, {
    key: 'addRemoteTextTrack',
    value: function addRemoteTextTrack() {
      var options = arguments[0] === undefined ? {} : arguments[0];

      if (!this.featuresNativeTextTracks) {
        return _get(Object.getPrototypeOf(Html5.prototype), 'addRemoteTextTrack', this).call(this, options);
      }

      var track = _document2['default'].createElement('track');

      if (options.kind) {
        track.kind = options.kind;
      }
      if (options.label) {
        track.label = options.label;
      }
      if (options.language || options.srclang) {
        track.srclang = options.language || options.srclang;
      }
      if (options['default']) {
        track['default'] = options['default'];
      }
      if (options.id) {
        track.id = options.id;
      }
      if (options.src) {
        track.src = options.src;
      }

      this.el().appendChild(track);

      if (track.track.kind === 'metadata') {
        track.track.mode = 'hidden';
      } else {
        track.track.mode = 'disabled';
      }

      track.onload = function () {
        var tt = track.track;
        if (track.readyState >= 2) {
          if (tt.kind === 'metadata' && tt.mode !== 'hidden') {
            tt.mode = 'hidden';
          } else if (tt.kind !== 'metadata' && tt.mode !== 'disabled') {
            tt.mode = 'disabled';
          }
          track.onload = null;
        }
      };

      this.remoteTextTracks().addTrack_(track.track);

      return track;
    }
  }, {
    key: 'removeRemoteTextTrack',
    value: function removeRemoteTextTrack(track) {
      if (!this.featuresNativeTextTracks) {
        return _get(Object.getPrototypeOf(Html5.prototype), 'removeRemoteTextTrack', this).call(this, track);
      }

      var tracks, i;

      this.remoteTextTracks().removeTrack_(track);

      tracks = this.el().querySelectorAll('track');

      for (i = 0; i < tracks.length; i++) {
        if (tracks[i] === track || tracks[i].track === track) {
          tracks[i].parentNode.removeChild(tracks[i]);
          break;
        }
      }
    }
  }]);

  return Html5;
})(_Tech3['default']);

/* HTML5 Support Testing ---------------------------------------------------- */

/**
 * Check if HTML5 video is supported by this browser/device
 * @return {Boolean}
 */
Html5.isSupported = function () {
  // IE9 with no Media Player is a LIAR! (#984)
  try {
    Lib.TEST_VID.volume = 0.5;
  } catch (e) {
    return false;
  }

  return !!Lib.TEST_VID.canPlayType;
};

// Add Source Handler pattern functions to this tech
_Tech3['default'].withSourceHandlers(Html5);

/**
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 * @param  {Object} source   The source object
 * @param  {Html5} tech  The instance of the HTML5 tech
 */
Html5.nativeSourceHandler = {};

/**
 * Check if the video element can handle the source natively
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Html5.nativeSourceHandler.canHandleSource = function (source) {
  var match, ext;

  function canPlayType(type) {
    // IE9 on Windows 7 without MediaPlayer throws an error here
    // https://github.com/videojs/video.js/issues/519
    try {
      return Lib.TEST_VID.canPlayType(type);
    } catch (e) {
      return '';
    }
  }

  // If a type was provided we should rely on that
  if (source.type) {
    return canPlayType(source.type);
  } else if (source.src) {
    // If no type, fall back to checking 'video/[EXTENSION]'
    ext = Lib.getFileExtension(source.src);

    return canPlayType('video/' + ext);
  }

  return '';
};

/**
 * Pass the source to the video element
 * Adaptive source handlers will have more complicated workflows before passing
 * video data to the video element
 * @param  {Object} source    The source object
 * @param  {Html5} tech   The instance of the Html5 tech
 */
Html5.nativeSourceHandler.handleSource = function (source, tech) {
  tech.setSrc(source.src);
};

/**
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Html5.nativeSourceHandler.dispose = function () {};

// Register the native source handler
Html5.registerSourceHandler(Html5.nativeSourceHandler);

/**
 * Check if the volume can be changed in this browser/device.
 * Volume cannot be changed in a lot of mobile devices.
 * Specifically, it can't be changed from 1 on iOS.
 * @return {Boolean}
 */
Html5.canControlVolume = function () {
  var volume = Lib.TEST_VID.volume;
  Lib.TEST_VID.volume = volume / 2 + 0.1;
  return volume !== Lib.TEST_VID.volume;
};

/**
 * Check if playbackRate is supported in this browser/device.
 * @return {[type]} [description]
 */
Html5.canControlPlaybackRate = function () {
  var playbackRate = Lib.TEST_VID.playbackRate;
  Lib.TEST_VID.playbackRate = playbackRate / 2 + 0.1;
  return playbackRate !== Lib.TEST_VID.playbackRate;
};

/**
 * Check to see if native text tracks are supported by this browser/device
 * @return {Boolean}
 */
Html5.supportsNativeTextTracks = function () {
  var supportsTextTracks;

  // Figure out native text track support
  // If mode is a number, we cannot change it because it'll disappear from view.
  // Browsers with numeric modes include IE10 and older (<=2013) samsung android models.
  // Firefox isn't playing nice either with modifying the mode
  // TODO: Investigate firefox: https://github.com/videojs/video.js/issues/1862
  supportsTextTracks = !!Lib.TEST_VID.textTracks;
  if (supportsTextTracks && Lib.TEST_VID.textTracks.length > 0) {
    supportsTextTracks = typeof Lib.TEST_VID.textTracks[0].mode !== 'number';
  }
  if (supportsTextTracks && Lib.IS_FIREFOX) {
    supportsTextTracks = false;
  }

  return supportsTextTracks;
};

/**
 * Set the tech's volume control support status
 * @type {Boolean}
 */
Html5.prototype.featuresVolumeControl = Html5.canControlVolume();

/**
 * Set the tech's playbackRate support status
 * @type {Boolean}
 */
Html5.prototype.featuresPlaybackRate = Html5.canControlPlaybackRate();

/**
 * Set the tech's status on moving the video element.
 * In iOS, if you move a video element in the DOM, it breaks video playback.
 * @type {Boolean}
 */
Html5.prototype.movingMediaElementInDOM = !Lib.IS_IOS;

/**
 * Set the the tech's fullscreen resize support status.
 * HTML video is able to automatically resize when going to fullscreen.
 * (No longer appears to be used. Can probably be removed.)
 */
Html5.prototype.featuresFullscreenResize = true;

/**
 * Set the tech's progress event support status
 * (this disables the manual progress events of the Tech)
 */
Html5.prototype.featuresProgressEvents = true;

/**
 * Sets the tech's status on native text track support
 * @type {Boolean}
 */
Html5.prototype.featuresNativeTextTracks = Html5.supportsNativeTextTracks();

// HTML5 Feature detection and Device Fixes --------------------------------- //
var canPlayType = undefined;
var mpegurlRE = /^application\/(?:x-|vnd\.apple\.)mpegurl/i;
var mp4RE = /^video\/mp4/i;

Html5.patchCanPlayType = function () {
  // Android 4.0 and above can play HLS to some extent but it reports being unable to do so
  if (Lib.ANDROID_VERSION >= 4) {
    if (!canPlayType) {
      canPlayType = Lib.TEST_VID.constructor.prototype.canPlayType;
    }

    Lib.TEST_VID.constructor.prototype.canPlayType = function (type) {
      if (type && mpegurlRE.test(type)) {
        return 'maybe';
      }
      return canPlayType.call(this, type);
    };
  }

  // Override Android 2.2 and less canPlayType method which is broken
  if (Lib.IS_OLD_ANDROID) {
    if (!canPlayType) {
      canPlayType = Lib.TEST_VID.constructor.prototype.canPlayType;
    }

    Lib.TEST_VID.constructor.prototype.canPlayType = function (type) {
      if (type && mp4RE.test(type)) {
        return 'maybe';
      }
      return canPlayType.call(this, type);
    };
  }
};

Html5.unpatchCanPlayType = function () {
  var r = Lib.TEST_VID.constructor.prototype.canPlayType;
  Lib.TEST_VID.constructor.prototype.canPlayType = canPlayType;
  canPlayType = null;
  return r;
};

// by default, patch the video element
Html5.patchCanPlayType();

// List of all HTML5 events (various uses).
Html5.Events = 'loadstart,suspend,abort,error,emptied,stalled,loadedmetadata,loadeddata,canplay,canplaythrough,playing,waiting,seeking,seeked,ended,durationchange,timeupdate,progress,play,pause,ratechange,volumechange'.split(',');

Html5.disposeMediaElement = function (el) {
  if (!el) {
    return;
  }

  el.player = null;

  if (el.parentNode) {
    el.parentNode.removeChild(el);
  }

  // remove any child track or source nodes to prevent their loading
  while (el.hasChildNodes()) {
    el.removeChild(el.firstChild);
  }

  // remove any src reference. not setting `src=''` because that causes a warning
  // in firefox
  el.removeAttribute('src');

  // force the media element to update its loading state by calling load()
  // however IE on Windows 7N has a bug that throws an error so need a try/catch (#793)
  if (typeof el.load === 'function') {
    // wrapping in an iife so it's not deoptimized (#1060#discussion_r10324473)
    (function () {
      try {
        el.load();
      } catch (e) {}
    })();
  }
};

_Component2['default'].registerComponent('Html5', Html5);
exports['default'] = Html5;
module.exports = exports['default'];

// not supported

},{"../component":7,"../lib":46,"../util":70,"./tech.js":63,"global/document":1}],62:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('../component');

var _Component3 = _interopRequireDefault(_Component2);

var _import = _dereq_('../lib');

var Lib = _interopRequireWildcard(_import);

var _window = _dereq_('global/window');

var _window2 = _interopRequireDefault(_window);

/**
 * The Media Loader is the component that decides which playback technology to load
 * when the player is initialized.
 *
 * @constructor
 */

var MediaLoader = (function (_Component) {
  function MediaLoader(player, options, ready) {
    _classCallCheck(this, MediaLoader);

    _get(Object.getPrototypeOf(MediaLoader.prototype), 'constructor', this).call(this, player, options, ready);

    // If there are no sources when the player is initialized,
    // load the first supported playback technology.
    if (!player.options_.sources || player.options_.sources.length === 0) {
      for (var i = 0, j = player.options_.techOrder; i < j.length; i++) {
        var techName = Lib.capitalize(j[i]);
        var tech = _Component3['default'].getComponent(techName);

        // Check if the browser supports this technology
        if (tech && tech.isSupported()) {
          player.loadTech(techName);
          break;
        }
      }
    } else {
      // // Loop through playback technologies (HTML5, Flash) and check for support.
      // // Then load the best source.
      // // A few assumptions here:
      // //   All playback technologies respect preload false.
      player.src(player.options_.sources);
    }
  }

  _inherits(MediaLoader, _Component);

  return MediaLoader;
})(_Component3['default']);

_Component3['default'].registerComponent('MediaLoader', MediaLoader);
exports['default'] = MediaLoader;
module.exports = exports['default'];

},{"../component":7,"../lib":46,"global/window":2}],63:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * @fileoverview Media Technology Controller - Base class for media playback
 * technology controllers like Flash and HTML5
 */

var _Component2 = _dereq_('../component');

var _Component3 = _interopRequireDefault(_Component2);

var _TextTrack = _dereq_('../tracks/text-track');

var _TextTrack2 = _interopRequireDefault(_TextTrack);

var _TextTrackList = _dereq_('../tracks/text-track-list');

var _TextTrackList2 = _interopRequireDefault(_TextTrackList);

var _import = _dereq_('../lib');

var Lib = _interopRequireWildcard(_import);

var _window = _dereq_('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

/**
 * Base class for media (HTML5 Video, Flash) controllers
 * @param {Player|Object} player  Central player instance
 * @param {Object=} options Options object
 * @constructor
 */

var Tech = (function (_Component) {
  function Tech(player) {
    var options = arguments[1] === undefined ? {} : arguments[1];
    var ready = arguments[2] === undefined ? function () {} : arguments[2];

    _classCallCheck(this, Tech);

    // we don't want the tech to report user activity automatically.
    // This is done manually in addControlsListeners
    options.reportTouchActivity = false;
    _get(Object.getPrototypeOf(Tech.prototype), 'constructor', this).call(this, player, options, ready);

    // Manually track progress in cases where the browser/flash player doesn't report it.
    if (!this.featuresProgressEvents) {
      this.manualProgressOn();
    }

    // Manually track timeupdates in cases where the browser/flash player doesn't report it.
    if (!this.featuresTimeupdateEvents) {
      this.manualTimeUpdatesOn();
    }

    this.initControlsListeners();

    if (options.nativeCaptions === false || options.nativeTextTracks === false) {
      this.featuresNativeTextTracks = false;
    }

    if (!this.featuresNativeTextTracks) {
      this.emulateTextTracks();
    }

    this.initTextTrackListeners();
  }

  _inherits(Tech, _Component);

  _createClass(Tech, [{
    key: 'initControlsListeners',

    /**
     * Set up click and touch listeners for the playback element
     * On desktops, a click on the video itself will toggle playback,
     * on a mobile device a click on the video toggles controls.
     * (toggling controls is done by toggling the user state between active and
     * inactive)
     *
     * A tap can signal that a user has become active, or has become inactive
     * e.g. a quick tap on an iPhone movie should reveal the controls. Another
     * quick tap should hide them again (signaling the user is in an inactive
     * viewing state)
     *
     * In addition to this, we still want the user to be considered inactive after
     * a few seconds of inactivity.
     *
     * Note: the only part of iOS interaction we can't mimic with this setup
     * is a touch and hold on the video element counting as activity in order to
     * keep the controls showing, but that shouldn't be an issue. A touch and hold on
     * any controls will still keep the user active
     */
    value: function initControlsListeners() {
      var player = this.player();

      var activateControls = function activateControls() {
        if (player.controls() && !player.usingNativeControls()) {
          this.addControlsListeners();
        }
      };

      // Set up event listeners once the tech is ready and has an element to apply
      // listeners to
      this.ready(activateControls);
      this.on(player, 'controlsenabled', activateControls);
      this.on(player, 'controlsdisabled', this.removeControlsListeners);

      // if we're loading the playback object after it has started loading or playing the
      // video (often with autoplay on) then the loadstart event has already fired and we
      // need to fire it manually because many things rely on it.
      // Long term we might consider how we would do this for other events like 'canplay'
      // that may also have fired.
      this.ready(function () {
        if (this.networkState && this.networkState() > 0) {
          this.player().trigger('loadstart');
        }
      });
    }
  }, {
    key: 'addControlsListeners',
    value: function addControlsListeners() {
      var userWasActive = undefined;

      // Some browsers (Chrome & IE) don't trigger a click on a flash swf, but do
      // trigger mousedown/up.
      // http://stackoverflow.com/questions/1444562/javascript-onclick-event-over-flash-object
      // Any touch events are set to block the mousedown event from happening
      this.on('mousedown', this.handleClick);

      // If the controls were hidden we don't want that to change without a tap event
      // so we'll check if the controls were already showing before reporting user
      // activity
      this.on('touchstart', function (event) {
        userWasActive = this.player_.userActive();
      });

      this.on('touchmove', function (event) {
        if (userWasActive) {
          this.player().reportUserActivity();
        }
      });

      this.on('touchend', function (event) {
        // Stop the mouse events from also happening
        event.preventDefault();
      });

      // Turn on component tap events
      this.emitTapEvents();

      // The tap listener needs to come after the touchend listener because the tap
      // listener cancels out any reportedUserActivity when setting userActive(false)
      this.on('tap', this.handleTap);
    }
  }, {
    key: 'removeControlsListeners',

    /**
     * Remove the listeners used for click and tap controls. This is needed for
     * toggling to controls disabled, where a tap/touch should do nothing.
     */
    value: function removeControlsListeners() {
      // We don't want to just use `this.off()` because there might be other needed
      // listeners added by techs that extend this.
      this.off('tap');
      this.off('touchstart');
      this.off('touchmove');
      this.off('touchleave');
      this.off('touchcancel');
      this.off('touchend');
      this.off('click');
      this.off('mousedown');
    }
  }, {
    key: 'handleClick',

    /**
     * Handle a click on the media element. By default will play/pause the media.
     */
    value: function handleClick(event) {
      // We're using mousedown to detect clicks thanks to Flash, but mousedown
      // will also be triggered with right-clicks, so we need to prevent that
      if (event.button !== 0) {
        return;
      } // When controls are disabled a click should not toggle playback because
      // the click is considered a control
      if (this.player().controls()) {
        if (this.player().paused()) {
          this.player().play();
        } else {
          this.player().pause();
        }
      }
    }
  }, {
    key: 'handleTap',

    /**
     * Handle a tap on the media element. By default it will toggle the user
     * activity state, which hides and shows the controls.
     */
    value: function handleTap() {
      this.player().userActive(!this.player().userActive());
    }
  }, {
    key: 'manualProgressOn',

    /* Fallbacks for unsupported event types
    ================================================================================ */
    // Manually trigger progress events based on changes to the buffered amount
    // Many flash players and older HTML5 browsers don't send progress or progress-like events
    value: function manualProgressOn() {
      this.manualProgress = true;

      // Trigger progress watching when a source begins loading
      this.trackProgress();
    }
  }, {
    key: 'manualProgressOff',
    value: function manualProgressOff() {
      this.manualProgress = false;
      this.stopTrackingProgress();
    }
  }, {
    key: 'trackProgress',
    value: function trackProgress() {
      this.progressInterval = this.setInterval(function () {
        // Don't trigger unless buffered amount is greater than last time

        var bufferedPercent = this.player().bufferedPercent();

        if (this.bufferedPercent_ != bufferedPercent) {
          this.player().trigger('progress');
        }

        this.bufferedPercent_ = bufferedPercent;

        if (bufferedPercent === 1) {
          this.stopTrackingProgress();
        }
      }, 500);
    }
  }, {
    key: 'stopTrackingProgress',
    value: function stopTrackingProgress() {
      this.clearInterval(this.progressInterval);
    }
  }, {
    key: 'manualTimeUpdatesOn',

    /*! Time Tracking -------------------------------------------------------------- */
    value: function manualTimeUpdatesOn() {
      var player = this.player_;

      this.manualTimeUpdates = true;

      this.on(player, 'play', this.trackCurrentTime);
      this.on(player, 'pause', this.stopTrackingCurrentTime);
      // timeupdate is also called by .currentTime whenever current time is set

      // Watch for native timeupdate event
      this.one('timeupdate', function () {
        // Update known progress support for this playback technology
        this.featuresTimeupdateEvents = true;
        // Turn off manual progress tracking
        this.manualTimeUpdatesOff();
      });
    }
  }, {
    key: 'manualTimeUpdatesOff',
    value: function manualTimeUpdatesOff() {
      var player = this.player_;

      this.manualTimeUpdates = false;
      this.stopTrackingCurrentTime();
      this.off(player, 'play', this.trackCurrentTime);
      this.off(player, 'pause', this.stopTrackingCurrentTime);
    }
  }, {
    key: 'trackCurrentTime',
    value: function trackCurrentTime() {
      if (this.currentTimeInterval) {
        this.stopTrackingCurrentTime();
      }
      this.currentTimeInterval = this.setInterval(function () {
        this.player().trigger('timeupdate');
      }, 250); // 42 = 24 fps // 250 is what Webkit uses // FF uses 15
    }
  }, {
    key: 'stopTrackingCurrentTime',

    // Turn off play progress tracking (when paused or dragging)
    value: function stopTrackingCurrentTime() {
      this.clearInterval(this.currentTimeInterval);

      // #1002 - if the video ends right before the next timeupdate would happen,
      // the progress bar won't make it all the way to the end
      this.player().trigger('timeupdate');
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      // Turn off any manual progress or timeupdate tracking
      if (this.manualProgress) {
        this.manualProgressOff();
      }

      if (this.manualTimeUpdates) {
        this.manualTimeUpdatesOff();
      }

      _get(Object.getPrototypeOf(Tech.prototype), 'dispose', this).call(this);
    }
  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime() {
      // improve the accuracy of manual timeupdates
      if (this.manualTimeUpdates) {
        this.player().trigger('timeupdate');
      }
    }
  }, {
    key: 'initTextTrackListeners',

    // TODO: Consider looking at moving this into the text track display directly
    // https://github.com/videojs/video.js/issues/1863
    value: function initTextTrackListeners() {
      var player = this.player_;

      var textTrackListChanges = function textTrackListChanges() {
        var textTrackDisplay = player.getChild('textTrackDisplay');

        if (textTrackDisplay) {
          textTrackDisplay.updateDisplay();
        }
      };

      var tracks = this.textTracks();

      if (!tracks) {
        return;
      }tracks.addEventListener('removetrack', textTrackListChanges);
      tracks.addEventListener('addtrack', textTrackListChanges);

      this.on('dispose', Lib.bind(this, function () {
        tracks.removeEventListener('removetrack', textTrackListChanges);
        tracks.removeEventListener('addtrack', textTrackListChanges);
      }));
    }
  }, {
    key: 'emulateTextTracks',
    value: function emulateTextTracks() {
      var player = this.player_;

      if (!_window2['default'].WebVTT) {
        var script = _document2['default'].createElement('script');
        script.src = player.options()['vtt.js'] || '../node_modules/vtt.js/dist/vtt.js';
        player.el().appendChild(script);
        _window2['default'].WebVTT = true;
      }

      var tracks = this.textTracks();
      if (!tracks) {
        return;
      }

      var textTracksChanges = function textTracksChanges() {
        var textTrackDisplay = player.getChild('textTrackDisplay');

        textTrackDisplay.updateDisplay();

        for (var i = 0; i < this.length; i++) {
          var track = this[i];
          track.removeEventListener('cuechange', Lib.bind(textTrackDisplay, textTrackDisplay.updateDisplay));
          if (track.mode === 'showing') {
            track.addEventListener('cuechange', Lib.bind(textTrackDisplay, textTrackDisplay.updateDisplay));
          }
        }
      };

      tracks.addEventListener('change', textTracksChanges);

      this.on('dispose', Lib.bind(this, function () {
        tracks.removeEventListener('change', textTracksChanges);
      }));
    }
  }, {
    key: 'textTracks',

    /**
     * Provide default methods for text tracks.
     *
     * Html5 tech overrides these.
     */

    value: function textTracks() {
      this.player_.textTracks_ = this.player_.textTracks_ || new _TextTrackList2['default']();
      return this.player_.textTracks_;
    }
  }, {
    key: 'remoteTextTracks',
    value: function remoteTextTracks() {
      this.player_.remoteTextTracks_ = this.player_.remoteTextTracks_ || new _TextTrackList2['default']();
      return this.player_.remoteTextTracks_;
    }
  }, {
    key: 'addTextTrack',
    value: function addTextTrack(kind, label, language) {
      if (!kind) {
        throw new Error('TextTrack kind is required but was not provided');
      }

      return createTrackHelper(this, kind, label, language);
    }
  }, {
    key: 'addRemoteTextTrack',
    value: function addRemoteTextTrack(options) {
      var track = createTrackHelper(this, options.kind, options.label, options.language, options);
      this.remoteTextTracks().addTrack_(track);
      return {
        track: track
      };
    }
  }, {
    key: 'removeRemoteTextTrack',
    value: function removeRemoteTextTrack(track) {
      this.textTracks().removeTrack_(track);
      this.remoteTextTracks().removeTrack_(track);
    }
  }, {
    key: 'setPoster',

    /**
     * Provide a default setPoster method for techs
     *
     * Poster support for techs should be optional, so we don't want techs to
     * break if they don't have a way to set a poster.
     */
    value: function setPoster() {}
  }]);

  return Tech;
})(_Component3['default']);

/**
 * List of associated text tracks
 * @type {Array}
 * @private
 */
Tech.prototype.textTracks_;

var createTrackHelper = function createTrackHelper(self, kind, label, language) {
  var options = arguments[4] === undefined ? {} : arguments[4];

  var tracks = self.textTracks();

  options.kind = kind;
  if (label) {
    options.label = label;
  }
  if (language) {
    options.language = language;
  }
  options.player = self.player_;

  var track = new _TextTrack2['default'](options);
  tracks.addTrack_(track);

  return track;
};

Tech.prototype.featuresVolumeControl = true;

// Resizing plugins using request fullscreen reloads the plugin
Tech.prototype.featuresFullscreenResize = false;
Tech.prototype.featuresPlaybackRate = false;

// Optional events that we can manually mimic with timers
// currently not triggered by video-js-swf
Tech.prototype.featuresProgressEvents = false;
Tech.prototype.featuresTimeupdateEvents = false;

Tech.prototype.featuresNativeTextTracks = false;

/**
 * A functional mixin for techs that want to use the Source Handler pattern.
 *
 * ##### EXAMPLE:
 *
 *   Tech.withSourceHandlers.call(MyTech);
 *
 */
Tech.withSourceHandlers = function (_Tech) {
  /**
   * Register a source handler
   * Source handlers are scripts for handling specific formats.
   * The source handler pattern is used for adaptive formats (HLS, DASH) that
   * manually load video data and feed it into a Source Buffer (Media Source Extensions)
   * @param  {Function} handler  The source handler
   * @param  {Boolean}  first    Register it before any existing handlers
   */
  _Tech.registerSourceHandler = function (handler, index) {
    var handlers = _Tech.sourceHandlers;

    if (!handlers) {
      handlers = _Tech.sourceHandlers = [];
    }

    if (index === undefined) {
      // add to the end of the list
      index = handlers.length;
    }

    handlers.splice(index, 0, handler);
  };

  /**
   * Return the first source handler that supports the source
   * TODO: Answer question: should 'probably' be prioritized over 'maybe'
   * @param  {Object} source The source object
   * @returns {Object}       The first source handler that supports the source
   * @returns {null}         Null if no source handler is found
   */
  _Tech.selectSourceHandler = function (source) {
    var handlers = _Tech.sourceHandlers || [];
    var can = undefined;

    for (var i = 0; i < handlers.length; i++) {
      can = handlers[i].canHandleSource(source);

      if (can) {
        return handlers[i];
      }
    }

    return null;
  };

  /**
  * Check if the tech can support the given source
  * @param  {Object} srcObj  The source object
  * @return {String}         'probably', 'maybe', or '' (empty string)
  */
  _Tech.canPlaySource = function (srcObj) {
    var sh = _Tech.selectSourceHandler(srcObj);

    if (sh) {
      return sh.canHandleSource(srcObj);
    }

    return '';
  };

  /**
   * Create a function for setting the source using a source object
   * and source handlers.
   * Should never be called unless a source handler was found.
   * @param {Object} source  A source object with src and type keys
   * @return {Tech} self
   */
  _Tech.prototype.setSource = function (source) {
    var sh = _Tech.selectSourceHandler(source);

    if (!sh) {
      // Fall back to a native source hander when unsupported sources are
      // deliberately set
      if (_Tech.nativeSourceHandler) {
        sh = _Tech.nativeSourceHandler;
      } else {
        Lib.log.error('No source hander found for the current source.');
      }
    }

    // Dispose any existing source handler
    this.disposeSourceHandler();
    this.off('dispose', this.disposeSourceHandler);

    this.currentSource_ = source;
    this.sourceHandler_ = sh.handleSource(source, this);
    this.on('dispose', this.disposeSourceHandler);

    return this;
  };

  /**
   * Clean up any existing source handler
   */
  _Tech.prototype.disposeSourceHandler = function () {
    if (this.sourceHandler_ && this.sourceHandler_.dispose) {
      this.sourceHandler_.dispose();
    }
  };
};

_Component3['default'].registerComponent('Tech', Tech);
// Old name for Tech
_Component3['default'].registerComponent('MediaTechController', Tech);
exports['default'] = Tech;
module.exports = exports['default'];

},{"../component":7,"../lib":46,"../tracks/text-track":69,"../tracks/text-track-list":67,"global/document":1,"global/window":2}],64:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = _dereq_('../lib');

var Lib = _interopRequireWildcard(_import);

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

/*
 * https://html.spec.whatwg.org/multipage/embedded-content.html#texttrackcuelist
 *
 * interface TextTrackCueList {
 *   readonly attribute unsigned long length;
 *   getter TextTrackCue (unsigned long index);
 *   TextTrackCue? getCueById(DOMString id);
 * };
 */

var TextTrackCueList = (function (_TextTrackCueList) {
  function TextTrackCueList(_x) {
    return _TextTrackCueList.apply(this, arguments);
  }

  TextTrackCueList.toString = function () {
    return _TextTrackCueList.toString();
  };

  return TextTrackCueList;
})(function (cues) {
  var list = this;

  if (Lib.IS_IE8) {
    list = _document2['default'].createElement('custom');

    for (var prop in TextTrackCueList.prototype) {
      list[prop] = TextTrackCueList.prototype[prop];
    }
  }

  TextTrackCueList.prototype.setCues_.call(list, cues);

  Object.defineProperty(list, 'length', {
    get: function get() {
      return this.length_;
    }
  });

  if (Lib.IS_IE8) {
    return list;
  }
});

TextTrackCueList.prototype.setCues_ = function (cues) {
  var oldLength = this.length || 0;
  var i = 0;
  var l = cues.length;

  this.cues_ = cues;
  this.length_ = cues.length;

  var defineProp = function defineProp(i) {
    if (!('' + i in this)) {
      Object.defineProperty(this, '' + i, {
        get: function get() {
          return this.cues_[i];
        }
      });
    }
  };

  if (oldLength < l) {
    i = oldLength;

    for (; i < l; i++) {
      defineProp.call(this, i);
    }
  }
};

TextTrackCueList.prototype.getCueById = function (id) {
  var result = null;
  for (var i = 0, l = this.length; i < l; i++) {
    var cue = this[i];
    if (cue.id === id) {
      result = cue;
      break;
    }
  }

  return result;
};

exports['default'] = TextTrackCueList;
module.exports = exports['default'];

},{"../lib":46,"global/document":1}],65:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('../component');

var _Component3 = _interopRequireDefault(_Component2);

var _Menu = _dereq_('../menu/menu.js');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = _dereq_('../menu/menu-item.js');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _MenuButton = _dereq_('../menu/menu-button.js');

var _MenuButton2 = _interopRequireDefault(_MenuButton);

var _import = _dereq_('../lib.js');

var Lib = _interopRequireWildcard(_import);

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

var _window = _dereq_('global/window');

var _window2 = _interopRequireDefault(_window);

var darkGray = '#222';
var lightGray = '#ccc';
var fontMap = {
  monospace: 'monospace',
  sansSerif: 'sans-serif',
  serif: 'serif',
  monospaceSansSerif: '"Andale Mono", "Lucida Console", monospace',
  monospaceSerif: '"Courier New", monospace',
  proportionalSansSerif: 'sans-serif',
  proportionalSerif: 'serif',
  casual: '"Comic Sans MS", Impact, fantasy',
  script: '"Monotype Corsiva", cursive',
  smallcaps: '"Andale Mono", "Lucida Console", monospace, sans-serif'
};

/**
 * The component for displaying text track cues
 *
 * @constructor
 */

var TextTrackDisplay = (function (_Component) {
  function TextTrackDisplay(player, options, ready) {
    _classCallCheck(this, TextTrackDisplay);

    _get(Object.getPrototypeOf(TextTrackDisplay.prototype), 'constructor', this).call(this, player, options, ready);

    player.on('loadstart', Lib.bind(this, this.toggleDisplay));

    // This used to be called during player init, but was causing an error
    // if a track should show by default and the display hadn't loaded yet.
    // Should probably be moved to an external track loader when we support
    // tracks that don't need a display.
    player.ready(Lib.bind(this, function () {
      if (player.tech && player.tech.featuresNativeTextTracks) {
        this.hide();
        return;
      }

      player.on('fullscreenchange', Lib.bind(this, this.updateDisplay));

      var tracks = player.options_.tracks || [];
      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        this.player_.addRemoteTextTrack(track);
      }
    }));
  }

  _inherits(TextTrackDisplay, _Component);

  _createClass(TextTrackDisplay, [{
    key: 'toggleDisplay',
    value: function toggleDisplay() {
      if (this.player_.tech && this.player_.tech.featuresNativeTextTracks) {
        this.hide();
      } else {
        this.show();
      }
    }
  }, {
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(TextTrackDisplay.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-text-track-display'
      });
    }
  }, {
    key: 'clearDisplay',
    value: function clearDisplay() {
      if (typeof _window2['default'].WebVTT === 'function') {
        _window2['default'].WebVTT.processCues(_window2['default'], [], this.el_);
      }
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      var tracks = this.player_.textTracks();

      this.clearDisplay();

      if (!tracks) {
        return;
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (track.mode === 'showing') {
          this.updateForTrack(track);
        }
      }
    }
  }, {
    key: 'updateForTrack',
    value: function updateForTrack(track) {
      if (typeof _window2['default'].WebVTT !== 'function' || !track.activeCues) {
        return;
      }

      var overrides = this.player_.textTrackSettings.getValues();

      var cues = [];
      for (var _i = 0; _i < track.activeCues.length; _i++) {
        cues.push(track.activeCues[_i]);
      }

      _window2['default'].WebVTT.processCues(_window2['default'], track.activeCues, this.el_);

      var i = cues.length;
      while (i--) {
        var cueDiv = cues[i].displayState;
        if (overrides.color) {
          cueDiv.firstChild.style.color = overrides.color;
        }
        if (overrides.textOpacity) {
          tryUpdateStyle(cueDiv.firstChild, 'color', constructColor(overrides.color || '#fff', overrides.textOpacity));
        }
        if (overrides.backgroundColor) {
          cueDiv.firstChild.style.backgroundColor = overrides.backgroundColor;
        }
        if (overrides.backgroundOpacity) {
          tryUpdateStyle(cueDiv.firstChild, 'backgroundColor', constructColor(overrides.backgroundColor || '#000', overrides.backgroundOpacity));
        }
        if (overrides.windowColor) {
          if (overrides.windowOpacity) {
            tryUpdateStyle(cueDiv, 'backgroundColor', constructColor(overrides.windowColor, overrides.windowOpacity));
          } else {
            cueDiv.style.backgroundColor = overrides.windowColor;
          }
        }
        if (overrides.edgeStyle) {
          if (overrides.edgeStyle === 'dropshadow') {
            cueDiv.firstChild.style.textShadow = '2px 2px 3px ' + darkGray + ', 2px 2px 4px ' + darkGray + ', 2px 2px 5px ' + darkGray;
          } else if (overrides.edgeStyle === 'raised') {
            cueDiv.firstChild.style.textShadow = '1px 1px ' + darkGray + ', 2px 2px ' + darkGray + ', 3px 3px ' + darkGray;
          } else if (overrides.edgeStyle === 'depressed') {
            cueDiv.firstChild.style.textShadow = '1px 1px ' + lightGray + ', 0 1px ' + lightGray + ', -1px -1px ' + darkGray + ', 0 -1px ' + darkGray;
          } else if (overrides.edgeStyle === 'uniform') {
            cueDiv.firstChild.style.textShadow = '0 0 4px ' + darkGray + ', 0 0 4px ' + darkGray + ', 0 0 4px ' + darkGray + ', 0 0 4px ' + darkGray;
          }
        }
        if (overrides.fontPercent && overrides.fontPercent !== 1) {
          var fontSize = _window2['default'].parseFloat(cueDiv.style.fontSize);
          cueDiv.style.fontSize = fontSize * overrides.fontPercent + 'px';
          cueDiv.style.height = 'auto';
          cueDiv.style.top = 'auto';
          cueDiv.style.bottom = '2px';
        }
        if (overrides.fontFamily && overrides.fontFamily !== 'default') {
          if (overrides.fontFamily === 'small-caps') {
            cueDiv.firstChild.style.fontVariant = 'small-caps';
          } else {
            cueDiv.firstChild.style.fontFamily = fontMap[overrides.fontFamily];
          }
        }
      }
    }
  }]);

  return TextTrackDisplay;
})(_Component3['default']);

// Add cue HTML to display
function constructColor(color, opacity) {
  return 'rgba(' +
  // color looks like "#f0e"
  parseInt(color[1] + color[1], 16) + ',' + parseInt(color[2] + color[2], 16) + ',' + parseInt(color[3] + color[3], 16) + ',' + opacity + ')';
}

function tryUpdateStyle(el, style, rule) {
  // some style changes will throw an error, particularly in IE8. Those should be noops.
  try {
    el.style[style] = rule;
  } catch (e) {}
}

_Component3['default'].registerComponent('TextTrackDisplay', TextTrackDisplay);
exports['default'] = TextTrackDisplay;
module.exports = exports['default'];

},{"../component":7,"../lib.js":46,"../menu/menu-button.js":49,"../menu/menu-item.js":50,"../menu/menu.js":51,"global/document":1,"global/window":2}],66:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/*
 * https://html.spec.whatwg.org/multipage/embedded-content.html#texttrackmode
 *
 * enum TextTrackMode { "disabled",  "hidden",  "showing" };
 */
var TextTrackMode = {
  disabled: 'disabled',
  hidden: 'hidden',
  showing: 'showing'
};

/*
 * https://html.spec.whatwg.org/multipage/embedded-content.html#texttrackkind
 *
 * enum TextTrackKind { "subtitles",  "captions",  "descriptions",  "chapters",  "metadata" };
 */
var TextTrackKind = {
  subtitles: 'subtitles',
  captions: 'captions',
  descriptions: 'descriptions',
  chapters: 'chapters',
  metadata: 'metadata'
};

exports.TextTrackMode = TextTrackMode;
exports.TextTrackKind = TextTrackKind;

},{}],67:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _EventEmitter = _dereq_('../event-emitter');

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _import = _dereq_('../lib');

var Lib = _interopRequireWildcard(_import);

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

/*
 * https://html.spec.whatwg.org/multipage/embedded-content.html#texttracklist
 *
 * interface TextTrackList : EventTarget {
 *   readonly attribute unsigned long length;
 *   getter TextTrack (unsigned long index);
 *   TextTrack? getTrackById(DOMString id);
 *
 *   attribute EventHandler onchange;
 *   attribute EventHandler onaddtrack;
 *   attribute EventHandler onremovetrack;
 * };
 */
var TextTrackList = (function (_TextTrackList) {
  function TextTrackList(_x) {
    return _TextTrackList.apply(this, arguments);
  }

  TextTrackList.toString = function () {
    return _TextTrackList.toString();
  };

  return TextTrackList;
})(function (tracks) {
  var list = this;

  if (Lib.IS_IE8) {
    list = _document2['default'].createElement('custom');

    for (var prop in TextTrackList.prototype) {
      list[prop] = TextTrackList.prototype[prop];
    }
  }

  tracks = tracks || [];
  list.tracks_ = [];

  Object.defineProperty(list, 'length', {
    get: function get() {
      return this.tracks_.length;
    }
  });

  for (var i = 0; i < tracks.length; i++) {
    list.addTrack_(tracks[i]);
  }

  if (Lib.IS_IE8) {
    return list;
  }
});

TextTrackList.prototype = Lib.obj.create(_EventEmitter2['default'].prototype);
TextTrackList.prototype.constructor = TextTrackList;

/*
 * change - One or more tracks in the track list have been enabled or disabled.
 * addtrack - A track has been added to the track list.
 * removetrack - A track has been removed from the track list.
*/
TextTrackList.prototype.allowedEvents_ = {
  change: 'change',
  addtrack: 'addtrack',
  removetrack: 'removetrack'
};

// emulate attribute EventHandler support to allow for feature detection
for (var _event in TextTrackList.prototype.allowedEvents_) {
  TextTrackList.prototype['on' + _event] = null;
}

TextTrackList.prototype.addTrack_ = function (track) {
  var index = this.tracks_.length;
  if (!('' + index in this)) {
    Object.defineProperty(this, index, {
      get: function get() {
        return this.tracks_[index];
      }
    });
  }

  track.addEventListener('modechange', Lib.bind(this, function () {
    this.trigger('change');
  }));
  this.tracks_.push(track);

  this.trigger({
    type: 'addtrack',
    track: track
  });
};

TextTrackList.prototype.removeTrack_ = function (rtrack) {
  var result = null;
  var track = undefined;

  for (var i = 0, l = this.length; i < l; i++) {
    track = this[i];
    if (track === rtrack) {
      this.tracks_.splice(i, 1);
      break;
    }
  }

  this.trigger({
    type: 'removetrack',
    track: track
  });
};

TextTrackList.prototype.getTrackById = function (id) {
  var result = null;

  for (var i = 0, l = this.length; i < l; i++) {
    var track = this[i];
    if (track.id === id) {
      result = track;
      break;
    }
  }

  return result;
};

exports['default'] = TextTrackList;
module.exports = exports['default'];

},{"../event-emitter":42,"../lib":46,"global/document":1}],68:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Component2 = _dereq_('../component');

var _Component3 = _interopRequireDefault(_Component2);

var _import = _dereq_('../lib');

var Lib = _interopRequireWildcard(_import);

var _import2 = _dereq_('../events');

var Events = _interopRequireWildcard(_import2);

var _safeParseTuple = _dereq_('safe-json-parse/tuple');

var _safeParseTuple2 = _interopRequireDefault(_safeParseTuple);

var _window = _dereq_('global/window');

var _window2 = _interopRequireDefault(_window);

var TextTrackSettings = (function (_Component) {
  function TextTrackSettings(player, options) {
    _classCallCheck(this, TextTrackSettings);

    _get(Object.getPrototypeOf(TextTrackSettings.prototype), 'constructor', this).call(this, player, options);
    this.hide();

    Events.on(this.el().querySelector('.vjs-done-button'), 'click', Lib.bind(this, function () {
      this.saveSettings();
      this.hide();
    }));

    Events.on(this.el().querySelector('.vjs-default-button'), 'click', Lib.bind(this, function () {
      this.el().querySelector('.vjs-fg-color > select').selectedIndex = 0;
      this.el().querySelector('.vjs-bg-color > select').selectedIndex = 0;
      this.el().querySelector('.window-color > select').selectedIndex = 0;
      this.el().querySelector('.vjs-text-opacity > select').selectedIndex = 0;
      this.el().querySelector('.vjs-bg-opacity > select').selectedIndex = 0;
      this.el().querySelector('.vjs-window-opacity > select').selectedIndex = 0;
      this.el().querySelector('.vjs-edge-style select').selectedIndex = 0;
      this.el().querySelector('.vjs-font-family select').selectedIndex = 0;
      this.el().querySelector('.vjs-font-percent select').selectedIndex = 2;
      this.updateDisplay();
    }));

    Events.on(this.el().querySelector('.vjs-fg-color > select'), 'change', Lib.bind(this, this.updateDisplay));
    Events.on(this.el().querySelector('.vjs-bg-color > select'), 'change', Lib.bind(this, this.updateDisplay));
    Events.on(this.el().querySelector('.window-color > select'), 'change', Lib.bind(this, this.updateDisplay));
    Events.on(this.el().querySelector('.vjs-text-opacity > select'), 'change', Lib.bind(this, this.updateDisplay));
    Events.on(this.el().querySelector('.vjs-bg-opacity > select'), 'change', Lib.bind(this, this.updateDisplay));
    Events.on(this.el().querySelector('.vjs-window-opacity > select'), 'change', Lib.bind(this, this.updateDisplay));
    Events.on(this.el().querySelector('.vjs-font-percent select'), 'change', Lib.bind(this, this.updateDisplay));
    Events.on(this.el().querySelector('.vjs-edge-style select'), 'change', Lib.bind(this, this.updateDisplay));
    Events.on(this.el().querySelector('.vjs-font-family select'), 'change', Lib.bind(this, this.updateDisplay));

    if (player.options().persistTextTrackSettings) {
      this.restoreSettings();
    }
  }

  _inherits(TextTrackSettings, _Component);

  _createClass(TextTrackSettings, [{
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(TextTrackSettings.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-caption-settings vjs-modal-overlay',
        innerHTML: captionOptionsMenuTemplate()
      });
    }
  }, {
    key: 'getValues',
    value: function getValues() {
      var el = this.el();

      var textEdge = getSelectedOptionValue(el.querySelector('.vjs-edge-style select'));
      var fontFamily = getSelectedOptionValue(el.querySelector('.vjs-font-family select'));
      var fgColor = getSelectedOptionValue(el.querySelector('.vjs-fg-color > select'));
      var textOpacity = getSelectedOptionValue(el.querySelector('.vjs-text-opacity > select'));
      var bgColor = getSelectedOptionValue(el.querySelector('.vjs-bg-color > select'));
      var bgOpacity = getSelectedOptionValue(el.querySelector('.vjs-bg-opacity > select'));
      var windowColor = getSelectedOptionValue(el.querySelector('.window-color > select'));
      var windowOpacity = getSelectedOptionValue(el.querySelector('.vjs-window-opacity > select'));
      var fontPercent = _window2['default'].parseFloat(getSelectedOptionValue(el.querySelector('.vjs-font-percent > select')));

      var result = {
        backgroundOpacity: bgOpacity,
        textOpacity: textOpacity,
        windowOpacity: windowOpacity,
        edgeStyle: textEdge,
        fontFamily: fontFamily,
        color: fgColor,
        backgroundColor: bgColor,
        windowColor: windowColor,
        fontPercent: fontPercent
      };
      for (var _name in result) {
        if (result[_name] === '' || result[_name] === 'none' || _name === 'fontPercent' && result[_name] === 1) {
          delete result[_name];
        }
      }
      return result;
    }
  }, {
    key: 'setValues',
    value: function setValues(values) {
      var el = this.el();

      setSelectedOption(el.querySelector('.vjs-edge-style select'), values.edgeStyle);
      setSelectedOption(el.querySelector('.vjs-font-family select'), values.fontFamily);
      setSelectedOption(el.querySelector('.vjs-fg-color > select'), values.color);
      setSelectedOption(el.querySelector('.vjs-text-opacity > select'), values.textOpacity);
      setSelectedOption(el.querySelector('.vjs-bg-color > select'), values.backgroundColor);
      setSelectedOption(el.querySelector('.vjs-bg-opacity > select'), values.backgroundOpacity);
      setSelectedOption(el.querySelector('.window-color > select'), values.windowColor);
      setSelectedOption(el.querySelector('.vjs-window-opacity > select'), values.windowOpacity);

      var fontPercent = values.fontPercent;

      if (fontPercent) {
        fontPercent = fontPercent.toFixed(2);
      }

      setSelectedOption(el.querySelector('.vjs-font-percent > select'), fontPercent);
    }
  }, {
    key: 'restoreSettings',
    value: function restoreSettings() {
      var values = undefined;
      try {
        values = _safeParseTuple2['default'](_window2['default'].localStorage.getItem('vjs-text-track-settings'))[1];
      } catch (e) {}

      if (values) {
        this.setValues(values);
      }
    }
  }, {
    key: 'saveSettings',
    value: function saveSettings() {
      if (!this.player_.options().persistTextTrackSettings) {
        return;
      }

      var values = this.getValues();
      try {
        if (!Lib.isEmpty(values)) {
          _window2['default'].localStorage.setItem('vjs-text-track-settings', JSON.stringify(values));
        } else {
          _window2['default'].localStorage.removeItem('vjs-text-track-settings');
        }
      } catch (e) {}
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      var ttDisplay = this.player_.getChild('textTrackDisplay');
      if (ttDisplay) {
        ttDisplay.updateDisplay();
      }
    }
  }]);

  return TextTrackSettings;
})(_Component3['default']);

_Component3['default'].registerComponent('TextTrackSettings', TextTrackSettings);

function getSelectedOptionValue(target) {
  var selectedOption = undefined;
  // not all browsers support selectedOptions, so, fallback to options
  if (target.selectedOptions) {
    selectedOption = target.selectedOptions[0];
  } else if (target.options) {
    selectedOption = target.options[target.options.selectedIndex];
  }

  return selectedOption.value;
}

function setSelectedOption(target, value) {
  if (!value) {
    return;
  }

  var i = undefined;
  for (i = 0; i < target.options.length; i++) {
    var option = target.options[i];
    if (option.value === value) {
      break;
    }
  }

  target.selectedIndex = i;
}

function captionOptionsMenuTemplate() {
  var template = '<div class="vjs-tracksettings">\n      <div class="vjs-tracksettings-colors">\n        <div class="vjs-fg-color vjs-tracksetting">\n            <label class="vjs-label">Foreground</label>\n            <select>\n              <option value="">---</option>\n              <option value="#FFF">White</option>\n              <option value="#000">Black</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-text-opacity vjs-opacity">\n              <select>\n                <option value="">---</option>\n                <option value="1">Opaque</option>\n                <option value="0.5">Semi-Opaque</option>\n              </select>\n            </span>\n        </div> <!-- vjs-fg-color -->\n        <div class="vjs-bg-color vjs-tracksetting">\n            <label class="vjs-label">Background</label>\n            <select>\n              <option value="">---</option>\n              <option value="#FFF">White</option>\n              <option value="#000">Black</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-bg-opacity vjs-opacity">\n                <select>\n                  <option value="">---</option>\n                  <option value="1">Opaque</option>\n                  <option value="0.5">Semi-Transparent</option>\n                  <option value="0">Transparent</option>\n                </select>\n            </span>\n        </div> <!-- vjs-bg-color -->\n        <div class="window-color vjs-tracksetting">\n            <label class="vjs-label">Window</label>\n            <select>\n              <option value="">---</option>\n              <option value="#FFF">White</option>\n              <option value="#000">Black</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-window-opacity vjs-opacity">\n                <select>\n                  <option value="">---</option>\n                  <option value="1">Opaque</option>\n                  <option value="0.5">Semi-Transparent</option>\n                  <option value="0">Transparent</option>\n                </select>\n            </span>\n        </div> <!-- vjs-window-color -->\n      </div> <!-- vjs-tracksettings -->\n      <div class="vjs-tracksettings-font">\n        <div class="vjs-font-percent vjs-tracksetting">\n          <label class="vjs-label">Font Size</label>\n          <select>\n            <option value="0.50">50%</option>\n            <option value="0.75">75%</option>\n            <option value="1.00" selected>100%</option>\n            <option value="1.25">125%</option>\n            <option value="1.50">150%</option>\n            <option value="1.75">175%</option>\n            <option value="2.00">200%</option>\n            <option value="3.00">300%</option>\n            <option value="4.00">400%</option>\n          </select>\n        </div> <!-- vjs-font-percent -->\n        <div class="vjs-edge-style vjs-tracksetting">\n          <label class="vjs-label">Text Edge Style</label>\n          <select>\n            <option value="none">None</option>\n            <option value="raised">Raised</option>\n            <option value="depressed">Depressed</option>\n            <option value="uniform">Uniform</option>\n            <option value="dropshadow">Dropshadow</option>\n          </select>\n        </div> <!-- vjs-edge-style -->\n        <div class="vjs-font-family vjs-tracksetting">\n          <label class="vjs-label">Font Family</label>\n          <select>\n            <option value="">Default</option>\n            <option value="monospaceSerif">Monospace Serif</option>\n            <option value="proportionalSerif">Proportional Serif</option>\n            <option value="monospaceSansSerif">Monospace Sans-Serif</option>\n            <option value="proportionalSansSerif">Proportional Sans-Serif</option>\n            <option value="casual">Casual</option>\n            <option value="script">Script</option>\n            <option value="small-caps">Small Caps</option>\n          </select>\n        </div> <!-- vjs-font-family -->\n      </div>\n    </div>\n    <div class="vjs-tracksettings-controls">\n      <button class="vjs-default-button">Defaults</button>\n      <button class="vjs-done-button">Done</button>\n    </div>';

  return template;
}

exports['default'] = TextTrackSettings;
module.exports = exports['default'];

},{"../component":7,"../events":43,"../lib":46,"global/window":2,"safe-json-parse/tuple":4}],69:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _TextTrackCueList = _dereq_('./text-track-cue-list');

var _TextTrackCueList2 = _interopRequireDefault(_TextTrackCueList);

var _import = _dereq_('../lib');

var Lib = _interopRequireWildcard(_import);

var _import2 = _dereq_('./text-track-enums');

var TextTrackEnum = _interopRequireWildcard(_import2);

var _EventEmitter = _dereq_('../event-emitter');

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

var _window = _dereq_('global/window');

var _window2 = _interopRequireDefault(_window);

var _XHR = _dereq_('../xhr.js');

var _XHR2 = _interopRequireDefault(_XHR);

/*
 * https://html.spec.whatwg.org/multipage/embedded-content.html#texttrack
 *
 * interface TextTrack : EventTarget {
 *   readonly attribute TextTrackKind kind;
 *   readonly attribute DOMString label;
 *   readonly attribute DOMString language;
 *
 *   readonly attribute DOMString id;
 *   readonly attribute DOMString inBandMetadataTrackDispatchType;
 *
 *   attribute TextTrackMode mode;
 *
 *   readonly attribute TextTrackCueList? cues;
 *   readonly attribute TextTrackCueList? activeCues;
 *
 *   void addCue(TextTrackCue cue);
 *   void removeCue(TextTrackCue cue);
 *
 *   attribute EventHandler oncuechange;
 * };
 */
var TextTrack = (function (_TextTrack) {
  function TextTrack() {
    return _TextTrack.apply(this, arguments);
  }

  TextTrack.toString = function () {
    return _TextTrack.toString();
  };

  return TextTrack;
})(function () {
  var options = arguments[0] === undefined ? {} : arguments[0];

  if (!options.player) {
    throw new Error('A player was not provided.');
  }

  var tt = this;
  if (Lib.IS_IE8) {
    tt = _document2['default'].createElement('custom');

    for (var prop in TextTrack.prototype) {
      tt[prop] = TextTrack.prototype[prop];
    }
  }

  tt.player_ = options.player;

  var mode = TextTrackEnum.TextTrackMode[options.mode] || 'disabled';
  var kind = TextTrackEnum.TextTrackKind[options.kind] || 'subtitles';
  var label = options.label || '';
  var language = options.language || options.srclang || '';
  var id = options.id || 'vjs_text_track_' + Lib.guid++;

  if (kind === 'metadata' || kind === 'chapters') {
    mode = 'hidden';
  }

  tt.cues_ = [];
  tt.activeCues_ = [];

  var cues = new _TextTrackCueList2['default'](tt.cues_);
  var activeCues = new _TextTrackCueList2['default'](tt.activeCues_);

  var changed = false;
  var timeupdateHandler = Lib.bind(tt, function () {
    this.activeCues;
    if (changed) {
      this.trigger('cuechange');
      changed = false;
    }
  });
  if (mode !== 'disabled') {
    tt.player_.on('timeupdate', timeupdateHandler);
  }

  Object.defineProperty(tt, 'kind', {
    get: function get() {
      return kind;
    },
    set: Function.prototype
  });

  Object.defineProperty(tt, 'label', {
    get: function get() {
      return label;
    },
    set: Function.prototype
  });

  Object.defineProperty(tt, 'language', {
    get: function get() {
      return language;
    },
    set: Function.prototype
  });

  Object.defineProperty(tt, 'id', {
    get: function get() {
      return id;
    },
    set: Function.prototype
  });

  Object.defineProperty(tt, 'mode', {
    get: function get() {
      return mode;
    },
    set: function set(newMode) {
      if (!TextTrackEnum.TextTrackMode[newMode]) {
        return;
      }
      mode = newMode;
      if (mode === 'showing') {
        this.player_.on('timeupdate', timeupdateHandler);
      }
      this.trigger('modechange');
    }
  });

  Object.defineProperty(tt, 'cues', {
    get: function get() {
      if (!this.loaded_) {
        return null;
      }

      return cues;
    },
    set: Function.prototype
  });

  Object.defineProperty(tt, 'activeCues', {
    get: function get() {
      if (!this.loaded_) {
        return null;
      }

      if (this.cues.length === 0) {
        return activeCues; // nothing to do
      }

      var ct = this.player_.currentTime();
      var active = [];

      for (var i = 0, l = this.cues.length; i < l; i++) {
        var cue = this.cues[i];
        if (cue.startTime <= ct && cue.endTime >= ct) {
          active.push(cue);
        } else if (cue.startTime === cue.endTime && cue.startTime <= ct && cue.startTime + 0.5 >= ct) {
          active.push(cue);
        }
      }

      changed = false;

      if (active.length !== this.activeCues_.length) {
        changed = true;
      } else {
        for (var i = 0; i < active.length; i++) {
          if (indexOf.call(this.activeCues_, active[i]) === -1) {
            changed = true;
          }
        }
      }

      this.activeCues_ = active;
      activeCues.setCues_(this.activeCues_);

      return activeCues;
    },
    set: Function.prototype
  });

  if (options.src) {
    loadTrack(options.src, tt);
  } else {
    tt.loaded_ = true;
  }

  if (Lib.IS_IE8) {
    return tt;
  }
});

TextTrack.prototype = Lib.obj.create(_EventEmitter2['default'].prototype);
TextTrack.prototype.constructor = TextTrack;

/*
 * cuechange - One or more cues in the track have become active or stopped being active.
 */
TextTrack.prototype.allowedEvents_ = {
  cuechange: 'cuechange'
};

TextTrack.prototype.addCue = function (cue) {
  var tracks = this.player_.textTracks();

  if (tracks) {
    for (var i = 0; i < tracks.length; i++) {
      if (tracks[i] !== this) {
        tracks[i].removeCue(cue);
      }
    }
  }

  this.cues_.push(cue);
  this.cues.setCues_(this.cues_);
};

TextTrack.prototype.removeCue = function (removeCue) {
  var removed = false;

  for (var i = 0, l = this.cues_.length; i < l; i++) {
    var cue = this.cues_[i];
    if (cue === removeCue) {
      this.cues_.splice(i, 1);
      removed = true;
    }
  }

  if (removed) {
    this.cues.setCues_(this.cues_);
  }
};

/*
 * Downloading stuff happens below this point
 */
var parseCues = (function (_parseCues) {
  function parseCues(_x, _x2) {
    return _parseCues.apply(this, arguments);
  }

  parseCues.toString = function () {
    return _parseCues.toString();
  };

  return parseCues;
})(function (srcContent, track) {
  if (typeof _window2['default'].WebVTT !== 'function') {
    //try again a bit later
    return _window2['default'].setTimeout(function () {
      parseCues(srcContent, track);
    }, 25);
  }

  var parser = new _window2['default'].WebVTT.Parser(_window2['default'], _window2['default'].vttjs, _window2['default'].WebVTT.StringDecoder());

  parser.oncue = function (cue) {
    track.addCue(cue);
  };
  parser.onparsingerror = function (error) {
    Lib.log.error(error);
  };

  parser.parse(srcContent);
  parser.flush();
});

var loadTrack = function loadTrack(src, track) {
  _XHR2['default'](src, Lib.bind(this, function (err, response, responseBody) {
    if (err) {
      return Lib.log.error(err);
    }

    track.loaded_ = true;
    parseCues(responseBody, track);
  }));
};

var indexOf = function indexOf(searchElement, fromIndex) {
  if (this == null) {
    throw new TypeError('"this" is null or not defined');
  }

  var O = Object(this);

  var len = O.length >>> 0;

  if (len === 0) {
    return -1;
  }

  var n = +fromIndex || 0;

  if (Math.abs(n) === Infinity) {
    n = 0;
  }

  if (n >= len) {
    return -1;
  }

  var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

  while (k < len) {
    if (k in O && O[k] === searchElement) {
      return k;
    }
    k++;
  }
  return -1;
};

exports['default'] = TextTrack;
module.exports = exports['default'];

},{"../event-emitter":42,"../lib":46,"../xhr.js":72,"./text-track-cue-list":64,"./text-track-enums":66,"global/document":1,"global/window":2}],70:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _obj = _dereq_('./lib');

/**
 * Utility functions namespace
 * @namespace
 * @type {Object}
 */
var util = {};

/**
 * Merge two options objects, recursively merging any plain object properties as
 * well.  Previously `deepMerge`
 *
 * @param  {Object} obj1 Object to override values in
 * @param  {Object} obj2 Overriding object
 * @return {Object}      New object -- obj1 and obj2 will be untouched
 */
var mergeOptions = (function (_mergeOptions) {
  function mergeOptions(_x, _x2) {
    return _mergeOptions.apply(this, arguments);
  }

  mergeOptions.toString = function () {
    return _mergeOptions.toString();
  };

  return mergeOptions;
})(function (obj1, obj2) {
  var key, val1, val2;

  // make a copy of obj1 so we're not overwriting original values.
  // like prototype.options_ and all sub options objects
  obj1 = _obj.obj.copy(obj1);

  for (key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      val1 = obj1[key];
      val2 = obj2[key];

      // Check if both properties are pure objects and do a deep merge if so
      if (_obj.obj.isPlain(val1) && _obj.obj.isPlain(val2)) {
        obj1[key] = mergeOptions(val1, val2);
      } else {
        obj1[key] = obj2[key];
      }
    }
  }
  return obj1;
});

exports.mergeOptions = mergeOptions;

},{"./lib":46}],71:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _document = _dereq_('global/document');

var _document2 = _interopRequireDefault(_document);

var _MediaLoader = _dereq_('./tech/loader.js');

var _MediaLoader2 = _interopRequireDefault(_MediaLoader);

var _Html5 = _dereq_('./tech/html5.js');

var _Html52 = _interopRequireDefault(_Html5);

var _Flash = _dereq_('./tech/flash.js');

var _Flash2 = _interopRequireDefault(_Flash);

var _PosterImage = _dereq_('./poster-image.js');

var _PosterImage2 = _interopRequireDefault(_PosterImage);

var _TextTrackDisplay = _dereq_('./tracks/text-track-display.js');

var _TextTrackDisplay2 = _interopRequireDefault(_TextTrackDisplay);

var _LoadingSpinner = _dereq_('./loading-spinner.js');

var _LoadingSpinner2 = _interopRequireDefault(_LoadingSpinner);

var _BigPlayButton = _dereq_('./big-play-button.js');

var _BigPlayButton2 = _interopRequireDefault(_BigPlayButton);

var _ControlBar = _dereq_('./control-bar/control-bar.js');

var _ControlBar2 = _interopRequireDefault(_ControlBar);

var _ErrorDisplay = _dereq_('./error-display.js');

var _ErrorDisplay2 = _interopRequireDefault(_ErrorDisplay);

var _videojs = _dereq_('./core');

var _videojs2 = _interopRequireDefault(_videojs);

var _import = _dereq_('./setup');

var setup = _interopRequireWildcard(_import);

var _Component = _dereq_('./component');

var _Component2 = _interopRequireDefault(_Component);

var _import2 = _dereq_('./lib');

var Lib = _interopRequireWildcard(_import2);

var _import3 = _dereq_('./util.js');

var Util = _interopRequireWildcard(_import3);

var _Player = _dereq_('./player');

var _Player2 = _interopRequireDefault(_Player);

var _extendsFn = _dereq_('./extends.js');

var _extendsFn2 = _interopRequireDefault(_extendsFn);

if (typeof HTMLVideoElement === 'undefined') {
  _document2['default'].createElement('video');
  _document2['default'].createElement('audio');
  _document2['default'].createElement('track');
}

// Run Auto-load players
// You have to wait at least once in case this script is loaded after your video in the DOM (weird behavior only with minified version)
setup.autoSetupTimeout(1, _videojs2['default']);

_videojs2['default'].getComponent = _Component2['default'].getComponent;
_videojs2['default'].registerComponent = _Component2['default'].registerComponent;

// APIs that will be removed with 5.0, but need them to get tests passing
// in ES6 transition
_videojs2['default'].TOUCH_ENABLED = Lib.TOUCH_ENABLED;
_videojs2['default'].util = Util;

// Probably want to keep this one for 5.0?
_videojs2['default'].players = _Player2['default'].players;

_videojs2['default']['extends'] = _extendsFn2['default'];

// REMOVING: We probably should not include this in 5.0 thought it would make it
// more backwards compatible
// // Expose but deprecate the window[componentName] method for accessing components
// Lib.obj.each(Component.components, function(name, component){
//   // A deprecation warning as the constuctor
//   module.exports[name] = function(player, options, ready){
//     Lib.log.warn('Using videojs.'+name+' to access the '+name+' component has been deprecated. Please use videojs.getComponent("componentName")');
//
//     return new Component(player, options, ready);
//   };
//
//   // Allow the prototype and class methods to be accessible still this way
//   // Though anything that attempts to override class methods will no longer work
//   Lib.obj.merge(module.exports[name], component);
// });

exports['default'] = _videojs2['default'];
module.exports = exports['default'];

},{"./big-play-button.js":5,"./component":7,"./control-bar/control-bar.js":8,"./core":40,"./error-display.js":41,"./extends.js":44,"./lib":46,"./loading-spinner.js":47,"./player":53,"./poster-image.js":55,"./setup":56,"./tech/flash.js":60,"./tech/html5.js":61,"./tech/loader.js":62,"./tracks/text-track-display.js":65,"./util.js":70,"global/document":1}],72:[function(_dereq_,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === 'object' && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = _dereq_('./util');

var VjsUtils = _interopRequireWildcard(_import);

var _import2 = _dereq_('./lib');

var Lib = _interopRequireWildcard(_import2);

var _window = _dereq_('global/window');

var _window2 = _interopRequireDefault(_window);

/**
 * Simple http request for retrieving external files (e.g. text tracks)
 *
 * ##### Example
 *
 *     // using url string
 *     videojs.xhr('http://example.com/myfile.vtt', function(error, response, responseBody){});
 *
 *     // or options block
 *     videojs.xhr({
 *       uri: 'http://example.com/myfile.vtt',
 *       method: 'GET',
 *       responseType: 'text'
 *     }, function(error, response, responseBody){
 *       if (error) {
 *         // log the error
 *       } else {
 *         // successful, do something with the response
 *       }
 *     });
 *
 *
 * API is modeled after the Raynos/xhr, which we hope to use after
 * getting browserify implemented.
 * https://github.com/Raynos/xhr/blob/master/index.js
 *
 * @param  {Object|String}  options   Options block or URL string
 * @param  {Function}       callback  The callback function
 * @returns {Object}                  The request
 */
var xhr = function xhr(options, callback) {
  var abortTimeout = undefined;

  // If options is a string it's the url
  if (typeof options === 'string') {
    options = {
      uri: options
    };
  }

  // Merge with default options
  VjsUtils.mergeOptions({
    method: 'GET',
    timeout: 45 * 1000
  }, options);

  callback = callback || function () {};

  var XHR = _window2['default'].XMLHttpRequest;

  if (typeof XHR === 'undefined') {
    // Shim XMLHttpRequest for older IEs
    XHR = function () {
      try {
        return new _window2['default'].ActiveXObject('Msxml2.XMLHTTP.6.0');
      } catch (e) {}
      try {
        return new _window2['default'].ActiveXObject('Msxml2.XMLHTTP.3.0');
      } catch (f) {}
      try {
        return new _window2['default'].ActiveXObject('Msxml2.XMLHTTP');
      } catch (g) {}
      throw new Error('This browser does not support XMLHttpRequest.');
    };
  }

  var request = new XHR();
  // Store a reference to the url on the request instance
  request.uri = options.uri;

  var urlInfo = Lib.parseUrl(options.uri);
  var winLoc = _window2['default'].location;

  var successHandler = function successHandler() {
    _window2['default'].clearTimeout(abortTimeout);
    callback(null, request, request.response || request.responseText);
  };

  var errorHandler = function errorHandler(err) {
    _window2['default'].clearTimeout(abortTimeout);

    if (!err || typeof err === 'string') {
      err = new Error(err);
    }

    callback(err, request);
  };

  // Check if url is for another domain/origin
  // IE8 doesn't know location.origin, so we won't rely on it here
  var crossOrigin = urlInfo.protocol + urlInfo.host !== winLoc.protocol + winLoc.host;

  // XDomainRequest -- Use for IE if XMLHTTPRequest2 isn't available
  // 'withCredentials' is only available in XMLHTTPRequest2
  // Also XDomainRequest has a lot of gotchas, so only use if cross domain
  if (crossOrigin && _window2['default'].XDomainRequest && !('withCredentials' in request)) {
    request = new _window2['default'].XDomainRequest();
    request.onload = successHandler;
    request.onerror = errorHandler;
    // These blank handlers need to be set to fix ie9
    // http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/
    request.onprogress = function () {};
    request.ontimeout = function () {};

    // XMLHTTPRequest
  } else {
    (function () {
      var fileUrl = urlInfo.protocol == 'file:' || winLoc.protocol == 'file:';

      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.timedout) {
            return errorHandler('timeout');
          }

          if (request.status === 200 || fileUrl && request.status === 0) {
            successHandler();
          } else {
            errorHandler();
          }
        }
      };

      if (options.timeout) {
        abortTimeout = _window2['default'].setTimeout(function () {
          if (request.readyState !== 4) {
            request.timedout = true;
            request.abort();
          }
        }, options.timeout);
      }
    })();
  }

  // open the connection
  try {
    // Third arg is async, or ignored by XDomainRequest
    request.open(options.method || 'GET', options.uri, true);
  } catch (err) {
    return errorHandler(err);
  }

  // withCredentials only supported by XMLHttpRequest2
  if (options.withCredentials) {
    request.withCredentials = true;
  }

  if (options.responseType) {
    request.responseType = options.responseType;
  }

  // send the request
  try {
    request.send();
  } catch (err) {
    return errorHandler(err);
  }

  return request;
};

exports['default'] = xhr;
module.exports = exports['default'];

},{"./lib":46,"./util":70,"global/window":2}]},{},[71])(71)
});


/* vtt.js - v0.11.11 (https://github.com/mozilla/vtt.js) built on 22-01-2015 */

(function(root) {
  var vttjs = root.vttjs = {};
  var cueShim = vttjs.VTTCue;
  var regionShim = vttjs.VTTRegion;
  var oldVTTCue = root.VTTCue;
  var oldVTTRegion = root.VTTRegion;

  vttjs.shim = function() {
    vttjs.VTTCue = cueShim;
    vttjs.VTTRegion = regionShim;
  };

  vttjs.restore = function() {
    vttjs.VTTCue = oldVTTCue;
    vttjs.VTTRegion = oldVTTRegion;
  };
}(this));

/**
 * Copyright 2013 vtt.js Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(root, vttjs) {

  var autoKeyword = "auto";
  var directionSetting = {
    "": true,
    "lr": true,
    "rl": true
  };
  var alignSetting = {
    "start": true,
    "middle": true,
    "end": true,
    "left": true,
    "right": true
  };

  function findDirectionSetting(value) {
    if (typeof value !== "string") {
      return false;
    }
    var dir = directionSetting[value.toLowerCase()];
    return dir ? value.toLowerCase() : false;
  }

  function findAlignSetting(value) {
    if (typeof value !== "string") {
      return false;
    }
    var align = alignSetting[value.toLowerCase()];
    return align ? value.toLowerCase() : false;
  }

  function extend(obj) {
    var i = 1;
    for (; i < arguments.length; i++) {
      var cobj = arguments[i];
      for (var p in cobj) {
        obj[p] = cobj[p];
      }
    }

    return obj;
  }

  function VTTCue(startTime, endTime, text) {
    var cue = this;
    var isIE8 = (/MSIE\s8\.0/).test(navigator.userAgent);
    var baseObj = {};

    if (isIE8) {
      cue = document.createElement('custom');
    } else {
      baseObj.enumerable = true;
    }

    /**
     * Shim implementation specific properties. These properties are not in
     * the spec.
     */

    // Lets us know when the VTTCue's data has changed in such a way that we need
    // to recompute its display state. This lets us compute its display state
    // lazily.
    cue.hasBeenReset = false;

    /**
     * VTTCue and TextTrackCue properties
     * http://dev.w3.org/html5/webvtt/#vttcue-interface
     */

    var _id = "";
    var _pauseOnExit = false;
    var _startTime = startTime;
    var _endTime = endTime;
    var _text = text;
    var _region = null;
    var _vertical = "";
    var _snapToLines = true;
    var _line = "auto";
    var _lineAlign = "start";
    var _position = 50;
    var _positionAlign = "middle";
    var _size = 50;
    var _align = "middle";

    Object.defineProperty(cue,
      "id", extend({}, baseObj, {
        get: function() {
          return _id;
        },
        set: function(value) {
          _id = "" + value;
        }
      }));

    Object.defineProperty(cue,
      "pauseOnExit", extend({}, baseObj, {
        get: function() {
          return _pauseOnExit;
        },
        set: function(value) {
          _pauseOnExit = !!value;
        }
      }));

    Object.defineProperty(cue,
      "startTime", extend({}, baseObj, {
        get: function() {
          return _startTime;
        },
        set: function(value) {
          if (typeof value !== "number") {
            throw new TypeError("Start time must be set to a number.");
          }
          _startTime = value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "endTime", extend({}, baseObj, {
        get: function() {
          return _endTime;
        },
        set: function(value) {
          if (typeof value !== "number") {
            throw new TypeError("End time must be set to a number.");
          }
          _endTime = value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "text", extend({}, baseObj, {
        get: function() {
          return _text;
        },
        set: function(value) {
          _text = "" + value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "region", extend({}, baseObj, {
        get: function() {
          return _region;
        },
        set: function(value) {
          _region = value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "vertical", extend({}, baseObj, {
        get: function() {
          return _vertical;
        },
        set: function(value) {
          var setting = findDirectionSetting(value);
          // Have to check for false because the setting an be an empty string.
          if (setting === false) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _vertical = setting;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "snapToLines", extend({}, baseObj, {
        get: function() {
          return _snapToLines;
        },
        set: function(value) {
          _snapToLines = !!value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "line", extend({}, baseObj, {
        get: function() {
          return _line;
        },
        set: function(value) {
          if (typeof value !== "number" && value !== autoKeyword) {
            throw new SyntaxError("An invalid number or illegal string was specified.");
          }
          _line = value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "lineAlign", extend({}, baseObj, {
        get: function() {
          return _lineAlign;
        },
        set: function(value) {
          var setting = findAlignSetting(value);
          if (!setting) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _lineAlign = setting;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "position", extend({}, baseObj, {
        get: function() {
          return _position;
        },
        set: function(value) {
          if (value < 0 || value > 100) {
            throw new Error("Position must be between 0 and 100.");
          }
          _position = value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "positionAlign", extend({}, baseObj, {
        get: function() {
          return _positionAlign;
        },
        set: function(value) {
          var setting = findAlignSetting(value);
          if (!setting) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _positionAlign = setting;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "size", extend({}, baseObj, {
        get: function() {
          return _size;
        },
        set: function(value) {
          if (value < 0 || value > 100) {
            throw new Error("Size must be between 0 and 100.");
          }
          _size = value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "align", extend({}, baseObj, {
        get: function() {
          return _align;
        },
        set: function(value) {
          var setting = findAlignSetting(value);
          if (!setting) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _align = setting;
          this.hasBeenReset = true;
        }
      }));

    /**
     * Other <track> spec defined properties
     */

    // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#text-track-cue-display-state
    cue.displayState = undefined;

    if (isIE8) {
      return cue;
    }
  }

  /**
   * VTTCue methods
   */

  VTTCue.prototype.getCueAsHTML = function() {
    // Assume WebVTT.convertCueToDOMTree is on the global.
    return WebVTT.convertCueToDOMTree(window, this.text);
  };

  root.VTTCue = root.VTTCue || VTTCue;
  vttjs.VTTCue = VTTCue;
}(this, (this.vttjs || {})));

/**
 * Copyright 2013 vtt.js Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(root, vttjs) {

  var scrollSetting = {
    "": true,
    "up": true,
  };

  function findScrollSetting(value) {
    if (typeof value !== "string") {
      return false;
    }
    var scroll = scrollSetting[value.toLowerCase()];
    return scroll ? value.toLowerCase() : false;
  }

  function isValidPercentValue(value) {
    return typeof value === "number" && (value >= 0 && value <= 100);
  }

  // VTTRegion shim http://dev.w3.org/html5/webvtt/#vttregion-interface
  function VTTRegion() {
    var _width = 100;
    var _lines = 3;
    var _regionAnchorX = 0;
    var _regionAnchorY = 100;
    var _viewportAnchorX = 0;
    var _viewportAnchorY = 100;
    var _scroll = "";

    Object.defineProperties(this, {
      "width": {
        enumerable: true,
        get: function() {
          return _width;
        },
        set: function(value) {
          if (!isValidPercentValue(value)) {
            throw new Error("Width must be between 0 and 100.");
          }
          _width = value;
        }
      },
      "lines": {
        enumerable: true,
        get: function() {
          return _lines;
        },
        set: function(value) {
          if (typeof value !== "number") {
            throw new TypeError("Lines must be set to a number.");
          }
          _lines = value;
        }
      },
      "regionAnchorY": {
        enumerable: true,
        get: function() {
          return _regionAnchorY;
        },
        set: function(value) {
          if (!isValidPercentValue(value)) {
            throw new Error("RegionAnchorX must be between 0 and 100.");
          }
          _regionAnchorY = value;
        }
      },
      "regionAnchorX": {
        enumerable: true,
        get: function() {
          return _regionAnchorX;
        },
        set: function(value) {
          if(!isValidPercentValue(value)) {
            throw new Error("RegionAnchorY must be between 0 and 100.");
          }
          _regionAnchorX = value;
        }
      },
      "viewportAnchorY": {
        enumerable: true,
        get: function() {
          return _viewportAnchorY;
        },
        set: function(value) {
          if (!isValidPercentValue(value)) {
            throw new Error("ViewportAnchorY must be between 0 and 100.");
          }
          _viewportAnchorY = value;
        }
      },
      "viewportAnchorX": {
        enumerable: true,
        get: function() {
          return _viewportAnchorX;
        },
        set: function(value) {
          if (!isValidPercentValue(value)) {
            throw new Error("ViewportAnchorX must be between 0 and 100.");
          }
          _viewportAnchorX = value;
        }
      },
      "scroll": {
        enumerable: true,
        get: function() {
          return _scroll;
        },
        set: function(value) {
          var setting = findScrollSetting(value);
          // Have to check for false as an empty string is a legal value.
          if (setting === false) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _scroll = setting;
        }
      }
    });
  }

  root.VTTRegion = root.VTTRegion || VTTRegion;
  vttjs.VTTRegion = VTTRegion;
}(this, (this.vttjs || {})));

/**
 * Copyright 2013 vtt.js Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

(function(global) {

  var _objCreate = Object.create || (function() {
    function F() {}
    return function(o) {
      if (arguments.length !== 1) {
        throw new Error('Object.create shim only accepts one parameter.');
      }
      F.prototype = o;
      return new F();
    };
  })();

  // Creates a new ParserError object from an errorData object. The errorData
  // object should have default code and message properties. The default message
  // property can be overriden by passing in a message parameter.
  // See ParsingError.Errors below for acceptable errors.
  function ParsingError(errorData, message) {
    this.name = "ParsingError";
    this.code = errorData.code;
    this.message = message || errorData.message;
  }
  ParsingError.prototype = _objCreate(Error.prototype);
  ParsingError.prototype.constructor = ParsingError;

  // ParsingError metadata for acceptable ParsingErrors.
  ParsingError.Errors = {
    BadSignature: {
      code: 0,
      message: "Malformed WebVTT signature."
    },
    BadTimeStamp: {
      code: 1,
      message: "Malformed time stamp."
    }
  };

  // Try to parse input as a time stamp.
  function parseTimeStamp(input) {

    function computeSeconds(h, m, s, f) {
      return (h | 0) * 3600 + (m | 0) * 60 + (s | 0) + (f | 0) / 1000;
    }

    var m = input.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
    if (!m) {
      return null;
    }

    if (m[3]) {
      // Timestamp takes the form of [hours]:[minutes]:[seconds].[milliseconds]
      return computeSeconds(m[1], m[2], m[3].replace(":", ""), m[4]);
    } else if (m[1] > 59) {
      // Timestamp takes the form of [hours]:[minutes].[milliseconds]
      // First position is hours as it's over 59.
      return computeSeconds(m[1], m[2], 0,  m[4]);
    } else {
      // Timestamp takes the form of [minutes]:[seconds].[milliseconds]
      return computeSeconds(0, m[1], m[2], m[4]);
    }
  }

  // A settings object holds key/value pairs and will ignore anything but the first
  // assignment to a specific key.
  function Settings() {
    this.values = _objCreate(null);
  }

  Settings.prototype = {
    // Only accept the first assignment to any key.
    set: function(k, v) {
      if (!this.get(k) && v !== "") {
        this.values[k] = v;
      }
    },
    // Return the value for a key, or a default value.
    // If 'defaultKey' is passed then 'dflt' is assumed to be an object with
    // a number of possible default values as properties where 'defaultKey' is
    // the key of the property that will be chosen; otherwise it's assumed to be
    // a single value.
    get: function(k, dflt, defaultKey) {
      if (defaultKey) {
        return this.has(k) ? this.values[k] : dflt[defaultKey];
      }
      return this.has(k) ? this.values[k] : dflt;
    },
    // Check whether we have a value for a key.
    has: function(k) {
      return k in this.values;
    },
    // Accept a setting if its one of the given alternatives.
    alt: function(k, v, a) {
      for (var n = 0; n < a.length; ++n) {
        if (v === a[n]) {
          this.set(k, v);
          break;
        }
      }
    },
    // Accept a setting if its a valid (signed) integer.
    integer: function(k, v) {
      if (/^-?\d+$/.test(v)) { // integer
        this.set(k, parseInt(v, 10));
      }
    },
    // Accept a setting if its a valid percentage.
    percent: function(k, v) {
      var m;
      if ((m = v.match(/^([\d]{1,3})(\.[\d]*)?%$/))) {
        v = parseFloat(v);
        if (v >= 0 && v <= 100) {
          this.set(k, v);
          return true;
        }
      }
      return false;
    }
  };

  // Helper function to parse input into groups separated by 'groupDelim', and
  // interprete each group as a key/value pair separated by 'keyValueDelim'.
  function parseOptions(input, callback, keyValueDelim, groupDelim) {
    var groups = groupDelim ? input.split(groupDelim) : [input];
    for (var i in groups) {
      if (typeof groups[i] !== "string") {
        continue;
      }
      var kv = groups[i].split(keyValueDelim);
      if (kv.length !== 2) {
        continue;
      }
      var k = kv[0];
      var v = kv[1];
      callback(k, v);
    }
  }

  function parseCue(input, cue, regionList) {
    // Remember the original input if we need to throw an error.
    var oInput = input;
    // 4.1 WebVTT timestamp
    function consumeTimeStamp() {
      var ts = parseTimeStamp(input);
      if (ts === null) {
        throw new ParsingError(ParsingError.Errors.BadTimeStamp,
                              "Malformed timestamp: " + oInput);
      }
      // Remove time stamp from input.
      input = input.replace(/^[^\sa-zA-Z-]+/, "");
      return ts;
    }

    // 4.4.2 WebVTT cue settings
    function consumeCueSettings(input, cue) {
      var settings = new Settings();

      parseOptions(input, function (k, v) {
        switch (k) {
        case "region":
          // Find the last region we parsed with the same region id.
          for (var i = regionList.length - 1; i >= 0; i--) {
            if (regionList[i].id === v) {
              settings.set(k, regionList[i].region);
              break;
            }
          }
          break;
        case "vertical":
          settings.alt(k, v, ["rl", "lr"]);
          break;
        case "line":
          var vals = v.split(","),
              vals0 = vals[0];
          settings.integer(k, vals0);
          settings.percent(k, vals0) ? settings.set("snapToLines", false) : null;
          settings.alt(k, vals0, ["auto"]);
          if (vals.length === 2) {
            settings.alt("lineAlign", vals[1], ["start", "middle", "end"]);
          }
          break;
        case "position":
          vals = v.split(",");
          settings.percent(k, vals[0]);
          if (vals.length === 2) {
            settings.alt("positionAlign", vals[1], ["start", "middle", "end"]);
          }
          break;
        case "size":
          settings.percent(k, v);
          break;
        case "align":
          settings.alt(k, v, ["start", "middle", "end", "left", "right"]);
          break;
        }
      }, /:/, /\s/);

      // Apply default values for any missing fields.
      cue.region = settings.get("region", null);
      cue.vertical = settings.get("vertical", "");
      cue.line = settings.get("line", "auto");
      cue.lineAlign = settings.get("lineAlign", "start");
      cue.snapToLines = settings.get("snapToLines", true);
      cue.size = settings.get("size", 100);
      cue.align = settings.get("align", "middle");
      cue.position = settings.get("position", {
        start: 0,
        left: 0,
        middle: 50,
        end: 100,
        right: 100
      }, cue.align);
      cue.positionAlign = settings.get("positionAlign", {
        start: "start",
        left: "start",
        middle: "middle",
        end: "end",
        right: "end"
      }, cue.align);
    }

    function skipWhitespace() {
      input = input.replace(/^\s+/, "");
    }

    // 4.1 WebVTT cue timings.
    skipWhitespace();
    cue.startTime = consumeTimeStamp();   // (1) collect cue start time
    skipWhitespace();
    if (input.substr(0, 3) !== "-->") {     // (3) next characters must match "-->"
      throw new ParsingError(ParsingError.Errors.BadTimeStamp,
                             "Malformed time stamp (time stamps must be separated by '-->'): " +
                             oInput);
    }
    input = input.substr(3);
    skipWhitespace();
    cue.endTime = consumeTimeStamp();     // (5) collect cue end time

    // 4.1 WebVTT cue settings list.
    skipWhitespace();
    consumeCueSettings(input, cue);
  }

  var ESCAPE = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&lrm;": "\u200e",
    "&rlm;": "\u200f",
    "&nbsp;": "\u00a0"
  };

  var TAG_NAME = {
    c: "span",
    i: "i",
    b: "b",
    u: "u",
    ruby: "ruby",
    rt: "rt",
    v: "span",
    lang: "span"
  };

  var TAG_ANNOTATION = {
    v: "title",
    lang: "lang"
  };

  var NEEDS_PARENT = {
    rt: "ruby"
  };

  // Parse content into a document fragment.
  function parseContent(window, input) {
    function nextToken() {
      // Check for end-of-string.
      if (!input) {
        return null;
      }

      // Consume 'n' characters from the input.
      function consume(result) {
        input = input.substr(result.length);
        return result;
      }

      var m = input.match(/^([^<]*)(<[^>]+>?)?/);
      // If there is some text before the next tag, return it, otherwise return
      // the tag.
      return consume(m[1] ? m[1] : m[2]);
    }

    // Unescape a string 's'.
    function unescape1(e) {
      return ESCAPE[e];
    }
    function unescape(s) {
      while ((m = s.match(/&(amp|lt|gt|lrm|rlm|nbsp);/))) {
        s = s.replace(m[0], unescape1);
      }
      return s;
    }

    function shouldAdd(current, element) {
      return !NEEDS_PARENT[element.localName] ||
             NEEDS_PARENT[element.localName] === current.localName;
    }

    // Create an element for this tag.
    function createElement(type, annotation) {
      var tagName = TAG_NAME[type];
      if (!tagName) {
        return null;
      }
      var element = window.document.createElement(tagName);
      element.localName = tagName;
      var name = TAG_ANNOTATION[type];
      if (name && annotation) {
        element[name] = annotation.trim();
      }
      return element;
    }

    var rootDiv = window.document.createElement("div"),
        current = rootDiv,
        t,
        tagStack = [];

    while ((t = nextToken()) !== null) {
      if (t[0] === '<') {
        if (t[1] === "/") {
          // If the closing tag matches, move back up to the parent node.
          if (tagStack.length &&
              tagStack[tagStack.length - 1] === t.substr(2).replace(">", "")) {
            tagStack.pop();
            current = current.parentNode;
          }
          // Otherwise just ignore the end tag.
          continue;
        }
        var ts = parseTimeStamp(t.substr(1, t.length - 2));
        var node;
        if (ts) {
          // Timestamps are lead nodes as well.
          node = window.document.createProcessingInstruction("timestamp", ts);
          current.appendChild(node);
          continue;
        }
        var m = t.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);
        // If we can't parse the tag, skip to the next tag.
        if (!m) {
          continue;
        }
        // Try to construct an element, and ignore the tag if we couldn't.
        node = createElement(m[1], m[3]);
        if (!node) {
          continue;
        }
        // Determine if the tag should be added based on the context of where it
        // is placed in the cuetext.
        if (!shouldAdd(current, node)) {
          continue;
        }
        // Set the class list (as a list of classes, separated by space).
        if (m[2]) {
          node.className = m[2].substr(1).replace('.', ' ');
        }
        // Append the node to the current node, and enter the scope of the new
        // node.
        tagStack.push(m[1]);
        current.appendChild(node);
        current = node;
        continue;
      }

      // Text nodes are leaf nodes.
      current.appendChild(window.document.createTextNode(unescape(t)));
    }

    return rootDiv;
  }

  // This is a list of all the Unicode characters that have a strong
  // right-to-left category. What this means is that these characters are
  // written right-to-left for sure. It was generated by pulling all the strong
  // right-to-left characters out of the Unicode data table. That table can
  // found at: http://www.unicode.org/Public/UNIDATA/UnicodeData.txt
  var strongRTLChars = [0x05BE, 0x05C0, 0x05C3, 0x05C6, 0x05D0, 0x05D1,
      0x05D2, 0x05D3, 0x05D4, 0x05D5, 0x05D6, 0x05D7, 0x05D8, 0x05D9, 0x05DA,
      0x05DB, 0x05DC, 0x05DD, 0x05DE, 0x05DF, 0x05E0, 0x05E1, 0x05E2, 0x05E3,
      0x05E4, 0x05E5, 0x05E6, 0x05E7, 0x05E8, 0x05E9, 0x05EA, 0x05F0, 0x05F1,
      0x05F2, 0x05F3, 0x05F4, 0x0608, 0x060B, 0x060D, 0x061B, 0x061E, 0x061F,
      0x0620, 0x0621, 0x0622, 0x0623, 0x0624, 0x0625, 0x0626, 0x0627, 0x0628,
      0x0629, 0x062A, 0x062B, 0x062C, 0x062D, 0x062E, 0x062F, 0x0630, 0x0631,
      0x0632, 0x0633, 0x0634, 0x0635, 0x0636, 0x0637, 0x0638, 0x0639, 0x063A,
      0x063B, 0x063C, 0x063D, 0x063E, 0x063F, 0x0640, 0x0641, 0x0642, 0x0643,
      0x0644, 0x0645, 0x0646, 0x0647, 0x0648, 0x0649, 0x064A, 0x066D, 0x066E,
      0x066F, 0x0671, 0x0672, 0x0673, 0x0674, 0x0675, 0x0676, 0x0677, 0x0678,
      0x0679, 0x067A, 0x067B, 0x067C, 0x067D, 0x067E, 0x067F, 0x0680, 0x0681,
      0x0682, 0x0683, 0x0684, 0x0685, 0x0686, 0x0687, 0x0688, 0x0689, 0x068A,
      0x068B, 0x068C, 0x068D, 0x068E, 0x068F, 0x0690, 0x0691, 0x0692, 0x0693,
      0x0694, 0x0695, 0x0696, 0x0697, 0x0698, 0x0699, 0x069A, 0x069B, 0x069C,
      0x069D, 0x069E, 0x069F, 0x06A0, 0x06A1, 0x06A2, 0x06A3, 0x06A4, 0x06A5,
      0x06A6, 0x06A7, 0x06A8, 0x06A9, 0x06AA, 0x06AB, 0x06AC, 0x06AD, 0x06AE,
      0x06AF, 0x06B0, 0x06B1, 0x06B2, 0x06B3, 0x06B4, 0x06B5, 0x06B6, 0x06B7,
      0x06B8, 0x06B9, 0x06BA, 0x06BB, 0x06BC, 0x06BD, 0x06BE, 0x06BF, 0x06C0,
      0x06C1, 0x06C2, 0x06C3, 0x06C4, 0x06C5, 0x06C6, 0x06C7, 0x06C8, 0x06C9,
      0x06CA, 0x06CB, 0x06CC, 0x06CD, 0x06CE, 0x06CF, 0x06D0, 0x06D1, 0x06D2,
      0x06D3, 0x06D4, 0x06D5, 0x06E5, 0x06E6, 0x06EE, 0x06EF, 0x06FA, 0x06FB,
      0x06FC, 0x06FD, 0x06FE, 0x06FF, 0x0700, 0x0701, 0x0702, 0x0703, 0x0704,
      0x0705, 0x0706, 0x0707, 0x0708, 0x0709, 0x070A, 0x070B, 0x070C, 0x070D,
      0x070F, 0x0710, 0x0712, 0x0713, 0x0714, 0x0715, 0x0716, 0x0717, 0x0718,
      0x0719, 0x071A, 0x071B, 0x071C, 0x071D, 0x071E, 0x071F, 0x0720, 0x0721,
      0x0722, 0x0723, 0x0724, 0x0725, 0x0726, 0x0727, 0x0728, 0x0729, 0x072A,
      0x072B, 0x072C, 0x072D, 0x072E, 0x072F, 0x074D, 0x074E, 0x074F, 0x0750,
      0x0751, 0x0752, 0x0753, 0x0754, 0x0755, 0x0756, 0x0757, 0x0758, 0x0759,
      0x075A, 0x075B, 0x075C, 0x075D, 0x075E, 0x075F, 0x0760, 0x0761, 0x0762,
      0x0763, 0x0764, 0x0765, 0x0766, 0x0767, 0x0768, 0x0769, 0x076A, 0x076B,
      0x076C, 0x076D, 0x076E, 0x076F, 0x0770, 0x0771, 0x0772, 0x0773, 0x0774,
      0x0775, 0x0776, 0x0777, 0x0778, 0x0779, 0x077A, 0x077B, 0x077C, 0x077D,
      0x077E, 0x077F, 0x0780, 0x0781, 0x0782, 0x0783, 0x0784, 0x0785, 0x0786,
      0x0787, 0x0788, 0x0789, 0x078A, 0x078B, 0x078C, 0x078D, 0x078E, 0x078F,
      0x0790, 0x0791, 0x0792, 0x0793, 0x0794, 0x0795, 0x0796, 0x0797, 0x0798,
      0x0799, 0x079A, 0x079B, 0x079C, 0x079D, 0x079E, 0x079F, 0x07A0, 0x07A1,
      0x07A2, 0x07A3, 0x07A4, 0x07A5, 0x07B1, 0x07C0, 0x07C1, 0x07C2, 0x07C3,
      0x07C4, 0x07C5, 0x07C6, 0x07C7, 0x07C8, 0x07C9, 0x07CA, 0x07CB, 0x07CC,
      0x07CD, 0x07CE, 0x07CF, 0x07D0, 0x07D1, 0x07D2, 0x07D3, 0x07D4, 0x07D5,
      0x07D6, 0x07D7, 0x07D8, 0x07D9, 0x07DA, 0x07DB, 0x07DC, 0x07DD, 0x07DE,
      0x07DF, 0x07E0, 0x07E1, 0x07E2, 0x07E3, 0x07E4, 0x07E5, 0x07E6, 0x07E7,
      0x07E8, 0x07E9, 0x07EA, 0x07F4, 0x07F5, 0x07FA, 0x0800, 0x0801, 0x0802,
      0x0803, 0x0804, 0x0805, 0x0806, 0x0807, 0x0808, 0x0809, 0x080A, 0x080B,
      0x080C, 0x080D, 0x080E, 0x080F, 0x0810, 0x0811, 0x0812, 0x0813, 0x0814,
      0x0815, 0x081A, 0x0824, 0x0828, 0x0830, 0x0831, 0x0832, 0x0833, 0x0834,
      0x0835, 0x0836, 0x0837, 0x0838, 0x0839, 0x083A, 0x083B, 0x083C, 0x083D,
      0x083E, 0x0840, 0x0841, 0x0842, 0x0843, 0x0844, 0x0845, 0x0846, 0x0847,
      0x0848, 0x0849, 0x084A, 0x084B, 0x084C, 0x084D, 0x084E, 0x084F, 0x0850,
      0x0851, 0x0852, 0x0853, 0x0854, 0x0855, 0x0856, 0x0857, 0x0858, 0x085E,
      0x08A0, 0x08A2, 0x08A3, 0x08A4, 0x08A5, 0x08A6, 0x08A7, 0x08A8, 0x08A9,
      0x08AA, 0x08AB, 0x08AC, 0x200F, 0xFB1D, 0xFB1F, 0xFB20, 0xFB21, 0xFB22,
      0xFB23, 0xFB24, 0xFB25, 0xFB26, 0xFB27, 0xFB28, 0xFB2A, 0xFB2B, 0xFB2C,
      0xFB2D, 0xFB2E, 0xFB2F, 0xFB30, 0xFB31, 0xFB32, 0xFB33, 0xFB34, 0xFB35,
      0xFB36, 0xFB38, 0xFB39, 0xFB3A, 0xFB3B, 0xFB3C, 0xFB3E, 0xFB40, 0xFB41,
      0xFB43, 0xFB44, 0xFB46, 0xFB47, 0xFB48, 0xFB49, 0xFB4A, 0xFB4B, 0xFB4C,
      0xFB4D, 0xFB4E, 0xFB4F, 0xFB50, 0xFB51, 0xFB52, 0xFB53, 0xFB54, 0xFB55,
      0xFB56, 0xFB57, 0xFB58, 0xFB59, 0xFB5A, 0xFB5B, 0xFB5C, 0xFB5D, 0xFB5E,
      0xFB5F, 0xFB60, 0xFB61, 0xFB62, 0xFB63, 0xFB64, 0xFB65, 0xFB66, 0xFB67,
      0xFB68, 0xFB69, 0xFB6A, 0xFB6B, 0xFB6C, 0xFB6D, 0xFB6E, 0xFB6F, 0xFB70,
      0xFB71, 0xFB72, 0xFB73, 0xFB74, 0xFB75, 0xFB76, 0xFB77, 0xFB78, 0xFB79,
      0xFB7A, 0xFB7B, 0xFB7C, 0xFB7D, 0xFB7E, 0xFB7F, 0xFB80, 0xFB81, 0xFB82,
      0xFB83, 0xFB84, 0xFB85, 0xFB86, 0xFB87, 0xFB88, 0xFB89, 0xFB8A, 0xFB8B,
      0xFB8C, 0xFB8D, 0xFB8E, 0xFB8F, 0xFB90, 0xFB91, 0xFB92, 0xFB93, 0xFB94,
      0xFB95, 0xFB96, 0xFB97, 0xFB98, 0xFB99, 0xFB9A, 0xFB9B, 0xFB9C, 0xFB9D,
      0xFB9E, 0xFB9F, 0xFBA0, 0xFBA1, 0xFBA2, 0xFBA3, 0xFBA4, 0xFBA5, 0xFBA6,
      0xFBA7, 0xFBA8, 0xFBA9, 0xFBAA, 0xFBAB, 0xFBAC, 0xFBAD, 0xFBAE, 0xFBAF,
      0xFBB0, 0xFBB1, 0xFBB2, 0xFBB3, 0xFBB4, 0xFBB5, 0xFBB6, 0xFBB7, 0xFBB8,
      0xFBB9, 0xFBBA, 0xFBBB, 0xFBBC, 0xFBBD, 0xFBBE, 0xFBBF, 0xFBC0, 0xFBC1,
      0xFBD3, 0xFBD4, 0xFBD5, 0xFBD6, 0xFBD7, 0xFBD8, 0xFBD9, 0xFBDA, 0xFBDB,
      0xFBDC, 0xFBDD, 0xFBDE, 0xFBDF, 0xFBE0, 0xFBE1, 0xFBE2, 0xFBE3, 0xFBE4,
      0xFBE5, 0xFBE6, 0xFBE7, 0xFBE8, 0xFBE9, 0xFBEA, 0xFBEB, 0xFBEC, 0xFBED,
      0xFBEE, 0xFBEF, 0xFBF0, 0xFBF1, 0xFBF2, 0xFBF3, 0xFBF4, 0xFBF5, 0xFBF6,
      0xFBF7, 0xFBF8, 0xFBF9, 0xFBFA, 0xFBFB, 0xFBFC, 0xFBFD, 0xFBFE, 0xFBFF,
      0xFC00, 0xFC01, 0xFC02, 0xFC03, 0xFC04, 0xFC05, 0xFC06, 0xFC07, 0xFC08,
      0xFC09, 0xFC0A, 0xFC0B, 0xFC0C, 0xFC0D, 0xFC0E, 0xFC0F, 0xFC10, 0xFC11,
      0xFC12, 0xFC13, 0xFC14, 0xFC15, 0xFC16, 0xFC17, 0xFC18, 0xFC19, 0xFC1A,
      0xFC1B, 0xFC1C, 0xFC1D, 0xFC1E, 0xFC1F, 0xFC20, 0xFC21, 0xFC22, 0xFC23,
      0xFC24, 0xFC25, 0xFC26, 0xFC27, 0xFC28, 0xFC29, 0xFC2A, 0xFC2B, 0xFC2C,
      0xFC2D, 0xFC2E, 0xFC2F, 0xFC30, 0xFC31, 0xFC32, 0xFC33, 0xFC34, 0xFC35,
      0xFC36, 0xFC37, 0xFC38, 0xFC39, 0xFC3A, 0xFC3B, 0xFC3C, 0xFC3D, 0xFC3E,
      0xFC3F, 0xFC40, 0xFC41, 0xFC42, 0xFC43, 0xFC44, 0xFC45, 0xFC46, 0xFC47,
      0xFC48, 0xFC49, 0xFC4A, 0xFC4B, 0xFC4C, 0xFC4D, 0xFC4E, 0xFC4F, 0xFC50,
      0xFC51, 0xFC52, 0xFC53, 0xFC54, 0xFC55, 0xFC56, 0xFC57, 0xFC58, 0xFC59,
      0xFC5A, 0xFC5B, 0xFC5C, 0xFC5D, 0xFC5E, 0xFC5F, 0xFC60, 0xFC61, 0xFC62,
      0xFC63, 0xFC64, 0xFC65, 0xFC66, 0xFC67, 0xFC68, 0xFC69, 0xFC6A, 0xFC6B,
      0xFC6C, 0xFC6D, 0xFC6E, 0xFC6F, 0xFC70, 0xFC71, 0xFC72, 0xFC73, 0xFC74,
      0xFC75, 0xFC76, 0xFC77, 0xFC78, 0xFC79, 0xFC7A, 0xFC7B, 0xFC7C, 0xFC7D,
      0xFC7E, 0xFC7F, 0xFC80, 0xFC81, 0xFC82, 0xFC83, 0xFC84, 0xFC85, 0xFC86,
      0xFC87, 0xFC88, 0xFC89, 0xFC8A, 0xFC8B, 0xFC8C, 0xFC8D, 0xFC8E, 0xFC8F,
      0xFC90, 0xFC91, 0xFC92, 0xFC93, 0xFC94, 0xFC95, 0xFC96, 0xFC97, 0xFC98,
      0xFC99, 0xFC9A, 0xFC9B, 0xFC9C, 0xFC9D, 0xFC9E, 0xFC9F, 0xFCA0, 0xFCA1,
      0xFCA2, 0xFCA3, 0xFCA4, 0xFCA5, 0xFCA6, 0xFCA7, 0xFCA8, 0xFCA9, 0xFCAA,
      0xFCAB, 0xFCAC, 0xFCAD, 0xFCAE, 0xFCAF, 0xFCB0, 0xFCB1, 0xFCB2, 0xFCB3,
      0xFCB4, 0xFCB5, 0xFCB6, 0xFCB7, 0xFCB8, 0xFCB9, 0xFCBA, 0xFCBB, 0xFCBC,
      0xFCBD, 0xFCBE, 0xFCBF, 0xFCC0, 0xFCC1, 0xFCC2, 0xFCC3, 0xFCC4, 0xFCC5,
      0xFCC6, 0xFCC7, 0xFCC8, 0xFCC9, 0xFCCA, 0xFCCB, 0xFCCC, 0xFCCD, 0xFCCE,
      0xFCCF, 0xFCD0, 0xFCD1, 0xFCD2, 0xFCD3, 0xFCD4, 0xFCD5, 0xFCD6, 0xFCD7,
      0xFCD8, 0xFCD9, 0xFCDA, 0xFCDB, 0xFCDC, 0xFCDD, 0xFCDE, 0xFCDF, 0xFCE0,
      0xFCE1, 0xFCE2, 0xFCE3, 0xFCE4, 0xFCE5, 0xFCE6, 0xFCE7, 0xFCE8, 0xFCE9,
      0xFCEA, 0xFCEB, 0xFCEC, 0xFCED, 0xFCEE, 0xFCEF, 0xFCF0, 0xFCF1, 0xFCF2,
      0xFCF3, 0xFCF4, 0xFCF5, 0xFCF6, 0xFCF7, 0xFCF8, 0xFCF9, 0xFCFA, 0xFCFB,
      0xFCFC, 0xFCFD, 0xFCFE, 0xFCFF, 0xFD00, 0xFD01, 0xFD02, 0xFD03, 0xFD04,
      0xFD05, 0xFD06, 0xFD07, 0xFD08, 0xFD09, 0xFD0A, 0xFD0B, 0xFD0C, 0xFD0D,
      0xFD0E, 0xFD0F, 0xFD10, 0xFD11, 0xFD12, 0xFD13, 0xFD14, 0xFD15, 0xFD16,
      0xFD17, 0xFD18, 0xFD19, 0xFD1A, 0xFD1B, 0xFD1C, 0xFD1D, 0xFD1E, 0xFD1F,
      0xFD20, 0xFD21, 0xFD22, 0xFD23, 0xFD24, 0xFD25, 0xFD26, 0xFD27, 0xFD28,
      0xFD29, 0xFD2A, 0xFD2B, 0xFD2C, 0xFD2D, 0xFD2E, 0xFD2F, 0xFD30, 0xFD31,
      0xFD32, 0xFD33, 0xFD34, 0xFD35, 0xFD36, 0xFD37, 0xFD38, 0xFD39, 0xFD3A,
      0xFD3B, 0xFD3C, 0xFD3D, 0xFD50, 0xFD51, 0xFD52, 0xFD53, 0xFD54, 0xFD55,
      0xFD56, 0xFD57, 0xFD58, 0xFD59, 0xFD5A, 0xFD5B, 0xFD5C, 0xFD5D, 0xFD5E,
      0xFD5F, 0xFD60, 0xFD61, 0xFD62, 0xFD63, 0xFD64, 0xFD65, 0xFD66, 0xFD67,
      0xFD68, 0xFD69, 0xFD6A, 0xFD6B, 0xFD6C, 0xFD6D, 0xFD6E, 0xFD6F, 0xFD70,
      0xFD71, 0xFD72, 0xFD73, 0xFD74, 0xFD75, 0xFD76, 0xFD77, 0xFD78, 0xFD79,
      0xFD7A, 0xFD7B, 0xFD7C, 0xFD7D, 0xFD7E, 0xFD7F, 0xFD80, 0xFD81, 0xFD82,
      0xFD83, 0xFD84, 0xFD85, 0xFD86, 0xFD87, 0xFD88, 0xFD89, 0xFD8A, 0xFD8B,
      0xFD8C, 0xFD8D, 0xFD8E, 0xFD8F, 0xFD92, 0xFD93, 0xFD94, 0xFD95, 0xFD96,
      0xFD97, 0xFD98, 0xFD99, 0xFD9A, 0xFD9B, 0xFD9C, 0xFD9D, 0xFD9E, 0xFD9F,
      0xFDA0, 0xFDA1, 0xFDA2, 0xFDA3, 0xFDA4, 0xFDA5, 0xFDA6, 0xFDA7, 0xFDA8,
      0xFDA9, 0xFDAA, 0xFDAB, 0xFDAC, 0xFDAD, 0xFDAE, 0xFDAF, 0xFDB0, 0xFDB1,
      0xFDB2, 0xFDB3, 0xFDB4, 0xFDB5, 0xFDB6, 0xFDB7, 0xFDB8, 0xFDB9, 0xFDBA,
      0xFDBB, 0xFDBC, 0xFDBD, 0xFDBE, 0xFDBF, 0xFDC0, 0xFDC1, 0xFDC2, 0xFDC3,
      0xFDC4, 0xFDC5, 0xFDC6, 0xFDC7, 0xFDF0, 0xFDF1, 0xFDF2, 0xFDF3, 0xFDF4,
      0xFDF5, 0xFDF6, 0xFDF7, 0xFDF8, 0xFDF9, 0xFDFA, 0xFDFB, 0xFDFC, 0xFE70,
      0xFE71, 0xFE72, 0xFE73, 0xFE74, 0xFE76, 0xFE77, 0xFE78, 0xFE79, 0xFE7A,
      0xFE7B, 0xFE7C, 0xFE7D, 0xFE7E, 0xFE7F, 0xFE80, 0xFE81, 0xFE82, 0xFE83,
      0xFE84, 0xFE85, 0xFE86, 0xFE87, 0xFE88, 0xFE89, 0xFE8A, 0xFE8B, 0xFE8C,
      0xFE8D, 0xFE8E, 0xFE8F, 0xFE90, 0xFE91, 0xFE92, 0xFE93, 0xFE94, 0xFE95,
      0xFE96, 0xFE97, 0xFE98, 0xFE99, 0xFE9A, 0xFE9B, 0xFE9C, 0xFE9D, 0xFE9E,
      0xFE9F, 0xFEA0, 0xFEA1, 0xFEA2, 0xFEA3, 0xFEA4, 0xFEA5, 0xFEA6, 0xFEA7,
      0xFEA8, 0xFEA9, 0xFEAA, 0xFEAB, 0xFEAC, 0xFEAD, 0xFEAE, 0xFEAF, 0xFEB0,
      0xFEB1, 0xFEB2, 0xFEB3, 0xFEB4, 0xFEB5, 0xFEB6, 0xFEB7, 0xFEB8, 0xFEB9,
      0xFEBA, 0xFEBB, 0xFEBC, 0xFEBD, 0xFEBE, 0xFEBF, 0xFEC0, 0xFEC1, 0xFEC2,
      0xFEC3, 0xFEC4, 0xFEC5, 0xFEC6, 0xFEC7, 0xFEC8, 0xFEC9, 0xFECA, 0xFECB,
      0xFECC, 0xFECD, 0xFECE, 0xFECF, 0xFED0, 0xFED1, 0xFED2, 0xFED3, 0xFED4,
      0xFED5, 0xFED6, 0xFED7, 0xFED8, 0xFED9, 0xFEDA, 0xFEDB, 0xFEDC, 0xFEDD,
      0xFEDE, 0xFEDF, 0xFEE0, 0xFEE1, 0xFEE2, 0xFEE3, 0xFEE4, 0xFEE5, 0xFEE6,
      0xFEE7, 0xFEE8, 0xFEE9, 0xFEEA, 0xFEEB, 0xFEEC, 0xFEED, 0xFEEE, 0xFEEF,
      0xFEF0, 0xFEF1, 0xFEF2, 0xFEF3, 0xFEF4, 0xFEF5, 0xFEF6, 0xFEF7, 0xFEF8,
      0xFEF9, 0xFEFA, 0xFEFB, 0xFEFC, 0x10800, 0x10801, 0x10802, 0x10803,
      0x10804, 0x10805, 0x10808, 0x1080A, 0x1080B, 0x1080C, 0x1080D, 0x1080E,
      0x1080F, 0x10810, 0x10811, 0x10812, 0x10813, 0x10814, 0x10815, 0x10816,
      0x10817, 0x10818, 0x10819, 0x1081A, 0x1081B, 0x1081C, 0x1081D, 0x1081E,
      0x1081F, 0x10820, 0x10821, 0x10822, 0x10823, 0x10824, 0x10825, 0x10826,
      0x10827, 0x10828, 0x10829, 0x1082A, 0x1082B, 0x1082C, 0x1082D, 0x1082E,
      0x1082F, 0x10830, 0x10831, 0x10832, 0x10833, 0x10834, 0x10835, 0x10837,
      0x10838, 0x1083C, 0x1083F, 0x10840, 0x10841, 0x10842, 0x10843, 0x10844,
      0x10845, 0x10846, 0x10847, 0x10848, 0x10849, 0x1084A, 0x1084B, 0x1084C,
      0x1084D, 0x1084E, 0x1084F, 0x10850, 0x10851, 0x10852, 0x10853, 0x10854,
      0x10855, 0x10857, 0x10858, 0x10859, 0x1085A, 0x1085B, 0x1085C, 0x1085D,
      0x1085E, 0x1085F, 0x10900, 0x10901, 0x10902, 0x10903, 0x10904, 0x10905,
      0x10906, 0x10907, 0x10908, 0x10909, 0x1090A, 0x1090B, 0x1090C, 0x1090D,
      0x1090E, 0x1090F, 0x10910, 0x10911, 0x10912, 0x10913, 0x10914, 0x10915,
      0x10916, 0x10917, 0x10918, 0x10919, 0x1091A, 0x1091B, 0x10920, 0x10921,
      0x10922, 0x10923, 0x10924, 0x10925, 0x10926, 0x10927, 0x10928, 0x10929,
      0x1092A, 0x1092B, 0x1092C, 0x1092D, 0x1092E, 0x1092F, 0x10930, 0x10931,
      0x10932, 0x10933, 0x10934, 0x10935, 0x10936, 0x10937, 0x10938, 0x10939,
      0x1093F, 0x10980, 0x10981, 0x10982, 0x10983, 0x10984, 0x10985, 0x10986,
      0x10987, 0x10988, 0x10989, 0x1098A, 0x1098B, 0x1098C, 0x1098D, 0x1098E,
      0x1098F, 0x10990, 0x10991, 0x10992, 0x10993, 0x10994, 0x10995, 0x10996,
      0x10997, 0x10998, 0x10999, 0x1099A, 0x1099B, 0x1099C, 0x1099D, 0x1099E,
      0x1099F, 0x109A0, 0x109A1, 0x109A2, 0x109A3, 0x109A4, 0x109A5, 0x109A6,
      0x109A7, 0x109A8, 0x109A9, 0x109AA, 0x109AB, 0x109AC, 0x109AD, 0x109AE,
      0x109AF, 0x109B0, 0x109B1, 0x109B2, 0x109B3, 0x109B4, 0x109B5, 0x109B6,
      0x109B7, 0x109BE, 0x109BF, 0x10A00, 0x10A10, 0x10A11, 0x10A12, 0x10A13,
      0x10A15, 0x10A16, 0x10A17, 0x10A19, 0x10A1A, 0x10A1B, 0x10A1C, 0x10A1D,
      0x10A1E, 0x10A1F, 0x10A20, 0x10A21, 0x10A22, 0x10A23, 0x10A24, 0x10A25,
      0x10A26, 0x10A27, 0x10A28, 0x10A29, 0x10A2A, 0x10A2B, 0x10A2C, 0x10A2D,
      0x10A2E, 0x10A2F, 0x10A30, 0x10A31, 0x10A32, 0x10A33, 0x10A40, 0x10A41,
      0x10A42, 0x10A43, 0x10A44, 0x10A45, 0x10A46, 0x10A47, 0x10A50, 0x10A51,
      0x10A52, 0x10A53, 0x10A54, 0x10A55, 0x10A56, 0x10A57, 0x10A58, 0x10A60,
      0x10A61, 0x10A62, 0x10A63, 0x10A64, 0x10A65, 0x10A66, 0x10A67, 0x10A68,
      0x10A69, 0x10A6A, 0x10A6B, 0x10A6C, 0x10A6D, 0x10A6E, 0x10A6F, 0x10A70,
      0x10A71, 0x10A72, 0x10A73, 0x10A74, 0x10A75, 0x10A76, 0x10A77, 0x10A78,
      0x10A79, 0x10A7A, 0x10A7B, 0x10A7C, 0x10A7D, 0x10A7E, 0x10A7F, 0x10B00,
      0x10B01, 0x10B02, 0x10B03, 0x10B04, 0x10B05, 0x10B06, 0x10B07, 0x10B08,
      0x10B09, 0x10B0A, 0x10B0B, 0x10B0C, 0x10B0D, 0x10B0E, 0x10B0F, 0x10B10,
      0x10B11, 0x10B12, 0x10B13, 0x10B14, 0x10B15, 0x10B16, 0x10B17, 0x10B18,
      0x10B19, 0x10B1A, 0x10B1B, 0x10B1C, 0x10B1D, 0x10B1E, 0x10B1F, 0x10B20,
      0x10B21, 0x10B22, 0x10B23, 0x10B24, 0x10B25, 0x10B26, 0x10B27, 0x10B28,
      0x10B29, 0x10B2A, 0x10B2B, 0x10B2C, 0x10B2D, 0x10B2E, 0x10B2F, 0x10B30,
      0x10B31, 0x10B32, 0x10B33, 0x10B34, 0x10B35, 0x10B40, 0x10B41, 0x10B42,
      0x10B43, 0x10B44, 0x10B45, 0x10B46, 0x10B47, 0x10B48, 0x10B49, 0x10B4A,
      0x10B4B, 0x10B4C, 0x10B4D, 0x10B4E, 0x10B4F, 0x10B50, 0x10B51, 0x10B52,
      0x10B53, 0x10B54, 0x10B55, 0x10B58, 0x10B59, 0x10B5A, 0x10B5B, 0x10B5C,
      0x10B5D, 0x10B5E, 0x10B5F, 0x10B60, 0x10B61, 0x10B62, 0x10B63, 0x10B64,
      0x10B65, 0x10B66, 0x10B67, 0x10B68, 0x10B69, 0x10B6A, 0x10B6B, 0x10B6C,
      0x10B6D, 0x10B6E, 0x10B6F, 0x10B70, 0x10B71, 0x10B72, 0x10B78, 0x10B79,
      0x10B7A, 0x10B7B, 0x10B7C, 0x10B7D, 0x10B7E, 0x10B7F, 0x10C00, 0x10C01,
      0x10C02, 0x10C03, 0x10C04, 0x10C05, 0x10C06, 0x10C07, 0x10C08, 0x10C09,
      0x10C0A, 0x10C0B, 0x10C0C, 0x10C0D, 0x10C0E, 0x10C0F, 0x10C10, 0x10C11,
      0x10C12, 0x10C13, 0x10C14, 0x10C15, 0x10C16, 0x10C17, 0x10C18, 0x10C19,
      0x10C1A, 0x10C1B, 0x10C1C, 0x10C1D, 0x10C1E, 0x10C1F, 0x10C20, 0x10C21,
      0x10C22, 0x10C23, 0x10C24, 0x10C25, 0x10C26, 0x10C27, 0x10C28, 0x10C29,
      0x10C2A, 0x10C2B, 0x10C2C, 0x10C2D, 0x10C2E, 0x10C2F, 0x10C30, 0x10C31,
      0x10C32, 0x10C33, 0x10C34, 0x10C35, 0x10C36, 0x10C37, 0x10C38, 0x10C39,
      0x10C3A, 0x10C3B, 0x10C3C, 0x10C3D, 0x10C3E, 0x10C3F, 0x10C40, 0x10C41,
      0x10C42, 0x10C43, 0x10C44, 0x10C45, 0x10C46, 0x10C47, 0x10C48, 0x1EE00,
      0x1EE01, 0x1EE02, 0x1EE03, 0x1EE05, 0x1EE06, 0x1EE07, 0x1EE08, 0x1EE09,
      0x1EE0A, 0x1EE0B, 0x1EE0C, 0x1EE0D, 0x1EE0E, 0x1EE0F, 0x1EE10, 0x1EE11,
      0x1EE12, 0x1EE13, 0x1EE14, 0x1EE15, 0x1EE16, 0x1EE17, 0x1EE18, 0x1EE19,
      0x1EE1A, 0x1EE1B, 0x1EE1C, 0x1EE1D, 0x1EE1E, 0x1EE1F, 0x1EE21, 0x1EE22,
      0x1EE24, 0x1EE27, 0x1EE29, 0x1EE2A, 0x1EE2B, 0x1EE2C, 0x1EE2D, 0x1EE2E,
      0x1EE2F, 0x1EE30, 0x1EE31, 0x1EE32, 0x1EE34, 0x1EE35, 0x1EE36, 0x1EE37,
      0x1EE39, 0x1EE3B, 0x1EE42, 0x1EE47, 0x1EE49, 0x1EE4B, 0x1EE4D, 0x1EE4E,
      0x1EE4F, 0x1EE51, 0x1EE52, 0x1EE54, 0x1EE57, 0x1EE59, 0x1EE5B, 0x1EE5D,
      0x1EE5F, 0x1EE61, 0x1EE62, 0x1EE64, 0x1EE67, 0x1EE68, 0x1EE69, 0x1EE6A,
      0x1EE6C, 0x1EE6D, 0x1EE6E, 0x1EE6F, 0x1EE70, 0x1EE71, 0x1EE72, 0x1EE74,
      0x1EE75, 0x1EE76, 0x1EE77, 0x1EE79, 0x1EE7A, 0x1EE7B, 0x1EE7C, 0x1EE7E,
      0x1EE80, 0x1EE81, 0x1EE82, 0x1EE83, 0x1EE84, 0x1EE85, 0x1EE86, 0x1EE87,
      0x1EE88, 0x1EE89, 0x1EE8B, 0x1EE8C, 0x1EE8D, 0x1EE8E, 0x1EE8F, 0x1EE90,
      0x1EE91, 0x1EE92, 0x1EE93, 0x1EE94, 0x1EE95, 0x1EE96, 0x1EE97, 0x1EE98,
      0x1EE99, 0x1EE9A, 0x1EE9B, 0x1EEA1, 0x1EEA2, 0x1EEA3, 0x1EEA5, 0x1EEA6,
      0x1EEA7, 0x1EEA8, 0x1EEA9, 0x1EEAB, 0x1EEAC, 0x1EEAD, 0x1EEAE, 0x1EEAF,
      0x1EEB0, 0x1EEB1, 0x1EEB2, 0x1EEB3, 0x1EEB4, 0x1EEB5, 0x1EEB6, 0x1EEB7,
      0x1EEB8, 0x1EEB9, 0x1EEBA, 0x1EEBB, 0x10FFFD];

  function determineBidi(cueDiv) {
    var nodeStack = [],
        text = "",
        charCode;

    if (!cueDiv || !cueDiv.childNodes) {
      return "ltr";
    }

    function pushNodes(nodeStack, node) {
      for (var i = node.childNodes.length - 1; i >= 0; i--) {
        nodeStack.push(node.childNodes[i]);
      }
    }

    function nextTextNode(nodeStack) {
      if (!nodeStack || !nodeStack.length) {
        return null;
      }

      var node = nodeStack.pop(),
          text = node.textContent || node.innerText;
      if (text) {
        // TODO: This should match all unicode type B characters (paragraph
        // separator characters). See issue #115.
        var m = text.match(/^.*(\n|\r)/);
        if (m) {
          nodeStack.length = 0;
          return m[0];
        }
        return text;
      }
      if (node.tagName === "ruby") {
        return nextTextNode(nodeStack);
      }
      if (node.childNodes) {
        pushNodes(nodeStack, node);
        return nextTextNode(nodeStack);
      }
    }

    pushNodes(nodeStack, cueDiv);
    while ((text = nextTextNode(nodeStack))) {
      for (var i = 0; i < text.length; i++) {
        charCode = text.charCodeAt(i);
        for (var j = 0; j < strongRTLChars.length; j++) {
          if (strongRTLChars[j] === charCode) {
            return "rtl";
          }
        }
      }
    }
    return "ltr";
  }

  function computeLinePos(cue) {
    if (typeof cue.line === "number" &&
        (cue.snapToLines || (cue.line >= 0 && cue.line <= 100))) {
      return cue.line;
    }
    if (!cue.track || !cue.track.textTrackList ||
        !cue.track.textTrackList.mediaElement) {
      return -1;
    }
    var track = cue.track,
        trackList = track.textTrackList,
        count = 0;
    for (var i = 0; i < trackList.length && trackList[i] !== track; i++) {
      if (trackList[i].mode === "showing") {
        count++;
      }
    }
    return ++count * -1;
  }

  function StyleBox() {
  }

  // Apply styles to a div. If there is no div passed then it defaults to the
  // div on 'this'.
  StyleBox.prototype.applyStyles = function(styles, div) {
    div = div || this.div;
    for (var prop in styles) {
      if (styles.hasOwnProperty(prop)) {
        div.style[prop] = styles[prop];
      }
    }
  };

  StyleBox.prototype.formatStyle = function(val, unit) {
    return val === 0 ? 0 : val + unit;
  };

  // Constructs the computed display state of the cue (a div). Places the div
  // into the overlay which should be a block level element (usually a div).
  function CueStyleBox(window, cue, styleOptions) {
    var isIE8 = (/MSIE\s8\.0/).test(navigator.userAgent);
    var color = "rgba(255, 255, 255, 1)";
    var backgroundColor = "rgba(0, 0, 0, 0.8)";

    if (isIE8) {
      color = "rgb(255, 255, 255)";
      backgroundColor = "rgb(0, 0, 0)";
    }

    StyleBox.call(this);
    this.cue = cue;

    // Parse our cue's text into a DOM tree rooted at 'cueDiv'. This div will
    // have inline positioning and will function as the cue background box.
    this.cueDiv = parseContent(window, cue.text);
    var styles = {
      color: color,
      backgroundColor: backgroundColor,
      position: "relative",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: "inline"
    };

    if (!isIE8) {
      styles.writingMode = cue.vertical === "" ? "horizontal-tb"
                                               : cue.vertical === "lr" ? "vertical-lr"
                                                                       : "vertical-rl";
      styles.unicodeBidi = "plaintext";
    }
    this.applyStyles(styles, this.cueDiv);

    // Create an absolutely positioned div that will be used to position the cue
    // div. Note, all WebVTT cue-setting alignments are equivalent to the CSS
    // mirrors of them except "middle" which is "center" in CSS.
    this.div = window.document.createElement("div");
    styles = {
      textAlign: cue.align === "middle" ? "center" : cue.align,
      font: styleOptions.font,
      whiteSpace: "pre-line",
      position: "absolute"
    };

    if (!isIE8) {
      styles.direction = determineBidi(this.cueDiv);
      styles.writingMode = cue.vertical === "" ? "horizontal-tb"
                                               : cue.vertical === "lr" ? "vertical-lr"
                                                                       : "vertical-rl".
      stylesunicodeBidi =  "plaintext";
    }

    this.applyStyles(styles);

    this.div.appendChild(this.cueDiv);

    // Calculate the distance from the reference edge of the viewport to the text
    // position of the cue box. The reference edge will be resolved later when
    // the box orientation styles are applied.
    var textPos = 0;
    switch (cue.positionAlign) {
    case "start":
      textPos = cue.position;
      break;
    case "middle":
      textPos = cue.position - (cue.size / 2);
      break;
    case "end":
      textPos = cue.position - cue.size;
      break;
    }

    // Horizontal box orientation; textPos is the distance from the left edge of the
    // area to the left edge of the box and cue.size is the distance extending to
    // the right from there.
    if (cue.vertical === "") {
      this.applyStyles({
        left:  this.formatStyle(textPos, "%"),
        width: this.formatStyle(cue.size, "%"),
      });
    // Vertical box orientation; textPos is the distance from the top edge of the
    // area to the top edge of the box and cue.size is the height extending
    // downwards from there.
    } else {
      this.applyStyles({
        top: this.formatStyle(textPos, "%"),
        height: this.formatStyle(cue.size, "%")
      });
    }

    this.move = function(box) {
      this.applyStyles({
        top: this.formatStyle(box.top, "px"),
        bottom: this.formatStyle(box.bottom, "px"),
        left: this.formatStyle(box.left, "px"),
        right: this.formatStyle(box.right, "px"),
        height: this.formatStyle(box.height, "px"),
        width: this.formatStyle(box.width, "px"),
      });
    };
  }
  CueStyleBox.prototype = _objCreate(StyleBox.prototype);
  CueStyleBox.prototype.constructor = CueStyleBox;

  // Represents the co-ordinates of an Element in a way that we can easily
  // compute things with such as if it overlaps or intersects with another Element.
  // Can initialize it with either a StyleBox or another BoxPosition.
  function BoxPosition(obj) {
    var isIE8 = (/MSIE\s8\.0/).test(navigator.userAgent);

    // Either a BoxPosition was passed in and we need to copy it, or a StyleBox
    // was passed in and we need to copy the results of 'getBoundingClientRect'
    // as the object returned is readonly. All co-ordinate values are in reference
    // to the viewport origin (top left).
    var lh, height, width, top;
    if (obj.div) {
      height = obj.div.offsetHeight;
      width = obj.div.offsetWidth;
      top = obj.div.offsetTop;

      var rects = (rects = obj.div.childNodes) && (rects = rects[0]) &&
                  rects.getClientRects && rects.getClientRects();
      obj = obj.div.getBoundingClientRect();
      // In certain cases the outter div will be slightly larger then the sum of
      // the inner div's lines. This could be due to bold text, etc, on some platforms.
      // In this case we should get the average line height and use that. This will
      // result in the desired behaviour.
      lh = rects ? Math.max((rects[0] && rects[0].height) || 0, obj.height / rects.length)
                 : 0;

    }
    this.left = obj.left;
    this.right = obj.right;
    this.top = obj.top || top;
    this.height = obj.height || height;
    this.bottom = obj.bottom || (top + (obj.height || height));
    this.width = obj.width || width;
    this.lineHeight = lh !== undefined ? lh : obj.lineHeight;

    if (isIE8 && !this.lineHeight) {
      this.lineHeight = 13;
    }
  }

  // Move the box along a particular axis. Optionally pass in an amount to move
  // the box. If no amount is passed then the default is the line height of the
  // box.
  BoxPosition.prototype.move = function(axis, toMove) {
    toMove = toMove !== undefined ? toMove : this.lineHeight;
    switch (axis) {
    case "+x":
      this.left += toMove;
      this.right += toMove;
      break;
    case "-x":
      this.left -= toMove;
      this.right -= toMove;
      break;
    case "+y":
      this.top += toMove;
      this.bottom += toMove;
      break;
    case "-y":
      this.top -= toMove;
      this.bottom -= toMove;
      break;
    }
  };

  // Check if this box overlaps another box, b2.
  BoxPosition.prototype.overlaps = function(b2) {
    return this.left < b2.right &&
           this.right > b2.left &&
           this.top < b2.bottom &&
           this.bottom > b2.top;
  };

  // Check if this box overlaps any other boxes in boxes.
  BoxPosition.prototype.overlapsAny = function(boxes) {
    for (var i = 0; i < boxes.length; i++) {
      if (this.overlaps(boxes[i])) {
        return true;
      }
    }
    return false;
  };

  // Check if this box is within another box.
  BoxPosition.prototype.within = function(container) {
    return this.top >= container.top &&
           this.bottom <= container.bottom &&
           this.left >= container.left &&
           this.right <= container.right;
  };

  // Check if this box is entirely within the container or it is overlapping
  // on the edge opposite of the axis direction passed. For example, if "+x" is
  // passed and the box is overlapping on the left edge of the container, then
  // return true.
  BoxPosition.prototype.overlapsOppositeAxis = function(container, axis) {
    switch (axis) {
    case "+x":
      return this.left < container.left;
    case "-x":
      return this.right > container.right;
    case "+y":
      return this.top < container.top;
    case "-y":
      return this.bottom > container.bottom;
    }
  };

  // Find the percentage of the area that this box is overlapping with another
  // box.
  BoxPosition.prototype.intersectPercentage = function(b2) {
    var x = Math.max(0, Math.min(this.right, b2.right) - Math.max(this.left, b2.left)),
        y = Math.max(0, Math.min(this.bottom, b2.bottom) - Math.max(this.top, b2.top)),
        intersectArea = x * y;
    return intersectArea / (this.height * this.width);
  };

  // Convert the positions from this box to CSS compatible positions using
  // the reference container's positions. This has to be done because this
  // box's positions are in reference to the viewport origin, whereas, CSS
  // values are in referecne to their respective edges.
  BoxPosition.prototype.toCSSCompatValues = function(reference) {
    return {
      top: this.top - reference.top,
      bottom: reference.bottom - this.bottom,
      left: this.left - reference.left,
      right: reference.right - this.right,
      height: this.height,
      width: this.width
    };
  };

  // Get an object that represents the box's position without anything extra.
  // Can pass a StyleBox, HTMLElement, or another BoxPositon.
  BoxPosition.getSimpleBoxPosition = function(obj) {
    var height = obj.div ? obj.div.offsetHeight : obj.tagName ? obj.offsetHeight : 0;
    var width = obj.div ? obj.div.offsetWidth : obj.tagName ? obj.offsetWidth : 0;
    var top = obj.div ? obj.div.offsetTop : obj.tagName ? obj.offsetTop : 0;

    obj = obj.div ? obj.div.getBoundingClientRect() :
                  obj.tagName ? obj.getBoundingClientRect() : obj;
    var ret = {
      left: obj.left,
      right: obj.right,
      top: obj.top || top,
      height: obj.height || height,
      bottom: obj.bottom || (top + (obj.height || height)),
      width: obj.width || width
    };
    return ret;
  };

  // Move a StyleBox to its specified, or next best, position. The containerBox
  // is the box that contains the StyleBox, such as a div. boxPositions are
  // a list of other boxes that the styleBox can't overlap with.
  function moveBoxToLinePosition(window, styleBox, containerBox, boxPositions) {

    // Find the best position for a cue box, b, on the video. The axis parameter
    // is a list of axis, the order of which, it will move the box along. For example:
    // Passing ["+x", "-x"] will move the box first along the x axis in the positive
    // direction. If it doesn't find a good position for it there it will then move
    // it along the x axis in the negative direction.
    function findBestPosition(b, axis) {
      var bestPosition,
          specifiedPosition = new BoxPosition(b),
          percentage = 1; // Highest possible so the first thing we get is better.

      for (var i = 0; i < axis.length; i++) {
        while (b.overlapsOppositeAxis(containerBox, axis[i]) ||
               (b.within(containerBox) && b.overlapsAny(boxPositions))) {
          b.move(axis[i]);
        }
        // We found a spot where we aren't overlapping anything. This is our
        // best position.
        if (b.within(containerBox)) {
          return b;
        }
        var p = b.intersectPercentage(containerBox);
        // If we're outside the container box less then we were on our last try
        // then remember this position as the best position.
        if (percentage > p) {
          bestPosition = new BoxPosition(b);
          percentage = p;
        }
        // Reset the box position to the specified position.
        b = new BoxPosition(specifiedPosition);
      }
      return bestPosition || specifiedPosition;
    }

    var boxPosition = new BoxPosition(styleBox),
        cue = styleBox.cue,
        linePos = computeLinePos(cue),
        axis = [];

    // If we have a line number to align the cue to.
    if (cue.snapToLines) {
      var size;
      switch (cue.vertical) {
      case "":
        axis = [ "+y", "-y" ];
        size = "height";
        break;
      case "rl":
        axis = [ "+x", "-x" ];
        size = "width";
        break;
      case "lr":
        axis = [ "-x", "+x" ];
        size = "width";
        break;
      }

      var step = boxPosition.lineHeight,
          position = step * Math.round(linePos),
          maxPosition = containerBox[size] + step,
          initialAxis = axis[0];

      // If the specified intial position is greater then the max position then
      // clamp the box to the amount of steps it would take for the box to
      // reach the max position.
      if (Math.abs(position) > maxPosition) {
        position = position < 0 ? -1 : 1;
        position *= Math.ceil(maxPosition / step) * step;
      }

      // If computed line position returns negative then line numbers are
      // relative to the bottom of the video instead of the top. Therefore, we
      // need to increase our initial position by the length or width of the
      // video, depending on the writing direction, and reverse our axis directions.
      if (linePos < 0) {
        position += cue.vertical === "" ? containerBox.height : containerBox.width;
        axis = axis.reverse();
      }

      // Move the box to the specified position. This may not be its best
      // position.
      boxPosition.move(initialAxis, position);

    } else {
      // If we have a percentage line value for the cue.
      var calculatedPercentage = (boxPosition.lineHeight / containerBox.height) * 100;

      switch (cue.lineAlign) {
      case "middle":
        linePos -= (calculatedPercentage / 2);
        break;
      case "end":
        linePos -= calculatedPercentage;
        break;
      }

      // Apply initial line position to the cue box.
      switch (cue.vertical) {
      case "":
        styleBox.applyStyles({
          top: styleBox.formatStyle(linePos, "%")
        });
        break;
      case "rl":
        styleBox.applyStyles({
          left: styleBox.formatStyle(linePos, "%")
        });
        break;
      case "lr":
        styleBox.applyStyles({
          right: styleBox.formatStyle(linePos, "%")
        });
        break;
      }

      axis = [ "+y", "-x", "+x", "-y" ];

      // Get the box position again after we've applied the specified positioning
      // to it.
      boxPosition = new BoxPosition(styleBox);
    }

    var bestPosition = findBestPosition(boxPosition, axis);
    styleBox.move(bestPosition.toCSSCompatValues(containerBox));
  }

  function WebVTT() {
    // Nothing
  }

  // Helper to allow strings to be decoded instead of the default binary utf8 data.
  WebVTT.StringDecoder = function() {
    return {
      decode: function(data) {
        if (!data) {
          return "";
        }
        if (typeof data !== "string") {
          throw new Error("Error - expected string data.");
        }
        return decodeURIComponent(encodeURIComponent(data));
      }
    };
  };

  WebVTT.convertCueToDOMTree = function(window, cuetext) {
    if (!window || !cuetext) {
      return null;
    }
    return parseContent(window, cuetext);
  };

  var FONT_SIZE_PERCENT = 0.05;
  var FONT_STYLE = "sans-serif";
  var CUE_BACKGROUND_PADDING = "1.5%";

  // Runs the processing model over the cues and regions passed to it.
  // @param overlay A block level element (usually a div) that the computed cues
  //                and regions will be placed into.
  WebVTT.processCues = function(window, cues, overlay) {
    if (!window || !cues || !overlay) {
      return null;
    }

    // Remove all previous children.
    while (overlay.firstChild) {
      overlay.removeChild(overlay.firstChild);
    }

    var paddedOverlay = window.document.createElement("div");
    paddedOverlay.style.position = "absolute";
    paddedOverlay.style.left = "0";
    paddedOverlay.style.right = "0";
    paddedOverlay.style.top = "0";
    paddedOverlay.style.bottom = "0";
    paddedOverlay.style.margin = CUE_BACKGROUND_PADDING;
    overlay.appendChild(paddedOverlay);

    // Determine if we need to compute the display states of the cues. This could
    // be the case if a cue's state has been changed since the last computation or
    // if it has not been computed yet.
    function shouldCompute(cues) {
      for (var i = 0; i < cues.length; i++) {
        if (cues[i].hasBeenReset || !cues[i].displayState) {
          return true;
        }
      }
      return false;
    }

    // We don't need to recompute the cues' display states. Just reuse them.
    if (!shouldCompute(cues)) {
      for (var i = 0; i < cues.length; i++) {
        paddedOverlay.appendChild(cues[i].displayState);
      }
      return;
    }

    var boxPositions = [],
        containerBox = BoxPosition.getSimpleBoxPosition(paddedOverlay),
        fontSize = Math.round(containerBox.height * FONT_SIZE_PERCENT * 100) / 100;
    var styleOptions = {
      font: fontSize + "px " + FONT_STYLE
    };

    (function() {
      var styleBox, cue;

      for (var i = 0; i < cues.length; i++) {
        cue = cues[i];

        // Compute the intial position and styles of the cue div.
        styleBox = new CueStyleBox(window, cue, styleOptions);
        paddedOverlay.appendChild(styleBox.div);

        // Move the cue div to it's correct line position.
        moveBoxToLinePosition(window, styleBox, containerBox, boxPositions);

        // Remember the computed div so that we don't have to recompute it later
        // if we don't have too.
        cue.displayState = styleBox.div;

        boxPositions.push(BoxPosition.getSimpleBoxPosition(styleBox));
      }
    })();
  };

  WebVTT.Parser = function(window, vttjs, decoder) {
    if (!decoder) {
      decoder = vttjs;
      vttjs = {};
    }
    if (!vttjs) {
      vttjs = {};
    }

    this.window = window;
    this.vttjs = vttjs;
    this.state = "INITIAL";
    this.buffer = "";
    this.decoder = decoder || new TextDecoder("utf8");
    this.regionList = [];
  };

  WebVTT.Parser.prototype = {
    // If the error is a ParsingError then report it to the consumer if
    // possible. If it's not a ParsingError then throw it like normal.
    reportOrThrowError: function(e) {
      if (e instanceof ParsingError) {
        this.onparsingerror && this.onparsingerror(e);
      } else {
        throw e;
      }
    },
    parse: function (data) {
      var self = this;

      // If there is no data then we won't decode it, but will just try to parse
      // whatever is in buffer already. This may occur in circumstances, for
      // example when flush() is called.
      if (data) {
        // Try to decode the data that we received.
        self.buffer += self.decoder.decode(data, {stream: true});
      }

      function collectNextLine() {
        var buffer = self.buffer;
        var pos = 0;
        while (pos < buffer.length && buffer[pos] !== '\r' && buffer[pos] !== '\n') {
          ++pos;
        }
        var line = buffer.substr(0, pos);
        // Advance the buffer early in case we fail below.
        if (buffer[pos] === '\r') {
          ++pos;
        }
        if (buffer[pos] === '\n') {
          ++pos;
        }
        self.buffer = buffer.substr(pos);
        return line;
      }

      // 3.4 WebVTT region and WebVTT region settings syntax
      function parseRegion(input) {
        var settings = new Settings();

        parseOptions(input, function (k, v) {
          switch (k) {
          case "id":
            settings.set(k, v);
            break;
          case "width":
            settings.percent(k, v);
            break;
          case "lines":
            settings.integer(k, v);
            break;
          case "regionanchor":
          case "viewportanchor":
            var xy = v.split(',');
            if (xy.length !== 2) {
              break;
            }
            // We have to make sure both x and y parse, so use a temporary
            // settings object here.
            var anchor = new Settings();
            anchor.percent("x", xy[0]);
            anchor.percent("y", xy[1]);
            if (!anchor.has("x") || !anchor.has("y")) {
              break;
            }
            settings.set(k + "X", anchor.get("x"));
            settings.set(k + "Y", anchor.get("y"));
            break;
          case "scroll":
            settings.alt(k, v, ["up"]);
            break;
          }
        }, /=/, /\s/);

        // Create the region, using default values for any values that were not
        // specified.
        if (settings.has("id")) {
          var region = new (self.vttjs.VTTRegion || self.window.VTTRegion)();
          region.width = settings.get("width", 100);
          region.lines = settings.get("lines", 3);
          region.regionAnchorX = settings.get("regionanchorX", 0);
          region.regionAnchorY = settings.get("regionanchorY", 100);
          region.viewportAnchorX = settings.get("viewportanchorX", 0);
          region.viewportAnchorY = settings.get("viewportanchorY", 100);
          region.scroll = settings.get("scroll", "");
          // Register the region.
          self.onregion && self.onregion(region);
          // Remember the VTTRegion for later in case we parse any VTTCues that
          // reference it.
          self.regionList.push({
            id: settings.get("id"),
            region: region
          });
        }
      }

      // 3.2 WebVTT metadata header syntax
      function parseHeader(input) {
        parseOptions(input, function (k, v) {
          switch (k) {
          case "Region":
            // 3.3 WebVTT region metadata header syntax
            parseRegion(v);
            break;
          }
        }, /:/);
      }

      // 5.1 WebVTT file parsing.
      try {
        var line;
        if (self.state === "INITIAL") {
          // We can't start parsing until we have the first line.
          if (!/\r\n|\n/.test(self.buffer)) {
            return this;
          }

          line = collectNextLine();

          var m = line.match(/^WEBVTT([ \t].*)?$/);
          if (!m || !m[0]) {
            throw new ParsingError(ParsingError.Errors.BadSignature);
          }

          self.state = "HEADER";
        }

        var alreadyCollectedLine = false;
        while (self.buffer) {
          // We can't parse a line until we have the full line.
          if (!/\r\n|\n/.test(self.buffer)) {
            return this;
          }

          if (!alreadyCollectedLine) {
            line = collectNextLine();
          } else {
            alreadyCollectedLine = false;
          }

          switch (self.state) {
          case "HEADER":
            // 13-18 - Allow a header (metadata) under the WEBVTT line.
            if (/:/.test(line)) {
              parseHeader(line);
            } else if (!line) {
              // An empty line terminates the header and starts the body (cues).
              self.state = "ID";
            }
            continue;
          case "NOTE":
            // Ignore NOTE blocks.
            if (!line) {
              self.state = "ID";
            }
            continue;
          case "ID":
            // Check for the start of NOTE blocks.
            if (/^NOTE($|[ \t])/.test(line)) {
              self.state = "NOTE";
              break;
            }
            // 19-29 - Allow any number of line terminators, then initialize new cue values.
            if (!line) {
              continue;
            }
            self.cue = new (self.vttjs.VTTCue || self.window.VTTCue)(0, 0, "");
            self.state = "CUE";
            // 30-39 - Check if self line contains an optional identifier or timing data.
            if (line.indexOf("-->") === -1) {
              self.cue.id = line;
              continue;
            }
            // Process line as start of a cue.
            /*falls through*/
          case "CUE":
            // 40 - Collect cue timings and settings.
            try {
              parseCue(line, self.cue, self.regionList);
            } catch (e) {
              self.reportOrThrowError(e);
              // In case of an error ignore rest of the cue.
              self.cue = null;
              self.state = "BADCUE";
              continue;
            }
            self.state = "CUETEXT";
            continue;
          case "CUETEXT":
            var hasSubstring = line.indexOf("-->") !== -1;
            // 34 - If we have an empty line then report the cue.
            // 35 - If we have the special substring '-->' then report the cue,
            // but do not collect the line as we need to process the current
            // one as a new cue.
            if (!line || hasSubstring && (alreadyCollectedLine = true)) {
              // We are done parsing self cue.
              self.oncue && self.oncue(self.cue);
              self.cue = null;
              self.state = "ID";
              continue;
            }
            if (self.cue.text) {
              self.cue.text += "\n";
            }
            self.cue.text += line;
            continue;
          case "BADCUE": // BADCUE
            // 54-62 - Collect and discard the remaining cue.
            if (!line) {
              self.state = "ID";
            }
            continue;
          }
        }
      } catch (e) {
        self.reportOrThrowError(e);

        // If we are currently parsing a cue, report what we have.
        if (self.state === "CUETEXT" && self.cue && self.oncue) {
          self.oncue(self.cue);
        }
        self.cue = null;
        // Enter BADWEBVTT state if header was not parsed correctly otherwise
        // another exception occurred so enter BADCUE state.
        self.state = self.state === "INITIAL" ? "BADWEBVTT" : "BADCUE";
      }
      return this;
    },
    flush: function () {
      var self = this;
      try {
        // Finish decoding the stream.
        self.buffer += self.decoder.decode();
        // Synthesize the end of the current cue or region.
        if (self.cue || self.state === "HEADER") {
          self.buffer += "\n\n";
          self.parse();
        }
        // If we've flushed, parsed, and we're still on the INITIAL state then
        // that means we don't have enough of the stream to parse the first
        // line.
        if (self.state === "INITIAL") {
          throw new ParsingError(ParsingError.Errors.BadSignature);
        }
      } catch(e) {
        self.reportOrThrowError(e);
      }
      self.onflush && self.onflush();
      return this;
    }
  };

  global.WebVTT = WebVTT;

}(this, (this.vttjs || {})));

//# sourceMappingURL=video.js.map
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _$ = require('jquery');

var _$2 = _interopRequireDefault(_$);

var _videojs = require('video.js');

var _videojs2 = _interopRequireDefault(_videojs);

},{"jquery":1,"video.js":2}]},{},[3]);
