import { useEffect, useState } from "react"
import './Home.css'
import {FaSortAmountDown} from "react-icons/fa";
import {FaSortAmountDownAlt} from "react-icons/fa";
import {FaSort} from "react-icons/fa";
import {Bar} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const options={
    indexAxis:'x',
    elements:{
        bar:{
            borderWidth:1,
        },
    },
    responsive:true,

}

export const Home=()=>{
const [covidata,setCoviddata]=useState({});
const [countrydata,setCountrydata]=useState([])
const [icon,setIcon]=useState(true)
const [totalcases,setTotalcases]=useState(true);
const [totaldeaths,setTotaldeaths]=useState(true);
const [country,setCountry]=useState({country:""})
const [showcountry,setShowcountry]=useState({})
const [showcountrydiv,setShowcountrydiv]=useState(false)


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
   const handlechange=(e)=>{
       const {value}=e.target;
       setCountry(value)
   }
   const displayCountry=()=>{
      const cdata=countrydata.filter((elem)=>{return elem.Country.toLowerCase()==country.toLowerCase()})
        if(cdata.length==0){
            alert("please enter correct country name")
        }
        else{
            setShowcountrydiv(true)
            setShowcountry(cdata[0])
        }
       
   }
   console.log(showcountry)
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
           
           {/* Globalplot */}
           <div style={{height:"350px"}}>
             <div className="Bar-container" style={{height:"100%",width:"60%",border:"1px solid black"}}>
               <Bar
                 data={{
                      labels:['Cases','Death','Recoverd'],
                    datasets:[
                         {
                           label:'Total',
                           data:[covidata.TotalConfirmed,covidata.TotalDeaths,covidata.TotalRecovered],
                           borderColor:'black',
                           backgroundColor:'blue' },
                           {
                           label:'New',
                           data:[covidata.NewConfirmed,covidata.NewDeaths,covidata.NewRecovered],
                           borderColor:'black',
                           backgroundColor:'red' },
                             ] }}  
                        options={options}
                   />
                </div>
                <p className="global-plot">Global Plot</p>
             </div>

             {/* Single country div */}
            <div className="country-search-div">
                <input type="text" placeholder="Enter the Country" onChange={handlechange}></input>
                <button onClick={displayCountry}>Search</button>
            </div>
            {showcountrydiv?
            <div className="single-country-container">
                <button onClick={()=>{setShowcountrydiv(false)}}>Back</button>
                <div className="single-country-table-container">
                    <table className="single-country-table" border="1px solid black" cellSpacing="0px">
                        <thead>
                            <tr>
                                <th>Country </th>
                                <th>Total Cases </th>
                                <th>New Cases</th>
                                <th>Total Deaths</th>
                                <th>New Deaths</th>
                                <th>Total Recovered</th>
                                <th>New Recovered</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{showcountry.Country}</td>
                                <td>{showcountry.TotalConfirmed}</td>
                                <td>{showcountry.NewConfirmed}</td>
                                <td>{showcountry.TotalDeaths}</td>
                                <td>{showcountry.NewDeaths}</td>
                                <td>{showcountry.TotalRecovered}</td>
                                <td>{showcountry.NewRecovered}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{width:"50%",margin:"auto"}}>
                    <Bar
                      data={{
                      labels:['Cases','Death','Recoverd'],
                    datasets:[
                         {
                           label:'Total',
                           data:[showcountry.TotalConfirmed,showcountry.TotalDeaths,showcountry.TotalRecovered],
                           borderColor:'black',
                           backgroundColor:'blue' },
                           {
                           label:'New',
                           data:[showcountry.NewConfirmed,showcountry.NewDeaths,showcountry.NewRecovered],
                           borderColor:'black',
                           backgroundColor:'red' },
                             ] }}  
                        options={options}
                   />
                    </div>
                </div>
            </div>:""}
              
             {/* all countries table  */}
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
                                <td style={{backgroundColor:"red",color:"white"}}>{elem.TotalDeaths}</td>
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