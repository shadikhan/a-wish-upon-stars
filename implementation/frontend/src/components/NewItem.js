import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Ratings from "react-ratings-declarative";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class NewItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            link: "",
            rating: 0,
        };
    }

    changeRating(newRating) {
        this.setState({
            rating: newRating,
        });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        this.props.addItem(
            event,
            this.state.name,
            this.state.link,
            this.state.rating
        );

        this.setState({
            name: "",
            link: "",
            rating: 0,
        });
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Form onSubmit={(event) => this.handleSubmit(event)}>
                        <Form.Row>
                            <Col>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Name of Item"
                                    name="name"
                                    value={this.state.name}
                                    onChange={(event) =>
                                        this.handleChange(event)
                                    }
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    required
                                    ref={this.link}
                                    type="url"
                                    placeholder="Link of Item"
                                    name="link"
                                    value={this.state.link}
                                    onChange={(event) =>
                                        this.handleChange(event)
                                    }
                                />
                            </Col>
                            <Col>
                                <Ratings
                                    rating={this.state.rating}
                                    widgetRatedColors="gold"
                                    changeRating={(newRating) =>
                                        this.changeRating(newRating)
                                    }
                                    widgetDimensions="25px"
                                    widgetSpacings="0px"
                                >
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                </Ratings>
                            </Col>
                            <Col xs={2}>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    type="Submit"
                                >
                                    Add Item
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default NewItem;
