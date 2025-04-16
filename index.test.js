'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const Validator = require('./index.js');
const validator = new Validator();


test('integer', async (t) => {
  await t.test('required default work fine with undefined', () => {
    let input = {};
    let rules = { value: { type: 'integer' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, [{ message: 'value is required', field: 'value' }]);
  });

  await t.test('required true work fine with undefined', () => {
    let input = {};
    let rules = { value: { type: 'integer', required: true } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, [{ message: 'value is required', field: 'value' }]);
  });

  await t.test('required false work fine with undefined', () => {
    let input = {};
    let rules = { value: { type: 'integer', required: false } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);
  });

  await t.test('must be an integer', () => {
    let input = { value:'hello'};
    let rules = { value: { type: 'integer'} };
    let error = validator.validate(input, rules)[0];
    assert.deepEqual(error, { message: 'value must be an integer', field: 'value' });
  });

  await t.test('must be an integer with convert', () => {
    let input = { value:'123'};
    let rules = { value: { type: 'integer'} };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);
  });

  await t.test('must be an integer without convert', () => {
    let input = { value:'123'};
    let rules = { value: { type: 'integer'} };
    let validator = new Validator({convert:false});
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, [{ message: 'value must be an integer', field: 'value' }]);
  });

  await t.test('required true work fine with null', () => {
    let input = { value: null };
    let rules = { value: { type: 'integer', required: true} };
    let error = validator.validate(input, rules)[0];
    assert.deepEqual(error, { message: 'value is required', field: 'value' });
  });

  await t.test('required false work fine with null', () => {
    let input = { value: null };
    let rules = { value: { type: 'integer', required: false } };
    let error = validator.validate(input, rules);
    assert.deepEqual(error, undefined);
  });

  await t.test('required true work fine with ``', () => {
    let input = { value: `` };
    let rules = { value: { type: 'integer', required: true} };
    let error = validator.validate(input, rules)[0];
    assert.deepEqual(error, { message: 'value is required', field: 'value' });
  });

  await t.test('required false work fine with ``', () => {
    let input = { value: `` };
    let rules = { value: { type: 'integer', required: false } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);
  });

  await t.test('required true work fine with not convert ``', () => {
    let input = { value: `` };
    let rules = { value: { type: 'integer' } };
    let validator = new Validator({convert:false})
    let error = validator.validate(input, rules)[0];
    assert.deepEqual(error, { message: 'value is required', field: 'value' });
  });

  await t.test('required false work fine with not convert ``', () => {
    let input = { value: `` };
    let rules = { value: { type: 'integer', required: false } };
    let validator = new Validator({convert:false})
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);
  });

  await t.test('check min', () => {
    let input = { value: 20 };
    let rules = { value: { type: 'number', min: 10 } };
    let errors = validator.validate(input, rules);
    assert.equal(errors, undefined);
  });

  await t.test('check min error', () => {
    let input = { value: 20 };
    let rules = { value: { type: 'number', min: 30 } };
    let errors = validator.validate(input, rules);
    assert.equal(errors[0].message, 'value must be greater than 30');
  });
  
  await t.test('check max', () => {
    let input = { value: 20 };
    let rules = { value: { type: 'number', max: 30 } };
    let errors = validator.validate(input, rules);
    assert.equal(errors, undefined);
  });

  await t.test('check max error', () => {
    let input = { value: 20 };
    let rules = { value: { type: 'number', max: 10 } };
    let errors = validator.validate(input, rules);
    assert.equal(errors[0].message, 'value must be less than 10');
  });
});


