/*
 * jquery.tiovivo
 * https://github.com/vieron/jquery.tiovivo
 *
 * Copyright (c) 2012 vieron
 * Licensed under the MIT, GPL licenses.
 */

(function($, window, document, undefined) {

  // Collection method.
  $.fn.tiovivo = function() {
    return this.each(function() {
      $(this).html('tiovivo');
    });
  };

  // Static method.
  $.tiovivo = function() {
    return 'tiovivo';
  };

  // Custom selector.
  $.expr[':'].tiovivo = function(elem) {
    return elem.textContent.indexOf('tiovivo') >= 0;
  };

}(jQuery, window, document));


;(function($, window, document, undefined){

  var defaults = {
    panelMargin : 20
  },
  transformProp = Modernizr.prefixed('transform');

  function Tiovivo(element, options){
    this.options = $.extend(defaults, options);

    this.element = $(element);
    this.donut = this.element.find('> ul');
    this.panels = this.donut.find('> li');
    this.panelsCount = this.panels.length;
    this.panelsAngle = 360/this.panelsCount;
    this.panelSize = this.panels.width()+this.options.panelMargin;
    this.tz = Math.round( ( this.panelSize / 2 ) / Math.tan( Math.PI / this.panelsCount ) );
    this.theta = 0;
    this.thetas = 0;
    this.index = 1; //in human format
    this.round = 0;

    this.init();
  }

  var fn = Tiovivo.prototype;

  fn.init = function(){
    // this.element.on('click', '.sc_wrap', $.proxy(this.onCheck, this))
    this.distributePanes();
  };

  fn.distributePanes = function(){
    var self = this;
    this.panels.each(function(i){
      $(this).css(transformProp, 'rotateY(' + (i*self.panelsAngle) + 'deg) translateZ('+self.tz+'px) scale(1)');
    });
  };


  fn.navHandler = function(n){
    this.index = n;
    if (n <= 0 ) { this.index = this.panelsCount; }
    else if (n > this.panelsCount ) { this.index = 1; }
    return this.index;
  };

  fn.unActivePanel = function(n){
    this.panels.eq(n)
      .css(transformProp, 'rotateY(' + (this.panelsAngle*n) + 'deg) translateZ('+this.tz+'px) scale(1)' )
      .removeClass('active');
  };

  fn.activePanel = function(n){
    this.panels.eq(n)
      .css(transformProp, 'rotateY(' + (this.panelsAngle*n) + 'deg) translateZ('+(this.tz+100)+'px) scale(1.2)')
      .addClass('active');
  };

  fn.roundsFromAngle = function(angle){
    angle = Math.abs(angle);
    var round = Math.floor(angle/360);
    return round;
  };

  fn.next = function(){
    this.goTo( this.index+1 );
  };

  fn.prev = function(){
    this.goTo( this.index-1 );
  };

  fn.goTo = function(index){

    var prev_round, angle_variation, next_angle, next_round,
        mi = index-1, //human index to machine index
        diff = index-this.index;

    this.unActivePanel(this.index-1);
    index = this.navHandler(index); // manage this.index
    mi = index-1;

    prev_round = this.round;
    angle_variation = diff*this.panelsAngle;
    next_angle = this.theta-angle_variation;
    next_round = this.roundsFromAngle(next_angle);

    this.round = next_round;
    this.theta = next_angle;

    this.donut.css(transformProp, 'rotateY(' + this.theta + 'deg)');

    this.activePanel(mi);

  };

  //jQuery adapter
  $.fn.tiovivo = function(options){
   return this.each(function() {
     if (!$(this).data('tiovivo')) {
       $(this).data('tiovivo', new Tiovivo( this, options ));
     }
   });
  };


}(jQuery, window, document));
