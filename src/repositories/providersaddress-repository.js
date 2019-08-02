const { ProvidersAddress } = require('../database/models');

const all = async (provider) => {
  const list = await ProvidersAddress.findAll({ where: { providersId: provider } });
  return list;
};

const one = async (provider, id) => {
  const item = await ProvidersAddress.findOne({ where: { id, providersId: provider } });
  return item;
};

const store = async (provider, address) => {
  const item = await ProvidersAddress.create({
    first_line: address.first_line,
    second_line: address.second_line,
    city: address.city,
    state: address.state,
    country: address.country,
    postal_code: address.postal_code,
    default: address.default,
    status: true,
    providersId: provider,
  });
  return item;
};

const update = async (provider, id, address) => {
  let item = await ProvidersAddress.update({
    first_line: address.first_line,
    second_line: address.second_line,
    city: address.city,
    state: address.state,
    country: address.country,
    postal_code: address.postal_code,
    default: address.default,
    status: address.status,
  }, { where: { id, providersId: provider } });

  if (item[0] === 1) {
    item = await ProvidersAddress.findOne({ where: { id } });
  } else {
    item = null;
  }
  return item;
};

const destroy = async (provider, id) => {
  let item = await ProvidersAddress.findOne({ where: { id, providersId: provider } });
  if (item) {
    await ProvidersAddress.destroy({ where: { id } });
  } else {
    item = null;
  }
  return item;
};

module.exports = {
  all,
  one,
  store,
  update,
  destroy,
};
