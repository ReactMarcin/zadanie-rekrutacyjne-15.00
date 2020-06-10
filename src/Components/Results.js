import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const variants = {
    enter: {
        opacity: 1
    },
    exit: {
        opacity: 0.1
    }
}


const Results = ({ result }) => (
    <motion.table className="data-table data-table--large"
        variants={variants}
        animate="enter"
        initial="exit"
        exit="exit"
    >
        <thead>
            <tr>
                <th>Comapny:</th>
                <th>Id:</th>
                <th>City:</th>
                <th>Total income:</th>
                <th>Details:</th>
            </tr>
        </thead>
        <tbody>
            {result.map((item,index) => (
                <tr key={index}>
                    <td scope="row" aria-label="Company:">
                        {item.name}
                    </td>
                    <td aria-label="Id:">
                        {item.id}
                    </td>
                    <td aria-label="City:">
                        {item.city}
                    </td>
                    <td aria-label="Total income:">
                        {item.totalIncomes}$
                    </td>
                    <td aria-label="Details:">
                        <Link to={`/company/${item.id}`}>Details ...</Link>
                    </td>
                </tr>
            ))}
        </tbody>
    </motion.table>
);
export default Results