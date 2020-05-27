import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import SearchResult from "./SearchResult";

class Search extends Component {
    constructor(props) {
        super(props);
        this.searchInput = React.createRef();
        this.state = {
            searchResults: false,
            resultSuccess: false,
            resultName: "",
            resultLink: "",
            resultRating: 0,
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        let query = this.searchInput.current.value.trim();
        fetch(`/items/${query}`)
            .then((res) => res.json())
            .then((result) => {
                this.searchInput.current.value = "";
                if (result.success) {
                    this.setState({
                        searchResults: true,
                        resultSuccess: true,
                        resultName: result.info.name,
                        resultLink: result.info.link,
                        resultRating: result.info.rating,
                    });
                } else {
                    this.setState({
                        searchResults: true,
                        resultSuccess: false,
                        resultName: query,
                    });
                }
            });
    }

    collapse() {
        this.setState({ searchResults: false });
    }

    render() {
        return (
            <div>
                <Form
                    className="mt-2"
                    onSubmit={(event) => this.handleSubmit(event)}
                >
                    <Form.Label>Search for an item on the Wishlist!</Form.Label>
                    <Form.Row>
                        <Col>
                            <Form.Control
                                required
                                type="text"
                                ref={this.searchInput}
                                className="mb-2"
                            />
                        </Col>
                        <Col xs={1}>
                            <Button variant="primary" type="submit">
                                Search
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
                {this.state.searchResults && (
                    <SearchResult
                        success={this.state.resultSuccess}
                        name={this.state.resultName}
                        link={this.state.resultLink}
                        rating={this.state.resultRating}
                        collapse={() => this.collapse()}
                    />
                )}
            </div>
        );
    }
}
export default Search;
