import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import Sinon from 'sinon';
import Axios from 'axios';

import Movies from '../client/widgets/movies';

describe('<Movies />', () => {

  it('should have a div in the component to display current movies', () => {
    const wrapper = shallow(<Movies />);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it('should have a paragraph element to display Loading when data has not come in yet', () => {
    const wrapper = shallow(<Movies />);
    expect(wrapper.find('p')).to.have.length(1);
  });

  it('should mount the <Movies /> component', () => {
    const willMount = Sinon.spy();
    const didMount = Sinon.spy();
    const willUnmount = Sinon.spy();
    
    class Movies extends React.Component {
      constructor(props) {
        super(props);
        this.componentWillUnmount = willUnmount;
        this.componentWillMount = willMount;
        this.componentDidMount = didMount;
      }
    
      render() {
          return (
            <div style={{overflowY: 'scroll'}}>
            </div>
          );
      }
    }
    const wrapper = mount(<Movies />);
    expect(willMount.callCount).to.equal(1);
    expect(didMount.callCount).to.equal(1);
    expect(willUnmount.callCount).to.equal(0);
    wrapper.unmount();
    expect(willUnmount.callCount).to.equal(1);
    wrapper.mount();
    expect(willMount.callCount).to.equal(2);
  });

  it('show have props', () => {
    const wrapper = shallow(<Movies />);
    expect(wrapper.props().location).to.be.defined
  });

  it('should have an initial response state',() => {
    const wrapper = mount(<Movies />);
    expect(wrapper.state().response).to.equal('Getting Your Location, Please Wait');
    wrapper.unmount();
  });
});

