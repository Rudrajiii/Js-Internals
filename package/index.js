const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

// Create logger before requiring other modules
const logger = {
  success: (message) => console.log(chalk.green('✓ ') + chalk.green.bold(message)),
  info: (message) => console.log(chalk.blue('ℹ ') + chalk.blue(message)),
  warning: (message) => console.log(chalk.yellow('⚠ ') + chalk.yellow(message)),
  error: (message) => console.log(chalk.red('✗ ') + chalk.red.bold(message)),
  fileCreated: (filePath) => {
    const fileName = path.basename(filePath);
    console.log(
      chalk.green('✓ Created: ') + 
      chalk.white(fileName)
    );
  },
  fileExists: (filePath) => {
    const fileName = path.basename(filePath);
    console.log(
      chalk.yellow('⚠ Skipped: ') + 
      chalk.white(fileName) + 
      chalk.gray(` already exists.`)
    );
  },
  functionInfo: (name) => {
    console.log(
      chalk.blue('➤ ') + 
      chalk.blue.bold(`${name} `) + 
      chalk.blue('internals')
    );
  }
};

// Create utils directory if it doesn't exist
const utilsDir = path.join(__dirname, 'src', 'utils');
if (!fs.existsSync(utilsDir)) {
  fs.mkdirSync(utilsDir, { recursive: true });
}

// Write logger to a file
const loggerPath = path.join(utilsDir, 'logger.js');
if (!fs.existsSync(loggerPath)) {
  const loggerCode = `
const chalk = require('chalk');
const path = require('path');

const logger = {
  success: (message) => console.log(chalk.green('✓ ') + chalk.green.bold(message)),
  info: (message) => console.log(chalk.blue('ℹ ') + chalk.blue(message)),
  warning: (message) => console.log(chalk.yellow('⚠ ') + chalk.yellow(message)),
  error: (message) => console.log(chalk.red('✗ ') + chalk.red.bold(message)),
  fileCreated: (filePath) => {
    const fileName = path.basename(filePath);
    console.log(
      chalk.green('✓ Created: ') + 
      chalk.white(fileName)
    );
  },
  fileExists: (filePath) => {
    const fileName = path.basename(filePath);
    console.log(
      chalk.yellow('⚠ Skipped: ') + 
      chalk.white(fileName) + 
      chalk.gray(\` already exists!!\`)
    );
  },
  functionInfo: (name) => {
    console.log(
      chalk.blue('➤ ') + 
      chalk.blue.bold(\`\${name} \`) + 
      chalk.blue('internals')
    );
  }
};

module.exports = logger;
  `;
  fs.writeFileSync(loggerPath, loggerCode, 'utf8');
}

//Source destination;
//*Array_Objects
const CustomSet = require('./src/DataStructures/set');
//?Instance Methods
const CustomMap = require('./src/Polyfills/Array_Object/Instance_Methods/_map');
const CustomFilter = require('./src/Polyfills/Array_Object/Instance_Methods/_filter');
const CustomReduce = require('./src/Polyfills/Array_Object/Instance_Methods/_reduce');
const CustomForEach = require('./src/Polyfills/Array_Object/Instance_Methods/_forEach');
const CustomSome = require('./src/Polyfills/Array_Object/Instance_Methods/_some');
const CustomEvery = require('./src/Polyfills/Array_Object/Instance_Methods/_every');

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
Function.prototype.$bind = CustomBind.__bind;

//Set in Global Scope
$isNaN = CustomNaN.$isNaN;
$isFinite = CustomisFinite.$isFinite;
$parseInt = CustomparseInt.$parseInt;
$parseFloat = CustomparseFloat.$parseFloat;
$parseJSON = CustomparseJSON.$parseJSON;
$stringifyJSON = CustomStringifyJSON.$stringifyJSON;

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
},
  GET_ALL
};

