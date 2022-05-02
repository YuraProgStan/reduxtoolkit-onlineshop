import React, {useRef} from 'react';
import axios from "axios";

const App = () => {

    const input = useRef();
    const formData = new FormData;
    const sendFile = async () => {
        const {data}  = await axios.put('http://localhost:5500/api', formData);
              const res = await data;
        // const response = await fetch('http://localhost:5500/api', {
        //     method: 'post',
        //     body: formData,
        // });
        // const res = await response.json();
        console.log(res.name, res.fileName);
    }
    const getData = async () => {
        const {data} = await axios.get('http://localhost:5500/api');
        const res = await data.text;
        console.log(res);
    }
    const allData = () => {
        const file = input.current.files[0];
        formData.append('img', file, file.name);
        formData.append('name', 'Yura')
        sendFile(formData);
        getData();
    }
    return (
        <div>
            <input ref={input} type="file"/>
            <button onClick={allData}>Send file</button>
        </div>
    );
};

export default App;