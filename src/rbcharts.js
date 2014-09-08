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

  // function to update polar chart
  updateYoungGenerationChart: function (newData) {
    var iter = 0;
    for (var key in newData) {
      if (newData.hasOwnProperty(key)) {
        segment = this.youngGenerationChart.segments[iter];
        if (segment === undefined) {
          this.youngGenerationChart.addData({ value: newData[key], label: key });
        } else {
          this.youngGenerationChart.segments[iter].value = newData[key];
          this.youngGenerationChart.segments[iter].label = key;
        }
        ++iter;
      }
    }

    this.youngGenerationChart.update();
  },

  updateSecondGenerationChart: function (newData, timestamp) {
    secondGenerationChart.addData(newData, timestamp);

    if (10 > secondGenerationChart.datasets.length) {
      secondGenerationChart.removeData();
    }

    secondGenerationChart.update();
  },

  updateOldGenerationChart: function (newData, timestamp) {
    oldGenerationChart.addData(newData, timestamp);

    if (10 > oldGenerationChart.datasets.length) {
      oldGenerationChart.removeData();
    }

    oldGenerationChart.update();
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
