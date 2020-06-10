(async function createProjectSection() {
  const projectWrapperEle = document.getElementById("project");

  const project = await fetch("./src/project.json")
    .then((res) => res.json())
    .then(({ project }) => project);

  const cardEle = project.map(({ title, desc, learn, links }) => {
    const learnEle = learn.map((text) => `<li>${text}</li>`);
    const linksEle = links.map(
      ({ name, link }) =>
        `<a title="${name}" target="_blank" href="${link}">
          <object type="image/svg+xml" data="./assets/icons/${name}.svg">
            ${name}
          </object>
        </a>`
    );

    return `<article class="card shadow_box">
        <div class="card__image">
          <img src="./assets/images/work/${title}.png" />
        </div>
        <div class="card__content">
          <h2 class="card__content--title">${title}</h2>
          <p class="card__content--desc">${desc}</p>
          <ul class="card__content--learn">${learnEle.join("")}</ul>
          </div>
          <div class="card__links">
            <span class="card__links--nav">LINK ▶</span>
            ${linksEle.join("")}
          </div>
      </article>`;
  });

  projectWrapperEle.innerHTML = cardEle.join("");
})();

(async function createSkillSection() {
  const skillWrapperEle = document.getElementById("skill");

  const skills = await fetch("./skills.json")
    .then((res) => res.json())
    .then((item) => item);

  const templateSkillEle = skills.map(
    ({ file, name }) =>
      `<figure class="item">
        <div class="item__logo shadow_box">
          <img src="./assets/images/skills/${file}" />
        </div>
        <figcaption class="item__caption">${name}</figcaption>
      </figure>`
  );
  skillWrapperEle.innerHTML = templateSkillEle.join("");
})();
