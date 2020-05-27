import React, { Component } from "react";
import Ratings from "react-ratings-declarative";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";

class SearchResult extends Component {
    constructor(props) {
        super(props);

        let val = this.props.success ? false : true;
        this.state = {
            show: val,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevState.show) {
            this.setState({ show: true });
        }
    }

    turnOff(val) {
        this.setState({ show: false });
    }

    render() {
        let result;
        if (this.props.success) {
            result = (
                <div className="mt-4">
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <a
                                        href={this.props.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {this.props.name}
                                    </a>
                                </Col>
                                <Col>
                                    <Ratings
                                        rating={this.props.rating}
                                        widgetRatedColors="black"
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
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => this.props.collapse()}
                                    >
                                        Collapse
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <p className="small">
                        Searched on {new Date().toLocaleString()}
                    </p>
                </div>
            );
        } else {
            result = (
                <Toast
                    className="mt-4"
                    onClose={() => this.turnOff()}
                    show={this.state.show}
                    delay={2000}
                    autohide
                >
                    <Toast.Body className="small">
                        {this.props.name} not found on wishlist!
                    </Toast.Body>
                </Toast>
            );
        }

        return result;
    }
}

export default SearchResult;
