import React, { Component } from 'react';
import {connect} from "react-redux";
import { Container, Navbar, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, Button, Row, Col } from 'reactstrap';
import {search} from "../actions/actions";


const mapDispatchToProps = dispatch => {
    return {
        search: (searchFilter, searchText) => dispatch(search(searchFilter, searchText))   
    };
};


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedName: "Name",
            selectedValue: "summary"
        };
    }


    dropdownChange = (event) => {
        this.setState({
            selectedName: event.target.innerText,
            selectedValue: event.target.value
        });
    };


    handleSearchButton = () => {
        const searchFilter = this.state.selectedValue;
        const searchText = this.input.value;      
        this.props.search(searchFilter, searchText);
    };


    render() {
        return (
            <Navbar color="dark" fixed="top">
                <Container className="d-block pl-5 pr-5 text-white">
                    <Row>
                        <Col md="5">
                            <Label for="filters" className="float-left mr-3" id="dropdownLabel">Choose filter</Label>
                            <UncontrolledDropdown id="filters">
                                <DropdownToggle caret className="col-md-6 text-left" id="buttonDropdown">
                                    {this.state.selectedName}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem value="summary" onClick={this.dropdownChange}>Name</DropdownItem>
                                    <DropdownItem value="author" onClick={this.dropdownChange}>Author</DropdownItem>
                                    <DropdownItem value="authorAndName" onClick={this.dropdownChange}>Author and name</DropdownItem>
                                    <DropdownItem value="category" onClick={this.dropdownChange}>Category</DropdownItem>
                                    <DropdownItem value="all" onClick={this.dropdownChange}>All</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                        <Col md="2">
                            <Label className="float-right cursor-pointer" id="regexLabel">
                                <Input type="checkbox" className="cursor-pointer" />Use regex
                            </Label>
                        </Col>
                        <Col md="5">
                            <Label for="searchInput" hidden>Vyhledat</Label>
                            <Input
                                className="d-inline col-md-9 ml-3"
                                type="search"
                                id="searchInput"
                                placeholder="enter your text"
                                innerRef={userInput => this.input = userInput} />
                            <Button className="float-right" onClick={this.handleSearchButton}>Search</Button>
                        </Col>                                            
                    </Row>
                </Container>
            </Navbar>
        );
    }
}


export default connect(null, mapDispatchToProps)(Header);