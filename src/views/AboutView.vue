<template>
    <div>
        <h1 class="padding">Web</h1>
        <div id="root">
            <div class="container">
                <div class="flex-item">
                    <img class="image" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" />
                    <!-- https://en.wikipedia.org/wiki/Vue.js#/media/File:Vue.js_Logo_2.svg -->
                    <!-- License: CC BY 4.0 -->
                    <h3>VueJS</h3>
                </div>
                <div class="flex-item">
                    <img class="image" src="/icons/socketio.svg" />
                    <h3>Socket.io</h3>
                </div>
            </div>
            <h1 class="padding">Tools</h1>
            <div class="container">
                <div class="flex-item">
                    <img class="image" src="https://upload.wikimedia.org/wikipedia/commons/7/73/Calligrakrita-base.svg" />
                    <!-- https://commons.wikimedia.org/wiki/File:Calligrakrita-base.svg -->
                    <!-- License: CC BY-SA 4.0 -->
                    <h3>Krita</h3>
                </div>
                <div class="flex-item">
                    <img class="image" src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Inkscape_Logo.svg" />
                    <!-- https://en.wikipedia.org/wiki/Inkscape#/media/File:Inkscape_Logo.svg -->
                    <!-- License: CC BY-SA 3.0 -->
                    <h3>Inkscape</h3>
                </div>
                <div class="flex-item">
                    <img class="image" src="/icons/cube-outline.svg" />
                    <h3>Tesseract-ocr</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.flex-item {
    margin: 0.5rem;
    padding: 1rem;
    text-align: center;
    border-radius: 0.5rem;
    background-color: #333;
    width: 10rem;
    height: 10rem;
}

.flex-item > img.image {
    align-content: center;
    height: 75%;
}

h1,
h3 {
    margin-top: 15px;
}
b {
    font-weight: bold;
}
</style>