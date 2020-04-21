import {ALL_ARTICLES_LOADED, OPEN, CLOSE, SEARCH_TEXT} from "../constants/consts";


export const allArticlesLoaded = (articles) => (
    {type: ALL_ARTICLES_LOADED, articles}
)

export const open = () => (
    {type: OPEN}
)

export const close = () => (
    {type: CLOSE}
)

export const search = (searchFilter, searchText) => (
    {type: SEARCH_TEXT, searchFilter, searchText}
)

export function getArticles() {
    return (dispatch) => {
        fetch('http://localhost:3000/data.html')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const parsedDocument = parser.parseFromString(data, "text/html");
            const elements = parsedDocument.getElementsByTagName("ARTICLE");

            let articles = [];

            for (let i = 0; i < elements.length; i++) {
                let article = {};
                article["img"] = {
                    src: elements[i].children[0].children[0].src,
                    alt: elements[i].children[0].children[0].alt,
                    width: elements[i].children[0].children[0].width,
                    height: elements[i].children[0].children[0].height
                };
                article["figcaption"] = elements[i].children[0].children[1].innerHTML;
                article["summary"] = elements[i].children[1].children[0].innerHTML;
                article["indexId"] = elements[i].children[1].children[1].innerHTML;
                article["author"] = elements[i].children[1].children[2].innerHTML;
                article["categoryId"] = elements[i].children[1].children[3].innerHTML;
                article["category"] = elements[i].children[1].children[4].innerHTML;  
            
                articles.push(article);
            }

            dispatch(allArticlesLoaded(articles));
        })
        .catch(error => {
            console.log(error);
            alert("Failed to load books");
        });
    };
}