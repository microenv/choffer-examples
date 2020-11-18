const Choffer = require("choffer");

const service = Choffer.RestService({
  name: "todos",
  description: "CRUD service for todos",
  prefix: "/v1/todos",
  middlewares: [],
});

// service.addEndpoint({
//   name: "teste",
//   description: "teste",
//   method: "GET",
//   uri: "/teste",
//   middlewares: [],
//   async handler(req, res) {
//     const db = Choffer.Database("default");
//     const tables = await db.raw(
//       "SELECT table_name FROM information_schema.tables"
//       // "select * from knex_migrations"
//     );
//     res.json(tables);
//   },
// });

service.addEndpoint({
  name: "search",
  description: "List Todos",
  method: "GET",
  uri: "/",
  middlewares: [
    Choffer.Rest.Middlewares.KnexSearch({
      connection: "default",
      table: "todos",
      parseAfterSearch: (result) => {
        return result.map((todo) => {
          return {
            ...todo,
            done: !!todo.done,
          };
        });
      },
    }),
  ],
  // async handler(req, res) {
  //   const db = Choffer.Database("default");
  //   const todos = await db("todos").select();
  //   res.json(todos);
  // },
});

service.addEndpoint({
  name: "create",
  description: "Create a Todo",
  method: "POST",
  uri: "/",
  middlewares: [
    // Choffer.Rest.Middlewares.ValidateRequest(
    //   "body",
    //   Choffer.Joi.object({
    //     title: Choffer.Joi.string().min(3).max(30).required(),
    //   })
    // ),

    Choffer.Rest.Middlewares.KnexInsertOne({
      connection: "default",
      table: "todos",
      schema: Choffer.Joi.object({
        title: Choffer.Joi.string().min(3).max(30).required(),
      }),
      parseBeforeInsert: function (body) {
        body.done = false;
        return body;
      },
    }),
  ],
});

service.addEndpoint({
  name: "update-done",
  description: "Update todo.done",
  method: "PUT",
  uri: "/:todoId",
  middlewares: [
    Choffer.Rest.Middlewares.KnexUpdate({
      connection: "default",
      table: "todos",
      schema: Choffer.Joi.object({
        title: Choffer.Joi.string().min(3).max(30),
        done: Choffer.Joi.boolean(),
      }),
      // whereIdValue: "params.todoId",
      where: (req, query) => {
        query.where("id", "=", req.params.todoId);
      },
    }),
  ],
  // async handler(req, res) {
  //   const collection = Choffer.Database(dbName).collection(dbCollection);

  //   const where = { _id: ObjectId(req.params.id) };
  //   const updateDoc = { $set: { done: req.body.done } };
  //   const result = await collection.updateOne(where, updateDoc);

  //   if (!result || !result.modifiedCount) {
  //     throw new UnknownError(
  //       "Could not insert todo because of a unknown error!"
  //     );
  //   }

  //   res.json({
  //     modifiedCount: result.modifiedCount,
  //   });
  // },
});

service.addEndpoint({
  name: "delete",
  description: "Delete a Todo",
  method: "DELETE",
  uri: "/:id",
  middlewares: [
    Choffer.Rest.Middlewares.ValidateRequest(
      "params",
      Choffer.Joi.object({
        id: Choffer.Joi.alternatives([
          Choffer.Joi.string(),
          Choffer.Joi.number(),
        ]).required(),
      })
    ),
    Choffer.Rest.Middlewares.KnexDelete({
      connection: "default",
      table: "todos",
      where: (req, query) => {
        query.where("id", "=", req.params.id);
      },
    }),
  ],
  // async handler(req, res) {
  //   const collection = Choffer.Database(dbName).collection(dbCollection);

  //   const where = { _id: ObjectId(req.params.id) };
  //   const result = await collection.deleteOne(where);

  //   if (!result || !result.deletedCount) {
  //     throw new NotFoundError("Todo not found");
  //   }

  //   res.json({
  //     deletedCount: result.deletedCount,
  //   });
  // },
});

module.exports = service;
