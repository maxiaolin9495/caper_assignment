/* DessertRow.jsx */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {TableRow, EditDialogColumn} from 'react-md';
import BookService from "../../Services/BookService";
import { toast } from "react-toastify";

export default class BookRow extends PureComponent {
    static propTypes = {
        isNew: PropTypes.bool,
        book: PropTypes.shape({
            title: PropTypes.string.isRequired,
            authors: PropTypes.array.isRequired,
            description: PropTypes.string,
            isbn: PropTypes.string
        }).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            highlight: props.isNew ? true : null,
            title: props.book.title,
            authors: props.book.authors,
            isbn: props.book.isbn,
            description: props.book.description,
        };
    }

    componentDidMount() {
        if (!this.state.highlight) {
            return;
        }

        // Keep highlight color for 4 seconds then fade out for 2 seconds.
        this.timeout = setTimeout(() => {
            this.timeout = setTimeout(() => {
                this.timeout = null;
                this.setState({ highlight: null });
            }, 2000);

            this.setState({ highlight: false });
        }, 4000);
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    updateAuthors = (value) => {
        this.setState( {
            authors: value.split(",")
        })
    }
    updateValue = (key, value) => {
        this.setState(
            {[key]: value}
        )
    }
    saveChange = () => {
        if(this.state.authors === this.props.book.authors
            && this.state.title === this.props.book.title
            && this.state.description === this.props.book.description
            && this.state.isbn === this.props.book.isbn
        )
        BookService.updateBook(
            {
                _id: this.props.book._id,
                authors: this.state.authors,
                title: this.state.title,
                description: this.state.description,
                isbn: this.state.isbn
            }
        ).then(() => {
            toast.success("Successfully updated");
        }).catch((e) => {
            toast.error("Failed to update book details");
            this.setState(
                {
                    title: this.props.book.title,
                    authors: this.props.book.authors,
                    isbn: this.props.book.isbn,
                    description: this.props.book.description,
                }
            )
        })

    }

    render() {
        const { highlight } = this.state;
        const {
            book,
            ...props
        } = this.props;

        const authors = book.authors.toString();

        return (
            <TableRow
                {...props}
                className={cn("", {
                    'md-background--card': highlight !== null,
                    'data-tables__desserts__row': highlight !== null,
                    'data-tables__desserts__row--highlight': highlight,
                })}
            >

                <EditDialogColumn defaultValue={book.title} label="Title" placeholder="Title"
                                  onChange={(value) => {
                                      this.updateValue('title', value)}
                                  }
                                  onOkClick={this.saveChange}
                                  maxLength={20}
                />
                <EditDialogColumn defaultValue={authors} label="Authors" placeholder="Authors"
                                  onChange={(value) => {
                                      this.updateAuthors(value)}
                                  }
                                  onOkClick={this.saveChange}
                                  maxLength={20}
                />
                <EditDialogColumn defaultValue={book.isbn} label="ISBN" placeholder="isbn"
                                  onChange={(value) => {
                                      this.updateValue('isbn', value)}
                                  }
                                  onOkClick={this.saveChange}
                                  maxLength={20}
                />
                <EditDialogColumn defaultValue={book.description}
                                  label="Description"
                                  placeholder="Description"
                                  onOkClick={this.saveChange}
                                  maxLength={20}
                />
            </TableRow>
        );
    }
}
