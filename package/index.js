//Source destination;
const CustomSet = require('./src/DataStructures/set');
const CustomMap = require('./src/internal-custom-functions/Array_Object/Instance_Methods/_map');
const CustomFilter = require('./src/internal-custom-functions/Array_Object/Instance_Methods/_filter');
const CustomReduce = require('./src/internal-custom-functions/Array_Object/Instance_Methods/_reduce');
const CustomCall = require('./src/internal-custom-functions/Array_Object/Static_Methods/_call');
const CustomApply = require('./src/internal-custom-functions/Array_Object/Static_Methods/_apply');
const CustomFrom = require('./src/internal-custom-functions/Array_Object/Static_Methods/_from');
const CustomIsArray = require('./src/internal-custom-functions/Array_Object/Static_Methods/_isArray');
const CustomOf = require('./src/internal-custom-functions/Array_Object/Static_Methods/_of');
const CustomForEach = require('./src/internal-custom-functions/Array_Object/Instance_Methods/_forEach');
const CustomSome = require('./src/internal-custom-functions/Array_Object/Instance_Methods/_some');
const CustomEvery = require('./src/internal-custom-functions/Array_Object/Instance_Methods/_every');
//Set Custom Funcs to Array Scope 
Array.prototype.$map = CustomMap.__map;
Array.prototype.$filter = CustomFilter.__filter;
Array.prototype.$reduce = CustomReduce.__reduce;
Array.prototype.$forEach = CustomForEach.__forEach;
Array.prototype.$some = CustomSome.__some;
Array.prototype.$every = CustomEvery.__every ;

//Set Custom Funcs to Function Scope
Function.prototype.$from = CustomFrom.__from;
Function.prototype.$call = CustomCall.__call;
Function.prototype.$apply = CustomApply.__apply;
Function.prototype.$isArray = CustomIsArray.__isArray;
Function.prototype.$of = CustomOf.__of;

//export all codes of custom function
module.exports = {
  INTERNAL: {
    $set: CustomSet,
    set_internals: CustomSet.generateInternals,
    map_internals: CustomMap.map_internals,
    filter_internals: CustomFilter.filter_internals,
    reduce_internals: CustomReduce.reduce_internals,
    call_internals: CustomCall.call_internals,
    apply_internals: CustomApply.apply_internals,
    from_internals: CustomFrom.from_internals,
    isArray_internals: CustomIsArray.isArray_internals,
    of_internals: CustomOf.of_internals,
    forEach_internals: CustomForEach.forEach_internals,
    some_internals: CustomSome.some_internals,
    every_internals: CustomEvery.every_internals
}
};


