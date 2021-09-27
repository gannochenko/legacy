export default class Effects {
    static enable() {
        // show intro by timeout
        $('.effect_faded').each((i, node) => {
            this.addClass(node, 'effect_fade-in');
        });

        const items = $('.effect_faded_scroll');
        if (items.length) {
            const fn = _.throttle(this.onWindowScroll.bind(this), 50);
            $(window).on('scroll', fn);
            $(window).on('resize', fn);
            fn();
        }
    }

    static addClass(node, className, timeout = null) {
        node = $(node);
        if (node) {
            timeout = timeout === null ? node.data('effect-timeout') : timeout;
            if (!_.isFinite(timeout)) {
                timeout = 100;
            }

            setTimeout(() => {
                node.addClass(className);
            }, timeout);
        }
    }

    static onWindowScroll() {
        const win = $(window);
        const bottom = win.scrollTop() + win.height();
        
        $('.effect_faded_scroll').each((i, item) => {
            item = $(item);
            const processed = item.data('effect-processed');
            if (!processed) {
                const oTop = item.offset().top;
                if (oTop + Math.min(item.height() * 0.2, 200) < bottom) {
                    this.addClass(item, 'effect_fade-in');
                    item.data('effect-processed', true);
                }
            }
        });
    }
}
