import React from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import Results from './Results'
import Pagination from './Pagination'
import SearchBar from './SearchBar'

const variants = {
    enter: {
        opacity: 1, scale: 1, transition: { duration: 0.4 }
    },
    exit: {
        opacity: 0.1, scale: 0.75, transition: { duration: 0.4 }
    }
}

const urlCompanies = 'https://recruitment.hal.skygate.io/companies'
const urlIncomes = 'https://recruitment.hal.skygate.io/incomes/'

const companies = []

class HomePage extends React.Component {
    state = {
        companies: [],
        arr: [],
        index: [],
        result: [],
        incomes: [],
        x:[],
        term: ''
    }

    async componentDidMount(){
        const response = await axios.get(urlCompanies)
        
        const sortsItems = response.data.sort((a,b) => { return a.id - b.id })

        const requests = sortsItems.map(a => {
            return axios.get(urlIncomes + a.id)
        })
      
        Promise.all(requests).then(response => {
            if(response.length){
                sortsItems.filter((a,b,c) => {
                    if(a.id === response[b].data.id){
                        a.incomes = response[b].data.incomes
                        a.totalIncomes = response[b].data.incomes.reduce((acc,items) => { return acc + parseInt(items.value) }, 0)
                        c.sort((a,b) => { return b.totalIncomes - a.totalIncomes })
                    }
                })
                this.setState({ incomes: response })
            }
        }).catch((err) => {
            console.log(err)
        })
        sortsItems.map(i => companies.push(i))
        this.setState({ companies: sortsItems })
    }

    onChangePage = pageOfItems => {
        this.setState({ result: pageOfItems })
    }

    handleChange = e => {
        let filterArr = companies.filter(item => { return item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 })
        this.setState({
            term: e.target.value,
            companies: filterArr.sort((a,b) => { return b.totalIncomes - a.totalIncomes })
        })
    }

    render(){

        if(this.state.incomes.length <= 0){
            return <div className="loading" variants={variants} animate="enter" initial="exit" exit="exit"><h3>Please wait...</h3></div>
        }

        return(
            <motion.div className="container" variants={variants} animate="enter" initial="exit" exit="exit">
                
                <SearchBar 
                    companies={this.state.companies} 
                    term={this.state.term} 
                    handleChange={e => this.handleChange(e)}  
                />
                
                <Results result={this.state.result} incomes={this.state.incomes} />
                    
                <div className="pagination-container">
                    <Pagination items={this.state.companies} onChangePage={this.onChangePage} />
                </div>

            </motion.div>
        );

    }
}

export default HomePage