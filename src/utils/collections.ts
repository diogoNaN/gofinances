const data = {
  prefix: "@",
  app_name: "gofinances",
  separator: ":",
};

const mainPrefix = data.prefix + data.app_name + data.separator;

export const collections = {
  prefix: data.prefix + data.app_name + data.separator,
  keys: {
    userKey: mainPrefix + "user",
  }
};
