function getScreenshots(e) {
    var t = /(\?v=|\&v=|\/\d\/|\/embed\/|\/v\/|\.be\/)([a-zA-Z0-9\-\_]+)/
      , n = e
      , o = n.match(t);
    o ? printScreenshots(o[2]) : alert("Invalid youtube link")
	$.ajax({
		  url: "https://www.googleapis.com/youtube/v3/videos?id="+o[2]+"&key=AIzaSyAkEHUoEOh8NrrKvH26cT7jkXabKqb6CIg&fields=items(snippet)&part=snippet", 
		  dataType: "jsonp",
		  success: function(data){
				   document.title = data.items[0].snippet.title+" - YouTube";    
					if($(".title").length) {
						$(".title").remove();
					}				   
					$("<h2 class='title'>"+data.items[0].snippet.title+"</h2>").attr("title",data.items[0].snippet.title).appendTo("#ytvideo");
					$('body,html').animate({
						scrollTop: $("#custom").offset().top
					}, 200);
					$("#search-results").empty();
					$("#results").empty();
					$("#query").val("");
					$(".video-description").remove();
					var description = data.items[0].snippet.description;
					description = description.replace(/\n/g, "<br>");
					description = description.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1">$1</a>');
					$("<p class='video-description'>"+description+"</p>").insertAfter("#ytvideo");
					document.cookie = "url="+o[2]+";path=/";
		  },
		  error: function(jqXHR, textStatus, errorThrown) {
			  alert (textStatus, + ' | ' + errorThrown);
		  }
	  });
}
function printScreenshots(e) {
    for (var t, n = 0; 4 > n; n++)
        t = "http://img.youtube.com/vi/" + e + "/" + n + ".jpg",
        $(".ss" + n + " img").attr("src", t);
    $(".hd img").attr("src", "http://img.youtube.com/vi/" + e + "/maxresdefault.jpg"),
    $(".screenshots").show(),
    $("#mainshot").show(),
    $("#custom").show(),
    $("#canvas").hide(),
    YoutubeVideo(e, function(e) {
        // console.log(e.title);
        // console.log(e);
        var t = e.getSource("video/webm", "hd720");
        // console.log("WebM: " + t.url);
        var n = e.getSource("video/mp4", "hd720");
        // console.log("MP4: " + n.url),
		if($("#vid").length) {
			$("#vid").remove();
		}
        $("<video id='vid' autoplay='' controls='controls'/>").attr("src", n.url).appendTo("#ytvideo");
        var o, i, r, a, d, s, e = document.getElementById("vid"), l = document.getElementById("canvas");
        $("#snap").click(function() {
            o = a || o,
            i = d || i,
            l.width = o,
            l.height = i,
            u.fillRect(0, 0, o, i),
            u.drawImage(e, 0, 0, o, i),
            $("#mainshot").hide(),
            $("#canvas").show(),
            $("#resolution").show(),
            $("#width").val(o),
            $("#height").val(i)
        }),
        $("#resize").click(function() {
            var e = document.getElementById("vid");
            s = e.videoWidth / e.videoHeight,
            a = $("#width").val(),
            d = $("#height").val() > 0 ? $("#height").val() : parseInt(a / s, 10),
            l.width = a,
            l.height = d,
            u.fillRect(0, 0, a, d),
            u.drawImage(e, 0, 0, a, d),
            $("#width").val(a)
        })
    })
}
$(document).ready(function() {
    // console.log("redi"),
    $("#url-submit").click(function() {
        $("#videourl").val() && getScreenshots($("#videourl").val())
    })
	$("#url-embed").click(function() {
        $("#videourl").val() && embedVideo($("#videourl").val())
    })
}),
function() {
    window.YoutubeVideo = function(e, t) {
        // console.log(e);
        var n = "https://crossorigin.me/";
        n = "";
        // n = "https://at8u8s124e.execute-api.eu-west-1.amazonaws.com/prod"
        n = "https://eywbadb872.execute-api.eu-west-1.amazonaws.com/prod"
        return $.ajax({
            //url: n +"http://www.youtube.com/get_video_info?video_id=" + e,
            url: n +"?video_id=" + e,
            dataType: "text"
        }).done(function(e) {
        	// console.log(e);
            var n;
            return n = YoutubeVideo.decodeQueryString(e),
            "fail" === n.status ? t(n) : (n.sources = YoutubeVideo.decodeStreamMap(n.url_encoded_fmt_stream_map),
            n.getSource = function(e, t) {
                var n, o, i, r, a;
                i = null ,
                n = null ,
                a = this.sources;
                for (o in a)
                    r = a[o],
                    r.type.match(e) && (r.quality.match(t) ? n = r : i = r);
                return n || i
            }
            ,
            t(n))
        }).fail(function(err) {
        	console.log(err);
        });
    }
    ,
    window.YoutubeVideo.decodeQueryString = function(e) {
        var t, n, o, i, r, a, d;
        for (i = {},
        o = e.split("&"),
        a = 0,
        d = o.length; d > a; a++)
            n = o[a],
            t = decodeURIComponent(n.split("=")[0]),
            r = decodeURIComponent(n.split("=")[1] || ""),
            i[t] = r;
        return i
    }
    ,
    window.YoutubeVideo.decodeStreamMap = function(e) {
        var t, n, o, i, r, a, d, s;
        for (n = {},
        s = e.split(","),
        a = 0,
        d = s.length; d > a; a++)
            r = s[a],
            o = YoutubeVideo.decodeQueryString(r),
            i = o.type.split(";")[0],
            t = o.quality.split(",")[0],
            o.original_url = o.url,
            o.url = "" + o.url + "&signature=" + o.sig,
            n["" + i + " " + t] = o;
        return n
    }
}
.call(this);
var Holder = Holder || {};
!function(e, t) {
    function n(e, t) {
        var n = "complete"
          , o = "readystatechange"
          , i = !1
          , r = i
          , a = !0
          , d = e.document
          , s = d.documentElement
          , l = d.addEventListener ? "addEventListener" : "attachEvent"
          , u = d.addEventListener ? "removeEventListener" : "detachEvent"
          , c = d.addEventListener ? "" : "on"
          , h = function(a) {
            (a.type != o || d.readyState == n) && (("load" == a.type ? e : d)[u](c + a.type, h, i),
            !r && (r = !0) && t.call(e, null ))
        }
          , g = function() {
            try {
                s.doScroll("left")
            } catch (e) {
                return void setTimeout(g, 50)
            }
            h("poll")
        };
        if (d.readyState == n)
            t.call(e, "lazy");
        else {
            if (d.createEventObject && s.doScroll) {
                try {
                    a = !e.frameElement
                } catch (f) {}
                a && g()
            }
            d[l](c + "DOMContentLoaded", h, i),
            d[l](c + o, h, i),
            e[l](c + "load", h, i)
        }
    }
    function o(e) {
        e = e.match(/^(\W)?(.*)/);
        var t = document["getElement" + (e[1] ? "#" == e[1] ? "ById" : "sByClassName" : "sByTagName")](e[2])
          , n = [];
        return null != t && (n = t.length ? t : 0 == t.length ? t : [t]),
        n
    }
    function r(e, t) {
        var n = {};
        for (var o in e)
            n[o] = e[o];
        for (var i in t)
            n[i] = t[i];
        return n
    }
    function a(e, t, n) {
        var o = [t, e].sort()
          , i = Math.round(o[1] / 16)
          , r = (Math.round(o[0] / 16),
        Math.max(n.size, i));
        return {
            height: r
        }
    }
    function d(e, t, n, o) {
        var i = a(t.width, t.height, n)
          , r = i.height
          , d = t.width * o
          , s = t.height * o
          , l = n.font ? n.font : "sans-serif";
        f.width = d,
        f.height = s,
        e.textAlign = "center",
        e.textBaseline = "middle",
        e.fillStyle = n.background,
        e.fillRect(0, 0, d, s),
        e.fillStyle = n.foreground,
        e.font = "bold " + r + "px " + l;
        var u = n.text ? n.text : t.width + "x" + t.height;
        return e.measureText(u).width / d > 1 && (r = n.size / (e.measureText(u).width / d)),
        e.font = "bold " + r * o + "px " + l,
        e.fillText(u, d / 2, s / 2, d),
        f.toDataURL("image/png")
    }
    function s(e, t, n, o) {
        var i = n.dimensions
          , a = n.theme
          , s = n.text ? decodeURIComponent(n.text) : n.text
          , l = i.width + "x" + i.height;
        a = s ? r(a, {
            text: s
        }) : a,
        a = n.font ? r(a, {
            font: n.font
        }) : a;
        var u = 1;
        window.devicePixelRatio && window.devicePixelRatio > 1 && (u = window.devicePixelRatio),
        "image" == e ? (t.setAttribute("data-src", o),
        t.setAttribute("alt", s ? s : a.text ? a.text + " [" + l + "]" : l),
        (g || !n.auto) && (t.style.width = i.width + "px",
        t.style.height = i.height + "px"),
        g ? t.style.backgroundColor = a.background : t.setAttribute("src", d(m, i, a, u))) : g || (t.style.backgroundImage = "url(" + d(m, i, a, u) + ")",
        t.style.backgroundSize = i.width + "px " + i.height + "px")
    }
    function l(e, t, n) {
        var o = t.dimensions
          , i = t.theme
          , a = t.text
          , d = o.width + "x" + o.height;
        i = a ? r(i, {
            text: a
        }) : i;
        var s = document.createElement("div");
        s.style.backgroundColor = i.background,
        s.style.color = i.foreground,
        s.className = e.className + " holderjs-fluid",
        s.style.width = t.dimensions.width + (t.dimensions.width.indexOf("%") > 0 ? "" : "px"),
        s.style.height = t.dimensions.height + (t.dimensions.height.indexOf("%") > 0 ? "" : "px"),
        s.id = e.id,
        e.style.width = 0,
        e.style.height = 0,
        i.text ? s.appendChild(document.createTextNode(i.text)) : (s.appendChild(document.createTextNode(d)),
        v.push(s),
        setTimeout(u, 0)),
        e.parentNode.insertBefore(s, e.nextSibling),
        window.jQuery && jQuery(function(t) {
            t(e).on("load", function() {
                e.style.width = s.style.width,
                e.style.height = s.style.height,
                t(e).show(),
                t(s).remove()
            })
        })
    }
    function u() {
        for (i in v)
            if (v.hasOwnProperty(i)) {
                var e = v[i]
                  , t = e.firstChild;
                e.style.lineHeight = e.offsetHeight + "px",
                t.data = e.offsetWidth + "x" + e.offsetHeight
            }
    }
    function c(t, n) {
        var o = {
            theme: p.themes.gray
        }
          , i = !1;
        for (sl = t.length,
        j = 0; j < sl; j++) {
            var r = t[j];
            e.flags.dimensions.match(r) ? (i = !0,
            o.dimensions = e.flags.dimensions.output(r)) : e.flags.fluid.match(r) ? (i = !0,
            o.dimensions = e.flags.fluid.output(r),
            o.fluid = !0) : e.flags.colors.match(r) ? o.theme = e.flags.colors.output(r) : n.themes[r] ? o.theme = n.themes[r] : e.flags.text.match(r) ? o.text = e.flags.text.output(r) : e.flags.font.match(r) ? o.font = e.flags.font.output(r) : e.flags.auto.match(r) && (o.auto = !0)
        }
        return i ? o : !1
    }
    var h = !1
      , g = !1
      , f = document.createElement("canvas");
    if (document.getElementsByClassName || (document.getElementsByClassName = function(e) {
        var t, n, o, i = document, r = [];
        if (i.querySelectorAll)
            return i.querySelectorAll("." + e);
        if (i.evaluate)
            for (n = ".//*[contains(concat(' ', @class, ' '), ' " + e + " ')]",
            t = i.evaluate(n, i, null , 0, null ); o = t.iterateNext(); )
                r.push(o);
        else
            for (t = i.getElementsByTagName("*"),
            n = new RegExp("(^|\\s)" + e + "(\\s|$)"),
            o = 0; o < t.length; o++)
                n.test(t[o].className) && r.push(t[o]);
        return r
    }
    ),
    window.getComputedStyle || (window.getComputedStyle = function(e, t) {
        return this.el = e,
        this.getPropertyValue = function(t) {
            var n = /(\-([a-z]){1})/g;
            return "float" == t && (t = "styleFloat"),
            n.test(t) && (t = t.replace(n, function() {
                return arguments[2].toUpperCase()
            })),
            e.currentStyle[t] ? e.currentStyle[t] : null
        }
        ,
        this
    }
    ),
    Object.prototype.hasOwnProperty || (Object.prototype.hasOwnProperty = function(e) {
        var t = this.__proto__ || this.constructor.prototype;
        return e in this && (!(e in t) || t[e] !== this[e])
    }
    ),
    f.getContext)
        if (f.toDataURL("image/png").indexOf("data:image/png") < 0)
            g = !0;
        else
            var m = f.getContext("2d");
    else
        g = !0;
    var v = []
      , p = {
        domain: "holder.js",
        images: "img",
        bgnodes: ".holderjs",
        themes: {
            gray: {
                background: "#eee",
                foreground: "#aaa",
                size: 12
            },
            social: {
                background: "#3a5a97",
                foreground: "#fff",
                size: 12
            },
            industrial: {
                background: "#434A52",
                foreground: "#C2F200",
                size: 12
            }
        },
        stylesheet: ".holderjs-fluid {font-size:16px;font-weight:bold;text-align:center;font-family:sans-serif;margin:0}"
    };
    e.flags = {
        dimensions: {
            regex: /^(\d+)x(\d+)$/,
            output: function(e) {
                var t = this.regex.exec(e);
                return {
                    width: +t[1],
                    height: +t[2]
                }
            }
        },
        fluid: {
            regex: /^([0-9%]+)x([0-9%]+)$/,
            output: function(e) {
                var t = this.regex.exec(e);
                return {
                    width: t[1],
                    height: t[2]
                }
            }
        },
        colors: {
            regex: /#([0-9a-f]{3,})\:#([0-9a-f]{3,})/i,
            output: function(e) {
                var t = this.regex.exec(e);
                return {
                    size: p.themes.gray.size,
                    foreground: "#" + t[2],
                    background: "#" + t[1]
                }
            }
        },
        text: {
            regex: /text\:(.*)/,
            output: function(e) {
                return this.regex.exec(e)[1]
            }
        },
        font: {
            regex: /font\:(.*)/,
            output: function(e) {
                return this.regex.exec(e)[1]
            }
        },
        auto: {
            regex: /^auto$/
        }
    };
    for (var y in e.flags)
        e.flags.hasOwnProperty(y) && (e.flags[y].match = function(e) {
            return e.match(this.regex)
        }
        );
    e.add_theme = function(t, n) {
        return null != t && null != n && (p.themes[t] = n),
        e
    }
    ,
    e.add_image = function(t, n) {
        var i = o(n);
        if (i.length)
            for (var r = 0, a = i.length; a > r; r++) {
                var d = document.createElement("img");
                d.setAttribute("data-src", t),
                i[r].appendChild(d)
            }
        return e
    }
    ,
    e.run = function(t) {
        var n = r(p, t)
          , i = [];
        for (n.images instanceof window.NodeList ? imageNodes = n.images : n.images instanceof window.Node ? imageNodes = [n.images] : imageNodes = o(n.images),
        n.elements instanceof window.NodeList ? bgnodes = n.bgnodes : n.bgnodes instanceof window.Node ? bgnodes = [n.bgnodes] : bgnodes = o(n.bgnodes),
        h = !0,
        g = 0,
        u = imageNodes.length; u > g; g++)
            i.push(imageNodes[g]);
        var a = document.getElementById("holderjs-style");
        a || (a = document.createElement("style"),
        a.setAttribute("id", "holderjs-style"),
        a.type = "text/css",
        document.getElementsByTagName("head")[0].appendChild(a)),
        a.styleSheet ? a.styleSheet += n.stylesheet : a.textContent += n.stylesheet;
        for (var d = new RegExp(n.domain + '/(.*?)"?\\)'), u = bgnodes.length, g = 0; u > g; g++) {
            var f = window.getComputedStyle(bgnodes[g], null ).getPropertyValue("background-image")
              , m = f.match(d);
            if (m) {
                var v = c(m[1].split("/"), n);
                v && s("background", bgnodes[g], v, f)
            }
        }
        for (var u = i.length, g = 0; u > g; g++) {
            var f = i[g].getAttribute("src") || i[g].getAttribute("data-src");
            if (null != f && f.indexOf(n.domain) >= 0) {
                var v = c(f.substr(f.lastIndexOf(n.domain) + n.domain.length + 1).split("/"), n);
                v && (v.fluid ? l(i[g], v, f) : s("image", i[g], v, f))
            }
        }
        return e
    }
    ,
    n(t, function() {
        window.addEventListener ? (window.addEventListener("resize", u, !1),
        window.addEventListener("orientationchange", u, !1)) : window.attachEvent("onresize", u),
        h || e.run()
    }),
    "function" == typeof define && define.amd && define("Holder", [], function() {
        return e
    })
}(Holder, window);
$(document).ready(function() {
  $('#query').keydown(function(event) {
    if (event.keyCode == 13) {
      $("#search-button").click();
      return false;
    }
  });
 $('#videourl').keydown(function(event) {
    if (event.keyCode == 13) {
      $("#url-submit").click();
      return false;
    }
  });
});
