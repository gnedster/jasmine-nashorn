
var runner = load('lib/specrunner.js');
// print("ARGS...", $ARG.length);

for (var i in $ARG) {
  var f = $ARG[i];
  // print(f);
  load(f);
}

runner.execute();
