// We do require jQuery's $.extend()
Object.extendIfEmpty = function() {
	if (!arguments.length) return {}
	if (arguments.length < 2) return arguments[0]
	var i,j,obj = arguments[0]
	for (i=1; i<arguments.length; i++) {
		if (typeof arguments[i] != 'object') continue
		for (j in arguments[i])
			if (arguments[i].hasOwnProperty(j) && !obj.hasOwnProperty(j)) obj[j] = arguments[i][j]
	}
	return obj
}
if (typeof Object.assign !== 'function')
Object.assign = function() {
	if (!arguments.length) return {}
	if (arguments.length < 2) return arguments[0]
	var i,j,obj = arguments[0]
	for (i=1; i<arguments.length; i++) {
		if (typeof arguments[i] != 'object') continue
		for (j in arguments[i])
			if (arguments[i].hasOwnProperty(j)) obj[j] = arguments[i][j]
	}
	return obj
}
// Need to check if an object is empty
Object.prototype.isEmpty=function(){if(this===null||this===undefined)return true;if(this.length>0)return false;if(this.length===0)return true;if(typeof this!=="object")return true;if(Object.getOwnPropertyNames(this).length)return false;return true}
// JavaScript 1.8
if (!Array.prototype.forEach)
Array.prototype.forEach=function(a,b){var T,k,O,l,m;if(this==null){throw new TypeError('this is null or not defined')}O=Object(this);l=O.length>>>0;if(typeof a!=="function"){throw new TypeError(a+' is not a function')}if(arguments.length>1)T=b;k=0;while(k<l){if(k in O){m=O[k];a.call(T,m,k,O)}k++}};
if (!Array.prototype.indexOf)
Array.prototype.indexOf=function(a,b){if(this===undefined||this===null){throw new TypeError('"this" is null or not defined')}var length=this.length>>>0;b=+b||0;if(Math.abs(b)===Infinity){b=0}if(b<0){b+=length;if(b<0)b=0}for(;b<length;b++){if(this[b]===a)return b}return -1};
// Extend String.prototype.trim to PHP behavior to remove more than just white space
String.prototype.trim=function(chars){return this.replace(new RegExp('^['+(chars||'\\uffef\\xa0\\s')+']+|['+(chars||'\\uffef\\xa0\\s')+']+$','g'),'')}
// ECMAScript 6
if(!Number.isInteger)
Number.isInteger=function(a){return typeof a==='number'&&isFinite(a)&&Math.abs(a)<Math.pow(2,53)-1&&Math.floor(a)===a};
