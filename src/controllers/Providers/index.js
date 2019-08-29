const boom = require('boom');
const providersRepository = require('../../repositories/providers-repository');

class ProvidersController {
  constructor(router) {
    this.router = router;
    this.router.get('/providers', this.getAllProviders);
    this.router.get('/providersByCompany', this.getProvidersByCompany);
    this.router.get('/providersByCompanyAndText', this.getProvidersByTextAndCompany);
    this.router.get('/providers/:id', this.getOneProviders);
    this.router.post('/providers', this.storeUsersType);
    this.router.put('/providers/:id', this.updateProviders);
    this.router.delete('/providers/:id', this.destroyProviders);
  }

  async getAllProviders(req, res, next) {
    try {
      const list = await providersRepository.all();
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getProvidersByCompany(req, res, next) {
    try {
      const { company } = req.query;
      const list = await providersRepository.byCompany(company);
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getProvidersByTextAndCompany(req, res, next) {
    try {
      const { company, text } = req.query;
      const list = await providersRepository.findByTextAndCompany(company, text);
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getOneProviders(req, res, next) {
    try {
      const { id } = req.params;
      const item = await providersRepository.one(id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async storeUsersType(req, res, next) {
    try {
      const { body } = req;
      const item = await providersRepository.store(body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async updateProviders(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;
      const item = await providersRepository.update(id, body);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async destroyProviders(req, res, next) {
    try {
      const { id } = req.params;
      const item = await providersRepository.destroy(id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ProvidersController;
