function init() {
    indexCreate(); $(".i").keyup(function (e) {
        fetchSuggestions(e.which);
    }); $(document).click(function (e) {
        closeSugBox(e.srcElement);
    }); $(".toggleInfo").click(function () {
        $(".infoBox").toggle(400);
    }); build(firstProp(eng), !1);
}

function firstProp(e) {
    var i = !0;
    for (prop in e) {
        if (i) return prop;
        i = !1;
    }
}

function findNext(e, i) {
    var n = !1,
        t = null;
    for (item in e) n && (t = item, n = !1), item == i && (n = !0);
    return null === t && (t = firstProp(e)), t;
}

function numKeys(e) {
    var i = 0;
    for (var n in e) i++;
    return i;
}

function inArray(e, i) {
    return -1 !== ("," + i.toString() + ",").indexOf("," + e + ",");
}

function build(e, i) {
    var n = i ? fadeDur : 0;
    current.engine = e, e = eng[e], $(".title").html(titlePrefix + e.pageTitle), $(".method").stop().queue("fx", []).animate({
        opacity: 0
    }, n), op = idxState ? idxFadedOpacity : 0, $(".engines a").stop().queue("fx", []).removeClass("active"), $("#" + current.engine + "_logo").addClass("active").animate({
        opacity: 1
    }, fadeDur), $(".engines a:not(.active)").animate({
        opacity: op
    }, fadeDur), "object" == typeof e.languages ? setLang(firstProp(e.languages)) : $(".lang").fadeOut(fadeDur), closeSugBox(!1), $(".i").attr("autosave", "com.infinise.go." + current.engine), $(".input input").focus(), setTimeout(function () {
        $(".method").html("");
        for (place in e.places) $(".method").append("<a onclick='setPlace(this)'>" + place + "</a>");
        setPlace(".method a:first"), $(".method").animate({
            opacity: 1
        }, fadeDur);
    }, n);
}

function nextPlace() {
    var e = findNext(eng[current.engine].places, current.place);
    $(".method a").each(function () {
        $(this).html() == e && setPlace($(this));
    });
}

function nextLanguage() {
    setLang(findNext(eng[current.engine].languages, current.language));
}

function setPlace(e) {
    current.place = $(e).html(), $(".method a").removeClass("active"), $(e).addClass("active"), $(".input input").focus(), eng[current.engine].places[current.place][1] !== !1 ? (fetchSuggestions(), $(".i").attr("autocomplete", "off")) : (closeSugBox(!1), $(".i").attr("autocomplete", "on"));
}

function setLang(e) {
    current.language = e, $(".lang").fadeIn(fadeDur).html(e), $(".input input").focus();
}

function doSearch() {
    var e = eng[current.engine].places[current.place][0];
    return e = e.replace("%query%", encodeURIComponent($(".i").val())), "object" == typeof eng[current.engine].languages && (e = e.replace("%lang%", eng[current.engine].languages[current.language])), window.location.href = e, !1;
}

function indexCreate() {
    var i = 0,
        n = 0,
        t = 0,
        a = 0,
        s = Math.floor(idxWidth / idxLogoSmall[0]);
    for (e in eng) 0 === a && numKeys(eng) - t <= numKeys(eng) % s && (a = s - numKeys(eng) % s, a = a * (idxLogoSmall[0] + idxMargin) / 2), $(".engines").prepend("<a id='" + e + "_logo' ref='" + e + "'><img src='engines/" + eng[e].logo + "'></a>"), n == s && (n = 0, i++), eng[e].idxPos = [(idxLogoSmall[0] + idxMargin) * n - idxWidth / 2 + a, (idxLogoSmall[1] + idxMargin) * i], n++, t++;
    idxHeight = (i + 1) * (idxLogoSmall[1] + idxMargin) - idxMargin, idxHeight = Math.max(idxHeight, idxLogoFull[1]), $(".engines a").click(function () {
        build($(this).attr("ref"), !0);
    }), $(".engines a").css({
        left: "50%",
        bottom: "0",
        marginLeft: -idxLogoFull[0] / 2 + "px"
    }), $(".engines").mouseenter(function () {
        indexOpen();
    }), $(".engines").mouseleave(function () {
        indexClose();
    });
}

function indexOpen() {
    idxState = !0, clearTimeout(idxClear), $(".engines").css({
        height: idxHeight
    });
    for (e in eng) {
        var i = $("#" + e + "_logo").hasClass("active");
        $("#" + e + "_logo").stop().queue("fx", []).animate({
            marginLeft: eng[e].idxPos[0] + "px",
            marginBottom: eng[e].idxPos[1] + "px",
            opacity: i ? 1 : idxFadedOpacity,
            width: idxLogoSmall[0],
            height: idxLogoSmall[1]
        }, fadeDur);
    }
}

function indexClose() {
    idxState = !1, $(".engines").css({
        height: idxLogoFull[1]
    }), $(".engines a").each(function () {
        var e = $(this).hasClass("active");
        $(this).stop().queue("fx", []).animate({
            marginLeft: -idxLogoFull[0] / 2 + "px",
            marginBottom: 0,
            opacity: e ? 1 : 0,
            width: idxLogoFull[0],
            height: idxLogoFull[1]
        }, fadeDur);
    }), idxClear = setTimeout(function () {
        $(".engines a:not(.active)").css("opacity", 0);
    }, fadeDur);
}

function nextEngine() {
    build(findNext(eng, current.engine), !0);
}

