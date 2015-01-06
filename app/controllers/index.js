import Ember from 'ember';
import ENV from "../config/environment";

export default Ember.Controller.extend(Ember.PromiseProxyMixin, {
  queryParams: ['query'],
  query: "",
  isPending: false,

  hasQuery: function() {
    return (this.get("query").length > 0);
  }.property("query"),

  watchQuery: function() {
    this.set("isPending", true);
    this.set("model", Ember.A());
    Ember.run.debounce(this, this.runQuery, 400);
  }.observes("query"),

  runQuery: function(){

    var queryText = this.get('query');
    var that = this;
    that.set("isPending", true);

    new Ember.RSVP.Promise(function(resolve, reject){

      that.store.find("recipe", {'qs': queryText, 'auth_token': ENV.WEEATT_AUTH_TOKEN}).then(function(data){
        resolve(data);
      });

    }).then(function(data) {
      // fullfillment
      that.set("isPending", false);
      that.set("model", data);

    }, function(reason){
      that.set("isPending", false);
      that.set("model", Ember.A());
    });

  }

});
