var sevenRandomPoints = function(args) {
  return _(7).times(function(n) {
    if(args && (args.binary === true)) {
      return _.random(0, 1);
    } else {
      return _.random(0, 100);
    }
  });
};

var heapData = {
  labels: ['1s', '2s', '3s', '4s', '5s', '6s', '7s' ],
  datasets: [
    {
      label: "Total Live Objects",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: sevenRandomPoints()
    },
    {
      label: "Heap Size",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: sevenRandomPoints()
    },
    {
      label: "RES memory size",
      fillColor: "rgba(15,17,25,0.2)",
      strokeColor: "rgba(11,17,25,1)",
      pointColor: "rgba(11,17,25,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: sevenRandomPoints()
    }
  ]
};

var gcData = {
  labels: ['1s', '2s', '3s', '4s', '5s', '6s', '7s' ],
  datasets: [
  {
    label: "My First dataset",
    fillColor: "rgba(220,220,220,0.5)",
    strokeColor: "rgba(220,220,220,0.8)",
    highlightFill: "rgba(220,220,220,0.75)",
    highlightStroke: "rgba(220,220,220,1)",
    data: sevenRandomPoints({binary: true})
  },
  ]
};

var youngGenerationData = [
  { value:  _.random(0, 200), color:"#F7464A", highlight: "#FF5A5E", label: "Red" },
  { value:  _.random(0, 200), color: "#46BFBD", highlight: "#5AD3D1", label: "Green" },
  { value: _.random(0, 200), color: "#FDB45C", highlight: "#FFC870", label: "Yellow" },
  { value: _.random(0, 200), color: "#949FB1", highlight: "#A8B3C5", label: "Grey" },
  { value:  _.random(0, 200), color: "#4D5360", highlight: "#616774", label: "Dark Grey" }
];

var secondGenerationData = [
  { value:  _.random(0, 200), color:"#F7464A", highlight: "#FF5A5E", label: "Red" },
  { value:  _.random(0, 200), color: "#46BFBD", highlight: "#5AD3D1", label: "Green" },
  { value: _.random(0, 200), color: "#FDB45C", highlight: "#FFC870", label: "Yellow" },
  { value: _.random(0, 200), color: "#949FB1", highlight: "#A8B3C5", label: "Grey" },
  { value:  _.random(0, 200), color: "#4D5360", highlight: "#616774", label: "Dark Grey" }
];

var oldGenerationData = [
  { value:  _.random(0, 200), color:"#F7464A", highlight: "#FF5A5E", label: "Red" },
  { value:  _.random(0, 200), color: "#46BFBD", highlight: "#5AD3D1", label: "Green" },
  { value: _.random(0, 200), color: "#FDB45C", highlight: "#FFC870", label: "Yellow" },
  { value: _.random(0, 200), color: "#949FB1", highlight: "#A8B3C5", label: "Grey" },
  { value:  _.random(0, 200), color: "#4D5360", highlight: "#616774", label: "Dark Grey" }
];

var heapDataCtx         = document.getElementById('heap-chart').getContext('2d');
var gcCtx               = document.getElementById('gc-chart').getContext('2d');
var youngGenerationCtx  = document.getElementById('generation-one').getContext('2d');
var secondGenerationCtx = document.getElementById('generation-two').getContext('2d');
var oldGenerationCtx    = document.getElementById('generation-three').getContext('2d');

var heapDataChart         = new Chart(heapDataCtx).Line(heapData);
var gcChart               = new Chart(gcCtx).Bar(gcData);
var youngGenerationChart  = new Chart(youngGenerationCtx).PolarArea(youngGenerationData);
var secondGenerationChart = new Chart(secondGenerationCtx).PolarArea(secondGenerationData);
var oldGenerationChart    = new Chart(oldGenerationCtx).PolarArea(oldGenerationData);

var updateAllPolarCharts = function() {
  setTimeout(updateAllPolarCharts, 2000);
  for (var i = 0, len = youngGenerationChart.segments.length; i < len; i++) {
    youngGenerationChart.segments[i].value = _.random(0, 200);
    secondGenerationChart.segments[i].value = _.random(0, 200);
    oldGenerationChart.segments[i].value = _.random(0, 200);
  }

  youngGenerationChart.update();
  secondGenerationChart.update();
  oldGenerationChart.update();
};
var counter = (function() {
  var counterValue = heapDataChart.datasets[0].points.length;
  return {
    increment: function() { counterValue += 1; },
    value: function() { return counterValue; }
  };
})();

var updateGcHeapCharts = function() {
  setTimeout(updateGcHeapCharts, 1000);
  counter.increment();
  heapDataChart.addData([_.random(0, 200), _.random(0, 200), _.random(0, 200)], counter.value() + 's');
  gcChart.addData([_.random(0, 1)], counter.value() + 's');
  heapDataChart.removeData();
  gcChart.removeData();

  for (var i= 0, len = heapDataChart.datasets.length; i < len; i++) {
    for (var j = 0, l = heapDataChart.datasets[i].points.length; j < l; j++) {
      heapDataChart.datasets[i].points[j].value = _.random(0, 200);
    }
  }

  heapDataChart.update();
  gcChart.update();
};


updateAllPolarCharts();
updateGcHeapCharts();


