const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies)

const expect  = chai.expect;

const Cursor = require("../class/cursor.js");
const Screen = require("../class/screen.js");

describe ('Cursor', function () {

  let cursor;

  beforeEach(function() {
    cursor = new Cursor(3, 3);
  });

  it('initializes for a 3x3 grid', function () {
    expect(cursor.row).to.equal(0);
    expect(cursor.col).to.equal(0);
  });

  context('Ensure that the cursor position and background colors are set', function () {

    it('correctly processes down inputs', function () {

      cursor.down();
      expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);

      cursor.down();
      expect([cursor.row, cursor.col]).to.deep.equal([2, 0]);

      cursor.down();
      expect([cursor.row, cursor.col]).to.deep.equal([2, 0]);

    });

    it('should call cursor.resetBackgroundColor for down inputs', function () {
      const rbcSpy = chai.spy.on(cursor, 'resetBackgroundColor');

      cursor.down();

      expect(rbcSpy).to.have.been.called.once;
    });

    it('should call cursor.setBackgroundColor for down inputs', function () {
      const sbcSpy = chai.spy.on(cursor, 'setBackgroundColor');

      cursor.down();

      expect(sbcSpy).to.have.been.called.once;
    });

    it('correctly processes up inputs', function () {

      cursor.up();
      expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

      cursor.down();
      expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);

      cursor.up();
      expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
    });

    it('should call cursor.resetBackgroundColor for up inputs', function () {
      const rbcSpy = chai.spy.on(cursor, 'resetBackgroundColor');

      cursor.down();
      cursor.up();

      expect(rbcSpy).to.have.been.called;
    });

    it('should call cursor.setBackgroundColor for up inputs', function () {
      const sbcSpy = chai.spy.on(cursor, 'setBackgroundColor');

      cursor.down();
      cursor.up();

      expect(sbcSpy).to.have.been.called;
    });

    it('processes right inputs', function () {

      cursor.right();
      expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

      cursor.right();
      expect([cursor.row, cursor.col]).to.deep.equal([0, 2]);

      cursor.right();
      expect([cursor.row, cursor.col]).to.deep.equal([0, 2]);
    });

    it('should call cursor.resetBackgroundColor for right inputs', function () {
      const rbcSpy = chai.spy.on(cursor, 'resetBackgroundColor');

      cursor.right();

      expect(rbcSpy).to.have.been.called;
    });

    it('should call cursor.setBackgroundColor for right inputs', function () {
      const sbcSpy = chai.spy.on(cursor, 'setBackgroundColor');

      cursor.right();

      expect(sbcSpy).to.have.been.called;
    });

    it('processes left inputs', function () {

      cursor.left();
      expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

      cursor.right();
      expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

      cursor.left();
      expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
    });

    it('should call cursor.resetBackgroundColor for left inputs', function () {
      const rbcSpy = chai.spy.on(cursor, 'resetBackgroundColor');

      cursor.right();
      cursor.left();

      expect(rbcSpy).to.have.been.called;
    });

    it('should call cursor.setBackgroundColor for left inputs', function () {
      const sbcSpy = chai.spy.on(cursor, 'setBackgroundColor');

      cursor.right();
      cursor.left();

      expect(sbcSpy).to.have.been.called;
    });

  });

});
