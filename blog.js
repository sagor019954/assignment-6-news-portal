const spinnerContainer = document.getElementById('spinner')

// display all newalist 
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
/*------- news card list----------*/

const loadNewsCard = async (id) => {
    // console.log(id);
    spinnerContainer.classList.remove('hidden')
    const cardUrl = `https://openapi.programming-hero.com/api/news/category/${id}`
    try {
        const resCard = await fetch(cardUrl)
        const dataCard = await resCard.json();
        // console.log(dataCard.data.length);
        (dataCard.data.length !== 0 ? newsCardlist(dataCard.data) : noResult());
    }
    catch (error) {
        console.log(error)
    }
}
const displaynone = document.getElementById('display-none');
const newscontainer = document.getElementById('news-container')
const noResult = async () => {
    collapseContainer.classList.add('hidden')
    spinnerContainer.classList.add('hidden')
    newscontainer.textContent = "";
    displaynone.classList.remove('hidden')
    return;
}

const newsCardlist = async (cardlists) => {

    collapseContainer.classList.add('hidden')
    spinnerContainer.classList.add('hidden')
    displaynone.classList.add('hidden')
    newscontainer.textContent = "";
    cardlists.forEach(cardlist => {
        // console.log(cardlist);
        const { author, title, details, total_view, } = cardlist;
        const authorNewId = cardlist._id
        // console.log(authorNewId);
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
              <label for="my-modal"  onclick="newmodalCard('${authorNewId}')"  class="btn btn-primary  modal-button"> Author Details</label>
            </div>
        </div>
       </div>
        `
        newscontainer.appendChild(divCard);
    })
    return;
}
/*
------- modal added in here ------
*/
const newmodalCard = async (newid) => {
    // console.log(newid);
    const modalCardUrl = `https://openapi.programming-hero.com/api/news/${newid}`
    try {
        const modalCardres = await fetch(modalCardUrl)
        const modalCardData = await modalCardres.json();
        displayModal(modalCardData);
    } catch (error) {
        console.log(error);
    }

}

const displayModal = async (modalCardData) => {

    const CardTitle = document.getElementById('card-title')
    CardTitle.textContent = "";
    const modalCards = modalCardData.data[0]
    const { author, total_view } = modalCards
    const total = parseFloat(total_view)

    const { name, img } = author
    const title = document.createElement('h2')
    title.innerHTML = `
   <div> <img class="w-40 h-40" src="${img}"></img>
   <p class="card-title">${typeof (name) === "string" ? name : 'NO Name'}</p>
   <p >${typeof (total) == 'number' ? total + 'M' : total} </p>
   </div>
`
    CardTitle.appendChild(title)
}
const collapseContainer = document.getElementById('collapse-container')
const collapsection = document.getElementById('collapse-btn').addEventListener('click', function () {
    collapseContainer.classList.remove('hidden')
    newscontainer.textContent = "";
    displaynone.textContent = "";
})
