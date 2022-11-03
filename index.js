#!/usr/bin/env node

const Field = require('./lib/module.js');
console.clear();
const field = new Field();
field.generateField(3,3);
field.start();