import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Col,
    Row,
    Table,
    TextInput,
    Select,
    Icon,
    Button
} from "react-materialize";
import Loading from "../loading/Loading";
import axios from "axios";
import {
    fetch_province,
    push_business_to_modal
} from "../../redux/actions/index";
import BusinessModalDetail from "./BusinessModalDetail";
import API from "../../utils/API/API";
import formatPhone from "../../utils/commons/FormatPhone";

const mapStateToProps = state => {
    return { provinces: state.provinces };
};

function mapDispatchToProps(dispatch) {
    return {
        addProvinceToRedux: provinces => dispatch(fetch_province(provinces)),
        pushBusinessToModal: business =>
            dispatch(push_business_to_modal(business))
    };
}

class Business extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBy: {
                name: "",
                phone: "",
                province: ""
            },
            provinces: [],
            loading: true,
            search: false
        };
    }

    componentDidMount() {
        this.getData();
    }

    filterByField(searchText, field, array) {
        let results = array.filter(item =>
            item[field]
                .replace(/\s/g, "")
                .toLowerCase()
                .includes(searchText.replace(/\s/g, "").toLowerCase())
        );
        return results;
    }

    getData = () => {
        const provinceRequest = API.get("provinces");
        const businessRequest = API.get("businesses");
        axios
            .all([provinceRequest, businessRequest])
            .then(
                axios.spread((...responses) => {
                    const provinces = responses[0].data;
                    const businesses = responses[1].data;

                    this.setState({
                        provinces,
                        businesses,
                        loading: false
                    });
                    //Save provinces data in redux for later usage
                    this.props.addProvinceToRedux(provinces);
                })
            )
            .catch(error => {
                console.log(error);
            });
    };

    handleSubmit = e => {
        e.preventDefault();
    };

    handleInputChange = e => {
        const searchBy = { ...this.state.searchBy };
        const field = e.target.name;
        let value = e.target.value;
        if (field === "phone") {
            value = formatPhone(value);
        }
        searchBy[field] = value;

        this.setState({
            ...this.state,
            searchBy
        });
    };

    getProvinceName = _id => {
        const { provinces } = this.state;
        const foundProvince = provinces.filter(
            province => province._id === _id
        );
        return foundProvince[0].name;
    };

    handleOpenModal = business => () => {
        this.setState({
            business
        });
    };

    handleFilter = e => {
        e.preventDefault();

        let businesses = this.state.businesses;
        const fields = Object.keys(this.state.searchBy);
        fields.forEach(field => {
            businesses = this.filterByField(
                this.state.searchBy[field],
                field,
                businesses
            );
        });

        this.setState({
            ...this.state,
            search: true,
            results: businesses
        });
    };

    handleResetFilter = e => {
        e.preventDefault();

        this.setState({
            ...this.state,
            searchBy: {
                name: "",
                phone: "",
                province: ""
            },
            search: false
        });
    };

    render() {
        const { name, phone, province } = this.state.searchBy;
        const { loading, provinces, business, search } = this.state;

        if (loading) {
            return <Loading />;
        }

        //Get the set of search otherwise display all businesses
        let businesses = search ? this.state.results : this.state.businesses;

        return (
            <div>
                <Row style={{ marginTop: "20px" }}></Row>
                <Row>
                    <Col>
                        <h5>Businesses</h5>
                    </Col>
                </Row>
                <Row
                    style={{
                        backgroundColor: "white",
                        padding: "20px",
                        boxShadow: "1px 1px 1px #9E9E9E"
                    }}
                >
                    <form>
                        <h6>Filter by</h6>
                        <Col s={12} m={12} l={12} xl={12}>
                            <TextInput
                                s={12}
                                l={4}
                                m={4}
                                xl={4}
                                label='Name'
                                name='name'
                                value={name}
                                onChange={this.handleInputChange}
                            />
                            <TextInput
                                s={12}
                                l={3}
                                m={3}
                                xl={3}
                                label='Phone'
                                name='phone'
                                value={phone}
                                onChange={this.handleInputChange}
                            />
                            <Select
                                onChange={this.handleInputChange}
                                options={{
                                    classes: "",
                                    dropdownOptions: {
                                        alignment: "left",
                                        autoTrigger: true,
                                        closeOnClick: true,
                                        constrainWidth: true,
                                        container: null,
                                        coverTrigger: true,
                                        hover: false,
                                        inDuration: 150,
                                        onCloseEnd: null,
                                        onCloseStart: null,
                                        onOpenEnd: null,
                                        onOpenStart: null,
                                        outDuration: 250
                                    }
                                }}
                                value={province}
                                name='province'
                            >
                                <option disabled value=''>
                                    Select Province
                                </option>
                                {provinces.map(province => {
                                    return (
                                        <option
                                            className='black-text'
                                            key={province._id}
                                            value={province._id}
                                        >
                                            {province.name}
                                        </option>
                                    );
                                })}
                            </Select>
                            <Button
                                className='gradient-btn btn-primary'
                                node='button'
                                onClick={this.handleFilter}
                                style={{
                                    marginRight: "5px",
                                    bottom: "-20px",
                                    marginBottom: "20px"
                                }}
                                waves='light'
                            >
                                Search
                            </Button>
                            <Button
                                node='button'
                                className='gradient-btn btn-white'
                                onClick={this.handleResetFilter}
                                style={{
                                    marginRight: "5px",
                                    bottom: "-20px",
                                    marginBottom: "20px"
                                }}
                                waves='light'
                            >
                                Reset
                            </Button>
                        </Col>
                    </form>
                </Row>
                <Row
                    style={{
                        backgroundColor: "white",
                        padding: "20px",
                        boxShadow: "1px 1px 1px #9E9E9E"
                    }}
                >
                    <Col
                        s={12}
                        m={12}
                        l={12}
                        xl={12}
                        style={{ marginTop: "50px" }}
                    >
                        <Table>
                            <thead>
                                <tr>
                                    <th data-field='id'>Name</th>
                                    <th data-field='price'>Phone</th>
                                    <th data-field='price'>Province</th>
                                    <th data-field='price'>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {businesses.length > 0 ? (
                                    businesses.map(business => {
                                        return (
                                            <tr key={business._id}>
                                                <td>{business.name}</td>
                                                <td>{business.phone}</td>
                                                <td>
                                                    {this.getProvinceName(
                                                        business.province
                                                    )}
                                                </td>
                                                <td>
                                                    <a
                                                        onClick={this.handleOpenModal(
                                                            business
                                                        )}
                                                        className='modal-trigger'
                                                        href='#modal1'
                                                    >
                                                        <Icon>launch</Icon>
                                                    </a>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td>There is no business found!</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <div>
                    {business && (
                        <BusinessModalDetail
                            business={business}
                            updateData={this.getData}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Business);
