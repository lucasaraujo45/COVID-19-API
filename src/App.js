import React from 'react';
import './App.css';
import Axios from "axios";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.getCountryData = this.getCountryData.bind(this);
    }

    state = {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        countries: []
    }

    componentDidMount() {
        this.getData();
    }


    async getData() {
        const resApi = await Axios.get("https://covid19.mathdro.id/api")
        const resCountries = await Axios.get("https://covid19.mathdro.id/api/countries")
        const countries = Object.keys(resCountries.data.countries)
        this.setState({
            confirmed: resApi.data.confirmed.value,
            recovered: resApi.data.recovered.value,
            deaths: resApi.data.deaths.value,
            countries

        });
    }

    async getCountryData(e) {
        try {
            const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`);
            this.setState({
                confirmed: res.data.confirmed.value,
                recovered: res.data.recovered.value,
                deaths: res.data.deaths.value
            });
        }
        catch (err) {
            if (err.response.status === 404)
                this.setState({
                    confirmed: "No Data Available",
                    recovered: "No Data Available",
                    deaths: "No Data Available"
                });
        }
    }

    renderCountryOptions() {
        return this.state.countries.map((country, i) => {
            return <option key={i}>{country}</option>
        });
    }



    render() {
        return (<div>
            <div className="container">
                <h1>Corona update</h1>

                <select onChange={this.getCountryData}>
                    {this.renderCountryOptions()}
                </select>


                <div class="flex">
                    <div className="box confirmed">
                        <h3>Confirmed cases</h3>
                        <h4>{this.state.confirmed}</h4>
                    </div>
                    <div className="box recovered">
                        <h3>Recovered cases</h3>
                        <h4>{this.state.recovered}</h4>
                    </div>
                    <div className="box deaths">
                        <h3>Deaths</h3>
                        <h4>{this.state.deaths}</h4>
                    </div>
                </div>
            </div>
            <div className="exponential">
                <h2>Lower Exponential Growth by Staying in and self quarantine</h2>
                <p>Nd = Number of cases on a given day</p>
                <p>E = Average number of people someone infected is exposed each day</p>
                <p>p = Probability of each exposure becoming a new case</p>
                <br/>
                <h4>∆Nd = E * p * Nd</h4>
                <h4>Nd+1 = Nd + E * p * Nd</h4>
                <h4>Nd+1 = (1 + E * p)Nd</h4>
                <br/><br/>

                <h6>current Exponential rate = 1.15</h6>
                <h5>(1.05)^20 * 290,000 = 769,456 cases vs..</h5>
                <h5>(1.15)^20 * 290,000 = 4,746,295</h5>
                <p>If we lower the Exponential growth rate by 10% we can prevent millions of infections world wide.</p>

            </div>
        </div>
        )
    }
}