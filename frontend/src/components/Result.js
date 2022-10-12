import '../App.css'

const Result = ({data}) => {
    
    if (data) {
        return (
            <div className='result'>
                <p>
                Rating:{data.rating}
                <br/>
                K:{Math.round(data.r_d[2] * 10000) / 10000}
                <br/>
                K+:{Math.round(data.r_d[3] * 10000) / 10000}
                <br/>
                T:{Math.round(data.r_d[0] * 10000) / 10000}
                <br/>
                M:{Math.round(data.r_d[1] * 10000) / 10000}
                </p>
            </div>
        )
    }   

    return null
}

export default Result