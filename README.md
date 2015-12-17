# maaas-cms
[![Build Status](https://magnum.travis-ci.com/MethodenMann/maaas-cms.svg?token=6vDPnmZX2D8idToPpScx&branch=master)](https://magnum.travis-ci.com/MethodenMann/maaas-cms)


Es muss zunächst Node und npm installiert sein. Danach müssen in Ordner des Projektes folgende Befehle in der Kommandozeile mit Administratorrechten ausgeführt werden:
```
> npm install -g bower tsd gulp
> npm install
> bower install
> tsd install`
```

Dies installiert alle nötigen npm-Packages und andere Abhängigkeiten. tsd beinhaltet die Typen-Definitionen der verwendeten Frameworks welche für Type-Script benötigt werden.
Um den Source-Code zu kompilieren und einen Lokalen Web-Server zu starten muss der Default-Task von gulp aufgerufen werden. Dies geschieht mit folgendem Befehl

```
> gulp -–production
```

Ohne das Production flag würde das CMS das Backend lokal addressieren. Dazu müsste man das Backend local hosten. In diesem Falle geht das CMS direkt auf das Heroku Backened.
Der Gulp-Task startet zudem auch sogenannte Watches welche auf Fileänderungen reagieren und das Projekt neu kompilieren.
