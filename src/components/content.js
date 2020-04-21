import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {connect} from "react-redux";
import Book from "./book";
import {getArticles} from "../actions/actions";


const mapDispatchToProps = dispatch => {
    return {
        getArticles: () => dispatch(getArticles()),
    };
};


const mapStateToProps = state => {
    return {
        articles: state.books.articles
    };
};


class Content extends Component {

    componentDidMount() {
        this.props.getArticles();
    };


    render() {
        const {articles} = this.props;

        return (
            <Container className="pl-5 pr-5">
                <Row>
                    <Col>
                        <ul className="columns">
                            {articles.map(item => <Book book={item} key={item.indexId} />)}    
                        </ul>                       
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Content);