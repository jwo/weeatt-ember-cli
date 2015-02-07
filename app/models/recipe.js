import DS from 'ember-data';

var Recipe = DS.Model.extend({
  permalink: DS.attr('string'),
  name: DS.attr('string'),
  ingredients: DS.attr('string'),
  instructions: DS.attr('string'),
  description: DS.attr('string'),
  largeImages: function(){
    return this.get("_data").images.getEach("large_image_path");
  }.property("images"),

  anyImages: function(){
    return !(this.get("largeImages").length === 0);
  }.property("largeImages"),

  missingImage: function(){
    return (this.get("largeImages").length === 0);
  }.property("anyImages"),


  imageUrl: function(){
    if (this.get('anyImages')){
      return this.get('largeImages')[0];
    } else {
      return "assets/images/missing-image.jpg";
    }
  }.property("anyImages")
});


export default Recipe;
