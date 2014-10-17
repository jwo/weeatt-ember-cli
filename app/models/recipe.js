import DS from 'ember-data';

var Recipe = DS.Model.extend({
  permalink: DS.attr('string'),
  name: DS.attr('string'),
  ingredients: DS.attr('string'),
  instructions: DS.attr('string'),
  description: DS.attr('string')
});


export default Recipe;
