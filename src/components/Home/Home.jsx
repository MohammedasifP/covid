import { useEffect, useState } from "react"
import './Home.css'
import {FaSortAmountDown} from "react-icons/fa";
import {FaSortAmountDownAlt} from "react-icons/fa";
import {FaSort} from "react-icons/fa";

export const Home=()=>{
const [covidata,setCoviddata]=useState({});
const [countrydata,setCountrydata]=useState([])
const [icon,setIcon]=useState(true)
const [totalcases,setTotalcases]=useState(true);
const [totaldeaths,setTotaldeaths]=useState(true);

const [date,setDate]=useState({date:""})
    useEffect(()=>{
        fetch("https://asifcovidapp.herokuapp.com/getdata").then(Response=>Response.json()).then(data=>{setCoviddata(data.Global);setCountrydata(data.Countries)})
    },[])

    useEffect(()=>{
        const d=new Date().toLocaleString();
        setDate({...date,date:d})
    },[])

   const countrySort=()=>{
      setIcon(!icon)
      if(icon){
        const cdata=countrydata.sort((a, b) => b.Country.localeCompare(a.Country))
        let data=[];
        Object.assign(data,cdata)
        setCountrydata(data)
      }
    else{
        const cdata=countrydata.sort((a, b) => a.Country.localeCompare(b.Country))
        let data=[];
        Object.assign(data,cdata)
        setCountrydata(data)
    }
   }

   const totalSort=()=>{
    setTotalcases(!totalcases)
   if(totalcases){
    const Tdata=countrydata.sort((a,b)=>{return a.TotalConfirmed-b.TotalConfirmed})
    let data=[];
    Object.assign(data,Tdata)
    setCountrydata(data)
   }
   else{
    const Tdata=countrydata.sort((a,b)=>{return -a.TotalConfirmed+b.TotalConfirmed})
    let data=[];
    Object.assign(data,Tdata)
    setCountrydata(data)
   }
   }

   const deathSort=()=>{
    setTotaldeaths(!totaldeaths)
    if(totaldeaths){
     const Tdata=countrydata.sort((a,b)=>{return a.TotalDeaths-b.TotalDeaths})
     let data=[];
     Object.assign(data,Tdata)
     setCountrydata(data)
    }
    else{
     const Tdata=countrydata.sort((a,b)=>{return -a.TotalDeaths+b.TotalDeaths})
     let data=[];
     Object.assign(data,Tdata)
     setCountrydata(data)
    }
        
   }

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
             <table className="all-countries-table" border="1px" cellSpacing="0" cellPadding="10%">
                <thead>
                   <tr>
                    <th onClick={countrySort} className="country-sort">Country {icon?<FaSortAmountDownAlt/>:<FaSortAmountDown/>}</th>
                    <th onClick={totalSort} className="sort">Total Cases <FaSort/></th>
                    <th>New Cases</th>
                    <th onClick={deathSort} className="sort">Total Deaths <FaSort/></th>
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