import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {Button, DialogContainer, TextField, Toolbar} from 'react-md';

export default class AddBooksDialog extends PureComponent {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        addBook: PropTypes.func.isRequired,
        onHide: PropTypes.func.isRequired,
    };

    state = { title: '',
        isbn: '',
        authors: [],
        description: '',
        authorsField: []
    };

    onChange =(key, value) =>{
        this.setState(
            {[key]: value}
        )
    }

    updateAuthors = (value) => {
        this.setState( {
            authors: value.split(",")
        })
    }

    handleSubmit = () => {
        console.log(1234);
        this.props.addBook({
            title: this.state.title,
            isbn: this.state.isbn,
            authors: this.state.authors,
            description: this.state.description,
        });
    };

    render() {
        const { visible, onHide } = this.props;

        const {
            title,
            isbn,
            authors,
            description,
        } = this.state;

        return (
            <DialogContainer
                id="add-book-dialog"
                aria-labelledby="add-book-dialog-title"
                visible={visible}
                onHide={onHide}
                fullPage
            >
                <CSSTransitionGroup
                    id="add-book-form"
                    className="md-text-container md-toolbar--relative"
                    transitionName="md-cross-fade"
                    transitionEnterTimeout={300}
                    transitionLeave={false}
                >
                    <Toolbar
                        nav={<Button icon onClick={onHide}>arrow_back</Button>}
                        title="Create a new Book"
                        titleId="add-books-dialog-title"
                        fixed
                        colored
                        actions={<Button type="submit" flat onClick={this.handleSubmit}>Submit</Button>}
                        width='100%'
                    />
                    <section className="md-grid"
                             aria-labelledby={`book-group-0-title`}
                             style={{marginTop: '20%'}}
                    >
                        <TextField
                            id={`book-title-0`}
                            name={`title-0`}
                            label="Title"
                            type="text"
                            defaultValue={title}
                            placeholder="title"
                            className="md-cell"
                            onChange={(value => {this.onChange('title', value)})}
                            style={{width: "45%"}}
                        />
                        <TextField
                            id={`book-isbn-0`}
                            name={`isbn-0`}
                            label="ISBN"
                            type="text"
                            defaultValue={isbn}
                            placeholder="isbn"
                            className="md-cell"
                            style={{width: "45%"}}
                            onChange={(value => {this.onChange('isbn', value)})}
                        />

                        <TextField
                            id={`book-authors-0`}
                            name={`isbn-0`}
                            label="Authors"
                            type="text"
                            defaultValue={authors.toString()}
                            placeholder="Authors"
                            className="md-cell"
                            style={{width: "45%"}}
                            onChange={this.updateAuthors}
                        />

                        <TextField
                            id={`book-description-0`}
                            name={`description-0`}
                            label="Description"
                            defaultValue={description}
                            type="text"
                            placeholder="description"
                            className="md-cell"
                            fullWidth={true}
                            style={{width: "45%"}}
                            onChange={(value => {this.onChange('description', value)})}
                        />
                    </section>
                </CSSTransitionGroup>
            </DialogContainer>
        );
    }
}
