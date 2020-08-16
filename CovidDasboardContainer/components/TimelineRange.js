import React from 'react';
import { Timeline } from 'antd';
import 'antd/dist/antd.css';
import { ClockCircleOutlined } from '@ant-design/icons';

function TimelineRange(props) {
    let timelineData = props.timelineData || [];
    return (
        <Timeline mode={'alternate'}>
            <Timeline.Item color='red'>First Case 30th Jan 2020</Timeline.Item>
            {timelineData && timelineData.length && timelineData.map((timeline, index) => {
                return (
                    timeline['Count_bin'] &&
                    <Timeline.Item key={index} color='red' dot={(timeline['Count_lag_bin'] === 0) ? <ClockCircleOutlined className="timeline-clock-icon"/>: ''}>{`${timeline['State']} Reached in ${timeline['Count']} days ${(timeline['Count_lag_bin'] === 0) ? '(ongoing)': ''}`}</Timeline.Item>
                )
            })}
        </Timeline>
    )
}

export default TimelineRange;