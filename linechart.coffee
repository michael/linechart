formatter = pv.Format.number().fractionDigits(0,2)

# DataPointLabel
# ==============================================================================

class SmartLabel extends uv.Rect
  init: ->
    @p('width', 100)
    @p('height', 30)
    
    # Arrow
    @add({
      type: 'path'
      y: 1
      points: [{x: 10, y: 0}, {x: 10, y: '-10'}, {x: 20, y: 0}]
      fillStyle: @p('fillStyle')
      strokeStyle: ''
    })
    
    # Label
    @add({
      type: 'label',
      fillStyle: '#fff'
      localX: 20
      localY: 19
      font: 'bold 17px Helvetica, Arial'
      text: =>
        @p('text')
    })

# DataPoint
# ==============================================================================

class DataPoint extends uv.Circle
  init: ->
    that = this
    item = @parent.p('item')
    {colors, plotDisplay, prop} = @p('chart')
    
    # Configure
    @p 'radius', ->
      if @parent.active then 5 else 4
    @p 'fillStyle', ->
      if @active then 'white' else colors(item.key).color
    @p 'lineWidth', ->
      if @active then 5 else 0
    @p('strokeStyle', colors(item.key).color)
    @p('transformMode', 'origin')
    
    plotDisplay.add(new SmartLabel({
      text: =>
        @p('val')
      visible: ->
        if that.active
          m = plotDisplay.tView.concat(that._tWorld)
          pos = m.transformPoint(uv.Point(0,0))
          @p('x', pos.x)
          @p('y', pos.y+25)
          true
        else
          @p('x', -200)
          @p('y', -200)
          false
      fillStyle: colors(item.key).color
    }))

# Line
# ==============================================================================

class Line extends uv.Path
  init: ->
    {prop, scene, plotHeight, colors} = @p('chart')
    
    x = @p('chart').xScale()
    y = @p('chart').yScale()
    item = @p('item')

    # Configure
    @p 'lineWidth', ->
      if @active then 4 else 3
    @p('strokeStyle', colors(item.key).color)
    @p('transformMode', 'coords')
    
    item.values(prop.key).each (index, val) =>
      @p 'points', ->
        points = []
        @all('children').each (index, datapoint) ->
          points.push({
            x: datapoint.p('x')
            y: datapoint.p('y')
          })
        points

      # register data points
      datapoint = @add(new DataPoint({
        interactive: true
        item: item
        chart: @p('chart')
        x: x(index)
        y: plotHeight
        val: 'bla'
        transformMode: 'coords'
      }))
      
      datapoint.bind 'mouseover', ->
        @parent.active = true
      
      datapoint.bind 'mouseout', ->
        @parent.active = false
      
      
  updateDataPoints: ->
    {prop, scene, plotHeight, colors} = @p('chart')
    y = @p('chart').yScale()
    item = @p('item')
    
    # get corresponding datapoints and update their location
    @all('children').each (index, datapoint) =>
      val = y(item.values(prop.key).at(index))
      datapoint.p('val', formatter.format(item.values(prop.key).at(index)))
      datapoint.animate('y', val, 1000)

# Linechart
# ==============================================================================

