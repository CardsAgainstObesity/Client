<script>
import CardInput from "@/components/CardInput.vue";

export default {
    components: {
        CardInput
    },
	data(){
		return {
			card_text: {
				es: "Así es, yo maté a ___. ¿Que cómo lo hice? ___.", // DEBUG
			},
			card_counter: 0,
		}
	},
    props: {
        data: {
            type: Object,
            required: true,
        },
        dark: {
            type: Boolean,
            required: true,
        },
        clickable: {
            type: Boolean,
            required: true,
        },
        active: {
            type: Boolean,
            required: false,
        },
    },
	methods: {
		assignInput() {
			if (this.clickable && (this.$room.status == "choosing" && !this.$player.isCzar)) {
				this.$player.appendCardValue(this.data.text);
			}
		},
		setWhiteCard(arg1, arg2, arg3) {
			const cardValue = this.$player.getCardValue(this.card_counter++);
            let displayText = '[...]';

            if (cardValue !== undefined) {
                displayText = cardValue[this.$display.language];
                if (arg1 === "_-_") displayText = displayText.replaceAll(" ", "-");
                displayText = displayText.replace(/\.$/, ""); // Remove trailing dot.
            }
            return `<CardInput text="${ displayText }" />`;
		}
	},
	computed: {
        dynamic_card_text() {
			this.card_counter = 0;
            let text = this.data.text[this.$display.language];
            text = text.replaceAll("\\n", "<br>");
            
            // "___": "Some sample text."
            // "_-_": "Some-sample-text."
            text = text.replace(/(___|_-_)/g, this.setWhiteCard);
            return { // Returrns a dynamically-generated component.
                components: {
                    CardInput
                },
                template: `<div>${text}</div>`
            }

        }
    },
};
</script>

<template>
    <div
        @click="assignInput"
        :class="
            'game-card ' +
            (dark ? 'dark ' : ' ') +
            (clickable ? 'clickable ' : ' ') +
            (active ? 'active ' : ' ')
        "
    >
        <div class="game-card-inner" :class="($player.cardIsSelected(data.id) ? 'selected ' : ' ')">
            <div class="game-card-front"></div>
            <div
                class="game-card-back"
                :style="active ? 'z-index: 0;' : 'z-index: -1;'"
            >
                <!-- Es necesario modificar el z-index para que html2canvas imprima la imagen correctamente. -->
				<component v-if="dark && data.text !== undefined" :is="dynamic_card_text"></component>
				<span v-if="!dark && data.text !== undefined">{{ data.text[$display.language] }}</span>
				<span v-else/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.selected > * {
    background-color: #2E3440;
}
</style>