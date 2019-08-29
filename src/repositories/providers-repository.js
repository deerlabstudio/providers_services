const { Op } = require('sequelize');
const { Providers, ProvidersAddress } = require('../database/models');

const all = async () => {
  const list = await Providers.findAll();
  return list;
};

const byCompany = async (company) => {
  const list = await Providers.findAll({
    where: {
      company,
    },
  });
  return list;
};

const findByTextAndCompany = async (company, text) => {
  const list = await Providers.findAll({
    where: {
      company,
      name: { [Op.like]: `%${text}%` },
    },
  });
  return list;
};

const one = async (id) => {
  const item = await Providers.findOne({ where: { id }, include: [ProvidersAddress] });
  return item;
};

const store = async (provider) => {
  const item = await Providers.create({
    name: provider.name,
    contact: provider.contact,
    email: provider.email,
    phone: provider.phone,
    webpage: provider.webpage,
    principal_phone: provider.principal_phone,
    contact_phone: provider.contact_phone,
    company: provider.company,
    status: true,
  });
  return item;
};

const update = async (id, provider) => {
  let item = await Providers.update({
    name: provider.name,
    contact: provider.contact,
    email: provider.email,
    phone: provider.phone,
    webpage: provider.webpage,
    principal_phone: provider.principal_phone,
    contact_phone: provider.contact_phone,
    company: provider.company,
    status: provider.status,
  }, { where: { id } });

  if (item[0] === 1) {
    item = await Providers.findOne({ where: { id } });
  } else {
    item = null;
  }
  return item;
};

const destroy = async (id) => {
  let item = await Providers.findOne({ where: { id } });
  if (item) {
    await Providers.destroy({ where: { id } });
  } else {
    item = null;
  }
  return item;
};

module.exports = {
  all,
  byCompany,
  findByTextAndCompany,
  one,
  store,
  update,
  destroy,
};
