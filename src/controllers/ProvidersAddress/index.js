const boom = require('boom');
const providersAddressRepository = require('../../repositories/providersaddress-repository');

class ProvidersAddressController {
  constructor(router) {
    this.router = router;
    this.router.get('/providers/:provider/address', this.getAllProvidersAddress);
    this.router.get('/providers/:provider/address/:id', this.getOneProvidersAddress);
    this.router.post('/providers/:provider/address', this.storeProvidersAddress);
    this.router.put('/providers/:provider/address/:id', this.updateProvidersAddress);
    this.router.delete('/providers/:provider/address/:id', this.destroyProvidersAddress);
  }

  async getAllProvidersAddress(req, res, next) {
    try {
      const { provider } = req.params;
      const list = await providersAddressRepository.all(provider);
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getOneProvidersAddress(req, res, next) {
    try {
      const { provider, id } = req.params;
      const item = await providersAddressRepository.one(provider, id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async storeProvidersAddress(req, res, next) {
    try {
      const { provider } = req.params;
      const { body } = req;
      const item = await providersAddressRepository.store(provider, body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async updateProvidersAddress(req, res, next) {
    try {
      const { id, provider } = req.params;
      const { body } = req;
      const item = await providersAddressRepository.update(provider, id, body);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async destroyProvidersAddress(req, res, next) {
    try {
      const { id, provider } = req.params;
      const item = await providersAddressRepository.destroy(provider, id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ProvidersAddressController;
