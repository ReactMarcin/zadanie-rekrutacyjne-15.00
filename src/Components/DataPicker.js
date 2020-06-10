import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

const DataPicker = ({ fromDate, toDate, handleChangeFromDate, handleChangeToDate }) => (
    <div className="container data-picker">
        <div style={{padding: '20px 0'}}>
            <p>
              From date:
            </p>
            <KeyboardDatePicker
                className="data-picker"
                clearable
                value={fromDate ? new Date(fromDate) : new Date()}
                placeholder="10/10/2018"
                onChange={e => handleChangeFromDate(e)}
                format="MM/dd/yyyy"
            />
        </div>
        <div style={{padding: '20px 0'}}>
            <p>
                To date:
            </p>
            <KeyboardDatePicker
                className="data-picker"
                placeholder="10/10/2018"
                value={toDate ? new Date(toDate) : new Date()}
                onChange={e => handleChangeToDate(e)}
                format="MM/dd/yyyy"
                clearable
            />
        </div>
      </div>
);
export default DataPicker