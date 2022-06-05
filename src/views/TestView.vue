<script>
export default {
    data(){
        return {
            css_root: document.querySelector(":root"),
            property: "",
            property_select: [
                "--color-primary",
                "--color-secondary",
                "--color-tertiary",
                "--color-background",
                "--color-background-alt",
            ],
            value: "",
        }
    },
    methods: {
        get_computed_style(property){
            // getComputedStyle(this.css_root).getPropertyValue("--color-background");
            return getComputedStyle(this.css_root).getPropertyValue(property);
        },
        set_property(property, value){
            // this.css_root.style.setProperty('--color-background', 'black');
            console.log("property", property);
            console.log("value", value);
            this.css_root.style.setProperty(property, value);
        }
    },
}
</script>

<template>
    <div>
        <h1>Test</h1>
        <label for="property">Property</label>
        <!-- <input id="property" type="text" v-model="property" /> -->
        <select id="property" v-model="property">
            <option v-for="property_option in property_select" :key="property_option">{{ property_option }}</option>
        </select>
        <label for="color">Color</label>
        <input id="color" type="color" v-model="value"/>
        <button @click="set_property(property, value)">Apply</button>
    </div>
</template>