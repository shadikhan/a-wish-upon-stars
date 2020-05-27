import React, { Component } from "react";
import Ratings from "react-ratings-declarative";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class Item extends Component {
    render() {
        return (
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
                                widgetRatedColors="gold"
                                changeRating={(newRating) =>
                                    this.props.updateItemRating(
                                        this.props.name,
                                        newRating
                                    )
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
                                variant="dark"
                                size="sm"
                                onClick={() =>
                                    this.props.deleteItem(this.props.name)
                                }
                            >
                                Delete
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}
export default Item;
