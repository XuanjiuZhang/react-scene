/**
 * Created by Administrator on 2017/1/21.
 */
import React, {
	Component
} from 'react';
import Element from '../elements/Element';

class PhonePage extends Component {
  constructor(props){
    super(props);
    this.pageStyle = {
      height: this.props.data.pageOption.pageSize + 'px',
      width: '320px',
      /*overflow: 'hidden'*/
    };
  }

  componentDidMount(){
    console.log(this.props.data);
  }

	render() {
		return (
      <div className="" style={this.pageStyle}>
        {
          this.props.data.elements.map((element) => {
            return <Element key={element.id} data={element} />;
          })
        }
      </div>
		);
	}
}

export default PhonePage;