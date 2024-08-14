import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JournalNo(){
    const [lastJournalNo, setLastJournalNo] = useState(null);


    useEffect(() => {
        function getJournals() {
            axios.get("http://localhost:7070/journal/get").then((res) => {
                const journals = res.data;
                if (journals.length > 0) {
                    const sortedJournals = journals.sort((a, b) => b.journalNo - a.journalNo);
                    setLastJournalNo(sortedJournals[0].journalNo);
                }
            }).catch((err) => {
                alert(err.message);
            });
        }
        getJournals();
    }, []);

    return (
        <div>
           
            
                {lastJournalNo !== null ? (
                    <div style={{padding: '10px' }}>
                        <h1 className="txtJournal"> {lastJournalNo + 1}</h1>
                    </div>
                ) : (
                    <p></p>
                )}
            
        </div>
    );
}

export default JournalNo;