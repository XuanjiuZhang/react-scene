/**
 * Created by Administrator on 2017/1/21.
 */
import React, {
	Component
} from 'react';
import PhoneList from './PhoneList';
import classNames from 'classnames';
import './turnPage.less';
import './hammer.min';

class ViewManager extends Component {
  constructor(props){
    super(props);
    this.wrapStyle = {
      height: this.props.viewHeight + 'px',
      width: this.props.viewWidth + 'px'
    };
  }

  componentDidMount(){
  }

	render() {
		return (
      <div style={this.wrapStyle}>
        <div className="phone-wrap" style={{width: '100%', height: '100%', overflow: 'hidden', float: 'left'}}>
          <PhoneList {...this.props} />
        </div>
        <div style={{position: 'absolute', left: '320px'}}>
          <button onClick={this.props.goPrePage}>prePage</button>
          <button onClick={this.props.goNextPage}>nextPage</button>  
        </div>
      </div>
		);
	}
}

export default ViewManager;