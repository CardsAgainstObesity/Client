<template>
    <div>
        <span v-if="$room.czar.id == $player.playerId">
            {{ $display.text("game_current_czar_you") }}
        </span>
        <span v-else>
            {{ $room.czar.name }}
            {{ $display.text("game_current_czar_other") }}
        </span>
    </div>
</template>
