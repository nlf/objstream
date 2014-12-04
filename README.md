ObjStream is a simple transform stream used to convert a readable objectMode stream into a regular stream.

It achieves this by calling `JSON.stringify` on each object in the original stream, and wrapping the result in `[]` characters with a comma separating each object, effectively turning your readable objectMode stream into a JSON array.
