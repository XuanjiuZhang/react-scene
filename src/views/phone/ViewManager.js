/**
 * Created by Administrator on 2017/1/21.
 */
import React, {
	Component
} from 'react';
import PhonePage from './PhonePage';

class ViewManager extends Component {
  constructor(props){
    super(props);
    this.wrapStyle = {
      height: '486px',
      width: '320px',
      /*overflow: 'hidden'*/
    };
  }

  componentDidMount(){
    console.log(this.props.scenedata);
  }

	render() {
    const showPages = this.props.scenedata.pages.filter((page, index) => {
            return (this.props.currentPageIndex != 0 && this.props.currentPageIndex - 1 === index)
             || this.props.currentPageIndex === index
             || ((this.props.currentPageIndex != this.props.scenedata.pages.length - 1) && this.props.currentPageIndex + 1 === index);
          });
    console.log(showPages);
		return (
      <div className="phone-wrap" style={this.wrapStyle}>
        <div className="">
          {
            showPages.map((page) => {
              return <PhonePage key={page.id} data={page} />;
            })
          }
        </div>
      </div>
		);
	}
}

export default ViewManager;