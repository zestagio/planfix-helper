(function ($) {
    'use strict';

    TaskListPageJS.initTask = 0;

    document.addEventListener('click', function (e) {
        $(e.target)
            .closest('.actions-item-v2.tr-actions-body.actionwr:not(.tr-actions-body-new)')
            .off('click');
    }, true);

    $('body').on('DOMNodeInserted', 'div[class=b-task-title-wrapper]', function () {
        let $title = $('div.title-and-eye-menu');
        if ($title.length) {
            gitBranchAndCommit($title);
        }
    });

    function gitBranchAndCommit ($el) {
        if ($('span.copy-me').length) {
            return;
        }

        let issueKey = document.URL.replace(/.+\/task\/(\d+)($|\/|\?).*/g, '$1');
        let issueTitle = $el.find('.b-task-title-wrapper').html().replace(/[^:]+:\s([^:]+)/g, '$1');
        let issueBranch = 'task/' + issueKey + '-' + issueTitle
            .replace(/\[.*?][\s"']*/g, '')
            .replace(/\W/g, '-')
            .replace(/-{2,}/g, '-')
            .replace(/[-]+$/, '')
            .toLowerCase();

        let issueCommit = issueKey + ': ' + issueTitle;

        let content = '';
        content += '<strong>Branch: <span class="copy-me" style="color:#d22;cursor:pointer;">' + issueBranch + '</span></strong><br />';
        content += '<strong>Commit: <span class="copy-me" style="color:#d22;cursor:pointer;">' + issueCommit + '</span></strong><br />';
        content += '<strong>Short commit: <span class="copy-me" style="color:#d22;cursor:pointer;">' + issueKey + ': </span></strong>';

        $el.after(content);

        $('span.copy-me').off('click').on('click', function () {
            let $this = $(this);

            navigator.clipboard.writeText($this.text()).then(function () {
                $this.fadeOut('slow', function () {
                    $this.fadeIn('slow');
                });

                $.notify($this.text() + ' copied to clipboard', 'success');
            });
        });
    }
})(window.jQuery);
