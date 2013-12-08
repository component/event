/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el.addEventListener(type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el.removeEventListener(type, fn, capture || false);
  return fn;
};

if (!window.addEventListener) {

  exports.bind = function(el, type, fn) {
    fn._listener = fn._listener || function() {
      var native = window.event;
      var e = {};
      e.native = native;
      e.target = native.srcElement;
      e.preventDefault = function() {
        this.native.returnValue = false;
      };
      e.stopPropagation = function() {
        this.native.cancelBubble = true;
      };
      return fn.call(this, e);
    };
    el.attachEvent('on' + type, fn._listener);
    return fn;
  };

  exports.unbind = function(el, type, fn) {
    if (!fn._listener) return fn;
    el.detachEvent('on' + type, fn._listener);
    return fn;
  };
}
