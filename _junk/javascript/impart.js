(function(h) {
    var d = function(c, a) {
        return new d.init(c,a)
    }
      , b = h.document
      , a = null
      , k = !1
      , f = []
      , c = /^#([\w-]+)$/;
    h.wisDOM = d;
    if (typeof h.$ == "undefined" || h.$._wdVersion <= 2.0111031151E7)
        h.$ = h.wisDOM;
    h.$w = d;
    d.init = function(f, e) {
        if (!f)
            return this.length = 0,
            this;
        if (f.nodeType)
            return this[0] = f,
            this.length = 1,
            this;
        if (typeof f == "string") {
            if (f == "body")
                return a === null && (a = b.getElementsByTagName("body")[0]),
                this[0] = a,
                this.length = 1,
                this;
            var k = c.exec(f);
            if (k !== null ) {
                k = b.getElementById(k[1]);
                this.length = 0;
                if (k !== null )
                    this[0] = k,
                    this.length = 1;
                this.selector = f;
                return this
            }
            var k = h.wisDOM._int.selectorEngine.search(f)
              , m = k.length;
            this.length = m;
            for (var n = 0; n < m; n++)
                this[n] = k[n];
            return this
        }
        if (typeof f == "object") {
            if (typeof f._wdVersion !== "undefined")
                return f;
            if (f === h || f === b)
                return this[0] = f,
                this.length = 1,
                this;
            if (typeof f._wdVersion == "undefined") {
                k = d._int.dombuilder(f);
                this.length = k.length;
                this._constructed = 1;
                m = k.length;
                for (n = 0; n < m; n++)
                    this[n] = k[n];
                return this
            }
        }
        if (typeof f == "function")
            if (typeof e !== "number")
                d.ready(f);
            else if (typeof e == "number")
                return setTimeout(function() {
                    return f()
                }, e)
    }
    ;
    d.fn = {};
    d.init.prototype = d.fn;
    d._wdVersion = d.fn._wdVersion = 2.0111031151E7;
    d._int = {};
    d.push = d.fn.push = function(c) {

        var a = this.length;
        c.nodeType && (this[a] = c,
        this.length++);
        if (typeof c._wdVersion != "undefined") {
            for (var f = a + c.length, e = a; e < f; e++)
                this[e] = c[e - a];
            this.length = f
        }
        return this
    }
    ;
    d.fn.splice = function() {
        return this
    }
    ;
    d.ready = function(c) {
        k === !0 || b.readyState == "complete" ? c.call(h) : b.addEventListener ? b.addEventListener("DOMContentLoaded", c, !1) : b.attachEvent && f.push(c)
    }
    ;
    d.ready(function() {
        k = !0
    });
    d.ready(function() {
        try {
            $(window).bind("unload", function() {
                window.wisDOM = window.$w = null ;
                if (typeof window.$._wdVersion != "undefined")
                    window.$ = null
            })
        } catch (c) {}
    });
    if (b.attachEvent) {
        var e = function() {
            try {
                b.documentElement.doScroll("left")
            } catch (c) {
                setTimeout(e, 1);
                return
            }
            k = !0;
            for (var a = f.length, d = window.document, m = window.wisDOM; a--; )
                f[a].call(d, m)
        }
        ;
        e()
    }
})(window);
(function(h) {
    var d = h.wisDOM
      , b = /(^\s*|\s*$)/g;
    d.css = d.fn.css = function(b) {
        if (typeof b == "string")
            return a.getStyle(this[0], b);
        for (var f, c, e = this.length; e--; )
            for (f in c = this[e],
            b)
                if (c && !(c.nodeType === 3 || c.nodeType === 8))
                    c.style[f] = b[f];
        return this
    }
    ;
    d.addClass = d.fn.addClass = function(a) {
        for (var f, c, e = this.length; e--; )
            if (f = this[e],
            c = f.className,
            c.indexOf(a) == -1)
                c += " " + a,
                f.className = c.replace(b, "");
        return this
    }
    ;
    d.removeClass = d.fn.removeClass = function(a) {
        for (var f, c, e = this.length, g = RegExp(a, "g"); e--; )
            if (f = this[e],
            c = f.className,
            c.indexOf(a) !== -1)
                c = c.replace(g, ""),
                f.className = c.replace(b, "");
        return this
    }
    ;
    d.toggleClass = d.fn.toggleClass = function(a) {
        for (var f, c, e = this.length, g = RegExp(a, "g"); e--; )
            f = this[e],
            c = f.className,
            c.indexOf(a) !== -1 ? c = c.replace(g, "") : c += " " + a,
            f.className = c.replace(b, "");
        return this
    }
    ;
    d.offset = d.fn.offset = function(b) {
        b = b || null ;
        if (b === null ) {
            var f = a.getPosition(this[0]);
            return {
                left: f[0],
                top: f[1]
            }
        } else {
            for (var f = this.length, c = b.left, e = b.top; f--; )
                b = this[f],
                b.style.left = c,
                b.style.top = e;
            return this
        }
    }
    ;
    d.position = d.fn.position = function() {
        if (this.length > 0) {
            var b = a.getPosition(this[0], !0);
            return {
                left: b[0],
                top: b[1]
            }
        }
        return {}
    }
    ;
    d.positionRelTo = d.fn.positionRelTo = function(b) {
        b = d(b)[0];
        if (this.length > 0)
            return b = a.getPosition(this[0], !1, b),
            {
                left: b[0],
                top: b[1]
            };
        return {}
    }
    ;
    d.width = d.fn.width = function(b) {
        b = b || null ;
        if (b === null ) {
            b = this[0];
            if (b == window)
                return a.getWindowDimensions()[0];
            if (b == window.document)
                return d("body").width();
            return this[0].offsetWidth
        } else {
            for (var f = this.length; f--; )
                this[f].style.width = b;
            return this
        }
    }
    ;
    d.height = d.fn.height = function(b) {
        b = b || null ;
        if (b === null ) {
            b = this[0];
            if (b == window)
                return a.getWindowDimensions()[1];
            if (b == window.document)
                return d("body").height();
            return this[0].offsetHeight
        } else {
            for (var f = this.length; f--; )
                this[f].style.height = b;
            return this
        }
    }
    ;
    var a = function() {}
    ;
    a.getWindowDimensions = function() {
        if (typeof window.innerWidth !== "undefined")
            return [window.innerWidth, window.innerHeight];
        if (typeof document.documentElement.clientWidth !== "undefined")
            return [document.documentElement.clientWidth, document.documentElement.clientHeight];
        var a = document.getElementsByTagName("body")[0];
        return [a.clientWidth, a.clientHeight]
    }
    ;
    a.getPosition = function(a, f, c) {
        var e = 0
          , g = 0
          , b = a;
        if (b.offsetParent) {
            do
                e += b.offsetLeft,
                g += b.offsetTop,
                b = b.offsetParent;
            while (b !== null )
        } else
            e += b.offsetLeft,
            g += b.offsetTop;
        if (f)
            a = a.parentNode,
            e -= a.offsetLeft,
            g -= a.offsetTop;
        if (typeof c !== "undefined" && c !== window && c !== document) {
            a = c.offsetLeft;
            f = c.offsetTop;
            if (c.offsetParent)
                for (; c !== null ; )
                    c = c.offsetParent,
                    c !== null && (a += c.offsetLeft,
                    f += c.offsetTop);
            e -= a;
            g -= f
        }
        return [e, g]
    }
    ;
    a.getStyle = function(a, f) {
        if (typeof a == "undefined")
            return "";
        if (a.style[f])
            return a.style[f];
        else if (a.currentStyle)
            return a.currentStyle[f];
        else if (document.defaultView && document.defaultView.getComputedStyle) {
            var f = f.replace(/([A-Z])/g, "-$1")
              , f = f.toLowerCase()
              , c = document.defaultView.getComputedStyle(a, "")
              , e = c && c.getPropertyValue(f)
              , c = /.*\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\).*/i.exec(e);
            if (c === null )
                return e;
            var e = parseInt(c[1], 10).toString(16)
              , g = parseInt(c[2], 10).toString(16)
              , c = parseInt(c[3], 10).toString(16);
            e.length < 2 && (e = "0" + e);
            g.length < 2 && (g = "0" + g);
            c.length < 2 && (c = "0" + c);
            return "#" + e + g + c
        } else
            return ""
    }
})(window);
(function(h) {
    var d = h.wisDOM
      , b = h.document;
    d._int.dombuilder = function(d) {
        var f = b.createDocumentFragment();
        a.create_dom(f, d);
        d = b.createElement("div");
        d.appendChild(f);
        return d.childNodes
    }
    ;
    var a = function() {}
    ;
    a.create_dom = function(b, f) {
        if (f.constructor == Array) {
            for (var c = f.length, e = 0; e < c; e++)
                a.create_dom(b, f[e]);
            f._attr && a.specials("_attr", f, b);
            f._events && a.specials("_events", f, b);
            f._data && a.specials("_data", f, b)
        } else
            for (c in f) {
                if (f.hasOwnProperty(c) && c !== "_attr" && c !== "_events" && c !== "_data") {
                    var e = null
                      , g = !1
                      , e = a.create_element(c, f[c]);
                    e === !1 && (e = document.createTextNode(f[c]),
                    g = !0);
                    b.appendChild(e);
                    typeof f[c] == "object" ? a.create_dom(e, f[c]) : g === !1 && (g = typeof f[c] !== "undefined" ? f[c].toString() : "",
                    g !== "" && (g = document.createTextNode(g),
                    e.appendChild(g)))
                }
                a.specials(c, f, b)
            }
    }
    ;
    a.specials = function(b, f, c) {
        b == "_attr" && a.setAttributes(c, f[b]);
        if (b == "_events") {
            var e = f[b], g;
            for (g in e)
                e.hasOwnProperty(g) && d(c).bind(g, e[g])
        }
        if (b == "_data" && (b = f[b],
        typeof b == "object"))
            c._data = b
    }
    ;
    a.create_element = function(b, f) {
        var c = /^(\d+[a-z]*\s+)*([a-z]+[a-z1-6]*)(\#{1}([a-zA-Z0-9-_]+))*(\.{1}([a-zA-Z0-9-_\s]+))*(\#{1}([a-zA-Z0-9-_]+))*(\[{1}(.+)\]{1}$)*/.exec(b);
        if (c === null )
            return !1;
        var e = c[2]
          , g = c[4] || c[8]
          , d = c[6];
        if (c = c[10])
            for (var c = c.replace(/(\[|\])/g, ""), c = c.replace(/\s*,\s*/g, ","), c = c.split(","), j = 0; j < c.length; j++)
                c[j] = c[j].split("=");
        if (e) {
            j = document.createElement(e);
            if (typeof f !== "undefined" && typeof f._attr !== "undefined" && typeof f._attr.type !== "undefined") {
                j = document.createElement(e);
                try {
                    j.type = f._attr.type
                } catch (m) {}
            }
            c && a.setAttributes(j, c);
            if (g)
                j.id = g;
            if (d)
                j.className = d;
            return j
        }
        return !1
    }
    ;
    a.setAttributes = function(a, f) {
        if (f.constructor.toString().indexOf("Array") !== -1)
            for (var c = 0; c < f.length; c++) {
                if (f[c][0] == "colspan" || f[c][0] == "rowspan")
                    f[c][0] = f[c][0].replace(/span/, "Span");
                a.setAttribute(f[c][0], f[c][1])
            }
        else
            for (c in f)
                if (f.hasOwnProperty(c)) {
                    var e = c.replace(/span/, "Span");
                    e.toLowerCase() == "class" && (a.setAttribute("class", f[c]),
                    a.setAttribute("className", f[c]));
                    if (e.toLowerCase() == "style")
                        a.style.cssText = f[c];
                    else if (e.toLowerCase() == "type")
                        try {
                            a.setAttribute(e, f[c])
                        } catch (b) {}
                    else
                        a.setAttribute(e, f[c])
                }
    }
})(window);
(function(h) {
    var d = h.wisDOM;
    d.appendTo = d.fn.appendTo = function(a) {
        a = b.objTest(a);
        this.append.call(a, this);
        return this
    }
    ;
    d.prependTo = d.fn.prependTo = function(a) {
        a = b.objTest(a);
        this.prepend.call(a, this);
        return this
    }
    ;
    d.append = d.fn.append = function(a) {
        var d = this.length, f, c, e, g = b.objTest, a = g(a), l = b.cloneNode;
        for (c = 0; c < d; c++) {
            f = this[c];
            e = d > 1 ? l(a) : g(a);
            var j = e.length, m;
            for (m = 0; m < j; m++)
                f.appendChild(e[m])
        }
        return this
    }
    ;
    d.prepend = d.fn.prepend = function(a) {
        var d = this.length, f, c, e, g = b.objTest, a = g(a), l = b.cloneNode;
        for (c = 0; c < d; c++) {
            f = this[c];
            e = d > 1 ? l(a) : g(a);
            var j = e.length, m;
            for (m = 0; m < j; m++)
                f.insertBefore(e[m], f.firstChild)
        }
        return this
    }
    ;
    d.insertAfter = d.fn.insertAfter = function(a) {
        var d = b.objTest, a = d(a), f = a.length, c, e, g, l = b.cloneNode;
        for (e = 0; e < f; e++) {
            c = a[e];
            g = f > 1 ? l(this) : d(this);
            var j = g.length, m;
            for (m = 0; m < j; m++)
                c.parentNode.insertBefore(g[m], c),
                c.parentNode.insertBefore(c, g[m])
        }
        return this
    }
    ;
    d.insertBefore = d.fn.insertBefore = function(a) {
        var d = b.objTest, a = d(a), f = a.length, c, e, g, l = b.cloneNode;
        for (e = 0; e < f; e++) {
            c = a[e];
            g = f > 1 ? l(this) : d(this);
            var j = g.length, m;
            for (m = 0; m < j; m++)
                c.parentNode.insertBefore(g[m], c)
        }
        return this
    }
    ;
    d.remove = d.fn.remove = d.detach = d.fn.detach = function() {
        for (var a, b = this.length; b--; )
            a = this[b],
            a.parentNode !== null && a.parentNode.removeChild(a);
        return this
    }
    ;
    d.empty = d.fn.empty = function() {
        for (var a = this.length, b; a--; ) {
            b = this[a];
            for (var f = b.childNodes.length, c = b.childNodes; f--; )
                b.removeChild(c[f])
        }
        return this
    }
    ;
    d.clone = d.fn.clone = function() {
        return b.cloneNode(this)
    }
    ;
    var b = function() {}
    ;
    b.objTest = function(a) {
        if (typeof a == "string" || typeof a == "object" && typeof a._wdVersion == "undefined")
            a = d(a);
        return a
    }
    ;
    b.cloneNode = function(a) {
        var b, f = a.length, c = d(""), e = d._int.browser.app;
        for (b = 0; b < f; b++) {
            var g;
            if (e == "MSIE") {
                g = a[b].outerHTML || a[b].nodeValue;
                var l = d({
                    div: ""
                });
                l.html(g);
                g = l[0].firstChild
            } else
                g = a[b].cloneNode(!0);
            c[b] = g
        }
        c.length = f;
        return c
    }
})(window);
(function(h) {
    var d = h.wisDOM;
    d.next = d.fn.next = function() {
        for (var a = this.length, k = [], f = d(""), c = function(a) {
            if (a.nextElementSibling)
                return a.nextElementSibling;
            do
                if (a = a.nextSibling,
                a === null || typeof a == "undefined")
                    return !1;
            while (a.nodeType !== 1);return a
        }
        , e = 0; e < a; e++) {
            var g = c(this[e]);
            g !== !1 && k.push(g)
        }
        return b(f, k)
    }
    ;
    d.prev = d.fn.prev = function() {
        for (var a = this.length, k = [], f = d(""), c = function(a) {
            if (a.previousElementSibling)
                return a.previousElementSibling;
            g = a;
            do
                if (g = g.previousSibling,
                g === null || typeof g == "undefined")
                    return !1;
            while (g.nodeType !== 1);return g
        }
        , e = 0; e < a; e++) {
            var g = c(this[e]);
            g !== !1 && k.push(g)
        }
        return b(f, k)
    }
    ;
    d.children = d.fn.children = function() {
        function a(a) {
            if (typeof a.children !== "undefined")
                return a.children;
            for (var a = a.childNodes, c = a.length, f = [], e = 0; e < c; e++)
                a[e].nodeType == 1 && f.push(a[e]);
            return f
        }
        var k = this.length, f, c = d(""), e = [];
        for (f = 0; f < k; f++)
            for (var g = a(this[f]), l = g.length, j = 0; j < l; j++)
                e.push(g[j]);
        return b(c, e)
    }
    ;
    d.parent = d.fn.parent = function() {
        for (var a = this.length, k = [], f = d(""), c = 0; c < a; c++) {
            var e = this[c].parentNode;
            typeof e !== "undefined" && e !== null && k.push(e)
        }
        return b(f, k)
    }
    ;
    d.parents = d.fn.parents = function(a) {
        for (var k = d(""), f = [], c = this.length, e = document.body; c--; ) {
            var g = this[c].parentNode;
            do {
                for (var l = f.length, j = !1; l--; )
                    f[l] == g && (j = !0);
                j || f.push(g);
                g = g.parentNode
            } while (g !== null && g !== e)
        }
        f.push(e);
        f.push(e.parentNode);
        if (typeof a !== "undefined" && typeof a == "string") {
            c = d._int.selectorEngine;
            e = [];
            for (g = f.length; g--; )
                c(a).match(f[g]) && e.push(f[g]);
            f = e
        }
        return b(k, f)
    }
    ;
    d.closest = d.fn.closest = function(a) {
        var k = d("");
        if (typeof a == "undefined" || a === "")
            return k;
        for (var f = [], c = this.length, e = d._int.selectorEngine, g = function(c) {
            c = c.parentNode;
            if (c === null || c == document)
                return !1;
            return e(a).match(c) === !0 ? c : g(c)
        }
        , l = 0; l < c; l++) {
            var j = g(this[l]);
            j !== !1 && f.push(j)
        }
        return b(k, f)
    }
    ;
    d.find = d.fn.find = function(a) {
        var k = d._int.selectorEngine, f = d(""), c = [], e = this.length, g, l, j, m;
        for (g = 0; g < e; g++) {
            l = this[g];
            l = k(a).search(l);
            j = l.length;
            for (m = 0; m < j; m++)
                c.push(l[m])
        }
        return b(f, c)
    }
    ;
    var b = function(a, b) {
        for (var f = b.length, c = 0; c < f; c++)
            a[c] = b[c];
        a.length = f;
        return a
    }
})(window);
(function(h) {
    var d = h.wisDOM
      , b = {}
      , a = [];
    d.bind = d.fn.bind = function(a, c) {
        for (var e = k.namespace(a), b = this.length, d, j, m = k.generateID, n = k.setupElement, o = k.attachEvent; b--; )
            d = this[b],
            j = m(a),
            n(d, j, e, c),
            o(d, j);
        return this
    }
    ;
    d.unbind = d.fn.unbind = function(a) {
        for (var a = k.namespace(a), c = k.removeEvent, e = this.length, b; e--; )
            b = this[e],
            c(b, a);
        return this
    }
    ;
    d.trigger = d.fn.trigger = function(a, c) {
        for (var e = k.namespace(a), b = k.triggerEvent, d = this.length, j; d--; )
            j = this[d],
            b(j, e, c);
        return this
    }
    ;
    var k = function() {}
    ;
    k.namespace = function(a) {
        var a = a.split(".")
          , c = a[0]
          , e = null ;
        a.length > 1 && (e = a[1]);
        return {
            ev: c,
            ns: e
        }
    }
    ;
    k.setupElement = function(f, c, e, b) {
        if (typeof f._wdEV == "undefined")
            f._wdEV = {};
        f._wdEV[c] = {
            event: e.ev,
            name: e.ns,
            fn: b
        };
        a.push(f)
    }
    ;
    k.generateID = function(a) {
        var c, e;
        do
            c = Math.round(Math.random() * a.length * 100),
            e = Math.round(Math.random() * 1E8),
            c = "ev_" + c + "_" + e;
        while (typeof b[c] !== "undefined");b[c] = 1;
        return c
    }
    ;
    k.triggerEvent = function(a, c, e) {
        var b = c.ev, c = c.ns, d = a._wdEV, k, m = {};
        m.target = a;
        typeof e != "undefined" && (m.data = e);
        for (k in d)
            e = d[k],
            (e.name === c && b == e.event || c === null && b == e.event) && e.fn.call(a, m)
    }
    ;
    k.attachEvent = function(a, c) {
        var e = a._wdEV[c]
          , b = e.fn
          , d = e.event;

        e.stored = function(c) {
            if (!c)
                c = window.event;
            c = k.formatEvent(c);
            b.apply(a, [c])
        }
        ;
        e = e.stored;
        a.addEventListener ? a.addEventListener(d, e, !1) : a.attachEvent && a.attachEvent("on" + d, e)
    }
    ;
    k.removeEvent = function(a, c) {
        var e = c.ev, b = c.ns, d = a._wdEV, j, m, n = k.detachEvent;
        for (j in d)
            if (m = d[j],
            m.name === b && e == m.event || b === null )
                n(a, e, m.stored),
                delete d[j];
        var e = 0, o;
        for (o in d)
            d.hasOwnProperty(o) && e++;
        if (e === 0)
            try {
                delete a._wdEV
            } catch (w) {
                a._wdEV = void 0
            }
    }
    ;
    k.detachEvent = function(a, c, e) {
        a.removeEventListener ? a.removeEventListener(c, e, !1) : a.detachEvent && a.detachEvent("on" + c, e)
    }
    ;
    k.formatEvent = function(a) {
        var c = {}, e;
        for (e in a)
            c[e] = a[e];
        if (!c.target)
            c.target = c.srcElement;
        if (c.target === null )
            c.target = window;
        if (c.target.nodeType == 3)
            c.target = c.target.parentNode;
        return c
    }
    ;
    d(function() {
        try {
            d(window).bind("unload", function() {
                for (var c = a.length; c--; )
                    a[c]._wdEV = null
            })
        } catch (b) {}
    })
})(window);
(function(h) {
    var d = h.wisDOM
      , b = h.document
      , a = null
      , k = {};
    d.getJSON = function(a, e) {
        return f.init(a, e)
    }
    ;
    var f = function() {}
    ;
    f.init = function(a, e) {
        if (typeof a == "undefined" || typeof e == "undefined")
            return !1;
        var b = "json" + d._int.generateID()
          , k = f.timeStamp();
        f.setupCallback(b, e);
        a += "&_=" + k;
        a.indexOf("callback=?") == -1 ? a += "&callback=" + b : a = a.replace(/callback=\?/, "callback=" + b);
        return f.attachScript(a, b, e)
    }
    ;
    f.setupCallback = function(a, b) {
        h[a] = k[a] = function(g) {
            h.navigator.appName == "Microsoft Internet Explorer" && (h[a + "-callback-triggered"] = !0);
            b(g);
            f.postLoadCleanUp(a)
        }
    }
    ;
    f.postLoadCleanUp = function(c) {
        setTimeout(function() {
            try {
                a.removeChild(b.getElementById(c)),
                h[c] = k[c] = void 0
            } catch (e) {}
            try {
                delete h[c],
                delete k[c]
            } catch (f) {}
        }, 0)
    }
    ;
    f.timeStamp = function() {
        return (new Date).valueOf() + "-" + Math.round(Math.random() * 1E3)
    }
    ;
    f.attachScript = function(c, e, g) {
        a === null && (a = b.getElementsByTagName("head")[0]);
        var d = b.createElement("script");
        d.setAttribute("type", "text/javascript");
        d.setAttribute("id", e);
        d.setAttribute("async", "");
        d.setAttribute("defer", "");
        d.setAttribute("src", c);
        h.navigator.appName == "Microsoft Internet Explorer" ? d.onreadystatechange = function() {
            this.readyState && this.readyState == "loaded" && window.setTimeout(function() {
                typeof h[e + "-callback-triggered"] == "undefined" && g({
                    error: !0,
                    event: {}
                });
                h[e + "called"] = void 0;
                try {
                    delete h[e + "called"]
                } catch (a) {}
            }, 10)
        }
        : d.onerror = function(a) {
            g({
                error: !0,
                event: a
            });
            f.postLoadCleanUp(e)
        }
        ;
        d.cancel = function(a) {
            return function() {
                var c = a.id;
                h[c] = k[c] = function() {
                    f.postLoadCleanUp(c)
                }
            }
        }(d);
        setTimeout(function(c) {
            return function() {
                a.appendChild(c)
            }
        }(d), 1);
        return d
    }
})(window);
(function(h) {
    var d = h.wisDOM
      , b = h.document;
    d.html = d.fn.html = function(b) {
        b = b || null ;
        if (b !== null ) {
            for (var f = a.setHTML, c = this.length; c--; )
                f(this[c], b);
            return this
        } else
            return a.getHTML(this[0])
    }
    ;
    d.text = d.fn.text = function(b) {
        var b = b || null , f = a.getText, c = a.setText, e = this.length, g, d = "";
        for (g = 0; g < e; g++)
            b === null ? (d += f(this[g]),
            e > 1 && (d += "\n")) : c(this[g], b);
        return b === null ? d : this
    }
    ;
    d.attr = d.fn.attr = function(a, b) {
        if (typeof a == "undefined")
            return this;
        b = b || null ;
        if (b === null && typeof a !== "object") {
            if (this.length === 0)
                return "";
            return this[0].getAttribute(a)
        }
        for (var c = this.length; c--; )
            if (typeof a == "object")
                for (var e in a) {
                    if (a.hasOwnProperty(e))
                        try {
                            this[c].setAttribute(e, a[e])
                        } catch (g) {}
                }
            else
                try {
                    this[c].setAttribute(a, b)
                } catch (d) {}
        return this
    }
    ;
    d.val = d.fn.val = function(a) {
        typeof a == "undefined" && (a = null );
        var b;
        if (a === null && this.length === 0)
            return "";
        if (a === null ) {
            b = this[0].tagName.toLowerCase();
            if (b == "input" || b == "textarea") {
                a = this[0].value;
                if (typeof a !== "undefined" && a !== null )
                    return a;
                return this[0].getAttribute("value")
            }
            if (b == "select")
                return this[0].options[this[0].selectedIndex].getAttribute("value");
            return null
        } else {
            for (var c = this.length; c--; ) {
                b = this[c].tagName.toLowerCase();
                if (b == "input" || b == "textarea")
                    this[c].setAttribute("value", a),
                    this[c].value = a;
                if (b == "select") {
                    this[c].setAttribute("value", a);
                    b = this[c].options;
                    for (var e = b.length, g = e; e--; ) {
                        var d = g - (e + 1);
                        if (b[d].getAttribute("value") == a)
                            this[c].selectedIndex = d
                    }
                }
            }
            return this
        }
    }
    ;
    var a = function() {}
    ;
    a.setHTML = function(d, f) {
        a.clearOut(d);
        var c = b.createElement("div");
        c.innerHTML = f;
        var e = c.childNodes.length, g, l = c.childNodes;
        for (g = 0; g < e; g++)
            d.appendChild(l[g].cloneNode(!0));
        delete c
    }
    ;
    a.getHTML = function(b) {
        return a.whiteSpace(b.innerHTML)
    }
    ;
    a.getText = function(b) {
        return a.readNode(b)
    }
    ;
    a.setText = function(d, f) {
        a.clearOut(d);
        d.appendChild(b.createTextNode(f))
    }
    ;
    a.readNode = function(b) {
        var f = ""
          , c = a.readNode;
        if (b.nodeType == 1) {
            var b = b.childNodes, e = b.length, g;
            for (g = 0; g < e; g++)
                f += c(b[g])
        } else
            f += a.whiteSpace(b.nodeValue);
        return f
    }
    ;
    a.clearOut = function(a) {
        for (var b = a.childNodes.length, c = a.childNodes; b--; )
            a.removeChild(c[b])
    }
    ;
    a.whiteSpace = function(a) {
        return a.replace(/(\s{2,}|\n\s*\n|\t)/g, "")
    }
})(window);
(function() {
    function h(a, c, b, e) {
        return a ? e ? function(e, f) {
            return c(e, b, f) && a(e, f)
        }
        : function(e, f) {
            return a(e, f) && c(e, b, f)
        }
        : function(a, e) {
            return c(a, b, e)
        }
    }
    var d = {}
      , b = function(a, c, e, f) {
        a = typeof a == "string" ? a.replace(/^\s+|\s+$/, "") : "";
        a = d[a] || (d[a] = new b.initialize(a));
        return c == null ? a : a.search(c, e, f)
    }
    ;
    b.initialize = function(a) {
        this.text = a
    }
    ;
    var a;
    a = b.initialize.prototype = b.prototype;
    b.implement = function(a, c) {
        for (var e in c)
            b[a][e] = c[e]
    }
    ;
    var k;
    k = b.support = {};
    (function() {
        var a = document.createElement("div")
          , c = (new Date).getTime();
        a.innerHTML = '<a name="' + c + '" class="\u20ac b"></a>';
        a.appendChild(document.createComment(""));
        k.byTagAddsComments = a.getElementsByTagName("*").length > 1;
        k.hasQsa = !(!a.querySelectorAll || !a.querySelectorAll(".\u20ac").length);
        var b;
        !a.getElementsByClassName || !a.getElementsByClassName("b").length ? b = !1 : (a.firstChild.className = "c",
        b = a.getElementsByClassName("c").length == 1);
        k.hasByClass = b;
        b = document.documentElement;
        b.insertBefore(a, b.firstChild);
        k.byIdAddsName = !!document.getElementById(c);
        b.removeChild(a)
    })();
    var f = function() {
        return !0
    }
    ;
    a.search = function(a, c, e) {
        var e = e || {}, g, n, d;
        if (a) {
            if (a.nodeType != 1 && a.nodeType != 9)
                if (typeof a == "string")
                    a = b.search(a),
                    g = !0;
                else if (Object.prototype.toString.call(a) == "[object Array]" || typeof a.length == "number" && a.item) {
                    var o = [];
                    for (n = 0; d = a[n]; n++)
                        (d.nodeType == 1 || d.nodeType == 9) && o.push(d);
                    a = (g = o.length > 1) ? o : o[0] || document
                }
        } else
            a = document;
        var m, l, o = {}, s = {}, u = o, j = b.getUid, w = function(a) {
            a = j(a);
            return u[a] ? null : u[a] = !0
        }
        ;
        if (c && c.length)
            for (n = 0; d = c[n]; n++)
                w(d);
        if (k.hasQsa && !g && a.nodeType == 9 && !/\[/.test(this.text)) {
            try {
                var h = a.querySelectorAll(this.text)
            } catch (y) {}
            if (h) {
                if (!c)
                    return b.toArray(h);
                for (n = 0; d = h[n]; n++)
                    w(d) && c.push(d);
                e.unordered || c.sort(b.compare);
                return c
            }
        }
        h = this.parse();
        if (!h.length)
            return [];
        n = 0;
        for (var v; v = h[n]; n++) {
            var r = w;
            v.first && (c ? m = !0 : r = f,
            g ? l = a : v.combinator && (l = [a]));
            v.last && c ? (u = o,
            d = c) : (u = {},
            d = []);
            if (!v.combinator && !g)
                d = v.combine(d, a, v, s, r, !d.length);
            else
                for (var p = 0, x = l.length; p < x; p++)
                    d = v.combine(d, l[p], v, s, r);
            v.last ? d.length && (c = d) : l = d
        }
        !e.unordered && m && c && c.sort(b.compare);
        return c || []
    }
    ;
    a.find = function(a, c, b) {
        return this.search(a, c, b)[0]
    }
    ;
    a.match = function(a, c) {
        if (this.parse().length == 1)
            return !!this.parse()[0].match(a, {});
        if (!c)
            for (c = a; c.parentNode; )
                c = c.parentNode;
        var b = this.search(c)
          , e = b.length;
        if (!e--)
            return !1;
        for (; e--; )
            if (b[e] == a)
                return !0;
        return !1
    }
    ;
    a.filter = function(a) {
        for (var c = [], b = this.parse()[0].match, e = 0, f; f = a[e]; e++)
            b(f) && c.push(f);
        return c
    }
    ;
    var c;
    b.recompile = function() {
        var a, e = [","], f = ["!"];
        for (a in p)
            if (a != " ")
                e[a.length > 1 ? "unshift" : "push"](b.escapeRegExp(a));
        for (a in r)
            f.push(a);
        c = RegExp("[\\w\\u00a1-\\uFFFF][\\w\\u00a1-\\uFFFF-]*|[#.](?:[\\w\\u00a1-\\uFFFF-]|\\\\:|\\\\.)+|[ \\t\\r\\n\\f](?=[\\w\\u00a1-\\uFFFF*#.[:])|[ \\t\\r\\n\\f]*(" + e.join("|") + ")[ \\t\\r\\n\\f]*|\\[([\\w\\u00a1-\\uFFFF-]+)[ \\t\\r\\n\\f]*(?:([" + f.join("") + "]?=)[ \\t\\r\\n\\f]*(?:\"([^\"]*)\"|'([^']*)'|([^\\]]*)))?]|:([-\\w\\u00a1-\\uFFFF]+)(?:\\((?:\"([^\"]*)\"|'([^']*)'|([^)]*))\\))?|\\*|(.+)", "g")
    }
    ;
    var e = function(a) {
        return {
            ident: [],
            classes: [],
            attributes: [],
            pseudos: [],
            combinator: a
        }
    }
      , g = function(a) {
        return a
    }
    ;
    a.parse = function(a) {
        var f = a ? "plain" : "parsed";
        if (this[f])
            return this[f];
        var n = this.text
          , d = a ? g : this.compute
          , o = []
          , l = e(null );
        l.first = !0;
        a = function(a) {
            o.push(d(l));
            l = e(a)
        }
        ;
        c.lastIndex = 0;
        for (var m, k; m = c.exec(n); ) {
            if (m[11]) {
                if (b.verbose)
                    throw SyntaxError('Syntax error, "' + k + '" unexpected at #' + c.lastIndex + ' in "' + n + '"');
                return this[f] = []
            }
            k = m[0];
            switch (k.charAt(0)) {
            case ".":
                l.classes.push(k.slice(1).replace(/\\/g, ""));
                break;
            case "#":
                l.id = k.slice(1).replace(/\\/g, "");
                break;
            case "[":
                l.attributes.push({
                    name: m[2],
                    operator: m[3] || null ,
                    value: m[4] || m[5] || m[6] || null
                });
                break;
            case ":":
                l.pseudos.push({
                    name: m[7],
                    value: m[8] || m[9] || m[10] || null
                });
                break;
            case " ":
            case "\t":
            case "\r":
            case "\n":
            case "\u000c":
                m[1] = m[1] || " ";
            default:
                if (m = m[1]) {
                    if (m == ",") {
                        l.last = !0;
                        a(null );
                        l.first = !0;
                        continue
                    }
                    l.first && !l.ident.length ? l.combinator = m : a(m)
                } else if (k != "*")
                    l.tag = k
            }
            l.ident.push(k)
        }
        l.last = !0;
        o.push(d(l));
        return this[f] = o
    }
    ;
    var l = function() {
        return !0
    }
      , j = function(a, c) {
        return a.id == c
    }
      , m = function(a, c) {
        return a.nodeName.toUpperCase() == c
    }
      , n = function(a) {
        return RegExp("(?:^|[ \\t\\r\\n\\f])" + a + "(?:$|[ \\t\\r\\n\\f])")
    }
      , o = function(a, c) {
        return a.className && c.test(a.className)
    }
      , w = function(a) {
        a.getter = b.lookupAttribute(a.name) || b.getAttribute;
        if (!a.operator || !a.value)
            return a;
        var c = r[a.operator];
        if (c)
            a.escaped = b.escapeRegExp(a.value),
            a.pattern = RegExp(c(a.value, a.escaped, a));
        return a
    }
      , v = function(a, c) {
        var b = c.getter(a, c.name);
        switch (c.operator) {
        case null :
            return b;
        case "=":
            return b == c.value;
        case "!=":
            return b != c.value
        }
        if (!b && c.value)
            return !1;
        return c.pattern.test(b)
    }
    ;
    a.compute = function(a) {
        var c, e, f, g, d, u, s = a.tag, y = a.id, r = a.classes, p = s ? s.toUpperCase() : null ;
        y && (u = !0,
        d = h(null , j, y),
        g = function(a) {
            if (a.getElementById)
                return (a = a.getElementById(y)) && (!p || a.nodeName.toUpperCase() == p) && (!k.getIdAdds || a.id == y) ? [a] : [];
            for (var a = a.getElementsByTagName(s || "*"), c = 0, b; b = a[c]; c++)
                if (b.id == y)
                    return [b];
            return []
        }
        );
        if (r.length > 0)
            if (!g && k.hasByClass) {
                for (c = 0; e = r[c]; c++)
                    d = h(d, o, n(e));
                var x = r.join(" ");
                g = function(a) {
                    return a.getElementsByClassName(x)
                }
            } else if (!g && r.length == 1) {
                u = !0;
                var E = n(r[0]);
                d = h(d, o, E);
                g = function(a) {
                    for (var a = a.getElementsByTagName(s || "*"), c = [], b = 0, e; e = a[b]; b++)
                        e.className && E.test(e.className) && c.push(e);
                    return c
                }
            } else
                for (c = 0; e = r[c]; c++)
                    f = h(f, o, n(e));
        s ? g ? u || (f = h(f, m, p)) : (d = h(d, m, p),
        g = function(a) {
            return a.getElementsByTagName(s)
        }
        ) : g || (g = function(a) {
            a = a.getElementsByTagName("*");
            if (!k.byTagAddsComments)
                return a;
            for (var c = [], b = 0, e; e = a[b]; b++)
                e.nodeType === 1 && c.push(e);
            return c
        }
        );
        for (c = 0; e = a.pseudos[c]; c++)
            e.name == "not" ? (e = b(e.value),
            f = h(f, function(a, c) {
                return !c.match(a)
            }, e.parse().length == 1 ? e.parsed[0] : e)) : (u = q[e.name]) && (f = h(f, u, e.value));
        for (c = 0; e = a.attributes[c]; c++)
            f = h(f, v, w(e));
        (a.simple = !f) ? a.matchAux = l : (a.matchAux = f,
        d = h(d, f));
        a.match = d || l;
        a.combine = b.combinators[a.combinator || " "];
        a.search = g;
        return a
    }
    ;
    var p;
    p = b.combinators = {
        " ": function(a, c, e, f, g, n) {
            c = e.search(c);
            if (n && e.simple)
                return b.toArray(c);
            for (var n = 0, d = e.matchAux; e = c[n]; n++)
                g(e) && d(e, f) && a.push(e);
            return a
        },
        ">": function(a, c, b, e, f) {
            for (var g = b.search(c), n = 0, d; d = g[n]; n++)
                d.parentNode == c && f(d) && b.matchAux(d, e) && a.push(d);
            return a
        },
        "+": function(a, c, b, e, f) {
            for (; c = c.nextSibling; )
                if (c.nodeType == 1) {
                    f(c) && b.match(c, e) && a.push(c);
                    break
                }
            return a
        },
        "~": function(a, c, b, e, f) {
            for (; c = c.nextSibling; )
                if (c.nodeType == 1) {
                    if (!f(c))
                        break;
                    b.match(c, e) && a.push(c)
                }
            return a
        }
    };
    var q;
    q = b.pseudos = {
        "first-child": function(a) {
            return q.index(a, 0)
        },
        "last-child": function(a) {
            for (; a = a.nextSibling; )
                if (a.nodeType === 1)
                    return !1;
            return !0
        },
        "only-child": function(a) {
            for (var c = a; c = c.previousSibling; )
                if (c.nodeType === 1)
                    return !1;
            for (; a = a.nextSibling; )
                if (a.nodeType === 1)
                    return !1;
            return !0
        },
        "nth-child": function(a, c, e) {
            c = b.parseNth(c || "n");
            if (c.special != "n")
                return q[c.special](a, c.a, e);
            e = e || {};
            e.positions = e.positions || {};
            var f = b.getUid(a);
            if (!e.positions[f]) {
                for (var g = 0; a = a.previousSibling; )
                    if (a.nodeType == 1) {
                        g++;
                        var n = e.positions[b.getUid(a)];
                        if (n != void 0) {
                            g = n + g;
                            break
                        }
                    }
                e.positions[f] = g
            }
            return e.positions[f] % c.a == c.b
        },
        empty: function(a) {
            return !(a.innerText || a.textContent || "").length
        },
        contains: function(a, c) {
            return (a.innerText || a.textContent || "").indexOf(c) != -1
        },
        index: function(a, c) {
            for (var b = 1; a = a.previousSibling; )
                if (a.nodeType == 1 && ++b > c)
                    return !1;
            return b == c
        },
        even: function(a, c, b) {
            return q["nth-child"](a, "2n+1", b)
        },
        odd: function(a, c, b) {
            return q["nth-child"](a, "2n", b)
        }
    };
    q.first = q["first-child"];
    q.last = q["last-child"];
    q.nth = q["nth-child"];
    q.eq = q.index;
    var r;
    r = b.operators = {
        "*=": function(a, c) {
            return c
        },
        "^=": function(a, c) {
            return "^" + c
        },
        "$=": function(a) {
            return a + "$"
        },
        "~=": function(a, c) {
            return "(?:^|[ \\t\\r\\n\\f])" + c + "(?:$|[ \\t\\r\\n\\f])"
        },
        "|=": function(a, c) {
            return "(?:^|\\|)" + c + "(?:$|\\|)"
        }
    };
    var s = {
        "class": "className"
    };
    b.lookupAttribute = function(a) {
        var c = s[a];
        if (c)
            return function(a) {
                return a[c]
            }
            ;
        var b = /^(?:src|href|action)$/.test(a) ? 2 : 0;
        return function(c) {
            return c.getAttribute(a, b)
        }
    }
    ;
    b.getAttribute = function(a, c) {
        return a.getAttribute(c)
    }
    ;
    a = Array.slice || function(a) {
        return Array.prototype.slice.call(a)
    }
    ;
    try {
        a(document.documentElement.childNodes)
    } catch (u) {
        a = function(a) {
            if (a instanceof Array)
                return a;
            for (var c = a.length, b = Array(c); c--; )
                b[c] = a[c];
            return b
        }
    }
    b.toArray = a;
    b.compare = document.compareDocumentPosition ? function(a, c) {
        return 3 - (a.compareDocumentPosition(c) & 6)
    }
    : function(a, c) {
        return a.sourceIndex - c.sourceIndex
    }
    ;
    var y = 1;
    b.getUid = window.ActiveXObject ? function(a) {
        return (a.$slyUid || (a.$slyUid = {
            id: y++
        })).id
    }
    : function(a) {
        return a.$slyUid || (a.$slyUid = y++)
    }
    ;
    var E = {};
    b.parseNth = function(a) {
        if (E[a])
            return E[a];
        var c = a.match(/^([+-]?\d*)?([a-z]+)?([+-]?\d*)?$/);
        if (!c)
            return !1;
        var b = parseInt(c[1], 10)
          , e = (parseInt(c[3], 10) || 0) - 1;
        if (b = isNaN(b) ? 1 : b) {
            for (; e < 1; )
                e += b;
            for (; e >= b; )
                e -= b
        }
        switch (c[2]) {
        case "n":
            c = {
                a: b,
                b: e,
                special: "n"
            };
            break;
        case "odd":
            c = {
                a: 2,
                b: 0,
                special: "n"
            };
            break;
        case "even":
            c = {
                a: 2,
                b: 1,
                special: "n"
            };
            break;
        case "first":
            c = {
                a: 0,
                special: "index"
            };
            break;
        case "last":
            c = {
                special: "last-child"
            };
            break;
        case "only":
            c = {
                special: "only-child"
            };
            break;
        default:
            c = {
                a: b ? b - 1 : e,
                special: "index"
            }
        }
        return E[a] = c
    }
    ;
    b.escapeRegExp = function(a) {
        return a.replace(/[-.*+?^${}()|[\]\/\\]/g, "\\$&")
    }
    ;
    b.generise = function(a) {
        b[a] = function(c) {
            var e = b(c);
            return e[a].apply(e, Array.prototype.slice.call(arguments, 1))
        }
    }
    ;
    a = ["parse", "search", "find", "match", "filter"];
    for (var x = 0; a[x]; x++)
        b.generise(a[x]);
    b.recompile();
    window.wisDOM._int.selectorEngine = b
})();
(function(h) {
    var d = h.wisDOM, b = h.document, a, k = {
        format: "DAY DD/MM/YYYY",
        onUpdate: null ,
        minDate: null ,
        maxDate: null ,
        quickJump: !0,
        quickJumpNum: 7,
        defaultDate: new Date,
        classNameBase: "wdDatePicker"
    };
    d.datePicker = d.fn.datePicker = function(a) {
        for (var a = f.mergeSettings(a) || k, b = this.length, g = f.init; b--; )
            g(this[b], a);
        return this
    }
    ;
    d.datePicker.override = d.fn.datePicker.override = function(a) {
        for (var b in a)
            a.hasOwnProperty(b) && (k[b] = a[b])
    }
    ;
    d.datePicker.show = d.fn.datePicker.show = function(a, b) {
        b = f.mergeSettings(b) || k;
        f.event.showCalendar(a, b)
    }
    ;
    d.datePicker.encode = function(a, b) {
        return f.date.encode(a, b)
    }
    ;
    var f = function() {}
    ;
    f.init = function(a, b) {
        var g = d(a);
        f.event.bindField(g, b)
    }
    ;
    f.createContainer = function(a, b) {
        var f = {};
        f["div#" + a + "." + b + "-Outer"] = "";
        f = d(f).css({
            display: "none",
            position: "absolute",
            left: "100px",
            top: "100px"
        });
        d("body").prepend(f)
    }
    ;
    f.event = {};
    f.event.showCalendar = function(c, e, g) {
        b.getElementById(a) === null && f.createContainer(a, e.classNameBase);
        d("#" + a).children().length !== 0 && f.event.hideCalendar();
        var l = c.val()
          , k = f.date.decode(l, e.format);
        typeof g == "undefined" && (g = new Date(k.valueOf()));
        var l = d(b.getElementById(a))
          , m = f.buildChronNav(c, g, e);
        l.append(m);
        g = f.buildCalendarTable(c, f.date.addMonths(g, 0), e, k);
        l.append(g);
        l.css({
            display: "block"
        });
        f.event.positionCalendar(c, e);
        d(function() {
            d(h).bind("resize.datePickerHide", function(a) {
                f.event.hideCalendar(a)
            });
            d(h.document).bind("click.datePickerHide", function(a) {
                f.event.hideCalendar(a)
            })
        }, 100)
    }
    ;
    f.event.positionCalendar = function(c, b) {
        var f = d("#" + a)
          , l = f.width()
          , k = f.height()
          , m = c.offset()
          , n = c.width()
          , o = c.height()
          , w = d("body").width();
        if (m.left + l >= w)
            m.left = m.left - l + n;
        f.css({
            left: m.left + "px",
            top: m.top + o + "px",
            zIndex: 1E6
        });
        typeof document.body.style.maxHeight == "undefined" && h.navigator.userAgent.indexOf("MSIE") !== -1 && (f = {},
        n = {},
        n["div#" + a + "-SHIM." + b.classNameBase + "-SHIM[style=display:none]"] = f,
        f["iframe.shim[src=#,frameBorder=0,scrollbar=no,width=" + l + ",height=" + k + "]"] = "",
        d("body").append(n),
        d("#" + a + "-SHIM").css({
            position: "absolute",
            width: l + "px",
            height: k + "px",
            left: m.left + "px",
            top: m.top + o + "px",
            zIndex: 1
        }))
    }
    ;
    f.event.dateChosen = function(c, b, g, l) {
        c.val(f.date.encode(g.date, l.format));
        d("#" + a + " td.selected").removeClass("selected");
        d(b).addClass("selected");
        typeof l.onUpdate == "function" && d(function() {
            l.onUpdate.call(c, g.date)
        }, 1);
        d(function() {
            f.event.hideCalendar()
        }, 100)
    }
    ;
    f.event.nextPrevMonth = function(a, b, g) {
        a = f.date.addMonths(a, g);
        f.event.showCalendar(this, b, a)
    }
    ;
    f.event.hideCalendar = function(c) {
        var e = d(b.getElementById(a));
        if (typeof c !== "undefined")
            for (var c = c.target, f = e[0]; c.parentNode; ) {
                if (c == f)
                    return !1;
                c = c.parentNode
            }
        d(h).unbind("resize.datePickerHide");
        d(b).unbind("click.datePickerHide");
        c = d("#" + a + "-SHIM");
        c.length > 0 && c.remove();
        e.css({
            display: "none",
            left: "100px",
            top: "100px"
        });
        e.empty()
    }
    ;
    f.event.bindField = function(a, b) {
        if (a[0].tagName.toLowerCase() !== "input")
            a.val = a.text;
        a.val() === "" && a.val(f.date.encode(b.defaultDate, b.format));
        a.bind("click.datePicker", function() {
            d(function() {
                f.event.showCalendar(a, b)
            }, 10)
        });
        var g;
        a.bind("keydown.datePicker", function() {
            g = a.val()
        });
        a.bind("keyup.datePicker", function() {
            a.val(g)
        })
    }
    ;
    f.buildChronNav = function(a, b, g) {
        var l = (new Date(b.valueOf())).setDate(1)
          , k = (new Date(b.valueOf())).setDate(f.lookup.month.numDays(b))
          , m = ""
          , n = ""
          , o = !0
          , w = !0;
        g.minDate !== null && l < g.minDate && (m = ".disabled",
        o = !1);
        g.maxDate !== null && k > g.maxDate && (n = ".disabled",
        w = !1);
        l = {};
        l["div#" + g.classNameBase + "-chronNav"] = {};
        l["div#" + g.classNameBase + "-chronNav"]["0 a" + m + "#" + g.classNameBase + "-previous"] = {
            span: "Previous",
            _events: {
                click: function() {
                    o && f.event.nextPrevMonth.apply(a, [b, g, -1])
                }
            }
        };
        l["div#" + g.classNameBase + "-chronNav"]["1 "] = " ";
        l["div#" + g.classNameBase + "-chronNav"]["2 a" + n + "#" + g.classNameBase + "-next"] = {
            span: "Next",
            _events: {
                click: function() {
                    w && f.event.nextPrevMonth.apply(a, [b, g, 1])
                }
            }
        };
        return d(l)
    }
    ;
    f.buildCalendarTable = function(a, b, g, d) {
        var d = d || null
          , k = {}
          , m = f.lookup.day
          , n = f.lookup.month
          , o = n.numDays(b)
          , w = f.event.dateChosen
          , h = g.minDate
          , p = g.maxDate
          , q = null ;
        d !== null && d.getMonth() == b.getMonth() && (q = d.getDate());
        var b = new Date(b.valueOf())
          , r = {};
        k["table." + g.classNameBase + "_calendar[cellpadding=0,cellspacing=0,border=0]"] = r;
        r.thead = {
            tr: {}
        };
        r.thead.tr["th[colspan=7]"] = f.buildQuickJumpSelect(a, b, g);
        d = {};
        r.tbody = d;
        var s = {};
        d["98 tr.dayHeader"] = s;
        for (var u = 7, y, E; u--; ) {
            r = 7 - (u + 1);
            y = m.shortName[r].substr(0, 1);
            E = "";
            if (r === 0 || r == 6)
                E = ".weekend";
            s[r + " th" + E] = y
        }
        var r = s = 1, n = n.name(b), x;
        n += " " + b.getFullYear();
        u = {};
        d[r + " tr"] = u;
        do {
            b.setDate(r);
            y = r;
            x = b.getDay();
            if (r == 1 && x !== 0)
                for (E = 0; E < x; E++)
                    u[E + " td.disabled"] = {
                        b: " "
                    },
                    s++;
            E = ".";
            if (x === 0 || x == 6)
                E += "weekend";
            x = !1;
            h !== null && (h.setHours(0),
            b.valueOf() < h.valueOf() && (u[r + " td" + E + " minDate unavailable"] = {
                i: y
            },
            x = !0));
            p !== null && (p.setHours(0),
            b.valueOf() > p.valueOf() && (u[r + " td" + E + " maxDate unavailable"] = {
                i: y
            },
            x = !0));
            x || (r == q && (E += " selected"),
            x = m.name[b.getDay()] + " " + y + " " + n,
            u[r + " td" + E + "[title=" + x + "]"] = {
                b: y,
                _data: {
                    dateNum: r,
                    date: new Date(b.valueOf())
                },
                _events: {
                    click: function() {
                        return w(a, this, this._data, g)
                    }
                }
            });
            if (r >= o)
                for (E = 0; E < 7 - s; E++)
                    u[E + " td.disabled"] = "";
            s % 7 === 0 && r !== o && (u = {},
            d[(r == 1 ? r + 1 : r) + " tr"] = u,
            s = 0);
            s++;
            r++
        } while (r <= o);return k
    }
    ;
    f.buildQuickJumpSelect = function(a, b, g) {
        var d = {}
          , k = f.lookup.month.name
          , m = new Date(b.valueOf())
          , n = f.date.addMonths;
        if (g.quickJump === !0 && typeof document.body.style.maxHeight !== "undefined") {
            var o = g.minDate, w = g.maxDate, h = g.quickJumpNum, p, q;
            d.select = {
                _events: {
                    change: function() {
                        this.blur();
                        f.event.nextPrevMonth.apply(a, [b, g, parseInt(this.value, 10)])
                    }
                }
            };
            for (p = h; p--; )
                if (q = 0 - (p + 1),
                m = new Date(b.valueOf()),
                m = n(m, q),
                o === null || m.getMonth() + m.getFullYear() * 1E3 >= o.getMonth() + o.getFullYear() * 1E3)
                    d.select["option[value=" + q + "]"] = k(m) + " " + m.getFullYear();
            m = new Date(b.valueOf());
            d.select["option[value=0,selected=selected]"] = k(m) + " " + m.getFullYear();
            for (p = h; p--; )
                if (q = h - p,
                m = new Date(b.valueOf()),
                m = n(m, q),
                w === null || m.getMonth() + m.getFullYear() * 1E3 <= w.getMonth() + w.getFullYear() * 1E3)
                    d.select["option[value=" + q + "]"] = k(m) + " " + m.getFullYear()
        } else
            d = {
                "span.month": k(b),
                "0 ": " ",
                "span.year": b.getFullYear()
            };
        return d
    }
    ;
    f.mergeSettings = function(a) {
        if (typeof a != "undefined") {
            var b = {}, f;
            for (f in k)
                k.hasOwnProperty(f) && (b[f] = k[f]);
            for (var d in a)
                a.hasOwnProperty(d) && (b[d] = a[d]);
            return b
        }
    }
    ;
    f.lookup = {
        day: {
            name: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            shortName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        },
        month: {
            name: function(a) {
                var b = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                return typeof a == "object" ? b[a.getMonth()] : b[a]
            },
            numDays: function(a) {
                var b = a.getMonth()
                  , f = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
                  , a = a.getFullYear();
                a % 4 === 0 && a % 100 !== 0 && (f[1] = 29);
                a % 400 === 0 && a % 100 === 0 && a % 4 === 0 && (f[1] = 29);
                return f[b]
            }
        }
    };
    f.date = {
        decode: function(a, b, f) {
            f = f || k.defaultDate;
            if (a === "" || a === null || typeof a == "undefined")
                return f;
            var d = b.search(/DD/)
              , j = b.search(/MM/)
              , b = b.search(/YYYY/)
              , m = new Date;
            m.setDate(a.substr(d, 2));
            m.setMonth(a.substr(j, 2) - 1);
            m.setDate(a.substr(d, 2));
            m.setMonth(a.substr(j, 2) - 1);
            m.setFullYear(a.substr(b, 4));
            if (isNaN(m.valueOf()) || m.valueOf() < 0)
                return f;
            return m
        },
        encode: function(a, b) {
            var g = a.getDate().toString()
              , d = (a.getMonth() + 1).toString()
              , k = a.getFullYear().toString()
              , m = f.lookup.day.shortName[a.getDay()]
              , g = g.length == 1 ? "0" + g : g
              , d = d.length == 1 ? "0" + d : d
              , g = b.replace(/DD/, g)
              , g = g.replace(/MM/, d)
              , g = g.replace(/YYYY/, k);
            return g = g.replace(/DAY/, m)
        },
        addMonths: function(a, b) {
            var f = new Date(a.valueOf());
            f.setDate(15);
            var d = f.getMonth() + b;
            f.setMonth(d);
            return f
        }
    };
    f.genID = function() {
        var c, b, f = document, d = h.location.href;
        do
            c = Math.round(Math.random() * 1E10),
            b = d.length * 100,
            c = "wdDPCalendar-" + (c + b);
        while (f.getElementById(c) !== null );a = c
    }()
})(window);
(function(h) {
    var d = h.wisDOM, b = h.document, a, k = !1, f = Math.round(Math.random() * 1E7);
    d.cookie = function(b, f, d, j) {
        k || c.testCookies();
        return a ? (f = f || null ,
        f === null ? c.findCookie(b) : (f = escape(f.toString().replace(/\r*\n*/g, "")),
        j = "path=" + (j || "/") + "; ",
        d = c.genExpiryStr(d),
        c.createCookie(b, f, j, d),
        !0)) : !1
    }
    ;
    d.cookie.remove = function(a) {
        d.cookie(a, "0", -1)
    }
    ;
    var c = function() {}
    ;
    c.testCookies = function() {
        b.cookie = "test" + f + "=enabled";
        if (c.findCookie("test" + f) == "enabled") {
            a = !0;
            var e = "test" + f + "=enabled; expires=" + (new Date).toGMTString() + ";";
            b.cookie = e
        } else
            a = !1;
        k = !0
    }
    ;
    c.findCookie = function(a) {
        for (var c = b.cookie.split(";"), f = c.length, d; f--; )
            if (d = c[f].replace(/(^\s*|\s*$)/, ""),
            d.indexOf(a) !== -1)
                return unescape(d.substr(a.length + 1));
        return ""
    }
    ;
    c.createCookie = function(a, c, f, d) {
        b.cookie = a + "=" + c + "; " + d + f
    }
    ;
    c.genExpiryStr = function(a) {
        if (typeof a !== "undefined")
            return "expires=" + (new Date((new Date).valueOf() + a * 864E5)).toGMTString() + "; ";
        return ""
    }
})(window);
(function(h) {
    var d = h.wisDOM
      , b = h.document;
    d._int.generateID = function() {
        for (var a = function() {
            return "IDxxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                var c = Math.random() * 16 | 0;
                return (a == "x" ? c : c & 3 | 8).toString(16)
            }).toUpperCase()
        }
        , d = a(); b.getElementById(d) !== null ; )
            d = a();
        return d
    }
    ;
    d._int.browser = function(a) {
        var d = {}
          , f = a.navigator;
        if (typeof f.platform !== "undefined")
            d.platform = f.platform;
        d.standardsMode = typeof b.compatMode !== "undefined" && b.compatMode == "CSS1Compat" ? !0 : !1;
        f = function(a) {
            var b = /(Opera|Firefox|Chrome|Safari|Konqueror|Epiphany|Iceweasel|Camino|AppleWebKit)\/([0-9\.]+)/g.exec(a);
            if (b !== null )
                return [b[1], b[2]];
            b = /(MSIE)\s+([0-9\.]+)/g.exec(a);
            if (b !== null )
                return [b[1], b[2]];
            return ["", "0.0"]
        }(f.userAgent);
        d.app = f[0];
        d.version = f[1];
        d.versionSerial = parseInt(f[1].replace(/\./g, ""), 10);
        d.versionMajor = parseInt(f[1], 10);
        d.handheldDevice = typeof a.orientation != "undefined" ? !0 : !1;
        d.touchDevice = typeof ("ontouchstart"in a || a.DocumentTouch && b instanceof DocumentTouch) == "undefined" ? !1 : !0;
        return d
    }(h);
    d._int.checkScroll = function(a) {
        var a = d(a), k = a.height(), f = a.width(), c = a[0], e, g;
        c == h ? (e = d("body"),
        a = e.height(),
        e = e.width(),
        typeof h.pageXOffset !== "undefined" ? (g = h.pageYOffset,
        c = h.pageXOffset) : (g = b.body,
        D = b.documentElement,
        D = D.clientHeight ? D : g,
        g = D.scrollTop,
        c = D.scrollLeft)) : (a = c.scrollHeight,
        e = c.scrollWidth,
        g = c.scrollTop,
        c = c.scrollLeft);
        if (a > k || e > f) {
            g = {
                x: {
                    box: f,
                    scroll: e,
                    at: c
                },
                y: {
                    box: k,
                    scroll: a,
                    at: g
                },
                which: {
                    x: !1,
                    y: !1
                }
            };
            if (a > k)
                g.which.y = !0;
            if (e > f)
                g.which.x = !0;
            return g
        }
        return !1
    }
})(window);
(function(h) {
    var d = h.wisDOM
      , b = {
        fps: 30,
        time: 300
    };
    d.animate = d.fn.animate = function(b, f, c, e, g) {
        for (var l = this.length, j, m = this; l--; )
            j = d(this[l]),
            j.css(b),
            j = a.setupAnimation(this, j, b, f, e, g);
        typeof c == "function" && setTimeout(function() {
            return c.call(m)
        }, j + 1);
        return this
    }
    ;
    d.slideDown = d.fn.slideDown = function(b, f, c) {
        this.css({
            visibility: "hidden",
            overflow: "hidden",
            display: ""
        });
        for (var e = this.length, g, l = {
            height: "0px"
        }, j, m = this; e--; )
            g = d(this[e]),
            j = g.height(),
            g.css({
                visibility: "",
                height: "0px"
            }),
            j = {
                height: j + "px"
            },
            g = a.setupAnimation(this, g, l, j, f, c);
        var n = function() {
            m.css({
                overflow: "",
                height: ""
            });
            typeof b == "function" && b.call(m)
        }
        ;
        setTimeout(function() {
            return n.call(m)
        }, g + 1);
        return this
    }
    ;
    d.slideUp = d.fn.slideUp = function(b, f, c) {
        this.css({
            overflow: "hidden"
        });
        for (var e = this.length, g, l, j = {
            height: "0px"
        }, m = this; e--; )
            g = d(this[e]),
            l = {
                height: g.height() + "px"
            },
            g = a.setupAnimation(this, g, l, j, f, c);
        var n = function() {
            m.css({
                overflow: "",
                display: "none",
                height: ""
            });
            typeof b == "function" && b.call(m)
        }
        ;
        setTimeout(function() {
            return n.call(m)
        }, g + 1);
        return this
    }
    ;
    d.fadeIn = d.fn.fadeIn = function(b, f, c, e) {
        b = b || 1;
        this.css({
            opacity: 0,
            filter: "alpha(opacity=0)"
        });
        for (var g = this.length, l = this; g--; )
            var j = d(this[g])
              , j = a.setupAnimation(this, j, {
                opacity: 0
            }, {
                opacity: b
            }, c, e);
        var m = function() {
            typeof f == "function" && f.call(l)
        }
        ;
        setTimeout(function() {
            return m.call(l)
        }, j + 1);
        return this
    }
    ;
    d.fadeOut = d.fn.fadeOut = function(b, f, c, e) {
        b = b || 1;
        this.css({
            opacity: b,
            filter: "alpha(opacity=" + b * 100 + ")"
        });
        for (var g = this.length, l = this; g--; )
            var j = d(this[g])
              , j = a.setupAnimation(this, j, {
                opacity: b
            }, {
                opacity: 0
            }, c, e);
        var m = function() {
            l.css({
                display: "none"
            });
            typeof f == "function" && f.call(l)
        }
        ;
        setTimeout(function() {
            return m.call(l)
        }, j + 1);
        return this
    }
    ;
    var a = function() {}
    ;
    a.setupAnimation = function(d, f, c, e, g, l) {
        for (var g = g || b.time, l = l || b.fps, j = Math.floor(g / (1E3 / l)), d = j, l = Math.floor(1E3 / l), g = function(b) {
            return function() {
                a.animationStep(b, j, f, c, e)
            }
        }
        ; d--; )
            setTimeout(g(j - d), l * (j - d));
        return l * (j - d)
    }
    ;
    a.animationStep = function(a, b, c, e, g) {
        var d = {}, j;
        for (j in e)
            if (e.hasOwnProperty(j)) {
                var m = parseInt(e[j], 10)
                  , n = parseInt(g[j], 10);
                j == "opacity" && (m = parseFloat(e[j]) * 100,
                n = parseFloat(g[j]) * 100);
                if (!isNaN(m) && !isNaN(n)) {
                    var o = n - m
                      , n = (m + o / b * a - m) / (n - m)
                      , n = n * n * (3 - 2 * n);
                    m += o * n;
                    if (!isNaN(m))
                        j !== "opacity" ? d[j] = Math.ceil(m) + "px" : (d.filter = "alpha(opacity=" + m + ")",
                        d[j] = (m / 100).toFixed(2))
                }
            }
        c.css(d)
    }
})(window);
(function(h) {
    var d = h.wisDOM;
    d.scroll = d.fn.scroll = function(a, k, f, c) {
        for (var k = function(a, b) {
            return function() {
                typeof b == "function" && b.call(a)
            }
        }(this, k), e = this.length, g, l; e--; ) {
            g = d(this[e]);
            var j = d._int.checkScroll(g);
            if (j) {
                l = d(a);
                var m = l.positionRelTo(this[e]);
                l = [m.left, m.top, l.width(), l.height()];
                l = b.startScroll(g, j, l, f, c)
            }
        }
        setTimeout(k, l + 1);
        return this
    }
    ;
    var b = function() {}
    ;
    b.startScroll = function(a, d, f, c, e) {
        for (var e = e || 30, g = Math.floor((c || 500) / (1E3 / e)), c = g, e = Math.floor(1E3 / e), l = function(c) {
            return function() {
                b.scrollStep(c, g, a, d, f)
            }
        }
        ; c--; )
            setTimeout(l(g - c), e * (g - c));
        return e * (g - c)
    }
    ;
    b.scrollStep = function(a, b, f, c, e) {
        var g = function(a, b, c, f) {
            var e = c - b
              , a = (b + e / f * a - b) / (c - b);
            b += e * a * a * (3 - 2 * a);
            isNaN(b) && (b = c);
            return b = Math.round(b)
        }
          , d = 0
          , j = 0;
        c.which.x && (c.x.at - e[0] < 0 ? (j = Math.round(e[0] - c.x.box / 2),
        e[2] < c.x.box && (j += Math.round(e[2] / 2)),
        j > c.x.scroll - c.x.box && (j = c.x.scroll - c.x.box)) : (j = Math.round(e[0] - c.x.box / 2),
        j > 0 && (j = 0)),
        j = g(a, c.x.at, j, b));
        c.which.y && (c.y.at - e[1] < 0 ? (d = Math.round(e[1] - c.y.box / 2),
        e[3] < c.y.box && (d += Math.round(e[3] / 2)),
        d > c.y.scroll - c.y.box && (d = c.y.scroll - c.y.box)) : (d = Math.round(e[1] - c.y.box / 2),
        d < 0 && (d = 0)),
        d = g(a, c.y.at, d, b));
        f[0] == h ? f[0].scrollTo(j, d) : (f[0].scrollTop = d,
        f[0].scrollLeft = j)
    }
})(window);
(function() {
    var h = window.wisDOM
      , d = window.document
      , b = {
        useBlockout: !1,
        overlayColour: "#808080",
        overlayOpacity: 0.8,
        closeTitle: "Click to close",
        innerBackground: "#FFF",
        zIndexLowest: 1E6,
        width: !1,
        height: !1,
        useClone: !0,
        myClass: null ,
        onClose: null ,
        disableClosing: !1
    }
      , a = {
        useBlockout: !0,
        overlayColour: "#444",
        overlayOpacity: 0.9,
        autoPlay: !1,
        autoPlayInterval: 5,
        showAutoControls: !0,
        showCaptions: !0,
        thumbBorder: 1,
        thumbMargin: 3,
        useClone: !0,
        myClass: null ,
        onClose: null
    };
    h.slideshow = h.fn.slideshow = function(f) {
        for (var c = k.mergeSettings(b, a), f = k.mergeSettings(c, f), c = this.length, e, g = h(""), d = 0; d < c; d++)
            if (e = this[d],
            e.tagName.toLowerCase() !== "img") {
                e = h(e).find("img");
                anyImgLen = e.length;
                for (var j = 0; j < anyImgLen; j++)
                    g.push(e[j])
            } else
                g.push(e);
        g.bind("click.wdSlideshow", function(a) {
            k.showSlideshow(a, g, f)
        });
        return this
    }
    ;
    h.overlay = h.fn.overlay = function(a, c) {
        a = k.mergeSettings(b, a);
        k.closeAll(a);
        var e = h({
            "div#wdOverlayContent.overlayMode": ""
        }).css({
            backgroundColor: a.innerBackground,
            overflow: "hidden"
        });
        a.myClass !== null && e.addClass(a.myClass);
        a.useClone ? this.clone().css({
            display: "block"
        }).appendTo(e) : this.css({
            display: "block"
        }).appendTo(e);
        a.disableClosing || h({
            "b#wdOverlayClose": {
                i: "Close",
                _events: {
                    "click.overlay": function() {
                        k.closeAll(a)
                    }
                },
                _attr: {
                    title: a.closeTitle
                }
            }
        }).appendTo(e);
        e.close = function() {
            k.closeAll(a)
        }
        ;
        a.height && e.css({
            height: a.height + "px"
        });
        var g = a.width || Math.round(h(window).width() * 0.8)
          , d = a.height || Math.round(h(window).height() * 0.8);
        e.css({
            position: "absolute",
            left: "-100000px",
            top: "-100000px",
            width: g + "px",
            overflow: "auto"
        });
        e.appendTo("body");
        var j = e.height();
        j > d ? e.height(d) : d = j;
        e.css({
            position: "absolute",
            left: "50%",
            top: "48%",
            marginLeft: -1 * Math.round(g / 2) + "px",
            marginTop: -1 * Math.round(d / 2) + "px",
            zIndex: a.zIndexLowest + 2
        });
        if (c) {
            var j = e.offset()
              , m = h(c.target)
              , n = m.offset()
              , o = m.width()
              , m = m.height()
              , w = h._int.checkScroll(window);
            j.left += w.x.at;
            j.top += w.y.at;
            e.css({
                marginLeft: 0,
                marginTop: 0,
                left: n.left + "px",
                top: n.top + "px",
                width: o + "px",
                height: m + "px"
            });
            e.animate({
                width: o,
                height: m,
                left: n.left,
                top: n.top
            }, {
                width: g,
                height: d,
                left: j.left,
                top: j.top
            }, function() {
                e.css({
                    position: "fixed",
                    left: "50%",
                    top: "48%",
                    marginLeft: -1 * Math.round(g / 2) + "px",
                    marginTop: -1 * Math.round(d / 2) + "px",
                    zIndex: a.zIndexLowest + 2
                })
            })
        } else
            e.css({
                position: "fixed"
            }),
            e.fadeIn();
        a.useBlockout && h(function() {
            k.createBlocker(a).fadeIn(a.overlayOpacity)
        }, 50);
        return e
    }
    ;
    var k = function() {}
    ;
    k.showSlideshow = function(a, b, e) {
        var g = k.createBlocker(e);
        g.unbind("click").attr({
            title: ""
        });
        var l = h({
            "div.close": {
                b: "Close",
                _attr: {
                    title: "Close the slideshow"
                }
            }
        }).appendTo(g);
        h(d).bind("keyup.wdSlideShow", function(a) {
            if (a.keyCode == 39)
                return k.nextImage(e, 1),
                !1;
            if (a.keyCode == 37)
                return k.nextImage(e, -1),
                !1;
            if (a.keyCode == 27)
                return k.closeAll(e),
                !1
        });
        var j = function(a) {
            h(function() {
                k.resizeAll(e, a);
                h(window).bind("resize.wdSlideShow", j)
            }, 200);
            h(window).unbind("resize.wdSlideShow")
        }
        ;
        h(function() {
            h(window).bind("resize.wdSlideShow", j)
        }, 250);
        l.bind("click.wdSlideShow", function() {
            k.closeAll(e)
        });
        h({
            "div.loading": {
                b: "Loading"
            }
        }).css({
            display: "none"
        }).appendTo(g);
        g.fadeIn(e.overlayOpacity);
        for (var l = b.clone(), m = b.length, a = a.target, n; m--; )
            b[m] == a && (n = l[m]);
        e._playing = e.autoPlay ? !0 : !1;
        k.showThumbnails(l, e, !0);
        e.showAutoControls && (b = h({
            "b#wdSlideShowPlayPause": {
                span: "Play/Pause",
                _events: {
                    click: function() {
                        h("#wdSlideShowPlayPause").toggleClass("playing");
                        e._playing ? clearTimeout(e._timeout) : e._timeout = setTimeout(function() {
                            k.nextImage(e, 1)
                        }, e.autoPlayInterval * 1E3);
                        e._playing = !e._playing
                    }
                },
                _attr: {
                    title: "Play/pause the slideshow"
                }
            }
        }),
        e._playing && b.addClass("playing"),
        b.appendTo(g));
        h({
            "div#wdSlideshowPreloader": {}
        }).css({
            position: "absolute",
            left: "-10000px",
            top: "-10000px",
            visibility: "hidden"
        }).prependTo("body");
        k.loadHighRes(n, e)
    }
    ;
    k.nextImage = function(a, b) {
        var e = h("div#wdSlideshowThumbs img.current");
        b > 0 ? typeof e.next()[0] != "undefined" ? k.loadHighRes(e.next()[0], a) : k.loadHighRes(e.parent().children()[0], a) : typeof e.prev()[0] != "undefined" ? k.loadHighRes(e.prev()[0], a) : (e = e.parent().children(),
        k.loadHighRes(e[e.length - 1], a))
    }
    ;
    k.loadHighRes = function(a, b) {
        h("div#wdOverlayBlockout div.loading").css({
            display: ""
        });
        var e = h("div#wdSlideshowPreloader").empty()
          , g = a.getAttribute("rel")
          , d = a.getAttribute("alt");
        h("div#wdSlideshowThumbs img").removeClass("current");
        h(a).addClass("current");
        var j = h({
            img: {
                _events: {
                    load: function() {
                        var a = h("img.wdSSHighRes");
                        a.fadeOut(null , function() {
                            a.length > 1 && a.remove()
                        });
                        k.showHighRes(j, b);
                        h("div#wdOverlayBlockout div.loading").css({
                            display: "none"
                        })
                    }
                },
                _attr: {
                    title: d,
                    alt: d
                }
            }
        });
        b.myClass !== null && j.addClass(b.myClass);
        j.appendTo(e);
        h(function() {
            j.attr("src", g)
        }, 10)
    }
    ;
    k.showThumbnails = function(a, b, e) {
        var g = Math.floor(h(window).width() * 0.9)
          , d = g
          , j = a.length
          , g = Math.floor(g / j) - (b.thumbMargin + b.thumbBorder * 2) - 1;
        g > 72 && (d = j * (72 + b.thumbMargin + b.thumbBorder * 2));
        g = Math.min(g, 72);
        g = Math.max(g, 32);
        a.css({
            width: Math.round(g) + "px",
            height: Math.round(g) + "px",
            marginRight: b.thumbMargin + "px",
            marginBottom: b.thumbMargin + "px"
        });
        e ? (j = h({
            "div#wdSlideshowThumbs": ""
        }),
        b.myClass !== null && j.addClass(b.myClass),
        a.appendTo(j),
        a.bind("click", function() {
            this.className.indexOf("current") == -1 && k.loadHighRes(this, b)
        })) : j = h("#wdSlideshowThumbs");
        j.css({
            position: "fixed",
            left: "50%",
            bottom: "10px",
            padding: "",
            width: d + "px",
            zIndex: b.zIndexLowest + 1,
            marginLeft: -1 * Math.round(d / 2) + "px"
        });
        e ? j.appendTo("body").fadeIn() : j.fadeIn()
    }
    ;
    k.showHighRes = function(a, b) {
        if (b._playing)
            clearTimeout(b._timeout),
            b._timeout = setTimeout(function() {
                k.nextImage(b, 1)
            }, b.autoPlayInterval * 1E3);
        var e = Math.round(h(window).height() * 0.85) - 60
          , g = Math.round(h(window).width() * 0.85)
          , d = a.width()
          , j = a.height()
          , e = Math.min(g / d, e / j);
        e < 1 && (d = Math.round(d * e),
        j = Math.round(j * e));
        e = a.clone();
        e.addClass("wdSSHighRes").css({
            width: d + "px",
            height: j + "px",
            zIndex: b.zIndexLowest + 2,
            position: "fixed",
            left: "50%",
            top: "50%",
            marginLeft: -1 * Math.round(d / 2) + "px",
            marginTop: -1 * Math.round(j / 2) - 25 + "px"
        }).appendTo("body").fadeIn();
        b.showCaptions && k.showCaption(e, d, j, b)
    }
    ;
    k.showCaption = function(a, b, e, d) {
        var k = h("body > div.wdSlideShowCaption");
        k.fadeOut(null , function() {
            k.remove()
        });
        var j = a.offset().top - 16;
        e < 300 && (j -= 32);
        a = a.attr("alt");
        a = h({
            "div.wdSlideShowCaption": {
                span: a
            }
        });
        a.css({
            position: "fixed",
            left: "50%",
            top: j + "px",
            marginLeft: -1 * Math.round(b / 2) + "px",
            width: b + "px",
            zIndex: d.zIndexLowest + 5
        }).fadeIn();
        a.appendTo("body").fadeIn()
    }
    ;
    k.createBlocker = function(a) {
        var b = h({
            "div#wdOverlayBlockout": {
                _attr: {
                    title: a.closeTitle
                },
                _events: {
                    click: function() {
                        a.disableClosing || k.closeAll(a)
                    }
                }
            }
        });
        b.css({
            backgroundColor: a.overlayColour,
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            position: "fixed",
            zIndex: a.zIndexLowest
        });
        a.myClass !== null && b.addClass(a.myClass);
        b.appendTo("body");
        if (h._int.browser.handheldDevice) {
            var e = b.width()
              , g = b.height()
              , l = h(d)
              , g = Math.max(l.height(), g)
              , e = Math.max(l.width(), e);
            b.css({
                width: e + "px",
                height: g + "px"
            })
        }
        return b
    }
    ;
    k.resizeAll = function(a) {
        var b = h("div#wdSlideshowPreloader img")
          , e = h("div#wdSlideshowThumbs img");
        k.showThumbnails(e, a, !1);
        var d = h("img.wdSSHighRes");
        d.fadeOut(null , function() {
            d.length > 1 && d.remove()
        });
        h(function() {
            k.showHighRes(b, a)
        }, 10)
    }
    ;
    k.closeAll = function(a) {
        clearTimeout(a._timeout);
        h(d).unbind("keyup.wdSlideShow");
        h(window).unbind("resize.wdSlideShow");
        typeof a.onClose == "function" && a.onClose.call(window);
        h("body > div.wdSlideShowCaption").fadeOut(null , function() {
            h("body > div.wdSlideShowCaption").remove()
        });
        k.closeContent(a);
        h("img.wdSSHighRes").fadeOut(null , function() {
            h("img.wdSSHighRes").remove()
        });
        h("div#wdSlideshowThumbs").fadeOut(null , function() {
            h("div#wdSlideshowThumbs").remove()
        });
        k.closeOverlay(a);
        h("div#wdSlideshowPreloader").remove()
    }
    ;
    k.closeOverlay = function() {
        var a = h("div#wdOverlayBlockout");
        a.fadeOut(null , function() {
            a.remove()
        })
    }
    ;
    k.closeContent = function() {
        var a = h("div#wdOverlayContent");
        a.fadeOut(null , function() {
            a.remove()
        })
    }
    ;
    k.mergeSettings = function(a, b) {
        var e = {}, d;
        for (d in a)
            a.hasOwnProperty(d) && (e[d] = a[d]);
        if (typeof b == "undefined")
            return e;
        for (var k in b)
            b.hasOwnProperty(k) && (e[k] = b[k]);
        return e
    }
})(window);
(function(h) {
    var d = h.wisDOM
      , b = {};
    d.event = {};
    d.event.publish = function(a, d, f) {
        var c = [], e;
        for (e in b)
            b.hasOwnProperty(e) && e == a && (c = b[e]);
        for (a = c.length; a--; )
            setTimeout(function(a) {
                return function() {
                    a.call(d, f)
                }
            }(c[a].fn), 0)
    }
    ;
    d.event.subscribe = function(a, k) {
        typeof b[a] == "undefined" && (b[a] = []);
        if (typeof k == "function") {
            var f = d._int.generateID();
            b[a].push({
                id: f,
                fn: k
            });
            return {
                name: a,
                id: f
            }
        }
    }
    ;
    d.event.unsubscribe = function(a, d) {
        if (typeof a == "undefined" || typeof d == "undefined")
            return !1;
        if (typeof b[a] != "undefined") {
            for (var f = b[a], c = [], e = f.length; e--; )
                f[e].id != d && c.push(f[e]);
            b[a] = c
        }
    }
    ;
    d.event.destroy = function(a) {
        if (typeof a == "undefined")
            return !1;
        typeof b[a] != "undefined" && (b[a] = [])
    }
    ;
    d(function() {
        try {
            d(h).bind("unload", function() {
                for (var a in b)
                    b.hasOwnProperty(a) && (b[a] = null )
            })
        } catch (a) {}
    })
})(window);
(function(h) {
    var d = h.wisDOM
      , b = {};
    d.colour = {};
    d.colour.parse = function(a) {
        var k = {}
          , f = function(a, e) {
            e = e || a.hsl;
            a.hsl = e;
            var f = a.hsl[0]
              , f = f < 0 ? 360 + f : f;
            a.hsl[0] = f >= 360 ? f - 360 : f;
            f = a.hsl[1];
            f = f < 0 ? 0 : f;
            a.hsl[1] = f > 1 ? 1 : f;
            f = a.hsl[2];
            f = f < 0 ? 0 : f;
            a.hsl[2] = f > 1 ? 1 : f;
            a.rgb = b.hslToRgb(e);
            a.hex = b.rgbToHex(a.rgb);
            a.brightness = (a.rgb[0] * 299 + a.rgb[1] * 587 + a.rgb[2] * 88) / 1E3;
            a.overlay = a.brightness > 120 ? "#000" : "#FFF"
        }
        ;
        k.brighten = function(a) {
            this.hsl[2] += a;
            f(this);
            return this
        }
        ;
        k.saturate = function(a) {
            this.hsl[1] += a;
            f(this);
            return this
        }
        ;
        k.hueShift = function(a) {
            a = a > 359 ? 359 : a;
            this.hsl[0] += a < -359 ? -359 : a;
            f(this);
            return this
        }
        ;
        k.setHue = function(a) {
            a = a >= 360 ? 0 : a;
            this.hsl[0] = a < 0 ? 0 : a;
            f(this);
            return this
        }
        ;
        k.setSat = function(a) {
            this.hsl[1] = a;
            f(this);
            return this
        }
        ;
        k.setLum = function(a) {
            this.hsl[2] = a;
            f(this);
            return this
        }
        ;
        k.reset = function() {
            f(this, this._initVal);
            return this
        }
        ;
        k.dupe = function() {
            var a = this.hsl.slice(0);
            return d.colour.parse(a)
        }
        ;
        a = typeof a == "string" ? b.hexToHsl(a) : a;
        k._initVal = a;
        f(k, a);
        return k
    }
    ;
    b.rgbToHex = function(a) {
        var b = a[0].toString(16)
          , b = b.length < 2 ? "0" + b : b
          , f = a[1].toString(16)
          , f = f.length < 2 ? "0" + f : f
          , a = a[2].toString(16)
          , a = a.length < 2 ? "0" + a : a;
        return "#" + b + f + a
    }
    ;
    b.hexToRgb = function(a) {
        var a = b.expandHex(a).replace(/^#/, "")
          , a = a.split("")
          , d = [];
        d[0] = parseInt(a[0] + a[1], 16);
        d[1] = parseInt(a[2] + a[3], 16);
        d[2] = parseInt(a[4] + a[5], 16);
        return d
    }
    ;
    b.expandHex = function(a) {
        a = a.replace(/^#/, "");
        a = a.length == 3 ? a.charAt(0) + a.charAt(0) + a.charAt(1) + a.charAt(1) + a.charAt(2) + a.charAt(2) : a;
        return "#" + a
    }
    ;
    b.hexToHsl = function(a) {
        a = b.expandHex(a);
        a = b.hexToRgb(a);
        return b.rgbToHsl(a)
    }
    ;
    b.hslToHex = function(a) {
        a = b.hslToRgb(a);
        return b.rgbToHex(a)
    }
    ;
    b.rgbToHsl = function(a) {
        var b = a[0]
          , f = a[1]
          , a = a[2];
        b /= 255;
        f /= 255;
        a /= 255;
        var c = Math.max(b, f, a), e = Math.min(b, f, a), d, l = (c + e) / 2;
        if (c == e)
            d = e = 0;
        else {
            var j = c - e
              , e = l > 0.5 ? j / (2 - c - e) : j / (c + e);
            switch (c) {
            case b:
                d = (f - a) / j + (f < a ? 6 : 0);
                break;
            case f:
                d = (a - b) / j + 2;
                break;
            case a:
                d = (b - f) / j + 4
            }
            d /= 6
        }
        return [d * 360, e, l]
    }
    ;
    b.hslToRgb = function(a) {
        var b = a[0] / 360
          , f = a[1]
          , c = a[2];
        if (f === 0)
            f = c = b = c;
        else
            var a = function(a, b, c) {
                c < 0 && (c += 1);
                c > 1 && (c -= 1);
                if (c < 1 / 6)
                    return a + (b - a) * 6 * c;
                if (c < 0.5)
                    return b;
                if (c < 2 / 3)
                    return a + (b - a) * (2 / 3 - c) * 6;
                return a
            }
              , e = c < 0.5 ? c * (1 + f) : c + f - c * f
              , d = 2 * c - e
              , f = a(d, e, b + 1 / 3)
              , c = a(d, e, b)
              , b = a(d, e, b - 1 / 3);
        return [Math.round(f * 255), Math.round(c * 255), Math.round(b * 255)]
    }
})(window);
(function(h) {
    var d = h.wisDOM
      , b = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/;
    d.json = {};
    d.json.parse = function(a) {
        try {
            var b;
            typeof h.JSON != "undefined" && typeof h.JSON.parse != "undefined" ? b = h.JSON.parse(a) : /^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")) && (b = eval("(" + a + ")"));
            return b = d.json.convertDates(b)
        } catch (c) {
            return null
        }
    }
    ;
    d.json.stringify = function(a) {
        try {
            if (typeof h.JSON != "undefined" && typeof h.JSON.stringify != "undefined")
                return h.JSON.stringify(a);
            var f = arguments.callee
              , c = ""
              , e = ""
              , d = a.constructor;
            thisStr = "";
            switch (d) {
            case Object:
                var c = "{", e = "}", l;
                for (l in a)
                    a.hasOwnProperty(l) && typeof a[l] != "function" && (thisStr += '"' + l.replace(/[^\\]"/g, '\\"') + '":',
                    thisStr += f(a[l]),
                    thisStr += ",");
                break;
            case Array:
                for (var c = "[", e = "]", j = a.length, m = 0; m < j; m++)
                    thisStr += f(a[m]),
                    thisStr += ",";
                break;
            case Number:
                thisStr = a.toString();
                break;
            case String:
                e = c = '"';
                thisStr = a.replace(/[^\\]"/g, '\\"');
                break;
            case Boolean:
                thisStr = a.toString();
                break;
            case Date:
                e = c = '"';
                m = a.toString();
                if (!b.test(m)) {
                    var n, o, w, v, p, q, r;
                    n = a.getUTCFullYear().toString();
                    o = (a.getUTCMonth() + 1).toString();
                    w = a.getUTCDate().toString();
                    v = a.getUTCHours().toString();
                    p = a.getUTCMinutes().toString();
                    q = a.getUTCSeconds().toString();
                    r = a.getUTCMilliseconds().toString();
                    o = o.length == 1 ? "0" + o : o;
                    w = w.length == 1 ? "0" + w : w;
                    v = v.length == 1 ? "0" + v : v;
                    p = p.length == 1 ? "0" + p : p;
                    q = q.length == 1 ? "0" + q : q;
                    if (r.length < 3) {
                        for (var f = "", s = 3 - r.length, j = 0; j < s; j++)
                            f += "0";
                        r = f + r
                    }
                    m = [n, o, w].join("-") + "T" + [v, p, q].join(":") + "." + r + "Z"
                }
                thisStr = m
            }
            return (c + thisStr + e).replace(/,(\]|\})/g, "$1")
        } catch (u) {
            return ""
        }
    }
    ;
    d.json.convertDates = function(d) {
        var f = a, c = arguments.callee, e;
        for (e in d)
            if (d.hasOwnProperty(e)) {
                var g = typeof d[e];
                g == "array" || g == "object" ? c(d[e]) : g == "string" && b.test(d[e]) === !0 && (d[e] = f(d[e]))
            }
        return d
    }
    ;
    var a = function(a) {
        if (b.test(a) === !1)
            return a;
        var f = b.exec(a)
          , a = parseInt(f[1], 10)
          , c = parseInt(f[2], 10)
          , e = parseInt(f[3], 10)
          , d = parseInt(f[4], 10)
          , l = parseInt(f[5], 10)
          , j = parseInt(f[6], 10)
          , f = parseInt(f[7], 10)
          , m = new Date;
        m.setUTCFullYear(a);
        m.setUTCMonth(c - 1, e);
        m.setUTCDate(e);
        m.setUTCHours(d);
        m.setUTCMinutes(l);
        m.setUTCSeconds(j);
        m.setUTCMilliseconds(f);
        return m
    }
})(window);
(function(h) {
    var d = h.wisDOM, b = {}, a, k;
    d.hover = d.fn.hover = function(a) {
        var c = this.length, e, d = h.wisDOM;
        if (!a || typeof a == "undefined" || this.length === 0)
            return this;
        for (b.init.call(this); c--; )
            e = d(this[c]),
            e._data = b.prepData.call(e, a),
            b.bindEvents.call(e, e);
        return this
    }
    ;
    b.init = function() {
        if (typeof a == "undefined") {
            var b = d({
                "div#wdHoverContainer": {
                    "div.wrapper": {}
                }
            });
            b.css({
                position: "absolute",
                left: "-100000px",
                top: "-10000px"
            });
            b.appendTo("body");
            a = b;
            k = b.find("div.wrapper")
        }
    }
    ;
    b.bindEvents = function() {
        var a = this
          , c = "mouseover"
          , e = "mouseout"
          , g = d._int.browser.touchDevice;
        g && (c = "touchstart",
        e = "touchend");
        this.bind(c + ".wdHover", function(c) {
            return b.showInclusionHover.call(a, c)
        });
        g === !1 && this.bind(e + ".wdHover", function(c) {
            return b.hideInclusionHover.call(a, c)
        })
    }
    ;
    b.showInclusionHover = function(f) {
        b.hideInclusionHover.call(this, f);
        var c = this._data.clone();
        k.empty();
        k.append(c);
        var e = d(h).width()
          , g = d(h).height()
          , l = a.width()
          , j = a.height()
          , m = d._int.checkScroll(h)
          , n = d(f.target);
        d._int.browser.touchDevice === !1 ? n.bind("mousemove.wdHover", function(c) {
            return b.mouseMove(c, e, g, l, j, m, a)
        }) : (d(function() {
            d("body").bind("touchstart.wdHover", function(a) {
                d("body").unbind("touchstart.wdHover");
                b.hideInclusionHover(a)
            })
        }, 10),
        d(function() {
            k.append(c);
            b.mouseMove(f, e, g, l, j, m, a)
        }, 100));
        return !1
    }
    ;
    b.mouseMove = function(a, b, e, d, l, j, m) {
        var n, o = !1;
        a.touches ? (o = !0,
        n = a.touches[0].clientX,
        a = a.touches[0].clientY) : typeof a.clientX != "undefined" ? (n = a.clientX,
        a = a.clientY) : (n = a.pageX,
        a = a.pageY);
        j === !1 && (j = {
            x: {
                at: 0
            },
            y: {
                at: 0
            }
        });
        var w = 14;
        o && (n -= j.x.at,
        a -= j.y.at);
        n + d > b - 20 && (n = b - d);
        a + l > e - 20 && (a -= l,
        w = -14);
        m.css({
            left: n + -1 + j.x.at + "px",
            top: a + w + j.y.at + "px"
        });
        return !1
    }
    ;
    b.hideInclusionHover = function() {
        typeof this._wdVersion != "undefined" && this.unbind("mousemove.wdHover");
        k.empty();
        a.css({
            left: "-10000px",
            top: "-10000px"
        })
    }
    ;
    b.prepData = function(a) {
        if (typeof a._wdVersion != "undefined")
            return a;
        var b = d(a);
        if (b.length > 0 && typeof a == "object")
            return b;
        if (b.length > 0 && typeof a == "string")
            return b.clone();
        b = d({
            div: ""
        });
        b.html(a);
        return b.children()
    }
})(window);
(function(h) {
    function d(a, b) {
        return function(c) {
            return g(a.call(this, c), b)
        }
    }
    function b(a) {
        return function(b) {
            return this.lang().ordinal(a.call(this, b))
        }
    }
    function a() {}
    function k(a) {
        c(this, a)
    }
    function f(a) {
        var b = this._data = {}
          , c = a.years || a.year || a.y || 0
          , d = a.months || a.month || a.M || 0
          , f = a.weeks || a.week || a.w || 0
          , g = a.days || a.day || a.d || 0
          , n = a.hours || a.hour || a.h || 0
          , o = a.minutes || a.minute || a.m || 0
          , m = a.seconds || a.second || a.s || 0
          , a = a.milliseconds || a.millisecond || a.ms || 0;
        this._milliseconds = a + m * 1E3 + o * 6E4 + n * 36E5;
        this._days = g + f * 7;
        this._months = d + c * 12;
        b.milliseconds = a % 1E3;
        m += e(a / 1E3);
        b.seconds = m % 60;
        o += e(m / 60);
        b.minutes = o % 60;
        n += e(o / 60);
        b.hours = n % 24;
        g += e(n / 24);
        g += f * 7;
        b.days = g % 30;
        d += e(g / 30);
        b.months = d % 12;
        c += e(d / 12);
        b.years = c
    }
    function c(a, b) {
        for (var c in b)
            b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    }
    function e(a) {
        return a < 0 ? Math.ceil(a) : Math.floor(a)
    }
    function g(a, b) {
        for (var c = a + ""; c.length < b; )
            c = "0" + c;
        return c
    }
    function l(a, b, c) {
        var e = b._milliseconds
          , d = b._days
          , b = b._months;
        e && a._d.setTime(+a + e * c);
        d && a.date(a.date() + d * c);
        b && (e = a.date(),
        a.date(1).month(a.month() + b * c).date(Math.min(e, a.daysInMonth())))
    }
    function j(a, b) {
        var c = Math.min(a.length, b.length), e = Math.abs(a.length - b.length), d = 0, f;
        for (f = 0; f < c; f++)
            ~~a[f] !== ~~b[f] && d++;
        return d + e
    }
    function m(a) {
        if (!a)
            return t.fn._lang;
        !F[a] && B && require("./lang/" + a);
        return F[a]
    }
    function n(a) {
        if (a.match(/\[.*\]/))
            return a.replace(/^\[|\]$/g, "");
        return a.replace(/\\/g, "")
    }
    function o(a) {
        var b = a.match(A), c, e;
        c = 0;
        for (e = b.length; c < e; c++)
            b[c] = N[b[c]] ? N[b[c]] : n(b[c]);
        return function(d) {
            var f = "";
            for (c = 0; c < e; c++)
                f += typeof b[c].call === "function" ? b[c].call(d, a) : b[c];
            return f
        }
    }
    function w(a, b) {
        function c(b) {
            return a.lang().longDateFormat(b) || b
        }
        for (var e = 5; e-- && H.test(b); )
            b = b.replace(H, c);
        W[b] || (W[b] = o(b));
        return W[b](a)
    }
    function v(a) {
        switch (a) {
        case "DDDD":
            return J;
        case "YYYY":
            return M;
        case "YYYYY":
            return P;
        case "S":
        case "SS":
        case "SSS":
        case "DDD":
            return K;
        case "MMM":
        case "MMMM":
        case "dd":
        case "ddd":
        case "dddd":
        case "a":
        case "A":
            return Q;
        case "X":
            return T;
        case "Z":
        case "ZZ":
            return R;
        case "T":
            return S;
        case "MM":
        case "DD":
        case "YY":
        case "HH":
        case "hh":
        case "mm":
        case "ss":
        case "M":
        case "D":
        case "d":
        case "H":
        case "h":
        case "m":
        case "s":
            return I;
        default:
            return RegExp(a.replace("\\", ""))
        }
    }
    function p(a) {
        var b, c = [];
        if (!a._d) {
            for (b = 0; b < 7; b++)
                a._a[b] = c[b] = a._a[b] == null ? b === 2 ? 1 : 0 : a._a[b];
            c[3] += a._tzh || 0;
            c[4] += a._tzm || 0;
            b = new Date(0);
            a._useUTC ? (b.setUTCFullYear(c[0], c[1], c[2]),
            b.setUTCHours(c[3], c[4], c[5], c[6])) : (b.setFullYear(c[0], c[1], c[2]),
            b.setHours(c[3], c[4], c[5], c[6]));
            a._d = b
        }
    }
    function q(a) {
        var b = a._f.match(A), c = a._i, e, d;
        a._a = [];
        for (e = 0; e < b.length; e++)
            if ((d = (v(b[e]).exec(c) || [])[0]) && (c = c.slice(c.indexOf(d) + d.length)),
            N[b[e]]) {
                var f = a
                  , g = void 0
                  , n = f._a;
                switch (b[e]) {
                case "M":
                case "MM":
                    n[1] = d == null ? 0 : ~~d - 1;
                    break;
                case "MMM":
                case "MMMM":
                    g = m(f._l).monthsParse(d);
                    g != null ? n[1] = g : f._isValid = !1;
                    break;
                case "D":
                case "DD":
                case "DDD":
                case "DDDD":
                    d != null && (n[2] = ~~d);
                    break;
                case "YY":
                    n[0] = ~~d + (~~d > 68 ? 1900 : 2E3);
                    break;
                case "YYYY":
                case "YYYYY":
                    n[0] = ~~d;
                    break;
                case "a":
                case "A":
                    f._isPm = (d + "").toLowerCase() === "pm";
                    break;
                case "H":
                case "HH":
                case "h":
                case "hh":
                    n[3] = ~~d;
                    break;
                case "m":
                case "mm":
                    n[4] = ~~d;
                    break;
                case "s":
                case "ss":
                    n[5] = ~~d;
                    break;
                case "S":
                case "SS":
                case "SSS":
                    n[6] = ~~(("0." + d) * 1E3);
                    break;
                case "X":
                    f._d = new Date(parseFloat(d) * 1E3);
                    break;
                case "Z":
                case "ZZ":
                    f._useUTC = !0;
                    if ((g = (d + "").match(Y)) && g[1])
                        f._tzh = ~~g[1];
                    if (g && g[2])
                        f._tzm = ~~g[2];
                    if (g && g[0] === "+")
                        f._tzh = -f._tzh,
                        f._tzm = -f._tzm
                }
                if (d == null )
                    f._isValid = !1
            }
        a._isPm && a._a[3] < 12 && (a._a[3] += 12);
        a._isPm === !1 && a._a[3] === 12 && (a._a[3] = 0);
        p(a)
    }
    function r(a, b, c, e, d) {
        return d.relativeTime(b || 1, !!c, a, e)
    }
    function s(a, b, c) {
        b = c - b;
        c -= a.day();
        c > b && (c -= 7);
        c < b - 7 && (c += 7);
        return Math.ceil(t(a).add("d", c).dayOfYear() / 7)
    }
    function u(a) {
        var b = a._i
          , e = a._f;
        if (b === null || b === "")
            return null ;
        if (typeof b === "string")
            a._i = b = m().preparse(b);
        if (t.isMoment(b))
            a = c({}, b),
            a._d = new Date(+b._d);
        else if (e)
            if (Object.prototype.toString.call(e) === "[object Array]") {
                for (var b = a, d, f, g = 99; b._f.length; ) {
                    d = c({}, b);
                    d._f = b._f.pop();
                    q(d);
                    e = new k(d);
                    if (e.isValid()) {
                        f = e;
                        break
                    }
                    d = j(d._a, e.toArray());
                    d < g && (g = d,
                    f = e)
                }
                c(b, f)
            } else
                q(a);
        else if (f = a,
        b = f._i,
        e = G.exec(b),
        b === h)
            f._d = new Date;
        else if (e)
            f._d = new Date(+e[1]);
        else if (typeof b === "string")
            if (e = f._i,
            U.exec(e)) {
                f._f = "YYYY-MM-DDT";
                for (b = 0; b < 4; b++)
                    if (V[b][1].exec(e)) {
                        f._f += V[b][0];
                        break
                    }
                R.exec(e) && (f._f += " Z");
                q(f)
            } else
                f._d = new Date(e);
        else
            Object.prototype.toString.call(b) === "[object Array]" ? (f._a = b.slice(0),
            p(f)) : f._d = b instanceof Date ? new Date(+b) : new Date(b);
        return new k(a)
    }
    function y(a, b) {
        t.fn[a] = t.fn[a + "s"] = function(a) {
            var c = this._isUTC ? "UTC" : "";
            return a != null ? (this._d["set" + c + b](a),
            this) : this._d["get" + c + b]()
        }
    }
    function E(a) {
        t.duration.fn[a] = function() {
            return this._data[a]
        }
    }
    function x(a, b) {
        t.duration.fn["as" + a] = function() {
            return +this / b
        }
    }
    for (var t, C = Math.round, z, F = {}, B = typeof module !== "undefined" && module.exports, G = /^\/?Date\((\-?\d+)/i, A = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, H = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, I = /\d\d?/, K = /\d{1,3}/, J = /\d{3}/, M = /\d{1,4}/, P = /[+\-]?\d{1,6}/, Q = /[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF]+\s*?[\u0600-\u06FF]+/i, R = /Z|[\+\-]\d\d:?\d\d/i, S = /T/i, T = /[\+\-]?\d+(\.\d{1,3})?/, U = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, V = [["HH:mm:ss.S", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]], Y = /([\+\-]|\d\d)/gi, L = "Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"), X = {
        Milliseconds: 1,
        Seconds: 1E3,
        Minutes: 6E4,
        Hours: 36E5,
        Days: 864E5,
        Months: 2592E6,
        Years: 31536E6
    }, W = {}, Z = "DDD w W M D d".split(" "), O = "M D H h m s w W".split(" "), N = {
        M: function() {
            return this.month() + 1
        },
        MMM: function(a) {
            return this.lang().monthsShort(this, a)
        },
        MMMM: function(a) {
            return this.lang().months(this, a)
        },
        D: function() {
            return this.date()
        },
        DDD: function() {
            return this.dayOfYear()
        },
        d: function() {
            return this.day()
        },
        dd: function(a) {
            return this.lang().weekdaysMin(this, a)
        },
        ddd: function(a) {
            return this.lang().weekdaysShort(this, a)
        },
        dddd: function(a) {
            return this.lang().weekdays(this, a)
        },
        w: function() {
            return this.week()
        },
        W: function() {
            return this.isoWeek()
        },
        YY: function() {
            return g(this.year() % 100, 2)
        },
        YYYY: function() {
            return g(this.year(), 4)
        },
        YYYYY: function() {
            return g(this.year(), 5)
        },
        a: function() {
            return this.lang().meridiem(this.hours(), this.minutes(), !0)
        },
        A: function() {
            return this.lang().meridiem(this.hours(), this.minutes(), !1)
        },
        H: function() {
            return this.hours()
        },
        h: function() {
            return this.hours() % 12 || 12
        },
        m: function() {
            return this.minutes()
        },
        s: function() {
            return this.seconds()
        },
        S: function() {
            return ~~(this.milliseconds() / 100)
        },
        SS: function() {
            return g(~~(this.milliseconds() / 10), 2)
        },
        SSS: function() {
            return g(this.milliseconds(), 3)
        },
        Z: function() {
            var a = -this.zone()
              , b = "+";
            a < 0 && (a = -a,
            b = "-");
            return b + g(~~(a / 60), 2) + ":" + g(~~a % 60, 2)
        },
        ZZ: function() {
            var a = -this.zone()
              , b = "+";
            a < 0 && (a = -a,
            b = "-");
            return b + g(~~(10 * a / 6), 4)
        },
        X: function() {
            return this.unix()
        }
    }; Z.length; )
        z = Z.pop(),
        N[z + "o"] = b(N[z]);
    for (; O.length; )
        z = O.pop(),
        N[z + z] = d(N[z], 2);
    N.DDDD = d(N.DDD, 3);
    a.prototype = {
        set: function(a) {
            var b, c;
            for (c in a)
                b = a[c],
                typeof b === "function" ? this[c] = b : this["_" + c] = b
        },
        _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months: function(a) {
            return this._months[a.month()]
        },
        _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort: function(a) {
            return this._monthsShort[a.month()]
        },
        monthsParse: function(a) {
            var b, c;
            if (!this._monthsParse)
                this._monthsParse = [];
            for (b = 0; b < 12; b++)
                if (this._monthsParse[b] || (c = t([2E3, b]),
                c = "^" + this.months(c, "") + "|^" + this.monthsShort(c, ""),
                this._monthsParse[b] = RegExp(c.replace(".", ""), "i")),
                this._monthsParse[b].test(a))
                    return b
        },
        _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays: function(a) {
            return this._weekdays[a.day()]
        },
        _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort: function(a) {
            return this._weekdaysShort[a.day()]
        },
        _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin: function(a) {
            return this._weekdaysMin[a.day()]
        },
        _longDateFormat: {
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D YYYY",
            LLL: "MMMM D YYYY LT",
            LLLL: "dddd, MMMM D YYYY LT"
        },
        longDateFormat: function(a) {
            var b = this._longDateFormat[a];
            !b && this._longDateFormat[a.toUpperCase()] && (b = this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(a) {
                return a.slice(1)
            }),
            this._longDateFormat[a] = b);
            return b
        },
        meridiem: function(a, b, c) {
            return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
        },
        _calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[last] dddd [at] LT",
            sameElse: "L"
        },
        calendar: function(a, b) {
            var c = this._calendar[a];
            return typeof c === "function" ? c.apply(b) : c
        },
        _relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        relativeTime: function(a, b, c, e) {
            var d = this._relativeTime[c];
            return typeof d === "function" ? d(a, b, c, e) : d.replace(/%d/i, a)
        },
        pastFuture: function(a, b) {
            var c = this._relativeTime[a > 0 ? "future" : "past"];
            return typeof c === "function" ? c(b) : c.replace(/%s/i, b)
        },
        ordinal: function(a) {
            return this._ordinal.replace("%d", a)
        },
        _ordinal: "%d",
        preparse: function(a) {
            return a
        },
        postformat: function(a) {
            return a
        },
        week: function(a) {
            return s(a, this._week.dow, this._week.doy)
        },
        _week: {
            dow: 0,
            doy: 6
        }
    };
    t = function(a, b, c) {
        return u({
            _i: a,
            _f: b,
            _l: c,
            _isUTC: !1
        })
    }
    ;
    t.utc = function(a, b, c) {
        return u({
            _useUTC: !0,
            _isUTC: !0,
            _l: c,
            _i: a,
            _f: b
        })
    }
    ;
    t.unix = function(a) {
        return t(a * 1E3)
    }
    ;
    t.duration = function(a, b) {
        var c = t.isDuration(a)
          , e = typeof a === "number"
          , d = c ? a._data : e ? {} : a;
        if (e)
            b ? d[b] = a : d.milliseconds = a;
        e = new f(d);
        if (c && a.hasOwnProperty("_lang"))
            e._lang = a._lang;
        return e
    }
    ;
    t.version = "2.0.0";
    t.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    t.lang = function(b, c) {
        if (!b)
            return t.fn._lang._abbr;
        c ? (c.abbr = b,
        F[b] || (F[b] = new a),
        F[b].set(c)) : F[b] || m(b);
        t.duration.fn._lang = t.fn._lang = m(b)
    }
    ;
    t.langData = function(a) {
        if (a && a._lang && a._lang._abbr)
            a = a._lang._abbr;
        return m(a)
    }
    ;
    t.isMoment = function(a) {
        return a instanceof k
    }
    ;
    t.isDuration = function(a) {
        return a instanceof f
    }
    ;
    t.fn = k.prototype = {
        clone: function() {
            return t(this)
        },
        valueOf: function() {
            return +this._d
        },
        unix: function() {
            return Math.floor(+this._d / 1E3)
        },
        toString: function() {
            return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        },
        toDate: function() {
            return this._d
        },
        toJSON: function() {
            return t.utc(this).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        },
        toArray: function() {
            return [this.year(), this.month(), this.date(), this.hours(), this.minutes(), this.seconds(), this.milliseconds()]
        },
        isValid: function() {
            if (this._isValid == null )
                this._isValid = this._a ? !j(this._a, (this._isUTC ? t.utc(this._a) : t(this._a)).toArray()) : !isNaN(this._d.getTime());
            return !!this._isValid
        },
        utc: function() {
            this._isUTC = !0;
            return this
        },
        local: function() {
            this._isUTC = !1;
            return this
        },
        format: function(a) {
            a = w(this, a || t.defaultFormat);
            return this.lang().postformat(a)
        },
        add: function(a, b) {
            var c;
            c = typeof a === "string" ? t.duration(+b, a) : t.duration(a, b);
            l(this, c, 1);
            return this
        },
        subtract: function(a, b) {
            var c;
            c = typeof a === "string" ? t.duration(+b, a) : t.duration(a, b);
            l(this, c, -1);
            return this
        },
        diff: function(a, b, c) {
            var a = this._isUTC ? t(a).utc() : t(a).local(), d = (this.zone() - a.zone()) * 6E4, f;
            b && (b = b.replace(/s$/, ""));
            b === "year" || b === "month" ? (d = (this.daysInMonth() + a.daysInMonth()) * 432E5,
            f = (this.year() - a.year()) * 12 + (this.month() - a.month()),
            f += (this - t(this).startOf("month") - (a - t(a).startOf("month"))) / d,
            b === "year" && (f /= 12)) : (d = this - a - d,
            f = b === "second" ? d / 1E3 : b === "minute" ? d / 6E4 : b === "hour" ? d / 36E5 : b === "day" ? d / 864E5 : b === "week" ? d / 6048E5 : d);
            return c ? f : e(f)
        },
        from: function(a, b) {
            return t.duration(this.diff(a)).lang(this.lang()._abbr).humanize(!b)
        },
        fromNow: function(a) {
            return this.from(t(), a)
        },
        calendar: function() {
            var a = this.diff(t().startOf("day"), "days", !0);
            return this.format(this.lang().calendar(a < -6 ? "sameElse" : a < -1 ? "lastWeek" : a < 0 ? "lastDay" : a < 1 ? "sameDay" : a < 2 ? "nextDay" : a < 7 ? "nextWeek" : "sameElse", this))
        },
        isLeapYear: function() {
            var a = this.year();
            return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
        },
        isDST: function() {
            return this.zone() < t([this.year()]).zone() || this.zone() < t([this.year(), 5]).zone()
        },
        day: function(a) {
            var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return a == null ? b : this.add({
                d: a - b
            })
        },
        startOf: function(a) {
            a = a.replace(/s$/, "");
            switch (a) {
            case "year":
                this.month(0);
            case "month":
                this.date(1);
            case "week":
            case "day":
                this.hours(0);
            case "hour":
                this.minutes(0);
            case "minute":
                this.seconds(0);
            case "second":
                this.milliseconds(0)
            }
            a === "week" && this.day(0);
            return this
        },
        endOf: function(a) {
            return this.startOf(a).add(a.replace(/s?$/, "s"), 1).subtract("ms", 1)
        },
        isAfter: function(a, b) {
            b = typeof b !== "undefined" ? b : "millisecond";
            return +this.clone().startOf(b) > +t(a).startOf(b)
        },
        isBefore: function(a, b) {
            b = typeof b !== "undefined" ? b : "millisecond";
            return +this.clone().startOf(b) < +t(a).startOf(b)
        },
        isSame: function(a, b) {
            b = typeof b !== "undefined" ? b : "millisecond";
            return +this.clone().startOf(b) === +t(a).startOf(b)
        },
        zone: function() {
            return this._isUTC ? 0 : this._d.getTimezoneOffset()
        },
        daysInMonth: function() {
            return t.utc([this.year(), this.month() + 1, 0]).date()
        },
        dayOfYear: function(a) {
            var b = C((t(this).startOf("day") - t(this).startOf("year")) / 864E5) + 1;
            return a == null ? b : this.add("d", a - b)
        },
        isoWeek: function(a) {
            var b = s(this, 1, 4);
            return a == null ? b : this.add("d", (a - b) * 7)
        },
        week: function(a) {
            var b = this.lang().week(this);
            return a == null ? b : this.add("d", (a - b) * 7)
        },
        lang: function(a) {
            return a === h ? this._lang : (this._lang = m(a),
            this)
        }
    };
    for (z = 0; z < L.length; z++)
        y(L[z].toLowerCase().replace(/s$/, ""), L[z]);
    y("year", "FullYear");
    t.fn.days = t.fn.day;
    t.fn.weeks = t.fn.week;
    t.fn.isoWeeks = t.fn.isoWeek;
    t.duration.fn = f.prototype = {
        weeks: function() {
            return e(this.days() / 7)
        },
        valueOf: function() {
            return this._milliseconds + this._days * 864E5 + this._months * 2592E6
        },
        humanize: function(a) {
            var b = +this, c;
            c = !a;
            var e = this.lang()
              , d = C(Math.abs(b) / 1E3)
              , f = C(d / 60)
              , g = C(f / 60)
              , n = C(g / 24)
              , o = C(n / 365)
              , d = d < 45 && ["s", d] || f === 1 && ["m"] || f < 45 && ["mm", f] || g === 1 && ["h"] || g < 22 && ["hh", g] || n === 1 && ["d"] || n <= 25 && ["dd", n] || n <= 45 && ["M"] || n < 345 && ["MM", C(n / 30)] || o === 1 && ["y"] || ["yy", o];
            d[2] = c;
            d[3] = b > 0;
            d[4] = e;
            c = r.apply({}, d);
            a && (c = this.lang().pastFuture(b, c));
            return this.lang().postformat(c)
        },
        lang: t.fn.lang
    };
    for (z in X)
        X.hasOwnProperty(z) && (x(z, X[z]),
        E(z.toLowerCase()));
    x("Weeks", 6048E5);
    t.lang("en", {
        ordinal: function(a) {
            var b = a % 10;
            return a + (~~(a % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th")
        }
    });
    if (B)
        module.exports = t;
    typeof ender === "undefined" && (this.moment = t);
    typeof define === "function" && define.amd && define("moment", [], function() {
        return t
    })
}
).call(this);
(function(h) {
    h.BE = {};
    h.BE.gadget = {};
    var d = h.wisDOM
      , b = h.BE
      , a = [];
    b.gadget.currencyId = "";
    var k = function(e) {
        if (e.vcID == 6)
            return null ;
        var f = b.urls.endpoints.getVcConfig() + "?q=" + e.vcID
          , g = function(d) {
            a[f] = d;
            var g = {}, m;
            for (m in d.Modules)
                d.Modules.hasOwnProperty(m) && (g[d.Modules[m].ModuleId] = {
                    description: d.Modules[m].ModuleDesc
                });
            e.vcModules = g;
            if (typeof e.currencyId != "undefined" && e.currencyId !== null )
                b.currencyId = e.currencyId,
                b.gadget.currencyId = e.currencyId;
            else if (typeof d.CurrencyId != "undefined")
                b.currencyId = d.CurrencyId,
                b.gadget.currencyId = d.CurrencyId;
            c(e)
        }
        ;
        if (a[f] == null )
            return d.getJSON(f, g);
        else
            g(a[f]);
        return null
    }
      , f = function(c) {
        c.vcModules = [];
        if (c.productIDs instanceof Array) {
            var e = b.urls.endpoints.getOperatorConfig() + "?OperatorId=" + c.productIDs[0]
              , g = function(d) {
                a[e] = d;
                if (typeof d.PaxOptions != "undefined")
                    c.operatorConfig = {
                        PaxOptions: d.PaxOptions
                    };
                if (typeof c.currencyId != "undefined" && c.currencyId !== null )
                    b.currencyId = c.currencyId,
                    b.gadget.currencyId = c.currencyId;
                else if (typeof d.CurrencyId != "undefined")
                    b.currencyId = d.CurrencyId,
                    b.gadget.currencyId = d.CurrencyId
            }
            ;
            if (a[e] == null )
                return d.getJSON(e, g);
            else
                g(a[e]);
            return null
        }
        e = b.urls.endpoints.cartGet() + "&key=" + d.cookie(b.util.cookieName("seSsIoN"));
        g = function(b) {
            a[e] = b;
            if (typeof b.cartcontent != "undefined" && b.cartcontent.length > 0 && b.cartcontent[0].operatorid)
                c.productIDs = [b.cartcontent[0].operatorid],
                f(c)
        }
        ;
        if (a[e] == null )
            return d.getJSON(e, g);
        else
            g(a[e]);
        return null
    }
      , c = function(c) {
        if (typeof c.vcModules != "undefined" && typeof c.vcModules["44"] != "undefined") {
            var e = b.urls.endpoints.getVcEventTracking() + "?q=" + c.vcID
              , f = function(b) {
                a[e] = b;
                c.vcModules["44"].data = b.Events
            }
            ;
            if (a[e] == null )
                return d.getJSON(e, f);
            else
                f(a[e])
        }
        return null
    }
      , e = function() {
        var c = b.urls.endpoints.getCurrencies()
          , e = function(e) {
            a[c] = e;
            b.currencies = e
        }
        ;
        if (a[c] == null )
            return d.getJSON(c, e);
        else
            e(a[c]);
        return null
    }
      , g = !1
      , l = !1
      , j = 0
      , m = [];
    b.gadget.init = function(a, c) {
        if (a.vcID == null )
            if (b.vcID == null ) {
                if (j < 5)
                    return j++,
                    d(function() {
                        b.gadget.init(a, c)
                    }, 50)
            } else
                a.vcID = b.vcID;
        else
            b.vcID = a.vcID;
        if (l)
            return b.util.performSynchronousOperations(m, function() {
                b.gadget.init(a, c)
            });
        l = !0;
        g || m.push(e(a));
        typeof a.vcID != "undefined" && (a.vcID == 6 ? m.push(f(a)) : m.push(k(a)));
        return b.util.performSynchronousOperations(m, function() {
            c instanceof Function && c();
            g = !0;
            l = !1
        })
    }
})(window);
(function(h) {
    var d = h.BE;
    d.urls = {};
    d.urls.css = {};
    d.urls.touch = {};
    d.urls.img = {};
    d.urls.endpoints = {};
    var b = d.urls.css
      , a = d.urls.img
      , k = d.urls.touch
      , d = d.urls.endpoints;
    h.sjp = function() {
        return "//sjp.impartmedia.com/"
    }
    ;
    h.cdn = function() {
        return "//gadgets.impartmedia.com/"
    }
    ;
    typeof h.BEurlsOverride == "object" && function() {
        var a = h.BEurlsOverride;
        h.cdn = typeof a.cdn == "function" ? a.cdn : h.cdn;
        h.sjp = typeof a.sjp == "function" ? a.sjp : h.sjp;
        try {
            delete h.BEurlsOverride
        } catch (b) {}
    }(h);
    if (typeof h.BEcssOverride == "string" && h.BEcssOverride == "minimal")
        b.minimal = function() {
            return cdn() + "css/minimal.cssz"
        }
        ;
    else if (!(typeof h.BEcssOverride == "string" && h.BEcssOverride == "none"))
        b.all = function() {
            return cdn() + "css/all.cssz"
        }
        ;
    k.mobile_960 = function() {
        return cdn() + "css/mobile_960.cssz"
    }
    ;
    k.mobile_740 = function() {
        return cdn() + "css/mobile_740.cssz"
    }
    ;
    k.mobile_480 = function() {
        return cdn() + "css/mobile_480.cssz"
    }
    ;
    a.mapIconShadow = function() {
        return cdn() + "img/map-marker-shadow.png"
    }
    ;
    a.mapIconAccom = function() {
        return cdn() + "img/map-marker-accom.png"
    }
    ;
    a.mapIconTours = function() {
        return cdn() + "img/map-marker-tours.png"
    }
    ;
    a.mapIconEvents = function() {
        return cdn() + "img/map-marker-events.png"
    }
    ;
    a.mapIconCarHire = function() {
        return cdn() + "img/map-marker-carhire.png"
    }
    ;
    a.mapIconGeneric = function(a) {
        return cdn() + "img/map-marker-generic-" + (a || "a") + ".png"
    }
    ;
    a.mapGenericShadow = function() {
        return cdn() + "img/map-shadow-generic.png"
    }
    ;
    a.mapVCIcon = function() {
        return cdn() + "img/map-marker-vc-icon.png"
    }
    ;
    a.listViewFallback = function(a) {
        return cdn() + "img/list-fallback-" + a + ".jpg"
    }
    ;
    a.unloadedImg = function() {
        return cdn() + "img/unloaded-img.png"
    }
    ;
    d.sjp = function() {
        return sjp()
    }
    ;
    d.locality = function() {
        return sjp() + "api/get-locality-grids"
    }
    ;
    d.beTypes = function() {
        return sjp() + "be/getAccomAttributes"
    }
    ;
    d.beAccomRatesGrid = function() {
        return sjp() + "be/getAccomRatesGrid"
    }
    ;
    d.beToursRatesGrid = function() {
        return sjp() + "be/getToursRatesGrid"
    }
    ;
    d.beEventsRatesGrid = function() {
        return sjp() + "be/getEventsRatesGrid"
    }
    ;
    d.beCarHireRatesGrid = function() {
        return sjp() + "be/getCarHireRatesGrid"
    }
    ;
    d.bePackagesRatesGrid = function() {
        return sjp() + "be/getPackages"
    }
    ;
    d.beAccomRoomDetails = function() {
        return sjp() + "be/getAccomRoomsDetails"
    }
    ;
    d.beOpDetailsShort = function() {
        return sjp() + "be/getAccomOperatorsDetailsShort"
    }
    ;
    d.getOperatorInformation = function() {
        return sjp() + "be/getOperatorsInformation"
    }
    ;
    d.beAccomRatesDetails = function() {
        return sjp() + "be/getAccomRatesDetails"
    }
    ;
    d.getAccomRoomDetailsShort = function() {
        return sjp() + "be/getAccomRoomDetailsShort"
    }
    ;
    d.getOperatorConfig = function() {
        return sjp() + "be/getOperatorConfig"
    }
    ;
    d.getOpDetailsShort = function() {
        return sjp() + "be/getOperatorsDetailsShort"
    }
    ;
    d.getVisCenData = function() {
        return sjp() + "be/getVcInformation"
    }
    ;
    d.getVcCategories = function() {
        return sjp() + "be/getVcOperatorCategories"
    }
    ;
    d.getVcLocations = function() {
        return sjp() + "be/getVcLocations"
    }
    ;
    d.getVcLocationsHier = function() {
        return sjp() + "be/getVcLocationsHierarchy"
    }
    ;
    d.getVcConfig = function() {
        return sjp() + "be/getVcConfig"
    }
    ;
    d.getCurrencies = function() {
        return sjp() + "be/getCurrencies?"
    }
    ;
    d.getCampaignData = function() {
        return sjp() + "be/getVcCampaigns"
    }
    ;
    d.getHearData = function() {
        return sjp() + "be/getVcFacilities?FacilityTypeId=11"
    }
    ;
    d.getVcCountries = function() {
        return sjp() + "be/getVcCountries"
    }
    ;
    d.getVcOnlineBookingFields = function() {
        return sjp() + "be/getVcOnlineBookingFields"
    }
    ;
    d.getVcFacilities = function() {
        return sjp() + "be/getVcFacilities"
    }
    ;
    d.getVcEventTracking = function() {
        return sjp() + "be/getVcEventTrackingData"
    }
    ;
    d.getVcBusinessTypes = function() {
        return sjp() + "be/getVcBusinessTypes"
    }
    ;
    d.getVcTripInfo = function() {
        return sjp() + "be/getVcTripInfo"
    }
    ;
    d.getTourOpsDetails = function() {
        return sjp() + "be/getToursOperatorTourDetails"
    }
    ;
    d.getEventOpsDetails = function() {
        return sjp() + "be/getEventsOperatorEventDetails"
    }
    ;
    d.getCarHireVehicles = function() {
        return sjp() + "be/getCarHireVehicles"
    }
    ;
    d.getTourManOpData = function() {
        return sjp() + "be/getTmOperatorConfig"
    }
    ;
    d.getTourExtraData = function() {
        return sjp() + "be/getTourConfig"
    }
    ;
    d.getToursAttributes = function() {
        return sjp() + "be/getToursAttributes"
    }
    ;
    d.getBookingQuestions = function() {
        return sjp() + "be/getOperatorBookingQuestions"
    }
    ;
    d.getPackageDetails = function() {
        return sjp() + "be/getPackageDetails"
    }
    ;
    d.getSessionID = function() {
        return sjp() + "cart/getNewSession"
    }
    ;
    d.cartGet = function() {
        return sjp() + "cart/getBECart?q=true"
    }
    ;
    d.cartDelete = function() {
        return sjp() + "cart/deleteBECart?q=true"
    }
    ;
    d.cartSave = function() {
        return sjp() + "cart/saveBECartPart?q=true"
    }
    ;
    d.cartConfirm = function() {
        return sjp() + "cart/getBECartInfo?q=true"
    }
    ;
    d.finaliseBooking = function() {
        return sjp() + "cart/saveBEBooking?q=true"
    }
    ;
    d.getBooking = function() {
        return sjp() + "cart/getBEBooking?q=true"
    }
    ;
    d.acquireLock = function() {
        return sjp() + "be/GetLock?q="
    }
    ;
    d.releaseLock = function() {
        return sjp() + "be/ReleaseLock?q="
    }
})(window);
(function(h) {
    var d = h.wisDOM
      , b = h.document
      , a = h.BE
      , k = b.getElementsByTagName("head")[0];
    a.util = {};
    a.util.date = {};
    a.util.date.names = {};
    a.util.data = {};
    a.util.mobileMode = function() {
        if (!d._int.browser.handheldDevice)
            return !1;
        a._isMobile = !0;
        var b = d(k);
        b.append({
            meta: {
                _attr: {
                    name: "viewport",
                    content: "width=device-width, minimum-scale=1.0, maximum-scale=1.0"
                }
            }
        });
        var c = a.urls.touch, e, g;
        for (g in c)
            c.hasOwnProperty(g) && (e = g.replace(/.*_(\d+)$/g, "$1"),
            b.append({
                link: {
                    _attr: {
                        href: c[g](),
                        media: "only all and (max-width: " + e + "px)",
                        rel: "stylesheet"
                    }
                }
            }));
        d("body").addClass("BE-mobileMode")
    }
    ;
    a.util.addStylesheet = function(a, c) {
        var e = b.createElement("link");
        e.setAttribute("rel", "stylesheet");
        e.setAttribute("media", c || "screen,print");
        e.setAttribute("href", a);
        k.appendChild(e)
    }
    ;
    a.util.exists = function(a) {
        return typeof a == "undefined" ? !1 : !0
    }
    ;
    a.util.mergeObjects = function(a, b) {
        var e = {}, d;
        for (d in b)
            b.hasOwnProperty(d) && (e[d] = b[d]);
        for (d in a)
            a.hasOwnProperty(d) && (e[d] = a[d]);
        return e
    }
    ;
    a.util.buildParamString = function(a) {
        var b = [], e;
        for (e in a)
            a.hasOwnProperty(e) && b.push("&" + e + "=" + a[e]);
        return b.join("")
    }
    ;
    a.util.date.addDays = function(b, c) {
        typeof c == "string" && (c = parseInt(c, 10));
        typeof b == "string" && (b = a.util.date.parseStr(b));
        var e = b.getTime();
        e += c * 864E5;
        return new Date(e)
    }
    ;
    a.util.date.parseStr = function(a, b) {
        var b = b || "dd/mm/yyyy"
          , e = /^.*(\d{2})\D+(\d{2})\D+(\d{4}).*$/.exec(a)
          , d = parseInt(e[1], 10)
          , l = parseInt(e[2], 10)
          , j = parseInt(e[3], 10);
        if (l > 12 || b.indexOf("m") < 2)
            d = parseInt(e[2], 10),
            l = parseInt(e[1], 10);
        return new Date(Date.UTC(j, l - 1, d, 0, 0, 0, 0))
    }
    ;
    a.util.stripTags = function(a) {
        if (!a)
            return "";
        return a.replace(/<(\/{0,1})[a-zA-Z]+\s*([a-zA-z]+=('|")(.*)('|")\s*)*\/{0,1}>/g, " ").replace(/\s{2,}/g, " ")
    }
    ;
    a.util.date.names.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    a.util.date.names.getDay = function(b, c) {
        var e = parseInt(b, 10), d;
        !isNaN(e) && e <= 7 && e > 0 && (d = a.util.date.names.days[e - 1]);
        c && (d = d.substr(0, 3));
        return d
    }
    ;
    a.util.date.names.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    a.util.date.names.getMonth = function(b, c) {
        var e = parseInt(b, 10), d;
        !isNaN(e) && e <= 12 && e > 0 && (d = a.util.date.names.months[e - 1]);
        c && (d = d.substr(0, 3));
        return d
    }
    ;
    a.util.cookieName = function(a) {
        a = a || "g37t0D4cHo9P3r";
        a += "pR081eM";
        for (var a = a.split(""), b = a.length, d; b--; )
            b - 1 > -1 && b % 2 === 0 && (d = a[b],
            a[b] = a[b - 1],
            a[b - 1] = d);
        a = a.join("");
        b = new Date;
        b = [a, b.getFullYear(), b.getMonth() + 1, b.getDate(), b.getTimezoneOffset()].join(".");
        d = b.length;
        var g = []
          , l = Math.round(255 / a.charCodeAt(0)) * 3
          , j = 0;
        for (isNaN(l) && (l = 1); d--; )
            a = b.charCodeAt(d) - 1,
            j = d % 2 === 0 ? 2 : 0,
            a = Math.round(a / 127 * 74) + 47 + l + j,
            g.push(String.fromCharCode(a));
        return g.join("").replace(/(^\d+|[^0-9a-zA-Z])/g, "").substr(1, 32)
    }
    ;
    a.util.hasClass = function(a, b) {
        var e = d(a).attr("class").split(" ");
        if (e.length == 0)
            return !1;
        for (var g = 0, l = e.length; g < l; g++)
            if (e[g].trim() == b)
                return !0;
        return !1
    }
    ;
    a.util.existsInArray = function(a, b, d) {
        for (var g = 0; g < b.length; g++)
            if (d(a, b[g]))
                return !0;
        return !1
    }
    ;
    a.util.grep = function(a, b) {
        for (var d = [], g = 0; g < a.length; g++) {
            var l = a[g];
            b(l) && d.push(l)
        }
        return d
    }
    ;
    a.util.map = function(a, b) {
        for (var d = [], g = 0; g < a.length; g++)
            d.push(b(a[g], g));
        return d
    }
    ;
    a.util.last = function(b) {
        if (a.util.exists(b) && b.length !== 0)
            return b[b.length - 1]
    }
    ;
    a.util.each = function(b, c) {
        if (a.util.exists(b))
            for (var d = 0; d < b.length; d++)
                if (!1 === c(d, b[d]))
                    break
    }
    ;
    a.util.distinct = function(b, c) {
        var d = [];
        a.util.each(b, function(b, f) {
            a.util.existsInArray(f, d, c) || d.push(f)
        });
        return d
    }
    ;
    a.util.first = function(a) {
        if (typeof a !== "undefined" && a.length !== 0)
            return a[0]
    }
    ;
    a.util.copyArray = function(b) {
        var c = [];
        a.util.each(b, function(a, b) {
            c.push(b)
        });
        return c
    }
    ;
    a.util.copyObject = function(b) {
        return a.util.mergeObjects(b, {})
    }
    ;
    a.util.all = function(a, b) {
        if (typeof a == "undefined")
            return !1;
        for (var d = 0; d < a.length; d++)
            if (!b(a[d]))
                return !1;
        return !0
    }
    ;
    a.util.any = function(a, b) {
        if (typeof a == "undefined")
            return !1;
        for (var d = 0; d < a.length; d++)
            if (b(a[d]))
                return !0;
        return !1
    }
    ;
    a.util.min = function(a, b) {
        if (typeof a == "undefined")
            return b;
        if (a.length === 0)
            return b;
        for (var d = !0, g = void 0, l = 0; l < a.length; l++) {
            var j = a[l];
            d ? (g = j,
            d = !1) : j < g && (g = j)
        }
        return typeof g === "undefined" ? b : g
    }
    ;
    a.util.performSynchronousOperations = function(a, b) {
        if (!1 !== a instanceof Array)
            var d = h.setInterval(function() {
                for (var g = !0, l = 0; l < a.length; l++)
                    if (!(typeof a[l] == "undefined" || a[l] === null ) && typeof h[a[l].id] !== "undefined") {
                        g = !1;
                        break
                    }
                g && (h.clearInterval(d),
                b instanceof Function && b())
            }, 1)
    }
    ;
    a.currencies = null ;
    a.util.autoSizeSelect = function(a) {
        var b = Math.random().toString().substring(2)
          , e = d(a).find('[value="' + d(a).val() + '"]').text()
          , e = {
            select: {
                _attr: {
                    id: b
                },
                option: e
            }
        };
        d("body").append(e);
        d("#" + b).css(getComputedStyle(d(a)[0]));
        d("#" + b).width("auto");
        d(a).width(d("#" + b).width() + "px");
        d("#" + b).remove()
    }
    ;
    a.util.currencies = function() {
        var b = {
            "long": "Long",
            "short": "Short"
        }
          , c = {
            beginning: "Beginning",
            end: "End"
        }
          , d = {
            symbol: "Symbol",
            parenthesis: "Parenthesis"
        }
          , g = function(a, b) {
            return Math.round(a * Math.pow(10, b)) / Math.pow(10, b)
        }
          , l = function(b) {
            for (var c = null , d = 0; d < a.currencies.length; d++) {
                var e = a.currencies[d];
                if (e.CurrencyId === b) {
                    c = e.ExchangeRate;
                    break
                }
            }
            return c
        }
          , j = function(m, n, o) {
            if (n == null )
                n = a.gadget.currencyId;
            o == null && (o = b["long"]);
            for (var j = null , k = 0; k < a.currencies.length; k++) {
                var h = a.currencies[k];
                if (h.CurrencyId === n) {
                    j = h.LongCurrencyFormat;
                    if (o === b["short"])
                        j = h.ShortCurrencyFormat;
                    break
                }
            }
            o = j;
            if (o == null )
                return m;
            j = l(a.currencyId);
            k = l(n);
            if (j == null || k == null )
                return m;
            a.currencyId !== n && (m = g(m / j * k, 0));
            n = "";
            m = g(m, o.RemainderMaxLength + 1);
            m > 0 ? m = Math.ceil((o.Divisor === 0 ? m : m / o.Divisor) * Math.pow(10, o.RemainderMaxLength)) / Math.pow(10, o.RemainderMaxLength) : m < 0 && (m = Math.floor((o.Divisor === 0 ? m : m / o.Divisor) * Math.pow(10, o.RemainderMaxLength)) / Math.pow(10, o.RemainderMaxLength));
            if (m < 0)
                switch (o.NegativeType) {
                case d.symbol:
                    n += "-";
                    break;
                case d.parenthesis:
                    n += "("
                }
            o.CurrencySymbolPosition === c.beginning && (n += o.CurrencySymbol,
            o.CurrencySymbolIncludeWhitespace && (n += " "));
            if (o.Grouping > 0 && o.GroupingSymbol !== "") {
                j = Math.floor(Math.abs(m)).toString();
                for (k = []; j.length > 0; )
                    h = j.length - (o.Grouping > j.length ? j.length : o.Grouping),
                    k.splice(0, 0, j.substring(h)),
                    j = j.substring(0, h);
                n += k.join(o.GroupingSymbol)
            } else
                n += Math.floor(Math.abs(m)).toString();
            j = g(Math.abs(m) - Math.floor(Math.abs(m)), o.RemainderMaxLength);
            if (Math.abs(j) > 0 || o.RemainderHideIfZero === !1 && o.RemainderMinLength > 0) {
                j = j.toString();
                for (j.indexOf(".") > -1 && (j = j.substring(j.indexOf(".") + 1)); j.length < o.RemainderMinLength; )
                    j += "0";
                n += o.RemainderSymbol;
                n += j
            }
            o.Divisor !== 0 && (n += o.DivisorSymbol);
            o.CurrencySymbolPosition === c.end && (o.CurrencySymbolIncludeWhitespace && (n += " "),
            n += o.CurrencySymbol);
            m < 0 && o.NegativeType === d.symbol && (n += ")");
            return n
        }
        ;
        return {
            format: function(a, c) {
                return j(a, c, b["long"])
            },
            formatShort: function(a, c) {
                return j(a, c, b["short"])
            },
            getCurrencies: function() {
                return a.currencies
            }
        }
    }()
})(window);
(function(h) {
    var d = h.document, b = BE.urls.css, a = BE.util.addStylesheet, k;
    k = setInterval(function() {
        d.body !== null && (clearInterval(k),
        typeof d.compatMode != "undefined" && d.compatMode != "CSS1Compat" && (d.body.className += " BE_quirksMode"),
        typeof h.orientation != "undefined" && (d.body.className += " BE_handHeld"),
        (h.devicePixelRatio || 1) >= 1.5 && (d.body.className += " BE_highDefinition"))
    }, 10);
    for (var f in b)
        b.hasOwnProperty(f) && a(b[f]())
})(window);
(function(h) {
    var d = h.wisDOM
      , b = h.BE
      , a = {}
      , k = b.util.cookieName("seSsIoN");
    b.session = {};
    b.session.get = function(f) {
        if ((a.getParameterByName("AgentId") || "") != "")
            b.agentId != (a.getParameterByName("AgentId") || "") && b.session.destroy();
        if (!f || typeof f != "function")
            return !1;
        h.name.indexOf("BE-Session-Key") != -1 && d.cookie(k, h.name.split("=")[1]);
        d.cookie(k) ? f.call(h, d.cookie(k)) : a.create(f);
        return !0
    }
    ;
    b.session.destroy = function() {
        d.cookie.remove(k)
    }
    ;
    a.getParameterByName = function(a) {
        a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        a = RegExp("[\\?&]" + a + "=([^&#]*)").exec(location.search);
        return a == null ? "" : decodeURIComponent(a[1].replace(/\+/g, " "))
    }
    ;
    a.create = function(f) {
        b.agentId = a.getParameterByName("AgentId");
        b.agentType = a.getParameterByName("AgentType");
        var c = b.urls.endpoints.getSessionID() + "?q=true" + (b.agentId == "" ? "" : "&agentId=" + b.agentId) + (b.agentType == "" ? "" : "&agentType=" + b.agentType);
        d.getJSON(c, function(a) {
            a = a.SessionId;
            d.cookie(k, a);
            f.call(h, a)
        })
    }
})(window);
(function(h) {
    h.BE.text = {};
    h = h.BE.text;
    h.cartKeys = {
        type: "Type",
        startdate: "Start Date",
        period: "Days/Nights",
        quotedprice: "Quoted Price",
        adults: "Adults",
        children: "Children",
        infants: "Infants",
        concessions: "Concessions",
        students: "Students",
        observers: "Observers",
        family: "Family",
        quantity: "Quantity"
    };
    h.typeLookup = {
        accom: "Accommodation",
        tours: "Tours",
        events: "Events",
        carhire: "Car Hire",
        packages: "Packages"
    };
    h.typeIDToString = {
        524: "accom",
        534: "tours",
        548: "events",
        552: "carhire",
        0: "packages"
    };
    h.upsell = "Stay longer to get this Special!";
    h.specials = {
        "": "{1}% Discount",
        LM: "{1}% Last Minute Discount",
        SPY: "Stay for {0} nights, pay for {1}",
        DIS: "{1}% Discount",
        DIV: "${1} Discount"
    }
})(window);
(function(h) {
    var d = h.wisDOM, b = h.BE, a = {}, k, f, c, e, g, l = d.event.publish;
    a.bq = {};
    a.bq.elements = {};
    var j = function(b, c) {
        var e = d(b);
        if (e.length === 0)
            return !1;
        e.append({
            "div.shopping-cart BE": ""
        });
        e = e.find("div.shopping-cart");
        c.isBooking && e.addClass("is-booking");
        c.autoCollapse && e.addClass("auto-collapse");
        a.checkCart(e, c);
        a.subscriptions(e, c);
        c.isBooking === !1 && d(function() {
            d(h).bind("focus.BECartGadget", function() {
                d(function() {
                    a.checkCart(e, c)
                }, 25)
            })
        }, 500)
    }
    ;
    b.gadget.cart = function(a, c) {
        var e = d(a);
        if (e.length === 0)
            return !1;
        c = b.util.mergeObjects(c, b.gadget.cart.defaults);
        b.gadget.init(c, function() {
            j(a, c)
        });
        return e
    }
    ;
    b.gadget.cart.embed = function(a) {
        if (!a)
            return !1;
        var c = d({
            div: ""
        });
        return b.gadget.cart(c, a)
    }
    ;
    b.gadget.cart.save = function(b, d) {
        for (var e in b)
            b.hasOwnProperty(e) && (c[e] = b[e]);
        typeof d != "function" && (d = function() {}
        );
        a.comms.save(c.key, c, d)
    }
    ;
    b.gadget.cart.destroy = function(b, c) {
        a.comms.destroy(b, c)
    }
    ;
    b.gadget.cart.getCart = function(c) {
        b.session.get(function(b) {
            a.comms.getCurrent(b, c)
        })
    }
    ;
    a.subscriptions = function(c, e) {
        var f = b.gadget.cart.text
          , m = h.wisDOM.event.subscribe
          , j = e.overlaySettings;
        j.useClone = !1;
        m("item.book.click", function(f) {
            g = d(b.gadget.cart.elements.form(f, e)).overlay(j);
            b.gadget.cart.elements.accordian(d(".accordian-container", g), 0, !1);
            a.hideAddToCartIfReseller(g, void 0);
            g.find("div.add-to-cart-form div.AdditionalData").append({
                div: {
                    _attr: {
                        "class": "RoutesData"
                    }
                }
            });
            g.find("div.add-to-cart-form div.AdditionalData").append({
                div: {
                    _attr: {
                        "class": "BookingQuestionsData"
                    }
                }
            });
            if (f[2] == "accom")
                a.displayBookingQuestions(c, e, f, g);
            else if (f[2] == "tours" || f[2] == "events")
                a.getAdditionalTourData(c, e, f, g),
                a.displayBookingQuestions(c, e, f, g);
            else if (f[2] == "packages") {
                for (var m = 0; m < f[8].length; m++)
                    f[8][m].type == "tours" && a.getAdditionalTourData(c, e, [null , null , null , {
                        Id: f[8][m].id
                    }, null , null , null , null , null , null , null ], g, "div.add-to-cart-form div.packageproducts-item:eq(" + (m + 1) + ") div.packageproducts-additionaldata");
                b.gadget.cart.elements.accordian(d(".accordian-container", g), 0, !1, !1)
            } else
                f[2] == "carhire" && b.gadget.cart.elements.accordian(d(".accordian-container", g), 0, !1, !1)
        });
        m("cart.add.click", function(d) {
            var f = this;
            e.reuseBookingQuestions ? b.gadget.cart.getCart(function(g) {
                g = a.bq.getExistingBq(g, d[1]);
                if (b.util.exists(g) && b.util.exists(g.bookingQuestionAnswers) && g.bookingQuestionAnswers.length > 0)
                    d[11] = g.bookingQuestionAnswers;
                a.checkCart(c, e, function() {
                    a.addToCart.apply(f, [d, c, e])
                })
            }) : a.checkCart(c, e, function() {
                a.addToCart.apply(f, [d, c, e])
            })
        });
        m("cart.addAndBuy.click", function(d) {
            var f = this;
            e.reuseBookingQuestions ? b.gadget.cart.getCart(function(m) {
                m = a.bq.getExistingBq(m, d[1]);
                if (b.util.exists(m) && b.util.exists(m.bookingQuestionAnswers) && m.bookingQuestionAnswers.length > 0)
                    d[11] = m.bookingQuestionAnswers;
                a.checkCart(c, e, function() {
                    a.addToCart.apply(f, [d, c, e, function() {
                        typeof g != "undefined" && g.close();
                        a.handleBookClick(e, d)
                    }
                    ])
                })
            }) : a.checkCart(c, e, function() {
                a.addToCart.apply(f, [d, c, e, function() {
                    typeof g != "undefined" && g.close();
                    a.handleBookClick(e, d)
                }
                ])
            })
        });
        m("cart.remove.click", function(b) {
            confirm(b[0].cartcontent[b[1]].description + f.cartRemoveItemConf) && (a.removeItem(c, b[0], b[1], e),
            typeof g != "undefined" && g.close())
        });
        m("cart.checkout.click", function(b) {
            a.handleBookClick(e, b)
        });
        m("cart.item.click", function(a) {
            g = d(b.gadget.cart.elements.itemDetails(a, e)).overlay(j)
        });
        m("cart.collapsedbutton.click", function() {
            a.showCollapsedCart(c, e)
        });
        m("cart.confirmation.start", function() {
            a.confirmingCart(this, e)
        });
        m("cart.confirmation.end", function(b) {
            a.confirmedCart(c, e, b)
        })
    }
    ;
    a.checkCart = function(d, f, g) {
        l("cart.display.loading.start", h, d);
        b.session.get(function(b) {
            e = b;
            a.comms.getCurrent(b, function(e) {
                if (typeof e.paymentInformation != "undefined")
                    try {
                        delete e.paymentInformation
                    } catch (m) {
                        e.paymentInformation = void 0
                    }
                l("cart.display.loading.end", h, d);
                a.buildCartDisplay(e, d, f);
                c = e;
                f.isBooking === !0 && a.comms.fetchCancellationPolicies(d, f, e);
                typeof g == "function" && g.call(h);
                var j = !1;
                if (typeof f.externalSearch != "undefined")
                    j = f.externalSearch;
                if (typeof e.ExternalSearch != "undefined")
                    j = e.ExternalSearch;
                f.isBooking && (l("cart.confirmation.start", d),
                a.comms.confirmCurrent(b, f, j, function(a) {
                    l("cart.confirmation.end", d, a)
                }))
            })
        })
    }
    ;
    a.buildCartDisplay = function(a, c, e) {
        c.empty();
        var f = b.gadget.cart.text
          , g = d.event.publish;
        if (typeof a.cartcontent == "undefined" || a.cartcontent.length === 0)
            return c.append({
                "div.noItems": f.noItems
            }),
            c;
        var m = a.cartcontent.length, j, s = b.gadget.cart.elements.cartBase(a, e), u = 0;
        if (e.autoCollapse) {
            var l = m < 10 ? f.cartContains.replace(/\{x\}/, m) : f.cartContainsGreater;
            s["div.cartItems"].push({
                "div.totalDisplay": {
                    a: {
                        _events: {
                            click: function(a) {
                                g("cart.collapsedbutton.click", this, a)
                            }
                        },
                        span: m > 9 ? "9+" : m
                    },
                    _attr: {
                        title: l
                    }
                }
            })
        }
        e.isBooking && s["div.cartItems"].push({
            h3: b.gadget.cart.text.cartItems
        });
        for (var k = b.util.exists(e.tripPlannerMode) && e.tripPlannerMode, h = 0; h < m; h++) {
            j = a.cartcontent[h];
            var t = m - 1
              , e = {
                div: {
                    _attr: {
                        "class": "item " + j.type
                    },
                    "div.stage": function() {
                        if (!b.util.exists(j.stage))
                            return {};
                        var a = "";
                        if (k && b.util.exists(b.gadget.tripPlanner.tripData)) {
                            var c = b.util.grep(b.gadget.tripPlanner.tripData.Stages, function(a) {
                                return a.StageId === j.stage.stageId
                            });
                            if (c.length > 0)
                                a = c[0].Name
                        }
                        return {
                            span: a
                        }
                    }(),
                    "div.name": function() {
                        return a.cartcontent[h].type != "extra" ? {
                            a: {
                                " ": j.description,
                                _attr: {
                                    href: "javascript:void(0)"
                                },
                                _events: {
                                    click: function(b) {
                                        return function() {
                                            this.blur();
                                            g("cart.item.click", this, [a, b])
                                        }
                                    }(h)
                                }
                            }
                        } : {
                            span: {
                                " ": j.description
                            }
                        }
                    }(),
                    "div.price": {
                        _attr: {
                            rel: j.id
                        },
                        label: b.util.currencies.formatShort(parseFloat(j.quotedprice), b.currencyId)
                    },
                    "div.remove": function() {
                        if (!k && a.cartcontent[h].isGroupMaster || k && h === t)
                            return {
                                a: {
                                    span: f.cartRemoveItem,
                                    _events: {
                                        click: function(b) {
                                            return function() {
                                                g("cart.remove.click", this, [a, b])
                                            }
                                        }(h)
                                    }
                                }
                            }
                    }(),
                    "div.operator": {
                        span: j.operatorname
                    }
                }
            };
            if (typeof j.packageProducts == "undefined") {
                if (typeof j.startdate != "undefined" && j.type != "extra" && (l = new Date(j.startdate),
                l.setHours(l.getHours() + (new Date).getTimezoneOffset() / 60 + (l.getHours() != (new Date).getTimezoneOffset() ? 1 : 0)),
                e.div["div.date-nights"] = [{
                    label: f.labels.date + ":"
                }, {
                    "": " "
                }, {
                    "span.dayName": b.util.date.names.getDay(l.getDay() + 1, !0)
                }, {
                    "": " "
                }, {
                    "span.date": l.getDate()
                }, {
                    "": " "
                }, {
                    "span.month": b.util.date.names.getMonth(l.getMonth() + 1)
                }, {
                    "": " "
                }, {
                    "span.year": l.getFullYear()
                }]),
                typeof j.period != "undefined" && j.type == "accom" && (e.div["div.date-nights"].push({
                    "": ", "
                }),
                e.div["div.date-nights"].push({
                    label: f.labels.nights + ":"
                }),
                e.div["div.date-nights"].push({
                    "": " "
                }),
                e.div["div.date-nights"].push({
                    "span.nights": j.period
                })),
                typeof j.pickup != "undefined" && (e.div["div.pickup"] = [],
                e.div["div.pickup"].push({
                    label: f.labels.pickup + ":"
                }),
                e.div["div.pickup"].push({
                    "": " "
                }),
                e.div["div.pickup"].push({
                    "span.pickup": j.pickup.name
                })),
                typeof j.dropoff != "undefined" && (e.div["div.dropoff"] = [],
                e.div["div.dropoff"].push({
                    label: f.labels.dropoff + ":"
                }),
                e.div["div.dropoff"].push({
                    "": " "
                }),
                e.div["div.dropoff"].push({
                    "span.dropoff": j.dropoff.name
                })),
                typeof j.bookingQuestionAnswers != "undefined") {
                    e.div["div.bookingQuestions"] = [];
                    for (var l = "", C = 0, z = 0; z < j.bookingQuestionAnswers.length; z++) {
                        var F = j.bookingQuestionAnswers[z]
                          , B = F.id.split("|")
                          , G = B[1]
                          , B = parseInt(B[2]);
                        if (l != G || C != B)
                            e.div["div.bookingQuestions"].push({
                                "div.bookingQuestionSet-title": G + " " + (B + 1)
                            }),
                            l = G,
                            C = B;
                        e.div["div.bookingQuestions"].push({
                            "div.bookingQuestion": {
                                label: F.name + (F.show ? ": " : ""),
                                span: F.show ? F.values : ""
                            }
                        })
                    }
                }
            } else {
                var A = j.packageProducts;
                e.div["div.PackageProducts"] = [];
                e.div["div.PackageProducts"].push({
                    "div.packageproducts-title": "This package consists of the following products:",
                    "div.packageproducts-items": function() {
                        for (var a = [], c = 0; c < A.length; c++) {
                            var d = A[c];
                            a.push({
                                "div.packageproducts-item": {
                                    "label.packageproducts-operatorname": d.operatorname,
                                    "label.packageproducts-name": d.name,
                                    "div.packageproducts-details": function() {
                                        var a = [];
                                        if (d.type == "accom") {
                                            var c = ["adults", "children", "infants"];
                                            a.push({
                                                "div.packageproducts-detail": {
                                                    label: "Arrival Date",
                                                    span: [{
                                                        "span.dayName": b.util.date.names.getDay(d.startdate.getDay() + 1, !0)
                                                    }, {
                                                        "": " "
                                                    }, {
                                                        "span.date": d.startdate.getDate()
                                                    }, {
                                                        "": " "
                                                    }, {
                                                        "span.month": b.util.date.names.getMonth(d.startdate.getMonth() + 1)
                                                    }, {
                                                        "": " "
                                                    }, {
                                                        "span.year": d.startdate.getFullYear()
                                                    }]
                                                }
                                            });
                                            a.push({
                                                "div.packageproducts-detail": {
                                                    label: "Period",
                                                    span: d.period
                                                }
                                            });
                                            for (var e = 0, g; g = c[e]; e++)
                                                d[g] != 0 && a.push({
                                                    "div.packageproducts-detail": {
                                                        label: f.labels[g],
                                                        span: d[g]
                                                    }
                                                })
                                        } else if (d.type == "tours") {
                                            c = ["adults", "children", "infants", "concessions", "students", "observers"];
                                            a.push({
                                                "div.packageproducts-detail": {
                                                    label: "Tour Date",
                                                    span: [{
                                                        "span.dayName": b.util.date.names.getDay(d.startdate.getDay() + 1, !0)
                                                    }, {
                                                        "": " "
                                                    }, {
                                                        "span.date": d.startdate.getDate()
                                                    }, {
                                                        "": " "
                                                    }, {
                                                        "span.month": b.util.date.names.getMonth(d.startdate.getMonth() + 1)
                                                    }, {
                                                        "": " "
                                                    }, {
                                                        "span.year": d.startdate.getFullYear()
                                                    }]
                                                }
                                            });
                                            for (e = 0; g = c[e]; e++)
                                                d[g] != 0 && a.push({
                                                    "div.packageproducts-detail": {
                                                        label: f.labels[g],
                                                        span: d[g]
                                                    }
                                                });
                                            (d.pickup != null || d.dropoff != null ) && a.push({
                                                "div.packageproducts-routes": [{
                                                    label: f.labels.pickup,
                                                    span: d.pickup.name
                                                }, {
                                                    label: f.labels.dropoff,
                                                    span: d.dropoff.name
                                                }]
                                            })
                                        } else if (d.type == "events") {
                                            c = ["adults", "children", "infants", "concessions", "students", "observers"];
                                            a.push({
                                                "div.packageproducts-detail": {
                                                    label: "Event Date",
                                                    span: [{
                                                        "span.dayName": b.util.date.names.getDay(d.startdate.getDay() + 1, !0)
                                                    }, {
                                                        "": " "
                                                    }, {
                                                        "span.date": d.startdate.getDate()
                                                    }, {
                                                        "": " "
                                                    }, {
                                                        "span.month": b.util.date.names.getMonth(d.startdate.getMonth() + 1)
                                                    }, {
                                                        "": " "
                                                    }, {
                                                        "span.year": d.startdate.getFullYear()
                                                    }]
                                                }
                                            });
                                            for (e = 0; g = c[e]; e++)
                                                d[g] != 0 && a.push({
                                                    "div.packageproducts-detail": {
                                                        label: f.labels[g],
                                                        span: d[g]
                                                    }
                                                });
                                            (d.pickup != null || d.dropoff != null ) && a.push({
                                                "div.packageproducts-routes": [{
                                                    label: f.labels.pickup,
                                                    span: d.pickup.name
                                                }, {
                                                    label: f.labels.dropoff,
                                                    span: d.dropoff.name
                                                }]
                                            })
                                        } else if (d.type == "carhire") {
                                            c = ["adults", "children", "infants"];
                                            a.push({
                                                "div.packageproducts-detail": {
                                                    label: "Arrival Date",
                                                    span: [{
                                                        "span.dayName": b.util.date.names.getDay(d.startdate.getDay() + 1, !0)
                                                    }, {
                                                        "": " "
                                                    }, {
                                                        "span.date": d.startdate.getDate()
                                                    }, {
                                                        "": " "
                                                    }, {
                                                        "span.month": b.util.date.names.getMonth(d.startdate.getMonth() + 1)
                                                    }, {
                                                        "": " "
                                                    }, {
                                                        "span.year": d.startdate.getFullYear()
                                                    }]
                                                }
                                            });
                                            a.push({
                                                "div.packageproducts-detail": {
                                                    label: "Period",
                                                    span: d.period
                                                }
                                            });
                                            for (e = 0; g = c[e]; e++)
                                                d[g] != 0 && a.push({
                                                    "div.packageproducts-detail": {
                                                        label: f.labels[g],
                                                        span: d[g]
                                                    }
                                                })
                                        }
                                        return a
                                    }()
                                }
                            })
                        }
                        return a
                    }()
                })
            }
            s["div.cartItems"].push(e);
            u += j.quotedprice
        }
        s["div.cartItems"].push({
            "div.total": {
                label: f.cartTotal,
                span: b.util.currencies.formatShort(u, b.currencyId)
            }
        });
        c.append(s);
        return c
    }
    ;
    a.addToCart = function(f, o, j, l) {
        g.find(".addButton").css({
            display: "none"
        });
        g.find(".addProgress").css({
            display: "block"
        });
        var k = c
          , q = f[0]
          , r = f[1]
          , s = f[2]
          , u = f[3]
          , y = f[4]
          , E = f[5]
          , x = f[7]
          , t = f[8]
          , C = f[9]
          , z = f[10]
          , F = f[11]
          , f = f.stage
          , B = d(this.parentNode.parentNode)
          , B = parseInt(B.find("div.quantity span").text(), 10);
        if (b.util.exists(k) && b.util.exists(k.controlId) && k.controlId != q && b.util.exists(k.cartcontent) && k.cartcontent.length > 0)
            alert("You have tried to book an item controlled by a different visitor centre. Unfortunately this is not possible. Please book the item in your shopping cart first and return to book this product."),
            typeof l == "function" ? l.call(h) : g.close(),
            g.find(".addProgress").css({
                display: "none"
            }),
            g.find(".addButton").css({
                display: null
            });
        else {
            if (s == "events")
                try {
                    delete y.period
                } catch (G) {
                    y.period = void 0
                }
            k.key = e;
            k.controlId = q;
            if (x)
                k.CampaignId = parseInt(x, 10);
            if (typeof C != "undefined" && C)
                k.ExternalSearch = !0;
            if (typeof k.cartcontent == "undefined")
                k.cartcontent = [];
            isNaN(B) === !0 && (B = 1);
            q = {
                operatorid: r,
                operatorname: E,
                type: s,
                id: u.Id,
                description: u.Name,
                location: h.location.href,
                quantity: B
            };
            if (r = b.util.exists(f) && b.util.exists(f.stageId) && f.stageId > 0)
                E = b.util.grep(k.cartcontent, function(a) {
                    return b.util.exists(a.stage)
                }),
                q.stage = {
                    stageId: f.stageId,
                    sort: E.length + 1,
                    name: f.stageName | 0
                };
            for (var A in y)
                if (y.hasOwnProperty(A))
                    A != "date" && A != "nights" && (q[A] = parseInt(y[A], 10)),
                    A == "nights" && (q.period = parseInt(y[A], 10));
            q.startdate = b.util.date.parseStr(y.date);
            q.quotedprice = s == "packages" ? u.Cost : u.Availability.Cost;
            if (z) {
                if (typeof z.pickup != "undefined" && !isNaN(z.pickup.id))
                    q.pickup = {
                        id: z.pickup.id,
                        name: z.pickup.name
                    };
                if (typeof z.dropoff != "undefined" && !isNaN(z.dropoff.id))
                    q.dropoff = {
                        id: z.dropoff.id,
                        name: z.dropoff.name
                    }
            }
            q.bookingQuestionAnswers = b.util.exists(F) ? F : [];
            if (s == "packages")
                q.packageProducts = t;
            k = a.applyResellerModuleLogic(k, void 0);
            k.cartcontent.push(q);
            if (r)
                k.cartcontent = k.cartcontent.sort(function(a, b) {
                    return a.sort - b.sort
                });
            m.save(e, k, function(c) {
                if (typeof c.error == "undefined")
                    typeof c.message != "undefined" && c.message != null && c.message != "" && alert(c.message),
                    d(function() {
                        a.checkCart(o, j)
                    }, 10),
                    typeof l == "function" ? l.call(h) : g.close();
                else if (typeof c.error == "boolean")
                    alert(b.gadget.cart.text.saveError);
                else {
                    var e = b.gadget.cart.text[c.error];
                    e != null ? alert(e) : alert(c.error)
                }
                g.find(".addProgress").css({
                    display: "none"
                });
                g.find(".addButton").css({
                    display: null
                })
            })
        }
    }
    ;
    a.applyResellerModuleLogic = function(b, c) {
        if (a.hasResellerModule(c))
            b.cartcontent = [];
        return b
    }
    ;
    a.hideAddToCartIfReseller = function(b, c) {
        a.hasResellerModule(c) && b.find(".addToCart").css({
            display: "none"
        })
    }
    ;
    a.hasResellerModule = function(a) {
        return typeof a != "undefined" && typeof a["67"] != "undefined"
    }
    ;
    a.removeItem = function(b, c, d, e) {
        for (var f = c.cartcontent, g = f.length, j = [], s = 0; s < g; s++)
            s != d && j.push(f[s]);
        c.cartcontent = j;
        m.save(c.key, c, function() {
            a.checkCart(b, e);
            j.length === 0 && e.isBooking === !0 && history.back()
        })
    }
    ;
    a.showCollapsedCart = function(c, e) {
        var f = d({
            "div.cartInOverlay": {
                "div.title": b.gadget.cart.text.cartOverlayTitle,
                "div.cartItems": {}
            }
        })
          , m = d("")
          , j = c.find("div.item")
          , l = e.overlaySettings;
        l.useClone = !1;
        l.onClose = function() {
            g = void 0;
            d(function() {
                a.checkCart(c, e)
            }, 125)
        }
        ;
        for (var k = 0, s = j.length; k < s; k++)
            m.push(j[k]);
        m.push(c.find("div.total")[0]);
        m.push(c.find("div.checkout")[0]);
        m.appendTo(f.find("div.cartItems"));
        g = f.overlay(l)
    }
    ;
    a.confirmingCart = function(a) {
        a.addClass("confirming")
    }
    ;
    a.confirmedCart = function(b, c, d) {
        b.removeClass("confirming");
        d.IsAvailable === !0 ? a.cartBookable(b, c, d) : a.cartProblem(b, c, d)
    }
    ;
    a.cartBookable = function(b, e, f) {
        a.addBookingFees(b, e, f);
        a.addBonds(b, e, f);
        a.updatePrices(b, e, f);
        d.event.publish("cart.is.bookable", h, {
            conf: f,
            cart: c
        })
    }
    ;
    a.cartProblem = function() {
        alert("An item in your cart has become unavailable. We are unable to continue with this booking.")
    }
    ;
    a.updatePrices = function(a, c, e) {
        typeof e.cost != "undefined" && a.find("div.total span").text(b.util.currencies.formatShort(e.cost, b.currencyId));
        if (typeof e.cartcontent != "undefined")
            for (var c = e.cartcontent, a = a.find("div.price"), f, g = 0, m = c.length; g < m; g++) {
                f = c[g];
                e = f.id.toString();
                f = b.util.currencies.formatShort(f.cost, b.currencyId);
                for (var j = 0, s = a.length; j < s; j++)
                    a[j].getAttribute("rel") == e && d(a[j]).find("label").text(f)
            }
    }
    ;
    a.addBookingFees = function(a, c, e) {
        var c = a.find("div.total")
          , e = e.fees
          , f = {
            "div.bookingFees": []
        };
        a.find("div.bookingFees").remove();
        if (e.length === 0)
            return !1;
        for (var g = 0, m = e.length; g < m; g++)
            a = e[g],
            f["div.bookingFees"].push({
                "div.fee": {
                    label: a.description,
                    "span.price": b.util.currencies.formatShort(a.cost, b.currencyId)
                }
            });
        d(f).insertBefore(c)
    }
    ;
    a.addBonds = function(a, c, e) {
        if (typeof e.Bond == "undefined" || e.Bond === null )
            return !1;
        var c = a.find("div.total")
          , f = b.gadget.cart.text
          , g = {
            "div.bonds": [{
                "div.header": {
                    span: e.Bond.Description
                }
            }]
        };
        a.find("div.bonds").remove();
        e.Bond.CostDueNow > 0 && g["div.bonds"].push({
            "div.due-now": {
                label: f.bondDueNow,
                "": " ",
                "span.price": b.util.currencies.formatShort(e.Bond.CostDueNow, b.currencyId)
            }
        });
        e.Bond.CostDueLater > 0 && g["div.bonds"].push({
            "div.due-later": {
                label: f.bondDueLater,
                "": " ",
                "span.price": {
                    "": b.util.currencies.formatShort(e.Bond.CostDueLater, b.currencyId),
                    sup: "*"
                },
                "div.details": {
                    "span.mark": "*",
                    "": f.bondDueLaterDet.replace(/\{x\}/g, e.Bond.Period)
                }
            }
        });
        d(g).insertBefore(c)
    }
    ;
    a.getAdditionalTourData = function(c, e, f, g, m) {
        var j = f[3].Id
          , j = b.urls.endpoints.getTourExtraData() + "?q=" + j;
        d.getJSON(j, function(b) {
            if (b.NoDataFound === !0)
                return !1;
            b.Routes && b.Routes.length > 0 && a.showRoutesChooser(c, e, f, g, b, m)
        })
    }
    ;
    a.showRoutesChooser = function(a, c, e, f, g, m) {
        for (var a = g.Routes.length, j, s, u = [], l = []; a--; ) {
            c = g.Routes[a];
            c = c.Locations;
            for (j = c.length; j--; )
                e = c[j],
                s = {
                    id: e.RouteLocationId,
                    name: e.Location,
                    time: e.Time
                },
                e.DropOff ? l.push(s) : u.push(s)
        }
        g = function(a, b) {
            return [a.name, b.name].sort()[0] == a.name ? -1 : 1
        }
        ;
        u.sort(g);
        l.sort(g);
        g = {
            "div.routes-chooser": []
        };
        a = g["div.routes-chooser"];
        u.length > 0 && (c = {
            "div.pickups": {
                "label.required": {
                    "": "Pick up from",
                    "label.indicator": {
                        "": "*",
                        _attr: {
                            title: "Required field"
                        }
                    }
                },
                select: function() {
                    for (var a = [], b = 0, c = u.length; b < c; b++) {
                        var e = u[b].name;
                        e += typeof u[b].time != "undefined" && u[b].time != "" ? " at " + u[b].time : "";
                        a.push({
                            option: {
                                "": e,
                                _attr: {
                                    value: u[b].id,
                                    rel: u[b].name
                                }
                            }
                        })
                    }
                    a._events = {
                        change: function() {
                            for (var a = d(this).closest("div.routes-chooser").find("div.dropoffs select"), b = a.find("option"), c = b.length, e = null , f = d(this.options[this.selectedIndex]).attr("REL").toLowerCase(); c--; )
                                if (d(b[c]).attr("REL").toLowerCase() == f) {
                                    e = b[c].value;
                                    break
                                }
                            e !== null && a.val(e)
                        }
                    };
                    return a
                }()
            }
        },
        a.push(c));
        l.length > 0 && (c = {
            "div.dropoffs": {
                "label.required": {
                    "": "Drop off at",
                    "label.indicator": {
                        "": "*",
                        _attr: {
                            title: "Required field"
                        }
                    }
                },
                select: function() {
                    for (var a = [], b = 0, c = l.length; b < c; b++) {
                        var e = l[b].name;
                        e += typeof l[b].time != "undefined" && l[b].time != "" ? " at " + l[b].time : "";
                        a.push({
                            option: {
                                "": e,
                                _attr: {
                                    value: l[b].id,
                                    rel: l[b].name
                                }
                            }
                        })
                    }
                    a._events = {
                        change: function() {
                            d(this).closest("div.routes-chooser").find("select").unbind("change")
                        }
                    };
                    return a
                }()
            }
        },
        a.push(c));
        m == null && (m = "div.add-to-cart-form div.AdditionalData div.RoutesData");
        g = {
            div: {
                _attr: {
                    "class": "accordian expanded"
                },
                "div.accordian-header": {
                    "": "Pickup / Dropoff Locations",
                    _events: {
                        click: function() {
                            b.gadget.cart.elements.accordian(this, 0)
                        }
                    }
                },
                "div.accordian-content": g
            }
        };
        f.find(m).append(g);
        b.gadget.cart.elements.accordian(d(".accordian-container", f), 0)
    }
    ;
    a.displayBookingQuestions = function(c, e, f, g) {
        var m = a.bq.extractOperatorId(f)
          , c = a.bq.extractProductId(f)
          , j = a.bq.extractPAX(f).adults
          , l = a.bq.extractPAX(f).children
          , s = a.bq.extractPAX(f).infants
          , u = a.bq.extractPAX(f).concessions
          , k = a.bq.extractPAX(f).students
          , h = a.bq.extractPAX(f).observers
          , f = a.bq.extractPAX(f).family
          , x = b.gadget.getSjpEndpoint(m, c, j, l, s, u, k, h, f);
        e.reuseBookingQuestions ? b.gadget.cart.getCart(function(c) {
            typeof a.bq.getExistingBq(c, m) === "undefined" ? d.getJSON(x, function(c) {
                a.bq.isJsonValid(c) ? a.renderBookingQuestions(c.BookingQuestions) : b.gadget.cart.elements.accordian(d(".accordian-container", g), 0, !0, !1)
            }) : b.gadget.cart.elements.accordian(d(".accordian-container", g), 0, !0, !1)
        }) : d.getJSON(x, function(c) {
            a.bq.isJsonValid(c) ? a.renderBookingQuestions(c.BookingQuestions) : b.gadget.cart.elements.accordian(d(".accordian-container", g), 0, !0, !1)
        })
    }
    ;
    a.bq.getExistingBq = function(a, c) {
        if (typeof a !== "undefined" && typeof a.cartcontent !== "undefined")
            return b.util.first(b.util.grep(a.cartcontent, function(a) {
                return a.operatorid === c && typeof a.bookingQuestionAnswers != "undefined" && a.bookingQuestionAnswers.length > 0
            }))
    }
    ;
    b.gadget.getSjpEndpoint = function(a, c, d, e, f, g, m, j, u) {
        return b.urls.endpoints.getBookingQuestions() + "?q=" + a + "&p=" + c + "&adults=" + (d || 0) + "&children=" + (e || 0) + "&infants=" + (f || 0) + "&concessions=" + (g || 0) + "&students=" + (m || 0) + "&observers=" + (j || 0) + "&family=" + (u || 0)
    }
    ;
    a.renderBookingQuestions = function(c) {
        c = a.bq.buildBookingQuestionsDiv(c);
        a.bq.attachBookingQuestionsDiv(g, c);
        a.bq.resizeOverlay(g);
        d(".bookingQuestion-answer-field").trigger("change");
        b.gadget.cart.elements.accordian(d(".accordian-container", g), 0, !0, !0)
    }
    ;
    a.bq.resizeOverlay = function(a) {
        a.addClass("extraContent")
    }
    ;
    a.bq.extractOperatorId = function(a) {
        return a[1]
    }
    ;
    a.bq.extractProductId = function(a) {
        return a[3].Id
    }
    ;
    a.bq.extractPAX = function(a) {
        return a[4]
    }
    ;
    a.bq.attachBookingQuestionsDiv = function(a, b) {
        var c = a.find("div.add-to-cart-form div.AdditionalData div.BookingQuestionsData");
        c.empty();
        c.append(b);
        d("input.bookingQuestion-answer-field").trigger("change")
    }
    ;
    a.bq.isJsonValid = function(a) {
        if (a.NoDataFound === !0)
            return !1;
        if (!(typeof a.BookingQuestions != "undefined" && a.BookingQuestions.length > 0))
            return !1;
        return !0
    }
    ;
    a.bq.buildBookingQuestionsDiv = function(b) {
        for (var c = [], d = 0, e = b.length; d < e; d++)
            c.push(a.bq.buildBookingQuestionDiv(b[d]));
        return {
            "div.booking-questions": c
        }
    }
    ;
    a.bq.buildBookingQuestionDiv = function(c) {
        for (var d = c.DynamicFormFieldSets, e = [], f = 0; f < d.length; f++) {
            for (var g = d[f].DynamicFormFields, m = [], j = 0; j < g.length; j++)
                m.push(a.bq.buildBookingQuestionFieldDiv(g[j]));
            e.push({
                "div.bookingQuestionSet": [{
                    "label.bookingQuestionSet-title": d[f].PaxType
                }, {
                    "div.bookingQuestionFields": m
                }]
            })
        }
        return {
            div: {
                _attr: {
                    "class": "bookingQuestion accordian collapsed"
                },
                "div.accordian-header": {
                    "": c.Identifier,
                    _events: {
                        click: function() {
                            b.gadget.cart.elements.accordian(this, 0)
                        }
                    }
                },
                "div.accordian-content": {
                    input: {
                        _attr: {
                            type: "hidden",
                            name: "DynamicFormId",
                            value: c.DynamicFormId
                        }
                    },
                    "div.bookingQuestionSets": e
                }
            }
        }
    }
    ;
    a.bq.buildBookingQuestionFieldDiv = function(b) {
        var c = {};
        switch (b.Type) {
        case "HIDDEN":
            c = a.bq.elements.hiddenField(b);
            break;
        case "TEXTBOX":
            c = a.bq.elements.textBoxField(b);
            break;
        case "CHECKBOXLIST":
            c = a.bq.elements.listField("CHECKBOX", b);
            break;
        case "DROPDOWNLIST":
            c = a.bq.elements.dropDownListField(b);
            break;
        case "RADIOBUTTONLIST":
            c = a.bq.elements.listField("RADIO", b)
        }
        return c
    }
    ;
    a.bq.valuesContain = function(a, b) {
        for (var c = 0; c < a.length; c++)
            if (a[c][1] == b)
                return !0;
        return !1
    }
    ;
    a.bq.getTextValuePairs = function(a, b) {
        var c = [];
        if (a.indexOf("DATABASE ") > -1)
            throw "Not Implemented";
        else if (a == "CUSTOM LIST")
            for (var d = b.split("\n"), e = 0; e < d.length; e++) {
                var f = d[e];
                c[c.length] = [f, f]
            }
        else if (a == "NUMERIC RANGE") {
            d = b.split("|");
            e = d[0];
            d = d[1];
            f = 1;
            for (e > d && (f = -1); e <= d; e += f)
                c[c.length] = [e, e]
        } else
            c[c.length] = [b, b];
        return c
    }
    ;
    a.bq.elements.renderBookingQuestionFieldTitle = function(a, b) {
        return a.IsRequired ? {
            label: {
                _attr: {
                    "class": "bookingQuestion-title required " + (b || "")
                },
                "": a.Name,
                "label.indicator": {
                    "": "*",
                    _attr: {
                        title: "Required field"
                    }
                }
            }
        } : {
            label: {
                _attr: {
                    "class": "bookingQuestion-title " + (b || "")
                },
                "": a.Name
            }
        }
    }
    ;
    a.bq.elements.hiddenField = function(b) {
        return [{
            "div.bookingQuestion-container": [a.bq.elements.renderBookingQuestionFieldTitle(b, ""), {
                "div.bookingQuestion-answers": [{
                    "label.bookingQuestion-answer": [{
                        "input.bookingQuestion-answer-field": {
                            _attr: {
                                type: "hidden",
                                name: b.UniqueHash,
                                value: b.ValuesDefault
                            },
                            _events: {
                                change: function() {
                                    d("div.bookingQuestion-answer-message." + b.UniqueHash.replace(/\|/g, "-")).html(" ");
                                    d("div.bookingQuestion-answer-actions." + b.UniqueHash.replace(/\|/g, "-")).html(" ");
                                    for (var c = 0; c < b.Actions.length; c++) {
                                        var e = b.Actions[c];
                                        d(this).val() == e.Values && (d("div.bookingQuestion-answer-message." + b.UniqueHash.replace(/\|/g, "-")).append({
                                            div: e.Message
                                        }),
                                        e.Type == "QUESTION" && d("div.bookingQuestion-answer-actions." + b.UniqueHash.replace(/\|/g, "-")).append(a.bq.buildBookingQuestionFieldDiv(e.Effect)))
                                    }
                                }
                            }
                        }
                    }, {
                        div: {
                            _attr: {
                                "class": "bookingQuestion-answer-message " + b.UniqueHash.replace(/\|/g, "-")
                            }
                        }
                    }]
                }]
            }]
        }, {
            div: {
                _attr: {
                    "class": "bookingQuestion-answer-actions " + b.UniqueHash.replace(/\|/g, "-")
                }
            }
        }]
    }
    ;
    a.bq.elements.textBoxField = function(b) {
        return [{
            "div.bookingQuestion-container": [a.bq.elements.renderBookingQuestionFieldTitle(b), {
                "div.bookingQuestion-answers": [{
                    "label.bookingQuestion-answer": [{
                        "input.bookingQuestion-answer-field": {
                            _attr: {
                                type: "textbox",
                                name: b.UniqueHash,
                                value: b.ValuesDefault
                            },
                            _events: {
                                change: function() {
                                    d("div.bookingQuestion-answer-message." + b.UniqueHash.replace(/\|/g, "-")).html(" ");
                                    d("div.bookingQuestion-answer-actions." + b.UniqueHash.replace(/\|/g, "-")).html(" ");
                                    for (var c = 0; c < b.Actions.length; c++) {
                                        var e = b.Actions[c];
                                        d(this).val() == e.Values && (d("div.bookingQuestion-answer-message." + b.UniqueHash.replace(/\|/g, "-")).append({
                                            div: e.Message
                                        }),
                                        e.Type == "QUESTION" && d("div.bookingQuestion-answer-actions." + b.UniqueHash.replace(/\|/g, "-")).append(a.bq.buildBookingQuestionFieldDiv(e.Effect)))
                                    }
                                }
                            }
                        }
                    }, {
                        div: {
                            _attr: {
                                "class": "bookingQuestion-answer-message " + b.UniqueHash.replace(/\|/g, "-")
                            }
                        }
                    }]
                }]
            }]
        }, {
            div: {
                _attr: {
                    "class": "bookingQuestion-answer-actions " + b.UniqueHash.replace(/\|/g, "-")
                }
            }
        }]
    }
    ;
    a.bq.elements.listField = function(b, c) {
        for (var e = [], f = a.bq.getTextValuePairs(c.ValuesType, c.Values), g = a.bq.getTextValuePairs(c.ValuesType, c.ValuesDefault), m = 0; m < f.length; m++) {
            var j = f[m][0]
              , l = f[m][1]
              , u = {
                type: b,
                name: c.UniqueHash,
                value: l
            };
            if (a.bq.valuesContain(g, l))
                u.checked = !0;
            e[e.length] = {
                "label.bookingQuestion-answer": [{
                    "input.bookingQuestion-answer-field": {
                        _attr: u,
                        _events: {
                            change: function() {
                                d("div.bookingQuestion-answer-message." + c.UniqueHash.replace(/\|/g, "-")).html(" ");
                                d("div.bookingQuestion-answer-actions." + c.UniqueHash.replace(/\|/g, "-")).html(" ");
                                for (var b = 0; b < c.Actions.length; b++) {
                                    var e = c.Actions[b], f;
                                    if (!(f = d(this)[0].checked && d(this).val() == e.Values)) {
                                        f = d('[name="' + d(this)[0].name + '"]');
                                        for (var g = !1, m = 0; m < f.length; m++)
                                            if (f[m].checked) {
                                                g = !0;
                                                break
                                            }
                                        f = !g && e.Values == ""
                                    }
                                    f && (d("div.bookingQuestion-answer-message." + c.UniqueHash.replace(/\|/g, "-")).append({
                                        div: e.Message
                                    }),
                                    e.Type == "QUESTION" && d("div.bookingQuestion-answer-actions." + c.UniqueHash.replace(/\|/g, "-")).append(a.bq.buildBookingQuestionFieldDiv(e.Effect)))
                                }
                            }
                        }
                    }
                }, {
                    "span.bookingQuestion-answer-title": j
                }]
            }
        }
        e[e.length] = {
            div: {
                _attr: {
                    "class": "bookingQuestion-answer-message " + c.UniqueHash.replace(/\|/g, "-")
                }
            }
        };
        return [{
            "div.bookingQuestion-container": [a.bq.elements.renderBookingQuestionFieldTitle(c), {
                "div.bookingQuestion-answers": e
            }]
        }, {
            div: {
                _attr: {
                    "class": "bookingQuestion-answer-actions " + c.UniqueHash.replace(/\|/g, "-")
                }
            }
        }]
    }
    ;
    a.bq.elements.dropDownListField = function(b) {
        return [{
            "div.bookingQuestion-container": [a.bq.elements.renderBookingQuestionFieldTitle(b), {
                "div.bookingQuestion-answers": [{
                    "label.bookingQuestion-answer": [{
                        "select.bookingQuestion-answer-field": function() {
                            for (var c = [{
                                _attr: {
                                    name: b.UniqueHash
                                },
                                _events: {
                                    change: function() {
                                        d("div.bookingQuestion-answer-message." + b.UniqueHash.replace(/\|/g, "-")).html(" ");
                                        d("div.bookingQuestion-answer-actions." + b.UniqueHash.replace(/\|/g, "-")).html(" ");
                                        for (var c = 0; c < b.Actions.length; c++) {
                                            var e = b.Actions[c];
                                            d(this).val() == e.Values && (d("div.bookingQuestion-answer-message." + b.UniqueHash.replace(/\|/g, "-")).append({
                                                div: e.Message
                                            }),
                                            e.Type == "QUESTION" && d("div.bookingQuestion-answer-actions." + b.UniqueHash.replace(/\|/g, "-")).append(a.bq.buildBookingQuestionFieldDiv(e.Effect)))
                                        }
                                    }
                                }
                            }, {
                                option: {
                                    _attr: {
                                        value: ""
                                    }
                                }
                            }], e = a.bq.getTextValuePairs(b.ValuesType, b.Values), f = 0; f < e.length; f++) {
                                var g = e[f][0]
                                  , m = e[f][1]
                                  , j = {
                                    value: m
                                };
                                if (b.ValuesDefault == m)
                                    j.selected = !0;
                                c[c.length] = {
                                    option: {
                                        "": g,
                                        _attr: j
                                    }
                                }
                            }
                            return c
                        }()
                    }]
                }, {
                    div: {
                        _attr: {
                            "class": "bookingQuestion-answer-message " + b.UniqueHash.replace(/\|/g, "-")
                        }
                    }
                }]
            }]
        }, {
            div: {
                _attr: {
                    "class": "bookingQuestion-answer-actions " + b.UniqueHash.replace(/\|/g, "-")
                }
            }
        }]
    }
    ;
    a.handleBookClick = function(a) {
        b.session.get(function(a) {
            h.name = "BE-Session-Key=" + a
        });
        d(function() {
            h.location.href = a.bookingURL
        }, 50)
    }
    ;
    var m;
    m = a.comms = {};
    m.getCurrent = function(a, c) {
        typeof k != "undefined" && k !== null && k.cancel();
        k = d.getJSON(b.urls.endpoints.cartGet() + "&key=" + a, function(a) {
            k = null ;
            a.NoDataFound ? c.call(h, {}) : c.call(h, d.json.convertDates(a))
        })
    }
    ;
    m.confirmCurrent = function(a, c, e, f) {
        a = b.urls.endpoints.cartConfirm() + "&key=" + a;
        c.campaignID != null && (a += "&campaignID=" + c.campaignID);
        e != null && (a += "&ExternalSearch=" + e);
        c.agentID != null && (a += "&agentID=" + c.agentID);
        c.agentType != null && (a += "&agentType=" + c.agentType);
        d.getJSON(a, function(a) {
            a = d.json.convertDates(a);
            f.call(h, a)
        })
    }
    ;
    m.fetchCancellationPolicies = function(a, c, e) {
        if (typeof e.cartcontent == "undefined")
            return !1;
        var f = d.event.publish
          , g = b.urls.endpoints.getOpDetailsShort()
          , e = e.cartcontent
          , m = "&operators="
          , j = !1
          , l = !1;
        f("cart.comms.cancellation.start", h);
        g += "?q=" + c.vcID;
        for (var a = 0, u = e.length; a < u; a++)
            e[a].type != "packages" ? (j = !0,
            m += e[a].operatorid + ",") : l = !0;
        if (j || l) {
            d("body > div.BE_cancellationPolicies").remove();
            var k = d({
                "div.BE_cancellationPolicies": ""
            }).appendTo("body")
              , E = b.util.stripTags;
            j && (m = m.replace(/,$/, ""),
            g += m,
            d.getJSON(g, function(a) {
                for (var b = 0, c = a.length; b < c; b++)
                    typeof a[b].CancellationPolicy != "undefined" && a[b].CancellationPolicy.replace(/(^\s+|\s+$)/, "") && k.append({
                        "div.cancellationPolicy": {
                            "h3.name": a[b].TradingName,
                            "div.policy": E(a[b].CancellationPolicy)
                        }
                    });
                l || f("cart.comms.cancellation.end", h)
            }));
            if (l) {
                a = 0;
                for (u = e.length; a < u; a++) {
                    var g = b.urls.endpoints.getPackageDetails() + "?q=" + c.vcID + "&packages="
                      , x = b.urls.endpoints.getOpDetailsShort() + "?q=" + c.vcID + "&operators=";
                    if (e[a].type == "packages") {
                        g += e[a].operatorid + ",";
                        for (m = 0; m < e[a].packageProducts.length; m++)
                            x += e[a].packageProducts[m].operatorid + ","
                    }
                    g = g.replace(/,$/, "");
                    x = x.replace(/,$/, "");
                    d.getJSON(g, function(a) {
                        for (var b = 0, c = a.length; b < c; b++)
                            typeof a[b].TermsAndConditions != "undefined" && a[b].TermsAndConditions.replace(/(^\s+|\s+$)/, "") && k.append({
                                "div.cancellationPolicy": {
                                    "h3.name": a[b].Name,
                                    "div.policy": E(a[b].TermsAndConditions)
                                }
                            });
                        d.getJSON(x, function(a) {
                            for (var b = 0, c = a.length; b < c; b++)
                                typeof a[b].CancellationPolicy != "undefined" && a[b].CancellationPolicy.replace(/(^\s+|\s+$)/, "") && k.append({
                                    "div.cancellationPolicy": {
                                        "ul.packageProducts": {
                                            "h3.name": a[b].TradingName,
                                            "div.policy": E(a[b].CancellationPolicy)
                                        }
                                    }
                                })
                        })
                    })
                }
                f("cart.comms.cancellation.end", h)
            }
        }
    }
    ;
    m.save = function(a, c, e) {
        if (typeof c != "undefined" && typeof c.cartcontent != "undefined")
            for (var g = 0; g < c.cartcontent.length; g++)
                if (c.cartcontent[g].operatorid == 78196) {
                    b.gadget.book.hasCustomItem = !0;
                    break
                }
        f = 0;
        for (var a = b.urls.endpoints.cartSave() + "&key=" + a, g = 0, m = [], c = encodeURI(d.json.stringify(c)), c = c.replace(/\?/g, "%3F"), c = c.replace(/&/g, "%26"), c = c.replace(/#/g, "%23"), c = c.replace(/\+/g, "%2B"), c = c.replace(/(.)=(.)/g, "$1%3D$2"), j = 0; ; j++) {
            for (var k = c.substr(g, 1500); k.substr(k.length - 2, 2).indexOf("%") > -1; )
                k = k.substr(0, k.length - 1);
            m[m.length] = k;
            g += k.length;
            if (g >= c.length)
                break
        }
        a += "&totalParts=" + m.length;
        for (j = 0; j < m.length; j++)
            d.getJSON(a + "&partNo=" + (j + 1) + "&data=" + m[j], function(a) {
                typeof a == "undefined" || typeof a.error != "undefined" ? (e.call(h, a),
                l("cart.save.complete", null , !0)) : f++;
                f == m.length && (e.call(h, a),
                l("cart.save.complete", null , !0))
            })
    }
    ;
    m.destroy = function(a, c) {
        b.session.destroy();
        d.getJSON(b.urls.endpoints.cartDelete() + "&key=" + a, c || function() {}
        )
    }
})(window);
(function(h) {
    h.BE.gadget.cart.defaults = {
        bookingURL: "https://" + h.location.host + "/product/book.html",
        isBooking: !1,
        autoCollapse: !1,
        overlaySettings: {
            useBlockout: !0,
            overlayColour: "#777",
            overlayOpacity: 0.5,
            innerBackground: "#FFF",
            zIndexLowest: 1E6,
            width: !1,
            height: !1
        },
        reuseBookingQuestions: !1
    }
})(window);
(function(h) {
    h.BE.gadget.cart.text = {};
    var d = h.BE.gadget.cart.text;
    d.typeLookup = h.BE.text.typeLookup;
    d.labels = {
        accom: {
            date: "Check in",
            out: "Check out"
        },
        tours: {
            date: "Tour date"
        },
        events: {
            date: "Event date"
        },
        carhire: {
            date: "Pick up date",
            out: "Drop off date"
        },
        packages: {
            date: "Check in",
            out: "Check out"
        },
        price: "Price",
        nights: "Nights",
        pickup: "Pickup",
        dropoff: "Dropoff",
        days: "Days",
        date: "Date",
        adults: "Adults",
        children: "Children",
        infants: "Infants",
        concessions: "Concessions",
        students: "Students",
        observers: "Observers",
        family: "Families(2A2C)",
        total: "Total",
        quantity: "Quantity"
    };
    d.noItems = "You currently don't have any items in your cart";
    d.cartItems = "Cart Items";
    d.addToCart = "Add item to cart";
    d.cartTotal = "Cart total: ";
    d.cartCheckout = "Checkout Now";
    d.checkOutImmediately = "Buy Now";
    d.cartRemoveItem = "Remove item";
    d.cartRemoveItemConf = "\nAre you sure you wish to remove this?";
    d.cartClear = "Clear cart";
    d.cartClearConf = "Are you sure you want to clear your shopping cart?";
    d.saveError = "Sorry there has been a network error, please try again.";
    d.pastDateError = "The selected date is in the past, please select a new date and try again.";
    d.editItem = "View item details";
    d.cartContains = "Your cart contains {x} items.";
    d.cartContainsGreater = "Your cart contains more then 9 items.";
    d.cartOverlayTitle = "Your Cart";
    d.bondDueNow = "Due now";
    d.bondDueLater = "Prior to check-in";
    d.bondDueLaterDet = "Due {x} days before check-in. Not included in the total shown."
})(window);
(function(h) {
    h.BE.gadget.cart.elements = {};
    var d = h.wisDOM
      , b = h.BE
      , a = h.BE.gadget.cart.elements
      , k = h.BE.gadget.cart.text
      , f = d.event.publish;
    a.cartBase = function(a, b) {
        var c = {
            "div.cartItems": []
        };
        b.isBooking || c["div.cartItems"].push({
            "div.checkout": {
                a: {
                    span: k.cartCheckout,
                    _events: {
                        click: function() {
                            f("cart.checkout.click", this, a)
                        }
                    }
                }
            }
        });
        return c
    }
    ;
    a.extractAdditionalData = function(b, c, f) {
        if (!1 == a.validateAdditionalData(c))
            return !1;
        var j = {};
        if (b == "tours" || b == "events") {
            var b = c.closest("div.add-to-cart-form")
              , m = b.find("div.routes-chooser")
              , n = m.find("div.pickups select")
              , m = m.find("div.dropoffs select");
            n.length > 0 && (j = {
                pickup: {
                    id: parseInt(n.val(), 10),
                    name: d(n[0].options[n[0].selectedIndex]).text()
                },
                dropoff: {
                    id: parseInt(m.val(), 10),
                    name: d(m[0].options[m[0].selectedIndex]).text()
                }
            })
        } else if (b == "packages")
            for (var b = c.closest("div.add-to-cart-form"), k = b.find("div.packageproducts-additionaldata"), b = 0; b < k.length; b++)
                m = k.find("div.routes-chooser"),
                n = m.find("div.pickups select"),
                m = m.find("div.dropoffs select"),
                n.length > 0 && (j = {
                    pickup: {
                        id: parseInt(n.val(), 10),
                        name: d(n[0].options[n[0].selectedIndex]).text()
                    },
                    dropoff: {
                        id: parseInt(m.val(), 10),
                        name: d(m[0].options[m[0].selectedIndex]).text()
                    }
                });
        f[10] = j;
        b = c.closest("div.add-to-cart-form");
        c = b.find("div.bookingQuestion-container");
        j = [];
        if (c.length > 0)
            for (b = 0; b < c.length; b++) {
                k = d(c[b]);
                n = k.find("label.bookingQuestion-title")[0].childNodes[0].nodeValue;
                k = k.find(".bookingQuestion-answer-field");
                for (m = 0; m < k.length; m++)
                    j = a.setBookingQuestionsDataValue(j, n, k[m])
            }
        f[11] = j;
        return !0
    }
    ;
    a.validateAdditionalData = function(b) {
        for (var c = "", f = {}, c = b.closest("div.add-to-cart-form").find("div.bookingQuestion-container"), b = !1, j = 0; j < c.length; j++) {
            var m = d(c[j])
              , n = m.find("label.bookingQuestion-title")[0].childNodes[0].nodeValue
              , k = m.find(".bookingQuestion-answer-field")
              , h = m.closest(".bookingQuestion").find(".accordian-header")[0].childNodes[0].nodeValue
              , v = m.closest(".bookingQuestionSet").find(".bookingQuestionSet-title")
              , v = v.length > 0 && v[0].childNodes.length > 0 ? v[0].childNodes[0].nodeValue : "";
            f[h] == null && (f[h] = {});
            f[h][v] == null && (f[h][v] = []);
            if ((m.find("label.bookingQuestion-title").attr("class") || "").toLowerCase().indexOf("required") > -1) {
                for (var p = "", q = 0; q < k.length; q++) {
                    var r = d(k[q])
                      , s = r.val();
                    if ((r.attr("type") || "").toLowerCase() == "checkbox" || (r.attr("type") || "").toLowerCase() == "radio")
                        s = s == "" ? r[0].checked ? "True" : "" : r[0].checked ? s : "";
                    p += s
                }
                p == "" && (!1 == b && (a.accordian(m, 0),
                r[0].focus(),
                b = !0),
                f[h][v][f[h][v].length] = n)
            }
        }
        c = "";
        for (h in f) {
            r = !1;
            for (v in f[h])
                f[h][v].length > 0 && (r = !0);
            if (!1 != r)
                for (v in c += "\n" + h + "\n",
                f[h])
                    if (f[h][v].length != 0)
                        for (var u in v != "" && (c += "    \u00b7 " + v + "\n"),
                        f[h][v])
                            c += (v == "" ? "    \u00b7 " : "        \u00b7 ") + f[h][v][u] + "\n"
        }
        if (c != "")
            return alert("The following fields are required:\n" + c),
            !1;
        return !0
    }
    ;
    a.setBookingQuestionsDataValue = function(b, c, f) {
        var f = d(f)
          , j = !1
          , m = a.parseBookingQuestionsAnswerFieldValue(f);
        if (m != null ) {
            for (var n = 0; n < b.length; n++)
                b[n].id == f.attr("name") && (b[n].values += (m.length > 0 && b[n].values.length > 0 ? "\n" : "") + m,
                j = !0);
            j || (b[b.length] = {
                id: f.attr("name"),
                name: c,
                values: m,
                show: !1 == ((f.attr("type") || "").toLowerCase() == "hidden")
            })
        }
        return b
    }
    ;
    a.parseBookingQuestionsAnswerFieldValue = function(a) {
        var a = d(a)
          , b = a.val();
        if ((a.attr("type") || "").toLowerCase() == "checkbox" || (a.attr("type") || "").toLowerCase() == "radio")
            b = b == "" ? a[0].checked ? "True" : "False" : a[0].checked ? b : "";
        return b
    }
    ;
    a.form = function(c) {
        var g = c[2]
          , l = c[3]
          , j = c[4]
          , m = parseInt(c[6], 10)
          , n = c[8]
          , h = {
            adults: parseInt(j.adults, 10),
            children: parseInt(j.children, 10),
            infants: parseInt(j.infants, 10),
            concessions: parseInt(j.concessions, 10),
            students: parseInt(j.students, 10),
            observers: parseInt(j.observers, 10),
            family: parseInt(j.family, 10)
        }
          , w = {
            "div.add-to-cart-form": {
                _attr: {
                    "class": "add-to-cart-form accordian-container"
                },
                "div.add-to-cart-information": function() {
                    var a = {
                        "div.name": {
                            "span.operator-name": c[5],
                            "": " ",
                            "span.item-name": l.Name
                        },
                        "div.price": {
                            label: k.labels.price,
                            span: b.util.currencies.formatShort(g == "packages" ? l.Cost * m % 1 > 0 ? parseFloat(l.Cost * m).toFixed(2) : parseFloat(l.Cost * m).toFixed(0) : l.Availability.Cost * m % 1 > 0 ? parseFloat(l.Availability.Cost * m).toFixed(2) : parseFloat(l.Availability.Cost * m).toFixed(0), b.currencyId)
                        },
                        "div.quantity": {
                            label: k.labels.quantity,
                            span: m
                        }
                    };
                    g != "packages" && (a["div.date"] = {
                        label: k.labels[g].date,
                        span: j.date
                    });
                    return a
                }()
            }
        };
        if (g == "accom" || g == "carhire")
            w["div.add-to-cart-form"]["div.add-to-cart-information"]["div.dateEnd"] = {
                label: k.labels[g].out,
                span: function() {
                    var a = parseInt(j.period, 10)
                      , a = b.util.date.addDays(j.date, a);
                    return b.util.date.names.getDay(a.getDay() + 1, !0) + " " + a.getDate() + "/" + (a.getMonth() + 1) + "/" + a.getFullYear()
                }()
            };
        g == "accom" && (w["div.add-to-cart-form"]["div.add-to-cart-information"]["div.period"] = {
            label: k.labels.period,
            span: j.period
        });
        if (g != "carhire" && g != "packages")
            for (var v in h)
                h.hasOwnProperty(v) && !(g == "accom" && v != "adults" && v != "children" && v != "infants") && (isNaN(h[v]) || h[v] != 0 && (w["div.add-to-cart-form"]["div.add-to-cart-information"]["div." + v] = {
                    label: k.labels[v],
                    span: h[v]
                }));
        h = w["div.add-to-cart-form"]["div.add-to-cart-information"]["div.AdditionalData"] = {};
        n != null && n.length != null && n.length > 0 && (h["div.PackageProducts"] = {
            "div.packageproducts-title": "This package consists of the following products:",
            "div.packageproducts-items": function() {
                for (var a = [], c = 0; c < n.length; c++) {
                    var d = n[c];
                    a.push({
                        "div.packageproducts-item": {
                            "label.packageproducts-operatorname": d.operatorname,
                            "label.packageproducts-name": d.name,
                            "div.packageproducts-details": function() {
                                var a = [];
                                if (d.type == "accom") {
                                    var c = ["adults", "children", "infants"];
                                    a.push({
                                        "div.packageproducts-detail": {
                                            label: "Arrival Date",
                                            span: [{
                                                "span.dayName": b.util.date.names.getDay(d.startdate.getDay() + 1, !0)
                                            }, {
                                                "": " "
                                            }, {
                                                "span.date": d.startdate.getDate()
                                            }, {
                                                "": " "
                                            }, {
                                                "span.month": b.util.date.names.getMonth(d.startdate.getMonth() + 1)
                                            }, {
                                                "": " "
                                            }, {
                                                "span.year": d.startdate.getFullYear()
                                            }]
                                        }
                                    });
                                    a.push({
                                        "div.packageproducts-detail": {
                                            label: "Period",
                                            span: d.period
                                        }
                                    });
                                    for (var e = 0, f; f = c[e]; e++)
                                        d[f] != 0 && a.push({
                                            "div.packageproducts-detail": {
                                                label: k.labels[f],
                                                span: d[f]
                                            }
                                        })
                                } else if (d.type == "tours") {
                                    c = ["adults", "children", "infants", "concessions", "students", "observers"];
                                    a.push({
                                        "div.packageproducts-detail": {
                                            label: "Tour Date",
                                            span: [{
                                                "span.dayName": b.util.date.names.getDay(d.startdate.getDay() + 1, !0)
                                            }, {
                                                "": " "
                                            }, {
                                                "span.date": d.startdate.getDate()
                                            }, {
                                                "": " "
                                            }, {
                                                "span.month": b.util.date.names.getMonth(d.startdate.getMonth() + 1)
                                            }, {
                                                "": " "
                                            }, {
                                                "span.year": d.startdate.getFullYear()
                                            }]
                                        }
                                    });
                                    for (e = 0; f = c[e]; e++)
                                        d[f] != 0 && a.push({
                                            "div.packageproducts-detail": {
                                                label: k.labels[f],
                                                span: d[f]
                                            }
                                        })
                                } else if (d.type == "events") {
                                    c = ["adults", "children", "infants", "concessions", "students", "observers"];
                                    a.push({
                                        "div.packageproducts-detail": {
                                            label: "Event Date",
                                            span: [{
                                                "span.dayName": b.util.date.names.getDay(d.startdate.getDay() + 1, !0)
                                            }, {
                                                "": " "
                                            }, {
                                                "span.date": d.startdate.getDate()
                                            }, {
                                                "": " "
                                            }, {
                                                "span.month": b.util.date.names.getMonth(d.startdate.getMonth() + 1)
                                            }, {
                                                "": " "
                                            }, {
                                                "span.year": d.startdate.getFullYear()
                                            }]
                                        }
                                    });
                                    for (e = 0; f = c[e]; e++)
                                        d[f] != 0 && a.push({
                                            "div.packageproducts-detail": {
                                                label: k.labels[f],
                                                span: d[f]
                                            }
                                        })
                                } else if (d.type == "carhire") {
                                    c = ["adults", "children", "infants"];
                                    a.push({
                                        "div.packageproducts-detail": {
                                            label: "Arrival Date",
                                            span: [{
                                                "span.dayName": b.util.date.names.getDay(d.startdate.getDay() + 1, !0)
                                            }, {
                                                "": " "
                                            }, {
                                                "span.date": d.startdate.getDate()
                                            }, {
                                                "": " "
                                            }, {
                                                "span.month": b.util.date.names.getMonth(d.startdate.getMonth() + 1)
                                            }, {
                                                "": " "
                                            }, {
                                                "span.year": d.startdate.getFullYear()
                                            }]
                                        }
                                    });
                                    a.push({
                                        "div.packageproducts-detail": {
                                            label: "Period",
                                            span: d.period
                                        }
                                    });
                                    for (e = 0; f = c[e]; e++)
                                        d[f] != 0 && a.push({
                                            "div.packageproducts-detail": {
                                                label: k.labels[f],
                                                span: d[f]
                                            }
                                        })
                                }
                                return a
                            }(),
                            "div.packageproducts-additionaldata": {}
                        }
                    })
                }
                return a
            }()
        });
        w["div.add-to-cart-form"]["div.addButton"] = {
            "a.next": {
                span: "Next",
                _events: {
                    click: function() {
                        a.accordian(this, 1)
                    }
                }
            },
            "a.checkOutNow": {
                span: k.checkOutImmediately,
                _events: {
                    click: function() {
                        a.extractAdditionalData(g, d(this), c) && f("cart.addAndBuy.click", this, c)
                    }
                }
            },
            "a.addToCart": {
                span: k.addToCart,
                _events: {
                    click: function() {
                        a.extractAdditionalData(g, d(this), c) && f("cart.add.click", this, c)
                    }
                }
            },
            "a.previous": {
                span: "Previous",
                _events: {
                    click: function() {
                        a.accordian(this, -1)
                    }
                }
            }
        };
        w["div.add-to-cart-form"]["div.addProgress"] = {
            "div.spinner": {
                span: ""
            }
        };
        return w
    }
    ;
    a.itemDetails = function(a) {
        var c = {
            "div.item-details": {}
        }
          , d = h.BE.text.cartKeys
          , j = a[0].cartcontent[a[1]];
        if (j.type == "events")
            try {
                delete j.period
            } catch (m) {
                j.period = void 0
            }
        for (var n in j)
            if (j.hasOwnProperty(n) && !(n == "id" || n == "operatorid" || n == "operatorname" || n == "pickup" || n == "dropoff" || n == "bookingQuestionAnswers" || n == "packageProducts" || n == "groupGuid" || n == "groupMaster" || n === "stage" || n == "isGroupMaster"))
                n == "location" && b.util.exists(b.gadget.tripPlanner) && b.gadget.tripPlanner.isActive || (n == "description" ? c["div.item-details"]["div.name"] = {
                    "span.operator-name": j.operatorname,
                    "": " ",
                    "span.item-name": j.description
                } : n == "location" ? c["div.item-details"]["div." + n] = {
                    a: {
                        _attr: {
                            href: j[n]
                        },
                        span: k.editItem
                    }
                } : n == "type" ? c["div.item-details"]["div." + n] = {
                    div: {
                        _attr: {
                            "class": j[n]
                        }
                    }
                } : n == "quotedprice" ? c["div.item-details"]["div.price"] = {
                    label: k.labels.price,
                    span: b.util.currencies.formatShort(j[n], b.currencyId)
                } : j.type != "packages" && (n == "startdate" ? c["div.item-details"]["div.startdate"] = function() {
                    var a = {}
                      , c = j[n]
                      , e = "";
                    e += b.util.date.names.getDay(c.getDay() + 1, !0) + " ";
                    e += c.getDate() + " ";
                    e += b.util.date.names.getMonth(c.getMonth() + 1, !0) + " ";
                    e += c.getFullYear();
                    a.label = d.startdate;
                    a.span = e;
                    return a
                }() : j[n] != 0 && (c["div.item-details"]["div." + n] = [{
                    label: d[n]
                }, {
                    span: j[n].toString()
                }])));
        c["div.item-details"]["div.AdditionalData"] = function() {
            var a = [];
            if (j.type == "tours" || j.type == "events")
                typeof j.pickup != "undefined" && (a[a.length] = {
                    "div.pickup": {
                        label: "Pickup",
                        span: j.pickup.name
                    }
                }),
                typeof j.dropoff != "undefined" && (a[a.length] = {
                    "div.dropoff": {
                        label: "Dropoff",
                        span: j.dropoff.name
                    }
                });
            j.bookingQuestionAnswers && (a[a.length] = {
                "div.bookingQuestions": function() {
                    for (var a = [], b = "", c = 0, d = 0; d < j.bookingQuestionAnswers.length; d++) {
                        var e = j.bookingQuestionAnswers[d]
                          , f = e.id.split("|")
                          , g = f[1]
                          , f = parseInt(f[2]);
                        if (b != g || c != f)
                            a[a.length] = {
                                "div.bookingQuestionSet-title": g + " " + (f + 1)
                            },
                            b = g,
                            c = f;
                        a[a.length] = {
                            "div.bookingQuestion": {
                                label: e.name,
                                span: e.show ? e.values : ""
                            }
                        }
                    }
                    return a
                }()
            });
            if (j.packageProducts != null && j.packageProducts.length != null && j.packageProducts.length > 0) {
                var c = j.packageProducts;
                a[a.length] = {
                    "div.PackageProducts": {
                        "div.packageproducts-title": "This package consists of the following products:",
                        "div.packageproducts-items": function() {
                            for (var a = [], d = 0; d < c.length; d++) {
                                var e = c[d];
                                a.push({
                                    "div.packageproducts-item": {
                                        "label.packageproducts-operatorname": e.operatorname,
                                        "label.packageproducts-name": e.name,
                                        "div.packageproducts-details": function() {
                                            var a = [];
                                            if (e.type == "accom") {
                                                var c = ["adults", "children", "infants"];
                                                a.push({
                                                    "div.packageproducts-detail": {
                                                        label: "Arrival Date",
                                                        span: [{
                                                            "span.dayName": b.util.date.names.getDay(e.startdate.getDay() + 1, !0)
                                                        }, {
                                                            "": " "
                                                        }, {
                                                            "span.date": e.startdate.getDate()
                                                        }, {
                                                            "": " "
                                                        }, {
                                                            "span.month": b.util.date.names.getMonth(e.startdate.getMonth() + 1)
                                                        }, {
                                                            "": " "
                                                        }, {
                                                            "span.year": e.startdate.getFullYear()
                                                        }]
                                                    }
                                                });
                                                a.push({
                                                    "div.packageproducts-detail": {
                                                        label: "Period",
                                                        span: e.period
                                                    }
                                                });
                                                for (var d = 0, f; f = c[d]; d++)
                                                    e[f] != 0 && a.push({
                                                        "div.packageproducts-detail": {
                                                            label: k.labels[f],
                                                            span: e[f]
                                                        }
                                                    })
                                            } else if (e.type == "tours") {
                                                c = ["adults", "children", "infants", "concessions", "students", "observers"];
                                                a.push({
                                                    "div.packageproducts-detail": {
                                                        label: "Tour Date",
                                                        span: [{
                                                            "span.dayName": b.util.date.names.getDay(e.startdate.getDay() + 1, !0)
                                                        }, {
                                                            "": " "
                                                        }, {
                                                            "span.date": e.startdate.getDate()
                                                        }, {
                                                            "": " "
                                                        }, {
                                                            "span.month": b.util.date.names.getMonth(e.startdate.getMonth() + 1)
                                                        }, {
                                                            "": " "
                                                        }, {
                                                            "span.year": e.startdate.getFullYear()
                                                        }]
                                                    }
                                                });
                                                for (d = 0; f = c[d]; d++)
                                                    e[f] != 0 && a.push({
                                                        "div.packageproducts-detail": {
                                                            label: k.labels[f],
                                                            span: e[f]
                                                        }
                                                    })
                                            } else if (e.type == "events") {
                                                c = ["adults", "children", "infants", "concessions", "students", "observers"];
                                                a.push({
                                                    "div.packageproducts-detail": {
                                                        label: "Event Date",
                                                        span: [{
                                                            "span.dayName": b.util.date.names.getDay(e.startdate.getDay() + 1, !0)
                                                        }, {
                                                            "": " "
                                                        }, {
                                                            "span.date": e.startdate.getDate()
                                                        }, {
                                                            "": " "
                                                        }, {
                                                            "span.month": b.util.date.names.getMonth(e.startdate.getMonth() + 1)
                                                        }, {
                                                            "": " "
                                                        }, {
                                                            "span.year": e.startdate.getFullYear()
                                                        }]
                                                    }
                                                });
                                                for (d = 0; f = c[d]; d++)
                                                    e[f] != 0 && a.push({
                                                        "div.packageproducts-detail": {
                                                            label: k.labels[f],
                                                            span: e[f]
                                                        }
                                                    })
                                            } else if (e.type == "carhire") {
                                                c = ["adults", "children", "infants"];
                                                a.push({
                                                    "div.packageproducts-detail": {
                                                        label: "Arrival Date",
                                                        span: [{
                                                            "span.dayName": b.util.date.names.getDay(e.startdate.getDay() + 1, !0)
                                                        }, {
                                                            "": " "
                                                        }, {
                                                            "span.date": e.startdate.getDate()
                                                        }, {
                                                            "": " "
                                                        }, {
                                                            "span.month": b.util.date.names.getMonth(e.startdate.getMonth() + 1)
                                                        }, {
                                                            "": " "
                                                        }, {
                                                            "span.year": e.startdate.getFullYear()
                                                        }]
                                                    }
                                                });
                                                a.push({
                                                    "div.packageproducts-detail": {
                                                        label: "Period",
                                                        span: e.period
                                                    }
                                                });
                                                for (d = 0; f = c[d]; d++)
                                                    e[f] != 0 && a.push({
                                                        "div.packageproducts-detail": {
                                                            label: k.labels[f],
                                                            span: e[f]
                                                        }
                                                    })
                                            }
                                            return a
                                        }()
                                    }
                                })
                            }
                            return a
                        }()
                    }
                }
            }
            return a
        }();
        j.isGroupMaster && (c["div.item-details"]["div.removeItem"] = {
            a: {
                span: k.cartRemoveItem,
                _events: {
                    click: function() {
                        f("cart.remove.click", this, a)
                    }
                }
            }
        });
        return c
    }
    ;
    var c = null ;
    a.accordian = function(e, f, k, j) {
        h.clearInterval(c);
        d(".addToCart").css({
            display: "none"
        });
        d(".checkOutNow").css({
            display: "none"
        });
        var m = b.util.hasClass(d(e), "accordian-container") ? d(e) : d(e).closest(".accordian-container")
          , n = d(m).find(".accordian");
        if (n.length === 0 && k === !1 && j === !1 && j !== "undefined")
            d(".addToCart").css({
                display: "block"
            }),
            d(".checkOutNow").css({
                display: "block"
            }),
            d(".previous").css({
                display: "none"
            }),
            d(".next").css({
                display: "none"
            });
        else if (n.length === 0 && k === !1 && typeof j === "undefined")
            d(".addToCart").css({
                display: "none"
            }),
            d(".checkOutNow").css({
                display: "none"
            }),
            d(".previous").css({
                display: "none"
            }),
            d(".next").css({
                display: "none"
            });
        else if (n.length === 0 && k === !0 && j === !0 && typeof j !== "undefined")
            d(".addToCart").css({
                display: "none"
            }),
            d(".checkOutNow").css({
                display: "none"
            }),
            d(".previous").css({
                display: "none"
            }),
            d(".next").css({
                display: "none"
            });
        else if (n.length === 0 && k === !0 && j === !1 && typeof j !== "undefined")
            d(".addToCart").css({
                display: "block"
            }),
            d(".checkOutNow").css({
                display: "block"
            }),
            d(".previous").css({
                display: "none"
            }),
            d(".next").css({
                display: "none"
            });
        else {
            var e = f == 0 ? b.util.hasClass(d(e), "accordian") ? d(e) : d(e).closest(".accordian") : d(m).find(".accordian.expanded")
              , o = -1;
            if (e.length > 0)
                for (k = 0; k < n.length; k++)
                    if (d(n[k]).html() == e.html()) {
                        o = k;
                        break
                    }
            var e = !1
              , w = m.find("div.add-to-cart-information")[0];
            if (f < 0) {
                if (w.scrollTop > 0)
                    w.scrollTop = 0,
                    e = !0
            } else if (f > 0 && w.scrollTop < w.scrollHeight - w.clientHeight)
                w.scrollTop = w.scrollHeight,
                e = !0;
            !1 == e && (o += f,
            o < 0 ? o = 0 : o > n.length - 1 && (o = n.length - 1),
            m.find(".accordian").removeClass("expanded").addClass("collapsed"),
            d(n[o]).removeClass("collapsed").addClass("expanded"));
            f != 0 && (w.scrollTop < w.scrollHeight - w.clientHeight ? (c = h.setInterval(function() {
                w.scrollTop == w.scrollHeight - w.clientHeight && (h.clearInterval(c),
                a.accordian(n[o], 0))
            }, 100),
            e = !0) : e = !1);
            !1 == e && o == n.length - 1 && (d(".addToCart").css({
                display: "block",
                "pointer-events": "auto",
                "background-color": "#3377cc"
            }),
            d(".checkOutNow").css({
                display: "block",
                "pointer-events": "auto",
                "background-color": "#229933"
            }));
            o == 0 ? d(".previous").css({
                display: "none"
            }) : d(".previous").css({
                display: "block"
            });
            !1 == e && o == n.length - 1 ? d(".next").css({
                display: "none"
            }) : d(".next").css({
                display: "block"
            })
        }
    }
})(window);
(function(h) {
    var d = h.wisDOM
      , b = h.BE
      , a = {};
    b.gadget.book = function(k, f) {
        var c = d(k);
        if (c.length === 0)
            return !1;
        f = b.util.mergeObjects(f, b.gadget.book.defaults);
        b.gadget.init(f, function() {
            b.util.performSynchronousOperations([a.getVisCentreData(c, f), a.getHearOfUsData(c, f), a.getVcCountries(c, f), a.getVcOnlineBookingFields(c, f)], function() {
                var c = f
                  , g = d(k);
                if (g.length !== 0 && (g.empty(),
                g.append({
                    "div.booking-gadget BE": ""
                }),
                g = g.find("div.booking-gadget"),
                a.subscriptions(g, c),
                c.automaticCart)) {
                    var l = {
                        isBooking: !0,
                        vcID: c.vcID,
                        campaignID: c.campaignID,
                        ExternalSearch: typeof c.ExternalSearch != "undefined" ? c.ExternalSearch : !1,
                        agentID: c.agentID,
                        agentType: c.agentType
                    };
                    if (c.overlaySettings)
                        l.overlaySettings = c.overlaySettings;
                    b.gadget.cart.embed(l).appendTo(g)
                }
            })
        });
        return c
    }
    ;
    a.subscriptions = function(b, f) {
        var c = d.event.subscribe;
        c("cart.confirmation.end", function(a) {
            if (a.cartcontent.length > 0)
                f.operatorID = a.cartcontent[0].operatorid,
                f.Deposits = a.Deposits;
            else if (a.packages.length > 0)
                f.operatorID = 0,
                f.Deposits = a.Deposits
        });
        c("cart.is.bookable", function(c) {
            a.showForm(b, f, c)
        });
        c("book.button.click", function(c) {
            a.saveCart(b, f, c)
        });
        c("book.showCancellation.click", function(b) {
            a.showCancellationPolicies(b, f)
        });
        c("book.paymentTypePayPal.click", function(c) {
            a.setPaymentTypePayPal(b, f, c)
        });
        c("book.paymentTypeCreditCard.click", function(c) {
            a.setPaymentTypeCreditCard(b, f, c)
        })
    }
    ;
    a.getVisCentreData = function(a, f) {
        var c = arguments.callee
          , e = this
          , g = b.util.exists;
        !g(f.vcID) && g(f.vcModules["64"]) && !g(f.operatorID) && d(function() {
            c.call(e, a, f)
        }, 125);
        var l = b.urls.endpoints.getVisCenData() + "?q=" + f.vcID;
        g(f.vcModules["64"]) && (l = b.urls.endpoints.getTourManOpData() + "?q=" + f.vcID + "&OperatorId=" + f.operatorID);
        return d.getJSON(l, function(a) {
            f.vcData = a
        })
    }
    ;
    a.getHearOfUsData = function(a, f) {
        return d.getJSON(b.urls.endpoints.getHearData() + "&q=" + f.vcID, function(a) {
            f.hearData = a.Facilities
        })
    }
    ;
    a.getVcCountries = function(a, f) {
        return d.getJSON(b.urls.endpoints.getVcCountries() + "?q=" + f.vcID, function(a) {
            f.vcCountries = a.Countries
        })
    }
    ;
    a.getVcOnlineBookingFields = function(a, f) {
        return d.getJSON(b.urls.endpoints.getVcOnlineBookingFields() + "?q=" + f.vcID, function(a) {
            f.VcOnlineBookingFields = a.OnlineBookingFields
        })
    }
    ;
    b.gadget.getBookingUrl = function(a, d) {
        var c = b.urls.endpoints.finaliseBooking() + "&key=" + d;
        a.agentID != null && (c += "&agentID=" + a.agentID);
        a.agentType != null && (c += "&agentType=" + a.agentType);
        a.bookedBy != null && (c += "&bookedBy=" + escape(a.bookedBy));
        a.bookingLocation != null && (c += "&bookingLocation=" + escape(a.bookingLocation));
        return c
    }
    ;
    a.doBooking = function(k, f, c) {
        if (f.demoMode)
            alert("Sorry, this gadget is in demonstration mode, and won't make a booking");
        else if (d.event.publish("book.finalise.start", h),
        typeof f.queueBookings != "undefined" && f.queueBookings || typeof b.gadget.book.hasCustomItem != "undefined" && b.gadget.book.hasCustomItem)
            var e = {
                loop0: "Your booking is being processed. Due to high demand this may take up to 5 minutes to complete.",
                loop5: "We thank you for your patience. Your booking is still being processed.",
                loop10: "Apologies for the delay.  Our servers are still busy processing your booking and will be finished shortly."
            }
              , g = !1
              , l = 0
              , j = setInterval(function() {
                g !== !0 && (g = !0,
                typeof e["loop" + l] != "undefined" && d("#gadgets-queuing-additional-info").html(e["loop" + l]),
                l === 14 ? l = 0 : l += 1,
                d.getJSON(b.urls.endpoints.acquireLock() + f.vcID, function(e) {
                    typeof e.Win != "undefined" && e.Win !== "" && e.Win.length > 0 ? (clearInterval(j),
                    d("#gadgets-queuing-additional-info").html("Almost completed. Performing final steps."),
                    d.getJSON(b.gadget.getBookingUrl(f, c), function(c) {
                        d("#gadgets-queuing-additional-info").html("");
                        d.getJSON(b.urls.endpoints.releaseLock() + f.vcID + "&guid=" + e.Win, function() {});
                        k.find("div.button").removeClass("finalising");
                        d.event.publish("book.finalise.end", h);
                        typeof c.error != "undefined" || typeof c.PdfLink == "undefined" ? (a.bookingError(k, f, c),
                        g = !1) : a.bookingCompleted(k, f, c)
                    })) : g = !1
                }))
            }, 1E3);
        else
            d.getJSON(b.gadget.getBookingUrl(f, c), function(b) {
                k.find("div.button").removeClass("finalising");
                d.event.publish("book.finalise.end", h);
                typeof b.error != "undefined" || typeof b.PdfLink == "undefined" ? a.bookingError(k, f, b) : a.bookingCompleted(k, f, b)
            })
    }
    ;
    a.stopFinalising = function(a) {
        a.find("div.button a").css({
            visibility: ""
        });
        a.find("div.button").removeClass("finalising")
    }
    ;
    a.bookingError = function(b, d, c) {
        a.stopFinalising(b);
        typeof c.error == "boolean" ? alert("Sorry, an error has occured.\n\nIf you have entered your credit card, please check with your bank whether your\ncard has been debited, and if necessary check your card details and try again.") : alert("Sorry, an error has occured.\n\nThe response from the payment gateway was:\n" + c.error + ". \n\nPlease check the response and if necessary check your card details and\ntry again, or check with your bank whether your card has been debited.")
    }
    ;
    a.paymentFrameOverlay = null ;
    a.paymentPopupWin = null ;
    a.paymentFrameInterval = null ;
    a.paymentToken = "#" + Math.random().toString(36).substr(2);
    a.bookingCompleted = function(b, d, c) {
        c.SecurePayment != null && c.SecurePayment.IsApproved == !1 ? a.makePayment(b, d, c) : a.destroyCartAndRedirect(b, d, c)
    }
    ;
    a.makePayment = function(b, f, c) {
        a.paymentToken = "#" + Math.random().toString(36).substr(2);
        if (navigator.userAgent.toLowerCase().indexOf("iphone") !== -1) {
            var e = c.SecurePayment.Url + "&ReturnUrl=" + escape(h.location.protocol + "//" + h.location.host + h.location.pathname + h.location.search + a.paymentToken);
            d("body").html(d("body").html() + '<style>#iphoneFriendlyFrameWrap{-webkit-overflow-scrolling:touch !important; overflow:scroll !important;}</style><div class="remove" id="iphoneFriendlyFrameClose"><a><span></span></a></div><div id="iphoneFriendlyFrameWrap"><iframe id="iphoneFriendlyFrame" src="' + e + '"></iframe></div>');
            d("#iphoneFriendlyFrameWrap").css({
                width: "100%",
                height: "100%",
                position: "fixed",
                top: "0px",
                left: "0px",
                "z-index": "1000000",
                "background-color": "#ffffff"
            });
            d("#iphoneFriendlyFrame").css({
                width: "100%",
                height: "100%"
            });
            d("#iphoneFriendlyFrameClose").css({
                position: "fixed",
                top: "10px",
                right: "10px",
                "z-index": "1000010",
                display: "inline-block",
                width: "18px",
                height: "18px",
                cursor: "pointer",
                background: 'transparent url("../../img/cart-sprites.png") no-repeat scroll -9px -94px'
            });
            d("#iphoneFriendlyFrameClose").bind("click", function() {
                d("#iphoneFriendlyFrame").remove();
                d("#iphoneFriendlyFrameClose").remove();
                d("#iphoneFriendlyFrameWrap").remove()
            });
            a.paymentFrameOverlay = d("#iphoneFriendlyFrame")
        } else
            a.paymentFrameOverlay = d({
                iframe: {
                    _attr: {
                        src: c.SecurePayment.Url + "&ReturnUrl=" + escape(h.location.protocol + "//" + h.location.host + h.location.pathname + h.location.search + a.paymentToken),
                        style: "position: absolute;top:0;left: 0;width: 1px;height: 100%;min-width:100%;"
                    }
                }
            }).overlay({
                useBlockout: !0,
                overlayColour: "#777",
                overlayOpacity: 0.5,
                innerBackground: "#FFF",
                zIndexLowest: 1E6,
                width: h.innerWidth < 600 ? h.innerWidth - 50 : 600,
                height: h.innerHeight < 600 ? h.innerHeight - 50 : 600
            });
        a.paymentFrameInterval = h.setInterval(function() {
            var e = !1;
            if (h.location.hash == a.paymentToken)
                e = !0;
            else {
                var l = a.paymentFrameOverlay.parent();
                if (l == null || l.length == 0)
                    e = !0
            }
            if (e) {
                h.clearInterval(a.paymentFrameInterval);
                try {
                    d.overlay.call("closeall")
                } catch (j) {}
                a.checkPayment(b, f, c)
            }
        }, 50)
    }
    ;
    a.checkPayment = function(k, f, c) {
        var e = {
            target: k,
            options: f,
            json: c
        };
        d.getJSON(b.urls.endpoints.getBooking() + "&itineraryId=" + c.Itinerary.ItineraryID + "&password=" + c.Itinerary.Credentials.Password, function(c) {
            !1 == c.IsPaid ? confirm(b.gadget.book.text.errors.declinedPayment) ? a.makePayment(e.target, e.options, e.json) : (alert(b.gadget.book.text.errors.noPayment),
            a.destroyCartAndRedirect(e.target, e.options, e.json, !1)) : a.destroyCartAndRedirect(e.target, e.options, e.json, !0)
        })
    }
    ;
    a.destroyCartAndRedirect = function(a, f, c, e) {
        b.gadget.cart.save({
            firstname: null ,
            surname: null ,
            address: null ,
            city: null ,
            address: null ,
            city: null ,
            state: null ,
            postcode: null ,
            country: null ,
            phone: null ,
            email: null ,
            comment: null ,
            receiveENewsletter: null ,
            salutation: null ,
            acceptCancellationPolicy: null ,
            WhereDidYouHearId: null ,
            cartcontent: []
        });
        var g = b.urls.endpoints.sjp() + c.PdfLink.replace(/^\//, "");
        f.itineraryCSS !== null && (g += "&customCSS=" + escape(f.itineraryCSS));
        if ((f.confirmationURL || "") === "")
            a.slideUp(),
            typeof e != "undefined" && !e ? d({
                "div.bookingCancelled": {
                    label: b.gadget.book.text.bookingCancelled
                }
            }).insertAfter(a) : d({
                "div.bookingComplete": {
                    label: b.gadget.book.text.bookingCompleted,
                    a: {
                        _attr: {
                            href: g
                        },
                        "": b.gadget.book.text.pdfLinkText
                    }
                }
            }).insertAfter(a),
            d.getJSON(b.urls.endpoints.getBooking() + "&itineraryId=" + c.Itinerary.ItineraryID + "&password=" + c.Itinerary.Credentials.Password, function(a) {
                d.event.publish("Confirmation.Complete", h, a)
            });
        else {
            a = typeof c.SecurePayment != "undefined" ? c.SecurePayment.IsApproved : !0;
            typeof e != "undefined" && (a = e);
            var l = b.util.cookieName("c0nf14MA71onL!Nk");
            d.cookie(l, d.json.stringify({
                pdfURL: typeof e != "undefined" && !e ? "" : g,
                ItineraryId: c.Itinerary.ItineraryID,
                Password: c.Itinerary.Credentials.Password,
                IsApproved: a
            }));
            setTimeout(function() {
                h.location.href = f.confirmationURL
            }, 200)
        }
    }
    ;
    a.destroyCartAndRedirect2 = function(a, f, c) {
        b.gadget.cart.save({
            firstname: null ,
            surname: null ,
            address: null ,
            city: null ,
            address: null ,
            city: null ,
            state: null ,
            postcode: null ,
            country: null ,
            phone: null ,
            email: null ,
            comment: null ,
            receiveENewsletter: null ,
            salutation: null ,
            acceptCancellationPolicy: null ,
            WhereDidYouHearId: null ,
            cartcontent: []
        });
        (f.confirmationURL || "") === "" ? (a.slideUp(),
        typeof c != "undefined" && !c ? d({
            "div.bookingCancelled": {
                label: b.gadget.book.text.bookingCancelled
            }
        }).insertAfter(a) : d({
            "div.bookingComplete": {
                label: b.gadget.book.text.bookingCompletedNoItinerary
            }
        }).insertAfter(a)) : (a = b.util.cookieName("c0nf14MA71onL!Nk"),
        d.cookie(a, d.json.stringify({
            pdfURL: "",
            ItineraryId: "",
            Password: "",
            IsApproved: c
        })),
        setTimeout(function() {
            h.location.href = f.confirmationURL
        }, 200))
    }
    ;
    a.showCancellationPolicies = function(a, f) {
        var c = d("div.BE_cancellationPolicies");
        if (!c.length)
            return !1;
        b.util.exists(f.vcModules["64"]) && c.empty();
        c.find("div.vcPolicies").remove();
        c.prepend({
            "div.vcPolicies": {
                h2: b.gadget.book.text.termsAndConditions,
                h3: b.gadget.book.text.generalTerms,
                p: b.util.stripTags(f.vcData.CancellationPolicy)
            }
        });
        f.overlaySettings.useClone = !0;
        var e = 800
          , g = 250;
        typeof f.overlaySettings != "undefined" && (e = typeof f.overlaySettings.width != "undefined" ? f.overlaySettings.width : e,
        g = typeof f.overlaySettings.height != "undefined" ? f.overlaySettings.height : g);
        c.overlay({
            useBlockout: !0,
            width: e,
            height: g
        })
    }
    ;
    a.depositOptionsExist = function() {
        var a = d("input[name=depositPayment]");
        return typeof a != "undefined" && a.length > 0
    }
    ;
    a.getDepositOption = function() {
        var a = d("input[name=depositPayment]");
        if (typeof a == "undefined")
            return null ;
        for (var b = 0, c = 0, e = a.length; c < e; c++) {
            var g = a[c];
            if (g.checked) {
                b = g.value;
                break
            }
        }
        return b
    }
    ;
    a.getPaymentType = function() {
        var a = !1
          , b = d("input[name=paymentTypeRadio]");
        if (typeof b == "undefined")
            return a;
        for (var c = 0, e = b.length; c < e; c++) {
            var g = b[c];
            if (g.checked) {
                g.value == "paymentTypeRadioPayPal" && (a = !0);
                break
            }
        }
        return a
    }
    ;
    a.resetCreditCardDetails = function(a) {
        i = 0;
        for (len = a.length; i < len; i++)
            if (a[i].type != "radio")
                a[i].value = ""
    }
    ;
    a.setPaymentTypePayPal = function(b) {
        var d = b.find(".paym");
        a.resetCreditCardDetails(d);
        cardTypeSection = b.find("div.ccDetails");
        cardTypeSection.find("div.cardTypes").css({
            display: "none"
        });
        cardTypeSection.find("div.name").css({
            display: "none"
        });
        cardTypeSection.find("div.number").css({
            display: "none"
        });
        cardTypeSection.find("div.cardExpiry").css({
            display: "none"
        });
        cardTypeSection.find("div.ccv").css({
            display: "none"
        })
    }
    ;
    a.setPaymentTypeCreditCard = function(b) {
        var d = b.find(".paym");
        a.resetCreditCardDetails(d);
        cardTypeSection = b.find("div.ccDetails");
        cardTypeSection.find("div.cardTypes").css({
            display: ""
        });
        cardTypeSection.find("div.name").css({
            display: ""
        });
        cardTypeSection.find("div.number").css({
            display: ""
        });
        cardTypeSection.find("div.cardExpiry").css({
            display: ""
        });
        cardTypeSection.find("div.ccv").css({
            display: ""
        })
    }
    ;
    a.saveCart = function(k, f) {
        var c = {}, e = {}, g = k.find(".pers"), l = k.find(".paym"), j;
        j = !1;
        for (var m = 0, n = g.length; m < n; m++)
            j = g[m].type == "checkbox" ? g[m].checked : g[m].value,
            j !== "" && (c[g[m].name] = j);
        if (j = a.getPaymentType())
            a.resetCreditCardDetails(l);
        else {
            m = 0;
            for (n = l.length; m < n; m++)
                e[l[m].name] = l[m].value
        }
        if (a.depositOptionsExist() && (g = a.getDepositOption(),
        g != null ))
            e.depositOption = g;
        e.payByPayPal = j;
        g = a.validatePersonalFields(c, f);
        l = a.validatePaymentFields(e);
        k.find("span.validationError").remove();
        k.find("BE_error").removeClass("BE_error");
        var o;
        if (g.error === !0)
            for (o in g.keys)
                m = k.find("div.personalDetails div." + g.keys[o].name),
                m.length == 0 && g.keys[o].name == "WhereDidYouHearId" && (m = k.find("div.personalDetails div.hear-of-us")),
                m.length == 0 && g.keys[o].name == "EventTrackingId" && (m = k.find("div.personalDetails div.event-tracking")),
                m.append({
                    "span.validationError": {
                        span: g.keys[o].text
                    }
                }),
                m.addClass("BE_error");
        if (l.error === !0)
            for (o in l.keys)
                l.keys[o].name != "depositOption" && (m = k.find("div.ccDetails ." + l.keys[o].name),
                m.append({
                    "span.validationError": {
                        span: l.keys[o].text
                    }
                }),
                m.addClass("BE_error")),
                l.keys[o].name == "depositOption" && (m = k.find("div.paymentOptions"),
                m.append({
                    "span.validationError": {
                        span: l.keys[o].text
                    }
                }),
                m.addClass("BE_error"));
        if (typeof e.expirymonth != "undefined" && j == !1)
            e.expirymonth = parseInt(e.expirymonth, 10);
        if (typeof e.expirymonth != "undefined" && j == !1)
            e.expiryyear = parseInt(e.expiryyear, 10);
        if (typeof e.number != "undefined" && j == !1)
            e.type = a.getCCType(e.number),
            e.number = e.number.replace(/\s/g, "").replace(/[^0-9]/g, "");
        if (e.type === !1 && l.keys.length > 0)
            return alert(b.gadget.book.text.errors.number),
            !1;
        c.paymentInformation = e;
        g.error === !1 && l.error === !1 && (k.find("div.button a").css({
            visibility: "hidden"
        }),
        k.find("div.button").addClass("finalising"),
        d(h).unbind("focus.BECartGadget"),
        d.event.publish("book.saveCart.start", h),
        b.gadget.cart.save(c, function(c) {
            c.result === !0 ? (d.event.publish("book.saveCart.end", h),
            b.session.get(function(b) {
                a.doBooking(k, f, b)
            })) : (alert(b.gadget.cart.text.saveError + "\n\nIf you entered credit card details, your card has NOT been debited at this point."),
            a.stopFinalising(k))
        }))
    }
    ;
    a.validatePaymentFields = function(d) {
        var f = {
            error: !1,
            keys: []
        }, c = b.gadget.book.text.errors, e, g;
        if (d.payByPayPal && d.payByPayPal == !0)
            return f;
        for (var l in d)
            if (d.hasOwnProperty(l)) {
                e = d[l];
                typeof e == "string" && (g = e.replace(/(^\s*|\s*$)/, ""));
                if (l == "ccv" && (/[^0-9]/.test(e) === !0 || !g))
                    f.error = !0,
                    f.keys.push({
                        name: l,
                        text: c.ccv
                    });
                if (l == "name" && !g)
                    f.error = !0,
                    f.keys.push({
                        name: l,
                        text: c.name
                    });
                if (l == "number" && (!g || /[^0-9\s]/.test(e) === !0))
                    f.error = !0,
                    f.keys.push({
                        name: l,
                        text: c.number
                    });
                if (l == "expirymonth" && (!g || /[^0-9\s]/.test(e) === !0))
                    f.error = !0,
                    f.keys.push({
                        name: l,
                        text: c.expiryMonth
                    });
                if (l == "expiryyear" && (!g || /[^0-9\s]/.test(e) === !0))
                    f.error = !0,
                    f.keys.push({
                        name: l,
                        text: c.expiryYear
                    });
                if (a.depositOptionsExist() && l == "depositOption" && (!g || /[^0-9\s]/.test(e) === !0 || /[^0-9\s]/.test(e) === !1 && e === 0))
                    f.error = !0,
                    f.keys.push({
                        name: l,
                        text: c.depositOption
                    })
            }
        return f
    }
    ;
    a.validatePersonalFields = function(a, d) {
        for (var c = {
            error: !1,
            keys: []
        }, e = b.gadget.book.text.errors, g, l = [], j = 0, m = d.VcOnlineBookingFields.length; j < m; j++)
            d.VcOnlineBookingFields[j].IsMandatoryExternal && l.push(d.VcOnlineBookingFields[j].FieldShortName);
        typeof (d != "undefined") && typeof d.eventTrackingIsRequired != "undefined" && d.eventTrackingIsRequired && l.push("EventTrackingId");
        j = 0;
        for (m = l.length; j < m; j++)
            typeof a[l[j]] == "undefined" && (a[l[j]] = "");
        for (var n in a)
            if (a.hasOwnProperty(n)) {
                typeof a[n] == "string" && (g = a[n].replace(/(^\s*|\s*$)/, ""));
                if (n == "acceptCancellationPolicy" && a[n] !== !0)
                    c.error = !0,
                    c.keys.push({
                        name: n,
                        text: e.cancellation
                    });
                if (n == "firstname" && !g)
                    c.error = !0,
                    c.keys.push({
                        name: n,
                        text: e.firstname
                    });
                if (n == "surname" && !g)
                    c.error = !0,
                    c.keys.push({
                        name: n,
                        text: e.surname
                    });
                if (n == "phone" && (!g || /^(\+)?(((\()\d{2,4}(\)))|(\d{1,4}))([-.\s]?\d{1,4}){1,4}[\s]*/.test(g) === !1))
                    c.error = !0,
                    c.keys.push({
                        name: n,
                        text: e.phone
                    });
                if (n == "email" && (!g || /[A-Z0-9._%+-]+@[A-Z0-9.-]+\b/i.test(g) === !1))
                    c.error = !0,
                    c.keys.push({
                        name: n,
                        text: e.email
                    });
                if (n == "postcode" && !g)
                    c.error = !0,
                    c.keys.push({
                        name: n,
                        text: e.postcode
                    });
                if (n == "state" && !g)
                    c.error = !0,
                    c.keys.push({
                        name: n,
                        text: e.state
                    });
                if (n == "address" && !g)
                    c.error = !0,
                    c.keys.push({
                        name: n,
                        text: e.address
                    });
                if (n == "city" && !g)
                    c.error = !0,
                    c.keys.push({
                        name: n,
                        text: e.city
                    });
                if (n == "country" && !g)
                    c.error = !0,
                    c.keys.push({
                        name: n,
                        text: e.country
                    });
                if (n == "WhereDidYouHearId" && !g)
                    c.error = !0,
                    c.keys.push({
                        name: n,
                        text: e.hear
                    });
                if (n == "EventTrackingId" && g && a[n] == "999999999")
                    c.error = !0,
                    c.keys.push({
                        name: n,
                        text: e.event
                    })
            }
        return c
    }
    ;
    a.showForm = function(h, f, c) {
        var e = c.cart
          , g = arguments.callee
          , l = this
          , j = b.util.exists
          , m = function() {
            g.call(l, h, f, c)
        }
          , n = !1;
        if (!j(f.hearData) || !j(f.vcModules) || !j(f.vcData))
            d(m, 75);
        else if (j(f.vcModules["44"]) && !j(f.vcModules["44"].data))
            d(m, 75);
        else if (j(f.vcCountries)) {
            c.conf.EnablePayPalPayments && c.conf.EnablePayPalPayments === !0 && (n = !0);
            e = b.gadget.book.elements.bookingForm(c.conf.IsPaymentRequired, c.conf.IsPaymentDeferred, n, e, f);
            j = [];
            if (h.find("div.personalDetails").length)
                for (var m = h.find("input"), n = 0, o = m.length; n < o; n++)
                    j.push({
                        name: m[n].name,
                        val: m[n].value
                    });
            h.find("hr.clear").remove();
            h.find("div.personalDetails").remove();
            h.find("div.ccDetails").remove();
            h.append(e);
            m = 0;
            for (n = j.length; m < n; m++)
                e.find("div." + j[m].name + " input").val(j[m].val);
            a.checkRedirectedFromCompletedPayment(h, f)
        } else
            d(m, 75)
    }
    ;
    a.checkRedirectedFromCompletedPayment = function(b, d) {
        var c = h.location.hash;
        c != null && c.length > 1 && (c = /\/IsApproved/.test(c),
        c != null && a.destroyCartAndRedirect2(b, d, c))
    }
    ;
    a.getCCType = function(a) {
        if (typeof a == "undefined")
            return !1;
        a = a.replace(/\s/g, "").replace(/[^0-9]/, "");
        if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(a))
            return "Visa";
        if (/^5[1-5][0-9]{14}$/.test(a))
            return "MasterCard";
        if (/^3[47][0-9]{13}$/.test(a))
            return "AmericanExpress";
        if (/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(a))
            return "DinersClub";
        return !1
    }
})(window);
(function(h) {
    h.BE.gadget.book.defaults = {
        automaticCart: !0,
        itineraryCSS: null ,
        demoMode: !1,
        confirmationURL: "/product/confirmation.html",
        overlaySettings: h.BE.gadget.cart.defaults.overlaySettings
    }
})(window);
(function(h) {
    h.BE.gadget.book.text = {};
    h = h.BE.gadget.book.text;
    h.noSSL = "Sorry, this gadget will not run unless\nit is hosted on a secure page.";
    h.termsAndConditions = "Terms and Conditions";
    h.generalTerms = "Applicable to all bookings";
    h.cardsAccepted = "Accepted credit cards";
    h.nameOnCard = "Name on card";
    h.cardNumber = "Credit card number";
    h.cardExpiry = "Card expiry";
    h.cardSecurity = "Security code";
    h.cardMonth = "Month";
    h.cardYear = "Year";
    h.deferredGateway = "Payment options will be available once your booking has been finalised.";
    h.bookingCompleted = "Thank you for your booking. You can download your itinerary with the link below.";
    h.bookingCancelled = "Your payment has been unsuccessful.";
    h.pdfLinkText = "Download your itinerary PDF now.";
    h.bookingCompletedNoItinerary = "Thank you for your booking. Your itinerary will be emailed to the email address provided in the booking process. If you do not receive your itinerary please check your email junk folder or contact us.";
    h.payPal = "PayPal";
    h.creditCard = "Credit Card";
    h.paymentType = "Payment Type ";
    h.form = {};
    var d = h.form;
    d.salutation = "Salutation";
    d.firstname = "First Name";
    d.surname = "Surname";
    d.address = "Address";
    d.city = "Suburb/City";
    d.state = "State";
    d.postcode = "Post Code";
    d.country = "Country";
    d.phone = "Phone Number";
    d.email = "Email Address";
    d.comment = "Comments / Requests";
    d.hear = "How did you hear of us?";
    d.hearNothing = "--- Please choose ---";
    d.noCountry = "--- Please choose ---";
    d.eventTracking = "Are you attending an event?";
    d.notAttendingEvent = "No I'm not attending an event";
    d.pleaseChoose = "--- Please choose ---";
    d.newsletter = "I would like to receive news/updates";
    d.acceptCancel = "I accept the ";
    d.acceptCancel2nd = " terms & conditions";
    d.button = "Book now";
    h.errors = {};
    h = h.errors;
    h.cancellation = "Please confirm you accept the terms & conditions of this booking";
    h.firstname = "Please check you have entered your first name";
    h.surname = "Please check your surname (family name)";
    h.phone = "Please check your phone number";
    h.email = "Please confirm your email is correct";
    h.hear = "Please select how you heard of us";
    h.event = "Please select if you are attending an event";
    h.country = "Please select country";
    h.postcode = "Please enter your postcode";
    h.state = "Please enter your state";
    h.address = "Please enter your address";
    h.city = "Please enter your Suburb/City";
    h.ccv = "Please check your credit card ccv";
    h.name = "Please check your name as per your credit card";
    h.number = "Please check your credit card number";
    h.expiryMonth = "Please supply your card's month of expiry";
    h.expiryYear = "Please supply your card's year of expiry";
    h.depositOption = "Please Specify a Valid Deposit Option";
    h.declinedPayment = "The payment gateway indicated that your credit card was declined.\n\nWould you like to attempt your payment again?";
    h.noPayment = "Your itinerary has not been paid for. Please follow the instructions in your confirmation email to make a payment."
})(window);
(function(h) {
    h.BE.gadget.book.elements = {};
    var d = h.wisDOM
      , b = h.BE
      , a = h.BE.gadget.book.elements
      , k = h.BE.gadget.book.text
      , f = d.event.publish;
    a.bookingForm = function(c, e, g, h, j) {
        var m = {
            "div.personalDetails": []
        }
          , n = b.util.exists
          , o = m["div.personalDetails"]
          , w = [{
            h3: "Booking Details"
        }, {
            "div.salutation": {
                label: k.form.salutation,
                "": " ",
                "select.pers": {
                    _attr: {
                        name: "salutation"
                    },
                    "0 option": {
                        _attr: {
                            value: "Mr"
                        },
                        "": "Mr"
                    },
                    "1 option": {
                        _attr: {
                            value: "Mrs"
                        },
                        "": "Mrs"
                    },
                    "2 option": {
                        _attr: {
                            value: "Ms"
                        },
                        "": "Ms"
                    },
                    "3 option": {
                        _attr: {
                            value: "Dr"
                        },
                        "": "Dr"
                    }
                }
            }
        }, {
            div: {
                _attr: {
                    "class": j.VcOnlineBookingFields.length > 0 ? j.VcOnlineBookingFields[0].IsMandatoryExternal ? "firstname required" : "firstname" : "firstname required"
                },
                label: k.form.firstname,
                "": " ",
                "input.pers": {
                    _attr: {
                        type: "text",
                        name: "firstname",
                        maxlength: 50
                    }
                }
            }
        }, {
            div: {
                _attr: {
                    "class": j.VcOnlineBookingFields.length > 0 ? j.VcOnlineBookingFields[1].IsMandatoryExternal ? "surname required" : "surname" : "surname required"
                },
                label: k.form.surname,
                "": " ",
                "input.pers": {
                    _attr: {
                        type: "text",
                        name: "surname",
                        maxlength: 25
                    }
                }
            }
        }, {
            div: {
                _attr: {
                    "class": j.VcOnlineBookingFields.length > 0 ? j.VcOnlineBookingFields[2].IsMandatoryExternal ? "address required" : "address" : "address required"
                },
                label: k.form.address,
                "": " ",
                "input.pers": {
                    _attr: {
                        type: "text",
                        name: "address",
                        maxlength: 100
                    }
                }
            }
        }, {
            div: {
                _attr: {
                    "class": j.VcOnlineBookingFields.length > 0 ? j.VcOnlineBookingFields[3].IsMandatoryExternal ? "city required" : "city" : "city required"
                },
                label: k.form.city,
                "": " ",
                "input.pers": {
                    _attr: {
                        type: "text",
                        name: "city",
                        maxlength: 25
                    }
                }
            }
        }, {
            div: {
                _attr: {
                    "class": j.VcOnlineBookingFields.length > 0 ? j.VcOnlineBookingFields[4].IsMandatoryExternal ? "state required" : "state" : "state required"
                },
                label: k.form.state,
                "": " ",
                "input.pers": {
                    _attr: {
                        type: "text",
                        name: "state",
                        maxlength: 15
                    }
                }
            }
        }, {
            div: {
                _attr: {
                    "class": j.VcOnlineBookingFields.length > 0 ? j.VcOnlineBookingFields[5].IsMandatoryExternal ? "postcode required" : "postcode" : "postcode required"
                },
                label: k.form.postcode,
                "": " ",
                "input.pers": {
                    _attr: {
                        type: "text",
                        name: "postcode",
                        maxlength: 15
                    }
                }
            }
        }, {
            div: {
                _attr: {
                    "class": j.VcOnlineBookingFields.length > 0 ? j.VcOnlineBookingFields[6].IsMandatoryExternal ? "country required" : "country" : "country required"
                },
                label: k.form.country,
                "": " ",
                "select.pers": function() {
                    var a = j.vcCountries, b = [], c;
                    b._attr = {
                        name: "country"
                    };
                    b.push({
                        option: {
                            "": k.form.noCountry,
                            _attr: {
                                value: ""
                            }
                        }
                    });
                    for (var d = 0, e = a.length; d < e; d++) {
                        c = {
                            option: {
                                "": a[d],
                                _attr: {
                                    value: a[d]
                                }
                            }
                        };
                        if (a[d] === j.VcOnlineBookingFields[6].ExternalDefaultValue)
                            c.option._attr.value = j.VcOnlineBookingFields[6].ExternalDefaultValue,
                            c.option._attr.selected = j.VcOnlineBookingFields[6].ExternalDefaultValue;
                        b.push(c)
                    }
                    return b
                }()
            }
        }, {
            div: {
                _attr: {
                    "class": j.VcOnlineBookingFields.length > 0 ? j.VcOnlineBookingFields[7].IsMandatoryExternal ? "phone required" : "phone" : "phone required"
                },
                label: k.form.phone,
                "": " ",
                "input.pers": {
                    _attr: {
                        type: "text",
                        name: "phone",
                        maxlength: 20
                    }
                }
            }
        }, {
            div: {
                _attr: {
                    "class": j.VcOnlineBookingFields.length > 0 ? j.VcOnlineBookingFields[8].IsMandatoryExternal ? "email required" : "email" : "email required"
                },
                label: k.form.email,
                "": " ",
                "input.pers": {
                    _attr: {
                        type: "text",
                        name: "email",
                        maxlength: 50
                    }
                }
            }
        }, {
            div: {
                _attr: {
                    "class": j.VcOnlineBookingFields.length > 0 ? j.VcOnlineBookingFields[9].IsMandatoryExternal ? "comment required" : "comment" : "comment required"
                },
                label: k.form.comment,
                "": " ",
                "textarea.pers": {
                    _attr: {
                        name: "comment"
                    }
                }
            }
        }, {
            div: {
                _attr: {
                    "class": j.VcOnlineBookingFields.length > 0 ? j.VcOnlineBookingFields[10].IsMandatoryExternal ? "WhereDidYouHearId required" : "WhereDidYouHearId" : "WhereDidYouHearId required"
                },
                label: k.form.hear,
                "": " ",
                "select.pers": function() {
                    var a = j.hearData, b = [], c;
                    b._attr = {
                        name: "WhereDidYouHearId"
                    };
                    b.push({
                        option: {
                            "": k.form.hearNothing,
                            _attr: {
                                value: ""
                            }
                        }
                    });
                    for (var d = 0, e = a.length; d < e; d++)
                        c = a[d],
                        b.push({
                            option: {
                                "": c.FacilityDesc,
                                _attr: {
                                    value: c.FacilityId
                                }
                            }
                        });
                    return b
                }()
            }
        }, {
            "div.event-tracking": function() {
                var a = {};
                if (n(j.vcModules["44"]))
                    a.label = k.form.eventTracking,
                    a[""] = " ",
                    a["select.pers"] = function() {
                        var a = []
                          , b = j.vcModules["44"].data;
                        j.eventTrackingIsRequired != "undefined" && j.eventTrackingIsRequired && a.push({
                            option: {
                                "": k.form.pleaseChoose,
                                _attr: {
                                    value: "999999999"
                                }
                            }
                        });
                        a.push({
                            option: {
                                "": k.form.notAttendingEvent,
                                _attr: {
                                    value: ""
                                }
                            }
                        });
                        a._attr = {
                            name: "EventTrackingId"
                        };
                        for (var c = 0, d = b.length; c < d; c++)
                            b[c].EventTrackingId > 0 && a.push({
                                option: {
                                    "": b[c].EventTrackingName,
                                    _attr: {
                                        value: b[c].EventTrackingId
                                    }
                                }
                            });
                        return a
                    }();
                return a
            }()
        }, {
            div: {
                _attr: {
                    "class": j.VcOnlineBookingFields.length > 0 ? j.VcOnlineBookingFields[11].IsMandatoryExternal ? "receiveENewsletter required" : "receiveENewsletter" : "receiveENewsletter required"
                },
                label: k.form.newsletter,
                "": " ",
                "input.pers": {
                    _attr: {
                        type: "checkbox",
                        unchecked: "",
                        name: "receiveENewsletter"
                    }
                }
            }
        }, {
            div: {
                _attr: {
                    "class": j.VcOnlineBookingFields.length > 0 ? j.VcOnlineBookingFields[12].IsMandatoryExternal ? "acceptCancellationPolicy required" : "acceptCancellationPolicy" : "acceptCancellationPolicy required"
                },
                label: {
                    "": k.form.acceptCancel,
                    a: {
                        _events: {
                            click: function() {
                                f("book.showCancellation.click", this)
                            }
                        },
                        span: k.form.acceptCancel2nd,
                        _attr: {
                            href: "javascript:void(0);"
                        }
                    }
                },
                "": " ",
                "input.pers": {
                    _attr: {
                        type: "checkbox",
                        name: "acceptCancellationPolicy"
                    }
                }
            }
        }];
        n(j.vcModules["44"]);
        for (var v in w)
            if (w.hasOwnProperty(v)) {
                var p = w[v];
                b.util.exists(p["div.event-tracking"]) && b.util.exists(j.eventTrackingIsRequired) && j.eventTrackingIsRequired && (p = {
                    "div.event-tracking required": w[v]["div.event-tracking"]
                });
                o.push(p)
            }
        o = {
            a: {
                _events: {
                    click: function() {
                        d.event.publish("book.button.click", this)
                    }
                },
                span: k.form.button
            }
        };
        c === !0 || typeof j.Deposits != "undefined" ? (m["div.ccDetails"] = a.ccDetails(c, e, g, h, j),
        m["div.ccDetails"]["div.button"] = o,
        m["div.ccDetails"]["div#gadgets-queuing-additional-info"] = "") : (m["div.personalDetails"].push({
            "div.button": o
        }),
        m["div.personalDetails"].push({
            "div#gadgets-queuing-additional-info": ""
        }));
        m["hr.clear"] = "";
        var m = d(m), q;
        for (q in h)
            h.hasOwnProperty(q) && (c = m.find("div." + q),
            c.find("input").val(h[q]),
            c.find("select").val(h[q]),
            c.find("textarea").val(h[q]));
        return m
    }
    ;
    a.depositRadio = function(a, b, d, f) {
        d = {
            type: "radio",
            name: "depositPayment",
            value: d
        };
        if (f)
            d.checked = !0;
        return {
            "div.paymentItem": {
                label: a,
                "span.depositChoice": {
                    input: {
                        _attr: d
                    },
                    label: b
                }
            }
        }
    }
    ;
    a.ccDetails = function(c, d, g, h, j) {
        var m = b.gadget.book.text
          , n = {};
        c === !0 && d == !1 ? (n = {
            h3: "Payment Details",
            "div.paymentType": {},
            "div.cardTypes": {
                label: m.cardsAccepted,
                "span.cardList": function(a) {
                    for (var b = [], c, d = 0, e = a.length; d < e; d++)
                        c = {},
                        c["span.ccLabel ccID_" + a[d].CreditCardId] = {
                            span: a[d].Description
                        },
                        b.push(c);
                    return b
                }(j.vcData.CreditCards)
            },
            "div.name": {
                label: m.nameOnCard,
                "input.paym": {
                    _attr: {
                        name: "name",
                        type: "text"
                    }
                }
            },
            "div.number": {
                label: m.cardNumber,
                "input.paym": {
                    _attr: {
                        name: "number",
                        type: "text"
                    }
                }
            },
            "div.cardExpiry": {
                label: m.cardExpiry,
                "span.expirySelects": {
                    "select.paym month": function() {
                        var a = [{
                            option: {
                                "": m.cardMonth,
                                _attr: {
                                    value: ""
                                }
                            }
                        }];
                        a._attr = {
                            name: "expirymonth"
                        };
                        for (var b = 1; b < 13; b++)
                            a.push({
                                option: {
                                    _attr: {
                                        value: b
                                    },
                                    "": b
                                }
                            });
                        return a
                    }(),
                    "": " ",
                    "select.paym year": function() {
                        var a = [{
                            option: {
                                "": m.cardYear,
                                _attr: {
                                    value: ""
                                }
                            }
                        }]
                          , b = (new Date).getFullYear()
                          , c = b + 19;
                        for (a._attr = {
                            name: "expiryyear"
                        }; b < c; b++)
                            a.push({
                                option: {
                                    _attr: {
                                        value: b
                                    },
                                    "": b
                                }
                            });
                        return a
                    }()
                },
                "div.expirymonth": {},
                "div.expiryyear": {}
            },
            "div.ccv": {
                label: m.cardSecurity,
                "input.paym": {
                    _attr: {
                        name: "ccv",
                        type: "text"
                    }
                }
            }
        },
        g === !0 && (n["div.paymentType"] = {
            label: m.paymentType,
            "span.paymentTypeList": {
                "span.paymentTypeItemPP": {
                    "span.paymentTypeOption": {
                        input: {
                            _events: {
                                click: function() {
                                    f("book.paymentTypePayPal.click", this)
                                }
                            },
                            _attr: {
                                type: "radio",
                                name: "paymentTypeRadio",
                                value: "paymentTypeRadioPayPal"
                            }
                        }
                    },
                    label: m.payPal
                },
                "span.paymentTypeItemCC": {
                    "span.paymentTypeOption": {
                        input: {
                            _events: {
                                click: function() {
                                    f("book.paymentTypeCreditCard.click", this)
                                }
                            },
                            _attr: {
                                type: "radio",
                                name: "paymentTypeRadio",
                                value: "paymentTypeRadioCreditCard",
                                checked: !0
                            }
                        }
                    },
                    label: m.creditCard
                }
            }
        })) : c === !0 && d === !0 && (n = {
            h3: "Payment Details",
            "div.deferredGateway": m.deferredGateway
        });
        typeof j.Deposits != "undefined" && (n["div.deposits"] = {
            h3: "Deposit/Payment Options",
            "div.paymentOptions": function() {
                var c = []
                  , d = function(a) {
                    return typeof a != "undefined" && a != null
                }
                  , e = !0;
                if (j.Deposits.PayInFull != null || j.Deposits.OneNightDeposit == null && j.Deposits.DepositPercentageValue == null && j.Deposits.DepositAmountValue == null && j.Deposits.XNightDeposit == null && j.Deposits.IConnectAmountValue == null && j.Deposits.AgentRemainingAmount == null )
                    c.push(a.depositRadio("Pay In Full", b.util.currencies.formatShort(j.Deposits.PayInFull, b.currencyId), 1, e)),
                    e = !1;
                d(j.Deposits.OneNightDeposit) && j.Deposits.OneNightDeposit > 0 && (c.push(a.depositRadio("Pay One Night", b.util.currencies.formatShort(j.Deposits.OneNightDeposit, b.currencyId), 2, e)),
                e = !1);
                d(j.Deposits.DepositPercentageValue) && j.Deposits.DepositPercentageValue > 0 && (c.push(a.depositRadio("Pay Percentage", b.util.currencies.formatShort(j.Deposits.DepositPercentageValue, b.currencyId), 3, e)),
                e = !1);
                d(j.Deposits.DepositAmountValue) && j.Deposits.DepositAmountValue > 0 && (c.push(a.depositRadio("Deposit Amount", b.util.currencies.formatShort(j.Deposits.DepositAmountValue, b.currencyId), 4, e)),
                e = !1);
                d(j.Deposits.XNightDeposit) && j.Deposits.XNightDeposit > 0 && (c.push(a.depositRadio("X Night Deposit", b.util.currencies.formatShort(j.Deposits.XNightDeposit, b.currencyId), 5, e)),
                e = !1);
                if (j.Deposits.IConnectAmountValue != null ) {
                    d = "";
                    if (h != null && h.cartcontent != null )
                        for (var f = 0; f < h.cartcontent.length; f++)
                            h.cartcontent[f] != null && h.cartcontent[f].operatorname != null && (d != "" && (d += " / "),
                            d += h.cartcontent[f].operatorname);
                    c.push(a.depositRadio("Deposit Amount " + b.util.currencies.formatShort(j.Deposits.IConnectAmountValue, b.currencyId) + "." + (d == "" ? "" : "\n(Remainder payable to " + d + ")"), b.util.currencies.formatShort(j.Deposits.IConnectAmountValue, b.currencyId), 6, e));
                    e = !1
                }
                j.Deposits.AgentRemainingAmount != null && (c.push(a.depositRadio("Pay Remainder", b.util.currencies.formatShort(j.Deposits.AgentRemainingAmount, b.currencyId), 7, e)),
                e = !1);
                return c
            }()
        });
        return n
    }
})(window);
(function(h) {
    var d = h.wisDOM, b = h.BE, a = {}, k = null , f, c = d.event.publish, e = {}, g = {};
    b.gadget.details = function(e, f) {
        var g = d(e);
        if (g.length === 0)
            return !1;
        f = b.util.mergeObjects(f, b.gadget.details.defaults);
        if (!f.vcID && !f.webID)
            return !1;
        if (f.vcID == 6)
            f.productIDs = a.findIDs(f);
        b.gadget.init(f, function() {
            var b = f
              , g = d(e);
            g.append({
                "div.details-gadget BE": ""
            });
            g = g.find("div.details-gadget");
            c("details.begin", h, {});
            a._init(g, b);
            a.setupSubscriptions(g, b)
        });
        return g
    }
    ;
    b.gadget.details.findIDs = function(b) {
        return a.findIDs(b)
    }
    ;
    b.gadget.details.buildGridStandard = function(c, d, e, f) {
        b.util.exists(d.collapseToursMode) && d.collapseToursMode && (e === "tours" || e === "events") ? a.buildGridTourCollapsed(c, d, e, f) : a.buildGridStandard(c, d, e, f)
    }
    ;
    b.gadget.details.getDetailData = function(b, c) {
        a.getDetailData(b, c)
    }
    ;
    b.gadget.details.resetDataStore = function() {
        e = {}
    }
    ;
    a._init = function(e, f) {
        e.empty();
        c("details.init.start", h, {});
        if (typeof f.productIDs == "undefined")
            f.productIDs = a.findIDs(f);
        f.embedSearch === !0 && b.gadget.search.embed(f).appendTo(e).find("div.product").css({
            display: "none"
        });
        f.vcID && d(function() {
            a.getData(e, f)
        }, 10);
        f.descriptionHover && d(function() {
            a.getDetailData(e, f)
        }, 100);
        var g = f.showSimilarProperties;
        g !== null && b.util.exists(b.gadget.details.similar) && (g = b.gadget.details.similar(g),
        g.enabled && d(g.selector).length > 0 && (d(function() {
            a.getSimilarPropData(f, g)
        }, 250),
        b.gadget.search.subscribeToChanges(function() {
            d(function() {
                a.getSimilarPropData(f, g)
            }, 250)
        })))
    }
    ;
    a.findIDs = function(a) {
        var c, d = h.location.hash, e;
        c = a.productID;
        a = a.type;
        e = d.replace(/^#\/[a-zA-Z]+\/(\d+)\/*(\d*)/, "$1");
        d = d.replace(/^#\/([a-zA-Z]+)\/\d+\/*(\d*)/, "$1");
        c = e || c;
        a = d || a;
        isNaN(parseInt(a, 10)) || (a = b.text.typeIDToString[a]);
        if (!c || !a)
            return !1;
        return [c, a]
    }
    ;
    a.getData = function(e, g) {
        if (!g.productIDs)
            return !1;
        c("details.getdata.start", h, {});
        var j = g.productIDs[0], l = g.productIDs[1], k;
        switch (l) {
        case "accom":
            k = b.urls.endpoints.beAccomRatesGrid();
            break;
        case "tours":
            k = b.urls.endpoints.beToursRatesGrid();
            break;
        case "events":
            k = b.urls.endpoints.beEventsRatesGrid();
            break;
        case "carhire":
            k = b.urls.endpoints.beCarHireRatesGrid();
            break;
        case "packages":
            k = b.urls.endpoints.bePackagesRatesGrid()
        }
        k += "?q=" + g.vcID;
        var p = b.gadget.search.userState();
        k += l == "packages" ? "&packages=" + j.toString().replace(/^#/, "") : "&operators=" + j.toString().replace(/^#/, "");
        if (p) {
            var j = {}, q;
            for (q in p)
                p.hasOwnProperty(q) && (j[q] = q != "date" ? p[q] : p[q].replace(/^[a-zA-Z]+\s(\d+)\/(\d+)\/(\d+)/g, "$3-$2-$1"));
            if (typeof j.period != "undefined" && (l == "tours" || l == "events"))
                j.period = 1;
            k += b.util.buildParamString(j)
        }
        k += "&InclAvailability=true";
        typeof g.campaignID != "undefined" && (k += "&CampaignId=" + g.campaignID);
        l == "accom" && (k += "&enforceBookingConditions=false&enforceEntirePeriod=false");
        typeof g.showAllTours != "undefined" && g.showAllTours && l == "tours" && (k += "&enforceBookingConditions=false");
        typeof g.showAllEvents != "undefined" && g.showAllEvents && l == "events" && (k += "&enforceBookingConditions=false");
        typeof g.externalSearch != "undefined" && (k += "&ExternalSearch=" + g.externalSearch);
        typeof g.showFutureEvents != "undefined" && l == "events" && (k += "&ShowFutureEvents=" + g.showFutureEvents);
        typeof g.showFutureEventsPeriod != "undefined" && l == "events" && (k += "&ShowFutureEventsPeriod=" + g.showFutureEventsPeriod);
        b.util.exists(g.stageId) && g.stageId > 0 && (k += "&StageId=" + g.stageId);
        f && f.cancel();
        c("region.loading.start", h, e);
        d(function() {
            f = d.getJSON(k, function(b, d) {
                return function(e) {
                    c("region.loading.end", h, b);
                    e.length ? a.buildGrid(b, d, l, e[0]) : a.noResults(b, d)
                }
            }(e, g))
        }, 50);
        return e
    }
    ;
    a.noResults = function(a) {
        a.find("div.priceGrid").remove();
        a.append({
            "div.priceGrid im-grid": {
                "h3.noResults": "Sorry, no results match your search criteria. Please change your dates and options and try searching again."
            }
        })
    }
    ;
    a.extractPackageProducts = function(a, b, c, e) {
        b = [];
        for (c = 0; c < e.Operators.length; c++) {
            for (var f = e.Operators[c], g = 0; g < f.Products.Rooms.length; g++) {
                var j = f.Products.Rooms[g];
                b.push({
                    type: j.type,
                    operatorid: f.OperatorID,
                    operatorname: f.Name,
                    id: j.RoomID,
                    name: j.Name,
                    startdate: j.Days[0].Date,
                    period: j.Nights,
                    adults: j.Adults,
                    children: j.Children,
                    infants: j.Infants
                })
            }
            for (g = 0; g < f.Products.Tours.length; g++)
                for (var j = f.Products.Tours[g], h = a.find('input[name="tour-' + e.PackageID + "-" + j.TourID + '"]'), l = 0; l < h.length; l++) {
                    var u = d(h[l]);
                    if (u[0].checked) {
                        b.push({
                            type: j.type,
                            operatorid: f.OperatorID,
                            operatorname: f.Name,
                            id: j.TourID,
                            name: j.Name,
                            startdate: new Date(isNaN(u.val()) ? u.val() : parseInt(u.val())),
                            adults: j.Adults,
                            children: j.Children,
                            infants: j.Infants,
                            concessions: j.Concessions,
                            students: j.Students,
                            observers: j.Observers
                        });
                        break
                    }
                }
            for (h = 0; h < f.Products.Events.length; h++) {
                j = f.Products.Events[g];
                l = a.find('input[name="event-' + e.PackageID + "-" + j.EventID + '"]');
                for (u = 0; u < l.length; u++) {
                    var k = d(l[u]);
                    if (k[0].checked) {
                        b.push({
                            type: j.type,
                            operatorid: f.OperatorID,
                            operatorname: f.Name,
                            id: j.TourID,
                            name: j.Name,
                            startdate: new Date(isNaN(k.val()) ? k.val() : parseInt(k.val())),
                            adults: j.Adults,
                            children: j.Children,
                            infants: j.Infants,
                            concessions: j.Concessions,
                            students: j.Students,
                            observers: j.Observers
                        });
                        break
                    }
                }
            }
            for (g = 0; g < f.Products.CarHires.length; g++)
                j = f.Products.CarHires[g],
                b.push({
                    type: j.type,
                    operatorid: f.OperatorID,
                    operatorname: f.Name,
                    id: j.RoomID,
                    name: j.Name,
                    startdate: j.Days[0].Date,
                    period: j.Nights,
                    adults: j.Adults,
                    children: j.Children,
                    infants: j.Infants
                })
        }
        return b
    }
    ;
    a.buildGrid = function(d, e, f, g) {
        f == "packages" ? a.buildGridPackages(d, e, f, g) : b.util.exists(e.collapseToursMode) && e.collapseToursMode && (f === "tours" || f === "events") ? a.buildGridTourCollapsed(d, e, f, g) : a.buildGridStandard(d, e, f, g);
        c("grid.rendered", h, {})
    }
    ;
    a.getShortDecimal = function(a) {
        return (a % 1 == 0 ? a : a.toFixed(2)).toString()
    }
    ;
    a.getShortDecimalOrFree = function(b) {
        b = a.getShortDecimal(b);
        return b === "0" ? "Free" : b
    }
    ;
    a.buildGridPackages = function(c, f, j, h) {
        c.find("div.priceGrid").remove();
        h = d.json.convertDates(h);
        g.operator = h;
        var l = b.gadget.region.text, k = {
            "div.priceGrid im-grid": {
                table: {
                    thead: {
                        tr: [{
                            "td.title": l.headerTitle
                        }, {
                            "td.total": l.total
                        }]
                    },
                    tbody: []
                }
            }
        }, q = k["div.priceGrid im-grid"].table.thead.tr, r = k["div.priceGrid im-grid"].table.tbody, s = b.util.date.names.getMonth, u = b.util.date.names.getDay, y, E = d.event.publish;
        y = b.gadget.search.userState();
        for (var x = h.Days, t = x.length, C = 0, z = ["adults", "children", "infants", "students", "concessions", "observers", "family"], F = z.length; F--; )
            C += parseInt(y[z[F]], 10);
        for (y = 0; y < t; y++) {
            F = x[y].Date;
            C = u(F.getDay() + 1, !0);
            z = F.getDate();
            F = s(F.getMonth() + 1, !0);
            C = {
                "td.date": [{
                    "a.day": C
                }, {
                    "": " "
                }, {
                    "a.date": z
                }, {
                    "": " "
                }, {
                    "a.month": F
                }]
            };
            if (j == "events" || j == "tours")
                C["td.date"]._attr = {
                    "class": "date " + j
                };
            q.push(C)
        }
        s = {
            tr: []
        };
        u = s.tr;
        u._data = {
            _all: h,
            roomID: h.PackageID,
            name: h.Name
        };
        var B, q = h.Days.length, x = l.requestNow;
        if (typeof h.IsGoldMedal != "undefined" && h.IsGoldMedal === !0)
            x = l.bookNow;
        if (h.IsConstrained)
            h.ConstrainedMinNights === 0 ? x = b.util.exists(f.restrictedButtonText) ? f.restrictedButtonText : "Restricted" : (l = h.ConstrainedDescription,
            x = (b.util.exists(l) && l != "" && l.toLowerCase().indexOf("max") >= 0 ? "Max " : "Min ") + h.ConstrainedMinNights + " nights");
        !1 == h.IsAvailable && (x = "Not Available");
        u.push({
            "td.name": {
                a: h.Name
            },
            "td.total": {
                "a.im-pricebutton": {
                    "span.book im-pricebutton-label": x,
                    "": " ",
                    "span.number im-pricebutton-amount": b.util.currencies.formatShort(h.Cost, b.gadget.currencyId),
                    _attr: {
                        href: "javascript://;"
                    },
                    _events: {
                        click: function() {
                            return function() {
                                if (!h.IsConstrained && !1 != h.IsAvailable) {
                                    var d = a.extractPackageProducts(c, f, j, h)
                                      , d = [f.vcID, f.productIDs[0], j, h, b.gadget.search.userState(), h.Name, 1, f.campaignID, d, f.externalSearch, void 0, void 0];
                                    if (b.util.exists(f.stageId) && f.stageId > 0)
                                        d.stage = {
                                            stageId: f.stageId
                                        };
                                    E("item.book.click", this, d)
                                }
                            }
                        }(y)
                    }
                }
            }
        });
        if (f.thumbsInGrid && h.Images.length > 0)
            z = h.Images[0],
            C = z.ThumbnailImage,
            z = z.FullSizeImage,
            u[0]["td.name"]["div.thumb"] = {
                img: {
                    _attr: {
                        src: C.replace(/^http:/, ""),
                        rel: z
                    }
                }
            };
        for (B = 0; B < q; B++)
            u.push({
                "td.price": ""
            });
        r.push(s);
        l = [];
        for (s = 0; s < h.Operators.length; s++)
            for (var G = h.Operators[s], u = [G.Products.Rooms, G.Products.Tours, G.Products.Events, G.Products.CarHires], x = 0; x < u.length; x++)
                for (t = 0; t < u[x].length; t++)
                    l.push(u[x][t]);
        l.sort(function(a, b) {
            return a.SortOrder > b.SortOrder
        });
        for (x = 0; x < l.length; x++) {
            t = l[x];
            s = {
                tr: []
            };
            u = s.tr;
            u._data = {
                _all: t,
                productID: t.Id,
                name: t.Name
            };
            u.push({
                "td.name": {
                    a: t.Name
                },
                "td.total": {}
            });
            if (f.thumbsInGrid && t.Images.length > 0)
                z = t.Images[0],
                C = z.ThumbnailImage,
                z = z.FullSizeImage,
                u[0]["td.name"]["div.thumb"] = {
                    img: {
                        _attr: {
                            src: C.replace(/^http:/, ""),
                            rel: z
                        }
                    }
                };
            if (t.IsConstrained)
                u[0]["td.total"] = t.ConstrainedDescription;
            C = "even";
            y % 2 === 0 && (C = "odd");
            G.IsGoldMedal && (C += " instant-confirmation");
            t.IsConstrained && (C += " min-nights");
            u._attr = {
                "class": C
            };
            var A = !1;
            for (B = 0; B < q; B++)
                u.push({
                    "td.price": function(a) {
                        var b = [];
                        if (typeof a.RoomID != "undefined") {
                            var c = {
                                input: {
                                    _attr: {
                                        type: "checkbox",
                                        "class": "room-date",
                                        disabled: "disabled"
                                    }
                                }
                            };
                            if (a.Days[B].IsAvailable)
                                c.input._attr.checked = "checked";
                            c.input._attr.disabled = "disabled";
                            b.push(c)
                        }
                        if (typeof a.TourID != "undefined") {
                            c = {
                                input: {
                                    _attr: {
                                        type: "radio",
                                        name: "tour-" + h.PackageID + "-" + a.TourID,
                                        "class": "tour-date",
                                        value: Date.parse(a.Days[B].Date)
                                    }
                                }
                            };
                            if (!1 == a.Days[B].IsAvailable)
                                c.input._attr.disabled = "disabled";
                            else if (!1 == A)
                                A = !0,
                                c.input._attr.checked = "checked";
                            b.push(c)
                        }
                        if (typeof a.EventID != "undefined") {
                            c = {
                                input: {
                                    _attr: {
                                        type: "radio",
                                        name: "event-" + h.PackageID + "-" + a.EventID,
                                        "class": "event-date",
                                        value: Date.parse(a.Days[B].Date)
                                    }
                                }
                            };
                            if (!1 == a.Days[B].IsAvailable)
                                c.input._attr.disabled = "disabled";
                            else if (!1 == A)
                                A = !0,
                                c.input._attr.checked = "checked";
                            b.push(c)
                        }
                        if (typeof a.CarHireID != "undefined") {
                            c = {
                                input: {
                                    _attr: {
                                        type: "checkbox",
                                        "class": "carHire-date",
                                        disabled: "disabled"
                                    }
                                }
                            };
                            if (a.Days[B].IsAvailable)
                                c.input._attr.checked = "checked";
                            c.input._attr.disabled = "disabled";
                            b.push(c)
                        }
                        return b
                    }(t)
                });
            r.push(s)
        }
        r.length > 0 ? c.append(k) : a.noResults(c, f);
        f.descriptionHover && a.addHovers(c, f, j, e[j], h)
    }
    ;
    a.sortItems = function(a) {
        return a.sort(function(a, b) {
            return (b.Availability.IsAvailable ? 1 : 0) - (a.Availability.IsAvailable ? 1 : 0)
        })
    }
    ;
    a.buildGridTourCollapsedMarkup = function(a, e, f, g, j, h) {
        a = b.util.first(j.items);
        a.Name = j.tourMasterName;
        var l = {};
        l["tr." + h] = {
            _data: {
                _all: a,
                roomID: a.Id,
                name: j.Name
            },
            "td.name": function(a) {
                var c = {};
                b.util.exists(a.image) && b.util.exists(a.image.ThumbnailImage) && (c["div.thumb"] = {
                    img: {
                        _attr: {
                            src: a.image.ThumbnailImage,
                            rel: a.image.FullSizeImage
                        }
                    }
                });
                c.a = j.tourMasterName;
                return c
            }(j),
            td: {
                "div.tour-row-item": function(a) {
                    var j = [];
                    b.util.each(a.items, function(a, d) {
                        var m = d.Availability
                          , h = "div.tour-row-item-occ"
                          , l = !0;
                        if (b.util.existsInArray(!0, d.Availability.Days, function(a, b) {
                            return a === b.IsAvailable
                        })) {
                            if (b.util.exists(d.IsGoldMedal))
                                l = d.IsGoldMedal;
                            l && (h += " instant-confirmation");
                            l = {};
                            l[h] = {
                                "span.start-time": {
                                    _: d.TocStartTime
                                },
                                "span.cost": {
                                    _: b.util.currencies.formatShort(m.Cost, b.gadget.currencyId)
                                },
                                _events: {
                                    click: function(a) {
                                        return function() {
                                            if (!a.Availability.IsConstrained) {
                                                var d = [e.vcID, e.productIDs[0], g, a, b.gadget.search.userState(), f.OperatorName, 1, e.campaignID, [], e.externalSearch, void 0, void 0, b.util.exists(e.stageId) ? {
                                                    stageId: e.stageId
                                                } : void 0];
                                                if (b.util.exists(e.stageId) && e.stageId > 0)
                                                    d.stage = {
                                                        stageId: e.stageId
                                                    };
                                                c("item.book.click", this, d)
                                            }
                                        }
                                    }(d)
                                }
                            };
                            j.push(l)
                        }
                    });
                    if (j.length === 0) {
                        for (var m = void 0, a = b.util.map(a.items, function(a) {
                            if (b.util.exists(a.Availability) && b.util.exists(a.Availability.NextAvailable))
                                return a.Availability.NextAvailable
                        }), a = b.util.grep(a, function(a) {
                            return typeof a !== "undefined"
                        }), h = 0; h < a.length; h++) {
                            var l = a[h];
                            if (typeof m === "undefined" || l < m)
                                m = l
                        }
                        typeof m !== "undefined" && m !== null ? (m = d.json.convertDates({
                            date: m
                        }).date,
                        j.push({
                            span: [{
                                label: "Next Available"
                            }, {
                                "": " "
                            }, {
                                "span.day": b.util.date.names.getDay(m.getDay() + 1)
                            }, {
                                "span.daydatecomma": ", "
                            }, {
                                "span.date": m.getDate()
                            }, {
                                "": " "
                            }, {
                                "span.month": b.util.date.names.getMonth(m.getMonth() + 1)
                            }, {
                                "": " "
                            }, {
                                "span.year": m.getFullYear()
                            }],
                            _attr: {
                                "class": "price tour-date"
                            }
                        })) : j.push({
                            span: "N/A",
                            _attr: {
                                "class": "price sold"
                            }
                        })
                    }
                    return j
                }(j)
            }
        };
        return l
    }
    ;
    a.removeSpecificTours = function(a, b, c, d) {
        for (var a = [], c = 0, e = d.Items.length; c < e; c++)
            for (var f = d.Items[c], g = 0, j = b.specificTours.length; g < j; g++)
                f.Id == b.specificTours[g] && a.push(f);
        return a
    }
    ;
    a.removeSpecificRooms = function(a, b, c, d) {
        for (var a = [], c = 0, e = d.Items.length; c < e; c++)
            for (var f = d.Items[c], g = 0, j = b.specificRooms.length; g < j; g++)
                f.Id == b.specificRooms[g] && a.push(f);
        return a
    }
    ;
    a.buildGridTourCollapsed = function(c, f, j, h) {
        var l = b.util.copyObject(h)
          , h = c.find("div.priceGrid");
        h.length > 0 && h.remove();
        if (typeof f.specificTours != "undefined")
            l.Items = a.removeSpecificTours(c, f, j, l);
        var h = {
            "div.priceGrid im-grid collapsed": {
                table: {
                    tbody: []
                }
            }
        }
          , k = h["div.priceGrid im-grid collapsed"].table.tbody
          , q = a.groupItemsByTourMasterId(l.Items);
        l.Items = a.removeTourMasterRecords(l.Items);
        q.length === 0 && l.Items.length > 0 ? a.buildGridStandard(c, f, j, l) : (l = d.json.convertDates(l),
        g.operator = l,
        q = b.util.map(q, function(b, d) {
            return a.buildGridTourCollapsedMarkup(c, f, l, j, b, ["even", "odd"][d % 2])
        }),
        k.push(q),
        k.length > 0 ? c.append(h) : a.noResults(c, f),
        f.descriptionHover && a.addHovers(c, f, j, e[j]))
    }
    ;
    a.formatSpecialText = function(a) {
        for (var c = b.text.specials[a.Type], d = 0; d < a.Variables.length; d++)
            c = c.replace(RegExp("\\{" + d + "\\}", "g"), a.Variables[d]);
        return c
    }
    ;
    a.buildGridStandard = function(c, f, j, l) {
        var k = c.find("div.priceGrid");
        k.length > 0 && k.remove();
        l = d.json.convertDates(l);
        if (typeof f.specificTours != "undefined")
            l.Items = a.removeSpecificTours(c, f, j, l);
        if (typeof f.specificRooms != "undefined")
            l.Items = a.removeSpecificRooms(c, f, j, l);
        g.operator = l;
        var k = b.gadget.region.text, p = {
            "div.priceGrid im-grid": {
                table: {
                    thead: {
                        tr: [{
                            "td.title": k.headerTitle
                        }, {
                            "td.quantity": k.quantity
                        }, {
                            "td.total": k.total
                        }]
                    },
                    tbody: []
                }
            }
        }, q = p["div.priceGrid im-grid"].table.thead.tr, r = p["div.priceGrid im-grid"].table.tbody, s = b.util.date.names.getMonth, u = b.util.date.names.getDay, y, E = d.event.publish;
        y = b.gadget.search.userState();
        for (var x = l.Items[0].Availability.Days, t = x.length, C = 0, z = ["adults", "children", "infants", "students", "concessions", "observers", "family"], F = z.length; F--; ) {
            var B = y[z[F]];
            typeof B == "undefined" && (B = 0);
            C += parseInt(B, 10)
        }
        for (y = 0; y < t; y++) {
            B = x[y].Date;
            z = u(B.getDay() + 1, !0);
            F = B.getDate();
            B = s(B.getMonth() + 1, !0);
            z = {
                "td.date": [{
                    "a.day": z
                }, {
                    "": " "
                }, {
                    "a.date": F
                }, {
                    "": " "
                }, {
                    "a.month": B
                }]
            };
            if (j == "tours" || j == "events")
                z["td.date"]._attr = {
                    "class": "date " + j
                };
            q.push(z)
        }
        var q = l.Items, s = q.length, G, u = q.length > 0 ? q[0].Availability.Days.length : 0;
        for (y = 0; y < s; y++) {
            var A = q[y]
              , H = !(A.Availability.IsAvailable === !1 || A.Availability.Cost === 0 && j != "tours" && j != "events")
              , I = k.requestNow;
            if (j == "tours" || j == "events") {
                if (typeof A.IsGoldMedal != "undefined" && A.IsGoldMedal === !0)
                    I = k.bookNow
            } else if (typeof l.IsGoldMedal != "undefined" && l.IsGoldMedal === !0)
                I = k.bookNow;
            if (!H)
                I = h.BE.gadget.details.text.changeDates;
            if (A.Availability.IsConstrained)
                A.Availability.ConstrainedMinNights === 0 ? I = b.util.exists(f.restrictedButtonText) ? f.restrictedButtonText : "Restricted" : (x = A.Availability.ConstrainedDescription,
                I = (b.util.exists(x) && x != "" && x.toLowerCase().indexOf("max") >= 0 ? "Max " : "Min ") + A.Availability.ConstrainedMinNights + " nights");
            x = {
                tr: []
            };
            t = x.tr;
            t._data = {
                _all: A,
                roomID: A.Id,
                name: A.Name
            };
            z = {
                "td.name": {
                    "div.specials": function() {
                        var c = [];
                        b.util.each(A.Availability.Specials, function(b, e) {
                            c[c.length] = {
                                div: [{
                                    "div.name": a.formatSpecialText(e)
                                }, {
                                    _attr: {
                                        "class": "special active " + e.Type,
                                        title: "<h3>" + e.Name + "</h3>\n\n<div>" + e.Description.replace(/[\n]/g, "<br />\n") + "</div>"
                                    },
                                    _events: {
                                        click: function() {
                                            var a = d(this).closest("tr").find("a.more");
                                            a.length > 0 && a[0].click()
                                        }
                                    }
                                }]
                            }
                        });
                        b.util.each(A.Availability.AvailableSpecials, function(e, f) {
                            c[c.length] = {
                                div: [{
                                    "div.name": a.formatSpecialText(f)
                                }, {
                                    _attr: {
                                        "class": "special inactive " + f.Type,
                                        title: "<h3>" + f.Name + "</h3>\n\n<div>" + f.Description.replace(/[\n]/g, "<br />\n") + "</div>\n\n<label>" + b.text.upsell + "</label>"
                                    },
                                    _events: {
                                        click: function() {
                                            d("div.period select").val(f.Variables[0]).trigger("change")
                                        }
                                    }
                                }]
                            }
                        });
                        return c
                    }(),
                    a: A.Name
                },
                "td.quantity": {
                    select: function(b) {
                        var c = b.Availability.Days, d = [], e = 100000000000001, f;
                        if (j == "tours" || j == "events")
                            e = f = c[0].NumAvailable,
                            e = c[0].UnlimitedPAX ? f = e : f = Math.floor(e / C);
                        else
                            for (var g = 0, m = c.length; g < m; g++)
                                if (c[g].NumAvailable < e)
                                    e = f = c[g].NumAvailable;
                        if (isFinite(f) && f--) {
                            do
                                d.push({
                                    option: {
                                        "": e - f,
                                        _attr: {
                                            value: e - f
                                        }
                                    }
                                });
                            while (isFinite(f) && f--)
                        } else
                            d.push({
                                option: {
                                    "": 0,
                                    _attr: {
                                        value: 0
                                    }
                                }
                            });
                        d._events = {
                            change: function(b) {
                                return function() {
                                    b.Availability.IsConstrained || a.updateRowTotal.call(this, this.value, b.Availability.Cost)
                                }
                            }(b)
                        };
                        return d
                    }(A)
                },
                "td.total": {}
            };
            z["td.total"]["a" + (!H ? ".sold-out im-pricebutton" : ".im-pricebutton")] = function() {
                var c = a.getShortDecimalOrFree(A.Availability.Cost)
                  , c = c !== "Free" ? b.util.currencies.formatShort(c, b.gadget.currencyId) : c;
                if (!H)
                    return {
                        "span.book im-pricebutton-label": h.BE.gadget.details.text.changeDates,
                        "": " ",
                        "span.number im-pricebutton-amount": c,
                        _attr: {
                            href: "javascript://;"
                        },
                        _events: {
                            click: function() {
                                b.gadget.search.primaryDatePicker.show()
                            }
                        }
                    };
                return {
                    "span.book im-pricebutton-label": I,
                    "": " ",
                    "span.number im-pricebutton-amount": c,
                    _attr: {
                        href: "javascript://;"
                    },
                    _events: {
                        click: function(a) {
                            return function() {
                                if (a.Availability.IsConstrained)
                                    b.gadget.search.primaryDatePicker.show();
                                else {
                                    var c = [f.vcID, f.productIDs[0], j, a, b.gadget.search.userState(), l.OperatorName, d(this.parentNode.parentNode).find("td.quantity select").val(), f.campaignID, [], f.externalSearch, void 0, void 0, b.util.exists(f.stageId) ? {
                                        stageId: f.stageId
                                    } : void 0];
                                    if (b.util.exists(f.stageId) && f.stageId > 0)
                                        c.stage = {
                                            stageId: f.stageId
                                        };
                                    E("item.book.click", this, c)
                                }
                            }
                        }(A)
                    }
                }
            }();
            t.push(z);
            if (f.thumbsInGrid && A.Images.length > 0)
                z = A.Images[0],
                F = z.FullSizeImage,
                t[0]["td.name"]["div.thumb"] = {
                    img: {
                        _attr: {
                            src: z.ThumbnailImage.replace(/^http:/, ""),
                            rel: F
                        }
                    }
                };
            if (A.Availability.IsConstrained && H)
                t[0]["td.total"]["a" + (!H ? ".sold-out im-pricebutton" : ".im-pricebutton")]._attr.value = A.Availability.ConstrainedDescription;
            var K = "even";
            y % 2 === 0 && (K = "odd");
            A.IsGoldMedal && (K += " instant-confirmation");
            A.Availability.IsConstrained && (K += " min-nights");
            H || (K += " min-nights");
            b.util.exists(A.Availability.Specials) && A.Availability.Specials.length > 0 && (K += " has-specials");
            b.util.each(A.Availability.Specials, function(a, b) {
                if (b.IsLastMinute)
                    return K += " has-last-minute",
                    !1
            });
            t._attr = {
                "class": K
            };
            if (j == "tours" || j == "events")
                z = {},
                z = typeof A.Availability != "undefined" && typeof A.Availability.NextAvailable != "undefined" ? A.Availability.NextAvailable : null ,
                z = z != null ? H ? {
                    td: {
                        span: [{
                            label: "Available"
                        }],
                        _attr: {
                            "class": "price tour-date"
                        }
                    }
                } : {
                    td: {
                        span: [{
                            label: "Next Available"
                        }, {
                            "": " "
                        }, {
                            "span.day": b.util.date.names.getDay(z.getDay() + 1)
                        }, {
                            "": ", "
                        }, {
                            "span.date": z.getDate()
                        }, {
                            "": " "
                        }, {
                            "span.month": b.util.date.names.getMonth(z.getMonth() + 1)
                        }, {
                            "": " "
                        }, {
                            "span.year": z.getFullYear()
                        }],
                        _attr: {
                            "class": "price tour-date"
                        }
                    }
                } : {
                    td: {
                        span: "N/A",
                        _attr: {
                            "class": "price sold"
                        }
                    }
                },
                t.push(z);
            else
                for (G = 0; G < u; G++)
                    t.push(function() {
                        var c = A.Availability.Days[G], d;
                        d = c ? c.IsAvailable ? c.Cost == 0 ? {
                            td: {
                                span: "FREE",
                                _attr: {
                                    "class": "price free"
                                }
                            }
                        } : {
                            td: {
                                span: b.util.currencies.formatShort(a.getShortDecimal(c.Cost), b.gadget.currencyId),
                                _attr: {
                                    "class": "price"
                                }
                            }
                        } : {
                            td: {
                                span: typeof f.bookingStatus != "undefined" && f.bookingStatus != null ? f.bookingStatus : "SOLD",
                                _attr: {
                                    "class": "price sold"
                                }
                            }
                        } : {
                            td: {
                                span: "N/A",
                                _attr: {
                                    "class": "price"
                                }
                            }
                        };
                        if (c.Specials != null && c.Specials.length > 0)
                            d.td._attr["class"] += " special " + c.Specials[0].Type,
                            d.td._attr.title = "<h3>" + c.Specials[0].Name + "</h3>\n\n<div>" + c.Specials[0].Description + "</div>";
                        return d
                    }());
            r.push(x)
        }
        r.length > 0 ? c.append(p) : a.noResults(c, f);
        f.descriptionHover && a.addHovers(c, f, j, e[j], l);
        c = d("body").find("div.special, td.price.special");
        for (k = 0; k < c.length; k++)
            if (p = c[k],
            p.title != "")
                f.descriptionHover ? (d(d(p).find("span").length == 0 ? p : d(p).find("span")).hover(d({
                    "div.BE product-info-hover variable": ""
                }).html(p.title)).addClass("has-hover"),
                p.title = "") : p.title = p.title.replace(/<[^>]*>/g, "").trim();
        f.showQuantity === !1 ? d(".priceGrid .quantity").css({
            display: "none"
        }) : f.showQuantity === !0 ? d(".priceGrid .quantity").css({
            display: "table-cell"
        }) : (j == "tours" || j == "events") && d(".priceGrid .quantity").css({
            display: "none"
        })
    }
    ;
    a.groupItemsByTourMasterId = function(a) {
        var c = []
          , d = b.util.map(a, function(a) {
            return a.TourMasterId
        })
          , d = b.util.distinct(b.util.grep(d, function(a) {
            return a > 0
        }), function(a, b) {
            return a === b
        });
        b.util.each(d, function(d, e) {
            var f = b.util.grep(a, function(a) {
                return a.TourMasterId === e
            })
              , g = b.util.first(f)
              , f = {
                tourMasterId: e,
                tourMasterName: b.util.exists(g) ? g.TourMasterTourName : "",
                items: f
            };
            if (b.util.exists(g) && b.util.exists(g.Images) && g.Images.length > 0)
                f.image = b.util.first(g.Images);
            c.push(f)
        });
        return c
    }
    ;
    a.removeTourMasterRecords = function(a) {
        return b.util.grep(a, function(a) {
            return a.TourMasterId === 0
        })
    }
    ;
    a.getSimilarPropData = function(c, e) {
        var f = b.gadget.search.userState()
          , j = b.urls.endpoints.beAccomRatesGrid() + "?q=" + c.vcID;
        if (typeof e.enableRegionSearch != "undefined" && e.enableRegionSearch) {
            var h = typeof e.forceRegionState != "undefined" ? e.forceRegionState : ""
              , l = typeof e.forceRegionRegion != "undefined" ? e.forceRegionRegion : ""
              , k = typeof e.forceRegionLoc != "undefined" ? e.forceRegionLoc : "";
            h != "" && (j += "&StateName=" + encodeURIComponent(h));
            l != "" && (j += "&RegionName=" + encodeURIComponent(l));
            k != "" && (j += "&LocationName=" + encodeURIComponent(k))
        }
        f && (j += b.util.buildParamString({
            date: f.date.replace(/^[a-zA-Z]+\s(\d+)\/(\d+)\/(\d+)/g, "$3-$2-$1"),
            period: f.period,
            adults: f.adults,
            children: f.children,
            infants: f.infants
        }));
        f = {
            "div.similar-properties BE": [{
                h3: b.gadget.details.text.similar
            }, {
                "div.spinner": ""
            }]
        };
        h = d(e.selector);
        h.empty();
        h.append(f);
        var r = h.find("div.similar-properties");
        r.addClass("loading");
        d.getJSON(j, function(b) {
            b = d.json.convertDates(b);
            b = a.removeMyself(c, b);
            g.region = b;
            a.buildSimilarProperties(c, e, r)
        })
    }
    ;
    a.removeMyself = function(a, b) {
        if (typeof a.productIDs == "undefined")
            return b;
        for (var c = a.productIDs[0], d = [], e = 0, f = b.length; e < f; e++) {
            var g = b[e];
            g.OperatorId != c && d.push(g)
        }
        return d
    }
    ;
    var l = 0;
    a.buildSimilarProperties = function(c, e, f) {
        var j = this
          , k = arguments.callee
          , p = b.util.exists;
        if (!p(g.region) || !p(g.operator)) {
            if (!p(g.operator) && p(g.region) && (l++,
            l > 50))
                g.operator = {
                    TypeGrouping: [""],
                    Address: ""
                };
            d(function() {
                k.call(j, c, e, f)
            }, 100)
        } else {
            if (typeof BE_gadgetURLOverrides != "undefined")
                g.region = b.gadget.region.applyGadgetDataOverrides(g.region);
            for (var p = a.similarFilter(g.operator, g.region, c, e), q = {
                "div.items": []
            }["div.items"], r, s = 0, u = p.length; s < u; s++)
                r = p[s],
                r = {
                    "div.property": {
                        _events: {
                            click: function(a) {
                                return function() {
                                    var d = b.gadget.region.setupBookClick(e, {
                                        id: a.OperatorId,
                                        name: a.OperatorName,
                                        type: c.productIDs[1]
                                    })
                                      , f = d.replace(/#.*$/, "")
                                      , g = h.location
                                      , j = RegExp(g.pathname + "$", "gi");
                                    g.href = d;
                                    (j == f || j.test(f)) && g.reload()
                                }
                            }(r)
                        },
                        "div.name": r.OperatorName,
                        "div.thumb": function(a) {
                            var b = {
                                img: {
                                    _attr: {}
                                }
                            };
                            if (a.PrimaryImage)
                                b.img._attr.src = a.PrimaryImage.ThumbnailImage;
                            else if (a.OtherImages && a.OtherImages.length > 0)
                                b.img._attr.src = a.OtherImages[0].ThumbnailImage;
                            else
                                return {};
                            return b
                        }(r),
                        "div.from-price": function(a) {
                            for (var c = {
                                "span.from": "From",
                                "": " "
                            }, d = 10000000000001, e = 0, f = a.Items.length; e < f; e++)
                                if (a.Items[e].Availability.Cost < d)
                                    d = a.Items[e].Availability.Cost;
                            c["span.cost"] = b.util.currencies.formatShort(d, b.gadget.currencyId);
                            return c
                        }(r)
                    }
                },
                q.push(r);
            f.removeClass("loading");
            f.append(q)
        }
    }
    ;
    a.similarFilter = function(b, c, d, e) {
        var d = [], f = e.maxProperties, g, j = e.onlyGold, h = e.filterOrder, l = b.OperatorName;
        maxGuests = e.maxNumberOfGuests;
        g = c.length;
        if (j)
            for (; g--; )
                c[g].IsGoldMedal && c[g].OperatorName != l && d.push(c[g]);
        else
            for (; g--; )
                c[g].OperatorName != l && d.push(c[g]);
        e.random && d.sort(function() {
            return 0.5 - Math.random()
        });
        e = 0;
        for (g = h.length; e < g; e++) {
            c = d;
            if (d.length > 0 && d.length <= f)
                return d;
            switch (h[e]) {
            case "type":
                d = a.similarFilterByType(b, d);
                break;
            case "rating":
                d = a.similarFilterByRating(b, d);
                break;
            case "location":
                d = a.similarFilterByLocation(b, d)
            }
            d.length === 0 && (d = c)
        }
        maxGuests && (d = a.maxGuestsFilter(b, d));
        if (d.length > f)
            return d.slice(0, f);
        return d
    }
    ;
    a.similarFilterByType = function(a, b) {
        for (var c = a.TypeGrouping[0], d = [], e = b.length; e--; )
            b[e].TypeGrouping[0] == c && d.push(b[e]);
        return d
    }
    ;
    a.similarFilterByRating = function(a, b) {
        for (var c = a.StarRating + 0.5, d = a.StarRating - 0.5, e = [], f = b.length; f--; )
            b[f].StarRating >= d && b[f].StarRating <= c && e.push(b[f]);
        return e
    }
    ;
    a.similarFilterByLocation = function(a, b) {

        for (var c = [], d = b.length, e = /.*(\d{4})[^\d]*$/, f = a.Address.replace(e, "$1"), g = [a.Latitude - 0.053, a.Longitude - 0.053, a.Latitude + 0.053, a.Longitude + 0.053]; d--; )
            b[d].Address && b[d].Address.replace(e, "$1") == f && c.push(b[d]),
            b[d].Latitude <= g[0] && b[d].Latitude >= g[2] && b[d].Longitude <= g[1] && b[d].Longitude >= g[3] && c.push(b[d]);
        return c
    }
    ;
    a.maxGuestsFilter = function(a, c) {
        var d = []
          , e = c.length
          , f = b.gadget.search.userState()
          , g = 0;
        typeof f.adults != "undefined" && (g += parseInt(f.adults));
        typeof f.children != "undefined" && (g += parseInt(f.children));
        typeof f.concessions != "undefined" && (g += parseInt(f.concessions));
        typeof f.infants != "undefined" && (g += parseInt(f.infants));
        typeof f.observers != "undefined" && (g += parseInt(f.observers));
        for (typeof f.students != "undefined" && (g += parseInt(f.students)); e--; )
            for (var f = c[e].Items, j = c[e].Items.length; j--; )
                if (g <= f[j].MaxNumberOfGuests) {
                    d.push(c[e]);
                    break
                }
        return d
    }
    ;
    a.getDetailData = function(a, c) {
        var f, g = c.productIDs[1];
        switch (g) {
        case "accom":
            f = b.urls.endpoints.beAccomRoomDetails();
            break;
        case "tours":
            f = b.urls.endpoints.getTourOpsDetails();
            break;
        case "events":
            f = b.urls.endpoints.getEventOpsDetails()
        }
        if (typeof f == "undefined")
            return !1;
        f += "?q=" + c.vcID;
        f += "&operators=" + c.productIDs[0];
        typeof c.campaignID != "undefined" && (f += "&campaignid=" + c.campaignID);
        d.getJSON(f, function(a) {
            typeof a[0] != "undefined" && (e[g] = a[0]);
            typeof a.Operators != "undefined" && (e[g] = a.Operators[0])
        })
    }
    ;
    var j = 0;
    a.addHovers = function(b, c, f, g, h) {
        var l = arguments.callee;
        if (typeof g == "undefined")
            d(function() {
                j++;
                j < 200 && l(b, c, f, e[f], h)
            }, 50);
        else {
            var k = {}, r, s;
            switch (f) {
            case "accom":
                r = g.Rooms;
                s = "RoomID";
                break;
            case "tours":
                r = g.Tours;
                s = "TourId";
                break;
            case "events":
                r = g.Events,
                s = "EventId"
            }
            for (var u = 0, y = r.length; u < y; u++)
                k[r[u][s]] = r[u];
            r = b.find("div.priceGrid table tbody tr");
            s = 0;
            for (u = r.length; s < u; s++) {
                var y = r[s]
                  , E = f == "accom" ? y.childNodes[2].getElementsByTagName("a")[0].getAttribute("value") : null ;
                E === null && (E = void 0);
                var x = k[y._data.roomID];
                typeof E != "undefined" && a.buildRestrictedHover(b, y, E);
                typeof x != "undefined" && a.buildHover(b, c, y, x, h, E)
            }
        }
    }
    ;
    a.buildRestrictedHover = function(a, b, c) {
        a = {
            "div.BE restriction-info-hover": {
                "h3 div.name": "Booking Restriction",
                "div.description": c
            }
        };
        b = d(b).find("a.im-pricebutton");
        b.hover(a);
        b.addClass("has-hover")
    }
    ;
    a.buildHover = function(a, c, e, f, g, j) {
        var h = e._data._all, l = h.Name, a = b.util.stripTags, k = {
            "div.BE product-info-hover": []
        }, u = k["div.BE product-info-hover"], y = d(e).find("td.name > a"), E;
        E = b.util.exists(b.gadget.region.list) ? b.gadget.region.list.parseParas(f.Description) : [{
            p: f.Description
        }];
        if (b.util.exists(c.showHoverInline) && c.showHoverInline) {
            k = {
                "": b.util.exists(c.showHoverInlineToggleButtonContent) ? c.showHoverInlineToggleButtonContent : ".",
                _events: {
                    click: function(a) {
                        var c = d(this)
                          , e = c.parent().find(".OperatorInfo")
                          , f = b.util.hasClass(e, "OperatorInfoHidden");
                        f ? $w.event.publish("details-more-click", a, {
                            theDiv: e[0],
                            clickItem: this
                        }) : $w.event.publish("details-less-click", a, {
                            theDiv: e[0],
                            clickItem: this
                        });
                        a = d(".OperatorInfoVisible");
                        a.length > 0 && (a.removeClass("OperatorInfoVisible").addClass("OperatorInfoHidden"),
                        a = a.parent().find(".more"),
                        a.removeClass("OperatorInfoLess"),
                        a.addClass("OperatorInfoMore"));
                        f ? (e.removeClass("OperatorInfoHidden"),
                        e.addClass("OperatorInfoVisible"),
                        c.addClass("OperatorInfoLess"),
                        c.removeClass("OperatorInfoMore")) : (e.addClass("OperatorInfoHidden"),
                        e.removeClass("OperatorInfoVisible"),
                        c.removeClass("OperatorInfoLess"),
                        c.addClass("OperatorInfoMore"))
                    }
                }
            };
            u = typeof j != "undefined" && j ? {
                "div.bookingRestriction OperatorItem": {
                    "span.OperatorItemHeading": "Booking Restriction:",
                    "div.OperatorItemContent": j
                }
            } : {};
            k = {
                "a.more OperatorInfoMore": k,
                "div.OperatorInfo OperatorInfoHidden": {
                    "div.contraint": u,
                    "div.specials-info": function() {
                        if (typeof g == "undefined")
                            return {};
                        var a = null ;
                        b.util.each(g.Items, function(c, d) {
                            if (a != null )
                                return !1;
                            if (d.Id != f.RoomID)
                                return !0;
                            b.util.each(d.Availability.Specials, function(b, c) {
                                a = {
                                    "div.special": {
                                        "div.name": c.Name,
                                        "div.description": c.Description
                                    }
                                };
                                return !1
                            });
                            a == null && b.util.each(d.Availability.AvailableSpecials, function(b, c) {
                                a = {
                                    "div.special": {
                                        "div.name": c.Name,
                                        "div.description": c.Description
                                    }
                                };
                                return !1
                            })
                        });
                        a == null && (a = {});
                        return a
                    }()
                }
            };
            typeof f.RoomConfig != "undefined" && f.RoomConfig && (k["div.OperatorInfo OperatorInfoHidden"]["div.RoomConfig OperatorItem"] = {
                "span.OperatorItemHeading": "Room Configuration:",
                "div.OperatorItemContent": b.util.stripTags(f.RoomConfig)
            });
            typeof f.NoPersons != "undefined" && f.NoPersons && (k["div.OperatorInfo OperatorInfoHidden"]["div.MaxGuests OperatorItem"] = {
                "span.OperatorItemHeading": "Maximum Guests:",
                "div.OperatorItemContent": f.NoPersons
            });
            u = [];
            y = 0;
            for (j = E.length; y < j; y++)
                typeof E[y] != "undefined" && u.push({
                    p: a(E[y].p)
                });
            k["div.OperatorInfo OperatorInfoHidden"]["div.Description OperatorItem"] = {
                "span.OperatorItemHeading": "Description:",
                "div.OperatorItemContent": u
            };
            d(d(e).find("td")[0]).append(k)
        } else {
            h.Images.length > 0 && u.push({
                "div.image": {
                    img: {
                        _attr: {
                            src: h.Images[0].FullSizeImage.replace(/^http:/, "")
                        }
                    }
                }
            });
            u.push({
                h3: l
            });
            typeof j != "undefined" && u.push({
                "p.constrained-info": {
                    "div.name": "Booking Restriction:",
                    "div.description": j
                }
            });
            u.push({
                "p.specials-info": function() {
                    if (typeof g == "undefined")
                        return {};
                    var a = null ;
                    b.util.each(g.Items, function(c, d) {
                        if (a != null )
                            return !1;
                        if (d.Id != f.RoomID)
                            return !0;
                        b.util.each(d.Availability.Specials, function(b, c) {
                            a = {
                                "div.special": {
                                    "div.name": c.Name,
                                    "div.description": c.Description
                                }
                            };
                            return !1
                        });
                        a == null && b.util.each(d.Availability.AvailableSpecials, function(b, c) {
                            a = {
                                "div.special": {
                                    "div.name": c.Name,
                                    "div.description": c.Description
                                }
                            };
                            return !1
                        })
                    });
                    a == null && (a = {});
                    return a
                }()
            });
            f.RoomConfig && u.push({
                h4: f.RoomConfig
            });
            f.NoPersons && u.push({
                "p.max-guests": {
                    "span.label": "Maximum guests:",
                    "": " ",
                    "span.number": f.NoPersons
                }
            });
            e = [];
            j = 0;
            for (c = E.length; j < c; j++)
                e.push({
                    p: a(E[j].p)
                });
            u.push({
                "div.description": e
            });
            u.push({
                "hr.clear": ""
            });
            y.hover(k);
            y.addClass("has-hover")
        }
    }
    ;
    a.formatTheDecimal = function(a) {
        return a % 1 > 0 ? parseFloat(a).toFixed(2) : parseFloat(a).toFixed(0)
    }
    ;
    a.updateRowTotal = function(c, e) {
        var f = d(this.parentNode.parentNode).find("td.total a span.number")
          , g = parseInt(c, 10) * e;
        f.text(b.util.currencies.formatShort(a.formatTheDecimal.call(this, g), b.gadget.currencyId))
    }
    ;
    a.setupSubscriptions = function(c, d) {
        b.gadget.search.subscribeToChanges(function() {
            clearTimeout(k);
            k = setTimeout(function() {
                d.vcID && a.getData(c, d)
            }, 125)
        })
    }
})(window);
(function(h) {
    h.BE.gadget.details.defaults = {
        vcID: null ,
        webID: null ,
        embedSearch: !0,
        thumbsInGrid: !0,
        descriptionHover: !0,
        showSimilarProperties: null ,
        type: null ,
        productID: null ,
        showQuantity: null ,
        showPeriod: null ,
        showAllTours: !1,
        showAllEvents: !1,
        collapseToursMode: !1
    }
})(window);
(function(h) {
    h = h.BE.gadget.details.text = {};
    h.similar = "Similar Properties";
    h.changeDates = "Change Dates"
})(window);
(function(h) {
    var d = h.wisDOM, b = h.BE, a = {}, k = null , f = {}, c = 0, e = 0, g = null , l = d.event.publish, j, m = {}, n = null , o = {};
    b.gadget.region = function(c, e) {
        var f = d(c);
        if (f.length === 0)
            return !1;
        e = b.util.mergeObjects(e, b.gadget.region.defaults);
        if (!e.vcID && !e.webID)
            return !1;
        b.gadget.init(e, function() {
            var b = e;
            d(c);
            typeof b.campaignID != "undefined" ? a.OverrideDefaultDateForCampaign(c, b, a.gadget.region) : a.gadget.region(c, b)
        });
        return f
    }
    ;
    b.gadget.region.itemURL = function(a) {
        return b.gadget.region.setupBookClick(j, a)
    }
    ;
    var w = /(^\s+|\s+$)/g
      , v = /(\{name\}|\{id\}|\{type\}|\{url\})/g
      , p = /('|")/g
      , q = /[^a-z0-9]/g
      , r = /-+/g;
    b.gadget.region.setupBookClick = function(b, c) {
        var d, e;
        c.type != "packages" && (e = encodeURI(c.name.replace(w, "")));
        d = b.itemDetailPageURL.replace(v, function(a) {
            switch (a) {
            case "{name}":
                return e;
            case "{type}":
                return c.type;
            case "{id}":
                return c.id;
            case "{url}":
                return a = c.name.replace(w, "").toLowerCase().replace(p, ""),
                a = a.replace(q, "-").replace(r, "-")
            }
            return ""
        });
        if (a.doesAnOverrideExistForOperator(c.id)) {
            var f = h.BE_gadgetURLOverrides[c.id];
            typeof f == "string" && (d = f);
            if (typeof f.url != "undefined")
                d = f.url
        }
        d += "#/" + c.type + "/" + c.id;
        b.campaignID !== null && (d += "/" + b.campaignID);
        return d
    }
    ;
    b.gadget.region.buildRefineTools = function(c, e, f) {
        e = b.util.mergeObjects(e, b.gadget.region.defaults);
        typeof o.locations == "undefined" && a.fetchVCLocations(e);
        typeof o.types == "undefined" && e.showAccomTypeFilter && a.fetchAcommTypes(e);
        typeof o.facilities == "undefined" && a.fetchFacilities(e);
        typeof o.tourTypes == "undefined" && a.fetchTourTypes(e);
        d(function() {
            a.buildRefineTools(c, e, f)
        }, 10)
    }
    ;
    b.gadget.region.buildRefineTools.saveRefineCookie = function(b) {
        a.buildRefineTools.saveRefineCookie(b)
    }
    ;
    b.gadget.region.refineCookieExists = function() {
        var a = d.cookie(b.util.cookieName("r3FinE70oLs"));
        return d.json.parse(a) != null
    }
    ;
    b.gadget.region.buildRefineTools.clearRefineCookie = function() {
        a.buildRefineTools.clearRefineCookie()
    }
    ;
    b.gadget.region.buildRefineTools.getRefineCookiePreffs = function() {
        return a.getRefineCookiePreffs()
    }
    ;
    b.gadget.region.getBEData = function(b, c) {
        a.prepGetBeData(b, c)
    }
    ;
    b.gadget.region.applyGadgetDataOverrides = function(b) {
        return a.applyGadgetDataOverrides(b)
    }
    ;
    b.gadget.region.et = function() {
        return a
    }
    ;
    a.gadget = {};
    a.gadget.region = function(c, e) {
        var f = d(c);
        if (f.length !== 0 && (j = e = b.util.mergeObjects(e, b.gadget.region.defaults),
        e.vcID || e.webID)) {
            f.empty();
            f.append({
                "div.region-gadget BE": ""
            });
            f = f.find("div.region-gadget");
            e.embedSearch && !e.interactiveMapMode && b.gadget.search.embed(e).appendTo(f);
            if (e.listAllMode)
                e.showRefineTools = !0,
                e.showMap = !1,
                e.showLegend = !1,
                e.showAllAccom = !0,
                e.showAccomTypeFilter = !0,
                e.showFacilitiesFilter = !0,
                e.showLocationFilter = !0,
                e.interactiveMapMode = !1,
                e.lastMinuteMode = null ,
                f.addClass("list-all-mode");
            e.showAccomTypeFilter && d(function() {
                a.fetchAcommTypes.call(a, e)
            }, 1);
            e.showTourTypesFilter && d(function() {
                a.fetchTourTypes.call(a, e)
            }, 1);
            e.showFacilitiesFilter && d(function() {
                a.fetchFacilities.call(a, e)
            }, 1);
            e.interactiveMapMode && d(function() {
                a.fetchVCTypes.call(a, e);
                a.fetchVCBusinessGroupings.call(a, e)
            }, 1);
            e.showLocationFilter && d(function() {
                a.fetchVCLocations.call(a, e)
            }, 1);
            e.lastMinuteMode !== null && !isNaN(e.lastMinuteMode) && b.gadget.search.lastMinuteMode(e.lastMinuteMode);
            var g = function() {
                a._init(f, e);
                a.setupSubscriptions(f, e);
                (e.showMap || e.interactiveMapMode) && d(function() {
                    b.util.exists(b.gadget.region.map) && b.gadget.region.map.attachMapCode(f, e)
                }, 250)
            }
            ;
            e.showRefineTools && !e.interactiveMapMode ? a.buildRefineTools(f, e, !0, function() {
                g()
            }) : g();
            var h = b.gadget.search.userCookie()
              , l = typeof e.ignoreSearchCookie != "undefined" ? e.ignoreSearchCookie : !1;
            !h && l && e.defaultProductType != null && a.productUserStateExistsInSelect(f, e.defaultProductType) && a.setDefaultProductType(f, e.defaultProductType)
        }
    }
    ;
    a.productUserStateExistsInSelect = function(a, b) {
        var c = a.find("div.product select option")
          , e = !1;
        if (typeof c != "undefined")
            for (var f = 0, g = c.length; f < g; f++)
                if (d(c[f]).attr("value") == b) {
                    e = !0;
                    break
                }
        return e
    }
    ;
    a.setDefaultProductType = function(a, b) {
        typeof a.find("div.product select option") != "undefined" && d('select[rel="product"]').val(b)
    }
    ;
    a._init = function(d, f, j) {
        e = c = 0;
        if (f.vcID) {
            var h = a.IsRunningRegionSearch(f);
            (!h || h && f.interactiveMapMode || h && typeof j != "undefined" && j && b.gadget.search.locations.refreshSearchCriteriaMet()) && a.prepGetBeData(d, f);
            j = a.getProducts(d, f);
            !f.interactiveMapMode && !f.listAllMode ? a.makeTabs(d, j, f) : g = "map"
        }
    }
    ;
    a.OverrideDefaultDateForCampaign = function(c, e, f) {
        var g = b.urls.endpoints.getCampaignData() + "?q=" + e.vcID + "&campaignId" + e.campaignID;
        d.getJSON(g, function(b) {
            e.defaultDate = typeof e.defaultDate != "undefined" ? e.defaultDate : moment().startOf("day").format("DD-MM-YYYY");
            if (typeof b != "undefined" && typeof b.Campaigns != "undefined" && typeof b.Campaigns.length != "undefined" && (b = a.getCampaignInfoFromJson(b.Campaigns, e.campaignID),
            b != null && typeof b.StartDate != "undefined" && !a.IsDateInThePast(b.StartDate)))
                e.defaultDate = moment(b.StartDate).startOf("day").format("DD-MM-YYYY");
            f(c, e)
        })
    }
    ;
    a.getCampaignInfoFromJson = function(a, b) {
        for (var c = null , d = 0, e = a.length; d < e; d++) {
            var f = a[d];
            if (f.CampaignId == b) {
                c = f;
                break
            }
        }
        return c
    }
    ;
    a.IsDateInThePast = function(a) {
        var a = moment(a, "YYYY-MM-DD").startOf("day")
          , b = moment().startOf("day");
        return a < b
    }
    ;
    a.doesAnOverrideExistForOperator = function(a) {
        return typeof h.BE_gadgetURLOverrides != "undefined" && h.BE_gadgetURLOverrides[a]
    }
    ;
    a.IsRunningRegionSearch = function(a) {
        return typeof a.enableRegionSearch != void 0 && a.enableRegionSearch == !0 && typeof b.gadget.search.locations != "undefined"
    }
    ;
    a.getProducts = function(a, c) {
        var d = "?q=" + c.vcID + (Object.prototype.toString.call(c.operators) === "[object Array]" ? "&operators=" + c.operators : "");
        c.showDetailsInline === !0 && (d += "&InclAvailability=true");
        return {
            accom: b.urls.endpoints.beAccomRatesGrid() + d,
            tours: b.urls.endpoints.beToursRatesGrid() + d,
            events: b.urls.endpoints.beEventsRatesGrid() + d,
            carhire: b.urls.endpoints.beCarHireRatesGrid() + d,
            packages: b.urls.endpoints.bePackagesRatesGrid() + d
        }
    }
    ;
    a.prepGetBeData = function(b, e) {
        if (e.vcID) {
            var f = a.getProducts(b, e)
              , g = typeof e.disabledTypes != "undefined" && e.disabledTypes !== null && e.disabledTypes.length > 0 ? e.disabledTypes.join(".") : "";
            e.lastMinuteMode && (g = "tours.events.carhire.packages");
            for (var j in f)
                f.hasOwnProperty(j) && g.indexOf(j) == -1 && (c++,
                d(function(c) {
                    return function() {
                        a.getBEData(b, e, c, f[c])
                    }
                }(j), 10))
        }
    }
    ;
    a.makeTabs = function(c, e, f) {
        var e = b.util.exists
          , j = b.gadget.region
          , l = typeof b.gadget.region.map != "undefined" && typeof b.gadget.region.map.lightinteractive != "undefined";
        if (!e(j.list) && !e(j.map) || l)
            return !1;
        if (c.find("div.tabs-group").length === 0) {
            c.prepend({
                "div.tabs-group": ""
            });
            c = c.find("div.tabs-group");
            e = [];
            e.push(b.gadget.region.elements.viewChoice(f));
            c.append(e);
            e = a.readViewChoice();
            j = /^#\/view\/([a-z]+)\/{0,1}([a-z]+)*\/{0,1}/.exec(h.location.hash);
            if (j !== null && (j[1] == "price" || j[1] == "list" || j[1] == "map"))
                e = j[1];
            e || (e = "price");
            g = e;
            c.find("div.view-choice a." + e).addClass("current");
            j !== null && b.util.exists(j[2]) && b.gadget.search.setUserState({
                product: j[2]
            });
            f.showLegend && !f.advancedPriceView && d(b.gadget.region.elements.legend(f)).appendTo(c)
        } else
            c.find("div.tabs-group a").removeClass("shown")
    }
    ;
    a.getBEData = function(c, g, j, k) {
        var n = b.gadget.search.userState(void 0, g);
        if (n) {
            if (g.interactiveMapMode === !0 && !g.interactiveMapUser)
                n.period = 1;
            var o = n.period;
            if (j == "tours" || j == "events")
                o = 1;
            k += b.util.buildParamString({
                date: n.date.replace(/^[a-zA-Z]+\s(\d+)\/(\d+)\/(\d+)/g, "$3-$2-$1"),
                period: o,
                adults: n.adults,
                children: n.children,
                infants: n.infants
            });
            n.types != "ALL" && n.types !== "" && typeof n.types != "undefined" && j == "accom" && (k += "&AccomGrouping=" + encodeURI(n.types))
        }
        if (typeof b.gadget.search.locations != "undefined" && g.enableRegionSearch) {
            var n = b.gadget.search.locations.getStateValue(c)
              , o = b.gadget.search.locations.getRegionValue(c)
              , r = b.gadget.search.locations.getLocationValue(c);
            if (g.interactiveMapMode) {
                if (typeof g.forceRegionState != "undefined")
                    n = g.forceRegionState;
                if (typeof g.forceRegionRegion != "undefined")
                    o = g.forceRegionRegion;
                if (typeof g.forceRegionLoc != "undefined")
                    r = g.forceRegionLoc
            }
            n != "" && (k += "&StateName=" + encodeURIComponent(n));
            o != "" && (k += "&RegionName=" + encodeURIComponent(o));
            r != "" && (k += "&LocationName=" + encodeURIComponent(r))
        }
        if ((g.showAllAccom || g.lastMinuteMode) && j == "accom")
            k += "&enforceBookingConditions=false&enforceEntirePeriod=false";
        typeof g.showAllTours != "undefined" && g.showAllTours && j == "tours" && (k += "&enforceBookingConditions=false");
        typeof g.showAllEvents != "undefined" && g.showAllEvents && j == "events" && (k += "&enforceBookingConditions=false");
        g.campaignID !== null && (k += "&CampaignId=" + g.campaignID);
        typeof g.externalSearch != "undefined" && g.externalSearch && typeof g.enableRegionSearch != "undefined" && g.enableRegionSearch && (k += "&ExternalSearch=" + g.externalSearch);
        b.util.exists(g.stageId) && g.stageId > 0 && (k += "&StageId=" + g.stageId);
        typeof f[j] != "undefined" && (f[j].cancel(),
        l("region.loading.end", h, c));
        l("region.loading.start", h, c);
        d(function() {
            f[j] = d.getJSON(k, function(c, d, g) {
                return function(j) {
                    b.util.exists(d) && b.util.exists(d.excludeOperators) && (j = a.removeExcludedOperators(j, d));
                    b.util.exists(d) && b.util.exists(d.includedOperators) && (j = a.keepOnlyIncludedOperators(j, d));
                    e++;
                    m[g] = j;
                    a.checkLoadingStatus(c, d, g);
                    f[g] = void 0;
                    a.buildView(c, d, g, j)
                }
            }(c, g, j))
        }, Math.round(Math.random() * 450) + 50)
    }
    ;
    a.checkLoadingStatus = function(a) {
        e == c && l("region.loading.end", h, a)
    }
    ;
    a.removeExcludedOperators = function(a, c) {
        for (var d = [], e = 0; e < a.length; e++) {
            var f = a[e];
            b.util.existsInArray(f, c.excludeOperators, function(a, b) {
                return a.OperatorId == b
            }) || d.push(f)
        }
        return d
    }
    ;
    a.keepOnlyIncludedOperators = function(a, c) {
        for (var d = [], e = 0; e < a.length; e++) {
            var f = a[e];
            b.util.existsInArray(f, c.includedOperators, function(a, b) {
                return a.OperatorId == b
            }) && d.push(f)
        }
        return d
    }
    ;
    a.makeSpecialsHover = function(a) {
        for (var b = d("body").find("div.specials div.special, div.specials td.price.special"), c = 0; c < b.length; c++) {
            var e = b[c];
            if (e.title != "")
                a.descriptionHover ? (d(d(e).find("span").length == 0 ? e : d(e).find("span")).hover(d({
                    "div.BE product-info-hover variable": ""
                }).html(e.title)).addClass("has-hover"),
                e.title = "") : e.title = e.title.replace(/<[^>]*>/g, "").trim()
        }
    }
    ;
    a.buildView = function(c, e, f, j) {
        j = d.json.convertDates(j);
        j = a.filterData(c, e, j, f);

        // console.log(c);
        // console.log(e);
        // console.log(j);
        // console.log(f);

        j.length === 0 && (j = m[f],
        e.limitLocations !== null && e.limitLocations.length > 0 && (j = a.limitLocations(e, j)),
        b.gadget.search.userState().product == f && f != "packages" && !e.interactiveMapMode && !e.lastMinuteMode && setTimeout(function() {
            alert("Sorry, there is nothing available using the dates and/or criteria chosen.\nPlease change the dates and options chosen, then try searching again.")
        }, 50));
        typeof BE_gadgetURLOverrides != "undefined" && (j = a.applyGadgetDataOverrides(j));
        e.advPV = f == "accom" && e.advancedPriceView !== null && b.util.exists(b.gadget.region.price.advanced) ? b.gadget.region.price.advanced(c, e) : {};
        var l = c.find("select.sortByWhich").val()
          , k = c.find("select.sortByOrder").val()
          , j = e.advPV.on ? a.splitData(c, e, j, f, l, k) : a.sortData(c, e, j, f, l, k)
          , n = b.gadget.search.userState()
          , o = function() {
            f == n.product && d(function() {
                a.showType(c, f)
            }, 125)
        }
          , r = b.util.exists;
        e.listAllMode && (g = "list");
        !e.interactiveMapMode && !e.listAllMode && (l = 20,
        g != "price" && (l = 1500),
        d(function() {
            b.gadget.region.price.build(c, e, f, j);
            a.changeView(c, e, g);
            o();
            a.makeSpecialsHover(e)
        }, l));
        e.showList && !e.interactiveMapMode && r(b.gadget.region.list) && (l = 20,
        g != "list" && (l = 2E3),
        d(function() {
            b.gadget.region.list.build(c, e, f, j);
            a.changeView(c, e, g);
            o();
            a.makeSpecialsHover(e)
        }, l));
        if (e.showMap || e.interactiveMapMode) {
            var p = f == n.product ? !0 : !1
              , l = 20;
            g != "map" && (l = 2500);
            d(function() {
                r(b.gadget.region.map) && (b.gadget.region.map.buildMarkers(c, e, f, j, p),
                o(),
                a.makeSpecialsHover(e))
            }, l)
        }
        g == "map" && setTimeout(function() {
            var b;
            try {
                b = h.google.maps.version
            } catch (d) {}
            typeof b != "undefined" ? (a.changeView(c, e, "map"),
            a.makeSpecialsHover(e)) : setTimeout(arguments.callee, 50)
        }, 50)
    }
    ;
    a.applyGadgetDataOverrides = function(b) {
        for (var c = [], e = 0, d = b.length; e < d; e++) {
            var f = b[e]
              , g = f.OperatorId;
            if (a.doesAnOverrideExistForOperator(g) && typeof BE_gadgetURLOverrides[g] != "string") {
                var g = BE_gadgetURLOverrides[g], j;
                for (j in g)
                    g.hasOwnProperty(j) && (f[j] = g[j])
            }
            c.push(f)
        }
        return c
    }
    ;
    a.showType = function(a, b) {
        a.find("div.type-group").css({
            display: "none"
        });
        a.find("div." + b).css({
            display: "block"
        });
        d(function() {
            d(h).trigger("scroll")
        }, 25)
    }
    ;
    a.changeView = function(c, e, f) {
        var j = c.find("div.prices-grid")
          , l = c.find("div.map-container")
          , m = c.find("div.list-view");
        f == "price" && (j.css({
            display: "block"
        }),
        l.css({
            display: "none"
        }),
        m.css({
            display: "none"
        }));
        f == "list" && (j.css({
            display: "none"
        }),
        l.css({
            display: "none"
        }),
        m.css({
            display: "block"
        }));
        (f == "price" || f == "list") && d(function() {
            d(h).trigger("scroll")
        }, 50);
        f == "map" && (e.interactiveMapMode || b.gadget.region.map.showMarkers(b.gadget.search.userState().product, !1, e),
        setTimeout(function() {
            j.css({
                display: "none"
            });
            l.css({
                display: "block"
            });
            m.css({
                display: "none"
            });
            b.gadget.region.map.redraw(e);
            a.makeSpecialsHover(e)
        }, 50));
        g = f
    }
    ;
    a.saveViewChoice = function(a) {
        var c = b.util.cookieName("region.gadget_viewChoice");
        d.cookie(c, a)
    }
    ;
    a.readViewChoice = function() {
        return d.cookie(b.util.cookieName("region.gadget_viewChoice"))
    }
    ;
    a.setupSubscriptions = function(c, e) {
        b.gadget.search.subscribeToChanges(function() {
            clearTimeout(k);
            k = setTimeout(function() {
                e.vcID && a._init(c, e, !0)
            }, 125)
        });
        d.event.subscribe("search.product.change", function(f) {
            a.showType(c, f, !1);
            g == "map" && d(function() {
                b.gadget.region.map.showMarkers(f, !1, e)
            }, 50)
        });
        d.event.subscribe("region.view.change", function(b) {
            a.changeView(c, e, b);
            a.saveViewChoice(b)
        })
    }
    ;
    a.getRefineCookiePreffs = function() {
        var a = d.cookie(b.util.cookieName("r3FinE70oLs"))
          , a = d.json.parse(a);
        a === null && (a = {
            type: ""
        });
        return a
    }
    ;
    a.buildRefineTools = function(c, e, f, g) {
        typeof f == "undefined" && (f = !0);
        var j = arguments.callee
          , l = typeof e.showLocationFilter != "undefined" ? e.showLocationFilter : !0;
        if (typeof o.locations == "undefined" && l || typeof o.types === "undefined" && e.showAccomTypeFilter || typeof o.facilities == "undefined" || typeof o.tourTypes == "undefined")
            d(function() {
                j.call(j, c, e, f, g)
            }, 125);
        else {
            var k = "", n = "", r = /(^\s|\s$)/g, p = null , w = null , q, v, I = b.util.cookieName("s0r78yPr3fEr3nce"), K = d.json.parse(d.cookie(I)), J = b.gadget.region.text, M = a.getRefineCookiePreffs();
            stripTags = b.util.stripTags;
            K === null && (K = ["", ""]);
            M === null && (M = {
                location: "",
                type: ""
            });
            var P = d({
                "div.nameFilter": [{
                    "span.label": b.gadget.region.text.refineByName
                }, {
                    "span.input": {
                        input: {
                            _events: {
                                keyup: function(f) {
                                    var g = b.gadget.search.userState().product;
                                    d(this);
                                    f = f.target.value.replace(r, "");
                                    f !== k && (clearTimeout(p),
                                    k = f,
                                    p = setTimeout(function() {
                                        var b = a.filterData(c, e, m[g], g);
                                        a.buildView(c, e, g, b)
                                    }, 500))
                                }
                            }
                        }
                    }
                }]
            })
              , Q = d({
                "div.sortBy": {
                    "div.byWhich": {
                        "span.label": J.refineSortBy,
                        "span.input": {
                            "select.sortByWhich": function() {
                                var a = ["Rating", "Price", "Name", "Location", "Instant Confirmation", "Hot Deals", "Last Minute"], b = [], c = a.length, d = K[0], f;
                                if (e.defaultSort != null ) {
                                    switch (e.defaultSort) {
                                    case "rating":
                                        f = a.splice(0, 1);
                                        break;
                                    case "price":
                                        f = a.splice(1, 1);
                                        break;
                                    case "name":
                                        f = a.splice(2, 1);
                                        break;
                                    case "location":
                                        f = a.splice(3, 1);
                                        break;
                                    case "instant":
                                        f = a.splice(4, 1);
                                        break;
                                    case "deal":
                                        f = a.splice(5, 1);
                                        break;
                                    case "lastminute":
                                        f = a.splice(6, 1)
                                    }
                                    a.splice(0, 0, f[0])
                                }
                                for (; c--; )
                                    f = a[c].toLowerCase().replace(/\s/g, "-"),
                                    b[c] = {
                                        option: {
                                            "": a[c],
                                            _attr: {
                                                value: f
                                            }
                                        }
                                    },
                                    d == f && (b[c].option._attr.selected = "selected");
                                return b
                            }()
                        }
                    },
                    "div.byOrder": {
                        "span.label": J.sortOrder,
                        "span.input": {
                            "select.sortByOrder": function() {
                                for (var a = [b.gadget.region.text.sortNormal, b.gadget.region.text.sortReverse], c = ["desc", "asc"], e = [], d = a.length, f = K[1], g; d--; )
                                    g = c[d],
                                    e[d] = {
                                        option: {
                                            "": a[d],
                                            _attr: {
                                                value: g
                                            }
                                        }
                                    },
                                    f == g && (e[d].option._attr.selected = "selected");
                                return e
                            }()
                        }
                    }
                }
            })
              , R = d({
                "div.maxPrice": {
                    "span.label": J.maxPrice,
                    "span.input": {
                        input: {
                            _attr: {
                                type: "text"
                            },
                            _events: {
                                keyup: function(f) {
                                    var g = b.gadget.search.userState().product;
                                    d(this);
                                    f = f.target.value.replace(r, "");
                                    f !== n && (clearTimeout(w),
                                    n = f,
                                    w = setTimeout(function() {
                                        var b = a.filterData(c, e, m[g], g);
                                        a.buildView(c, e, g, b)
                                    }, 500))
                                }
                            }
                        }
                    }
                }
            })
              , S = d({
                "div.locationFilter": {
                    "span.label": J.locationFilter,
                    "span.input": {
                        select: function() {
                            var a = o.locations, c = [{
                                option: {
                                    "": J.locationsAll,
                                    _attr: {
                                        value: ""
                                    }
                                }
                            }], d = M.location, f;
                            if (typeof a == "undefined")
                                return c;

                            for (var g = 0, j = a.length; g < j; g++) {
                                f = {
                                    option: {
                                        "": stripTags(a[g].Description),
                                        _attr: {
                                            value: a[g].Description
                                        }
                                    }
                                };
                                if (!b.util.exists(d) && b.util.exists(e.defaultRegionLoc) && e.defaultRegionLoc == a[g].Description)
                                    f.option._attr.selected = "selected";
                                if (d == a[g].Description)
                                    f.option._attr.selected = "selected";
                                c.push(f)
                            }
                            return c
                        }()
                    }
                }
            });
            l || S.addClass("hide");
            var l = d({
                "div.accommTypes": {
                    "span.label": J.accommTypes,
                    "span.input": {
                        select: function() {
                            for (var a = o.types || [], b = [{
                                option: {
                                    "": J.locationsAll,
                                    _attr: {
                                        value: ""
                                    }
                                }
                            }], c = M.type, d, f = 0, g = a.length; f < g; f++) {
                                d = {
                                    option: {
                                        _attr: {
                                            value: a[f]
                                        },
                                        "": stripTags(a[f])
                                    }
                                };
                                if (e.forceAccomType == null && c == a[f] || e.forceAccomType != null && a[f] == e.forceAccomType)
                                    d.option._attr.selected = "selected";
                                b.push(d)
                            }
                            return b
                        }()
                    }
                }
            })
              , T = d({
                "div.tourTypes": {
                    "span.label": J.tourTypes,
                    "span.input": {
                        select: function() {
                            for (var a = o.tourTypes, b = [{
                                option: {
                                    "": J.tourTypesAll,
                                    _attr: {
                                        value: ""
                                    }
                                }
                            }], c = M.tourType, d, f = 0, g = a.length; f < g; f++) {
                                d = {
                                    option: {
                                        _attr: {
                                            value: a[f]
                                        },
                                        "": stripTags(a[f])
                                    }
                                };
                                if (e.forceTourType == null && c == a[f] || e.forceTourType != null && a[f] == e.forceTourType)
                                    d.option._attr.selected = "selected";
                                b.push(d)
                            }
                            return b
                        }()
                    }
                }
            })
              , U = d({
                "div.facilities": {
                    "span.label": J.facilities,
                    "span.input": {
                        select: function() {
                            for (var a = o.facilities, b = [{
                                option: {
                                    "": J.locationsAll,
                                    _attr: {
                                        value: ""
                                    }
                                }
                            }], c = M.facilities, e, d = 0, f = a.length; d < f; d++) {
                                e = {
                                    option: {
                                        "": stripTags(a[d].FacilityDesc),
                                        _attr: {
                                            value: a[d].FacilityId
                                        }
                                    }
                                };
                                if (c == a[d].FacilityId)
                                    e.option._attr.selected = "selected";
                                b.push(e)
                            }
                            return b
                        }()
                    }
                }
            })
              , V = Q.find("select.sortByWhich")
              , Y = Q.find("select.sortByOrder")
              , L = S.find("select")
              , X = l.find("select")
              , W = U.find("select")
              , Z = T.find("select")
              , O = function() {
                if (f === !0) {
                    var g = b.gadget.search.userState().product
                      , j = a.filterData(c, e, m[g], g);
                    a.buildView(c, e, g, j)
                }
                d.cookie(I, d.json.stringify([V.val(), Y.val()]))
            }
            ;
            V.bind("change", O);
            Y.bind("change", O);
            q = P.find("input");
            v = R.find("input");
            O = function(d) {
                if (f === !0) {
                    var g = b.gadget.search.userState().product;
                    d.target.value.replace(r, "");
                    d = a.filterData(c, e, m[g], g);
                    a.buildView(c, e, g, d)
                }
                a.buildRefineTools.saveRefineCookie(c)
            }
            ;
            L.bind("change", O);
            X.bind("change", O);
            W.bind("change", O);
            Z.bind("change", O);
            L = d({
                "div.refineTools": ""
            });
            L.append(S);
            e.showAccomTypeFilter && L.append(l);
            L.append(T);
            L.append(U);
            f === !0 && (L.append(R),
            L.append(P));
            L.append(Q);

            console.log(L);

            typeof b.gadget.search.locations != "undefined" && e.enableRegionSearch && (P = L.find("div.locationFilter"),
            b.gadget.search.locations.buildRegionSearchAfter(c, e, P, !0));
            console.log('hello');
            if (e.collapseRefineTools || h.BE._isMobile) {
                L.css({
                    display: "none"
                });
                var N = {
                    "div.showHideRefineTools": {
                        a: {
                            _data: {
                                shown: !1
                            },
                            _events: {
                                click: function(a) {
                                    a = a.target;
                                    if (a.tagName.toLowerCase() != "a")
                                        a = a.parentNode;
                                    var b = a._data.shown;
                                    b ? c.find("div.refineTools").slideUp() : c.find("div.refineTools").slideDown();
                                    a._data.shown = !b
                                }
                            },
                            span: J.showHideRefine
                        }
                    }
                };
                f === !0 ? c.find("div.search-gadget").append(N) : d(function() {
                    var a = d(N);
                    a.find("a span").text(J.advSearch);
                    a.insertBefore(c.find("div.refineTools"))
                }, 0)
            }
            b.gadget.search.userState().product != "accom" && (l.css({
                display: "none"
            }),
            U.css({
                display: "none"
            }));
            b.gadget.search.userState().product != "tours" && b.gadget.search.userState().product != "events" && T.css({
                display: "none"
            });
            d.event.subscribe("search.product.change", function(b) {
                console.log('change!');
                q.val("");
                v.val("");
                c.find("div.accommTypes select").val("");
                c.find("div.locationFilter select").val("");
                c.find("div.facilities select").val("");
                b == "tours" || b == "events" ? (c.find("div.accommTypes").css({
                    display: "none"
                }),
                c.find("div.facilities").css({
                    display: "none"
                }),
                c.find("div.tourTypes").css({
                    display: ""
                })) : (b == "accom" ? (c.find("div.accommTypes").css({
                    display: ""
                }),
                c.find("div.facilities").css({
                    display: ""
                })) : (c.find("div.accommTypes").css({
                    display: "none"
                }),
                c.find("div.facilities").css({
                    display: "none"
                })),
                c.find("div.tourTypes").css({
                    display: "none"
                }));
                f === !0 && a.buildView(c, e, b, m[b])
            });
            d(function() {
                d.event.publish("region.refinetools.built", c)
            }, 1);
            e.refineToolsLocation != null ? L.appendTo(d(e.refineToolsLocation)) : (e.embedSearch === !0 ? L.insertBefore(c.find("div.search-gadget div.button")) : L.appendTo(c),
            typeof g != "undefined" && g())
        }
    }
    ;
    a.buildRefineTools.saveRefineCookie = function(b) {
        a.buildRefineTools.saveRefineCookieBase(b, !1)
    }
    ;
    a.buildRefineTools.clearRefineCookie = function() {
        d.cookie(b.util.cookieName("r3FinE70oLs"), d.json.stringify({}))
    }
    ;
    a.clearRefineRegionCookieValues = function(b) {
        a.buildRefineTools.saveRefineCookieBase(b, !0)
    }
    ;
    a.buildRefineTools.saveRefineCookieBase = function(a, c) {
        var e = a.find("div.locationFilter select")
          , e = e.length > 0 ? e.val() : ""
          , f = a.find("div.accommTypes select").val()
          , g = a.find("div.facilities select").val()
          , j = a.find("div.tourTypes select").val()
          , h = a.find("div.locationsFilter select")
          , l = a.find("div.stateFilter select")
          , m = a.find("div.regionFilter select");
        searchLocVal = h.length > 0 ? h.val() : "";
        searchStateVal = l.length > 0 ? l.val() : "";
        searchRegionVal = m.length > 0 ? m.val() : "";
        d.cookie(b.util.cookieName("r3FinE70oLs"), d.json.stringify({
            location: e,
            type: f,
            facilities: g,
            tourType: j,
            searchLoc: c ? "" : searchLocVal,
            searchState: c ? "" : searchStateVal,
            searchRegion: c ? "" : searchRegionVal
        }))
    }
    ;
    a.splitData = function(c, e, d, f, g, j) {
        var h = {}, l = b.util.exists, m = d.length, k;
        if (typeof g == "undefined" && typeof e.defaultSort != "undefined" || typeof g != "undefined" && g == "")
            g = e.defaultSort;
        if (!l(b.gadget.region.price.advanced) || !e.advPV.on)
            return a.sortData(c, e, d, f, g, j);
        for (; m--; )
            k = d[m].TypeGrouping[0],
            l(k) && (l(h[k]) || (h[k] = []),
            h[k].push(d[m]));
        for (var n in h)
            h.hasOwnProperty(n) && (h[n] = a.sortData(c, e, h[n], f, g, j));
        c = {};
        e = e.advPV.order;
        d = 0;
        for (f = e.length; d < f; d++)
            c[e[d]] = d;
        for (n in h)
            h.hasOwnProperty(n) && !l(c[n]) && (c[n] = d,
            d++);
        e = [];
        for (n in c)
            if (c.hasOwnProperty(n) && l(h[n])) {
                d = 0;
                for (f = h[n].length; d < f; d++)
                    g = h[n][d],
                    g._advViewHeader = d === 0 ? n : void 0,
                    e.push(g)
            }
        return e
    }
    ;
    a.sortData = function(b, c, e, d, f, g) {
        b = [];
        d = e.length;
        g = g == "asc" ? !1 : !0;
        for (c.lastMinuteMode && (f = "last-minute"); d--; )
            b[d] = e[d];
        switch (f) {
        case "rating":
            b = a.sortByRating(b, g, c);
            break;
        case "price":
            b = a.sortByPrice(b, g, c);
            break;
        case "name":
            b = a.sortByName(b, g, c);
            break;
        case "location":
            b = a.sortByLocation(b, g, c);
            break;
        case "instant-confirmation":
            b = a.sortByInstantConf(b, g, c);
            break;
        case "hot-deals":
            b = a.sortByHotDeals(b, g, c);
            break;
        case "last-minute":
            b = a.sortByLastMinute(b, g, c);
            break;
        case "campaign":
            b = a.sortByCampaign(b)
        }
        return b
    }
    ;
    a.sortByRating = function(a, b) {
        return a.sort(function(a, c) {
            var e = a.StarRating
              , d = c.StarRating
              , f = 0;
            e > d && (f = -1);
            e < d && (f = 1);
            f === 0 && (a.IsAAARated && !c.IsAAARated && (f = -1),
            c.IsAAARated && !a.IsAAARated && (f = 1));
            f === 0 && (f = Math.random() < 0.5 ? -1 : 1);
            !b && f !== 0 && (f *= -1);
            return f
        })
    }
    ;
    a.sortByPrice = function(a, b) {
        return a.sort(function(a, c) {
            var e = a.Items
              , d = c.Items
              , f = 100000001
              , g = 100000001
              , j = e.length
              , h = d.length
              , l = 0;
            if (j === 0)
                return 1;
            if (h === 0)
                return -1;
            for (; j--; )
                if (e[j].Availability.Cost < f && e[j].Availability.Cost !== 0)
                    f = e[j].Availability.Cost;
            for (; h--; )
                if (d[h].Availability.Cost < g && d[h].Availability.Cost !== 0)
                    g = d[h].Availability.Cost;
            f < g && (l = -1);
            f > g && (l = 1);
            l === 0 && (l = Math.random() < 0.5 ? -1 : 1);
            !b && l !== 0 && (l *= -1);
            return l
        })
    }
    ;
    a.sortByName = function(a, b) {
        return a.sort(function(a, c) {
            var e = a.OperatorName
              , d = 0
              , d = [e, c.OperatorName].sort()[0] == e ? -1 : 1;
            !b && d !== 0 && (d *= -1);
            return d
        })
    }
    ;
    a.sortByLocation = function(a, b) {
        return a.sort(function(a, c) {
            var e = a.Location
              , d = c.Location
              , f = [e, d].sort()
              , g = 0;
            f[0] == e && e != d && (g = -1);
            f[0] == d && e != d && (g = 1);
            g === 0 && (g = Math.random() < 0.5 ? -1 : 1);
            !b && g !== 0 && (g *= -1);
            return g
        })
    }
    ;
    a.hasAvailableRooms = function(a) {
        if (typeof a.PackageID != "undefined" && typeof a.IsAvailable == "boolean")
            return a.IsAvailable;
        if (typeof a.Items == "undefined")
            return 0;
        if (a.Items.length === 0)
            return 0;
        for (var b = 0, c = 0; c < a.Items.length; c++)
            a.Items[c].Availability.IsAvailable && (b += 1);
        return b > 0 ? 1 : 0
    }
    ;
    a.sortByInstantConf = function(b, c) {
        return b.sort(function(b, e) {
            var d = a.hasAvailableRooms(b)
              , f = a.hasAvailableRooms(e)
              , g = b.IsGoldMedal
              , j = e.IsGoldMedal
              , d = f - d;
            if (d !== 0)
                return d;
            g && !j && (d = -1);
            !g && j && (d = 1);
            if (!g && !j || g && j)
                d = Math.random() < 0.5 ? -1 : 1;
            !c && d !== 0 && (d *= -1);
            return d
        })
    }
    ;
    a.sortByHotDeals = function(a, b) {
        return a.sort(function(a, c) {
            for (var e = !1, d = !1, f, g = 0, j = a.Items.length; g < j; g++)
                if (a.Items[g].Availability.Specials.length > 0) {
                    e = !0;
                    break
                }
            g = 0;
            for (j = c.Items.length; g < j; g++)
                if (c.Items[g].Availability.Specials.length > 0) {
                    d = !0;
                    break
                }
            e && !d && (f = -1);
            !e && d && (f = 1);
            if (!e && !d || e && d)
                f = Math.random() < 0.5 ? -1 : 1;
            !b && f !== 0 && (f *= -1);
            return f
        })
    }
    ;
    a.sortByLastMinute = function(a, c) {
        return a.sort(function(a, e) {
            for (var d = !1, f = !1, g, j = 0, h = a.Items.length; j < h; j++)
                b.util.each(a.Items[j].Availability.Specials, function(b) {
                    if (a.Items[j].Availability.Specials[b].IsLastMinute)
                        return d = !0,
                        !1
                });
            for (var l = 0, h = e.Items.length; l < h; l++)
                b.util.each(e.Items[l].Availability.Specials, function(a) {
                    if (e.Items[l].Availability.Specials[a].IsLastMinute)
                        return f = !0,
                        !1
                });
            d && !f && (g = -1);
            !d && f && (g = 1);
            if (!d && !f || d && f)
                g = Math.random() < 0.5 ? -1 : 1;
            !c && g !== 0 && (g *= -1);
            return g
        })
    }
    ;
    a.sortByCampaign = function(a) {
        return a.sort(function(a, b) {
            var c = parseInt(a.CampaignSortOrder, 10)
              , e = parseInt(b.CampaignSortOrder, 10)
              , d = -1;
            isNaN(c) && !isNaN(e) && (d = 1);
            !isNaN(c) && isNaN(e) && (d = -1);
            c < e && (d = -1);
            c > e && (d = 1);
            c == e && (d = Math.random() < 0.5 ? -1 : 1);
            return d
        })
    }
    ;
    a.sortByPropertyType = function(a) {
        return a.sort(function() {})
    }
    ;
    a.filterData = function(b, c, e, d) {

        // if(d == "packages") {
        //     console.log('filterDataPackages');
        // } else {
        //     console.log('filterDataStandard');
        // }


        return d == "packages" ? a.filterDataPackages(b, c, e, d) : a.filterDataStandard(b, c, e, d)
    }
    ;
    a.filterDataPackages = function(a, b, c) {
        console.log('filterDataPackages')
        return c
    }
    ;
    a.filterDataStandard = function(b, c, e, d) {

        var f, g = [],
        j = b.find("div.refineTools"),
        b = j.find("div.nameFilter input").val(),
        h = j.find("div.maxPrice input").val().replace(/[^0-9]/g,""),
        l = j.find("div.locationFilter select").val(),
        m = j.find("div.accommTypes select").val(),
        k = j.find("div.tourTypes select").val(),
        n = j.find("div.facilities select").val();


        console.log('>>' + l + '<<');

        var o, r, p, w, q, j = !1;
        c.lastMinuteMode !== null && (j = !0);
        d != "accom" && (m = n = "",
        j = !1);
        d != "tours" && d != "events" && (k = "");
        var v = function(a, b) {
            var c = parseInt(b, 10)
              , e = 100000000001;
            if (!isNaN(c)) {
                for (var d = 0, f = a.Items.length; d < f; d++)
                    if (a.Items[d].Availability.Cost < e && a.Items[d].Availability.Cost !== 0)
                        e = a.Items[d].Availability.Cost;
                if (e <= c)
                    return !0;
                return !1
            }
            return !0
        }
          , Q = function(a, b) {
            if (typeof a.Locations == "undefined")
                return !1;
            for (var c = 0, e = a.Locations.length; c < e; c++)
                if (a.Locations[c].Description == b)
                    return !0;
            return !1
        }
          , R = function(a, b) {
            for (var c = 0, e = a.TypeGrouping.length; c < e; c++)
                if (a.TypeGrouping[c] == b)
                    return !0;
            return !1
        }
          , S = function(a, b) {
            for (var c = 0, e = a.Items.length; c < e; c++)
                for (var d = a.Items[c], f = 0, g = d.TourTypes.length; f < g; f++)
                    if (d.TourTypes[f].toLowerCase() == b.toLowerCase())
                        return !0;
            return !1
        }
          , T = function(a, b) {
            var c = a.Facilities, e;
            if (typeof c == "undefined")
                return !1;
            for (var d = 0, f = c.length; d < f; d++)
                if (e = c[d].FacilityId,
                e === b)
                    return !0;
            return !1
        }
          , U = function(a) {
            var a = a.Items, b, c = a.length, e = !1;
            for (b = 0; b < c; b++)
                if (a[b].Availability.HasLastMinute)
                    for (var d = a[b].Availability.Days, f = d.length; f--; )
                        if (d[f].IsAvailable) {
                            e = !0;
                            break
                        }
            return e
        }
        ;

        f = function(a) {
            for (var b = 0, c = a.Items.length; c--; )
                b = Math.max(b, a.Items[c].Availability.Cost);
            if (b === 0)
                return !1;
            return !0
        }
        ;

        c.limitLocations !== null && c.limitLocations.length > 0 && (e = a.limitLocations(c, e));

        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        console.log(e);
        console.log(f());

        if (d == "accom" && !c.showAllAccom || !c.showAllTours) {
            //TODO Katarapko bug
            // console.log(e);
            c = [];
            d = 0;
            for (o = e.length; d < o; d++)
                // console.log(f(e[d]));
                // console.log(e[d]);
                f(e[d]) && c.push(e[d]);
            e = c
        }
        f = 0;

        for (c = e.length; f < c; f++)
            d = o = r = p = w = q = void 0,
            tourTypesPass = !1,
            d = b !== "" ? e[f].OperatorName.toLowerCase().indexOf(b.toLowerCase()) != -1 ? !0 : !1 : !0,
            o = h !== "" ? v(e[f], h) : !0,
            r = l !== "" ? Q(e[f], l) : !0,
            p = m !== "" ? R(e[f], m) : !0,
            w = n !== "" ? T(e[f], parseInt(n, 10)) : !0,
            q = j !== !1 ? U(e[f]) : !0,
            tourTypesPass = k != "" ? S(e[f], k) : !0,
            d && o && r && p && w && q && tourTypesPass && g.push(e[f]);
        return g
    }
    ;
    a.limitLocations = function(a, c) {
        console.log('hsf')
        for (var e = [], d = b.util.exists, f = a.limitLocations.join(" ").toLowerCase(), g = 0, j = c.length; g < j; g++) {
            var h = c[g];
            if (d(h.Locations))
                for (var l = 0, m = c.length; l < m; l++) {
                    var k = h.Locations[l];
                    if (d(k) && d(k.Description) && f.indexOf(k.Description.toLowerCase()) !== -1) {
                        e.push(c[g]);
                        break
                    }
                }
        }
        return e
    }
    ;
    a.fetchVCTypes = function(a) {
        console.log('fetchVCTypes')
        var c = b.urls.endpoints.getVcCategories() + "?q=" + a.vcID
          , e = /(\s{2,})/g
          , f = /(^\s+|\s+$)/g
          , g = b.util.exists(a.treatPrimaryTypeAsCategory) && a.treatPrimaryTypeAsCategory;
        d.getJSON(c, function(b) {
            if (typeof b.Categories != "undefined") {
                n = {};
                for (var c = 0, d = b.Categories.length; c < d; c++) {
                    var j = b.Categories[c].CategoryName.replace(e, "").replace(f, "");
                    if (j != "Accommodation" && j != "Tours" && j != "Events" && j != "Car Hire" && j != "Packages" || g)
                        n[b.Categories[c].CategoryId] = j
                }
                a.categories = n
            }
        })
    }
    ;
    a.fetchVCBusinessGroupings = function(c) {
        var e = b.urls.endpoints.getVcBusinessTypes() + "?q=" + c.vcID;
        d.getJSON(e, function(b) {
            c.businessGroupings = {
                Groupings: a.convertSjpGroupingsToGroupings(b, c)
            }
        })
    }
    ;
    a.convertSjpGroupingsToGroupings = function(a) {
        var b = /(\s{2,})/g
          , c = /(^\s+|\s+$)/g;
        if (typeof a.BusinessTypes != "undefined") {
            vcBusinessTypes = {};
            for (var e = 0, d = a.BusinessTypes.length; e < d; e++) {
                var f = a.BusinessTypes[e]
                  , g = f.Description.replace(b, "").replace(c, "");
                vcBusinessTypes[f.BId] = g
            }
            return vcBusinessTypes
        }
        return {}
    }
    ;
    a.fetchVCLocations = function(a) {
        console.log('fetchVCLocations')
        var c = b.urls.endpoints.getVcLocations() + "?q=" + a.vcID;
        d.getJSON(c, function(b) {
            var c = b.Locations;
            console.log(c);
            console.log(a.limitLocations);


            if (a.limitLocations !== null && a.limitLocations.length > 0)
                for (var e = a.limitLocations.join(" ").toLowerCase(), c = [], d = 0, f = b.Locations.length; d < f; d++)
                    e.indexOf(b.Locations[d].Description.toLowerCase()) != -1 && c.push(b.Locations[d]);
            o.locations = c || []
        })
    }
    ;
    a.fetchAcommTypes = function(a) {
        a = b.urls.endpoints.beTypes() + "?q=" + a.vcID;
        d.getJSON(a, function(a) {
            o.types = a.Types || []
        })
    }
    ;
    a.fetchTourTypes = function(a) {
        a = b.urls.endpoints.getToursAttributes() + "?q=" + a.vcID;
        d.getJSON(a, function(a) {
            o.tourTypes = a.types || []
        })
    }
    ;
    a.fetchFacilities = function(a) {
        a = b.urls.endpoints.getVcFacilities() + "?q=" + a.vcID + "&FacilityTypeId=2";
        d.getJSON(a, function(a) {
            o.facilities = a.Facilities || []
        })
    }
    ;
    b.gadget.region.getStashedData = function(a) {
        return m[a]
    }
    ;
    b.gadget.region.filterData = function(b, c, e, d) {
        return a.filterData(b, c, e, d)
    }
    ;
    b.gadget.region.buildView = function(b, c, e, d) {
        a.buildView(b, c, e, d)
    }
    ;
    b.gadget.region.getSpecialValues = function(a) {
        var c = 0
          , e = 0
          , d = parseInt(b.gadget.search.userState().period)
          , f = Number.MAX_VALUE;
        b.util.each(a.Items, function(a, g) {
            b.util.each(g.Availability.AvailableSpecials, function(a, b) {
                b.Variables[0] > d && b.Variables[0] < f && (f = b.Variables[0])
            });
            b.util.each(g.Availability.AvailableSpecials, function(a, b) {
                c = c == 1 ? 1 : -1;
                if (b.IsLastMinute)
                    return e = e == 1 ? 1 : -1,
                    !1
            });
            b.util.each(g.Availability.Specials, function(a, b) {
                c = 1;
                if (b.IsLastMinute)
                    return e = 1,
                    !1
            });
            if (c == 1 && e == 1)
                return !1
        });
        return {
            hasSpecial: c,
            hasLastMinute: e,
            minimumNights: d,
            maximumNights: f
        }
    }
    ;
    b.gadget.region.getSpecialsElement = function(a) {
        return {
            "div.specials": function() {
                var c = []
                  , e = []
                  , f = b.gadget.region.getSpecialValues(a)
                  , g = f.hasSpecial
                  , j = f.hasLastMinute
                  , l = f.maximumNights;
                g != 0 && (c[c.length] = g == -1 ? "inactive" : "active");
                j && (c[c.length] = j == -1 ? "LM inactive" : "LM active");
                for (f = 0; f < c.length; f++)
                    e[e.length] = {
                        div: [{
                            _attr: {
                                "class": "special " + c[f],
                                title: "<div>" + h.BE.gadget.region.text.specials[c[f]] + "</div>"
                            },
                            _events: {
                                click: function() {
                                    var a = function() {
                                        l != Number.MAX_VALUE && parseInt(d("div.period select").val()) != l && d("div.period select").val(l).trigger("change")
                                    }
                                      , b = function(a, b) {
                                        for (var c = /[\n\t\r]/g, e = " " + b + " ", d = 0, f = a.length; d < f; d++)
                                            if ((" " + a[d].className + " ").replace(c, " ").indexOf(e) > -1)
                                                return !0;
                                        return !1
                                    }
                                      , c = []
                                      , e = d(this).closest("div.region-gadget").find("div.view-choice > a.current");
                                    b(e, "price") ? (a(),
                                    c = d(this).closest("tr").find("td.total a")) : b(e, "list") ? (a(),
                                    c = d(this).closest("div.list-item").find("div.fromPrice a")) : b(e, "map") && (c = d(this).closest("div.map-sidebar-item").find("div.name span"));
                                    c.length > 0 && c[0].click()
                                }
                            }
                        }]
                    };
                return e
            }()
        }
    }
})(window);
(function(h) {
    h.BE.gadget.region.defaults = {
        vcID: null ,
        webID: null ,
        locationID: null ,
        showList: !0,
        showMap: !0,
        embedSearch: !0,
        mapsKey: "",
        showRefineTools: !0,
        collapseRefineTools: !0,
        refineToolsLocation: null ,
        itemDetailPageURL: "/product/detail.html",
        customMapIcons: null ,
        interactiveMapMode: !1,
        applyBoundsAlgorithm: !0,
        interactiveMapUser: !1,
        specificTypes: null ,
        hideCategories: null ,
        lastMinuteMode: null ,
        vcLocations: null ,
        thumbsInGrid: !0,
        defaultSort: null ,
        showLocationFilter: !0,
        showAccomTypeFilter: !0,
        showFacilitiesFilter: !0,
        showTourTypesFilter: !0,
        campaignID: null ,
        limitLocations: null ,
        advancedPriceView: null ,
        showLegend: !1,
        showAllAccom: !1,
        listAllMode: !1,
        showRoomDetails: !1,
        forceAccomType: null ,
        forceTourType: null ,
        bookingStatus: null ,
        showQuantity: null ,
        showPeriod: null ,
        showAllTours: !1,
        showAllEvents: !1,
        descriptionHover: !0,
        defaultProductType: null ,
        googleMapsKey: null ,
        googleMapsKeyGlobal: !1
    }
})(window);
(function(h) {
    h = h.BE.gadget.region.text = {};
    h.propertyName = "Best Rates";
    h.headerTitle = "Description";
    h.total = "Total";
    h.viewLabel = "View: ";
    h.viewPrices = "Prices";
    h.viewList = "Details";
    h.viewMap = "Map";
    h.quantity = "Quantity";
    h.bookNow = "Book Now";
    h.requestNow = "Request Now";
    h.select = "Select";
    h.listDescShowMore = "show more";
    h.refineByName = "Find by name ";
    h.refineSortBy = "Sort by ";
    h.sortOrder = "Order ";
    h.sortNormal = "Normal";
    h.sortReverse = "Reverse";
    h.maxPrice = "Max Price";
    h.locationFilter = "Locations";
    h.locationsAll = "--- All ---";
    h.StatesAll = "--- All ---";
    h.accommTypes = "Accommodation Types";
    h.showHideRefine = "Refine Results >>";
    h.advSearch = "Advanced Search";
    h.facilities = "Facilities";
    h.changeDates = "Change Dates";
    h.viewDetails = "View Details";
    h.hideDetails = "Hide Details";
    h.tourTypes = "Tour Types";
    h.tourTypesAll = "--- All ---";
    h.legendInstant = "Instantly Confirmed";
    h.legendRequest = "On Request";
    h.eventStart = "Start Date";
    h.eventEnd = "Finish Date";
    h.types = {
        accom: "Accommodation",
        tours: "Tours",
        events: "Events",
        carhire: "Car Hire"
    };
    h.specials = {
        active: "Specials Available",
        "LM active": "Last Minute Rates Available",
        inactive: "Specials Available for dates near your stay",
        "LM inactive": "Last Minute Rates Available for dates near your stay"
    }
})(window);
(function(h) {
    h.BE.gadget.region.elements = {};
    var d = h.wisDOM
      , b = d.event.publish
      , a = h.BE.gadget.region.elements
      , k = h.BE.gadget.region.text
      , f = function() {
        var a = d(this)
          , e = a.attr("rel")
          , f = a.parent();
        b("region.view.change", this, e);
        f.find("a.price").removeClass("current");
        f.find("a.list").removeClass("current");
        f.find("a.map").removeClass("current");
        a.addClass("current")
    }
    ;
    a.viewChoice = function(a) {
        var b = {
            "div.view-choice": {
                "span.label": {
                    span: k.viewLabel
                },
                "a.price": {
                    span: k.viewPrices,
                    _attr: {
                        rel: "price"
                    },
                    _events: {
                        click: f
                    }
                }
            }
        };
        a.showList && (b["div.view-choice"]["a.list"] = {
            span: k.viewList,
            _attr: {
                rel: "list"
            },
            _events: {
                click: f
            }
        });
        a.showMap && (b["div.view-choice"]["a.map"] = {
            span: k.viewMap,
            _attr: {
                rel: "map"
            },
            _events: {
                click: f
            }
        });
        return b
    }
    ;
    a.legend = function(a) {
        a = a.showLegend;
        return {
            "div.legend": {
                "div.instant": {
                    "span.blob": "",
                    "": " ",
                    "span.text": typeof a.instant != "undefined" ? a.instant : k.legendInstant
                },
                "div.request": {
                    "span.blob": "",
                    "": " ",
                    "span.text": typeof a.request != "undefined" ? a.request : k.legendRequest
                }
            }
        }
    }
})(window);
(function(h) {
    var d = h.wisDOM, b = h.BE, a = {}, k;


    k = b.gadget.region.price = {};
    k.build = function(b, c, e, d) {
        return a.buildPriceGrid(b, c, e, d)
    }
    ;
    k.clearAll = function(a) {
        a = a.find("div.prices-grid");
        a.length > 0 && a.find("div").remove()
    }
    ;
    a.buildPriceGrid = function(b, c, e, d) {
        // console.log(d);
        return e == "packages" ? a.buildPriceGridPackage(b, c, e, d) : a.buildPriceGridStandard(b, c, e, d)
    }
    ;
    a.buildPriceGridPackage = function() {}
    ;
    a.buildPriceGridStandard = function(d, c, e, g) {
        var l = h.wisDOM, j = b.gadget.region.text, m;
        // console.log(g);
        if (g.length) {
            if (!b.util.exists(b.gadget.region.list))
                c.thumbsInGrid = !1;
            d.find("div.prices-grid").length === 0 && l({
                "div.prices-grid": {}
            }).addClass("im-grid").appendTo(d);
            d.find("div.prices-grid").find("div." + e).remove();
            m = {};
            m["div." + e + " type-group"] = {
                table: {
                    thead: {
                        tr: [{
                            "td.label": j.propertyName
                        }, {
                            "td.total": j.total
                        }]
                    },
                    tbody: []
                }
            };
            for (var k, o = 0, w = g.length; o < w; o++)
                if (g[o].Items.length > 0) {
                    k = g[o].Items[0].Availability.Days;
                    break
                }
            for (var o = m["div." + e + " type-group"].table.thead.tr, w = k.length, v = b.util.date.names.getDay, p = b.util.date.names.getMonth, q = b.gadget.search.userState().period, r = 0; r < w; r++) {
                var s = k[r].Date
                  , u = v(s.getDay() + 1, !0)
                  , y = s.getDate()
                  , s = p(s.getMonth() + 1, !0)
                  , u = {
                    "td.date": [{
                        "a.day": u
                    }, {
                        "": " "
                    }, {
                        "a.date": y
                    }, {
                        "": " "
                    }, {
                        "a.month": s
                    }]
                };
                if (e == "events" || e == "tours")
                    u["td.date"]._attr = {
                        "class": "date " + e
                    };
                o.push(u)
            }
            k = m["div." + e + " type-group"].table.tbody;
            var w = g.length, E, x, v = b.urls.img.listViewFallback(e), p = b.urls.img.unloadedImg(), u = b.util.exists;
            if (c.advPV.on || c.showRoomDetails && b.util.exists(b.gadget.region.price.advanced))
                k._attr = {
                    "class": "advanced-price-view"
                };
            for (r = 0; r < w; r++)
                if (x = g[r],
                u(x._advViewHeader) && k.push({
                    "tr.grouping-header": {
                        "td.header": {
                            "": x._advViewHeader,
                            _attr: {
                                colSpan: 2
                            }
                        },
                        "td.legend": {
                            div: b.gadget.region.elements.legend(c),
                            _attr: {
                                colSpan: Math.max(q, x.Items[0].Availability.Days.length)
                            }
                        }
                    }
                }),
                E = x.Items.length,
                E !== 0) {
                    r % 20 === 0 && r !== 0 && !c.advPV.on && k.push({
                        "tr.inline-header": o
                    });
                    for (var t = 0, C = 1E16, z, F, B, y = !1, G = function() {
                        for (var a = 0, b = 0; b < E; b++)
                            x.Items[b].Availability.IsAvailable && a++;
                        return a
                    }() == 0, A = 0; A < E; A++)
                        if (B = !1,
                        s = x.Items[A].Availability.Cost,
                        !(e != "tours" && e != "events" && s === 0)) {
                            var y = x.Items[A].Availability.Days
                              , H = 0
                              , I = y.length;
                            c.lastMinuteMode && (I = q);
                            for (H = 0; H < I; H++)
                                y[H].IsAvailable || (B = !0);
                            G ? (y = !1,
                            s < C && s > 0 && (C = s,
                            t = A)) : (y = !0,
                            s < C && B === !1 && (C = s,
                            t = A))
                        }
                    F = x.Items[t];
                    z = F.Availability;
                    E = z.Days.length;
                    if (c.lastMinuteMode !== null && e == "accom")
                        for (s = z.Cost = 0; s < q; s++)
                            z.Cost += z.Days[s].Cost;
                    var K = b.gadget.region.setupBookClick(c, {
                        id: x.OperatorId,
                        name: x.OperatorName,
                        type: e
                    })
                      , t = typeof x.PrimaryImage != "undefined" ? x.PrimaryImage.ThumbnailImage : "";
                    if (t === "" && typeof x.OtherImages != "undefined" && x.OtherImages.length > 0)
                        t = x.OtherImages[0].ThumbnailImage;
                    t === "" && (t = v);
                    C = j.requestNow;
                    if (typeof x.IsGoldMedal != "undefined" && x.IsGoldMedal === !0)
                        C = j.bookNow;
                    var J = b.util.exists(c.showDetailsInline) && c.showDetailsInline;
                    B = Math.ceil(z.Cost).toString();
                    B = B !== "0" ? b.util.currencies.formatShort(B, b.gadget.currencyId) : "Free";
                    s = {
                        "td.property": [b.gadget.region.getSpecialsElement(x), {
                            "a.name": {
                                "": x.OperatorName,
                                _attr: {
                                    href: K
                                }
                            }
                        }, {
                            "span.address": function() {
                                var a = x.Location;
                                if (!b.util.exists(c.showAllLocationsForOperator))
                                    return a;
                                if (b.util.exists(x.Locations) && x.Locations.length > 0 && c.showAllLocationsForOperator) {
                                    for (var e = "", d = 0, f = x.Locations.length; d < f; d++) {
                                        var g = x.Locations[d];
                                        b.util.exists(g.Description) && (e = e + (e == "" ? "" : " / ") + g.Description)
                                    }
                                    e != "" && (a = e)
                                }
                                return a
                            }()
                        }]
                    };
                    C = {
                        "span.book im-pricebutton-label": J ? h.BE.gadget.region.text.viewDetails : C,
                        "": " ",
                        "span.number im-pricebutton-amount": B
                    };
                    B = J ? {
                        rel: "Operator" + x.OperatorId + ":" + x.OperatorId
                    } : {
                        href: K
                    };
                    s = {
                        tr: [s, {
                            "td.total": {
                                a: {
                                    "span.price im-pricebutton": C,
                                    _attr: B,
                                    _events: function() {
                                        if (J)
                                            return {
                                                click: function() {
                                                    a.showDetailsGadgetInline(this, x, e, c, g)
                                                }
                                            };
                                        return {}
                                    }()
                                }
                            }
                        }]
                    };
                    C = s.tr[1]["td.total"].a;
                    c.lastMinuteMode && (C["span.price im-pricebutton"] = {
                        "span.im-pricebutton-label": "Next \u00bb"
                    },
                    C._attr["class"] = "last-minute");
                    if (!y)
                        C["span.price im-pricebutton"] = {
                            "span.im-pricebutton-label": h.BE.gadget.region.text.changeDates
                        },
                        C._attr["class"] = "sold-out",
                        C._attr.href = "javascript://",
                        C._attr.onclick = "javascript:BE.gadget.search.primaryDatePicker.show()";
                    if (c.advPV.on || c.showRoomDetails && b.util.exists(b.gadget.region.price.advanced))
                        s.tr[0]["td.property"].push(function() {
                            var a = []
                              , c = b.gadget.region.getSpecialValues(x)
                              , e = c.hasSpecial
                              , c = c.hasLastMinute;
                            e != 0 && (a[a.length] = e == -1 ? "inactive" : "active");
                            c && (a[a.length] = c == -1 ? "LM inactive" : "LM active");
                            if (a.length > 0) {
                                e = [];
                                for (c = 0; c < a.length; c++)
                                    e[e.length] = {
                                        div: [h.BE.gadget.region.text.specials[a[c]], {
                                            _attr: {
                                                "class": "special " + a[c]
                                            }
                                        }]
                                    };
                                return {
                                    "div.specials-inline": e
                                }
                            }
                            return {
                                "div.room-name": {
                                    "span.name": F.Name,
                                    "span.split": " - ",
                                    "span.guests": "Max guests: " + F.MaxNumberOfGuests
                                }
                            }
                        }()),
                        s.tr[0]["td.property"].push({
                            "div.description": function() {
                                return typeof c.showRoomDetailsInline != "undefined" && c.showRoomDetailsInline == !0 ? {
                                    "a.more OperatorInfoMore": {
                                        "": "",
                                        _events: {
                                            click: function() {
                                                var a = l(this)
                                                  , c = a.parent().find(".OperatorInfo")
                                                  , e = b.util.hasClass(c, "OperatorInfoHidden")
                                                  , d = l(".OperatorInfoVisible");
                                                d.length > 0 && (d.removeClass("OperatorInfoVisible").addClass("OperatorInfoHidden"),
                                                d = d.parent().find(".more"),
                                                d.removeClass("OperatorInfoLess"),
                                                d.addClass("OperatorInfoMore"));
                                                e ? (c.removeClass("OperatorInfoHidden"),
                                                c.addClass("OperatorInfoVisible"),
                                                a.addClass("OperatorInfoLess"),
                                                a.removeClass("OperatorInfoMore")) : (c.addClass("OperatorInfoHidden"),
                                                c.removeClass("OperatorInfoVisible"),
                                                a.removeClass("OperatorInfoLess"),
                                                a.addClass("OperatorInfoMore"))
                                            }
                                        }
                                    },
                                    "div.OperatorInfo OperatorInfoHidden": {
                                        "div.specials-info": function() {
                                            var a = null ;
                                            b.util.each(x.Items, function(c, e) {
                                                if (a != null )
                                                    return !1;
                                                b.util.each(e.Availability.Specials, function(b, c) {
                                                    a = {
                                                        "div.special": {
                                                            "div.name": c.Name,
                                                            "div.description": c.Description
                                                        }
                                                    };
                                                    return !1
                                                });
                                                a == null && b.util.each(e.Availability.AvailableSpecials, function(b, c) {
                                                    a = {
                                                        "div.special": {
                                                            "div.name": c.Name,
                                                            "div.description": c.Description
                                                        }
                                                    };
                                                    return !1
                                                })
                                            });
                                            a == null && (a = {});
                                            return a
                                        }(),
                                        "div.OperatorAddress OperatorItem": {
                                            "span.OperatorItemHeading": "Address",
                                            "div.OperatorItemContent": b.util.stripTags(x.Address)
                                        },
                                        "div.OperatorDescription OperatorItem": {
                                            "span.OperatorItemHeading": "Description",
                                            "div.OperatorItemContent": b.util.stripTags(x.Description)
                                        }
                                    }
                                } : {
                                    span: b.util.stripTags(x.Description).substr(0, 100) + "...",
                                    "": " ",
                                    "a.more": {
                                        "": "More",
                                        _attr: {
                                            href: K
                                        }
                                    }
                                }
                            }()
                        });
                    c.thumbsInGrid === !0 && s.tr[0]["td.property"].splice(0, 0, {
                        "div.thumb": {
                            "img.unloaded": {
                                _attr: {
                                    src: p,
                                    rel: t.replace(/^http:/, "")
                                }
                            }
                        }
                    });
                    var M = "even";
                    r % 2 === 0 && (M = "odd");
                    typeof x.IsGoldMedal != "undefined" && x.IsGoldMedal === !0 && (M += " instant-confirmation");
                    b.util.each(x.Items, function(a, c) {
                        var e = !1;
                        b.util.exists(c.Availability.Specials) && c.Availability.Specials.length > 0 && (M += " has-specials",
                        e = !0);
                        return !e
                    });
                    b.util.each(x.Items, function(a, c) {
                        var e = !1;
                        b.util.each(c.Availability.Specials, function(a, b) {
                            b.IsLastMinute && (M += " has-last-minute",
                            e = !0);
                            return !e
                        });
                        return !e
                    });
                    c.campaignID !== null && typeof x.CampaignLevel != "undefined" && (M += " " + x.CampaignLevel.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s/g, "-").replace(/^[0-9]/, ""));
                    s.tr._attr = {
                        "class": M,
                        id: "Operator" + x.OperatorId
                    };
                    s.tr._events = {
                        mouseover: function() {
                            this.className += " hover"
                        },
                        mouseout: function() {
                            this.className = this.className.replace(/\shover/, "")
                        }
                    };
                    if (x.StarRating)
                        t = x.IsAAARated ? "aaa" : "self",
                        C = s.tr[1]["td.total"].a,
                        C[""] = " ",
                        C["span.type_" + t + " rating_" + x.StarRating.toString().replace(/\./, "_")] = {
                            "span.text": x.StarRating
                        };
                    t = 0;
                    if (e == "tours" || e == "events") {
                        B = x.Items;
                        C = null ;
                        t = 2;
                        G = 0;
                        for (H = B.length; G < H; G++)
                            if (I = B[G],
                            typeof I.Availability != "undefined" && typeof I.Availability.NextAvailable != "undefined")
                                if (C == null )
                                    C = I.Availability.NextAvailable;
                                else if (I.Availability.NextAvailable < C)
                                    C = I.Availability.NextAvailable;
                        B = {
                            td: {}
                        };
                        C != null ? (C = [{
                            label: "Next Available"
                        }, {
                            "": " "
                        }, {
                            "span.day": b.util.date.names.getDay(C.getDay() + 1)
                        }, {
                            "": ", "
                        }, {
                            "span.date": C.getDate()
                        }, {
                            "": " "
                        }, {
                            "span.month": b.util.date.names.getMonth(C.getMonth() + 1)
                        }, {
                            "": " "
                        }, {
                            "span.year": C.getFullYear()
                        }],
                        y && (C = [{
                            label: "Available"
                        }]),
                        B = {
                            td: {
                                span: C,
                                _attr: {
                                    "class": "price tour-date"
                                }
                            }
                        }) : B = {
                            td: {
                                span: "N/A",
                                _attr: {
                                    "class": "price sold"
                                }
                            }
                        };
                        s.tr.push(B)
                    } else
                        for (A = 0; A < E; A++) {
                            t += 1;
                            y = function() {
                                var a = z.Days[A];
                                return a ? a.IsAvailable ? a.Cost == 0 ? {
                                    td: {
                                        span: "FREE",
                                        _attr: {
                                            "class": "price free"
                                        }
                                    }
                                } : {
                                    td: {
                                        span: b.util.currencies.formatShort(Math.ceil(a.Cost), b.gadget.currencyId),
                                        _attr: {
                                            "class": "price"
                                        }
                                    }
                                } : {
                                    td: {
                                        span: "SOLD",
                                        _attr: {
                                            "class": "price sold"
                                        }
                                    }
                                } : {
                                    td: {
                                        span: "N/A",
                                        _attr: {
                                            "class": "price"
                                        }
                                    }
                                }
                            }();
                            c.lastMinuteMode && A < q && (y.td._attr["class"] += " highlight");
                            if (!z.Days[A].IsAvailable)
                                y.td._attr["class"] += " sold",
                                y.td.span = c.bookingStatus === null ? "SOLD" : c.bookingStatus;
                            s.tr.push(y)
                        }
                    k.push(s);
                    if (J)
                        y = {
                            "tr.operatorDetails donotshow": [{
                                "td.odContainer": {
                                    _attr: {
                                        colspan: 3 + t
                                    }
                                }
                            }]
                        },
                        y["tr.operatorDetails donotshow"]._attr = {
                            id: "Operator" + x.OperatorId + "Details",
                            rel: x.OperatorId
                        },
                        k.push(y)
                }
            d.find("div.prices-grid").append(m);
            if (c.thumbsInGrid === !0) {
                var P = b.gadget.region.list;
                P.bindScroll(d.find("div.prices-grid div." + e), "price-" + e);
                l(function() {
                    P.checkImages("price-" + e)
                }, 125)
            }
            return !0
        }
    }
    ;
    a.type = "start";
    a.showDetailsGadgetInline = function(f, c, e, g, l) {
        var c = d(f).attr("rel").split(":")
          , f = "." + e + " #" + c[0] + "Details td"
          , j = c[1]
          , c = {
            productIDs: [j, e],
            vcID: g.vcID,
            ignoreSubscriptions: !0,
            descriptionHover: !0,
            showQuantity: g.showQuantity
        };
        if (b.util.exists(g.showAllTours))
            c.showAllTours = g.showAllTours;
        if (b.util.exists(g.showAllAccom))
            c.showAllAccom = g.showAllAccom;
        if (b.util.exists(g.showAllEvents))
            c.showAllEvents = g.showAllEvents;
        if (b.util.exists(g.showHoverInline))
            c.showHoverInline = g.showHoverInline;
        if (b.util.exists(g.bookingStatus))
            c.bookingStatus = g.bookingStatus;
        if (b.util.exists(g.stageId) && g.stageId > 0)
            c.stageId = g.stageId;
        if (b.util.exists(g.campaignID) && g.campaignID > 0)
            c.campaignID = g.campaignID;
        if (b.util.exists(g.collapseToursMode) && g.collapseToursMode > 0)
            c.collapseToursMode = g.collapseToursMode;
        if (b.util.exists(g.restrictedButtonText))
            c.restrictedButtonText = g.restrictedButtonText;
        var g = d("div.priceGrid")
          , k = g.parent().parent()
          , n = k.attr("rel")
          , o = d("#Operator" + n);
        o.find("span.price span.book").html(h.BE.gadget.region.text.viewDetails);
        o.removeClass("highlight");
        k.addClass("donotshow");
        g.remove();
        if (!(a.type !== "start" && a.type === e && j === n)) {
            a.type = e;
            for (k = 0; k < l.length; k++)
                if (g = l[k],
                g.OperatorId == j) {
                    l = d("#Operator" + j);
                    l.find("span.price span.book").html(h.BE.gadget.region.text.hideDetails);
                    l.addClass("highlight");
                    d(f).parent().removeClass("donotshow");
                    b.gadget.details.resetDataStore();
                    b.gadget.details.getDetailData(d(f), c);
                    b.gadget.details.buildGridStandard(d(f), c, e, g);
                    break
                }
        }
    }
})(window);
(function(h) {
    var d = h.wisDOM
      , b = h.BE
      , a = {}
      , k = function(b, c, e) {
        b = d(b);
        if (b.length === 0)
            return !1;
        a.optionStore = c;
        a._init(b, c);
        e instanceof Function && e();
        return b
    }
    ;
    b.gadget.search = function(a, c) {
        var e = d(a);
        if (e.length === 0)
            return !1;
        c = b.util.mergeObjects(c, b.gadget.search.defaults);
        if (!c.vcID && !c.webID)
            return !1;
        b.gadget.init(c, function() {
            k(a, c)
        });
        return e
    }
    ;
    b.gadget.search.embed = function(a) {
        if (!a)
            return !1;
        var c = d({
            "div.embedded-search": ""
        }), e = {
            vcID: a.vcID,
            searchGoesTo: {
                newPage: !1
            },
            embedded: !0,
            disabledTypes: a.disabledTypes
        }, g;
        for (g in a)
            a.hasOwnProperty(g) && g != "showRefineTools" && (e[g] = a[g]);
        e = b.util.mergeObjects(e, b.gadget.search.defaults);
        if (!a.vcID && !a.webID)
            return !1;
        return c = k(c, e)
    }
    ;
    b.gadget.search.userState = function(b, c) {
        return a.readCurrentUserState(b, c)
    }
    ;
    b.gadget.search.userCookie = function() {
        return a.readUserCookie()
    }
    ;
    b.gadget.search.subscribeToChanges = function(a) {
        if (typeof a != "function")
            return !1;
        for (var b = d.event.subscribe, e = ["datepicker", "period", "adults", "children", "infants", "types", "concessions", "students", "observers", "family", "currencyId"], g = e.length; g--; )
            b("search." + e[g] + ".change", a)
    }
    ;
    b.gadget.search.lastMinuteMode = function() {
        var f = d("div.search-gadget.BE")
          , c = d("");
        c.push(f.find("input"));
        c.push(f.find("select"));
        f.find("div.product").css({
            display: "none"
        });
        var c = {}
          , e = new Date
          , g = "";
        g += b.util.date.names.getDay(e.getDay() + 1, !0) + " ";
        g += e.getDate().toString().length == 1 ? "0" + e.getDate() + "/" : e.getDate() + "/";
        g += (e.getMonth() + 1).toString().length == 1 ? "0" + (e.getMonth() + 1) + "/" : e.getMonth() + 1 + "/";
        g += e.getFullYear();
        c.date = g;
        c.product = "accom";
        a.setCurrentUserState(f, c)
    }
    ;
    b.gadget.search.setUserState = function(b, c) {
        var e = d("div.search-gadget.BE");
        a.setCurrentUserState(e, b, typeof c == "undefined" ? !0 : c)
    }
    ;
    a._init = function(f, c) {
        b.gadget.search.options = c;
        a.translateCookieToQueryString(b.gadget.search.userCookie());
        f.empty();
        var e = b.gadget.search.elements, g = d({
            "div.search-gadget BE": ""
        }), h;
        h = [e.products(c.disabledTypes), e.datepicker];
        var j = [e.period(c.noPeriod), e.adults(c.noAdults), e.children(c.noChildren), e.infants(c.noInfants)]
          , k = [e.period(c.noPeriod)]
          , n = [e.concessions(c.noConcessions), e.students(c.noStudents), e.observers(c.noObservers)]
          , o = [e.concessions(c.noConcessions), e.students(c.noStudents), e.observers(c.noObservers)]
          , w = [e.concessions(c.noConcessions), e.students(c.noStudents), e.observers(c.noObservers)]
          , v = []
          , v = c.showCurrencySelector === !0 ? [e.currency(), e.button, e.loading] : [e.button, e.loading];
        if (c.productIDs) {
            e = c.productIDs[1].toLowerCase();
            isNaN(parseInt(e, 10)) || (e = b.text.typeIDToString[e]);
            switch (e) {
            case "carhire":
                h = h.concat(k);
                break;
            case "tours":
                h = h.concat(j, o);
                break;
            case "events":
                h = h.concat(j, n);
                break;
            case "packages":
                h = h.concat(j, w);
                break;
            default:
                h = h.concat(j)
            }
            h.push(v)
        } else
            h = h.concat(j, v);
        if (c.type == "packages")
            for (v = 0; v < h.length; v++)
                if (h[v]["div.period"] != null ) {
                    h[v] = {};
                    break
                }
        if (typeof c.operatorConfig != "undefined" && typeof c.operatorConfig.PaxOptions != "undefined")
            for (v = 0; v < h.length; v++) {
                var j = h[v], p;
                for (p in c.operatorConfig.PaxOptions)
                    c.operatorConfig.PaxOptions.hasOwnProperty(p) && (k = p.toLowerCase(),
                    n = c.operatorConfig.PaxOptions[p],
                    typeof j["div." + k] != "undefined" && !n && (h[v]["div." + k] = {}))
            }
        g.append(h);
        f.append(g);
        (!b.util.exists(c.ignoreSubscriptions) || !c.ignoreSubscriptions) && a.setSubscriptions(c, g);
        c.showRefineTools && (b.gadget.region.buildRefineTools(f, {
            vcID: c.vcID,
            collapseRefineTools: c.collapseRefineTools || !1,
            limitLocations: c.limitLocations || null ,
            enableRegionSearch: c.enableRegionSearch,
            forceRegionLoc: c.forceRegionLoc,
            forceRegionRegion: c.forceRegionRegion,
            forceRegionState: c.forceRegionState,
            defaultRegionLoc: c.defaultRegionLoc,
            defaultRegionRegion: c.defaultRegionRegion,
            defaultRegionState: c.defaultRegionState,
            externalSearch: c.externalSearch
        }, !1),
        f.addClass("refine-tools-search-gadget"));
        p = a.readUserCookie();
        v = typeof c.ignoreSearchCookie != "undefined" ? c.ignoreSearchCookie : !1;
        if (p && !v) {
            if (v = typeof c.crossDomainSearch != "undefined" && c.crossDomainSearch)
                h = a.GetCrossDomainQueryValues(),
                p = a.SetCookieValuesFromQueryStringObject(p, h);
            if (d(".details-gadget.BE").length > 0 && c.productIDs)
                p.product = c.productIDs[1];
            a.setCurrentUserState(g, p, void 0, c);
            v && a.saveUserState(g);
            p.product == "carhire" && g.find("div.period span.label").text(b.gadget.search.text.period.label_CarHire);
            (p.product == "tours" || p.product == "events") && g.find("div.period").css({
                display: "none"
            });
            (p.product == "tours" || p.product == "events") && a.AlterAdultSelectForTours(g, p.product)
        } else
            g.find("div.period select").val(c.period),
            g.find("div.adults select").val(c.adults),
            g.find("div.children select").val(c.children),
            g.find("div.infants select").val(c.infants),
            g.find("div.currencyId select").val(b.gadget.currencyId),
            c.productIDs && (e = c.productIDs[1].toLowerCase(),
            isNaN(parseInt(e, 10)) || (e = b.text.typeIDToString[e],
            (e == "tours" || e == "events") && a.AlterAdultSelectForTours(g, e))),
            c.productIDs && (p = c.productIDs[1].toLowerCase(),
            (p == "tours" || p == "events") && g.find("div.period").css({
                display: "none"
            }));
        c.productIDs && (p = c.productIDs[1].toLowerCase(),
        a.setCurrentUserState(g, {
            product: p
        }));
        c.showPeriod == !1 && g.find("div.period").css({
            display: "none"
        });
        c.accomOnlyMode === !0 && (g.find("div.product").css({
            display: "none"
        }),
        g.find("div.period").css({
            display: ""
        }),
        a.setCurrentUserState(g, {
            product: "accom"
        }));
        c.toursOnlyMode === !0 && (g.find("div.product").css({
            display: "none"
        }),
        g.find("div.period").css({
            display: "none"
        }),
        a.setCurrentUserState(g, {
            product: "tours"
        }));
        c.hybridMode && (g.find("div.product").css({
            display: "none"
        }),
        g.addClass("hasTabs"),
        a.buildHybridTabs(g, c));
        p = b.gadget.search.getMinDate(c.minDaysFromToday);
        v = b.gadget.search.getEndDate(p);
        h = b.util.date.addDays(new Date, c.defaultDaysFromToday);
        j = g.find("div.date span.pseudo");
        if (c.defaultDate)
            h = c.defaultDate,
            typeof c.defaultDate == "string" && (h = b.util.date.parseStr(c.defaultDate)),
            h.getTime() < p.getTime() && (h = p);
        var q = {
            minDate: p,
            defaultDate: h,
            maxDate: v,
            quickJumpNum: 24,
            onUpdate: function(a) {
                d.event.publish("search.datepicker.change", this, a);
                d("body").removeClass("BE-calendar-open")
            }
        };
        if (a.forceDate())
            q.theDefaultDate = d.datePicker.encode(b.util.date.parseStr(b.gadget.search.options.forceDate), "DAY DD/MM/YYYY");
        (!b.util.exists(c.disableDatePicker) || !c.disableDatePicker) && j.datePicker(q);
        j.bind("click", function() {
            d("body").addClass("BE-calendar-open")
        });
        b.gadget.search.primaryDatePicker = {};
        b.gadget.search.primaryDatePicker.show = function() {
            var a = d(".pseudo");
            if (a.length > 0)
                a.val = a.text,
                d.datePicker.show(a, q),
                d(".BE")[0].scrollIntoView()
        }
        ;
        g.parent().find("div.product select").trigger("change");
        g = g.parent().find("div.currencyId select");
        for (p = 0; p < g.length; p++)
            b.util.autoSizeSelect(g[p])
    }
    ;
    b.gadget.search.getMinDate = function(a) {
        return b.util.date.addDays(new Date, a < 0 ? 0 : a)
    }
    ;
    b.gadget.search.getEndDate = function(a) {
        return b.util.date.addDays(a, 740)
    }
    ;
    a.forcePeriod = function() {
        return b.util.exists(b.gadget.search.options) && b.util.exists(b.gadget.search.options.forcePeriod)
    }
    ;
    a.forceDate = function() {
        return b.util.exists(b.gadget.search.options) && b.util.exists(b.gadget.search.options.forceDate)
    }
    ;
    a.GetCrossDomainQueryValues = function() {
        var a = {};
        (function() {
            for (var b, e = /\+/g, d = /([^&=]+)=?([^&]*)/g, l = h.location.search.substring(1); b = d.exec(l); )
                a[decodeURIComponent(b[1].replace(e, " "))] = decodeURIComponent(b[2].replace(e, " "))
        })();
        return a
    }
    ;
    a.SetCookieValuesFromQueryStringObject = function(b, c) {
        for (var e in c)
            if (c.hasOwnProperty(e)) {
                var d = !1, h;
                for (h in b)
                    b.hasOwnProperty(h) && e == h && (b[h] = c[e],
                    d = !0);
                !d && a.isValidSearchType(e) && (b[e] = c[e])
            }
        return b
    }
    ;
    a.isValidSearchType = function() {
        return !0
    }
    ;
    a.translateCookieToQueryString = function(a) {
        var b = "", e;
        for (e in a)
            a.hasOwnProperty(e) && (b += "&" + e + "=" + a[e]);
        return b.slice(1)
    }
    ;
    a.AppendZeroItemToAdults = function(a) {
        d(a.find("div.adults select option")[0])[0].value == "1" && a.find("div.adults select").prepend({
            option: {
                _attr: {
                    value: "0"
                },
                "": "0"
            }
        })
    }
    ;
    a.RemoveZeroItemToAdults = function(a) {
        a = d(a.find("div.adults select option")[0]);
        a[0].value == "0" && a.remove()
    }
    ;
    a.AlterAdultSelectForTours = function(b, c) {
        c == "tours" || c == "events" ? a.AppendZeroItemToAdults(b) : a.RemoveZeroItemToAdults(b)
    }
    ;
    a.setSubscriptions = function(f, c) {
        for (var e = d.event.subscribe, g = d.event.destroy, l = a.saveUserState, j = ["datepicker", "period", "adults", "children", "infants", "concessions", "students", "observers", "types", "family", "currencyId"], k = j.length; k--; )
            g("search." + j[k] + ".change"),
            e("search." + j[k] + ".change", function() {
                l(c)
            });
        e("search.adults.change", function(a) {
            d(this).parents("div.search-gadget").find(".students").length === 0 && parseInt(a, 10) === 0 && parseInt(c.find("div.children select").val(), 10) === 0 && c.find("div.children select").val("1")
        });
        e("search.children.change", function(a) {
            d(this).parents("div.search-gadget").find(".students").length === 0 && parseInt(a, 10) === 0 && parseInt(c.find("div.adults select").val(), 10) === 0 && c.find("div.adults select").val("1")
        });
        g("search.button.click");
        d.event.subscribe("search.button.click", function() {
            if (f.searchNewPage) {
                var b = "";
                typeof f.crossDomainSearch != "undefined" && f.crossDomainSearch && (b = a.translateCookieToQueryString(a.readUserCookie()));
                b = f.searchLocation + encodeURI(b != "" ? "?" + b : "");
                h.location.href = b
            }
        });
        d(h).unbind("focus.searchGadget");
        d(h).bind("focus.searchGadget", function() {
            if (!b.util.exists(a.optionStore) || !b.util.exists(a.optionStore.ignoreSearchCookie) || !a.optionStore.ignoreSearchCookie) {
                var e = a.readUserCookie();
                e && a.setCurrentUserState(c, e)
            }
        });
        g("region.loading.start");
        g("region.loading.end");
        g("search.product.change");
        e("region.loading.start", function() {
            c.addClass("loading")
        });
        e("region.loading.end", function() {
            c.removeClass("loading")
        });
        e("search.product.change", function(e) {
            e == "carhire" ? c.find("div.period span.label").text(b.gadget.search.text.period.label_CarHire) : c.find("div.period span.label").text(b.gadget.search.text.period.label);
            f.showPeriod === !0 ? c.find("div.period").css({
                display: ""
            }) : e == "events" || e == "tours" || e == "packages" ? c.find("div.period").css({
                display: "none"
            }) : f.showPeriod != !1 && c.find("div.period").css({
                display: ""
            });
            (e == "tours" || e == "events") && a.AlterAdultSelectForTours(c, e);
            var g = d("div.region-gadget");
            if (g.length > 0)
                e == "packages" ? (a.previousViewChoice = g.find("div.view-choice a.current"),
                g.find("div.view-choice a.price").css({
                    display: "none"
                }),
                g.find("div.view-choice a.map").css({
                    display: "none"
                }),
                g.find("div.view-choice a.list").trigger("click")) : (g.find("div.view-choice a.price").css({
                    display: ""
                }),
                g.find("div.view-choice a.map").css({
                    display: ""
                }),
                a.previousViewChoice != null && a.previousViewChoice.trigger("click"));
            l(c)
        })
    }
    ;
    a.typesSelect = function(a, c, e) {
        if (a.error === !0)
            return !1;
        var c = c.find("div.types select")
          , a = a.Types
          , d = a.length
          , h = [{
            option: {
                "": b.gadget.search.text.types.all,
                _attr: {
                    value: "ALL"
                }
            }
        }];
        c.empty();
        for (var j = 0; j < d; j++)
            h.push({
                option: {
                    "": a[j],
                    _attr: {
                        value: a[j]
                    }
                }
            });
        c.append(h);
        e && c.val(e.types)
    }
    ;
    a.saveUserState = function(f) {
        var f = a.readCurrentUserState(f)
          , c = d.json.stringify(f);
        d.cookie(b.util.cookieName(), c);
        if (typeof f.currencyId != "undefined")
            b.gadget.currencyId = f.currencyId;
        h.name = c
    }
    ;
    a.readCurrentUserState = function(f, c) {
        var e = typeof f != "undefined" ? f : d("div.search-gadget.BE")
          , g = d("");
        g.push(e.find("input"));
        g.push(e.find("select"));
        g.push(e.find("span.pseudo"));
        if (g.length === 0) {
            var h = b.gadget.search.defaults
              , g = {
                date: function() {
                    var a = b.util.date.addDays(new Date, h.minDaysFromToday);
                    return b.util.date.names.getDay(a.getDay() + 1, !0) + " " + a.getDate() + "/" + (a.getMonth() + 1) + "/" + a.getFullYear()
                }(),
                period: h.period,
                adults: h.adults,
                children: h.children,
                infants: h.infants,
                product: "accom",
                currency: h.currency
            };
            typeof c != "undefined" && typeof c.interactiveMapMode != "undefined" && c.interactiveMapMode && typeof c.interactiveMapUser != "undefined" && c.interactiveMapUser && (g = a.updateSearchValuesFromCookie(g));
            return g
        }
        for (var e = {}, j = g.length, k, n = 0; n < j; n++)
            k = g[n].getAttribute("rel"),
            k !== null && (e[k] = d(g[n]).val() || d(g[n]).text());
        return e
    }
    ;
    a.updateSearchValuesFromCookie = function(b) {
        var c = a.readUserCookie();
        if (c)
            for (var e in c)
                if (c.hasOwnProperty(e))
                    for (var d in b)
                        if (e == d) {
                            b[d] = c[e];
                            break
                        }
        return b
    }
    ;
    a.setCurrentUserState = function(f, c, e) {
        var g = d.json.stringify(a.readCurrentUserState(f));
        if (a.forcePeriod())
            c.period = b.gadget.search.options.forcePeriod;
        for (var h in c)
            if (c.hasOwnProperty(h))
                if (h == "date") {
                    if (a.forceDate())
                        c.date = d.datePicker.encode(b.util.date.parseStr(b.gadget.search.options.forceDate), "DAY DD/MM/YYYY");
                    f.find("div.date span.pseudo").text(c.date)
                } else if (h == "product" && (a.productUserStateExistsInSelect(f, c[h]) || a.setProductToFirstInList(f, h, c)),
                f.find("div." + h + " select").val(c[h]),
                h == "currencyId")
                    b.gadget.currencyId = c[h];
        typeof c.currencyId == "undefined" && f.find("div.currencyId select").val(b.gadget.currencyId);
        c = d.json.stringify(a.readCurrentUserState(f));
        g != c && e !== !1 && d.event.publish("search.datepicker.change", f.find("div.date input"), f.find("div.date input").val())
    }
    ;
    a.productUserStateExistsInSelect = function(a, b) {
        var e = a.find("div.product select option")
          , g = !1;
        if (typeof e != "undefined")
            for (var h = 0, j = e.length; h < j; h++)
                if (d(e[h]).attr("value") == b) {
                    g = !0;
                    break
                }
        return g
    }
    ;
    a.setProductToFirstInList = function(a, b, e) {
        a = a.find("div.product select option");
        typeof a != "undefined" && (a = d(a[0]).attr("value"),
        typeof a != "undefined" && (e[b] = a))
    }
    ;
    a.readUserCookie = function() {
        var a = d.cookie(b.util.cookieName());
        if (a === "")
            a = h.name;
        return a !== "" ? d.json.parse(a) : !1
    }
    ;
    a.buildHybridTabs = function(b, c) {
        var e = c.hybridOptions, g = {
            "div.hybridTabs": []
        }, h = g["div.hybridTabs"], j = function(b) {
            return function(e) {
                a.hybridTabClick.call(this, e, c, b)
            }
        }
        , k;
        for (k in e)
            e.hasOwnProperty(k) && h.push({
                a: {
                    span: e[k].tabName,
                    _attr: {
                        "class": "tab " + k
                    },
                    _events: {
                        click: j(k)
                    }
                }
            });
        b.prepend(g);
        d(b.find("a.tab")[0]).trigger("click")
    }
    ;
    a.hybridTabClick = function(a, c, e) {
        var a = d(this)
          , g = a.parent()
          , h = g.find("a.tab")
          , j = c.hybridOptions[e]
          , e = {
            product: e
        };
        h.removeClass("current");
        a.addClass("current");
        for (var k in j)
            j.hasOwnProperty(k) && k !== "tabName" && k !== "searchLocation" && (e[k] = j[k]);
        if (j.searchLocation)
            c.searchLocation = j.searchLocation;
        b.gadget.search.setUserState(e);
        g.parent().find("div.product select").trigger("change")
    }
})(window);
(function(h) {
    h = h.BE.gadget.search.text = {};
    h.date = {};
    h.period = {};
    h.adults = {};
    h.children = {};
    h.infants = {};
    h.concessions = {};
    h.students = {};
    h.observers = {};
    h.family = {};
    h.types = {};
    h.products = {};
    h.button = {};
    h.stateFilter = {};
    h.loading = "Downloading data, please wait...";
    h.date.title = "Please choose your desired arrival date";
    h.date.label = "Date";
    h.period.title = "Choose a number of nights";
    h.period.label = "Nights";
    h.period.label_CarHire = "Days";
    h.adults.title = "";
    h.adults.label = "Adults";
    h.children.title = "";
    h.children.label = "Children";
    h.infants.title = "";
    h.infants.label = "Infants";
    h.concessions.title = "Valid government concessions";
    h.concessions.label = "Conces.";
    h.students.title = "Students currently in full or part-time study";
    h.students.label = "Students";
    h.observers.title = "Non-participant observers";
    h.observers.label = "Observers";
    h.family.title = "Consists of 2 adults and 2 children";
    h.family.label = "Family";
    h.types.title = "What sort of thing are you searching for?";
    h.types.label = "Type";
    h.types.loading = "Loading types...";
    h.types.all = "-- Show all --";
    h.button.title = "Search for hotels, tours and events";
    h.button.input = "Search";
    h.products.label = "Searching for";
    h.products.title = "What sort of thing are you search for?"
})(window);
(function(h) {
    h.BE.gadget.search.defaults = {
        vcID: null ,
        webID: null ,
        currencyId: null ,
        period: 3,
        adults: 2,
        children: 0,
        infants: 0,
        minDaysFromToday: 0,
        defaultDaysFromToday: 0,
        searchLocation: "/search/",
        searchNewPage: !0,
        accomOnlyMode: !1,
        toursOnlyMode: !1,
        disabledTypes: null ,
        showRefineTools: !1,
        hybridMode: !1,
        hybridOptions: {},
        defaultDate: null ,
        enableRegionSearch: !1,
        forceRegionLoc: null ,
        forceRegionRegion: null ,
        forceRegionState: null ,
        showPeriod: null ,
        showQuantity: null
    }
})(window);
(function(h) {
    h.BE.gadget.search.elements = {};
    var d = h.wisDOM.event.publish
      , b = h.BE.gadget.search.elements
      , a = h.BE.gadget.search.text
      , k = function(a, b, e, g) {
        for (var h = {
            select: []
        }, j = h.select; a <= b; a++)
            j.push({
                option: {
                    _attr: {
                        value: a
                    },
                    "": a
                }
            });
        j._events = {
            change: function() {
                d(e, this, this.value)
            }
        };
        j._attr = {
            rel: g
        };
        return h
    }
    ;
    b.datepicker = {
        "div.date": {
            _attr: {
                title: a.date.title
            },
            "span.label": {
                span: a.date.label
            },
            "span.input": {
                "span.pseudo": {
                    _attr: {
                        rel: "date"
                    }
                }
            }
        }
    };
    b.period = function(b) {
        typeof b == "undefined" && (b = 30);
        return {
            "div.period": {
                _attr: {
                    title: a.period.title
                },
                "span.label": {
                    span: a.period.label
                },
                "span.input": k(1, b, "search.period.change", "period")
            }
        }
    }
    ;
    b.adults = function(b) {
        typeof b == "undefined" && (b = 45);
        return {
            "div.adults": {
                _attr: {
                    title: a.adults.title
                },
                "span.label": {
                    span: a.adults.label
                },
                "span.input": k(0, b, "search.adults.change", "adults")
            }
        }
    }
    ;
    b.children = function(b) {
        typeof b == "undefined" && (b = 45);
        return {
            "div.children": {
                _attr: {
                    title: a.children.title
                },
                "span.label": {
                    span: a.children.label
                },
                "span.input": k(0, b, "search.children.change", "children")
            }
        }
    }
    ;
    b.infants = function(b) {
        typeof b == "undefined" && (b = 45);
        return {
            "div.infants": {
                _attr: {
                    title: a.infants.title
                },
                "span.label": {
                    span: a.infants.label
                },
                "span.input": k(0, b, "search.infants.change", "infants")
            }
        }
    }
    ;
    b.concessions = function(b) {
        typeof b == "undefined" && (b = 45);
        return {
            "div.concessions": {
                _attr: {
                    title: a.concessions.title
                },
                "span.label": {
                    span: a.concessions.label
                },
                "span.input": k(0, b, "search.concessions.change", "concessions")
            }
        }
    }
    ;
    b.students = function(b) {
        typeof b == "undefined" && (b = 45);
        return {
            "div.students": {
                _attr: {
                    title: a.students.title
                },
                "span.label": {
                    span: a.students.label
                },
                "span.input": k(0, b, "search.students.change", "students")
            }
        }
    }
    ;
    b.observers = function(b) {
        typeof b == "undefined" && (b = 45);
        return {
            "div.observers": {
                _attr: {
                    title: a.observers.title
                },
                "span.label": {
                    span: a.observers.label
                },
                "span.input": k(0, b, "search.observers.change", "observers")
            }
        }
    }
    ;
    b.currency = function() {
        return {
            "div.currencyId": {
                "span.label": {
                    span: "Currency"
                },
                span: function() {
                    for (var a = {
                        select: []
                    }, b = a.select, e = BE.util.currencies.getCurrencies(), g = 0; g < e.length; g++) {
                        var h = e[g];
                        b.push({
                            option: {
                                _attr: {
                                    value: h.CurrencyId
                                },
                                "": h.Name + " (" + h.CurrencyId + ")"
                            }
                        })
                    }
                    b._events = {
                        change: function() {
                            BE.util.autoSizeSelect(this);
                            d("search.currencyId.change", this, this.value)
                        }
                    };
                    b._attr = {
                        rel: "currencyId"
                    };
                    return a
                }()
            }
        }
    }
    ;
    b.types = {
        "div.types": {
            _attr: {
                title: a.types.title
            },
            "span.label": {
                span: a.types.label
            },
            "span.input": {
                select: {
                    option: {
                        "": a.types.loading,
                        _attr: {
                            value: ""
                        }
                    },
                    _events: {
                        change: function() {
                            d("search.types.change", this, this.value)
                        }
                    },
                    _attr: {
                        rel: "types"
                    }
                }
            }
        }
    };
    b.products = function(b) {
        var b = b || null
          , c = b !== null && b.length > 0 ? b.join(".") : "";
        return {
            "div.product": {
                _attr: {
                    title: a.products.title
                },
                "span.label": {
                    span: a.products.label
                },
                "span.input": {
                    select: function(a) {
                        var b = [], f;
                        for (f in a)
                            a.hasOwnProperty(f) && c.indexOf(f) == -1 && b.push({
                                option: {
                                    _attr: {
                                        value: f
                                    },
                                    "": a[f]
                                }
                            });
                        b._events = {
                            change: function() {
                                d("search.product.change", this, this.value)
                            }
                        };
                        b._attr = {
                            rel: "product"
                        };
                        return b
                    }(BE.text.typeLookup)
                }
            }
        }
    }
    ;
    b.button = {
        "div.button": {
            _attr: {
                title: a.button.title
            },
            "span.input": {
                a: {
                    _events: {
                        click: function(a) {
                            d("search.button.click", this, a)
                        }
                    },
                    span: a.button.input
                }
            }
        }
    };
    b.loading = {
        "div.spinner": {
            _attr: {
                title: a.loading
            },
            span: ""
        }
    }
})(window);
(function(h) {
    var d = h.wisDOM, b = h.BE, a = {}, k = d.event.publish, f, c;
    b.gadget.operator = function(c, f) {
        var h = d(c);
        if (h.length === 0)
            return !1;
        b.gadget.init(f, function() {
            a._init(h, f)
        });
        return h
    }
    ;
    b.gadget.operator.switchDetailsTab = function(b, c) {
        d(".details-tab").addClass("HideThis");
        d(".details-tab-" + c).removeClass("HideThis");
        d(".details-tab-button").removeClass("details-tab-button-active");
        d(".details-tab-button").removeClass("details-tab-button-afteractive");
        d(b).parent().addClass("details-tab-button-active");
        d(b).parent().next().addClass("details-tab-button-afteractive");
        a.redraw();
        return !1
    }
    ;
    b.gadget.operator.redraw = function() {
        a.redraw()
    }
    ;
    a._init = function(e, f) {
        d(e).append({
            "div.operator-gadget": {}
        });
        e = e.find("div.operator-gadget");
        d(e.append({
            "div.spinner loading": {
                _attr: {
                    width: "100px",
                    height: "100px"
                },
                span: ""
            }
        }));
        if (!a.requiredInformationSet(f)) {
            var h = a.getQueryStringValues();
            if (typeof h.operator != "undefined")
                f.productID = h.operator;
            if (typeof h.type != "undefined")
                f.type = h.type;
            if (typeof h.q != "undefined")
                f.productID = h.q,
                f.type = "tours";
            if (!a.requiredInformationSet(f) && (h = b.gadget.details.findIDs(f),
            typeof h.length != "undefined" && h.length > 0))
                f.productID = h[0],
                f.type = h[1];
            if (!a.requiredInformationSet(f))
                return a.errorOperatorNotFound(e)
        }
        a.getRequiredSjpInformation(f, function(j, h, l) {
            if (j.Operators.length == 0 || h.length == 0)
                return a.errorOperatorNotFound(e);
            l = (0,
            a.genericItemConversions[f.type])(f, l);
            j = a.buildOperatorPageModel({
                OpInformation: j,
                OpDetailsShort: h,
                OpItems: l
            });
            h = a.getOperatorPageHtml(f, j);
            e.append(h);
            c = {
                latitude: j.latitude,
                longitude: j.longitude,
                name: j.name,
                residentialAddress: j.residentialAddress
            };
            a.renderMap();
            h = d("div.imageContainer");
            if (a.isUsingSlideShow(f))
                a.renderSlideShow(h, f, j);
            else {
                for (var l = [], o = 0, w = j.images.length; o < w; o++)
                    l.push({
                        img: {
                            _attr: {
                                src: j.images[o].FullSizeImage,
                                width: "140px",
                                height: "130px"
                            }
                        }
                    });
                h.append(l)
            }
            a.attachSubscriptions(e, f);
            k("Operator.Render.Complete");
            d(e).find("div.spinner.loading").remove();
            j = {
                vcID: f.vcID,
                type: f.type,
                productID: f.productID
            };
            typeof f.itemDetailsOptions != "undefined" && (j = b.util.mergeObjects(f.itemDetailsOptions, j));
            if (b.util.exists(f.stageId) && f.stageId > 0)
                j.stageId = f.stageId;
            b.gadget.details("#itemGadget", j)
        })
    }
    ;
    a.errorOperatorNotFound = function(a) {
        a.append({
            p: "Unable to load operator."
        });
        d(".spinner.loading").remove();
        return !1
    }
    ;
    a.requiredInformationSet = function(a) {
        return typeof a.type != "undefined" && typeof a.productID != "undefined"
    }
    ;
    a.getQueryStringValues = function() {
        var a = {};
        (function() {
            for (var b, c = /\+/g, d = /([^&=]+)=?([^&]*)/g, f = h.location.search.substring(1); b = d.exec(f); )
                a[decodeURIComponent(b[1].replace(c, " "))] = decodeURIComponent(b[2].replace(c, " "))
        })();
        return a
    }
    ;
    a.getRequiredSjpInformation = function(c, f) {
        var h = "?q=" + c.vcID + "&operators=" + c.productID;
        typeof c.externalSearch != "undefined" && (h += "&ExternalSearch=" + c.externalSearch);
        var j = b.urls.endpoints.getOperatorInformation() + h
          , k = b.urls.endpoints.getOpDetailsShort() + h
          , n = a.itemsEndpoints[c.type] + h;
        d.getJSON(j, function(a) {
            d.getJSON(k, function(b) {
                d.getJSON(n, function(c) {
                    f(a, b, c)
                })
            })
        })
    }
    ;
    a.itemsEndpoints = {
        accom: b.urls.endpoints.beAccomRoomDetails(),
        tours: b.urls.endpoints.getTourOpsDetails(),
        carhire: b.urls.endpoints.getCarHireVehicles(),
        events: b.urls.endpoints.getEventOpsDetails()
    };
    a.genericItemConversions = {
        accom: function(b, c) {
            return a.genericItemConversionAccom(b, c)
        },
        tours: function(b, c) {
            return a.genericItemConversionTours(b, c)
        },
        carhire: function(b, c) {
            return a.genericItemConversionCarHire(b, c)
        },
        events: function(b, c) {
            return a.genericItemConversionEvents(b, c)
        }
    };
    a.genericItemConversionCarHire = function(a, b) {
        var c = []
          , d = b[0]
          , d = typeof d != "undefined" ? d.vehicles : [];
        if (typeof d == "undefined")
            return c;
        for (var f = 0, h = d.length; f < h; f++) {
            var k = d[f];
            c.push({
                description: k.description,
                name: k.name,
                pictures: k.pictures,
                id: k.vehicleId
            })
        }
        return {
            TypeHeading: "Car Hire",
            items: c
        }
    }
    ;
    a.genericItemConversionEvents = function(a, b) {
        var c = []
          , d = b.Operators[0]
          , d = typeof d != "undefined" ? d.Events : [];
        if (typeof d == "undefined")
            return c;
        for (var f = 0, h = d.length; f < h; f++) {
            var k = d[f];
            c.push({
                description: k.Description,
                name: k.Name,
                pictures: k.Pictures,
                id: k.EventID
            })
        }
        return {
            TypeHeading: "Events",
            items: c
        }
    }
    ;
    a.genericItemConversionAccom = function(a, b) {
        var c = []
          , d = b[0]
          , d = typeof d != "undefined" ? d.Rooms : [];
        if (typeof d == "undefined")
            return c;
        for (var f = 0, h = d.length; f < h; f++) {
            var k = d[f];
            c.push({
                description: k.Description,
                facilities: k.Facilities,
                beddingConfig: k.BeddingConfig,
                roomConfig: k.RoomConfig,
                name: k.Name,
                pictures: k.Pictures,
                id: k.RoomID
            })
        }
        return {
            TypeHeading: "Rooms",
            items: c
        }
    }
    ;
    a.genericItemConversionTours = function(a, b) {
        var c = []
          , d = b.Operators[0]
          , d = typeof d != "undefined" ? d.Tours : [];
        if (typeof d == "undefined")
            return c;
        for (var f = 0, h = d.length; f < h; f++) {
            var k = d[f];
            c.push({
                description: k.Description,
                facilities: [],
                beddingConfig: "",
                roomConfig: "",
                name: k.Name,
                pictures: k.Pictures,
                id: k.TourId,
                pleaseBring: typeof k.PleaseBring != "undefined" ? k.PleaseBring : "",
                pickupPoint: typeof k.PickupPoint != "undefined" ? k.PickupPoint : "",
                notes: typeof k.Notes != "undefined" ? k.Notes : ""
            })
        }
        return {
            TypeHeading: "Tours",
            items: c
        }
    }
    ;
    a.attachSubscriptions = function() {}
    ;
    a.redraw = function() {
        a.initialiseMap()
    }
    ;
    a.isUsingSlideShow = function(a) {
        return typeof a.useImageSlideShow != "undefined" && typeof a.useImageSlideShow.jQueryObject != "undefined"
    }
    ;
    a.buildOperatorPageModel = function(b) {
        var c = b.OpInformation.Operators[0]
          , d = b.OpDetailsShort[0]
          , b = b.OpItems;
        return {
            name: typeof d.TradingName != "undefined" ? d.TradingName : "",
            residentialAddress: typeof d.ResidentialAddress != "undefined" ? d.ResidentialAddress : "",
            description: typeof d.Description != "undefined" ? d.Description : "",
            facilities: typeof d.Facilities != "undefined" ? a.simplifyFicilities(d.Facilities) : [],
            directions: typeof c.Directions != "undefined" ? c.Directions : "",
            latitude: typeof d.Latitude != "undefined" ? d.Latitude : 0,
            longitude: typeof d.Longitude != "undefined" ? d.Longitude : 0,
            images: typeof d.ImageUrls != "undefined" ? d.ImageUrls : [],
            items: b,
            arrivalTime: typeof c.ArrivalTime != "undefined" ? c.ArrivalTime : "",
            departureTime: typeof c.DepartureTime != "undefined" ? c.DepartureTime : "",
            cancellationPolicy: typeof c.Cancellation != "undefined" ? c.Cancellation : "",
            pointOfDifference: typeof c.PointOfDifference != "undefined" ? c.PointOfDifference : ""
        }
    }
    ;
    a.simplifyFicilities = function(a) {
        for (var b = [], c = 0, d = a.length; c < d; c++)
            b.push(a[c].FacilityName);
        return b
    }
    ;
    a.buildUnorderedList = function(b) {
        for (var c = {
            ul: []
        }, d = c.ul, f = 0; f <= b.length; f++)
            d.push({
                li: {
                    "": a.htmlEncode(b[f])
                }
            });
        return c
    }
    ;
    a.htmlEncode = function(a) {
        try {
            return a.replace(/(<([^>]+)>)/ig, "")
        } catch (b) {
            return a
        }
    }
    ;
    a.toUpperCase = function(a) {
        if (typeof a == "undefined")
            return a;
        return typeof a.toUpperCase != "undefined" ? a.toUpperCase() : a
    }
    ;
    a.getOperatorPageHtml = function(b, c) {
        var d = {
            "div.details-gadget-left right-colum-oprator": {
                "div.details-gadget-intro": {
                    "div.star-rating star-rating-45": "",
                    "h1.operatorTitle": c.name,
                    "div.location": {
                        span: "Location: " + a.htmlEncode(c.residentialAddress)
                    }
                },
                "div.details-gadget-difference": {
                    pre: a.htmlEncode(c.pointOfDifference)
                }
            },
            "div.details-gadget-right left-colum-oprator": {
                "div.imageContainer": {}
            }
        }, f = {
            "div.details-tab-button details-tab-button-1 details-tab-button-active": {
                a: {
                    " ": "BOOK",
                    _attr: {
                        href: "#",
                        onclick: "return BE.gadget.operator.switchDetailsTab(this, 'booking');"
                    }
                }
            },
            "div.details-tab-button details-tab-button-afteractive": {
                a: {
                    " ": "OVERVIEW",
                    _attr: {
                        href: "#",
                        onclick: "return BE.gadget.operator.switchDetailsTab(this, 'overview');"
                    }
                }
            },
            "div.details-tab-button 3": {
                a: {
                    " ": "LOCATION & DIRECTIONS",
                    _attr: {
                        href: "#",
                        onclick: "return BE.gadget.operator.switchDetailsTab(this, 'location');"
                    }
                }
            },
            "div.details-tab-button 1": {
                a: {
                    " ": a.toUpperCase(c.items.TypeHeading) + " & POLICIES",
                    _attr: {
                        href: "#",
                        onclick: "return BE.gadget.operator.switchDetailsTab(this, 'policies');"
                    }
                }
            },
            "div.clear": {}
        }, h = {
            "div.details-tab-left": {
                "div.details-gadget-description": {
                    h2: "Description",
                    pre: a.htmlEncode(c.description)
                }
            },
            "div.details-tab-right": function() {
                if (typeof c.facilities != "undefined" && c.facilities.length > 0) {
                    for (var b = {
                        h2: "Facilities",
                        "div.details-gadget-facilities facilities": {}
                    }, d, e = 0, f = c.facilities.length; e < f; e += 10)
                        d = c.facilities.slice(e, e + 10),
                        b["div.details-gadget-facilities facilities"]["span " + e] = a.buildUnorderedList(d);
                    return b
                }
                return {}
            }(),
            "div.clear": {}
        }, k = {
            "div.details-tab-left": {
                "div.details-gadget-location": {
                    "div#map_inner2.map_inner2": {
                        "div#map_canvas": {}
                    },
                    "div.clear": {}
                }
            },
            "div.details-tab-right": {
                "div.details-gadget-directions box": {
                    "div.directions": {
                        h2: "Directions",
                        priv: a.htmlEncode(c.directions)
                    }
                }
            },
            "div.clear": {}
        }, o = a.BuildItemRow(b, c), w;
        w = c.arrivalTime != "" && c.departureTime != "" ? {
            "div.details-gadget-hours box": {
                "p.time": {
                    strong: "Arrival Time: " + a.htmlEncode(c.arrivalTime),
                    br: {},
                    "strong.b": "Departure Time: " + a.htmlEncode(c.departureTime)
                }
            }
        } : {};
        return {
            "div#details-gadget.fullwidth": d,
            "div.clear": {},
            "div#details-tabrow": f,
            "div#details-tabs": {
                "div.details-tab details-tab-booking": {
                    "div#itemGadget": "",
                    "div#cart": ""
                },
                "div.details-tab details-tab-overview HideThis": h,
                "div.details-tab details-tab-location HideThis": k,
                "div.details-tab details-tab-policies HideThis": {
                    "div.details-tab-left": o,
                    "div.details-tab-right": {
                        "div.details-gadget-hours box": w,
                        "div.details-gadget-cancellation box": {
                            h2: "Cancellation Policy",
                            pre: a.htmlEncode(c.cancellationPolicy)
                        }
                    },
                    "div.clear": {}
                }
            }
        }
    }
    ;
    a.BuildItemRow = function(c, d) {
        for (var f = {
            h2: d.items.TypeHeading
        }, j = function(b) {
            var c = {
                h3: a.htmlEncode(b.name),
                p1: a.htmlEncode(b.description)
            };
            typeof b.roomConfig != "undefined" && (c.p = {
                "strong.a": a.htmlEncode(b.roomConfig)
            });
            typeof b.pleaseBring != "undefined" && (c["p 1"] = {
                "strong.a": a.htmlEncode(b.pleaseBring)
            });
            typeof b.pickupPoint != "undefined" && (c["p 2"] = {
                "strong.a": a.htmlEncode(b.pickupPoint)
            });
            typeof b.notes != "undefined" && (c["p 3"] = {
                "strong.a": a.htmlEncode(b.notes)
            });
            return c
        }
        , h = 0, k = d.items.items.length; h < k; h++) {
            var o = d.items.items[h]
              , w = h == 0 ? "row-first" : ""
              , v = typeof o.pictures != "undefined" && o.pictures.length > 0 ? o.pictures[0] : b.urls.img.listViewFallback(c.type);
            f["div.room-row " + w + " " + h] = {
                "div.row1-data": {
                    "div.rooms-left": {
                        img: {
                            _attr: {
                                src: v,
                                alt: a.htmlEncode(d.items.TypeHeading) + " Image"
                            }
                        }
                    },
                    "div.rooms-right": j(o)
                }
            };
            f["div.clear " + h] = {}
        }
        return {
            "div.details-gadget-rooms rooms": f
        }
    }
    ;
    a.renderMap = function() {
        if (b.util.exists(h.google) && b.util.exists(h.google.maps))
            a.initialiseMap();
        else {
            var c = "mapsCB" + d._int.generateID();
            d("head");
            h[c] = function() {
                a.initialiseMap()
            }
            ;
            d("head").append({
                script: {
                    _attr: {
                        type: "text/javascript",
                        src: "//maps.google.com/maps/api/js?sensor=false&callback=" + c
                    }
                }
            })
        }
    }
    ;
    a.renderSlideShow = function(a, b, c) {
        if (c.images.length != 0) {
            for (var f = {
                "div#showcase.showcase": {}
            }, h = 0, k = c.images.length; h < k; h++) {
                var o = c.images[h];
                f["div#showcase.showcase"]["div.showcase-slide " + h] = {
                    "div.showcase-content": {
                        img: {
                            _attr: {
                                src: o.FullSizeImage,
                                width: "392px",
                                height: "341px"
                            }
                        }
                    },
                    "div.showcase-thumbnail": {
                        img: {
                            _attr: {
                                src: o.ThumbnailImage,
                                width: "100px",
                                height: "70px"
                            }
                        },
                        "div.showcase-thumbnail-cover": {}
                    }
                }
            }
            a.append(f);
            d("#showcase").length > 0 && (a = typeof b.useImageSlideShow.settings != "undefined" ? b.useImageSlideShow.settings : {
                content_width: 392,
                content_height: 341,
                fit_to_parent: !1,
                auto: !1,
                interval: 3E3,
                continuous: !1,
                loading: !0,
                tooltip_width: 200,
                tooltip_icon_width: 32,
                tooltip_icon_height: 32,
                tooltip_offsetx: 18,
                tooltip_offsety: 0,
                arrows: !1,
                buttons: !1,
                btn_numbers: !1,
                keybord_keys: !0,
                mousetrace: !1,
                pauseonover: !0,
                stoponclick: !0,
                transition: "hslide",
                transition_delay: 300,
                transition_speed: 500,
                show_caption: "onhover",
                thumbnails: !0,
                thumbnails_position: "outside-last",
                thumbnails_direction: "horizontal",
                thumbnails_slidex: 0,
                dynamic_height: !1,
                speed_change: !1,
                viewline: !1
            },
            b.useImageSlideShow.jQueryObject("#showcase").awShowcase(a))
        }
    }
    ;
    a.initialiseMap = function() {
        var a = new google.maps.LatLng(c.latitude,c.longitude)
          , b = {
            center: a,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        f = new google.maps.Map(document.getElementById("map_canvas"),b);
        boundsHandle = new google.maps.LatLngBounds;
        boundsHandle.extend(a);
        var b = new google.maps.Size(24,24)
          , d = new google.maps.Point(0,0)
          , j = new google.maps.Point(0,32);
        new google.maps.MarkerImage("http://centralgippsland.uat.setup.impartmedia.com/images/tripplanner/1.gif",b,d,j);
        b = new google.maps.Size(37,34);
        d = new google.maps.Point(0,0);
        j = new google.maps.Point(3,32);
        new google.maps.MarkerImage("http://centralgippsland.uat.setup.impartmedia.com/images/tripplanner/shadow50.png",b,d,j);
        a = new google.maps.Marker({
            position: a,
            map: f,
            title: c.name
        });
        (new google.maps.InfoWindow({
            content: '<div class="map-info-window"><h3 class="be-google-map-point-title">' + c.name + "</h3><p>" + c.residentialAddress + "</p></div>"
        })).open(f, a)
    }
})(window);
(function(h) {
    var d = h.wisDOM
      , b = h.BE
      , a = {};
    b.gadget.confirm = function(h, f) {
        var c = d(h);
        if (c.length === 0)
            return !1;
        f = b.util.mergeObjects(f, b.gadget.confirm.defaults);
        var e = f
          , g = d(h);
        g.length !== 0 && a._init(g, e);
        return c
    }
    ;
    a._init = function(a, f) {
        var f = f || {}
          , c = b.util.cookieName("c0nf14MA71onL!Nk")
          , c = d.json.parse(d.cookie(c))
          , e = c.pdfURL
          , g = c.IsApproved;
        e === "" && g && f.demo !== !0 || (f.demo === !0 && (e = "#"),
        a.empty(),
        g ? a.append({
            "div.bookingComplete": {
                label: f.thankYouText,
                a: {
                    _attr: {
                        href: e
                    },
                    "": f.pdfLinkText
                }
            }
        }) : a.append({
            "div.bookingCancelled": {
                label: b.gadget.book.text.bookingCancelled
            }
        }),
        d.getJSON(b.urls.endpoints.getBooking() + "&itineraryId=" + c.ItineraryId + "&password=" + c.Password, function(a) {
            d.event.publish("Confirmation.Complete", h, a)
        }))
    }
})(window);
(function(h) {
    h.BE.gadget.confirm.defaults = {
        thankYouText: "Thank you for your booking. You can download your itinerary with the link below.",
        pdfLinkText: "Download your itinerary PDF now."
    }
})(window);
(function(h) {
    var d = h.BE;
    d.gadget.details.similar = function(b) {
        var a = {}
          , h = d.util.exists;
        a.selector = b.container;
        a.enabled = !0;
        a.onlyGold = h(b.onlyGold) ? b.onlyGold : !1;
        a.random = h(b.random) ? b.random : !0;
        a.filterOrder = h(b.filterOrder) ? b.filterOrder : ["type", "rating", "location"];
        a.maxProperties = h(b.maxProperties) && b.maxProperties < 8 ? b.maxProperties : 3;
        a.itemDetailPageURL = h(b.itemDetailPageURL) ? b.itemDetailPageURL : d.gadget.region.defaults.itemDetailPageURL;
        a.campaignID = null ;
        a.maxNumberOfGuests = h(b.maxNumberOfGuests) ? b.maxNumberOfGuests : !1;
        a.enableRegionSearch = h(b.enableRegionSearch) ? b.enableRegionSearch : !1;
        a.forceRegionState = h(b.forceRegionState) ? b.forceRegionState : "";
        a.forceRegionRegion = h(b.forceRegionRegion) ? b.forceRegionRegion : "";
        a.forceRegionLoc = h(b.forceRegionLoc) ? b.forceRegionLoc : "";
        return a
    }
})(window);
(function(h) {
    var d = h.wisDOM, b = h.BE, a = {}, k, f = {}, c = b.gadget.region.text;
    k = b.gadget.region.list = {};
    k.build = function(b, c, d, e) {
        return a.buildListView(b, c, d, e)
    }
    ;
    k.bindScroll = function(b, c) {
        var e = a.checkImagesInView;
        d(h).unbind("scroll." + c);
        d(h).bind("scroll." + c, function() {
            if (b.css("display") == "none" && b.height() !== 0)
                return !1;
            f[c] = b.find("div.thumb img.unloaded");
            var a = arguments.callee;
            d(h).unbind("scroll." + c);
            setTimeout(function() {
                e(c)
            }, 100);
            f[c].length !== 0 && setTimeout(function() {
                d(h).bind("scroll." + c, a)
            }, 499)
        })
    }
    ;
    k.checkImages = function(b) {
        setTimeout(function() {
            a.checkImagesInView(b)
        }, 1)
    }
    ;
    k.parseParas = function(b) {
        return a.parseParas(b)
    }
    ;
    k.clearAll = function(a) {
        a = a.find("div.list-view");
        a.length > 0 && a.find("div").remove()
    }
    ;
    a.buildListView = function(b, c, d, e) {
        return d == "packages" ? a.buildListViewPackage(b, c, d, e) : a.buildListViewStandard(b, c, d, e)
    }
    ;
    a.buildListViewPackage = function(c, d, e, g) {
        var l = h.wisDOM, v, p, q, r, s, u = b.gadget.region.itemURL, y, E = b.urls.img.listViewFallback(e), x = b.urls.img.unloadedImg();
        b.gadget.search.userState();
        if (g.length) {
            l(h).unbind("scroll." + e);
            c.find("div.list-view").length === 0 && l({
                "div.list-view": {}
            }).appendTo(c);
            var t = c.find("div.list-view");
            t.find("div." + e).remove();
            c = {};
            c["div." + e + " type-group"] = v = [];
            for (var C = 0, z = g.length; C < z; C++) {
                p = g[C];
                q = {};
                r = C % 2 === 0 ? "odd" : "even";
                typeof p.IsGoldMedal != "undefined" && p.IsGoldMedal === !0 && (r += " instant-confirmation");
                d.campaignID !== null && typeof p.CampaignLevel != "undefined" && (r += " " + p.CampaignLevel.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s/g, "-").replace(/^[0-9]/, ""));
                q["div.list-item " + r] = [];
                r = q["div.list-item " + r];
                s = u({
                    id: p.PackageID,
                    name: p.Name,
                    type: e
                });
                r._events = {
                    mouseover: function() {
                        this.className += " hover"
                    },
                    mouseout: function() {
                        this.className = this.className.replace(/\shover/, "")
                    }
                };
                y = typeof p.PrimaryImage != "undefined" ? p.PrimaryImage.ThumbnailImage : "";
                if (y === "" && typeof p.Images != "undefined" && p.Images.length > 0)
                    y = p.Images[0].ThumbnailImage;
                y === "" && (y = E);
                var F, B = !1;
                r.push({
                    h3: {
                        a: {
                            "": p.Name,
                            _attr: {
                                href: s
                            }
                        }
                    }
                }, {
                    "div.fromPrice im-pricebutton": {
                        a: {
                            _attr: {
                                href: s
                            },
                            "span.thePrice im-pricebutton-amount": function() {
                                var a = b.util.currencies.formatShort(p.Cost, b.gadget.currencyId)
                                  , a = p.Cost;
                                F = p;
                                B = p.IsAvailable && !p.IsConstrained;
                                a = Math.ceil(a);
                                if (a == 1.0E20 || B === !1)
                                    return "";
                                return b.util.currencies.formatShort(a, b.gadget.currencyId)
                            }()
                        }
                    }
                }, {
                    "div.thumb": {
                        "img.unloaded": {
                            _attr: {
                                src: x,
                                rel: y.replace(/^http:/, "")
                            }
                        }
                    }
                }, {
                    "div.description": a.parseParas(b.util.stripTags(p.Description), s)
                });
                if (!B && !d.listAllMode)
                    s = r[1]["div.fromPrice im-pricebutton"].a,
                    s._attr.href = "javascript://",
                    s._attr["class"] = "sold-out",
                    s._attr.onclick = "javascript:BE.gadget.search.primaryDatePicker.show()",
                    s["span.label im-pricebutton-label"] = h.BE.gadget.region.text.changeDates;
                e == "events" && typeof F != "undefined" && r.splice(1, 0, {
                    h4: F.Name
                });
                v.push(q)
            }
            d = l(c).appendTo(t);
            f[e] = d.find("div.thumb img.unloaded");
            k.bindScroll(d, "list-" + e);
            setTimeout(function() {
                a.checkImagesInView("list-" + e)
            }, 125);
            return !0
        }
    }
    ;
    a.buildListViewStandard = function(c, d, e, g) {
        var l = h.wisDOM, v, p, q, r, s, u, y = b.gadget.region.itemURL, E, x = b.urls.img.listViewFallback(e), t = b.urls.img.unloadedImg(), C = b.gadget.search.userState().period;
        if (g.length) {
            l(h).unbind("scroll." + e);
            c.find("div.list-view").length === 0 && l({
                "div.list-view": {}
            }).appendTo(c);
            var z = c.find("div.list-view");
            z.find("div." + e).remove();
            c = {};
            c["div." + e + " type-group"] = v = [];
            for (var F = 0, B = g.length; F < B; F++) {
                p = g[F];
                q = {};
                u = F % 2 === 0 ? "odd" : "even";
                typeof p.IsGoldMedal != "undefined" && p.IsGoldMedal === !0 && (u += " instant-confirmation");
                b.util.each(p.Items, function(a, c) {
                    var d = !1;
                    b.util.exists(c.Availability.Specials) && c.Availability.Specials.length > 0 && (u += " has-specials",
                    d = !0);
                    return !d
                });
                b.util.each(p.Items, function(a, c) {
                    var d = !1;
                    b.util.each(c.Availability.Specials, function(a, b) {
                        b.IsLastMinute && (u += " has-last-minute",
                        d = !0);
                        return !d
                    });
                    return !d
                });
                d.campaignID !== null && typeof p.CampaignLevel != "undefined" && (u += " " + p.CampaignLevel.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s/g, "-").replace(/^[0-9]/, ""));
                q["div.list-item " + u] = [];
                r = q["div.list-item " + u];
                s = y({
                    id: p.OperatorId,
                    name: p.OperatorName,
                    type: e
                });
                r._events = {
                    mouseover: function() {
                        this.className += " hover"
                    },
                    mouseout: function() {
                        this.className = this.className.replace(/\shover/, "")
                    }
                };
                E = typeof p.PrimaryImage != "undefined" ? p.PrimaryImage.ThumbnailImage : "";
                if (E === "" && typeof p.OtherImages != "undefined" && p.OtherImages.length > 0)
                    E = p.OtherImages[0].ThumbnailImage;
                E === "" && (E = x);
                var G, A = !1;
                r.push(b.gadget.region.getSpecialsElement(p), {
                    h3: {
                        a: {
                            "": p.OperatorName,
                            _attr: {
                                href: s
                            }
                        }
                    }
                }, {
                    "p.location": b.util.stripTags(p.Address)
                }, {
                    "p.rating": function() {
                        var a = p.StarRating.toString() == "0" ? "No Rating" : p.StarRating + " star"
                          , b = {};
                        b["span.type_" + (p.IsAAARated ? "aaa" : "self") + " rating_" + p.StarRating.toString().replace(/\./g, "_")] = {
                            "span.text": a
                        };
                        return b
                    }()
                }, {
                    "div.fromPrice im-pricebutton": {
                        a: {
                            _attr: {
                                href: s
                            },
                            "span.label im-pricebutton-label": "From ",
                            "span.thePrice im-pricebutton-amount": function(a) {
                                for (var c = 1.0E20, f, g, j = 0, h = a.length; j < h; j++) {
                                    f = !1;
                                    g = a[j].Availability.Days;
                                    var k = 0
                                      , l = g.length;
                                    d.lastMinuteMode && (l = C);
                                    for (k = 0; k < l; k++)
                                        if (g[k].Cost === 0 && e != "tours" && e != "events" || !g[k].IsAvailable)
                                            f = !0;
                                    if (a[j].Availability.Cost < c && f === !1)
                                        c = a[j].Availability.Cost,
                                        G = a[j],
                                        A = !0
                                }
                                c = Math.ceil(c);
                                if (c == 1.0E20 || A === !1)
                                    return "";
                                return b.util.currencies.formatShort(c, b.gadget.currencyId)
                            }(p.Items)
                        }
                    }
                }, {
                    "div.thumb": {
                        "img.unloaded": {
                            _attr: {
                                src: t,
                                rel: E.replace(/^http:/, "")
                            }
                        }
                    }
                }, {
                    "div.description": a.parseParas(b.util.stripTags(p.Description), s)
                });
                if (!A && !d.listAllMode)
                    typeof d != "undefined" && typeof d.showAllAccom != "undefined" && d.showAllAccom && e == "accom" || (r[1].h3.a._attr.href = "javascript://"),
                    delete q["div.list-item " + u],
                    q["div.list-item " + u + " sold-out"] = r,
                    s = r[4]["div.fromPrice im-pricebutton"].a,
                    s._attr.href = "javascript://",
                    s._attr["class"] = "sold-out",
                    s._attr.onclick = "javascript:BE.gadget.search.primaryDatePicker.show()",
                    s["span.label im-pricebutton-label"] = h.BE.gadget.region.text.changeDates;
                e == "events" && typeof G != "undefined" && r.splice(1, 0, {
                    h4: G.Name
                });
                v.push(q)
            }
            g = l(c).appendTo(z);
            f[e] = g.find("div.thumb img.unloaded");
            k.bindScroll(g, "list-" + e);
            setTimeout(function() {
                a.checkImagesInView("list-" + e)
            }, 125);
            return !0
        }
    }
    ;
    a.checkImagesInView = function(a) {
        if (!f[a] || f[a].length === 0 || f[a][0].offsetHeight === 0)
            return !1;
        for (var b = d._int.checkScroll(h), a = f[a], c = a[0].offsetHeight * 2, e = b !== !1 ? b.y.at - c : 0, g = b !== !1 ? b.y.at + b.y.box + c : d(h).height(), k = 0, l = a.length; k < l; k++)
            if (a[k].className.indexOf("unloaded") != -1)
                b = d(a[k]),
                c = b.offset().top,
                c > e && c < g && (b.attr("src", b.attr("rel")),
                b.removeClass("unloaded"))
    }
    ;
    var e = /(\s*\r??\n\s*\r??\n\s*)/g
      , g = /(\s{2,}|\r??\n\s*)/g
      , l = /(^\s*|\s*$)/g;
    a.parseParas = function(a, b) {
        var d = [], f, h, k = !1;
        if (!a)
            return d;
        f = a;
        f.length > 500 && typeof b != "undefined" && (f = f.substring(0, 500),
        k = !0);
        f = f.replace(e, "|~|");
        f = f.replace(g, " ");
        f = f.split("|~|");
        for (var p = 0, q = f.length; p < q; p++)
            h = f[p].replace(l, ""),
            h.length > 0 && d.push({
                p: h
            });
        if (k && d.length > 0 && typeof b != "undefined")
            h = d[d.length - 1].p,
            d[d.length - 1].p = [{
                "": h
            }, {
                "": "... "
            }, {
                "a.showMore": {
                    _attr: {
                        href: b
                    },
                    span: c.listDescShowMore
                }
            }];
        return d
    }
})(window);
(function(h) {
    var d = h.wisDOM, b = h.BE, a = {}, k = !1, f, c = {}, e = {}, g = {}, l, j, m = {}, n, o = null , w, v, p = !1, q = !1;
    n = b.gadget.region.map = {};
    n.redraw = function(b) {
        try {
            h.google.maps.event.trigger(f, "resize"),
            f.fitBounds(w),
            a.applyBoundOverrideIfReq(b),
            f.getZoom() > 18 && f.setZoom(18)
        } catch (c) {}
    }
    ;
    n.clearAll = function() {
        var a = d(".map-container");
        a.length > 0 && a.remove()
    }
    ;
    n.triggerMapMarkerClick = function(a, b) {
        if (c.hasOwnProperty(a)) {
            for (var d = c[a], e = "", f = 0, g = d.length; f < g; f++)
                if (d[f].title == b) {
                    e = d[f];
                    break
                }
            e != "" && google.maps.event.trigger(e, "click")
        }
    }
    ;
    n.et = function() {
        return a
    }
    ;
    a.applyBoundOverrideIfReq = function(a) {
        if (!(a == null && a.forceMapBounds == null && f.getBounds() == null ) && a.forceMapBounds.pointA != null && a.forceMapBounds.pointB != null ) {
            var b = new google.maps.LatLng(a.forceMapBounds.pointA.lat,a.forceMapBounds.pointA.lng)
              , a = new google.maps.LatLng(a.forceMapBounds.pointB.lat,a.forceMapBounds.pointB.lng)
              , b = new google.maps.LatLngBounds(b,a);
            f.setZoom(2);
            f.fitBounds(b);
            f.panToBounds(b)
        }
    }
    ;
    n.attachMapCode = function(b, c) {
        var e = "mapsCB" + d._int.generateID()
          , f = d("head")
          , g = "";
        c.googleMapsKey != null ? g = "&key=" + c.googleMapsKey : c.googleMapsKeyGlobal && (g = "&key=AIzaSyBAFDB_Y3JlrzcFI53oQsQuktDBCbV4ZPE");
        h[e] = function() {
            k = !0;
            a.buildMapBase(b, c);
            h[e] = void 0;
            try {
                delete h[e]
            } catch (d) {}
        }
        ;
        f.append({
            script: {
                _attr: {
                    type: "text/javascript",
                    src: "//maps.google.com/maps/api/js?sensor=false" + g + "&callback=" + e
                }
            }
        })
    }
    ;
    a.buildMapBase = function(b, c) {
        var e;
        e = c.interactiveMapMode ? d({
            "div.map-container interactive-mode": {
                "div.product-types": "",
                "div.map-window": ""
            }
        }) : d({
            "div.map-container": {
                "div.product-list": "",
                "div.map-window": ""
            }
        });
        e.appendTo(b);
        var g = {
            scrollwheel: !1,
            panControl: !1,
            mapTypeControl: !0,
            streetViewControl: !0,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        f = new h.google.maps.Map(e.find("div.map-window")[0],g);
        w = new google.maps.LatLngBounds;
        l = e.find("div.product-list");
        j = e.find("div.product-types");
        c.campaignID !== null && (v = !0);
        c.interactiveMapMode && d(function() {
            var e = arguments.callee;
            typeof c.categories != "undefined" ? a.buildProductChooser(b, c) : d(e, 50)
        }, 10);
        if (c.lastMinuteMode)
            q = c.lastMinuteMode;
        c.vcLocations !== null && c.vcLocations.length > 0 && a.addVCMarkers(c.vcLocations);
        c.interactiveMapMode && e.find("div.map-window").bind("click.BEuserInteractDetect", function() {
            e.find("div.map-window").unbind("click.BEuserInteractDetect");
            p = !0
        })
    }
    ;
    n.resetBounds = function() {
        try {
            w = new google.maps.LatLngBounds
        } catch (a) {}
    }
    ;
    n.buildMarkers = function(a, f, h, l, o) {
        if (k) {
            typeof c[h] == "undefined" && (c[h] = []);
            for (var p = [], t = 0, q = l.length; t < q; t++)
                l[t].Latitude !== 0 && l[t].Longitude !== 0 && p.push(l[t]);
            for (var l = p, w, v, B = 0, p = 0, G, t = l.length, q = 0; q < t; q++)
                w = l[q].Latitude,
                v = l[q].Longitude,
                B += w,
                p += v;
            w = B / t;
            v = p / t;
            for (q = p = B = 0; q < t; q++)
                B += Math.pow(l[q].Latitude - w, 2),
                p += Math.pow(l[q].Longitude - v, 2);
            B = Math.sqrt(B / t);
            G = Math.sqrt(p / t);
            p = [];
            for (q = 0; q < t; q++)
                f.applyBoundsAlgorithm && (Math.abs(l[q].Latitude - w) > B + 1 || Math.abs(l[q].Longitude - v) > G + 1) ? f.interactiveMapMode || p.push({
                    item: l[q],
                    passed: !1
                }) : p.push({
                    item: l[q],
                    passed: !0
                });
            var A, t = new google.maps.MarkerImage(b.urls.img.mapIconShadow(),new google.maps.Size(37,29),new google.maps.Point(0,0),new google.maps.Point(10,29)), q = {
                coord: [0, 0, 20, 20],
                type: "rect"
            };
            switch (h) {
            case "accom":
                A = b.urls.img.mapIconAccom();
                break;
            case "tours":
                A = b.urls.img.mapIconTours();
                break;
            case "events":
                A = b.urls.img.mapIconEvents();
                break;
            case "carhire":
                A = b.urls.img.mapIconCarHire()
            }
            typeof A == "undefined" && (A = m[h]);
            w = [20, 29];
            v = [10, 29];
            if (f.customMapIcons && typeof f.customMapIcons[h] != "undefined") {
                if (typeof f.customMapIcons[h].icon != "undefined")
                    A = f.customMapIcons[h].icon,
                    t = new google.maps.MarkerImage(b.urls.img.mapGenericShadow(),new google.maps.Size(22,12),new google.maps.Point(0,0),new google.maps.Point(11,6));
                if (typeof f.customMapIcons[h].size != "undefined")
                    w = f.customMapIcons[h].size,
                    q = {
                        coord: [0, 0, f.customMapIcons[h].size[0], Math.round(f.customMapIcons[h].size[1] / 4 * 3)],
                        type: "rect"
                    };
                if (typeof f.customMapIcons[h].pinpoint != "undefined")
                    v = f.customMapIcons[h].pinpoint
            }
            A = new google.maps.MarkerImage(A,new google.maps.Size(w[0],w[1]),new google.maps.Point(0,0),new google.maps.Point(v[0],v[1]));
            e[h] = [p, A, t, q];
            g[h] = l;
            o && !f.interactiveMapMode && n.showMarkers(h, f);
            var H = h;
            isNaN(parseInt(h, 10)) || (H = "other_" + h);
            f.interactiveMapMode && d(function() {
                var a = j.find("div." + H + " input")
                  , b = arguments.callee;
                a.length === 0 ? d(b, 50) : a[0].checked && n.showMarkers(h, !0, f)
            }, 1)
        } else
            d(function() {
                n.buildMarkers(a, f, h, l, o)
            }, 75)
    }
    ;
    a.addVCMarkers = function(a) {
        for (var c, d = f, e = h.google.maps, g = new google.maps.MarkerImage(b.urls.img.mapVCIcon(),new google.maps.Size(32,38),new google.maps.Point(0,0),new google.maps.Point(16,38)), j = new google.maps.MarkerImage(b.urls.img.mapGenericShadow(),new google.maps.Size(22,12),new google.maps.Point(0,0),new google.maps.Point(11,6)), k = {
            coord: [0, 0, 32, 32],
            type: "rect"
        }, l = new google.maps.LatLngBounds, m, n = 0, o = a.length; n < o; n++) {
            c = a[n];
            m = new e.LatLng(c.lat,c.lng);
            if (b.util.exists(c.customImage)) {
                var g = new google.maps.Size(32,38)
                  , p = new google.maps.Point(0,0)
                  , q = new google.maps.Point(16,38);
                b.util.exists(c.customImageOptions) && (b.util.exists(c.customImageOptions.size) && (g = new google.maps.Size(c.customImageOptions.size.x,c.customImageOptions.size.y)),
                b.util.exists(c.customImageOptions.origin) && (p = new google.maps.Point(c.customImageOptions.origin.x,c.customImageOptions.origin.y)),
                b.util.exists(c.customImageOptions.anchor) && (q = new google.maps.Point(c.customImageOptions.anchor.x,c.customImageOptions.anchor.y)));
                g = new google.maps.MarkerImage(c.customImage,g,p,q)
            }
            l.extend(m);
            new e.Marker({
                position: m,
                icon: g,
                shadow: j,
                shape: k,
                map: d,
                title: c.name
            })
        }
        d.fitBounds(l)
    }
    ;
    a.buildSideBar = function(a) {
        var e = g[a]
          , f = l
          , h = []
          , j = null ;
        f.empty();
        f.unbind("marker.clicked");
        f.bind("marker.clicked", function(a) {
            var b = f.children();
            a.data.doScroll === !0 && f.scroll(b[a.data.num], null , 1E3, 40);
            j !== null && j.removeClass("highlighted");
            j = d(b[a.data.num]);
            j.addClass("highlighted")
        });
        if (a != "packages")
            for (var k = 0, m = e.length; k < m; k++)
                (function(d) {
                    var f = d % 2 === 0 ? "odd" : "even"
                      , g = {}
                      , j = e[d];
                    typeof j.IsGoldMedal != "undefined" && j.IsGoldMedal === !0 && (f += " instant-confirmation");
                    b.util.each(j.Items, function(a, c) {
                        var d = !1;
                        b.util.exists(c.Availability.Specials) && c.Availability.Specials.length > 0 && (f += " has-specials",
                        d = !0);
                        return !d
                    });
                    b.util.each(j.Items, function(a, c) {
                        var d = !1;
                        b.util.each(c.Availability.Specials, function(a, b) {
                            b.IsLastMinute && (f += " has-last-minute",
                            d = !0);
                            return !d
                        });
                        return !d
                    });
                    v === !0 && typeof j.CampaignLevel != "undefined" && (f += " " + j.CampaignLevel.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s/g, "-").replace(/^[0-9]/, ""));
                    g["div.map-sidebar-item " + f] = b.gadget.region.getSpecialsElement(j);
                    var k = g["div.map-sidebar-item " + f];
                    k._events = {
                        mouseover: function() {
                            this.className += " hover"
                        },
                        mouseout: function() {
                            this.className = this.className.replace(/\shover/, "")
                        }
                    };
                    j.Items.sort(function(a, b) {
                        var c = a.Availability.Cost
                          , d = b.Availability.Cost;
                        if (c === 0 && d !== 0)
                            return 1;
                        if (c !== 0 && d === 0)
                            return -1;
                        return a.Availability.Cost < b.Availability.Cost ? -1 : 1
                    });
                    var l = "";
                    if (typeof j.Items[0] != "undefined") {
                        var m = j.Items[0].Availability.Days
                          , n = 0
                          , o = m.length;
                        if (q)
                            o = b.gadget.search.userState().period;
                        for (var p = !0, n = 0; n < o; n++)
                            m[n].IsAvailable || (p = !1);
                        p && (l = j.Items[0].Availability.Cost.toString())
                    }
                    k["div.name"] = {
                        span: j.OperatorName,
                        _events: {
                            click: function() {
                                google.maps.event.trigger(c[a][d], "click")
                            }
                        }
                    };
                    if (a == "events")
                        k["div.event-name"] = j.Items[0].Name;
                    k["div.location"] = {
                        span: j.Location
                    };
                    l !== "" ? k["div.from-price"] = {
                        span: b.util.currencies.formatShort(Math.ceil(l), b.gadget.currencyId)
                    } : (j._unavailable = !0,
                    k["div.from-price"] = {
                        span: ""
                    });
                    l = j.IsAAARated ? "aaa" : "self";
                    k["div.rating"] = {};
                    k["div.rating"]["span.type_" + l + " rating_" + j.StarRating.toString().replace(/\./, "_")] = {
                        "span.text": j.StarRating
                    };
                    h.push(g)
                })(k);
        f.append(h)
    }
    ;
    a.buildProductChooser = function(c, e) {
        var f = b.gadget.region.text.types
          , g = j
          , h = []
          , k = b.util.cookieName("1nT3r4ctlvEmAp")
          , k = d.json.parse(d.cookie(k))
          , h = a.getProductChooserModel(c, e)
          , h = a.constructProductChooserfrom(c, h);
        g.append(h);
        if (typeof e.forceDefaultTypes != "undefined" && e.forceDefaultTypes.length > 0)
            k = e.forceDefaultTypes;
        if (k === null || k.length === 0)
            if (k = ["accom"],
            !f.accom || g.find("div.accom").length === 0)
                k = [d(g.find("input")[0]).val()];
        for (var l, f = 0, h = k.length; f < h; f++)
            l = isNaN(parseInt(k[f], 10)) ? k[f] : "other_" + k[f],
            l = g.find("div." + l + " input"),
            l.attr({
                checked: !0
            }),
            l.parent().removeClass("greyed"),
            l.attr("rel") == "other" && l.trigger("click")
    }
    ;
    a.getProductChooserModel = function(c, d) {
        var e = []
          , e = b.gadget.region.text.types
          , e = a.hidePrimaryTypesThatAreUnwanted(d, e)
          , e = a.mergeTypesAndCategoriesObject(d.categories, e)
          , e = a.convertCategoriesToRenderItems(e);
        if (typeof d.interactiveMapUseOpGroupings != void 0 && d.interactiveMapUseOpGroupings && d.businessGroupings != "undefined" && d.businessGroupings.Groupings != "undefined") {
            var e = [], f;
            for (f in d.businessGroupings.Groupings)
                e.push({
                    index: f,
                    title: d.businessGroupings.Groupings[f]
                })
        }
        e = a.ApplySpecificTypesLogic(e, d.specificTypes);
        return {
            items: e,
            customMapIcons: d.customMapIcons,
            eventFunction: function(b) {
                a.updateTypes(b, c, d)
            }
        }
    }
    ;
    a.interactiveMapCookieName = function() {
        return b.util.cookieName("1nT3r4ctlvEmAp")
    }
    ;
    a.hidePrimaryTypesThatAreUnwanted = function(a, c) {
        if (b.util.exists(a.treatPrimaryTypeAsCategory) && a.treatPrimaryTypeAsCategory)
            return {};
        if (typeof a.hideCategories == "undefined")
            return c;
        if (a.hideCategories !== null )
            for (var d = 0, e = a.hideCategories.length; d < e; d++)
                try {
                    delete c[a.hideCategories[d]]
                } catch (f) {}
        return c
    }
    ;
    a.mergeTypesAndCategoriesObject = function(a, b) {
        for (var c in b)
            typeof a[c] == "undefined" && (a[c] = b[c]);
        return a
    }
    ;
    a.ApplySpecificTypesLogic = function(a, b) {
        var c = a;
        if (typeof b !== "undefined" && b != null ) {
            for (var d = [], e = 0, f = b.length; e < f; e++)
                for (var g = b[e], h = 0, j = a.length; h < j; h++) {
                    var k = c[h];
                    if (k.index == g) {
                        d.push({
                            index: g.toString(),
                            title: k.title
                        });
                        break
                    }
                }
            c = d
        }
        return c
    }
    ;
    a.convertCategoriesToRenderItems = function(a) {
        var b = [], c;
        for (c in a)
            a.hasOwnProperty(c) && b.push({
                index: c,
                title: a[c]
            });
        return b
    }
    ;
    a.constructProductChooserfrom = function(a, c) {
        for (var e = 0, f = 0, g = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], h = b.urls.img.mapIconGeneric, j, k, l, n, o = [], p, q = {
            accom: {
                icon: b.urls.img.mapIconAccom()
            },
            tours: {
                icon: b.urls.img.mapIconTours()
            },
            events: {
                icon: b.urls.img.mapIconEvents()
            },
            carhire: {
                icon: b.urls.img.mapIconCarHire()
            }
        }, w = 0, v = c.items.length; w < v; w++)
            if (c.items.hasOwnProperty(w)) {
                if (e > 11)
                    break;
                l = c.items[w].index;
                n = c.items[w].title;
                p = d._int.generateID();
                j = isNaN(l) ? l : "other_" + l;
                k = isNaN(l) ? j : "other";
                thisOne = {
                    div: {
                        img: {
                            _attr: {
                                src: function() {
                                    var a;
                                    c.customMapIcons !== null && typeof c.customMapIcons[l] != "undefined" ? a = c.customMapIcons[l].icon : isNaN(l) ? a = q[l].icon : (a = h(g[f]),
                                    f++);
                                    return m[l] = a
                                }()
                            }
                        },
                        " ": " ",
                        input: {
                            _attr: {
                                type: "checkbox",
                                value: l,
                                id: p,
                                rel: k
                            },
                            _events: {
                                click: c.eventFunction
                            }
                        },
                        "": " ",
                        label: {
                            "": n,
                            _attr: {
                                "for": p
                            }
                        },
                        _attr: {
                            "class": "greyed type " + j,
                            rel: l
                        }
                    }
                };
                o.push(thisOne);
                e++
            }
        o.push({
            "div.loading": {
                "span.outer": {
                    span: "Loading data..."
                }
            }
        });
        d.event.subscribe("map.productType.loading", function() {
            a.find("div.product-types div.loading").css({
                display: "block"
            })
        });
        d.event.subscribe("map.productType.completed", function() {
            a.find("div.product-types div.loading").css({
                display: "none"
            })
        });
        return o
    }
    ;
    a.constructUpdateTypesOtherUrl = function(a, c) {
        var d = b.urls.endpoints.getOpDetailsShort() + "?q=" + c.vcID;
        return d = typeof c.interactiveMapUseOpGroupings != void 0 && c.interactiveMapUseOpGroupings && c.businessGroupings != "undefined" && c.businessGroupings.Groupings != "undefined" ? d + "&BusinessTypeId=" + a : d + "&OperatorCategoryId=" + a
    }
    ;
    a.updateTypes = function(b, c, f) {
        var g = d(b.target.parentNode)
          , h = g.parent().find("input")
          , j = []
          , k = b.target.getAttribute("rel")
          , l = b.target.value;
        k == "other" && b.target.checked && typeof e[l] == "undefined" && (k = a.constructUpdateTypesOtherUrl(l, f),
        d.event.publish("map.productType.loading", c),
        d.getJSON(k, function(a) {
            d.event.publish("map.productType.completed", c);
            n.buildMarkers(c, f, l, a, !0)
        }));
        b.target.checked === !0 ? g.removeClass("greyed") : g.addClass("greyed");
        b = 0;
        for (g = h.length; b < g; b++)
            h[b].checked === !0 && typeof e[h[b].value] != "undefined" && j.push(h[b].value);
        b = 0;
        for (g = j.length; b < g; b++)
            b !== 0 ? n.showMarkers(j[b], !0, f) : n.showMarkers(j[b], !1, f);
        b = 0;
        for (g = h.length; b < g; b++)
            h[b].checked === !0 && typeof e[h[b].value] == "undefined" && j.push(h[b].value);
        j.length === 0 && a.removeAllMarkers();
        typeof f.forceDefaultTypes == "undefined" && d.cookie(a.interactiveMapCookieName(), d.json.stringify(j))
    }
    ;
    n.showMarkers = function(b, c, f) {
        var g = e[b]
          , j = d.event.publish;
        if (typeof g == "undefined")
            return !1;
        l.length !== 0 && a.buildSideBar(b);
        j("map.markers.start", h, b);
        c || a.removeAllMarkers();
        a.drawMarkers(b, g[0], g[1], g[2], g[3], f)
    }
    ;
    a.removeAllMarkers = function() {
        for (var a in c)
            if (c.hasOwnProperty(a)) {
                for (var b = c[a], d = b.length; d--; )
                    b[d] !== null && b[d].setMap(null );
                c[a] = []
            }
        n.resetBounds()
    }
    ;
    a.drawMarkers = function(a, e, g, j, k, m) {
        var q = e.length, v = c[a], z = b.gadget.region.itemURL, F = b.gadget.region.text.select, B, G, A = l, H = b.util.stripTags, I = b.urls.img.unloadedImg();
        for (G = 0; G < q; G++)
            (function(c) {
                var l = e[c].item;
                B = new h.google.maps.LatLng(l.Latitude,l.Longitude);
                var n = new h.google.maps.Marker({
                    position: B,
                    icon: g,
                    shadow: j,
                    shape: k,
                    map: f,
                    title: l.OperatorName
                });
                v.push(n);
                e[c].passed === !0 && l.Latitude !== 0 && l.Longitude !== 0 && w.extend(B);
                typeof l.Items != "undefined" && l.Items.sort(function(a, b) {
                    return a.Availability.Cost < b.Availability.Cost ? -1 : 1
                });
                if (typeof l.OperatorName == "undefined")
                    l.OperatorName = l.TradingName;
                var p = d({
                    "div.mapInfoWindow": {
                        "h3.name": l.OperatorName,
                        "div.address": H(l.Address || l.ResidentialAddress),
                        "div.thumb": function() {
                            var a = {}
                              , b = "";
                            if (typeof l.ImageUrls != "undefined" && typeof l.OtherImages == "undefined")
                                l.OtherImages = l.ImageUrls;
                            if (typeof l.PrimaryImage != "undefined")
                                b = l.PrimaryImage.ThumbnailImage;
                            else if (typeof l.OtherImages != "undefined" && l.OtherImages.length > 0)
                                b = l.OtherImages[0].ThumbnailImage;
                            b !== "" && (a["div.inner"] = {
                                img: {
                                    _attr: {
                                        rel: b.replace(/^http:/, ""),
                                        src: I
                                    }
                                }
                            });
                            return a
                        }(),
                        "div.details": function() {
                            if (typeof l.Items == "undefined" || l._unavailable === !0)
                                return "";
                            for (var a = [], c = l.Items.length, c = c > 3 ? 3 : c, d = 0; d < c; d++)
                                a.push({
                                    p: {
                                        _attr: {
                                            "class": function() {
                                                var a = "room";
                                                d == c - 1 && (a += " last");
                                                return a
                                            }()
                                        },
                                        "span.name": l.Items[d].Name,
                                        "": " ",
                                        "span.price": b.util.currencies.formatShort(Math.ceil(l.Items[d].Availability.Cost), b.gadget.currencyId)
                                    }
                                });
                            return a
                        }(),
                        "div.button im-pricebutton": {
                            "a.next": {
                                _attr: {
                                    href: z({
                                        id: l.OperatorId || l.OperatorID,
                                        name: l.OperatorName,
                                        type: a
                                    })
                                },
                                "span.next im-pricebutton-label": {
                                    span: F
                                }
                            }
                        }
                    }
                });
                if (l._unavailable && !function() {
                    var b = typeof m != "undefined"
                      , c = b && typeof m.showAllEvents != "undefined" && m.showAllEvents && a == "events"
                      , d = b && typeof m.showAllTours != "undefined" && m.showAllTours && a == "tours";
                    return b && typeof m.showAllAccom != "undefined" && m.showAllAccom && a == "accom" || c || d
                }()) {
                    var q = p.find("div.button im-pricebutton a.next");
                    q.attr({
                        href: "javascript://"
                    });
                    q.addClass("sold-out");
                    q.find("span.next span").text(h.BE.gadget.region.text.changeDates);
                    q.attr({
                        onclick: "javascript:BE.gadget.search.primaryDatePicker.show()"
                    })
                }
                var t = new google.maps.InfoWindow({
                    maxWidth: 500,
                    content: p[0]
                });
                google.maps.event.addListener(n, "click", function(a) {
                    o !== null && o.close();
                    var b = p.find("div.thumb img");
                    b.length !== 0 && b.attr("rel") !== "" && (b.attr({
                        src: b.attr("rel")
                    }),
                    b.attr({
                        rel: ""
                    }));
                    o = t;
                    t.open(f, this);
                    b = {
                        num: c,
                        doScroll: !0
                    };
                    typeof a == "undefined" && (b.doScroll = !1);
                    A.trigger("marker.clicked", b)
                })
            })(G);
        p || n.redraw(m)
    }
})(window);
(function(h) {
    h.BE.gadget.region.price.advanced = function(d, b) {
        var a, h = {};
        if (b.advancedPriceView !== null )
            a = b.advancedPriceView,
            h.order = a,
            h.on = !0;
        return h
    }
})(window);
(function(h) {
    var d = h.wisDOM, b = h.BE, a, k = {}, f = {}, c, e;
    e = c = f.locationHierarchy = null ;
    a = b.gadget.search.locations = {};
    a.buildRegionSearchAfter = function(a, b, d, f) {
        e = a;
        c = b;
        k.buildVCLocationsHierarchy(b, d, f)
    }
    ;
    a.showSourceData = function() {
        return f.locationHierarchy
    }
    ;
    a.getAllStates = function() {
        return k.getAllStates()
    }
    ;
    a.getRegionsByStates = function(a) {
        return k.getRegionsByStates(a)
    }
    ;
    a.getLocationsByRegions = function(a) {
        return k.getLocationsByRegions(a)
    }
    ;
    a.getCurrentRegion = function() {
        var a = d(".refineTools");
        if (typeof a == "undefined")
            return null ;
        a = a.find(".regionFilter");
        return a.length > 0 ? a.find("select")[0].value : null
    }
    ;
    a.getStateValue = function(a) {
        return a.find(".stateFilter select").val()
    }
    ;
    a.getRegionValue = function(a) {
        return a.find(".regionFilter select").val()
    }
    ;
    a.getLocationValue = function(a) {
        return a.find(".locationsFilter select").val()
    }
    ;
    a.refreshSearchCriteriaMet = function() {
        return k.refreshSearchCriteriaMet()
    }
    ;
    a.et = function() {
        return k
    }
    ;
    k.setDataStore = function(a) {
        f = a
    }
    ;
    k.getTimeOut = function() {
        return f.locationHierarchy == null ? 100 : 0
    }
    ;
    k.buildVCLocationsHierarchy = function(a, h, j) {
        var m = b.urls.endpoints.getVcLocationsHier() + "?q=" + a.vcID;
        typeof a.externalSearch != "undefined" && a.externalSearch && typeof a.enableRegionSearch != "undefined" && a.enableRegionSearch && (m += "&ShowAll=" + a.externalSearch);
        d.getJSON(m, function(m) {
            console.log('buildVCLocationsHierarchy');
            m = m.States;
            typeof a.limitLocations != "undefined" && a.limitLocations !== null && a.limitLocations.length > 0 && (m = k.limitLocations.filterLocationHierarchy(a, m));
            f.locationHierarchy = m;

            var m = k.getPreloadStateValue()
              , o = k.getPreloadRegionValue()
              , m = m != null && m != "" ? [m] : null
              , o = o != null && o != "" ? [k.getPreloadRegionValue()] : null ;
            d(k.elements.locations(o)).insertAfter(h);
            d(k.elements.regions(m)).insertAfter(h);
            d(k.elements.states()).insertAfter(h);
            typeof j != "undefined" && j && d(h).remove();
            k.setupSubscriptions();
            k.refreshRefineCookie();
            d.event.publish("region-search-locations-loaded", {});
            k.refreshSearchCriteriaMet() && b.gadget.region.getBEData(e, c);
            console.log('getBEData');
            console.log(b.gadget.region.getBEData(e, c));
        })
    }
    ;
    k.getPreloadStateValue = function() {
        var a = null
          , d = b.gadget.region.buildRefineTools.getRefineCookiePreffs();
        if (k.defaultOptionsAreDefined() && c.defaultRegionState != null )
            a = c.defaultRegionState;
        if (k.refinePrefsAreDefined(d) && d.searchState != null )
            a = d.searchState;
        if (k.forcedOptionsAreDefined() && typeof c.forceRegionState != "undefined" && c.forceRegionState != null )
            a = c.forceRegionState;
        return a
    }
    ;
    k.getPreloadRegionValue = function() {
        var a = null
          , d = b.gadget.region.buildRefineTools.getRefineCookiePreffs();
        if (k.defaultOptionsAreDefined() && c.defaultRegionRegion != null )
            a = c.defaultRegionRegion;
        if (k.refinePrefsAreDefined(d) && d.searchRegion != null )
            a = d.searchRegion;
        if (k.forcedOptionsAreDefined() && typeof c.forceRegionRegion != "undefined" && c.forceRegionRegion != null )
            a = c.forceRegionRegion;
        return a
    }
    ;
    k.getPreloadLocationValue = function() {
        var a = null
          , d = b.gadget.region.buildRefineTools.getRefineCookiePreffs();
        if (k.defaultOptionsAreDefined() && c.defaultRegionLoc != null )
            a = c.defaultRegionLoc;
        if (k.refinePrefsAreDefined(d) && d.searchLoc != null )
            a = d.searchLoc;
        if (k.forcedOptionsAreDefined() && typeof c.forceRegionLoc != "undefined" && c.forceRegionLoc != null )
            a = c.forceRegionLoc;
        return a
    }
    ;
    k.getAllStates = function() {
        for (var a = [], b = 0, c = f.locationHierarchy.length; b < c; b++)
            a.push(f.locationHierarchy[b].StateCode);
        return a = a.sort()
    }
    ;
    k.getRegionsByStates = function(a) {
        var b = []
          , c = "";
        a != null && a.length > 0 && (c = a.join(" ").toLowerCase());
        for (var d = 0, e = f.locationHierarchy.length; d < e; d++) {
            var h = f.locationHierarchy[d];
            if (typeof a == "undefined" || a == null || c.indexOf(h.StateCode.toLowerCase()) != -1)
                b = b.concat(h.Regions)
        }
        return b = b.sort(function(a, b) {
            if (a.RegionsDesc < b.RegionsDesc)
                return -1;
            if (a.RegionsDesc > b.RegionsDesc)
                return 1;
            return 0
        })
    }
    ;
    k.getLocationsByRegions = function(a) {
        var b = []
          , c = "";
        typeof a != "undefined" && a != null && a.length > 0 && (c = a.join(" ").toLowerCase());
        for (var d = 0, e = f.locationHierarchy.length; d < e; d++)
            for (var h = 0, k = f.locationHierarchy[d].Regions.length; h < k; h++) {
                var v = f.locationHierarchy[d].Regions[h];
                if (typeof a == "undefined" || a == null || c.indexOf(v.RegionsDesc.toLowerCase()) != -1)
                    b = b.concat(v.Locations)
            }
        return b = b.sort(function(a, b) {
            if (a.LocationDesc < b.LocationDesc)
                return -1;
            if (a.LocationDesc > b.LocationDesc)
                return 1;
            return 0
        })
    }
    ;
    k.limitLocations = {};
    k.limitLocations.filterLocationHierarchy = function(a, b) {
        return k.limitLocations.filterStates(a.limitLocations, b)
    }
    ;
    k.limitLocations.filterStates = function(a, b) {
        for (var c = [], d = 0, e = b.length; d < e; d++) {
            var f = b[d]
              , h = k.limitLocations.filterRegions(a, f.Regions);
            if (h.length > 0)
                f.Regions = h,
                c.push(f)
        }
        return c
    }
    ;
    k.limitLocations.filterRegions = function(a, b) {
        for (var c = [], d = 0, e = b.length; d < e; d++) {
            var f = b[d]
              , h = k.limitLocations.filterLocations(a, f.Locations);
            if (h.length > 0)
                f.Locations = h,
                c.push(f)
        }
        return c
    }
    ;
    k.limitLocations.filterLocations = function(a, b) {
        for (var c = [], d = 0, e = b.length; d < e; d++)
            for (var f = b[d], h = 0, k = a.length; h < k; h++) {
                var p = a[h].toLowerCase();
                if (f.LocationDesc.toLowerCase() == p) {
                    c.push(f);
                    break
                }
            }
        return c
    }
    ;
    k.forcedOptionsAreDefined = function() {
        return c.forceRegionState != null || c.forceRegionRegion != null || c.forceRegionLoc != null
    }
    ;
    k.defaultOptionsAreDefined = function() {
        return c.defaultRegionState != null || c.defaultRegionRegion != null || c.defaultRegionLoc != null
    }
    ;
    k.refinePrefsAreDefined = function(a) {
        return typeof a.searchLoc != "undefined" || typeof a.searchRegion != "undefined" || typeof a.searchState != "undefined"
    }
    ;
    k.text = {};
    k.text.All = "--- All ---";
    k.text.stateFilter = {};
    k.text.stateFilter.label = "State";
    k.text.statesAll = "--- All ---";
    k.text.regionFilter = {};
    k.text.regionFilter.label = "Region";
    k.text.locationsFilter = {};
    k.text.locationsFilter.label = "Location";
    k.elements = {};
    k.elements.states = function() {
        var a = {}
          , d = {
            "span.label": k.text.stateFilter,
            "span.input": {
                select: function() {
                    for (var a = b.gadget.search.locations.getAllStates(), c = [{
                        option: {
                            "": k.text.All,
                            _attr: {
                                value: ""
                            }
                        }
                    }], d = k.getPreloadStateValue(), e, f = 0, g = a.length; f < g; f++) {
                        e = {
                            option: {
                                "": b.util.stripTags(a[f]),
                                _attr: {
                                    value: a[f]
                                }
                            }
                        };
                        if (d == a[f])
                            e.option._attr.selected = "selected";
                        c.push(e)
                    }
                    return c
                }()
            }
        };
        c.forceRegionRegion != null || c.forceRegionState != null || c.forceRegionLoc != null ? a["div.stateFilter hide"] = d : a["div.stateFilter"] = d;
        return a
    }
    ;
    k.elements.regions = function(a) {
        var b = {}
          , a = {
            "span.label": k.text.regionFilter,
            "span.input": {
                select: k.elements.regions.buildRegionSelectOptions(a)
            }
        };
        c.forceRegionRegion != null || c.forceRegionLoc != null ? b["div.regionFilter hide"] = a : b["div.regionFilter"] = a;
        return b
    }
    ;
    k.elements.regions.buildRegionSelectOptions = function(a, c) {


        for (var d = b.gadget.search.locations.getRegionsByStates(a), e = [{
            option: {
                "": k.text.All,
                _attr: {
                    value: ""
                }
            }
        }], f = k.getPreloadRegionValue(), h = typeof c != "undefined" ? c : !0, w, v = 0, p = d.length; v < p; v++) {
            var q = d[v].RegionsDesc == "" ? "." : d[v].RegionsDesc;
            w = {
                option: {
                    "": b.util.stripTags(q),
                    _attr: {
                        value: q
                    }
                }
            };
            if (f == q && h)
                w.option._attr.selected = "selected";
            e.push(w)
        }
        return e
    }
    ;
    k.elements.locations = function(a) {
        var b = {}
          , a = {
            "span.label": k.text.locationsFilter,
            "span.input": {
                select: k.elements.regions.buildLocationSelectOptions(a)
            }
        };
        b[c.forceRegionLoc != null ? "div.locationsFilter hide" : "div.locationsFilter"] = a;
        return b
    }
    ;
    k.elements.regions.buildLocationSelectOptions = function(a, c) {
        console.log(b.gadget.search.locations.getLocationsByRegions(a));
        for (var d = b.gadget.search.locations.getLocationsByRegions(a), e = [{
            option: {
                "": k.text.All,
                _attr: {
                    value: ""
                }
            }
        }], f = k.getPreloadLocationValue(), h = typeof c != "undefined" ? c : !0, w, v = 0, p = d.length; v < p; v++) {
            w = {
                option: {
                    "": b.util.stripTags(d[v].LocationDesc),
                    _attr: {
                        value: d[v].LocationDesc
                    }
                }
            };
            if (f == d[v].LocationDesc && h)
                w.option._attr.selected = "selected";
            e.push(w)
        }
        return e
    }
    ;
    k.setupSubscriptions = function() {
        var a = d(".refineTools");
        a.find(".locationsFilter").bind("change", k.refreshRegionGrid);
        a.find(".regionFilter select").bind("change", k.refreshLocationSelectList);
        a.find(".stateFilter select").bind("change", k.refreshRegionSelectList)
    }
    ;
    k.refreshRegionSelectList = function() {
        var a = d(".refineTools");
        if (a.length > 0) {
            b.gadget.region.buildRefineTools.clearRefineCookie();
            for (var c = a.find(".stateFilter").find("select")[0].value, a = a.find(".regionFilter"), e = a.find("option"), f = 0, h = e.length; f < h; f++)
                d(e[f]).remove();
            a.find("select").append(k.elements.regions.buildRegionSelectOptions(c != "" ? [c] : null , !1));
            k.refreshLocationSelectList()
        }
    }
    ;
    k.refreshLocationSelectList = function() {
        var a = d(".refineTools");
        if (a.length > 0) {
            b.gadget.region.buildRefineTools.clearRefineCookie();
            var c = a.find(".regionFilter")
              , f = c.find("select")[0].value
              , h = a.find(".locationsFilter");
            if (typeof h != "undefined") {
                for (var n = h.find("option"), o = 0, w = n.length; o < w; o++)
                    d(n[o]).remove();
                if (f == "") {
                    f = [];
                    c = c.find("option");
                    o = 0;
                    for (w = c.length; o < w; o++)
                        n = d(c[o]).attr("value"),
                        n != "" && f.push(n);
                    h.find("select").append(k.elements.regions.buildLocationSelectOptions(f, !1))
                } else
                    h.find("select").append(k.elements.regions.buildLocationSelectOptions([f], !1));
                a.parents("div.region-gadget").length > 0 && h.trigger("change")
            }
            b.gadget.region.buildRefineTools.saveRefineCookie(e)
        }
    }
    ;
    k.refreshRegionGrid = function(a) {
        if (d("div.region-gadget").length > 0) {
            var f = /(^\s|\s$)/g;
            b.gadget.search.userState();
            typeof a != "undefined" && typeof a.target.value != "undefined" ? a.target.value.replace(f, "") : d(a.target).find("select").val();
            k.refreshRefineCookie();
            k.refreshSearchCriteriaMet() ? (typeof b.gadget.region.map != "undefined" && b.gadget.region.map.clearAll(e, c),
            b.gadget.region.getBEData(e, c),
            typeof b.gadget.region.map != "undefined" && b.gadget.region.map.attachMapCode(e, c)) : (typeof b.gadget.region.price != "undefined" && b.gadget.region.price.clearAll(e),
            typeof b.gadget.region.list != "undefined" && b.gadget.region.list.clearAll(e),
            typeof b.gadget.region.map != "undefined" && b.gadget.region.map.clearAll(e))
        } else
            k.refreshRefineCookie()
    }
    ;
    k.refreshSearchCriteriaMet = function() {
        if (d(".region-gadget").length <= 0)
            return !1;
        var b = a.getRegionValue(e)
          , c = a.getLocationValue(e);
        return b != "" || c != ""
    }
    ;
    k.refreshRefineCookie = function() {
        b.gadget.region.buildRefineTools.clearRefineCookie();
        b.gadget.region.buildRefineTools.saveRefineCookie(e)
    }
})(window);
(function(h) {
    var d = h.wisDOM
      , b = h.BE
      , a = {}
      , k = b.util.exists;
    b.gadget.tripPlanner = function(f, c) {
        if (d(f).length === 0)
            return !1;
        b.gadget.init(c, function() {
            var b = d(f);
            b.length !== 0 && a._init(b, c)
        })
    }
    ;
    b.gadget.tripPlanner.events = {
        eventName: {
            name: "",
            description: ""
        }
    };
    b.gadget.tripPlanner.target = void 0;
    b.gadget.tripPlanner.isActive = !1;
    a._init = function(f, c) {
        b.gadget.tripPlanner.target = d(f);
        a.location = b.gadget.tripPlanner.target;
        b.gadget.tripPlanner.isActive = !0;
        if (!a.areRequiredOptionsSupplied(c))
            return !1;
        d(f).append({
            "div.trip-planner-gadget": {}
        });
        f = f.find("div.trip-planner-gadget");
        a.getRequiredSjpInformation(c, function(d) {
            var g = d.tripInfo;
            b.gadget.tripPlanner.tripData = g;
            if (!a.requiredSjpChecksMet(g))
                return !1;
            var h = a.buildPlannerModel(c, g)
              , h = a.getPlannerHtml(h);
            f.append(h);
            b.gadget.tripPlanner.search.render(c, d);
            b.gadget.tripPlanner.tabs.init(f);
            b.gadget.cart("#CartGadget", {
                vcID: c.vcId,
                bookingURL: c.bookingURL,
                tripPlannerMode: !0,
                reuseBookingQuestions: c.reuseBookingQuestions
            });
            b.gadget.tripPlanner.map.renderMap("MapContainer", {
                vcId: c.vcId,
                tripInfo: g
            });
            a.wireUpEvents(f, c, g)
        });
        return !0
    }
    ;
    a.areRequiredOptionsSupplied = function(a) {
        if (!k(a.vcId))
            return !1;
        if (!k(a.tripId))
            return !1;
        return !0
    }
    ;
    a.getRequiredSjpInformation = function(a, c) {
        var e = "?q=" + a.tripId + "&vcId=" + a.vcId
          , e = b.urls.endpoints.getVcTripInfo() + e;
        d.getJSON(e, function(a) {
            b.gadget.cart.getCart(function(b) {
                c({
                    tripInfo: a,
                    cartInfo: b
                })
            })
        })
    }
    ;
    a.requiredSjpChecksMet = function() {
        return !0
    }
    ;
    a.buildPlannerModel = function() {
        return {}
    }
    ;
    a.getPlannerHtml = function() {
        return {
            "div.planner-window": {
                "div.left-container": {
                    "div.cart-container": {
                        _attr: {
                            id: "CartGadget"
                        }
                    }
                },
                "div.right-container": {
                    "div#search-container": {},
                    "div.tabs-container": {
                        "ul.nav nav-tabs": [{
                            "li.active": {
                                a: {
                                    "": "Map",
                                    _attr: {
                                        rel: "#MapContainer"
                                    }
                                }
                            },
                            li: {
                                a: {
                                    "": "Products",
                                    _attr: {
                                        rel: "#RegionGadget"
                                    }
                                }
                            }
                        }]
                    },
                    "div.map-container tab-window": {
                        _attr: {
                            id: "MapContainer"
                        }
                    },
                    "div.region-gadget-container tab-window hidden": {
                        _attr: {
                            id: "RegionGadget"
                        }
                    }
                },
                "div.clear": {}
            }
        }
    }
    ;
    a.wireUpEvents = function() {}
})(window);
(function(h) {
    var d = h.wisDOM
      , b = h.BE
      , a = {
        getHtml: function(a) {
            return d({
                "div.products-container": {
                    "div.product-info": {
                        h1: a.Name,
                        p: a.Description
                    },
                    "div#tp-be-gadget": {}
                }
            })
        },
        attachRegionGadget: function(a, d, c) {
            b.gadget.region("#tp-be-gadget", {
                vcID: d.vcId,
                collapseRefineTools: !1,
                defaultSort: "instant",
                disabledTypes: ["tours", "event", "carhire", "events", "packages"],
                itemDetailPageURL: "/src/spa/operator/",
                showDetailsInline: !0,
                showMap: !1,
                stageId: c.StageId,
                noPeriod: 1,
                embedSearch: !1,
                showRefineTools: !1
            })
        },
        attachOperatorGadget: function(a, d, c) {
            b.gadget.operator(a, {
                vcID: d.vcId,
                type: "accom",
                productID: c.AccomItems[0].CustomerId,
                stageId: c.StageId,
                noPeriod: 1,
                itemDetailsOptions: {
                    defaultDaysFromToday: 4,
                    stageId: c.StageId,
                    noPeriod: 1,
                    embedSearch: !1
                },
                useImageSlideShow: {
                    jQueryObject: $j
                }
            })
        }
    };
    a.render = function(b, f, c) {
        b = d(b);
        b.empty();
        b.append(a.getHtml(c));
        b = c.AccomItems.length;
        b > 1 ? a.attachRegionGadget("#tp-be-gadget", f, c) : b === 1 && a.attachOperatorGadget("#tp-be-gadget", f, c)
    }
    ;
    b.gadget.tripPlanner.productView = {
        render: a.render
    }
})(window);
(function(h) {
    var d = h.wisDOM
      , h = h.BE
      , b = {
        location: void 0
    };
    b.attachTabsEvents = function(a) {
        a.find(".nav a").bind("click", function() {
            var a = d(this).attr("rel");
            a !== "#RegionGadget" && b.ShowTab(a)
        })
    }
    ;
    b.hideAllWindows = function() {
        b.location.find(".tab-window").removeClass("active")
    }
    ;
    b.ShowTab = function(a) {
        var h = b.location.find(".tab-window")
          , f = b.location.find(".nav li");
        h.addClass("hidden");
        f.removeClass("active");
        b.location.find(a).removeClass("hidden");
        for (h = 0; h < f.length; h++) {
            var c = d(f[h]);
            c.find("a").attr("rel") === a && c.addClass("active")
        }
    }
    ;
    b.showProductsTab = function() {
        b.ShowTab("#RegionGadget")
    }
    ;
    b.init = function(a) {
        b.location = d(a);
        b.attachTabsEvents(b.location)
    }
    ;
    h.gadget.tripPlanner.tabs = {
        init: b.init,
        attachEvents: b.attachTabsEvents,
        showMapTab: function() {
            b.ShowTab("#MapContainer")
        },
        showProductsTab: function() {
            b.ShowTab("#RegionGadget")
        }
    }
})(window);
(function(h) {
    var d = h.wisDOM
      , b = h.BE
      , a = {}
      , k = b.gadget.tripPlanner.tabs;
    a.renderMap = function(b, c) {
        var e = "mapsCB" + d._int.generateID();
        h[e] = function() {
            a.initialiseMap(b, c)
        }
        ;
        d("head").append({
            script: {
                _attr: {
                    type: "text/javascript",
                    src: "//maps.google.com/maps/api/js?sensor=false&callback=" + e
                }
            }
        })
    }
    ;
    a.mapIcons = {};
    a.mapInfoWindows = {};
    a.mapHandle = void 0;
    a.options = {};
    a.flightPath = void 0;
    a.flightPathCanTravelTo = [];
    a.closeAllInfoWindows = function() {
        for (var b in a.mapInfoWindows)
            a.mapInfoWindows.hasOwnProperty(b) && a.mapInfoWindows[b].close()
    }
    ;
    a.buildMapInfoWindow = function(a, c, e, g) {
        if (!g)
            return d({
                "div.info-window-container": {
                    "div.info-window-content": "You can not travel here at this time."
                }
            })[0];
        return d({
            "div.info-window-container": {
                "div.info-window-content": {
                    "h3.be-google-map-point-title": c.Name,
                    "p.1": function() {
                        var a = c.Description || "";
                        a.length > 300 && (a = a.substr(1, 300) + "...");
                        return a
                    }(),
                    p: function() {
                        if (e)
                            return {
                                "div#tp-item-details": {}
                            };
                        return {
                            button: {
                                span: "View",
                                _events: {
                                    click: function() {
                                        b.gadget.tripPlanner.productView.render("#RegionGadget", a, c);
                                        k.showProductsTab()
                                    }
                                }
                            }
                        }
                    }()
                }
            }
        })[0]
    }
    ;
    a.canTravelToStage = function(a, c, d) {
        if (!d && a.IsStartStage)
            return !0;
        if (!d || !b.util.exists(c))
            return !1;
        if (!b.util.exists(c.LinkedStages))
            return !1;
        return b.util.existsInArray(a, c.LinkedStages, function(a, b) {
            return a.StageId === b.LinkedStageId
        })
    }
    ;
    a.attachStageIcon = function(f, c, e, g, h, j) {
        var k = new google.maps.LatLng(e.Latitude,e.Longitude)
          , n = e.AccomItems.length === 1 && e.AccomItems[0].RoomItems.length === 1
          , o = a.canTravelToStage(e, g, h)
          , w = a.buildStageMarker(f, c, k, o, e, j)
          , v = new google.maps.InfoWindow({
            content: a.buildMapInfoWindow(c, e, n, o)
        });
        google.maps.event.addListener(w, "click", function() {
            a.closeAllInfoWindows();
            b.gadget.cart.getCart(function(a) {
                f.setCenter(w.getPosition());
                v.open(f, w);
                b.gadget.tripPlanner.search.render({
                    vcId: c.vcId,
                    canChooseArrivalDate: e.CanChooseArrivalDate
                }, a);
                n && o && (d("#tp-item-details").empty(),
                b.gadget.details("#tp-item-details", {
                    vcID: c.vcId,
                    stageId: e.StageId,
                    productID: e.AccomItems[0].CustomerId,
                    type: "accom",
                    noPeriod: 1,
                    embedSearch: !1
                }))
            })
        });
        a.mapIcons[e.StageId] = w;
        a.mapInfoWindows[e.StageId] = v;
        return k
    }
    ;
    a.buildStageMarker = function(a, b, d, g, h, j) {
        b = "//chart.apis.google.com/chart?chst=d_map_pin_letter_withshadow&chld=%E2%80%A2|" + (!g ? "CCCCCC" : "29A329");
        if (j && typeof h.ImageAdded != "undefined" && h.ImageAdded.length > 0)
            b = h.ImageAdded;
        else if (!g && typeof h.ImageUnavailable != "undefined" && h.ImageUnavailable.length > 0)
            b = h.ImageUnavailable;
        else if (g && typeof h.ImageAvailable != "undefined" && h.ImageAvailable.length > 0)
            b = h.ImageAvailable;
        h.IsEndStage && (b = "/src/_shared/img/end.png");
        g = new google.maps.MarkerImage(b,new google.maps.Size(60,60),new google.maps.Point(0,0),new google.maps.Point(10,35));
        return new google.maps.Marker({
            position: d,
            map: a,
            title: h.Name,
            icon: g
        })
    }
    ;
    a.removeAllMarkers = function() {
        for (var b in a.mapIcons)
            a.mapIcons.hasOwnProperty(b) && a.mapIcons[b].setMap(null );
        a.mapIcons = [];
        a.mapInfoWindows = []
    }
    ;
    a.getCartStageContent = function(a) {
        var c = [];
        b.util.exists(a.cartcontent) && (c = b.util.grep(a.cartcontent, function(a) {
            return b.util.exists(a.stage)
        }).sort(function(a, b) {
            return a.stage.sort - b.stage.sort
        }));
        return c
    }
    ;
    a.getStageInfo = function(a, c) {
        if (b.util.exists(a) && b.util.exists(c) && b.util.exists(a.Stages))
            return b.util.last(b.util.grep(a.Stages, function(a) {
                return a.StageId === c
            }))
    }
    ;
    a.attachStagesToMap = function(d, c, e) {
        b.gadget.cart.getCart(function(g) {
            for (var g = a.getCartStageContent(g), h = b.util.last(g), j = b.util.exists(h) ? h.stage.stageId : void 0, j = a.getStageInfo(e, j), h = b.util.exists(h), k = new google.maps.LatLngBounds, n = 0; n < e.Stages.length; n++) {
                var o = e.Stages[n]
                  , w = a.isStageInCart(g, o.StageId)
                  , o = a.attachStageIcon(d, c, o, j, h, w);
                k.extend(o)
            }
            d.fitBounds(k);
            a.attachPolyLines(g, j)
        })
    }
    ;
    a.isStageInCart = function(a, b) {
        if (a.length === 0)
            return !1;
        for (var d = 0; d < a.length; d++)
            if (a[d].stage.stageId === b)
                return !0;
        return !1
    }
    ;
    a.drawPoly = function(d, c, e, g, h, j, k) {
        b.util.exists(h) || (h = {});
        !j && b.util.exists(g) ? d.route({
            origin: c,
            destination: e,
            travelMode: g
        }, function(d, f) {
            if (f === google.maps.DirectionsStatus.OK) {
                var g = [];
                if (d.routes[0].overview_path.length > 0)
                    g = d.routes[0].overview_path;
                g = new google.maps.Polyline(b.util.mergeObjects({
                    path: g
                }, h))
            } else
                g = new google.maps.Polyline(b.util.mergeObjects({
                    path: [c, e]
                }, h));
            a.flightPathCanTravelTo.push(g);
            g.setMap(a.mapHandle)
        }) : (d = j ? new google.maps.Polyline(b.util.mergeObjects({
            path: k
        }, h)) : new google.maps.Polyline(b.util.mergeObjects({
            path: [c, e]
        }, h)),
        a.flightPathCanTravelTo.push(d),
        d.setMap(a.mapHandle))
    }
    ;
    a.convertCustomLatLongs = function(a) {
        return b.util.map(a, function(a) {
            return new google.maps.LatLng(a.Latitude,a.Longitude)
        })
    }
    ;
    a.attachPolyLines = function(d, c) {
        var e = new google.maps.DirectionsService
          , g = [google.maps.TravelMode.WALKING, google.maps.TravelMode.DRIVING, void 0];
        if (b.util.exists(a.flightPath))
            a.flightPath.setMap(null ),
            a.flightPaht = void 0;
        b.util.each(a.flightPathCanTravelTo, function(a, b) {
            b.setMap(null )
        });
        a.flightPathCanTravelTo = [];
        for (var h = b.util.map(d, function(c) {
            c = a.getStageInfo(b.gadget.tripPlanner.tripData, c.stage.stageId);
            return {
                info: c,
                latLng: new google.maps.LatLng(c.Latitude,c.Longitude)
            }
        }), j = 0; j < h.length; j++) {
            var k = h[j]
              , n = h[j + 1];
            if (b.util.exists(n)) {
                var o = void 0
                  , w = !1
                  , v = []
                  , p = b.util.last(b.util.grep(k.info.LinkedStages, function(a) {
                    return a.LinkedStageId === n.info.StageId
                }));
                b.util.exists(p) && (o = g[p.TravelType],
                v = (w = p.TravelType === 3) ? a.convertCustomLatLongs(p.CustomLatLongs) : []);
                a.drawPoly(e, k.latLng, n.latLng, o, {
                    strokeColor: "#009933"
                }, w, v)
            }
        }
        b.util.exists(c) && (h = b.util.map(c.LinkedStages, function(d) {
            var e = a.getStageInfo(b.gadget.tripPlanner.tripData, d.LinkedStageId)
              , f = a.getStageInfo(b.gadget.tripPlanner.tripData, c.StageId)
              , h = void 0
              , j = d.TravelType === 3
              , d = a.convertCustomLatLongs(d.CustomLatLongs)
              , f = b.util.last(b.util.grep(f.LinkedStages, function(a) {
                return a.LinkedStageId === e.StageId
            }));
            b.util.exists(f) && (h = g[f.TravelType]);
            return {
                travelMode: h,
                coordinates: [new google.maps.LatLng(c.Latitude,c.Longitude), new google.maps.LatLng(e.Latitude,e.Longitude)],
                isCustom: j,
                customLatLongs: d
            }
        }),
        b.util.each(h, function(b, c) {
            a.drawPoly(e, c.coordinates[0], c.coordinates[1], c.travelMode, {
                strokeColor: "#0033CC",
                strokeOpacity: 0,
                icons: [{
                    icon: {
                        path: "M 0,-1 0,1",
                        strokeOpacity: 1,
                        scale: 2
                    },
                    offset: "0",
                    repeat: "10px"
                }]
            }, c.isCustom, c.customLatLongs)
        }))
    }
    ;
    a.initialiseMap = function(f, c) {
        var e = document.getElementById(f)
          , g = {
            center: new google.maps.LatLng(c.tripInfo.Latitude,c.tripInfo.Longitude),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
          , e = new google.maps.Map(e,g);
        a.mapHandle = e;
        a.options = c;
        a.attachStagesToMap(e, c, c.tripInfo);
        d.event.subscribe("cart.save.complete", function() {
            setTimeout(function() {
                b.gadget.cart.getCart(function(d) {
                    b.gadget.tripPlanner.search.render({
                        vcId: c.vcId
                    }, d);
                    b.gadget.tripPlanner.tabs.showMapTab();
                    a.removeAllMarkers();
                    a.drawMarkers()
                })
            }, 200)
        })
    }
    ;
    a.drawMarkers = function() {
        a.attachStagesToMap(a.mapHandle, a.options, a.options.tripInfo)
    }
    ;
    b.gadget.tripPlanner.map = {
        renderMap: a.renderMap,
        removeAllMarkers: a.removeAllMarkers,
        attachAllMarkers: a.drawMarkers,
        mapIcons: a.mapIcons
    }
})(window);
(function(h) {
    var d = h.wisDOM
      , b = h.BE;
    b.gadget.tripPlanner.search = {
        render: function(a, h) {
            d("#search-container").empty();
            var f = {
                vcID: a.vcId,
                forcePeriod: 1
            }
              , c = b.util.last(h.cartcontent);
            if (b.util.exists(c) && (c = c.startdate,
            c.setDate(c.getDate() + 1),
            c = d.datePicker.encode(c, "DAY DD/MM/YYYY"),
            !a.canChooseArrivalDate))
                f.disableDatePicker = !0,
                f.forceDate = c;
            b.gadget.search.embed(f).appendTo("#search-container");
            f = d("#search-container");
            f.find(".product").addClass("hidden");
            f.find("div.search-gadget.BE .button").addClass("hidden");
            f.find("div.search-gadget.BE .period").addClass("hidden")
        }
    }
})(window);
