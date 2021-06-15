/* DynamicContentTable.jsx */
import React  from 'react';
import {
    Card,
    DataTable,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
} from 'react-md';

import TableActions from './TableActions';
import { sortBy } from 'lodash/collection';
import BookRow from './BookRow';
import AddBooksDialog from './AddBooksDialog';
import BookService from "../../Services/BookService";
import { toast } from "react-toastify";

const headers = [
    'Title',
    'Authors',
    'isbn',
    'Description',
];

export default class DynamicContentTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            selectedRows: [],
            count: 0,
            dialogVisible: false,
            sortedBooks: []
        };

    }

    componentWillMount() {
        this.updateBooks();
    }

    updateBooks = () =>{
        BookService.getAllBooks().then(
            data => {
                let sortedBooks = sortBy(data, 'title')
                let selectedRows = [];
                data.map(
                    () => selectedRows.push(false)
                )
                this.setState({
                    books: [],
                    sortedBooks: [],
                    selectedRows: [],
                }, () => this.setState({
                        books: data,
                        sortedBooks: sortedBooks,
                        selectedRows: selectedRows
                    })
                )

            }
        )
    }

    removeSelected = () => {
        const {selectedRows, sortedBooks} = this.state;
        let newSortedBooks = [];
        let newSelectedRows = [];
        let deleteBookIds = [];
        sortedBooks.map((book, i) => {
            if (selectedRows[i]) {
                deleteBookIds.push(book._id);
            }else{
                newSortedBooks.push(book);
                newSelectedRows.push(false);
            }
        });
        BookService.deleteBooks({
            _ids: deleteBookIds
        })
        this.setState({
                sortedBooks: [],
            }, () =>
                this.setState(
                    {
                        sortedBooks: newSortedBooks,
                        selectedRows: newSelectedRows,
                        count: 0
                    }
                )
        );
    };

    handleRowToggle = (row, selected, count) => {
        console.log(row, selected, count);
        let selectedRows = this.state.selectedRows.slice();
        console.log(selectedRows);
        if (row === 0) {
            selectedRows = selectedRows.map(() => selected);
        } else {
            selectedRows[row - 1] = selected;
        }

        this.setState({selectedRows, count});
    };

    showAddRowDialog = () => {
        this.setState({dialogVisible: true});
    };

    hideAddRowDialog = () => {
        this.setState({dialogVisible: false});
    };

    addBook = (newBook) => {
        BookService.createBook(newBook).then( () =>
            {
                toast.success('Successfully created');
                this.updateBooks();
            }
        ).catch(
            () => toast.error('Creation failed')
        );
        this.hideAddRowDialog();
        this.updateBooks();
    };

    render() {
        return (
            <Card tableCard style={{marginLeft: "auto", marginRight: "auto"}}>
                <TableActions
                    count={this.state.count}
                    onAddClick={this.showAddRowDialog}
                    onRemoveClick={this.removeSelected}
                />
                <DataTable baseId="dynamic-content-books" onRowToggle={this.handleRowToggle}

                >
                    <TableHeader>
                        <TableRow>
                            {headers.map((header, i) => <TableColumn key={header}
                                                                     className={'md-text-left'}
                            >{header}</TableColumn>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {this.state.sortedBooks.map((book) => {
                            return <BookRow key={book.id} isNew={book.isNew} book={book}/>
                        })}
                    </TableBody>
                </DataTable>
                <AddBooksDialog
                    addBook={this.addBook}
                    onHide={this.hideAddRowDialog}
                    visible={this.state.dialogVisible}
                />
            </Card>
        );
    }
}
