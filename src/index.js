import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

const Container = Styled.div`
    margin: auto 0;
    display: flex;
    align-items: center;
`;

const TrackWrapper = Styled.div`
    cursor: pointer;
    height: ${props => props.trackHeight};
    line-height: 0;
    margin: 0 12px 0 20px;
    outline: none;
    padding-left: 12px;
    width: ${props => props.trackWidth};
`;

const Track = Styled.div`
    display: block;
    height: 100%;
    width: ${props => props.trackWidth};
    position: relative;
    border-radius: 0.5em;
    background-color: ${props => props.trackOffColor};
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const Thumb = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${props => `${props.thumbSize}px`};
    width: ${props => `${props.thumbSize}px`};
    border-radius: 50%;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.12), 0 3px 6px rgba(0, 0, 0, 0.24);
    position: absolute;
    margin-top: -0.25em;
    background-color: ${props => props.thumbOffColor};
    transform: translate(-10px);
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
    ${TrackWrapper}:hover & {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.16), 0 5px 10px rgba(0, 0, 0, 0.32);
    };
`;

const Tooltip = Styled.div`
    padding: 6px 8px;
    border-radius: 2px;
    background-color: #737373;
    color: #fff;
    font-size: 10px;
    margin: ${props => `${props.thumbSize + 14}px`} 12px 0 20px;
    position: absolute;
    visibility: hidden;
    opacity: 0;
    transition: visibility 150ms cubic-bezier(0.4, 0, 0.2, 1), opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
    ${Container}:hover & {
        visibility: visible;
        opacity: 1;
    };
`;

class Toggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false
        };
    }

    handleToogle = () => {
        this.setState({ isSelected: !this.state.isSelected });
    };

    componentWillUpdate = (nextProps, nextState) => {
        if (this.props.onToggle && this.state.isSelected !== nextState.isSelected) {
            this.props.onToggle(nextState.isSelected);
        }
    }

    componentDidUpdate = () => {
        const { thumbOnColor, trackOnColor, thumbOffColor, trackOffColor } = this.props;
        if (this.state.isSelected) {
            this.thumb.style.backgroundColor = thumbOnColor;
            this.thumb.style.transform = 'translate(20px)';
            this.track.style.backgroundColor = trackOnColor;
        } else {
            this.thumb.style.backgroundColor = thumbOffColor;
            this.track.style.backgroundColor = trackOffColor;
            this.thumb.style.transform = 'translate(-10px)';
        }
    };

    render = () => {
        const { trackHeight, trackWidth, thumbSize, thumbOffColor, trackOffColor, thumbOffIcon, thumbOnIcon, tooltipText, tooltip } = this.props;
        return (
            <Container>
                <TrackWrapper onClick={this.handleToogle} trackHeight={trackHeight} trackWidth={trackWidth}>
                    <Track innerRef={(node) => {
                        this.track = node;
                    }} trackWidth={trackWidth} trackOffColor={trackOffColor} >
                        <Thumb innerRef={(node) => {
                            this.thumb = node;
                        }} thumbSize={thumbSize} thumbOffColor={thumbOffColor} >
                            {thumbOffIcon && thumbOnIcon ? this.state.isSelected ? thumbOnIcon : thumbOffIcon : null}
                        </Thumb>
                    </Track>
                </TrackWrapper>
                {tooltip ? <Tooltip thumbSize={thumbSize}>{tooltipText}</Tooltip> : null}
            </Container>
        );
    };
}

Toggle.defaultProps = {
    trackHeight: '1em',
    trackWidth: '34px',
    thumbSize: 25,
    thumbOffColor: '#2FA8DD',
    thumbOnColor: '#fff',
    trackOffColor: '#2394c4',
    trackOnColor: '#fafafa',
    tooltipText: 'Instructions',
    tooltip: false
};

Toggle.propTypes = {
    thumbOnIcon: PropTypes.element,
    thumbOffIcon: PropTypes.element,
    trackHeight: PropTypes.string,
    trackWidth: PropTypes.string,
    thumbSize: PropTypes.number,
    thumbOffColor: PropTypes.string,
    thumbOnColor: PropTypes.string,
    trackOffColor: PropTypes.string,
    trackOnColor: PropTypes.string,
    tooltipText: PropTypes.string,
    tooltip: PropTypes.bool,
    onToggle: PropTypes.func
};

export default Toggle;

