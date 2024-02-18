const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
const categories = {
    "business": `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`,
    "entertainment": `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=${apiKey}`,
    "health": `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${apiKey}`,
    "science": `https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=${apiKey}`,
    "sports": `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${apiKey}`,
    "technology": `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`,
    "general": `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${apiKey}`
}

document.getElementById('business').addEventListener('click', () => fetchNewsByCategory("business"));
document.getElementById('entertainment').addEventListener('click', () => fetchNewsByCategory("entertainment"));
document.getElementById('health').addEventListener('click', () => fetchNewsByCategory("health"));
document.getElementById('science').addEventListener('click', () => fetchNewsByCategory("science"));
document.getElementById('sports').addEventListener('click', () => fetchNewsByCategory("sports"));
document.getElementById('technology').addEventListener('click', () => fetchNewsByCategory("technology"));
document.getElementById('general').addEventListener('click', () => fetchNewsByCategory("general"));

async function fetchNewsByCategory(category) {
    const newsDiv = document.getElementById("news");
    newsDiv.innerHTML = "";

    try {
        const response = await fetch(categories[category]);
        const data = await response.json();
        console.log(data);
        displayNews(data.articles);
    } catch (error) {
        console.error("There was an error!", error);
    }
}

async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        displayNews(data.articles);
    } catch (error) {
        console.error("There was an error!", error);
    }
}

fetchNews();

function displayNews(articles) {
    const newsDiv = document.getElementById("news");
    for (let article of articles) {
        const articleDiv = document.createElement("div");
        articleDiv.className = "article card shadow mb-5";

        // create and append image
        const image = document.createElement("img");
        image.className = "art-image card-img-top";
        image.src = article.urlToImage;
        image.alt = "An image of the article.";
        articleDiv.appendChild(image);

        // create card body and append headline, description, link
        const cardContent = document.createElement("div");
        cardContent.className = "card-content p-3";
        articleDiv.appendChild(cardContent);

        // create and append headline to card body
        const title = document.createElement("h5");
        title.className = "art-title";
        title.textContent = article.title;
        cardContent.appendChild(title);

        // create and append description to card body
        const description = document.createElement("p");
        description.className = "art-description";
        description.textContent = article.description;
        cardContent.appendChild(description);

        // create and append link to card body
        const linkToArticle = document.createElement("a");
        linkToArticle.className = "art-url";
        linkToArticle.href = article.url;
        linkToArticle.textContent = "Read more";
        cardContent.appendChild(linkToArticle);
    
        newsDiv.appendChild(articleDiv);
    }
}