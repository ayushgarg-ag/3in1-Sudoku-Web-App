// window.localStorage.setItem("storedTheme", "tan");

function revertChangeTheme() {
    document.getElementById("changetheme").innerHTML = `
    <div onclick="themeOption()">Change Theme</div>`;
}

function themeOption() {
    document.getElementById("changetheme").innerHTML = `
    <div id="themescontainer">
    <div class="themes" id="dark" onclick="window.localStorage.setItem('storedTheme', this.id); changeTheme(); revertChangeTheme()"></div>
    <div class="themes" id="tan" onclick="window.localStorage.setItem('storedTheme', this.id); changeTheme(); revertChangeTheme()"></div>
    <div class="themes" id="light" onclick="window.localStorage.setItem('storedTheme', this.id); changeTheme(); revertChangeTheme()"></div>
    <div class="themes" id="retro" onclick="window.localStorage.setItem('storedTheme', this.id); changeTheme(); revertChangeTheme()"></div>
    </div>
    `;
}

function changeTheme() {
    let root = document.getElementsByTagName('html')[0];
    var themeid;
    if (window.localStorage.getItem("storedTheme") == null) {
        themeid = "tan";
    }
    else {
        themeid = window.localStorage.getItem("storedTheme");
    }
    console.log(themeid);
    if (themeid == "tan") {
        root.style.setProperty('--primaryColor', "#d2b48c");
        root.style.setProperty('--itemBackground', "#f6f0e8");
        root.style.setProperty('--textColor', "#a87b00");
        root.style.setProperty('--readOnlyColor', "#533e2d");
        root.style.setProperty('--tableColor', "#ac8048");
        root.style.setProperty('--headerColor', "#ffffff");
        root.style.setProperty('--tableItemBackground', "#f6f0e8");
        root.style.setProperty('--buttonBackground', "#f6f0e8");
        root.style.setProperty('--shiftColor', "#fce17a");
        root.style.setProperty('--messageTextColor', "#533e2d");
        window.localStorage.setItem("storedTheme", "tan");
    }
    else if (themeid == "dark") {
        root.style.setProperty('--primaryColor', "#1b262c");
        root.style.setProperty('--itemBackground', "#226897");
        root.style.setProperty('--textColor', "#bbe1fa");
        root.style.setProperty('--readOnlyColor', "#000000");
        root.style.setProperty('--tableColor', "#3282b8");
        root.style.setProperty('--headerColor', "#3282b8");
        root.style.setProperty('--tableItemBackground', "#a1c4db");
        root.style.setProperty('--buttonBackground', "#305a75");
        root.style.setProperty('--shiftColor', "#978522");
        root.style.setProperty('--messageTextColor', "#bbe1fa");
        window.localStorage.setItem("storedTheme", "dark");
    }
    else if (themeid == "retro") {
        root.style.setProperty('--primaryColor', "#111f4d");
        root.style.setProperty('--itemBackground', "#F3ECE7");
        root.style.setProperty('--textColor', "#e43a19");
        root.style.setProperty('--readOnlyColor', "#533e2d");
        root.style.setProperty('--tableColor', "#e43a19");
        root.style.setProperty('--headerColor', "#5ea3a3");
        root.style.setProperty('--tableItemBackground', "#f2f4f7");
        root.style.setProperty('--buttonBackground', "#020205");
        root.style.setProperty('--shiftColor', "#4ac286");
        root.style.setProperty('--messageTextColor', "#e43a19");
        window.localStorage.setItem("storedTheme", "retro");
    }
    else {
        root.style.setProperty('--primaryColor', "#111f4d");
        root.style.setProperty('--itemBackground', "#F3ECE7");
        root.style.setProperty('--textColor', "#e43a19");
        root.style.setProperty('--readOnlyColor', "#533e2d");
        root.style.setProperty('--tableColor', "#e43a19");
        root.style.setProperty('--headerColor', "#5ea3a3");
        root.style.setProperty('--tableItemBackground', "#f2f4f7");
        root.style.setProperty('--buttonBackground', "#020205");
        root.style.setProperty('--shiftColor', "#4ac286");
        root.style.setProperty('--messageTextColor', "#e43a19");
        window.localStorage.setItem("storedTheme", "light");
    }
}
