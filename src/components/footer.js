import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';


const mapStateToProps = state => {
    return {
        filteredArticles: state.books.articles,
        allArticles: state.books.allArticles
    };
};


class Footer extends Component {
    render() {
        const {filteredArticles, allArticles} = this.props;

        return (
            <footer className="fixed-bottom">
                <Container className="pl-5 pr-5 text-white">
                    <Row className="float-right large">
                        <Col>
                            Count of searched items {filteredArticles.length}/{allArticles.length}
                        </Col>
                    </Row>
                </Container>
            </footer>
        );
    }
}


export default connect(mapStateToProps, null)(Footer);