import React from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import DataPicker from './DataPicker'
import IncomesByOption from './IncomesByOption'
import CompanyInfo from './CompanyInfo'
import ResultDateFromTo from './ResultDateFromTo'

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

class CurrentCompanyById extends React.Component {
    state = {
        company: [],
        loading: true,
        fromDate: null,
        toDate: null
    }
    async componentDidMount(){
        const responseIncom = await axios.get(urlIncomes + parseInt(this.props.match.params.id))
        const responseCompany = await axios.get(urlCompanies)
        
        const result = (a,b,c) => [...a, { ...b, incomes: b.incomes = c }] 
        
        this.setState({
            loading: false,
            company: result(this.state.company, 
                        ...responseCompany.data.filter(item => item.id === parseInt(this.props.match.params.id)), 
                        responseIncom.data.incomes)
        })
    }

    handleChangeFromDate = e => {
        this.setState({ fromDate: new Date(e).toISOString() })
    }

    handleChangeToDate = e => {
        this.setState({ toDate: new Date(e).toISOString() })
    }

    render(){
        if(this.state.loading) return <div className="loading" variants={variants} animate="enter" initial="exit" exit="exit"><h3>Please wait...</h3></div>

        return( 
            <motion.div className="container" variants={variants} animate="enter" initial="exit" exit="exit">

                <CompanyInfo
                    company={this.state.company}
                >
                
                </CompanyInfo>

                <IncomesByOption
                    company={this.state.company}
                />

                {this.state.fromDate && this.state.toDate ? (
                    <ResultDateFromTo
                        fromDate={this.state.fromDate}
                        toDate={this.state.toDate}
                        company={this.state.company}
                    />
                ) : null}

                <DataPicker
                    fromDate={this.state.fromDate}
                    toDate={this.state.toDate}
                    handleChangeFromDate={this.handleChangeFromDate}
                    handleChangeToDate={this.handleChangeToDate}
                />

            </motion.div>
        );
    }
}
export default CurrentCompanyById