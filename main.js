const projects = [];
const info = document.getElementById("project");
const prev_button = document.getElementById("prev");
const next_button = document.getElementById("next");
const project_image = info.querySelector("img");
const project_div = info.querySelector("div");

let data;
let index_cursor = 0
let current_project;

function animate(anim) {
    info.classList.remove("slideRight", "slideLeft");

    void info.offsetWidth;

    info.classList.add(anim);
}

next_button.addEventListener("click", () => {
    animate("slideRight");
    current_project = switchProject(1, current_project);
    updateSection();
});
prev_button.addEventListener("click", () => {
    animate("slideLeft");
    current_project = switchProject(-1, current_project);
    updateSection();
});

async function loadData() {
    const response = await fetch('./projects.db.json');
    data = await response.json();

    data.projects.forEach(element => {
        projects.push(element);
    });
    current_project = projects[index_cursor];
    updateSection();
}

loadData();

function switchProject(direction, current_project) {

    if (projects.length === 0){
        return;
    }

    if (projects.length === 1) {
        return;
    }

    index_cursor = index_cursor + direction;

    if (index_cursor === -1) {
        index_cursor += projects.length;
    }

    if (index_cursor === projects.length) {
        index_cursor = 0;
    }
    
    return current_project = projects[index_cursor];
}

function updateSection() {
    project_image.src = current_project.imgage_url;
    project_div.querySelector("h2").textContent = current_project.project_name;
    project_div.querySelector("p").textContent = current_project.description;
    if (current_project.link === "none") {
        project_div.querySelector("a").textContent = "";
    } else {
        project_div.querySelector("a").href = current_project.link;
        project_div.querySelector("a").textContent = "Link to the github project";
    }
}
