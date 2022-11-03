// import assert here
const assert = require('assert');
const Field = require('../lib/module');

describe('field', ()=>{
  
  const field = new Field();

  it('has a hat property', ()=>{
    assert.strictEqual(field.hat, '^');
  });

  it('has a hole property', ()=>{
    assert.strictEqual(field.hole, 'O');
  });

});
