# struct-grpc-repro

Minimal reproduction repo for an issue where `@grpc/grps-js` is not serializing `google.protobuf.Struct` data properly.

How to run:

1. `npm i`
2. `node server.js`
3. `node client.js`

Expected ouput:

```
{ testStruct: { testString: "test string", testSub: { testNum: 123 } } }
```

Actual output:

```
{ testStruct: { fields: {} } }
```
