const PI = 3.1416;
exports.area = function(r)
{
  return r*PI*2;
}

/**
 * or 
 * this.area = function(r)
 * {
 * ...
 * }
 * 
 * or 
 * const area = function(r)
 * {
 *  return r * PI * 2;
 * }; exports.area = area;
 */