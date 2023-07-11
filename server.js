const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = __dirname + "/test.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const test_proto = grpc.loadPackageDefinition(packageDefinition).testproto;

function testMethod(call, callback) {
  const response = {
    testStruct: {
      testString: "test string",
      testSub: {
        testNum: 123,
      },
    },
  };
  callback(null, response);
}

function main() {
  var server = new grpc.Server();
  server.addService(test_proto.TestService.service, { testMethod: testMethod });
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    },
  );
}

main();
