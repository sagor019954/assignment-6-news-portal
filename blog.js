const loadNewslist = async () => {
    const newsListUrl = `https://openapi.programming-hero.com/api/news/categories`
    try {
        const res = await fetch(newsListUrl)
        const data = await res.json();
        displayNewslist(data.data);
    }
    catch (error) {
        console.log(error);
    }
}
const loadNewsCard = async (id) => {
    const cardUrl = `https://openapi.programming-hero.com/api/news/category/${id}`
    try {
        const resCard = await fetch(cardUrl)
        const dataCard = await resCard.json();
        newsCardlist(dataCard.data);
    }
    catch (error) {
        console.log(error)
    }
}
const newsCardlist = async (cardlists) => {
    const newscontainer = document.getElementById('news-container')
    newscontainer.textContent = "";
    cardlists.forEach(cardlist => {
        console.log(cardlist);
        // const thumbnail=cardlist.console
        const divCard = document.createElement('div')
        divCard.classList.add('cardpadding')
        divCard.innerHTML = `
        <div class="card lg:card-side bg-base-100 h-60 my-4 shadow-xl p-50 ">
        <figure><img src="${cardlist.thumbnail_url ? cardlist.thumbnail_url : `no information found`}" alt="Album" /></figure>
        <div class="card-body">
            <h2 class="card-title">New album is released!</h2>
            <p>Click the button to listen on Spotiwhy app.</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Listen</button>
            </div>
        </div>
       </div>
        `
        newscontainer.appendChild(divCard);
    })
}
/*<div class="my-4">
                   
                    
{ </div> }*/





const displayNewslist = async (newslists) => {
    const newsCatagory = newslists.news_category
    newsCatagory.forEach(news => {
        const { category_id, category_name } = news;
        // console.log(category_id, category_name);
        const newslistcontainer = document.getElementById('newslist-container');
        const divlist = document.createElement('div');
        divlist.innerHTML = `
        <p class="m-3" onclick="loadNewsCard('${category_id}')">${category_name}</p>
        `
        newslistcontainer.appendChild(divlist);
    })

}
loadNewslist();