/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('jQuery#tiovivo', {
    setup: function() {
      this.carousel = $('#qunit-fixture').children();
    }
  });

  test('is chainable', 1, function() {
    // Not a bad test to run on collection methods.
    strictEqual(this.carousel.tiovivo(), this.carousel, 'should be chaninable');
  });

  test('has public api', 1, function() {
    strictEqual(typeof this.carousel.tiovivo().data('tiovivo').goTo, "function", '.data("tiovivo") should return the public api');
  });

  test('invoke .next() when we are at last item should go to the first item', 1, function() {

    var api = this.carousel.tiovivo().data('tiovivo');
    api.goTo('9');
    api.next();

    strictEqual(api.index, 1, 'should be 1');
  });

  test('invoke .prev() when we are at first item should go to the last item', 1, function() {

    var api = this.carousel.tiovivo().data('tiovivo');
    api.goTo('1');
    api.prev();

    strictEqual(api.index, 9, 'should be 9');
  });

  test('invoke .next() when we are at last item and then invoking .prev() should go to the last item', 1, function() {

    var api = this.carousel.tiovivo().data('tiovivo');
    api.goTo('1');
    api.prev();

    strictEqual(api.index, 9, 'should be 9');
  });

  test('adding new Panel should update panelsCount', 1, function() {

    var api = this.carousel.tiovivo().data('tiovivo');
    var original_panel_count = api.panelsCount;
    api.addPanel();

    strictEqual( api.panelsCount > original_panel_count, true, 'current panelsCount should be greater than original panelsCount');
  });

  test('removing new Panel should update panelsCount', 1, function() {

    var api = this.carousel.tiovivo().data('tiovivo');
    var original_panel_count = api.panelsCount;
    api.removePanel();

    strictEqual( api.panelsCount < original_panel_count, true, 'current panelsCount should be smaller than original panelsCount');
  });


  test('options are setted and merged correctly', 1, function() {

    var api = this.carousel.tiovivo({
      onDonutTransitionEnds : true
    }).data('tiovivo');

    strictEqual( api.options.onDonutTransitionEnds, true, 'onDonutTransitionEnds setted to true instead of original function');
  });


  test('going to panel 1 and pressing right arrow key should go to the next panel', 1, function() {

    var api = this.carousel.tiovivo().data('tiovivo');
    api.goTo(1);
    var e = $.Event("keyup");
    e.keyCode = 39;
    $(document).trigger(e);

    strictEqual( api.index , 2 , 'should be 2');
  });

  test('going to panel 2 and pressing left arrow key should go to the prev panel', 1, function() {

    var api = this.carousel.tiovivo().data('tiovivo');
    api.goTo(2);
    var e = $.Event("keyup");
    e.keyCode = 37;
    $(document).trigger(e);

    strictEqual( api.index , 1 , 'should be 1');
  });



  // module('jQuery.awesome');

  // test('is awesome', 1, function() {
  //   strictEqual($.awesome(), 'awesome', 'should be thoroughly awesome');
  // });

  // module(':awesome selector', {
  //   setup: function() {
  //     this.elems = $('#qunit-fixture').children();
  //   }
  // });

  // test('is awesome', 1, function() {
  //   // Use deepEqual & .get() when comparing jQuery objects.
  //   deepEqual(this.elems.filter(':awesome').get(), this.elems.last().get(), 'knows awesome when it sees it');
  // });

}(jQuery));
