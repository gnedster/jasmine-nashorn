/*
 * Copyright (c) 2013, Oracle and/or its affiliates.
 * All rights reserved. Use is subject to license terms.
 *
 * This file is available and licensed under the following license:
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *  - Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  - Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in
 *    the documentation and/or other materials provided with the distribution.
 *  - Neither the name of Oracle Corporation nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function () {

  var root = this;
  var runner = {};

  runner.init = function () {
    var counter = 1;
    var ids = {};

    root.setTimeout = function (fn, delay) {
      var id = counter++;
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
