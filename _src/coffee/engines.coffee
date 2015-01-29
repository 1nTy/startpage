eng.google =
  pageTitle: "Google"
  logo: "google.png"
  places:
    Web: [
      "https://www.google.com/search?q=%query%&hl=%lang%"
      not 1
    ]
    Immagini: [
      "http://images.google.com/images?q=%query%&hl=%lang%"
      not 1
    ]
    Mappe: [
      "https://maps.google.com/maps?q=%query%"
      not 1
    ]
    Gmail: [
      "https://mail.google.com/mail/u/0/?hl=%lang%&shva=1#search/%query%"
      not 1
    ]
    Drive: [
      "https://drive.google.com/?tab=wo&authuser=0#search/%query%"
      not 1
    ]
    Play: [
      "https://play.google.com/store/search?q=%query%"
      not 1
    ]
    YouTube: [
      "http://www.youtube.com/results?search_query=%query%"
      not 1
    ]

  languages:
    IT: "it"
    EN: "en"
    DE: "de"
    FR: "fr"
    ES: "es"
    RU: "ru"
    NL: "nl"

eng.wikipedia =
  pageTitle: "Wikipedia"
  logo: "wikipedia.png"
  places:
    Cerca: [
      "http://%lang%.wikipedia.org/wiki/Special:Search?search=%query%&fulltext=Search"
      not 1
    ]
    Vai: [
      "http://%lang%.wikipedia.org/wiki/Special:Search?search=%query%&go=Go"
      not 1
    ]

  languages:
    IT: "it"
    EN: "en"
    DE: "de"
    FR: "fr"

eng.wolfram =
  pageTitle: "Wolfram|Alpha"
  logo: "wolfram.png"
  places:
    Calcola: [
      "https://www.wolframalpha.com/input/?i=%query%"
      not 1
    ]

  languages:
    EN: "en"

eng.archlinux =
  pageTitle: "ArchLinux"
  logo: "archlinux.png"
  places:
    Forum: [
      "http://www.archlinux.it/forum/search.php?keywords=%query%"
      not 1
    ]
    Wiki: [
      "https://wiki.archlinux.org/index.php?title=Special%3ASearch&search=%query%&go=Go"
      not 1
    ]
    Pacchetti: [
      "http://www.archlinux.org/packages/?q=%query%"
      not 1
    ]
    AUR: [
      "https://aur.archlinux.org/packages.php?O=0&K=%query%&do_Search=Go"
      not 1
    ]
    ExplainShell: [
      "http://www.explainshell.com/explain?cmd=%query%"
      not 1
    ]

  languages:
    IT: "it"