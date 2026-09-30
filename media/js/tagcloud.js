(function () {
  var root = document.getElementById("tag_cloud");
  if (!root) return;

  var links = root.querySelectorAll("a");
  if (!links.length) return;

  var start = [0xf8, 0xe0, 0xe6];
  var end = [0xff, 0x33, 0x33];
  var lowest = Infinity;
  var highest = -Infinity;
  var i;

  for (i = 0; i < links.length; i++) {
    var weight = weightOf(links[i]);
    if (weight < lowest) lowest = weight;
    if (weight > highest) highest = weight;
  }

  var range = highest - lowest || 1;
  for (i = 0; i < links.length; i++) {
    links[i].style.color = mixColor(start, end, (weightOf(links[i]) - lowest) / range);
  }

  function weightOf(link) {
    var value = parseInt(link.getAttribute("data-weight"), 10);
    return isNaN(value) ? 0 : value;
  }

  function mixColor(from, to, amount) {
    var hex = "#";
    for (var channel = 0; channel < 3; channel++) {
      var value = Math.round(from[channel] + (to[channel] - from[channel]) * amount);
      if (value < 0) value = 0;
      if (value > 255) value = 255;
      var part = value.toString(16);
      hex += part.length === 1 ? "0" + part : part;
    }
    return hex;
  }
})();
