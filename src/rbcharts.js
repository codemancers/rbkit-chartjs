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

  // instantiate contexts
  heapDataCtx         : document.getElementById('heap-chart').getContext('2d'),
  gcCtx               : document.getElementById('gc-chart').getContext('2d'),
  youngGenerationCtx  : document.getElementById('generation-one').getContext('2d'),
  secondGenerationCtx : document.getElementById('generation-two').getContext('2d'),
  oldGenerationCtx    : document.getElementById('generation-three').getContext('2d'),

  // create charts
  heapDataChart         : new Chart(heapDataCtx).Line(heapData),
  gcChart               : new Chart(gcCtx).Bar(gcData),
  youngGenerationChart  : new Chart(youngGenerationCtx).PolarArea(youngGenerationData),
  secondGenerationChart : new Chart(secondGenerationCtx).PolarArea(secondGenerationData),
  oldGenerationChart    : new Chart(oldGenerationCtx).PolarArea(oldGenerationData),

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
  updateYoungGenerationChart: function (newData, timestamp) {
    youngGenerationChart.addData(newData, timestamp);

    if (10 > youngGenerationChart.datasets.length) {
      youngGenerationChart.removeData();
    }

    youngGenerationChart.update();
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
  }
};
