// top level rbkit which encapsulates all rbkit code. This also acts as
// namespace
var Rbkit = {
  // heap data which will be displayed as line chart
  heapData: {
    datasets: [],
    labels: []
  },

  // gc data, which will be used in populating in gc graph
  gcData: {
    datasets: [],
    labels: []
  },

  // polar graph data for young generation
  youngGenerationData: [],

  // ploar graph data for 2nd generation
  secondGenerationData: [],

  // polar graph data for old generation
  oldGenerationData: [],

  // chart canvas contexts
  heapDataCtx         : undefined,
  gcCtx               : undefined,
  youngGenerationCtx  : undefined,
  secondGenerationCtx : undefined,
  oldGenerationCtx    : undefined,

  // actual charts
  heapDataChart         : undefined,
  gcChart               : undefined,
  youngGenerationChart  : undefined,
  secondGenerationChart : undefined,
  oldGenerationChart    : undefined,

  // function to update heap chart.
  updateHeapChart : function (newData, timestamp) {
    heapDataChart.addData(newData, timestamp);

    if (10 > heapDataChart.datasets.length) {
      heapDataChart.removeData();
    }

    heapDataChart.update();
  },

  // function to update gc graph
  updateGcChart: function (gcStarted, timestamp) {
  },

  // set of polar colors which can be used
  polarChartDefaultColors: [
    // https://kuler.adobe.com/create/color-wheel/?base=2&rule=Analogous&selected=0&name=My%20Kuler%20Theme&mode=rgb&rgbvalues=1,0.8061476456696997,0.21226577883757825,0.91,0.3792784756568747,0.006674395779380451,1,0.05733450085646208,0.07395439645749258,0.6885308876037232,0.006674395779380451,0.91,0.007334500856462034,0.032410134950262015,1&swatchOrder=0,1,2,3,4
    "#FFCE36",
    "#E86102",
    "#FF0F13",
    "#B002E8",
    "#0208FF",

    // https://kuler.adobe.com/create/color-wheel/?base=2&rule=Analogous&selected=0&name=My%20Kuler%20Theme&mode=rgb&rgbvalues=0.04807254964605545,0.3841648710813974,1,0.026435686294499838,0.91,0.9023077127342737,0.07905020471923063,1,0.34320423970430325,0.48126239660538095,0.91,0.026435686294499838,1,0.8956645395163697,0.057458175950780066&swatchOrder=0,1,2,3,4
    "#0C62FF",
    "#07E8E6",
    "#14FF58",
    "#7BE807",
    "#FFE40F"
  ],

  // helper function to update a particular polar chart
  updatePolarChart: function(chart, newData) {
    var iter = 0;
    for (var key in newData) {
      if (newData.hasOwnProperty(key)) {
        segment = chart.segments[iter];
        if (segment === undefined) {
          color = this.polarChartDefaultColors[iter];
          chart.addData({ value: newData[key], label: key, color: color, highlight: color });
        } else {
          chart.segments[iter].value = newData[key];
          chart.segments[iter].label = key;
        }
        ++iter;
      }
    }

    chart.update();
  },

  // function to update polar chart
  updateYoungGenerationChart: function (newData) {
    this.updatePolarChart(this.youngGenerationChart, newData);
  },

  updateSecondGenerationChart: function (newData) {
    this.updatePolarChart(this.secondGenerationChart, newData);
  },

  updateOldGenerationChart: function (newData) {
    this.updatePolarChart(this.oldGenerationChart, newData);
  },

  init: function () {
    // instantiate contexts
    this.heapDataCtx         = document.getElementById('heap-chart').getContext('2d');
    this.gcCtx               = document.getElementById('gc-chart').getContext('2d');
    this.youngGenerationCtx  = document.getElementById('generation-one').getContext('2d');
    this.secondGenerationCtx = document.getElementById('generation-two').getContext('2d');
    this.oldGenerationCtx    = document.getElementById('generation-three').getContext('2d');

    // create charts
    // this.heapDataChart         = new Chart(this.heapDataCtx).Line(this.heapData);
    this.gcChart               = new Chart(this.gcCtx).Bar(this.gcData);
    this.youngGenerationChart  = new Chart(this.youngGenerationCtx).PolarArea(this.youngGenerationData);
    this.secondGenerationChart = new Chart(this.secondGenerationCtx).PolarArea(this.secondGenerationData);
    this.oldGenerationChart    = new Chart(this.oldGenerationCtx).PolarArea(this.oldGenerationData);
  }
};

Rbkit.init();
