import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Items from "./components/Items";
import Search from "./components/Search";
import Container from "react-bootstrap/Container";

function App() {
    return (
        <Container>
            <p className="mt-5 small text-center">
                Feel free to search, add, delete, or update the stars of an item
                on the wishlist!
            </p>
            <Search />
            <Items />
        </Container>
    );
}

export default App;
