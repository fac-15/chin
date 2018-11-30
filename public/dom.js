// DOM manipulation here

"use strict";

// our callback function
const outputServices = (response) => {

    const outputItems = response.map(item => `
    <li class="service-item">
        <img class="service-item__image" src="${item.img}" alt="${item.title}"/>
        <div class="service-item__title">${item.title}</div>
        <a href="${item.url}">View on CoTech website</a>
    </li>
    `).join('');
    document.getElementById("services").innerHTML = outputItems;
};

