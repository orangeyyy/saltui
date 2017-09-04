/**
 * NumberPicker Component for tingle
 * @author sujingjing
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import classnames from 'classnames';
import RcInputNumber from 'rc-input-number';
import Context from '../Context';
import Icon from 'salt-icon';


class NumberPicker extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    step: React.PropTypes.number,
    value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    readOnly: React.PropTypes.bool,
    showNumber: React.PropTypes.bool,
    focusOnUpDown: React.PropTypes.bool,
    useTouch: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    disabled: React.PropTypes.bool,
  };

  static defaultProps = {
    step: 1,
    value: 2,
    readOnly: false,
    showNumber: true,
    disabled: false,
    focusOnUpDown: false,
    useTouch: true,
    onChange: () => {},
  };
  static displayName = 'NumberPicker';
  constructor(props) {
    super(props);
    this.state = {
      width: 108,
    };
  }
  componentDidMount() {
    const t = this;
    t.processingWidth();
  }
  componentWillReceiveProps(nextProps) {
    const t = this;
    const newValueLength = nextProps.value.toString().length;
    const valueLength = t.props.value.toString().length;
    if (newValueLength !== valueLength) {
      t.processingWidth(newValueLength);
    }
  }
  // 获得当前值所占的宽度，给予组件，实现可根据输入的内容来变宽
  processingWidth(length) {
    const t = this;
    let width = t.refs.reference.offsetWidth;
    width = length && length <= 4 ? 108 : width;
    // rc-input-number的input框最宽的宽度为185px
    if (width > 185) {
      width = 185;
    }
    t.setState({ width });
  }
  render() {
    const t = this;
    const fillColorUp = t.props.disabled || t.props.value >= t.props.max ? '#cccccc' : '#f37372';
    const fillColorDown = t.props.disabled || t.props.value <= t.props.min ? '#cccccc' : '#f37372';
    const { className, showNumber, ...restProps } = t.props;
    const stepperClass = classnames({
      [className]: !!className,
      showNumber: !!showNumber,
    });


    return (
      <div
        className={classnames(Context.prefixClass('number-picker'), {
          [t.props.className]: !!t.props.className,
          'readonly-status': t.props.readOnly,
        })}
        style={{ width: t.state.width }}
      >
        <RcInputNumber
          upHandler={<Icon name="plus-thin" fill={fillColorUp} width="14" height="14" />}
          downHandler={<Icon name="minus-thin" fill={fillColorDown} width="14" height="14" />}
          {...restProps}
          className={stepperClass}
        />
        <div ref="reference" className="reference" >{t.props.value}</div>
      </div>
    );
  }
}

export default NumberPicker;