export default class Util {
    /**
     * // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36
     * // Safari/13604.5.6 CFNetwork/893.13.1 Darwin/17.4.0 (x86_64)
     * // Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:61.0) Gecko/20100101 Firefox/61.0
     * // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393
     * @param userAgent
     */
    static isBrowser(userAgent) {
        if (_.isStringNotEmpty(userAgent)) {
            return userAgent.indexOf('Mozilla/') >= 0 || userAgent.indexOf('Chrome/') >= 0 || userAgent.indexOf('Safari/') >= 0 || userAgent.indexOf('Edge/') >= 0 || userAgent.indexOf('Gecko/') >= 0;
        }

        return false;
    }
}
