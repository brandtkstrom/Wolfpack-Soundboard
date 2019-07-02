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
