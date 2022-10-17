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
    // console.log(id);
    const cardUrl = `https://openapi.programming-hero.com/api/news/category/${id}`
    try {
        const resCard = await fetch(cardUrl)
        const dataCard = await resCard.json();
        console.log(dataCard.data.length);
        (dataCard.data.length !== 0 ? newsCardlist(dataCard.data) : noResult());
    }
    catch (error) {
        console.log(error)
    }
}
const displaynone = document.getElementById('display-none');
const newscontainer = document.getElementById('news-container')
const noResult = async () => {
    newscontainer.textContent = "";
    displaynone.classList.remove('hidden')
    return;
}
const modalCard = async (_id) => {
    const modalCardUrl = `https://openapi.programming-hero.com/api/news/${_id}`
    const modalCardres = await fetch(modalCardUrl);
    const modalCardData = await modalCardres.json();
    console.log(modalCardData);
}
const newsCardlist = async (cardlists) => {
    displaynone.classList.add('hidden')
    newscontainer.textContent = "";
    cardlists.forEach(cardlist => {
        // console.log(cardlist);
        const { author, title, details, total_view, _id } = cardlist;
        // console.log(_id);
        const authorImg = author.img;
        const authorName = author.name;
        const authorDate = author.published_date
        // const { number } = rating;
        const divCard = document.createElement('div')
        divCard.classList.add('cardpadding')
        divCard.innerHTML = `
        <div class="card lg:card-side bg-base-100 h-60 my-4 shadow-xl p-50 ">
        <figure><img src="${cardlist.thumbnail_url ? cardlist.thumbnail_url : `no information found`}" alt="Album" /></figure>
        <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p>${details.length > 120 ? details.slice(0, 250) + '...' : details}</p>
            <div class="card-actions flex justify-between">
               <div class="flex flex-row gap-4" >
               <img class="h-8 w-8 rounded-full overflow-hidden" src="${authorImg}"></img>
             <div><p>${authorName}</p>
             <p>${authorDate}</p></div>
               </div>
               <div>Viewer  ${total_view}M</div>
              <div>
              <label for="my-modal" class="btn btn-primary onclick="modalCard(${_id})" modal-button">Author Details</label>
            </div>
        </div>
       </div>
        `
        newscontainer.appendChild(divCard);
    })
    return;
}

const displayNewslist = async (newslists) => {
    const newsCatagory = newslists.news_category
    newsCatagory.forEach(news => {
        const { category_id, category_name } = news;
        // console.log(category_id);
        const newslistcontainer = document.getElementById('newslist-container');
        const divlist = document.createElement('div');
        divlist.innerHTML = `
        <p class="m-3" onclick="loadNewsCard('${category_id}')">${category_name}</p>
        `
        newslistcontainer.appendChild(divlist);
    })

}
loadNewslist();
loadNewsCard();