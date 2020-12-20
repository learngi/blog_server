require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  // eslint-disable-next-line global-require
  const fs = require("fs");
  const dotenv = require("dotenv");
  const envConfig = dotenv.parse(fs.readFileSync(".env"));
  // eslint-disable-next-line guard-for-in
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

const config = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  token: "vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy"
};

export const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:
      process.env.NODE_ENV === "test"
        ? process.env.TEST_DB_NAME
        : process.env.DB_NAME,
    charset: "utf8"
  }
});


export const tables = {
  BLOG: "blog_add",
  COMMENTS: "comments",

};



export default config;
