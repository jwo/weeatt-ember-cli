import Ember from 'ember';
import ENV from "../config/environment";

export default Ember.Controller.extend(Ember.PromiseProxyMixin, {
  queryParams: ['query'],
  query: "beef",

  watchQuery: function() {
    Ember.run.debounce(this, this.runQuery, 400);
  }.observes("query"),

  runQuery: function(){
    this.set('nextQuery', this.get('query'));
  },

  filteredRecipes: function(){
    this.set("loaded", false);
    var queryText = this.get('query');
    return this.store.find("recipe", {'qs': queryText, 'auth_token': ENV.WEEATT_AUTH_TOKEN});

  }.property("nextQuery"),


});