class Linechart
  constructor: (@collection, @params) ->    
    @prop = @collection.get('properties', @params.property)
    @updateMinMax()
    @categoryIndex = null
    @build()
  
  updateProperty: (property) ->
    @prop = @collection.get('properties', property)
    @updateMinMax()
    @buildRulers(@xScale(), @yScale())
    @updateLines()
    
  updateLines: ->
    @plot.all('children').each (index, line) ->
      line.updateDataPoints()
      
  updateMinMax: ->
    @min = @prop.aggregate(uv.Aggregators.MIN)
    @max = @prop.aggregate(uv.Aggregators.MAX)
    @items = @collection.all('items')
    @colors = pv.Scale.ordinal(@items.map((item) -> item.key).values())
      .range('#8DB5C8', '#808E89', '#B16649', '#90963C', '#A2C355', '#93BAA1', '#86A2A9')
    
  xScale: ->
    pv.Scale.linear(0, @prop.categories.length-1).range(@margin, @plotWidth-@margin)
  yScale: ->
    pv.Scale.linear(@min, @max).range(@plotHeight-@margin, @margin)
  
  buildRulers: (xScale, yScale) ->
    # Remove all Rulers before reinitalization
    @rulers.remove (actor) -> true
    
    # Place label
    @rulers.add {
      type: 'label'
      text: @prop.name
      y: @rulersHeight / 2-20
      x: -110
      textAlign: 'center'
      font: 'bold 14px Helvetica, Arial'
      rotation: -Math.PI / 2
    }
    
    # Build x-Axis
    uv.each @prop.categories, (cat, index) =>
      if xScale(index) > 0
        @rulers.add {
          type: 'label'
          y: @plotHeight+30
          textAlign: 'center'
          x: xScale(index)
          fillStyle: '#aaa'
          text: cat
        }
    
    # Build y-Axis
    uv.each yScale.ticks(), (tick, index) =>
      @rulers.add {
        type: 'path'
        strokeStyle: '#efefef'
        y: (parseInt(yScale(tick), 10)-0.5)
        points: [{x: 0, y: 0}, {x: @plotWidth, y: 0}]
        actors: [
          {
            type: 'label'
            textAlign: 'right'
            fillStyle: '#aaa'
            x: -20
            text: formatter.format(tick)
          }
        ]
      }
    @rulers.render()
  
  addLines: ->
    @items.each (index, item) =>
      @plot.add(new Line({id: item.key, item: item, chart: this}))
  
  addLegend: ->
    @collection.all('items').each (index, item) =>
      $('#legend').append("<div class=\"item\">
            <div class=\"color\" style=\"background: #{@colors(item.key).color}\"></div>
            <div class=\"label\">#{item.identify()}</div>
            <br class=\"clear\"/>
          </div>");

  build: ->
    $('#canvas').html('<div id="rulers"></div><div id="plotarea"></div><div id="legend"></div>')
    
    @margin = 25
    @plotWidth = $('#plotarea').width() - 0
    @plotHeight = $('#plotarea').height() - 3
    
    @rulersWidth = $('#rulers').width() - 0
    @rulersHeight = $('#rulers').height() - 3
    
    @plot = new uv.Scene {
      traverser: uv.traverser.BreadthFirst
    }
    
    @plotDisplay = @plot.display {
      container: 'plotarea'
      width: @plotWidth
      height: @plotHeight
      zooming: true
      panning: true
    }

    @rulers = new uv.Scene({
      traverser: uv.traverser.BreadthFirst
      x: @rulersWidth-@plotWidth # align at plotarea (0.0)
    })
    
    @rulersDisplay = @rulers.display({
      container: 'rulers'
      width: @rulersWidth
      height: @rulersHeight
    })
    
    @addLines()
    @buildRulers(@xScale(), @yScale())
    @addLegend()
    @updateLines()
    
    # Recalculate Rulers on viewChange
    @plotDisplay.bind 'viewChange', =>
      min = @plotDisplay.worldPos(uv.Point(@margin, @plotHeight-@margin))
      max = @plotDisplay.worldPos(uv.Point(@plotWidth-@margin,@margin))
      
      xMinDomain = @xScale().invert(min.x)
      xMaxDomain = @xScale().invert(max.x)
      yMinDomain = @yScale().invert(min.y)
      yMaxDomain = @yScale().invert(max.y)
      
      x = pv.Scale.linear(xMinDomain, xMaxDomain).range(@margin, @plotWidth-@margin)
      y = pv.Scale.linear(yMinDomain, yMaxDomain).range(@plotHeight-@margin, @margin)
      @buildRulers(x, y)

  start: ->
    @plot.start()

# Exports
window.Linechart = Linechart