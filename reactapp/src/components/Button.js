import '../App.css'
import { useEffect, useState } from 'react';

export default function Button({message, style = "", children}) {
    const [number, setNumber] = useState(1);

    //Innitially fetching data
    useEffect(() => {
        pollCount()

        return () => {
            clearTimeout(pollCount)
        }
    }, []);

    //Long polling data
    function pollCount() {
        fetch('/api/counter')
            .then(response => response.json())
            .then(data => {
                setTimeout(pollCount, 1000)
                return setNumber(data[0].count)
            })
    }

    function handleClick() {

        if (number >= 10) {
            setNumber(0);
        } else {
            setNumber(number + 1);
        }

        fetch('/api/counter/1/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ count: number + 1 }),
        })
    }
  
    return (
        <>
            <h1 class="text-lg">{number}</h1>
            <button onClick={handleClick} class={style + " p-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>
                {children}
            </button>
        </>
    );
  }