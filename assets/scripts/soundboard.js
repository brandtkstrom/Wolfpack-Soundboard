const MAGICIAN = new Map([
    ["not a magician", "not_a_magician.ogg"],
    ["a cup", "a_cup.ogg"],
    ["a whole cup", "whole_cup.ogg"],
    ["scream", "magician_scream.ogg"],
    ["broken", "broken.ogg"],
    ["hold liquid", "hold_liquid.ogg"]
]);
const AXE_WATER = new Map([
    ["i love him", "ld_love_him.ogg"],
    ["doy boy", "fn_doy_boy.ogg"],
    ["weninwaddu", "went_in_water.ogg"],
    ["i dunno", "i_dunno.ogg"],
    ["i can get it", "i_can_get_it.ogg"],
    ["put me in", "dont_put_me_in.ogg"],
    ["walk right in", "walk_right_in.ogg"],
    ["done broke-ed", "done_broked_it.ogg"]
]);
const OTHER = new Map([["what is it", "what_is_it.ogg"]]);

const SECTIONS = new Map([
    ["Not a Magician", MAGICIAN],
    ["Axe in the Water", AXE_WATER],
    ["Other", OTHER]
]);

class Sound {
    constructor(file) {
        this.audio = new Audio(`assets/sounds/${file}`);
        this.audio.load();
    }
    play() {
        this.audio.currentTime = 0;
        this.audio.play();
    }
}

class Soundboard {
    constructor(sections) {
        this.sections = sections;
        this.soundCt = 0;
        this.sounds = new Map();
    }

    fillContent(parentElement) {
        let sections = this.createSoundSections(this.sections.entries());
        sections.forEach(section => parentElement.appendChild(section));
    }

    createSoundSections(sections) {
        let sectionArray = [];
        for (let [section, sounds] of sections) {
            let newSection = document.createElement("section");

            let sectionHeader = document.createElement("h2");
            sectionHeader.innerHTML = section;

            let buttons = this.createSoundButtons(sounds);

            newSection.appendChild(sectionHeader);
            buttons.forEach(button => newSection.appendChild(button));
            sectionArray.push(newSection);
        }

        return sectionArray;
    }
    createSoundButtons(sounds) {
        let buttons = [];
        for (var [name, file] of sounds) {
            let newSound = new Sound(file);

            let button = document.createElement("button");
            button.innerHTML = name;
            button.setAttribute("id", this.soundCt);
            button.addEventListener("click", this.clickSoundButton);

            buttons.push(button);

            this.sounds.set(this.soundCt, newSound);
            this.soundCt++;
        }
        return buttons;
    }

    clickSoundButton() {
        let soundId = parseInt(this.id);
        let sound = window.soundboard.sounds.get(soundId);
        if (sound) {
            sound.play();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let contentDiv = document.querySelector("#sounds");
    window.soundboard = new Soundboard(SECTIONS);
    window.soundboard.fillContent(contentDiv);
});
