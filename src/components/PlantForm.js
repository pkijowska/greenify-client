import React, {Component} from 'react';


class PlantForm extends Component {


 render() {
     return (
       <div>
           <form onSubmit={this.props.onSubmit}>
             <label>
               Name:
               <input type="text" name="name" value={this.props.plant.name} onChange={this.props.onTextChange} />
             </label><br/>
             <label>
               image:
                 <input type="file" name="file" onChange={this.props.onFileChange} />
             </label><br/>
             <label>
               Age:
                 <input type="text" name="age" value={this.props.plant.age} onChange={this.props.onTextChange} />
             </label><br/>
             <label>
               Status:
                 <input type="text" name="status" value={this.props.plant.status} onChange={this.props.onTextChange} />
             </label><br/>
             <label>
               Cost:
                 <input type="text" name="cost" value={this.props.plant.cost} onChange={this.props.onTextChange}/>
             </label><br/>
             <label>
               Worth:
                 <input type="text" name="worth" value={this.props.plant.worth} onChange={this.props.onTextChange}/>
             </label><br/>
             <label>
               Desciption:
                 <textarea name="description" value={this.props.plant.description} onChange={this.props.onTextChange}/>
             </label><br/>
               <input type="submit" value= {this.props.buttonLabel} />
             </form>
         </div>
     )
   }
 }

 export default PlantForm;
