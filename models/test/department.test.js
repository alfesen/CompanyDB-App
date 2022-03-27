const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
  it('should throw an error if no "name" is provided', () => {

    const dep = new Department({});

    dep.validate(err => {
      expect(err.errors.name).to.exist;
    })

  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []    ];
    for (let name of cases) {
      const dep = new Department({
        name
      });
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      })
    }
    after(() => {
      mongoose.models = {};
    });
  });
  it('should throw an error if "name" is too long or too short', () => {
    const cases = ['Lorm', 'Lor', 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit'];
    for (let name of cases) {
      const dep = new Department({
        name
      });
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      })
    }
  });

  it('should return "name" if "name" is correct', () => {
    const cases = ['Lorem Ipsum', 'Pater Noster', 'Baptiso ego sum'];

    for (let name of cases) {
      const dep = new Department({
        name
      });

      dep.validate(err => {
        expect(err).to.not.exist;
      })
    }
  })
})