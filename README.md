# struct-grpc-repro

Minimal reproduction repo for an issue where `@grpc/grps-js` is not serializing `google.protobuf.Struct` data properly.

How to run:

1. `npm i`
2. `node server.js`
3. `node client.js`

Expected ouput (I eyeballed this because the output is not being received properly):

```
{ testStruct: { fields: { testString: { stringValue: "test string" }, testSub: { fields: { testNum: { numberValue: 123 } } } } } }
```

Actual output:

```
{ testStruct: { fields: {} } }
```
