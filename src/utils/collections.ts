const data = {
  prefix: "@",
  app_name: "gofinances",
  separator: ":",
};

const mainPrefix = data.prefix + data.app_name + data.separator;

export const collections = {
  transactionsKey: mainPrefix + "transactions",
};
