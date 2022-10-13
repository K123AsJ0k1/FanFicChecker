import '../App.css'
import Plot from 'react-plotly.js';

const Result = ({data}) => {
    console.log(data)
    if (data) {
        return (
            <div className='result'>
                <div className='rating'>
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
                layout={{plot_bgcolor:"white",paper_bgcolor:"white",width: 500, height: 500, polar: {radialaxis: {visible: true,range: [0, 5]}},showlegend: false,title:"Top 6 predicted categories"}}
                />
            </div>
        );
        /*
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
                <p>
                Category: {data.category}
                <br/>
                Action: {Math.round(data.c_d[0] * 10000) / 10000}
                <br/>
                Biography: {Math.round(data.c_d[1] * 10000) / 10000}
                <br/>
                Essay: {Math.round(data.c_d[2] * 10000) / 10000}
                <br/> 
                Fable: {Math.round(data.c_d[3] * 10000) / 10000}
                <br/> 
                Family: {Math.round(data.c_d[4] * 10000) / 10000}
                <br/> 
                Fantasy: {Math.round(data.c_d[5] * 10000) / 10000}
                <br/> 
                Friendship: {Math.round(data.c_d[6] * 10000) / 10000}
                <br/>
                General: {Math.round(data.c_d[7] * 10000) / 10000}
                <br/>
                Haiku: {Math.round(data.c_d[8] * 10000) / 10000}
                <br/>
                Historical: {Math.round(data.c_d[9] * 10000) / 10000}
                <br/>
                Horror: {Math.round(data.c_d[10] * 10000) / 10000}
                <br/>
                Humor: {Math.round(data.c_d[11] * 10000) / 10000}
                <br/>
                Kids: {Math.round(data.c_d[12] * 10000) / 10000}
                <br/>
                Life: {Math.round(data.c_d[13] * 10000) / 10000}
                <br/>
                Love: {Math.round(data.c_d[14] * 10000) / 10000}
                <br/>
                Manga: {Math.round(data.c_d[15] * 10000) / 10000}
                <br/>
                Mystery: {Math.round(data.c_d[16] * 10000) / 10000}
                <br/>
                Mythology: {Math.round(data.c_d[17] * 10000) / 10000}
                <br/>
                Nature: {Math.round(data.c_d[18] * 10000) / 10000}
                <br/>
                Play: {Math.round(data.c_d[19] * 10000) / 10000}
                <br/>
                Politics: {Math.round(data.c_d[20] * 10000) / 10000}
                <br/>
                Religion: {Math.round(data.c_d[21] * 10000) / 10000}
                <br/>
                Romance: {Math.round(data.c_d[22] * 10000) / 10000} 
                <br/>
                School: {Math.round(data.c_d[23] * 10000) / 10000}
                <br/>
                Sci-Fi: {Math.round(data.c_d[24] * 10000) / 10000}
                <br/>
                Song: {Math.round(data.c_d[25] * 10000) / 10000}
                <br/>
                Spiritual: {Math.round(data.c_d[26] * 10000) / 10000}
                <br/>
                Supernatural: {Math.round(data.c_d[27] * 10000) / 10000}
                <br/>
                Thriller: {Math.round(data.c_d[28] * 10000) / 10000}
                <br/>
                War: {Math.round(data.c_d[29] * 10000) / 10000}
                <br/>
                Western:{Math.round(data.c_d[30] * 10000) / 10000}
                <br/>
                Work: {Math.round(data.c_d[31] * 10000) / 10000}
                <br/>
                Young Adult: {Math.round(data.c_d[32] * 10000) / 10000}
                </p>
            </div>
        )
        */
    }   

    return null
}

export default Result