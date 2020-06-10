import React from 'react'

const ResultDateFromTo = ({ company, fromDate, toDate }) => {

    const getDate = company[0].incomes.filter(item => { return item.date >= fromDate && item.date <= toDate })

    const totalIncomeFromDate_ToDate = getDate.reduce((accumulator,items) => { return accumulator + parseInt(items.value) }, 0)

    const averageIncomeFromDate_ToDate = parseInt(totalIncomeFromDate_ToDate) / getDate.length || 0
    
    return(
        <div className="container-result">
                        <div>
                            <label>
                                <span>
                                    Total income for selected period:
                                </span>
                                <span>
                                    From: {new Date(fromDate).toLocaleString()}
                                </span>
                                <span>
                                    To: {new Date(toDate).toLocaleString()}
                                </span>
                            </label>
                            <h3>
                                {parseInt(totalIncomeFromDate_ToDate)} $
                            </h3>
                        </div>

                        <div>
                            <label>
                                <span>
                                    Average income for selected period:
                                </span>
                                <span>
                                    From: {new Date(fromDate).toLocaleString()}
                                </span>
                                <span>
                                    To: {new Date(toDate).toLocaleString()}
                                </span>
                            </label>
                            <h3>
                                {parseInt(averageIncomeFromDate_ToDate)} $
                            </h3>
                        </div>
            </div>
    );
}
export default ResultDateFromTo