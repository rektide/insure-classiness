// http://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible/1608546#1608546
module.exports= function construct(constructor, args) {
	function F() {
		if(!args || args.length === 0){
			return constructor.call(this)
		}else if(args.length === 1){
			return constructor.call(this, args[0])
		}else{
			return constructor.apply(this, args)
		}
	}
	F.prototype = constructor.prototype
	return new F()
}