test('number', async (t) => {
  await t.test('required true work fine with undefined', () => {
    let input = {};
    let rules = { value: { type: 'number' } };
    let error = validator.validate(input, rules)[0];
    assert.deepEqual(error, { message: 'value is required', field: 'value' });
  });

  await t.test('required false work fine with undefined', () => {
    let input = {};
    let rules = { value: { type: 'number', required: false } };
    let error = validator.validate(input, rules);
    assert.deepEqual(error, undefined);
  });

  await t.test('must be a number', () => {
    let input = { value:'hello'};
    let rules = { value: { type: 'number'} };
    let error = validator.validate(input, rules)[0];
    assert.deepEqual(error, { message: 'value must be a number', field: 'value' });
  });

  await t.test('must be a number with convert', () => {
    let input = { value:'123'};
    let rules = { value: { type: 'number'} };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);
  });

  await t.test('must be a number without convert', () => {
    let input = { value:'123'};
    let rules = { value: { type: 'number'} };
    let validator = new Validator({convert: false});
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors[0].message, 'value must be a number');
  });

  await t.test('must be a number', () => {
    let input = { value:-111.11};
    let rules = { value: { type: 'number'} };
    let error = validator.validate(input, rules);
    assert.deepEqual(error,undefined);
  });

  await t.test('required true work fine with null', () => {
    let input = { value: null };
    let rules = { value: { type: 'number' } };
    let error = validator.validate(input, rules)[0];
    assert.deepEqual(error, { message: 'value is required', field: 'value' });
  });

  await t.test('required false work fine with null', () => {
    let input = { value: null };
    let rules = { value: { type: 'number', required: false } };
    let error = validator.validate(input, rules);
    assert.deepEqual(error, undefined);
  });

  await t.test('required true work fine with ``', () => {
    let input = { value: `` };
    let rules = { value: { type: 'number' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, [{ message: 'value is required', field: 'value' }]);
  });

  await t.test('required false work fine with ``', () => {
    let input = { value: `` };
    let rules = { value: { type: 'number', required: false } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);
  });

  await t.test('required true work fine with not convert ``', () => {
    let input = { value: `` };
    let rules = { value: { type: 'number' } };
    let validator = new Validator({convert: false});
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, [{ message: 'value is required', field: 'value' }]);
  });

  await t.test('required false work fine with not convert ``', () => {
    let input = { value: `` };
    let rules = { value: { type: 'number', required: false } };
    let validator = new Validator({convert: false});
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);
  });

  await t.test('check min', () => {
    let input = { value: 80.6 };
    let rules = { value: { type: 'number', min: 80.5 } };
    let errors = validator.validate(input, rules);
    assert.equal(errors, undefined);
  });

  await t.test('check min error', () => {
    let input = { value: 80.4 };
    let rules = { value: { type: 'number', min: 80.5 } };
    let errors = validator.validate(input, rules);
    assert.equal(errors[0].message, 'value must be greater than 80.5');
  });
  
  await t.test('check max', () => {
    let input = { value: 80.2 };
    let rules = { value: { type: 'number', max: 80.6 } };
    let errors = validator.validate(input, rules);
    assert.equal(errors, undefined);
  });

  await t.test('check max error', () => {
    let input = { value: 80.9 };
    let rules = { value: { type: 'number', max: 80.6 } };
    let errors = validator.validate(input, rules);
    assert.equal(errors[0].message, 'value must be less than 80.6');
  });
});



