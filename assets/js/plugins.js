/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery)
  throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (a) {
  "use strict";
  var b = a.fn.jquery.split(" ")[0].split(".");
  if (
    (b[0] < 2 && b[1] < 9) ||
    (1 == b[0] && 9 == b[1] && b[2] < 1) ||
    b[0] > 3
  )
    throw new Error(
      "Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4"
    );
})(jQuery),
  +(function (a) {
    "use strict";
    function b() {
      var a = document.createElement("bootstrap"),
        b = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd otransitionend",
          transition: "transitionend",
        };
      for (var c in b) if (void 0 !== a.style[c]) return { end: b[c] };
      return !1;
    }
    (a.fn.emulateTransitionEnd = function (b) {
      var c = !1,
        d = this;
      a(this).one("bsTransitionEnd", function () {
        c = !0;
      });
      var e = function () {
        c || a(d).trigger(a.support.transition.end);
      };
      return setTimeout(e, b), this;
    }),
      a(function () {
        (a.support.transition = b()),
          a.support.transition &&
            (a.event.special.bsTransitionEnd = {
              bindType: a.support.transition.end,
              delegateType: a.support.transition.end,
              handle: function (b) {
                if (a(b.target).is(this))
                  return b.handleObj.handler.apply(this, arguments);
              },
            });
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var c = a(this),
          e = c.data("bs.alert");
        e || c.data("bs.alert", (e = new d(this))),
          "string" == typeof b && e[b].call(c);
      });
    }
    var c = '[data-dismiss="alert"]',
      d = function (b) {
        a(b).on("click", c, this.close);
      };
    (d.VERSION = "3.3.7"),
      (d.TRANSITION_DURATION = 150),
      (d.prototype.close = function (b) {
        function c() {
          g.detach().trigger("closed.bs.alert").remove();
        }
        var e = a(this),
          f = e.attr("data-target");
        f || ((f = e.attr("href")), (f = f && f.replace(/.*(?=#[^\s]*$)/, "")));
        var g = a("#" === f ? [] : f);
        b && b.preventDefault(),
          g.length || (g = e.closest(".alert")),
          g.trigger((b = a.Event("close.bs.alert"))),
          b.isDefaultPrevented() ||
            (g.removeClass("in"),
            a.support.transition && g.hasClass("fade")
              ? g
                  .one("bsTransitionEnd", c)
                  .emulateTransitionEnd(d.TRANSITION_DURATION)
              : c());
      });
    var e = a.fn.alert;
    (a.fn.alert = b),
      (a.fn.alert.Constructor = d),
      (a.fn.alert.noConflict = function () {
        return (a.fn.alert = e), this;
      }),
      a(document).on("click.bs.alert.data-api", c, d.prototype.close);
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.button"),
          f = "object" == typeof b && b;
        e || d.data("bs.button", (e = new c(this, f))),
          "toggle" == b ? e.toggle() : b && e.setState(b);
      });
    }
    var c = function (b, d) {
      (this.$element = a(b)),
        (this.options = a.extend({}, c.DEFAULTS, d)),
        (this.isLoading = !1);
    };
    (c.VERSION = "3.3.7"),
      (c.DEFAULTS = { loadingText: "loading..." }),
      (c.prototype.setState = function (b) {
        var c = "disabled",
          d = this.$element,
          e = d.is("input") ? "val" : "html",
          f = d.data();
        (b += "Text"),
          null == f.resetText && d.data("resetText", d[e]()),
          setTimeout(
            a.proxy(function () {
              d[e](null == f[b] ? this.options[b] : f[b]),
                "loadingText" == b
                  ? ((this.isLoading = !0),
                    d.addClass(c).attr(c, c).prop(c, !0))
                  : this.isLoading &&
                    ((this.isLoading = !1),
                    d.removeClass(c).removeAttr(c).prop(c, !1));
            }, this),
            0
          );
      }),
      (c.prototype.toggle = function () {
        var a = !0,
          b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
          var c = this.$element.find("input");
          "radio" == c.prop("type")
            ? (c.prop("checked") && (a = !1),
              b.find(".active").removeClass("active"),
              this.$element.addClass("active"))
            : "checkbox" == c.prop("type") &&
              (c.prop("checked") !== this.$element.hasClass("active") &&
                (a = !1),
              this.$element.toggleClass("active")),
            c.prop("checked", this.$element.hasClass("active")),
            a && c.trigger("change");
        } else
          this.$element.attr("aria-pressed", !this.$element.hasClass("active")),
            this.$element.toggleClass("active");
      });
    var d = a.fn.button;
    (a.fn.button = b),
      (a.fn.button.Constructor = c),
      (a.fn.button.noConflict = function () {
        return (a.fn.button = d), this;
      }),
      a(document)
        .on(
          "click.bs.button.data-api",
          '[data-toggle^="button"]',
          function (c) {
            var d = a(c.target).closest(".btn");
            b.call(d, "toggle"),
              a(c.target).is('input[type="radio"], input[type="checkbox"]') ||
                (c.preventDefault(),
                d.is("input,button")
                  ? d.trigger("focus")
                  : d
                      .find("input:visible,button:visible")
                      .first()
                      .trigger("focus"));
          }
        )
        .on(
          "focus.bs.button.data-api blur.bs.button.data-api",
          '[data-toggle^="button"]',
          function (b) {
            a(b.target)
              .closest(".btn")
              .toggleClass("focus", /^focus(in)?$/.test(b.type));
          }
        );
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.carousel"),
          f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
          g = "string" == typeof b ? b : f.slide;
        e || d.data("bs.carousel", (e = new c(this, f))),
          "number" == typeof b
            ? e.to(b)
            : g
            ? e[g]()
            : f.interval && e.pause().cycle();
      });
    }
    var c = function (b, c) {
      (this.$element = a(b)),
        (this.$indicators = this.$element.find(".carousel-indicators")),
        (this.options = c),
        (this.paused = null),
        (this.sliding = null),
        (this.interval = null),
        (this.$active = null),
        (this.$items = null),
        this.options.keyboard &&
          this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)),
        "hover" == this.options.pause &&
          !("ontouchstart" in document.documentElement) &&
          this.$element
            .on("mouseenter.bs.carousel", a.proxy(this.pause, this))
            .on("mouseleave.bs.carousel", a.proxy(this.cycle, this));
    };
    (c.VERSION = "3.3.7"),
      (c.TRANSITION_DURATION = 600),
      (c.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 }),
      (c.prototype.keydown = function (a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
          switch (a.which) {
            case 37:
              this.prev();
              break;
            case 39:
              this.next();
              break;
            default:
              return;
          }
          a.preventDefault();
        }
      }),
      (c.prototype.cycle = function (b) {
        return (
          b || (this.paused = !1),
          this.interval && clearInterval(this.interval),
          this.options.interval &&
            !this.paused &&
            (this.interval = setInterval(
              a.proxy(this.next, this),
              this.options.interval
            )),
          this
        );
      }),
      (c.prototype.getItemIndex = function (a) {
        return (
          (this.$items = a.parent().children(".item")),
          this.$items.index(a || this.$active)
        );
      }),
      (c.prototype.getItemForDirection = function (a, b) {
        var c = this.getItemIndex(b),
          d =
            ("prev" == a && 0 === c) ||
            ("next" == a && c == this.$items.length - 1);
        if (d && !this.options.wrap) return b;
        var e = "prev" == a ? -1 : 1,
          f = (c + e) % this.$items.length;
        return this.$items.eq(f);
      }),
      (c.prototype.to = function (a) {
        var b = this,
          c = this.getItemIndex(
            (this.$active = this.$element.find(".item.active"))
          );
        if (!(a > this.$items.length - 1 || a < 0))
          return this.sliding
            ? this.$element.one("slid.bs.carousel", function () {
                b.to(a);
              })
            : c == a
            ? this.pause().cycle()
            : this.slide(a > c ? "next" : "prev", this.$items.eq(a));
      }),
      (c.prototype.pause = function (b) {
        return (
          b || (this.paused = !0),
          this.$element.find(".next, .prev").length &&
            a.support.transition &&
            (this.$element.trigger(a.support.transition.end), this.cycle(!0)),
          (this.interval = clearInterval(this.interval)),
          this
        );
      }),
      (c.prototype.next = function () {
        if (!this.sliding) return this.slide("next");
      }),
      (c.prototype.prev = function () {
        if (!this.sliding) return this.slide("prev");
      }),
      (c.prototype.slide = function (b, d) {
        var e = this.$element.find(".item.active"),
          f = d || this.getItemForDirection(b, e),
          g = this.interval,
          h = "next" == b ? "left" : "right",
          i = this;
        if (f.hasClass("active")) return (this.sliding = !1);
        var j = f[0],
          k = a.Event("slide.bs.carousel", { relatedTarget: j, direction: h });
        if ((this.$element.trigger(k), !k.isDefaultPrevented())) {
          if (
            ((this.sliding = !0), g && this.pause(), this.$indicators.length)
          ) {
            this.$indicators.find(".active").removeClass("active");
            var l = a(this.$indicators.children()[this.getItemIndex(f)]);
            l && l.addClass("active");
          }
          var m = a.Event("slid.bs.carousel", {
            relatedTarget: j,
            direction: h,
          });
          return (
            a.support.transition && this.$element.hasClass("slide")
              ? (f.addClass(b),
                f[0].offsetWidth,
                e.addClass(h),
                f.addClass(h),
                e
                  .one("bsTransitionEnd", function () {
                    f.removeClass([b, h].join(" ")).addClass("active"),
                      e.removeClass(["active", h].join(" ")),
                      (i.sliding = !1),
                      setTimeout(function () {
                        i.$element.trigger(m);
                      }, 0);
                  })
                  .emulateTransitionEnd(c.TRANSITION_DURATION))
              : (e.removeClass("active"),
                f.addClass("active"),
                (this.sliding = !1),
                this.$element.trigger(m)),
            g && this.cycle(),
            this
          );
        }
      });
    var d = a.fn.carousel;
    (a.fn.carousel = b),
      (a.fn.carousel.Constructor = c),
      (a.fn.carousel.noConflict = function () {
        return (a.fn.carousel = d), this;
      });
    var e = function (c) {
      var d,
        e = a(this),
        f = a(
          e.attr("data-target") ||
            ((d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""))
        );
      if (f.hasClass("carousel")) {
        var g = a.extend({}, f.data(), e.data()),
          h = e.attr("data-slide-to");
        h && (g.interval = !1),
          b.call(f, g),
          h && f.data("bs.carousel").to(h),
          c.preventDefault();
      }
    };
    a(document)
      .on("click.bs.carousel.data-api", "[data-slide]", e)
      .on("click.bs.carousel.data-api", "[data-slide-to]", e),
      a(window).on("load", function () {
        a('[data-ride="carousel"]').each(function () {
          var c = a(this);
          b.call(c, c.data());
        });
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      var c,
        d =
          b.attr("data-target") ||
          ((c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""));
      return a(d);
    }
    function c(b) {
      return this.each(function () {
        var c = a(this),
          e = c.data("bs.collapse"),
          f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
        !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1),
          e || c.data("bs.collapse", (e = new d(this, f))),
          "string" == typeof b && e[b]();
      });
    }
    var d = function (b, c) {
      (this.$element = a(b)),
        (this.options = a.extend({}, d.DEFAULTS, c)),
        (this.$trigger = a(
          '[data-toggle="collapse"][href="#' +
            b.id +
            '"],[data-toggle="collapse"][data-target="#' +
            b.id +
            '"]'
        )),
        (this.transitioning = null),
        this.options.parent
          ? (this.$parent = this.getParent())
          : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
        this.options.toggle && this.toggle();
    };
    (d.VERSION = "3.3.7"),
      (d.TRANSITION_DURATION = 350),
      (d.DEFAULTS = { toggle: !0 }),
      (d.prototype.dimension = function () {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height";
      }),
      (d.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
          var b,
            e =
              this.$parent &&
              this.$parent.children(".panel").children(".in, .collapsing");
          if (
            !(
              e &&
              e.length &&
              ((b = e.data("bs.collapse")), b && b.transitioning)
            )
          ) {
            var f = a.Event("show.bs.collapse");
            if ((this.$element.trigger(f), !f.isDefaultPrevented())) {
              e &&
                e.length &&
                (c.call(e, "hide"), b || e.data("bs.collapse", null));
              var g = this.dimension();
              this.$element
                .removeClass("collapse")
                .addClass("collapsing")
                [g](0)
                .attr("aria-expanded", !0),
                this.$trigger
                  .removeClass("collapsed")
                  .attr("aria-expanded", !0),
                (this.transitioning = 1);
              var h = function () {
                this.$element
                  .removeClass("collapsing")
                  .addClass("collapse in")
                  [g](""),
                  (this.transitioning = 0),
                  this.$element.trigger("shown.bs.collapse");
              };
              if (!a.support.transition) return h.call(this);
              var i = a.camelCase(["scroll", g].join("-"));
              this.$element
                .one("bsTransitionEnd", a.proxy(h, this))
                .emulateTransitionEnd(d.TRANSITION_DURATION)
                [g](this.$element[0][i]);
            }
          }
        }
      }),
      (d.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
          var b = a.Event("hide.bs.collapse");
          if ((this.$element.trigger(b), !b.isDefaultPrevented())) {
            var c = this.dimension();
            this.$element[c](this.$element[c]())[0].offsetHeight,
              this.$element
                .addClass("collapsing")
                .removeClass("collapse in")
                .attr("aria-expanded", !1),
              this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
              (this.transitioning = 1);
            var e = function () {
              (this.transitioning = 0),
                this.$element
                  .removeClass("collapsing")
                  .addClass("collapse")
                  .trigger("hidden.bs.collapse");
            };
            return a.support.transition
              ? void this.$element[c](0)
                  .one("bsTransitionEnd", a.proxy(e, this))
                  .emulateTransitionEnd(d.TRANSITION_DURATION)
              : e.call(this);
          }
        }
      }),
      (d.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
      }),
      (d.prototype.getParent = function () {
        return a(this.options.parent)
          .find(
            '[data-toggle="collapse"][data-parent="' +
              this.options.parent +
              '"]'
          )
          .each(
            a.proxy(function (c, d) {
              var e = a(d);
              this.addAriaAndCollapsedClass(b(e), e);
            }, this)
          )
          .end();
      }),
      (d.prototype.addAriaAndCollapsedClass = function (a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c),
          b.toggleClass("collapsed", !c).attr("aria-expanded", c);
      });
    var e = a.fn.collapse;
    (a.fn.collapse = c),
      (a.fn.collapse.Constructor = d),
      (a.fn.collapse.noConflict = function () {
        return (a.fn.collapse = e), this;
      }),
      a(document).on(
        "click.bs.collapse.data-api",
        '[data-toggle="collapse"]',
        function (d) {
          var e = a(this);
          e.attr("data-target") || d.preventDefault();
          var f = b(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();
          c.call(f, h);
        }
      );
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      var c = b.attr("data-target");
      c ||
        ((c = b.attr("href")),
        (c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, "")));
      var d = c && a(c);
      return d && d.length ? d : b.parent();
    }
    function c(c) {
      (c && 3 === c.which) ||
        (a(e).remove(),
        a(f).each(function () {
          var d = a(this),
            e = b(d),
            f = { relatedTarget: this };
          e.hasClass("open") &&
            ((c &&
              "click" == c.type &&
              /input|textarea/i.test(c.target.tagName) &&
              a.contains(e[0], c.target)) ||
              (e.trigger((c = a.Event("hide.bs.dropdown", f))),
              c.isDefaultPrevented() ||
                (d.attr("aria-expanded", "false"),
                e
                  .removeClass("open")
                  .trigger(a.Event("hidden.bs.dropdown", f)))));
        }));
    }
    function d(b) {
      return this.each(function () {
        var c = a(this),
          d = c.data("bs.dropdown");
        d || c.data("bs.dropdown", (d = new g(this))),
          "string" == typeof b && d[b].call(c);
      });
    }
    var e = ".dropdown-backdrop",
      f = '[data-toggle="dropdown"]',
      g = function (b) {
        a(b).on("click.bs.dropdown", this.toggle);
      };
    (g.VERSION = "3.3.7"),
      (g.prototype.toggle = function (d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
          var f = b(e),
            g = f.hasClass("open");
          if ((c(), !g)) {
            "ontouchstart" in document.documentElement &&
              !f.closest(".navbar-nav").length &&
              a(document.createElement("div"))
                .addClass("dropdown-backdrop")
                .insertAfter(a(this))
                .on("click", c);
            var h = { relatedTarget: this };
            if (
              (f.trigger((d = a.Event("show.bs.dropdown", h))),
              d.isDefaultPrevented())
            )
              return;
            e.trigger("focus").attr("aria-expanded", "true"),
              f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h));
          }
          return !1;
        }
      }),
      (g.prototype.keydown = function (c) {
        if (
          /(38|40|27|32)/.test(c.which) &&
          !/input|textarea/i.test(c.target.tagName)
        ) {
          var d = a(this);
          if (
            (c.preventDefault(),
            c.stopPropagation(),
            !d.is(".disabled, :disabled"))
          ) {
            var e = b(d),
              g = e.hasClass("open");
            if ((!g && 27 != c.which) || (g && 27 == c.which))
              return (
                27 == c.which && e.find(f).trigger("focus"), d.trigger("click")
              );
            var h = " li:not(.disabled):visible a",
              i = e.find(".dropdown-menu" + h);
            if (i.length) {
              var j = i.index(c.target);
              38 == c.which && j > 0 && j--,
                40 == c.which && j < i.length - 1 && j++,
                ~j || (j = 0),
                i.eq(j).trigger("focus");
            }
          }
        }
      });
    var h = a.fn.dropdown;
    (a.fn.dropdown = d),
      (a.fn.dropdown.Constructor = g),
      (a.fn.dropdown.noConflict = function () {
        return (a.fn.dropdown = h), this;
      }),
      a(document)
        .on("click.bs.dropdown.data-api", c)
        .on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
          a.stopPropagation();
        })
        .on("click.bs.dropdown.data-api", f, g.prototype.toggle)
        .on("keydown.bs.dropdown.data-api", f, g.prototype.keydown)
        .on(
          "keydown.bs.dropdown.data-api",
          ".dropdown-menu",
          g.prototype.keydown
        );
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b, d) {
      return this.each(function () {
        var e = a(this),
          f = e.data("bs.modal"),
          g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
        f || e.data("bs.modal", (f = new c(this, g))),
          "string" == typeof b ? f[b](d) : g.show && f.show(d);
      });
    }
    var c = function (b, c) {
      (this.options = c),
        (this.$body = a(document.body)),
        (this.$element = a(b)),
        (this.$dialog = this.$element.find(".modal-dialog")),
        (this.$backdrop = null),
        (this.isShown = null),
        (this.originalBodyPad = null),
        (this.scrollbarWidth = 0),
        (this.ignoreBackdropClick = !1),
        this.options.remote &&
          this.$element.find(".modal-content").load(
            this.options.remote,
            a.proxy(function () {
              this.$element.trigger("loaded.bs.modal");
            }, this)
          );
    };
    (c.VERSION = "3.3.7"),
      (c.TRANSITION_DURATION = 300),
      (c.BACKDROP_TRANSITION_DURATION = 150),
      (c.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
      (c.prototype.toggle = function (a) {
        return this.isShown ? this.hide() : this.show(a);
      }),
      (c.prototype.show = function (b) {
        var d = this,
          e = a.Event("show.bs.modal", { relatedTarget: b });
        this.$element.trigger(e),
          this.isShown ||
            e.isDefaultPrevented() ||
            ((this.isShown = !0),
            this.checkScrollbar(),
            this.setScrollbar(),
            this.$body.addClass("modal-open"),
            this.escape(),
            this.resize(),
            this.$element.on(
              "click.dismiss.bs.modal",
              '[data-dismiss="modal"]',
              a.proxy(this.hide, this)
            ),
            this.$dialog.on("mousedown.dismiss.bs.modal", function () {
              d.$element.one("mouseup.dismiss.bs.modal", function (b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0);
              });
            }),
            this.backdrop(function () {
              var e = a.support.transition && d.$element.hasClass("fade");
              d.$element.parent().length || d.$element.appendTo(d.$body),
                d.$element.show().scrollTop(0),
                d.adjustDialog(),
                e && d.$element[0].offsetWidth,
                d.$element.addClass("in"),
                d.enforceFocus();
              var f = a.Event("shown.bs.modal", { relatedTarget: b });
              e
                ? d.$dialog
                    .one("bsTransitionEnd", function () {
                      d.$element.trigger("focus").trigger(f);
                    })
                    .emulateTransitionEnd(c.TRANSITION_DURATION)
                : d.$element.trigger("focus").trigger(f);
            }));
      }),
      (c.prototype.hide = function (b) {
        b && b.preventDefault(),
          (b = a.Event("hide.bs.modal")),
          this.$element.trigger(b),
          this.isShown &&
            !b.isDefaultPrevented() &&
            ((this.isShown = !1),
            this.escape(),
            this.resize(),
            a(document).off("focusin.bs.modal"),
            this.$element
              .removeClass("in")
              .off("click.dismiss.bs.modal")
              .off("mouseup.dismiss.bs.modal"),
            this.$dialog.off("mousedown.dismiss.bs.modal"),
            a.support.transition && this.$element.hasClass("fade")
              ? this.$element
                  .one("bsTransitionEnd", a.proxy(this.hideModal, this))
                  .emulateTransitionEnd(c.TRANSITION_DURATION)
              : this.hideModal());
      }),
      (c.prototype.enforceFocus = function () {
        a(document)
          .off("focusin.bs.modal")
          .on(
            "focusin.bs.modal",
            a.proxy(function (a) {
              document === a.target ||
                this.$element[0] === a.target ||
                this.$element.has(a.target).length ||
                this.$element.trigger("focus");
            }, this)
          );
      }),
      (c.prototype.escape = function () {
        this.isShown && this.options.keyboard
          ? this.$element.on(
              "keydown.dismiss.bs.modal",
              a.proxy(function (a) {
                27 == a.which && this.hide();
              }, this)
            )
          : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
      }),
      (c.prototype.resize = function () {
        this.isShown
          ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this))
          : a(window).off("resize.bs.modal");
      }),
      (c.prototype.hideModal = function () {
        var a = this;
        this.$element.hide(),
          this.backdrop(function () {
            a.$body.removeClass("modal-open"),
              a.resetAdjustments(),
              a.resetScrollbar(),
              a.$element.trigger("hidden.bs.modal");
          });
      }),
      (c.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
      }),
      (c.prototype.backdrop = function (b) {
        var d = this,
          e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
          var f = a.support.transition && e;
          if (
            ((this.$backdrop = a(document.createElement("div"))
              .addClass("modal-backdrop " + e)
              .appendTo(this.$body)),
            this.$element.on(
              "click.dismiss.bs.modal",
              a.proxy(function (a) {
                return this.ignoreBackdropClick
                  ? void (this.ignoreBackdropClick = !1)
                  : void (
                      a.target === a.currentTarget &&
                      ("static" == this.options.backdrop
                        ? this.$element[0].focus()
                        : this.hide())
                    );
              }, this)
            ),
            f && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !b)
          )
            return;
          f
            ? this.$backdrop
                .one("bsTransitionEnd", b)
                .emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION)
            : b();
        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass("in");
          var g = function () {
            d.removeBackdrop(), b && b();
          };
          a.support.transition && this.$element.hasClass("fade")
            ? this.$backdrop
                .one("bsTransitionEnd", g)
                .emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION)
            : g();
        } else b && b();
      }),
      (c.prototype.handleUpdate = function () {
        this.adjustDialog();
      }),
      (c.prototype.adjustDialog = function () {
        var a =
          this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
          paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
          paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : "",
        });
      }),
      (c.prototype.resetAdjustments = function () {
        this.$element.css({ paddingLeft: "", paddingRight: "" });
      }),
      (c.prototype.checkScrollbar = function () {
        var a = window.innerWidth;
        if (!a) {
          var b = document.documentElement.getBoundingClientRect();
          a = b.right - Math.abs(b.left);
        }
        (this.bodyIsOverflowing = document.body.clientWidth < a),
          (this.scrollbarWidth = this.measureScrollbar());
      }),
      (c.prototype.setScrollbar = function () {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        (this.originalBodyPad = document.body.style.paddingRight || ""),
          this.bodyIsOverflowing &&
            this.$body.css("padding-right", a + this.scrollbarWidth);
      }),
      (c.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad);
      }),
      (c.prototype.measureScrollbar = function () {
        var a = document.createElement("div");
        (a.className = "modal-scrollbar-measure"), this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b;
      });
    var d = a.fn.modal;
    (a.fn.modal = b),
      (a.fn.modal.Constructor = c),
      (a.fn.modal.noConflict = function () {
        return (a.fn.modal = d), this;
      }),
      a(document).on(
        "click.bs.modal.data-api",
        '[data-toggle="modal"]',
        function (c) {
          var d = a(this),
            e = d.attr("href"),
            f = a(
              d.attr("data-target") || (e && e.replace(/.*(?=#[^\s]+$)/, ""))
            ),
            g = f.data("bs.modal")
              ? "toggle"
              : a.extend({ remote: !/#/.test(e) && e }, f.data(), d.data());
          d.is("a") && c.preventDefault(),
            f.one("show.bs.modal", function (a) {
              a.isDefaultPrevented() ||
                f.one("hidden.bs.modal", function () {
                  d.is(":visible") && d.trigger("focus");
                });
            }),
            b.call(f, g, this);
        }
      );
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.tooltip"),
          f = "object" == typeof b && b;
        (!e && /destroy|hide/.test(b)) ||
          (e || d.data("bs.tooltip", (e = new c(this, f))),
          "string" == typeof b && e[b]());
      });
    }
    var c = function (a, b) {
      (this.type = null),
        (this.options = null),
        (this.enabled = null),
        (this.timeout = null),
        (this.hoverState = null),
        (this.$element = null),
        (this.inState = null),
        this.init("tooltip", a, b);
    };
    (c.VERSION = "3.3.7"),
      (c.TRANSITION_DURATION = 150),
      (c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template:
          '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: { selector: "body", padding: 0 },
      }),
      (c.prototype.init = function (b, c, d) {
        if (
          ((this.enabled = !0),
          (this.type = b),
          (this.$element = a(c)),
          (this.options = this.getOptions(d)),
          (this.$viewport =
            this.options.viewport &&
            a(
              a.isFunction(this.options.viewport)
                ? this.options.viewport.call(this, this.$element)
                : this.options.viewport.selector || this.options.viewport
            )),
          (this.inState = { click: !1, hover: !1, focus: !1 }),
          this.$element[0] instanceof document.constructor &&
            !this.options.selector)
        )
          throw new Error(
            "`selector` option must be specified when initializing " +
              this.type +
              " on the window.document object!"
          );
        for (var e = this.options.trigger.split(" "), f = e.length; f--; ) {
          var g = e[f];
          if ("click" == g)
            this.$element.on(
              "click." + this.type,
              this.options.selector,
              a.proxy(this.toggle, this)
            );
          else if ("manual" != g) {
            var h = "hover" == g ? "mouseenter" : "focusin",
              i = "hover" == g ? "mouseleave" : "focusout";
            this.$element.on(
              h + "." + this.type,
              this.options.selector,
              a.proxy(this.enter, this)
            ),
              this.$element.on(
                i + "." + this.type,
                this.options.selector,
                a.proxy(this.leave, this)
              );
          }
        }
        this.options.selector
          ? (this._options = a.extend({}, this.options, {
              trigger: "manual",
              selector: "",
            }))
          : this.fixTitle();
      }),
      (c.prototype.getDefaults = function () {
        return c.DEFAULTS;
      }),
      (c.prototype.getOptions = function (b) {
        return (
          (b = a.extend({}, this.getDefaults(), this.$element.data(), b)),
          b.delay &&
            "number" == typeof b.delay &&
            (b.delay = { show: b.delay, hide: b.delay }),
          b
        );
      }),
      (c.prototype.getDelegateOptions = function () {
        var b = {},
          c = this.getDefaults();
        return (
          this._options &&
            a.each(this._options, function (a, d) {
              c[a] != d && (b[a] = d);
            }),
          b
        );
      }),
      (c.prototype.enter = function (b) {
        var c =
          b instanceof this.constructor
            ? b
            : a(b.currentTarget).data("bs." + this.type);
        return (
          c ||
            ((c = new this.constructor(
              b.currentTarget,
              this.getDelegateOptions()
            )),
            a(b.currentTarget).data("bs." + this.type, c)),
          b instanceof a.Event &&
            (c.inState["focusin" == b.type ? "focus" : "hover"] = !0),
          c.tip().hasClass("in") || "in" == c.hoverState
            ? void (c.hoverState = "in")
            : (clearTimeout(c.timeout),
              (c.hoverState = "in"),
              c.options.delay && c.options.delay.show
                ? void (c.timeout = setTimeout(function () {
                    "in" == c.hoverState && c.show();
                  }, c.options.delay.show))
                : c.show())
        );
      }),
      (c.prototype.isInStateTrue = function () {
        for (var a in this.inState) if (this.inState[a]) return !0;
        return !1;
      }),
      (c.prototype.leave = function (b) {
        var c =
          b instanceof this.constructor
            ? b
            : a(b.currentTarget).data("bs." + this.type);
        if (
          (c ||
            ((c = new this.constructor(
              b.currentTarget,
              this.getDelegateOptions()
            )),
            a(b.currentTarget).data("bs." + this.type, c)),
          b instanceof a.Event &&
            (c.inState["focusout" == b.type ? "focus" : "hover"] = !1),
          !c.isInStateTrue())
        )
          return (
            clearTimeout(c.timeout),
            (c.hoverState = "out"),
            c.options.delay && c.options.delay.hide
              ? void (c.timeout = setTimeout(function () {
                  "out" == c.hoverState && c.hide();
                }, c.options.delay.hide))
              : c.hide()
          );
      }),
      (c.prototype.show = function () {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
          this.$element.trigger(b);
          var d = a.contains(
            this.$element[0].ownerDocument.documentElement,
            this.$element[0]
          );
          if (b.isDefaultPrevented() || !d) return;
          var e = this,
            f = this.tip(),
            g = this.getUID(this.type);
          this.setContent(),
            f.attr("id", g),
            this.$element.attr("aria-describedby", g),
            this.options.animation && f.addClass("fade");
          var h =
              "function" == typeof this.options.placement
                ? this.options.placement.call(this, f[0], this.$element[0])
                : this.options.placement,
            i = /\s?auto?\s?/i,
            j = i.test(h);
          j && (h = h.replace(i, "") || "top"),
            f
              .detach()
              .css({ top: 0, left: 0, display: "block" })
              .addClass(h)
              .data("bs." + this.type, this),
            this.options.container
              ? f.appendTo(this.options.container)
              : f.insertAfter(this.$element),
            this.$element.trigger("inserted.bs." + this.type);
          var k = this.getPosition(),
            l = f[0].offsetWidth,
            m = f[0].offsetHeight;
          if (j) {
            var n = h,
              o = this.getPosition(this.$viewport);
            (h =
              "bottom" == h && k.bottom + m > o.bottom
                ? "top"
                : "top" == h && k.top - m < o.top
                ? "bottom"
                : "right" == h && k.right + l > o.width
                ? "left"
                : "left" == h && k.left - l < o.left
                ? "right"
                : h),
              f.removeClass(n).addClass(h);
          }
          var p = this.getCalculatedOffset(h, k, l, m);
          this.applyPlacement(p, h);
          var q = function () {
            var a = e.hoverState;
            e.$element.trigger("shown.bs." + e.type),
              (e.hoverState = null),
              "out" == a && e.leave(e);
          };
          a.support.transition && this.$tip.hasClass("fade")
            ? f
                .one("bsTransitionEnd", q)
                .emulateTransitionEnd(c.TRANSITION_DURATION)
            : q();
        }
      }),
      (c.prototype.applyPlacement = function (b, c) {
        var d = this.tip(),
          e = d[0].offsetWidth,
          f = d[0].offsetHeight,
          g = parseInt(d.css("margin-top"), 10),
          h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0),
          isNaN(h) && (h = 0),
          (b.top += g),
          (b.left += h),
          a.offset.setOffset(
            d[0],
            a.extend(
              {
                using: function (a) {
                  d.css({ top: Math.round(a.top), left: Math.round(a.left) });
                },
              },
              b
            ),
            0
          ),
          d.addClass("in");
        var i = d[0].offsetWidth,
          j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? (b.left += k.left) : (b.top += k.top);
        var l = /top|bottom/.test(c),
          m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
          n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l);
      }),
      (c.prototype.replaceArrow = function (a, b, c) {
        this.arrow()
          .css(c ? "left" : "top", 50 * (1 - a / b) + "%")
          .css(c ? "top" : "left", "");
      }),
      (c.prototype.setContent = function () {
        var a = this.tip(),
          b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b),
          a.removeClass("fade in top bottom left right");
      }),
      (c.prototype.hide = function (b) {
        function d() {
          "in" != e.hoverState && f.detach(),
            e.$element &&
              e.$element
                .removeAttr("aria-describedby")
                .trigger("hidden.bs." + e.type),
            b && b();
        }
        var e = this,
          f = a(this.$tip),
          g = a.Event("hide.bs." + this.type);
        if ((this.$element.trigger(g), !g.isDefaultPrevented()))
          return (
            f.removeClass("in"),
            a.support.transition && f.hasClass("fade")
              ? f
                  .one("bsTransitionEnd", d)
                  .emulateTransitionEnd(c.TRANSITION_DURATION)
              : d(),
            (this.hoverState = null),
            this
          );
      }),
      (c.prototype.fixTitle = function () {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) &&
          a
            .attr("data-original-title", a.attr("title") || "")
            .attr("title", "");
      }),
      (c.prototype.hasContent = function () {
        return this.getTitle();
      }),
      (c.prototype.getPosition = function (b) {
        b = b || this.$element;
        var c = b[0],
          d = "BODY" == c.tagName,
          e = c.getBoundingClientRect();
        null == e.width &&
          (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top,
          }));
        var f = window.SVGElement && c instanceof window.SVGElement,
          g = d ? { top: 0, left: 0 } : f ? null : b.offset(),
          h = {
            scroll: d
              ? document.documentElement.scrollTop || document.body.scrollTop
              : b.scrollTop(),
          },
          i = d
            ? { width: a(window).width(), height: a(window).height() }
            : null;
        return a.extend({}, e, h, i, g);
      }),
      (c.prototype.getCalculatedOffset = function (a, b, c, d) {
        return "bottom" == a
          ? { top: b.top + b.height, left: b.left + b.width / 2 - c / 2 }
          : "top" == a
          ? { top: b.top - d, left: b.left + b.width / 2 - c / 2 }
          : "left" == a
          ? { top: b.top + b.height / 2 - d / 2, left: b.left - c }
          : { top: b.top + b.height / 2 - d / 2, left: b.left + b.width };
      }),
      (c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
        var e = { top: 0, left: 0 };
        if (!this.$viewport) return e;
        var f = (this.options.viewport && this.options.viewport.padding) || 0,
          g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
          var h = b.top - f - g.scroll,
            i = b.top + f - g.scroll + d;
          h < g.top
            ? (e.top = g.top - h)
            : i > g.top + g.height && (e.top = g.top + g.height - i);
        } else {
          var j = b.left - f,
            k = b.left + f + c;
          j < g.left
            ? (e.left = g.left - j)
            : k > g.right && (e.left = g.left + g.width - k);
        }
        return e;
      }),
      (c.prototype.getTitle = function () {
        var a,
          b = this.$element,
          c = this.options;
        return (a =
          b.attr("data-original-title") ||
          ("function" == typeof c.title ? c.title.call(b[0]) : c.title));
      }),
      (c.prototype.getUID = function (a) {
        do a += ~~(1e6 * Math.random());
        while (document.getElementById(a));
        return a;
      }),
      (c.prototype.tip = function () {
        if (
          !this.$tip &&
          ((this.$tip = a(this.options.template)), 1 != this.$tip.length)
        )
          throw new Error(
            this.type +
              " `template` option must consist of exactly 1 top-level element!"
          );
        return this.$tip;
      }),
      (c.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
      }),
      (c.prototype.enable = function () {
        this.enabled = !0;
      }),
      (c.prototype.disable = function () {
        this.enabled = !1;
      }),
      (c.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled;
      }),
      (c.prototype.toggle = function (b) {
        var c = this;
        b &&
          ((c = a(b.currentTarget).data("bs." + this.type)),
          c ||
            ((c = new this.constructor(
              b.currentTarget,
              this.getDelegateOptions()
            )),
            a(b.currentTarget).data("bs." + this.type, c))),
          b
            ? ((c.inState.click = !c.inState.click),
              c.isInStateTrue() ? c.enter(c) : c.leave(c))
            : c.tip().hasClass("in")
            ? c.leave(c)
            : c.enter(c);
      }),
      (c.prototype.destroy = function () {
        var a = this;
        clearTimeout(this.timeout),
          this.hide(function () {
            a.$element.off("." + a.type).removeData("bs." + a.type),
              a.$tip && a.$tip.detach(),
              (a.$tip = null),
              (a.$arrow = null),
              (a.$viewport = null),
              (a.$element = null);
          });
      });
    var d = a.fn.tooltip;
    (a.fn.tooltip = b),
      (a.fn.tooltip.Constructor = c),
      (a.fn.tooltip.noConflict = function () {
        return (a.fn.tooltip = d), this;
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.popover"),
          f = "object" == typeof b && b;
        (!e && /destroy|hide/.test(b)) ||
          (e || d.data("bs.popover", (e = new c(this, f))),
          "string" == typeof b && e[b]());
      });
    }
    var c = function (a, b) {
      this.init("popover", a, b);
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    (c.VERSION = "3.3.7"),
      (c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template:
          '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
      })),
      (c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype)),
      (c.prototype.constructor = c),
      (c.prototype.getDefaults = function () {
        return c.DEFAULTS;
      }),
      (c.prototype.setContent = function () {
        var a = this.tip(),
          b = this.getTitle(),
          c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b),
          a
            .find(".popover-content")
            .children()
            .detach()
            .end()
            [
              this.options.html
                ? "string" == typeof c
                  ? "html"
                  : "append"
                : "text"
            ](c),
          a.removeClass("fade top bottom left right in"),
          a.find(".popover-title").html() || a.find(".popover-title").hide();
      }),
      (c.prototype.hasContent = function () {
        return this.getTitle() || this.getContent();
      }),
      (c.prototype.getContent = function () {
        var a = this.$element,
          b = this.options;
        return (
          a.attr("data-content") ||
          ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
        );
      }),
      (c.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
      });
    var d = a.fn.popover;
    (a.fn.popover = b),
      (a.fn.popover.Constructor = c),
      (a.fn.popover.noConflict = function () {
        return (a.fn.popover = d), this;
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(c, d) {
      (this.$body = a(document.body)),
        (this.$scrollElement = a(a(c).is(document.body) ? window : c)),
        (this.options = a.extend({}, b.DEFAULTS, d)),
        (this.selector = (this.options.target || "") + " .nav li > a"),
        (this.offsets = []),
        (this.targets = []),
        (this.activeTarget = null),
        (this.scrollHeight = 0),
        this.$scrollElement.on(
          "scroll.bs.scrollspy",
          a.proxy(this.process, this)
        ),
        this.refresh(),
        this.process();
    }
    function c(c) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.scrollspy"),
          f = "object" == typeof c && c;
        e || d.data("bs.scrollspy", (e = new b(this, f))),
          "string" == typeof c && e[c]();
      });
    }
    (b.VERSION = "3.3.7"),
      (b.DEFAULTS = { offset: 10 }),
      (b.prototype.getScrollHeight = function () {
        return (
          this.$scrollElement[0].scrollHeight ||
          Math.max(
            this.$body[0].scrollHeight,
            document.documentElement.scrollHeight
          )
        );
      }),
      (b.prototype.refresh = function () {
        var b = this,
          c = "offset",
          d = 0;
        (this.offsets = []),
          (this.targets = []),
          (this.scrollHeight = this.getScrollHeight()),
          a.isWindow(this.$scrollElement[0]) ||
            ((c = "position"), (d = this.$scrollElement.scrollTop())),
          this.$body
            .find(this.selector)
            .map(function () {
              var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);
              return (
                (f && f.length && f.is(":visible") && [[f[c]().top + d, e]]) ||
                null
              );
            })
            .sort(function (a, b) {
              return a[0] - b[0];
            })
            .each(function () {
              b.offsets.push(this[0]), b.targets.push(this[1]);
            });
      }),
      (b.prototype.process = function () {
        var a,
          b = this.$scrollElement.scrollTop() + this.options.offset,
          c = this.getScrollHeight(),
          d = this.options.offset + c - this.$scrollElement.height(),
          e = this.offsets,
          f = this.targets,
          g = this.activeTarget;
        if ((this.scrollHeight != c && this.refresh(), b >= d))
          return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return (this.activeTarget = null), this.clear();
        for (a = e.length; a--; )
          g != f[a] &&
            b >= e[a] &&
            (void 0 === e[a + 1] || b < e[a + 1]) &&
            this.activate(f[a]);
      }),
      (b.prototype.activate = function (b) {
        (this.activeTarget = b), this.clear();
        var c =
            this.selector +
            '[data-target="' +
            b +
            '"],' +
            this.selector +
            '[href="' +
            b +
            '"]',
          d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length &&
          (d = d.closest("li.dropdown").addClass("active")),
          d.trigger("activate.bs.scrollspy");
      }),
      (b.prototype.clear = function () {
        a(this.selector)
          .parentsUntil(this.options.target, ".active")
          .removeClass("active");
      });
    var d = a.fn.scrollspy;
    (a.fn.scrollspy = c),
      (a.fn.scrollspy.Constructor = b),
      (a.fn.scrollspy.noConflict = function () {
        return (a.fn.scrollspy = d), this;
      }),
      a(window).on("load.bs.scrollspy.data-api", function () {
        a('[data-spy="scroll"]').each(function () {
          var b = a(this);
          c.call(b, b.data());
        });
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.tab");
        e || d.data("bs.tab", (e = new c(this))),
          "string" == typeof b && e[b]();
      });
    }
    var c = function (b) {
      this.element = a(b);
    };
    (c.VERSION = "3.3.7"),
      (c.TRANSITION_DURATION = 150),
      (c.prototype.show = function () {
        var b = this.element,
          c = b.closest("ul:not(.dropdown-menu)"),
          d = b.data("target");
        if (
          (d ||
            ((d = b.attr("href")), (d = d && d.replace(/.*(?=#[^\s]*$)/, ""))),
          !b.parent("li").hasClass("active"))
        ) {
          var e = c.find(".active:last a"),
            f = a.Event("hide.bs.tab", { relatedTarget: b[0] }),
            g = a.Event("show.bs.tab", { relatedTarget: e[0] });
          if (
            (e.trigger(f),
            b.trigger(g),
            !g.isDefaultPrevented() && !f.isDefaultPrevented())
          ) {
            var h = a(d);
            this.activate(b.closest("li"), c),
              this.activate(h, h.parent(), function () {
                e.trigger({ type: "hidden.bs.tab", relatedTarget: b[0] }),
                  b.trigger({ type: "shown.bs.tab", relatedTarget: e[0] });
              });
          }
        }
      }),
      (c.prototype.activate = function (b, d, e) {
        function f() {
          g
            .removeClass("active")
            .find("> .dropdown-menu > .active")
            .removeClass("active")
            .end()
            .find('[data-toggle="tab"]')
            .attr("aria-expanded", !1),
            b
              .addClass("active")
              .find('[data-toggle="tab"]')
              .attr("aria-expanded", !0),
            h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"),
            b.parent(".dropdown-menu").length &&
              b
                .closest("li.dropdown")
                .addClass("active")
                .end()
                .find('[data-toggle="tab"]')
                .attr("aria-expanded", !0),
            e && e();
        }
        var g = d.find("> .active"),
          h =
            e &&
            a.support.transition &&
            ((g.length && g.hasClass("fade")) || !!d.find("> .fade").length);
        g.length && h
          ? g
              .one("bsTransitionEnd", f)
              .emulateTransitionEnd(c.TRANSITION_DURATION)
          : f(),
          g.removeClass("in");
      });
    var d = a.fn.tab;
    (a.fn.tab = b),
      (a.fn.tab.Constructor = c),
      (a.fn.tab.noConflict = function () {
        return (a.fn.tab = d), this;
      });
    var e = function (c) {
      c.preventDefault(), b.call(a(this), "show");
    };
    a(document)
      .on("click.bs.tab.data-api", '[data-toggle="tab"]', e)
      .on("click.bs.tab.data-api", '[data-toggle="pill"]', e);
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.affix"),
          f = "object" == typeof b && b;
        e || d.data("bs.affix", (e = new c(this, f))),
          "string" == typeof b && e[b]();
      });
    }
    var c = function (b, d) {
      (this.options = a.extend({}, c.DEFAULTS, d)),
        (this.$target = a(this.options.target)
          .on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this))
          .on(
            "click.bs.affix.data-api",
            a.proxy(this.checkPositionWithEventLoop, this)
          )),
        (this.$element = a(b)),
        (this.affixed = null),
        (this.unpin = null),
        (this.pinnedOffset = null),
        this.checkPosition();
    };
    (c.VERSION = "3.3.7"),
      (c.RESET = "affix affix-top affix-bottom"),
      (c.DEFAULTS = { offset: 0, target: window }),
      (c.prototype.getState = function (a, b, c, d) {
        var e = this.$target.scrollTop(),
          f = this.$element.offset(),
          g = this.$target.height();
        if (null != c && "top" == this.affixed) return e < c && "top";
        if ("bottom" == this.affixed)
          return null != c
            ? !(e + this.unpin <= f.top) && "bottom"
            : !(e + g <= a - d) && "bottom";
        var h = null == this.affixed,
          i = h ? e : f.top,
          j = h ? g : b;
        return null != c && e <= c
          ? "top"
          : null != d && i + j >= a - d && "bottom";
      }),
      (c.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
          b = this.$element.offset();
        return (this.pinnedOffset = b.top - a);
      }),
      (c.prototype.checkPositionWithEventLoop = function () {
        setTimeout(a.proxy(this.checkPosition, this), 1);
      }),
      (c.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
          var b = this.$element.height(),
            d = this.options.offset,
            e = d.top,
            f = d.bottom,
            g = Math.max(a(document).height(), a(document.body).height());
          "object" != typeof d && (f = e = d),
            "function" == typeof e && (e = d.top(this.$element)),
            "function" == typeof f && (f = d.bottom(this.$element));
          var h = this.getState(g, b, e, f);
          if (this.affixed != h) {
            null != this.unpin && this.$element.css("top", "");
            var i = "affix" + (h ? "-" + h : ""),
              j = a.Event(i + ".bs.affix");
            if ((this.$element.trigger(j), j.isDefaultPrevented())) return;
            (this.affixed = h),
              (this.unpin = "bottom" == h ? this.getPinnedOffset() : null),
              this.$element
                .removeClass(c.RESET)
                .addClass(i)
                .trigger(i.replace("affix", "affixed") + ".bs.affix");
          }
          "bottom" == h && this.$element.offset({ top: g - b - f });
        }
      });
    var d = a.fn.affix;
    (a.fn.affix = b),
      (a.fn.affix.Constructor = c),
      (a.fn.affix.noConflict = function () {
        return (a.fn.affix = d), this;
      }),
      a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
          var c = a(this),
            d = c.data();
          (d.offset = d.offset || {}),
            null != d.offsetBottom && (d.offset.bottom = d.offsetBottom),
            null != d.offsetTop && (d.offset.top = d.offsetTop),
            b.call(c, d);
        });
      });
  })(jQuery);

/**
 * Owl Carousel v2.2.0
 * Copyright 2013-2016 David Deutsch
 * Licensed under MIT (https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE)
 */
!(function (a, b, c, d) {
  function e(b, c) {
    (this.settings = null),
      (this.options = a.extend({}, e.Defaults, c)),
      (this.$element = a(b)),
      (this.drag = a.extend({}, m)),
      (this.state = a.extend({}, n)),
      (this.e = a.extend({}, o)),
      (this._plugins = {}),
      (this._supress = {}),
      (this._current = null),
      (this._speed = null),
      (this._coordinates = []),
      (this._breakpoint = null),
      (this._width = null),
      (this._items = []),
      (this._clones = []),
      (this._mergers = []),
      (this._invalidated = {}),
      (this._pipe = []),
      a.each(
        e.Plugins,
        a.proxy(function (a, b) {
          this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(this);
        }, this)
      ),
      a.each(
        e.Pipe,
        a.proxy(function (b, c) {
          this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) });
        }, this)
      ),
      this.setup(),
      this.initialize();
  }
  function f(a) {
    if (a.touches !== d)
      return { x: a.touches[0].pageX, y: a.touches[0].pageY };
    if (a.touches === d) {
      if (a.pageX !== d) return { x: a.pageX, y: a.pageY };
      if (a.pageX === d) return { x: a.clientX, y: a.clientY };
    }
  }
  function g(a) {
    var b,
      d,
      e = c.createElement("div"),
      f = a;
    for (b in f)
      if (((d = f[b]), "undefined" != typeof e.style[d]))
        return (e = null), [d, b];
    return [!1];
  }
  function h() {
    return g([
      "transition",
      "WebkitTransition",
      "MozTransition",
      "OTransition",
    ])[1];
  }
  function i() {
    return g([
      "transform",
      "WebkitTransform",
      "MozTransform",
      "OTransform",
      "msTransform",
    ])[0];
  }
  function j() {
    return g([
      "perspective",
      "webkitPerspective",
      "MozPerspective",
      "OPerspective",
      "MsPerspective",
    ])[0];
  }
  function k() {
    return "ontouchstart" in b || !!navigator.msMaxTouchPoints;
  }
  function l() {
    return b.navigator.msPointerEnabled;
  }
  var m, n, o;
  (m = {
    start: 0,
    startX: 0,
    startY: 0,
    current: 0,
    currentX: 0,
    currentY: 0,
    offsetX: 0,
    offsetY: 0,
    distance: null,
    startTime: 0,
    endTime: 0,
    updatedX: 0,
    targetEl: null,
  }),
    (n = {
      isTouch: !1,
      isScrolling: !1,
      isSwiping: !1,
      direction: !1,
      inMotion: !1,
    }),
    (o = {
      _onDragStart: null,
      _onDragMove: null,
      _onDragEnd: null,
      _transitionEnd: null,
      _resizer: null,
      _responsiveCall: null,
      _goToLoop: null,
      _checkVisibile: null,
    }),
    (e.Defaults = {
      items: 3,
      loop: !1,
      center: !1,
      mouseDrag: !0,
      touchDrag: !0,
      pullDrag: !0,
      freeDrag: !1,
      margin: 0,
      stagePadding: 0,
      merge: !1,
      mergeFit: !0,
      autoWidth: !1,
      startPosition: 0,
      rtl: !1,
      smartSpeed: 250,
      fluidSpeed: !1,
      dragEndSpeed: !1,
      responsive: {},
      responsiveRefreshRate: 200,
      responsiveBaseElement: b,
      responsiveClass: !1,
      fallbackEasing: "swing",
      info: !1,
      nestedItemSelector: !1,
      itemElement: "div",
      stageElement: "div",
      themeClass: "owl-theme",
      baseClass: "owl-carousel",
      itemClass: "owl-item",
      centerClass: "center",
      activeClass: "active",
    }),
    (e.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
    (e.Plugins = {}),
    (e.Pipe = [
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          a.current = this._items && this._items[this.relative(this._current)];
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          var a = this._clones,
            b = this.$stage.children(".cloned");
          (b.length !== a.length || (!this.settings.loop && a.length > 0)) &&
            (this.$stage.children(".cloned").remove(), (this._clones = []));
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          var a,
            b,
            c = this._clones,
            d = this._items,
            e = this.settings.loop
              ? c.length - Math.max(2 * this.settings.items, 4)
              : 0;
          for (a = 0, b = Math.abs(e / 2); b > a; a++)
            e > 0
              ? (this.$stage
                  .children()
                  .eq(d.length + c.length - 1)
                  .remove(),
                c.pop(),
                this.$stage.children().eq(0).remove(),
                c.pop())
              : (c.push(c.length / 2),
                this.$stage.append(
                  d[c[c.length - 1]].clone().addClass("cloned")
                ),
                c.push(d.length - 1 - (c.length - 1) / 2),
                this.$stage.prepend(
                  d[c[c.length - 1]].clone().addClass("cloned")
                ));
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          var a,
            b,
            c,
            d = this.settings.rtl ? 1 : -1,
            e = (this.width() / this.settings.items).toFixed(3),
            f = 0;
          for (
            this._coordinates = [],
              b = 0,
              c = this._clones.length + this._items.length;
            c > b;
            b++
          )
            (a = this._mergers[this.relative(b)]),
              (a =
                (this.settings.mergeFit && Math.min(a, this.settings.items)) ||
                a),
              (f +=
                (this.settings.autoWidth
                  ? this._items[this.relative(b)].width() + this.settings.margin
                  : e * a) * d),
              this._coordinates.push(f);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          var b,
            c,
            d = (this.width() / this.settings.items).toFixed(3),
            e = {
              width:
                Math.abs(this._coordinates[this._coordinates.length - 1]) +
                2 * this.settings.stagePadding,
              "padding-left": this.settings.stagePadding || "",
              "padding-right": this.settings.stagePadding || "",
            };
          if (
            (this.$stage.css(e),
            (e = {
              width: this.settings.autoWidth
                ? "auto"
                : d - this.settings.margin,
            }),
            (e[this.settings.rtl ? "margin-left" : "margin-right"] =
              this.settings.margin),
            !this.settings.autoWidth &&
              a.grep(this._mergers, function (a) {
                return a > 1;
              }).length > 0)
          )
            for (b = 0, c = this._coordinates.length; c > b; b++)
              (e.width =
                Math.abs(this._coordinates[b]) -
                Math.abs(this._coordinates[b - 1] || 0) -
                this.settings.margin),
                this.$stage.children().eq(b).css(e);
          else this.$stage.children().css(e);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          a.current && this.reset(this.$stage.children().index(a.current));
        },
      },
      {
        filter: ["position"],
        run: function () {
          this.animate(this.coordinates(this._current));
        },
      },
      {
        filter: ["width", "position", "items", "settings"],
        run: function () {
          var a,
            b,
            c,
            d,
            e = this.settings.rtl ? 1 : -1,
            f = 2 * this.settings.stagePadding,
            g = this.coordinates(this.current()) + f,
            h = g + this.width() * e,
            i = [];
          for (c = 0, d = this._coordinates.length; d > c; c++)
            (a = this._coordinates[c - 1] || 0),
              (b = Math.abs(this._coordinates[c]) + f * e),
              ((this.op(a, "<=", g) && this.op(a, ">", h)) ||
                (this.op(b, "<", g) && this.op(b, ">", h))) &&
                i.push(c);
          this.$stage
            .children("." + this.settings.activeClass)
            .removeClass(this.settings.activeClass),
            this.$stage
              .children(":eq(" + i.join("), :eq(") + ")")
              .addClass(this.settings.activeClass),
            this.settings.center &&
              (this.$stage
                .children("." + this.settings.centerClass)
                .removeClass(this.settings.centerClass),
              this.$stage
                .children()
                .eq(this.current())
                .addClass(this.settings.centerClass));
        },
      },
    ]),
    (e.prototype.initialize = function () {
      if (
        (this.trigger("initialize"),
        this.$element
          .addClass(this.settings.baseClass)
          .addClass(this.settings.themeClass)
          .toggleClass("owl-rtl", this.settings.rtl),
        this.browserSupport(),
        this.settings.autoWidth && this.state.imagesLoaded !== !0)
      ) {
        var b, c, e;
        if (
          ((b = this.$element.find("img")),
          (c = this.settings.nestedItemSelector
            ? "." + this.settings.nestedItemSelector
            : d),
          (e = this.$element.children(c).width()),
          b.length && 0 >= e)
        )
          return this.preloadAutoWidthImages(b), !1;
      }
      this.$element.addClass("owl-loading"),
        (this.$stage = a(
          "<" + this.settings.stageElement + ' class="owl-stage"/>'
        ).wrap('<div class="owl-stage-outer">')),
        this.$element.append(this.$stage.parent()),
        this.replace(this.$element.children().not(this.$stage.parent())),
        (this._width = this.$element.width()),
        this.refresh(),
        this.$element.removeClass("owl-loading").addClass("owl-loaded"),
        this.eventsCall(),
        this.internalEvents(),
        this.addTriggerableEvents(),
        this.trigger("initialized");
    }),
    (e.prototype.setup = function () {
      var b = this.viewport(),
        c = this.options.responsive,
        d = -1,
        e = null;
      c
        ? (a.each(c, function (a) {
            b >= a && a > d && (d = Number(a));
          }),
          (e = a.extend({}, this.options, c[d])),
          delete e.responsive,
          e.responsiveClass &&
            this.$element
              .attr("class", function (a, b) {
                return b.replace(/\b owl-responsive-\S+/g, "");
              })
              .addClass("owl-responsive-" + d))
        : (e = a.extend({}, this.options)),
        (null === this.settings || this._breakpoint !== d) &&
          (this.trigger("change", { property: { name: "settings", value: e } }),
          (this._breakpoint = d),
          (this.settings = e),
          this.invalidate("settings"),
          this.trigger("changed", {
            property: { name: "settings", value: this.settings },
          }));
    }),
    (e.prototype.optionsLogic = function () {
      this.$element.toggleClass("owl-center", this.settings.center),
        this.settings.loop &&
          this._items.length < this.settings.items &&
          (this.settings.loop = !1),
        this.settings.autoWidth &&
          ((this.settings.stagePadding = !1), (this.settings.merge = !1));
    }),
    (e.prototype.prepare = function (b) {
      var c = this.trigger("prepare", { content: b });
      return (
        c.data ||
          (c.data = a("<" + this.settings.itemElement + "/>")
            .addClass(this.settings.itemClass)
            .append(b)),
        this.trigger("prepared", { content: c.data }),
        c.data
      );
    }),
    (e.prototype.update = function () {
      for (
        var b = 0,
          c = this._pipe.length,
          d = a.proxy(function (a) {
            return this[a];
          }, this._invalidated),
          e = {};
        c > b;

      )
        (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) &&
          this._pipe[b].run(e),
          b++;
      this._invalidated = {};
    }),
    (e.prototype.width = function (a) {
      switch ((a = a || e.Width.Default)) {
        case e.Width.Inner:
        case e.Width.Outer:
          return this._width;
        default:
          return (
            this._width - 2 * this.settings.stagePadding + this.settings.margin
          );
      }
    }),
    (e.prototype.refresh = function () {
      if (0 === this._items.length) return !1;
      new Date().getTime();
      this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$stage.addClass("owl-refresh"),
        this.update(),
        this.$stage.removeClass("owl-refresh"),
        (this.state.orientation = b.orientation),
        this.watchVisibility(),
        this.trigger("refreshed");
    }),
    (e.prototype.eventsCall = function () {
      (this.e._onDragStart = a.proxy(function (a) {
        this.onDragStart(a);
      }, this)),
        (this.e._onDragMove = a.proxy(function (a) {
          this.onDragMove(a);
        }, this)),
        (this.e._onDragEnd = a.proxy(function (a) {
          this.onDragEnd(a);
        }, this)),
        (this.e._onResize = a.proxy(function (a) {
          this.onResize(a);
        }, this)),
        (this.e._transitionEnd = a.proxy(function (a) {
          this.transitionEnd(a);
        }, this)),
        (this.e._preventClick = a.proxy(function (a) {
          this.preventClick(a);
        }, this));
    }),
    (e.prototype.onThrottledResize = function () {
      b.clearTimeout(this.resizeTimer),
        (this.resizeTimer = b.setTimeout(
          this.e._onResize,
          this.settings.responsiveRefreshRate
        ));
    }),
    (e.prototype.onResize = function () {
      return this._items.length
        ? this._width === this.$element.width()
          ? !1
          : this.trigger("resize").isDefaultPrevented()
          ? !1
          : ((this._width = this.$element.width()),
            this.invalidate("width"),
            this.refresh(),
            void this.trigger("resized"))
        : !1;
    }),
    (e.prototype.eventsRouter = function (a) {
      var b = a.type;
      "mousedown" === b || "touchstart" === b
        ? this.onDragStart(a)
        : "mousemove" === b || "touchmove" === b
        ? this.onDragMove(a)
        : "mouseup" === b || "touchend" === b
        ? this.onDragEnd(a)
        : "touchcancel" === b && this.onDragEnd(a);
    }),
    (e.prototype.internalEvents = function () {
      var c = (k(), l());
      this.settings.mouseDrag
        ? (this.$stage.on(
            "mousedown",
            a.proxy(function (a) {
              this.eventsRouter(a);
            }, this)
          ),
          this.$stage.on("dragstart", function () {
            return !1;
          }),
          (this.$stage.get(0).onselectstart = function () {
            return !1;
          }))
        : this.$element.addClass("owl-text-select-on"),
        this.settings.touchDrag &&
          !c &&
          this.$stage.on(
            "touchstart touchcancel",
            a.proxy(function (a) {
              this.eventsRouter(a);
            }, this)
          ),
        this.transitionEndVendor &&
          this.on(
            this.$stage.get(0),
            this.transitionEndVendor,
            this.e._transitionEnd,
            !1
          ),
        this.settings.responsive !== !1 &&
          this.on(b, "resize", a.proxy(this.onThrottledResize, this));
    }),
    (e.prototype.onDragStart = function (d) {
      var e, g, h, i;
      if (
        ((e = d.originalEvent || d || b.event),
        3 === e.which || this.state.isTouch)
      )
        return !1;
      if (
        ("mousedown" === e.type && this.$stage.addClass("owl-grab"),
        this.trigger("drag"),
        (this.drag.startTime = new Date().getTime()),
        this.speed(0),
        (this.state.isTouch = !0),
        (this.state.isScrolling = !1),
        (this.state.isSwiping = !1),
        (this.drag.distance = 0),
        (g = f(e).x),
        (h = f(e).y),
        (this.drag.offsetX = this.$stage.position().left),
        (this.drag.offsetY = this.$stage.position().top),
        this.settings.rtl &&
          (this.drag.offsetX =
            this.$stage.position().left +
            this.$stage.width() -
            this.width() +
            this.settings.margin),
        this.state.inMotion && this.support3d)
      )
        (i = this.getTransformProperty()),
          (this.drag.offsetX = i),
          this.animate(i),
          (this.state.inMotion = !0);
      else if (this.state.inMotion && !this.support3d)
        return (this.state.inMotion = !1), !1;
      (this.drag.startX = g - this.drag.offsetX),
        (this.drag.startY = h - this.drag.offsetY),
        (this.drag.start = g - this.drag.startX),
        (this.drag.targetEl = e.target || e.srcElement),
        (this.drag.updatedX = this.drag.start),
        ("IMG" === this.drag.targetEl.tagName ||
          "A" === this.drag.targetEl.tagName) &&
          (this.drag.targetEl.draggable = !1),
        a(c).on(
          "mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents",
          a.proxy(function (a) {
            this.eventsRouter(a);
          }, this)
        );
    }),
    (e.prototype.onDragMove = function (a) {
      var c, e, g, h, i, j;
      this.state.isTouch &&
        (this.state.isScrolling ||
          ((c = a.originalEvent || a || b.event),
          (e = f(c).x),
          (g = f(c).y),
          (this.drag.currentX = e - this.drag.startX),
          (this.drag.currentY = g - this.drag.startY),
          (this.drag.distance = this.drag.currentX - this.drag.offsetX),
          this.drag.distance < 0
            ? (this.state.direction = this.settings.rtl ? "right" : "left")
            : this.drag.distance > 0 &&
              (this.state.direction = this.settings.rtl ? "left" : "right"),
          this.settings.loop
            ? this.op(
                this.drag.currentX,
                ">",
                this.coordinates(this.minimum())
              ) && "right" === this.state.direction
              ? (this.drag.currentX -=
                  (this.settings.center && this.coordinates(0)) -
                  this.coordinates(this._items.length))
              : this.op(
                  this.drag.currentX,
                  "<",
                  this.coordinates(this.maximum())
                ) &&
                "left" === this.state.direction &&
                (this.drag.currentX +=
                  (this.settings.center && this.coordinates(0)) -
                  this.coordinates(this._items.length))
            : ((h = this.coordinates(
                this.settings.rtl ? this.maximum() : this.minimum()
              )),
              (i = this.coordinates(
                this.settings.rtl ? this.minimum() : this.maximum()
              )),
              (j = this.settings.pullDrag ? this.drag.distance / 5 : 0),
              (this.drag.currentX = Math.max(
                Math.min(this.drag.currentX, h + j),
                i + j
              ))),
          (this.drag.distance > 8 || this.drag.distance < -8) &&
            (c.preventDefault !== d ? c.preventDefault() : (c.returnValue = !1),
            (this.state.isSwiping = !0)),
          (this.drag.updatedX = this.drag.currentX),
          (this.drag.currentY > 16 || this.drag.currentY < -16) &&
            this.state.isSwiping === !1 &&
            ((this.state.isScrolling = !0),
            (this.drag.updatedX = this.drag.start)),
          this.animate(this.drag.updatedX)));
    }),
    (e.prototype.onDragEnd = function (b) {
      var d, e, f;
      if (this.state.isTouch) {
        if (
          ("mouseup" === b.type && this.$stage.removeClass("owl-grab"),
          this.trigger("dragged"),
          this.drag.targetEl.removeAttribute("draggable"),
          (this.state.isTouch = !1),
          (this.state.isScrolling = !1),
          (this.state.isSwiping = !1),
          0 === this.drag.distance && this.state.inMotion !== !0)
        )
          return (this.state.inMotion = !1), !1;
        (this.drag.endTime = new Date().getTime()),
          (d = this.drag.endTime - this.drag.startTime),
          (e = Math.abs(this.drag.distance)),
          (e > 3 || d > 300) && this.removeClick(this.drag.targetEl),
          (f = this.closest(this.drag.updatedX)),
          this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
          this.current(f),
          this.invalidate("position"),
          this.update(),
          this.settings.pullDrag ||
            this.drag.updatedX !== this.coordinates(f) ||
            this.transitionEnd(),
          (this.drag.distance = 0),
          a(c).off(".owl.dragEvents");
      }
    }),
    (e.prototype.removeClick = function (c) {
      (this.drag.targetEl = c),
        a(c).on("click.preventClick", this.e._preventClick),
        b.setTimeout(function () {
          a(c).off("click.preventClick");
        }, 300);
    }),
    (e.prototype.preventClick = function (b) {
      b.preventDefault ? b.preventDefault() : (b.returnValue = !1),
        b.stopPropagation && b.stopPropagation(),
        a(b.target).off("click.preventClick");
    }),
    (e.prototype.getTransformProperty = function () {
      var a, c;
      return (
        (a = b
          .getComputedStyle(this.$stage.get(0), null)
          .getPropertyValue(this.vendorName + "transform")),
        (a = a.replace(/matrix(3d)?\(|\)/g, "").split(",")),
        (c = 16 === a.length),
        c !== !0 ? a[4] : a[12]
      );
    }),
    (e.prototype.closest = function (b) {
      var c = -1,
        d = 30,
        e = this.width(),
        f = this.coordinates();
      return (
        this.settings.freeDrag ||
          a.each(
            f,
            a.proxy(function (a, g) {
              return (
                b > g - d && g + d > b
                  ? (c = a)
                  : this.op(b, "<", g) &&
                    this.op(b, ">", f[a + 1] || g - e) &&
                    (c = "left" === this.state.direction ? a + 1 : a),
                -1 === c
              );
            }, this)
          ),
        this.settings.loop ||
          (this.op(b, ">", f[this.minimum()])
            ? (c = b = this.minimum())
            : this.op(b, "<", f[this.maximum()]) && (c = b = this.maximum())),
        c
      );
    }),
    (e.prototype.animate = function (b) {
      this.trigger("translate"),
        (this.state.inMotion = this.speed() > 0),
        this.support3d
          ? this.$stage.css({
              transform: "translate3d(" + b + "px,0px, 0px)",
              transition: this.speed() / 1e3 + "s",
            })
          : this.state.isTouch
          ? this.$stage.css({ left: b + "px" })
          : this.$stage.animate(
              { left: b },
              this.speed() / 1e3,
              this.settings.fallbackEasing,
              a.proxy(function () {
                this.state.inMotion && this.transitionEnd();
              }, this)
            );
    }),
    (e.prototype.current = function (a) {
      if (a === d) return this._current;
      if (0 === this._items.length) return d;
      if (((a = this.normalize(a)), this._current !== a)) {
        var b = this.trigger("change", {
          property: { name: "position", value: a },
        });
        b.data !== d && (a = this.normalize(b.data)),
          (this._current = a),
          this.invalidate("position"),
          this.trigger("changed", {
            property: { name: "position", value: this._current },
          });
      }
      return this._current;
    }),
    (e.prototype.invalidate = function (a) {
      this._invalidated[a] = !0;
    }),
    (e.prototype.reset = function (a) {
      (a = this.normalize(a)),
        a !== d &&
          ((this._speed = 0),
          (this._current = a),
          this.suppress(["translate", "translated"]),
          this.animate(this.coordinates(a)),
          this.release(["translate", "translated"]));
    }),
    (e.prototype.normalize = function (b, c) {
      var e = c ? this._items.length : this._items.length + this._clones.length;
      return !a.isNumeric(b) || 1 > e
        ? d
        : (b = this._clones.length
            ? ((b % e) + e) % e
            : Math.max(this.minimum(c), Math.min(this.maximum(c), b)));
    }),
    (e.prototype.relative = function (a) {
      return (
        (a = this.normalize(a)),
        (a -= this._clones.length / 2),
        this.normalize(a, !0)
      );
    }),
    (e.prototype.maximum = function (a) {
      var b,
        c,
        d,
        e = 0,
        f = this.settings;
      if (a) return this._items.length - 1;
      if (!f.loop && f.center) b = this._items.length - 1;
      else if (f.loop || f.center)
        if (f.loop || f.center) b = this._items.length + f.items;
        else {
          if (!f.autoWidth && !f.merge)
            throw "Can not detect maximum absolute position.";
          for (
            revert = f.rtl ? 1 : -1,
              c = this.$stage.width() - this.$element.width();
            (d = this.coordinates(e)) && !(d * revert >= c);

          )
            b = ++e;
        }
      else b = this._items.length - f.items;
      return b;
    }),
    (e.prototype.minimum = function (a) {
      return a ? 0 : this._clones.length / 2;
    }),
    (e.prototype.items = function (a) {
      return a === d
        ? this._items.slice()
        : ((a = this.normalize(a, !0)), this._items[a]);
    }),
    (e.prototype.mergers = function (a) {
      return a === d
        ? this._mergers.slice()
        : ((a = this.normalize(a, !0)), this._mergers[a]);
    }),
    (e.prototype.clones = function (b) {
      var c = this._clones.length / 2,
        e = c + this._items.length,
        f = function (a) {
          return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2;
        };
      return b === d
        ? a.map(this._clones, function (a, b) {
            return f(b);
          })
        : a.map(this._clones, function (a, c) {
            return a === b ? f(c) : null;
          });
    }),
    (e.prototype.speed = function (a) {
      return a !== d && (this._speed = a), this._speed;
    }),
    (e.prototype.coordinates = function (b) {
      var c = null;
      return b === d
        ? a.map(
            this._coordinates,
            a.proxy(function (a, b) {
              return this.coordinates(b);
            }, this)
          )
        : (this.settings.center
            ? ((c = this._coordinates[b]),
              (c +=
                ((this.width() - c + (this._coordinates[b - 1] || 0)) / 2) *
                (this.settings.rtl ? -1 : 1)))
            : (c = this._coordinates[b - 1] || 0),
          c);
    }),
    (e.prototype.duration = function (a, b, c) {
      return (
        Math.min(Math.max(Math.abs(b - a), 1), 6) *
        Math.abs(c || this.settings.smartSpeed)
      );
    }),
    (e.prototype.to = function (c, d) {
      if (this.settings.loop) {
        var e = c - this.relative(this.current()),
          f = this.current(),
          g = this.current(),
          h = this.current() + e,
          i = 0 > g - h ? !0 : !1,
          j = this._clones.length + this._items.length;
        h < this.settings.items && i === !1
          ? ((f = g + this._items.length), this.reset(f))
          : h >= j - this.settings.items &&
            i === !0 &&
            ((f = g - this._items.length), this.reset(f)),
          b.clearTimeout(this.e._goToLoop),
          (this.e._goToLoop = b.setTimeout(
            a.proxy(function () {
              this.speed(this.duration(this.current(), f + e, d)),
                this.current(f + e),
                this.update();
            }, this),
            30
          ));
      } else
        this.speed(this.duration(this.current(), c, d)),
          this.current(c),
          this.update();
    }),
    (e.prototype.next = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) + 1, a);
    }),
    (e.prototype.prev = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) - 1, a);
    }),
    (e.prototype.transitionEnd = function (a) {
      return a !== d &&
        (a.stopPropagation(),
        (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))
        ? !1
        : ((this.state.inMotion = !1), void this.trigger("translated"));
    }),
    (e.prototype.viewport = function () {
      var d;
      if (this.options.responsiveBaseElement !== b)
        d = a(this.options.responsiveBaseElement).width();
      else if (b.innerWidth) d = b.innerWidth;
      else {
        if (!c.documentElement || !c.documentElement.clientWidth)
          throw "Can not detect viewport width.";
        d = c.documentElement.clientWidth;
      }
      return d;
    }),
    (e.prototype.replace = function (b) {
      this.$stage.empty(),
        (this._items = []),
        b && (b = b instanceof jQuery ? b : a(b)),
        this.settings.nestedItemSelector &&
          (b = b.find("." + this.settings.nestedItemSelector)),
        b
          .filter(function () {
            return 1 === this.nodeType;
          })
          .each(
            a.proxy(function (a, b) {
              (b = this.prepare(b)),
                this.$stage.append(b),
                this._items.push(b),
                this._mergers.push(
                  1 *
                    b
                      .find("[data-merge]")
                      .addBack("[data-merge]")
                      .attr("data-merge") || 1
                );
            }, this)
          ),
        this.reset(
          a.isNumeric(this.settings.startPosition)
            ? this.settings.startPosition
            : 0
        ),
        this.invalidate("items");
    }),
    (e.prototype.add = function (a, b) {
      (b = b === d ? this._items.length : this.normalize(b, !0)),
        this.trigger("add", { content: a, position: b }),
        0 === this._items.length || b === this._items.length
          ? (this.$stage.append(a),
            this._items.push(a),
            this._mergers.push(
              1 *
                a
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            ))
          : (this._items[b].before(a),
            this._items.splice(b, 0, a),
            this._mergers.splice(
              b,
              0,
              1 *
                a
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            )),
        this.invalidate("items"),
        this.trigger("added", { content: a, position: b });
    }),
    (e.prototype.remove = function (a) {
      (a = this.normalize(a, !0)),
        a !== d &&
          (this.trigger("remove", { content: this._items[a], position: a }),
          this._items[a].remove(),
          this._items.splice(a, 1),
          this._mergers.splice(a, 1),
          this.invalidate("items"),
          this.trigger("removed", { content: null, position: a }));
    }),
    (e.prototype.addTriggerableEvents = function () {
      var b = a.proxy(function (b, c) {
        return a.proxy(function (a) {
          a.relatedTarget !== this &&
            (this.suppress([c]),
            b.apply(this, [].slice.call(arguments, 1)),
            this.release([c]));
        }, this);
      }, this);
      a.each(
        {
          next: this.next,
          prev: this.prev,
          to: this.to,
          destroy: this.destroy,
          refresh: this.refresh,
          replace: this.replace,
          add: this.add,
          remove: this.remove,
        },
        a.proxy(function (a, c) {
          this.$element.on(a + ".owl.carousel", b(c, a + ".owl.carousel"));
        }, this)
      );
    }),
    (e.prototype.watchVisibility = function () {
      function c(a) {
        return a.offsetWidth > 0 && a.offsetHeight > 0;
      }
      function d() {
        c(this.$element.get(0)) &&
          (this.$element.removeClass("owl-hidden"),
          this.refresh(),
          b.clearInterval(this.e._checkVisibile));
      }
      c(this.$element.get(0)) ||
        (this.$element.addClass("owl-hidden"),
        b.clearInterval(this.e._checkVisibile),
        (this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500)));
    }),
    (e.prototype.preloadAutoWidthImages = function (b) {
      var c, d, e, f;
      (c = 0),
        (d = this),
        b.each(function (g, h) {
          (e = a(h)),
            (f = new Image()),
            (f.onload = function () {
              c++,
                e.attr("src", f.src),
                e.css("opacity", 1),
                c >= b.length && ((d.state.imagesLoaded = !0), d.initialize());
            }),
            (f.src =
              e.attr("src") || e.attr("data-src") || e.attr("data-src-retina"));
        });
    }),
    (e.prototype.destroy = function () {
      this.$element.hasClass(this.settings.themeClass) &&
        this.$element.removeClass(this.settings.themeClass),
        this.settings.responsive !== !1 && a(b).off("resize.owl.carousel"),
        this.transitionEndVendor &&
          this.off(
            this.$stage.get(0),
            this.transitionEndVendor,
            this.e._transitionEnd
          );
      for (var d in this._plugins) this._plugins[d].destroy();
      (this.settings.mouseDrag || this.settings.touchDrag) &&
        (this.$stage.off("mousedown touchstart touchcancel"),
        a(c).off(".owl.dragEvents"),
        (this.$stage.get(0).onselectstart = function () {}),
        this.$stage.off("dragstart", function () {
          return !1;
        })),
        this.$element.off(".owl"),
        this.$stage.children(".cloned").remove(),
        (this.e = null),
        this.$element.removeData("owlCarousel"),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$stage.unwrap();
    }),
    (e.prototype.op = function (a, b, c) {
      var d = this.settings.rtl;
      switch (b) {
        case "<":
          return d ? a > c : c > a;
        case ">":
          return d ? c > a : a > c;
        case ">=":
          return d ? c >= a : a >= c;
        case "<=":
          return d ? a >= c : c >= a;
      }
    }),
    (e.prototype.on = function (a, b, c, d) {
      a.addEventListener
        ? a.addEventListener(b, c, d)
        : a.attachEvent && a.attachEvent("on" + b, c);
    }),
    (e.prototype.off = function (a, b, c, d) {
      a.removeEventListener
        ? a.removeEventListener(b, c, d)
        : a.detachEvent && a.detachEvent("on" + b, c);
    }),
    (e.prototype.trigger = function (b, c, d) {
      var e = { item: { count: this._items.length, index: this.current() } },
        f = a.camelCase(
          a
            .grep(["on", b, d], function (a) {
              return a;
            })
            .join("-")
            .toLowerCase()
        ),
        g = a.Event(
          [b, "owl", d || "carousel"].join(".").toLowerCase(),
          a.extend({ relatedTarget: this }, e, c)
        );
      return (
        this._supress[b] ||
          (a.each(this._plugins, function (a, b) {
            b.onTrigger && b.onTrigger(g);
          }),
          this.$element.trigger(g),
          this.settings &&
            "function" == typeof this.settings[f] &&
            this.settings[f].apply(this, g)),
        g
      );
    }),
    (e.prototype.suppress = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          this._supress[b] = !0;
        }, this)
      );
    }),
    (e.prototype.release = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          delete this._supress[b];
        }, this)
      );
    }),
    (e.prototype.browserSupport = function () {
      if (((this.support3d = j()), this.support3d)) {
        this.transformVendor = i();
        var a = [
          "transitionend",
          "webkitTransitionEnd",
          "transitionend",
          "oTransitionEnd",
        ];
        (this.transitionEndVendor = a[h()]),
          (this.vendorName = this.transformVendor.replace(/Transform/i, "")),
          (this.vendorName =
            "" !== this.vendorName
              ? "-" + this.vendorName.toLowerCase() + "-"
              : "");
      }
      this.state.orientation = b.orientation;
    }),
    (a.fn.owlCarousel = function (b) {
      return this.each(function () {
        a(this).data("owlCarousel") ||
          a(this).data("owlCarousel", new e(this, b));
      });
    }),
    (a.fn.owlCarousel.Constructor = e);
})(window.Zepto || window.jQuery, window, document),
  (function (a, b) {
    var c = function (b) {
      (this._core = b),
        (this._loaded = []),
        (this._handlers = {
          "initialized.owl.carousel change.owl.carousel": a.proxy(function (b) {
            if (
              b.namespace &&
              this._core.settings &&
              this._core.settings.lazyLoad &&
              ((b.property && "position" == b.property.name) ||
                "initialized" == b.type)
            )
              for (
                var c = this._core.settings,
                  d = (c.center && Math.ceil(c.items / 2)) || c.items,
                  e = (c.center && -1 * d) || 0,
                  f =
                    ((b.property && b.property.value) || this._core.current()) +
                    e,
                  g = this._core.clones().length,
                  h = a.proxy(function (a, b) {
                    this.load(b);
                  }, this);
                e++ < d;

              )
                this.load(g / 2 + this._core.relative(f)),
                  g && a.each(this._core.clones(this._core.relative(f++)), h);
          }, this),
        }),
        (this._core.options = a.extend({}, c.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (c.Defaults = { lazyLoad: !1 }),
      (c.prototype.load = function (c) {
        var d = this._core.$stage.children().eq(c),
          e = d && d.find(".owl-lazy");
        !e ||
          a.inArray(d.get(0), this._loaded) > -1 ||
          (e.each(
            a.proxy(function (c, d) {
              var e,
                f = a(d),
                g =
                  (b.devicePixelRatio > 1 && f.attr("data-src-retina")) ||
                  f.attr("data-src");
              this._core.trigger("load", { element: f, url: g }, "lazy"),
                f.is("img")
                  ? f
                      .one(
                        "load.owl.lazy",
                        a.proxy(function () {
                          f.css("opacity", 1),
                            this._core.trigger(
                              "loaded",
                              { element: f, url: g },
                              "lazy"
                            );
                        }, this)
                      )
                      .attr("src", g)
                  : ((e = new Image()),
                    (e.onload = a.proxy(function () {
                      f.css({
                        "background-image": "url(" + g + ")",
                        opacity: "1",
                      }),
                        this._core.trigger(
                          "loaded",
                          { element: f, url: g },
                          "lazy"
                        );
                    }, this)),
                    (e.src = g));
            }, this)
          ),
          this._loaded.push(d.get(0)));
      }),
      (c.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Lazy = c);
  })(window.Zepto || window.jQuery, window, document),
  (function (a) {
    var b = function (c) {
      (this._core = c),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function () {
            this._core.settings.autoHeight && this.update();
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            this._core.settings.autoHeight &&
              "position" == a.property.name &&
              this.update();
          }, this),
          "loaded.owl.lazy": a.proxy(function (a) {
            this._core.settings.autoHeight &&
              a.element.closest("." + this._core.settings.itemClass) ===
                this._core.$stage.children().eq(this._core.current()) &&
              this.update();
          }, this),
        }),
        (this._core.options = a.extend({}, b.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (b.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
      (b.prototype.update = function () {
        this._core.$stage
          .parent()
          .height(
            this._core.$stage.children().eq(this._core.current()).height()
          )
          .addClass(this._core.settings.autoHeightClass);
      }),
      (b.prototype.destroy = function () {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c) {
    var d = function (b) {
      (this._core = b),
        (this._videos = {}),
        (this._playing = null),
        (this._fullscreen = !1),
        (this._handlers = {
          "resize.owl.carousel": a.proxy(function (a) {
            this._core.settings.video &&
              !this.isInFullScreen() &&
              a.preventDefault();
          }, this),
          "refresh.owl.carousel changed.owl.carousel": a.proxy(function () {
            this._playing && this.stop();
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            var c = a(b.content).find(".owl-video");
            c.length && (c.css("display", "none"), this.fetch(c, a(b.content)));
          }, this),
        }),
        (this._core.options = a.extend({}, d.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          "click.owl.video",
          ".owl-video-play-icon",
          a.proxy(function (a) {
            this.play(a);
          }, this)
        );
    };
    (d.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
      (d.prototype.fetch = function (a, b) {
        var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
          d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
          e = a.attr("data-width") || this._core.settings.videoWidth,
          f = a.attr("data-height") || this._core.settings.videoHeight,
          g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (
          ((d = g.match(
            /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
          )),
          d[3].indexOf("youtu") > -1)
        )
          c = "youtube";
        else {
          if (!(d[3].indexOf("vimeo") > -1))
            throw new Error("Video URL not supported.");
          c = "vimeo";
        }
        (d = d[6]),
          (this._videos[g] = { type: c, id: d, width: e, height: f }),
          b.attr("data-video", g),
          this.thumbnail(a, this._videos[g]);
      }),
      (d.prototype.thumbnail = function (b, c) {
        var d,
          e,
          f,
          g =
            c.width && c.height
              ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"'
              : "",
          h = b.find("img"),
          i = "src",
          j = "",
          k = this._core.settings,
          l = function (a) {
            (e = '<div class="owl-video-play-icon"></div>'),
              (d = k.lazyLoad
                ? '<div class="owl-video-tn ' +
                  j +
                  '" ' +
                  i +
                  '="' +
                  a +
                  '"></div>'
                : '<div class="owl-video-tn" style="opacity:1;background-image:url(' +
                  a +
                  ')"></div>'),
              b.after(d),
              b.after(e);
          };
        return (
          b.wrap('<div class="owl-video-wrapper"' + g + "></div>"),
          this._core.settings.lazyLoad && ((i = "data-src"), (j = "owl-lazy")),
          h.length
            ? (l(h.attr(i)), h.remove(), !1)
            : void ("youtube" === c.type
                ? ((f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg"),
                  l(f))
                : "vimeo" === c.type &&
                  a.ajax({
                    type: "GET",
                    url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
                    jsonp: "callback",
                    dataType: "jsonp",
                    success: function (a) {
                      (f = a[0].thumbnail_large), l(f);
                    },
                  }))
        );
      }),
      (d.prototype.stop = function () {
        this._core.trigger("stop", null, "video"),
          this._playing.find(".owl-video-frame").remove(),
          this._playing.removeClass("owl-video-playing"),
          (this._playing = null);
      }),
      (d.prototype.play = function (b) {
        this._core.trigger("play", null, "video"), this._playing && this.stop();
        var c,
          d,
          e = a(b.target || b.srcElement),
          f = e.closest("." + this._core.settings.itemClass),
          g = this._videos[f.attr("data-video")],
          h = g.width || "100%",
          i = g.height || this._core.$stage.height();
        "youtube" === g.type
          ? (c =
              '<iframe width="' +
              h +
              '" height="' +
              i +
              '" src="http://www.youtube.com/embed/' +
              g.id +
              "?autoplay=1&v=" +
              g.id +
              '" frameborder="0" allowfullscreen></iframe>')
          : "vimeo" === g.type &&
            (c =
              '<iframe src="http://player.vimeo.com/video/' +
              g.id +
              '?autoplay=1" width="' +
              h +
              '" height="' +
              i +
              '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),
          f.addClass("owl-video-playing"),
          (this._playing = f),
          (d = a(
            '<div style="height:' +
              i +
              "px; width:" +
              h +
              'px" class="owl-video-frame">' +
              c +
              "</div>"
          )),
          e.after(d);
      }),
      (d.prototype.isInFullScreen = function () {
        var d =
          c.fullscreenElement ||
          c.mozFullScreenElement ||
          c.webkitFullscreenElement;
        return (
          d &&
            a(d).parent().hasClass("owl-video-frame") &&
            (this._core.speed(0), (this._fullscreen = !0)),
          d && this._fullscreen && this._playing
            ? !1
            : this._fullscreen
            ? ((this._fullscreen = !1), !1)
            : this._playing && this._core.state.orientation !== b.orientation
            ? ((this._core.state.orientation = b.orientation), !1)
            : !0
        );
      }),
      (d.prototype.destroy = function () {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Video = d);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this.core = b),
        (this.core.options = a.extend({}, e.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = d),
        (this.next = d),
        (this.handlers = {
          "change.owl.carousel": a.proxy(function (a) {
            "position" == a.property.name &&
              ((this.previous = this.core.current()),
              (this.next = a.property.value));
          }, this),
          "drag.owl.carousel dragged.owl.carousel translated.owl.carousel":
            a.proxy(function (a) {
              this.swapping = "translated" == a.type;
            }, this),
          "translate.owl.carousel": a.proxy(function () {
            this.swapping &&
              (this.core.options.animateOut || this.core.options.animateIn) &&
              this.swap();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (e.Defaults = { animateOut: !1, animateIn: !1 }),
      (e.prototype.swap = function () {
        if (1 === this.core.settings.items && this.core.support3d) {
          this.core.speed(0);
          var b,
            c = a.proxy(this.clear, this),
            d = this.core.$stage.children().eq(this.previous),
            e = this.core.$stage.children().eq(this.next),
            f = this.core.settings.animateIn,
            g = this.core.settings.animateOut;
          this.core.current() !== this.previous &&
            (g &&
              ((b =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
              d
                .css({ left: b + "px" })
                .addClass("animated owl-animated-out")
                .addClass(g)
                .one(
                  "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                  c
                )),
            f &&
              e
                .addClass("animated owl-animated-in")
                .addClass(f)
                .one(
                  "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                  c
                ));
        }
      }),
      (e.prototype.clear = function (b) {
        a(b.target)
          .css({ left: "" })
          .removeClass("animated owl-animated-out owl-animated-in")
          .removeClass(this.core.settings.animateIn)
          .removeClass(this.core.settings.animateOut),
          this.core.transitionEnd();
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Animate = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c) {
    var d = function (b) {
      (this.core = b),
        (this.core.options = a.extend({}, d.Defaults, this.core.options)),
        (this.handlers = {
          "translated.owl.carousel refreshed.owl.carousel": a.proxy(
            function () {
              this.autoplay();
            },
            this
          ),
          "play.owl.autoplay": a.proxy(function (a, b, c) {
            this.play(b, c);
          }, this),
          "stop.owl.autoplay": a.proxy(function () {
            this.stop();
          }, this),
          "mouseover.owl.autoplay": a.proxy(function () {
            this.core.settings.autoplayHoverPause && this.pause();
          }, this),
          "mouseleave.owl.autoplay": a.proxy(function () {
            this.core.settings.autoplayHoverPause && this.autoplay();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (d.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1,
    }),
      (d.prototype.autoplay = function () {
        this.core.settings.autoplay && !this.core.state.videoPlay
          ? (b.clearInterval(this.interval),
            (this.interval = b.setInterval(
              a.proxy(function () {
                this.play();
              }, this),
              this.core.settings.autoplayTimeout
            )))
          : b.clearInterval(this.interval);
      }),
      (d.prototype.play = function () {
        return c.hidden === !0 ||
          this.core.state.isTouch ||
          this.core.state.isScrolling ||
          this.core.state.isSwiping ||
          this.core.state.inMotion
          ? void 0
          : this.core.settings.autoplay === !1
          ? void b.clearInterval(this.interval)
          : void this.core.next(this.core.settings.autoplaySpeed);
      }),
      (d.prototype.stop = function () {
        b.clearInterval(this.interval);
      }),
      (d.prototype.pause = function () {
        b.clearInterval(this.interval);
      }),
      (d.prototype.destroy = function () {
        var a, c;
        b.clearInterval(this.interval);
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.autoplay = d);
  })(window.Zepto || window.jQuery, window, document),
  (function (a) {
    "use strict";
    var b = function (c) {
      (this._core = c),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to,
        }),
        (this._handlers = {
          "prepared.owl.carousel": a.proxy(function (b) {
            this._core.settings.dotsData &&
              this._templates.push(
                a(b.content)
                  .find("[data-dot]")
                  .addBack("[data-dot]")
                  .attr("data-dot")
              );
          }, this),
          "add.owl.carousel": a.proxy(function (b) {
            this._core.settings.dotsData &&
              this._templates.splice(
                b.position,
                0,
                a(b.content)
                  .find("[data-dot]")
                  .addBack("[data-dot]")
                  .attr("data-dot")
              );
          }, this),
          "remove.owl.carousel prepared.owl.carousel": a.proxy(function (a) {
            this._core.settings.dotsData &&
              this._templates.splice(a.position, 1);
          }, this),
          "change.owl.carousel": a.proxy(function (a) {
            if (
              "position" == a.property.name &&
              !this._core.state.revert &&
              !this._core.settings.loop &&
              this._core.settings.navRewind
            ) {
              var b = this._core.current(),
                c = this._core.maximum(),
                d = this._core.minimum();
              a.data =
                a.property.value > c
                  ? b >= c
                    ? d
                    : c
                  : a.property.value < d
                  ? c
                  : a.property.value;
            }
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            "position" == a.property.name && this.draw();
          }, this),
          "refreshed.owl.carousel": a.proxy(function () {
            this._initialized || (this.initialize(), (this._initialized = !0)),
              this._core.trigger("refresh", null, "navigation"),
              this.update(),
              this.draw(),
              this._core.trigger("refreshed", null, "navigation");
          }, this),
        }),
        (this._core.options = a.extend({}, b.Defaults, this._core.options)),
        this.$element.on(this._handlers);
    };
    (b.Defaults = {
      nav: !1,
      navRewind: !0,
      navText: ["prev", "next"],
      navSpeed: !1,
      navElement: "div",
      navContainer: !1,
      navContainerClass: "owl-nav",
      navClass: ["owl-prev", "owl-next"],
      slideBy: 1,
      dotClass: "owl-dot",
      dotsClass: "owl-dots",
      dots: !0,
      dotsEach: !1,
      dotData: !1,
      dotsSpeed: !1,
      dotsContainer: !1,
      controlsClass: "owl-controls",
    }),
      (b.prototype.initialize = function () {
        var b,
          c,
          d = this._core.settings;
        d.dotsData ||
          (this._templates = [
            a("<div>")
              .addClass(d.dotClass)
              .append(a("<span>"))
              .prop("outerHTML"),
          ]),
          (d.navContainer && d.dotsContainer) ||
            (this._controls.$container = a("<div>")
              .addClass(d.controlsClass)
              .appendTo(this.$element)),
          (this._controls.$indicators = d.dotsContainer
            ? a(d.dotsContainer)
            : a("<div>")
                .hide()
                .addClass(d.dotsClass)
                .appendTo(this._controls.$container)),
          this._controls.$indicators.on(
            "click",
            "div",
            a.proxy(function (b) {
              var c = a(b.target).parent().is(this._controls.$indicators)
                ? a(b.target).index()
                : a(b.target).parent().index();
              b.preventDefault(), this.to(c, d.dotsSpeed);
            }, this)
          ),
          (b = d.navContainer
            ? a(d.navContainer)
            : a("<div>")
                .addClass(d.navContainerClass)
                .prependTo(this._controls.$container)),
          (this._controls.$next = a("<" + d.navElement + ">")),
          (this._controls.$previous = this._controls.$next.clone()),
          this._controls.$previous
            .addClass(d.navClass[0])
            .html(d.navText[0])
            .hide()
            .prependTo(b)
            .on(
              "click",
              a.proxy(function () {
                this.prev(d.navSpeed);
              }, this)
            ),
          this._controls.$next
            .addClass(d.navClass[1])
            .html(d.navText[1])
            .hide()
            .appendTo(b)
            .on(
              "click",
              a.proxy(function () {
                this.next(d.navSpeed);
              }, this)
            );
        for (c in this._overrides) this._core[c] = a.proxy(this[c], this);
      }),
      (b.prototype.destroy = function () {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (b.prototype.update = function () {
        var a,
          b,
          c,
          d = this._core.settings,
          e = this._core.clones().length / 2,
          f = e + this._core.items().length,
          g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items;
        if (
          ("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)),
          d.dots || "page" == d.slideBy)
        )
          for (this._pages = [], a = e, b = 0, c = 0; f > a; a++)
            (b >= g || 0 === b) &&
              (this._pages.push({ start: a - e, end: a - e + g - 1 }),
              (b = 0),
              ++c),
              (b += this._core.mergers(this._core.relative(a)));
      }),
      (b.prototype.draw = function () {
        var b,
          c,
          d = "",
          e = this._core.settings,
          f =
            (this._core.$stage.children(),
            this._core.relative(this._core.current()));
        if (
          (!e.nav ||
            e.loop ||
            e.navRewind ||
            (this._controls.$previous.toggleClass("disabled", 0 >= f),
            this._controls.$next.toggleClass(
              "disabled",
              f >= this._core.maximum()
            )),
          this._controls.$previous.toggle(e.nav),
          this._controls.$next.toggle(e.nav),
          e.dots)
        ) {
          if (
            ((b =
              this._pages.length -
              this._controls.$indicators.children().length),
            e.dotData && 0 !== b)
          ) {
            for (c = 0; c < this._controls.$indicators.children().length; c++)
              d += this._templates[this._core.relative(c)];
            this._controls.$indicators.html(d);
          } else
            b > 0
              ? ((d = new Array(b + 1).join(this._templates[0])),
                this._controls.$indicators.append(d))
              : 0 > b &&
                this._controls.$indicators.children().slice(b).remove();
          this._controls.$indicators.find(".active").removeClass("active"),
            this._controls.$indicators
              .children()
              .eq(a.inArray(this.current(), this._pages))
              .addClass("active");
        }
        this._controls.$indicators.toggle(e.dots);
      }),
      (b.prototype.onTrigger = function (b) {
        var c = this._core.settings;
        b.page = {
          index: a.inArray(this.current(), this._pages),
          count: this._pages.length,
          size:
            c &&
            (c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items),
        };
      }),
      (b.prototype.current = function () {
        var b = this._core.relative(this._core.current());
        return a
          .grep(this._pages, function (a) {
            return a.start <= b && a.end >= b;
          })
          .pop();
      }),
      (b.prototype.getPosition = function (b) {
        var c,
          d,
          e = this._core.settings;
        return (
          "page" == e.slideBy
            ? ((c = a.inArray(this.current(), this._pages)),
              (d = this._pages.length),
              b ? ++c : --c,
              (c = this._pages[((c % d) + d) % d].start))
            : ((c = this._core.relative(this._core.current())),
              (d = this._core.items().length),
              b ? (c += e.slideBy) : (c -= e.slideBy)),
          c
        );
      }),
      (b.prototype.next = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
      }),
      (b.prototype.prev = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
      }),
      (b.prototype.to = function (b, c, d) {
        var e;
        d
          ? a.proxy(this._overrides.to, this._core)(b, c)
          : ((e = this._pages.length),
            a.proxy(this._overrides.to, this._core)(
              this._pages[((b % e) + e) % e].start,
              c
            ));
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Navigation = b);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b) {
    "use strict";
    var c = function (d) {
      (this._core = d),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function () {
            "URLHash" == this._core.settings.startPosition &&
              a(b).trigger("hashchange.owl.navigation");
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            var c = a(b.content)
              .find("[data-hash]")
              .addBack("[data-hash]")
              .attr("data-hash");
            this._hashes[c] = b.content;
          }, this),
        }),
        (this._core.options = a.extend({}, c.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        a(b).on(
          "hashchange.owl.navigation",
          a.proxy(function () {
            var a = b.location.hash.substring(1),
              c = this._core.$stage.children(),
              d = (this._hashes[a] && c.index(this._hashes[a])) || 0;
            return a ? void this._core.to(d, !1, !0) : !1;
          }, this)
        );
    };
    (c.Defaults = { URLhashListener: !1 }),
      (c.prototype.destroy = function () {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this))
          "function" != typeof this[d] && (this[d] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Hash = c);
  })(window.Zepto || window.jQuery, window, document);

/*! owl.carousel2.thumbs - v0.1.7 | (c) 2016 @gijsroge | MIT license | https://github.com/gijsroge/OwlCarousel2-Thumbs */
!(function (a, b, c, d) {
  "use strict";
  var e = function (b) {
    (this.owl = b),
      (this._thumbcontent = []),
      (this._identifier = 0),
      (this.owl_currentitem = this.owl.options.startPosition),
      (this.$element = this.owl.$element),
      (this._handlers = {
        "prepared.owl.carousel": a.proxy(function (b) {
          if (
            !b.namespace ||
            !this.owl.options.thumbs ||
            this.owl.options.thumbImage ||
            this.owl.options.thumbsPrerendered ||
            this.owl.options.thumbImage
          ) {
            if (
              b.namespace &&
              this.owl.options.thumbs &&
              this.owl.options.thumbImage
            ) {
              var c = a(b.content).find("img");
              this._thumbcontent.push(c);
            }
          } else a(b.content).find("[data-thumb]").attr("data-thumb") !== d && this._thumbcontent.push(a(b.content).find("[data-thumb]").attr("data-thumb"));
        }, this),
        "initialized.owl.carousel": a.proxy(function (a) {
          a.namespace &&
            this.owl.options.thumbs &&
            (this.render(),
            this.listen(),
            (this._identifier = this.owl.$element.data("slider-id")),
            this.setActive());
        }, this),
        "changed.owl.carousel": a.proxy(function (a) {
          a.namespace &&
            "position" === a.property.name &&
            this.owl.options.thumbs &&
            ((this._identifier = this.owl.$element.data("slider-id")),
            this.setActive());
        }, this),
      }),
      (this.owl.options = a.extend(e.Defaults, this.owl.options)),
      this.owl.$element.on(this._handlers);
  };
  (e.Defaults = {
    thumbs: !0,
    thumbImage: !1,
    thumbContainerClass: "owl-thumbs",
    thumbItemClass: "owl-thumb-item",
    moveThumbsInside: !1,
  }),
    (e.prototype.listen = function () {
      var b = this.owl.options;
      b.thumbsPrerendered &&
        (this._thumbcontent._thumbcontainer = a("." + b.thumbContainerClass)),
        a(this._thumbcontent._thumbcontainer).on(
          "click",
          this._thumbcontent._thumbcontainer.children(),
          a.proxy(function (c) {
            this._identifier = a(c.target)
              .closest("." + b.thumbContainerClass)
              .data("slider-id");
            var d = a(c.target).parent().is(this._thumbcontent._thumbcontainer)
              ? a(c.target).index()
              : a(c.target)
                  .closest("." + b.thumbItemClass)
                  .index();
            b.thumbsPrerendered
              ? a("[data-slider-id=" + this._identifier + "]").trigger(
                  "to.owl.carousel",
                  [d, b.dotsSpeed, !0]
                )
              : this.owl.to(d, b.dotsSpeed),
              c.preventDefault();
          }, this)
        );
    }),
    (e.prototype.render = function () {
      var b = this.owl.options;
      b.thumbsPrerendered
        ? ((this._thumbcontent._thumbcontainer = a(
            "." + b.thumbContainerClass
          )),
          b.moveThumbsInside &&
            this._thumbcontent._thumbcontainer.appendTo(this.$element))
        : (this._thumbcontent._thumbcontainer = a("<div>")
            .addClass(b.thumbContainerClass)
            .appendTo(this.$element));
      var c;
      if (b.thumbImage)
        for (c = 0; c < this._thumbcontent.length; ++c)
          this._thumbcontent._thumbcontainer.append(
            "<button class=" +
              b.thumbItemClass +
              '><img src="' +
              this._thumbcontent[c].attr("src") +
              '" alt="' +
              this._thumbcontent[c].attr("alt") +
              '" /></button>'
          );
      else
        for (c = 0; c < this._thumbcontent.length; ++c)
          this._thumbcontent._thumbcontainer.append(
            "<button class=" +
              b.thumbItemClass +
              ">" +
              this._thumbcontent[c] +
              "</button>"
          );
    }),
    (e.prototype.setActive = function () {
      (this.owl_currentitem = this.owl._current - this.owl._clones.length / 2),
        this.owl_currentitem === this.owl._items.length &&
          (this.owl_currentitem = 0);
      var b = this.owl.options,
        c = b.thumbsPrerendered
          ? a(
              "." +
                b.thumbContainerClass +
                '[data-slider-id="' +
                this._identifier +
                '"]'
            )
          : this._thumbcontent._thumbcontainer;
      c.children().filter(".active").removeClass("active"),
        c.children().eq(this.owl_currentitem).addClass("active");
    }),
    (e.prototype.destroy = function () {
      var a, b;
      for (a in this._handlers) this.owl.$element.off(a, this._handlers[a]);
      for (b in Object.getOwnPropertyNames(this))
        "function" != typeof this[b] && (this[b] = null);
    }),
    (a.fn.owlCarousel.Constructor.Plugins.Thumbs = e);
})(window.Zepto || window.jQuery, window, document);

/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!(function () {
  "use strict";
  function t(o) {
    if (!o) throw new Error("No options passed to Waypoint constructor");
    if (!o.element)
      throw new Error("No element option passed to Waypoint constructor");
    if (!o.handler)
      throw new Error("No handler option passed to Waypoint constructor");
    (this.key = "waypoint-" + e),
      (this.options = t.Adapter.extend({}, t.defaults, o)),
      (this.element = this.options.element),
      (this.adapter = new t.Adapter(this.element)),
      (this.callback = o.handler),
      (this.axis = this.options.horizontal ? "horizontal" : "vertical"),
      (this.enabled = this.options.enabled),
      (this.triggerPoint = null),
      (this.group = t.Group.findOrCreate({
        name: this.options.group,
        axis: this.axis,
      })),
      (this.context = t.Context.findOrCreateByElement(this.options.context)),
      t.offsetAliases[this.options.offset] &&
        (this.options.offset = t.offsetAliases[this.options.offset]),
      this.group.add(this),
      this.context.add(this),
      (i[this.key] = this),
      (e += 1);
  }
  var e = 0,
    i = {};
  (t.prototype.queueTrigger = function (t) {
    this.group.queueTrigger(this, t);
  }),
    (t.prototype.trigger = function (t) {
      this.enabled && this.callback && this.callback.apply(this, t);
    }),
    (t.prototype.destroy = function () {
      this.context.remove(this), this.group.remove(this), delete i[this.key];
    }),
    (t.prototype.disable = function () {
      return (this.enabled = !1), this;
    }),
    (t.prototype.enable = function () {
      return this.context.refresh(), (this.enabled = !0), this;
    }),
    (t.prototype.next = function () {
      return this.group.next(this);
    }),
    (t.prototype.previous = function () {
      return this.group.previous(this);
    }),
    (t.invokeAll = function (t) {
      var e = [];
      for (var o in i) e.push(i[o]);
      for (var n = 0, r = e.length; r > n; n++) e[n][t]();
    }),
    (t.destroyAll = function () {
      t.invokeAll("destroy");
    }),
    (t.disableAll = function () {
      t.invokeAll("disable");
    }),
    (t.enableAll = function () {
      t.invokeAll("enable");
    }),
    (t.refreshAll = function () {
      t.Context.refreshAll();
    }),
    (t.viewportHeight = function () {
      return window.innerHeight || document.documentElement.clientHeight;
    }),
    (t.viewportWidth = function () {
      return document.documentElement.clientWidth;
    }),
    (t.adapters = []),
    (t.defaults = {
      context: window,
      continuous: !0,
      enabled: !0,
      group: "default",
      horizontal: !1,
      offset: 0,
    }),
    (t.offsetAliases = {
      "bottom-in-view": function () {
        return this.context.innerHeight() - this.adapter.outerHeight();
      },
      "right-in-view": function () {
        return this.context.innerWidth() - this.adapter.outerWidth();
      },
    }),
    (window.Waypoint = t);
})(),
  (function () {
    "use strict";
    function t(t) {
      window.setTimeout(t, 1e3 / 60);
    }
    function e(t) {
      (this.element = t),
        (this.Adapter = n.Adapter),
        (this.adapter = new this.Adapter(t)),
        (this.key = "waypoint-context-" + i),
        (this.didScroll = !1),
        (this.didResize = !1),
        (this.oldScroll = {
          x: this.adapter.scrollLeft(),
          y: this.adapter.scrollTop(),
        }),
        (this.waypoints = { vertical: {}, horizontal: {} }),
        (t.waypointContextKey = this.key),
        (o[t.waypointContextKey] = this),
        (i += 1),
        this.createThrottledScrollHandler(),
        this.createThrottledResizeHandler();
    }
    var i = 0,
      o = {},
      n = window.Waypoint,
      r = window.onload;
    (e.prototype.add = function (t) {
      var e = t.options.horizontal ? "horizontal" : "vertical";
      (this.waypoints[e][t.key] = t), this.refresh();
    }),
      (e.prototype.checkEmpty = function () {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
          e = this.Adapter.isEmptyObject(this.waypoints.vertical);
        t && e && (this.adapter.off(".waypoints"), delete o[this.key]);
      }),
      (e.prototype.createThrottledResizeHandler = function () {
        function t() {
          e.handleResize(), (e.didResize = !1);
        }
        var e = this;
        this.adapter.on("resize.waypoints", function () {
          e.didResize || ((e.didResize = !0), n.requestAnimationFrame(t));
        });
      }),
      (e.prototype.createThrottledScrollHandler = function () {
        function t() {
          e.handleScroll(), (e.didScroll = !1);
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function () {
          (!e.didScroll || n.isTouch) &&
            ((e.didScroll = !0), n.requestAnimationFrame(t));
        });
      }),
      (e.prototype.handleResize = function () {
        n.Context.refreshAll();
      }),
      (e.prototype.handleScroll = function () {
        var t = {},
          e = {
            horizontal: {
              newScroll: this.adapter.scrollLeft(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
            },
            vertical: {
              newScroll: this.adapter.scrollTop(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
            },
          };
        for (var i in e) {
          var o = e[i],
            n = o.newScroll > o.oldScroll,
            r = n ? o.forward : o.backward;
          for (var s in this.waypoints[i]) {
            var a = this.waypoints[i][s],
              l = o.oldScroll < a.triggerPoint,
              h = o.newScroll >= a.triggerPoint,
              p = l && h,
              u = !l && !h;
            (p || u) && (a.queueTrigger(r), (t[a.group.id] = a.group));
          }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll };
      }),
      (e.prototype.innerHeight = function () {
        return this.element == this.element.window
          ? n.viewportHeight()
          : this.adapter.innerHeight();
      }),
      (e.prototype.remove = function (t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty();
      }),
      (e.prototype.innerWidth = function () {
        return this.element == this.element.window
          ? n.viewportWidth()
          : this.adapter.innerWidth();
      }),
      (e.prototype.destroy = function () {
        var t = [];
        for (var e in this.waypoints)
          for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy();
      }),
      (e.prototype.refresh = function () {
        var t,
          e = this.element == this.element.window,
          i = e ? void 0 : this.adapter.offset(),
          o = {};
        this.handleScroll(),
          (t = {
            horizontal: {
              contextOffset: e ? 0 : i.left,
              contextScroll: e ? 0 : this.oldScroll.x,
              contextDimension: this.innerWidth(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
              offsetProp: "left",
            },
            vertical: {
              contextOffset: e ? 0 : i.top,
              contextScroll: e ? 0 : this.oldScroll.y,
              contextDimension: this.innerHeight(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
              offsetProp: "top",
            },
          });
        for (var r in t) {
          var s = t[r];
          for (var a in this.waypoints[r]) {
            var l,
              h,
              p,
              u,
              c,
              d = this.waypoints[r][a],
              f = d.options.offset,
              w = d.triggerPoint,
              y = 0,
              g = null == w;
            d.element !== d.element.window &&
              (y = d.adapter.offset()[s.offsetProp]),
              "function" == typeof f
                ? (f = f.apply(d))
                : "string" == typeof f &&
                  ((f = parseFloat(f)),
                  d.options.offset.indexOf("%") > -1 &&
                    (f = Math.ceil((s.contextDimension * f) / 100))),
              (l = s.contextScroll - s.contextOffset),
              (d.triggerPoint = y + l - f),
              (h = w < s.oldScroll),
              (p = d.triggerPoint >= s.oldScroll),
              (u = h && p),
              (c = !h && !p),
              !g && u
                ? (d.queueTrigger(s.backward), (o[d.group.id] = d.group))
                : !g && c
                ? (d.queueTrigger(s.forward), (o[d.group.id] = d.group))
                : g &&
                  s.oldScroll >= d.triggerPoint &&
                  (d.queueTrigger(s.forward), (o[d.group.id] = d.group));
          }
        }
        return (
          n.requestAnimationFrame(function () {
            for (var t in o) o[t].flushTriggers();
          }),
          this
        );
      }),
      (e.findOrCreateByElement = function (t) {
        return e.findByElement(t) || new e(t);
      }),
      (e.refreshAll = function () {
        for (var t in o) o[t].refresh();
      }),
      (e.findByElement = function (t) {
        return o[t.waypointContextKey];
      }),
      (window.onload = function () {
        r && r(), e.refreshAll();
      }),
      (n.requestAnimationFrame = function (e) {
        var i =
          window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          t;
        i.call(window, e);
      }),
      (n.Context = e);
  })(),
  (function () {
    "use strict";
    function t(t, e) {
      return t.triggerPoint - e.triggerPoint;
    }
    function e(t, e) {
      return e.triggerPoint - t.triggerPoint;
    }
    function i(t) {
      (this.name = t.name),
        (this.axis = t.axis),
        (this.id = this.name + "-" + this.axis),
        (this.waypoints = []),
        this.clearTriggerQueues(),
        (o[this.axis][this.name] = this);
    }
    var o = { vertical: {}, horizontal: {} },
      n = window.Waypoint;
    (i.prototype.add = function (t) {
      this.waypoints.push(t);
    }),
      (i.prototype.clearTriggerQueues = function () {
        this.triggerQueues = { up: [], down: [], left: [], right: [] };
      }),
      (i.prototype.flushTriggers = function () {
        for (var i in this.triggerQueues) {
          var o = this.triggerQueues[i],
            n = "up" === i || "left" === i;
          o.sort(n ? e : t);
          for (var r = 0, s = o.length; s > r; r += 1) {
            var a = o[r];
            (a.options.continuous || r === o.length - 1) && a.trigger([i]);
          }
        }
        this.clearTriggerQueues();
      }),
      (i.prototype.next = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints),
          o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1];
      }),
      (i.prototype.previous = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null;
      }),
      (i.prototype.queueTrigger = function (t, e) {
        this.triggerQueues[e].push(t);
      }),
      (i.prototype.remove = function (t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1);
      }),
      (i.prototype.first = function () {
        return this.waypoints[0];
      }),
      (i.prototype.last = function () {
        return this.waypoints[this.waypoints.length - 1];
      }),
      (i.findOrCreate = function (t) {
        return o[t.axis][t.name] || new i(t);
      }),
      (n.Group = i);
  })(),
  (function () {
    "use strict";
    function t(t) {
      this.$element = e(t);
    }
    var e = window.jQuery,
      i = window.Waypoint;
    e.each(
      [
        "innerHeight",
        "innerWidth",
        "off",
        "offset",
        "on",
        "outerHeight",
        "outerWidth",
        "scrollLeft",
        "scrollTop",
      ],
      function (e, i) {
        t.prototype[i] = function () {
          var t = Array.prototype.slice.call(arguments);
          return this.$element[i].apply(this.$element, t);
        };
      }
    ),
      e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
        t[o] = e[o];
      }),
      i.adapters.push({ name: "jquery", Adapter: t }),
      (i.Adapter = t);
  })(),
  (function () {
    "use strict";
    function t(t) {
      return function () {
        var i = [],
          o = arguments[0];
        return (
          t.isFunction(arguments[0]) &&
            ((o = t.extend({}, arguments[1])), (o.handler = arguments[0])),
          this.each(function () {
            var n = t.extend({}, o, { element: this });
            "string" == typeof n.context &&
              (n.context = t(this).closest(n.context)[0]),
              i.push(new e(n));
          }),
          i
        );
      };
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
      window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
  })();

/*! Magnific Popup - v1.0.1 - 2015-12-30
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2015 Dmitry Semenov; */
!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a(
        "object" == typeof exports
          ? require("jquery")
          : window.jQuery || window.Zepto
      );
})(function (a) {
  var b,
    c,
    d,
    e,
    f,
    g,
    h = "Close",
    i = "BeforeClose",
    j = "AfterClose",
    k = "BeforeAppend",
    l = "MarkupParse",
    m = "Open",
    n = "Change",
    o = "mfp",
    p = "." + o,
    q = "mfp-ready",
    r = "mfp-removing",
    s = "mfp-prevent-close",
    t = function () {},
    u = !!window.jQuery,
    v = a(window),
    w = function (a, c) {
      b.ev.on(o + a + p, c);
    },
    x = function (b, c, d, e) {
      var f = document.createElement("div");
      return (
        (f.className = "mfp-" + b),
        d && (f.innerHTML = d),
        e ? c && c.appendChild(f) : ((f = a(f)), c && f.appendTo(c)),
        f
      );
    },
    y = function (c, d) {
      b.ev.triggerHandler(o + c, d),
        b.st.callbacks &&
          ((c = c.charAt(0).toLowerCase() + c.slice(1)),
          b.st.callbacks[c] &&
            b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
    },
    z = function (c) {
      return (
        (c === g && b.currTemplate.closeBtn) ||
          ((b.currTemplate.closeBtn = a(
            b.st.closeMarkup.replace("%title%", b.st.tClose)
          )),
          (g = c)),
        b.currTemplate.closeBtn
      );
    },
    A = function () {
      a.magnificPopup.instance ||
        ((b = new t()), b.init(), (a.magnificPopup.instance = b));
    },
    B = function () {
      var a = document.createElement("p").style,
        b = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== a.transition) return !0;
      for (; b.length; ) if (b.pop() + "Transition" in a) return !0;
      return !1;
    };
  (t.prototype = {
    constructor: t,
    init: function () {
      var c = navigator.appVersion;
      (b.isIE7 = -1 !== c.indexOf("MSIE 7.")),
        (b.isIE8 = -1 !== c.indexOf("MSIE 8.")),
        (b.isLowIE = b.isIE7 || b.isIE8),
        (b.isAndroid = /android/gi.test(c)),
        (b.isIOS = /iphone|ipad|ipod/gi.test(c)),
        (b.supportsTransition = B()),
        (b.probablyMobile =
          b.isAndroid ||
          b.isIOS ||
          /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
            navigator.userAgent
          )),
        (d = a(document)),
        (b.popupsCache = {});
    },
    open: function (c) {
      var e;
      if (c.isObj === !1) {
        (b.items = c.items.toArray()), (b.index = 0);
        var g,
          h = c.items;
        for (e = 0; e < h.length; e++)
          if (((g = h[e]), g.parsed && (g = g.el[0]), g === c.el[0])) {
            b.index = e;
            break;
          }
      } else
        (b.items = a.isArray(c.items) ? c.items : [c.items]),
          (b.index = c.index || 0);
      if (b.isOpen) return void b.updateItemHTML();
      (b.types = []),
        (f = ""),
        c.mainEl && c.mainEl.length ? (b.ev = c.mainEl.eq(0)) : (b.ev = d),
        c.key
          ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}),
            (b.currTemplate = b.popupsCache[c.key]))
          : (b.currTemplate = {}),
        (b.st = a.extend(!0, {}, a.magnificPopup.defaults, c)),
        (b.fixedContentPos =
          "auto" === b.st.fixedContentPos
            ? !b.probablyMobile
            : b.st.fixedContentPos),
        b.st.modal &&
          ((b.st.closeOnContentClick = !1),
          (b.st.closeOnBgClick = !1),
          (b.st.showCloseBtn = !1),
          (b.st.enableEscapeKey = !1)),
        b.bgOverlay ||
          ((b.bgOverlay = x("bg").on("click" + p, function () {
            b.close();
          })),
          (b.wrap = x("wrap")
            .attr("tabindex", -1)
            .on("click" + p, function (a) {
              b._checkIfClose(a.target) && b.close();
            })),
          (b.container = x("container", b.wrap))),
        (b.contentContainer = x("content")),
        b.st.preloader &&
          (b.preloader = x("preloader", b.container, b.st.tLoading));
      var i = a.magnificPopup.modules;
      for (e = 0; e < i.length; e++) {
        var j = i[e];
        (j = j.charAt(0).toUpperCase() + j.slice(1)), b["init" + j].call(b);
      }
      y("BeforeOpen"),
        b.st.showCloseBtn &&
          (b.st.closeBtnInside
            ? (w(l, function (a, b, c, d) {
                c.close_replaceWith = z(d.type);
              }),
              (f += " mfp-close-btn-in"))
            : b.wrap.append(z())),
        b.st.alignTop && (f += " mfp-align-top"),
        b.fixedContentPos
          ? b.wrap.css({
              overflow: b.st.overflowY,
              overflowX: "hidden",
              overflowY: b.st.overflowY,
            })
          : b.wrap.css({ top: v.scrollTop(), position: "absolute" }),
        (b.st.fixedBgPos === !1 ||
          ("auto" === b.st.fixedBgPos && !b.fixedContentPos)) &&
          b.bgOverlay.css({ height: d.height(), position: "absolute" }),
        b.st.enableEscapeKey &&
          d.on("keyup" + p, function (a) {
            27 === a.keyCode && b.close();
          }),
        v.on("resize" + p, function () {
          b.updateSize();
        }),
        b.st.closeOnContentClick || (f += " mfp-auto-cursor"),
        f && b.wrap.addClass(f);
      var k = (b.wH = v.height()),
        n = {};
      if (b.fixedContentPos && b._hasScrollBar(k)) {
        var o = b._getScrollbarSize();
        o && (n.marginRight = o);
      }
      b.fixedContentPos &&
        (b.isIE7
          ? a("body, html").css("overflow", "hidden")
          : (n.overflow = "hidden"));
      var r = b.st.mainClass;
      return (
        b.isIE7 && (r += " mfp-ie7"),
        r && b._addClassToMFP(r),
        b.updateItemHTML(),
        y("BuildControls"),
        a("html").css(n),
        b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)),
        (b._lastFocusedEl = document.activeElement),
        setTimeout(function () {
          b.content
            ? (b._addClassToMFP(q), b._setFocus())
            : b.bgOverlay.addClass(q),
            d.on("focusin" + p, b._onFocusIn);
        }, 16),
        (b.isOpen = !0),
        b.updateSize(k),
        y(m),
        c
      );
    },
    close: function () {
      b.isOpen &&
        (y(i),
        (b.isOpen = !1),
        b.st.removalDelay && !b.isLowIE && b.supportsTransition
          ? (b._addClassToMFP(r),
            setTimeout(function () {
              b._close();
            }, b.st.removalDelay))
          : b._close());
    },
    _close: function () {
      y(h);
      var c = r + " " + q + " ";
      if (
        (b.bgOverlay.detach(),
        b.wrap.detach(),
        b.container.empty(),
        b.st.mainClass && (c += b.st.mainClass + " "),
        b._removeClassFromMFP(c),
        b.fixedContentPos)
      ) {
        var e = { marginRight: "" };
        b.isIE7 ? a("body, html").css("overflow", "") : (e.overflow = ""),
          a("html").css(e);
      }
      d.off("keyup" + p + " focusin" + p),
        b.ev.off(p),
        b.wrap.attr("class", "mfp-wrap").removeAttr("style"),
        b.bgOverlay.attr("class", "mfp-bg"),
        b.container.attr("class", "mfp-container"),
        !b.st.showCloseBtn ||
          (b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0) ||
          (b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach()),
        b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(),
        (b.currItem = null),
        (b.content = null),
        (b.currTemplate = null),
        (b.prevHeight = 0),
        y(j);
    },
    updateSize: function (a) {
      if (b.isIOS) {
        var c = document.documentElement.clientWidth / window.innerWidth,
          d = window.innerHeight * c;
        b.wrap.css("height", d), (b.wH = d);
      } else b.wH = a || v.height();
      b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
    },
    updateItemHTML: function () {
      var c = b.items[b.index];
      b.contentContainer.detach(),
        b.content && b.content.detach(),
        c.parsed || (c = b.parseEl(b.index));
      var d = c.type;
      if (
        (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]),
        (b.currItem = c),
        !b.currTemplate[d])
      ) {
        var f = b.st[d] ? b.st[d].markup : !1;
        y("FirstMarkupParse", f),
          f ? (b.currTemplate[d] = a(f)) : (b.currTemplate[d] = !0);
      }
      e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
      var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](
        c,
        b.currTemplate[d]
      );
      b.appendContent(g, d),
        (c.preloaded = !0),
        y(n, c),
        (e = c.type),
        b.container.prepend(b.contentContainer),
        y("AfterChange");
    },
    appendContent: function (a, c) {
      (b.content = a),
        a
          ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0
            ? b.content.find(".mfp-close").length || b.content.append(z())
            : (b.content = a)
          : (b.content = ""),
        y(k),
        b.container.addClass("mfp-" + c + "-holder"),
        b.contentContainer.append(b.content);
    },
    parseEl: function (c) {
      var d,
        e = b.items[c];
      if (
        (e.tagName
          ? (e = { el: a(e) })
          : ((d = e.type), (e = { data: e, src: e.src })),
        e.el)
      ) {
        for (var f = b.types, g = 0; g < f.length; g++)
          if (e.el.hasClass("mfp-" + f[g])) {
            d = f[g];
            break;
          }
        (e.src = e.el.attr("data-mfp-src")),
          e.src || (e.src = e.el.attr("href"));
      }
      return (
        (e.type = d || b.st.type || "inline"),
        (e.index = c),
        (e.parsed = !0),
        (b.items[c] = e),
        y("ElementParse", e),
        b.items[c]
      );
    },
    addGroup: function (a, c) {
      var d = function (d) {
        (d.mfpEl = this), b._openClick(d, a, c);
      };
      c || (c = {});
      var e = "click.magnificPopup";
      (c.mainEl = a),
        c.items
          ? ((c.isObj = !0), a.off(e).on(e, d))
          : ((c.isObj = !1),
            c.delegate
              ? a.off(e).on(e, c.delegate, d)
              : ((c.items = a), a.off(e).on(e, d)));
    },
    _openClick: function (c, d, e) {
      var f =
        void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
      if (
        f ||
        !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)
      ) {
        var g =
          void 0 !== e.disableOn
            ? e.disableOn
            : a.magnificPopup.defaults.disableOn;
        if (g)
          if (a.isFunction(g)) {
            if (!g.call(b)) return !0;
          } else if (v.width() < g) return !0;
        c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()),
          (e.el = a(c.mfpEl)),
          e.delegate && (e.items = d.find(e.delegate)),
          b.open(e);
      }
    },
    updateStatus: function (a, d) {
      if (b.preloader) {
        c !== a && b.container.removeClass("mfp-s-" + c),
          d || "loading" !== a || (d = b.st.tLoading);
        var e = { status: a, text: d };
        y("UpdateStatus", e),
          (a = e.status),
          (d = e.text),
          b.preloader.html(d),
          b.preloader.find("a").on("click", function (a) {
            a.stopImmediatePropagation();
          }),
          b.container.addClass("mfp-s-" + a),
          (c = a);
      }
    },
    _checkIfClose: function (c) {
      if (!a(c).hasClass(s)) {
        var d = b.st.closeOnContentClick,
          e = b.st.closeOnBgClick;
        if (d && e) return !0;
        if (
          !b.content ||
          a(c).hasClass("mfp-close") ||
          (b.preloader && c === b.preloader[0])
        )
          return !0;
        if (c === b.content[0] || a.contains(b.content[0], c)) {
          if (d) return !0;
        } else if (e && a.contains(document, c)) return !0;
        return !1;
      }
    },
    _addClassToMFP: function (a) {
      b.bgOverlay.addClass(a), b.wrap.addClass(a);
    },
    _removeClassFromMFP: function (a) {
      this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
    },
    _hasScrollBar: function (a) {
      return (
        (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
      );
    },
    _setFocus: function () {
      (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
    },
    _onFocusIn: function (c) {
      return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target)
        ? void 0
        : (b._setFocus(), !1);
    },
    _parseMarkup: function (b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)),
        y(l, [b, c, d]),
        a.each(c, function (a, c) {
          if (void 0 === c || c === !1) return !0;
          if (((e = a.split("_")), e.length > 1)) {
            var d = b.find(p + "-" + e[0]);
            if (d.length > 0) {
              var f = e[1];
              "replaceWith" === f
                ? d[0] !== c[0] && d.replaceWith(c)
                : "img" === f
                ? d.is("img")
                  ? d.attr("src", c)
                  : d.replaceWith(
                      '<img src="' + c + '" class="' + d.attr("class") + '" />'
                    )
                : d.attr(e[1], c);
            }
          } else b.find(p + "-" + a).html(c);
        });
    },
    _getScrollbarSize: function () {
      if (void 0 === b.scrollbarSize) {
        var a = document.createElement("div");
        (a.style.cssText =
          "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
          document.body.appendChild(a),
          (b.scrollbarSize = a.offsetWidth - a.clientWidth),
          document.body.removeChild(a);
      }
      return b.scrollbarSize;
    },
  }),
    (a.magnificPopup = {
      instance: null,
      proto: t.prototype,
      modules: [],
      open: function (b, c) {
        return (
          A(),
          (b = b ? a.extend(!0, {}, b) : {}),
          (b.isObj = !0),
          (b.index = c || 0),
          this.instance.open(b)
        );
      },
      close: function () {
        return a.magnificPopup.instance && a.magnificPopup.instance.close();
      },
      registerModule: function (b, c) {
        c.options && (a.magnificPopup.defaults[b] = c.options),
          a.extend(this.proto, c.proto),
          this.modules.push(b);
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: "",
        preloader: !0,
        focus: "",
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: "auto",
        fixedBgPos: "auto",
        overflowY: "auto",
        closeMarkup:
          '<button title="%title%" type="button" class="mfp-close">×</button>',
        tClose: "Close (Esc)",
        tLoading: "Loading...",
        autoFocusLast: !0,
      },
    }),
    (a.fn.magnificPopup = function (c) {
      A();
      var d = a(this);
      if ("string" == typeof c)
        if ("open" === c) {
          var e,
            f = u ? d.data("magnificPopup") : d[0].magnificPopup,
            g = parseInt(arguments[1], 10) || 0;
          f.items
            ? (e = f.items[g])
            : ((e = d), f.delegate && (e = e.find(f.delegate)), (e = e.eq(g))),
            b._openClick({ mfpEl: e }, d, f);
        } else
          b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
      else
        (c = a.extend(!0, {}, c)),
          u ? d.data("magnificPopup", c) : (d[0].magnificPopup = c),
          b.addGroup(d, c);
      return d;
    });
  var C,
    D,
    E,
    F = "inline",
    G = function () {
      E && (D.after(E.addClass(C)).detach(), (E = null));
    };
  a.magnificPopup.registerModule(F, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found",
    },
    proto: {
      initInline: function () {
        b.types.push(F),
          w(h + "." + F, function () {
            G();
          });
      },
      getInline: function (c, d) {
        if ((G(), c.src)) {
          var e = b.st.inline,
            f = a(c.src);
          if (f.length) {
            var g = f[0].parentNode;
            g &&
              g.tagName &&
              (D || ((C = e.hiddenClass), (D = x(C)), (C = "mfp-" + C)),
              (E = f.after(D).detach().removeClass(C))),
              b.updateStatus("ready");
          } else b.updateStatus("error", e.tNotFound), (f = a("<div>"));
          return (c.inlineElement = f), f;
        }
        return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
      },
    },
  });
  var H,
    I = "ajax",
    J = function () {
      H && a(document.body).removeClass(H);
    },
    K = function () {
      J(), b.req && b.req.abort();
    };
  a.magnificPopup.registerModule(I, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.',
    },
    proto: {
      initAjax: function () {
        b.types.push(I),
          (H = b.st.ajax.cursor),
          w(h + "." + I, K),
          w("BeforeChange." + I, K);
      },
      getAjax: function (c) {
        H && a(document.body).addClass(H), b.updateStatus("loading");
        var d = a.extend(
          {
            url: c.src,
            success: function (d, e, f) {
              var g = { data: d, xhr: f };
              y("ParseAjax", g),
                b.appendContent(a(g.data), I),
                (c.finished = !0),
                J(),
                b._setFocus(),
                setTimeout(function () {
                  b.wrap.addClass(q);
                }, 16),
                b.updateStatus("ready"),
                y("AjaxContentAdded");
            },
            error: function () {
              J(),
                (c.finished = c.loadError = !0),
                b.updateStatus(
                  "error",
                  b.st.ajax.tError.replace("%url%", c.src)
                );
            },
          },
          b.st.ajax.settings
        );
        return (b.req = a.ajax(d)), "";
      },
    },
  });
  var L,
    M = function (c) {
      if (c.data && void 0 !== c.data.title) return c.data.title;
      var d = b.st.image.titleSrc;
      if (d) {
        if (a.isFunction(d)) return d.call(b, c);
        if (c.el) return c.el.attr(d) || "";
      }
      return "";
    };
  a.magnificPopup.registerModule("image", {
    options: {
      markup:
        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.',
    },
    proto: {
      initImage: function () {
        var c = b.st.image,
          d = ".image";
        b.types.push("image"),
          w(m + d, function () {
            "image" === b.currItem.type &&
              c.cursor &&
              a(document.body).addClass(c.cursor);
          }),
          w(h + d, function () {
            c.cursor && a(document.body).removeClass(c.cursor),
              v.off("resize" + p);
          }),
          w("Resize" + d, b.resizeImage),
          b.isLowIE && w("AfterChange", b.resizeImage);
      },
      resizeImage: function () {
        var a = b.currItem;
        if (a && a.img && b.st.image.verticalFit) {
          var c = 0;
          b.isLowIE &&
            (c =
              parseInt(a.img.css("padding-top"), 10) +
              parseInt(a.img.css("padding-bottom"), 10)),
            a.img.css("max-height", b.wH - c);
        }
      },
      _onImageHasSize: function (a) {
        a.img &&
          ((a.hasSize = !0),
          L && clearInterval(L),
          (a.isCheckingImgSize = !1),
          y("ImageHasSize", a),
          a.imgHidden &&
            (b.content && b.content.removeClass("mfp-loading"),
            (a.imgHidden = !1)));
      },
      findImageSize: function (a) {
        var c = 0,
          d = a.img[0],
          e = function (f) {
            L && clearInterval(L),
              (L = setInterval(function () {
                return d.naturalWidth > 0
                  ? void b._onImageHasSize(a)
                  : (c > 200 && clearInterval(L),
                    c++,
                    void (3 === c
                      ? e(10)
                      : 40 === c
                      ? e(50)
                      : 100 === c && e(500)));
              }, f));
          };
        e(1);
      },
      getImage: function (c, d) {
        var e = 0,
          f = function () {
            c &&
              (c.img[0].complete
                ? (c.img.off(".mfploader"),
                  c === b.currItem &&
                    (b._onImageHasSize(c), b.updateStatus("ready")),
                  (c.hasSize = !0),
                  (c.loaded = !0),
                  y("ImageLoadComplete"))
                : (e++, 200 > e ? setTimeout(f, 100) : g()));
          },
          g = function () {
            c &&
              (c.img.off(".mfploader"),
              c === b.currItem &&
                (b._onImageHasSize(c),
                b.updateStatus("error", h.tError.replace("%url%", c.src))),
              (c.hasSize = !0),
              (c.loaded = !0),
              (c.loadError = !0));
          },
          h = b.st.image,
          i = d.find(".mfp-img");
        if (i.length) {
          var j = document.createElement("img");
          (j.className = "mfp-img"),
            c.el &&
              c.el.find("img").length &&
              (j.alt = c.el.find("img").attr("alt")),
            (c.img = a(j).on("load.mfploader", f).on("error.mfploader", g)),
            (j.src = c.src),
            i.is("img") && (c.img = c.img.clone()),
            (j = c.img[0]),
            j.naturalWidth > 0 ? (c.hasSize = !0) : j.width || (c.hasSize = !1);
        }
        return (
          b._parseMarkup(d, { title: M(c), img_replaceWith: c.img }, c),
          b.resizeImage(),
          c.hasSize
            ? (L && clearInterval(L),
              c.loadError
                ? (d.addClass("mfp-loading"),
                  b.updateStatus("error", h.tError.replace("%url%", c.src)))
                : (d.removeClass("mfp-loading"), b.updateStatus("ready")),
              d)
            : (b.updateStatus("loading"),
              (c.loading = !0),
              c.hasSize ||
                ((c.imgHidden = !0),
                d.addClass("mfp-loading"),
                b.findImageSize(c)),
              d)
        );
      },
    },
  });
  var N,
    O = function () {
      return (
        void 0 === N &&
          (N = void 0 !== document.createElement("p").style.MozTransform),
        N
      );
    };
  a.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function (a) {
        return a.is("img") ? a : a.find("img");
      },
    },
    proto: {
      initZoom: function () {
        var a,
          c = b.st.zoom,
          d = ".zoom";
        if (c.enabled && b.supportsTransition) {
          var e,
            f,
            g = c.duration,
            j = function (a) {
              var b = a
                  .clone()
                  .removeAttr("style")
                  .removeAttr("class")
                  .addClass("mfp-animated-image"),
                d = "all " + c.duration / 1e3 + "s " + c.easing,
                e = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden",
                },
                f = "transition";
              return (
                (e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d),
                b.css(e),
                b
              );
            },
            k = function () {
              b.content.css("visibility", "visible");
            };
          w("BuildControls" + d, function () {
            if (b._allowZoom()) {
              if (
                (clearTimeout(e),
                b.content.css("visibility", "hidden"),
                (a = b._getItemToZoom()),
                !a)
              )
                return void k();
              (f = j(a)),
                f.css(b._getOffset()),
                b.wrap.append(f),
                (e = setTimeout(function () {
                  f.css(b._getOffset(!0)),
                    (e = setTimeout(function () {
                      k(),
                        setTimeout(function () {
                          f.remove(), (a = f = null), y("ZoomAnimationEnded");
                        }, 16);
                    }, g));
                }, 16));
            }
          }),
            w(i + d, function () {
              if (b._allowZoom()) {
                if ((clearTimeout(e), (b.st.removalDelay = g), !a)) {
                  if (((a = b._getItemToZoom()), !a)) return;
                  f = j(a);
                }
                f.css(b._getOffset(!0)),
                  b.wrap.append(f),
                  b.content.css("visibility", "hidden"),
                  setTimeout(function () {
                    f.css(b._getOffset());
                  }, 16);
              }
            }),
            w(h + d, function () {
              b._allowZoom() && (k(), f && f.remove(), (a = null));
            });
        }
      },
      _allowZoom: function () {
        return "image" === b.currItem.type;
      },
      _getItemToZoom: function () {
        return b.currItem.hasSize ? b.currItem.img : !1;
      },
      _getOffset: function (c) {
        var d;
        d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
        var e = d.offset(),
          f = parseInt(d.css("padding-top"), 10),
          g = parseInt(d.css("padding-bottom"), 10);
        e.top -= a(window).scrollTop() - f;
        var h = {
          width: d.width(),
          height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f,
        };
        return (
          O()
            ? (h["-moz-transform"] = h.transform =
                "translate(" + e.left + "px," + e.top + "px)")
            : ((h.left = e.left), (h.top = e.top)),
          h
        );
      },
    },
  });
  var P = "iframe",
    Q = "//about:blank",
    R = function (a) {
      if (b.currTemplate[P]) {
        var c = b.currTemplate[P].find("iframe");
        c.length &&
          (a || (c[0].src = Q),
          b.isIE8 && c.css("display", a ? "block" : "none"));
      }
    };
  a.magnificPopup.registerModule(P, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1",
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1",
        },
        gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
      },
    },
    proto: {
      initIframe: function () {
        b.types.push(P),
          w("BeforeChange", function (a, b, c) {
            b !== c && (b === P ? R() : c === P && R(!0));
          }),
          w(h + "." + P, function () {
            R();
          });
      },
      getIframe: function (c, d) {
        var e = c.src,
          f = b.st.iframe;
        a.each(f.patterns, function () {
          return e.indexOf(this.index) > -1
            ? (this.id &&
                (e =
                  "string" == typeof this.id
                    ? e.substr(
                        e.lastIndexOf(this.id) + this.id.length,
                        e.length
                      )
                    : this.id.call(this, e)),
              (e = this.src.replace("%id%", e)),
              !1)
            : void 0;
        });
        var g = {};
        return (
          f.srcAction && (g[f.srcAction] = e),
          b._parseMarkup(d, g, c),
          b.updateStatus("ready"),
          d
        );
      },
    },
  });
  var S = function (a) {
      var c = b.items.length;
      return a > c - 1 ? a - c : 0 > a ? c + a : a;
    },
    T = function (a, b, c) {
      return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
    };
  a.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%",
    },
    proto: {
      initGallery: function () {
        var c = b.st.gallery,
          e = ".mfp-gallery",
          g = Boolean(a.fn.mfpFastClick);
        return (
          (b.direction = !0),
          c && c.enabled
            ? ((f += " mfp-gallery"),
              w(m + e, function () {
                c.navigateByImgClick &&
                  b.wrap.on("click" + e, ".mfp-img", function () {
                    return b.items.length > 1 ? (b.next(), !1) : void 0;
                  }),
                  d.on("keydown" + e, function (a) {
                    37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
                  });
              }),
              w("UpdateStatus" + e, function (a, c) {
                c.text &&
                  (c.text = T(c.text, b.currItem.index, b.items.length));
              }),
              w(l + e, function (a, d, e, f) {
                var g = b.items.length;
                e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
              }),
              w("BuildControls" + e, function () {
                if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                  var d = c.arrowMarkup,
                    e = (b.arrowLeft = a(
                      d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")
                    ).addClass(s)),
                    f = (b.arrowRight = a(
                      d
                        .replace(/%title%/gi, c.tNext)
                        .replace(/%dir%/gi, "right")
                    ).addClass(s)),
                    h = g ? "mfpFastClick" : "click";
                  e[h](function () {
                    b.prev();
                  }),
                    f[h](function () {
                      b.next();
                    }),
                    b.isIE7 &&
                      (x("b", e[0], !1, !0),
                      x("a", e[0], !1, !0),
                      x("b", f[0], !1, !0),
                      x("a", f[0], !1, !0)),
                    b.container.append(e.add(f));
                }
              }),
              w(n + e, function () {
                b._preloadTimeout && clearTimeout(b._preloadTimeout),
                  (b._preloadTimeout = setTimeout(function () {
                    b.preloadNearbyImages(), (b._preloadTimeout = null);
                  }, 16));
              }),
              void w(h + e, function () {
                d.off(e),
                  b.wrap.off("click" + e),
                  b.arrowLeft &&
                    g &&
                    b.arrowLeft.add(b.arrowRight).destroyMfpFastClick(),
                  (b.arrowRight = b.arrowLeft = null);
              }))
            : !1
        );
      },
      next: function () {
        (b.direction = !0), (b.index = S(b.index + 1)), b.updateItemHTML();
      },
      prev: function () {
        (b.direction = !1), (b.index = S(b.index - 1)), b.updateItemHTML();
      },
      goTo: function (a) {
        (b.direction = a >= b.index), (b.index = a), b.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var a,
          c = b.st.gallery.preload,
          d = Math.min(c[0], b.items.length),
          e = Math.min(c[1], b.items.length);
        for (a = 1; a <= (b.direction ? e : d); a++)
          b._preloadItem(b.index + a);
        for (a = 1; a <= (b.direction ? d : e); a++)
          b._preloadItem(b.index - a);
      },
      _preloadItem: function (c) {
        if (((c = S(c)), !b.items[c].preloaded)) {
          var d = b.items[c];
          d.parsed || (d = b.parseEl(c)),
            y("LazyLoad", d),
            "image" === d.type &&
              (d.img = a('<img class="mfp-img" />')
                .on("load.mfploader", function () {
                  d.hasSize = !0;
                })
                .on("error.mfploader", function () {
                  (d.hasSize = !0), (d.loadError = !0), y("LazyLoadError", d);
                })
                .attr("src", d.src)),
            (d.preloaded = !0);
        }
      },
    },
  });
  var U = "retina";
  a.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function (a) {
        return a.src.replace(/\.\w+$/, function (a) {
          return "@2x" + a;
        });
      },
      ratio: 1,
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var a = b.st.retina,
            c = a.ratio;
          (c = isNaN(c) ? c() : c),
            c > 1 &&
              (w("ImageHasSize." + U, function (a, b) {
                b.img.css({
                  "max-width": b.img[0].naturalWidth / c,
                  width: "100%",
                });
              }),
              w("ElementParse." + U, function (b, d) {
                d.src = a.replaceSrc(d, c);
              }));
        }
      },
    },
  }),
    (function () {
      var b = 1e3,
        c = "ontouchstart" in window,
        d = function () {
          v.off("touchmove" + f + " touchend" + f);
        },
        e = "mfpFastClick",
        f = "." + e;
      (a.fn.mfpFastClick = function (e) {
        return a(this).each(function () {
          var g,
            h = a(this);
          if (c) {
            var i, j, k, l, m, n;
            h.on("touchstart" + f, function (a) {
              (l = !1),
                (n = 1),
                (m = a.originalEvent
                  ? a.originalEvent.touches[0]
                  : a.touches[0]),
                (j = m.clientX),
                (k = m.clientY),
                v
                  .on("touchmove" + f, function (a) {
                    (m = a.originalEvent ? a.originalEvent.touches : a.touches),
                      (n = m.length),
                      (m = m[0]),
                      (Math.abs(m.clientX - j) > 10 ||
                        Math.abs(m.clientY - k) > 10) &&
                        ((l = !0), d());
                  })
                  .on("touchend" + f, function (a) {
                    d(),
                      l ||
                        n > 1 ||
                        ((g = !0),
                        a.preventDefault(),
                        clearTimeout(i),
                        (i = setTimeout(function () {
                          g = !1;
                        }, b)),
                        e());
                  });
            });
          }
          h.on("click" + f, function () {
            g || e();
          });
        });
      }),
        (a.fn.destroyMfpFastClick = function () {
          a(this).off("touchstart" + f + " click" + f),
            c && v.off("touchmove" + f + " touchend" + f);
        });
    })(),
    A();
});

/*! jQuery UI - v1.11.4 - 2015-03-11
 * http://jqueryui.com
 * Includes: core.js, widget.js, mouse.js, position.js, accordion.js, autocomplete.js, button.js, datepicker.js, dialog.js, draggable.js, droppable.js, effect.js, effect-blind.js, effect-bounce.js, effect-clip.js, effect-drop.js, effect-explode.js, effect-fade.js, effect-fold.js, effect-highlight.js, effect-puff.js, effect-pulsate.js, effect-scale.js, effect-shake.js, effect-size.js, effect-slide.js, effect-transfer.js, menu.js, progressbar.js, resizable.js, selectable.js, selectmenu.js, slider.js, sortable.js, spinner.js, tabs.js, tooltip.js
 * Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */

(function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery);
})(function (e) {
  function t(t, s) {
    var n,
      a,
      o,
      r = t.nodeName.toLowerCase();
    return "area" === r
      ? ((n = t.parentNode),
        (a = n.name),
        t.href && a && "map" === n.nodeName.toLowerCase()
          ? ((o = e("img[usemap='#" + a + "']")[0]), !!o && i(o))
          : !1)
      : (/^(input|select|textarea|button|object)$/.test(r)
          ? !t.disabled
          : "a" === r
          ? t.href || s
          : s) && i(t);
  }
  function i(t) {
    return (
      e.expr.filters.visible(t) &&
      !e(t)
        .parents()
        .addBack()
        .filter(function () {
          return "hidden" === e.css(this, "visibility");
        }).length
    );
  }
  function s(e) {
    for (var t, i; e.length && e[0] !== document; ) {
      if (
        ((t = e.css("position")),
        ("absolute" === t || "relative" === t || "fixed" === t) &&
          ((i = parseInt(e.css("zIndex"), 10)), !isNaN(i) && 0 !== i))
      )
        return i;
      e = e.parent();
    }
    return 0;
  }
  function n() {
    (this._curInst = null),
      (this._keyEvent = !1),
      (this._disabledInputs = []),
      (this._datepickerShowing = !1),
      (this._inDialog = !1),
      (this._mainDivId = "ui-datepicker-div"),
      (this._inlineClass = "ui-datepicker-inline"),
      (this._appendClass = "ui-datepicker-append"),
      (this._triggerClass = "ui-datepicker-trigger"),
      (this._dialogClass = "ui-datepicker-dialog"),
      (this._disableClass = "ui-datepicker-disabled"),
      (this._unselectableClass = "ui-datepicker-unselectable"),
      (this._currentClass = "ui-datepicker-current-day"),
      (this._dayOverClass = "ui-datepicker-days-cell-over"),
      (this.regional = []),
      (this.regional[""] = {
        closeText: "Done",
        prevText: "Prev",
        nextText: "Next",
        currentText: "Today",
        monthNames: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        monthNamesShort: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        dayNames: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        weekHeader: "Wk",
        dateFormat: "mm/dd/yy",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: "",
      }),
      (this._defaults = {
        showOn: "focus",
        showAnim: "fadeIn",
        showOptions: {},
        defaultDate: null,
        appendText: "",
        buttonText: "...",
        buttonImage: "",
        buttonImageOnly: !1,
        hideIfNoPrevNext: !1,
        navigationAsDateFormat: !1,
        gotoCurrent: !1,
        changeMonth: !1,
        changeYear: !1,
        yearRange: "c-10:c+10",
        showOtherMonths: !1,
        selectOtherMonths: !1,
        showWeek: !1,
        calculateWeek: this.iso8601Week,
        shortYearCutoff: "+10",
        minDate: null,
        maxDate: null,
        duration: "fast",
        beforeShowDay: null,
        beforeShow: null,
        onSelect: null,
        onChangeMonthYear: null,
        onClose: null,
        numberOfMonths: 1,
        showCurrentAtPos: 0,
        stepMonths: 1,
        stepBigMonths: 12,
        altField: "",
        altFormat: "",
        constrainInput: !0,
        showButtonPanel: !1,
        autoSize: !1,
        disabled: !1,
      }),
      e.extend(this._defaults, this.regional[""]),
      (this.regional.en = e.extend(!0, {}, this.regional[""])),
      (this.regional["en-US"] = e.extend(!0, {}, this.regional.en)),
      (this.dpDiv = a(
        e(
          "<div id='" +
            this._mainDivId +
            "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"
        )
      ));
  }
  function a(t) {
    var i =
      "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
    return t
      .delegate(i, "mouseout", function () {
        e(this).removeClass("ui-state-hover"),
          -1 !== this.className.indexOf("ui-datepicker-prev") &&
            e(this).removeClass("ui-datepicker-prev-hover"),
          -1 !== this.className.indexOf("ui-datepicker-next") &&
            e(this).removeClass("ui-datepicker-next-hover");
      })
      .delegate(i, "mouseover", o);
  }
  function o() {
    e.datepicker._isDisabledDatepicker(
      v.inline ? v.dpDiv.parent()[0] : v.input[0]
    ) ||
      (e(this)
        .parents(".ui-datepicker-calendar")
        .find("a")
        .removeClass("ui-state-hover"),
      e(this).addClass("ui-state-hover"),
      -1 !== this.className.indexOf("ui-datepicker-prev") &&
        e(this).addClass("ui-datepicker-prev-hover"),
      -1 !== this.className.indexOf("ui-datepicker-next") &&
        e(this).addClass("ui-datepicker-next-hover"));
  }
  function r(t, i) {
    e.extend(t, i);
    for (var s in i) null == i[s] && (t[s] = i[s]);
    return t;
  }
  function h(e) {
    return function () {
      var t = this.element.val();
      e.apply(this, arguments),
        this._refresh(),
        t !== this.element.val() && this._trigger("change");
    };
  }
  (e.ui = e.ui || {}),
    e.extend(e.ui, {
      version: "1.11.4",
      keyCode: {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
      },
    }),
    e.fn.extend({
      scrollParent: function (t) {
        var i = this.css("position"),
          s = "absolute" === i,
          n = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
          a = this.parents()
            .filter(function () {
              var t = e(this);
              return s && "static" === t.css("position")
                ? !1
                : n.test(
                    t.css("overflow") +
                      t.css("overflow-y") +
                      t.css("overflow-x")
                  );
            })
            .eq(0);
        return "fixed" !== i && a.length
          ? a
          : e(this[0].ownerDocument || document);
      },
      uniqueId: (function () {
        var e = 0;
        return function () {
          return this.each(function () {
            this.id || (this.id = "ui-id-" + ++e);
          });
        };
      })(),
      removeUniqueId: function () {
        return this.each(function () {
          /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id");
        });
      },
    }),
    e.extend(e.expr[":"], {
      data: e.expr.createPseudo
        ? e.expr.createPseudo(function (t) {
            return function (i) {
              return !!e.data(i, t);
            };
          })
        : function (t, i, s) {
            return !!e.data(t, s[3]);
          },
      focusable: function (i) {
        return t(i, !isNaN(e.attr(i, "tabindex")));
      },
      tabbable: function (i) {
        var s = e.attr(i, "tabindex"),
          n = isNaN(s);
        return (n || s >= 0) && t(i, !n);
      },
    }),
    e("<a>").outerWidth(1).jquery ||
      e.each(["Width", "Height"], function (t, i) {
        function s(t, i, s, a) {
          return (
            e.each(n, function () {
              (i -= parseFloat(e.css(t, "padding" + this)) || 0),
                s &&
                  (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0),
                a && (i -= parseFloat(e.css(t, "margin" + this)) || 0);
            }),
            i
          );
        }
        var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
          a = i.toLowerCase(),
          o = {
            innerWidth: e.fn.innerWidth,
            innerHeight: e.fn.innerHeight,
            outerWidth: e.fn.outerWidth,
            outerHeight: e.fn.outerHeight,
          };
        (e.fn["inner" + i] = function (t) {
          return void 0 === t
            ? o["inner" + i].call(this)
            : this.each(function () {
                e(this).css(a, s(this, t) + "px");
              });
        }),
          (e.fn["outer" + i] = function (t, n) {
            return "number" != typeof t
              ? o["outer" + i].call(this, t)
              : this.each(function () {
                  e(this).css(a, s(this, t, !0, n) + "px");
                });
          });
      }),
    e.fn.addBack ||
      (e.fn.addBack = function (e) {
        return this.add(
          null == e ? this.prevObject : this.prevObject.filter(e)
        );
      }),
    e("<a>").data("a-b", "a").removeData("a-b").data("a-b") &&
      (e.fn.removeData = (function (t) {
        return function (i) {
          return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this);
        };
      })(e.fn.removeData)),
    (e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
    e.fn.extend({
      focus: (function (t) {
        return function (i, s) {
          return "number" == typeof i
            ? this.each(function () {
                var t = this;
                setTimeout(function () {
                  e(t).focus(), s && s.call(t);
                }, i);
              })
            : t.apply(this, arguments);
        };
      })(e.fn.focus),
      disableSelection: (function () {
        var e =
          "onselectstart" in document.createElement("div")
            ? "selectstart"
            : "mousedown";
        return function () {
          return this.bind(e + ".ui-disableSelection", function (e) {
            e.preventDefault();
          });
        };
      })(),
      enableSelection: function () {
        return this.unbind(".ui-disableSelection");
      },
      zIndex: function (t) {
        if (void 0 !== t) return this.css("zIndex", t);
        if (this.length)
          for (var i, s, n = e(this[0]); n.length && n[0] !== document; ) {
            if (
              ((i = n.css("position")),
              ("absolute" === i || "relative" === i || "fixed" === i) &&
                ((s = parseInt(n.css("zIndex"), 10)), !isNaN(s) && 0 !== s))
            )
              return s;
            n = n.parent();
          }
        return 0;
      },
    }),
    (e.ui.plugin = {
      add: function (t, i, s) {
        var n,
          a = e.ui[t].prototype;
        for (n in s)
          (a.plugins[n] = a.plugins[n] || []), a.plugins[n].push([i, s[n]]);
      },
      call: function (e, t, i, s) {
        var n,
          a = e.plugins[t];
        if (
          a &&
          (s ||
            (e.element[0].parentNode &&
              11 !== e.element[0].parentNode.nodeType))
        )
          for (n = 0; a.length > n; n++)
            e.options[a[n][0]] && a[n][1].apply(e.element, i);
      },
    });
  var l = 0,
    u = Array.prototype.slice;
  (e.cleanData = (function (t) {
    return function (i) {
      var s, n, a;
      for (a = 0; null != (n = i[a]); a++)
        try {
          (s = e._data(n, "events")),
            s && s.remove && e(n).triggerHandler("remove");
        } catch (o) {}
      t(i);
    };
  })(e.cleanData)),
    (e.widget = function (t, i, s) {
      var n,
        a,
        o,
        r,
        h = {},
        l = t.split(".")[0];
      return (
        (t = t.split(".")[1]),
        (n = l + "-" + t),
        s || ((s = i), (i = e.Widget)),
        (e.expr[":"][n.toLowerCase()] = function (t) {
          return !!e.data(t, n);
        }),
        (e[l] = e[l] || {}),
        (a = e[l][t]),
        (o = e[l][t] =
          function (e, t) {
            return this._createWidget
              ? (arguments.length && this._createWidget(e, t), void 0)
              : new o(e, t);
          }),
        e.extend(o, a, {
          version: s.version,
          _proto: e.extend({}, s),
          _childConstructors: [],
        }),
        (r = new i()),
        (r.options = e.widget.extend({}, r.options)),
        e.each(s, function (t, s) {
          return e.isFunction(s)
            ? ((h[t] = (function () {
                var e = function () {
                    return i.prototype[t].apply(this, arguments);
                  },
                  n = function (e) {
                    return i.prototype[t].apply(this, e);
                  };
                return function () {
                  var t,
                    i = this._super,
                    a = this._superApply;
                  return (
                    (this._super = e),
                    (this._superApply = n),
                    (t = s.apply(this, arguments)),
                    (this._super = i),
                    (this._superApply = a),
                    t
                  );
                };
              })()),
              void 0)
            : ((h[t] = s), void 0);
        }),
        (o.prototype = e.widget.extend(
          r,
          { widgetEventPrefix: a ? r.widgetEventPrefix || t : t },
          h,
          { constructor: o, namespace: l, widgetName: t, widgetFullName: n }
        )),
        a
          ? (e.each(a._childConstructors, function (t, i) {
              var s = i.prototype;
              e.widget(s.namespace + "." + s.widgetName, o, i._proto);
            }),
            delete a._childConstructors)
          : i._childConstructors.push(o),
        e.widget.bridge(t, o),
        o
      );
    }),
    (e.widget.extend = function (t) {
      for (var i, s, n = u.call(arguments, 1), a = 0, o = n.length; o > a; a++)
        for (i in n[a])
          (s = n[a][i]),
            n[a].hasOwnProperty(i) &&
              void 0 !== s &&
              (t[i] = e.isPlainObject(s)
                ? e.isPlainObject(t[i])
                  ? e.widget.extend({}, t[i], s)
                  : e.widget.extend({}, s)
                : s);
      return t;
    }),
    (e.widget.bridge = function (t, i) {
      var s = i.prototype.widgetFullName || t;
      e.fn[t] = function (n) {
        var a = "string" == typeof n,
          o = u.call(arguments, 1),
          r = this;
        return (
          a
            ? this.each(function () {
                var i,
                  a = e.data(this, s);
                return "instance" === n
                  ? ((r = a), !1)
                  : a
                  ? e.isFunction(a[n]) && "_" !== n.charAt(0)
                    ? ((i = a[n].apply(a, o)),
                      i !== a && void 0 !== i
                        ? ((r = i && i.jquery ? r.pushStack(i.get()) : i), !1)
                        : void 0)
                    : e.error(
                        "no such method '" +
                          n +
                          "' for " +
                          t +
                          " widget instance"
                      )
                  : e.error(
                      "cannot call methods on " +
                        t +
                        " prior to initialization; " +
                        "attempted to call method '" +
                        n +
                        "'"
                    );
              })
            : (o.length && (n = e.widget.extend.apply(null, [n].concat(o))),
              this.each(function () {
                var t = e.data(this, s);
                t
                  ? (t.option(n || {}), t._init && t._init())
                  : e.data(this, s, new i(n, this));
              })),
          r
        );
      };
    }),
    (e.Widget = function () {}),
    (e.Widget._childConstructors = []),
    (e.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",
      options: { disabled: !1, create: null },
      _createWidget: function (t, i) {
        (i = e(i || this.defaultElement || this)[0]),
          (this.element = e(i)),
          (this.uuid = l++),
          (this.eventNamespace = "." + this.widgetName + this.uuid),
          (this.bindings = e()),
          (this.hoverable = e()),
          (this.focusable = e()),
          i !== this &&
            (e.data(i, this.widgetFullName, this),
            this._on(!0, this.element, {
              remove: function (e) {
                e.target === i && this.destroy();
              },
            }),
            (this.document = e(i.style ? i.ownerDocument : i.document || i)),
            (this.window = e(
              this.document[0].defaultView || this.document[0].parentWindow
            ))),
          (this.options = e.widget.extend(
            {},
            this.options,
            this._getCreateOptions(),
            t
          )),
          this._create(),
          this._trigger("create", null, this._getCreateEventData()),
          this._init();
      },
      _getCreateOptions: e.noop,
      _getCreateEventData: e.noop,
      _create: e.noop,
      _init: e.noop,
      destroy: function () {
        this._destroy(),
          this.element
            .unbind(this.eventNamespace)
            .removeData(this.widgetFullName)
            .removeData(e.camelCase(this.widgetFullName)),
          this.widget()
            .unbind(this.eventNamespace)
            .removeAttr("aria-disabled")
            .removeClass(
              this.widgetFullName + "-disabled " + "ui-state-disabled"
            ),
          this.bindings.unbind(this.eventNamespace),
          this.hoverable.removeClass("ui-state-hover"),
          this.focusable.removeClass("ui-state-focus");
      },
      _destroy: e.noop,
      widget: function () {
        return this.element;
      },
      option: function (t, i) {
        var s,
          n,
          a,
          o = t;
        if (0 === arguments.length) return e.widget.extend({}, this.options);
        if ("string" == typeof t)
          if (((o = {}), (s = t.split(".")), (t = s.shift()), s.length)) {
            for (
              n = o[t] = e.widget.extend({}, this.options[t]), a = 0;
              s.length - 1 > a;
              a++
            )
              (n[s[a]] = n[s[a]] || {}), (n = n[s[a]]);
            if (((t = s.pop()), 1 === arguments.length))
              return void 0 === n[t] ? null : n[t];
            n[t] = i;
          } else {
            if (1 === arguments.length)
              return void 0 === this.options[t] ? null : this.options[t];
            o[t] = i;
          }
        return this._setOptions(o), this;
      },
      _setOptions: function (e) {
        var t;
        for (t in e) this._setOption(t, e[t]);
        return this;
      },
      _setOption: function (e, t) {
        return (
          (this.options[e] = t),
          "disabled" === e &&
            (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t),
            t &&
              (this.hoverable.removeClass("ui-state-hover"),
              this.focusable.removeClass("ui-state-focus"))),
          this
        );
      },
      enable: function () {
        return this._setOptions({ disabled: !1 });
      },
      disable: function () {
        return this._setOptions({ disabled: !0 });
      },
      _on: function (t, i, s) {
        var n,
          a = this;
        "boolean" != typeof t && ((s = i), (i = t), (t = !1)),
          s
            ? ((i = n = e(i)), (this.bindings = this.bindings.add(i)))
            : ((s = i), (i = this.element), (n = this.widget())),
          e.each(s, function (s, o) {
            function r() {
              return t ||
                (a.options.disabled !== !0 &&
                  !e(this).hasClass("ui-state-disabled"))
                ? ("string" == typeof o ? a[o] : o).apply(a, arguments)
                : void 0;
            }
            "string" != typeof o &&
              (r.guid = o.guid = o.guid || r.guid || e.guid++);
            var h = s.match(/^([\w:-]*)\s*(.*)$/),
              l = h[1] + a.eventNamespace,
              u = h[2];
            u ? n.delegate(u, l, r) : i.bind(l, r);
          });
      },
      _off: function (t, i) {
        (i =
          (i || "").split(" ").join(this.eventNamespace + " ") +
          this.eventNamespace),
          t.unbind(i).undelegate(i),
          (this.bindings = e(this.bindings.not(t).get())),
          (this.focusable = e(this.focusable.not(t).get())),
          (this.hoverable = e(this.hoverable.not(t).get()));
      },
      _delay: function (e, t) {
        function i() {
          return ("string" == typeof e ? s[e] : e).apply(s, arguments);
        }
        var s = this;
        return setTimeout(i, t || 0);
      },
      _hoverable: function (t) {
        (this.hoverable = this.hoverable.add(t)),
          this._on(t, {
            mouseenter: function (t) {
              e(t.currentTarget).addClass("ui-state-hover");
            },
            mouseleave: function (t) {
              e(t.currentTarget).removeClass("ui-state-hover");
            },
          });
      },
      _focusable: function (t) {
        (this.focusable = this.focusable.add(t)),
          this._on(t, {
            focusin: function (t) {
              e(t.currentTarget).addClass("ui-state-focus");
            },
            focusout: function (t) {
              e(t.currentTarget).removeClass("ui-state-focus");
            },
          });
      },
      _trigger: function (t, i, s) {
        var n,
          a,
          o = this.options[t];
        if (
          ((s = s || {}),
          (i = e.Event(i)),
          (i.type = (
            t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t
          ).toLowerCase()),
          (i.target = this.element[0]),
          (a = i.originalEvent))
        )
          for (n in a) n in i || (i[n] = a[n]);
        return (
          this.element.trigger(i, s),
          !(
            (e.isFunction(o) &&
              o.apply(this.element[0], [i].concat(s)) === !1) ||
            i.isDefaultPrevented()
          )
        );
      },
    }),
    e.each({ show: "fadeIn", hide: "fadeOut" }, function (t, i) {
      e.Widget.prototype["_" + t] = function (s, n, a) {
        "string" == typeof n && (n = { effect: n });
        var o,
          r = n ? (n === !0 || "number" == typeof n ? i : n.effect || i) : t;
        (n = n || {}),
          "number" == typeof n && (n = { duration: n }),
          (o = !e.isEmptyObject(n)),
          (n.complete = a),
          n.delay && s.delay(n.delay),
          o && e.effects && e.effects.effect[r]
            ? s[t](n)
            : r !== t && s[r]
            ? s[r](n.duration, n.easing, a)
            : s.queue(function (i) {
                e(this)[t](), a && a.call(s[0]), i();
              });
      };
    }),
    e.widget;
  var d = !1;
  e(document).mouseup(function () {
    d = !1;
  }),
    e.widget("ui.mouse", {
      version: "1.11.4",
      options: {
        cancel: "input,textarea,button,select,option",
        distance: 1,
        delay: 0,
      },
      _mouseInit: function () {
        var t = this;
        this.element
          .bind("mousedown." + this.widgetName, function (e) {
            return t._mouseDown(e);
          })
          .bind("click." + this.widgetName, function (i) {
            return !0 === e.data(i.target, t.widgetName + ".preventClickEvent")
              ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"),
                i.stopImmediatePropagation(),
                !1)
              : void 0;
          }),
          (this.started = !1);
      },
      _mouseDestroy: function () {
        this.element.unbind("." + this.widgetName),
          this._mouseMoveDelegate &&
            this.document
              .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
              .unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
      },
      _mouseDown: function (t) {
        if (!d) {
          (this._mouseMoved = !1),
            this._mouseStarted && this._mouseUp(t),
            (this._mouseDownEvent = t);
          var i = this,
            s = 1 === t.which,
            n =
              "string" == typeof this.options.cancel && t.target.nodeName
                ? e(t.target).closest(this.options.cancel).length
                : !1;
          return s && !n && this._mouseCapture(t)
            ? ((this.mouseDelayMet = !this.options.delay),
              this.mouseDelayMet ||
                (this._mouseDelayTimer = setTimeout(function () {
                  i.mouseDelayMet = !0;
                }, this.options.delay)),
              this._mouseDistanceMet(t) &&
              this._mouseDelayMet(t) &&
              ((this._mouseStarted = this._mouseStart(t) !== !1),
              !this._mouseStarted)
                ? (t.preventDefault(), !0)
                : (!0 ===
                    e.data(t.target, this.widgetName + ".preventClickEvent") &&
                    e.removeData(
                      t.target,
                      this.widgetName + ".preventClickEvent"
                    ),
                  (this._mouseMoveDelegate = function (e) {
                    return i._mouseMove(e);
                  }),
                  (this._mouseUpDelegate = function (e) {
                    return i._mouseUp(e);
                  }),
                  this.document
                    .bind(
                      "mousemove." + this.widgetName,
                      this._mouseMoveDelegate
                    )
                    .bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                  t.preventDefault(),
                  (d = !0),
                  !0))
            : !0;
        }
      },
      _mouseMove: function (t) {
        if (this._mouseMoved) {
          if (
            e.ui.ie &&
            (!document.documentMode || 9 > document.documentMode) &&
            !t.button
          )
            return this._mouseUp(t);
          if (!t.which) return this._mouseUp(t);
        }
        return (
          (t.which || t.button) && (this._mouseMoved = !0),
          this._mouseStarted
            ? (this._mouseDrag(t), t.preventDefault())
            : (this._mouseDistanceMet(t) &&
                this._mouseDelayMet(t) &&
                ((this._mouseStarted =
                  this._mouseStart(this._mouseDownEvent, t) !== !1),
                this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)),
              !this._mouseStarted)
        );
      },
      _mouseUp: function (t) {
        return (
          this.document
            .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
            .unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
          this._mouseStarted &&
            ((this._mouseStarted = !1),
            t.target === this._mouseDownEvent.target &&
              e.data(t.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(t)),
          (d = !1),
          !1
        );
      },
      _mouseDistanceMet: function (e) {
        return (
          Math.max(
            Math.abs(this._mouseDownEvent.pageX - e.pageX),
            Math.abs(this._mouseDownEvent.pageY - e.pageY)
          ) >= this.options.distance
        );
      },
      _mouseDelayMet: function () {
        return this.mouseDelayMet;
      },
      _mouseStart: function () {},
      _mouseDrag: function () {},
      _mouseStop: function () {},
      _mouseCapture: function () {
        return !0;
      },
    }),
    (function () {
      function t(e, t, i) {
        return [
          parseFloat(e[0]) * (p.test(e[0]) ? t / 100 : 1),
          parseFloat(e[1]) * (p.test(e[1]) ? i / 100 : 1),
        ];
      }
      function i(t, i) {
        return parseInt(e.css(t, i), 10) || 0;
      }
      function s(t) {
        var i = t[0];
        return 9 === i.nodeType
          ? {
              width: t.width(),
              height: t.height(),
              offset: { top: 0, left: 0 },
            }
          : e.isWindow(i)
          ? {
              width: t.width(),
              height: t.height(),
              offset: { top: t.scrollTop(), left: t.scrollLeft() },
            }
          : i.preventDefault
          ? { width: 0, height: 0, offset: { top: i.pageY, left: i.pageX } }
          : {
              width: t.outerWidth(),
              height: t.outerHeight(),
              offset: t.offset(),
            };
      }
      e.ui = e.ui || {};
      var n,
        a,
        o = Math.max,
        r = Math.abs,
        h = Math.round,
        l = /left|center|right/,
        u = /top|center|bottom/,
        d = /[\+\-]\d+(\.[\d]+)?%?/,
        c = /^\w+/,
        p = /%$/,
        f = e.fn.position;
      (e.position = {
        scrollbarWidth: function () {
          if (void 0 !== n) return n;
          var t,
            i,
            s = e(
              "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"
            ),
            a = s.children()[0];
          return (
            e("body").append(s),
            (t = a.offsetWidth),
            s.css("overflow", "scroll"),
            (i = a.offsetWidth),
            t === i && (i = s[0].clientWidth),
            s.remove(),
            (n = t - i)
          );
        },
        getScrollInfo: function (t) {
          var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
            s = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
            n =
              "scroll" === i ||
              ("auto" === i && t.width < t.element[0].scrollWidth),
            a =
              "scroll" === s ||
              ("auto" === s && t.height < t.element[0].scrollHeight);
          return {
            width: a ? e.position.scrollbarWidth() : 0,
            height: n ? e.position.scrollbarWidth() : 0,
          };
        },
        getWithinInfo: function (t) {
          var i = e(t || window),
            s = e.isWindow(i[0]),
            n = !!i[0] && 9 === i[0].nodeType;
          return {
            element: i,
            isWindow: s,
            isDocument: n,
            offset: i.offset() || { left: 0, top: 0 },
            scrollLeft: i.scrollLeft(),
            scrollTop: i.scrollTop(),
            width: s || n ? i.width() : i.outerWidth(),
            height: s || n ? i.height() : i.outerHeight(),
          };
        },
      }),
        (e.fn.position = function (n) {
          if (!n || !n.of) return f.apply(this, arguments);
          n = e.extend({}, n);
          var p,
            m,
            g,
            v,
            y,
            b,
            _ = e(n.of),
            x = e.position.getWithinInfo(n.within),
            w = e.position.getScrollInfo(x),
            k = (n.collision || "flip").split(" "),
            T = {};
          return (
            (b = s(_)),
            _[0].preventDefault && (n.at = "left top"),
            (m = b.width),
            (g = b.height),
            (v = b.offset),
            (y = e.extend({}, v)),
            e.each(["my", "at"], function () {
              var e,
                t,
                i = (n[this] || "").split(" ");
              1 === i.length &&
                (i = l.test(i[0])
                  ? i.concat(["center"])
                  : u.test(i[0])
                  ? ["center"].concat(i)
                  : ["center", "center"]),
                (i[0] = l.test(i[0]) ? i[0] : "center"),
                (i[1] = u.test(i[1]) ? i[1] : "center"),
                (e = d.exec(i[0])),
                (t = d.exec(i[1])),
                (T[this] = [e ? e[0] : 0, t ? t[0] : 0]),
                (n[this] = [c.exec(i[0])[0], c.exec(i[1])[0]]);
            }),
            1 === k.length && (k[1] = k[0]),
            "right" === n.at[0]
              ? (y.left += m)
              : "center" === n.at[0] && (y.left += m / 2),
            "bottom" === n.at[1]
              ? (y.top += g)
              : "center" === n.at[1] && (y.top += g / 2),
            (p = t(T.at, m, g)),
            (y.left += p[0]),
            (y.top += p[1]),
            this.each(function () {
              var s,
                l,
                u = e(this),
                d = u.outerWidth(),
                c = u.outerHeight(),
                f = i(this, "marginLeft"),
                b = i(this, "marginTop"),
                D = d + f + i(this, "marginRight") + w.width,
                S = c + b + i(this, "marginBottom") + w.height,
                M = e.extend({}, y),
                C = t(T.my, u.outerWidth(), u.outerHeight());
              "right" === n.my[0]
                ? (M.left -= d)
                : "center" === n.my[0] && (M.left -= d / 2),
                "bottom" === n.my[1]
                  ? (M.top -= c)
                  : "center" === n.my[1] && (M.top -= c / 2),
                (M.left += C[0]),
                (M.top += C[1]),
                a || ((M.left = h(M.left)), (M.top = h(M.top))),
                (s = { marginLeft: f, marginTop: b }),
                e.each(["left", "top"], function (t, i) {
                  e.ui.position[k[t]] &&
                    e.ui.position[k[t]][i](M, {
                      targetWidth: m,
                      targetHeight: g,
                      elemWidth: d,
                      elemHeight: c,
                      collisionPosition: s,
                      collisionWidth: D,
                      collisionHeight: S,
                      offset: [p[0] + C[0], p[1] + C[1]],
                      my: n.my,
                      at: n.at,
                      within: x,
                      elem: u,
                    });
                }),
                n.using &&
                  (l = function (e) {
                    var t = v.left - M.left,
                      i = t + m - d,
                      s = v.top - M.top,
                      a = s + g - c,
                      h = {
                        target: {
                          element: _,
                          left: v.left,
                          top: v.top,
                          width: m,
                          height: g,
                        },
                        element: {
                          element: u,
                          left: M.left,
                          top: M.top,
                          width: d,
                          height: c,
                        },
                        horizontal: 0 > i ? "left" : t > 0 ? "right" : "center",
                        vertical: 0 > a ? "top" : s > 0 ? "bottom" : "middle",
                      };
                    d > m && m > r(t + i) && (h.horizontal = "center"),
                      c > g && g > r(s + a) && (h.vertical = "middle"),
                      (h.important =
                        o(r(t), r(i)) > o(r(s), r(a))
                          ? "horizontal"
                          : "vertical"),
                      n.using.call(this, e, h);
                  }),
                u.offset(e.extend(M, { using: l }));
            })
          );
        }),
        (e.ui.position = {
          fit: {
            left: function (e, t) {
              var i,
                s = t.within,
                n = s.isWindow ? s.scrollLeft : s.offset.left,
                a = s.width,
                r = e.left - t.collisionPosition.marginLeft,
                h = n - r,
                l = r + t.collisionWidth - a - n;
              t.collisionWidth > a
                ? h > 0 && 0 >= l
                  ? ((i = e.left + h + t.collisionWidth - a - n),
                    (e.left += h - i))
                  : (e.left =
                      l > 0 && 0 >= h
                        ? n
                        : h > l
                        ? n + a - t.collisionWidth
                        : n)
                : h > 0
                ? (e.left += h)
                : l > 0
                ? (e.left -= l)
                : (e.left = o(e.left - r, e.left));
            },
            top: function (e, t) {
              var i,
                s = t.within,
                n = s.isWindow ? s.scrollTop : s.offset.top,
                a = t.within.height,
                r = e.top - t.collisionPosition.marginTop,
                h = n - r,
                l = r + t.collisionHeight - a - n;
              t.collisionHeight > a
                ? h > 0 && 0 >= l
                  ? ((i = e.top + h + t.collisionHeight - a - n),
                    (e.top += h - i))
                  : (e.top =
                      l > 0 && 0 >= h
                        ? n
                        : h > l
                        ? n + a - t.collisionHeight
                        : n)
                : h > 0
                ? (e.top += h)
                : l > 0
                ? (e.top -= l)
                : (e.top = o(e.top - r, e.top));
            },
          },
          flip: {
            left: function (e, t) {
              var i,
                s,
                n = t.within,
                a = n.offset.left + n.scrollLeft,
                o = n.width,
                h = n.isWindow ? n.scrollLeft : n.offset.left,
                l = e.left - t.collisionPosition.marginLeft,
                u = l - h,
                d = l + t.collisionWidth - o - h,
                c =
                  "left" === t.my[0]
                    ? -t.elemWidth
                    : "right" === t.my[0]
                    ? t.elemWidth
                    : 0,
                p =
                  "left" === t.at[0]
                    ? t.targetWidth
                    : "right" === t.at[0]
                    ? -t.targetWidth
                    : 0,
                f = -2 * t.offset[0];
              0 > u
                ? ((i = e.left + c + p + f + t.collisionWidth - o - a),
                  (0 > i || r(u) > i) && (e.left += c + p + f))
                : d > 0 &&
                  ((s =
                    e.left - t.collisionPosition.marginLeft + c + p + f - h),
                  (s > 0 || d > r(s)) && (e.left += c + p + f));
            },
            top: function (e, t) {
              var i,
                s,
                n = t.within,
                a = n.offset.top + n.scrollTop,
                o = n.height,
                h = n.isWindow ? n.scrollTop : n.offset.top,
                l = e.top - t.collisionPosition.marginTop,
                u = l - h,
                d = l + t.collisionHeight - o - h,
                c = "top" === t.my[1],
                p = c ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
                f =
                  "top" === t.at[1]
                    ? t.targetHeight
                    : "bottom" === t.at[1]
                    ? -t.targetHeight
                    : 0,
                m = -2 * t.offset[1];
              0 > u
                ? ((s = e.top + p + f + m + t.collisionHeight - o - a),
                  (0 > s || r(u) > s) && (e.top += p + f + m))
                : d > 0 &&
                  ((i = e.top - t.collisionPosition.marginTop + p + f + m - h),
                  (i > 0 || d > r(i)) && (e.top += p + f + m));
            },
          },
          flipfit: {
            left: function () {
              e.ui.position.flip.left.apply(this, arguments),
                e.ui.position.fit.left.apply(this, arguments);
            },
            top: function () {
              e.ui.position.flip.top.apply(this, arguments),
                e.ui.position.fit.top.apply(this, arguments);
            },
          },
        }),
        (function () {
          var t,
            i,
            s,
            n,
            o,
            r = document.getElementsByTagName("body")[0],
            h = document.createElement("div");
          (t = document.createElement(r ? "div" : "body")),
            (s = {
              visibility: "hidden",
              width: 0,
              height: 0,
              border: 0,
              margin: 0,
              background: "none",
            }),
            r &&
              e.extend(s, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px",
              });
          for (o in s) t.style[o] = s[o];
          t.appendChild(h),
            (i = r || document.documentElement),
            i.insertBefore(t, i.firstChild),
            (h.style.cssText = "position: absolute; left: 10.7432222px;"),
            (n = e(h).offset().left),
            (a = n > 10 && 11 > n),
            (t.innerHTML = ""),
            i.removeChild(t);
        })();
    })(),
    e.ui.position,
    e.widget("ui.accordion", {
      version: "1.11.4",
      options: {
        active: 0,
        animate: {},
        collapsible: !1,
        event: "click",
        header: "> li > :first-child,> :not(li):even",
        heightStyle: "auto",
        icons: {
          activeHeader: "ui-icon-triangle-1-s",
          header: "ui-icon-triangle-1-e",
        },
        activate: null,
        beforeActivate: null,
      },
      hideProps: {
        borderTopWidth: "hide",
        borderBottomWidth: "hide",
        paddingTop: "hide",
        paddingBottom: "hide",
        height: "hide",
      },
      showProps: {
        borderTopWidth: "show",
        borderBottomWidth: "show",
        paddingTop: "show",
        paddingBottom: "show",
        height: "show",
      },
      _create: function () {
        var t = this.options;
        (this.prevShow = this.prevHide = e()),
          this.element
            .addClass("ui-accordion ui-widget ui-helper-reset")
            .attr("role", "tablist"),
          t.collapsible ||
            (t.active !== !1 && null != t.active) ||
            (t.active = 0),
          this._processPanels(),
          0 > t.active && (t.active += this.headers.length),
          this._refresh();
      },
      _getCreateEventData: function () {
        return {
          header: this.active,
          panel: this.active.length ? this.active.next() : e(),
        };
      },
      _createIcons: function () {
        var t = this.options.icons;
        t &&
          (e("<span>")
            .addClass("ui-accordion-header-icon ui-icon " + t.header)
            .prependTo(this.headers),
          this.active
            .children(".ui-accordion-header-icon")
            .removeClass(t.header)
            .addClass(t.activeHeader),
          this.headers.addClass("ui-accordion-icons"));
      },
      _destroyIcons: function () {
        this.headers
          .removeClass("ui-accordion-icons")
          .children(".ui-accordion-header-icon")
          .remove();
      },
      _destroy: function () {
        var e;
        this.element
          .removeClass("ui-accordion ui-widget ui-helper-reset")
          .removeAttr("role"),
          this.headers
            .removeClass(
              "ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top"
            )
            .removeAttr("role")
            .removeAttr("aria-expanded")
            .removeAttr("aria-selected")
            .removeAttr("aria-controls")
            .removeAttr("tabIndex")
            .removeUniqueId(),
          this._destroyIcons(),
          (e = this.headers
            .next()
            .removeClass(
              "ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled"
            )
            .css("display", "")
            .removeAttr("role")
            .removeAttr("aria-hidden")
            .removeAttr("aria-labelledby")
            .removeUniqueId()),
          "content" !== this.options.heightStyle && e.css("height", "");
      },
      _setOption: function (e, t) {
        return "active" === e
          ? (this._activate(t), void 0)
          : ("event" === e &&
              (this.options.event &&
                this._off(this.headers, this.options.event),
              this._setupEvents(t)),
            this._super(e, t),
            "collapsible" !== e ||
              t ||
              this.options.active !== !1 ||
              this._activate(0),
            "icons" === e && (this._destroyIcons(), t && this._createIcons()),
            "disabled" === e &&
              (this.element
                .toggleClass("ui-state-disabled", !!t)
                .attr("aria-disabled", t),
              this.headers
                .add(this.headers.next())
                .toggleClass("ui-state-disabled", !!t)),
            void 0);
      },
      _keydown: function (t) {
        if (!t.altKey && !t.ctrlKey) {
          var i = e.ui.keyCode,
            s = this.headers.length,
            n = this.headers.index(t.target),
            a = !1;
          switch (t.keyCode) {
            case i.RIGHT:
            case i.DOWN:
              a = this.headers[(n + 1) % s];
              break;
            case i.LEFT:
            case i.UP:
              a = this.headers[(n - 1 + s) % s];
              break;
            case i.SPACE:
            case i.ENTER:
              this._eventHandler(t);
              break;
            case i.HOME:
              a = this.headers[0];
              break;
            case i.END:
              a = this.headers[s - 1];
          }
          a &&
            (e(t.target).attr("tabIndex", -1),
            e(a).attr("tabIndex", 0),
            a.focus(),
            t.preventDefault());
        }
      },
      _panelKeyDown: function (t) {
        t.keyCode === e.ui.keyCode.UP &&
          t.ctrlKey &&
          e(t.currentTarget).prev().focus();
      },
      refresh: function () {
        var t = this.options;
        this._processPanels(),
          (t.active === !1 && t.collapsible === !0) || !this.headers.length
            ? ((t.active = !1), (this.active = e()))
            : t.active === !1
            ? this._activate(0)
            : this.active.length && !e.contains(this.element[0], this.active[0])
            ? this.headers.length ===
              this.headers.find(".ui-state-disabled").length
              ? ((t.active = !1), (this.active = e()))
              : this._activate(Math.max(0, t.active - 1))
            : (t.active = this.headers.index(this.active)),
          this._destroyIcons(),
          this._refresh();
      },
      _processPanels: function () {
        var e = this.headers,
          t = this.panels;
        (this.headers = this.element
          .find(this.options.header)
          .addClass("ui-accordion-header ui-state-default ui-corner-all")),
          (this.panels = this.headers
            .next()
            .addClass(
              "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"
            )
            .filter(":not(.ui-accordion-content-active)")
            .hide()),
          t && (this._off(e.not(this.headers)), this._off(t.not(this.panels)));
      },
      _refresh: function () {
        var t,
          i = this.options,
          s = i.heightStyle,
          n = this.element.parent();
        (this.active = this._findActive(i.active)
          .addClass("ui-accordion-header-active ui-state-active ui-corner-top")
          .removeClass("ui-corner-all")),
          this.active.next().addClass("ui-accordion-content-active").show(),
          this.headers
            .attr("role", "tab")
            .each(function () {
              var t = e(this),
                i = t.uniqueId().attr("id"),
                s = t.next(),
                n = s.uniqueId().attr("id");
              t.attr("aria-controls", n), s.attr("aria-labelledby", i);
            })
            .next()
            .attr("role", "tabpanel"),
          this.headers
            .not(this.active)
            .attr({
              "aria-selected": "false",
              "aria-expanded": "false",
              tabIndex: -1,
            })
            .next()
            .attr({ "aria-hidden": "true" })
            .hide(),
          this.active.length
            ? this.active
                .attr({
                  "aria-selected": "true",
                  "aria-expanded": "true",
                  tabIndex: 0,
                })
                .next()
                .attr({ "aria-hidden": "false" })
            : this.headers.eq(0).attr("tabIndex", 0),
          this._createIcons(),
          this._setupEvents(i.event),
          "fill" === s
            ? ((t = n.height()),
              this.element.siblings(":visible").each(function () {
                var i = e(this),
                  s = i.css("position");
                "absolute" !== s && "fixed" !== s && (t -= i.outerHeight(!0));
              }),
              this.headers.each(function () {
                t -= e(this).outerHeight(!0);
              }),
              this.headers
                .next()
                .each(function () {
                  e(this).height(
                    Math.max(0, t - e(this).innerHeight() + e(this).height())
                  );
                })
                .css("overflow", "auto"))
            : "auto" === s &&
              ((t = 0),
              this.headers
                .next()
                .each(function () {
                  t = Math.max(t, e(this).css("height", "").height());
                })
                .height(t));
      },
      _activate: function (t) {
        var i = this._findActive(t)[0];
        i !== this.active[0] &&
          ((i = i || this.active[0]),
          this._eventHandler({
            target: i,
            currentTarget: i,
            preventDefault: e.noop,
          }));
      },
      _findActive: function (t) {
        return "number" == typeof t ? this.headers.eq(t) : e();
      },
      _setupEvents: function (t) {
        var i = { keydown: "_keydown" };
        t &&
          e.each(t.split(" "), function (e, t) {
            i[t] = "_eventHandler";
          }),
          this._off(this.headers.add(this.headers.next())),
          this._on(this.headers, i),
          this._on(this.headers.next(), { keydown: "_panelKeyDown" }),
          this._hoverable(this.headers),
          this._focusable(this.headers);
      },
      _eventHandler: function (t) {
        var i = this.options,
          s = this.active,
          n = e(t.currentTarget),
          a = n[0] === s[0],
          o = a && i.collapsible,
          r = o ? e() : n.next(),
          h = s.next(),
          l = {
            oldHeader: s,
            oldPanel: h,
            newHeader: o ? e() : n,
            newPanel: r,
          };
        t.preventDefault(),
          (a && !i.collapsible) ||
            this._trigger("beforeActivate", t, l) === !1 ||
            ((i.active = o ? !1 : this.headers.index(n)),
            (this.active = a ? e() : n),
            this._toggle(l),
            s.removeClass("ui-accordion-header-active ui-state-active"),
            i.icons &&
              s
                .children(".ui-accordion-header-icon")
                .removeClass(i.icons.activeHeader)
                .addClass(i.icons.header),
            a ||
              (n
                .removeClass("ui-corner-all")
                .addClass(
                  "ui-accordion-header-active ui-state-active ui-corner-top"
                ),
              i.icons &&
                n
                  .children(".ui-accordion-header-icon")
                  .removeClass(i.icons.header)
                  .addClass(i.icons.activeHeader),
              n.next().addClass("ui-accordion-content-active")));
      },
      _toggle: function (t) {
        var i = t.newPanel,
          s = this.prevShow.length ? this.prevShow : t.oldPanel;
        this.prevShow.add(this.prevHide).stop(!0, !0),
          (this.prevShow = i),
          (this.prevHide = s),
          this.options.animate
            ? this._animate(i, s, t)
            : (s.hide(), i.show(), this._toggleComplete(t)),
          s.attr({ "aria-hidden": "true" }),
          s.prev().attr({ "aria-selected": "false", "aria-expanded": "false" }),
          i.length && s.length
            ? s.prev().attr({ tabIndex: -1, "aria-expanded": "false" })
            : i.length &&
              this.headers
                .filter(function () {
                  return 0 === parseInt(e(this).attr("tabIndex"), 10);
                })
                .attr("tabIndex", -1),
          i
            .attr("aria-hidden", "false")
            .prev()
            .attr({
              "aria-selected": "true",
              "aria-expanded": "true",
              tabIndex: 0,
            });
      },
      _animate: function (e, t, i) {
        var s,
          n,
          a,
          o = this,
          r = 0,
          h = e.css("box-sizing"),
          l = e.length && (!t.length || e.index() < t.index()),
          u = this.options.animate || {},
          d = (l && u.down) || u,
          c = function () {
            o._toggleComplete(i);
          };
        return (
          "number" == typeof d && (a = d),
          "string" == typeof d && (n = d),
          (n = n || d.easing || u.easing),
          (a = a || d.duration || u.duration),
          t.length
            ? e.length
              ? ((s = e.show().outerHeight()),
                t.animate(this.hideProps, {
                  duration: a,
                  easing: n,
                  step: function (e, t) {
                    t.now = Math.round(e);
                  },
                }),
                e.hide().animate(this.showProps, {
                  duration: a,
                  easing: n,
                  complete: c,
                  step: function (e, i) {
                    (i.now = Math.round(e)),
                      "height" !== i.prop
                        ? "content-box" === h && (r += i.now)
                        : "content" !== o.options.heightStyle &&
                          ((i.now = Math.round(s - t.outerHeight() - r)),
                          (r = 0));
                  },
                }),
                void 0)
              : t.animate(this.hideProps, a, n, c)
            : e.animate(this.showProps, a, n, c)
        );
      },
      _toggleComplete: function (e) {
        var t = e.oldPanel;
        t
          .removeClass("ui-accordion-content-active")
          .prev()
          .removeClass("ui-corner-top")
          .addClass("ui-corner-all"),
          t.length && (t.parent()[0].className = t.parent()[0].className),
          this._trigger("activate", null, e);
      },
    }),
    e.widget("ui.menu", {
      version: "1.11.4",
      defaultElement: "<ul>",
      delay: 300,
      options: {
        icons: { submenu: "ui-icon-carat-1-e" },
        items: "> *",
        menus: "ul",
        position: { my: "left-1 top", at: "right top" },
        role: "menu",
        blur: null,
        focus: null,
        select: null,
      },
      _create: function () {
        (this.activeMenu = this.element),
          (this.mouseHandled = !1),
          this.element
            .uniqueId()
            .addClass("ui-menu ui-widget ui-widget-content")
            .toggleClass(
              "ui-menu-icons",
              !!this.element.find(".ui-icon").length
            )
            .attr({ role: this.options.role, tabIndex: 0 }),
          this.options.disabled &&
            this.element
              .addClass("ui-state-disabled")
              .attr("aria-disabled", "true"),
          this._on({
            "mousedown .ui-menu-item": function (e) {
              e.preventDefault();
            },
            "click .ui-menu-item": function (t) {
              var i = e(t.target);
              !this.mouseHandled &&
                i.not(".ui-state-disabled").length &&
                (this.select(t),
                t.isPropagationStopped() || (this.mouseHandled = !0),
                i.has(".ui-menu").length
                  ? this.expand(t)
                  : !this.element.is(":focus") &&
                    e(this.document[0].activeElement).closest(".ui-menu")
                      .length &&
                    (this.element.trigger("focus", [!0]),
                    this.active &&
                      1 === this.active.parents(".ui-menu").length &&
                      clearTimeout(this.timer)));
            },
            "mouseenter .ui-menu-item": function (t) {
              if (!this.previousFilter) {
                var i = e(t.currentTarget);
                i.siblings(".ui-state-active").removeClass("ui-state-active"),
                  this.focus(t, i);
              }
            },
            mouseleave: "collapseAll",
            "mouseleave .ui-menu": "collapseAll",
            focus: function (e, t) {
              var i =
                this.active || this.element.find(this.options.items).eq(0);
              t || this.focus(e, i);
            },
            blur: function (t) {
              this._delay(function () {
                e.contains(this.element[0], this.document[0].activeElement) ||
                  this.collapseAll(t);
              });
            },
            keydown: "_keydown",
          }),
          this.refresh(),
          this._on(this.document, {
            click: function (e) {
              this._closeOnDocumentClick(e) && this.collapseAll(e),
                (this.mouseHandled = !1);
            },
          });
      },
      _destroy: function () {
        this.element
          .removeAttr("aria-activedescendant")
          .find(".ui-menu")
          .addBack()
          .removeClass(
            "ui-menu ui-widget ui-widget-content ui-menu-icons ui-front"
          )
          .removeAttr("role")
          .removeAttr("tabIndex")
          .removeAttr("aria-labelledby")
          .removeAttr("aria-expanded")
          .removeAttr("aria-hidden")
          .removeAttr("aria-disabled")
          .removeUniqueId()
          .show(),
          this.element
            .find(".ui-menu-item")
            .removeClass("ui-menu-item")
            .removeAttr("role")
            .removeAttr("aria-disabled")
            .removeUniqueId()
            .removeClass("ui-state-hover")
            .removeAttr("tabIndex")
            .removeAttr("role")
            .removeAttr("aria-haspopup")
            .children()
            .each(function () {
              var t = e(this);
              t.data("ui-menu-submenu-carat") && t.remove();
            }),
          this.element
            .find(".ui-menu-divider")
            .removeClass("ui-menu-divider ui-widget-content");
      },
      _keydown: function (t) {
        var i,
          s,
          n,
          a,
          o = !0;
        switch (t.keyCode) {
          case e.ui.keyCode.PAGE_UP:
            this.previousPage(t);
            break;
          case e.ui.keyCode.PAGE_DOWN:
            this.nextPage(t);
            break;
          case e.ui.keyCode.HOME:
            this._move("first", "first", t);
            break;
          case e.ui.keyCode.END:
            this._move("last", "last", t);
            break;
          case e.ui.keyCode.UP:
            this.previous(t);
            break;
          case e.ui.keyCode.DOWN:
            this.next(t);
            break;
          case e.ui.keyCode.LEFT:
            this.collapse(t);
            break;
          case e.ui.keyCode.RIGHT:
            this.active &&
              !this.active.is(".ui-state-disabled") &&
              this.expand(t);
            break;
          case e.ui.keyCode.ENTER:
          case e.ui.keyCode.SPACE:
            this._activate(t);
            break;
          case e.ui.keyCode.ESCAPE:
            this.collapse(t);
            break;
          default:
            (o = !1),
              (s = this.previousFilter || ""),
              (n = String.fromCharCode(t.keyCode)),
              (a = !1),
              clearTimeout(this.filterTimer),
              n === s ? (a = !0) : (n = s + n),
              (i = this._filterMenuItems(n)),
              (i =
                a && -1 !== i.index(this.active.next())
                  ? this.active.nextAll(".ui-menu-item")
                  : i),
              i.length ||
                ((n = String.fromCharCode(t.keyCode)),
                (i = this._filterMenuItems(n))),
              i.length
                ? (this.focus(t, i),
                  (this.previousFilter = n),
                  (this.filterTimer = this._delay(function () {
                    delete this.previousFilter;
                  }, 1e3)))
                : delete this.previousFilter;
        }
        o && t.preventDefault();
      },
      _activate: function (e) {
        this.active.is(".ui-state-disabled") ||
          (this.active.is("[aria-haspopup='true']")
            ? this.expand(e)
            : this.select(e));
      },
      refresh: function () {
        var t,
          i,
          s = this,
          n = this.options.icons.submenu,
          a = this.element.find(this.options.menus);
        this.element.toggleClass(
          "ui-menu-icons",
          !!this.element.find(".ui-icon").length
        ),
          a
            .filter(":not(.ui-menu)")
            .addClass("ui-menu ui-widget ui-widget-content ui-front")
            .hide()
            .attr({
              role: this.options.role,
              "aria-hidden": "true",
              "aria-expanded": "false",
            })
            .each(function () {
              var t = e(this),
                i = t.parent(),
                s = e("<span>")
                  .addClass("ui-menu-icon ui-icon " + n)
                  .data("ui-menu-submenu-carat", !0);
              i.attr("aria-haspopup", "true").prepend(s),
                t.attr("aria-labelledby", i.attr("id"));
            }),
          (t = a.add(this.element)),
          (i = t.find(this.options.items)),
          i.not(".ui-menu-item").each(function () {
            var t = e(this);
            s._isDivider(t) && t.addClass("ui-widget-content ui-menu-divider");
          }),
          i
            .not(".ui-menu-item, .ui-menu-divider")
            .addClass("ui-menu-item")
            .uniqueId()
            .attr({ tabIndex: -1, role: this._itemRole() }),
          i.filter(".ui-state-disabled").attr("aria-disabled", "true"),
          this.active &&
            !e.contains(this.element[0], this.active[0]) &&
            this.blur();
      },
      _itemRole: function () {
        return { menu: "menuitem", listbox: "option" }[this.options.role];
      },
      _setOption: function (e, t) {
        "icons" === e &&
          this.element
            .find(".ui-menu-icon")
            .removeClass(this.options.icons.submenu)
            .addClass(t.submenu),
          "disabled" === e &&
            this.element
              .toggleClass("ui-state-disabled", !!t)
              .attr("aria-disabled", t),
          this._super(e, t);
      },
      focus: function (e, t) {
        var i, s;
        this.blur(e, e && "focus" === e.type),
          this._scrollIntoView(t),
          (this.active = t.first()),
          (s = this.active
            .addClass("ui-state-focus")
            .removeClass("ui-state-active")),
          this.options.role &&
            this.element.attr("aria-activedescendant", s.attr("id")),
          this.active
            .parent()
            .closest(".ui-menu-item")
            .addClass("ui-state-active"),
          e && "keydown" === e.type
            ? this._close()
            : (this.timer = this._delay(function () {
                this._close();
              }, this.delay)),
          (i = t.children(".ui-menu")),
          i.length && e && /^mouse/.test(e.type) && this._startOpening(i),
          (this.activeMenu = t.parent()),
          this._trigger("focus", e, { item: t });
      },
      _scrollIntoView: function (t) {
        var i, s, n, a, o, r;
        this._hasScroll() &&
          ((i = parseFloat(e.css(this.activeMenu[0], "borderTopWidth")) || 0),
          (s = parseFloat(e.css(this.activeMenu[0], "paddingTop")) || 0),
          (n = t.offset().top - this.activeMenu.offset().top - i - s),
          (a = this.activeMenu.scrollTop()),
          (o = this.activeMenu.height()),
          (r = t.outerHeight()),
          0 > n
            ? this.activeMenu.scrollTop(a + n)
            : n + r > o && this.activeMenu.scrollTop(a + n - o + r));
      },
      blur: function (e, t) {
        t || clearTimeout(this.timer),
          this.active &&
            (this.active.removeClass("ui-state-focus"),
            (this.active = null),
            this._trigger("blur", e, { item: this.active }));
      },
      _startOpening: function (e) {
        clearTimeout(this.timer),
          "true" === e.attr("aria-hidden") &&
            (this.timer = this._delay(function () {
              this._close(), this._open(e);
            }, this.delay));
      },
      _open: function (t) {
        var i = e.extend({ of: this.active }, this.options.position);
        clearTimeout(this.timer),
          this.element
            .find(".ui-menu")
            .not(t.parents(".ui-menu"))
            .hide()
            .attr("aria-hidden", "true"),
          t
            .show()
            .removeAttr("aria-hidden")
            .attr("aria-expanded", "true")
            .position(i);
      },
      collapseAll: function (t, i) {
        clearTimeout(this.timer),
          (this.timer = this._delay(function () {
            var s = i
              ? this.element
              : e(t && t.target).closest(this.element.find(".ui-menu"));
            s.length || (s = this.element),
              this._close(s),
              this.blur(t),
              (this.activeMenu = s);
          }, this.delay));
      },
      _close: function (e) {
        e || (e = this.active ? this.active.parent() : this.element),
          e
            .find(".ui-menu")
            .hide()
            .attr("aria-hidden", "true")
            .attr("aria-expanded", "false")
            .end()
            .find(".ui-state-active")
            .not(".ui-state-focus")
            .removeClass("ui-state-active");
      },
      _closeOnDocumentClick: function (t) {
        return !e(t.target).closest(".ui-menu").length;
      },
      _isDivider: function (e) {
        return !/[^\-\u2014\u2013\s]/.test(e.text());
      },
      collapse: function (e) {
        var t =
          this.active &&
          this.active.parent().closest(".ui-menu-item", this.element);
        t && t.length && (this._close(), this.focus(e, t));
      },
      expand: function (e) {
        var t =
          this.active &&
          this.active.children(".ui-menu ").find(this.options.items).first();
        t &&
          t.length &&
          (this._open(t.parent()),
          this._delay(function () {
            this.focus(e, t);
          }));
      },
      next: function (e) {
        this._move("next", "first", e);
      },
      previous: function (e) {
        this._move("prev", "last", e);
      },
      isFirstItem: function () {
        return this.active && !this.active.prevAll(".ui-menu-item").length;
      },
      isLastItem: function () {
        return this.active && !this.active.nextAll(".ui-menu-item").length;
      },
      _move: function (e, t, i) {
        var s;
        this.active &&
          (s =
            "first" === e || "last" === e
              ? this.active["first" === e ? "prevAll" : "nextAll"](
                  ".ui-menu-item"
                ).eq(-1)
              : this.active[e + "All"](".ui-menu-item").eq(0)),
          (s && s.length && this.active) ||
            (s = this.activeMenu.find(this.options.items)[t]()),
          this.focus(i, s);
      },
      nextPage: function (t) {
        var i, s, n;
        return this.active
          ? (this.isLastItem() ||
              (this._hasScroll()
                ? ((s = this.active.offset().top),
                  (n = this.element.height()),
                  this.active.nextAll(".ui-menu-item").each(function () {
                    return (i = e(this)), 0 > i.offset().top - s - n;
                  }),
                  this.focus(t, i))
                : this.focus(
                    t,
                    this.activeMenu
                      .find(this.options.items)
                      [this.active ? "last" : "first"]()
                  )),
            void 0)
          : (this.next(t), void 0);
      },
      previousPage: function (t) {
        var i, s, n;
        return this.active
          ? (this.isFirstItem() ||
              (this._hasScroll()
                ? ((s = this.active.offset().top),
                  (n = this.element.height()),
                  this.active.prevAll(".ui-menu-item").each(function () {
                    return (i = e(this)), i.offset().top - s + n > 0;
                  }),
                  this.focus(t, i))
                : this.focus(
                    t,
                    this.activeMenu.find(this.options.items).first()
                  )),
            void 0)
          : (this.next(t), void 0);
      },
      _hasScroll: function () {
        return this.element.outerHeight() < this.element.prop("scrollHeight");
      },
      select: function (t) {
        this.active = this.active || e(t.target).closest(".ui-menu-item");
        var i = { item: this.active };
        this.active.has(".ui-menu").length || this.collapseAll(t, !0),
          this._trigger("select", t, i);
      },
      _filterMenuItems: function (t) {
        var i = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
          s = RegExp("^" + i, "i");
        return this.activeMenu
          .find(this.options.items)
          .filter(".ui-menu-item")
          .filter(function () {
            return s.test(e.trim(e(this).text()));
          });
      },
    }),
    e.widget("ui.autocomplete", {
      version: "1.11.4",
      defaultElement: "<input>",
      options: {
        appendTo: null,
        autoFocus: !1,
        delay: 300,
        minLength: 1,
        position: { my: "left top", at: "left bottom", collision: "none" },
        source: null,
        change: null,
        close: null,
        focus: null,
        open: null,
        response: null,
        search: null,
        select: null,
      },
      requestIndex: 0,
      pending: 0,
      _create: function () {
        var t,
          i,
          s,
          n = this.element[0].nodeName.toLowerCase(),
          a = "textarea" === n,
          o = "input" === n;
        (this.isMultiLine = a
          ? !0
          : o
          ? !1
          : this.element.prop("isContentEditable")),
          (this.valueMethod = this.element[a || o ? "val" : "text"]),
          (this.isNewMenu = !0),
          this.element
            .addClass("ui-autocomplete-input")
            .attr("autocomplete", "off"),
          this._on(this.element, {
            keydown: function (n) {
              if (this.element.prop("readOnly"))
                return (t = !0), (s = !0), (i = !0), void 0;
              (t = !1), (s = !1), (i = !1);
              var a = e.ui.keyCode;
              switch (n.keyCode) {
                case a.PAGE_UP:
                  (t = !0), this._move("previousPage", n);
                  break;
                case a.PAGE_DOWN:
                  (t = !0), this._move("nextPage", n);
                  break;
                case a.UP:
                  (t = !0), this._keyEvent("previous", n);
                  break;
                case a.DOWN:
                  (t = !0), this._keyEvent("next", n);
                  break;
                case a.ENTER:
                  this.menu.active &&
                    ((t = !0), n.preventDefault(), this.menu.select(n));
                  break;
                case a.TAB:
                  this.menu.active && this.menu.select(n);
                  break;
                case a.ESCAPE:
                  this.menu.element.is(":visible") &&
                    (this.isMultiLine || this._value(this.term),
                    this.close(n),
                    n.preventDefault());
                  break;
                default:
                  (i = !0), this._searchTimeout(n);
              }
            },
            keypress: function (s) {
              if (t)
                return (
                  (t = !1),
                  (!this.isMultiLine || this.menu.element.is(":visible")) &&
                    s.preventDefault(),
                  void 0
                );
              if (!i) {
                var n = e.ui.keyCode;
                switch (s.keyCode) {
                  case n.PAGE_UP:
                    this._move("previousPage", s);
                    break;
                  case n.PAGE_DOWN:
                    this._move("nextPage", s);
                    break;
                  case n.UP:
                    this._keyEvent("previous", s);
                    break;
                  case n.DOWN:
                    this._keyEvent("next", s);
                }
              }
            },
            input: function (e) {
              return s
                ? ((s = !1), e.preventDefault(), void 0)
                : (this._searchTimeout(e), void 0);
            },
            focus: function () {
              (this.selectedItem = null), (this.previous = this._value());
            },
            blur: function (e) {
              return this.cancelBlur
                ? (delete this.cancelBlur, void 0)
                : (clearTimeout(this.searching),
                  this.close(e),
                  this._change(e),
                  void 0);
            },
          }),
          this._initSource(),
          (this.menu = e("<ul>")
            .addClass("ui-autocomplete ui-front")
            .appendTo(this._appendTo())
            .menu({ role: null })
            .hide()
            .menu("instance")),
          this._on(this.menu.element, {
            mousedown: function (t) {
              t.preventDefault(),
                (this.cancelBlur = !0),
                this._delay(function () {
                  delete this.cancelBlur;
                });
              var i = this.menu.element[0];
              e(t.target).closest(".ui-menu-item").length ||
                this._delay(function () {
                  var t = this;
                  this.document.one("mousedown", function (s) {
                    s.target === t.element[0] ||
                      s.target === i ||
                      e.contains(i, s.target) ||
                      t.close();
                  });
                });
            },
            menufocus: function (t, i) {
              var s, n;
              return this.isNewMenu &&
                ((this.isNewMenu = !1),
                t.originalEvent && /^mouse/.test(t.originalEvent.type))
                ? (this.menu.blur(),
                  this.document.one("mousemove", function () {
                    e(t.target).trigger(t.originalEvent);
                  }),
                  void 0)
                : ((n = i.item.data("ui-autocomplete-item")),
                  !1 !== this._trigger("focus", t, { item: n }) &&
                    t.originalEvent &&
                    /^key/.test(t.originalEvent.type) &&
                    this._value(n.value),
                  (s = i.item.attr("aria-label") || n.value),
                  s &&
                    e.trim(s).length &&
                    (this.liveRegion.children().hide(),
                    e("<div>").text(s).appendTo(this.liveRegion)),
                  void 0);
            },
            menuselect: function (e, t) {
              var i = t.item.data("ui-autocomplete-item"),
                s = this.previous;
              this.element[0] !== this.document[0].activeElement &&
                (this.element.focus(),
                (this.previous = s),
                this._delay(function () {
                  (this.previous = s), (this.selectedItem = i);
                })),
                !1 !== this._trigger("select", e, { item: i }) &&
                  this._value(i.value),
                (this.term = this._value()),
                this.close(e),
                (this.selectedItem = i);
            },
          }),
          (this.liveRegion = e("<span>", {
            role: "status",
            "aria-live": "assertive",
            "aria-relevant": "additions",
          })
            .addClass("ui-helper-hidden-accessible")
            .appendTo(this.document[0].body)),
          this._on(this.window, {
            beforeunload: function () {
              this.element.removeAttr("autocomplete");
            },
          });
      },
      _destroy: function () {
        clearTimeout(this.searching),
          this.element
            .removeClass("ui-autocomplete-input")
            .removeAttr("autocomplete"),
          this.menu.element.remove(),
          this.liveRegion.remove();
      },
      _setOption: function (e, t) {
        this._super(e, t),
          "source" === e && this._initSource(),
          "appendTo" === e && this.menu.element.appendTo(this._appendTo()),
          "disabled" === e && t && this.xhr && this.xhr.abort();
      },
      _appendTo: function () {
        var t = this.options.appendTo;
        return (
          t &&
            (t = t.jquery || t.nodeType ? e(t) : this.document.find(t).eq(0)),
          (t && t[0]) || (t = this.element.closest(".ui-front")),
          t.length || (t = this.document[0].body),
          t
        );
      },
      _initSource: function () {
        var t,
          i,
          s = this;
        e.isArray(this.options.source)
          ? ((t = this.options.source),
            (this.source = function (i, s) {
              s(e.ui.autocomplete.filter(t, i.term));
            }))
          : "string" == typeof this.options.source
          ? ((i = this.options.source),
            (this.source = function (t, n) {
              s.xhr && s.xhr.abort(),
                (s.xhr = e.ajax({
                  url: i,
                  data: t,
                  dataType: "json",
                  success: function (e) {
                    n(e);
                  },
                  error: function () {
                    n([]);
                  },
                }));
            }))
          : (this.source = this.options.source);
      },
      _searchTimeout: function (e) {
        clearTimeout(this.searching),
          (this.searching = this._delay(function () {
            var t = this.term === this._value(),
              i = this.menu.element.is(":visible"),
              s = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
            (!t || (t && !i && !s)) &&
              ((this.selectedItem = null), this.search(null, e));
          }, this.options.delay));
      },
      search: function (e, t) {
        return (
          (e = null != e ? e : this._value()),
          (this.term = this._value()),
          e.length < this.options.minLength
            ? this.close(t)
            : this._trigger("search", t) !== !1
            ? this._search(e)
            : void 0
        );
      },
      _search: function (e) {
        this.pending++,
          this.element.addClass("ui-autocomplete-loading"),
          (this.cancelSearch = !1),
          this.source({ term: e }, this._response());
      },
      _response: function () {
        var t = ++this.requestIndex;
        return e.proxy(function (e) {
          t === this.requestIndex && this.__response(e),
            this.pending--,
            this.pending || this.element.removeClass("ui-autocomplete-loading");
        }, this);
      },
      __response: function (e) {
        e && (e = this._normalize(e)),
          this._trigger("response", null, { content: e }),
          !this.options.disabled && e && e.length && !this.cancelSearch
            ? (this._suggest(e), this._trigger("open"))
            : this._close();
      },
      close: function (e) {
        (this.cancelSearch = !0), this._close(e);
      },
      _close: function (e) {
        this.menu.element.is(":visible") &&
          (this.menu.element.hide(),
          this.menu.blur(),
          (this.isNewMenu = !0),
          this._trigger("close", e));
      },
      _change: function (e) {
        this.previous !== this._value() &&
          this._trigger("change", e, { item: this.selectedItem });
      },
      _normalize: function (t) {
        return t.length && t[0].label && t[0].value
          ? t
          : e.map(t, function (t) {
              return "string" == typeof t
                ? { label: t, value: t }
                : e.extend({}, t, {
                    label: t.label || t.value,
                    value: t.value || t.label,
                  });
            });
      },
      _suggest: function (t) {
        var i = this.menu.element.empty();
        this._renderMenu(i, t),
          (this.isNewMenu = !0),
          this.menu.refresh(),
          i.show(),
          this._resizeMenu(),
          i.position(e.extend({ of: this.element }, this.options.position)),
          this.options.autoFocus && this.menu.next();
      },
      _resizeMenu: function () {
        var e = this.menu.element;
        e.outerWidth(
          Math.max(e.width("").outerWidth() + 1, this.element.outerWidth())
        );
      },
      _renderMenu: function (t, i) {
        var s = this;
        e.each(i, function (e, i) {
          s._renderItemData(t, i);
        });
      },
      _renderItemData: function (e, t) {
        return this._renderItem(e, t).data("ui-autocomplete-item", t);
      },
      _renderItem: function (t, i) {
        return e("<li>").text(i.label).appendTo(t);
      },
      _move: function (e, t) {
        return this.menu.element.is(":visible")
          ? (this.menu.isFirstItem() && /^previous/.test(e)) ||
            (this.menu.isLastItem() && /^next/.test(e))
            ? (this.isMultiLine || this._value(this.term),
              this.menu.blur(),
              void 0)
            : (this.menu[e](t), void 0)
          : (this.search(null, t), void 0);
      },
      widget: function () {
        return this.menu.element;
      },
      _value: function () {
        return this.valueMethod.apply(this.element, arguments);
      },
      _keyEvent: function (e, t) {
        (!this.isMultiLine || this.menu.element.is(":visible")) &&
          (this._move(e, t), t.preventDefault());
      },
    }),
    e.extend(e.ui.autocomplete, {
      escapeRegex: function (e) {
        return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
      },
      filter: function (t, i) {
        var s = RegExp(e.ui.autocomplete.escapeRegex(i), "i");
        return e.grep(t, function (e) {
          return s.test(e.label || e.value || e);
        });
      },
    }),
    e.widget("ui.autocomplete", e.ui.autocomplete, {
      options: {
        messages: {
          noResults: "No search results.",
          results: function (e) {
            return (
              e +
              (e > 1 ? " results are" : " result is") +
              " available, use up and down arrow keys to navigate."
            );
          },
        },
      },
      __response: function (t) {
        var i;
        this._superApply(arguments),
          this.options.disabled ||
            this.cancelSearch ||
            ((i =
              t && t.length
                ? this.options.messages.results(t.length)
                : this.options.messages.noResults),
            this.liveRegion.children().hide(),
            e("<div>").text(i).appendTo(this.liveRegion));
      },
    }),
    e.ui.autocomplete;
  var c,
    p = "ui-button ui-widget ui-state-default ui-corner-all",
    f =
      "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
    m = function () {
      var t = e(this);
      setTimeout(function () {
        t.find(":ui-button").button("refresh");
      }, 1);
    },
    g = function (t) {
      var i = t.name,
        s = t.form,
        n = e([]);
      return (
        i &&
          ((i = i.replace(/'/g, "\\'")),
          (n = s
            ? e(s).find("[name='" + i + "'][type=radio]")
            : e("[name='" + i + "'][type=radio]", t.ownerDocument).filter(
                function () {
                  return !this.form;
                }
              ))),
        n
      );
    };
  e.widget("ui.button", {
    version: "1.11.4",
    defaultElement: "<button>",
    options: {
      disabled: null,
      text: !0,
      label: null,
      icons: { primary: null, secondary: null },
    },
    _create: function () {
      this.element
        .closest("form")
        .unbind("reset" + this.eventNamespace)
        .bind("reset" + this.eventNamespace, m),
        "boolean" != typeof this.options.disabled
          ? (this.options.disabled = !!this.element.prop("disabled"))
          : this.element.prop("disabled", this.options.disabled),
        this._determineButtonType(),
        (this.hasTitle = !!this.buttonElement.attr("title"));
      var t = this,
        i = this.options,
        s = "checkbox" === this.type || "radio" === this.type,
        n = s ? "" : "ui-state-active";
      null === i.label &&
        (i.label =
          "input" === this.type
            ? this.buttonElement.val()
            : this.buttonElement.html()),
        this._hoverable(this.buttonElement),
        this.buttonElement
          .addClass(p)
          .attr("role", "button")
          .bind("mouseenter" + this.eventNamespace, function () {
            i.disabled || (this === c && e(this).addClass("ui-state-active"));
          })
          .bind("mouseleave" + this.eventNamespace, function () {
            i.disabled || e(this).removeClass(n);
          })
          .bind("click" + this.eventNamespace, function (e) {
            i.disabled && (e.preventDefault(), e.stopImmediatePropagation());
          }),
        this._on({
          focus: function () {
            this.buttonElement.addClass("ui-state-focus");
          },
          blur: function () {
            this.buttonElement.removeClass("ui-state-focus");
          },
        }),
        s &&
          this.element.bind("change" + this.eventNamespace, function () {
            t.refresh();
          }),
        "checkbox" === this.type
          ? this.buttonElement.bind("click" + this.eventNamespace, function () {
              return i.disabled ? !1 : void 0;
            })
          : "radio" === this.type
          ? this.buttonElement.bind("click" + this.eventNamespace, function () {
              if (i.disabled) return !1;
              e(this).addClass("ui-state-active"),
                t.buttonElement.attr("aria-pressed", "true");
              var s = t.element[0];
              g(s)
                .not(s)
                .map(function () {
                  return e(this).button("widget")[0];
                })
                .removeClass("ui-state-active")
                .attr("aria-pressed", "false");
            })
          : (this.buttonElement
              .bind("mousedown" + this.eventNamespace, function () {
                return i.disabled
                  ? !1
                  : (e(this).addClass("ui-state-active"),
                    (c = this),
                    t.document.one("mouseup", function () {
                      c = null;
                    }),
                    void 0);
              })
              .bind("mouseup" + this.eventNamespace, function () {
                return i.disabled
                  ? !1
                  : (e(this).removeClass("ui-state-active"), void 0);
              })
              .bind("keydown" + this.eventNamespace, function (t) {
                return i.disabled
                  ? !1
                  : ((t.keyCode === e.ui.keyCode.SPACE ||
                      t.keyCode === e.ui.keyCode.ENTER) &&
                      e(this).addClass("ui-state-active"),
                    void 0);
              })
              .bind(
                "keyup" + this.eventNamespace + " blur" + this.eventNamespace,
                function () {
                  e(this).removeClass("ui-state-active");
                }
              ),
            this.buttonElement.is("a") &&
              this.buttonElement.keyup(function (t) {
                t.keyCode === e.ui.keyCode.SPACE && e(this).click();
              })),
        this._setOption("disabled", i.disabled),
        this._resetButton();
    },
    _determineButtonType: function () {
      var e, t, i;
      (this.type = this.element.is("[type=checkbox]")
        ? "checkbox"
        : this.element.is("[type=radio]")
        ? "radio"
        : this.element.is("input")
        ? "input"
        : "button"),
        "checkbox" === this.type || "radio" === this.type
          ? ((e = this.element.parents().last()),
            (t = "label[for='" + this.element.attr("id") + "']"),
            (this.buttonElement = e.find(t)),
            this.buttonElement.length ||
              ((e = e.length ? e.siblings() : this.element.siblings()),
              (this.buttonElement = e.filter(t)),
              this.buttonElement.length || (this.buttonElement = e.find(t))),
            this.element.addClass("ui-helper-hidden-accessible"),
            (i = this.element.is(":checked")),
            i && this.buttonElement.addClass("ui-state-active"),
            this.buttonElement.prop("aria-pressed", i))
          : (this.buttonElement = this.element);
    },
    widget: function () {
      return this.buttonElement;
    },
    _destroy: function () {
      this.element.removeClass("ui-helper-hidden-accessible"),
        this.buttonElement
          .removeClass(p + " ui-state-active " + f)
          .removeAttr("role")
          .removeAttr("aria-pressed")
          .html(this.buttonElement.find(".ui-button-text").html()),
        this.hasTitle || this.buttonElement.removeAttr("title");
    },
    _setOption: function (e, t) {
      return (
        this._super(e, t),
        "disabled" === e
          ? (this.widget().toggleClass("ui-state-disabled", !!t),
            this.element.prop("disabled", !!t),
            t &&
              ("checkbox" === this.type || "radio" === this.type
                ? this.buttonElement.removeClass("ui-state-focus")
                : this.buttonElement.removeClass(
                    "ui-state-focus ui-state-active"
                  )),
            void 0)
          : (this._resetButton(), void 0)
      );
    },
    refresh: function () {
      var t = this.element.is("input, button")
        ? this.element.is(":disabled")
        : this.element.hasClass("ui-button-disabled");
      t !== this.options.disabled && this._setOption("disabled", t),
        "radio" === this.type
          ? g(this.element[0]).each(function () {
              e(this).is(":checked")
                ? e(this)
                    .button("widget")
                    .addClass("ui-state-active")
                    .attr("aria-pressed", "true")
                : e(this)
                    .button("widget")
                    .removeClass("ui-state-active")
                    .attr("aria-pressed", "false");
            })
          : "checkbox" === this.type &&
            (this.element.is(":checked")
              ? this.buttonElement
                  .addClass("ui-state-active")
                  .attr("aria-pressed", "true")
              : this.buttonElement
                  .removeClass("ui-state-active")
                  .attr("aria-pressed", "false"));
    },
    _resetButton: function () {
      if ("input" === this.type)
        return (
          this.options.label && this.element.val(this.options.label), void 0
        );
      var t = this.buttonElement.removeClass(f),
        i = e("<span></span>", this.document[0])
          .addClass("ui-button-text")
          .html(this.options.label)
          .appendTo(t.empty())
          .text(),
        s = this.options.icons,
        n = s.primary && s.secondary,
        a = [];
      s.primary || s.secondary
        ? (this.options.text &&
            a.push(
              "ui-button-text-icon" +
                (n ? "s" : s.primary ? "-primary" : "-secondary")
            ),
          s.primary &&
            t.prepend(
              "<span class='ui-button-icon-primary ui-icon " +
                s.primary +
                "'></span>"
            ),
          s.secondary &&
            t.append(
              "<span class='ui-button-icon-secondary ui-icon " +
                s.secondary +
                "'></span>"
            ),
          this.options.text ||
            (a.push(n ? "ui-button-icons-only" : "ui-button-icon-only"),
            this.hasTitle || t.attr("title", e.trim(i))))
        : a.push("ui-button-text-only"),
        t.addClass(a.join(" "));
    },
  }),
    e.widget("ui.buttonset", {
      version: "1.11.4",
      options: {
        items:
          "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)",
      },
      _create: function () {
        this.element.addClass("ui-buttonset");
      },
      _init: function () {
        this.refresh();
      },
      _setOption: function (e, t) {
        "disabled" === e && this.buttons.button("option", e, t),
          this._super(e, t);
      },
      refresh: function () {
        var t = "rtl" === this.element.css("direction"),
          i = this.element.find(this.options.items),
          s = i.filter(":ui-button");
        i.not(":ui-button").button(),
          s.button("refresh"),
          (this.buttons = i
            .map(function () {
              return e(this).button("widget")[0];
            })
            .removeClass("ui-corner-all ui-corner-left ui-corner-right")
            .filter(":first")
            .addClass(t ? "ui-corner-right" : "ui-corner-left")
            .end()
            .filter(":last")
            .addClass(t ? "ui-corner-left" : "ui-corner-right")
            .end()
            .end());
      },
      _destroy: function () {
        this.element.removeClass("ui-buttonset"),
          this.buttons
            .map(function () {
              return e(this).button("widget")[0];
            })
            .removeClass("ui-corner-left ui-corner-right")
            .end()
            .button("destroy");
      },
    }),
    e.ui.button,
    e.extend(e.ui, { datepicker: { version: "1.11.4" } });
  var v;
  e.extend(n.prototype, {
    markerClassName: "hasDatepicker",
    maxRows: 4,
    _widgetDatepicker: function () {
      return this.dpDiv;
    },
    setDefaults: function (e) {
      return r(this._defaults, e || {}), this;
    },
    _attachDatepicker: function (t, i) {
      var s, n, a;
      (s = t.nodeName.toLowerCase()),
        (n = "div" === s || "span" === s),
        t.id || ((this.uuid += 1), (t.id = "dp" + this.uuid)),
        (a = this._newInst(e(t), n)),
        (a.settings = e.extend({}, i || {})),
        "input" === s
          ? this._connectDatepicker(t, a)
          : n && this._inlineDatepicker(t, a);
    },
    _newInst: function (t, i) {
      var s = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
      return {
        id: s,
        input: t,
        selectedDay: 0,
        selectedMonth: 0,
        selectedYear: 0,
        drawMonth: 0,
        drawYear: 0,
        inline: i,
        dpDiv: i
          ? a(
              e(
                "<div class='" +
                  this._inlineClass +
                  " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"
              )
            )
          : this.dpDiv,
      };
    },
    _connectDatepicker: function (t, i) {
      var s = e(t);
      (i.append = e([])),
        (i.trigger = e([])),
        s.hasClass(this.markerClassName) ||
          (this._attachments(s, i),
          s
            .addClass(this.markerClassName)
            .keydown(this._doKeyDown)
            .keypress(this._doKeyPress)
            .keyup(this._doKeyUp),
          this._autoSize(i),
          e.data(t, "datepicker", i),
          i.settings.disabled && this._disableDatepicker(t));
    },
    _attachments: function (t, i) {
      var s,
        n,
        a,
        o = this._get(i, "appendText"),
        r = this._get(i, "isRTL");
      i.append && i.append.remove(),
        o &&
          ((i.append = e(
            "<span class='" + this._appendClass + "'>" + o + "</span>"
          )),
          t[r ? "before" : "after"](i.append)),
        t.unbind("focus", this._showDatepicker),
        i.trigger && i.trigger.remove(),
        (s = this._get(i, "showOn")),
        ("focus" === s || "both" === s) && t.focus(this._showDatepicker),
        ("button" === s || "both" === s) &&
          ((n = this._get(i, "buttonText")),
          (a = this._get(i, "buttonImage")),
          (i.trigger = e(
            this._get(i, "buttonImageOnly")
              ? e("<img/>")
                  .addClass(this._triggerClass)
                  .attr({ src: a, alt: n, title: n })
              : e("<button type='button'></button>")
                  .addClass(this._triggerClass)
                  .html(a ? e("<img/>").attr({ src: a, alt: n, title: n }) : n)
          )),
          t[r ? "before" : "after"](i.trigger),
          i.trigger.click(function () {
            return (
              e.datepicker._datepickerShowing &&
              e.datepicker._lastInput === t[0]
                ? e.datepicker._hideDatepicker()
                : e.datepicker._datepickerShowing &&
                  e.datepicker._lastInput !== t[0]
                ? (e.datepicker._hideDatepicker(),
                  e.datepicker._showDatepicker(t[0]))
                : e.datepicker._showDatepicker(t[0]),
              !1
            );
          }));
    },
    _autoSize: function (e) {
      if (this._get(e, "autoSize") && !e.inline) {
        var t,
          i,
          s,
          n,
          a = new Date(2009, 11, 20),
          o = this._get(e, "dateFormat");
        o.match(/[DM]/) &&
          ((t = function (e) {
            for (i = 0, s = 0, n = 0; e.length > n; n++)
              e[n].length > i && ((i = e[n].length), (s = n));
            return s;
          }),
          a.setMonth(
            t(this._get(e, o.match(/MM/) ? "monthNames" : "monthNamesShort"))
          ),
          a.setDate(
            t(this._get(e, o.match(/DD/) ? "dayNames" : "dayNamesShort")) +
              20 -
              a.getDay()
          )),
          e.input.attr("size", this._formatDate(e, a).length);
      }
    },
    _inlineDatepicker: function (t, i) {
      var s = e(t);
      s.hasClass(this.markerClassName) ||
        (s.addClass(this.markerClassName).append(i.dpDiv),
        e.data(t, "datepicker", i),
        this._setDate(i, this._getDefaultDate(i), !0),
        this._updateDatepicker(i),
        this._updateAlternate(i),
        i.settings.disabled && this._disableDatepicker(t),
        i.dpDiv.css("display", "block"));
    },
    _dialogDatepicker: function (t, i, s, n, a) {
      var o,
        h,
        l,
        u,
        d,
        c = this._dialogInst;
      return (
        c ||
          ((this.uuid += 1),
          (o = "dp" + this.uuid),
          (this._dialogInput = e(
            "<input type='text' id='" +
              o +
              "' style='position: absolute; top: -100px; width: 0px;'/>"
          )),
          this._dialogInput.keydown(this._doKeyDown),
          e("body").append(this._dialogInput),
          (c = this._dialogInst = this._newInst(this._dialogInput, !1)),
          (c.settings = {}),
          e.data(this._dialogInput[0], "datepicker", c)),
        r(c.settings, n || {}),
        (i = i && i.constructor === Date ? this._formatDate(c, i) : i),
        this._dialogInput.val(i),
        (this._pos = a ? (a.length ? a : [a.pageX, a.pageY]) : null),
        this._pos ||
          ((h = document.documentElement.clientWidth),
          (l = document.documentElement.clientHeight),
          (u = document.documentElement.scrollLeft || document.body.scrollLeft),
          (d = document.documentElement.scrollTop || document.body.scrollTop),
          (this._pos = [h / 2 - 100 + u, l / 2 - 150 + d])),
        this._dialogInput
          .css("left", this._pos[0] + 20 + "px")
          .css("top", this._pos[1] + "px"),
        (c.settings.onSelect = s),
        (this._inDialog = !0),
        this.dpDiv.addClass(this._dialogClass),
        this._showDatepicker(this._dialogInput[0]),
        e.blockUI && e.blockUI(this.dpDiv),
        e.data(this._dialogInput[0], "datepicker", c),
        this
      );
    },
    _destroyDatepicker: function (t) {
      var i,
        s = e(t),
        n = e.data(t, "datepicker");
      s.hasClass(this.markerClassName) &&
        ((i = t.nodeName.toLowerCase()),
        e.removeData(t, "datepicker"),
        "input" === i
          ? (n.append.remove(),
            n.trigger.remove(),
            s
              .removeClass(this.markerClassName)
              .unbind("focus", this._showDatepicker)
              .unbind("keydown", this._doKeyDown)
              .unbind("keypress", this._doKeyPress)
              .unbind("keyup", this._doKeyUp))
          : ("div" === i || "span" === i) &&
            s.removeClass(this.markerClassName).empty(),
        v === n && (v = null));
    },
    _enableDatepicker: function (t) {
      var i,
        s,
        n = e(t),
        a = e.data(t, "datepicker");
      n.hasClass(this.markerClassName) &&
        ((i = t.nodeName.toLowerCase()),
        "input" === i
          ? ((t.disabled = !1),
            a.trigger
              .filter("button")
              .each(function () {
                this.disabled = !1;
              })
              .end()
              .filter("img")
              .css({ opacity: "1.0", cursor: "" }))
          : ("div" === i || "span" === i) &&
            ((s = n.children("." + this._inlineClass)),
            s.children().removeClass("ui-state-disabled"),
            s
              .find("select.ui-datepicker-month, select.ui-datepicker-year")
              .prop("disabled", !1)),
        (this._disabledInputs = e.map(this._disabledInputs, function (e) {
          return e === t ? null : e;
        })));
    },
    _disableDatepicker: function (t) {
      var i,
        s,
        n = e(t),
        a = e.data(t, "datepicker");
      n.hasClass(this.markerClassName) &&
        ((i = t.nodeName.toLowerCase()),
        "input" === i
          ? ((t.disabled = !0),
            a.trigger
              .filter("button")
              .each(function () {
                this.disabled = !0;
              })
              .end()
              .filter("img")
              .css({ opacity: "0.5", cursor: "default" }))
          : ("div" === i || "span" === i) &&
            ((s = n.children("." + this._inlineClass)),
            s.children().addClass("ui-state-disabled"),
            s
              .find("select.ui-datepicker-month, select.ui-datepicker-year")
              .prop("disabled", !0)),
        (this._disabledInputs = e.map(this._disabledInputs, function (e) {
          return e === t ? null : e;
        })),
        (this._disabledInputs[this._disabledInputs.length] = t));
    },
    _isDisabledDatepicker: function (e) {
      if (!e) return !1;
      for (var t = 0; this._disabledInputs.length > t; t++)
        if (this._disabledInputs[t] === e) return !0;
      return !1;
    },
    _getInst: function (t) {
      try {
        return e.data(t, "datepicker");
      } catch (i) {
        throw "Missing instance data for this datepicker";
      }
    },
    _optionDatepicker: function (t, i, s) {
      var n,
        a,
        o,
        h,
        l = this._getInst(t);
      return 2 === arguments.length && "string" == typeof i
        ? "defaults" === i
          ? e.extend({}, e.datepicker._defaults)
          : l
          ? "all" === i
            ? e.extend({}, l.settings)
            : this._get(l, i)
          : null
        : ((n = i || {}),
          "string" == typeof i && ((n = {}), (n[i] = s)),
          l &&
            (this._curInst === l && this._hideDatepicker(),
            (a = this._getDateDatepicker(t, !0)),
            (o = this._getMinMaxDate(l, "min")),
            (h = this._getMinMaxDate(l, "max")),
            r(l.settings, n),
            null !== o &&
              void 0 !== n.dateFormat &&
              void 0 === n.minDate &&
              (l.settings.minDate = this._formatDate(l, o)),
            null !== h &&
              void 0 !== n.dateFormat &&
              void 0 === n.maxDate &&
              (l.settings.maxDate = this._formatDate(l, h)),
            "disabled" in n &&
              (n.disabled
                ? this._disableDatepicker(t)
                : this._enableDatepicker(t)),
            this._attachments(e(t), l),
            this._autoSize(l),
            this._setDate(l, a),
            this._updateAlternate(l),
            this._updateDatepicker(l)),
          void 0);
    },
    _changeDatepicker: function (e, t, i) {
      this._optionDatepicker(e, t, i);
    },
    _refreshDatepicker: function (e) {
      var t = this._getInst(e);
      t && this._updateDatepicker(t);
    },
    _setDateDatepicker: function (e, t) {
      var i = this._getInst(e);
      i &&
        (this._setDate(i, t),
        this._updateDatepicker(i),
        this._updateAlternate(i));
    },
    _getDateDatepicker: function (e, t) {
      var i = this._getInst(e);
      return (
        i && !i.inline && this._setDateFromField(i, t),
        i ? this._getDate(i) : null
      );
    },
    _doKeyDown: function (t) {
      var i,
        s,
        n,
        a = e.datepicker._getInst(t.target),
        o = !0,
        r = a.dpDiv.is(".ui-datepicker-rtl");
      if (((a._keyEvent = !0), e.datepicker._datepickerShowing))
        switch (t.keyCode) {
          case 9:
            e.datepicker._hideDatepicker(), (o = !1);
            break;
          case 13:
            return (
              (n = e(
                "td." +
                  e.datepicker._dayOverClass +
                  ":not(." +
                  e.datepicker._currentClass +
                  ")",
                a.dpDiv
              )),
              n[0] &&
                e.datepicker._selectDay(
                  t.target,
                  a.selectedMonth,
                  a.selectedYear,
                  n[0]
                ),
              (i = e.datepicker._get(a, "onSelect")),
              i
                ? ((s = e.datepicker._formatDate(a)),
                  i.apply(a.input ? a.input[0] : null, [s, a]))
                : e.datepicker._hideDatepicker(),
              !1
            );
          case 27:
            e.datepicker._hideDatepicker();
            break;
          case 33:
            e.datepicker._adjustDate(
              t.target,
              t.ctrlKey
                ? -e.datepicker._get(a, "stepBigMonths")
                : -e.datepicker._get(a, "stepMonths"),
              "M"
            );
            break;
          case 34:
            e.datepicker._adjustDate(
              t.target,
              t.ctrlKey
                ? +e.datepicker._get(a, "stepBigMonths")
                : +e.datepicker._get(a, "stepMonths"),
              "M"
            );
            break;
          case 35:
            (t.ctrlKey || t.metaKey) && e.datepicker._clearDate(t.target),
              (o = t.ctrlKey || t.metaKey);
            break;
          case 36:
            (t.ctrlKey || t.metaKey) && e.datepicker._gotoToday(t.target),
              (o = t.ctrlKey || t.metaKey);
            break;
          case 37:
            (t.ctrlKey || t.metaKey) &&
              e.datepicker._adjustDate(t.target, r ? 1 : -1, "D"),
              (o = t.ctrlKey || t.metaKey),
              t.originalEvent.altKey &&
                e.datepicker._adjustDate(
                  t.target,
                  t.ctrlKey
                    ? -e.datepicker._get(a, "stepBigMonths")
                    : -e.datepicker._get(a, "stepMonths"),
                  "M"
                );
            break;
          case 38:
            (t.ctrlKey || t.metaKey) &&
              e.datepicker._adjustDate(t.target, -7, "D"),
              (o = t.ctrlKey || t.metaKey);
            break;
          case 39:
            (t.ctrlKey || t.metaKey) &&
              e.datepicker._adjustDate(t.target, r ? -1 : 1, "D"),
              (o = t.ctrlKey || t.metaKey),
              t.originalEvent.altKey &&
                e.datepicker._adjustDate(
                  t.target,
                  t.ctrlKey
                    ? +e.datepicker._get(a, "stepBigMonths")
                    : +e.datepicker._get(a, "stepMonths"),
                  "M"
                );
            break;
          case 40:
            (t.ctrlKey || t.metaKey) &&
              e.datepicker._adjustDate(t.target, 7, "D"),
              (o = t.ctrlKey || t.metaKey);
            break;
          default:
            o = !1;
        }
      else
        36 === t.keyCode && t.ctrlKey
          ? e.datepicker._showDatepicker(this)
          : (o = !1);
      o && (t.preventDefault(), t.stopPropagation());
    },
    _doKeyPress: function (t) {
      var i,
        s,
        n = e.datepicker._getInst(t.target);
      return e.datepicker._get(n, "constrainInput")
        ? ((i = e.datepicker._possibleChars(
            e.datepicker._get(n, "dateFormat")
          )),
          (s = String.fromCharCode(
            null == t.charCode ? t.keyCode : t.charCode
          )),
          t.ctrlKey || t.metaKey || " " > s || !i || i.indexOf(s) > -1)
        : void 0;
    },
    _doKeyUp: function (t) {
      var i,
        s = e.datepicker._getInst(t.target);
      if (s.input.val() !== s.lastVal)
        try {
          (i = e.datepicker.parseDate(
            e.datepicker._get(s, "dateFormat"),
            s.input ? s.input.val() : null,
            e.datepicker._getFormatConfig(s)
          )),
            i &&
              (e.datepicker._setDateFromField(s),
              e.datepicker._updateAlternate(s),
              e.datepicker._updateDatepicker(s));
        } catch (n) {}
      return !0;
    },
    _showDatepicker: function (t) {
      if (
        ((t = t.target || t),
        "input" !== t.nodeName.toLowerCase() &&
          (t = e("input", t.parentNode)[0]),
        !e.datepicker._isDisabledDatepicker(t) && e.datepicker._lastInput !== t)
      ) {
        var i, n, a, o, h, l, u;
        (i = e.datepicker._getInst(t)),
          e.datepicker._curInst &&
            e.datepicker._curInst !== i &&
            (e.datepicker._curInst.dpDiv.stop(!0, !0),
            i &&
              e.datepicker._datepickerShowing &&
              e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])),
          (n = e.datepicker._get(i, "beforeShow")),
          (a = n ? n.apply(t, [t, i]) : {}),
          a !== !1 &&
            (r(i.settings, a),
            (i.lastVal = null),
            (e.datepicker._lastInput = t),
            e.datepicker._setDateFromField(i),
            e.datepicker._inDialog && (t.value = ""),
            e.datepicker._pos ||
              ((e.datepicker._pos = e.datepicker._findPos(t)),
              (e.datepicker._pos[1] += t.offsetHeight)),
            (o = !1),
            e(t)
              .parents()
              .each(function () {
                return (o |= "fixed" === e(this).css("position")), !o;
              }),
            (h = { left: e.datepicker._pos[0], top: e.datepicker._pos[1] }),
            (e.datepicker._pos = null),
            i.dpDiv.empty(),
            i.dpDiv.css({
              position: "absolute",
              display: "block",
              top: "-1000px",
            }),
            e.datepicker._updateDatepicker(i),
            (h = e.datepicker._checkOffset(i, h, o)),
            i.dpDiv.css({
              position:
                e.datepicker._inDialog && e.blockUI
                  ? "static"
                  : o
                  ? "fixed"
                  : "absolute",
              display: "none",
              left: h.left + "px",
              top: h.top + "px",
            }),
            i.inline ||
              ((l = e.datepicker._get(i, "showAnim")),
              (u = e.datepicker._get(i, "duration")),
              i.dpDiv.css("z-index", s(e(t)) + 1),
              (e.datepicker._datepickerShowing = !0),
              e.effects && e.effects.effect[l]
                ? i.dpDiv.show(l, e.datepicker._get(i, "showOptions"), u)
                : i.dpDiv[l || "show"](l ? u : null),
              e.datepicker._shouldFocusInput(i) && i.input.focus(),
              (e.datepicker._curInst = i)));
      }
    },
    _updateDatepicker: function (t) {
      (this.maxRows = 4),
        (v = t),
        t.dpDiv.empty().append(this._generateHTML(t)),
        this._attachHandlers(t);
      var i,
        s = this._getNumberOfMonths(t),
        n = s[1],
        a = 17,
        r = t.dpDiv.find("." + this._dayOverClass + " a");
      r.length > 0 && o.apply(r.get(0)),
        t.dpDiv
          .removeClass(
            "ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4"
          )
          .width(""),
        n > 1 &&
          t.dpDiv
            .addClass("ui-datepicker-multi-" + n)
            .css("width", a * n + "em"),
        t.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"](
          "ui-datepicker-multi"
        ),
        t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"](
          "ui-datepicker-rtl"
        ),
        t === e.datepicker._curInst &&
          e.datepicker._datepickerShowing &&
          e.datepicker._shouldFocusInput(t) &&
          t.input.focus(),
        t.yearshtml &&
          ((i = t.yearshtml),
          setTimeout(function () {
            i === t.yearshtml &&
              t.yearshtml &&
              t.dpDiv
                .find("select.ui-datepicker-year:first")
                .replaceWith(t.yearshtml),
              (i = t.yearshtml = null);
          }, 0));
    },
    _shouldFocusInput: function (e) {
      return (
        e.input &&
        e.input.is(":visible") &&
        !e.input.is(":disabled") &&
        !e.input.is(":focus")
      );
    },
    _checkOffset: function (t, i, s) {
      var n = t.dpDiv.outerWidth(),
        a = t.dpDiv.outerHeight(),
        o = t.input ? t.input.outerWidth() : 0,
        r = t.input ? t.input.outerHeight() : 0,
        h =
          document.documentElement.clientWidth +
          (s ? 0 : e(document).scrollLeft()),
        l =
          document.documentElement.clientHeight +
          (s ? 0 : e(document).scrollTop());
      return (
        (i.left -= this._get(t, "isRTL") ? n - o : 0),
        (i.left -=
          s && i.left === t.input.offset().left ? e(document).scrollLeft() : 0),
        (i.top -=
          s && i.top === t.input.offset().top + r
            ? e(document).scrollTop()
            : 0),
        (i.left -= Math.min(
          i.left,
          i.left + n > h && h > n ? Math.abs(i.left + n - h) : 0
        )),
        (i.top -= Math.min(
          i.top,
          i.top + a > l && l > a ? Math.abs(a + r) : 0
        )),
        i
      );
    },
    _findPos: function (t) {
      for (
        var i, s = this._getInst(t), n = this._get(s, "isRTL");
        t &&
        ("hidden" === t.type || 1 !== t.nodeType || e.expr.filters.hidden(t));

      )
        t = t[n ? "previousSibling" : "nextSibling"];
      return (i = e(t).offset()), [i.left, i.top];
    },
    _hideDatepicker: function (t) {
      var i,
        s,
        n,
        a,
        o = this._curInst;
      !o ||
        (t && o !== e.data(t, "datepicker")) ||
        (this._datepickerShowing &&
          ((i = this._get(o, "showAnim")),
          (s = this._get(o, "duration")),
          (n = function () {
            e.datepicker._tidyDialog(o);
          }),
          e.effects && (e.effects.effect[i] || e.effects[i])
            ? o.dpDiv.hide(i, e.datepicker._get(o, "showOptions"), s, n)
            : o.dpDiv[
                "slideDown" === i
                  ? "slideUp"
                  : "fadeIn" === i
                  ? "fadeOut"
                  : "hide"
              ](i ? s : null, n),
          i || n(),
          (this._datepickerShowing = !1),
          (a = this._get(o, "onClose")),
          a &&
            a.apply(o.input ? o.input[0] : null, [
              o.input ? o.input.val() : "",
              o,
            ]),
          (this._lastInput = null),
          this._inDialog &&
            (this._dialogInput.css({
              position: "absolute",
              left: "0",
              top: "-100px",
            }),
            e.blockUI && (e.unblockUI(), e("body").append(this.dpDiv))),
          (this._inDialog = !1)));
    },
    _tidyDialog: function (e) {
      e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
    },
    _checkExternalClick: function (t) {
      if (e.datepicker._curInst) {
        var i = e(t.target),
          s = e.datepicker._getInst(i[0]);
        ((i[0].id !== e.datepicker._mainDivId &&
          0 === i.parents("#" + e.datepicker._mainDivId).length &&
          !i.hasClass(e.datepicker.markerClassName) &&
          !i.closest("." + e.datepicker._triggerClass).length &&
          e.datepicker._datepickerShowing &&
          (!e.datepicker._inDialog || !e.blockUI)) ||
          (i.hasClass(e.datepicker.markerClassName) &&
            e.datepicker._curInst !== s)) &&
          e.datepicker._hideDatepicker();
      }
    },
    _adjustDate: function (t, i, s) {
      var n = e(t),
        a = this._getInst(n[0]);
      this._isDisabledDatepicker(n[0]) ||
        (this._adjustInstDate(
          a,
          i + ("M" === s ? this._get(a, "showCurrentAtPos") : 0),
          s
        ),
        this._updateDatepicker(a));
    },
    _gotoToday: function (t) {
      var i,
        s = e(t),
        n = this._getInst(s[0]);
      this._get(n, "gotoCurrent") && n.currentDay
        ? ((n.selectedDay = n.currentDay),
          (n.drawMonth = n.selectedMonth = n.currentMonth),
          (n.drawYear = n.selectedYear = n.currentYear))
        : ((i = new Date()),
          (n.selectedDay = i.getDate()),
          (n.drawMonth = n.selectedMonth = i.getMonth()),
          (n.drawYear = n.selectedYear = i.getFullYear())),
        this._notifyChange(n),
        this._adjustDate(s);
    },
    _selectMonthYear: function (t, i, s) {
      var n = e(t),
        a = this._getInst(n[0]);
      (a["selected" + ("M" === s ? "Month" : "Year")] = a[
        "draw" + ("M" === s ? "Month" : "Year")
      ] =
        parseInt(i.options[i.selectedIndex].value, 10)),
        this._notifyChange(a),
        this._adjustDate(n);
    },
    _selectDay: function (t, i, s, n) {
      var a,
        o = e(t);
      e(n).hasClass(this._unselectableClass) ||
        this._isDisabledDatepicker(o[0]) ||
        ((a = this._getInst(o[0])),
        (a.selectedDay = a.currentDay = e("a", n).html()),
        (a.selectedMonth = a.currentMonth = i),
        (a.selectedYear = a.currentYear = s),
        this._selectDate(
          t,
          this._formatDate(a, a.currentDay, a.currentMonth, a.currentYear)
        ));
    },
    _clearDate: function (t) {
      var i = e(t);
      this._selectDate(i, "");
    },
    _selectDate: function (t, i) {
      var s,
        n = e(t),
        a = this._getInst(n[0]);
      (i = null != i ? i : this._formatDate(a)),
        a.input && a.input.val(i),
        this._updateAlternate(a),
        (s = this._get(a, "onSelect")),
        s
          ? s.apply(a.input ? a.input[0] : null, [i, a])
          : a.input && a.input.trigger("change"),
        a.inline
          ? this._updateDatepicker(a)
          : (this._hideDatepicker(),
            (this._lastInput = a.input[0]),
            "object" != typeof a.input[0] && a.input.focus(),
            (this._lastInput = null));
    },
    _updateAlternate: function (t) {
      var i,
        s,
        n,
        a = this._get(t, "altField");
      a &&
        ((i = this._get(t, "altFormat") || this._get(t, "dateFormat")),
        (s = this._getDate(t)),
        (n = this.formatDate(i, s, this._getFormatConfig(t))),
        e(a).each(function () {
          e(this).val(n);
        }));
    },
    noWeekends: function (e) {
      var t = e.getDay();
      return [t > 0 && 6 > t, ""];
    },
    iso8601Week: function (e) {
      var t,
        i = new Date(e.getTime());
      return (
        i.setDate(i.getDate() + 4 - (i.getDay() || 7)),
        (t = i.getTime()),
        i.setMonth(0),
        i.setDate(1),
        Math.floor(Math.round((t - i) / 864e5) / 7) + 1
      );
    },
    parseDate: function (t, i, s) {
      if (null == t || null == i) throw "Invalid arguments";
      if (((i = "object" == typeof i ? "" + i : i + ""), "" === i)) return null;
      var n,
        a,
        o,
        r,
        h = 0,
        l = (s ? s.shortYearCutoff : null) || this._defaults.shortYearCutoff,
        u =
          "string" != typeof l
            ? l
            : (new Date().getFullYear() % 100) + parseInt(l, 10),
        d = (s ? s.dayNamesShort : null) || this._defaults.dayNamesShort,
        c = (s ? s.dayNames : null) || this._defaults.dayNames,
        p = (s ? s.monthNamesShort : null) || this._defaults.monthNamesShort,
        f = (s ? s.monthNames : null) || this._defaults.monthNames,
        m = -1,
        g = -1,
        v = -1,
        y = -1,
        b = !1,
        _ = function (e) {
          var i = t.length > n + 1 && t.charAt(n + 1) === e;
          return i && n++, i;
        },
        x = function (e) {
          var t = _(e),
            s =
              "@" === e
                ? 14
                : "!" === e
                ? 20
                : "y" === e && t
                ? 4
                : "o" === e
                ? 3
                : 2,
            n = "y" === e ? s : 1,
            a = RegExp("^\\d{" + n + "," + s + "}"),
            o = i.substring(h).match(a);
          if (!o) throw "Missing number at position " + h;
          return (h += o[0].length), parseInt(o[0], 10);
        },
        w = function (t, s, n) {
          var a = -1,
            o = e
              .map(_(t) ? n : s, function (e, t) {
                return [[t, e]];
              })
              .sort(function (e, t) {
                return -(e[1].length - t[1].length);
              });
          if (
            (e.each(o, function (e, t) {
              var s = t[1];
              return i.substr(h, s.length).toLowerCase() === s.toLowerCase()
                ? ((a = t[0]), (h += s.length), !1)
                : void 0;
            }),
            -1 !== a)
          )
            return a + 1;
          throw "Unknown name at position " + h;
        },
        k = function () {
          if (i.charAt(h) !== t.charAt(n))
            throw "Unexpected literal at position " + h;
          h++;
        };
      for (n = 0; t.length > n; n++)
        if (b) "'" !== t.charAt(n) || _("'") ? k() : (b = !1);
        else
          switch (t.charAt(n)) {
            case "d":
              v = x("d");
              break;
            case "D":
              w("D", d, c);
              break;
            case "o":
              y = x("o");
              break;
            case "m":
              g = x("m");
              break;
            case "M":
              g = w("M", p, f);
              break;
            case "y":
              m = x("y");
              break;
            case "@":
              (r = new Date(x("@"))),
                (m = r.getFullYear()),
                (g = r.getMonth() + 1),
                (v = r.getDate());
              break;
            case "!":
              (r = new Date((x("!") - this._ticksTo1970) / 1e4)),
                (m = r.getFullYear()),
                (g = r.getMonth() + 1),
                (v = r.getDate());
              break;
            case "'":
              _("'") ? k() : (b = !0);
              break;
            default:
              k();
          }
      if (i.length > h && ((o = i.substr(h)), !/^\s+/.test(o)))
        throw "Extra/unparsed characters found in date: " + o;
      if (
        (-1 === m
          ? (m = new Date().getFullYear())
          : 100 > m &&
            (m +=
              new Date().getFullYear() -
              (new Date().getFullYear() % 100) +
              (u >= m ? 0 : -100)),
        y > -1)
      )
        for (g = 1, v = y; ; ) {
          if (((a = this._getDaysInMonth(m, g - 1)), a >= v)) break;
          g++, (v -= a);
        }
      if (
        ((r = this._daylightSavingAdjust(new Date(m, g - 1, v))),
        r.getFullYear() !== m || r.getMonth() + 1 !== g || r.getDate() !== v)
      )
        throw "Invalid date";
      return r;
    },
    ATOM: "yy-mm-dd",
    COOKIE: "D, dd M yy",
    ISO_8601: "yy-mm-dd",
    RFC_822: "D, d M y",
    RFC_850: "DD, dd-M-y",
    RFC_1036: "D, d M y",
    RFC_1123: "D, d M yy",
    RFC_2822: "D, d M yy",
    RSS: "D, d M y",
    TICKS: "!",
    TIMESTAMP: "@",
    W3C: "yy-mm-dd",
    _ticksTo1970:
      1e7 *
      60 *
      60 *
      24 *
      (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
    formatDate: function (e, t, i) {
      if (!t) return "";
      var s,
        n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
        a = (i ? i.dayNames : null) || this._defaults.dayNames,
        o = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
        r = (i ? i.monthNames : null) || this._defaults.monthNames,
        h = function (t) {
          var i = e.length > s + 1 && e.charAt(s + 1) === t;
          return i && s++, i;
        },
        l = function (e, t, i) {
          var s = "" + t;
          if (h(e)) for (; i > s.length; ) s = "0" + s;
          return s;
        },
        u = function (e, t, i, s) {
          return h(e) ? s[t] : i[t];
        },
        d = "",
        c = !1;
      if (t)
        for (s = 0; e.length > s; s++)
          if (c) "'" !== e.charAt(s) || h("'") ? (d += e.charAt(s)) : (c = !1);
          else
            switch (e.charAt(s)) {
              case "d":
                d += l("d", t.getDate(), 2);
                break;
              case "D":
                d += u("D", t.getDay(), n, a);
                break;
              case "o":
                d += l(
                  "o",
                  Math.round(
                    (new Date(
                      t.getFullYear(),
                      t.getMonth(),
                      t.getDate()
                    ).getTime() -
                      new Date(t.getFullYear(), 0, 0).getTime()) /
                      864e5
                  ),
                  3
                );
                break;
              case "m":
                d += l("m", t.getMonth() + 1, 2);
                break;
              case "M":
                d += u("M", t.getMonth(), o, r);
                break;
              case "y":
                d += h("y")
                  ? t.getFullYear()
                  : (10 > t.getYear() % 100 ? "0" : "") + (t.getYear() % 100);
                break;
              case "@":
                d += t.getTime();
                break;
              case "!":
                d += 1e4 * t.getTime() + this._ticksTo1970;
                break;
              case "'":
                h("'") ? (d += "'") : (c = !0);
                break;
              default:
                d += e.charAt(s);
            }
      return d;
    },
    _possibleChars: function (e) {
      var t,
        i = "",
        s = !1,
        n = function (i) {
          var s = e.length > t + 1 && e.charAt(t + 1) === i;
          return s && t++, s;
        };
      for (t = 0; e.length > t; t++)
        if (s) "'" !== e.charAt(t) || n("'") ? (i += e.charAt(t)) : (s = !1);
        else
          switch (e.charAt(t)) {
            case "d":
            case "m":
            case "y":
            case "@":
              i += "0123456789";
              break;
            case "D":
            case "M":
              return null;
            case "'":
              n("'") ? (i += "'") : (s = !0);
              break;
            default:
              i += e.charAt(t);
          }
      return i;
    },
    _get: function (e, t) {
      return void 0 !== e.settings[t] ? e.settings[t] : this._defaults[t];
    },
    _setDateFromField: function (e, t) {
      if (e.input.val() !== e.lastVal) {
        var i = this._get(e, "dateFormat"),
          s = (e.lastVal = e.input ? e.input.val() : null),
          n = this._getDefaultDate(e),
          a = n,
          o = this._getFormatConfig(e);
        try {
          a = this.parseDate(i, s, o) || n;
        } catch (r) {
          s = t ? "" : s;
        }
        (e.selectedDay = a.getDate()),
          (e.drawMonth = e.selectedMonth = a.getMonth()),
          (e.drawYear = e.selectedYear = a.getFullYear()),
          (e.currentDay = s ? a.getDate() : 0),
          (e.currentMonth = s ? a.getMonth() : 0),
          (e.currentYear = s ? a.getFullYear() : 0),
          this._adjustInstDate(e);
      }
    },
    _getDefaultDate: function (e) {
      return this._restrictMinMax(
        e,
        this._determineDate(e, this._get(e, "defaultDate"), new Date())
      );
    },
    _determineDate: function (t, i, s) {
      var n = function (e) {
          var t = new Date();
          return t.setDate(t.getDate() + e), t;
        },
        a = function (i) {
          try {
            return e.datepicker.parseDate(
              e.datepicker._get(t, "dateFormat"),
              i,
              e.datepicker._getFormatConfig(t)
            );
          } catch (s) {}
          for (
            var n =
                (i.toLowerCase().match(/^c/)
                  ? e.datepicker._getDate(t)
                  : null) || new Date(),
              a = n.getFullYear(),
              o = n.getMonth(),
              r = n.getDate(),
              h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
              l = h.exec(i);
            l;

          ) {
            switch (l[2] || "d") {
              case "d":
              case "D":
                r += parseInt(l[1], 10);
                break;
              case "w":
              case "W":
                r += 7 * parseInt(l[1], 10);
                break;
              case "m":
              case "M":
                (o += parseInt(l[1], 10)),
                  (r = Math.min(r, e.datepicker._getDaysInMonth(a, o)));
                break;
              case "y":
              case "Y":
                (a += parseInt(l[1], 10)),
                  (r = Math.min(r, e.datepicker._getDaysInMonth(a, o)));
            }
            l = h.exec(i);
          }
          return new Date(a, o, r);
        },
        o =
          null == i || "" === i
            ? s
            : "string" == typeof i
            ? a(i)
            : "number" == typeof i
            ? isNaN(i)
              ? s
              : n(i)
            : new Date(i.getTime());
      return (
        (o = o && "Invalid Date" == "" + o ? s : o),
        o &&
          (o.setHours(0),
          o.setMinutes(0),
          o.setSeconds(0),
          o.setMilliseconds(0)),
        this._daylightSavingAdjust(o)
      );
    },
    _daylightSavingAdjust: function (e) {
      return e
        ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e)
        : null;
    },
    _setDate: function (e, t, i) {
      var s = !t,
        n = e.selectedMonth,
        a = e.selectedYear,
        o = this._restrictMinMax(e, this._determineDate(e, t, new Date()));
      (e.selectedDay = e.currentDay = o.getDate()),
        (e.drawMonth = e.selectedMonth = e.currentMonth = o.getMonth()),
        (e.drawYear = e.selectedYear = e.currentYear = o.getFullYear()),
        (n === e.selectedMonth && a === e.selectedYear) ||
          i ||
          this._notifyChange(e),
        this._adjustInstDate(e),
        e.input && e.input.val(s ? "" : this._formatDate(e));
    },
    _getDate: function (e) {
      var t =
        !e.currentYear || (e.input && "" === e.input.val())
          ? null
          : this._daylightSavingAdjust(
              new Date(e.currentYear, e.currentMonth, e.currentDay)
            );
      return t;
    },
    _attachHandlers: function (t) {
      var i = this._get(t, "stepMonths"),
        s = "#" + t.id.replace(/\\\\/g, "\\");
      t.dpDiv.find("[data-handler]").map(function () {
        var t = {
          prev: function () {
            e.datepicker._adjustDate(s, -i, "M");
          },
          next: function () {
            e.datepicker._adjustDate(s, +i, "M");
          },
          hide: function () {
            e.datepicker._hideDatepicker();
          },
          today: function () {
            e.datepicker._gotoToday(s);
          },
          selectDay: function () {
            return (
              e.datepicker._selectDay(
                s,
                +this.getAttribute("data-month"),
                +this.getAttribute("data-year"),
                this
              ),
              !1
            );
          },
          selectMonth: function () {
            return e.datepicker._selectMonthYear(s, this, "M"), !1;
          },
          selectYear: function () {
            return e.datepicker._selectMonthYear(s, this, "Y"), !1;
          },
        };
        e(this).bind(
          this.getAttribute("data-event"),
          t[this.getAttribute("data-handler")]
        );
      });
    },
    _generateHTML: function (e) {
      var t,
        i,
        s,
        n,
        a,
        o,
        r,
        h,
        l,
        u,
        d,
        c,
        p,
        f,
        m,
        g,
        v,
        y,
        b,
        _,
        x,
        w,
        k,
        T,
        D,
        S,
        M,
        C,
        N,
        A,
        P,
        I,
        H,
        z,
        F,
        E,
        O,
        j,
        W,
        L = new Date(),
        R = this._daylightSavingAdjust(
          new Date(L.getFullYear(), L.getMonth(), L.getDate())
        ),
        Y = this._get(e, "isRTL"),
        B = this._get(e, "showButtonPanel"),
        J = this._get(e, "hideIfNoPrevNext"),
        q = this._get(e, "navigationAsDateFormat"),
        K = this._getNumberOfMonths(e),
        V = this._get(e, "showCurrentAtPos"),
        U = this._get(e, "stepMonths"),
        Q = 1 !== K[0] || 1 !== K[1],
        G = this._daylightSavingAdjust(
          e.currentDay
            ? new Date(e.currentYear, e.currentMonth, e.currentDay)
            : new Date(9999, 9, 9)
        ),
        X = this._getMinMaxDate(e, "min"),
        $ = this._getMinMaxDate(e, "max"),
        Z = e.drawMonth - V,
        et = e.drawYear;
      if ((0 > Z && ((Z += 12), et--), $))
        for (
          t = this._daylightSavingAdjust(
            new Date(
              $.getFullYear(),
              $.getMonth() - K[0] * K[1] + 1,
              $.getDate()
            )
          ),
            t = X && X > t ? X : t;
          this._daylightSavingAdjust(new Date(et, Z, 1)) > t;

        )
          Z--, 0 > Z && ((Z = 11), et--);
      for (
        e.drawMonth = Z,
          e.drawYear = et,
          i = this._get(e, "prevText"),
          i = q
            ? this.formatDate(
                i,
                this._daylightSavingAdjust(new Date(et, Z - U, 1)),
                this._getFormatConfig(e)
              )
            : i,
          s = this._canAdjustMonth(e, -1, et, Z)
            ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" +
              i +
              "'><span class='ui-icon ui-icon-circle-triangle-" +
              (Y ? "e" : "w") +
              "'>" +
              i +
              "</span></a>"
            : J
            ? ""
            : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" +
              i +
              "'><span class='ui-icon ui-icon-circle-triangle-" +
              (Y ? "e" : "w") +
              "'>" +
              i +
              "</span></a>",
          n = this._get(e, "nextText"),
          n = q
            ? this.formatDate(
                n,
                this._daylightSavingAdjust(new Date(et, Z + U, 1)),
                this._getFormatConfig(e)
              )
            : n,
          a = this._canAdjustMonth(e, 1, et, Z)
            ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" +
              n +
              "'><span class='ui-icon ui-icon-circle-triangle-" +
              (Y ? "w" : "e") +
              "'>" +
              n +
              "</span></a>"
            : J
            ? ""
            : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" +
              n +
              "'><span class='ui-icon ui-icon-circle-triangle-" +
              (Y ? "w" : "e") +
              "'>" +
              n +
              "</span></a>",
          o = this._get(e, "currentText"),
          r = this._get(e, "gotoCurrent") && e.currentDay ? G : R,
          o = q ? this.formatDate(o, r, this._getFormatConfig(e)) : o,
          h = e.inline
            ? ""
            : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" +
              this._get(e, "closeText") +
              "</button>",
          l = B
            ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" +
              (Y ? h : "") +
              (this._isInRange(e, r)
                ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" +
                  o +
                  "</button>"
                : "") +
              (Y ? "" : h) +
              "</div>"
            : "",
          u = parseInt(this._get(e, "firstDay"), 10),
          u = isNaN(u) ? 0 : u,
          d = this._get(e, "showWeek"),
          c = this._get(e, "dayNames"),
          p = this._get(e, "dayNamesMin"),
          f = this._get(e, "monthNames"),
          m = this._get(e, "monthNamesShort"),
          g = this._get(e, "beforeShowDay"),
          v = this._get(e, "showOtherMonths"),
          y = this._get(e, "selectOtherMonths"),
          b = this._getDefaultDate(e),
          _ = "",
          w = 0;
        K[0] > w;
        w++
      ) {
        for (k = "", this.maxRows = 4, T = 0; K[1] > T; T++) {
          if (
            ((D = this._daylightSavingAdjust(new Date(et, Z, e.selectedDay))),
            (S = " ui-corner-all"),
            (M = ""),
            Q)
          ) {
            if (((M += "<div class='ui-datepicker-group"), K[1] > 1))
              switch (T) {
                case 0:
                  (M += " ui-datepicker-group-first"),
                    (S = " ui-corner-" + (Y ? "right" : "left"));
                  break;
                case K[1] - 1:
                  (M += " ui-datepicker-group-last"),
                    (S = " ui-corner-" + (Y ? "left" : "right"));
                  break;
                default:
                  (M += " ui-datepicker-group-middle"), (S = "");
              }
            M += "'>";
          }
          for (
            M +=
              "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" +
              S +
              "'>" +
              (/all|left/.test(S) && 0 === w ? (Y ? a : s) : "") +
              (/all|right/.test(S) && 0 === w ? (Y ? s : a) : "") +
              this._generateMonthYearHeader(
                e,
                Z,
                et,
                X,
                $,
                w > 0 || T > 0,
                f,
                m
              ) +
              "</div><table class='ui-datepicker-calendar'><thead>" +
              "<tr>",
              C = d
                ? "<th class='ui-datepicker-week-col'>" +
                  this._get(e, "weekHeader") +
                  "</th>"
                : "",
              x = 0;
            7 > x;
            x++
          )
            (N = (x + u) % 7),
              (C +=
                "<th scope='col'" +
                ((x + u + 6) % 7 >= 5
                  ? " class='ui-datepicker-week-end'"
                  : "") +
                ">" +
                "<span title='" +
                c[N] +
                "'>" +
                p[N] +
                "</span></th>");
          for (
            M += C + "</tr></thead><tbody>",
              A = this._getDaysInMonth(et, Z),
              et === e.selectedYear &&
                Z === e.selectedMonth &&
                (e.selectedDay = Math.min(e.selectedDay, A)),
              P = (this._getFirstDayOfMonth(et, Z) - u + 7) % 7,
              I = Math.ceil((P + A) / 7),
              H = Q ? (this.maxRows > I ? this.maxRows : I) : I,
              this.maxRows = H,
              z = this._daylightSavingAdjust(new Date(et, Z, 1 - P)),
              F = 0;
            H > F;
            F++
          ) {
            for (
              M += "<tr>",
                E = d
                  ? "<td class='ui-datepicker-week-col'>" +
                    this._get(e, "calculateWeek")(z) +
                    "</td>"
                  : "",
                x = 0;
              7 > x;
              x++
            )
              (O = g ? g.apply(e.input ? e.input[0] : null, [z]) : [!0, ""]),
                (j = z.getMonth() !== Z),
                (W = (j && !y) || !O[0] || (X && X > z) || ($ && z > $)),
                (E +=
                  "<td class='" +
                  ((x + u + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") +
                  (j ? " ui-datepicker-other-month" : "") +
                  ((z.getTime() === D.getTime() &&
                    Z === e.selectedMonth &&
                    e._keyEvent) ||
                  (b.getTime() === z.getTime() && b.getTime() === D.getTime())
                    ? " " + this._dayOverClass
                    : "") +
                  (W
                    ? " " + this._unselectableClass + " ui-state-disabled"
                    : "") +
                  (j && !v
                    ? ""
                    : " " +
                      O[1] +
                      (z.getTime() === G.getTime()
                        ? " " + this._currentClass
                        : "") +
                      (z.getTime() === R.getTime()
                        ? " ui-datepicker-today"
                        : "")) +
                  "'" +
                  ((j && !v) || !O[2]
                    ? ""
                    : " title='" + O[2].replace(/'/g, "&#39;") + "'") +
                  (W
                    ? ""
                    : " data-handler='selectDay' data-event='click' data-month='" +
                      z.getMonth() +
                      "' data-year='" +
                      z.getFullYear() +
                      "'") +
                  ">" +
                  (j && !v
                    ? " "
                    : W
                    ? "<span class='ui-state-default'>" +
                      z.getDate() +
                      "</span>"
                    : "<a class='ui-state-default" +
                      (z.getTime() === R.getTime()
                        ? " ui-state-highlight"
                        : "") +
                      (z.getTime() === G.getTime() ? " ui-state-active" : "") +
                      (j ? " ui-priority-secondary" : "") +
                      "' href='#'>" +
                      z.getDate() +
                      "</a>") +
                  "</td>"),
                z.setDate(z.getDate() + 1),
                (z = this._daylightSavingAdjust(z));
            M += E + "</tr>";
          }
          Z++,
            Z > 11 && ((Z = 0), et++),
            (M +=
              "</tbody></table>" +
              (Q
                ? "</div>" +
                  (K[0] > 0 && T === K[1] - 1
                    ? "<div class='ui-datepicker-row-break'></div>"
                    : "")
                : "")),
            (k += M);
        }
        _ += k;
      }
      return (_ += l), (e._keyEvent = !1), _;
    },
    _generateMonthYearHeader: function (e, t, i, s, n, a, o, r) {
      var h,
        l,
        u,
        d,
        c,
        p,
        f,
        m,
        g = this._get(e, "changeMonth"),
        v = this._get(e, "changeYear"),
        y = this._get(e, "showMonthAfterYear"),
        b = "<div class='ui-datepicker-title'>",
        _ = "";
      if (a || !g) _ += "<span class='ui-datepicker-month'>" + o[t] + "</span>";
      else {
        for (
          h = s && s.getFullYear() === i,
            l = n && n.getFullYear() === i,
            _ +=
              "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",
            u = 0;
          12 > u;
          u++
        )
          (!h || u >= s.getMonth()) &&
            (!l || n.getMonth() >= u) &&
            (_ +=
              "<option value='" +
              u +
              "'" +
              (u === t ? " selected='selected'" : "") +
              ">" +
              r[u] +
              "</option>");
        _ += "</select>";
      }
      if ((y || (b += _ + (!a && g && v ? "" : " ")), !e.yearshtml))
        if (((e.yearshtml = ""), a || !v))
          b += "<span class='ui-datepicker-year'>" + i + "</span>";
        else {
          for (
            d = this._get(e, "yearRange").split(":"),
              c = new Date().getFullYear(),
              p = function (e) {
                var t = e.match(/c[+\-].*/)
                  ? i + parseInt(e.substring(1), 10)
                  : e.match(/[+\-].*/)
                  ? c + parseInt(e, 10)
                  : parseInt(e, 10);
                return isNaN(t) ? c : t;
              },
              f = p(d[0]),
              m = Math.max(f, p(d[1] || "")),
              f = s ? Math.max(f, s.getFullYear()) : f,
              m = n ? Math.min(m, n.getFullYear()) : m,
              e.yearshtml +=
                "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
            m >= f;
            f++
          )
            e.yearshtml +=
              "<option value='" +
              f +
              "'" +
              (f === i ? " selected='selected'" : "") +
              ">" +
              f +
              "</option>";
          (e.yearshtml += "</select>"),
            (b += e.yearshtml),
            (e.yearshtml = null);
        }
      return (
        (b += this._get(e, "yearSuffix")),
        y && (b += (!a && g && v ? "" : " ") + _),
        (b += "</div>")
      );
    },
    _adjustInstDate: function (e, t, i) {
      var s = e.drawYear + ("Y" === i ? t : 0),
        n = e.drawMonth + ("M" === i ? t : 0),
        a =
          Math.min(e.selectedDay, this._getDaysInMonth(s, n)) +
          ("D" === i ? t : 0),
        o = this._restrictMinMax(
          e,
          this._daylightSavingAdjust(new Date(s, n, a))
        );
      (e.selectedDay = o.getDate()),
        (e.drawMonth = e.selectedMonth = o.getMonth()),
        (e.drawYear = e.selectedYear = o.getFullYear()),
        ("M" === i || "Y" === i) && this._notifyChange(e);
    },
    _restrictMinMax: function (e, t) {
      var i = this._getMinMaxDate(e, "min"),
        s = this._getMinMaxDate(e, "max"),
        n = i && i > t ? i : t;
      return s && n > s ? s : n;
    },
    _notifyChange: function (e) {
      var t = this._get(e, "onChangeMonthYear");
      t &&
        t.apply(e.input ? e.input[0] : null, [
          e.selectedYear,
          e.selectedMonth + 1,
          e,
        ]);
    },
    _getNumberOfMonths: function (e) {
      var t = this._get(e, "numberOfMonths");
      return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t;
    },
    _getMinMaxDate: function (e, t) {
      return this._determineDate(e, this._get(e, t + "Date"), null);
    },
    _getDaysInMonth: function (e, t) {
      return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate();
    },
    _getFirstDayOfMonth: function (e, t) {
      return new Date(e, t, 1).getDay();
    },
    _canAdjustMonth: function (e, t, i, s) {
      var n = this._getNumberOfMonths(e),
        a = this._daylightSavingAdjust(
          new Date(i, s + (0 > t ? t : n[0] * n[1]), 1)
        );
      return (
        0 > t && a.setDate(this._getDaysInMonth(a.getFullYear(), a.getMonth())),
        this._isInRange(e, a)
      );
    },
    _isInRange: function (e, t) {
      var i,
        s,
        n = this._getMinMaxDate(e, "min"),
        a = this._getMinMaxDate(e, "max"),
        o = null,
        r = null,
        h = this._get(e, "yearRange");
      return (
        h &&
          ((i = h.split(":")),
          (s = new Date().getFullYear()),
          (o = parseInt(i[0], 10)),
          (r = parseInt(i[1], 10)),
          i[0].match(/[+\-].*/) && (o += s),
          i[1].match(/[+\-].*/) && (r += s)),
        (!n || t.getTime() >= n.getTime()) &&
          (!a || t.getTime() <= a.getTime()) &&
          (!o || t.getFullYear() >= o) &&
          (!r || r >= t.getFullYear())
      );
    },
    _getFormatConfig: function (e) {
      var t = this._get(e, "shortYearCutoff");
      return (
        (t =
          "string" != typeof t
            ? t
            : (new Date().getFullYear() % 100) + parseInt(t, 10)),
        {
          shortYearCutoff: t,
          dayNamesShort: this._get(e, "dayNamesShort"),
          dayNames: this._get(e, "dayNames"),
          monthNamesShort: this._get(e, "monthNamesShort"),
          monthNames: this._get(e, "monthNames"),
        }
      );
    },
    _formatDate: function (e, t, i, s) {
      t ||
        ((e.currentDay = e.selectedDay),
        (e.currentMonth = e.selectedMonth),
        (e.currentYear = e.selectedYear));
      var n = t
        ? "object" == typeof t
          ? t
          : this._daylightSavingAdjust(new Date(s, i, t))
        : this._daylightSavingAdjust(
            new Date(e.currentYear, e.currentMonth, e.currentDay)
          );
      return this.formatDate(
        this._get(e, "dateFormat"),
        n,
        this._getFormatConfig(e)
      );
    },
  }),
    (e.fn.datepicker = function (t) {
      if (!this.length) return this;
      e.datepicker.initialized ||
        (e(document).mousedown(e.datepicker._checkExternalClick),
        (e.datepicker.initialized = !0)),
        0 === e("#" + e.datepicker._mainDivId).length &&
          e("body").append(e.datepicker.dpDiv);
      var i = Array.prototype.slice.call(arguments, 1);
      return "string" != typeof t ||
        ("isDisabled" !== t && "getDate" !== t && "widget" !== t)
        ? "option" === t &&
          2 === arguments.length &&
          "string" == typeof arguments[1]
          ? e.datepicker["_" + t + "Datepicker"].apply(
              e.datepicker,
              [this[0]].concat(i)
            )
          : this.each(function () {
              "string" == typeof t
                ? e.datepicker["_" + t + "Datepicker"].apply(
                    e.datepicker,
                    [this].concat(i)
                  )
                : e.datepicker._attachDatepicker(this, t);
            })
        : e.datepicker["_" + t + "Datepicker"].apply(
            e.datepicker,
            [this[0]].concat(i)
          );
    }),
    (e.datepicker = new n()),
    (e.datepicker.initialized = !1),
    (e.datepicker.uuid = new Date().getTime()),
    (e.datepicker.version = "1.11.4"),
    e.datepicker,
    e.widget("ui.draggable", e.ui.mouse, {
      version: "1.11.4",
      widgetEventPrefix: "drag",
      options: {
        addClasses: !0,
        appendTo: "parent",
        axis: !1,
        connectToSortable: !1,
        containment: !1,
        cursor: "auto",
        cursorAt: !1,
        grid: !1,
        handle: !1,
        helper: "original",
        iframeFix: !1,
        opacity: !1,
        refreshPositions: !1,
        revert: !1,
        revertDuration: 500,
        scope: "default",
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        snap: !1,
        snapMode: "both",
        snapTolerance: 20,
        stack: !1,
        zIndex: !1,
        drag: null,
        start: null,
        stop: null,
      },
      _create: function () {
        "original" === this.options.helper && this._setPositionRelative(),
          this.options.addClasses && this.element.addClass("ui-draggable"),
          this.options.disabled &&
            this.element.addClass("ui-draggable-disabled"),
          this._setHandleClassName(),
          this._mouseInit();
      },
      _setOption: function (e, t) {
        this._super(e, t),
          "handle" === e &&
            (this._removeHandleClassName(), this._setHandleClassName());
      },
      _destroy: function () {
        return (this.helper || this.element).is(".ui-draggable-dragging")
          ? ((this.destroyOnClear = !0), void 0)
          : (this.element.removeClass(
              "ui-draggable ui-draggable-dragging ui-draggable-disabled"
            ),
            this._removeHandleClassName(),
            this._mouseDestroy(),
            void 0);
      },
      _mouseCapture: function (t) {
        var i = this.options;
        return (
          this._blurActiveElement(t),
          this.helper ||
          i.disabled ||
          e(t.target).closest(".ui-resizable-handle").length > 0
            ? !1
            : ((this.handle = this._getHandle(t)),
              this.handle
                ? (this._blockFrames(
                    i.iframeFix === !0 ? "iframe" : i.iframeFix
                  ),
                  !0)
                : !1)
        );
      },
      _blockFrames: function (t) {
        this.iframeBlocks = this.document.find(t).map(function () {
          var t = e(this);
          return e("<div>")
            .css("position", "absolute")
            .appendTo(t.parent())
            .outerWidth(t.outerWidth())
            .outerHeight(t.outerHeight())
            .offset(t.offset())[0];
        });
      },
      _unblockFrames: function () {
        this.iframeBlocks &&
          (this.iframeBlocks.remove(), delete this.iframeBlocks);
      },
      _blurActiveElement: function (t) {
        var i = this.document[0];
        if (this.handleElement.is(t.target))
          try {
            i.activeElement &&
              "body" !== i.activeElement.nodeName.toLowerCase() &&
              e(i.activeElement).blur();
          } catch (s) {}
      },
      _mouseStart: function (t) {
        var i = this.options;
        return (
          (this.helper = this._createHelper(t)),
          this.helper.addClass("ui-draggable-dragging"),
          this._cacheHelperProportions(),
          e.ui.ddmanager && (e.ui.ddmanager.current = this),
          this._cacheMargins(),
          (this.cssPosition = this.helper.css("position")),
          (this.scrollParent = this.helper.scrollParent(!0)),
          (this.offsetParent = this.helper.offsetParent()),
          (this.hasFixedAncestor =
            this.helper.parents().filter(function () {
              return "fixed" === e(this).css("position");
            }).length > 0),
          (this.positionAbs = this.element.offset()),
          this._refreshOffsets(t),
          (this.originalPosition = this.position =
            this._generatePosition(t, !1)),
          (this.originalPageX = t.pageX),
          (this.originalPageY = t.pageY),
          i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
          this._setContainment(),
          this._trigger("start", t) === !1
            ? (this._clear(), !1)
            : (this._cacheHelperProportions(),
              e.ui.ddmanager &&
                !i.dropBehaviour &&
                e.ui.ddmanager.prepareOffsets(this, t),
              this._normalizeRightBottom(),
              this._mouseDrag(t, !0),
              e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t),
              !0)
        );
      },
      _refreshOffsets: function (e) {
        (this.offset = {
          top: this.positionAbs.top - this.margins.top,
          left: this.positionAbs.left - this.margins.left,
          scroll: !1,
          parent: this._getParentOffset(),
          relative: this._getRelativeOffset(),
        }),
          (this.offset.click = {
            left: e.pageX - this.offset.left,
            top: e.pageY - this.offset.top,
          });
      },
      _mouseDrag: function (t, i) {
        if (
          (this.hasFixedAncestor &&
            (this.offset.parent = this._getParentOffset()),
          (this.position = this._generatePosition(t, !0)),
          (this.positionAbs = this._convertPositionTo("absolute")),
          !i)
        ) {
          var s = this._uiHash();
          if (this._trigger("drag", t, s) === !1) return this._mouseUp({}), !1;
          this.position = s.position;
        }
        return (
          (this.helper[0].style.left = this.position.left + "px"),
          (this.helper[0].style.top = this.position.top + "px"),
          e.ui.ddmanager && e.ui.ddmanager.drag(this, t),
          !1
        );
      },
      _mouseStop: function (t) {
        var i = this,
          s = !1;
        return (
          e.ui.ddmanager &&
            !this.options.dropBehaviour &&
            (s = e.ui.ddmanager.drop(this, t)),
          this.dropped && ((s = this.dropped), (this.dropped = !1)),
          ("invalid" === this.options.revert && !s) ||
          ("valid" === this.options.revert && s) ||
          this.options.revert === !0 ||
          (e.isFunction(this.options.revert) &&
            this.options.revert.call(this.element, s))
            ? e(this.helper).animate(
                this.originalPosition,
                parseInt(this.options.revertDuration, 10),
                function () {
                  i._trigger("stop", t) !== !1 && i._clear();
                }
              )
            : this._trigger("stop", t) !== !1 && this._clear(),
          !1
        );
      },
      _mouseUp: function (t) {
        return (
          this._unblockFrames(),
          e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t),
          this.handleElement.is(t.target) && this.element.focus(),
          e.ui.mouse.prototype._mouseUp.call(this, t)
        );
      },
      cancel: function () {
        return (
          this.helper.is(".ui-draggable-dragging")
            ? this._mouseUp({})
            : this._clear(),
          this
        );
      },
      _getHandle: function (t) {
        return this.options.handle
          ? !!e(t.target).closest(this.element.find(this.options.handle)).length
          : !0;
      },
      _setHandleClassName: function () {
        (this.handleElement = this.options.handle
          ? this.element.find(this.options.handle)
          : this.element),
          this.handleElement.addClass("ui-draggable-handle");
      },
      _removeHandleClassName: function () {
        this.handleElement.removeClass("ui-draggable-handle");
      },
      _createHelper: function (t) {
        var i = this.options,
          s = e.isFunction(i.helper),
          n = s
            ? e(i.helper.apply(this.element[0], [t]))
            : "clone" === i.helper
            ? this.element.clone().removeAttr("id")
            : this.element;
        return (
          n.parents("body").length ||
            n.appendTo(
              "parent" === i.appendTo ? this.element[0].parentNode : i.appendTo
            ),
          s && n[0] === this.element[0] && this._setPositionRelative(),
          n[0] === this.element[0] ||
            /(fixed|absolute)/.test(n.css("position")) ||
            n.css("position", "absolute"),
          n
        );
      },
      _setPositionRelative: function () {
        /^(?:r|a|f)/.test(this.element.css("position")) ||
          (this.element[0].style.position = "relative");
      },
      _adjustOffsetFromHelper: function (t) {
        "string" == typeof t && (t = t.split(" ")),
          e.isArray(t) && (t = { left: +t[0], top: +t[1] || 0 }),
          "left" in t && (this.offset.click.left = t.left + this.margins.left),
          "right" in t &&
            (this.offset.click.left =
              this.helperProportions.width - t.right + this.margins.left),
          "top" in t && (this.offset.click.top = t.top + this.margins.top),
          "bottom" in t &&
            (this.offset.click.top =
              this.helperProportions.height - t.bottom + this.margins.top);
      },
      _isRootNode: function (e) {
        return /(html|body)/i.test(e.tagName) || e === this.document[0];
      },
      _getParentOffset: function () {
        var t = this.offsetParent.offset(),
          i = this.document[0];
        return (
          "absolute" === this.cssPosition &&
            this.scrollParent[0] !== i &&
            e.contains(this.scrollParent[0], this.offsetParent[0]) &&
            ((t.left += this.scrollParent.scrollLeft()),
            (t.top += this.scrollParent.scrollTop())),
          this._isRootNode(this.offsetParent[0]) && (t = { top: 0, left: 0 }),
          {
            top:
              t.top +
              (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
            left:
              t.left +
              (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
          }
        );
      },
      _getRelativeOffset: function () {
        if ("relative" !== this.cssPosition) return { top: 0, left: 0 };
        var e = this.element.position(),
          t = this._isRootNode(this.scrollParent[0]);
        return {
          top:
            e.top -
            (parseInt(this.helper.css("top"), 10) || 0) +
            (t ? 0 : this.scrollParent.scrollTop()),
          left:
            e.left -
            (parseInt(this.helper.css("left"), 10) || 0) +
            (t ? 0 : this.scrollParent.scrollLeft()),
        };
      },
      _cacheMargins: function () {
        this.margins = {
          left: parseInt(this.element.css("marginLeft"), 10) || 0,
          top: parseInt(this.element.css("marginTop"), 10) || 0,
          right: parseInt(this.element.css("marginRight"), 10) || 0,
          bottom: parseInt(this.element.css("marginBottom"), 10) || 0,
        };
      },
      _cacheHelperProportions: function () {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight(),
        };
      },
      _setContainment: function () {
        var t,
          i,
          s,
          n = this.options,
          a = this.document[0];
        return (
          (this.relativeContainer = null),
          n.containment
            ? "window" === n.containment
              ? ((this.containment = [
                  e(window).scrollLeft() -
                    this.offset.relative.left -
                    this.offset.parent.left,
                  e(window).scrollTop() -
                    this.offset.relative.top -
                    this.offset.parent.top,
                  e(window).scrollLeft() +
                    e(window).width() -
                    this.helperProportions.width -
                    this.margins.left,
                  e(window).scrollTop() +
                    (e(window).height() || a.body.parentNode.scrollHeight) -
                    this.helperProportions.height -
                    this.margins.top,
                ]),
                void 0)
              : "document" === n.containment
              ? ((this.containment = [
                  0,
                  0,
                  e(a).width() -
                    this.helperProportions.width -
                    this.margins.left,
                  (e(a).height() || a.body.parentNode.scrollHeight) -
                    this.helperProportions.height -
                    this.margins.top,
                ]),
                void 0)
              : n.containment.constructor === Array
              ? ((this.containment = n.containment), void 0)
              : ("parent" === n.containment &&
                  (n.containment = this.helper[0].parentNode),
                (i = e(n.containment)),
                (s = i[0]),
                s &&
                  ((t = /(scroll|auto)/.test(i.css("overflow"))),
                  (this.containment = [
                    (parseInt(i.css("borderLeftWidth"), 10) || 0) +
                      (parseInt(i.css("paddingLeft"), 10) || 0),
                    (parseInt(i.css("borderTopWidth"), 10) || 0) +
                      (parseInt(i.css("paddingTop"), 10) || 0),
                    (t
                      ? Math.max(s.scrollWidth, s.offsetWidth)
                      : s.offsetWidth) -
                      (parseInt(i.css("borderRightWidth"), 10) || 0) -
                      (parseInt(i.css("paddingRight"), 10) || 0) -
                      this.helperProportions.width -
                      this.margins.left -
                      this.margins.right,
                    (t
                      ? Math.max(s.scrollHeight, s.offsetHeight)
                      : s.offsetHeight) -
                      (parseInt(i.css("borderBottomWidth"), 10) || 0) -
                      (parseInt(i.css("paddingBottom"), 10) || 0) -
                      this.helperProportions.height -
                      this.margins.top -
                      this.margins.bottom,
                  ]),
                  (this.relativeContainer = i)),
                void 0)
            : ((this.containment = null), void 0)
        );
      },
      _convertPositionTo: function (e, t) {
        t || (t = this.position);
        var i = "absolute" === e ? 1 : -1,
          s = this._isRootNode(this.scrollParent[0]);
        return {
          top:
            t.top +
            this.offset.relative.top * i +
            this.offset.parent.top * i -
            ("fixed" === this.cssPosition
              ? -this.offset.scroll.top
              : s
              ? 0
              : this.offset.scroll.top) *
              i,
          left:
            t.left +
            this.offset.relative.left * i +
            this.offset.parent.left * i -
            ("fixed" === this.cssPosition
              ? -this.offset.scroll.left
              : s
              ? 0
              : this.offset.scroll.left) *
              i,
        };
      },
      _generatePosition: function (e, t) {
        var i,
          s,
          n,
          a,
          o = this.options,
          r = this._isRootNode(this.scrollParent[0]),
          h = e.pageX,
          l = e.pageY;
        return (
          (r && this.offset.scroll) ||
            (this.offset.scroll = {
              top: this.scrollParent.scrollTop(),
              left: this.scrollParent.scrollLeft(),
            }),
          t &&
            (this.containment &&
              (this.relativeContainer
                ? ((s = this.relativeContainer.offset()),
                  (i = [
                    this.containment[0] + s.left,
                    this.containment[1] + s.top,
                    this.containment[2] + s.left,
                    this.containment[3] + s.top,
                  ]))
                : (i = this.containment),
              e.pageX - this.offset.click.left < i[0] &&
                (h = i[0] + this.offset.click.left),
              e.pageY - this.offset.click.top < i[1] &&
                (l = i[1] + this.offset.click.top),
              e.pageX - this.offset.click.left > i[2] &&
                (h = i[2] + this.offset.click.left),
              e.pageY - this.offset.click.top > i[3] &&
                (l = i[3] + this.offset.click.top)),
            o.grid &&
              ((n = o.grid[1]
                ? this.originalPageY +
                  Math.round((l - this.originalPageY) / o.grid[1]) * o.grid[1]
                : this.originalPageY),
              (l = i
                ? n - this.offset.click.top >= i[1] ||
                  n - this.offset.click.top > i[3]
                  ? n
                  : n - this.offset.click.top >= i[1]
                  ? n - o.grid[1]
                  : n + o.grid[1]
                : n),
              (a = o.grid[0]
                ? this.originalPageX +
                  Math.round((h - this.originalPageX) / o.grid[0]) * o.grid[0]
                : this.originalPageX),
              (h = i
                ? a - this.offset.click.left >= i[0] ||
                  a - this.offset.click.left > i[2]
                  ? a
                  : a - this.offset.click.left >= i[0]
                  ? a - o.grid[0]
                  : a + o.grid[0]
                : a)),
            "y" === o.axis && (h = this.originalPageX),
            "x" === o.axis && (l = this.originalPageY)),
          {
            top:
              l -
              this.offset.click.top -
              this.offset.relative.top -
              this.offset.parent.top +
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.top
                : r
                ? 0
                : this.offset.scroll.top),
            left:
              h -
              this.offset.click.left -
              this.offset.relative.left -
              this.offset.parent.left +
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.left
                : r
                ? 0
                : this.offset.scroll.left),
          }
        );
      },
      _clear: function () {
        this.helper.removeClass("ui-draggable-dragging"),
          this.helper[0] === this.element[0] ||
            this.cancelHelperRemoval ||
            this.helper.remove(),
          (this.helper = null),
          (this.cancelHelperRemoval = !1),
          this.destroyOnClear && this.destroy();
      },
      _normalizeRightBottom: function () {
        "y" !== this.options.axis &&
          "auto" !== this.helper.css("right") &&
          (this.helper.width(this.helper.width()),
          this.helper.css("right", "auto")),
          "x" !== this.options.axis &&
            "auto" !== this.helper.css("bottom") &&
            (this.helper.height(this.helper.height()),
            this.helper.css("bottom", "auto"));
      },
      _trigger: function (t, i, s) {
        return (
          (s = s || this._uiHash()),
          e.ui.plugin.call(this, t, [i, s, this], !0),
          /^(drag|start|stop)/.test(t) &&
            ((this.positionAbs = this._convertPositionTo("absolute")),
            (s.offset = this.positionAbs)),
          e.Widget.prototype._trigger.call(this, t, i, s)
        );
      },
      plugins: {},
      _uiHash: function () {
        return {
          helper: this.helper,
          position: this.position,
          originalPosition: this.originalPosition,
          offset: this.positionAbs,
        };
      },
    }),
    e.ui.plugin.add("draggable", "connectToSortable", {
      start: function (t, i, s) {
        var n = e.extend({}, i, { item: s.element });
        (s.sortables = []),
          e(s.options.connectToSortable).each(function () {
            var i = e(this).sortable("instance");
            i &&
              !i.options.disabled &&
              (s.sortables.push(i),
              i.refreshPositions(),
              i._trigger("activate", t, n));
          });
      },
      stop: function (t, i, s) {
        var n = e.extend({}, i, { item: s.element });
        (s.cancelHelperRemoval = !1),
          e.each(s.sortables, function () {
            var e = this;
            e.isOver
              ? ((e.isOver = 0),
                (s.cancelHelperRemoval = !0),
                (e.cancelHelperRemoval = !1),
                (e._storedCSS = {
                  position: e.placeholder.css("position"),
                  top: e.placeholder.css("top"),
                  left: e.placeholder.css("left"),
                }),
                e._mouseStop(t),
                (e.options.helper = e.options._helper))
              : ((e.cancelHelperRemoval = !0), e._trigger("deactivate", t, n));
          });
      },
      drag: function (t, i, s) {
        e.each(s.sortables, function () {
          var n = !1,
            a = this;
          (a.positionAbs = s.positionAbs),
            (a.helperProportions = s.helperProportions),
            (a.offset.click = s.offset.click),
            a._intersectsWith(a.containerCache) &&
              ((n = !0),
              e.each(s.sortables, function () {
                return (
                  (this.positionAbs = s.positionAbs),
                  (this.helperProportions = s.helperProportions),
                  (this.offset.click = s.offset.click),
                  this !== a &&
                    this._intersectsWith(this.containerCache) &&
                    e.contains(a.element[0], this.element[0]) &&
                    (n = !1),
                  n
                );
              })),
            n
              ? (a.isOver ||
                  ((a.isOver = 1),
                  (s._parent = i.helper.parent()),
                  (a.currentItem = i.helper
                    .appendTo(a.element)
                    .data("ui-sortable-item", !0)),
                  (a.options._helper = a.options.helper),
                  (a.options.helper = function () {
                    return i.helper[0];
                  }),
                  (t.target = a.currentItem[0]),
                  a._mouseCapture(t, !0),
                  a._mouseStart(t, !0, !0),
                  (a.offset.click.top = s.offset.click.top),
                  (a.offset.click.left = s.offset.click.left),
                  (a.offset.parent.left -=
                    s.offset.parent.left - a.offset.parent.left),
                  (a.offset.parent.top -=
                    s.offset.parent.top - a.offset.parent.top),
                  s._trigger("toSortable", t),
                  (s.dropped = a.element),
                  e.each(s.sortables, function () {
                    this.refreshPositions();
                  }),
                  (s.currentItem = s.element),
                  (a.fromOutside = s)),
                a.currentItem && (a._mouseDrag(t), (i.position = a.position)))
              : a.isOver &&
                ((a.isOver = 0),
                (a.cancelHelperRemoval = !0),
                (a.options._revert = a.options.revert),
                (a.options.revert = !1),
                a._trigger("out", t, a._uiHash(a)),
                a._mouseStop(t, !0),
                (a.options.revert = a.options._revert),
                (a.options.helper = a.options._helper),
                a.placeholder && a.placeholder.remove(),
                i.helper.appendTo(s._parent),
                s._refreshOffsets(t),
                (i.position = s._generatePosition(t, !0)),
                s._trigger("fromSortable", t),
                (s.dropped = !1),
                e.each(s.sortables, function () {
                  this.refreshPositions();
                }));
        });
      },
    }),
    e.ui.plugin.add("draggable", "cursor", {
      start: function (t, i, s) {
        var n = e("body"),
          a = s.options;
        n.css("cursor") && (a._cursor = n.css("cursor")),
          n.css("cursor", a.cursor);
      },
      stop: function (t, i, s) {
        var n = s.options;
        n._cursor && e("body").css("cursor", n._cursor);
      },
    }),
    e.ui.plugin.add("draggable", "opacity", {
      start: function (t, i, s) {
        var n = e(i.helper),
          a = s.options;
        n.css("opacity") && (a._opacity = n.css("opacity")),
          n.css("opacity", a.opacity);
      },
      stop: function (t, i, s) {
        var n = s.options;
        n._opacity && e(i.helper).css("opacity", n._opacity);
      },
    }),
    e.ui.plugin.add("draggable", "scroll", {
      start: function (e, t, i) {
        i.scrollParentNotHidden ||
          (i.scrollParentNotHidden = i.helper.scrollParent(!1)),
          i.scrollParentNotHidden[0] !== i.document[0] &&
            "HTML" !== i.scrollParentNotHidden[0].tagName &&
            (i.overflowOffset = i.scrollParentNotHidden.offset());
      },
      drag: function (t, i, s) {
        var n = s.options,
          a = !1,
          o = s.scrollParentNotHidden[0],
          r = s.document[0];
        o !== r && "HTML" !== o.tagName
          ? ((n.axis && "x" === n.axis) ||
              (s.overflowOffset.top + o.offsetHeight - t.pageY <
              n.scrollSensitivity
                ? (o.scrollTop = a = o.scrollTop + n.scrollSpeed)
                : t.pageY - s.overflowOffset.top < n.scrollSensitivity &&
                  (o.scrollTop = a = o.scrollTop - n.scrollSpeed)),
            (n.axis && "y" === n.axis) ||
              (s.overflowOffset.left + o.offsetWidth - t.pageX <
              n.scrollSensitivity
                ? (o.scrollLeft = a = o.scrollLeft + n.scrollSpeed)
                : t.pageX - s.overflowOffset.left < n.scrollSensitivity &&
                  (o.scrollLeft = a = o.scrollLeft - n.scrollSpeed)))
          : ((n.axis && "x" === n.axis) ||
              (t.pageY - e(r).scrollTop() < n.scrollSensitivity
                ? (a = e(r).scrollTop(e(r).scrollTop() - n.scrollSpeed))
                : e(window).height() - (t.pageY - e(r).scrollTop()) <
                    n.scrollSensitivity &&
                  (a = e(r).scrollTop(e(r).scrollTop() + n.scrollSpeed))),
            (n.axis && "y" === n.axis) ||
              (t.pageX - e(r).scrollLeft() < n.scrollSensitivity
                ? (a = e(r).scrollLeft(e(r).scrollLeft() - n.scrollSpeed))
                : e(window).width() - (t.pageX - e(r).scrollLeft()) <
                    n.scrollSensitivity &&
                  (a = e(r).scrollLeft(e(r).scrollLeft() + n.scrollSpeed)))),
          a !== !1 &&
            e.ui.ddmanager &&
            !n.dropBehaviour &&
            e.ui.ddmanager.prepareOffsets(s, t);
      },
    }),
    e.ui.plugin.add("draggable", "snap", {
      start: function (t, i, s) {
        var n = s.options;
        (s.snapElements = []),
          e(
            n.snap.constructor !== String
              ? n.snap.items || ":data(ui-draggable)"
              : n.snap
          ).each(function () {
            var t = e(this),
              i = t.offset();
            this !== s.element[0] &&
              s.snapElements.push({
                item: this,
                width: t.outerWidth(),
                height: t.outerHeight(),
                top: i.top,
                left: i.left,
              });
          });
      },
      drag: function (t, i, s) {
        var n,
          a,
          o,
          r,
          h,
          l,
          u,
          d,
          c,
          p,
          f = s.options,
          m = f.snapTolerance,
          g = i.offset.left,
          v = g + s.helperProportions.width,
          y = i.offset.top,
          b = y + s.helperProportions.height;
        for (c = s.snapElements.length - 1; c >= 0; c--)
          (h = s.snapElements[c].left - s.margins.left),
            (l = h + s.snapElements[c].width),
            (u = s.snapElements[c].top - s.margins.top),
            (d = u + s.snapElements[c].height),
            h - m > v ||
            g > l + m ||
            u - m > b ||
            y > d + m ||
            !e.contains(
              s.snapElements[c].item.ownerDocument,
              s.snapElements[c].item
            )
              ? (s.snapElements[c].snapping &&
                  s.options.snap.release &&
                  s.options.snap.release.call(
                    s.element,
                    t,
                    e.extend(s._uiHash(), { snapItem: s.snapElements[c].item })
                  ),
                (s.snapElements[c].snapping = !1))
              : ("inner" !== f.snapMode &&
                  ((n = m >= Math.abs(u - b)),
                  (a = m >= Math.abs(d - y)),
                  (o = m >= Math.abs(h - v)),
                  (r = m >= Math.abs(l - g)),
                  n &&
                    (i.position.top = s._convertPositionTo("relative", {
                      top: u - s.helperProportions.height,
                      left: 0,
                    }).top),
                  a &&
                    (i.position.top = s._convertPositionTo("relative", {
                      top: d,
                      left: 0,
                    }).top),
                  o &&
                    (i.position.left = s._convertPositionTo("relative", {
                      top: 0,
                      left: h - s.helperProportions.width,
                    }).left),
                  r &&
                    (i.position.left = s._convertPositionTo("relative", {
                      top: 0,
                      left: l,
                    }).left)),
                (p = n || a || o || r),
                "outer" !== f.snapMode &&
                  ((n = m >= Math.abs(u - y)),
                  (a = m >= Math.abs(d - b)),
                  (o = m >= Math.abs(h - g)),
                  (r = m >= Math.abs(l - v)),
                  n &&
                    (i.position.top = s._convertPositionTo("relative", {
                      top: u,
                      left: 0,
                    }).top),
                  a &&
                    (i.position.top = s._convertPositionTo("relative", {
                      top: d - s.helperProportions.height,
                      left: 0,
                    }).top),
                  o &&
                    (i.position.left = s._convertPositionTo("relative", {
                      top: 0,
                      left: h,
                    }).left),
                  r &&
                    (i.position.left = s._convertPositionTo("relative", {
                      top: 0,
                      left: l - s.helperProportions.width,
                    }).left)),
                !s.snapElements[c].snapping &&
                  (n || a || o || r || p) &&
                  s.options.snap.snap &&
                  s.options.snap.snap.call(
                    s.element,
                    t,
                    e.extend(s._uiHash(), { snapItem: s.snapElements[c].item })
                  ),
                (s.snapElements[c].snapping = n || a || o || r || p));
      },
    }),
    e.ui.plugin.add("draggable", "stack", {
      start: function (t, i, s) {
        var n,
          a = s.options,
          o = e.makeArray(e(a.stack)).sort(function (t, i) {
            return (
              (parseInt(e(t).css("zIndex"), 10) || 0) -
              (parseInt(e(i).css("zIndex"), 10) || 0)
            );
          });
        o.length &&
          ((n = parseInt(e(o[0]).css("zIndex"), 10) || 0),
          e(o).each(function (t) {
            e(this).css("zIndex", n + t);
          }),
          this.css("zIndex", n + o.length));
      },
    }),
    e.ui.plugin.add("draggable", "zIndex", {
      start: function (t, i, s) {
        var n = e(i.helper),
          a = s.options;
        n.css("zIndex") && (a._zIndex = n.css("zIndex")),
          n.css("zIndex", a.zIndex);
      },
      stop: function (t, i, s) {
        var n = s.options;
        n._zIndex && e(i.helper).css("zIndex", n._zIndex);
      },
    }),
    e.ui.draggable,
    e.widget("ui.resizable", e.ui.mouse, {
      version: "1.11.4",
      widgetEventPrefix: "resize",
      options: {
        alsoResize: !1,
        animate: !1,
        animateDuration: "slow",
        animateEasing: "swing",
        aspectRatio: !1,
        autoHide: !1,
        containment: !1,
        ghost: !1,
        grid: !1,
        handles: "e,s,se",
        helper: !1,
        maxHeight: null,
        maxWidth: null,
        minHeight: 10,
        minWidth: 10,
        zIndex: 90,
        resize: null,
        start: null,
        stop: null,
      },
      _num: function (e) {
        return parseInt(e, 10) || 0;
      },
      _isNumber: function (e) {
        return !isNaN(parseInt(e, 10));
      },
      _hasScroll: function (t, i) {
        if ("hidden" === e(t).css("overflow")) return !1;
        var s = i && "left" === i ? "scrollLeft" : "scrollTop",
          n = !1;
        return t[s] > 0 ? !0 : ((t[s] = 1), (n = t[s] > 0), (t[s] = 0), n);
      },
      _create: function () {
        var t,
          i,
          s,
          n,
          a,
          o = this,
          r = this.options;
        if (
          (this.element.addClass("ui-resizable"),
          e.extend(this, {
            _aspectRatio: !!r.aspectRatio,
            aspectRatio: r.aspectRatio,
            originalElement: this.element,
            _proportionallyResizeElements: [],
            _helper:
              r.helper || r.ghost || r.animate
                ? r.helper || "ui-resizable-helper"
                : null,
          }),
          this.element[0].nodeName.match(
            /^(canvas|textarea|input|select|button|img)$/i
          ) &&
            (this.element.wrap(
              e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css(
                {
                  position: this.element.css("position"),
                  width: this.element.outerWidth(),
                  height: this.element.outerHeight(),
                  top: this.element.css("top"),
                  left: this.element.css("left"),
                }
              )
            ),
            (this.element = this.element
              .parent()
              .data("ui-resizable", this.element.resizable("instance"))),
            (this.elementIsWrapper = !0),
            this.element.css({
              marginLeft: this.originalElement.css("marginLeft"),
              marginTop: this.originalElement.css("marginTop"),
              marginRight: this.originalElement.css("marginRight"),
              marginBottom: this.originalElement.css("marginBottom"),
            }),
            this.originalElement.css({
              marginLeft: 0,
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
            }),
            (this.originalResizeStyle = this.originalElement.css("resize")),
            this.originalElement.css("resize", "none"),
            this._proportionallyResizeElements.push(
              this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block",
              })
            ),
            this.originalElement.css({
              margin: this.originalElement.css("margin"),
            }),
            this._proportionallyResize()),
          (this.handles =
            r.handles ||
            (e(".ui-resizable-handle", this.element).length
              ? {
                  n: ".ui-resizable-n",
                  e: ".ui-resizable-e",
                  s: ".ui-resizable-s",
                  w: ".ui-resizable-w",
                  se: ".ui-resizable-se",
                  sw: ".ui-resizable-sw",
                  ne: ".ui-resizable-ne",
                  nw: ".ui-resizable-nw",
                }
              : "e,s,se")),
          (this._handles = e()),
          this.handles.constructor === String)
        )
          for (
            "all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"),
              t = this.handles.split(","),
              this.handles = {},
              i = 0;
            t.length > i;
            i++
          )
            (s = e.trim(t[i])),
              (a = "ui-resizable-" + s),
              (n = e("<div class='ui-resizable-handle " + a + "'></div>")),
              n.css({ zIndex: r.zIndex }),
              "se" === s && n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),
              (this.handles[s] = ".ui-resizable-" + s),
              this.element.append(n);
        (this._renderAxis = function (t) {
          var i, s, n, a;
          t = t || this.element;
          for (i in this.handles)
            this.handles[i].constructor === String
              ? (this.handles[i] = this.element
                  .children(this.handles[i])
                  .first()
                  .show())
              : (this.handles[i].jquery || this.handles[i].nodeType) &&
                ((this.handles[i] = e(this.handles[i])),
                this._on(this.handles[i], { mousedown: o._mouseDown })),
              this.elementIsWrapper &&
                this.originalElement[0].nodeName.match(
                  /^(textarea|input|select|button)$/i
                ) &&
                ((s = e(this.handles[i], this.element)),
                (a = /sw|ne|nw|se|n|s/.test(i)
                  ? s.outerHeight()
                  : s.outerWidth()),
                (n = [
                  "padding",
                  /ne|nw|n/.test(i)
                    ? "Top"
                    : /se|sw|s/.test(i)
                    ? "Bottom"
                    : /^e$/.test(i)
                    ? "Right"
                    : "Left",
                ].join("")),
                t.css(n, a),
                this._proportionallyResize()),
              (this._handles = this._handles.add(this.handles[i]));
        }),
          this._renderAxis(this.element),
          (this._handles = this._handles.add(
            this.element.find(".ui-resizable-handle")
          )),
          this._handles.disableSelection(),
          this._handles.mouseover(function () {
            o.resizing ||
              (this.className &&
                (n = this.className.match(
                  /ui-resizable-(se|sw|ne|nw|n|e|s|w)/i
                )),
              (o.axis = n && n[1] ? n[1] : "se"));
          }),
          r.autoHide &&
            (this._handles.hide(),
            e(this.element)
              .addClass("ui-resizable-autohide")
              .mouseenter(function () {
                r.disabled ||
                  (e(this).removeClass("ui-resizable-autohide"),
                  o._handles.show());
              })
              .mouseleave(function () {
                r.disabled ||
                  o.resizing ||
                  (e(this).addClass("ui-resizable-autohide"),
                  o._handles.hide());
              })),
          this._mouseInit();
      },
      _destroy: function () {
        this._mouseDestroy();
        var t,
          i = function (t) {
            e(t)
              .removeClass(
                "ui-resizable ui-resizable-disabled ui-resizable-resizing"
              )
              .removeData("resizable")
              .removeData("ui-resizable")
              .unbind(".resizable")
              .find(".ui-resizable-handle")
              .remove();
          };
        return (
          this.elementIsWrapper &&
            (i(this.element),
            (t = this.element),
            this.originalElement
              .css({
                position: t.css("position"),
                width: t.outerWidth(),
                height: t.outerHeight(),
                top: t.css("top"),
                left: t.css("left"),
              })
              .insertAfter(t),
            t.remove()),
          this.originalElement.css("resize", this.originalResizeStyle),
          i(this.originalElement),
          this
        );
      },
      _mouseCapture: function (t) {
        var i,
          s,
          n = !1;
        for (i in this.handles)
          (s = e(this.handles[i])[0]),
            (s === t.target || e.contains(s, t.target)) && (n = !0);
        return !this.options.disabled && n;
      },
      _mouseStart: function (t) {
        var i,
          s,
          n,
          a = this.options,
          o = this.element;
        return (
          (this.resizing = !0),
          this._renderProxy(),
          (i = this._num(this.helper.css("left"))),
          (s = this._num(this.helper.css("top"))),
          a.containment &&
            ((i += e(a.containment).scrollLeft() || 0),
            (s += e(a.containment).scrollTop() || 0)),
          (this.offset = this.helper.offset()),
          (this.position = { left: i, top: s }),
          (this.size = this._helper
            ? { width: this.helper.width(), height: this.helper.height() }
            : { width: o.width(), height: o.height() }),
          (this.originalSize = this._helper
            ? { width: o.outerWidth(), height: o.outerHeight() }
            : { width: o.width(), height: o.height() }),
          (this.sizeDiff = {
            width: o.outerWidth() - o.width(),
            height: o.outerHeight() - o.height(),
          }),
          (this.originalPosition = { left: i, top: s }),
          (this.originalMousePosition = { left: t.pageX, top: t.pageY }),
          (this.aspectRatio =
            "number" == typeof a.aspectRatio
              ? a.aspectRatio
              : this.originalSize.width / this.originalSize.height || 1),
          (n = e(".ui-resizable-" + this.axis).css("cursor")),
          e("body").css("cursor", "auto" === n ? this.axis + "-resize" : n),
          o.addClass("ui-resizable-resizing"),
          this._propagate("start", t),
          !0
        );
      },
      _mouseDrag: function (t) {
        var i,
          s,
          n = this.originalMousePosition,
          a = this.axis,
          o = t.pageX - n.left || 0,
          r = t.pageY - n.top || 0,
          h = this._change[a];
        return (
          this._updatePrevProperties(),
          h
            ? ((i = h.apply(this, [t, o, r])),
              this._updateVirtualBoundaries(t.shiftKey),
              (this._aspectRatio || t.shiftKey) &&
                (i = this._updateRatio(i, t)),
              (i = this._respectSize(i, t)),
              this._updateCache(i),
              this._propagate("resize", t),
              (s = this._applyChanges()),
              !this._helper &&
                this._proportionallyResizeElements.length &&
                this._proportionallyResize(),
              e.isEmptyObject(s) ||
                (this._updatePrevProperties(),
                this._trigger("resize", t, this.ui()),
                this._applyChanges()),
              !1)
            : !1
        );
      },
      _mouseStop: function (t) {
        this.resizing = !1;
        var i,
          s,
          n,
          a,
          o,
          r,
          h,
          l = this.options,
          u = this;
        return (
          this._helper &&
            ((i = this._proportionallyResizeElements),
            (s = i.length && /textarea/i.test(i[0].nodeName)),
            (n = s && this._hasScroll(i[0], "left") ? 0 : u.sizeDiff.height),
            (a = s ? 0 : u.sizeDiff.width),
            (o = {
              width: u.helper.width() - a,
              height: u.helper.height() - n,
            }),
            (r =
              parseInt(u.element.css("left"), 10) +
                (u.position.left - u.originalPosition.left) || null),
            (h =
              parseInt(u.element.css("top"), 10) +
                (u.position.top - u.originalPosition.top) || null),
            l.animate || this.element.css(e.extend(o, { top: h, left: r })),
            u.helper.height(u.size.height),
            u.helper.width(u.size.width),
            this._helper && !l.animate && this._proportionallyResize()),
          e("body").css("cursor", "auto"),
          this.element.removeClass("ui-resizable-resizing"),
          this._propagate("stop", t),
          this._helper && this.helper.remove(),
          !1
        );
      },
      _updatePrevProperties: function () {
        (this.prevPosition = {
          top: this.position.top,
          left: this.position.left,
        }),
          (this.prevSize = {
            width: this.size.width,
            height: this.size.height,
          });
      },
      _applyChanges: function () {
        var e = {};
        return (
          this.position.top !== this.prevPosition.top &&
            (e.top = this.position.top + "px"),
          this.position.left !== this.prevPosition.left &&
            (e.left = this.position.left + "px"),
          this.size.width !== this.prevSize.width &&
            (e.width = this.size.width + "px"),
          this.size.height !== this.prevSize.height &&
            (e.height = this.size.height + "px"),
          this.helper.css(e),
          e
        );
      },
      _updateVirtualBoundaries: function (e) {
        var t,
          i,
          s,
          n,
          a,
          o = this.options;
        (a = {
          minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
          maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : 1 / 0,
          minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
          maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : 1 / 0,
        }),
          (this._aspectRatio || e) &&
            ((t = a.minHeight * this.aspectRatio),
            (s = a.minWidth / this.aspectRatio),
            (i = a.maxHeight * this.aspectRatio),
            (n = a.maxWidth / this.aspectRatio),
            t > a.minWidth && (a.minWidth = t),
            s > a.minHeight && (a.minHeight = s),
            a.maxWidth > i && (a.maxWidth = i),
            a.maxHeight > n && (a.maxHeight = n)),
          (this._vBoundaries = a);
      },
      _updateCache: function (e) {
        (this.offset = this.helper.offset()),
          this._isNumber(e.left) && (this.position.left = e.left),
          this._isNumber(e.top) && (this.position.top = e.top),
          this._isNumber(e.height) && (this.size.height = e.height),
          this._isNumber(e.width) && (this.size.width = e.width);
      },
      _updateRatio: function (e) {
        var t = this.position,
          i = this.size,
          s = this.axis;
        return (
          this._isNumber(e.height)
            ? (e.width = e.height * this.aspectRatio)
            : this._isNumber(e.width) &&
              (e.height = e.width / this.aspectRatio),
          "sw" === s &&
            ((e.left = t.left + (i.width - e.width)), (e.top = null)),
          "nw" === s &&
            ((e.top = t.top + (i.height - e.height)),
            (e.left = t.left + (i.width - e.width))),
          e
        );
      },
      _respectSize: function (e) {
        var t = this._vBoundaries,
          i = this.axis,
          s = this._isNumber(e.width) && t.maxWidth && t.maxWidth < e.width,
          n = this._isNumber(e.height) && t.maxHeight && t.maxHeight < e.height,
          a = this._isNumber(e.width) && t.minWidth && t.minWidth > e.width,
          o = this._isNumber(e.height) && t.minHeight && t.minHeight > e.height,
          r = this.originalPosition.left + this.originalSize.width,
          h = this.position.top + this.size.height,
          l = /sw|nw|w/.test(i),
          u = /nw|ne|n/.test(i);
        return (
          a && (e.width = t.minWidth),
          o && (e.height = t.minHeight),
          s && (e.width = t.maxWidth),
          n && (e.height = t.maxHeight),
          a && l && (e.left = r - t.minWidth),
          s && l && (e.left = r - t.maxWidth),
          o && u && (e.top = h - t.minHeight),
          n && u && (e.top = h - t.maxHeight),
          e.width || e.height || e.left || !e.top
            ? e.width || e.height || e.top || !e.left || (e.left = null)
            : (e.top = null),
          e
        );
      },
      _getPaddingPlusBorderDimensions: function (e) {
        for (
          var t = 0,
            i = [],
            s = [
              e.css("borderTopWidth"),
              e.css("borderRightWidth"),
              e.css("borderBottomWidth"),
              e.css("borderLeftWidth"),
            ],
            n = [
              e.css("paddingTop"),
              e.css("paddingRight"),
              e.css("paddingBottom"),
              e.css("paddingLeft"),
            ];
          4 > t;
          t++
        )
          (i[t] = parseInt(s[t], 10) || 0), (i[t] += parseInt(n[t], 10) || 0);
        return { height: i[0] + i[2], width: i[1] + i[3] };
      },
      _proportionallyResize: function () {
        if (this._proportionallyResizeElements.length)
          for (
            var e, t = 0, i = this.helper || this.element;
            this._proportionallyResizeElements.length > t;
            t++
          )
            (e = this._proportionallyResizeElements[t]),
              this.outerDimensions ||
                (this.outerDimensions =
                  this._getPaddingPlusBorderDimensions(e)),
              e.css({
                height: i.height() - this.outerDimensions.height || 0,
                width: i.width() - this.outerDimensions.width || 0,
              });
      },
      _renderProxy: function () {
        var t = this.element,
          i = this.options;
        (this.elementOffset = t.offset()),
          this._helper
            ? ((this.helper =
                this.helper || e("<div style='overflow:hidden;'></div>")),
              this.helper
                .addClass(this._helper)
                .css({
                  width: this.element.outerWidth() - 1,
                  height: this.element.outerHeight() - 1,
                  position: "absolute",
                  left: this.elementOffset.left + "px",
                  top: this.elementOffset.top + "px",
                  zIndex: ++i.zIndex,
                }),
              this.helper.appendTo("body").disableSelection())
            : (this.helper = this.element);
      },
      _change: {
        e: function (e, t) {
          return { width: this.originalSize.width + t };
        },
        w: function (e, t) {
          var i = this.originalSize,
            s = this.originalPosition;
          return { left: s.left + t, width: i.width - t };
        },
        n: function (e, t, i) {
          var s = this.originalSize,
            n = this.originalPosition;
          return { top: n.top + i, height: s.height - i };
        },
        s: function (e, t, i) {
          return { height: this.originalSize.height + i };
        },
        se: function (t, i, s) {
          return e.extend(
            this._change.s.apply(this, arguments),
            this._change.e.apply(this, [t, i, s])
          );
        },
        sw: function (t, i, s) {
          return e.extend(
            this._change.s.apply(this, arguments),
            this._change.w.apply(this, [t, i, s])
          );
        },
        ne: function (t, i, s) {
          return e.extend(
            this._change.n.apply(this, arguments),
            this._change.e.apply(this, [t, i, s])
          );
        },
        nw: function (t, i, s) {
          return e.extend(
            this._change.n.apply(this, arguments),
            this._change.w.apply(this, [t, i, s])
          );
        },
      },
      _propagate: function (t, i) {
        e.ui.plugin.call(this, t, [i, this.ui()]),
          "resize" !== t && this._trigger(t, i, this.ui());
      },
      plugins: {},
      ui: function () {
        return {
          originalElement: this.originalElement,
          element: this.element,
          helper: this.helper,
          position: this.position,
          size: this.size,
          originalSize: this.originalSize,
          originalPosition: this.originalPosition,
        };
      },
    }),
    e.ui.plugin.add("resizable", "animate", {
      stop: function (t) {
        var i = e(this).resizable("instance"),
          s = i.options,
          n = i._proportionallyResizeElements,
          a = n.length && /textarea/i.test(n[0].nodeName),
          o = a && i._hasScroll(n[0], "left") ? 0 : i.sizeDiff.height,
          r = a ? 0 : i.sizeDiff.width,
          h = { width: i.size.width - r, height: i.size.height - o },
          l =
            parseInt(i.element.css("left"), 10) +
              (i.position.left - i.originalPosition.left) || null,
          u =
            parseInt(i.element.css("top"), 10) +
              (i.position.top - i.originalPosition.top) || null;
        i.element.animate(e.extend(h, u && l ? { top: u, left: l } : {}), {
          duration: s.animateDuration,
          easing: s.animateEasing,
          step: function () {
            var s = {
              width: parseInt(i.element.css("width"), 10),
              height: parseInt(i.element.css("height"), 10),
              top: parseInt(i.element.css("top"), 10),
              left: parseInt(i.element.css("left"), 10),
            };
            n && n.length && e(n[0]).css({ width: s.width, height: s.height }),
              i._updateCache(s),
              i._propagate("resize", t);
          },
        });
      },
    }),
    e.ui.plugin.add("resizable", "containment", {
      start: function () {
        var t,
          i,
          s,
          n,
          a,
          o,
          r,
          h = e(this).resizable("instance"),
          l = h.options,
          u = h.element,
          d = l.containment,
          c =
            d instanceof e
              ? d.get(0)
              : /parent/.test(d)
              ? u.parent().get(0)
              : d;
        c &&
          ((h.containerElement = e(c)),
          /document/.test(d) || d === document
            ? ((h.containerOffset = { left: 0, top: 0 }),
              (h.containerPosition = { left: 0, top: 0 }),
              (h.parentData = {
                element: e(document),
                left: 0,
                top: 0,
                width: e(document).width(),
                height:
                  e(document).height() || document.body.parentNode.scrollHeight,
              }))
            : ((t = e(c)),
              (i = []),
              e(["Top", "Right", "Left", "Bottom"]).each(function (e, s) {
                i[e] = h._num(t.css("padding" + s));
              }),
              (h.containerOffset = t.offset()),
              (h.containerPosition = t.position()),
              (h.containerSize = {
                height: t.innerHeight() - i[3],
                width: t.innerWidth() - i[1],
              }),
              (s = h.containerOffset),
              (n = h.containerSize.height),
              (a = h.containerSize.width),
              (o = h._hasScroll(c, "left") ? c.scrollWidth : a),
              (r = h._hasScroll(c) ? c.scrollHeight : n),
              (h.parentData = {
                element: c,
                left: s.left,
                top: s.top,
                width: o,
                height: r,
              })));
      },
      resize: function (t) {
        var i,
          s,
          n,
          a,
          o = e(this).resizable("instance"),
          r = o.options,
          h = o.containerOffset,
          l = o.position,
          u = o._aspectRatio || t.shiftKey,
          d = { top: 0, left: 0 },
          c = o.containerElement,
          p = !0;
        c[0] !== document && /static/.test(c.css("position")) && (d = h),
          l.left < (o._helper ? h.left : 0) &&
            ((o.size.width =
              o.size.width +
              (o._helper
                ? o.position.left - h.left
                : o.position.left - d.left)),
            u && ((o.size.height = o.size.width / o.aspectRatio), (p = !1)),
            (o.position.left = r.helper ? h.left : 0)),
          l.top < (o._helper ? h.top : 0) &&
            ((o.size.height =
              o.size.height +
              (o._helper ? o.position.top - h.top : o.position.top)),
            u && ((o.size.width = o.size.height * o.aspectRatio), (p = !1)),
            (o.position.top = o._helper ? h.top : 0)),
          (n = o.containerElement.get(0) === o.element.parent().get(0)),
          (a = /relative|absolute/.test(o.containerElement.css("position"))),
          n && a
            ? ((o.offset.left = o.parentData.left + o.position.left),
              (o.offset.top = o.parentData.top + o.position.top))
            : ((o.offset.left = o.element.offset().left),
              (o.offset.top = o.element.offset().top)),
          (i = Math.abs(
            o.sizeDiff.width +
              (o._helper ? o.offset.left - d.left : o.offset.left - h.left)
          )),
          (s = Math.abs(
            o.sizeDiff.height +
              (o._helper ? o.offset.top - d.top : o.offset.top - h.top)
          )),
          i + o.size.width >= o.parentData.width &&
            ((o.size.width = o.parentData.width - i),
            u && ((o.size.height = o.size.width / o.aspectRatio), (p = !1))),
          s + o.size.height >= o.parentData.height &&
            ((o.size.height = o.parentData.height - s),
            u && ((o.size.width = o.size.height * o.aspectRatio), (p = !1))),
          p ||
            ((o.position.left = o.prevPosition.left),
            (o.position.top = o.prevPosition.top),
            (o.size.width = o.prevSize.width),
            (o.size.height = o.prevSize.height));
      },
      stop: function () {
        var t = e(this).resizable("instance"),
          i = t.options,
          s = t.containerOffset,
          n = t.containerPosition,
          a = t.containerElement,
          o = e(t.helper),
          r = o.offset(),
          h = o.outerWidth() - t.sizeDiff.width,
          l = o.outerHeight() - t.sizeDiff.height;
        t._helper &&
          !i.animate &&
          /relative/.test(a.css("position")) &&
          e(this).css({ left: r.left - n.left - s.left, width: h, height: l }),
          t._helper &&
            !i.animate &&
            /static/.test(a.css("position")) &&
            e(this).css({
              left: r.left - n.left - s.left,
              width: h,
              height: l,
            });
      },
    }),
    e.ui.plugin.add("resizable", "alsoResize", {
      start: function () {
        var t = e(this).resizable("instance"),
          i = t.options;
        e(i.alsoResize).each(function () {
          var t = e(this);
          t.data("ui-resizable-alsoresize", {
            width: parseInt(t.width(), 10),
            height: parseInt(t.height(), 10),
            left: parseInt(t.css("left"), 10),
            top: parseInt(t.css("top"), 10),
          });
        });
      },
      resize: function (t, i) {
        var s = e(this).resizable("instance"),
          n = s.options,
          a = s.originalSize,
          o = s.originalPosition,
          r = {
            height: s.size.height - a.height || 0,
            width: s.size.width - a.width || 0,
            top: s.position.top - o.top || 0,
            left: s.position.left - o.left || 0,
          };
        e(n.alsoResize).each(function () {
          var t = e(this),
            s = e(this).data("ui-resizable-alsoresize"),
            n = {},
            a = t.parents(i.originalElement[0]).length
              ? ["width", "height"]
              : ["width", "height", "top", "left"];
          e.each(a, function (e, t) {
            var i = (s[t] || 0) + (r[t] || 0);
            i && i >= 0 && (n[t] = i || null);
          }),
            t.css(n);
        });
      },
      stop: function () {
        e(this).removeData("resizable-alsoresize");
      },
    }),
    e.ui.plugin.add("resizable", "ghost", {
      start: function () {
        var t = e(this).resizable("instance"),
          i = t.options,
          s = t.size;
        (t.ghost = t.originalElement.clone()),
          t.ghost
            .css({
              opacity: 0.25,
              display: "block",
              position: "relative",
              height: s.height,
              width: s.width,
              margin: 0,
              left: 0,
              top: 0,
            })
            .addClass("ui-resizable-ghost")
            .addClass("string" == typeof i.ghost ? i.ghost : ""),
          t.ghost.appendTo(t.helper);
      },
      resize: function () {
        var t = e(this).resizable("instance");
        t.ghost &&
          t.ghost.css({
            position: "relative",
            height: t.size.height,
            width: t.size.width,
          });
      },
      stop: function () {
        var t = e(this).resizable("instance");
        t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0));
      },
    }),
    e.ui.plugin.add("resizable", "grid", {
      resize: function () {
        var t,
          i = e(this).resizable("instance"),
          s = i.options,
          n = i.size,
          a = i.originalSize,
          o = i.originalPosition,
          r = i.axis,
          h = "number" == typeof s.grid ? [s.grid, s.grid] : s.grid,
          l = h[0] || 1,
          u = h[1] || 1,
          d = Math.round((n.width - a.width) / l) * l,
          c = Math.round((n.height - a.height) / u) * u,
          p = a.width + d,
          f = a.height + c,
          m = s.maxWidth && p > s.maxWidth,
          g = s.maxHeight && f > s.maxHeight,
          v = s.minWidth && s.minWidth > p,
          y = s.minHeight && s.minHeight > f;
        (s.grid = h),
          v && (p += l),
          y && (f += u),
          m && (p -= l),
          g && (f -= u),
          /^(se|s|e)$/.test(r)
            ? ((i.size.width = p), (i.size.height = f))
            : /^(ne)$/.test(r)
            ? ((i.size.width = p),
              (i.size.height = f),
              (i.position.top = o.top - c))
            : /^(sw)$/.test(r)
            ? ((i.size.width = p),
              (i.size.height = f),
              (i.position.left = o.left - d))
            : ((0 >= f - u || 0 >= p - l) &&
                (t = i._getPaddingPlusBorderDimensions(this)),
              f - u > 0
                ? ((i.size.height = f), (i.position.top = o.top - c))
                : ((f = u - t.height),
                  (i.size.height = f),
                  (i.position.top = o.top + a.height - f)),
              p - l > 0
                ? ((i.size.width = p), (i.position.left = o.left - d))
                : ((p = l - t.width),
                  (i.size.width = p),
                  (i.position.left = o.left + a.width - p)));
      },
    }),
    e.ui.resizable,
    e.widget("ui.dialog", {
      version: "1.11.4",
      options: {
        appendTo: "body",
        autoOpen: !0,
        buttons: [],
        closeOnEscape: !0,
        closeText: "Close",
        dialogClass: "",
        draggable: !0,
        hide: null,
        height: "auto",
        maxHeight: null,
        maxWidth: null,
        minHeight: 150,
        minWidth: 150,
        modal: !1,
        position: {
          my: "center",
          at: "center",
          of: window,
          collision: "fit",
          using: function (t) {
            var i = e(this).css(t).offset().top;
            0 > i && e(this).css("top", t.top - i);
          },
        },
        resizable: !0,
        show: null,
        title: null,
        width: 300,
        beforeClose: null,
        close: null,
        drag: null,
        dragStart: null,
        dragStop: null,
        focus: null,
        open: null,
        resize: null,
        resizeStart: null,
        resizeStop: null,
      },
      sizeRelatedOptions: {
        buttons: !0,
        height: !0,
        maxHeight: !0,
        maxWidth: !0,
        minHeight: !0,
        minWidth: !0,
        width: !0,
      },
      resizableRelatedOptions: {
        maxHeight: !0,
        maxWidth: !0,
        minHeight: !0,
        minWidth: !0,
      },
      _create: function () {
        (this.originalCss = {
          display: this.element[0].style.display,
          width: this.element[0].style.width,
          minHeight: this.element[0].style.minHeight,
          maxHeight: this.element[0].style.maxHeight,
          height: this.element[0].style.height,
        }),
          (this.originalPosition = {
            parent: this.element.parent(),
            index: this.element.parent().children().index(this.element),
          }),
          (this.originalTitle = this.element.attr("title")),
          (this.options.title = this.options.title || this.originalTitle),
          this._createWrapper(),
          this.element
            .show()
            .removeAttr("title")
            .addClass("ui-dialog-content ui-widget-content")
            .appendTo(this.uiDialog),
          this._createTitlebar(),
          this._createButtonPane(),
          this.options.draggable && e.fn.draggable && this._makeDraggable(),
          this.options.resizable && e.fn.resizable && this._makeResizable(),
          (this._isOpen = !1),
          this._trackFocus();
      },
      _init: function () {
        this.options.autoOpen && this.open();
      },
      _appendTo: function () {
        var t = this.options.appendTo;
        return t && (t.jquery || t.nodeType)
          ? e(t)
          : this.document.find(t || "body").eq(0);
      },
      _destroy: function () {
        var e,
          t = this.originalPosition;
        this._untrackInstance(),
          this._destroyOverlay(),
          this.element
            .removeUniqueId()
            .removeClass("ui-dialog-content ui-widget-content")
            .css(this.originalCss)
            .detach(),
          this.uiDialog.stop(!0, !0).remove(),
          this.originalTitle && this.element.attr("title", this.originalTitle),
          (e = t.parent.children().eq(t.index)),
          e.length && e[0] !== this.element[0]
            ? e.before(this.element)
            : t.parent.append(this.element);
      },
      widget: function () {
        return this.uiDialog;
      },
      disable: e.noop,
      enable: e.noop,
      close: function (t) {
        var i,
          s = this;
        if (this._isOpen && this._trigger("beforeClose", t) !== !1) {
          if (
            ((this._isOpen = !1),
            (this._focusedElement = null),
            this._destroyOverlay(),
            this._untrackInstance(),
            !this.opener.filter(":focusable").focus().length)
          )
            try {
              (i = this.document[0].activeElement),
                i && "body" !== i.nodeName.toLowerCase() && e(i).blur();
            } catch (n) {}
          this._hide(this.uiDialog, this.options.hide, function () {
            s._trigger("close", t);
          });
        }
      },
      isOpen: function () {
        return this._isOpen;
      },
      moveToTop: function () {
        this._moveToTop();
      },
      _moveToTop: function (t, i) {
        var s = !1,
          n = this.uiDialog
            .siblings(".ui-front:visible")
            .map(function () {
              return +e(this).css("z-index");
            })
            .get(),
          a = Math.max.apply(null, n);
        return (
          a >= +this.uiDialog.css("z-index") &&
            (this.uiDialog.css("z-index", a + 1), (s = !0)),
          s && !i && this._trigger("focus", t),
          s
        );
      },
      open: function () {
        var t = this;
        return this._isOpen
          ? (this._moveToTop() && this._focusTabbable(), void 0)
          : ((this._isOpen = !0),
            (this.opener = e(this.document[0].activeElement)),
            this._size(),
            this._position(),
            this._createOverlay(),
            this._moveToTop(null, !0),
            this.overlay &&
              this.overlay.css("z-index", this.uiDialog.css("z-index") - 1),
            this._show(this.uiDialog, this.options.show, function () {
              t._focusTabbable(), t._trigger("focus");
            }),
            this._makeFocusTarget(),
            this._trigger("open"),
            void 0);
      },
      _focusTabbable: function () {
        var e = this._focusedElement;
        e || (e = this.element.find("[autofocus]")),
          e.length || (e = this.element.find(":tabbable")),
          e.length || (e = this.uiDialogButtonPane.find(":tabbable")),
          e.length || (e = this.uiDialogTitlebarClose.filter(":tabbable")),
          e.length || (e = this.uiDialog),
          e.eq(0).focus();
      },
      _keepFocus: function (t) {
        function i() {
          var t = this.document[0].activeElement,
            i = this.uiDialog[0] === t || e.contains(this.uiDialog[0], t);
          i || this._focusTabbable();
        }
        t.preventDefault(), i.call(this), this._delay(i);
      },
      _createWrapper: function () {
        (this.uiDialog = e("<div>")
          .addClass(
            "ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " +
              this.options.dialogClass
          )
          .hide()
          .attr({ tabIndex: -1, role: "dialog" })
          .appendTo(this._appendTo())),
          this._on(this.uiDialog, {
            keydown: function (t) {
              if (
                this.options.closeOnEscape &&
                !t.isDefaultPrevented() &&
                t.keyCode &&
                t.keyCode === e.ui.keyCode.ESCAPE
              )
                return t.preventDefault(), this.close(t), void 0;
              if (t.keyCode === e.ui.keyCode.TAB && !t.isDefaultPrevented()) {
                var i = this.uiDialog.find(":tabbable"),
                  s = i.filter(":first"),
                  n = i.filter(":last");
                (t.target !== n[0] && t.target !== this.uiDialog[0]) ||
                t.shiftKey
                  ? (t.target !== s[0] && t.target !== this.uiDialog[0]) ||
                    !t.shiftKey ||
                    (this._delay(function () {
                      n.focus();
                    }),
                    t.preventDefault())
                  : (this._delay(function () {
                      s.focus();
                    }),
                    t.preventDefault());
              }
            },
            mousedown: function (e) {
              this._moveToTop(e) && this._focusTabbable();
            },
          }),
          this.element.find("[aria-describedby]").length ||
            this.uiDialog.attr({
              "aria-describedby": this.element.uniqueId().attr("id"),
            });
      },
      _createTitlebar: function () {
        var t;
        (this.uiDialogTitlebar = e("<div>")
          .addClass(
            "ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"
          )
          .prependTo(this.uiDialog)),
          this._on(this.uiDialogTitlebar, {
            mousedown: function (t) {
              e(t.target).closest(".ui-dialog-titlebar-close") ||
                this.uiDialog.focus();
            },
          }),
          (this.uiDialogTitlebarClose = e("<button type='button'></button>")
            .button({
              label: this.options.closeText,
              icons: { primary: "ui-icon-closethick" },
              text: !1,
            })
            .addClass("ui-dialog-titlebar-close")
            .appendTo(this.uiDialogTitlebar)),
          this._on(this.uiDialogTitlebarClose, {
            click: function (e) {
              e.preventDefault(), this.close(e);
            },
          }),
          (t = e("<span>")
            .uniqueId()
            .addClass("ui-dialog-title")
            .prependTo(this.uiDialogTitlebar)),
          this._title(t),
          this.uiDialog.attr({ "aria-labelledby": t.attr("id") });
      },
      _title: function (e) {
        this.options.title || e.html(" "), e.text(this.options.title);
      },
      _createButtonPane: function () {
        (this.uiDialogButtonPane = e("<div>").addClass(
          "ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"
        )),
          (this.uiButtonSet = e("<div>")
            .addClass("ui-dialog-buttonset")
            .appendTo(this.uiDialogButtonPane)),
          this._createButtons();
      },
      _createButtons: function () {
        var t = this,
          i = this.options.buttons;
        return (
          this.uiDialogButtonPane.remove(),
          this.uiButtonSet.empty(),
          e.isEmptyObject(i) || (e.isArray(i) && !i.length)
            ? (this.uiDialog.removeClass("ui-dialog-buttons"), void 0)
            : (e.each(i, function (i, s) {
                var n, a;
                (s = e.isFunction(s) ? { click: s, text: i } : s),
                  (s = e.extend({ type: "button" }, s)),
                  (n = s.click),
                  (s.click = function () {
                    n.apply(t.element[0], arguments);
                  }),
                  (a = { icons: s.icons, text: s.showText }),
                  delete s.icons,
                  delete s.showText,
                  e("<button></button>", s).button(a).appendTo(t.uiButtonSet);
              }),
              this.uiDialog.addClass("ui-dialog-buttons"),
              this.uiDialogButtonPane.appendTo(this.uiDialog),
              void 0)
        );
      },
      _makeDraggable: function () {
        function t(e) {
          return { position: e.position, offset: e.offset };
        }
        var i = this,
          s = this.options;
        this.uiDialog.draggable({
          cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
          handle: ".ui-dialog-titlebar",
          containment: "document",
          start: function (s, n) {
            e(this).addClass("ui-dialog-dragging"),
              i._blockFrames(),
              i._trigger("dragStart", s, t(n));
          },
          drag: function (e, s) {
            i._trigger("drag", e, t(s));
          },
          stop: function (n, a) {
            var o = a.offset.left - i.document.scrollLeft(),
              r = a.offset.top - i.document.scrollTop();
            (s.position = {
              my: "left top",
              at:
                "left" +
                (o >= 0 ? "+" : "") +
                o +
                " " +
                "top" +
                (r >= 0 ? "+" : "") +
                r,
              of: i.window,
            }),
              e(this).removeClass("ui-dialog-dragging"),
              i._unblockFrames(),
              i._trigger("dragStop", n, t(a));
          },
        });
      },
      _makeResizable: function () {
        function t(e) {
          return {
            originalPosition: e.originalPosition,
            originalSize: e.originalSize,
            position: e.position,
            size: e.size,
          };
        }
        var i = this,
          s = this.options,
          n = s.resizable,
          a = this.uiDialog.css("position"),
          o = "string" == typeof n ? n : "n,e,s,w,se,sw,ne,nw";
        this.uiDialog
          .resizable({
            cancel: ".ui-dialog-content",
            containment: "document",
            alsoResize: this.element,
            maxWidth: s.maxWidth,
            maxHeight: s.maxHeight,
            minWidth: s.minWidth,
            minHeight: this._minHeight(),
            handles: o,
            start: function (s, n) {
              e(this).addClass("ui-dialog-resizing"),
                i._blockFrames(),
                i._trigger("resizeStart", s, t(n));
            },
            resize: function (e, s) {
              i._trigger("resize", e, t(s));
            },
            stop: function (n, a) {
              var o = i.uiDialog.offset(),
                r = o.left - i.document.scrollLeft(),
                h = o.top - i.document.scrollTop();
              (s.height = i.uiDialog.height()),
                (s.width = i.uiDialog.width()),
                (s.position = {
                  my: "left top",
                  at:
                    "left" +
                    (r >= 0 ? "+" : "") +
                    r +
                    " " +
                    "top" +
                    (h >= 0 ? "+" : "") +
                    h,
                  of: i.window,
                }),
                e(this).removeClass("ui-dialog-resizing"),
                i._unblockFrames(),
                i._trigger("resizeStop", n, t(a));
            },
          })
          .css("position", a);
      },
      _trackFocus: function () {
        this._on(this.widget(), {
          focusin: function (t) {
            this._makeFocusTarget(), (this._focusedElement = e(t.target));
          },
        });
      },
      _makeFocusTarget: function () {
        this._untrackInstance(), this._trackingInstances().unshift(this);
      },
      _untrackInstance: function () {
        var t = this._trackingInstances(),
          i = e.inArray(this, t);
        -1 !== i && t.splice(i, 1);
      },
      _trackingInstances: function () {
        var e = this.document.data("ui-dialog-instances");
        return e || ((e = []), this.document.data("ui-dialog-instances", e)), e;
      },
      _minHeight: function () {
        var e = this.options;
        return "auto" === e.height
          ? e.minHeight
          : Math.min(e.minHeight, e.height);
      },
      _position: function () {
        var e = this.uiDialog.is(":visible");
        e || this.uiDialog.show(),
          this.uiDialog.position(this.options.position),
          e || this.uiDialog.hide();
      },
      _setOptions: function (t) {
        var i = this,
          s = !1,
          n = {};
        e.each(t, function (e, t) {
          i._setOption(e, t),
            e in i.sizeRelatedOptions && (s = !0),
            e in i.resizableRelatedOptions && (n[e] = t);
        }),
          s && (this._size(), this._position()),
          this.uiDialog.is(":data(ui-resizable)") &&
            this.uiDialog.resizable("option", n);
      },
      _setOption: function (e, t) {
        var i,
          s,
          n = this.uiDialog;
        "dialogClass" === e &&
          n.removeClass(this.options.dialogClass).addClass(t),
          "disabled" !== e &&
            (this._super(e, t),
            "appendTo" === e && this.uiDialog.appendTo(this._appendTo()),
            "buttons" === e && this._createButtons(),
            "closeText" === e &&
              this.uiDialogTitlebarClose.button({ label: "" + t }),
            "draggable" === e &&
              ((i = n.is(":data(ui-draggable)")),
              i && !t && n.draggable("destroy"),
              !i && t && this._makeDraggable()),
            "position" === e && this._position(),
            "resizable" === e &&
              ((s = n.is(":data(ui-resizable)")),
              s && !t && n.resizable("destroy"),
              s && "string" == typeof t && n.resizable("option", "handles", t),
              s || t === !1 || this._makeResizable()),
            "title" === e &&
              this._title(this.uiDialogTitlebar.find(".ui-dialog-title")));
      },
      _size: function () {
        var e,
          t,
          i,
          s = this.options;
        this.element
          .show()
          .css({ width: "auto", minHeight: 0, maxHeight: "none", height: 0 }),
          s.minWidth > s.width && (s.width = s.minWidth),
          (e = this.uiDialog
            .css({ height: "auto", width: s.width })
            .outerHeight()),
          (t = Math.max(0, s.minHeight - e)),
          (i =
            "number" == typeof s.maxHeight
              ? Math.max(0, s.maxHeight - e)
              : "none"),
          "auto" === s.height
            ? this.element.css({ minHeight: t, maxHeight: i, height: "auto" })
            : this.element.height(Math.max(0, s.height - e)),
          this.uiDialog.is(":data(ui-resizable)") &&
            this.uiDialog.resizable("option", "minHeight", this._minHeight());
      },
      _blockFrames: function () {
        this.iframeBlocks = this.document.find("iframe").map(function () {
          var t = e(this);
          return e("<div>")
            .css({
              position: "absolute",
              width: t.outerWidth(),
              height: t.outerHeight(),
            })
            .appendTo(t.parent())
            .offset(t.offset())[0];
        });
      },
      _unblockFrames: function () {
        this.iframeBlocks &&
          (this.iframeBlocks.remove(), delete this.iframeBlocks);
      },
      _allowInteraction: function (t) {
        return e(t.target).closest(".ui-dialog").length
          ? !0
          : !!e(t.target).closest(".ui-datepicker").length;
      },
      _createOverlay: function () {
        if (this.options.modal) {
          var t = !0;
          this._delay(function () {
            t = !1;
          }),
            this.document.data("ui-dialog-overlays") ||
              this._on(this.document, {
                focusin: function (e) {
                  t ||
                    this._allowInteraction(e) ||
                    (e.preventDefault(),
                    this._trackingInstances()[0]._focusTabbable());
                },
              }),
            (this.overlay = e("<div>")
              .addClass("ui-widget-overlay ui-front")
              .appendTo(this._appendTo())),
            this._on(this.overlay, { mousedown: "_keepFocus" }),
            this.document.data(
              "ui-dialog-overlays",
              (this.document.data("ui-dialog-overlays") || 0) + 1
            );
        }
      },
      _destroyOverlay: function () {
        if (this.options.modal && this.overlay) {
          var e = this.document.data("ui-dialog-overlays") - 1;
          e
            ? this.document.data("ui-dialog-overlays", e)
            : this.document.unbind("focusin").removeData("ui-dialog-overlays"),
            this.overlay.remove(),
            (this.overlay = null);
        }
      },
    }),
    e.widget("ui.droppable", {
      version: "1.11.4",
      widgetEventPrefix: "drop",
      options: {
        accept: "*",
        activeClass: !1,
        addClasses: !0,
        greedy: !1,
        hoverClass: !1,
        scope: "default",
        tolerance: "intersect",
        activate: null,
        deactivate: null,
        drop: null,
        out: null,
        over: null,
      },
      _create: function () {
        var t,
          i = this.options,
          s = i.accept;
        (this.isover = !1),
          (this.isout = !0),
          (this.accept = e.isFunction(s)
            ? s
            : function (e) {
                return e.is(s);
              }),
          (this.proportions = function () {
            return arguments.length
              ? ((t = arguments[0]), void 0)
              : t
              ? t
              : (t = {
                  width: this.element[0].offsetWidth,
                  height: this.element[0].offsetHeight,
                });
          }),
          this._addToManager(i.scope),
          i.addClasses && this.element.addClass("ui-droppable");
      },
      _addToManager: function (t) {
        (e.ui.ddmanager.droppables[t] = e.ui.ddmanager.droppables[t] || []),
          e.ui.ddmanager.droppables[t].push(this);
      },
      _splice: function (e) {
        for (var t = 0; e.length > t; t++) e[t] === this && e.splice(t, 1);
      },
      _destroy: function () {
        var t = e.ui.ddmanager.droppables[this.options.scope];
        this._splice(t),
          this.element.removeClass("ui-droppable ui-droppable-disabled");
      },
      _setOption: function (t, i) {
        if ("accept" === t)
          this.accept = e.isFunction(i)
            ? i
            : function (e) {
                return e.is(i);
              };
        else if ("scope" === t) {
          var s = e.ui.ddmanager.droppables[this.options.scope];
          this._splice(s), this._addToManager(i);
        }
        this._super(t, i);
      },
      _activate: function (t) {
        var i = e.ui.ddmanager.current;
        this.options.activeClass &&
          this.element.addClass(this.options.activeClass),
          i && this._trigger("activate", t, this.ui(i));
      },
      _deactivate: function (t) {
        var i = e.ui.ddmanager.current;
        this.options.activeClass &&
          this.element.removeClass(this.options.activeClass),
          i && this._trigger("deactivate", t, this.ui(i));
      },
      _over: function (t) {
        var i = e.ui.ddmanager.current;
        i &&
          (i.currentItem || i.element)[0] !== this.element[0] &&
          this.accept.call(this.element[0], i.currentItem || i.element) &&
          (this.options.hoverClass &&
            this.element.addClass(this.options.hoverClass),
          this._trigger("over", t, this.ui(i)));
      },
      _out: function (t) {
        var i = e.ui.ddmanager.current;
        i &&
          (i.currentItem || i.element)[0] !== this.element[0] &&
          this.accept.call(this.element[0], i.currentItem || i.element) &&
          (this.options.hoverClass &&
            this.element.removeClass(this.options.hoverClass),
          this._trigger("out", t, this.ui(i)));
      },
      _drop: function (t, i) {
        var s = i || e.ui.ddmanager.current,
          n = !1;
        return s && (s.currentItem || s.element)[0] !== this.element[0]
          ? (this.element
              .find(":data(ui-droppable)")
              .not(".ui-draggable-dragging")
              .each(function () {
                var i = e(this).droppable("instance");
                return i.options.greedy &&
                  !i.options.disabled &&
                  i.options.scope === s.options.scope &&
                  i.accept.call(i.element[0], s.currentItem || s.element) &&
                  e.ui.intersect(
                    s,
                    e.extend(i, { offset: i.element.offset() }),
                    i.options.tolerance,
                    t
                  )
                  ? ((n = !0), !1)
                  : void 0;
              }),
            n
              ? !1
              : this.accept.call(this.element[0], s.currentItem || s.element)
              ? (this.options.activeClass &&
                  this.element.removeClass(this.options.activeClass),
                this.options.hoverClass &&
                  this.element.removeClass(this.options.hoverClass),
                this._trigger("drop", t, this.ui(s)),
                this.element)
              : !1)
          : !1;
      },
      ui: function (e) {
        return {
          draggable: e.currentItem || e.element,
          helper: e.helper,
          position: e.position,
          offset: e.positionAbs,
        };
      },
    }),
    (e.ui.intersect = (function () {
      function e(e, t, i) {
        return e >= t && t + i > e;
      }
      return function (t, i, s, n) {
        if (!i.offset) return !1;
        var a = (t.positionAbs || t.position.absolute).left + t.margins.left,
          o = (t.positionAbs || t.position.absolute).top + t.margins.top,
          r = a + t.helperProportions.width,
          h = o + t.helperProportions.height,
          l = i.offset.left,
          u = i.offset.top,
          d = l + i.proportions().width,
          c = u + i.proportions().height;
        switch (s) {
          case "fit":
            return a >= l && d >= r && o >= u && c >= h;
          case "intersect":
            return (
              a + t.helperProportions.width / 2 > l &&
              d > r - t.helperProportions.width / 2 &&
              o + t.helperProportions.height / 2 > u &&
              c > h - t.helperProportions.height / 2
            );
          case "pointer":
            return (
              e(n.pageY, u, i.proportions().height) &&
              e(n.pageX, l, i.proportions().width)
            );
          case "touch":
            return (
              ((o >= u && c >= o) || (h >= u && c >= h) || (u > o && h > c)) &&
              ((a >= l && d >= a) || (r >= l && d >= r) || (l > a && r > d))
            );
          default:
            return !1;
        }
      };
    })()),
    (e.ui.ddmanager = {
      current: null,
      droppables: { default: [] },
      prepareOffsets: function (t, i) {
        var s,
          n,
          a = e.ui.ddmanager.droppables[t.options.scope] || [],
          o = i ? i.type : null,
          r = (t.currentItem || t.element)
            .find(":data(ui-droppable)")
            .addBack();
        e: for (s = 0; a.length > s; s++)
          if (
            !(
              a[s].options.disabled ||
              (t &&
                !a[s].accept.call(a[s].element[0], t.currentItem || t.element))
            )
          ) {
            for (n = 0; r.length > n; n++)
              if (r[n] === a[s].element[0]) {
                a[s].proportions().height = 0;
                continue e;
              }
            (a[s].visible = "none" !== a[s].element.css("display")),
              a[s].visible &&
                ("mousedown" === o && a[s]._activate.call(a[s], i),
                (a[s].offset = a[s].element.offset()),
                a[s].proportions({
                  width: a[s].element[0].offsetWidth,
                  height: a[s].element[0].offsetHeight,
                }));
          }
      },
      drop: function (t, i) {
        var s = !1;
        return (
          e.each(
            (e.ui.ddmanager.droppables[t.options.scope] || []).slice(),
            function () {
              this.options &&
                (!this.options.disabled &&
                  this.visible &&
                  e.ui.intersect(t, this, this.options.tolerance, i) &&
                  (s = this._drop.call(this, i) || s),
                !this.options.disabled &&
                  this.visible &&
                  this.accept.call(
                    this.element[0],
                    t.currentItem || t.element
                  ) &&
                  ((this.isout = !0),
                  (this.isover = !1),
                  this._deactivate.call(this, i)));
            }
          ),
          s
        );
      },
      dragStart: function (t, i) {
        t.element.parentsUntil("body").bind("scroll.droppable", function () {
          t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i);
        });
      },
      drag: function (t, i) {
        t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, i),
          e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function () {
            if (!this.options.disabled && !this.greedyChild && this.visible) {
              var s,
                n,
                a,
                o = e.ui.intersect(t, this, this.options.tolerance, i),
                r =
                  !o && this.isover
                    ? "isout"
                    : o && !this.isover
                    ? "isover"
                    : null;
              r &&
                (this.options.greedy &&
                  ((n = this.options.scope),
                  (a = this.element
                    .parents(":data(ui-droppable)")
                    .filter(function () {
                      return e(this).droppable("instance").options.scope === n;
                    })),
                  a.length &&
                    ((s = e(a[0]).droppable("instance")),
                    (s.greedyChild = "isover" === r))),
                s &&
                  "isover" === r &&
                  ((s.isover = !1), (s.isout = !0), s._out.call(s, i)),
                (this[r] = !0),
                (this["isout" === r ? "isover" : "isout"] = !1),
                this["isover" === r ? "_over" : "_out"].call(this, i),
                s &&
                  "isout" === r &&
                  ((s.isout = !1), (s.isover = !0), s._over.call(s, i)));
            }
          });
      },
      dragStop: function (t, i) {
        t.element.parentsUntil("body").unbind("scroll.droppable"),
          t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i);
      },
    }),
    e.ui.droppable;
  var y = "ui-effects-",
    b = e;
  (e.effects = { effect: {} }),
    (function (e, t) {
      function i(e, t, i) {
        var s = d[t.type] || {};
        return null == e
          ? i || !t.def
            ? null
            : t.def
          : ((e = s.floor ? ~~e : parseFloat(e)),
            isNaN(e)
              ? t.def
              : s.mod
              ? (e + s.mod) % s.mod
              : 0 > e
              ? 0
              : e > s.max
              ? s.max
              : e);
      }
      function s(i) {
        var s = l(),
          n = (s._rgba = []);
        return (
          (i = i.toLowerCase()),
          f(h, function (e, a) {
            var o,
              r = a.re.exec(i),
              h = r && a.parse(r),
              l = a.space || "rgba";
            return h
              ? ((o = s[l](h)),
                (s[u[l].cache] = o[u[l].cache]),
                (n = s._rgba = o._rgba),
                !1)
              : t;
          }),
          n.length
            ? ("0,0,0,0" === n.join() && e.extend(n, a.transparent), s)
            : a[i]
        );
      }
      function n(e, t, i) {
        return (
          (i = (i + 1) % 1),
          1 > 6 * i
            ? e + 6 * (t - e) * i
            : 1 > 2 * i
            ? t
            : 2 > 3 * i
            ? e + 6 * (t - e) * (2 / 3 - i)
            : e
        );
      }
      var a,
        o =
          "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
        r = /^([\-+])=\s*(\d+\.?\d*)/,
        h = [
          {
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function (e) {
              return [e[1], e[2], e[3], e[4]];
            },
          },
          {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function (e) {
              return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]];
            },
          },
          {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function (e) {
              return [
                parseInt(e[1], 16),
                parseInt(e[2], 16),
                parseInt(e[3], 16),
              ];
            },
          },
          {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function (e) {
              return [
                parseInt(e[1] + e[1], 16),
                parseInt(e[2] + e[2], 16),
                parseInt(e[3] + e[3], 16),
              ];
            },
          },
          {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function (e) {
              return [e[1], e[2] / 100, e[3] / 100, e[4]];
            },
          },
        ],
        l = (e.Color = function (t, i, s, n) {
          return new e.Color.fn.parse(t, i, s, n);
        }),
        u = {
          rgba: {
            props: {
              red: { idx: 0, type: "byte" },
              green: { idx: 1, type: "byte" },
              blue: { idx: 2, type: "byte" },
            },
          },
          hsla: {
            props: {
              hue: { idx: 0, type: "degrees" },
              saturation: { idx: 1, type: "percent" },
              lightness: { idx: 2, type: "percent" },
            },
          },
        },
        d = {
          byte: { floor: !0, max: 255 },
          percent: { max: 1 },
          degrees: { mod: 360, floor: !0 },
        },
        c = (l.support = {}),
        p = e("<p>")[0],
        f = e.each;
      (p.style.cssText = "background-color:rgba(1,1,1,.5)"),
        (c.rgba = p.style.backgroundColor.indexOf("rgba") > -1),
        f(u, function (e, t) {
          (t.cache = "_" + e),
            (t.props.alpha = { idx: 3, type: "percent", def: 1 });
        }),
        (l.fn = e.extend(l.prototype, {
          parse: function (n, o, r, h) {
            if (n === t) return (this._rgba = [null, null, null, null]), this;
            (n.jquery || n.nodeType) && ((n = e(n).css(o)), (o = t));
            var d = this,
              c = e.type(n),
              p = (this._rgba = []);
            return (
              o !== t && ((n = [n, o, r, h]), (c = "array")),
              "string" === c
                ? this.parse(s(n) || a._default)
                : "array" === c
                ? (f(u.rgba.props, function (e, t) {
                    p[t.idx] = i(n[t.idx], t);
                  }),
                  this)
                : "object" === c
                ? (n instanceof l
                    ? f(u, function (e, t) {
                        n[t.cache] && (d[t.cache] = n[t.cache].slice());
                      })
                    : f(u, function (t, s) {
                        var a = s.cache;
                        f(s.props, function (e, t) {
                          if (!d[a] && s.to) {
                            if ("alpha" === e || null == n[e]) return;
                            d[a] = s.to(d._rgba);
                          }
                          d[a][t.idx] = i(n[e], t, !0);
                        }),
                          d[a] &&
                            0 > e.inArray(null, d[a].slice(0, 3)) &&
                            ((d[a][3] = 1), s.from && (d._rgba = s.from(d[a])));
                      }),
                  this)
                : t
            );
          },
          is: function (e) {
            var i = l(e),
              s = !0,
              n = this;
            return (
              f(u, function (e, a) {
                var o,
                  r = i[a.cache];
                return (
                  r &&
                    ((o = n[a.cache] || (a.to && a.to(n._rgba)) || []),
                    f(a.props, function (e, i) {
                      return null != r[i.idx] ? (s = r[i.idx] === o[i.idx]) : t;
                    })),
                  s
                );
              }),
              s
            );
          },
          _space: function () {
            var e = [],
              t = this;
            return (
              f(u, function (i, s) {
                t[s.cache] && e.push(i);
              }),
              e.pop()
            );
          },
          transition: function (e, t) {
            var s = l(e),
              n = s._space(),
              a = u[n],
              o = 0 === this.alpha() ? l("transparent") : this,
              r = o[a.cache] || a.to(o._rgba),
              h = r.slice();
            return (
              (s = s[a.cache]),
              f(a.props, function (e, n) {
                var a = n.idx,
                  o = r[a],
                  l = s[a],
                  u = d[n.type] || {};
                null !== l &&
                  (null === o
                    ? (h[a] = l)
                    : (u.mod &&
                        (l - o > u.mod / 2
                          ? (o += u.mod)
                          : o - l > u.mod / 2 && (o -= u.mod)),
                      (h[a] = i((l - o) * t + o, n))));
              }),
              this[n](h)
            );
          },
          blend: function (t) {
            if (1 === this._rgba[3]) return this;
            var i = this._rgba.slice(),
              s = i.pop(),
              n = l(t)._rgba;
            return l(
              e.map(i, function (e, t) {
                return (1 - s) * n[t] + s * e;
              })
            );
          },
          toRgbaString: function () {
            var t = "rgba(",
              i = e.map(this._rgba, function (e, t) {
                return null == e ? (t > 2 ? 1 : 0) : e;
              });
            return 1 === i[3] && (i.pop(), (t = "rgb(")), t + i.join() + ")";
          },
          toHslaString: function () {
            var t = "hsla(",
              i = e.map(this.hsla(), function (e, t) {
                return (
                  null == e && (e = t > 2 ? 1 : 0),
                  t && 3 > t && (e = Math.round(100 * e) + "%"),
                  e
                );
              });
            return 1 === i[3] && (i.pop(), (t = "hsl(")), t + i.join() + ")";
          },
          toHexString: function (t) {
            var i = this._rgba.slice(),
              s = i.pop();
            return (
              t && i.push(~~(255 * s)),
              "#" +
                e
                  .map(i, function (e) {
                    return (
                      (e = (e || 0).toString(16)), 1 === e.length ? "0" + e : e
                    );
                  })
                  .join("")
            );
          },
          toString: function () {
            return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
          },
        })),
        (l.fn.parse.prototype = l.fn),
        (u.hsla.to = function (e) {
          if (null == e[0] || null == e[1] || null == e[2])
            return [null, null, null, e[3]];
          var t,
            i,
            s = e[0] / 255,
            n = e[1] / 255,
            a = e[2] / 255,
            o = e[3],
            r = Math.max(s, n, a),
            h = Math.min(s, n, a),
            l = r - h,
            u = r + h,
            d = 0.5 * u;
          return (
            (t =
              h === r
                ? 0
                : s === r
                ? (60 * (n - a)) / l + 360
                : n === r
                ? (60 * (a - s)) / l + 120
                : (60 * (s - n)) / l + 240),
            (i = 0 === l ? 0 : 0.5 >= d ? l / u : l / (2 - u)),
            [Math.round(t) % 360, i, d, null == o ? 1 : o]
          );
        }),
        (u.hsla.from = function (e) {
          if (null == e[0] || null == e[1] || null == e[2])
            return [null, null, null, e[3]];
          var t = e[0] / 360,
            i = e[1],
            s = e[2],
            a = e[3],
            o = 0.5 >= s ? s * (1 + i) : s + i - s * i,
            r = 2 * s - o;
          return [
            Math.round(255 * n(r, o, t + 1 / 3)),
            Math.round(255 * n(r, o, t)),
            Math.round(255 * n(r, o, t - 1 / 3)),
            a,
          ];
        }),
        f(u, function (s, n) {
          var a = n.props,
            o = n.cache,
            h = n.to,
            u = n.from;
          (l.fn[s] = function (s) {
            if ((h && !this[o] && (this[o] = h(this._rgba)), s === t))
              return this[o].slice();
            var n,
              r = e.type(s),
              d = "array" === r || "object" === r ? s : arguments,
              c = this[o].slice();
            return (
              f(a, function (e, t) {
                var s = d["object" === r ? e : t.idx];
                null == s && (s = c[t.idx]), (c[t.idx] = i(s, t));
              }),
              u ? ((n = l(u(c))), (n[o] = c), n) : l(c)
            );
          }),
            f(a, function (t, i) {
              l.fn[t] ||
                (l.fn[t] = function (n) {
                  var a,
                    o = e.type(n),
                    h = "alpha" === t ? (this._hsla ? "hsla" : "rgba") : s,
                    l = this[h](),
                    u = l[i.idx];
                  return "undefined" === o
                    ? u
                    : ("function" === o &&
                        ((n = n.call(this, u)), (o = e.type(n))),
                      null == n && i.empty
                        ? this
                        : ("string" === o &&
                            ((a = r.exec(n)),
                            a &&
                              (n =
                                u +
                                parseFloat(a[2]) * ("+" === a[1] ? 1 : -1))),
                          (l[i.idx] = n),
                          this[h](l)));
                });
            });
        }),
        (l.hook = function (t) {
          var i = t.split(" ");
          f(i, function (t, i) {
            (e.cssHooks[i] = {
              set: function (t, n) {
                var a,
                  o,
                  r = "";
                if (
                  "transparent" !== n &&
                  ("string" !== e.type(n) || (a = s(n)))
                ) {
                  if (((n = l(a || n)), !c.rgba && 1 !== n._rgba[3])) {
                    for (
                      o = "backgroundColor" === i ? t.parentNode : t;
                      ("" === r || "transparent" === r) && o && o.style;

                    )
                      try {
                        (r = e.css(o, "backgroundColor")), (o = o.parentNode);
                      } catch (h) {}
                    n = n.blend(r && "transparent" !== r ? r : "_default");
                  }
                  n = n.toRgbaString();
                }
                try {
                  t.style[i] = n;
                } catch (h) {}
              },
            }),
              (e.fx.step[i] = function (t) {
                t.colorInit ||
                  ((t.start = l(t.elem, i)),
                  (t.end = l(t.end)),
                  (t.colorInit = !0)),
                  e.cssHooks[i].set(t.elem, t.start.transition(t.end, t.pos));
              });
          });
        }),
        l.hook(o),
        (e.cssHooks.borderColor = {
          expand: function (e) {
            var t = {};
            return (
              f(["Top", "Right", "Bottom", "Left"], function (i, s) {
                t["border" + s + "Color"] = e;
              }),
              t
            );
          },
        }),
        (a = e.Color.names =
          {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff",
          });
    })(b),
    (function () {
      function t(t) {
        var i,
          s,
          n = t.ownerDocument.defaultView
            ? t.ownerDocument.defaultView.getComputedStyle(t, null)
            : t.currentStyle,
          a = {};
        if (n && n.length && n[0] && n[n[0]])
          for (s = n.length; s--; )
            (i = n[s]), "string" == typeof n[i] && (a[e.camelCase(i)] = n[i]);
        else for (i in n) "string" == typeof n[i] && (a[i] = n[i]);
        return a;
      }
      function i(t, i) {
        var s,
          a,
          o = {};
        for (s in i)
          (a = i[s]),
            t[s] !== a &&
              (n[s] || ((e.fx.step[s] || !isNaN(parseFloat(a))) && (o[s] = a)));
        return o;
      }
      var s = ["add", "remove", "toggle"],
        n = {
          border: 1,
          borderBottom: 1,
          borderColor: 1,
          borderLeft: 1,
          borderRight: 1,
          borderTop: 1,
          borderWidth: 1,
          margin: 1,
          padding: 1,
        };
      e.each(
        [
          "borderLeftStyle",
          "borderRightStyle",
          "borderBottomStyle",
          "borderTopStyle",
        ],
        function (t, i) {
          e.fx.step[i] = function (e) {
            (("none" !== e.end && !e.setAttr) || (1 === e.pos && !e.setAttr)) &&
              (b.style(e.elem, i, e.end), (e.setAttr = !0));
          };
        }
      ),
        e.fn.addBack ||
          (e.fn.addBack = function (e) {
            return this.add(
              null == e ? this.prevObject : this.prevObject.filter(e)
            );
          }),
        (e.effects.animateClass = function (n, a, o, r) {
          var h = e.speed(a, o, r);
          return this.queue(function () {
            var a,
              o = e(this),
              r = o.attr("class") || "",
              l = h.children ? o.find("*").addBack() : o;
            (l = l.map(function () {
              var i = e(this);
              return { el: i, start: t(this) };
            })),
              (a = function () {
                e.each(s, function (e, t) {
                  n[t] && o[t + "Class"](n[t]);
                });
              }),
              a(),
              (l = l.map(function () {
                return (
                  (this.end = t(this.el[0])),
                  (this.diff = i(this.start, this.end)),
                  this
                );
              })),
              o.attr("class", r),
              (l = l.map(function () {
                var t = this,
                  i = e.Deferred(),
                  s = e.extend({}, h, {
                    queue: !1,
                    complete: function () {
                      i.resolve(t);
                    },
                  });
                return this.el.animate(this.diff, s), i.promise();
              })),
              e.when.apply(e, l.get()).done(function () {
                a(),
                  e.each(arguments, function () {
                    var t = this.el;
                    e.each(this.diff, function (e) {
                      t.css(e, "");
                    });
                  }),
                  h.complete.call(o[0]);
              });
          });
        }),
        e.fn.extend({
          addClass: (function (t) {
            return function (i, s, n, a) {
              return s
                ? e.effects.animateClass.call(this, { add: i }, s, n, a)
                : t.apply(this, arguments);
            };
          })(e.fn.addClass),
          removeClass: (function (t) {
            return function (i, s, n, a) {
              return arguments.length > 1
                ? e.effects.animateClass.call(this, { remove: i }, s, n, a)
                : t.apply(this, arguments);
            };
          })(e.fn.removeClass),
          toggleClass: (function (t) {
            return function (i, s, n, a, o) {
              return "boolean" == typeof s || void 0 === s
                ? n
                  ? e.effects.animateClass.call(
                      this,
                      s ? { add: i } : { remove: i },
                      n,
                      a,
                      o
                    )
                  : t.apply(this, arguments)
                : e.effects.animateClass.call(this, { toggle: i }, s, n, a);
            };
          })(e.fn.toggleClass),
          switchClass: function (t, i, s, n, a) {
            return e.effects.animateClass.call(
              this,
              { add: i, remove: t },
              s,
              n,
              a
            );
          },
        });
    })(),
    (function () {
      function t(t, i, s, n) {
        return (
          e.isPlainObject(t) && ((i = t), (t = t.effect)),
          (t = { effect: t }),
          null == i && (i = {}),
          e.isFunction(i) && ((n = i), (s = null), (i = {})),
          ("number" == typeof i || e.fx.speeds[i]) &&
            ((n = s), (s = i), (i = {})),
          e.isFunction(s) && ((n = s), (s = null)),
          i && e.extend(t, i),
          (s = s || i.duration),
          (t.duration = e.fx.off
            ? 0
            : "number" == typeof s
            ? s
            : s in e.fx.speeds
            ? e.fx.speeds[s]
            : e.fx.speeds._default),
          (t.complete = n || i.complete),
          t
        );
      }
      function i(t) {
        return !t || "number" == typeof t || e.fx.speeds[t]
          ? !0
          : "string" != typeof t || e.effects.effect[t]
          ? e.isFunction(t)
            ? !0
            : "object" != typeof t || t.effect
            ? !1
            : !0
          : !0;
      }
      e.extend(e.effects, {
        version: "1.11.4",
        save: function (e, t) {
          for (var i = 0; t.length > i; i++)
            null !== t[i] && e.data(y + t[i], e[0].style[t[i]]);
        },
        restore: function (e, t) {
          var i, s;
          for (s = 0; t.length > s; s++)
            null !== t[s] &&
              ((i = e.data(y + t[s])),
              void 0 === i && (i = ""),
              e.css(t[s], i));
        },
        setMode: function (e, t) {
          return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"), t;
        },
        getBaseline: function (e, t) {
          var i, s;
          switch (e[0]) {
            case "top":
              i = 0;
              break;
            case "middle":
              i = 0.5;
              break;
            case "bottom":
              i = 1;
              break;
            default:
              i = e[0] / t.height;
          }
          switch (e[1]) {
            case "left":
              s = 0;
              break;
            case "center":
              s = 0.5;
              break;
            case "right":
              s = 1;
              break;
            default:
              s = e[1] / t.width;
          }
          return { x: s, y: i };
        },
        createWrapper: function (t) {
          if (t.parent().is(".ui-effects-wrapper")) return t.parent();
          var i = {
              width: t.outerWidth(!0),
              height: t.outerHeight(!0),
              float: t.css("float"),
            },
            s = e("<div></div>")
              .addClass("ui-effects-wrapper")
              .css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0,
              }),
            n = { width: t.width(), height: t.height() },
            a = document.activeElement;
          try {
            a.id;
          } catch (o) {
            a = document.body;
          }
          return (
            t.wrap(s),
            (t[0] === a || e.contains(t[0], a)) && e(a).focus(),
            (s = t.parent()),
            "static" === t.css("position")
              ? (s.css({ position: "relative" }),
                t.css({ position: "relative" }))
              : (e.extend(i, {
                  position: t.css("position"),
                  zIndex: t.css("z-index"),
                }),
                e.each(["top", "left", "bottom", "right"], function (e, s) {
                  (i[s] = t.css(s)),
                    isNaN(parseInt(i[s], 10)) && (i[s] = "auto");
                }),
                t.css({
                  position: "relative",
                  top: 0,
                  left: 0,
                  right: "auto",
                  bottom: "auto",
                })),
            t.css(n),
            s.css(i).show()
          );
        },
        removeWrapper: function (t) {
          var i = document.activeElement;
          return (
            t.parent().is(".ui-effects-wrapper") &&
              (t.parent().replaceWith(t),
              (t[0] === i || e.contains(t[0], i)) && e(i).focus()),
            t
          );
        },
        setTransition: function (t, i, s, n) {
          return (
            (n = n || {}),
            e.each(i, function (e, i) {
              var a = t.cssUnit(i);
              a[0] > 0 && (n[i] = a[0] * s + a[1]);
            }),
            n
          );
        },
      }),
        e.fn.extend({
          effect: function () {
            function i(t) {
              function i() {
                e.isFunction(a) && a.call(n[0]), e.isFunction(t) && t();
              }
              var n = e(this),
                a = s.complete,
                r = s.mode;
              (n.is(":hidden") ? "hide" === r : "show" === r)
                ? (n[r](), i())
                : o.call(n[0], s, i);
            }
            var s = t.apply(this, arguments),
              n = s.mode,
              a = s.queue,
              o = e.effects.effect[s.effect];
            return e.fx.off || !o
              ? n
                ? this[n](s.duration, s.complete)
                : this.each(function () {
                    s.complete && s.complete.call(this);
                  })
              : a === !1
              ? this.each(i)
              : this.queue(a || "fx", i);
          },
          show: (function (e) {
            return function (s) {
              if (i(s)) return e.apply(this, arguments);
              var n = t.apply(this, arguments);
              return (n.mode = "show"), this.effect.call(this, n);
            };
          })(e.fn.show),
          hide: (function (e) {
            return function (s) {
              if (i(s)) return e.apply(this, arguments);
              var n = t.apply(this, arguments);
              return (n.mode = "hide"), this.effect.call(this, n);
            };
          })(e.fn.hide),
          toggle: (function (e) {
            return function (s) {
              if (i(s) || "boolean" == typeof s)
                return e.apply(this, arguments);
              var n = t.apply(this, arguments);
              return (n.mode = "toggle"), this.effect.call(this, n);
            };
          })(e.fn.toggle),
          cssUnit: function (t) {
            var i = this.css(t),
              s = [];
            return (
              e.each(["em", "px", "%", "pt"], function (e, t) {
                i.indexOf(t) > 0 && (s = [parseFloat(i), t]);
              }),
              s
            );
          },
        });
    })(),
    (function () {
      var t = {};
      e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (e, i) {
        t[i] = function (t) {
          return Math.pow(t, e + 2);
        };
      }),
        e.extend(t, {
          Sine: function (e) {
            return 1 - Math.cos((e * Math.PI) / 2);
          },
          Circ: function (e) {
            return 1 - Math.sqrt(1 - e * e);
          },
          Elastic: function (e) {
            return 0 === e || 1 === e
              ? e
              : -Math.pow(2, 8 * (e - 1)) *
                  Math.sin(((80 * (e - 1) - 7.5) * Math.PI) / 15);
          },
          Back: function (e) {
            return e * e * (3 * e - 2);
          },
          Bounce: function (e) {
            for (var t, i = 4; ((t = Math.pow(2, --i)) - 1) / 11 > e; );
            return (
              1 / Math.pow(4, 3 - i) -
              7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
            );
          },
        }),
        e.each(t, function (t, i) {
          (e.easing["easeIn" + t] = i),
            (e.easing["easeOut" + t] = function (e) {
              return 1 - i(1 - e);
            }),
            (e.easing["easeInOut" + t] = function (e) {
              return 0.5 > e ? i(2 * e) / 2 : 1 - i(-2 * e + 2) / 2;
            });
        });
    })(),
    e.effects,
    (e.effects.effect.blind = function (t, i) {
      var s,
        n,
        a,
        o = e(this),
        r = /up|down|vertical/,
        h = /up|left|vertical|horizontal/,
        l = ["position", "top", "bottom", "left", "right", "height", "width"],
        u = e.effects.setMode(o, t.mode || "hide"),
        d = t.direction || "up",
        c = r.test(d),
        p = c ? "height" : "width",
        f = c ? "top" : "left",
        m = h.test(d),
        g = {},
        v = "show" === u;
      o.parent().is(".ui-effects-wrapper")
        ? e.effects.save(o.parent(), l)
        : e.effects.save(o, l),
        o.show(),
        (s = e.effects.createWrapper(o).css({ overflow: "hidden" })),
        (n = s[p]()),
        (a = parseFloat(s.css(f)) || 0),
        (g[p] = v ? n : 0),
        m ||
          (o
            .css(c ? "bottom" : "right", 0)
            .css(c ? "top" : "left", "auto")
            .css({ position: "absolute" }),
          (g[f] = v ? a : n + a)),
        v && (s.css(p, 0), m || s.css(f, a + n)),
        s.animate(g, {
          duration: t.duration,
          easing: t.easing,
          queue: !1,
          complete: function () {
            "hide" === u && o.hide(),
              e.effects.restore(o, l),
              e.effects.removeWrapper(o),
              i();
          },
        });
    }),
    (e.effects.effect.bounce = function (t, i) {
      var s,
        n,
        a,
        o = e(this),
        r = ["position", "top", "bottom", "left", "right", "height", "width"],
        h = e.effects.setMode(o, t.mode || "effect"),
        l = "hide" === h,
        u = "show" === h,
        d = t.direction || "up",
        c = t.distance,
        p = t.times || 5,
        f = 2 * p + (u || l ? 1 : 0),
        m = t.duration / f,
        g = t.easing,
        v = "up" === d || "down" === d ? "top" : "left",
        y = "up" === d || "left" === d,
        b = o.queue(),
        _ = b.length;
      for (
        (u || l) && r.push("opacity"),
          e.effects.save(o, r),
          o.show(),
          e.effects.createWrapper(o),
          c || (c = o["top" === v ? "outerHeight" : "outerWidth"]() / 3),
          u &&
            ((a = { opacity: 1 }),
            (a[v] = 0),
            o
              .css("opacity", 0)
              .css(v, y ? 2 * -c : 2 * c)
              .animate(a, m, g)),
          l && (c /= Math.pow(2, p - 1)),
          a = {},
          a[v] = 0,
          s = 0;
        p > s;
        s++
      )
        (n = {}),
          (n[v] = (y ? "-=" : "+=") + c),
          o.animate(n, m, g).animate(a, m, g),
          (c = l ? 2 * c : c / 2);
      l &&
        ((n = { opacity: 0 }),
        (n[v] = (y ? "-=" : "+=") + c),
        o.animate(n, m, g)),
        o.queue(function () {
          l && o.hide(),
            e.effects.restore(o, r),
            e.effects.removeWrapper(o),
            i();
        }),
        _ > 1 && b.splice.apply(b, [1, 0].concat(b.splice(_, f + 1))),
        o.dequeue();
    }),
    (e.effects.effect.clip = function (t, i) {
      var s,
        n,
        a,
        o = e(this),
        r = ["position", "top", "bottom", "left", "right", "height", "width"],
        h = e.effects.setMode(o, t.mode || "hide"),
        l = "show" === h,
        u = t.direction || "vertical",
        d = "vertical" === u,
        c = d ? "height" : "width",
        p = d ? "top" : "left",
        f = {};
      e.effects.save(o, r),
        o.show(),
        (s = e.effects.createWrapper(o).css({ overflow: "hidden" })),
        (n = "IMG" === o[0].tagName ? s : o),
        (a = n[c]()),
        l && (n.css(c, 0), n.css(p, a / 2)),
        (f[c] = l ? a : 0),
        (f[p] = l ? 0 : a / 2),
        n.animate(f, {
          queue: !1,
          duration: t.duration,
          easing: t.easing,
          complete: function () {
            l || o.hide(),
              e.effects.restore(o, r),
              e.effects.removeWrapper(o),
              i();
          },
        });
    }),
    (e.effects.effect.drop = function (t, i) {
      var s,
        n = e(this),
        a = [
          "position",
          "top",
          "bottom",
          "left",
          "right",
          "opacity",
          "height",
          "width",
        ],
        o = e.effects.setMode(n, t.mode || "hide"),
        r = "show" === o,
        h = t.direction || "left",
        l = "up" === h || "down" === h ? "top" : "left",
        u = "up" === h || "left" === h ? "pos" : "neg",
        d = { opacity: r ? 1 : 0 };
      e.effects.save(n, a),
        n.show(),
        e.effects.createWrapper(n),
        (s =
          t.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0) / 2),
        r && n.css("opacity", 0).css(l, "pos" === u ? -s : s),
        (d[l] =
          (r ? ("pos" === u ? "+=" : "-=") : "pos" === u ? "-=" : "+=") + s),
        n.animate(d, {
          queue: !1,
          duration: t.duration,
          easing: t.easing,
          complete: function () {
            "hide" === o && n.hide(),
              e.effects.restore(n, a),
              e.effects.removeWrapper(n),
              i();
          },
        });
    }),
    (e.effects.effect.explode = function (t, i) {
      function s() {
        b.push(this), b.length === d * c && n();
      }
      function n() {
        p.css({ visibility: "visible" }), e(b).remove(), m || p.hide(), i();
      }
      var a,
        o,
        r,
        h,
        l,
        u,
        d = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3,
        c = d,
        p = e(this),
        f = e.effects.setMode(p, t.mode || "hide"),
        m = "show" === f,
        g = p.show().css("visibility", "hidden").offset(),
        v = Math.ceil(p.outerWidth() / c),
        y = Math.ceil(p.outerHeight() / d),
        b = [];
      for (a = 0; d > a; a++)
        for (h = g.top + a * y, u = a - (d - 1) / 2, o = 0; c > o; o++)
          (r = g.left + o * v),
            (l = o - (c - 1) / 2),
            p
              .clone()
              .appendTo("body")
              .wrap("<div></div>")
              .css({
                position: "absolute",
                visibility: "visible",
                left: -o * v,
                top: -a * y,
              })
              .parent()
              .addClass("ui-effects-explode")
              .css({
                position: "absolute",
                overflow: "hidden",
                width: v,
                height: y,
                left: r + (m ? l * v : 0),
                top: h + (m ? u * y : 0),
                opacity: m ? 0 : 1,
              })
              .animate(
                {
                  left: r + (m ? 0 : l * v),
                  top: h + (m ? 0 : u * y),
                  opacity: m ? 1 : 0,
                },
                t.duration || 500,
                t.easing,
                s
              );
    }),
    (e.effects.effect.fade = function (t, i) {
      var s = e(this),
        n = e.effects.setMode(s, t.mode || "toggle");
      s.animate(
        { opacity: n },
        { queue: !1, duration: t.duration, easing: t.easing, complete: i }
      );
    }),
    (e.effects.effect.fold = function (t, i) {
      var s,
        n,
        a = e(this),
        o = ["position", "top", "bottom", "left", "right", "height", "width"],
        r = e.effects.setMode(a, t.mode || "hide"),
        h = "show" === r,
        l = "hide" === r,
        u = t.size || 15,
        d = /([0-9]+)%/.exec(u),
        c = !!t.horizFirst,
        p = h !== c,
        f = p ? ["width", "height"] : ["height", "width"],
        m = t.duration / 2,
        g = {},
        v = {};
      e.effects.save(a, o),
        a.show(),
        (s = e.effects.createWrapper(a).css({ overflow: "hidden" })),
        (n = p ? [s.width(), s.height()] : [s.height(), s.width()]),
        d && (u = (parseInt(d[1], 10) / 100) * n[l ? 0 : 1]),
        h && s.css(c ? { height: 0, width: u } : { height: u, width: 0 }),
        (g[f[0]] = h ? n[0] : u),
        (v[f[1]] = h ? n[1] : 0),
        s.animate(g, m, t.easing).animate(v, m, t.easing, function () {
          l && a.hide(),
            e.effects.restore(a, o),
            e.effects.removeWrapper(a),
            i();
        });
    }),
    (e.effects.effect.highlight = function (t, i) {
      var s = e(this),
        n = ["backgroundImage", "backgroundColor", "opacity"],
        a = e.effects.setMode(s, t.mode || "show"),
        o = { backgroundColor: s.css("backgroundColor") };
      "hide" === a && (o.opacity = 0),
        e.effects.save(s, n),
        s
          .show()
          .css({
            backgroundImage: "none",
            backgroundColor: t.color || "#ffff99",
          })
          .animate(o, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function () {
              "hide" === a && s.hide(), e.effects.restore(s, n), i();
            },
          });
    }),
    (e.effects.effect.size = function (t, i) {
      var s,
        n,
        a,
        o = e(this),
        r = [
          "position",
          "top",
          "bottom",
          "left",
          "right",
          "width",
          "height",
          "overflow",
          "opacity",
        ],
        h = [
          "position",
          "top",
          "bottom",
          "left",
          "right",
          "overflow",
          "opacity",
        ],
        l = ["width", "height", "overflow"],
        u = ["fontSize"],
        d = [
          "borderTopWidth",
          "borderBottomWidth",
          "paddingTop",
          "paddingBottom",
        ],
        c = [
          "borderLeftWidth",
          "borderRightWidth",
          "paddingLeft",
          "paddingRight",
        ],
        p = e.effects.setMode(o, t.mode || "effect"),
        f = t.restore || "effect" !== p,
        m = t.scale || "both",
        g = t.origin || ["middle", "center"],
        v = o.css("position"),
        y = f ? r : h,
        b = { height: 0, width: 0, outerHeight: 0, outerWidth: 0 };
      "show" === p && o.show(),
        (s = {
          height: o.height(),
          width: o.width(),
          outerHeight: o.outerHeight(),
          outerWidth: o.outerWidth(),
        }),
        "toggle" === t.mode && "show" === p
          ? ((o.from = t.to || b), (o.to = t.from || s))
          : ((o.from = t.from || ("show" === p ? b : s)),
            (o.to = t.to || ("hide" === p ? b : s))),
        (a = {
          from: { y: o.from.height / s.height, x: o.from.width / s.width },
          to: { y: o.to.height / s.height, x: o.to.width / s.width },
        }),
        ("box" === m || "both" === m) &&
          (a.from.y !== a.to.y &&
            ((y = y.concat(d)),
            (o.from = e.effects.setTransition(o, d, a.from.y, o.from)),
            (o.to = e.effects.setTransition(o, d, a.to.y, o.to))),
          a.from.x !== a.to.x &&
            ((y = y.concat(c)),
            (o.from = e.effects.setTransition(o, c, a.from.x, o.from)),
            (o.to = e.effects.setTransition(o, c, a.to.x, o.to)))),
        ("content" === m || "both" === m) &&
          a.from.y !== a.to.y &&
          ((y = y.concat(u).concat(l)),
          (o.from = e.effects.setTransition(o, u, a.from.y, o.from)),
          (o.to = e.effects.setTransition(o, u, a.to.y, o.to))),
        e.effects.save(o, y),
        o.show(),
        e.effects.createWrapper(o),
        o.css("overflow", "hidden").css(o.from),
        g &&
          ((n = e.effects.getBaseline(g, s)),
          (o.from.top = (s.outerHeight - o.outerHeight()) * n.y),
          (o.from.left = (s.outerWidth - o.outerWidth()) * n.x),
          (o.to.top = (s.outerHeight - o.to.outerHeight) * n.y),
          (o.to.left = (s.outerWidth - o.to.outerWidth) * n.x)),
        o.css(o.from),
        ("content" === m || "both" === m) &&
          ((d = d.concat(["marginTop", "marginBottom"]).concat(u)),
          (c = c.concat(["marginLeft", "marginRight"])),
          (l = r.concat(d).concat(c)),
          o.find("*[width]").each(function () {
            var i = e(this),
              s = {
                height: i.height(),
                width: i.width(),
                outerHeight: i.outerHeight(),
                outerWidth: i.outerWidth(),
              };
            f && e.effects.save(i, l),
              (i.from = {
                height: s.height * a.from.y,
                width: s.width * a.from.x,
                outerHeight: s.outerHeight * a.from.y,
                outerWidth: s.outerWidth * a.from.x,
              }),
              (i.to = {
                height: s.height * a.to.y,
                width: s.width * a.to.x,
                outerHeight: s.height * a.to.y,
                outerWidth: s.width * a.to.x,
              }),
              a.from.y !== a.to.y &&
                ((i.from = e.effects.setTransition(i, d, a.from.y, i.from)),
                (i.to = e.effects.setTransition(i, d, a.to.y, i.to))),
              a.from.x !== a.to.x &&
                ((i.from = e.effects.setTransition(i, c, a.from.x, i.from)),
                (i.to = e.effects.setTransition(i, c, a.to.x, i.to))),
              i.css(i.from),
              i.animate(i.to, t.duration, t.easing, function () {
                f && e.effects.restore(i, l);
              });
          })),
        o.animate(o.to, {
          queue: !1,
          duration: t.duration,
          easing: t.easing,
          complete: function () {
            0 === o.to.opacity && o.css("opacity", o.from.opacity),
              "hide" === p && o.hide(),
              e.effects.restore(o, y),
              f ||
                ("static" === v
                  ? o.css({
                      position: "relative",
                      top: o.to.top,
                      left: o.to.left,
                    })
                  : e.each(["top", "left"], function (e, t) {
                      o.css(t, function (t, i) {
                        var s = parseInt(i, 10),
                          n = e ? o.to.left : o.to.top;
                        return "auto" === i ? n + "px" : s + n + "px";
                      });
                    })),
              e.effects.removeWrapper(o),
              i();
          },
        });
    }),
    (e.effects.effect.scale = function (t, i) {
      var s = e(this),
        n = e.extend(!0, {}, t),
        a = e.effects.setMode(s, t.mode || "effect"),
        o =
          parseInt(t.percent, 10) ||
          (0 === parseInt(t.percent, 10) ? 0 : "hide" === a ? 0 : 100),
        r = t.direction || "both",
        h = t.origin,
        l = {
          height: s.height(),
          width: s.width(),
          outerHeight: s.outerHeight(),
          outerWidth: s.outerWidth(),
        },
        u = {
          y: "horizontal" !== r ? o / 100 : 1,
          x: "vertical" !== r ? o / 100 : 1,
        };
      (n.effect = "size"),
        (n.queue = !1),
        (n.complete = i),
        "effect" !== a &&
          ((n.origin = h || ["middle", "center"]), (n.restore = !0)),
        (n.from =
          t.from ||
          ("show" === a
            ? { height: 0, width: 0, outerHeight: 0, outerWidth: 0 }
            : l)),
        (n.to = {
          height: l.height * u.y,
          width: l.width * u.x,
          outerHeight: l.outerHeight * u.y,
          outerWidth: l.outerWidth * u.x,
        }),
        n.fade &&
          ("show" === a && ((n.from.opacity = 0), (n.to.opacity = 1)),
          "hide" === a && ((n.from.opacity = 1), (n.to.opacity = 0))),
        s.effect(n);
    }),
    (e.effects.effect.puff = function (t, i) {
      var s = e(this),
        n = e.effects.setMode(s, t.mode || "hide"),
        a = "hide" === n,
        o = parseInt(t.percent, 10) || 150,
        r = o / 100,
        h = {
          height: s.height(),
          width: s.width(),
          outerHeight: s.outerHeight(),
          outerWidth: s.outerWidth(),
        };
      e.extend(t, {
        effect: "scale",
        queue: !1,
        fade: !0,
        mode: n,
        complete: i,
        percent: a ? o : 100,
        from: a
          ? h
          : {
              height: h.height * r,
              width: h.width * r,
              outerHeight: h.outerHeight * r,
              outerWidth: h.outerWidth * r,
            },
      }),
        s.effect(t);
    }),
    (e.effects.effect.pulsate = function (t, i) {
      var s,
        n = e(this),
        a = e.effects.setMode(n, t.mode || "show"),
        o = "show" === a,
        r = "hide" === a,
        h = o || "hide" === a,
        l = 2 * (t.times || 5) + (h ? 1 : 0),
        u = t.duration / l,
        d = 0,
        c = n.queue(),
        p = c.length;
      for (
        (o || !n.is(":visible")) && (n.css("opacity", 0).show(), (d = 1)),
          s = 1;
        l > s;
        s++
      )
        n.animate({ opacity: d }, u, t.easing), (d = 1 - d);
      n.animate({ opacity: d }, u, t.easing),
        n.queue(function () {
          r && n.hide(), i();
        }),
        p > 1 && c.splice.apply(c, [1, 0].concat(c.splice(p, l + 1))),
        n.dequeue();
    }),
    (e.effects.effect.shake = function (t, i) {
      var s,
        n = e(this),
        a = ["position", "top", "bottom", "left", "right", "height", "width"],
        o = e.effects.setMode(n, t.mode || "effect"),
        r = t.direction || "left",
        h = t.distance || 20,
        l = t.times || 3,
        u = 2 * l + 1,
        d = Math.round(t.duration / u),
        c = "up" === r || "down" === r ? "top" : "left",
        p = "up" === r || "left" === r,
        f = {},
        m = {},
        g = {},
        v = n.queue(),
        y = v.length;
      for (
        e.effects.save(n, a),
          n.show(),
          e.effects.createWrapper(n),
          f[c] = (p ? "-=" : "+=") + h,
          m[c] = (p ? "+=" : "-=") + 2 * h,
          g[c] = (p ? "-=" : "+=") + 2 * h,
          n.animate(f, d, t.easing),
          s = 1;
        l > s;
        s++
      )
        n.animate(m, d, t.easing).animate(g, d, t.easing);
      n
        .animate(m, d, t.easing)
        .animate(f, d / 2, t.easing)
        .queue(function () {
          "hide" === o && n.hide(),
            e.effects.restore(n, a),
            e.effects.removeWrapper(n),
            i();
        }),
        y > 1 && v.splice.apply(v, [1, 0].concat(v.splice(y, u + 1))),
        n.dequeue();
    }),
    (e.effects.effect.slide = function (t, i) {
      var s,
        n = e(this),
        a = ["position", "top", "bottom", "left", "right", "width", "height"],
        o = e.effects.setMode(n, t.mode || "show"),
        r = "show" === o,
        h = t.direction || "left",
        l = "up" === h || "down" === h ? "top" : "left",
        u = "up" === h || "left" === h,
        d = {};
      e.effects.save(n, a),
        n.show(),
        (s = t.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0)),
        e.effects.createWrapper(n).css({ overflow: "hidden" }),
        r && n.css(l, u ? (isNaN(s) ? "-" + s : -s) : s),
        (d[l] = (r ? (u ? "+=" : "-=") : u ? "-=" : "+=") + s),
        n.animate(d, {
          queue: !1,
          duration: t.duration,
          easing: t.easing,
          complete: function () {
            "hide" === o && n.hide(),
              e.effects.restore(n, a),
              e.effects.removeWrapper(n),
              i();
          },
        });
    }),
    (e.effects.effect.transfer = function (t, i) {
      var s = e(this),
        n = e(t.to),
        a = "fixed" === n.css("position"),
        o = e("body"),
        r = a ? o.scrollTop() : 0,
        h = a ? o.scrollLeft() : 0,
        l = n.offset(),
        u = {
          top: l.top - r,
          left: l.left - h,
          height: n.innerHeight(),
          width: n.innerWidth(),
        },
        d = s.offset(),
        c = e("<div class='ui-effects-transfer'></div>")
          .appendTo(document.body)
          .addClass(t.className)
          .css({
            top: d.top - r,
            left: d.left - h,
            height: s.innerHeight(),
            width: s.innerWidth(),
            position: a ? "fixed" : "absolute",
          })
          .animate(u, t.duration, t.easing, function () {
            c.remove(), i();
          });
    }),
    e.widget("ui.progressbar", {
      version: "1.11.4",
      options: { max: 100, value: 0, change: null, complete: null },
      min: 0,
      _create: function () {
        (this.oldValue = this.options.value = this._constrainedValue()),
          this.element
            .addClass(
              "ui-progressbar ui-widget ui-widget-content ui-corner-all"
            )
            .attr({ role: "progressbar", "aria-valuemin": this.min }),
          (this.valueDiv = e(
            "<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>"
          ).appendTo(this.element)),
          this._refreshValue();
      },
      _destroy: function () {
        this.element
          .removeClass(
            "ui-progressbar ui-widget ui-widget-content ui-corner-all"
          )
          .removeAttr("role")
          .removeAttr("aria-valuemin")
          .removeAttr("aria-valuemax")
          .removeAttr("aria-valuenow"),
          this.valueDiv.remove();
      },
      value: function (e) {
        return void 0 === e
          ? this.options.value
          : ((this.options.value = this._constrainedValue(e)),
            this._refreshValue(),
            void 0);
      },
      _constrainedValue: function (e) {
        return (
          void 0 === e && (e = this.options.value),
          (this.indeterminate = e === !1),
          "number" != typeof e && (e = 0),
          this.indeterminate
            ? !1
            : Math.min(this.options.max, Math.max(this.min, e))
        );
      },
      _setOptions: function (e) {
        var t = e.value;
        delete e.value,
          this._super(e),
          (this.options.value = this._constrainedValue(t)),
          this._refreshValue();
      },
      _setOption: function (e, t) {
        "max" === e && (t = Math.max(this.min, t)),
          "disabled" === e &&
            this.element
              .toggleClass("ui-state-disabled", !!t)
              .attr("aria-disabled", t),
          this._super(e, t);
      },
      _percentage: function () {
        return this.indeterminate
          ? 100
          : (100 * (this.options.value - this.min)) /
              (this.options.max - this.min);
      },
      _refreshValue: function () {
        var t = this.options.value,
          i = this._percentage();
        this.valueDiv
          .toggle(this.indeterminate || t > this.min)
          .toggleClass("ui-corner-right", t === this.options.max)
          .width(i.toFixed(0) + "%"),
          this.element.toggleClass(
            "ui-progressbar-indeterminate",
            this.indeterminate
          ),
          this.indeterminate
            ? (this.element.removeAttr("aria-valuenow"),
              this.overlayDiv ||
                (this.overlayDiv = e(
                  "<div class='ui-progressbar-overlay'></div>"
                ).appendTo(this.valueDiv)))
            : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": t,
              }),
              this.overlayDiv &&
                (this.overlayDiv.remove(), (this.overlayDiv = null))),
          this.oldValue !== t && ((this.oldValue = t), this._trigger("change")),
          t === this.options.max && this._trigger("complete");
      },
    }),
    e.widget("ui.selectable", e.ui.mouse, {
      version: "1.11.4",
      options: {
        appendTo: "body",
        autoRefresh: !0,
        distance: 0,
        filter: "*",
        tolerance: "touch",
        selected: null,
        selecting: null,
        start: null,
        stop: null,
        unselected: null,
        unselecting: null,
      },
      _create: function () {
        var t,
          i = this;
        this.element.addClass("ui-selectable"),
          (this.dragged = !1),
          (this.refresh = function () {
            (t = e(i.options.filter, i.element[0])),
              t.addClass("ui-selectee"),
              t.each(function () {
                var t = e(this),
                  i = t.offset();
                e.data(this, "selectable-item", {
                  element: this,
                  $element: t,
                  left: i.left,
                  top: i.top,
                  right: i.left + t.outerWidth(),
                  bottom: i.top + t.outerHeight(),
                  startselected: !1,
                  selected: t.hasClass("ui-selected"),
                  selecting: t.hasClass("ui-selecting"),
                  unselecting: t.hasClass("ui-unselecting"),
                });
              });
          }),
          this.refresh(),
          (this.selectees = t.addClass("ui-selectee")),
          this._mouseInit(),
          (this.helper = e("<div class='ui-selectable-helper'></div>"));
      },
      _destroy: function () {
        this.selectees.removeClass("ui-selectee").removeData("selectable-item"),
          this.element.removeClass("ui-selectable ui-selectable-disabled"),
          this._mouseDestroy();
      },
      _mouseStart: function (t) {
        var i = this,
          s = this.options;
        (this.opos = [t.pageX, t.pageY]),
          this.options.disabled ||
            ((this.selectees = e(s.filter, this.element[0])),
            this._trigger("start", t),
            e(s.appendTo).append(this.helper),
            this.helper.css({
              left: t.pageX,
              top: t.pageY,
              width: 0,
              height: 0,
            }),
            s.autoRefresh && this.refresh(),
            this.selectees.filter(".ui-selected").each(function () {
              var s = e.data(this, "selectable-item");
              (s.startselected = !0),
                t.metaKey ||
                  t.ctrlKey ||
                  (s.$element.removeClass("ui-selected"),
                  (s.selected = !1),
                  s.$element.addClass("ui-unselecting"),
                  (s.unselecting = !0),
                  i._trigger("unselecting", t, { unselecting: s.element }));
            }),
            e(t.target)
              .parents()
              .addBack()
              .each(function () {
                var s,
                  n = e.data(this, "selectable-item");
                return n
                  ? ((s =
                      (!t.metaKey && !t.ctrlKey) ||
                      !n.$element.hasClass("ui-selected")),
                    n.$element
                      .removeClass(s ? "ui-unselecting" : "ui-selected")
                      .addClass(s ? "ui-selecting" : "ui-unselecting"),
                    (n.unselecting = !s),
                    (n.selecting = s),
                    (n.selected = s),
                    s
                      ? i._trigger("selecting", t, { selecting: n.element })
                      : i._trigger("unselecting", t, {
                          unselecting: n.element,
                        }),
                    !1)
                  : void 0;
              }));
      },
      _mouseDrag: function (t) {
        if (((this.dragged = !0), !this.options.disabled)) {
          var i,
            s = this,
            n = this.options,
            a = this.opos[0],
            o = this.opos[1],
            r = t.pageX,
            h = t.pageY;
          return (
            a > r && ((i = r), (r = a), (a = i)),
            o > h && ((i = h), (h = o), (o = i)),
            this.helper.css({ left: a, top: o, width: r - a, height: h - o }),
            this.selectees.each(function () {
              var i = e.data(this, "selectable-item"),
                l = !1;
              i &&
                i.element !== s.element[0] &&
                ("touch" === n.tolerance
                  ? (l = !(
                      i.left > r ||
                      a > i.right ||
                      i.top > h ||
                      o > i.bottom
                    ))
                  : "fit" === n.tolerance &&
                    (l =
                      i.left > a && r > i.right && i.top > o && h > i.bottom),
                l
                  ? (i.selected &&
                      (i.$element.removeClass("ui-selected"),
                      (i.selected = !1)),
                    i.unselecting &&
                      (i.$element.removeClass("ui-unselecting"),
                      (i.unselecting = !1)),
                    i.selecting ||
                      (i.$element.addClass("ui-selecting"),
                      (i.selecting = !0),
                      s._trigger("selecting", t, { selecting: i.element })))
                  : (i.selecting &&
                      ((t.metaKey || t.ctrlKey) && i.startselected
                        ? (i.$element.removeClass("ui-selecting"),
                          (i.selecting = !1),
                          i.$element.addClass("ui-selected"),
                          (i.selected = !0))
                        : (i.$element.removeClass("ui-selecting"),
                          (i.selecting = !1),
                          i.startselected &&
                            (i.$element.addClass("ui-unselecting"),
                            (i.unselecting = !0)),
                          s._trigger("unselecting", t, {
                            unselecting: i.element,
                          }))),
                    i.selected &&
                      (t.metaKey ||
                        t.ctrlKey ||
                        i.startselected ||
                        (i.$element.removeClass("ui-selected"),
                        (i.selected = !1),
                        i.$element.addClass("ui-unselecting"),
                        (i.unselecting = !0),
                        s._trigger("unselecting", t, {
                          unselecting: i.element,
                        })))));
            }),
            !1
          );
        }
      },
      _mouseStop: function (t) {
        var i = this;
        return (
          (this.dragged = !1),
          e(".ui-unselecting", this.element[0]).each(function () {
            var s = e.data(this, "selectable-item");
            s.$element.removeClass("ui-unselecting"),
              (s.unselecting = !1),
              (s.startselected = !1),
              i._trigger("unselected", t, { unselected: s.element });
          }),
          e(".ui-selecting", this.element[0]).each(function () {
            var s = e.data(this, "selectable-item");
            s.$element.removeClass("ui-selecting").addClass("ui-selected"),
              (s.selecting = !1),
              (s.selected = !0),
              (s.startselected = !0),
              i._trigger("selected", t, { selected: s.element });
          }),
          this._trigger("stop", t),
          this.helper.remove(),
          !1
        );
      },
    }),
    e.widget("ui.selectmenu", {
      version: "1.11.4",
      defaultElement: "<select>",
      options: {
        appendTo: null,
        disabled: null,
        icons: { button: "ui-icon-triangle-1-s" },
        position: { my: "left top", at: "left bottom", collision: "none" },
        width: null,
        change: null,
        close: null,
        focus: null,
        open: null,
        select: null,
      },
      _create: function () {
        var e = this.element.uniqueId().attr("id");
        (this.ids = { element: e, button: e + "-button", menu: e + "-menu" }),
          this._drawButton(),
          this._drawMenu(),
          this.options.disabled && this.disable();
      },
      _drawButton: function () {
        var t = this;
        (this.label = e("label[for='" + this.ids.element + "']").attr(
          "for",
          this.ids.button
        )),
          this._on(this.label, {
            click: function (e) {
              this.button.focus(), e.preventDefault();
            },
          }),
          this.element.hide(),
          (this.button = e("<span>", {
            class:
              "ui-selectmenu-button ui-widget ui-state-default ui-corner-all",
            tabindex: this.options.disabled ? -1 : 0,
            id: this.ids.button,
            role: "combobox",
            "aria-expanded": "false",
            "aria-autocomplete": "list",
            "aria-owns": this.ids.menu,
            "aria-haspopup": "true",
          }).insertAfter(this.element)),
          e("<span>", {
            class: "ui-icon " + this.options.icons.button,
          }).prependTo(this.button),
          (this.buttonText = e("<span>", {
            class: "ui-selectmenu-text",
          }).appendTo(this.button)),
          this._setText(
            this.buttonText,
            this.element.find("option:selected").text()
          ),
          this._resizeButton(),
          this._on(this.button, this._buttonEvents),
          this.button.one("focusin", function () {
            t.menuItems || t._refreshMenu();
          }),
          this._hoverable(this.button),
          this._focusable(this.button);
      },
      _drawMenu: function () {
        var t = this;
        (this.menu = e("<ul>", {
          "aria-hidden": "true",
          "aria-labelledby": this.ids.button,
          id: this.ids.menu,
        })),
          (this.menuWrap = e("<div>", { class: "ui-selectmenu-menu ui-front" })
            .append(this.menu)
            .appendTo(this._appendTo())),
          (this.menuInstance = this.menu
            .menu({
              role: "listbox",
              select: function (e, i) {
                e.preventDefault(),
                  t._setSelection(),
                  t._select(i.item.data("ui-selectmenu-item"), e);
              },
              focus: function (e, i) {
                var s = i.item.data("ui-selectmenu-item");
                null != t.focusIndex &&
                  s.index !== t.focusIndex &&
                  (t._trigger("focus", e, { item: s }),
                  t.isOpen || t._select(s, e)),
                  (t.focusIndex = s.index),
                  t.button.attr(
                    "aria-activedescendant",
                    t.menuItems.eq(s.index).attr("id")
                  );
              },
            })
            .menu("instance")),
          this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"),
          this.menuInstance._off(this.menu, "mouseleave"),
          (this.menuInstance._closeOnDocumentClick = function () {
            return !1;
          }),
          (this.menuInstance._isDivider = function () {
            return !1;
          });
      },
      refresh: function () {
        this._refreshMenu(),
          this._setText(this.buttonText, this._getSelectedItem().text()),
          this.options.width || this._resizeButton();
      },
      _refreshMenu: function () {
        this.menu.empty();
        var e,
          t = this.element.find("option");
        t.length &&
          (this._parseOptions(t),
          this._renderMenu(this.menu, this.items),
          this.menuInstance.refresh(),
          (this.menuItems = this.menu
            .find("li")
            .not(".ui-selectmenu-optgroup")),
          (e = this._getSelectedItem()),
          this.menuInstance.focus(null, e),
          this._setAria(e.data("ui-selectmenu-item")),
          this._setOption("disabled", this.element.prop("disabled")));
      },
      open: function (e) {
        this.options.disabled ||
          (this.menuItems
            ? (this.menu.find(".ui-state-focus").removeClass("ui-state-focus"),
              this.menuInstance.focus(null, this._getSelectedItem()))
            : this._refreshMenu(),
          (this.isOpen = !0),
          this._toggleAttr(),
          this._resizeMenu(),
          this._position(),
          this._on(this.document, this._documentClick),
          this._trigger("open", e));
      },
      _position: function () {
        this.menuWrap.position(
          e.extend({ of: this.button }, this.options.position)
        );
      },
      close: function (e) {
        this.isOpen &&
          ((this.isOpen = !1),
          this._toggleAttr(),
          (this.range = null),
          this._off(this.document),
          this._trigger("close", e));
      },
      widget: function () {
        return this.button;
      },
      menuWidget: function () {
        return this.menu;
      },
      _renderMenu: function (t, i) {
        var s = this,
          n = "";
        e.each(i, function (i, a) {
          a.optgroup !== n &&
            (e("<li>", {
              class:
                "ui-selectmenu-optgroup ui-menu-divider" +
                (a.element.parent("optgroup").prop("disabled")
                  ? " ui-state-disabled"
                  : ""),
              text: a.optgroup,
            }).appendTo(t),
            (n = a.optgroup)),
            s._renderItemData(t, a);
        });
      },
      _renderItemData: function (e, t) {
        return this._renderItem(e, t).data("ui-selectmenu-item", t);
      },
      _renderItem: function (t, i) {
        var s = e("<li>");
        return (
          i.disabled && s.addClass("ui-state-disabled"),
          this._setText(s, i.label),
          s.appendTo(t)
        );
      },
      _setText: function (e, t) {
        t ? e.text(t) : e.html("&#160;");
      },
      _move: function (e, t) {
        var i,
          s,
          n = ".ui-menu-item";
        this.isOpen
          ? (i = this.menuItems.eq(this.focusIndex))
          : ((i = this.menuItems.eq(this.element[0].selectedIndex)),
            (n += ":not(.ui-state-disabled)")),
          (s =
            "first" === e || "last" === e
              ? i["first" === e ? "prevAll" : "nextAll"](n).eq(-1)
              : i[e + "All"](n).eq(0)),
          s.length && this.menuInstance.focus(t, s);
      },
      _getSelectedItem: function () {
        return this.menuItems.eq(this.element[0].selectedIndex);
      },
      _toggle: function (e) {
        this[this.isOpen ? "close" : "open"](e);
      },
      _setSelection: function () {
        var e;
        this.range &&
          (window.getSelection
            ? ((e = window.getSelection()),
              e.removeAllRanges(),
              e.addRange(this.range))
            : this.range.select(),
          this.button.focus());
      },
      _documentClick: {
        mousedown: function (t) {
          this.isOpen &&
            (e(t.target).closest(".ui-selectmenu-menu, #" + this.ids.button)
              .length ||
              this.close(t));
        },
      },
      _buttonEvents: {
        mousedown: function () {
          var e;
          window.getSelection
            ? ((e = window.getSelection()),
              e.rangeCount && (this.range = e.getRangeAt(0)))
            : (this.range = document.selection.createRange());
        },
        click: function (e) {
          this._setSelection(), this._toggle(e);
        },
        keydown: function (t) {
          var i = !0;
          switch (t.keyCode) {
            case e.ui.keyCode.TAB:
            case e.ui.keyCode.ESCAPE:
              this.close(t), (i = !1);
              break;
            case e.ui.keyCode.ENTER:
              this.isOpen && this._selectFocusedItem(t);
              break;
            case e.ui.keyCode.UP:
              t.altKey ? this._toggle(t) : this._move("prev", t);
              break;
            case e.ui.keyCode.DOWN:
              t.altKey ? this._toggle(t) : this._move("next", t);
              break;
            case e.ui.keyCode.SPACE:
              this.isOpen ? this._selectFocusedItem(t) : this._toggle(t);
              break;
            case e.ui.keyCode.LEFT:
              this._move("prev", t);
              break;
            case e.ui.keyCode.RIGHT:
              this._move("next", t);
              break;
            case e.ui.keyCode.HOME:
            case e.ui.keyCode.PAGE_UP:
              this._move("first", t);
              break;
            case e.ui.keyCode.END:
            case e.ui.keyCode.PAGE_DOWN:
              this._move("last", t);
              break;
            default:
              this.menu.trigger(t), (i = !1);
          }
          i && t.preventDefault();
        },
      },
      _selectFocusedItem: function (e) {
        var t = this.menuItems.eq(this.focusIndex);
        t.hasClass("ui-state-disabled") ||
          this._select(t.data("ui-selectmenu-item"), e);
      },
      _select: function (e, t) {
        var i = this.element[0].selectedIndex;
        (this.element[0].selectedIndex = e.index),
          this._setText(this.buttonText, e.label),
          this._setAria(e),
          this._trigger("select", t, { item: e }),
          e.index !== i && this._trigger("change", t, { item: e }),
          this.close(t);
      },
      _setAria: function (e) {
        var t = this.menuItems.eq(e.index).attr("id");
        this.button.attr({ "aria-labelledby": t, "aria-activedescendant": t }),
          this.menu.attr("aria-activedescendant", t);
      },
      _setOption: function (e, t) {
        "icons" === e &&
          this.button
            .find("span.ui-icon")
            .removeClass(this.options.icons.button)
            .addClass(t.button),
          this._super(e, t),
          "appendTo" === e && this.menuWrap.appendTo(this._appendTo()),
          "disabled" === e &&
            (this.menuInstance.option("disabled", t),
            this.button
              .toggleClass("ui-state-disabled", t)
              .attr("aria-disabled", t),
            this.element.prop("disabled", t),
            t
              ? (this.button.attr("tabindex", -1), this.close())
              : this.button.attr("tabindex", 0)),
          "width" === e && this._resizeButton();
      },
      _appendTo: function () {
        var t = this.options.appendTo;
        return (
          t &&
            (t = t.jquery || t.nodeType ? e(t) : this.document.find(t).eq(0)),
          (t && t[0]) || (t = this.element.closest(".ui-front")),
          t.length || (t = this.document[0].body),
          t
        );
      },
      _toggleAttr: function () {
        this.button
          .toggleClass("ui-corner-top", this.isOpen)
          .toggleClass("ui-corner-all", !this.isOpen)
          .attr("aria-expanded", this.isOpen),
          this.menuWrap.toggleClass("ui-selectmenu-open", this.isOpen),
          this.menu.attr("aria-hidden", !this.isOpen);
      },
      _resizeButton: function () {
        var e = this.options.width;
        e || ((e = this.element.show().outerWidth()), this.element.hide()),
          this.button.outerWidth(e);
      },
      _resizeMenu: function () {
        this.menu.outerWidth(
          Math.max(
            this.button.outerWidth(),
            this.menu.width("").outerWidth() + 1
          )
        );
      },
      _getCreateOptions: function () {
        return { disabled: this.element.prop("disabled") };
      },
      _parseOptions: function (t) {
        var i = [];
        t.each(function (t, s) {
          var n = e(s),
            a = n.parent("optgroup");
          i.push({
            element: n,
            index: t,
            value: n.val(),
            label: n.text(),
            optgroup: a.attr("label") || "",
            disabled: a.prop("disabled") || n.prop("disabled"),
          });
        }),
          (this.items = i);
      },
      _destroy: function () {
        this.menuWrap.remove(),
          this.button.remove(),
          this.element.show(),
          this.element.removeUniqueId(),
          this.label.attr("for", this.ids.element);
      },
    }),
    e.widget("ui.slider", e.ui.mouse, {
      version: "1.11.4",
      widgetEventPrefix: "slide",
      options: {
        animate: !1,
        distance: 0,
        max: 100,
        min: 0,
        orientation: "horizontal",
        range: !1,
        step: 1,
        value: 0,
        values: null,
        change: null,
        slide: null,
        start: null,
        stop: null,
      },
      numPages: 5,
      _create: function () {
        (this._keySliding = !1),
          (this._mouseSliding = !1),
          (this._animateOff = !0),
          (this._handleIndex = null),
          this._detectOrientation(),
          this._mouseInit(),
          this._calculateNewMax(),
          this.element.addClass(
            "ui-slider ui-slider-" +
              this.orientation +
              " ui-widget" +
              " ui-widget-content" +
              " ui-corner-all"
          ),
          this._refresh(),
          this._setOption("disabled", this.options.disabled),
          (this._animateOff = !1);
      },
      _refresh: function () {
        this._createRange(),
          this._createHandles(),
          this._setupEvents(),
          this._refreshValue();
      },
      _createHandles: function () {
        var t,
          i,
          s = this.options,
          n = this.element
            .find(".ui-slider-handle")
            .addClass("ui-state-default ui-corner-all"),
          a =
            "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
          o = [];
        for (
          i = (s.values && s.values.length) || 1,
            n.length > i && (n.slice(i).remove(), (n = n.slice(0, i))),
            t = n.length;
          i > t;
          t++
        )
          o.push(a);
        (this.handles = n.add(e(o.join("")).appendTo(this.element))),
          (this.handle = this.handles.eq(0)),
          this.handles.each(function (t) {
            e(this).data("ui-slider-handle-index", t);
          });
      },
      _createRange: function () {
        var t = this.options,
          i = "";
        t.range
          ? (t.range === !0 &&
              (t.values
                ? t.values.length && 2 !== t.values.length
                  ? (t.values = [t.values[0], t.values[0]])
                  : e.isArray(t.values) && (t.values = t.values.slice(0))
                : (t.values = [this._valueMin(), this._valueMin()])),
            this.range && this.range.length
              ? this.range
                  .removeClass("ui-slider-range-min ui-slider-range-max")
                  .css({ left: "", bottom: "" })
              : ((this.range = e("<div></div>").appendTo(this.element)),
                (i = "ui-slider-range ui-widget-header ui-corner-all")),
            this.range.addClass(
              i +
                ("min" === t.range || "max" === t.range
                  ? " ui-slider-range-" + t.range
                  : "")
            ))
          : (this.range && this.range.remove(), (this.range = null));
      },
      _setupEvents: function () {
        this._off(this.handles),
          this._on(this.handles, this._handleEvents),
          this._hoverable(this.handles),
          this._focusable(this.handles);
      },
      _destroy: function () {
        this.handles.remove(),
          this.range && this.range.remove(),
          this.element.removeClass(
            "ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"
          ),
          this._mouseDestroy();
      },
      _mouseCapture: function (t) {
        var i,
          s,
          n,
          a,
          o,
          r,
          h,
          l,
          u = this,
          d = this.options;
        return d.disabled
          ? !1
          : ((this.elementSize = {
              width: this.element.outerWidth(),
              height: this.element.outerHeight(),
            }),
            (this.elementOffset = this.element.offset()),
            (i = { x: t.pageX, y: t.pageY }),
            (s = this._normValueFromMouse(i)),
            (n = this._valueMax() - this._valueMin() + 1),
            this.handles.each(function (t) {
              var i = Math.abs(s - u.values(t));
              (n > i ||
                (n === i &&
                  (t === u._lastChangedValue || u.values(t) === d.min))) &&
                ((n = i), (a = e(this)), (o = t));
            }),
            (r = this._start(t, o)),
            r === !1
              ? !1
              : ((this._mouseSliding = !0),
                (this._handleIndex = o),
                a.addClass("ui-state-active").focus(),
                (h = a.offset()),
                (l = !e(t.target).parents().addBack().is(".ui-slider-handle")),
                (this._clickOffset = l
                  ? { left: 0, top: 0 }
                  : {
                      left: t.pageX - h.left - a.width() / 2,
                      top:
                        t.pageY -
                        h.top -
                        a.height() / 2 -
                        (parseInt(a.css("borderTopWidth"), 10) || 0) -
                        (parseInt(a.css("borderBottomWidth"), 10) || 0) +
                        (parseInt(a.css("marginTop"), 10) || 0),
                    }),
                this.handles.hasClass("ui-state-hover") || this._slide(t, o, s),
                (this._animateOff = !0),
                !0));
      },
      _mouseStart: function () {
        return !0;
      },
      _mouseDrag: function (e) {
        var t = { x: e.pageX, y: e.pageY },
          i = this._normValueFromMouse(t);
        return this._slide(e, this._handleIndex, i), !1;
      },
      _mouseStop: function (e) {
        return (
          this.handles.removeClass("ui-state-active"),
          (this._mouseSliding = !1),
          this._stop(e, this._handleIndex),
          this._change(e, this._handleIndex),
          (this._handleIndex = null),
          (this._clickOffset = null),
          (this._animateOff = !1),
          !1
        );
      },
      _detectOrientation: function () {
        this.orientation =
          "vertical" === this.options.orientation ? "vertical" : "horizontal";
      },
      _normValueFromMouse: function (e) {
        var t, i, s, n, a;
        return (
          "horizontal" === this.orientation
            ? ((t = this.elementSize.width),
              (i =
                e.x -
                this.elementOffset.left -
                (this._clickOffset ? this._clickOffset.left : 0)))
            : ((t = this.elementSize.height),
              (i =
                e.y -
                this.elementOffset.top -
                (this._clickOffset ? this._clickOffset.top : 0))),
          (s = i / t),
          s > 1 && (s = 1),
          0 > s && (s = 0),
          "vertical" === this.orientation && (s = 1 - s),
          (n = this._valueMax() - this._valueMin()),
          (a = this._valueMin() + s * n),
          this._trimAlignValue(a)
        );
      },
      _start: function (e, t) {
        var i = { handle: this.handles[t], value: this.value() };
        return (
          this.options.values &&
            this.options.values.length &&
            ((i.value = this.values(t)), (i.values = this.values())),
          this._trigger("start", e, i)
        );
      },
      _slide: function (e, t, i) {
        var s, n, a;
        this.options.values && this.options.values.length
          ? ((s = this.values(t ? 0 : 1)),
            2 === this.options.values.length &&
              this.options.range === !0 &&
              ((0 === t && i > s) || (1 === t && s > i)) &&
              (i = s),
            i !== this.values(t) &&
              ((n = this.values()),
              (n[t] = i),
              (a = this._trigger("slide", e, {
                handle: this.handles[t],
                value: i,
                values: n,
              })),
              (s = this.values(t ? 0 : 1)),
              a !== !1 && this.values(t, i)))
          : i !== this.value() &&
            ((a = this._trigger("slide", e, {
              handle: this.handles[t],
              value: i,
            })),
            a !== !1 && this.value(i));
      },
      _stop: function (e, t) {
        var i = { handle: this.handles[t], value: this.value() };
        this.options.values &&
          this.options.values.length &&
          ((i.value = this.values(t)), (i.values = this.values())),
          this._trigger("stop", e, i);
      },
      _change: function (e, t) {
        if (!this._keySliding && !this._mouseSliding) {
          var i = { handle: this.handles[t], value: this.value() };
          this.options.values &&
            this.options.values.length &&
            ((i.value = this.values(t)), (i.values = this.values())),
            (this._lastChangedValue = t),
            this._trigger("change", e, i);
        }
      },
      value: function (e) {
        return arguments.length
          ? ((this.options.value = this._trimAlignValue(e)),
            this._refreshValue(),
            this._change(null, 0),
            void 0)
          : this._value();
      },
      values: function (t, i) {
        var s, n, a;
        if (arguments.length > 1)
          return (
            (this.options.values[t] = this._trimAlignValue(i)),
            this._refreshValue(),
            this._change(null, t),
            void 0
          );
        if (!arguments.length) return this._values();
        if (!e.isArray(arguments[0]))
          return this.options.values && this.options.values.length
            ? this._values(t)
            : this.value();
        for (
          s = this.options.values, n = arguments[0], a = 0;
          s.length > a;
          a += 1
        )
          (s[a] = this._trimAlignValue(n[a])), this._change(null, a);
        this._refreshValue();
      },
      _setOption: function (t, i) {
        var s,
          n = 0;
        switch (
          ("range" === t &&
            this.options.range === !0 &&
            ("min" === i
              ? ((this.options.value = this._values(0)),
                (this.options.values = null))
              : "max" === i &&
                ((this.options.value = this._values(
                  this.options.values.length - 1
                )),
                (this.options.values = null))),
          e.isArray(this.options.values) && (n = this.options.values.length),
          "disabled" === t &&
            this.element.toggleClass("ui-state-disabled", !!i),
          this._super(t, i),
          t)
        ) {
          case "orientation":
            this._detectOrientation(),
              this.element
                .removeClass("ui-slider-horizontal ui-slider-vertical")
                .addClass("ui-slider-" + this.orientation),
              this._refreshValue(),
              this.handles.css("horizontal" === i ? "bottom" : "left", "");
            break;
          case "value":
            (this._animateOff = !0),
              this._refreshValue(),
              this._change(null, 0),
              (this._animateOff = !1);
            break;
          case "values":
            for (
              this._animateOff = !0, this._refreshValue(), s = 0;
              n > s;
              s += 1
            )
              this._change(null, s);
            this._animateOff = !1;
            break;
          case "step":
          case "min":
          case "max":
            (this._animateOff = !0),
              this._calculateNewMax(),
              this._refreshValue(),
              (this._animateOff = !1);
            break;
          case "range":
            (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
        }
      },
      _value: function () {
        var e = this.options.value;
        return (e = this._trimAlignValue(e));
      },
      _values: function (e) {
        var t, i, s;
        if (arguments.length)
          return (t = this.options.values[e]), (t = this._trimAlignValue(t));
        if (this.options.values && this.options.values.length) {
          for (i = this.options.values.slice(), s = 0; i.length > s; s += 1)
            i[s] = this._trimAlignValue(i[s]);
          return i;
        }
        return [];
      },
      _trimAlignValue: function (e) {
        if (this._valueMin() >= e) return this._valueMin();
        if (e >= this._valueMax()) return this._valueMax();
        var t = this.options.step > 0 ? this.options.step : 1,
          i = (e - this._valueMin()) % t,
          s = e - i;
        return (
          2 * Math.abs(i) >= t && (s += i > 0 ? t : -t),
          parseFloat(s.toFixed(5))
        );
      },
      _calculateNewMax: function () {
        var e = this.options.max,
          t = this._valueMin(),
          i = this.options.step,
          s = Math.floor(+(e - t).toFixed(this._precision()) / i) * i;
        (e = s + t), (this.max = parseFloat(e.toFixed(this._precision())));
      },
      _precision: function () {
        var e = this._precisionOf(this.options.step);
        return (
          null !== this.options.min &&
            (e = Math.max(e, this._precisionOf(this.options.min))),
          e
        );
      },
      _precisionOf: function (e) {
        var t = "" + e,
          i = t.indexOf(".");
        return -1 === i ? 0 : t.length - i - 1;
      },
      _valueMin: function () {
        return this.options.min;
      },
      _valueMax: function () {
        return this.max;
      },
      _refreshValue: function () {
        var t,
          i,
          s,
          n,
          a,
          o = this.options.range,
          r = this.options,
          h = this,
          l = this._animateOff ? !1 : r.animate,
          u = {};
        this.options.values && this.options.values.length
          ? this.handles.each(function (s) {
              (i =
                100 *
                ((h.values(s) - h._valueMin()) /
                  (h._valueMax() - h._valueMin()))),
                (u["horizontal" === h.orientation ? "left" : "bottom"] =
                  i + "%"),
                e(this).stop(1, 1)[l ? "animate" : "css"](u, r.animate),
                h.options.range === !0 &&
                  ("horizontal" === h.orientation
                    ? (0 === s &&
                        h.range
                          .stop(1, 1)
                          [l ? "animate" : "css"]({ left: i + "%" }, r.animate),
                      1 === s &&
                        h.range[l ? "animate" : "css"](
                          { width: i - t + "%" },
                          { queue: !1, duration: r.animate }
                        ))
                    : (0 === s &&
                        h.range
                          .stop(1, 1)
                          [l ? "animate" : "css"](
                            { bottom: i + "%" },
                            r.animate
                          ),
                      1 === s &&
                        h.range[l ? "animate" : "css"](
                          { height: i - t + "%" },
                          { queue: !1, duration: r.animate }
                        ))),
                (t = i);
            })
          : ((s = this.value()),
            (n = this._valueMin()),
            (a = this._valueMax()),
            (i = a !== n ? 100 * ((s - n) / (a - n)) : 0),
            (u["horizontal" === this.orientation ? "left" : "bottom"] =
              i + "%"),
            this.handle.stop(1, 1)[l ? "animate" : "css"](u, r.animate),
            "min" === o &&
              "horizontal" === this.orientation &&
              this.range
                .stop(1, 1)
                [l ? "animate" : "css"]({ width: i + "%" }, r.animate),
            "max" === o &&
              "horizontal" === this.orientation &&
              this.range[l ? "animate" : "css"](
                { width: 100 - i + "%" },
                { queue: !1, duration: r.animate }
              ),
            "min" === o &&
              "vertical" === this.orientation &&
              this.range
                .stop(1, 1)
                [l ? "animate" : "css"]({ height: i + "%" }, r.animate),
            "max" === o &&
              "vertical" === this.orientation &&
              this.range[l ? "animate" : "css"](
                { height: 100 - i + "%" },
                { queue: !1, duration: r.animate }
              ));
      },
      _handleEvents: {
        keydown: function (t) {
          var i,
            s,
            n,
            a,
            o = e(t.target).data("ui-slider-handle-index");
          switch (t.keyCode) {
            case e.ui.keyCode.HOME:
            case e.ui.keyCode.END:
            case e.ui.keyCode.PAGE_UP:
            case e.ui.keyCode.PAGE_DOWN:
            case e.ui.keyCode.UP:
            case e.ui.keyCode.RIGHT:
            case e.ui.keyCode.DOWN:
            case e.ui.keyCode.LEFT:
              if (
                (t.preventDefault(),
                !this._keySliding &&
                  ((this._keySliding = !0),
                  e(t.target).addClass("ui-state-active"),
                  (i = this._start(t, o)),
                  i === !1))
              )
                return;
          }
          switch (
            ((a = this.options.step),
            (s = n =
              this.options.values && this.options.values.length
                ? this.values(o)
                : this.value()),
            t.keyCode)
          ) {
            case e.ui.keyCode.HOME:
              n = this._valueMin();
              break;
            case e.ui.keyCode.END:
              n = this._valueMax();
              break;
            case e.ui.keyCode.PAGE_UP:
              n = this._trimAlignValue(
                s + (this._valueMax() - this._valueMin()) / this.numPages
              );
              break;
            case e.ui.keyCode.PAGE_DOWN:
              n = this._trimAlignValue(
                s - (this._valueMax() - this._valueMin()) / this.numPages
              );
              break;
            case e.ui.keyCode.UP:
            case e.ui.keyCode.RIGHT:
              if (s === this._valueMax()) return;
              n = this._trimAlignValue(s + a);
              break;
            case e.ui.keyCode.DOWN:
            case e.ui.keyCode.LEFT:
              if (s === this._valueMin()) return;
              n = this._trimAlignValue(s - a);
          }
          this._slide(t, o, n);
        },
        keyup: function (t) {
          var i = e(t.target).data("ui-slider-handle-index");
          this._keySliding &&
            ((this._keySliding = !1),
            this._stop(t, i),
            this._change(t, i),
            e(t.target).removeClass("ui-state-active"));
        },
      },
    }),
    e.widget("ui.sortable", e.ui.mouse, {
      version: "1.11.4",
      widgetEventPrefix: "sort",
      ready: !1,
      options: {
        appendTo: "parent",
        axis: !1,
        connectWith: !1,
        containment: !1,
        cursor: "auto",
        cursorAt: !1,
        dropOnEmpty: !0,
        forcePlaceholderSize: !1,
        forceHelperSize: !1,
        grid: !1,
        handle: !1,
        helper: "original",
        items: "> *",
        opacity: !1,
        placeholder: !1,
        revert: !1,
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        scope: "default",
        tolerance: "intersect",
        zIndex: 1e3,
        activate: null,
        beforeStop: null,
        change: null,
        deactivate: null,
        out: null,
        over: null,
        receive: null,
        remove: null,
        sort: null,
        start: null,
        stop: null,
        update: null,
      },
      _isOverAxis: function (e, t, i) {
        return e >= t && t + i > e;
      },
      _isFloating: function (e) {
        return (
          /left|right/.test(e.css("float")) ||
          /inline|table-cell/.test(e.css("display"))
        );
      },
      _create: function () {
        (this.containerCache = {}),
          this.element.addClass("ui-sortable"),
          this.refresh(),
          (this.offset = this.element.offset()),
          this._mouseInit(),
          this._setHandleClassName(),
          (this.ready = !0);
      },
      _setOption: function (e, t) {
        this._super(e, t), "handle" === e && this._setHandleClassName();
      },
      _setHandleClassName: function () {
        this.element
          .find(".ui-sortable-handle")
          .removeClass("ui-sortable-handle"),
          e.each(this.items, function () {
            (this.instance.options.handle
              ? this.item.find(this.instance.options.handle)
              : this.item
            ).addClass("ui-sortable-handle");
          });
      },
      _destroy: function () {
        this.element
          .removeClass("ui-sortable ui-sortable-disabled")
          .find(".ui-sortable-handle")
          .removeClass("ui-sortable-handle"),
          this._mouseDestroy();
        for (var e = this.items.length - 1; e >= 0; e--)
          this.items[e].item.removeData(this.widgetName + "-item");
        return this;
      },
      _mouseCapture: function (t, i) {
        var s = null,
          n = !1,
          a = this;
        return this.reverting
          ? !1
          : this.options.disabled || "static" === this.options.type
          ? !1
          : (this._refreshItems(t),
            e(t.target)
              .parents()
              .each(function () {
                return e.data(this, a.widgetName + "-item") === a
                  ? ((s = e(this)), !1)
                  : void 0;
              }),
            e.data(t.target, a.widgetName + "-item") === a && (s = e(t.target)),
            s
              ? !this.options.handle ||
                i ||
                (e(this.options.handle, s)
                  .find("*")
                  .addBack()
                  .each(function () {
                    this === t.target && (n = !0);
                  }),
                n)
                ? ((this.currentItem = s), this._removeCurrentsFromItems(), !0)
                : !1
              : !1);
      },
      _mouseStart: function (t, i, s) {
        var n,
          a,
          o = this.options;
        if (
          ((this.currentContainer = this),
          this.refreshPositions(),
          (this.helper = this._createHelper(t)),
          this._cacheHelperProportions(),
          this._cacheMargins(),
          (this.scrollParent = this.helper.scrollParent()),
          (this.offset = this.currentItem.offset()),
          (this.offset = {
            top: this.offset.top - this.margins.top,
            left: this.offset.left - this.margins.left,
          }),
          e.extend(this.offset, {
            click: {
              left: t.pageX - this.offset.left,
              top: t.pageY - this.offset.top,
            },
            parent: this._getParentOffset(),
            relative: this._getRelativeOffset(),
          }),
          this.helper.css("position", "absolute"),
          (this.cssPosition = this.helper.css("position")),
          (this.originalPosition = this._generatePosition(t)),
          (this.originalPageX = t.pageX),
          (this.originalPageY = t.pageY),
          o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt),
          (this.domPosition = {
            prev: this.currentItem.prev()[0],
            parent: this.currentItem.parent()[0],
          }),
          this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
          this._createPlaceholder(),
          o.containment && this._setContainment(),
          o.cursor &&
            "auto" !== o.cursor &&
            ((a = this.document.find("body")),
            (this.storedCursor = a.css("cursor")),
            a.css("cursor", o.cursor),
            (this.storedStylesheet = e(
              "<style>*{ cursor: " + o.cursor + " !important; }</style>"
            ).appendTo(a))),
          o.opacity &&
            (this.helper.css("opacity") &&
              (this._storedOpacity = this.helper.css("opacity")),
            this.helper.css("opacity", o.opacity)),
          o.zIndex &&
            (this.helper.css("zIndex") &&
              (this._storedZIndex = this.helper.css("zIndex")),
            this.helper.css("zIndex", o.zIndex)),
          this.scrollParent[0] !== this.document[0] &&
            "HTML" !== this.scrollParent[0].tagName &&
            (this.overflowOffset = this.scrollParent.offset()),
          this._trigger("start", t, this._uiHash()),
          this._preserveHelperProportions || this._cacheHelperProportions(),
          !s)
        )
          for (n = this.containers.length - 1; n >= 0; n--)
            this.containers[n]._trigger("activate", t, this._uiHash(this));
        return (
          e.ui.ddmanager && (e.ui.ddmanager.current = this),
          e.ui.ddmanager &&
            !o.dropBehaviour &&
            e.ui.ddmanager.prepareOffsets(this, t),
          (this.dragging = !0),
          this.helper.addClass("ui-sortable-helper"),
          this._mouseDrag(t),
          !0
        );
      },
      _mouseDrag: function (t) {
        var i,
          s,
          n,
          a,
          o = this.options,
          r = !1;
        for (
          this.position = this._generatePosition(t),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
            this.options.scroll &&
              (this.scrollParent[0] !== this.document[0] &&
              "HTML" !== this.scrollParent[0].tagName
                ? (this.overflowOffset.top +
                    this.scrollParent[0].offsetHeight -
                    t.pageY <
                  o.scrollSensitivity
                    ? (this.scrollParent[0].scrollTop = r =
                        this.scrollParent[0].scrollTop + o.scrollSpeed)
                    : t.pageY - this.overflowOffset.top < o.scrollSensitivity &&
                      (this.scrollParent[0].scrollTop = r =
                        this.scrollParent[0].scrollTop - o.scrollSpeed),
                  this.overflowOffset.left +
                    this.scrollParent[0].offsetWidth -
                    t.pageX <
                  o.scrollSensitivity
                    ? (this.scrollParent[0].scrollLeft = r =
                        this.scrollParent[0].scrollLeft + o.scrollSpeed)
                    : t.pageX - this.overflowOffset.left <
                        o.scrollSensitivity &&
                      (this.scrollParent[0].scrollLeft = r =
                        this.scrollParent[0].scrollLeft - o.scrollSpeed))
                : (t.pageY - this.document.scrollTop() < o.scrollSensitivity
                    ? (r = this.document.scrollTop(
                        this.document.scrollTop() - o.scrollSpeed
                      ))
                    : this.window.height() -
                        (t.pageY - this.document.scrollTop()) <
                        o.scrollSensitivity &&
                      (r = this.document.scrollTop(
                        this.document.scrollTop() + o.scrollSpeed
                      )),
                  t.pageX - this.document.scrollLeft() < o.scrollSensitivity
                    ? (r = this.document.scrollLeft(
                        this.document.scrollLeft() - o.scrollSpeed
                      ))
                    : this.window.width() -
                        (t.pageX - this.document.scrollLeft()) <
                        o.scrollSensitivity &&
                      (r = this.document.scrollLeft(
                        this.document.scrollLeft() + o.scrollSpeed
                      ))),
              r !== !1 &&
                e.ui.ddmanager &&
                !o.dropBehaviour &&
                e.ui.ddmanager.prepareOffsets(this, t)),
            this.positionAbs = this._convertPositionTo("absolute"),
            (this.options.axis && "y" === this.options.axis) ||
              (this.helper[0].style.left = this.position.left + "px"),
            (this.options.axis && "x" === this.options.axis) ||
              (this.helper[0].style.top = this.position.top + "px"),
            i = this.items.length - 1;
          i >= 0;
          i--
        )
          if (
            ((s = this.items[i]),
            (n = s.item[0]),
            (a = this._intersectsWithPointer(s)),
            a &&
              s.instance === this.currentContainer &&
              n !== this.currentItem[0] &&
              this.placeholder[1 === a ? "next" : "prev"]()[0] !== n &&
              !e.contains(this.placeholder[0], n) &&
              ("semi-dynamic" === this.options.type
                ? !e.contains(this.element[0], n)
                : !0))
          ) {
            if (
              ((this.direction = 1 === a ? "down" : "up"),
              "pointer" !== this.options.tolerance &&
                !this._intersectsWithSides(s))
            )
              break;
            this._rearrange(t, s), this._trigger("change", t, this._uiHash());
            break;
          }
        return (
          this._contactContainers(t),
          e.ui.ddmanager && e.ui.ddmanager.drag(this, t),
          this._trigger("sort", t, this._uiHash()),
          (this.lastPositionAbs = this.positionAbs),
          !1
        );
      },
      _mouseStop: function (t, i) {
        if (t) {
          if (
            (e.ui.ddmanager &&
              !this.options.dropBehaviour &&
              e.ui.ddmanager.drop(this, t),
            this.options.revert)
          ) {
            var s = this,
              n = this.placeholder.offset(),
              a = this.options.axis,
              o = {};
            (a && "x" !== a) ||
              (o.left =
                n.left -
                this.offset.parent.left -
                this.margins.left +
                (this.offsetParent[0] === this.document[0].body
                  ? 0
                  : this.offsetParent[0].scrollLeft)),
              (a && "y" !== a) ||
                (o.top =
                  n.top -
                  this.offset.parent.top -
                  this.margins.top +
                  (this.offsetParent[0] === this.document[0].body
                    ? 0
                    : this.offsetParent[0].scrollTop)),
              (this.reverting = !0),
              e(this.helper).animate(
                o,
                parseInt(this.options.revert, 10) || 500,
                function () {
                  s._clear(t);
                }
              );
          } else this._clear(t, i);
          return !1;
        }
      },
      cancel: function () {
        if (this.dragging) {
          this._mouseUp({ target: null }),
            "original" === this.options.helper
              ? this.currentItem
                  .css(this._storedCSS)
                  .removeClass("ui-sortable-helper")
              : this.currentItem.show();
          for (var t = this.containers.length - 1; t >= 0; t--)
            this.containers[t]._trigger("deactivate", null, this._uiHash(this)),
              this.containers[t].containerCache.over &&
                (this.containers[t]._trigger("out", null, this._uiHash(this)),
                (this.containers[t].containerCache.over = 0));
        }
        return (
          this.placeholder &&
            (this.placeholder[0].parentNode &&
              this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            "original" !== this.options.helper &&
              this.helper &&
              this.helper[0].parentNode &&
              this.helper.remove(),
            e.extend(this, {
              helper: null,
              dragging: !1,
              reverting: !1,
              _noFinalSort: null,
            }),
            this.domPosition.prev
              ? e(this.domPosition.prev).after(this.currentItem)
              : e(this.domPosition.parent).prepend(this.currentItem)),
          this
        );
      },
      serialize: function (t) {
        var i = this._getItemsAsjQuery(t && t.connected),
          s = [];
        return (
          (t = t || {}),
          e(i).each(function () {
            var i = (e(t.item || this).attr(t.attribute || "id") || "").match(
              t.expression || /(.+)[\-=_](.+)/
            );
            i &&
              s.push(
                (t.key || i[1] + "[]") +
                  "=" +
                  (t.key && t.expression ? i[1] : i[2])
              );
          }),
          !s.length && t.key && s.push(t.key + "="),
          s.join("&")
        );
      },
      toArray: function (t) {
        var i = this._getItemsAsjQuery(t && t.connected),
          s = [];
        return (
          (t = t || {}),
          i.each(function () {
            s.push(e(t.item || this).attr(t.attribute || "id") || "");
          }),
          s
        );
      },
      _intersectsWith: function (e) {
        var t = this.positionAbs.left,
          i = t + this.helperProportions.width,
          s = this.positionAbs.top,
          n = s + this.helperProportions.height,
          a = e.left,
          o = a + e.width,
          r = e.top,
          h = r + e.height,
          l = this.offset.click.top,
          u = this.offset.click.left,
          d = "x" === this.options.axis || (s + l > r && h > s + l),
          c = "y" === this.options.axis || (t + u > a && o > t + u),
          p = d && c;
        return "pointer" === this.options.tolerance ||
          this.options.forcePointerForContainers ||
          ("pointer" !== this.options.tolerance &&
            this.helperProportions[this.floating ? "width" : "height"] >
              e[this.floating ? "width" : "height"])
          ? p
          : t + this.helperProportions.width / 2 > a &&
              o > i - this.helperProportions.width / 2 &&
              s + this.helperProportions.height / 2 > r &&
              h > n - this.helperProportions.height / 2;
      },
      _intersectsWithPointer: function (e) {
        var t =
            "x" === this.options.axis ||
            this._isOverAxis(
              this.positionAbs.top + this.offset.click.top,
              e.top,
              e.height
            ),
          i =
            "y" === this.options.axis ||
            this._isOverAxis(
              this.positionAbs.left + this.offset.click.left,
              e.left,
              e.width
            ),
          s = t && i,
          n = this._getDragVerticalDirection(),
          a = this._getDragHorizontalDirection();
        return s
          ? this.floating
            ? (a && "right" === a) || "down" === n
              ? 2
              : 1
            : n && ("down" === n ? 2 : 1)
          : !1;
      },
      _intersectsWithSides: function (e) {
        var t = this._isOverAxis(
            this.positionAbs.top + this.offset.click.top,
            e.top + e.height / 2,
            e.height
          ),
          i = this._isOverAxis(
            this.positionAbs.left + this.offset.click.left,
            e.left + e.width / 2,
            e.width
          ),
          s = this._getDragVerticalDirection(),
          n = this._getDragHorizontalDirection();
        return this.floating && n
          ? ("right" === n && i) || ("left" === n && !i)
          : s && (("down" === s && t) || ("up" === s && !t));
      },
      _getDragVerticalDirection: function () {
        var e = this.positionAbs.top - this.lastPositionAbs.top;
        return 0 !== e && (e > 0 ? "down" : "up");
      },
      _getDragHorizontalDirection: function () {
        var e = this.positionAbs.left - this.lastPositionAbs.left;
        return 0 !== e && (e > 0 ? "right" : "left");
      },
      refresh: function (e) {
        return (
          this._refreshItems(e),
          this._setHandleClassName(),
          this.refreshPositions(),
          this
        );
      },
      _connectWith: function () {
        var e = this.options;
        return e.connectWith.constructor === String
          ? [e.connectWith]
          : e.connectWith;
      },
      _getItemsAsjQuery: function (t) {
        function i() {
          r.push(this);
        }
        var s,
          n,
          a,
          o,
          r = [],
          h = [],
          l = this._connectWith();
        if (l && t)
          for (s = l.length - 1; s >= 0; s--)
            for (a = e(l[s], this.document[0]), n = a.length - 1; n >= 0; n--)
              (o = e.data(a[n], this.widgetFullName)),
                o &&
                  o !== this &&
                  !o.options.disabled &&
                  h.push([
                    e.isFunction(o.options.items)
                      ? o.options.items.call(o.element)
                      : e(o.options.items, o.element)
                          .not(".ui-sortable-helper")
                          .not(".ui-sortable-placeholder"),
                    o,
                  ]);
        for (
          h.push([
            e.isFunction(this.options.items)
              ? this.options.items.call(this.element, null, {
                  options: this.options,
                  item: this.currentItem,
                })
              : e(this.options.items, this.element)
                  .not(".ui-sortable-helper")
                  .not(".ui-sortable-placeholder"),
            this,
          ]),
            s = h.length - 1;
          s >= 0;
          s--
        )
          h[s][0].each(i);
        return e(r);
      },
      _removeCurrentsFromItems: function () {
        var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
        this.items = e.grep(this.items, function (e) {
          for (var i = 0; t.length > i; i++) if (t[i] === e.item[0]) return !1;
          return !0;
        });
      },
      _refreshItems: function (t) {
        (this.items = []), (this.containers = [this]);
        var i,
          s,
          n,
          a,
          o,
          r,
          h,
          l,
          u = this.items,
          d = [
            [
              e.isFunction(this.options.items)
                ? this.options.items.call(this.element[0], t, {
                    item: this.currentItem,
                  })
                : e(this.options.items, this.element),
              this,
            ],
          ],
          c = this._connectWith();
        if (c && this.ready)
          for (i = c.length - 1; i >= 0; i--)
            for (n = e(c[i], this.document[0]), s = n.length - 1; s >= 0; s--)
              (a = e.data(n[s], this.widgetFullName)),
                a &&
                  a !== this &&
                  !a.options.disabled &&
                  (d.push([
                    e.isFunction(a.options.items)
                      ? a.options.items.call(a.element[0], t, {
                          item: this.currentItem,
                        })
                      : e(a.options.items, a.element),
                    a,
                  ]),
                  this.containers.push(a));
        for (i = d.length - 1; i >= 0; i--)
          for (o = d[i][1], r = d[i][0], s = 0, l = r.length; l > s; s++)
            (h = e(r[s])),
              h.data(this.widgetName + "-item", o),
              u.push({
                item: h,
                instance: o,
                width: 0,
                height: 0,
                left: 0,
                top: 0,
              });
      },
      refreshPositions: function (t) {
        (this.floating = this.items.length
          ? "x" === this.options.axis || this._isFloating(this.items[0].item)
          : !1),
          this.offsetParent &&
            this.helper &&
            (this.offset.parent = this._getParentOffset());
        var i, s, n, a;
        for (i = this.items.length - 1; i >= 0; i--)
          (s = this.items[i]),
            (s.instance !== this.currentContainer &&
              this.currentContainer &&
              s.item[0] !== this.currentItem[0]) ||
              ((n = this.options.toleranceElement
                ? e(this.options.toleranceElement, s.item)
                : s.item),
              t || ((s.width = n.outerWidth()), (s.height = n.outerHeight())),
              (a = n.offset()),
              (s.left = a.left),
              (s.top = a.top));
        if (this.options.custom && this.options.custom.refreshContainers)
          this.options.custom.refreshContainers.call(this);
        else
          for (i = this.containers.length - 1; i >= 0; i--)
            (a = this.containers[i].element.offset()),
              (this.containers[i].containerCache.left = a.left),
              (this.containers[i].containerCache.top = a.top),
              (this.containers[i].containerCache.width =
                this.containers[i].element.outerWidth()),
              (this.containers[i].containerCache.height =
                this.containers[i].element.outerHeight());
        return this;
      },
      _createPlaceholder: function (t) {
        t = t || this;
        var i,
          s = t.options;
        (s.placeholder && s.placeholder.constructor !== String) ||
          ((i = s.placeholder),
          (s.placeholder = {
            element: function () {
              var s = t.currentItem[0].nodeName.toLowerCase(),
                n = e("<" + s + ">", t.document[0])
                  .addClass(
                    i || t.currentItem[0].className + " ui-sortable-placeholder"
                  )
                  .removeClass("ui-sortable-helper");
              return (
                "tbody" === s
                  ? t._createTrPlaceholder(
                      t.currentItem.find("tr").eq(0),
                      e("<tr>", t.document[0]).appendTo(n)
                    )
                  : "tr" === s
                  ? t._createTrPlaceholder(t.currentItem, n)
                  : "img" === s && n.attr("src", t.currentItem.attr("src")),
                i || n.css("visibility", "hidden"),
                n
              );
            },
            update: function (e, n) {
              (!i || s.forcePlaceholderSize) &&
                (n.height() ||
                  n.height(
                    t.currentItem.innerHeight() -
                      parseInt(t.currentItem.css("paddingTop") || 0, 10) -
                      parseInt(t.currentItem.css("paddingBottom") || 0, 10)
                  ),
                n.width() ||
                  n.width(
                    t.currentItem.innerWidth() -
                      parseInt(t.currentItem.css("paddingLeft") || 0, 10) -
                      parseInt(t.currentItem.css("paddingRight") || 0, 10)
                  ));
            },
          })),
          (t.placeholder = e(
            s.placeholder.element.call(t.element, t.currentItem)
          )),
          t.currentItem.after(t.placeholder),
          s.placeholder.update(t, t.placeholder);
      },
      _createTrPlaceholder: function (t, i) {
        var s = this;
        t.children().each(function () {
          e("<td>&#160;</td>", s.document[0])
            .attr("colspan", e(this).attr("colspan") || 1)
            .appendTo(i);
        });
      },
      _contactContainers: function (t) {
        var i,
          s,
          n,
          a,
          o,
          r,
          h,
          l,
          u,
          d,
          c = null,
          p = null;
        for (i = this.containers.length - 1; i >= 0; i--)
          if (!e.contains(this.currentItem[0], this.containers[i].element[0]))
            if (this._intersectsWith(this.containers[i].containerCache)) {
              if (c && e.contains(this.containers[i].element[0], c.element[0]))
                continue;
              (c = this.containers[i]), (p = i);
            } else
              this.containers[i].containerCache.over &&
                (this.containers[i]._trigger("out", t, this._uiHash(this)),
                (this.containers[i].containerCache.over = 0));
        if (c)
          if (1 === this.containers.length)
            this.containers[p].containerCache.over ||
              (this.containers[p]._trigger("over", t, this._uiHash(this)),
              (this.containers[p].containerCache.over = 1));
          else {
            for (
              n = 1e4,
                a = null,
                u = c.floating || this._isFloating(this.currentItem),
                o = u ? "left" : "top",
                r = u ? "width" : "height",
                d = u ? "clientX" : "clientY",
                s = this.items.length - 1;
              s >= 0;
              s--
            )
              e.contains(
                this.containers[p].element[0],
                this.items[s].item[0]
              ) &&
                this.items[s].item[0] !== this.currentItem[0] &&
                ((h = this.items[s].item.offset()[o]),
                (l = !1),
                t[d] - h > this.items[s][r] / 2 && (l = !0),
                n > Math.abs(t[d] - h) &&
                  ((n = Math.abs(t[d] - h)),
                  (a = this.items[s]),
                  (this.direction = l ? "up" : "down")));
            if (!a && !this.options.dropOnEmpty) return;
            if (this.currentContainer === this.containers[p])
              return (
                this.currentContainer.containerCache.over ||
                  (this.containers[p]._trigger("over", t, this._uiHash()),
                  (this.currentContainer.containerCache.over = 1)),
                void 0
              );
            a
              ? this._rearrange(t, a, null, !0)
              : this._rearrange(t, null, this.containers[p].element, !0),
              this._trigger("change", t, this._uiHash()),
              this.containers[p]._trigger("change", t, this._uiHash(this)),
              (this.currentContainer = this.containers[p]),
              this.options.placeholder.update(
                this.currentContainer,
                this.placeholder
              ),
              this.containers[p]._trigger("over", t, this._uiHash(this)),
              (this.containers[p].containerCache.over = 1);
          }
      },
      _createHelper: function (t) {
        var i = this.options,
          s = e.isFunction(i.helper)
            ? e(i.helper.apply(this.element[0], [t, this.currentItem]))
            : "clone" === i.helper
            ? this.currentItem.clone()
            : this.currentItem;
        return (
          s.parents("body").length ||
            e(
              "parent" !== i.appendTo
                ? i.appendTo
                : this.currentItem[0].parentNode
            )[0].appendChild(s[0]),
          s[0] === this.currentItem[0] &&
            (this._storedCSS = {
              width: this.currentItem[0].style.width,
              height: this.currentItem[0].style.height,
              position: this.currentItem.css("position"),
              top: this.currentItem.css("top"),
              left: this.currentItem.css("left"),
            }),
          (!s[0].style.width || i.forceHelperSize) &&
            s.width(this.currentItem.width()),
          (!s[0].style.height || i.forceHelperSize) &&
            s.height(this.currentItem.height()),
          s
        );
      },
      _adjustOffsetFromHelper: function (t) {
        "string" == typeof t && (t = t.split(" ")),
          e.isArray(t) && (t = { left: +t[0], top: +t[1] || 0 }),
          "left" in t && (this.offset.click.left = t.left + this.margins.left),
          "right" in t &&
            (this.offset.click.left =
              this.helperProportions.width - t.right + this.margins.left),
          "top" in t && (this.offset.click.top = t.top + this.margins.top),
          "bottom" in t &&
            (this.offset.click.top =
              this.helperProportions.height - t.bottom + this.margins.top);
      },
      _getParentOffset: function () {
        this.offsetParent = this.helper.offsetParent();
        var t = this.offsetParent.offset();
        return (
          "absolute" === this.cssPosition &&
            this.scrollParent[0] !== this.document[0] &&
            e.contains(this.scrollParent[0], this.offsetParent[0]) &&
            ((t.left += this.scrollParent.scrollLeft()),
            (t.top += this.scrollParent.scrollTop())),
          (this.offsetParent[0] === this.document[0].body ||
            (this.offsetParent[0].tagName &&
              "html" === this.offsetParent[0].tagName.toLowerCase() &&
              e.ui.ie)) &&
            (t = { top: 0, left: 0 }),
          {
            top:
              t.top +
              (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
            left:
              t.left +
              (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
          }
        );
      },
      _getRelativeOffset: function () {
        if ("relative" === this.cssPosition) {
          var e = this.currentItem.position();
          return {
            top:
              e.top -
              (parseInt(this.helper.css("top"), 10) || 0) +
              this.scrollParent.scrollTop(),
            left:
              e.left -
              (parseInt(this.helper.css("left"), 10) || 0) +
              this.scrollParent.scrollLeft(),
          };
        }
        return { top: 0, left: 0 };
      },
      _cacheMargins: function () {
        this.margins = {
          left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
          top: parseInt(this.currentItem.css("marginTop"), 10) || 0,
        };
      },
      _cacheHelperProportions: function () {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight(),
        };
      },
      _setContainment: function () {
        var t,
          i,
          s,
          n = this.options;
        "parent" === n.containment &&
          (n.containment = this.helper[0].parentNode),
          ("document" === n.containment || "window" === n.containment) &&
            (this.containment = [
              0 - this.offset.relative.left - this.offset.parent.left,
              0 - this.offset.relative.top - this.offset.parent.top,
              "document" === n.containment
                ? this.document.width()
                : this.window.width() -
                  this.helperProportions.width -
                  this.margins.left,
              ("document" === n.containment
                ? this.document.width()
                : this.window.height() ||
                  this.document[0].body.parentNode.scrollHeight) -
                this.helperProportions.height -
                this.margins.top,
            ]),
          /^(document|window|parent)$/.test(n.containment) ||
            ((t = e(n.containment)[0]),
            (i = e(n.containment).offset()),
            (s = "hidden" !== e(t).css("overflow")),
            (this.containment = [
              i.left +
                (parseInt(e(t).css("borderLeftWidth"), 10) || 0) +
                (parseInt(e(t).css("paddingLeft"), 10) || 0) -
                this.margins.left,
              i.top +
                (parseInt(e(t).css("borderTopWidth"), 10) || 0) +
                (parseInt(e(t).css("paddingTop"), 10) || 0) -
                this.margins.top,
              i.left +
                (s ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) -
                (parseInt(e(t).css("borderLeftWidth"), 10) || 0) -
                (parseInt(e(t).css("paddingRight"), 10) || 0) -
                this.helperProportions.width -
                this.margins.left,
              i.top +
                (s
                  ? Math.max(t.scrollHeight, t.offsetHeight)
                  : t.offsetHeight) -
                (parseInt(e(t).css("borderTopWidth"), 10) || 0) -
                (parseInt(e(t).css("paddingBottom"), 10) || 0) -
                this.helperProportions.height -
                this.margins.top,
            ]));
      },
      _convertPositionTo: function (t, i) {
        i || (i = this.position);
        var s = "absolute" === t ? 1 : -1,
          n =
            "absolute" !== this.cssPosition ||
            (this.scrollParent[0] !== this.document[0] &&
              e.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          a = /(html|body)/i.test(n[0].tagName);
        return {
          top:
            i.top +
            this.offset.relative.top * s +
            this.offset.parent.top * s -
            ("fixed" === this.cssPosition
              ? -this.scrollParent.scrollTop()
              : a
              ? 0
              : n.scrollTop()) *
              s,
          left:
            i.left +
            this.offset.relative.left * s +
            this.offset.parent.left * s -
            ("fixed" === this.cssPosition
              ? -this.scrollParent.scrollLeft()
              : a
              ? 0
              : n.scrollLeft()) *
              s,
        };
      },
      _generatePosition: function (t) {
        var i,
          s,
          n = this.options,
          a = t.pageX,
          o = t.pageY,
          r =
            "absolute" !== this.cssPosition ||
            (this.scrollParent[0] !== this.document[0] &&
              e.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          h = /(html|body)/i.test(r[0].tagName);
        return (
          "relative" !== this.cssPosition ||
            (this.scrollParent[0] !== this.document[0] &&
              this.scrollParent[0] !== this.offsetParent[0]) ||
            (this.offset.relative = this._getRelativeOffset()),
          this.originalPosition &&
            (this.containment &&
              (t.pageX - this.offset.click.left < this.containment[0] &&
                (a = this.containment[0] + this.offset.click.left),
              t.pageY - this.offset.click.top < this.containment[1] &&
                (o = this.containment[1] + this.offset.click.top),
              t.pageX - this.offset.click.left > this.containment[2] &&
                (a = this.containment[2] + this.offset.click.left),
              t.pageY - this.offset.click.top > this.containment[3] &&
                (o = this.containment[3] + this.offset.click.top)),
            n.grid &&
              ((i =
                this.originalPageY +
                Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1]),
              (o = this.containment
                ? i - this.offset.click.top >= this.containment[1] &&
                  i - this.offset.click.top <= this.containment[3]
                  ? i
                  : i - this.offset.click.top >= this.containment[1]
                  ? i - n.grid[1]
                  : i + n.grid[1]
                : i),
              (s =
                this.originalPageX +
                Math.round((a - this.originalPageX) / n.grid[0]) * n.grid[0]),
              (a = this.containment
                ? s - this.offset.click.left >= this.containment[0] &&
                  s - this.offset.click.left <= this.containment[2]
                  ? s
                  : s - this.offset.click.left >= this.containment[0]
                  ? s - n.grid[0]
                  : s + n.grid[0]
                : s))),
          {
            top:
              o -
              this.offset.click.top -
              this.offset.relative.top -
              this.offset.parent.top +
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollTop()
                : h
                ? 0
                : r.scrollTop()),
            left:
              a -
              this.offset.click.left -
              this.offset.relative.left -
              this.offset.parent.left +
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollLeft()
                : h
                ? 0
                : r.scrollLeft()),
          }
        );
      },
      _rearrange: function (e, t, i, s) {
        i
          ? i[0].appendChild(this.placeholder[0])
          : t.item[0].parentNode.insertBefore(
              this.placeholder[0],
              "down" === this.direction ? t.item[0] : t.item[0].nextSibling
            ),
          (this.counter = this.counter ? ++this.counter : 1);
        var n = this.counter;
        this._delay(function () {
          n === this.counter && this.refreshPositions(!s);
        });
      },
      _clear: function (e, t) {
        function i(e, t, i) {
          return function (s) {
            i._trigger(e, s, t._uiHash(t));
          };
        }
        this.reverting = !1;
        var s,
          n = [];
        if (
          (!this._noFinalSort &&
            this.currentItem.parent().length &&
            this.placeholder.before(this.currentItem),
          (this._noFinalSort = null),
          this.helper[0] === this.currentItem[0])
        ) {
          for (s in this._storedCSS)
            ("auto" === this._storedCSS[s] ||
              "static" === this._storedCSS[s]) &&
              (this._storedCSS[s] = "");
          this.currentItem
            .css(this._storedCSS)
            .removeClass("ui-sortable-helper");
        } else this.currentItem.show();
        for (
          this.fromOutside &&
            !t &&
            n.push(function (e) {
              this._trigger("receive", e, this._uiHash(this.fromOutside));
            }),
            (!this.fromOutside &&
              this.domPosition.prev ===
                this.currentItem.prev().not(".ui-sortable-helper")[0] &&
              this.domPosition.parent === this.currentItem.parent()[0]) ||
              t ||
              n.push(function (e) {
                this._trigger("update", e, this._uiHash());
              }),
            this !== this.currentContainer &&
              (t ||
                (n.push(function (e) {
                  this._trigger("remove", e, this._uiHash());
                }),
                n.push(
                  function (e) {
                    return function (t) {
                      e._trigger("receive", t, this._uiHash(this));
                    };
                  }.call(this, this.currentContainer)
                ),
                n.push(
                  function (e) {
                    return function (t) {
                      e._trigger("update", t, this._uiHash(this));
                    };
                  }.call(this, this.currentContainer)
                ))),
            s = this.containers.length - 1;
          s >= 0;
          s--
        )
          t || n.push(i("deactivate", this, this.containers[s])),
            this.containers[s].containerCache.over &&
              (n.push(i("out", this, this.containers[s])),
              (this.containers[s].containerCache.over = 0));
        if (
          (this.storedCursor &&
            (this.document.find("body").css("cursor", this.storedCursor),
            this.storedStylesheet.remove()),
          this._storedOpacity &&
            this.helper.css("opacity", this._storedOpacity),
          this._storedZIndex &&
            this.helper.css(
              "zIndex",
              "auto" === this._storedZIndex ? "" : this._storedZIndex
            ),
          (this.dragging = !1),
          t || this._trigger("beforeStop", e, this._uiHash()),
          this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
          this.cancelHelperRemoval ||
            (this.helper[0] !== this.currentItem[0] && this.helper.remove(),
            (this.helper = null)),
          !t)
        ) {
          for (s = 0; n.length > s; s++) n[s].call(this, e);
          this._trigger("stop", e, this._uiHash());
        }
        return (this.fromOutside = !1), !this.cancelHelperRemoval;
      },
      _trigger: function () {
        e.Widget.prototype._trigger.apply(this, arguments) === !1 &&
          this.cancel();
      },
      _uiHash: function (t) {
        var i = t || this;
        return {
          helper: i.helper,
          placeholder: i.placeholder || e([]),
          position: i.position,
          originalPosition: i.originalPosition,
          offset: i.positionAbs,
          item: i.currentItem,
          sender: t ? t.element : null,
        };
      },
    }),
    e.widget("ui.spinner", {
      version: "1.11.4",
      defaultElement: "<input>",
      widgetEventPrefix: "spin",
      options: {
        culture: null,
        icons: { down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n" },
        incremental: !0,
        max: null,
        min: null,
        numberFormat: null,
        page: 10,
        step: 1,
        change: null,
        spin: null,
        start: null,
        stop: null,
      },
      _create: function () {
        this._setOption("max", this.options.max),
          this._setOption("min", this.options.min),
          this._setOption("step", this.options.step),
          "" !== this.value() && this._value(this.element.val(), !0),
          this._draw(),
          this._on(this._events),
          this._refresh(),
          this._on(this.window, {
            beforeunload: function () {
              this.element.removeAttr("autocomplete");
            },
          });
      },
      _getCreateOptions: function () {
        var t = {},
          i = this.element;
        return (
          e.each(["min", "max", "step"], function (e, s) {
            var n = i.attr(s);
            void 0 !== n && n.length && (t[s] = n);
          }),
          t
        );
      },
      _events: {
        keydown: function (e) {
          this._start(e) && this._keydown(e) && e.preventDefault();
        },
        keyup: "_stop",
        focus: function () {
          this.previous = this.element.val();
        },
        blur: function (e) {
          return this.cancelBlur
            ? (delete this.cancelBlur, void 0)
            : (this._stop(),
              this._refresh(),
              this.previous !== this.element.val() &&
                this._trigger("change", e),
              void 0);
        },
        mousewheel: function (e, t) {
          if (t) {
            if (!this.spinning && !this._start(e)) return !1;
            this._spin((t > 0 ? 1 : -1) * this.options.step, e),
              clearTimeout(this.mousewheelTimer),
              (this.mousewheelTimer = this._delay(function () {
                this.spinning && this._stop(e);
              }, 100)),
              e.preventDefault();
          }
        },
        "mousedown .ui-spinner-button": function (t) {
          function i() {
            var e = this.element[0] === this.document[0].activeElement;
            e ||
              (this.element.focus(),
              (this.previous = s),
              this._delay(function () {
                this.previous = s;
              }));
          }
          var s;
          (s =
            this.element[0] === this.document[0].activeElement
              ? this.previous
              : this.element.val()),
            t.preventDefault(),
            i.call(this),
            (this.cancelBlur = !0),
            this._delay(function () {
              delete this.cancelBlur, i.call(this);
            }),
            this._start(t) !== !1 &&
              this._repeat(
                null,
                e(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
                t
              );
        },
        "mouseup .ui-spinner-button": "_stop",
        "mouseenter .ui-spinner-button": function (t) {
          return e(t.currentTarget).hasClass("ui-state-active")
            ? this._start(t) === !1
              ? !1
              : (this._repeat(
                  null,
                  e(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
                  t
                ),
                void 0)
            : void 0;
        },
        "mouseleave .ui-spinner-button": "_stop",
      },
      _draw: function () {
        var e = (this.uiSpinner = this.element
          .addClass("ui-spinner-input")
          .attr("autocomplete", "off")
          .wrap(this._uiSpinnerHtml())
          .parent()
          .append(this._buttonHtml()));
        this.element.attr("role", "spinbutton"),
          (this.buttons = e
            .find(".ui-spinner-button")
            .attr("tabIndex", -1)
            .button()
            .removeClass("ui-corner-all")),
          this.buttons.height() > Math.ceil(0.5 * e.height()) &&
            e.height() > 0 &&
            e.height(e.height()),
          this.options.disabled && this.disable();
      },
      _keydown: function (t) {
        var i = this.options,
          s = e.ui.keyCode;
        switch (t.keyCode) {
          case s.UP:
            return this._repeat(null, 1, t), !0;
          case s.DOWN:
            return this._repeat(null, -1, t), !0;
          case s.PAGE_UP:
            return this._repeat(null, i.page, t), !0;
          case s.PAGE_DOWN:
            return this._repeat(null, -i.page, t), !0;
        }
        return !1;
      },
      _uiSpinnerHtml: function () {
        return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>";
      },
      _buttonHtml: function () {
        return (
          "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " +
          this.options.icons.up +
          "'>&#9650;</span>" +
          "</a>" +
          "<a class='ui-spinner-button ui-spinner-down ui-corner-br'>" +
          "<span class='ui-icon " +
          this.options.icons.down +
          "'>&#9660;</span>" +
          "</a>"
        );
      },
      _start: function (e) {
        return this.spinning || this._trigger("start", e) !== !1
          ? (this.counter || (this.counter = 1), (this.spinning = !0), !0)
          : !1;
      },
      _repeat: function (e, t, i) {
        (e = e || 500),
          clearTimeout(this.timer),
          (this.timer = this._delay(function () {
            this._repeat(40, t, i);
          }, e)),
          this._spin(t * this.options.step, i);
      },
      _spin: function (e, t) {
        var i = this.value() || 0;
        this.counter || (this.counter = 1),
          (i = this._adjustValue(i + e * this._increment(this.counter))),
          (this.spinning && this._trigger("spin", t, { value: i }) === !1) ||
            (this._value(i), this.counter++);
      },
      _increment: function (t) {
        var i = this.options.incremental;
        return i
          ? e.isFunction(i)
            ? i(t)
            : Math.floor((t * t * t) / 5e4 - (t * t) / 500 + (17 * t) / 200 + 1)
          : 1;
      },
      _precision: function () {
        var e = this._precisionOf(this.options.step);
        return (
          null !== this.options.min &&
            (e = Math.max(e, this._precisionOf(this.options.min))),
          e
        );
      },
      _precisionOf: function (e) {
        var t = "" + e,
          i = t.indexOf(".");
        return -1 === i ? 0 : t.length - i - 1;
      },
      _adjustValue: function (e) {
        var t,
          i,
          s = this.options;
        return (
          (t = null !== s.min ? s.min : 0),
          (i = e - t),
          (i = Math.round(i / s.step) * s.step),
          (e = t + i),
          (e = parseFloat(e.toFixed(this._precision()))),
          null !== s.max && e > s.max
            ? s.max
            : null !== s.min && s.min > e
            ? s.min
            : e
        );
      },
      _stop: function (e) {
        this.spinning &&
          (clearTimeout(this.timer),
          clearTimeout(this.mousewheelTimer),
          (this.counter = 0),
          (this.spinning = !1),
          this._trigger("stop", e));
      },
      _setOption: function (e, t) {
        if ("culture" === e || "numberFormat" === e) {
          var i = this._parse(this.element.val());
          return (
            (this.options[e] = t), this.element.val(this._format(i)), void 0
          );
        }
        ("max" === e || "min" === e || "step" === e) &&
          "string" == typeof t &&
          (t = this._parse(t)),
          "icons" === e &&
            (this.buttons
              .first()
              .find(".ui-icon")
              .removeClass(this.options.icons.up)
              .addClass(t.up),
            this.buttons
              .last()
              .find(".ui-icon")
              .removeClass(this.options.icons.down)
              .addClass(t.down)),
          this._super(e, t),
          "disabled" === e &&
            (this.widget().toggleClass("ui-state-disabled", !!t),
            this.element.prop("disabled", !!t),
            this.buttons.button(t ? "disable" : "enable"));
      },
      _setOptions: h(function (e) {
        this._super(e);
      }),
      _parse: function (e) {
        return (
          "string" == typeof e &&
            "" !== e &&
            (e =
              window.Globalize && this.options.numberFormat
                ? Globalize.parseFloat(e, 10, this.options.culture)
                : +e),
          "" === e || isNaN(e) ? null : e
        );
      },
      _format: function (e) {
        return "" === e
          ? ""
          : window.Globalize && this.options.numberFormat
          ? Globalize.format(e, this.options.numberFormat, this.options.culture)
          : e;
      },
      _refresh: function () {
        this.element.attr({
          "aria-valuemin": this.options.min,
          "aria-valuemax": this.options.max,
          "aria-valuenow": this._parse(this.element.val()),
        });
      },
      isValid: function () {
        var e = this.value();
        return null === e ? !1 : e === this._adjustValue(e);
      },
      _value: function (e, t) {
        var i;
        "" !== e &&
          ((i = this._parse(e)),
          null !== i &&
            (t || (i = this._adjustValue(i)), (e = this._format(i)))),
          this.element.val(e),
          this._refresh();
      },
      _destroy: function () {
        this.element
          .removeClass("ui-spinner-input")
          .prop("disabled", !1)
          .removeAttr("autocomplete")
          .removeAttr("role")
          .removeAttr("aria-valuemin")
          .removeAttr("aria-valuemax")
          .removeAttr("aria-valuenow"),
          this.uiSpinner.replaceWith(this.element);
      },
      stepUp: h(function (e) {
        this._stepUp(e);
      }),
      _stepUp: function (e) {
        this._start() &&
          (this._spin((e || 1) * this.options.step), this._stop());
      },
      stepDown: h(function (e) {
        this._stepDown(e);
      }),
      _stepDown: function (e) {
        this._start() &&
          (this._spin((e || 1) * -this.options.step), this._stop());
      },
      pageUp: h(function (e) {
        this._stepUp((e || 1) * this.options.page);
      }),
      pageDown: h(function (e) {
        this._stepDown((e || 1) * this.options.page);
      }),
      value: function (e) {
        return arguments.length
          ? (h(this._value).call(this, e), void 0)
          : this._parse(this.element.val());
      },
      widget: function () {
        return this.uiSpinner;
      },
    }),
    e.widget("ui.tabs", {
      version: "1.11.4",
      delay: 300,
      options: {
        active: null,
        collapsible: !1,
        event: "click",
        heightStyle: "content",
        hide: null,
        show: null,
        activate: null,
        beforeActivate: null,
        beforeLoad: null,
        load: null,
      },
      _isLocal: (function () {
        var e = /#.*$/;
        return function (t) {
          var i, s;
          (t = t.cloneNode(!1)),
            (i = t.href.replace(e, "")),
            (s = location.href.replace(e, ""));
          try {
            i = decodeURIComponent(i);
          } catch (n) {}
          try {
            s = decodeURIComponent(s);
          } catch (n) {}
          return t.hash.length > 1 && i === s;
        };
      })(),
      _create: function () {
        var t = this,
          i = this.options;
        (this.running = !1),
          this.element
            .addClass("ui-tabs ui-widget ui-widget-content ui-corner-all")
            .toggleClass("ui-tabs-collapsible", i.collapsible),
          this._processTabs(),
          (i.active = this._initialActive()),
          e.isArray(i.disabled) &&
            (i.disabled = e
              .unique(
                i.disabled.concat(
                  e.map(this.tabs.filter(".ui-state-disabled"), function (e) {
                    return t.tabs.index(e);
                  })
                )
              )
              .sort()),
          (this.active =
            this.options.active !== !1 && this.anchors.length
              ? this._findActive(i.active)
              : e()),
          this._refresh(),
          this.active.length && this.load(i.active);
      },
      _initialActive: function () {
        var t = this.options.active,
          i = this.options.collapsible,
          s = location.hash.substring(1);
        return (
          null === t &&
            (s &&
              this.tabs.each(function (i, n) {
                return e(n).attr("aria-controls") === s
                  ? ((t = i), !1)
                  : void 0;
              }),
            null === t &&
              (t = this.tabs.index(this.tabs.filter(".ui-tabs-active"))),
            (null === t || -1 === t) && (t = this.tabs.length ? 0 : !1)),
          t !== !1 &&
            ((t = this.tabs.index(this.tabs.eq(t))),
            -1 === t && (t = i ? !1 : 0)),
          !i && t === !1 && this.anchors.length && (t = 0),
          t
        );
      },
      _getCreateEventData: function () {
        return {
          tab: this.active,
          panel: this.active.length ? this._getPanelForTab(this.active) : e(),
        };
      },
      _tabKeydown: function (t) {
        var i = e(this.document[0].activeElement).closest("li"),
          s = this.tabs.index(i),
          n = !0;
        if (!this._handlePageNav(t)) {
          switch (t.keyCode) {
            case e.ui.keyCode.RIGHT:
            case e.ui.keyCode.DOWN:
              s++;
              break;
            case e.ui.keyCode.UP:
            case e.ui.keyCode.LEFT:
              (n = !1), s--;
              break;
            case e.ui.keyCode.END:
              s = this.anchors.length - 1;
              break;
            case e.ui.keyCode.HOME:
              s = 0;
              break;
            case e.ui.keyCode.SPACE:
              return (
                t.preventDefault(),
                clearTimeout(this.activating),
                this._activate(s),
                void 0
              );
            case e.ui.keyCode.ENTER:
              return (
                t.preventDefault(),
                clearTimeout(this.activating),
                this._activate(s === this.options.active ? !1 : s),
                void 0
              );
            default:
              return;
          }
          t.preventDefault(),
            clearTimeout(this.activating),
            (s = this._focusNextTab(s, n)),
            t.ctrlKey ||
              t.metaKey ||
              (i.attr("aria-selected", "false"),
              this.tabs.eq(s).attr("aria-selected", "true"),
              (this.activating = this._delay(function () {
                this.option("active", s);
              }, this.delay)));
        }
      },
      _panelKeydown: function (t) {
        this._handlePageNav(t) ||
          (t.ctrlKey &&
            t.keyCode === e.ui.keyCode.UP &&
            (t.preventDefault(), this.active.focus()));
      },
      _handlePageNav: function (t) {
        return t.altKey && t.keyCode === e.ui.keyCode.PAGE_UP
          ? (this._activate(this._focusNextTab(this.options.active - 1, !1)),
            !0)
          : t.altKey && t.keyCode === e.ui.keyCode.PAGE_DOWN
          ? (this._activate(this._focusNextTab(this.options.active + 1, !0)),
            !0)
          : void 0;
      },
      _findNextTab: function (t, i) {
        function s() {
          return t > n && (t = 0), 0 > t && (t = n), t;
        }
        for (
          var n = this.tabs.length - 1;
          -1 !== e.inArray(s(), this.options.disabled);

        )
          t = i ? t + 1 : t - 1;
        return t;
      },
      _focusNextTab: function (e, t) {
        return (e = this._findNextTab(e, t)), this.tabs.eq(e).focus(), e;
      },
      _setOption: function (e, t) {
        return "active" === e
          ? (this._activate(t), void 0)
          : "disabled" === e
          ? (this._setupDisabled(t), void 0)
          : (this._super(e, t),
            "collapsible" === e &&
              (this.element.toggleClass("ui-tabs-collapsible", t),
              t || this.options.active !== !1 || this._activate(0)),
            "event" === e && this._setupEvents(t),
            "heightStyle" === e && this._setupHeightStyle(t),
            void 0);
      },
      _sanitizeSelector: function (e) {
        return e
          ? e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&")
          : "";
      },
      refresh: function () {
        var t = this.options,
          i = this.tablist.children(":has(a[href])");
        (t.disabled = e.map(i.filter(".ui-state-disabled"), function (e) {
          return i.index(e);
        })),
          this._processTabs(),
          t.active !== !1 && this.anchors.length
            ? this.active.length && !e.contains(this.tablist[0], this.active[0])
              ? this.tabs.length === t.disabled.length
                ? ((t.active = !1), (this.active = e()))
                : this._activate(
                    this._findNextTab(Math.max(0, t.active - 1), !1)
                  )
              : (t.active = this.tabs.index(this.active))
            : ((t.active = !1), (this.active = e())),
          this._refresh();
      },
      _refresh: function () {
        this._setupDisabled(this.options.disabled),
          this._setupEvents(this.options.event),
          this._setupHeightStyle(this.options.heightStyle),
          this.tabs
            .not(this.active)
            .attr({
              "aria-selected": "false",
              "aria-expanded": "false",
              tabIndex: -1,
            }),
          this.panels
            .not(this._getPanelForTab(this.active))
            .hide()
            .attr({ "aria-hidden": "true" }),
          this.active.length
            ? (this.active
                .addClass("ui-tabs-active ui-state-active")
                .attr({
                  "aria-selected": "true",
                  "aria-expanded": "true",
                  tabIndex: 0,
                }),
              this._getPanelForTab(this.active)
                .show()
                .attr({ "aria-hidden": "false" }))
            : this.tabs.eq(0).attr("tabIndex", 0);
      },
      _processTabs: function () {
        var t = this,
          i = this.tabs,
          s = this.anchors,
          n = this.panels;
        (this.tablist = this._getList()
          .addClass(
            "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
          )
          .attr("role", "tablist")
          .delegate("> li", "mousedown" + this.eventNamespace, function (t) {
            e(this).is(".ui-state-disabled") && t.preventDefault();
          })
          .delegate(
            ".ui-tabs-anchor",
            "focus" + this.eventNamespace,
            function () {
              e(this).closest("li").is(".ui-state-disabled") && this.blur();
            }
          )),
          (this.tabs = this.tablist
            .find("> li:has(a[href])")
            .addClass("ui-state-default ui-corner-top")
            .attr({ role: "tab", tabIndex: -1 })),
          (this.anchors = this.tabs
            .map(function () {
              return e("a", this)[0];
            })
            .addClass("ui-tabs-anchor")
            .attr({ role: "presentation", tabIndex: -1 })),
          (this.panels = e()),
          this.anchors.each(function (i, s) {
            var n,
              a,
              o,
              r = e(s).uniqueId().attr("id"),
              h = e(s).closest("li"),
              l = h.attr("aria-controls");
            t._isLocal(s)
              ? ((n = s.hash),
                (o = n.substring(1)),
                (a = t.element.find(t._sanitizeSelector(n))))
              : ((o = h.attr("aria-controls") || e({}).uniqueId()[0].id),
                (n = "#" + o),
                (a = t.element.find(n)),
                a.length ||
                  ((a = t._createPanel(o)),
                  a.insertAfter(t.panels[i - 1] || t.tablist)),
                a.attr("aria-live", "polite")),
              a.length && (t.panels = t.panels.add(a)),
              l && h.data("ui-tabs-aria-controls", l),
              h.attr({ "aria-controls": o, "aria-labelledby": r }),
              a.attr("aria-labelledby", r);
          }),
          this.panels
            .addClass("ui-tabs-panel ui-widget-content ui-corner-bottom")
            .attr("role", "tabpanel"),
          i &&
            (this._off(i.not(this.tabs)),
            this._off(s.not(this.anchors)),
            this._off(n.not(this.panels)));
      },
      _getList: function () {
        return this.tablist || this.element.find("ol,ul").eq(0);
      },
      _createPanel: function (t) {
        return e("<div>")
          .attr("id", t)
          .addClass("ui-tabs-panel ui-widget-content ui-corner-bottom")
          .data("ui-tabs-destroy", !0);
      },
      _setupDisabled: function (t) {
        e.isArray(t) &&
          (t.length ? t.length === this.anchors.length && (t = !0) : (t = !1));
        for (var i, s = 0; (i = this.tabs[s]); s++)
          t === !0 || -1 !== e.inArray(s, t)
            ? e(i).addClass("ui-state-disabled").attr("aria-disabled", "true")
            : e(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
        this.options.disabled = t;
      },
      _setupEvents: function (t) {
        var i = {};
        t &&
          e.each(t.split(" "), function (e, t) {
            i[t] = "_eventHandler";
          }),
          this._off(this.anchors.add(this.tabs).add(this.panels)),
          this._on(!0, this.anchors, {
            click: function (e) {
              e.preventDefault();
            },
          }),
          this._on(this.anchors, i),
          this._on(this.tabs, { keydown: "_tabKeydown" }),
          this._on(this.panels, { keydown: "_panelKeydown" }),
          this._focusable(this.tabs),
          this._hoverable(this.tabs);
      },
      _setupHeightStyle: function (t) {
        var i,
          s = this.element.parent();
        "fill" === t
          ? ((i = s.height()),
            (i -= this.element.outerHeight() - this.element.height()),
            this.element.siblings(":visible").each(function () {
              var t = e(this),
                s = t.css("position");
              "absolute" !== s && "fixed" !== s && (i -= t.outerHeight(!0));
            }),
            this.element
              .children()
              .not(this.panels)
              .each(function () {
                i -= e(this).outerHeight(!0);
              }),
            this.panels
              .each(function () {
                e(this).height(
                  Math.max(0, i - e(this).innerHeight() + e(this).height())
                );
              })
              .css("overflow", "auto"))
          : "auto" === t &&
            ((i = 0),
            this.panels
              .each(function () {
                i = Math.max(i, e(this).height("").height());
              })
              .height(i));
      },
      _eventHandler: function (t) {
        var i = this.options,
          s = this.active,
          n = e(t.currentTarget),
          a = n.closest("li"),
          o = a[0] === s[0],
          r = o && i.collapsible,
          h = r ? e() : this._getPanelForTab(a),
          l = s.length ? this._getPanelForTab(s) : e(),
          u = { oldTab: s, oldPanel: l, newTab: r ? e() : a, newPanel: h };
        t.preventDefault(),
          a.hasClass("ui-state-disabled") ||
            a.hasClass("ui-tabs-loading") ||
            this.running ||
            (o && !i.collapsible) ||
            this._trigger("beforeActivate", t, u) === !1 ||
            ((i.active = r ? !1 : this.tabs.index(a)),
            (this.active = o ? e() : a),
            this.xhr && this.xhr.abort(),
            l.length ||
              h.length ||
              e.error("jQuery UI Tabs: Mismatching fragment identifier."),
            h.length && this.load(this.tabs.index(a), t),
            this._toggle(t, u));
      },
      _toggle: function (t, i) {
        function s() {
          (a.running = !1), a._trigger("activate", t, i);
        }
        function n() {
          i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),
            o.length && a.options.show
              ? a._show(o, a.options.show, s)
              : (o.show(), s());
        }
        var a = this,
          o = i.newPanel,
          r = i.oldPanel;
        (this.running = !0),
          r.length && this.options.hide
            ? this._hide(r, this.options.hide, function () {
                i.oldTab
                  .closest("li")
                  .removeClass("ui-tabs-active ui-state-active"),
                  n();
              })
            : (i.oldTab
                .closest("li")
                .removeClass("ui-tabs-active ui-state-active"),
              r.hide(),
              n()),
          r.attr("aria-hidden", "true"),
          i.oldTab.attr({ "aria-selected": "false", "aria-expanded": "false" }),
          o.length && r.length
            ? i.oldTab.attr("tabIndex", -1)
            : o.length &&
              this.tabs
                .filter(function () {
                  return 0 === e(this).attr("tabIndex");
                })
                .attr("tabIndex", -1),
          o.attr("aria-hidden", "false"),
          i.newTab.attr({
            "aria-selected": "true",
            "aria-expanded": "true",
            tabIndex: 0,
          });
      },
      _activate: function (t) {
        var i,
          s = this._findActive(t);
        s[0] !== this.active[0] &&
          (s.length || (s = this.active),
          (i = s.find(".ui-tabs-anchor")[0]),
          this._eventHandler({
            target: i,
            currentTarget: i,
            preventDefault: e.noop,
          }));
      },
      _findActive: function (t) {
        return t === !1 ? e() : this.tabs.eq(t);
      },
      _getIndex: function (e) {
        return (
          "string" == typeof e &&
            (e = this.anchors.index(
              this.anchors.filter("[href$='" + e + "']")
            )),
          e
        );
      },
      _destroy: function () {
        this.xhr && this.xhr.abort(),
          this.element.removeClass(
            "ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"
          ),
          this.tablist
            .removeClass(
              "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
            )
            .removeAttr("role"),
          this.anchors
            .removeClass("ui-tabs-anchor")
            .removeAttr("role")
            .removeAttr("tabIndex")
            .removeUniqueId(),
          this.tablist.unbind(this.eventNamespace),
          this.tabs.add(this.panels).each(function () {
            e.data(this, "ui-tabs-destroy")
              ? e(this).remove()
              : e(this)
                  .removeClass(
                    "ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel"
                  )
                  .removeAttr("tabIndex")
                  .removeAttr("aria-live")
                  .removeAttr("aria-busy")
                  .removeAttr("aria-selected")
                  .removeAttr("aria-labelledby")
                  .removeAttr("aria-hidden")
                  .removeAttr("aria-expanded")
                  .removeAttr("role");
          }),
          this.tabs.each(function () {
            var t = e(this),
              i = t.data("ui-tabs-aria-controls");
            i
              ? t.attr("aria-controls", i).removeData("ui-tabs-aria-controls")
              : t.removeAttr("aria-controls");
          }),
          this.panels.show(),
          "content" !== this.options.heightStyle &&
            this.panels.css("height", "");
      },
      enable: function (t) {
        var i = this.options.disabled;
        i !== !1 &&
          (void 0 === t
            ? (i = !1)
            : ((t = this._getIndex(t)),
              (i = e.isArray(i)
                ? e.map(i, function (e) {
                    return e !== t ? e : null;
                  })
                : e.map(this.tabs, function (e, i) {
                    return i !== t ? i : null;
                  }))),
          this._setupDisabled(i));
      },
      disable: function (t) {
        var i = this.options.disabled;
        if (i !== !0) {
          if (void 0 === t) i = !0;
          else {
            if (((t = this._getIndex(t)), -1 !== e.inArray(t, i))) return;
            i = e.isArray(i) ? e.merge([t], i).sort() : [t];
          }
          this._setupDisabled(i);
        }
      },
      load: function (t, i) {
        t = this._getIndex(t);
        var s = this,
          n = this.tabs.eq(t),
          a = n.find(".ui-tabs-anchor"),
          o = this._getPanelForTab(n),
          r = { tab: n, panel: o },
          h = function (e, t) {
            "abort" === t && s.panels.stop(!1, !0),
              n.removeClass("ui-tabs-loading"),
              o.removeAttr("aria-busy"),
              e === s.xhr && delete s.xhr;
          };
        this._isLocal(a[0]) ||
          ((this.xhr = e.ajax(this._ajaxSettings(a, i, r))),
          this.xhr &&
            "canceled" !== this.xhr.statusText &&
            (n.addClass("ui-tabs-loading"),
            o.attr("aria-busy", "true"),
            this.xhr
              .done(function (e, t, n) {
                setTimeout(function () {
                  o.html(e), s._trigger("load", i, r), h(n, t);
                }, 1);
              })
              .fail(function (e, t) {
                setTimeout(function () {
                  h(e, t);
                }, 1);
              })));
      },
      _ajaxSettings: function (t, i, s) {
        var n = this;
        return {
          url: t.attr("href"),
          beforeSend: function (t, a) {
            return n._trigger(
              "beforeLoad",
              i,
              e.extend({ jqXHR: t, ajaxSettings: a }, s)
            );
          },
        };
      },
      _getPanelForTab: function (t) {
        var i = e(t).attr("aria-controls");
        return this.element.find(this._sanitizeSelector("#" + i));
      },
    }),
    e.widget("ui.tooltip", {
      version: "1.11.4",
      options: {
        content: function () {
          var t = e(this).attr("title") || "";
          return e("<a>").text(t).html();
        },
        hide: !0,
        items: "[title]:not([disabled])",
        position: {
          my: "left top+15",
          at: "left bottom",
          collision: "flipfit flip",
        },
        show: !0,
        tooltipClass: null,
        track: !1,
        close: null,
        open: null,
      },
      _addDescribedBy: function (t, i) {
        var s = (t.attr("aria-describedby") || "").split(/\s+/);
        s.push(i),
          t
            .data("ui-tooltip-id", i)
            .attr("aria-describedby", e.trim(s.join(" ")));
      },
      _removeDescribedBy: function (t) {
        var i = t.data("ui-tooltip-id"),
          s = (t.attr("aria-describedby") || "").split(/\s+/),
          n = e.inArray(i, s);
        -1 !== n && s.splice(n, 1),
          t.removeData("ui-tooltip-id"),
          (s = e.trim(s.join(" "))),
          s ? t.attr("aria-describedby", s) : t.removeAttr("aria-describedby");
      },
      _create: function () {
        this._on({ mouseover: "open", focusin: "open" }),
          (this.tooltips = {}),
          (this.parents = {}),
          this.options.disabled && this._disable(),
          (this.liveRegion = e("<div>")
            .attr({
              role: "log",
              "aria-live": "assertive",
              "aria-relevant": "additions",
            })
            .addClass("ui-helper-hidden-accessible")
            .appendTo(this.document[0].body));
      },
      _setOption: function (t, i) {
        var s = this;
        return "disabled" === t
          ? (this[i ? "_disable" : "_enable"](), (this.options[t] = i), void 0)
          : (this._super(t, i),
            "content" === t &&
              e.each(this.tooltips, function (e, t) {
                s._updateContent(t.element);
              }),
            void 0);
      },
      _disable: function () {
        var t = this;
        e.each(this.tooltips, function (i, s) {
          var n = e.Event("blur");
          (n.target = n.currentTarget = s.element[0]), t.close(n, !0);
        }),
          this.element
            .find(this.options.items)
            .addBack()
            .each(function () {
              var t = e(this);
              t.is("[title]") &&
                t.data("ui-tooltip-title", t.attr("title")).removeAttr("title");
            });
      },
      _enable: function () {
        this.element
          .find(this.options.items)
          .addBack()
          .each(function () {
            var t = e(this);
            t.data("ui-tooltip-title") &&
              t.attr("title", t.data("ui-tooltip-title"));
          });
      },
      open: function (t) {
        var i = this,
          s = e(t ? t.target : this.element).closest(this.options.items);
        s.length &&
          !s.data("ui-tooltip-id") &&
          (s.attr("title") && s.data("ui-tooltip-title", s.attr("title")),
          s.data("ui-tooltip-open", !0),
          t &&
            "mouseover" === t.type &&
            s.parents().each(function () {
              var t,
                s = e(this);
              s.data("ui-tooltip-open") &&
                ((t = e.Event("blur")),
                (t.target = t.currentTarget = this),
                i.close(t, !0)),
                s.attr("title") &&
                  (s.uniqueId(),
                  (i.parents[this.id] = {
                    element: this,
                    title: s.attr("title"),
                  }),
                  s.attr("title", ""));
            }),
          this._registerCloseHandlers(t, s),
          this._updateContent(s, t));
      },
      _updateContent: function (e, t) {
        var i,
          s = this.options.content,
          n = this,
          a = t ? t.type : null;
        return "string" == typeof s
          ? this._open(t, e, s)
          : ((i = s.call(e[0], function (i) {
              n._delay(function () {
                e.data("ui-tooltip-open") &&
                  (t && (t.type = a), this._open(t, e, i));
              });
            })),
            i && this._open(t, e, i),
            void 0);
      },
      _open: function (t, i, s) {
        function n(e) {
          (l.of = e), o.is(":hidden") || o.position(l);
        }
        var a,
          o,
          r,
          h,
          l = e.extend({}, this.options.position);
        if (s) {
          if ((a = this._find(i)))
            return a.tooltip.find(".ui-tooltip-content").html(s), void 0;
          i.is("[title]") &&
            (t && "mouseover" === t.type
              ? i.attr("title", "")
              : i.removeAttr("title")),
            (a = this._tooltip(i)),
            (o = a.tooltip),
            this._addDescribedBy(i, o.attr("id")),
            o.find(".ui-tooltip-content").html(s),
            this.liveRegion.children().hide(),
            s.clone
              ? ((h = s.clone()),
                h.removeAttr("id").find("[id]").removeAttr("id"))
              : (h = s),
            e("<div>").html(h).appendTo(this.liveRegion),
            this.options.track && t && /^mouse/.test(t.type)
              ? (this._on(this.document, { mousemove: n }), n(t))
              : o.position(e.extend({ of: i }, this.options.position)),
            o.hide(),
            this._show(o, this.options.show),
            this.options.show &&
              this.options.show.delay &&
              (r = this.delayedShow =
                setInterval(function () {
                  o.is(":visible") && (n(l.of), clearInterval(r));
                }, e.fx.interval)),
            this._trigger("open", t, { tooltip: o });
        }
      },
      _registerCloseHandlers: function (t, i) {
        var s = {
          keyup: function (t) {
            if (t.keyCode === e.ui.keyCode.ESCAPE) {
              var s = e.Event(t);
              (s.currentTarget = i[0]), this.close(s, !0);
            }
          },
        };
        i[0] !== this.element[0] &&
          (s.remove = function () {
            this._removeTooltip(this._find(i).tooltip);
          }),
          (t && "mouseover" !== t.type) || (s.mouseleave = "close"),
          (t && "focusin" !== t.type) || (s.focusout = "close"),
          this._on(!0, i, s);
      },
      close: function (t) {
        var i,
          s = this,
          n = e(t ? t.currentTarget : this.element),
          a = this._find(n);
        return a
          ? ((i = a.tooltip),
            a.closing ||
              (clearInterval(this.delayedShow),
              n.data("ui-tooltip-title") &&
                !n.attr("title") &&
                n.attr("title", n.data("ui-tooltip-title")),
              this._removeDescribedBy(n),
              (a.hiding = !0),
              i.stop(!0),
              this._hide(i, this.options.hide, function () {
                s._removeTooltip(e(this));
              }),
              n.removeData("ui-tooltip-open"),
              this._off(n, "mouseleave focusout keyup"),
              n[0] !== this.element[0] && this._off(n, "remove"),
              this._off(this.document, "mousemove"),
              t &&
                "mouseleave" === t.type &&
                e.each(this.parents, function (t, i) {
                  e(i.element).attr("title", i.title), delete s.parents[t];
                }),
              (a.closing = !0),
              this._trigger("close", t, { tooltip: i }),
              a.hiding || (a.closing = !1)),
            void 0)
          : (n.removeData("ui-tooltip-open"), void 0);
      },
      _tooltip: function (t) {
        var i = e("<div>")
            .attr("role", "tooltip")
            .addClass(
              "ui-tooltip ui-widget ui-corner-all ui-widget-content " +
                (this.options.tooltipClass || "")
            ),
          s = i.uniqueId().attr("id");
        return (
          e("<div>").addClass("ui-tooltip-content").appendTo(i),
          i.appendTo(this.document[0].body),
          (this.tooltips[s] = { element: t, tooltip: i })
        );
      },
      _find: function (e) {
        var t = e.data("ui-tooltip-id");
        return t ? this.tooltips[t] : null;
      },
      _removeTooltip: function (e) {
        e.remove(), delete this.tooltips[e.attr("id")];
      },
      _destroy: function () {
        var t = this;
        e.each(this.tooltips, function (i, s) {
          var n = e.Event("blur"),
            a = s.element;
          (n.target = n.currentTarget = a[0]),
            t.close(n, !0),
            e("#" + i).remove(),
            a.data("ui-tooltip-title") &&
              (a.attr("title") || a.attr("title", a.data("ui-tooltip-title")),
              a.removeData("ui-tooltip-title"));
        }),
          this.liveRegion.remove();
      },
    });
});
