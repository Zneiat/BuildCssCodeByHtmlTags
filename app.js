/** github.com/Zneiat **/
window.BuildCssCodeByHtmlTags = {
    work: function (htmlCodeStr) {
        htmlCodeStr = htmlCodeStr || '';
        var dom = $(htmlCodeStr);
        var resultString = '';

        var adder = function (dom) {
            resultString += BuildCssCodeByHtmlTags.getSelectorByElem(dom) + ' {}\n\n';
        };
        var mining = function (doms) {
            if (doms.length <= 0) {
                return;
            }

            $.each(doms, function (index, item) {
                adder($(item)[0]);

                mining($(item).children());
            });
        };

        adder(dom[0]);
        mining(dom.children());

        return $.trim(resultString);
    },
    getSelectorByElem: function (element) {
        var pieces = [];

        for (; element && element.tagName !== undefined; element = element.parentNode) {
            if (element.className) {
                var classes = element.className.split(' ');
                for (var i in classes) {
                    if (classes.hasOwnProperty(i) && classes[i]) {
                        pieces.unshift(classes[i]);
                        pieces.unshift('.');
                    }
                }
            }
            if (element.id && !/\s/.test(element.id)) {
                pieces.unshift(element.id);
                pieces.unshift('#');
            }
            pieces.unshift(element.tagName.toLowerCase());
            pieces.unshift(' > ');
        }

        return pieces.slice(1).join('');
    }
};