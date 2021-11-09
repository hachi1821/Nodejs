import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emeitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        }

    }

    async componentDidMount() {
        await this.getAllUsersFromReact()
    }
    getAllUsersFromReact = async () => {
        let respone = await getAllUsers('ALL')
        if (respone && respone.errCode === 0) {
            this.setState({
                arrUsers: respone.users
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,

        })
    }
    toggleUserModal = () => { // show and hide 
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }
    createNewUser = async (data) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === !0) {
                alert(res.errCode.errMesage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false

                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }

        } catch (e) {
            console.log(e);
        }
    }
    handleDeleteUser = async (user) => {

        try {
            let res = await deleteUserService(user.id)
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact();
                alert('delete succeed');
            }
            else {
                alert(res.errMesage)
            }
        } catch (e) {
            console.log(e);
        }
    }
    handleEditUser = (user) => {
        console.log('check edit user', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        })
    }
    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsersFromReact()
            } else {
                alert(res.errCode)
            }
        } catch (e) {
            console.log(e)
        }


    }
    /*life cycle
    run compoment
    1.run construct -> init state
    2.did mount(gan gia tri  set state  ) :born ;umonut
    3.render

    

    */
    render() {

        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}


                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    // createNewUser={this.createNewUser}

                    />
                }
                <div className="title text-center">
                    Manage users with IT
                </div>
                <div className="mx-2">
                    <button className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()} // arow funtions

                    > <i className="fas fa-plus"></i>Add New Users</button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Acction</th>
                            </tr>

                            {// viet code Javascript trong html : vong lap map 
                                //arr.map(item =>{ }) lap theo tung phan tu cua mang 
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        // plag ment
                                        <tr key={index}>
                                            <td > {item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td> {item.address}</td>
                                            <td>
                                                <button className="btn-edit" onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                                <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
