const videoCardContainer = document.querySelector('.video-container');
const api_Key = "AIzaSyBO7Seea3ApVFyHbg_5mqnvObT9DI983co";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
async function getVideoDetails() {
    const response = await fetch(video_http + new URLSearchParams({
        key: api_Key,
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 50,
        regionCode: 'IN'
    }), {method: "GET"})
    const data = await response.json();
    data.items.forEach(item => {
        getChannelIcon(item);
    })
}
// fetch(video_http + new URLSearchParams({
//     key: api_Key,
//     part: 'snippet',
//     chart: 'mostPopular',
//     maxResults: 50,
//     regionCode: 'IN'
// }))
// .then(res => res.json())
// .then(data => {
//     // console.log(data);
//      data.items.forEach(item => {
//          getChannelIcon(item);
//      })
// })
// .catch(err => console.log(err));
async function getChannelIcon (video_data)  {
    const response = await fetch(channel_http + new URLSearchParams({
        key: api_Key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }), {method: "GET"})
    const data = await response.json();
    
   
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
 
    
}
const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}
//search bar
const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";
searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})
getVideoDetails();
