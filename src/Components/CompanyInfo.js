import React from 'react'

const CompanyInfo = ({ company, children }) => {
        const totalIncomes = company[0].incomes.reduce((accumulator,items) => { return accumulator + parseInt(items.value) }, 0)

        const averageIncome = parseInt(totalIncomes / company[0].incomes.length)

        const getLastYear = company[0].incomes.sort((a,b) => { return new Date(b.date).getFullYear() - new Date(a.date).getFullYear() })

        const lastMonthIncome = company[0].incomes.filter(i => new Date(i.date).getFullYear() === new Date(getLastYear[0].date).getFullYear() ).reduce((acc,items) => { return acc + parseInt(items.value) }, 0)
    return(
            <>
                <div className="header-company">
                    <h1>{company[0].name}</h1>
                </div>

                <div className="header info">

                    <div className="container-logo">
                        
                        <img alt="React.js" src="/logo192.png" />
                        
                        <div className="logo-content">
                            <p>Company: Id: {company[0].id}</p>
                            <h2>
                                {company[0].name}
                            </h2>
                        </div>

                    </div>

                <div className="grid-info">

                    
                    <div className="company-info">

                            <div className="item">
                                <label>
                                    City:
                                </label>
                                <h3>
                                    {company[0].city}
                                </h3>
                            </div>

                            <div className="item">
                                <label>
                                Last month income:
                                </label>
                                <h3>
                                    {lastMonthIncome} $
                                </h3>
                            </div>

                    </div>

                    <div className="company-info">

                            <div className="item">
                                <label>
                                    Total income:
                                </label>
                                <h3>
                                    {totalIncomes} $
                                </h3>
                            </div>
                            <div className="item">
                                <label>
                                    Average income:
                                </label>
                                <h3>
                                    {averageIncome} $
                                </h3>
                            </div>

                    </div>

                </div>

                {children}

            </div>
        </>
    );
}
export default CompanyInfo