import '../App.css'
import Form from "./Form"
//import Header from './Header'
import Result from './Result'
import Welcome from './Welcome'
import { useState } from 'react'

const Main = () => {
    const [data, setData] = useState('')

    return (
        <div className='main'>
            <Welcome/>
            <Form setData={setData}/>
            <Result data={data}/>
        </div>
    )
}

export default Main