test('string', async (t) => {
  await t.test('required true with undefined', () => {
    let input = {};
    let rules = { value: { type: 'string' } };
    let error = validator.validate(input, rules)[0];
    assert.deepEqual(error, { message: 'value is required', field: 'value' });
  });

  await t.test('required false with undefined', () => {
    let input = {};
    let rules = { value: { type: 'string', required:false } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);
  });

  await t.test('required true with empty', () => {
    let input = {value:''};
    let rules = { value: { type: 'string' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors[0].message, 'value is required');
  });

  await t.test('required false with empty', () => {
    let input = {value:''};
    let rules = { value: { type: 'string', required:false } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);
  });

  await t.test('must be a string without convert', () => {
    let input = {value:1};
    let rules = { value: { type: 'string' } };
    let validator = new Validator({convert:false});
    let error = validator.validate(input, rules)[0];
    assert.deepEqual(error.message, 'value must be a string');
  });

  await t.test('check max', () => {
    let input = { value: 'hello' };
    let rules = { value: { type: 'string', max: 10 } };
    let errors = validator.validate(input, rules);
    assert.equal(errors, undefined);
  });

  await t.test('check max error', () => {
    let input = { value: 'hello' };
    let rules = { value: { type: 'string', max: 4 } };
    let errors = validator.validate(input, rules);
    assert.equal(errors[0].message, 'value length must be less than 4');
  });

  await t.test('check min', () => {
    let input = { value: 'hello' };
    let rules = { value: { type: 'string', min: 2 } };
    let errors = validator.validate(input, rules);
    assert.equal(errors, undefined);
  });

  await t.test('check min error', () => {
    let input = { value: 'hello' };
    let rules = { value: { type: 'string', min: 6 } };
    let errors = validator.validate(input, rules);
    assert.equal(errors[0].message, 'value length must be greater than 6');
  });
  
  await t.test('fails to match the /\\d+/ pattern', () => {
    let input = { value: 'hello' };
    let rules = { value: { type:'string', pattern:/\d+/ } };
    let errors = validator.validate(input, rules);
    assert.equal(errors[0].message, 'value fails to match the /\\d+/ pattern');
  });

  await t.test('success to match the /\\d+/ pattern', () => {
    let input = { value: '123' };
    let rules = { value: { type:'string', pattern:/\d+/ } };
    let errors = validator.validate(input, rules);
    assert.equal(errors, undefined);
  });

});


test('boolean', async (t) => {
  await t.test('required true with undefined', () => {
    let input = {};
    let rules = { value: { type: 'boolean' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors[0], { message: 'value is required', field: 'value' });
  });

  await t.test('works with boolean', () => {
    let input = { value: false };
    let rules = { value: { type: 'boolean' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);
  });

  await t.test('works fine with convert', () => {
    let input = { value: 1 };
    let rules = { value: { type: 'boolean' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);
    assert.deepEqual(input.value, true);
  });

  await t.test('works with integer without convert', () => {
    let input = { value: 1 };
    let rules = { value: { type: 'boolean' } };
    let validator = new Validator({convert:false});
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors[0], { message: 'value must be a boolean', field: 'value' });
  });
});


test('email', async (t) => {
  await t.test('required true with undefined', () => {
    let input = {};
    let rules = { value: { type: 'email' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors[0], { message: 'value is required', field: 'value' });
  });

  await t.test('required true with undefined', () => {
    let input = {value:''};
    let rules = { value: { type: 'email' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors[0], { message: 'value must be an email', field: 'value' });
  });

  await t.test('works with email', () => {
    let input = { value:'test.ss.ss@qq.com' };
    let rules = { value: { type: 'email' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);
  });

  await t.test('works without email', () => {
    let input = { value:'test@test' };
    let rules = { value: { type: 'email' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors[0], { message: 'value must be an email', field: 'value' });
  });
});


test('mobile', async (t) => {
  await t.test('required true with undefined', () => {
    let input = {};
    let rules = { value: { type: 'mobile' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors[0], { message: 'value is required', field: 'value' });
  });

  await t.test('works with mobile', () => {
    let input = { value:'13366668888' };
    let rules = { value: { type: 'mobile' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);

    input = { value:'+1234567890' }; // 美国/加拿大
    errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);

    input = { value:'8613800138000' }; // 中国，未加 +
    errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);

    input = { value:'+447900123456' }; // 英国
    errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);

    input = { value:'+0123456789' }; // 国家代码不能以 0 开头
    errors = validator.validate(input, rules);
    assert.deepEqual(errors[0], { message: 'value must be a mobile', field: 'value' });

    input = { value:'123456' }; // 长度不足
    errors = validator.validate(input, rules);
    console.log('errors', errors)
    assert.deepEqual(errors[0], { message: 'value must be a mobile', field: 'value' });
  });
});


test('date', async (t) => {
  await t.test('required true with undefined', () => {
    let input = {};
    let rules = { value: { type: 'date' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors[0], { message: 'value is required', field: 'value' });
  });

  await t.test('works with date', () => {
    let input = { value:'2025-04-16' };
    let rules = { value: { type: 'date' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);

    input = { value:'666677' };
    rules = { value: { type: 'date' } };
    errors = validator.validate(input, rules);
    assert.deepEqual(errors[0], { message: 'value must be a date', field: 'value' });
  });
});


test('datetime', async (t) => {
  await t.test('required true with undefined', () => {
    let input = {};
    let rules = { value: { type: 'datetime' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors[0], { message: 'value is required', field: 'value' });
  });

  await t.test('works with datetime', () => {
    let input = { value:'2025-04-16 23:12:12' };
    let rules = { value: { type: 'datetime' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);

    input = { value:'666677' };
    errors = validator.validate(input, rules);
    assert.deepEqual(errors[0], { message: 'value must be a datetime', field: 'value' });

    input = { value:'2025-13-05 14:30:45' };
    errors = validator.validate(input, rules);
    assert.deepEqual(errors[0], { message: 'value must be a datetime', field: 'value' });
  });
});


test('password', async (t) => {
  await t.test('required true with undefined', () => {
    let input = {};
    let rules = { value: { type: 'password' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors[0], { message: 'value is required', field: 'value' });
  });

  await t.test('works with password', () => {
    let input = { value:'Passw0rd!' };
    let rules = { value: { type: 'password' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors, undefined);

    input = { value:'6666566756756777' };
    errors = validator.validate(input, rules);
    assert.deepEqual(errors[0], { message: 'value must be a password', field: 'value' });
  });
});


test('translate zn_CN', async (t) => {
  const validator = new Validator({ language: 'zh_CN' });

  await t.test('required true with undefined', () => {
    let input = {};
    let rules = { value: { type: 'boolean' } };
    let errors = validator.validate(input, rules);
    assert.deepEqual(errors[0], { message: 'value是必须的', field: 'value' });
  });

  await t.test('fails to match the /\\d+/ pattern', () => {
    let input = { value: 'hello' };
    let rules = { value: { type:'string', pattern:/\d+/ } };
    let errors = validator.validate(input, rules);
    assert.equal(errors[0].message, 'value必须匹配/\\d+/');
  });

});


test('custom message', async (t) => {
  await t.test('custom message', () => {
    let input = {};
    let rules = { value: { type: 'boolean' } };
    let messages = { value: { required:'这里必需填写一个布尔值哦'}}
    let errors = validator.validate(input, rules, messages);
    assert.deepEqual(errors[0], { message: '这里必需填写一个布尔值哦', field: 'value' });
  });

  await t.test('works with integer', () => {
    let input = { name: 'lord of the sea', age:17 };
    let rules = {
      name: { type: 'string', min:2, max:10 },
      age: { type: 'integer', min:22, max:100, required:false }
    };
    let messages = {
      name: { type: `sailor's name should be a string`, max:`name's length must be less than :max` },
      age: { type: 'integer', min:`水手的年龄必须大于:min` }
    };

    let errors = validator.validate(input, rules, messages);
    assert.deepEqual(errors, [
      { message: "name's length must be less than 10", field: 'name' },
      { message: "水手的年龄必须大于22", field: 'age' }
    ]);
  });
});






