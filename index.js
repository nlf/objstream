var Stream = require('stream');
var Util = require('util');

function ObjStream() {

    this._started = false;
    Stream.Transform.call(this, { objectMode: true });
    this._readableState.objectMode = false;
    this._readableState.encoding = 'utf8';
}

Util.inherits(ObjStream, Stream.Transform);

ObjStream.prototype._transform = function (chunk, encoding, next) {

    if (!this._started) {
        this.push('[');
        this._started = true;
    }
    else {
        this.push(',');
    }

    this.push(JSON.stringify(chunk));
    next();
};

ObjStream.prototype._flush = function (next) {

    if (!this._started) {
        this.push('[');
    }

    this.push(']');
    next();
};

module.exports = ObjStream;
