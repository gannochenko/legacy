(function splash() {
    var splash = window.document.querySelector('.splash');
    var progress = window.document.querySelector('.splash__progress-indicator');
    if (splash && progress) {
        var stepCount = 10;
        var step = 0;
        var width = 0;

        var dismiss = function dismiss() {
            splash.className += ' splash_dismissed';
            setTimeout(function hideSplash() {
                splash.style.display = 'none';
            }, 500);
        };

        var makeStep = function makeStep() {
            setTimeout(function setWidth() {
                width += 100 / stepCount;
                step += 1;
                progress.style.width = width + '%';
                if (step < stepCount - 1) {
                    makeStep();
                }
            }, Math.floor(Math.random() * 1000) + 100);
        };
        makeStep();
        window.__splash = {
            dismiss: dismiss,
        };
    }
})();
