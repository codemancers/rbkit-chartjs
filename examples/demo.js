var polarRandomDataIter = 0;
var polarRandomData = function () {
  var randomLimit = (polarRandomDataIter++ % 2 == 0) ? 200 : 100;

  return {
    String: _.random(0, randomLimit),
    Foo:    _.random(0, randomLimit),
    Bar:    _.random(0, randomLimit),
    Others: _.random(0, randomLimit)
  };
};

var polarGenerationCharts = function () {
  setTimeout(polarGenerationCharts, 5000);

  Rbkit.updateYoungGenerationChart(polarRandomData());
  Rbkit.updateSecondGenerationChart(polarRandomData());
  Rbkit.updateOldGenerationChart(polarRandomData());
};

polarGenerationCharts();
