import React, {Component} from "react";
import {connect} from "react-redux";
import {open, close} from "../actions/actions";
import { Button, Container, Row, Col } from "reactstrap";


const mapDispatchToProps = dispatch => {
    return {
        open: () => dispatch(open()),
        close: () => dispatch(close())     
    };
};

const mapStateToProps = state => {
    return {
        isOpened: state.books.isOpened
    };
};


class Book extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookClicked: false
        };
    }
  

    openBook = () => {
        if (!this.props.isOpened) {
            this.setState({bookClicked: !this.state.bookClicked});
            this.props.open();
        }
    };


    closeBook = () => {
        if (this.props.isOpened) {
            this.setState({bookClicked: !this.state.bookClicked});
            this.props.close();
        }
    };


    renderBook = () => {
        const {book} = this.props;
        
        if (!this.state.bookClicked) {
            return <li onClick={this.openBook}>{book.summary}</li>;
        } else {
            return (
                <li className="showDetail">
                    <Container>
                        <Row className="detail-header">
                            <Col className="text-center"><h3>{book.summary}</h3></Col>
                            <Button onClick={this.closeBook}>X</Button>
                        </Row>
                        <Row className="p-row">
                            <Col>
                                <p><span>Author</span>: {book.author}</p>
                                <p><span>Category</span>: {book.category}</p>
                            </Col>
                            <Col>
                                <img src={book.img.src} alt={book.img.alt} width={book.img.width} height={book.img.height} />
                            </Col>
                        </Row>
                    </Container>
                </li>              
            );
        }
    };


    render() {     
        return this.renderBook();     
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Book);