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
  }

	render() {
		return (
      <div className="image-element">
        <img src={this.props.data.properties.src} />
      </div>
		);
	}
}

export default ImageElement;