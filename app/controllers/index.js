import Ember from 'ember';
import ENV from "../config/environment";

export default Ember.Controller.extend({
  queryParams: ['query'],

  watchQuery: function() {
    Em.run.debounce(this, this.runQuery, 400);
  }.observes("query"),

  runQuery: function(){
    this.set('nextQuery', this.get('query'));
  },

  filteredRecipes: function(){
    var queryText = this.get('query');
    return this.store.find("recipe", {'qs': queryText, 'auth_token': ENV.WEEATT_AUTH_TOKEN});
  }.property("nextQuery")
});
