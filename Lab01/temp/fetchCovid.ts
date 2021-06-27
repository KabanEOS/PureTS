import React from "react";

export const fetchCovid = async (props) => {

    const opwApiKey = '6eb1240221mshb56fc075a530ffcp1b8c61jsn12364c2d51e5';
    country: string;

    constructor(country: string) {
        this.country = country;
    }
    async getCountryInfo(country: any) {
        const covid = await this.getCovid();
        this.saveData(covid);
    }
    async getCovid(): Promise<any> {
    fetch(`https://covid-19-data.p.rapidapi.com/report/country/name?date=2020-04-01&name=${this.country}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": this.opwApiKey,
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
	}
    })
    .then(response=>response.text()).then(data=>{console.log(data);})
    }
    saveData(data: any) {
        localStorage.setItem('covidData', JSON.stringify(data));
    }
    getData() {
        const data = localStorage.getItem('covidData');
        if (data) {
            return JSON.parse(data);
        } else {
            return {};
        }
    }
}