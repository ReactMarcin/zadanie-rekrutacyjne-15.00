import React from 'react'
import './styles/styles.css'
import { AnimatePresence } from 'framer-motion'
import HomePage from './Components/HomePage'
import SingleFirma from './Components/SingleFirma'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns'

const App = () => (
    <React.Fragment>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Router>
                <Route render={({location}) => (
                    <AnimatePresence exitBeforeEnter initial={false}>
                        
                        <Switch location={location} key={location.pathname}>
                            <Route exact path="/" component={HomePage} />
                            <Route exact path="/company/:id" component={SingleFirma} />
                        </Switch>
                    </AnimatePresence>
                )} />
            </Router>
        </MuiPickersUtilsProvider>
    </React.Fragment>
);
export default App