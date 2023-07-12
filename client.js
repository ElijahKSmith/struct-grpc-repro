const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const minimist = require("minimist");
const deserializer = require("./deserializer");

const ARGS = minimist(process.argv.slice(2));
const PROTO_PATH = __dirname + "/test.proto";
const USE_DESERIALIZER = ARGS?.serializer ?? false;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const test_proto = grpc.loadPackageDefinition(packageDefinition).testproto;

function main() {
  const client = new test_proto.TestService(
    "localhost:50051",
    grpc.credentials.createInsecure(),
  );

  client.testMethod({}, function (err, response) {
    let deserialized = response.testStruct;
    if (USE_DESERIALIZER) {
      deserialized = deserializer.getJsonFromStruct(response.testStruct);
    }

    console.log(JSON.stringify({testStruct: deserialized}));
  });
}

main();
