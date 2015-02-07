import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params){

    var that = this;

    return new Ember.RSVP.Promise(function(resolve, reject){
      that.store.find("recipe", {'permalink': params.permalink}).then(function(data){
        resolve(data.content[0]);
      });
    });
  }
});
