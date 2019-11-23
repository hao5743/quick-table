// const input = require('./input.json');
const fs = require('fs')
const path = require('path')
var file = fs.readFileSync('./input.txt', "utf8");
file = filterNumberlong(file);
const input = JSON.parse(file);
console.log(input)
var ans = '';
const dir = path.resolve('./');

const mapInterface = {
  'string': 'string',
  'number': 'number',
  'boolean': 'boolean',
  'object': 'any',
}

const mapSchema = {
  'string': 'String',
  'number': 'Number',
  'boolean': 'Boolean',
  'object': 'Object',
}

var unknow = 'any';
var dot = ';';
var map = mapInterface;
function process(obj, n = 0) {
  var keys = Object.keys(obj);
  keys.forEach( e => {
    const v = obj[e];
    if(isUndefined(v) || isNull(v) || isFunction(v)) {
      print(`${e}: ${unknow}${dot}`, n)
    }
    else if(isString(v) || isNumber(v) || isBoolean(v)) {
        print(`${e}: ${map[typeof v]}${dot}`, n)
    }
    else if(isArray(v)) {
      if(v.length) {
        var k = v[0];
        if(isUndefined(k) || isNull(k) || isFunction(k)) {
          print(`${e}: [${unknow}]${dot}`, n)
        }
        else if(isString(k) || isNumber(k) || isBoolean(k)) {
            print(`${e}: [${map[typeof k]}]${dot}`, n)
        }
        else if(isObject(k)) {
          print(`${e}: [{`, n)
          process(k, n+2);
          print(`}]${dot}`, n)
        } else {
          print(`${e}: [${unknow}]${dot}`, n)
        }
      } else {
        print(`${e}: [${unknow}]${dot}`, n)
      }
    }
    else if(isObject(v)) {
      print(`${e}: {`, n)
      process(v, n+2);
      print(`}${dot}`, n)
    } else {
      throw new Error(v)
    }
  })
}

print();
print('Interface: ')
print('{');
process(input);
print('}');

print('\n');
print('Schema: ')
unknow = 'Object';
dot = ',';
map = mapSchema;
print('{');
process(input);
print('}');
writeToFile(ans);
console.log('ok!');
console.log(`Write Interface and schema to \'${dir}/ans.txt\' success!`)

function print(str, n = 0) {
  while(n--) {
    str = ' ' + str;
  }
  ans = `${ans}${str}\n`;
}

function writeToFile(ans) {
  fs.writeFileSync(dir +'/ans.txt', ans);
}

function filterNumberlong(file) {
  var regu =/NumberLong\((\d*)\)/;
  var reg = new RegExp(regu, "gm");
  file = file.replace(reg, '$1')
  return file;
}

function isNull(tmp) {
  if (!tmp && typeof(tmp)!="undefined" && tmp!=0){
    return true;
  }
  return false;
}

function isUndefined(tmp) {
  return typeof(tmp) === "undefined"
}

function isArray(tmp) {
  return (tmp instanceof Array);
}

// 是函数
function isFunction(tmp) {
  return typeof tmp === 'function';
}

// 是函数
function isObject(tmp) {
  return typeof tmp === 'object';
}

function isString(tmp) {
  return typeof tmp === 'string';
}

function isBoolean(tmp) {
  return typeof tmp === 'boolean';
}

function isNumber(tmp) {
  return typeof tmp === 'number';
}
