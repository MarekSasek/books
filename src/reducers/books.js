import {ALL_ARTICLES_LOADED, OPEN, CLOSE, SEARCH_TEXT} from "../constants/consts";


const order = (a, b) => {
    const bookA = a.summary.toUpperCase();
    const bookB = b.summary.toUpperCase();

    let order = 0;
    if (bookA > bookB) {
        order = 1;
    } else if (bookA < bookB) {
        order = -1;
    }

    return order;
};


const applyFilters = (searchFilter, searchText, allArticles) => {

    const compare = (filter) => filter.toUpperCase().indexOf(searchText.toUpperCase()) > -1;
    
    let result = [];
    
    if (searchFilter === "authorAndName") {
        result = allArticles.filter(article => compare(article["summary"]) || compare(article["author"]));
    } 
    
    else if (searchFilter === "all") {
        result = allArticles.filter(article => compare(article["summary"]) || compare(article["author"]) || compare(article["category"]));
    } 
    
    else {
        result = allArticles.filter(article => compare(article[searchFilter]));
    }

    return result;
};


const initialState = {
    allArticles: [],
    articles: [],
    isOpened: false,
    searchFilter: "summary",
    searchText: ""
};


const booksReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case ALL_ARTICLES_LOADED:
            let allArticles = action.articles.sort(order)
            newState = {...state, allArticles: allArticles, articles: allArticles};
            return newState;
        case OPEN:
            newState = {...state, isOpened: true};
            return newState;
        case CLOSE:
            newState = {...state, isOpened: false};
            return newState;
        case SEARCH_TEXT:       
            let searchedArticles = state.allArticles;        
            if (action.searchText !== "") {
                searchedArticles = applyFilters(action.searchFilter, action.searchText, state.allArticles);
            }                     
            newState = {...state, searchText: action.searchText, searchFilter: action.searchFilter, articles: searchedArticles};
            return newState;
        default:
            return state;
    }
};


export default booksReducer;