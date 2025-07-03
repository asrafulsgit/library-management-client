import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Books from "../pages/Books";
import CreateBook from "../components/CreateBook";
import BorrowSummary from "../components/BorrowedSummary";
import EditBook from "../components/EditBook";
import BookDetails from "../components/BookDetails";



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
                path : 'borrow-summary',
                Component : BorrowSummary
            },
            {
                path : '/edit-book/:id',
                Component : EditBook
            },
            {
                path : 'books/:id',
                Component : BookDetails
            }

        ]
    }
]);

export default Router;