/*
 * Autocomplete - jQuery plugin 1.0.2
 *
 * Copyright (c) 2007 Dylan Verheul, Dan G. Switzer, Anjesh Tuladhar, JÃ¶rn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.autocomplete.js 5747 2008-06-25 18:30:55Z joern.zaefferer $
 *
 */
;
(function ($) {
    $.fn.extend({
            autocomplete: function (b, d) {
                var c = typeof b == "string";
                d = $.extend({}, $.Autocompleter.defaults, {
                        url: c ? b : null,
                        data: c ? null : b,
                        delay: c ? $.Autocompleter.defaults.delay : 10,
                        max: d && !d.scroll ? 10 : 150
                    }, d);
                d.highlight = d.highlight || function (a) {
                    return a
                };
                d.formatMatch = d.formatMatch || d.formatItem;
                return this.each(function () {
                        new $.Autocompleter(this, d)
                    })
            },
            result: function (a) {
                return this.bind("result", a)
            },
            search: function (a) {
                return this.trigger("search", [a])
            },
            flushCache: function () {
                return this.trigger("flushCache")
            },
            setOptions: function (a) {
                return this.trigger("setOptions", [a])
            },
            unautocomplete: function () {
                return this.trigger("unautocomplete")
            }
        });
    $.Autocompleter = function (o, r) {
        var t = {
            UP: 38,
            DOWN: 40,
            DEL: 46,
            TAB: 9,
            RETURN: 13,
            ESC: 27,
            COMMA: 188,
            PAGEUP: 33,
            PAGEDOWN: 34,
            BACKSPACE: 8
        };
        var u = $(o).attr("autocomplete", "off").addClass(r.inputClass);
        var p;
        var m = "";
        var n = $.Autocompleter.Cache(r);
        var s = 0;
        var k;
        var h = {
            mouseDownOnSelect: false
        };
        var l = $.Autocompleter.Select(r, o, selectCurrent, h);
        var j;
        $(o.form).bind("submit.autocomplete", function () {
                if (j) {
                    j = false;
                    return false
                }
            });
        u.bind("keydown" + ".autocomplete", function (a) {
                k = a.keyCode;
                switch (a.keyCode) {
                case t.UP:
                    a.preventDefault();
                    if (l.visible()) {
                        l.prev()
                    } else {
                        onChange(0, true)
                    }
                    break;
                case t.DOWN:
                    a.preventDefault();
                    if (l.visible()) {
                        l.next()
                    } else {
                        onChange(0, true)
                    }
                    break;
                case t.PAGEUP:
                    a.preventDefault();
                    if (l.visible()) {
                        l.pageUp()
                    } else {
                        onChange(0, true)
                    }
                    break;
                case t.PAGEDOWN:
                    a.preventDefault();
                    if (l.visible()) {
                        l.pageDown()
                    } else {
                        onChange(0, true)
                    }
                    break;
                case r.multiple && $.trim(r.multipleSeparator) == "," && t.COMMA:
                case t.TAB:
                case t.RETURN:
                    if (selectCurrent()) {
                        a.preventDefault();
                        j = true;
                        return false
                    }
                    break;
                case t.ESC:
                    l.hide();
                    break;
                default:
                    clearTimeout(p);
                    p = setTimeout(onChange, r.delay);
                    break
                }
            }).focus(function () {
                s++
            }).blur(function () {
                s = 0;
                if (!h.mouseDownOnSelect) {
                    hideResults()
                }
            }).click(function () {
                if (s++ > 1 && !l.visible()) {
                    onChange(0, true)
                }
            }).bind("search", function () {
                var c = (arguments.length > 1) ? arguments[1] : null;

                function findValueCallback(q, a) {
                    var b;
                    if (a && a.length) {
                        for (var i = 0; i < a.length; i++) {
                            if (a[i].result.toLowerCase() == q.toLowerCase()) {
                                b = a[i];
                                break
                            }
                        }
                    }
                    if (typeof c == "function") c(b);
                    else u.trigger("result", b && [b.data, b.value])
                }
                $.each(trimWords(u.val()), function (i, a) {
                        request(a, findValueCallback, findValueCallback)
                    })
            }).bind("flushCache", function () {
                n.flush()
            }).bind("setOptions", function () {
                $.extend(r, arguments[1]);
                if ("data" in arguments[1]) n.populate()
            }).bind("unautocomplete", function () {
                l.unbind();
                u.unbind();
                $(o.form).unbind(".autocomplete")
            });

        function selectCurrent() {
            var b = l.selected();
            if (!b) return false;
            var v = b.result;
            m = v;
            if (r.multiple) {
                var a = trimWords(u.val());
                if (a.length > 1) {
                    v = a.slice(0, a.length - 1).join(r.multipleSeparator) + r.multipleSeparator + v
                }
                v += r.multipleSeparator
            }
            u.val(v);
            hideResultsNow();
            u.trigger("result", [b.data, b.value]);
            return true
        }

        function onChange(b, c) {
            if (k == t.DEL) {
                l.hide();
                return
            }
            var a = u.val();
            if (!c && a == m) return;
            m = a;
            a = lastWord(a);
            if (a.length >= r.minChars) {
                u.addClass(r.loadingClass);
                if (!r.matchCase) a = a.toLowerCase();
                request(a, receiveData, hideResultsNow)
            } else {
                stopLoading();
                l.hide()
            }
        };

        function trimWords(b) {
            if (!b) {
                return [""]
            }
            var d = b.split(r.multipleSeparator);
            var c = [];
            $.each(d, function (i, a) {
                    if ($.trim(a)) c[i] = $.trim(a)
                });
            return c
        }

        function lastWord(a) {
            if (!r.multiple) return a;
            var b = trimWords(a);
            return b[b.length - 1]
        }

        function autoFill(q, a) {
            if (r.autoFill && (lastWord(u.val()).toLowerCase() == q.toLowerCase()) && k != t.BACKSPACE) {
                u.val(u.val() + a.substring(lastWord(m).length));
                $.Autocompleter.Selection(o, m.length, m.length + a.length)
            }
        };

        function hideResults() {
            clearTimeout(p);
            p = setTimeout(hideResultsNow, 200)
        };

        function hideResultsNow() {
            var c = l.visible();
            l.hide();
            clearTimeout(p);
            stopLoading();
            if (r.mustMatch) {
                u.search(function (a) {
                        if (!a) {
                            if (r.multiple) {
                                var b = trimWords(u.val()).slice(0, -1);
                                u.val(b.join(r.multipleSeparator) + (b.length ? r.multipleSeparator : ""))
                            } else u.val("")
                        }
                    })
            }
            if (c) $.Autocompleter.Selection(o, o.value.length, o.value.length)
        };

        function receiveData(q, a) {
            if (a && a.length && s) {
                stopLoading();
                l.display(a, q);
                autoFill(q, a[0].value);
                l.show()
            } else {
                hideResultsNow()
            }
        };

        function request(f, d, g) {
            if (!r.matchCase) f = f.toLowerCase();
            var e = n.load(f);
            if (e && e.length) {
                d(f, e)
            } else if ((typeof r.url == "string") && (r.url.length > 0)) {
                var c = {
                    timestamp: +new Date()
                };
                $.each(r.extraParams, function (a, b) {
                        c[a] = typeof b == "function" ? b() : b
                    });
                $.ajax({
                        mode: "abort",
                        port: "autocomplete" + o.name,
                        dataType: r.dataType,
                        url: r.url,
                        data: $.extend({
                                q: lastWord(f),
                                limit: r.max
                            }, c),
                        success: function (a) {
                            var b = r.parse && r.parse(a) || parse(a);
                            n.add(f, b);
                            d(f, b)
                        }
                    })
            } else {
                l.emptyList();
                g(f)
            }
        };

        function parse(c) {
            var d = [];
            var b = c.split("\n");
            for (var i = 0; i < b.length; i++) {
                var a = $.trim(b[i]);
                if (a) {
                    a = a.split("|");
                    d[d.length] = {
                        data: a,
                        value: a[0],
                        result: r.formatResult && r.formatResult(a, a[0]) || a[0]
                    }
                }
            }
            return d
        };

        function stopLoading() {
            u.removeClass(r.loadingClass)
        }
    };
    $.Autocompleter.defaults = {
        inputClass: "ac_input",
        resultsClass: "ac_results",
        loadingClass: "ac_loading",
        minChars: 1,
        delay: 400,
        matchCase: false,
        matchSubset: true,
        matchContains: false,
        cacheLength: 10,
        max: 100,
        mustMatch: false,
        extraParams: {},
        selectFirst: true,
        formatItem: function (a) {
            return a[0]
        },
        formatMatch: null,
        autoFill: false,
        width: 0,
        multiple: false,
        multipleSeparator: ", ",
        highlight: function (b, a) {
            return b.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + a.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>")
        },
        scroll: true,
        scrollHeight: 180
    };
    $.Autocompleter.Cache = function (g) {
        var h = {};
        var j = 0;

        function matchSubset(s, a) {
            if (!g.matchCase) s = s.toLowerCase();
            var i = s.indexOf(a);
            if (i == -1) return false;
            return i == 0 || g.matchContains
        };

        function add(q, a) {
            if (j > g.cacheLength) {
                flush()
            }
            if (!h[q]) {
                j++
            }
            h[q] = a
        }

        function populate() {
            if (!g.data) return false;
            var f = {}, nullData = 0;
            if (!g.url) g.cacheLength = 1;
            f[""] = [];
            for (var i = 0, ol = g.data.length; i < ol; i++) {
                var c = g.data[i];
                c = (typeof c == "string") ? [c] : c;
                var d = g.formatMatch(c, i + 1, g.data.length);
                if (d === false) continue;
                var e = d.charAt(0).toLowerCase();
                if (!f[e]) f[e] = [];
                var b = {
                    value: d,
                    data: c,
                    result: g.formatResult && g.formatResult(c) || d
                };
                f[e].push(b);
                if (nullData++ < g.max) {
                    f[""].push(b)
                }
            };
            $.each(f, function (i, a) {
                    g.cacheLength++;
                    add(i, a)
                })
        }
        setTimeout(populate, 25);

        function flush() {
            h = {};
            j = 0
        }
        return {
            flush: flush,
            add: add,
            populate: populate,
            load: function (q) {
                if (!g.cacheLength || !j) return null;
                if (!g.url && g.matchContains) {
                    var a = [];
                    for (var k in h) {
                        if (k.length > 0) {
                            var c = h[k];
                            $.each(c, function (i, x) {
                                    if (matchSubset(x.value, q)) {
                                        a.push(x)
                                    }
                                })
                        }
                    }
                    return a
                } else if (h[q]) {
                    return h[q]
                } else if (g.matchSubset) {
                    for (var i = q.length - 1; i >= g.minChars; i--) {
                        var c = h[q.substr(0, i)];
                        if (c) {
                            var a = [];
                            $.each(c, function (i, x) {
                                    if (matchSubset(x.value, q)) {
                                        a[a.length] = x
                                    }
                                });
                            return a
                        }
                    }
                }
                return null
            }
        }
    };
    $.Autocompleter.Select = function (e, g, f, k) {
        var h = {
            ACTIVE: "ac_over"
        };
        var j, active = -1,
            data, term = "",
            needsInit = true,
            element, list;

        function init() {
            if (!needsInit) return;
            element = $("<div/>").hide().addClass(e.resultsClass).css("position", "absolute").appendTo(document.body);
            list = $("<ul/>").appendTo(element).mouseover(function (a) {
                    if (target(a).nodeName && target(a).nodeName.toUpperCase() == 'LI') {
                        active = $("li", list).removeClass(h.ACTIVE).index(target(a));
                        $(target(a)).addClass(h.ACTIVE)
                    }
                }).click(function (a) {
                    $(target(a)).addClass(h.ACTIVE);
                    f();
                    g.focus();
                    return false
                }).mousedown(function () {
                    k.mouseDownOnSelect = true
                }).mouseup(function () {
                    k.mouseDownOnSelect = false
                });
            if (e.width > 0) element.css("width", e.width);
            needsInit = false
        }

        function target(a) {
            var b = a.target;
            while (b && b.tagName != "LI") b = b.parentNode;
            if (!b) return [];
            return b
        }

        function moveSelect(b) {
            j.slice(active, active + 1).removeClass(h.ACTIVE);
            movePosition(b);
            var a = j.slice(active, active + 1).addClass(h.ACTIVE);
            if (e.scroll) {
                var c = 0;
                j.slice(0, active).each(function () {
                        c += this.offsetHeight
                    });
                if ((c + a[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
                    list.scrollTop(c + a[0].offsetHeight - list.innerHeight())
                } else if (c < list.scrollTop()) {
                    list.scrollTop(c)
                }
            }
        };

        function movePosition(a) {
            active += a;
            if (active < 0) {
                active = j.size() - 1
            } else if (active >= j.size()) {
                active = 0
            }
        }

        function limitNumberOfItems(a) {
            return e.max && e.max < a ? e.max : a
        }

        function fillList() {
            list.empty();
            var b = limitNumberOfItems(data.length);
            for (var i = 0; i < b; i++) {
                if (!data[i]) continue;
                var a = e.formatItem(data[i].data, i + 1, b, data[i].value, term);
                if (a === false) continue;
                var c = $("<li/>").html(e.highlight(a, term)).addClass(i % 2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
                $.data(c, "ac_data", data[i])
            }
            j = list.find("li");
            if (e.selectFirst) {
                j.slice(0, 1).addClass(h.ACTIVE);
                active = 0
            }
            if ($.fn.bgiframe) list.bgiframe()
        }
        return {
            display: function (d, q) {
                init();
                data = d;
                term = q;
                fillList()
            },
            next: function () {
                moveSelect(1)
            },
            prev: function () {
                moveSelect(-1)
            },
            pageUp: function () {
                if (active != 0 && active - 8 < 0) {
                    moveSelect(-active)
                } else {
                    moveSelect(-8)
                }
            },
            pageDown: function () {
                if (active != j.size() - 1 && active + 8 > j.size()) {
                    moveSelect(j.size() - 1 - active)
                } else {
                    moveSelect(8)
                }
            },
            hide: function () {
                element && element.hide();
                j && j.removeClass(h.ACTIVE);
                active = -1
            },
            visible: function () {
                return element && element.is(":visible")
            },
            current: function () {
                return this.visible() && (j.filter("." + h.ACTIVE)[0] || e.selectFirst && j[0])
            },
            show: function () {
                var a = $(g).offset();
                element.css({
                        width: typeof e.width == "string" || e.width > 0 ? e.width : $(g).width(),
                        top: a.top + g.offsetHeight,
                        left: a.left
                    }).show();
                if (e.scroll) {
                    list.scrollTop(0);
                    list.css({
                            maxHeight: e.scrollHeight,
                            overflow: 'auto'
                        });
                    if (typeof document.body.style.maxHeight === "undefined") {
                        var c = 0;
                        j.each(function () {
                                c += this.offsetHeight
                            });
                        var b = c > e.scrollHeight;
                        list.css('height', b ? e.scrollHeight : c);
                        if (!b) {
                            j.width(list.width() - parseInt(j.css("padding-left")) - parseInt(j.css("padding-right")))
                        }
                    }
                }
            },
            selected: function () {
                var a = j && j.filter("." + h.ACTIVE).removeClass(h.ACTIVE);
                return a && a.length && $.data(a[0], "ac_data")
            },
            emptyList: function () {
                list && list.empty()
            },
            unbind: function () {
                element && element.remove()
            }
        }
    };
    $.Autocompleter.Selection = function (b, a, c) {
        if (b.createTextRange) {
            var d = b.createTextRange();
            d.collapse(true);
            d.moveStart("character", a);
            d.moveEnd("character", c);
            d.select()
        } else if (b.setSelectionRange) {
            b.setSelectionRange(a, c)
        } else {
            if (b.selectionStart) {
                b.selectionStart = a;
                b.selectionEnd = c
            }
        }
        b.focus()
    }
})(jQuery);