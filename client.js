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

function main() {
  var client = new test_proto.TestService(
    "localhost:50051",
    grpc.credentials.createInsecure(),
  );

  client.testMethod({}, function (err, response) {
    console.log(response);
  });
}

main();
