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
      deltaY: 0,
      inPan: false
    };
    this.panPage = this.panPage.bind(this);
    console.log(props);
  }

  componentDidMount(){
    console.log('componentDidMount');
    const activePage = this.props.scenedata.pages[this.props.currentPageIndex];
    this.HammerManager = new Hammer.Manager(this.refs.list);
    this.HammerManager.on('panstart', this.panPage);
    this.HammerManager.on('panend', this.panPage);
    this.HammerManager.on('panup', this.panPage);
    this.HammerManager.on('pandown', this.panPage);
    this.HammerManager.on('panleft', this.panPage);
    this.HammerManager.on('panright', this.panPage);
    this.Pan = new Hammer.Pan({
        event: 'pan',
        pointers: 0,
        threshold: 6,
        direction: Hammer.DIRECTION_ALL
      });
    if(!activePage.pageOption.longPage){
      this.HammerManager.add(this.Pan);
    }
  }

  componentDidUpdate(prevProps, prevState){
    const preActivePage = prevProps.scenedata.pages[prevProps.currentPageIndex];
    const activePage = this.props.scenedata.pages[this.props.currentPageIndex];
    if(preActivePage.pageOption.longPage && !activePage.pageOption.longPage){
      setTimeout(() => this.HammerManager.add(this.Pan));
    }else if(!preActivePage.pageOption.longPage && activePage.pageOption.longPage){
      this.HammerManager.remove(this.Pan);
    }
  }

  panPage(event){
    const activePage = this.props.scenedata.pages[this.props.currentPageIndex];
    const {type, deltaX, deltaY, additionalEvent} = event;
    switch (type) {
      case 'panstart':
        this.setState({ inPan: true });
        break;
      case 'panend':
        this.setState({ inPan: false });
        if(activePage.pageOption.turnPageMode === 1){
          // 第一页继续往下滑
          if(this.props.currentPageIndex === 0 && (additionalEvent === 'pandown' || deltaY > 0)){
            this.setState({ deltaY: 0 });
            return;
          }
          // 最后一页往上滑
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
        }else{
          // 第一页继续往右滑
          if(this.props.currentPageIndex === 0 && (additionalEvent === 'panright' || deltaX > 0)){
            this.setState({ deltaX: 0 });
            return;
          }
          // 最后一页往左滑
          if(this.props.currentPageIndex === this.props.scenedata.pages.length - 1
           && (additionalEvent === 'panleft' || deltaX < 0)){
            this.setState({ deltaX: 0 });
            return;
          }
          // 往左滑翻页
          if(additionalEvent === 'panleft' || deltaX < 0){
            this.props.goNextPage();
            this.setState({ deltaX: 0 });
            return;
          }
          // 往右滑翻页
          if(additionalEvent === 'panright' || deltaX > 0){
            this.props.goPrePage();
            this.setState({ deltaX: 0 });
            return;
          }
        }
        break;
      case 'panleft':
        if(activePage.pageOption.turnPageMode === 2){
          this.setState({ deltaX });
        }
        break;
      case 'panright':
        if(activePage.pageOption.turnPageMode === 2){
          this.setState({ deltaX });
        }
        break;
      case 'panup':
        if(activePage.pageOption.turnPageMode === 1){
          this.setState({ deltaY });
        }
        break;
      case 'pandown':
        if(activePage.pageOption.turnPageMode === 1){
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
       : `translateX(-${this.props.viewWidth - this.state.deltaX}px)`,
      display: this.state.inPan ? '' : 'none'
    };
    const activePageStyle = {
      transform: activePage.pageOption.turnPageMode === 1 ? `translateY(${this.state.deltaY}px)`
       : `translateX(${this.state.deltaX}px)`
    };
    const nextPageStyle = {
      transform: activePage.pageOption.turnPageMode === 1 ? `translateY(${this.props.viewHeight + this.state.deltaY}px)`
       : `translateX(${this.props.viewWidth + this.state.deltaX}px)`,
      display: this.state.inPan ? '' : 'none'
    };

		return (
      <ul style={{width: '100%', height: '100%'}}>
        <li className="phone-page" style={prePageStyle}>
          <PhonePage key={prePage.id} data={prePage} />
        </li>
        <li ref="list" className="phone-page" style={activePageStyle}>
          <PhonePage key={activePage.id} data={activePage} panPage={this.panPage}/>
        </li>
        <li className="phone-page" style={nextPageStyle}>
          <PhonePage key={nextPage.id} data={nextPage} />
        </li>
      </ul>
		);
	}
}

export default PhoneList;