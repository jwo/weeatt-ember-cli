import Ember from 'ember';
import ENV from "../config/environment";

var IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find("recipe", {'qs': 'beef', 'auth_token': ENV.WEEATT_AUTH_TOKEN});
  }
});

export default IndexRoute;
