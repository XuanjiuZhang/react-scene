/**
 * Created by Administrator on 2017/1/21.
 */
import React, {
	Component
} from 'react';
import PhonePage from './PhonePage';

class PhoneList extends Component {
  constructor(props){
    super(props);
    this.state = {
      deltaX: 0,
      deltaY: 0
    };
    this.panPage = this.panPage.bind(this);
    console.log(props);
  }

  componentDidMount(){
    this.HammerManager = new Hammer.Manager(this.refs.list);
    const Pan = new Hammer.Pan({
      event: 'pan',
      pointers: 0,
      threshold: 6,
      direction: Hammer.DIRECTION_ALL
    });
    this.HammerManager.add(Pan);
    this.HammerManager.on('panstart', this.panPage);
    this.HammerManager.on('panend', this.panPage);
    this.HammerManager.on('panleft', this.panPage);
    this.HammerManager.on('panright', this.panPage);
    this.HammerManager.on('panup', this.panPage);
    this.HammerManager.on('pandown', this.panPage);
  }

  panPage(event){
    const activePage = this.props.scenedata.pages[this.props.currentPageIndex];
    const {type, deltaX, deltaY, additionalEvent} = event;
    console.log(event);
    switch (type) {
      case 'panstart':
        break;
      case 'panend':
        // 第一页继续往上滑
        if(this.props.currentPageIndex === 0 && (additionalEvent === 'pandown' || deltaY > 0)){
          this.setState({ deltaY: 0 });
          return;
        }
        // 最后一页往下滑
        if(this.props.currentPageIndex === this.props.scenedata.pages.length - 1
         && (additionalEvent === 'panup' || deltaY < 0)){
          this.setState({ deltaY: 0 });
          return;
        }
        // 往下滑翻页
        if(additionalEvent === 'panup' || deltaY < 0){
          this.props.goNextPage();
          this.setState({ deltaY: 0 });
          return;
        }
        // 往上滑翻页
        if(additionalEvent === 'pandown' || deltaY > 0){
          this.props.goPrePage();
          this.setState({ deltaY: 0 });
          return;
        }
        break;
      case 'panleft':
        break;
      case 'panright':
        break;
      case 'panup':
        if(!activePage.pageOption.longPage){
          this.setState({ deltaY });
        }
        break;
      case 'pandown':
        if(!activePage.pageOption.longPage){
          this.setState({ deltaY });
        }
        break;
      default:
        break;
    }
  }

	render() {
    console.log(this.props.currentPageIndex);
    const prePage = this.props.currentPageIndex === 0 ? {id: 'min', pageOption: {pageSize: 486, turnPageMode: 1}, elements: []}
     : this.props.scenedata.pages[this.props.currentPageIndex - 1];
    const activePage = this.props.scenedata.pages[this.props.currentPageIndex];
    const nextPage = this.props.currentPageIndex === this.props.scenedata.pages.length - 1 ?
     {id: 'max', pageOption: {pageSize: 486, turnPageMode: 1}, elements: []}
      : this.props.scenedata.pages[this.props.currentPageIndex + 1];
    
    const prePageStyle = {
      transform: activePage.pageOption.turnPageMode === 1 ? `translateY(-${this.props.viewHeight - this.state.deltaY}px)`
       : `translateX(-${thi.props.viewWidth - this.state.deltaX}px)`
    };
    const activePageStyle = {
      transform: activePage.pageOption.turnPageMode === 1 ? `translateY(${this.state.deltaY}px)`
       : `translateX(${this.state.deltaX}px)`
    };
    const nextPageStyle = {
      transform: activePage.pageOption.turnPageMode === 1 ? `translateY(${this.props.viewHeight + this.state.deltaY}px)`
       : `translateX(${this.props.viewWidth + this.state.deltaX}px)`
    };

		return (
      <ul style={{width: '100%', height: '100%'}}>
        <li className="phone-page" style={prePageStyle}>
          <PhonePage key={prePage.id} data={prePage} />
        </li>
        <li ref="list" className="phone-page" style={activePageStyle}>
          <PhonePage key={activePage.id} data={activePage} />
        </li>
        <li className="phone-page" style={nextPageStyle}>
          <PhonePage key={nextPage.id} data={nextPage} />
        </li>
      </ul>
		);
	}
}

export default PhoneList;