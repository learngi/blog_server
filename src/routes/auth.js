import { knex, tables } from "../config";
import helper from "../helper";

const AuthRoutes = [
  {
    method: "POST",
    path: "/addBlog",
    config: {
      auth: {
        mode: "optional",
      },
    },
    handler: async (request) => {
      let reply = null;
      // eslint-disable-next-line prefer-destructuring
      const blog = request.payload;
      console.log("em", request.payload);
      await helper
        .insertOrUpdate(knex, tables.BLOG, blog)
        .then((res) => {
          if (!res) {
            reply = {
              success: false,
            };
          } else {
            reply = {
              success: true,
            };
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
      return reply;
    },
  },

  {
    path: "/blogList",
    method: "GET",
    config: {
      auth: {
        mode: "optional",
      },
    },
    handler: async () => {
      let reply = null;
      await knex.raw(`SELECT * from blog_add`).then(([res]) => {
        if (res.length > 0) {
          reply = {
            success: true,
            data: res,
          };
        } else {
          reply = {
            success: false,
          };
        }
      });

      return reply;
    },
  },

  {
    path: "/comments/{id}",
    method: "GET",
    config: {
      auth: {
        mode: "optional",
      },
    },
    handler: async (request) => {
      let reply = null;
      let id = request.params.id;
      console.log('id',id)
      await knex
        .raw(`SELECT * from comments where blog_id = '${id}'`)
        .then(([res]) => {
          if (res.length > 0) {
            reply = {
              success: true,
              data: res,
            };
          } else {
            reply = {
              success: false,
            };
          }
        });

      return reply;
    },
  },

  {
    method: "POST",
    path: "/comments",
    config: {
      auth: {
        mode: "optional",
      },
    },
    handler: async (request) => {
      let reply = null;
      // eslint-disable-next-line prefer-destructuring
      const blog = request.payload;
      console.log("em", request.payload);
      await helper
        .insertOrUpdate(knex, tables.COMMENTS, blog)
        .then((res) => {
          if (!res) {
            reply = {
              success: false,
            };
          } else {
            reply = {
              success: true,
            };
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
      return reply;
    },
  },
];

export default AuthRoutes;
