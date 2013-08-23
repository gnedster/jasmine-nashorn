
(function (global) {
  var timer = new java.util.Timer();
  var counter = 1;
  var ids = {};

  global.setTimeout = function (fn, delay) {
    var id = counter++;
    // ids[id] = new JavaAdapter(java.util.TimerTask, { run: fn });
    // timer.schedule(ids[id], delay);
    fn();
    return id;
  };

  global.clearTimeout = function (id) {
    ids[id].cancel();
    timer.purge();
    delete ids[id];
  };

  global.setInterval = function (fn, delay) {
    var id = counter++;
    // ids[id] = new JavaAdapter(java.util.TimerTask, { run: fn });
    // timer.schedule(ids[id], delay, delay);
    fn();
    return id;
  };

  global.clearInterval = global.clearTimeout;

  load('components/jasmine/lib/jasmine-core/jasmine.js');
  // load('/Users/onion/dev/bower-test/test/trivial.spec.js');



  jasmine.RhinoReporter = function() {
  };
  jasmine.RhinoReporter.prototype = {
    reportRunnerStarting: function(runner) {
      this._results = '';
    },
    reportRunnerResults: function(runner) {
      var failedCount = runner.results().failedCount;

      this.log(this._results);
      this.log("Passed: " + runner.results().passedCount);
      this.log("Failed: " + failedCount);
      this.log("Total : " + runner.results().totalCount);

      // java.lang.System.exit(failedCount);
    },
    reportSuiteResults: function(suite) {
    },
    reportSpecStarting: function(spec) {
    },
    reportSpecResults: function(spec) {
      var i, specResults = spec.results().getItems();

      if (spec.results().passed()) {
        java.lang.System.out.print(".");
      } else {
        java.lang.System.out.print("F");
        this._results += "\nFAILED\n";
        this._results += "Suite: " + spec.suite.description + "\n";
        this._results += "Spec : " + spec.description + "\n";
        for (i = 0; i < specResults.length; i += 1) {
          this._results += specResults[i].trace + "\n";
        }
      }
    },
    log: function(str) {
      print(str);
    }
  };
  jasmine.getEnv().addReporter(new jasmine.RhinoReporter());

  var it = {};

  it.execute = function () {
    jasmine.getEnv().execute();
  };


  return it;


})(this);
