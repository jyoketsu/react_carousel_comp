import React, { Component } from 'react';
import './index.css';
import PropTypes from 'prop-types'

export default class Carousel extends Component {
    static propTypes = {
        perNum: PropTypes.number,
        autoPlay: PropTypes.bool,
        style: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        }
        this.handLeftClick = this.handLeftClick.bind(this);
        this.handRightClick = this.handRightClick.bind(this);
    }

    handLeftClick() {
        this.setState((prevState) => {
            if (this.defaultOption.loop) {
                if (prevState.index - 1 < 0) {
                    return { index: this.props.children.length - this.defaultOption.perNum }
                } else {
                    return { index: prevState.index - 1 }
                }
            } else {
                if (prevState.index - 1 < 0) {
                    return null
                } else {
                    return { index: prevState.index - 1 }
                }
            }
        })
    }

    handRightClick() {
        this.setState((prevState) => {
            if (this.defaultOption.loop) {
                if (prevState.index + 1 > this.props.children.length - this.defaultOption.perNum) {
                    return { index: 0 }
                } else {
                    return { index: prevState.index + 1 }
                }
            } else {
                if (prevState.index + 1 > this.props.children.length - this.defaultOption.perNum) {
                    return { index: 0 }
                } else {
                    return { index: prevState.index + 1 }
                }
            }
        })
    }

    render() {
        this.defaultOption = {
            perNum: 4,
            autoPlay: true,
            children: [],
            style: {
                width: '100%',
                height: '100%'
            }
        }
        Object.assign(this.defaultOption, this.props);
        const { children, perNum, style } = this.defaultOption;

        let num = perNum;
        let showArrow = true;
        if (children.length <= perNum) {
            num = children.length;
            showArrow = false;
        }
        let contentsStyles = {
            width: `${100 * (children.length / num)}%`,
            transform: `translateX(${-1 * this.state.index * (100 / children.length)}%)`,
        }
        return (
            <div className="slider" style={style}>
                {
                    showArrow ?
                        <div className="slider-arrows">
                            <button className="arrow-left" onClick={this.handLeftClick}>
                                <ArrowLeft />
                            </button>
                            <button className="arrow-right" onClick={this.handRightClick}>
                                <ArrowRight />
                            </button>
                        </div> : null
                }
                <div className="slider-inner">
                    <div className="slider-contents" style={contentsStyles}>{children}</div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const { autoPlay } = this.props;
        if (autoPlay === undefined || autoPlay) {
            let that = this;
            this.autoPlay = setInterval(() => {
                that.handRightClick();
            }, 2000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.autoPlay);
    }
}

class ArrowLeft extends Component {
    render() {
        return (
            <svg viewBox="0 0 1024 1024" width="45" height="45">
                <defs><style type="text/css"></style></defs>
                <path d="M512 955.733333a17.066667 17.066667 0 0 1-12.066133-5.000533l-426.666667-426.666667a17.0496 17.0496 0 0 1 0-24.132266l426.666667-426.666667A17.032533 17.032533 0 0 1 529.066667 85.333333v238.933334h409.6a17.066667 17.066667 0 0 1 17.066666 17.066666v341.333334a17.066667 17.066667 0 0 1-17.066666 17.066666H529.066667v238.933334a17.0496 17.0496 0 0 1-17.066667 17.066666zM109.4656 512L494.933333 897.467733V682.666667a17.066667 17.066667 0 0 1 17.066667-17.066667h409.6V358.4H512a17.066667 17.066667 0 0 1-17.066667-17.066667V126.532267L109.4656 512z" p-id="1099" fill="#ffffff"></path>
            </svg>
        );
    }
}

class ArrowRight extends Component {
    render() {
        return (
            <svg viewBox="0 0 1024 1024" width="45" height="45">
                <defs><style type="text/css"></style></defs>
                <path d="M512 955.733333a17.066667 17.066667 0 0 1-17.066667-17.066666V699.733333H85.333333a17.066667 17.066667 0 0 1-17.066666-17.066666V341.333333a17.066667 17.066667 0 0 1 17.066666-17.066666h409.6V85.333333a17.1008 17.1008 0 0 1 29.1328-12.066133l426.666667 426.666667a17.0496 17.0496 0 0 1 0 24.132266l-426.666667 426.666667A17.066667 17.066667 0 0 1 512 955.733333zM102.4 665.6h409.6a17.066667 17.066667 0 0 1 17.066667 17.066667v214.801066L914.5344 512 529.066667 126.532267V341.333333a17.066667 17.066667 0 0 1-17.066667 17.066667H102.4v307.2z" p-id="1920" fill="#ffffff"></path>
            </svg>
        );
    }
}