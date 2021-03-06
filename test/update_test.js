const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let user;
  beforeEach(done => {
    user = new User({ name: 'Joe', likes: 0 });
    user.save()
      .then(() => done());
  });
  
  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then(foundUsers => {
        assert(foundUsers.length === 1);
        assert(foundUsers[0].name === 'Alex');
        done();
      });
  }

  it('a model instance can set and save', done => {
    user.set('name', 'Alex');
    assertName(user.save(), done);
  });

  it('a model instance can update', done => {
    assertName(user.update({ name: 'Alex' }), done);
  });

  it('a model class can update', done => {
    assertName(
      User.update({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });
  
  it('a model class can update one record', done => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex'}),
      done
    );
  });

  it('a model class can find a record with an id and update', done => {
    assertName(
      User.findByIdAndUpdate(user._id, { name: 'Alex'}),
      done
    );
  });

  it('a user can have their likes count incremented by 1', done => {
    User.update({ name: 'Joe' }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(foundUser => {
        assert(foundUser.likes === 1);
        done();
      });
  });
});