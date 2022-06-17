import { useEffect, useState } from "react"
import './Home.css'


export const Home=()=>{
const [covidata,setCoviddata]=useState({});
const [countrydata,setCountrydata]=useState([])
const [date,setDate]=useState({date:""})
    useEffect(()=>{
        fetch("https://asifcovidapp.herokuapp.com/getdata").then(Response=>Response.json()).then(data=>{setCoviddata(data.Global);setCountrydata(data.Countries)})
    },[])
console.log(covidata.NewConfirmed)
    useEffect(()=>{
        const d=new Date().toLocaleString();
        setDate({...date,date:d})
    },[])
  console.log(countrydata)
    return (
        <div className="home">
           <div className="corona-top-heading-div">
              <h1>COVID-19 CORONAVIRUS PANDEMIC</h1>
           </div>
           <p className="corona-top-heading-div">{date.date}</p>
           
           <div className="global-cases-container">
             <div>
                <p className="global-para-heading para1">Coronavirus Cases:</p>
                <h1 className="total-record">{covidata.TotalConfirmed}</h1>
             </div>
             <div>
                <p className="global-para-heading para2">Deaths:</p>
                <h1 className="total-record">{covidata.TotalDeaths}</h1>
             </div>
             <div>
                <p className="global-para-heading para3">Recovered:</p>
                <h1 className="total-record">{covidata.TotalRecovered}</h1>
             </div> 
           </div>
           <div className="country-records-conatiner">
             <table className="all-country-table" border="1px" cellSpacing="0" cellPadding="20px">
                <thead>
                   <tr>
                    <th>Country</th>
                    <th>Total Cases</th>
                    <th>New Cases</th>
                    <th>Total Deaths</th>
                    <th>New Deaths</th>
                    <th>Total Recovered</th>
                    <th>New Recovered</th>
                   </tr>
                </thead>
                <tbody>
                    {countrydata.map((elem)=>{
                        return(
                            <tr>
                                <td>{elem.Country}</td>
                                <td>{elem.TotalConfirmed}</td>
                                <td>{elem.NewConfirmed}</td>
                                <td>{elem.TotalDeaths}</td>
                                <td>{elem.NewDeaths}</td>
                                <td>{elem.TotalRecovered}</td>
                                <td>{elem.NewRecovered}</td>
                            </tr>
                        )
                    })}
                </tbody>
             </table>
           </div>
        </div>
    )
}