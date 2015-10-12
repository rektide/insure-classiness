var
  checkGlobal= require("check-global"),
  dynamicNew= require("./dynamic-new")

function insureClassiness(o, klass, args, topKlass){
	topKlass= topKlass|| klass
	function recurse(o){
		if( !klass.super_){
			return o
		}
		return insureClassiness(o, klass.super_, args, topKlass)
	}

	if(o instanceof klass && klass === topKlass){
		return recurse(o)
	}
	if(checkGlobal(o)){
		return dynamicNew(klass, args)
	}

	for(var i in klass.prototype){
		if(o[i] === undefined){
			o[i]= klass.prototype[i]
		}
	}
	if(!args || !args || args.length === 0){
		klass.call(o)
	}else if(args.length === 1){
		klass.call(o, args[0])
	}else{
		klass.apply(o, args)
	}
	return recurse(o)
}

module.exports= insureClassiness
