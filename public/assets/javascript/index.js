$(document).ready(function () {

    var articleContainer = $('.article-container');
    $(document).on('click', '.btn.save', handleArticleSave);
    $(document).on('click', '.scrape-new', handleArticleScrape);

    initPage();

    function initPage() {
        articleContainer.empyty();
        $.get('/api/headlines?saved=false')
            .then(function (data) {
                if (data && data.length) {
                    renderArticles(data);
                }
                else {
                    renderEmpty();
                }
            });
    }

    function renderArticles(articles) {
        var articlePanels = [];
        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articleContainer.append(articlePanels);
    }

    function createPanel(article) {
        var panel =
            $(["<div class='panel panel-default'>",
                "<div class='panel-heading'>",
                "Save Article",
                "</a>",
                "</h3>",
                "</div>",
                "<div class='panel-body'>",
                article.summary,
                "</div>",
                "</div>"
            ].join(""));
        panel.data("_id", article._id);
        return panel;
    }

    function renderEmpty() {
        var emptyAlert =
            $(["<div class='alert alert-warning text-center'>",
                "<h4>No new articles</h4>",
                "</div>",
                "<div class='panel panel-default'>",
                "<div class='panel-heading text-center'>",
                "<h3>what would you like to do?</h3>",
                "</div>",
                "<div class='panel-body text-center'>",
                "<h4><a class='scrape-new'>tre scrapping new articles</a></h4>",
                "</div>",
                "</div>"
            ].join(""));
        articleContainer.append(emptyAlert);
    }
    function handleArticleSave() {
        var articleToSave = $(this).parents(".panel").data();
        articleToSave.saved = true;
    }
});
