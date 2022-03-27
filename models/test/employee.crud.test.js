const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { UseNewUrlParser: true, useUnifiedTopology: true });
    }
    catch (err) {
      console.log(err);
    }
  });

  describe('Reading data', () => {

    before(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      await testEmpOne.save()
      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'Marketing' });
      await testEmpTwo.save();
      const testEmpThree = new Employee({ firstName: 'Mitchell', lastName: 'Doe', department: 'Testing' });
      await testEmpThree.save();
    });

    
    it('should return all the data with find method', async () => {
      const emp = await Employee.find({});
      const expectedLength = 3;
      expect(emp.length).to.be.equal(expectedLength);
    })
    
    after(async () => {
      await Employee.deleteMany();
    })
  
    it('should return proper document by various params with findOne method', async () => {
      const emp = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      const expectedFirstName = 'John';
      const expectedLastName = 'Doe';
      const expectedDepartment = 'IT';
      expect(emp.firstName).to.be.equal(expectedFirstName);
      expect(emp.lastName).to.be.equal(expectedLastName);
      expect(emp.department).to.be.equal(expectedDepartment);
    });

  });

  describe('Creating data', () => {

    it('should insert new document with insertOne method', async () => {
      const emp = new Employee({ firstName: 'John', lastName: 'the Baptist', department: 'Evangelism'})
      await emp.save();

      expect(emp.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
    
  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      await testEmpOne.save()
      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'Marketing' });
      await testEmpTwo.save();
      const testEmpThree = new Employee({ firstName: 'Mitchell', lastName: 'Doe', department: 'Testing' });
      await testEmpThree.save();
    });

    it('should properly update one document with updateOne method', async () => {
      await Employee.updateOne({ firstName: 'John'}, { $set: { department: 'Preaching'} });
      const emp = await Employee.findOne({department: 'Preaching'});
      expect(emp).to.not.be.null;
    });

    if('should properly update one document with save method', async () => {
      const emp = await Employee.findOne({ firstName: 'John' });
      emp.department = 'Preaching';
      await Employee.save();

      const updatedEmp = await Employee.findOne({ department: 'Preaching'});
      expect(emp).to.not.be.null;
    });

    it('should properly update multiple documents with updateMany method', async () => {
      await Employee.updateMany({}, { $set: { department: 'Preaching' } });

      const emps = await Employee.find({ department: 'Preaching'});
      const expectedLength = 3;

      expect(emps.length).to.be.equal(expectedLength);
    })

    afterEach(async () => {
      await Employee.deleteMany();
    });

  });

  describe('Removind data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      await testEmpOne.save()
      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'Marketing' });
      await testEmpTwo.save();
      const testEmpThree = new Employee({ firstName: 'Mitchell', lastName: 'Doe', department: 'Testing' });
      await testEmpThree.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly remove one document with deleteOne method', async () => {
      await Employee.deleteOne({ firstName: 'John' });
      const emp = await Employee.findOne({ firstName: 'John' });

      expect(emp).to.be.null;
    });

    it('should properly remove one document with remove method', async () => {
      const emp = await Employee.findOne({ firstName: 'Amanda'});
      await emp.remove()

      const removedEmp = await Employee.findOne({ firstName: 'Amanda'});
      expect(removedEmp).to.be.null;
    });

    it('should properly remove multiple documents with deleteMany method', async() => {
      const emps = await Employee.deleteMany();
      const removedEmps = await Employee.find({});
      expect(removedEmps.length).to.be.equal(0);
    });

  });

});