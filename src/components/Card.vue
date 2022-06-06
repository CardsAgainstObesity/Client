<script>
import CardInput from "@/components/CardInput.vue";
import { mdiHamburgerOff } from '@mdi/js';

export default {
    components: {
        CardInput
    },
	data(){
		return {
            mdiHamburgerOff,
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
        index: {
            type: Number,
            required: false,
        }
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
                displayText = cardValue[this.$config.language];
                if (arg1 === "_-_") displayText = displayText.replaceAll(" ", "-");
                displayText = displayText.replace(/\.$/, ""); // Remove trailing dot.
            }
            return `<CardInput text="${ displayText }" />`;
		}
	},
	computed: {
        dynamic_card_text() {
			this.card_counter = 0;
            let text;
            if (this.data.text[this.$config.language] !== undefined) text = this.data.text[this.$config.language];
            else {
                const first_available_language = Object.keys(this.data.text)[0];
                text = this.data.text[first_available_language];
            }
            
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
        class="game-card"
        :class="{ dark, clickable, active }"
    >
        <div class="game-card-inner" :class="($player.cardIsSelected(data.id) && $room.status === 'choosing' ? 'selected ' : ' ')">
            <div class="game-card-front">
                <Icon
                    style="color: var(--color-card-back); width: 100%; height: 100%;"
                    :path="mdiHamburgerOff"
                />
            </div>
            <div
                class="game-card-back"
                :class="{ active_back: active }"
            >
				<component v-if="dark && data.text !== undefined" :is="dynamic_card_text"></component>
				<span v-if="!dark && data.text !== undefined">{{ $display.other_text(data.text) }}</span>
				<span v-else/>
                <span v-if="0 < index && 1 < $room.blackCard.slots" style="position: absolute; bottom: 0.25rem; right: 0.5rem;">{{ index }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.selected > * {
    background-color: var(--color-card-back);
}

.game-card-back {
    animation: flip_card_index 0.2s linear reverse;
}

.game-card-back.active_back {
    animation: flip_card_index 0.2s linear;
}

@keyframes flip_card_index {
  from { z-index: -1; }
  to { z-index: 0; }
}
</style>