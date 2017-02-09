/**
 * Created by Administrator on 2017/1/21.
 */
import React, {
	Component
} from 'react';

class ImageElement extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    /*<img src={this.props.data.properties.src} />*/
  }

	render() {
		return (
      <div className="image-element">
        <img src="/build/images/imageSample3.png" /> 
      </div>
		);
	}
}

export default ImageElement;