const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  it('should throw error if no args', () => {
    const emp = new Employee({});

    emp.validate(err => {
      expect(err.errors).to.exist;
    });
  });
  it('should throw error if there is no "firstName", "lastName" or "department"', () => {
    const cases = [ { firstName: 'John', lastName: 'Doe '}, { firstName: 'Joe'}, { firstName: 'Amanda', department: 'IT'}, { lastName: 'lastName', department: 'IT'}];

    for (let data of cases) {
      const emp = new Employee({ data });
      
      emp.validate(err => {
        expect(err.errors).to.exist;
      });
    };
  });

  it('should throw and error if any of args is not a string', () => {
    const cases = [ { firstName: {}, lastName: 'Doe', department: 'IT'}, { firstName: 'John', lastName: [], department: 'Evangelism'}, { firstName: 'Matthew', lastName: 'Doe', department: undefined } ];

    for (let data of cases) {
      const emp = new Employee({ data });

      emp.validate(err => {
        expect(err.errors).to.exist;
      });
    };
  });

  it('should return Employee if correct values', () => {
      
      const emp = new Employee( { firstName: 'John Doe', lastName: 'Doe', department: 'IT' } );

      emp.validate(err => {
        expect(err).to.not.exist;
      })
    
  });
});