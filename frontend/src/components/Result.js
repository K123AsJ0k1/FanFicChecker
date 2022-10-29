import '../App.css'
import Plot from 'react-plotly.js';
import Guide from './Guide';
import { useState } from 'react'

const Result = ({data}) => {
    const [visible, setVisible] = useState(false)
    if (data) {
        if (data['status'] === 200) { 
            return (
                <div className='results'>
                    { !visible && <button className='formButton' onClick={() => setVisible(true)}>Show interperation guide</button> }
                    { visible && <button className='formButton' onClick={() => setVisible(false)}>Hide interperation guide</button> }
                    { visible && <Guide/>}
                    <h2 className='text'>
                        Predictions
                    </h2>
                    <div className='textResult'>
                        Rating:{data.rating}
                    </div>
                    <Plot
                    data={[{
                        type: 'scatterpolar',
                        r: data['c_top_6_d'],
                        theta: data['c_top_6_l'],
                        fill: 'toself',
                        marker : {color : '#333'}
                    }]}
                    layout={{
                            paper_bgcolor:"rgb(51,51,51)",
                            width: 750, 
                            height: 650, 
                            polar: {bgcolor:'rgb(169,169,169)',radialaxis: {visible: true, range: [0, 5], color:"white"}},
                            showlegend: false,
                            title:"Top 6 categories",
                            titlefont: {size:18,color: '#AAAAAA'},
                            font: {size:18, color: '#AAAAAA'},
                        }}
                    />
                </div>
            );
        }

        return (
            <div className='results'>
                <div className='textResult'>
                    Prediction too vague, please give 
                    more general words.
                </div>
            </div>
        )
    }   

    return null
}

export default Result