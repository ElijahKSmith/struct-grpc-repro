# struct-grpc-repro

----

According to discussion in grpc/grpc-node#2500, this behavior is intentional and `google.protobuf.Struct` must be manually serialized/deserialized. A custom implementation is available here, to run the updated reproduction execute `npm run server:serialize` and `npm run client:serialize` instead.

----

Minimal reproduction repo for an issue where `@grpc/grps-js` is not serializing `google.protobuf.Struct` data properly.

How to run:

1. `npm i`
2. `npm run server`
3. `npm run client`

Expected ouput:

```
{ testStruct: { testString: "test string", testSub: { testNum: 123 } } }
```

Actual output:

```
{ testStruct: { fields: {} } }
```
