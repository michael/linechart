(function() {
  var renderSettings;
  renderSettings = function(c) {
    var $settings, options, props;
    props = c.all('properties').select(function(key, p) {
      return p.type === 'number' && !p.unique;
    });
    options = '';
    props.each(function(index, p) {
      return options += ("<option value=\"" + (p.key) + "\">" + (p.name) + "</option>");
    });
    $settings = $('<h3>Indicator</h3><select id="property">' + options + '</select>');
    $('#sidebar').append($settings);
    return $('#sidebar').append(' \
<h3>About</h3> \
<p> \
The shown visualization is under heavy development and aims to provide an  \
interactive Linechart. Use the mouse / mousewheel to zoom and pan individually.  \
</p> \
<p> \
This chart is powered by <a href="http://github.com/michael/unveil">Unveil.js</a> \
and sits on top of HTML5 Canvas. Please make sure you have a HTML5 capable browser. \
</p> \
<h3>Data used</h3> \
<p> \
<a href="/files/data/countries.js">Data</a> used for this example has  \
been retrieved from <a href="http://data.worldbank.org">data.worldbank.org</a>. \
</p> \
<h3>License</h3> \
<p> \
This is Public Domain Software. Feel free to copy, modify, publish, use, sell, or \
distribute. \
</p> \
');
  };
  $(function() {
    var program;
    program = function() {
      var c, vis;
      c = new uv.Collection(countries_fixture);
      renderSettings(c);
      vis = new Linechart(c, {
        property: 'birth_rate'
      });
      vis.start();
      return $('#property').change(function() {
        return vis.updateProperty($(this).val());
      });
    };
    return setTimeout(program, 200);
  });
})();
