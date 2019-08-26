import React, { Component } from 'react'

class Products extends Component {

    constructor() {
        super()
        this.state = {
            data: {
                "search": "brand: Apple AND modal: \"iPhone 8 Plus\"",
                "filter": { "sku_id": 1 }
            },
        }
    }

    componentWillMount() {
        const resp = fetch('http://beta-zepnur.teve.cloud/v2/search?page=0', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-anonymous': 'zepnur',
                'x-cloud-id': '1002'

            },
            body: JSON.stringify(this.state.data)
        }).then(res => res.json()).then(res => {
            this.setState({ ...res.search_result })
        })
    }

    render() {
        return (
            <div>
                <p>Hello world first Page</p>
                {console.log(this.state)}
                <p>Aggregations:</p>
                    <p>Brand</p>
                <ul>
                    <li>buckets:{this.state.aggregations && this.state.aggregations.brand.buckets.map(item=> <div>item</div> ) }                    </li>
                </ul>
            </div>
        )
    }
}

export default Products
