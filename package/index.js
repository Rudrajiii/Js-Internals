const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const logger = require('./src/utils/logger');

//Array_Objects
const CustomSet = require('./src/DataStructures/set');
//Instance Methods
const CustomMap = require('./src/Polyfills/Array_Object/Instance_Methods/_map');
const CustomFilter = require('./src/Polyfills/Array_Object/Instance_Methods/_filter');
const CustomReduce = require('./src/Polyfills/Array_Object/Instance_Methods/_reduce');
const CustomForEach = require('./src/Polyfills/Array_Object/Instance_Methods/_forEach');
const CustomSome = require('./src/Polyfills/Array_Object/Instance_Methods/_some');
const CustomEvery = require('./src/Polyfills/Array_Object/Instance_Methods/_every');
const CustomFind = require('./src/Polyfills/Array_Object/Instance_Methods/_find');
const CustomIndexOf = require('./src/Polyfills/Array_Object/Instance_Methods/_indexOf');
const CustomIncludes = require('./src/Polyfills/Array_Object/Instance_Methods/_includes');
const CustomReverse = require('./src/Polyfills/Array_Object/Instance_Methods/_reverse');
const CustomSort = require('./src/Polyfills/Array_Object/Instance_Methods/_sort');
const CustomSplice = require('./src/Polyfills/Array_Object/Instance_Methods/_splice');
const CustomSlice = require('./src/Polyfills/Array_Object/Instance_Methods/_slice');

//?Static Methods
const CustomFrom = require('./src/Polyfills/Array_Object/Static_Methods/_from');
const CustomIsArray = require('./src/Polyfills/Array_Object/Static_Methods/_isArray');
const CustomOf = require('./src/Polyfills/Array_Object/Static_Methods/_of');


//*Function_Objects
const CustomCall = require('./src/Polyfills/Function/_call');
const CustomApply = require('./src/Polyfills/Function/_apply');
const CustomBind = require('./src/Polyfills/Function/_bind');

//*Global Methods
const CustomNaN = require('./src/Polyfills/Global/_isNaN');
const CustomisFinite = require('./src/Polyfills/Global/_isFinite');
const CustomparseInt = require('./src/Polyfills/Global/_parseInt');
const CustomparseJSON = require('./src/Polyfills/Global/_parseJSON');
const CustomStringifyJSON = require('./src/Polyfills/Global/_stringifyJSON');
const CustomparseFloat = require('./src/Polyfills/Global/_parseFloat');

//*Math Methods
const CustomMathMax = require('./src/Polyfills/Math/_max');
const CustomMathMin = require('./src/Polyfills/Math/_min');

//Set Custom Funcs to Array Scope 
Array.prototype.$map = CustomMap.__map;
Array.prototype.$filter = CustomFilter.__filter;
Array.prototype.$reduce = CustomReduce.__reduce;
Array.prototype.$forEach = CustomForEach.__forEach;
Array.prototype.$some = CustomSome.__some;
Array.prototype.$every = CustomEvery.__every ;
Array.prototype.$find = CustomFind.__find;
Array.prototype.$indexOf = CustomIndexOf.__indexOf;
Array.prototype.$includes = CustomIncludes.__includes;
Array.prototype.$reverse = CustomReverse.__reverse;
Array.prototype.$sort = CustomSort.__sort;
Array.prototype.$splice = CustomSplice.__splice;
Array.prototype.$slice = CustomSlice.__slice;

//Set Custom Funcs to Function Scope
Function.prototype.$from = CustomFrom.__from;
Function.prototype.$call = CustomCall.__call;
Function.prototype.$apply = CustomApply.__apply;
Function.prototype.$isArray = CustomIsArray.__isArray;
Function.prototype.$of = CustomOf.__of;
Function.prototype.$bind = CustomBind.__bind;

//*special case;
global.$find = Function.call.bind(Array.prototype.find);

