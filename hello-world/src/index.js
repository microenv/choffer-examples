const Choffer = require("Choffer");
const hello = require("./hello");

Choffer.StartRestGateway({
  config: {
    name: "Hello World",
    port: 8080,
  },
  middlewares: [],
  services: [hello],
});
