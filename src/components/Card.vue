<script>
import CardInput from "@/components/CardInput.vue";

export default {
    components: {
        CardInput
    },
	data(){
		return {
			// card_text: 'Creo que me olvidado ___ en ___.',
			card_text: this.text[this.$display.language],
			card_counter: 0,
		}
	},
    props: {
        text: {
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
		assignInput(value, clickable) {
			// TODO: Migrar esto a una store de Pinia
			if (clickable) {
				console.log("CARTA AÑADIDA:", value);
				this.$player.appendCardValue(value);
			}
		},
		setWhiteCard() {
			const cardValue = this.$player.getCardValue(this.card_counter++);
			return `<CardInput text="${ cardValue === undefined ? '[...]':cardValue[this.$display.language].replaceAll(".", "") }" />`;
		}
	},
	computed: {
        dynamic_card_text() {
			this.card_counter = 0;
            let text = this.card_text.replace(/___/g, this.setWhiteCard);
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
        @click="assignInput(text, clickable)"
        :class="
            'game-card ' +
            (dark ? 'dark ' : ' ') +
            (clickable ? 'clickable ' : ' ') +
            (active ? 'active ' : ' ')
        "
    >
        <div class="game-card-inner">
            <div class="game-card-front"></div>
            <div
                class="game-card-back"
                :style="active ? 'z-index: 0;' : 'z-index: -1;'"
            >
                <!-- Es necesario modificar el z-index para que html2canvas imprima la imagen correctamente. -->
                <!-- <p v-html="text[$display.language].replaceAll(`___`, `${chapuza}`)" class="noselect"></p> -->
				<!-- <p v-html="'Creo que me olvidado ___ en ___.'.replaceAll(`___`, `${chapuza}`)" class="noselect"></p> -->
				<component v-if="dark" :is="dynamic_card_text"></component>
				<span v-else>{{ text[$display.language] }}</span>
            </div>
        </div>
    </div>
</template>