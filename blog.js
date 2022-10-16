const loadNewslist = async () => {
    const newsListUrl = `https://openapi.programming-hero.com/api/news/categories`
    try {
        const res = await fetch(newsListUrl);
        const data = await res.json();
        displayNewslist(data.data);
    }
    catch (error) {
        console.log(error);
    }
}
const displayNewslist = (newslists) => {
    const newsCatagory = newslists.news_category
    newsCatagory.forEach(news => {
        const { category_id, category_name } = news;
        // console.log(category_id, category_name);
        const newslistcontainer = document.getElementById('newslist-container');
        const divlist = document.createElement('div');
        divlist.innerHTML = `
        <p class="m-3">${category_name}</p>
        `
        newslistcontainer.appendChild(divlist);
    })

}
loadNewslist();