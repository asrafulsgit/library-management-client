import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Books from "../pages/Books";
import CreateBook from "../components/CreateBook";
import BorrowSummary from "../components/BorrowedSummary";



const Router = createBrowserRouter([
    {
        path : '/',
        Component : App,
        children : [
            {
                index : true,
                Component : Home
            },
            {
                path : 'books',
                Component : Books
            },
            {
                path : 'create-book',
                Component : CreateBook
            },
            {
                path : 'borrowed-summary',
                Component : BorrowSummary
            },

        ]
    }
]);

export default Router;