/**
 * Initialize a new `Binder`
 *
 * @api public
 */

function Binder(el) {
 if (!(this instanceof Binder))
    return new Binder(el);
  this.el = el;
}

/**
 * Expose binder
 */

module.exports = Binder;

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

Binder.bind = function(el, type, fn, capture){
  if (el.addEventListener) {
    el.addEventListener(type, fn, capture || false);
  } else {
    el.attachEvent('on' + type, fn);
  }
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

Binder.unbind = function(el, type, fn, capture) {
  if (el.removeEventListener) {
    el.removeEventListener(type, fn, capture || false);
  } else {
    el.detachEvent('on' + type, fn);
  }
  return fn;
};

/**
 * Bind an event to only be triggered a single time
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

Binder.once = function(el, type, fn, capture) {
  var self = this;
  var one = function() {
    Binder.unbind(el, type, fn, capture);
    fn.apply(self, arguments);
  };
  return Binder.bind(el, type, one, capture);
};

/**
 * Bind event
 *
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Binder}
 * @api public
 */

Binder.prototype.on = function(type, fn, capture) {
  Binder.bind(this.el, type, fn, capture);
  return this;
};

/**
 * Unbind event
 *
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Binder}
 * @api public
 */

Binder.prototype.off = function(type, fn, capture) {
  Binder.unbind(this.el, type, fn, capture);
  return this;
};

/**
 * bind event once
 *
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Binder}
 * @api public
 */

Binder.prototype.once = function(type, fn, capture) {
  Binder.once(this.el, type, fn, capture);
  return this;
};
