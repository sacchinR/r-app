import React, { Component } from 'react'

class Products extends Component {

    constructor() {
        super()
        this.state = {
            productName: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount() {

    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({ [name]: value })


    }

    handleClick() {
        console.log("state", this.state)
        const prodName = {
            "search": this.state.productName
        }
        console.log(prodName)
        fetch('http://beta-zepnur.teve.cloud/v2/search?page=0', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-anonymous': 'zepnur',
                'x-cloud-id': '1002'

            },
            body: JSON.stringify(prodName)
        }).then(res => res.json()).then(res => {
            this.setState({ ...res.search_result })
        })


    }

    render() {
        return (
            <div>
                {console.log(this.state)}

                <input
                    type="text"
                    name="productName"
                    value={this.props.productName}
                    onChange={this.handleChange}
                    placeholder="Enter the Product Name"
                />
                <button type="submit" onClick={this.handleClick} > submit </button>
                <div className="d-flex justify-content-around flex-wrap" >
                {this.state.hits && this.state.hits.hits.map(hit =>    
                <div className="products w-25 h-0 m-5">
                    <div className="prodName">
                        {hit._source.inventory_name}
                    </div>
                    <div className="image">
                        <img src={'https://api.zepnurhealth.com/image/' + hit._source.sku_image.split(",")[0] + '?token=eyJzaXplIjoieDMwMCIsImNsb3VkX2lkIjoiMTAwMiJ9'} width="300" height="300" />
                    </div>
                    <div>
                        Description:
                        <div className="" > {hit._source.description } </div>
                    </div>
                </div>
                )}
                </div>

            </div>
        )
    }
}


export default Products
