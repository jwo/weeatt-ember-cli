import Ember from 'ember';

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

    new Ember.RSVP.Promise(function(resolve){

      that.store.find("recipe", {'qs': queryText}).then(function(data){
        resolve(data);
      });

    }).then(function(data) {
      // fullfillment
      that.set("isPending", false);
      that.set("model", data);

    }, function(){
      that.set("isPending", false);
      that.set("model", Ember.A());
    });

  }

});
