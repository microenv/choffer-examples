const Choffer = require("choffer");
const knexfile = require("./knexfile");

Choffer.RegisterDatabase({
  name: "default",
  driver: "knex",
  migrations: {
    folder: "migrations",
    autorun: true,
  },
  connection: require("knex")(knexfile.development),
});

Choffer.StartRestGateway({
  config: {
    port: process.env.PORT || 8080,
  },
  middlewares: [
    // Choffer.Rest.Middlewares.ValidateHeader({
    //   name: "client_id",
    //   schema: Choffer.Joi.string().alphanum().equal("abcde"),
    //   errorMessage: "Invalid client ID",
    // }),
  ],
  services: [
    // require("choffer/docs"),
    require("./services/todos"),
    require("./services/foaas"),
  ],
});
