
/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  if (el.addEventListener) {
    el.addEventListener(type, fn, capture);
  } else {
    el.attachEvent('on' + type, fn);
  }
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  if (el.removeEventListener) {
    el.removeEventListener(type, fn, capture);
  } else {
    el.detachEvent('on' + type, fn);
  }
};

/**
 * trigger an event on `el`
 * 
 * @param  {Element} element
 * @param  {String} event      
 * @param  {String} type       event type, defaults to 'Event'
 * @param  {Boolean} bubble     enable/disable bubbling
 * @param  {Boolean} cancelable event trigger is cancelable
 * @api public
 */
exports.trigger = function (el, event, type, bubble, cancelable) {
  var e
    , type = type || 'Event'
    , bubble = ('undefined' == typeof bubble) ? true : bubble
    , cancelable = ('undefined' == typeof cancelable) ? true : cancelable;

  if (document.createEvent) {
    e = document.createEvent(type);
    e.initEvent(event, bubble, cancelable);
    return !el.dispatchEvent(e);
  } else {
    e = document.createEventObject();
    return el.fireEvent('on' + event, e);
  }
}