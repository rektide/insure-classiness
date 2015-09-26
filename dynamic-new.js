// http://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible/1608546#1608546
module.exports= function construct(constructor, args) {
	function F() {
		return constructor.apply(this, args)
	}
	F.prototype = constructor.prototype
	return new F()
}
