import React, { Component } from "react";
import Item from "./Item";
import NewItem from "./NewItem";
import Toast from "react-bootstrap/Toast";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

class Items extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            submittedStatus: "",
            show: false,
        };
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevState.show) {
            this.setState({ show: true });
        }
    }

    turnOff(val) {
        this.setState({ show: false });
    }

    getData() {
        fetch("/items")
            .then((res) => res.json())
            .then((results) => {
                this.setState((prevState, props) => {
                    let status = { items: results.info };

                    if (prevState && prevState.submittedStatus.length !== 0) {
                        status.submittedStatus = "";
                    }

                    return status;
                });
            });
    }

    addItem(event, itemName, itemLink, itemRating) {
        event.preventDefault();

        let data = {
            name: itemName.trim(),
            link: itemLink,
            rating: itemRating,
        };

        let options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        fetch("/items", options)
            .then((res) => res.json())
            .then((results) => {
                this.setState((prevState, props) => {
                    if (!results.success) {
                        let reason = "";

                        switch (results.errorCode) {
                            case "EMPTY_ERR":
                                reason =
                                    "Please make sure that you enter in a name and valid link for the item!";
                                break;
                            case "ITEM_EXISTS_ERR":
                                reason = `${itemName} is already on the wishlist!`;
                                break;
                            default:
                                break;
                        }

                        return { submittedStatus: reason, show: true };
                    } else {
                        const lst = prevState.items.concat([
                            {
                                name: itemName,
                                link: itemLink,
                                rating: itemRating,
                            },
                        ]);

                        let status = { items: lst };

                        if (
                            prevState &&
                            prevState.submittedStatus.length !== 0
                        ) {
                            status.submittedStatus = "";
                        }
                        return status;
                    }
                });
            });
    }

    deleteItem(itemName) {
        let data = { name: itemName };

        let options = {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        fetch("/items", options)
            .then((res) => res.json())
            .then((results) => {
                this.setState((prevState, props) => {
                    const lst = prevState.items.filter(
                        (item) => item.name !== itemName
                    );

                    let status = { items: lst };

                    if (prevState && prevState.submittedStatus.length !== 0) {
                        status.submittedStatus = "";
                    }

                    return status;
                });
            });
    }

    updateItemRating(itemName, itemRating) {
        let data = { name: itemName, rating: itemRating };

        let options = {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        fetch("/items", options)
            .then((res) => res.json())
            .then((results) => {
                this.setState((prevState, props) => {
                    const lst = prevState.items.map((item) => {
                        if (item.name === itemName) {
                            item.rating = itemRating;
                            return item;
                        } else {
                            return item;
                        }
                    });

                    let status = { items: lst };

                    if (prevState && prevState.submittedStatus.length !== 0) {
                        status.submittedStatus = "";
                    }

                    return status;
                });
            });
    }

    render() {
        return (
            <div className="mt-5">
                {this.state.submittedStatus.length !== 0 && (
                    <Toast
                        onClose={() => this.turnOff()}
                        show={this.state.show}
                        delay={3000}
                        autohide
                    >
                        <Toast.Body>{this.state.submittedStatus}</Toast.Body>
                    </Toast>
                )}
                <Card>
                    <Card.Body>
                        <Row>
                            <Col className="small">Item name</Col>
                            <Col className="small">How bad do you want it?</Col>
                            <Col xs={2}></Col>
                        </Row>
                    </Card.Body>
                </Card>
                {this.state.items.map((item, i) => (
                    <Item
                        name={item.name}
                        link={item.link}
                        rating={item.rating}
                        updateItemRating={(itemName, itemRating) =>
                            this.updateItemRating(itemName, itemRating)
                        }
                        deleteItem={(itemName) => this.deleteItem(itemName)}
                        key={i}
                    />
                ))}
                <NewItem
                    addItem={(event, itemName, itemLink, itemRating) =>
                        this.addItem(event, itemName, itemLink, itemRating)
                    }
                />
            </div>
        );
    }
}

export default Items;
