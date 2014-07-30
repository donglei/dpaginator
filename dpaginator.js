/**
auth:donglei
email:xiaosan@outlook.com
*/

var dPaginator = (function () {
    function dPaginator(total, prepage, currentpage) {
        this.currentPage = currentpage;
        this.total = total;
        this.perPage = prepage;
    }
    /**
    * Render the Pagination contents.
    *
    * @return string
    */
    dPaginator.prototype.toLink = function () {
        this.calculateLastPages();
        var content;
        if (this.lastPage < 13) {
            content = this.getPageRange(1, this.lastPage);
        } else {
            content = this.getPageSlider();
        }
        return '<ul class="pagination">' + this.getPrevious() + content + this.getNext() + '</ul>';
    };

    /**
    * Get the next page pagination element.
    *
    * @param  string  $text
    * @return string
    */
    dPaginator.prototype.getNext = function (text) {
        if (typeof text === "undefined") { text = '&raquo;'; }
        // If the current page is greater than or equal to the last page, it means we
        // can't go any further into the pages, as we're already on this last page
        // that is available, so we will make it the "next" link style disabled.
        if (this.currentPage >= this.lastPage) {
            return this.getDisabledTextWrapper(text);
        } else {
            return this.getLinkTextWrapper(this.getLinks(this.currentPage + 1, text));
        }
    };

    dPaginator.prototype.getPrevious = function (text) {
        if (typeof text === "undefined") { text = '&laquo;'; }
        if (this.currentPage <= 1) {
            return this.getDisabledTextWrapper(text);
        } else {
            return this.getLinkTextWrapper(this.getLinks(this.currentPage - 1, text));
        }
        return text;
    };

    dPaginator.prototype.getLinkTextWrapper = function (link) {
        return '<li>' + link + '</li>';
    };

    /**
    *Get HTML wrapper for disabled text.
    * @param text
    * @returns {string}
    */
    dPaginator.prototype.getDisabledTextWrapper = function (text) {
        return '<li class="disabled"><span>' + text + '</span></li>';
    };

    /**
    * Get HTML wrapper for active text.
    *
    * @param  string  $text
    * @return string
    */
    dPaginator.prototype.getActivePageWrapper = function (text) {
        return '<li class="active"><span>' + text + '</span></li>';
    };

    dPaginator.prototype.getPageRange = function (start, end) {
        var pages = '';

        for (var page = start; page <= end; page++) {
            if (page == this.currentPage) {
                pages += this.getActivePageWrapper(page.toString());
            } else {
                pages += this.getLinkTextWrapper(this.getLinks(page));
            }
        }

        return pages;
    };

    dPaginator.prototype.getPageSlider = function () {
        var window = 6;

        // If the current page is very close to the beginning of the page range, we will
        // just render the beginning of the page range, followed by the last 2 of the
        // links in this list, since we will not have room to create a full slider.
        if (this.currentPage <= window) {
            var ending = this.getFinish();

            return this.getPageRange(1, window + 2) + ending;
        }

        // If the current page is close to the ending of the page range we will just get
        // this first couple pages, followed by a larger window of these ending pages
        // since we're too close to the end of the list to create a full on slider.
        if (this.currentPage >= this.lastPage - window) {
            var start = this.lastPage - 8;

            var content = this.getPageRange(start, this.lastPage);

            return this.getStart() + content;
        } else {
            var content = this.getAdjacentRange();

            return this.getStart() + content + this.getFinish();
        }
    };
    dPaginator.prototype.getAdjacentRange = function () {
        return this.getPageRange(this.currentPage - 3, this.currentPage + 3);
    };

    dPaginator.prototype.getStart = function () {
        var content = this.getPageRange(1, 2);
        return content + this.getDots();
    };

    dPaginator.prototype.getFinish = function () {
        var content = this.getPageRange(this.lastPage - 1, this.lastPage);

        return this.getDots() + content;
    };

    dPaginator.prototype.getDots = function () {
        return this.getDisabledTextWrapper('...');
    };
    dPaginator.prototype.getLinks = function (page, text) {
        if (typeof text === "undefined") { text = ''; }
        var attr = this.getAttributes(page);
        return '<a ' + attr + ' >' + (text == '' ? page.toString() : text) + '</a>';
    };

    dPaginator.prototype.getAttributes = function (page) {
        return this.attributes.replace(/:page:/gi, page);
    };

    dPaginator.prototype.setAttributes = function (attrs) {
        this.attributes = attrs;
    };

    dPaginator.prototype.calculateLastPages = function () {
        this.lastPage = Math.ceil(this.total / this.perPage);
    };
    return dPaginator;
})();