function fetchSuggestions(e) {
    if (void 0 == e || !inArray(e, new Array(13, 16, 20, 27, 37, 38, 39, 40)) && !isCtrl && !isCmd)
        if ("" !== $(".i").val() && eng[current.engine].places[current.place][1] !== !1) {
            current.suggestionsTimestamp = (new Date).getTime();
            var i = eng[current.engine].places[current.place][1];
            i = i.replace("%query%", encodeURIComponent($(".i").val())), i = i.replace("%time%", current.suggestionsTimestamp), "object" == typeof eng[current.engine].languages && (i = i.replace("%lang%", eng[current.engine].languages[current.language])), $.getJSON(i, function (e) {
                buildSuggestions(e);
            });
        } else closeSugBox(!1);
}

function buildSuggestions(e) {
    if (e.empty) console && console.log("(1) Suggestions for '" + e.query + "' empty."), closeSugBox(!1);
    else if (e.engine == current.engine && e.timestamp == current.suggestionsTimestamp && e.query == $(".i").val()) {
        console && console.log("(2) Suggestions for '" + e.query + "' accepted."), $(".sugs").html("");
        for (sug in e.results) sug = e.results[sug], $(".sugs").append("<li><a href='" + sug[1] + "'>" + sug[0] + "</a></li>");
        $(".sugs").css({
            display: "block"
        }), $(".sugs li").mousemove(function () {
            $(".sugs .active").removeClass("active"), $(this).addClass("active");
        }).click(function () {
            applySugResult();
        });
    } else console && console.log("(3) Suggestions for '" + e.query + "' discarded.");
}

function prevSugResult() {
    "none" != $(".sugs").css("display") && (0 === $(".sugs .active").length ? $(".sugs li:last-child").addClass("active") : $(".sugs .active").removeClass("active").prev().addClass("active"), backupQuery());
}

function nextSugResult() {
    "none" != $(".sugs").css("display") && (0 === $(".sugs .active").length ? $(".sugs li:first-child").addClass("active") : $(".sugs .active").removeClass("active").next().addClass("active"), backupQuery());
}

function backupQuery() {
    $(".sugs .active").length > 0 ? (originalQuery || (originalQuery = $(".i").val()), $(".i").val($(".sugs .active a").html())) : ($(".i").val(originalQuery), originalQuery = !1);
}

function closeSugBox(e) {
    (0 == e || void 0 == e || "i" != e.id && "sugs" != e.id) && $(".sugs").html("").css({
        display: "none"
    });
}

function applySugResult() {
    $(".sugs .active").length > 0 && ($(".i").val($(".sugs .active a").html()), closeSugBox(!1));
}
var fadeDur = 200,
    titlePrefix = "Search ",
    idxWidth = 700,
    idxLogoFull = [225, 80],
    idxLogoSmall = [157, 56],
    idxMargin = 24,
    idxFadedOpacity = .3,
    eng_count = 0,
    init_status = 0,
    eng = {},
    current = {},
    idxHeight = 0,
    isCtrl = !1,
    isCmd = !1;
$(document).keyup(function (e) {
    17 == e.which && (isCtrl = !1), 91 == e.which && (isCmd = !1);
}).keydown(function (e) {
    return 17 == e.which && (isCtrl = !0), 91 == e.which && (isCmd = !0), 49 == e.which && 1 == isCtrl ? (nextEngine(), !1) : 50 == e.which && 1 == isCtrl ? (nextPlace(), !1) : 51 == e.which && 1 == isCtrl ? (nextLanguage(), !1) : (38 == e.which && prevSugResult(), 40 == e.which && nextSugResult(), 27 == e.which && closeSugBox(!1), void(13 == e.which && applySugResult()));
});
var idxState = !1,
    idxClear = void 0,
    originalQuery = !1;
eng.google = {
    pageTitle: "Google",
    logo: "google.png",
    places: {
        Web: ["https://www.google.com/search?q=%query%&hl=%lang%", !1],
        Immagini: ["http://images.google.com/images?q=%query%&hl=%lang%", !1],
        Mappe: ["https://maps.google.com/maps?q=%query%", !1],
        Gmail: ["https://mail.google.com/mail/u/0/?hl=%lang%&shva=1#search/%query%", !1],
        Drive: ["https://drive.google.com/?tab=wo&authuser=0#search/%query%", !1],
        Play: ["https://play.google.com/store/search?q=%query%", !1],
        YouTube: ["http://www.youtube.com/results?search_query=%query%", !1]
    },
    languages: {
        IT: "it",
        EN: "en",
        DE: "de",
        FR: "fr",
        ES: "es",
        RU: "ru",
        NL: "nl"
    }
}, eng.wikipedia = {
    pageTitle: "Wikipedia",
    logo: "wikipedia.png",
    places: {
        Cerca: ["http://%lang%.wikipedia.org/wiki/Special:Search?search=%query%&fulltext=Search", !1],
        Vai: ["http://%lang%.wikipedia.org/wiki/Special:Search?search=%query%&go=Go", !1]
    },
    languages: {
        IT: "it",
        EN: "en",
        DE: "de",
        FR: "fr"
    }
}, eng.wolfram = {
    pageTitle: "Wolfram|Alpha",
    logo: "wolfram.png",
    places: {
        Calcola: ["https://www.wolframalpha.com/input/?i=%query%", !1]
    },
    languages: {
        EN: "en"
    }
}, eng.archlinux = {
    pageTitle: "ArchLinux",
    logo: "archlinux.png",
    places: {
        Forum: ["http://www.archlinux.it/forum/search.php?keywords=%query%", !1],
        Wiki: ["https://wiki.archlinux.org/index.php?title=Special%3ASearch&search=%query%&go=Go", !1],
        Pacchetti: ["http://www.archlinux.org/packages/?q=%query%", !1],
        AUR: ["https://aur.archlinux.org/packages.php?O=0&K=%query%&do_Search=Go", !1],
        ExplainShell: ["http://www.explainshell.com/explain?cmd=%query%", !1]
    },
    languages: {
        IT: "it"
    }
};