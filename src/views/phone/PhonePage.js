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
    this.state = {
      positionY: 0,
      inPan: false
    };
    this.panPage = this.panPage.bind(this);
    this.minPositionY = -(this.props.data.pageOption.pageSize - 486);
  }

  componentDidMount(){
    console.log(this.props.data);
    if(this.props.data.pageOption.longPage && this.props.panPage){
      console.log('HammerManager!');
      this.HammerManager = new Hammer.Manager(this.refs.page);
      const Pan = new Hammer.Pan({
        event: 'pan',
        pointers: 0,
        threshold: 6,
        direction: Hammer.DIRECTION_ALL
      });
      this.HammerManager.add(Pan);
      this.HammerManager.on('panstart', this.panPage);
      this.HammerManager.on('panend', this.panPage);
      this.HammerManager.on('panup', this.panPage);
      this.HammerManager.on('pandown', this.panPage);
      this.HammerManager.on('panleft', this.panPage);
      this.HammerManager.on('panright', this.panPage);
    }
  }

  panPage(event){
    const {type, deltaX, deltaY, additionalEvent} = event;
    const { positionY } = this.state;
    switch (type) {
      case 'panstart':
        this.startPositonY = positionY;
        this.props.panPage(event);
        break;
      case 'panend':
        if(this.startPositonY === this.minPositionY && deltaY < 0){
          this.props.panPage(event);
        }else if(this.startPositonY === 0 && deltaY > 0){
          this.props.panPage(event);
        }else{
          this.setState({positionY: Math.max(Math.min(this.startPositonY + deltaY, 0), this.minPositionY)});
        }
        break;
      case 'panup':
        if(this.startPositonY === this.minPositionY){
          let outEvent = Object.assign({}, event);
          this.props.panPage(outEvent);
        }else{
          this.setState({positionY: Math.max(this.startPositonY + deltaY, this.minPositionY)});
        }
        break;
      case 'pandown':
        if(this.startPositonY === 0){
          let outEvent = Object.assign({}, event);
          this.props.panPage(outEvent);
        }else{
          this.setState({positionY: Math.min(this.startPositonY + deltaY, 0)});
        }
        break;
      case 'panleft':
        this.props.panPage(event);
        break;
      case 'panright':
        this.props.panPage(event);
        break;
      default:
        break;
    }
  }

	render() {
    const pageStyle = {
      height: this.props.data.pageOption.pageSize + 'px',
      width: '100%',
      /*overflowX: 'hidden',
      overflowY: 'auto',*/
      position: 'relative',
      overflow: 'hidden',
      transform: `translateY(${this.state.positionY}px)`
    };
    console.log(pageStyle);
		return (
      <div ref="page" className="" style={pageStyle}>
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