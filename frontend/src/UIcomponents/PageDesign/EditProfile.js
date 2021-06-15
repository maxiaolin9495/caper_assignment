"use strict";

import React from 'react';
import { Card, Button, FontIcon, TextField, FileInput, Media, Cell } from 'react-md';
import { withRouter } from 'react-router-dom'
import Resizer from 'react-image-file-resizer';

const style = {
    maxWidth: 750,
    opacity: 0.85,
    marginTop: '16px'
};


class EditProfile extends React.Component {

    constructor(props) {
        super(props);

        if (this.props.userProfile !== undefined) {
            this.state = {
                firstName: props.userProfile.firstName,
                lastName: props.userProfile.lastName,
                email: props.userProfile.email,
            }
        } else {
            this.state = {
                firstName: '',
                lastName: '',
                email: '',
            }
        }
    }

    handleChangeFirstName = (firstName) => {
        this.setState({
            firstName
        })
    };

    handleChangeLastName = (lastName) => {
        this.setState({
            lastName
        })
    };

    // resize uploaded avatar as base64 string
    fileChangedHandler(value) {
        if (value && value.name) {
            Resizer.imageFileResizer(
                value,
                200,
                300,
                'JPEG',
                100,
                0,
                uri => {
                    this.setState({
                        avatar: uri,
                        fileName: value.name
                    });
                    console.log(uri);
                },
                'base64'
            );
        }
    }

    handleSubmit = () => {
        let userProfile = this.props.userProfile;

        if (userProfile === undefined) {
            userProfile = {};
        }

        userProfile.firstName = this.state.firstName;
        userProfile.lastName = this.state.lastName;
        userProfile.email = this.state.email;

        // onsubmit defined by EditProfileView
        this.props.onSubmit(userProfile);
    };


    // onReset={() => this.props.history.goBack()}
    // onChange={this.handleChangeEmail}
    render() {
        if (this.props.userType === 'admin') {
            return (
                <Card style={style} className="md-block-centered">
                    <div className="md-grid">
                        {/* onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}> */}
                        <div className='md-grid md-cell md-cell--7' style={{ padding: '0px' }}>
                            <TextField
                                style={{ padding: 0, margin: 0 }}
                                className="md-cell md-cell--6"
                                leftIcon={<FontIcon>person</FontIcon>}
                                label="FirstName"
                                id="FirstNameField"
                                type="text"
                                value={this.state.firstName}
                                required={true}
                                onChange={this.handleChangeFirstName}
                                errorText="First name is required" />
                            <TextField
                                style={{ padding: 0, margin: 0 }}
                                className="md-cell md-cell--6"
                                leftIcon={<FontIcon>person</FontIcon>}
                                label="LastName"
                                id="LastNameField"
                                type="text"
                                required={true}
                                value={this.state.lastName}
                                onChange={this.handleChangeLastName}
                                errorText="Last name is required" />
                            <TextField
                                style={{ padding: 0, margin: 0 }}
                                className="md-cell md-cell--6"
                                leftIcon={<FontIcon>email</FontIcon>}
                                label="email"
                                id="emailField"
                                type="text"
                                value={this.state.email} />
                        </div>
                        <Cell size={5} style={{ paddingTop: '16px' }}>
                            <div style={{ padding: '0 50px', }}>
                                <Media style={{ borderRadius: '15px', boxShadow: '4px 4px 10px gray' }} aspectRatio="1-1">
                                    <img src={this.state.avatar} alt="Tutor Avatar" />
                                </Media>
                            </div>
                            <FileInput className="md-block-centered" style={{ marginTop: '16px', width: '60%' }} type="file" id='photo' accept="image/*" onChange={values => this.fileChangedHandler(values)} primary />
                        </Cell>

                    </div>
                </Card>
            );
        } else if (this.props.userType === 'customer') {
            return (
                <Card style={{ ...style, maxWidth: '520px' }} className="md-block-centered">
                    <div className="md-grid" >
                        <TextField
                            style={{ padding: 0, margin: 0 }}
                            label="FirstName"
                            leftIcon={<FontIcon>person</FontIcon>}
                            id="FirstNameField"
                            type="text"
                            className="md-cell md-cell--6"
                            required={true}
                            value={this.state.firstName}
                            onChange={this.handleChangeFirstName}
                            errorText="First name is required" />
                        <TextField
                            style={{ padding: 0, margin: 0 }}
                            label="LastName"
                            leftIcon={<FontIcon>person</FontIcon>}
                            id="LastNameField"
                            type="text"
                            className="md-cell md-cell--6"
                            required={true}
                            value={this.state.lastName}
                            onChange={this.handleChangeLastName}
                            errorText="Last name is required"
                            maxLength={20} />
                        <TextField
                            style={{ padding: 0, marginTop: 0, marginBottom: '20px' }}
                            label="email"
                            leftIcon={<FontIcon>email</FontIcon>}
                            id="emailField"
                            type="text"
                            className="md-row"
                            value={this.state.email} />

                        <Button id="submit"
                            disabled={!this.state.firstName || !this.state.lastName || !this.state.email}
                            raised
                            primary
                            className="md-cell md-cell--2"
                            onClick={() => this.handleSubmit()}>Save</Button>
                        <Button
                            id="reset"
                            raised
                            secondary
                            className="md-cell md-cell--2"
                            onClick={() => this.props.history.goBack()}>Dismiss</Button>
                    </div>
                </Card>
            );
        }
    }
}

export default withRouter(EditProfile);
