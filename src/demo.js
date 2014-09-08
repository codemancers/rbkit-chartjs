var polarYoungGenerationChart = function () {
  setTimeout(polarYoungGenerationChart, 1000);

  data = {
    String: _.random(0, 200),
    Foo:    _.random(0, 200),
    Bar:    _.random(0, 200),
    Others: _.random(0, 200)
  };

  Rbkit.updateYoungGenerationChart(data);
};

polarYoungGenerationChart();
