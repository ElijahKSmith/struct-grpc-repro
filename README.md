# struct-grpc-repro

Minimal reproduction repo for an issue where gRPC node is not serializing structs properly

How to run:

1. `npm i`
2. `node server.js`
3. `node client.js`

Expected ouput:

```
{ testStruct: { fields: { testString: { stringValue: "test string" }, testSub: { fields: { testNum: { numberValue: 123 } } } } }
```

Actual output:

```
{ testStruct: { fields: {} } }
```
