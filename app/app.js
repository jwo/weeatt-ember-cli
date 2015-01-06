import Ember from 'ember';
import DS from 'ember-data';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import ENV from "./config/environment";


Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

DS.RESTAdapter.reopen({
  namespace: 'api/v1',
  host: 'http://www.weeatt.com',
  headers: {
    'x-api-key': ENV.WEEATT_API_KEY,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

DS.RESTSerializer.reopen({
  normalizePayload: function(payload) {
   var normalizedRecipes = {"recipes": payload.results};
   return normalizedRecipes;
  }
});


loadInitializers(App, config.modulePrefix);


export default App;
