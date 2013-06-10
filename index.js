/**
 * Normalize an `event`
 *
 * @param {Event} [e]
 * @return {Event}
 * @api private
 */

function normalize(e) {
  e = e || window.event;

  // layers
  if (e.layerX) {
    e.offsetX = e.layerX;
    e.offsetY = e.layerY;
  }

  // set relatedTarget for mouse events
  if (!e.relatedTarget) {
    if (e.type === 'mouseover') {
      e.relatedTarget = e.fromElement;
    } else if (e.type === 'mouseout') {
      e.relatedTarget = e.toElement;
    }
  }

  // KeyboardEvent#which
  e.which = e.keyCode || e.charCode;

  // Event#target
  e.target = e.target || e.srcElement;

  // preventDefault and stopPropagation
  if (typeof e.preventDefault !== 'function') {
    e.preventDefault = function () {
      this.returnValue = false;
    };
    e.stopPropagation = function () {
      this.cancelBubble = true;
    };
  }

  return e;
}

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
  if (el.addEventListener) {
    el.addEventListener(type, fn, capture || false);
    return fn;
  }

  fn._normalized = function (e) {
    fn.call(el, normalize(e));
  };

  el.attachEvent('on' + type, fn._normalized);
  return fn._normalized;
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
  if (el.removeEventListener) {
    el.removeEventListener(type, fn, capture || false);
  } else {
    el.detachEvent('on' + type, fn._normalized);
  }
  return fn;
};
