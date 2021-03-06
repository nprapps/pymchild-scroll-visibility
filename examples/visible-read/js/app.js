/*
 * Initialize the graphic.
 */
var pymChild = null;
var trackers = {};
var onWindowLoaded = function() {
    pymChild = new pym.Child();
    var tracker = new PymChildScrollVisibility.Tracker('tracker-test-1', onVisible);
    trackers['tracker-test-1'] = tracker;
    tracker = new PymChildScrollVisibility.Tracker('tracker-test-2', onVisible, onRead);
    trackers['tracker-test-2'] = tracker;
    pymChild.onMessage('viewport-iframe-position', function(parentInfo) {
        for (var tracker in trackers) {
            if (trackers.hasOwnProperty(tracker)) {
                trackers[tracker].checkIfVisible(parentInfo, true);
            }
        }
    });
}

var onVisible = function(id) {
    console.log(id, 'visible');
    var el = document.getElementById(id);
    // Toggle class
    if (el.classList.contains('visible')) {
        el.classList.remove('visible');
    }
    else {
        el.classList.add('visible');
    }
}

var onRead = function(id) {
    console.log(id, 'read');
    var el = document.getElementById(id);
    // Add class read
    el.classList.add('read');
    // Remove tracking
    var tracker = trackers[id];
    tracker.stopTimer();
    delete trackers[id];
}

/*
 * Initially load the graphic
 * (NB: Use window.load to ensure all images have loaded)
 */
window.onload = onWindowLoaded;
