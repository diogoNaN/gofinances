const data = {
  prefix: "@",
  app_name: "gofinances",
  separator: ":",
};

const mainPrefix = data.prefix + data.app_name + data.separator;

export const collections = {
  userKey: mainPrefix + "user",
  transactionsKey: mainPrefix + "transactions",
};
