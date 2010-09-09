(function() {
  var DataPoint, Line, Linechart, SmartLabel, formatter;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  }, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__superClass__ = parent.prototype;
  };
  formatter = pv.Format.number().fractionDigits(0, 2);
  SmartLabel = function() {
    return uv.Rect.apply(this, arguments);
  };
  __extends(SmartLabel, uv.Rect);
  SmartLabel.prototype.init = function() {
    this.p('width', 100);
    this.p('height', 30);
    this.add({
      type: 'path',
      y: 1,
      points: [
        {
          x: 10,
          y: 0
        }, {
          x: 10,
          y: '-10'
        }, {
          x: 20,
          y: 0
        }
      ],
      fillStyle: this.p('fillStyle'),
      strokeStyle: ''
    });
    return this.add({
      type: 'label',
      fillStyle: '#fff',
      localX: 20,
      localY: 19,
      font: 'bold 17px Helvetica, Arial',
      text: __bind(function() {
        return this.p('text');
      }, this)
    });
  };
  DataPoint = function() {
    return uv.Circle.apply(this, arguments);
  };
  __extends(DataPoint, uv.Circle);
  DataPoint.prototype.init = function() {
    var _a, colors, item, plotDisplay, prop, that;
    that = this;
    item = this.parent.p('item');
    _a = this.p('chart');
    colors = _a.colors;
    plotDisplay = _a.plotDisplay;
    prop = _a.prop;
    this.p('radius', function() {
      return this.parent.active ? 5 : 4;
    });
    this.p('fillStyle', function() {
      return this.active ? 'white' : colors(item.key).color;
    });
    this.p('lineWidth', function() {
      return this.active ? 5 : 0;
    });
    this.p('strokeStyle', colors(item.key).color);
    this.p('transformMode', 'origin');
    return plotDisplay.add(new SmartLabel({
      text: __bind(function() {
        return this.p('val');
      }, this),
      visible: function() {
        var m, pos;
        if (that.active) {
          m = plotDisplay.tView.concat(that._tWorld);
          pos = m.transformPoint(uv.Point(0, 0));
          this.p('x', pos.x);
          this.p('y', pos.y + 25);
          return true;
        } else {
          this.p('x', -200);
          this.p('y', -200);
          return false;
        }
      },
      fillStyle: colors(item.key).color
    }));
  };
  Line = function() {
    return uv.Path.apply(this, arguments);
  };
  __extends(Line, uv.Path);
  Line.prototype.init = function() {
    var _a, colors, item, plotHeight, prop, scene, x, y;
    _a = this.p('chart');
    prop = _a.prop;
    scene = _a.scene;
    plotHeight = _a.plotHeight;
    colors = _a.colors;
    x = this.p('chart').xScale();
    y = this.p('chart').yScale();
    item = this.p('item');
    this.p('lineWidth', function() {
      return this.active ? 4 : 3;
    });
    this.p('strokeStyle', colors(item.key).color);
    this.p('transformMode', 'coords');
    return item.values(prop.key).each(__bind(function(index, val) {
      var datapoint;
      this.p('points', function() {
        var points;
        points = [];
        this.all('children').each(function(index, datapoint) {
          return points.push({
            x: datapoint.p('x'),
            y: datapoint.p('y')
          });
        });
        return points;
      });
      datapoint = this.add(new DataPoint({
        interactive: true,
        item: item,
        chart: this.p('chart'),
        x: x(index),
        y: plotHeight,
        val: 'bla',
        transformMode: 'coords'
      }));
      datapoint.bind('mouseover', function() {
        return (this.parent.active = true);
      });
      return datapoint.bind('mouseout', function() {
        return (this.parent.active = false);
      });
    }, this));
  };
  Line.prototype.updateDataPoints = function() {
    var _a, colors, item, plotHeight, prop, scene, y;
    _a = this.p('chart');
    prop = _a.prop;
    scene = _a.scene;
    plotHeight = _a.plotHeight;
    colors = _a.colors;
    y = this.p('chart').yScale();
    item = this.p('item');
    return this.all('children').each(__bind(function(index, datapoint) {
      var val;
      val = y(item.values(prop.key).at(index));
      datapoint.p('val', formatter.format(item.values(prop.key).at(index)));
      return datapoint.animate('y', val, 1000);
    }, this));
  };
  Linechart = function(_a, _b) {
    this.params = _b;
    this.collection = _a;
    this.prop = this.collection.get('properties', this.params.property);
    this.updateMinMax();
    this.categoryIndex = null;
    this.build();
    return this;
  };
  Linechart.prototype.updateProperty = function(property) {
    this.prop = this.collection.get('properties', property);
    this.updateMinMax();
    this.buildRulers(this.xScale(), this.yScale());
    return this.updateLines();
  };
  Linechart.prototype.updateLines = function() {
    return this.plot.all('children').each(function(index, line) {
      return line.updateDataPoints();
    });
  };
  Linechart.prototype.updateMinMax = function() {
    this.min = this.prop.aggregate(uv.Aggregators.MIN);
    this.max = this.prop.aggregate(uv.Aggregators.MAX);
    this.items = this.collection.all('items');
    return (this.colors = pv.Scale.ordinal(this.items.map(function(item) {
      return item.key;
    }).values()).range('#8DB5C8', '#808E89', '#B16649', '#90963C', '#A2C355', '#93BAA1', '#86A2A9'));
  };
  Linechart.prototype.xScale = function() {
    return pv.Scale.linear(0, this.prop.categories.length - 1).range(this.margin, this.plotWidth - this.margin);
  };
  Linechart.prototype.yScale = function() {
    return pv.Scale.linear(this.min, this.max).range(this.plotHeight - this.margin, this.margin);
  };
  Linechart.prototype.buildRulers = function(xScale, yScale) {
    this.rulers.remove(function(actor) {
      return true;
    });
    this.rulers.add({
      type: 'label',
      text: this.prop.name,
      y: this.rulersHeight / 2 - 20,
      x: -110,
      textAlign: 'center',
      font: 'bold 14px Helvetica, Arial',
      rotation: -Math.PI / 2
    });
    uv.each(this.prop.categories, __bind(function(cat, index) {
      return xScale(index) > 0 ? this.rulers.add({
        type: 'label',
        y: this.plotHeight + 30,
        textAlign: 'center',
        x: xScale(index),
        fillStyle: '#aaa',
        text: cat
      }) : null;
    }, this));
    uv.each(yScale.ticks(), __bind(function(tick, index) {
      return this.rulers.add({
        type: 'path',
        strokeStyle: '#efefef',
        y: (parseInt(yScale(tick), 10) - 0.5),
        points: [
          {
            x: 0,
            y: 0
          }, {
            x: this.plotWidth,
            y: 0
          }
        ],
        actors: [
          {
            type: 'label',
            textAlign: 'right',
            fillStyle: '#aaa',
            x: -20,
            text: formatter.format(tick)
          }
        ]
      });
    }, this));
    return this.rulers.render();
  };
  Linechart.prototype.addLines = function() {
    return this.items.each(__bind(function(index, item) {
      return this.plot.add(new Line({
        id: item.key,
        item: item,
        chart: this
      }));
    }, this));
  };
  Linechart.prototype.addLegend = function() {
    return this.collection.all('items').each(__bind(function(index, item) {
      return $('#legend').append(("<div class=\"item\"> \
<div class=\"color\" style=\"background: " + (this.colors(item.key).color) + "\"></div> \
<div class=\"label\">" + (item.identify()) + "</div> \
<br class=\"clear\"/> \
</div>"));
    }, this));
  };
  Linechart.prototype.build = function() {
    $('#canvas').html('<div id="rulers"></div><div id="plotarea"></div><div id="legend"></div>');
    this.margin = 25;
    this.plotWidth = $('#plotarea').width() - 0;
    this.plotHeight = $('#plotarea').height() - 3;
    this.rulersWidth = $('#rulers').width() - 0;
    this.rulersHeight = $('#rulers').height() - 3;
    this.plot = new uv.Scene({
      traverser: uv.traverser.BreadthFirst
    });
    this.plotDisplay = this.plot.display({
      container: 'plotarea',
      width: this.plotWidth,
      height: this.plotHeight,
      zooming: true,
      panning: true
    });
    this.rulers = new uv.Scene({
      traverser: uv.traverser.BreadthFirst,
      x: this.rulersWidth - this.plotWidth
    });
    this.rulersDisplay = this.rulers.display({
      container: 'rulers',
      width: this.rulersWidth,
      height: this.rulersHeight
    });
    this.addLines();
    this.buildRulers(this.xScale(), this.yScale());
    this.addLegend();
    this.updateLines();
    return this.plotDisplay.bind('viewChange', __bind(function() {
      var max, min, x, xMaxDomain, xMinDomain, y, yMaxDomain, yMinDomain;
      min = this.plotDisplay.worldPos(uv.Point(this.margin, this.plotHeight - this.margin));
      max = this.plotDisplay.worldPos(uv.Point(this.plotWidth - this.margin, this.margin));
      xMinDomain = this.xScale().invert(min.x);
      xMaxDomain = this.xScale().invert(max.x);
      yMinDomain = this.yScale().invert(min.y);
      yMaxDomain = this.yScale().invert(max.y);
      x = pv.Scale.linear(xMinDomain, xMaxDomain).range(this.margin, this.plotWidth - this.margin);
      y = pv.Scale.linear(yMinDomain, yMaxDomain).range(this.plotHeight - this.margin, this.margin);
      return this.buildRulers(x, y);
    }, this));
  };
  Linechart.prototype.start = function() {
    return this.plot.start();
  };
  window.Linechart = Linechart;
})();
