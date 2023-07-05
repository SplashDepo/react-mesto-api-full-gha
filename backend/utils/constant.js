const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const ID_REGEX = /^[0-9a-fA-F]{24}$/;
const { NODE_ENV } = process.env;
const { SECRET_SIGNING_KEY } = process.env;
export {
  URL_REGEX,
  ID_REGEX,
  NODE_ENV,
  SECRET_SIGNING_KEY,
};
