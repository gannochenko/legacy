import './style/index.less'; // main website styles here
import Effects from './effects.js';
import PageScroll from './page-scroll.js';
import 'jquery-modal';

window.$ = $;
window._ = _;

$(document).ready(() => {
    if (_.isObjectNotEmpty($.env)) {
        if ($.env.isBrowser) {
            Effects.enable();
        }
    }

    $('#action-arrow').on('click', () => {
        PageScroll.scrollTo($(window).height());
    });

    $('.show-more-information').on('click', (e) => {

        const showIntro = $(e.target).data('show-intro');
        const data = $('#more-information-short');
        if (showIntro) {
            data.addClass('as-intro');
        } else {
            data.removeClass('as-intro');
        }

        $('#more-information-short').modal({
            doFade: true,
            fadeDuration: 50,
        });
    });

    $('#continue-reading').on('click', () => {
        $.modal.close();
        setTimeout(() => {
            PageScroll.scrollTo($(window).height());
        }, 0);
    });
});
