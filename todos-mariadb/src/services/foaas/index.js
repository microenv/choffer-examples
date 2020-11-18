const Choffer = require("choffer");

const service = Choffer.HttpProxyService({
  name: "foaas",
  prefix: "/v1/foaas",
  destination: "https://foaas.com/",
  middlewares: [],
  axiosConfig: {
    headers: {
      Accept: "*/*",
    },
  },
});

module.exports = service;
