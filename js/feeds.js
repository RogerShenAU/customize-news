function readRSS(url){
    $.get('https://api.rss2json.com/v1/api.json?rss_url=' + url, function (data) {
        var $xml = $(data);
        var items = $xml[0].items;
        console.log(items);

        for(var index in items){
            displayRSS(items[index]);
        }        
    });
}

function displayRSS(item) {

    var itemHtml = '\
        <div class="card  is-4 column" >\
            <div class="card-content">\
                <p class="title"><a href="'+ item.link +'" target="_blank">'+ item.title +'</a></p>\
                <small>News fetched from <a href="'+ feed.url + '" target="_blank">' + feed.name +'</a></small><br>\
                <div class="content">\
                    <time datetime="'+ item.pubDate + '\">' + item.pubDate +'\</time>\
                    '+ item.description +'\
                    <br>\
                    <a href="'+ item.link + '" target="_blank" class="button is-primary">Read More</a>\
                </div>\
            </div>\
        </div>\
    ';

    $('#feeds').append(itemHtml);
}

var feed = {
    name: 'Google',
    url: 'https://news.google.com/news/rss/'
}
readRSS(feed.url);