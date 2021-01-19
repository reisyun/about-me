"use strict";

async function createTemplate(elementId, dataPath, template) {
  const element = document.getElementById(elementId);

  const data = await fetchJSONData(dataPath);
  element.innerHTML = template(data);
}

createTemplate("project", "./data/project.json", cardTemplate);
createTemplate("skills", "./data/skills.json", skillsTemplate);

/**
 * 입력받은 경로의 데이터(JSON)를 자바스크립트 객체로 반환
 *
 * @param path
 */
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

/**
 * Element 배열의 쉼표를 제거
 *
 * @param elements
 */
const tight = (elements) => elements.join("");

/** projects interface
  Array <{
    id: number;
    title: string;
    desc: string;
    learn: string[];
    links: { name: string; link: string }[];
  }> 
*/
function cardTemplate(projects = []) {
  const template = projects.map(({ title, desc, learn, links }) => {
    const learnElement = learn.map((text) => `<li>${text}</li>`);
    const linksElement = links.map(
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
          <ul class="card__content--learn">${tight(learnElement)}</ul>
          </div>
          <div class="card__links">
            <span class="card__links--nav">LINK ▶</span>
            ${tight(linksElement)}
          </div>
      </article>`;
  });

  return tight(template);
}

/** skills interface
  Array<{
    name: string;
    file: string;
  }>
*/
function skillsTemplate(skills = []) {
  const template = skills.map(
    ({ file, name }) =>
      `<figure class="item">
         <div class="item__logo shadow_box">
           <img src="./assets/images/skills/${file}" />
         </div>
         <figcaption class="item__caption">${name}</figcaption>
       </figure>`
  );

  return tight(template);
}
