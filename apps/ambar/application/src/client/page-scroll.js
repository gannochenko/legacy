/**
 * This class allows to manage the vertical scroll of the page
 */
export default class PageScroll {

    static setValue(value) {
        sessionStorage.setItem('whereToScroll', value);
    }

    static getValue() {
        const top = parseInt(sessionStorage.getItem('whereToScroll'), 10);
        if (!Number.isNaN(top) || top < 0) {
            return 0;
        }

        return top;
    }

    /**
     * Store page scroll value
     * @returns void
     */
    static store() {
        const doc = document.documentElement;
        const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

        this.setValue(top);
    }

    /**
     * Resets the stored value of scroll
     * @returns void
     */
    static clear() {
        this.setValue(0);
    }

    /**
     * Scroll to the stored page scroll value
     * @returns void
     */
    static scrollToStored(speed = 0) {
        this.scrollTo(this.getValue(), speed);
        this.clear();
    }

    /**
     * Scroll to a specific value
     * @param {int} top
     * @param {int|string} speed
     * @returns void
     */
    static scrollTo(top = 0, speed = 0) {
        let t = parseInt(top, 10);
        if (Number.isNaN(t) || t < 0) {
            t = 0;
        }

        if (!Number.isNaN(speed)) {
            speed = 'slow';
        }
        $('html, body').animate({scrollTop: t}, speed);
    }
}
