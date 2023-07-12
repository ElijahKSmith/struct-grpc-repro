const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const minimist = require("minimist");
const serializer = require("./serializer");

const ARGS = minimist(process.argv.slice(2));
const PROTO_PATH = __dirname + "/test.proto";
const USE_SERIALIZER = ARGS?.serializer ?? false;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const test_proto = grpc.loadPackageDefinition(packageDefinition).testproto;

function testMethod(call, callback) {
  const testStruct = {
    testString: "test string",
    testSub: {
      testNum: 123,
      testBool: false,
      testSubSub: {
        testList: [1,2,3],
        testNull: null,
        testSubSubEmpty: {},
      },
    },
  };

  let serialized = testStruct;
  if (USE_SERIALIZER) {
    serialized = serializer.getStructFromJson(testStruct);
  }

  callback(null, {testStruct: serialized});
}

  
function main() {
  const server = new grpc.Server();

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
