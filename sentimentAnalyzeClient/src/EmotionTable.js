import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    
    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
                this.props.emotions.map((emotion, i)=>{
                   return <tr key={i}>
                       <th>{emotion[0]}</th>
                       <th>{emotion[1]}</th>
                   </tr>
                })
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
