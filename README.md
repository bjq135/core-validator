### core-validator

An object validator in javascript for Node and modern browsers


### Install

`npm install --save core-validator`


### Useage

```javascript
const Validator = require('core-validator');
const validator = new Validator();
```


### Validate an integer

```javascript
var input = { value: null };
var rules = { value: { type: 'integer' } };
validator.validate(input, rules);
// => [{ message: 'value is required', field: 'value' }]

let input = { value:'1'};
let rules = { value: { type: 'integer'} };
validator.validate(input, rules);
// => [{ message: 'value must be an integer', field: 'value' }]
```


### Validate a number

```javascript
let input = { value:'hello'};
let rules = { value: { type: 'number'} };
validate(input, rules);
validator.validate(input, rules);
// => [{ message: 'value must be a number', field: 'value' }]

let input = { value:'123'};
let rules = { value: { type: 'number'} };
validator.validate(input, rules);
// => undefined

let input = { value:'123'};
let rules = { value: { type: 'number'} };
let validator = new Validator({ convert: false });
validator.validate(input, rules);
// => [{ message: 'value must be a number', field: 'value' }]
```

### Validate an email

```javascript
let input = { email:'hello'};
let rules = { email: { type: 'email'} };
validate(input, rules);
validator.validate(input, rules);
// => [{ message: 'value must be an email', field: 'email' }]
```


### Validate a mobile

```javascript
let input = { mobile:'123123'};
let rules = { mobile: { type: 'mobile'} };
validate(input, rules);
validator.validate(input, rules);
// => [{ message: 'value must be a mobile', field: 'mobile' }]
```


### Validate a string

```javascript
let input = { value: 'hello' };
let rules = { value: { type: 'string', min: 2 } };
let errors = validator.validate(input, rules);
// => undefined

let input = { value: 'hello' };
let rules = { value: { type: 'string', max: 4 } };
let errors = validator.validate(input, rules);
// => [{ message:'value length must be less than 4', field: 'value'}]

let input = { value: 'hello' };
let rules = { value: { type: 'string', min: 6 } };
let errors = validator.validate(input, rules);
// => [{ message:'value length must be greater than 6', field: 'value'}]

let input = { value: 'hello' };
let rules = { value: { type:'string', pattern:/\d+/ } };
let errors = validator.validate(input, rules);
// => [
//   { message:'value fails to match the /\\d+/ pattern', field: 'value'}
// ]

```


### Validate a boolean

```javascript
let input = { value: true };
let rules = { value: { type: 'boolean' } };
validator.validate(input, rules);
// => undefined


let input = { value: 1 };
let rules = { value: { type: 'boolean' } };
validator.validate(input, rules);
// => { message: 'value must be a boolean', field: 'value' }
```


### Validate a date

```javascript
let input = { value: '2025-04-16' };
let rules = { value: { type: 'date' } };
validator.validate(input, rules);
// => undefined
```


### Validate a datetime

```javascript
let input = { value: '2025-04-16 10:30:30' };
let rules = { value: { type: 'datetime' } };
validator.validate(input, rules);
// => undefined
```


### Validate a password

```javascript
let input = { value: 'Passw0rd!' };
let rules = { value: { type: 'password' } };
validator.validate(input, rules);
// => undefined
```


### Custom message

```javascript 
let input = { name: 'lord of the sea', age:17 };
let rules = {
  name: { type: 'string', min:2, max:10 },
  age: { type: 'integer', min:22, max:100, required:false }
};
let messages = {
  name: {
    type: `sailor's name should be a string`,
    max:`name's length must be less than :max`
  },
  age: {
    type: '水手的年龄必须是一个整数',
    min:`水手的年龄必须大于:min`
  }
};

validator.validate(input, rules, messages);
// => [
//   { message: "name's length must be less than 10", field: 'name' },
//   { message: "水手的年龄必须大于22", field: 'age' }
// ]
```

