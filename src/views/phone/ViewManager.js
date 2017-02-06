/**
 * Created by Administrator on 2017/1/21.
 */
import React, {
	Component
} from 'react';
import PhonePage from './PhonePage';
import classNames from 'classnames';
import './turnPage.less';

class ViewManager extends Component {
  constructor(props){
    super(props);
    this.viewHeight = 486;
    this.viewWidth = 320;
    this.wrapStyle = {
      height: this.viewHeight + 'px',
      width: this.viewWidth + 'px',
      overflow: 'hidden',
      float: 'left'
    };
    this.panY = 0;
    this.panX = 0;
    const activePage = this.props.scenedata.pages[this.props.currentPageIndex];
    this.prePageStyle = {
      transform: activePage.pageOption.turnPageMode === 1 ? `translateY(-${this.viewHeight}px)` : `translateX(-${this.viewWidth}px)`
    };
    this.activePageStyle = {
      transform: activePage.pageOption.turnPageMode === 1 ? `translateY(0px)` : `translateX(0px)`
    };
    this.nextPageStyle = {
      transform: activePage.pageOption.turnPageMode === 1 ? `translateY(${this.viewHeight}px)` : `translateX(${this.viewWidth}px)`
    };
  }

  panPage(){
    const activePage = this.props.scenedata.pages[this.props.currentPageIndex];
    Object.assign(this.prePageStyle, {
      transform: activePage.pageOption.turnPageMode === 1 ? `translateY(-${this.viewHeight + this.panY}px)`
       : `translateX(-${this.viewWidth + this.panX}px)`
    });
    Object.assign(this.activePageStyle, {
      transform: activePage.pageOption.turnPageMode === 1 ? `translateY(${this.panY}px)` : `translateX(${this.panX}px)`
    });
    Object.assign(this.nextPageStyle, {
      transform: activePage.pageOption.turnPageMode === 1 ? `translateY(${this.viewHeight + this.panY}px)`
       : `translateX(${this.viewWidth + this.panX}px)`
    });
  }

  componentDidMount(){
    console.log(this.props.scenedata);
  }

	render() {
    const prePage = this.props.currentPageIndex === 0 ? {id: 'min', pageOption: {pageSize: 486, turnPageMode: 1}, elements: []}
     : this.props.scenedata.pages[this.props.currentPageIndex - 1];
    const activePage = this.props.scenedata.pages[this.props.currentPageIndex];
    const nextPage = this.props.currentPageIndex === this.props.scenedata.pages.length - 1 ?
     {id: 'max', pageOption: {pageSize: 486, turnPageMode: 1}, elements: []} : this.props.scenedata.pages[this.props.currentPageIndex + 1];
    
    const prePageClass = classNames({
      'phone-page': true,
      /*'vertical-pre': activePage.pageOption.turnPageMode === 1,
      'horizontal-pre': activePage.pageOption.turnPageMode === 2*/
    });

    const activePageClass = classNames({
      'phone-page': true,
      /*'vertical-active': activePage.pageOption.turnPageMode === 1,
      'horizontal-active': activePage.pageOption.turnPageMode === 2*/
    });

    const nextPageClass = classNames({
      'phone-page': true,
      /*'vertical-next': activePage.pageOption.turnPageMode === 1,
      'horizontal-next': activePage.pageOption.turnPageMode === 2*/
    });

		return (
      <div>
        <div className="phone-wrap" style={this.wrapStyle}>
          <div className="">
            <ul>
              <li className={prePageClass} style={this.prePageStyle}>
                <PhonePage key={prePage.id} data={prePage} />
              </li>
              <li className={activePageClass} style={this.activePageStyle}>
                <PhonePage key={activePage.id} data={activePage} />
              </li>
              <li className={nextPageClass} style={this.nextPageStyle}>
                <PhonePage key={nextPage.id} data={nextPage} />
              </li>
            </ul>
          </div>
        </div>
        <div style={{float: 'left'}}>
          <button onClick={this.props.goPrePage}>prePage</button>
          <button onClick={this.props.goNextPage}>nextPage</button>  
        </div>
      </div>
		);
	}
}

export default ViewManager;