import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emeitter';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            //rester state
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })

        })
    } //bus event hung event thi dung emitter.on fire thi emitter.emit

    componentDidMount() {
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnChangeInput1 = (event, id) => {
        //bad code monify code
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state
        // }, () => {
        //     console.log('check bad state: ', this.state)
        // })
        //... là sao chép lại cái state đã làm 

        //good code copystate 
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })

        // console.log('event 1:', event.target.value, id) //fire event check event
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('missing paramenter ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call api create modal

            this.props.createNewUser(this.state);
        }

    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }} > Create A New User</ModalHeader>
                <ModalBody>

                    <div className="modal-user-body">
                        <div className="input-container">
                            <lable>Email</lable>
                            <input type="email"
                                onChange={(event) => { this.handleOnChangeInput1(event, "email") }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <lable>Password</lable>
                            <input type="password"
                                onChange={(event) => { this.handleOnChangeInput1(event, "password") }}
                                value={this.state.password}
                            />
                        </div>
                        <div className="input-container">
                            <lable>First Name</lable>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput1(event, "firstName") }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <lable>Last Name</lable>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput1(event, "lastName") }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container max-width-input">
                            <lable>Address</lable>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput1(event, "address") }}
                                value={this.state.address}
                            />
                        </div>

                    </div>



                </ModalBody>
                <ModalFooter>

                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => { this.handleAddNewUser() }}>
                        Add New
                    </Button>
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>
                        Close
                    </Button>{''}
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);

