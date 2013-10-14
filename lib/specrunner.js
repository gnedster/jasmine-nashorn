
(function () {

  var root = this;
  var runner = {};

  runner.init = function () {
    // var timer = new java.util.Timer();
    var counter = 1;
    var ids = {};

    root.setTimeout = function (fn, delay) {
      var id = counter++;
      // ids[id] = new JavaAdapter(java.util.TimerTask, { run: fn });
      // timer.schedule(ids[id], delay);
      fn();
      return id;
    };

    root.clearTimeout = function (id) {
      ids[id].cancel();
      // timer.purge();
      delete ids[id];
    };

    root.setInterval = function (fn, delay) {
      var id = counter++;
      // ids[id] = new JavaAdapter(java.util.TimerTask, { run: fn });
      // timer.schedule(ids[id], delay, delay);
      fn();
      return id;
    };

    root.clearInterval = root.clearTimeout;
  };

  runner.reporter = function() {};

  runner.reporter.prototype = {
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
      root.specCounter += 1;
      // print(root.specCounter);
      if (spec.results().passed()) {
        java.lang.System.out.print(".");

      } else {
        java.lang.System.out.print("F");
        this._results += "\nFAILED\n";
        // prn(spec);
        this._results += "Suite: " + spec.suite.description + "\n";
        this._results += "File: " + root.currentTest + "\n";
        this._results += "Spec : " + spec.description + "\n";
        for (i = 0; i < specResults.length; i += 1) {
          this._results += specResults[i].trace.stack + "\n";
        }
      }
    },
    log: function(str) {
      print(str);
    }
  };

  runner.run = function () {
    jasmine.getEnv().execute();
  };

  return runner;

}).call(this);
