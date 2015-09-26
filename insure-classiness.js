var checkGlobal= require("check-global"),
  dynamicNew= require("./dynamic-new")

module.exports= function insureClassiness(o, klass, args){
	if(o instanceof klass) return o
	if(checkGlobal(o)){
		return dynamicNew(klass, args)
	}
	for(var i in klass.prototype){
		if(o[i] === undefined){
			o[i]= klass.prototype[i]
		}
	}
	if(!args || args.length === 0){
		klass.call(o)
	}else if(args.length === 1){
		klass.call(o, args[0])
	}else
		klass.apply(o, args)
	}
	return o
}
