var polarRandomData = function () {
  return {
    String: _.random(0, 200),
    Foo:    _.random(0, 200),
    Bar:    _.random(0, 200),
    Others: _.random(0, 200)
  };
};

var polarGenerationCharts = function () {
  setTimeout(polarGenerationCharts, 1000);

  Rbkit.updateYoungGenerationChart(polarRandomData());
  Rbkit.updateSecondGenerationChart(polarRandomData());
  Rbkit.updateOldGenerationChart(polarRandomData());
};

polarGenerationCharts();
