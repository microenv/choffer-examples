// http://knexjs.org/#Migrations

module.exports = {
  // You should not change this "development" key name
  // For setting up your environments, please refer to knexjs docs
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: 8081,
      user: "user",
      password: "password",
      database: "db",
    },
  },
};