//*Set in Global Scope
$isNaN = CustomNaN.$isNaN;
$isFinite = CustomisFinite.$isFinite;
$parseInt = CustomparseInt.$parseInt;
$parseFloat = CustomparseFloat.$parseFloat;
$parseJSON = CustomparseJSON.$parseJSON;
$stringifyJSON = CustomStringifyJSON.$stringifyJSON;

//*Math Polyfills
Math.$max = CustomMathMax.$max;
Math.$min = CustomMathMin.$min;

// Add function to run all internals
function GET_ALL() {

    logger.info('Generating JS internals files...');
  
  // Create a list of all internals to process
  const internals = [
    { name: 'Set', fn: CustomSet.generateInternals },
    { name: 'Map', fn: CustomMap.map_internals },
    { name: 'Filter', fn: CustomFilter.filter_internals },
    { name: 'Reduce', fn: CustomReduce.reduce_internals },
    { name: 'Call', fn: CustomCall.call_internals },
    { name: 'Apply', fn: CustomApply.apply_internals },
    { name: 'From', fn: CustomFrom.from_internals },
    { name: 'IsArray', fn: CustomIsArray.isArray_internals },
    { name: 'Of', fn: CustomOf.of_internals },
    { name: 'ForEach', fn: CustomForEach.forEach_internals },
    { name: 'Some', fn: CustomSome.some_internals },
    { name: 'Every', fn: CustomEvery.every_internals },
    { name: 'IsNaN', fn: CustomNaN.isNaN_internals },
    { name: 'IsFinite', fn: CustomisFinite.isFinite_internals },
    { name: 'parseInt', fn: CustomparseInt.parseInt_internals },
    { name: 'parseJSON', fn: CustomparseJSON.parseJSON_internals },
    { name: 'Bind', fn: CustomBind.bind_internals },
    { name: 'StringifyJSON', fn: CustomStringifyJSON.stringifyJSON_internals },
    { name: 'parseFloat', fn: CustomparseFloat.parseFloat_internals },
    { name: 'find', fn: CustomFind.find_internals },
    { name: 'indexOf', fn: CustomIndexOf.indexOf_internals},
    { name: 'MathMax', fn: CustomMathMax.max_internals },
    { name: 'MathMin', fn: CustomMathMin.min_internals },
    { name: 'Includes', fn: CustomIncludes.includes_internals },
    { name: 'Reverse', fn: CustomReverse.reverse_internals },
    { name: 'Sort', fn: CustomSort.sort_internals },
    { name: 'Splice', fn: CustomSplice.splice_internals },
    { name: 'Slice', fn: CustomSlice.slice_internals }
  ];
  
  // Process each internal
  internals.forEach(internal => {
    logger.functionInfo(internal.name);
    internal.fn();
  });
  
  logger.success('All JS internals files have been generated!');
  logger.info('Use these custom implementations to learn how JavaScript works internally.');
}


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
    every_internals: CustomEvery.every_internals,
    isNaN_internals: CustomNaN.isNaN_internals,
    isFinite_internals: CustomisFinite.isFinite_internals,
    parseInt_internals: CustomparseInt.parseInt_internals,
    parseJSON_internals: CustomparseJSON.parseJSON_internals,
    bind_internals: CustomBind.bind_internals,
    stringifyJSON_internals: CustomStringifyJSON.stringifyJSON_internals,
    parseFloat_internals: CustomparseFloat.parseFloat_internals,
    find_internals: CustomFind.find_internals,
    indexOf_internals: CustomIndexOf.indexOf_internals,
    max_internals: CustomMathMax.max_internals,
    min_internals: CustomMathMin.min_internals,
    includes_internals: CustomIncludes.includes_internals,
    reverse_internals: CustomReverse.reverse_internals,
    sort_internals: CustomSort.sort_internals,
    splice_internals: CustomSplice.splice_internals,
    slice_internals: CustomSlice.slice_internals
},
  GET_ALL
};

