function readRSS(feed, index, last){
    $.get('https://api.rss2json.com/v1/api.json?rss_url=' + feed.url, function (data) {

        var $xml = $(data);
        var items = $xml[0].items;
        var count = 0;
        var RSSHTML = '<h2 class="subtitle">' + feed.name +'</h2><div id="carousel-" class="carousel is-4 carousel-animated carousel-animate-slide">\
        <div id="feed-' + index +'" class="carousel-container">';

        for(var key in items){

            var slider = "";
            count++;

            var outerDiv = "";
            var outerDivEnd = "";

            if (count == feed.limit) { slider = "last"}

            RSSHTML += getRSSHTML(items[key], feed, key);
           
            if (slider == "last"){
                break;
            }
        }   

        RSSHTML += '</div>\
                    <div id="nav-' + index +'" class="carousel-navigation is-centered">\
                        <div class="carousel-nav-left">\
                            <i class="fa fa-chevron-left" aria-hidden="true"></i>\
                        </div>\
                        <div class="carousel-nav-right">\
                            <i class="fa fa-chevron-right" aria-hidden="true"></i>\
                        </div>\
                    </div>\
                </div>\
                ';
        
        $('#feeds').append(RSSHTML);
        
        // add javascript after all slidershow loaded
        if (last){
            
            $(document).ready(function () {
                $('.carousel-nav-left').click(function () {

                    var navID = $(this).parent().prop("id");
                    var id = navID.slice(4);

                    var newsNum = $("#feed-" + id + " > div").length;

                    $('#feed-' + id).children().each(function () {

                        let order = $(this).css('order');
                        let newOrder = parseInt(order) - 1;
                        if (newOrder > 0){
                            $(this).css('order', newOrder);
                        }else{
                            $(this).css('order', newsNum);
                        }
                    })
                });

                $('.carousel-nav-right').click(function () {

                    var navID = $(this).parent().prop("id");
                    var id = navID.slice(4);

                    var newsNum = $("#feed-" + id + " > div").length;

                    $('#feed-' + id).children().each(function () {

                        let order = $(this).css('order');
                        let newOrder = parseInt(order) + 1;
                        if (newOrder <= newsNum) {
                            $(this).css('order', newOrder);
                        } else {
                            $(this).css('order', 1);
                        }
                    })
                });
            })
        }

    });
}

function getRSSHTML(item, feed, key) {
    
    var isActive = "";
    var order = parseInt(key) + 1;

    var itemHtml = '\
        <div class="carousel-item" style="order:' + order +'">\
            <div class="card">\
                <div class="card-content">\
                    <p class="subtitle"><a href="'+ item.link +'" target="_blank">'+ item.title +'</a></p>\
                    <small>News fetched from <a href="'+ feed.url + '" target="_blank">' + feed.name +'</a></small><br>\
                    <div class="content">\
                        <p>\
                            <time datetime="'+ item.pubDate + '\">' + item.pubDate +'\</time>\
                            '+ item.description +'\
                            <br>\
                            <a href="'+ item.link + '" target="_blank" class="button is-primary">Read More</a>\
                        </p>\
                    </div>\
                </div>\
            </div>\
        </div>\
    ';

    // $('#feeds').append(itemHtml);
    return itemHtml;
}

function deleteRSS(index,feeds){
    delete feeds[index];
}


var feeds = [
    {
        name: 'Google',
        url: 'https://news.google.com/news/rss/',
        limit: 5
    },
    {
        name: 'Yahoo',
        url: 'https://www.yahoo.com/news/rss',
        limit: 4
    }
];

deleteRSS[0];

for (let index = 0; index < feeds.length; index++) {

    let last = false;
    
    if ((index +1) == feeds.length) { last = true; }

    const feed = feeds[index];
    readRSS(feed, index, last);
}