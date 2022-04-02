import * as ackeeTracker from 'ackee-tracker'

export function ackree() {
    const instance = ackeeTracker.create('http://192.168.1.136:2000', {
        detailed: true,
        ignoreLocalhost: false
    });

    instance.record('84ac2e1f-4cdb-4596-af7d-ba0c678276d7', {
        siteLocation: window.location.href.replace(/game\/.*/, "game"),
        siteReferrer: document.referrer,
        siteLanguage: navigator.language.substring(0, 2).toLowerCase(),
        screenWidth: screen.width,
        screenHeight: screen.height
    });
}