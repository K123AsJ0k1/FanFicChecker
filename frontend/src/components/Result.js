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
                    <div className='textResult'>
                        Rating:{data.rating}
                    </div>
                    <Plot
                    data={[{
                        type: 'scatterpolar',
                        r: data['c_top_6_d'],
                        theta: data['c_top_6_l'],
                        fill: 'toself',
                        marker : { color : '#B80102'}
                    }]}
                    layout={{plot_bgcolor:"rgb(169,169,169)",paper_bgcolor:"rgb(169,169,169)",width: 500, height: 500, polar: {radialaxis: {visible: true,range: [0, 5]}},showlegend: false,title:"Top 6 predicted categories"}}
                    />
                </div>
            );
        }

        return (
            <div className='results'>
                <div className='textResult'>
                    Prediction failed, please give 
                    a text with more common words.
                </div>
            </div>
        )
    }   

    return null
}

export default Result