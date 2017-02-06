/**
 * Created by Administrator on 2017/1/21.
 */
import React, {
	Component
} from 'react';
import ImageElement from './children/ImageElement';

class Element extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

	render() {
    let ele;
    switch (this.props.data.type) {
      case 1:
        ele = <div>this is type 1 element {this.props.data.type.id}</div>;
        break;
      case 2:
        ele = <ImageElement data={this.props.data} />;
        break;
      case 3:
        ele = <div>this is type 3 element {this.props.data.type.id}</div>;
        break;
      case 4:
        ele = <div>this is type 4 element {this.props.data.type.id}</div>;
        break;
      case 5:
        ele = <div>this is type 5 element {this.props.data.type.id}</div>;
        break;
      default:
        ele = <div>this is type other element {this.props.data.type.id}</div>;
        break;
    }
		return (
      <div id={this.props.data.id} className="element-container" style={this.props.data.css}>
        <div className="element-content" style={this.props.data.contentCss}>
          {ele}
        </div>
      </div>
		);
	}
}

export default Element;