import { expect } from 'chai';
import { userData } from '../src/data/sampleUserData.js';
import User from '../src/classes/User.js';

describe('User', () => {
  let user1;
  // let user2;

  beforeEach( () => {
    user1 = new User();
    // user2 = new User(userData);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(user1).to.be.an.instanceOf(User)
  });

  it('should have a name', () => {
    expect(user1.name).to.equal(`Saige O'Kon`);
  });

  it.skip('should have an id', () => {
    expect(user1.id).to.equal(1);
  });

  it.skip('should have a pantry of ingredients', () => {

    expect(user1.pantry).to.deep.equal();
  });


});

/*
name
id
pantry
*/