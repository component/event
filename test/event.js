var $ = require('event');

describe('event(el)', function() {
  var click, $el;

  beforeEach(function() {
    el = document.createElement('div');
    $el = $(el);
    click = function() {
      var evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      el.dispatchEvent(evt);
    };
  });

  it('should bind event', function(done) {
    $el.on('click', function() {
      done();
    });
    click();
  });

  it('should unbind event', function() {
    var n = 0;
    var count = function() {
      $el.off('click', count);
      n++;
    };
    $el.on('click', count);
    click();
    click();
    setTimeout(function() {
      done(n == 1);
    }, 10);
  });

  it('should bind event once', function() {
    var n = 0;
    var count = function () {n++;};
    $el.once('click', count);
    click();
    click();
    setTimeout(function() {
      assert(n == 1);
    }, 10);
  });
});
