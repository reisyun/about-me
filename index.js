"use strict";

async function main() {
  const projectWrapperEle = document.getElementById("project");
  const skillWrapperEle = document.getElementById("skill");

  const projectData = await fetchJSONData("./data/project.json");
  const skillData = await fetchJSONData("./data/skills.json");

  projectWrapperEle.innerHTML = createCardTemplate(projectData);
  skillWrapperEle.innerHTML = createSkillTemplate(skillData);
}

main();

async function fetchJSONData(path) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const data = await fetch(path, {
    headers,
  })
    .then((res) => res.json())
    .then((text) => text)
    .catch(console.error);

  return data;
}

/** projects interface
{
  id: number;
  title: string;
  desc: string;
  learn: string[];
  links: { name: string; link: string }[];
}
*/
function createCardTemplate(projects = []) {
  const cardTemplate = projects.map(({ title, desc, learn, links }) => {
    const learnEle = learn.map((text) => `<li>${text}</li>`);
    const linksEle = links.map(
      ({ name, link }) =>
        `<a title="${name}" target="_blank" href="${link}">
           <object type="image/svg+xml" data="./assets/icons/${name}.svg">
             ${name}
           </object>
         </a>`
    );

    return `
      <article class="card shadow_box">
        <div class="card__image">
          <img src="./assets/images/work/${title.toLowerCase()}.png" />
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

  return cardTemplate.join("");
}

/** skills interface
{
  name: string;
  file: string;
}
*/
function createSkillTemplate(skills = []) {
  const skillTemplate = skills.map(
    ({ file, name }) =>
      `<figure class="item">
         <div class="item__logo shadow_box">
           <img src="./assets/images/skills/${file}" />
         </div>
         <figcaption class="item__caption">${name}</figcaption>
       </figure>`
  );

  return skillTemplate.join("");
}
