const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  suite('Function convertHandler.getNum(input)', function() {
    test('Whole number Input', function(done) {
      let input = '32L'
      assert.equal(convertHandler.getNum(input), 32)
      done()
    })
    test('Decimal Input', function(done) {
      let input = '32.2L'
      assert.equal(convertHandler.getNum(input), 32.2)
      done()
    })
    test('Fractional Input', function(done) {
      let input = '1/32L'
      assert.equal(convertHandler.getNum(input), 1/32)
      done()
    })
    test('Fractional Input with a decimal value', function(done) {
      let input = '1.2/32L'
      assert.equal(convertHandler.getNum(input), 1.2/32)
      done()
    })
    test('Invalid Input (double fraction)', function(done) {
      let input = '1/2/32L'
      assert.equal(convertHandler.getNum(input), undefined)
      done()
    })
    test('No numerical Input', function(done) {
      let input = 'L'
      assert.equal(convertHandler.getNum(input), 1)
      done()
    })
  })

  suite('Function convertHandler.getUnit(input)', function () {
    test('For Each Valid Unit Inputs', function(done) {
      let input = [
        'gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'
      ]
      let output = [
        'gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'L', 'mi', 'km', 'lbs', 'kg'
      ]
      input.forEach(function(elem, i) {
        assert.equal(convertHandler.getUnit(elem), output[i])
      })
      done()
    })
    test('Unknown Unit Input', function(done) {
      assert.equal(convertHandler.getUnit('34kilograms'), undefined)
      done()
    })
  })

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']
      let expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs']
      input.forEach(function(elem, i) {
        assert.equal(convertHandler.getReturnUnit(elem), expect[i])
      })
      done()
    })
  })

  suite('Function convertHandler.spellOutUnit(unit)', function() {
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']
      let expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms']
      input.forEach(function(elem, i) {
        assert.equal(convertHandler.spellOutUnit(elem), expect[i])
      })
      done()
    })
  })

  suite('Function convertHandler.convert(num, unit)', function() {
    test('Gal to L', function(done) {
      let input = [5, 'gal']
      let expected = 18.9271
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      )
      done()
    })
    test('L to gal', function(done) {
      let input = [5, 'L']
      let expected = 1.32086
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      )
      done()
    })
    test('Mi to km', function(done) {
      let input = [5, 'mi']
      let expected = 8.0467
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      )
      done()
    })
    test('Km to mi', function(done) {
      let input = [5, 'km']
      let expected = 3.10686
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      )
      done()
    })
    test('Lbs to kg', function(done) {
      let input = [5, 'lbs']
      let expected = 2.26796
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      )
      done()
    })
    test('Kgs to lbs', function(done) {
      let input = [5, 'kg']
      let expected = 11.02312
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      )
      done()
    })
  })


});