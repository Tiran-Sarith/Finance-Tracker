import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InvoiceNo(){
    const [lastInvoiceNo, setLastInvoiceNo] = useState(null);


    useEffect(() => {
        function getInvoices() {
            axios.get("http://localhost:7070/invoice/get").then((res) => {
                const invoices = res.data;
                if (invoices.length > 0) {
                    const sortedInvoices = invoices.sort((a, b) => b.invoiceNo - a.invoiceNo);
                    setLastInvoiceNo(sortedInvoices[0].invoiceNo);
                }
            }).catch((err) => {
                alert(err.message);
            });
        }
        getInvoices();
    }, []);

    return (
        <div>
           
            
                {lastInvoiceNo !== null ? (
                    <div style={{padding: '10px' }}>
                        <h1 className="txtJournal"> {lastInvoiceNo + 1}</h1>
                    </div>
                ) : (
                    <p></p>
                )}
            
        </div>
    );
}

export default InvoiceNo;