var ObjStream = require('../');
var ConcatStream = require('concat-stream');
var Stream = require('stream');

var Code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test

describe('objstream', function () {

    it('can convert an empty stream to an empty array', function (done) {

        var transform = new ObjStream();
        var source = new Stream.Readable({ objectMode: true });
        source._read = function () {
            this.push(null);
        };

        var dest = ConcatStream(function (response) {

            expect(response).to.equal('[]');
            done();
        });

        source.pipe(transform).pipe(dest);
    });

    it('can convert a single object in a stream to a single object in an array', function (done) {

        var transform = new ObjStream();
        var read = false;
        var source = new Stream.Readable({ objectMode: true });
        source._read = function () {
            if (read) {
                return this.push(null);
            }

            this.push({ test: 'object' });
            read = true;
        };

        var dest = ConcatStream(function (response) {

            expect(response).to.equal('[{"test":"object"}]');
            done();
        });

        source.pipe(transform).pipe(dest);
    });

    it('can convert multiple objects in a stream to multiple objects in an array', function (done) {

        var transform = new ObjStream();
        var count = 0;
        var source = new Stream.Readable({ objectMode: true });
        source._read = function () {
            if (count >= 3) {
                return this.push(null);
            }

            this.push({ test: 'object' });
            ++count;
        };

        var dest = ConcatStream(function (response) {

            expect(response).to.equal('[{"test":"object"},{"test":"object"},{"test":"object"}]');
            done();
        });

        source.pipe(transform).pipe(dest);
    });
});
