
const helper = {
  // update master table
  // eslint-disable-next-line no-shadow
  insertOrUpdate: (knex, tableName, data) =>
    new Promise(resolve => {
      const firstData = data[0] ? data[0] : data;
      resolve(
        knex.raw(
          `${knex(tableName)
            .insert(data)
            .toQuery()} ON DUPLICATE KEY UPDATE ${Object.getOwnPropertyNames(
            firstData
          )
            .map(field => `${field}=VALUES(${field})`)
            .join(",")}`
        )
      );
    })
};

export default helper;
