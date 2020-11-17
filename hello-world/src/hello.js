const Choffer = require("Choffer");

const hello = Choffer.RestService({
  name: "hello",
  description: "Hello Service",
  prefix: "/",
  middlewares: [],
});

hello.addEndpoint({
  name: "Home",
  method: "GET",
  uri: "/",
  description: "Display a hello world message",
  middlewares: [],
  handler(req, res) {
    res.json({
      Hello: req.query.name || "World!",
    });
  },
});

module.exports = hello;
